// src/pages/AdminDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import api from "../api/client";

/**
 * NOTE:
 * - Reviews approve/reject endpoints in your backend are PATCH.
 * - Bookings confirm/cancel endpoints should be PATCH (add them if missing).
 * - Services CRUD: POST/PUT/DELETE are already set (admin-only).
 *
 * Make sure your api client supports: get, post, put, patch, delete
 * (If patch/put are missing, add them in src/api/client.js)
 */

function formatDateTime(value) {
  if (!value) return "-";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "-" : d.toLocaleString();
}


const categories = [
  { value: "manicure", label: "Manicure" },
  { value: "nail-extensions", label: "Nail Extensions" },
  { value: "pedicure", label: "Pedicure" },
  { value: "design", label: "Design" },
];

const emptyService = {
  name: "",
  description: "",
  price: "",
  duration: "",
  category: "manicure",
  isActive: true,
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("bookings"); // bookings | services | reviews

  // BOOKINGS
  const [bookings, setBookings] = useState([]);
  const [bookingFilter, setBookingFilter] = useState("pending"); // pending | all
  const [bookingsLoading, setBookingsLoading] = useState(true);

  // SERVICES
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [serviceFormMode, setServiceFormMode] = useState("create"); // create | edit
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [editingServiceId, setEditingServiceId] = useState(null);

  // REVIEWS
  const [pendingReviews, setPendingReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // UI
  const [err, setErr] = useState("");
  const [notice, setNotice] = useState("");

  function setMessage(type, msg) {
    if (type === "error") {
      setErr(msg);
      setNotice("");
    } else {
      setNotice(msg);
      setErr("");
    }
  }

  // ---------- LOADERS ----------
  async function loadBookings() {
    setBookingsLoading(true);
    try {
      const data = await api.get("/booking/admin");
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) {
      setMessage("error", e?.data?.message || e?.message || "Грешка при зареждане на резервации.");
    } finally {
      setBookingsLoading(false);
    }
  }

  async function loadServices() {
    setServicesLoading(true);
    try {
      // your backend uses /service
      const data = await api.get("/service");
      setServices(Array.isArray(data) ? data : []);
    } catch (e) {
      setMessage("error", e?.data?.message || e?.message || "Грешка при зареждане на услуги.");
    } finally {
      setServicesLoading(false);
    }
  }

  async function loadPendingReviews() {
    setReviewsLoading(true);
    try {
      const data = await api.get("/review/pending/list");
      setPendingReviews(Array.isArray(data) ? data : []);
    } catch (e) {
      setMessage("error", e?.data?.message || e?.message || "Грешка при зареждане на reviews.");
    } finally {
      setReviewsLoading(false);
    }
  }

  useEffect(() => {
    // initial load of all modules so dashboard feels instant when switching tabs
    loadBookings();
    loadServices();
    loadPendingReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- DERIVED ----------
  const visibleBookings = useMemo(() => {
    if (bookingFilter === "all") return bookings;
    return bookings.filter((b) => b.status === "pending");
  }, [bookings, bookingFilter]);

  const pendingBookingsCount = useMemo(
    () => bookings.filter((b) => b.status === "pending").length,
    [bookings]
  );

  const activeServicesCount = useMemo(
    () => services.filter((s) => s.isActive).length,
    [services]
  );

  // ---------- BOOKINGS ACTIONS ----------
  async function confirmBooking(id) {
    setErr("");
    setNotice("");
    try {
      await api.patch(`/booking/${id}/confirm`, {});
      setMessage("notice", "Резервацията е потвърдена.");
      await loadBookings();
    } catch (e) {
      setMessage("error", e?.data?.message || e?.message || "Грешка при потвърждение на резервация.");
    }
  }

  async function cancelBooking(id) {
    setErr("");
    setNotice("");
    try {
      await api.patch(`/booking/${id}/admin-cancel`, {});
      setMessage("notice", "Резервацията е отказана/анулирана.");
      await loadBookings();
    } catch (e) {
      setMessage("error", e?.data?.message || e?.message || "Грешка при отказ/анулиране на резервация.");
    }
  }

  // ---------- REVIEWS ACTIONS ----------
  async function approveReview(id) {
    setErr("");
    setNotice("");
    try {
      await api.patch(`/review/${id}/approve`, {});
      setMessage("notice", "Review е одобрено.");
      await loadPendingReviews();
    } catch (e) {
      setMessage("error", e?.data?.message || e?.message || "Грешка при approve на review.");
    }
  }

  async function rejectReview(id) {
    setErr("");
    setNotice("");
    try {
      await api.patch(`/review/${id}/reject`, {});
      setMessage("notice", "Review е отхвърлено.");
      await loadPendingReviews();
    } catch (e) {
      setMessage("error", e?.data?.message || e?.message || "Грешка при reject на review.");
    }
  }

  // ---------- SERVICES ACTIONS ----------
  function startCreateService() {
    setServiceFormMode("create");
    setEditingServiceId(null);
    setServiceForm(emptyService);
    setErr("");
    setNotice("");
  }

  function startEditService(s) {
    setServiceFormMode("edit");
    setEditingServiceId(s._id);
    setServiceForm({
      name: s.name ?? "",
      description: s.description ?? "",
      price: String(s.price ?? ""),
      duration: String(s.duration ?? ""),
      category: s.category ?? "manicure",
      isActive: Boolean(s.isActive),
    });
    setErr("");
    setNotice("");
  }

  function validateServiceForm() {
    const name = serviceForm.name.trim();
    const price = Number(serviceForm.price);
    const duration = Number(serviceForm.duration);

    if (!name || name.length < 2) return "Името трябва да е поне 2 символа.";
    if (!Number.isFinite(price) || price < 0) return "Невалидна цена.";
    if (!Number.isFinite(duration) || duration <= 0) return "Невалидно времетраене (минути).";
    if (!serviceForm.category) return "Избери категория.";
    return null;
  }

  async function submitServiceForm(e) {
    e.preventDefault();
    setErr("");
    setNotice("");

    const validationError = validateServiceForm();
    if (validationError) {
      setMessage("error", validationError);
      return;
    }

    const payload = {
      name: serviceForm.name.trim(),
      description: serviceForm.description.trim(),
      price: Number(serviceForm.price),
      duration: Number(serviceForm.duration),
      category: serviceForm.category,
      isActive: Boolean(serviceForm.isActive),
    };

    try {
      if (serviceFormMode === "create") {
        await api.post("/service", payload);
        setMessage("notice", "Услугата е добавена.");
      } else {
        await api.put(`/service/${editingServiceId}`, payload);
        setMessage("notice", "Услугата е обновена.");
      }

      await loadServices();
      startCreateService();
    } catch (e2) {
      setMessage("error", e2?.data?.message || e2?.message || "Грешка при запис на услуга.");
    }
  }

  async function deactivateService(id) {
    setErr("");
    setNotice("");
    try {
      // your backend DELETE actually deletes; if you prefer soft-delete, switch backend to set isActive=false
      await api.delete(`/service/${id}`);
      setMessage("notice", "Услугата е изтрита.");
      await loadServices();
    } catch (e) {
      setMessage("error", e?.data?.message || e?.message || "Грешка при изтриване на услуга.");
    }
  }

  // ---------- UI ----------
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Админ панел</h1>
          
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTab("bookings")}
            className={`px-3 py-2 rounded text-sm border ${
              tab === "bookings" ? "bg-slate-900 text-white border-slate-900" : "bg-white"
            }`}
          >
            Резервации ({pendingBookingsCount})
          </button>
          <button
            onClick={() => setTab("services")}
            className={`px-3 py-2 rounded text-sm border ${
              tab === "services" ? "bg-slate-900 text-white border-slate-900" : "bg-white"
            }`}
          >
            Услуги ({activeServicesCount})
          </button>
          <button
            onClick={() => setTab("reviews")}
            className={`px-3 py-2 rounded text-sm border ${
              tab === "reviews" ? "bg-slate-900 text-white border-slate-900" : "bg-white"
            }`}
          >
            Reviews ({pendingReviews.length})
          </button>
        </div>
      </div>

      {err ? (
        <div className="p-3 rounded bg-red-50 text-red-700 text-sm mb-4">{err}</div>
      ) : null}
      {notice ? (
        <div className="p-3 rounded bg-emerald-50 text-emerald-800 text-sm mb-4">{notice}</div>
      ) : null}

      {/* ------------------ BOOKINGS TAB ------------------ */}
      {tab === "bookings" ? (
        <section className="bg-white border rounded p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-semibold">Потвърждаване на резервации</h2>
              <p className="text-sm text-slate-600">Потвърждавай или отказвай заявки.</p>
            </div>

            <div className="flex gap-2 items-center">
              <select
                className="border rounded px-2 py-2 text-sm"
                value={bookingFilter}
                onChange={(e) => setBookingFilter(e.target.value)}
              >
                <option value="pending">Само pending</option>
                <option value="all">Всички</option>
              </select>

              <button
                onClick={loadBookings}
                className="px-3 py-2 rounded bg-slate-900 text-white text-sm"
                disabled={bookingsLoading}
              >
                Refresh
              </button>
            </div>
          </div>

          {bookingsLoading ? (
            <p className="text-sm text-slate-600">Зареждане...</p>
          ) : visibleBookings.length === 0 ? (
            <p className="text-sm text-slate-600">Няма резервации за показване.</p>
          ) : (
            <div className="space-y-3">
              {visibleBookings.map((b) => (
                <div key={b._id} className="border rounded p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">
                        {b.customer?.name || "Клиент"} • {b.service?.name || "Услуга"}
                      </div>
                      <div className="text-sm text-slate-600">
                        {formatDateTime(b.datetime)} • Статус:{" "}
                        <span className="font-medium">{b.status}</span>
                      </div>
                      <div className="text-sm text-slate-600">
                        Тел: {b.customer?.phone || "-"} • Email: {b.customer?.email || "-"}
                      </div>
                    </div>

                    {b.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => confirmBooking(b._id)}
                          className="px-3 py-2 rounded bg-emerald-600 text-white text-sm"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => cancelBooking(b._id)}
                          className="px-3 py-2 rounded bg-rose-600 text-white text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : null}
                  </div>

                  {b.note ? (
                    <p className="text-sm text-slate-700 mt-3 whitespace-pre-wrap">{b.note}</p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {/* ------------------ SERVICES TAB ------------------ */}
      {tab === "services" ? (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Form */}
          <div className="bg-white border rounded p-4 lg:col-span-1">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h2 className="text-lg font-semibold">
                  {serviceFormMode === "create" ? "Добави услуга" : "Редакция на услуга"}
                </h2>
                <p className="text-sm text-slate-600">
                  Управлявай цена и времетраене от админ панела.
                </p>
              </div>

              {serviceFormMode === "edit" ? (
                <button
                  onClick={startCreateService}
                  className="px-3 py-2 rounded border text-sm"
                  type="button"
                >
                  New
                </button>
              ) : null}
            </div>

            <form onSubmit={submitServiceForm} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Име</label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Напр. Маникюр"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Описание</label>
                <textarea
                  className="w-full border rounded px-3 py-2 text-sm"
                  rows={3}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm((s) => ({ ...s, description: e.target.value }))}
                  placeholder="По желание"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Цена</label>
                  <input
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm((s) => ({ ...s, price: e.target.value }))}
                    placeholder="напр. 35"
                    inputMode="decimal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Времетраене (мин.)</label>
                  <input
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm((s) => ({ ...s, duration: e.target.value }))}
                    placeholder="напр. 60"
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Категория</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm((s) => ({ ...s, category: e.target.value }))}
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={serviceForm.isActive}
                  onChange={(e) => setServiceForm((s) => ({ ...s, isActive: e.target.checked }))}
                />
                Active
              </label>

              <button
                className="w-full px-3 py-2 rounded bg-slate-900 text-white text-sm"
                type="submit"
              >
                {serviceFormMode === "create" ? "Add service" : "Save changes"}
              </button>

              <button
                className="w-full px-3 py-2 rounded border text-sm"
                type="button"
                onClick={loadServices}
                disabled={servicesLoading}
              >
                Refresh list
              </button>
            </form>
          </div>

          {/* List */}
          <div className="bg-white border rounded p-4 lg:col-span-2">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <h2 className="text-lg font-semibold">Списък с услуги</h2>
                <p className="text-sm text-slate-600">
                  Редакция/изтриване само за администратори.
                </p>
              </div>
            </div>

            {servicesLoading ? (
              <p className="text-sm text-slate-600">Зареждане...</p>
            ) : services.length === 0 ? (
              <p className="text-sm text-slate-600">Няма услуги.</p>
            ) : (
              <div className="space-y-2">
                {services.map((s) => (
                  <div key={s._id} className="border rounded p-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-sm text-slate-600">
                          {Number(s.price).toFixed(2)} лв • {s.duration} мин •{" "}
                          {categories.find((c) => c.value === s.category)?.label || s.category} •{" "}
                          <span className={s.isActive ? "text-emerald-700" : "text-slate-500"}>
                            {s.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        {s.description ? (
                          <p className="text-sm text-slate-700 mt-2 whitespace-pre-wrap">
                            {s.description}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditService(s)}
                          className="px-3 py-2 rounded border text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deactivateService(s._id)}
                          className="px-3 py-2 rounded bg-rose-600 text-white text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* ------------------ REVIEWS TAB ------------------ */}
      {tab === "reviews" ? (
        <section className="bg-white border rounded p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-semibold">Потвърждаване на reviews</h2>
              <p className="text-sm text-slate-600">Одобрявай/отхвърляй отзиви преди да станат публични.</p>
            </div>

            <button
              onClick={loadPendingReviews}
              className="px-3 py-2 rounded bg-slate-900 text-white text-sm"
              disabled={reviewsLoading}
            >
              Refresh
            </button>
          </div>

          {reviewsLoading ? (
            <p className="text-sm text-slate-600">Зареждане...</p>
          ) : pendingReviews.length === 0 ? (
            <p className="text-sm text-slate-600">Няма чакащи reviews.</p>
          ) : (
            <div className="space-y-3">
              {pendingReviews.map((r) => (
                <div key={r._id} className="border rounded p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">
                        {r.user?.name || "Потребител"} • {r.service?.name || "Услуга"}
                      </div>
                      <div className="text-sm text-slate-600">
                        Рейтинг: <span className="font-medium">{r.rating}</span> / 5
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => approveReview(r._id)}
                        className="px-3 py-2 rounded bg-emerald-600 text-white text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectReview(r._id)}
                        className="px-3 py-2 rounded bg-rose-600 text-white text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  </div>

                  {r.comment ? (
                    <p className="text-sm text-slate-700 mt-3 whitespace-pre-wrap">{r.comment}</p>
                  ) : (
                    <p className="text-sm text-slate-500 mt-3">Без коментар.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      ) : null}

     
    </main>
  );
}
