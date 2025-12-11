// src/pages/Booking.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { getCurrentUser } from "../utils/auth";

const CATEGORIES = [
    { key: "manicure", label: "Маникюр" },
    { key: "pedicure", label: "Педикюр" },
    { key: "nail-extensions", label: "Ноктопластика" },
];

const Booking = () => {
    const [step, setStep] = useState(1);

    const [category, setCategory] = useState(null);
    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(false);
    const [servicesError, setServicesError] = useState("");

    const [selectedServiceId, setSelectedServiceId] = useState(null);

    const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
    const [timeSlot, setTimeSlot] = useState(null);
    const [bookingNote, setBookingNote] = useState("");

    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingError, setBookingError] = useState("");
    const [bookingSuccess, setBookingSuccess] = useState("");
    const [takenSlots, setTakenSlots] = useState([]);
    const [slotsError, setSlotsError] = useState("");
    const [slotsLoading, setSlotsLoading] = useState(false);

    const navigate = useNavigate();

    const currentUser = getCurrentUser();

    // For now we just generate fixed 30-min slots between 09:00–18:30
    const timeSlots = useMemo(() => {
        const slots = [];
        for (let h = 9; h <= 18; h++) {
            for (let m of [0, 30]) {
                const hh = String(h).padStart(2, "0");
                const mm = String(m).padStart(2, "0");
                slots.push(`${hh}:${mm}`);
            }
        }
        return slots;
    }, []);

    const selectedService = services.find((s) => s._id === selectedServiceId);

    // Load services when we go to step 2 and category is chosen
    useEffect(() => {
        const fetchServices = async () => {
            if (step !== 2 || !category) return;

            try {
                setServicesLoading(true);
                setServicesError("");
                setServices([]);

                // Adjust endpoint/query to your backend as needed:
                // Here we assume GET /services?category=manicure|pedicure|nail-extensions
                const data = await api.get(`/service?category=${category}`);
                setServices(data || []);
            } catch (err) {
                console.error("Fetch services error:", err);
                const msg =
                    err.data?.message ||
                    "Грешка при зареждане на услугите. Опитайте отново.";
                setServicesError(msg);
            } finally {
                setServicesLoading(false);
            }
        };

        fetchServices();
    }, [step, category]);
    // Когато сме на стъпка 3, зареждаме заетите часове за избраната дата/услуга
    useEffect(() => {
        const fetchSlots = async () => {
            if (step !== 3 || !selectedServiceId || !date) return;

            try {
                setSlotsLoading(true);
                setSlotsError("");
                setTakenSlots([]);

                const data = await api.get(
                    `/booking/slots?serviceId=${selectedServiceId}&date=${date}`
                );


                setTakenSlots(data.takenSlots || []);
            } catch (err) {
                console.error("Fetch slots error:", err);
                const msg =
                    err.data?.message ||
                    "Грешка при зареждане на заетите часове. Опитайте отново.";
                setSlotsError(msg);
            } finally {
                setSlotsLoading(false);
            }
        };

        fetchSlots();
    }, [step, selectedServiceId, date]);


    // STEP navigation helpers
    const goToStep1 = () => {
        setStep(1);
        setCategory(null);
        setSelectedServiceId(null);
        setBookingSuccess("");
        setBookingError("");
    };

    const goToStep2 = () => {
        if (!category) return;
        setStep(2);
        setSelectedServiceId(null);
        setBookingSuccess("");
        setBookingError("");
    };

    const goToStep3 = () => {
        if (!selectedServiceId) return;

        // Require login for step 3
        if (!currentUser) {
            // Send user to login, then back to booking
            navigate("/login", { state: { from: { pathname: "/booking" } } });
            return;
        }

        setStep(3);
        setBookingSuccess("");
        setBookingError("");
    };

    // Submit booking to backend
    const handleSubmitBooking = async (e) => {
        e.preventDefault();
        setBookingError("");
        setBookingSuccess("");

        if (!selectedServiceId || !date || !timeSlot) {
            setBookingError("Моля, изберете услуга, дата и час.");
            return;
        }

        try {
            setBookingLoading(true);

            // Combine date + time into ISO string
            const [hours, minutes] = timeSlot.split(":");
            const selectedDate = new Date(date);
            selectedDate.setHours(Number(hours), Number(minutes), 0, 0);

            // Adjust payload according to your Booking API
            const payload = {
                serviceId: selectedServiceId,
                // You can name this field as your backend expects it: e.g. datetime, startTime, slot
                datetime: selectedDate.toISOString(),
                note: bookingNote,
            };

            // Assuming POST /bookings creates a booking for the current user (based on JWT)
            const data = await api.post("/booking", payload);

            setBookingSuccess(
                "Резервацията е изпратена успешно. Ще получите потвърждение от салона."
            );
            console.log("Booking created:", data);

            // Optional: reset only step 3
            // setTimeSlot(null);
            // setBookingNote("");

            // Or go back to step 1:
            // goToStep1();
        } catch (err) {
            console.error("Booking error:", err);
            const msg =
                err.data?.message ||
                "Възникна грешка при създаване на резервацията. Опитайте отново.";
            setBookingError(msg);
        } finally {
            setBookingLoading(false);
        }
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">Онлайн резервация</h1>
            <p className="text-sm text-slate-600 mb-6">
                Само в три стъпки: избери процедура, избери конкретна услуга и запази
                удобен час.
            </p>

            {/* Step indicator */}
            <div className="flex items-center gap-4 mb-6">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div
                            className={[
                                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold",
                                step === s
                                    ? "bg-pink-600 text-white"
                                    : step > s
                                        ? "bg-pink-100 text-pink-700"
                                        : "bg-slate-200 text-slate-600",
                            ].join(" ")}
                        >
                            {s}
                        </div>
                        <span className="hidden sm:inline text-xs text-slate-700">
                            {s === 1
                                ? "Процедура"
                                : s === 2
                                    ? "Услуга"
                                    : "Дата и час"}
                        </span>
                    </div>
                ))}
            </div>

            {/* STEP 1 – Choose category */}
            {step === 1 && (
                <section>
                    <h2 className="text-lg font-semibold mb-3">
                        Стъпка 1: Изберете процедура
                    </h2>
                    <p className="text-sm text-slate-600 mb-4">
                        Изберете една от основните категории – Маникюр, Педикюр или
                        Ноктопластика.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.key}
                                type="button"
                                onClick={() => setCategory(cat.key)}
                                className={[
                                    "border rounded-2xl px-4 py-4 text-left text-sm",
                                    "hover:border-pink-400 hover:shadow-sm",
                                    category === cat.key
                                        ? "border-pink-500 bg-pink-50"
                                        : "border-slate-200 bg-white",
                                ].join(" ")}
                            >
                                <div className="font-semibold mb-1">{cat.label}</div>
                                <p className="text-xs text-slate-600">
                                    {cat.key === "manicure" &&
                                        "Класически, гел лак и дизайн за перфектни ръце."}
                                    {cat.key === "pedicure" &&
                                        "Грижа за краката, комфорт и красота."}
                                    {cat.key === "nail-extensions" &&
                                        "Удължаване и оформяне за елегантна визия."}
                                </p>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={goToStep2}
                            disabled={!category}
                            className="px-6 py-2 rounded-full text-sm font-semibold tracking-[0.12em] uppercase bg-pink-600 text-white disabled:opacity-40"
                        >
                            Продължи
                        </button>
                    </div>
                </section>
            )}

            {/* STEP 2 – Choose service */}
            {step === 2 && (
                <section>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-semibold">
                            Стъпка 2: Изберете конкретна услуга
                        </h2>
                        <button
                            type="button"
                            onClick={goToStep1}
                            className="text-xs text-slate-500 hover:text-slate-700"
                        >
                            ← Назад към стъпка 1
                        </button>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                        Показваме само услугите за избраната категория.
                    </p>

                    {servicesLoading && (
                        <p className="text-sm text-slate-600">Зареждане на услугите…</p>
                    )}
                    {servicesError && (
                        <p className="text-sm text-red-600 mb-3">{servicesError}</p>
                    )}

                    {!servicesLoading && !servicesError && services.length === 0 && (
                        <p className="text-sm text-slate-500">
                            Няма конфигурирани услуги за тази категория. Моля, свържете се със
                            салона.
                        </p>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                        {services.map((srv) => (
                            <button
                                key={srv._id}
                                type="button"
                                onClick={() => setSelectedServiceId(srv._id)}
                                className={[
                                    "border rounded-2xl px-4 py-3 text-left text-sm bg-white hover:border-pink-400 hover:shadow-sm",
                                    selectedServiceId === srv._id
                                        ? "border-pink-500 bg-pink-50"
                                        : "border-slate-200",
                                ].join(" ")}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <div className="font-semibold">{srv.name}</div>
                                    {typeof srv.price !== "undefined" && (
                                        <div className="text-xs font-semibold text-pink-600">
                                            {srv.price} лв.
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between items-center text-xs text-slate-600">
                                    {srv.duration && <span>Времетраене: {srv.duration} мин.</span>}
                                    {srv.category && (
                                        <span className="uppercase tracking-[0.12em] text-[10px]">
                                            {srv.category}
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={goToStep1}
                            className="px-4 py-2 rounded-full text-xs font-medium border border-slate-300 text-slate-600 hover:bg-slate-50"
                        >
                            Назад
                        </button>
                        <button
                            type="button"
                            onClick={goToStep3}
                            disabled={!selectedServiceId}
                            className="px-6 py-2 rounded-full text-sm font-semibold tracking-[0.12em] uppercase bg-pink-600 text-white disabled:opacity-40"
                        >
                            Продължи към час
                        </button>
                    </div>
                </section>
            )}

            {/* STEP 3 – Date & time (requires login) */}
            {step === 3 && selectedService && (
                <section>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-semibold">
                            Стъпка 3: Изберете дата и час
                        </h2>
                        <button
                            type="button"
                            onClick={goToStep2}
                            className="text-xs text-slate-500 hover:text-slate-700"
                        >
                            ← Назад към стъпка 2
                        </button>
                    </div>

                    {!currentUser && (
                        <p className="text-sm text-red-600 mb-3">
                            За да изберете час, трябва да сте влезли в профила си.
                        </p>
                    )}

                    <div className="mb-4 p-3 rounded-2xl bg-white border border-slate-200">
                        <div className="text-sm font-semibold mb-1">
                            Избрана услуга: {selectedService.name}
                        </div>
                        <div className="text-xs text-slate-600 flex gap-3 flex-wrap">
                            {selectedService.duration && (
                                <span>Времетраене: {selectedService.duration} мин.</span>
                            )}
                            {typeof selectedService.price !== "undefined" && (
                                <span>Цена: {selectedService.price} лв.</span>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmitBooking} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-[200px,1fr] items-start">
                            {/* Date picker */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Дата
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                            </div>

                            {/* Time slots */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Час
                                </label>
                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                                    {timeSlots.map((slot) => {
                                        const isTaken = takenSlots.includes(slot);
                                        const isSelected = timeSlot === slot;

                                        return (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => !isTaken && setTimeSlot(slot)}
                                                disabled={isTaken}
                                                className={[
                                                    "text-[11px] px-2 py-1 rounded-full border",
                                                    isTaken
                                                        ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                                                        : isSelected
                                                            ? "border-pink-600 bg-pink-50 text-pink-700"
                                                            : "border-slate-200 bg-white text-slate-700 hover:border-pink-400",
                                                ].join(" ")}
                                            >
                                                {slot}
                                            </button>
                                        );
                                    })}
                                </div>

                                {slotsLoading && (
                                    <p className="text-xs text-slate-500 mt-2">
                                        Зареждане на заетите часове…
                                    </p>
                                )}

                                {slotsError && (
                                    <p className="text-xs text-red-600 mt-1">{slotsError}</p>
                                )}
                            </div>
                        </div>

                        {/* Note */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Бележка (по желание)
                            </label>
                            <textarea
                                rows={3}
                                value={bookingNote}
                                onChange={(e) => setBookingNote(e.target.value)}
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Например: предпочитам пастелни цветове, имам специфични изисквания, и т.н."
                            />
                        </div>

                        {bookingError && (
                            <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
                                {bookingError}
                            </div>
                        )}

                        {bookingSuccess && (
                            <div className="text-sm text-green-700 bg-green-50 border border-green-100 px-3 py-2 rounded">
                                {bookingSuccess}
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={goToStep2}
                                className="px-4 py-2 rounded-full text-xs font-medium border border-slate-300 text-slate-600 hover:bg-slate-50"
                            >
                                Назад
                            </button>
                            <button
                                type="submit"
                                disabled={bookingLoading}
                                className="px-6 py-2 rounded-full text-sm font-semibold tracking-[0.12em] uppercase bg-pink-600 text-white disabled:opacity-60"
                            >
                                {bookingLoading ? "Запазване..." : "Запази час"}
                            </button>
                        </div>
                    </form>
                </section>
            )}


        </main>
    );
};

export default Booking;
