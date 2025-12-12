// src/pages/MyBookings.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { getCurrentUser, isAdmin } from "../utils/auth";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function safeDate(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function addMinutes(date, minutes) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

function statusTag(status) {
  if (status === "pending") return "PENDING";
  if (status === "confirmed") return "CONFIRMED";
  if (status === "cancelled") return "CANCELLED";
  return status || "-";
}

export default function MyBookings() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const admin = isAdmin();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [notice, setNotice] = useState("");

  // customer list
  const [myBookings, setMyBookings] = useState([]);

  // admin calendar data
  const [allBookings, setAllBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // for "day list"

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    setErr("");
    setNotice("");
    setLoading(true);
    try {
      if (admin) {
        const data = await api.get("/booking/admin");
        setAllBookings(Array.isArray(data) ? data : []);
      } else {
        const data = await api.get("/booking/my");
        setMyBookings(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      setErr(e?.data?.message || e?.message || "Грешка при зареждане.");
    } finally {
      setLoading(false);
    }
  }

  // Admin: only pending+confirmed for the calendar view
  const adminVisibleBookings = useMemo(() => {
    return allBookings.filter((b) => b.status === "pending" || b.status === "confirmed");
  }, [allBookings]);

  const calendarEvents = useMemo(() => {
    return adminVisibleBookings
      .map((b) => {
        const start = safeDate(b.datetime);
        if (!start) return null;

        const durationMin =
          Number(b?.service?.duration) > 0 ? Number(b.service.duration) : 30;

        const end = addMinutes(start, durationMin);

        const customerName = b?.customer?.name || "Клиент";
        const serviceName = b?.service?.name || "Услуга";

        return {
          id: b._id,
          title: `${customerName} • ${serviceName} • ${statusTag(b.status)}`,
          start,
          end,
          extendedProps: {
            status: b.status,
            customer: b.customer,
            service: b.service,
            note: b.note || "",
          },
        };
      })
      .filter(Boolean);
  }, [adminVisibleBookings]);

  // Admin: list for selected day (optional, but useful)
  const dayBookings = useMemo(() => {
    if (!admin) return [];
    const day = new Date(selectedDate);
    day.setHours(0, 0, 0, 0);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);

    return adminVisibleBookings
      .filter((b) => {
        const dt = safeDate(b.datetime);
        return dt && dt >= day && dt < next;
      })
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  }, [admin, adminVisibleBookings, selectedDate]);

  // Optional: click handler – you can open your Admin panel booking details, etc.
  function onEventClick(info) {
    const { status, customer, service, note } = info.event.extendedProps || {};
    const text =
      `Статус: ${status}\n` +
      `Клиент: ${customer?.name || "-"} (${customer?.phone || "-"})\n` +
      `Услуга: ${service?.name || "-"}\n` +
      (note ? `Бележка: ${note}\n` : "");

    // Replace with modal if you prefer
    alert(text);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-semibold">Моите резервации</h1>
          
        </div>

        <button
          onClick={load}
          className="px-3 py-2 rounded bg-slate-900 text-white text-sm"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {err ? (
        <div className="p-3 rounded bg-red-50 text-red-700 text-sm mb-4">{err}</div>
      ) : null}
      {notice ? (
        <div className="p-3 rounded bg-emerald-50 text-emerald-800 text-sm mb-4">{notice}</div>
      ) : null}

      {loading ? (
        <p className="text-sm text-slate-600">Зареждане...</p>
      ) : admin ? (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white border rounded p-3">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              height="auto"
              events={calendarEvents}
              eventClick={onEventClick}
              dateClick={(arg) => setSelectedDate(arg.date)}
              datesSet={(arg) => {
                // optional: keep selection near current view start
                if (arg?.start) setSelectedDate(arg.start);
              }}
              nowIndicator={true}
              slotMinTime="08:00:00"
              slotMaxTime="20:00:00"
            />
          </div>

          <div className="bg-white border rounded p-4">
            <h2 className="text-lg font-semibold mb-1">Резервации за деня</h2>
            <p className="text-sm text-slate-600 mb-3">
              {selectedDate ? selectedDate.toLocaleDateString() : "-"}
            </p>

            {dayBookings.length === 0 ? (
              <p className="text-sm text-slate-600">Няма pending/confirmed за този ден.</p>
            ) : (
              <div className="space-y-2">
                {dayBookings.map((b) => (
                  <div key={b._id} className="border rounded p-3">
                    <div className="font-medium">
                      {b?.customer?.name || "Клиент"} • {b?.service?.name || "Услуга"}
                    </div>
                    <div className="text-sm text-slate-600">
                      {new Date(b.datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} •{" "}
                      {statusTag(b.status)}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      Тел: {b?.customer?.phone || "-"} • Email: {b?.customer?.email || "-"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="bg-white border rounded p-4">
          {myBookings.length === 0 ? (
            <p className="text-sm text-slate-600">Нямате резервации.</p>
          ) : (
            <div className="space-y-3">
              {myBookings.map((b) => (
                <div key={b._id} className="border rounded p-4">
                  <div className="font-medium">{b?.service?.name || "Услуга"}</div>
                  <div className="text-sm text-slate-600">
                    {new Date(b.datetime).toLocaleString()} • {statusTag(b.status)}
                  </div>
                  {b?.note ? (
                    <p className="text-sm text-slate-700 mt-2 whitespace-pre-wrap">{b.note}</p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
