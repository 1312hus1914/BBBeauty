import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const CATEGORY_META = [
  { id: "manicure", label: "Маникюр" },
  { id: "nail-extensions", label: "Изграждане" },
  { id: "design", label: "Дизайн" },
  { id: "pedicure", label: "Педикюр" },
];

const formatDuration = (minutes) => {
  if (minutes == null) return "по договаряне";
  return `${minutes} мин.`;
};

const Prices = () => {
  const [categories, setCategories] = useState([]);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        setError(null);

        // ако фронт и бекенд са на един домейн, това стига
        const res = await fetch("http://localhost:5000/service");

        if (!res.ok) {
          throw new Error("Грешка при зареждане на услугите.");
        }

        const data = await res.json();

        // само активни услуги
        const active = data.filter((s) => s.isActive !== false);

        // групиране по категория в желания ред
        const grouped = CATEGORY_META.map((meta) => ({
          id: meta.id,
          name: meta.label,
          services: active
            .filter((s) => s.category === meta.id)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((s) => ({
              id: s._id,
              name: s.name,
              price: s.price,
              duration: s.duration,
            })),
        }));

        setCategories(grouped);

        const firstWithServices =
          grouped.find((c) => c.services.length > 0)?.id || grouped[0]?.id;
        if (firstWithServices) {
          setOpenCategoryId(firstWithServices);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Нещо се обърка.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const toggleCategory = (id) => {
    setOpenCategoryId((current) => (current === id ? null : id));
  };

  return (
    <main className="flex flex-col gap-10 md:gap-14">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-pink-100 bg-gradient-to-br from-pink-50 via-pink-100 to-white">
        <div className="pointer-events-none absolute -right-24 -top-16 h-44 w-44 rounded-full bg-pink-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-pink-300/40 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-14">
          <p className="text-center text-[0.65rem] tracking-[0.22em] uppercase text-pink-600 font-semibold mb-3">
            B&amp;B BEAUTY · NAIL &amp; BEAUTY STUDIO
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-center text-slate-900">
            Цени
          </h1>
          <p className="text-sm md:text-base text-slate-700 max-w-2xl mx-auto text-center">
            Цените ни са съобразени с използваните материали, времето за работа
            и вниманието към детайлите. Разгледай основните направления по-долу.
          </p>
        </div>
      </section>

      {/* Accordion секции */}
      <div className="space-y-4 max-w-4xl mx-auto w-full">
        {categories.map((category) => {
          const isOpen = openCategoryId === category.id;

          return (
            <div
              key={category.id}
              className="rounded-2xl border border-pink-100 bg-white shadow-sm w-full"
            >
              {/* Header */}
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-pink-50/60 transition-all duration-200 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-pink-200 bg-pink-50 text-sm font-semibold text-pink-600">
                    {isOpen ? "−" : "+"}
                  </span>

                  <span className="text-sm md:text-base font-semibold tracking-[0.14em] uppercase text-slate-900">
                    {category.name}
                  </span>
                </div>
              </button>

              {/* Animated Content */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                {isOpen && (
                  <div className="border-t border-pink-100 bg-gradient-to-b from-pink-50/60 via-white to-white px-6 pb-6">
                    <div className="overflow-x-auto rounded-2xl border border-pink-100 mt-3">
                      <table className="min-w-full text-left text-xs md:text-sm">
                        <thead>
                          <tr className="bg-pink-100/80 text-[0.7rem] md:text-xs uppercase tracking-[0.16em] text-slate-700">
                            <th className="px-4 py-2 font-semibold">Име услуга</th>
                            <th className="px-4 py-2 font-semibold whitespace-nowrap">
                              Времетраене
                            </th>
                            <th className="px-4 py-2 font-semibold">Цена</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.services.map((service, index) => (
                            <tr
                              key={service.id}
                              className={
                                index % 2 === 0 ? "bg-white" : "bg-pink-50/40"
                              }
                            >
                              <td className="px-4 py-2 text-slate-800">
                                {service.name}
                              </td>
                              <td className="px-4 py-2 text-slate-700 whitespace-nowrap">
                                {formatDuration(service.duration)}
                              </td>
                              <td className="px-4 py-2 text-pink-700 font-semibold whitespace-nowrap">
                                {service.price} лв.
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-2 text-[0.7rem] text-slate-500">
                      Посочените цени са ориентировъчни и могат да варират според
                      сложност на дизайна и състояние на ноктите. Точната цена се
                      уточнява на място след консултация.
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <section className="bg-pink-600/95 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Резервирайте вашия час още днес
            </h2>
            <p className="text-sm md:text-base text-pink-100 max-w-xl">
              Изберете процедура, удобен ден и час, а ние ще се погрижим за останалото.
              Работим с предварително записване и бързо потвърждение.
            </p>
          </div>

          <Link
            to="/booking"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-pink-600 text-sm font-semibold tracking-[0.12em] uppercase hover:bg-pink-50 transition"
          >
            Запази сега
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Prices;
