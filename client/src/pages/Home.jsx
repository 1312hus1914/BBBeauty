const Home = () => {
  return (
    <main className="bg-gradient-to-b from-pink-50 via-white to-slate-50">
      {/* Hero / Banner */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <p className="text-[11px] tracking-[0.2em] uppercase text-pink-500 mb-2">
            BEAUTY SALON • NAILS • CARE
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 leading-tight mb-4">
            КРАСОТАТА Е ДОСТЪПНА.
            <br />
            <span className="text-pink-600">ВЛЕЗ В КЛУБА.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-xl">
            Добре дошли в B&B Beauty – уютно студио за маникюр, ноктопластика и
            педикюр. Тук всяка дама получава специално внимание, качествени
            продукти и резултат, който носи усмивка.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/booking"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase bg-pink-600 text-white hover:bg-pink-700"
            >
              НАПРАВЕТЕ РЕЗЕРВАЦИЯ
            </a>
            <a
              href="#about"
              className="text-xs sm:text-sm font-medium text-slate-700 hover:text-pink-600"
            >
              Научи повече за нас →
            </a>
          </div>
        </div>

        {/* Banner image placeholder */}
        <div className="flex-1">
          <div className="relative w-full h-60 sm:h-72 md:h-80 rounded-3xl overflow-hidden shadow-lg bg-slate-900">
            {/* Here you can later place real salon photo as background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-pink-500/40" />
            <div className="absolute inset-0 flex items-end p-5">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-white/90 text-[10px] font-semibold tracking-[0.15em] text-slate-900 mb-2">
                  B&B BEAUTY STUDIO
                </div>
                <p className="text-white text-sm sm:text-base font-medium max-w-xs">
                  Снимка на салона отвън с нашата табела ще бъде тук. Вашето място
                  за модерна визия и добро настроение.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 services cards: Маникюр, Ноктопластика, Педикюр */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Открий своята процедура
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "МАНИКЮР",
              desc: "Класически, гел лак и модерни дизайни – перфектни ръце за всеки повод.",
            },
            {
              title: "НОКТОПЛАСТИКА",
              desc: "Удължаване, оформяне и подсилване за дълготрайна и елегантна визия.",
            },
            {
              title: "ПЕДИКЮР",
              desc: "Грижа за краката, комфорт и красота с професионални продукти.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-sm border border-pink-50 overflow-hidden flex flex-col"
            >
              <div className="h-28 bg-gradient-to-tr from-pink-500 via-pink-400 to-rose-300" />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 flex-1">
                  {item.desc}
                </p>
                <div>
                  <a
                    href="/protseduri"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.16em] uppercase border border-pink-500 text-pink-600 hover:bg-pink-50"
                  >
                    РАЗБЕРИ ОЩЕ
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking CTA section */}
      <section
        id="booking"
        className="bg-slate-900 text-white py-10 px-4 mt-2"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-pink-300 mb-2">
              НАПРАВЕТЕ РЕЗЕРВАЦИЯ
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
              Запази своя час още днес.
            </h2>
            <p className="text-sm text-slate-200 max-w-md">
              Само в три лесни стъпки: избери процедура, услуга и удобен час.
              Скоро тук ще бъде пълният онлайн календар.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/booking"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.16em] uppercase bg-pink-500 text-white hover:bg-pink-400"
            >
              ЗАПАЗИ СЕГА
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.16em] uppercase border border-slate-500 text-slate-100 hover:border-pink-400 hover:text-pink-200"
            >
              ВИЖ КОНТАКТИ
            </a>
          </div>
        </div>
      </section>

      {/* About us */}
      <section
        id="about"
        className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-[1.1fr,0.9fr]"
      >
        <div>
          <h2 className="text-2xl font-semibold mb-3">За нас</h2>
          <p className="text-sm text-slate-600 mb-3">
            B&B Beauty е студио, създадено с любов към детайла и женската
            красота. Нашата мисия е да предложим уютна атмосфера, внимателно
            отношение и професионална грижа за ръце и крака.
          </p>
          <p className="text-sm text-slate-600 mb-3">
            Работим с качествени материали и следим най-новите тенденции в
            маникюра и ноктопластиката, за да получавате винаги актуална и
            впечатляваща визия.
          </p>
          <p className="text-sm text-slate-600">
            Тук е мястото, където да си вземеш глътка време само за себе си и да
            излезеш с усмивка.
          </p>
        </div>
        {/* Simple reviews block */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Отзиви от клиенти</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm">
              <p className="text-sm text-slate-700 mb-1">
                „Страхотно отношение и перфектен маникюр. Чувствам се като у
                дома си всеки път.“
              </p>
              <p className="text-xs text-slate-500">– Мария</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm">
              <p className="text-sm text-slate-700 mb-1">
                „Много уютно студио, чисто, подредено и с голям избор от цветове
                и декорации.“
              </p>
              <p className="text-xs text-slate-500">– Елица</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
