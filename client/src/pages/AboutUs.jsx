import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <main className="flex flex-col gap-10 md:gap-14">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-pink-100 bg-gradient-to-br from-pink-50 via-pink-100 to-white">
        {/* Декоративни ореоли */}
        <div className="pointer-events-none absolute -right-20 -top-16 h-40 w-40 rounded-full bg-pink-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-pink-300/40 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-14">
          <p className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.22em] uppercase text-pink-600 font-semibold mb-3 rounded-full bg-white/70 border border-pink-100 px-3 py-1 shadow-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink-500" />
            B&B BEAUTY · NAIL &amp; BEAUTY STUDIO
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-slate-900">
            За нас
          </h1>
          <p className="text-sm md:text-base text-slate-700 max-w-2xl">
            B&amp;B Beauty Studio е място, създадено за жени, които ценят
            детайлите. Вярваме, че красивите нокти са малък лукс, който носи
            голямо самочувствие – и че всяка процедура трябва да е приятно
            изживяване, не просто записан час.
          </p>
        </div>
      </section>

      {/* История / Концепция */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              B&amp;B Beauty – твоето място за красиви нокти
            </h2>
            <p className="text-sm text-slate-700">
              В студиото комбинираме професионализъм, внимание към детайла и
              уютна атмосфера. От първото посрещане до финалното нанасяне на
              топлак – целта ни е да се почувстваш спокойна, уверена и
              специална.
            </p>
            <p className="text-sm text-slate-700">
              Работим с подбрани марки гел лакове и материали, които осигуряват
              дълготрайност и щадяща грижа за нокътната плочка. Следим
              тенденциите в маникюра, ноктопластиката и педикюра, за да ти
              предложим както класически, така и модерни визии.
            </p>
            <p className="text-sm text-slate-700">
              Независимо дали предпочиташ изчистен офис маникюр, нежни нюд
              тонове или ярки цветове и дизайн, ще подберем форма, дължина и
              стил, които подчертават твоята индивидуалност.
            </p>
          </div>

          {/* Картичка със „факти“ за студиото */}
          <div className="rounded-3xl border border-pink-100 bg-gradient-to-br from-white via-pink-50 to-white shadow-sm p-5 md:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">
              Какво ще откриеш при нас
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Персонална консултация преди всяка процедура.</li>
              <li>• Прецизна работа и внимание към формата и детайла.</li>
              <li>• Богата палитра от цветове и декорации.</li>
              <li>
                • Спокойна и чиста среда, в която да си отделиш време само за
                себе си.
              </li>
            </ul>

            <div className="grid grid-cols-3 gap-3 pt-3 text-center text-xs text-slate-600">
              <div className="rounded-2xl bg-pink-50/90 border border-pink-100 py-3 px-2 flex flex-col gap-1">
                <p className="text-lg font-semibold text-pink-600">3+</p>
                <p>основни направления – маникюр, ноктопластика, педикюр</p>
              </div>
              <div className="rounded-2xl bg-pink-50/90 border border-pink-100 py-3 px-2 flex flex-col gap-1">
                <p className="text-lg font-semibold text-pink-600">100+</p>
                <p>нюанса гел лак и комбинации за дизайн</p>
              </div>
              <div className="rounded-2xl bg-pink-50/90 border border-pink-100 py-3 px-2 flex flex-col gap-1">
                <p className="text-lg font-semibold text-pink-600">∞</p>
                <p>възможности за форми, дължини и идеи</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Какво ни отличава */}
      <section className="bg-gradient-to-r from-pink-50 via-white to-pink-50 border-y border-pink-100/70">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Какво ни отличава
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-3xl bg-white/90 border border-pink-100 p-4 shadow-sm">
              <h3 className="text-sm font-semibold mb-2">Професионализъм</h3>
              <p className="text-xs text-slate-700">
                Подхождаме към всяка клиентка индивидуално – от консултацията
                до финалния резултат. Формата, дължината и дизайнът се избират
                спрямо твоята визия и ежедневие.
              </p>
            </div>

            <div className="rounded-3xl bg-white/90 border border-pink-100 p-4 shadow-sm">
              <h3 className="text-sm font-semibold mb-2">
                Качество и безопасност
              </h3>
              <p className="text-xs text-slate-700">
                Работим с доказани продукти и спазваме стриктни хигиенни
                стандарти – дезинфекция, стерилизация и еднократни
                консумативи, когато е необходимо.
              </p>
            </div>

            <div className="rounded-3xl bg-white/90 border border-pink-100 p-4 shadow-sm">
              <h3 className="text-sm font-semibold mb-2">Уют и атмосфера</h3>
              <p className="text-xs text-slate-700">
                Студиото е създадено така, че да се чувстваш комфортно и
                отпуснато – с приятна музика, топло отношение и внимание към
                детайла във всеки ъгъл.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Хигиена и материали */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl border border-pink-100 bg-gradient-to-r from-white via-pink-50 to-white p-5 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start shadow-sm">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">
              Хигиена и качествени материали
            </h2>
            <p className="text-sm text-slate-700 mb-2">
              За нас здравето и безопасността са приоритет. Инструментите се
              почистват и стерилизират, работната среда се поддържа чиста, а
              консумативите се подменят редовно.
            </p>
            <p className="text-sm text-slate-700">
              Избираме продукти, които осигуряват дълготрайно покритие и красив
              финиш, без да правим компромис с качеството.
            </p>
          </div>
        </div>
      </section>

      {/* Как протича една процедура */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Как протича една процедура при нас
        </h2>
        <ol className="grid md:grid-cols-4 gap-4 text-sm text-slate-700">
          <li className="rounded-2xl border border-pink-100 bg-pink-50/60 p-4">
            <p className="text-xs font-semibold text-pink-600 mb-1">
              Стъпка 1
            </p>
            <p>
              Кратка консултация – форма, дължина, стил и предпочитани цветове.
            </p>
          </li>
          <li className="rounded-2xl border border-pink-100 bg-pink-50/60 p-4">
            <p className="text-xs font-semibold text-pink-600 mb-1">
              Стъпка 2
            </p>
            <p>
              Подготовка на ноктите – почистване, оформяне и подготовка на
              плочката.
            </p>
          </li>
          <li className="rounded-2xl border border-pink-100 bg-pink-50/60 p-4">
            <p className="text-xs font-semibold text-pink-600 mb-1">
              Стъпка 3
            </p>
            <p>
              Нанасяне на база, цвят, декорации или изграждане според избраната
              услуга.
            </p>
          </li>
          <li className="rounded-2xl border border-pink-100 bg-pink-50/60 p-4">
            <p className="text-xs font-semibold text-pink-600 mb-1">
              Стъпка 4
            </p>
            <p>
              Финален финиш, подхранващо олио и съвети за поддръжка у дома.
            </p>
          </li>
        </ol>
      </section>

      {/* CTA – Резервация */}
      <section className="bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-1">
              Готова ли си за нов маникюр?
            </h2>
            <p className="text-sm text-pink-100 max-w-xl">
              Запази своя час онлайн – избери процедура, ден и час, които са
              удобни за теб. Ще потвърдим резервацията възможно най-скоро.
            </p>
          </div>
          <Link
            to="/booking"
            className="inline-flex items-center justify-center px-6 md:px-7 py-2.5 rounded-full bg-white text-pink-600 text-xs md:text-sm font-semibold tracking-[0.16em] uppercase hover:bg-pink-50 hover:text-pink-700 shadow-md hover:shadow-lg transition"
          >
            Направи резервация
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
