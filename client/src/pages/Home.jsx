// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="flex flex-col gap-12 md:gap-16">

      {/* HERO / BANNER – фонова снимка + бутони */}
      {/* HERO / BANNER – B&B Beauty */}
      <section className="relative overflow-hidden border-b border-pink-100">
        {/* Фонова снимка */}
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-[position:70%_center]"
          style={{ backgroundImage: "url('/B&BBeautyHeroBanner.png')" }}
        />

        {/* Мек бял градиент отляво, за да изпъква текстът */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/55 to-white/10 md:from-white/70 md:via-white/35 md:to-white/0" />

        {/* Съдържание върху банера */}
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 lg:py-28">
          <div className="max-w-xl bg-white/22 backdrop-blur-sm p-2 md:p-7 rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.18)] space-y-4">

            {/* Малък label */}
            <p className="text-[11px] tracking-[0.24em] uppercase text-pink-500 font-semibold">
              B&amp;B BEAUTY · NAIL &amp; BEAUTY STUDIO
            </p>

            {/* Заглавие */}
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
              Красотата е достъпна –
              <br />
              <span className="text-pink-600">
                влез в клуба
              </span>
            </h1>

            {/* Описание */}
            <p className="text-sm md:text-base text-slate-700">
              Уютно студио за маникюр, ноктопластика и педикюр. Висококачествени
              материали, внимание към детайла.
            </p>

            {/* Бутони */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center px-6 md:px-7 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-[0.16em] uppercase bg-pink-600 text-white hover:bg-pink-700 transition"
              >
                Направете резервация
              </Link>

              <Link
                to="/protseduri"
                className="inline-flex items-center justify-center px-5 md:px-6 py-2.5 rounded-full text-xs md:text-sm font-medium border border-pink-300 text-pink-700 bg-white/80 hover:bg-pink-50 transition"
              >
                Виж процедурите
              </Link>
            </div>

            {/* Малък подсказващ текст */}

          </div>
        </div>
      </section>


      {/* GRID – Маникюр / Ноктопластика / Педикюр (хоризонтален на desktop) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-1">
              Трите стълба на красивите нокти
            </h2>
            <p className="text-sm text-slate-600">
              Изберете процедурата, която най-добре пасва на вашия стил и ежедневие.
            </p>
          </div>
          <Link
            to="/protseduri"
            className="text-xs font-semibold tracking-[0.14em] uppercase text-pink-600 hover:text-pink-700"
          >
            Разбери още за процедурите
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Маникюр */}
          <article className="rounded-3xl border border-pink-100 bg-white/0 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="h-32 md:h-40 w-full overflow-hidden">
              <img
                src="/Manikiur.png"
                alt="Маникюр"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-white/70 backdrop-blur-sm ">
              <h3 className="text-sm font-semibold mb-1">Маникюр</h3>
              <p className="text-xs text-slate-600 mb-3">
                Класически маникюр, гел лак, укрепване и поддръжка за перфектни ръце.
              </p>
              <Link
                to="/protseduri"
                className="inline-flex items-center text-[11px] font-semibold tracking-[0.16em] uppercase text-pink-600 hover:text-pink-700"
              >
                Разбери още
              </Link>
            </div>
          </article>

          {/* Ноктопластика */}
          <article className="rounded-3xl border border-pink-100 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="h-32 md:h-40 w-full overflow-hidden">
              <img
                src="/nail-extensions-card.png"
                alt="Ноктопластика"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-1">Ноктопластика</h3>
              <p className="text-xs text-slate-600 mb-3">
                Изграждане, поддръжка и екстремни форми, съобразени с вашия стил.
              </p>
              <Link
                to="/protseduri"
                className="inline-flex items-center text-[11px] font-semibold tracking-[0.16em] uppercase text-pink-600 hover:text-pink-700"
              >
                Разбери още
              </Link>
            </div>
          </article>

          {/* Педикюр */}
          <article className="rounded-3xl border border-pink-100 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="h-32 md:h-40 w-full overflow-hidden">
              <img
                src="/Pedikiur.png"
                alt="Педикюр"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-1">Педикюр</h3>
              <p className="text-xs text-slate-600 mb-3">
                Комфорт, хигиена и красота за краката – класически и гел лак педикюр.
              </p>
              <Link
                to="/protseduri"
                className="inline-flex items-center text-[11px] font-semibold tracking-[0.16em] uppercase text-pink-600 hover:text-пink-700"
              >
                Разбери още
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* CTA – Резервирайте вашия час сега (пълна ширина) */}
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

      {/* ЗА НАС – пълна широчина */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">
                За B&amp;B Beauty Studio
              </h2>
              <p className="text-sm text-slate-600 mb-3">
                B&amp;B Beauty Studio е място, създадено за жени, които ценят
                детайлите. Вярваме, че красивите нокти са малък лукс, който носи
                голямо самочувствие.
              </p>
              <p className="text-sm text-slate-600 mb-3">
                Работим с подбрани продукти, богата палитра от цветове и множество
                техники за дизайн – от изчистен офис маникюр до артистични
                композиции и екстремни форми.
              </p>
              <p className="text-sm text-slate-600 mb-4">
                В студиото ще откриете спокойна атмосфера, професионализъм и
                индивидуален подход към всяка процедура.
              </p>
              <Link
                to="/aboutus"
                className="inline-flex items-center text-xs font-semibold tracking-[0.16em] uppercase text-pink-600 hover:text-pink-700"
              >
                Прочети повече за нас
              </Link>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-white p-5 md:p-6 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-500 mb-3">
                Какво да очаквате при нас
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Подробна консултация преди всяка процедура.</li>
                <li>• Внимателно почистване и подготовка на нокътната плочка.</li>
                <li>• Висококачествени материали и устойчиви покрития.</li>
                <li>• Идеи за форма, дължина и дизайн според вашия стил.</li>
                <li>• Топло отношение и време само за вас.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗИВИ – пълна широчина */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Отзиви от клиенти
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
              <p className="text-sm text-slate-700 mb-2">
                „Изключително отношение и детайлна работа. Маникюрът ми издържа
                над 3 седмици без забележка.“
              </p>
              <p className="text-xs text-slate-500">— Клиентка на маникюр</p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
              <p className="text-sm text-slate-700 mb-2">
                „Най-сетне открих място, където педикюрът е и красива, и
                комфортна процедура.“
              </p>
              <p className="text-xs text-slate-500">— Клиентка на педикюр</p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
              <p className="text-sm text-slate-700 mb-2">
                „Много уютно студио, усеща се професионализъм и отношение. Винаги
                излизам с усмивка.“
              </p>
              <p className="text-xs text-slate-500">— Редовен клиент</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            В бъдеще можем да вържем тези отзиви с реални ревюта от клиенти от
            база данни или Google / Facebook.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
