import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    consent: false,
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!formData.consent) {
      setStatus({
        type: "error",
        message: "Моля, потвърди, че се съгласяваш с обработката на личните данни.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });


      if (!res.ok) {
        throw new Error("Грешка при изпращане на съобщението.");
      }

      setStatus({
        type: "success",
        message: "Благодарим! Съобщението беше изпратено успешно.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
        consent: false,
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Възникна проблем. Моля, опитай отново по-късно.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* БАНЕР СЪС СНИМКА И ЛОГО ТЕКСТ */}
      <section className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
        {/* Снимката на салона – сложи я в public/ и смени пътя */}
        <img
          src="/images/salon-banner.jpg"
          alt="Банер със снимка от салона"
          className="h-full w-full object-cover"
        />
        {/* Леко потъмняване за по-добър контраст */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Текст / „лого“ върху снимката */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <h1 className="mt-2 text-3xl md:text-5xl font-bold text-white uppercase">
            B&B Beauty
          </h1>
          <p className="text-3xl md:text-4xl font-semibold tracking-[0.10em] text-white uppercase">
            бул.Българиа
          </p>
          <p className="mt-4 text-sm md:text-base text-slate-100 max-w-md">
            гр.Златоград
          </p>
        </div>
      </section>

      {/* КАРТА + КОНТАКТНА ИНФОРМАЦИЯ */}
      <section className="grid gap-6 lg:grid-cols-[2fr,1fr] items-stretch">
        {/* Google Maps iframe – смени src с твоя real embed линк */}
        <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 h-80 md:h-96">
          <iframe
            title="Карта на салона"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d889.7139539925838!2d25.094075!3d41.382255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sbg!2sbg!4v1700000000000!5m2!1sbg!2sbg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>



        {/* Телефон и социални мрежи */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 border-b border-slate-200 pb-2">
              Телефон
            </h2>
            <p className="text-sm text-slate-600 mb-1">
              За записване на час и въпроси:
            </p>
            <a
              href="tel:+359897000000"
              className="text-xl font-semibold tracking-wide"
            >
              0897 00 00 00
            </a>
          </div>

         {/* <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 border-b border-slate-200 pb-2">
              Социални мрежи
            </h2>
            <p className="text-sm text-slate-600 mb-3">
              Последвай ни за промоции и нови услуги:
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/yourprofile"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                Instagram
              </a>
              {/* Добави още мрежи при нужда }
            </div>
          </div> */}
        </div>
      </section>

      {/* ФОРМА ЗА ЗАПИТВАНЕ */}
      <section className="rounded-2xl bg-slate-50 p-6 md:p-8 shadow-md border border-slate-200">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-semibold mb-1">Имате въпрос?</h2>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Пишете ни
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium">
              Име*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              placeholder="Вашето име"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              placeholder="example@domain.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="text-sm font-medium">
              Съобщение*
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              placeholder="Напишете вашия въпрос, желание за час или запитване..."
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1"
            />
            <label htmlFor="consent" className="text-xs text-slate-600">
              Съгласявам се предоставените от мен данни да бъдат използвани за
              връзка с мен във връзка с това запитване.
            </label>
          </div>

          {status.message && (
            <p
              className={`text-sm ${status.type === "success"
                ? "text-emerald-600"
                : "text-red-600"
                }`}
            >
              {status.message}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Изпращане..." : "Изпрати"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Contact;
