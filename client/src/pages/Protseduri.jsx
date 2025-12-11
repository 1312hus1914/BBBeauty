import { Link } from "react-router-dom";

const Procedures = () => {
  return (
    <main className="flex flex-col gap-10 md:gap-14">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-pink-100 bg-gradient-to-br from-pink-50 via-pink-100 to-white">
        {/* Декоративни ореоли */}
        <div className="pointer-events-none absolute -right-24 -top-16 h-44 w-44 rounded-full bg-pink-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-pink-300/40 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-14">
          <p className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.22em] uppercase text-pink-600 font-semibold mb-3 rounded-full bg-white/70 border border-pink-100 px-3 py-1 shadow-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink-500" />
            B&B BEAUTY · NAIL &amp; BEAUTY STUDIO
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-slate-900">
            Нашите основни направления
          </h1>
          <p className="text-sm md:text-base text-slate-700 max-w-2xl">
            Маникюр, ноктопластика и педикюр – три различни, но допълващи се
            начина да се погрижиш за ноктите и стъпалата си. 
          </p>
        </div>
      </section>

      {/* 1. МАНИКЮР */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-[3fr,2fr] gap-6 md:gap-10 items-start">
          {/* Текстова част */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 border border-pink-100 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-pink-600">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink-500" />
              Маникюр
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
              Какво представлява маникюрът?
            </h2>
            <p className="text-sm text-slate-700">
              Маникюрът е цялостна грижа за ноктите и кожата на ръцете. В
              основата му са оформянето на ноктите, обработката на кожичките и
              създаването на чиста, елегантна визия – независимо дали е с
              неутрален нюанс, класически червен лак или нежен дизайн.
            </p>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">
                За кого е подходящ?
              </h3>
              <p className="text-sm text-slate-700">
                Подходящ е за всяка жена, която иска ръцете ѝ да изглеждат
                поддържани, професионални или празнични – според случая. Може да
                бъде изчистен и делови, дискретен нюд за всеки ден или по-смел,
                с акцентни нокти и декорации.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">
                Какво включва една процедура?
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-700 list-disc list-inside">
                <li>оформяне на ноктите според предпочитаната форма и дължина;</li>
                <li>деликатна обработка на кожичките около нокътя;</li>
                <li>
                  подготовка на нокътната плочка за по-добро прилепване на
                  продукта;
                </li>
                <li>
                  нанасяне на база, цвят и/или укрепващ продукт според нуждите;
                </li>
                <li>финален финиш и подхранващо олио за кожа и нокти.</li>
              </ul>
            </div>

            <p className="text-sm text-slate-700">
              Редовният маникюр не е просто козметика – той помага за
              поддържането на здрави нокти, предотвратява разслояване и
              чупене, а ръцете ти изглеждат чисти и подредени във всяка
              ситуация.
            </p>
          </div>

          {/* Инфо карта / акценти */}
          <aside className="rounded-3xl border border-pink-100 bg-gradient-to-br from-white via-pink-50 to-white shadow-sm p-5 md:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Маникюрът в няколко думи
            </h3>
            <div className="grid gap-3 text-sm text-slate-700">
              <div className="rounded-2xl bg-white/70 border border-pink-50 px-3 py-2">
                <p className="text-xs font-semibold text-pink-600 mb-0.5">
                  Основен фокус
                </p>
                <p>Красива форма, чисти кожички и цвят, който отразява стила ти.</p>
              </div>
              <div className="rounded-2xl bg-white/70 border border-pink-50 px-3 py-2">
                <p className="text-xs font-semibold text-pink-600 mb-0.5">
                  Подходящ, когато…
                </p>
                <p>
                  искаш поддържани нокти за всеки ден, офис среда или специален
                  повод – без допълнителна дължина.
                </p>
              </div>
              <div className="rounded-2xl bg-white/70 border border-pink-50 px-3 py-2">
                <p className="text-xs font-semibold text-pink-600 mb-0.5">
                  Колко често?
                </p>
                <p>
                  Обикновено на всеки 3–4 седмици, според растежа и състоянието
                  на ноктите ти.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 2. НОКТОПЛАСТИКА */}
      <section className="bg-gradient-to-r from-pink-50 via-white to-pink-50 border-y border-pink-100/70">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <div className="grid md:grid-cols-[3fr,2fr] gap-6 md:gap-10 items-start">
            {/* Текстова част */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-pink-100 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-pink-600">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink-500" />
                Ноктопластика
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                Какво е ноктопластика?
              </h2>
              <p className="text-sm text-slate-700">
                Ноктопластиката е техника за удължаване и укрепване на ноктите с
                помощта на специални материали. Тя позволява да се изгради
                желаната форма и дължина, дори когато естествените нокти са
                къси, чупливи или нерастящи равномерно.
              </p>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Кога да я избереш?
                </h3>
                <p className="text-sm text-slate-700">
                  Подходяща е, ако:
                </p>
                <ul className="space-y-1.5 text-sm text-slate-700 list-disc list-inside">
                  <li>мечтаеш за по-дълги и стройни нокти;</li>
                  <li>
                    ноктите ти се чупят лесно и не успяват да достигнат желаната
                    дължина;
                  </li>
                  <li>
                    искаш по-стабилна форма, която да издържа на динамично
                    ежедневие;
                  </li>
                  <li>
                    имаш единични проблемни нокти, които искаш да изравниш с
                    останалите.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Как протича процедурата?
                </h3>
                <p className="text-sm text-slate-700">
                  След консултация за форма и дължина, ноктите се подготвят,
                  поставя се основа и върху нея се изгражда избраната форма.
                  Следва оформяне, изглаждане и нанасяне на цвят или нежен
                  естествен финиш. Завършваме с финален топ и грижа за кожата
                  около ноктите.
                </p>
              </div>

              <p className="text-sm text-slate-700">
                При правилна грижа и редовна поддръжка ноктопластиката е удобен
                начин да имаш дълги, стабилни и красиво оформени нокти през
                цялото време – без да се притесняваш за често чупене.
              </p>
            </div>

            {/* Инфо карта / акценти */}
            <aside className="rounded-3xl border border-pink-100 bg-white/90 shadow-sm p-5 md:p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Накратко за ноктопластиката
              </h3>
              <div className="grid gap-3 text-sm text-slate-700">
                <div className="rounded-2xl bg-pink-50/70 border border-pink-100 px-3 py-2">
                  <p className="text-xs font-semibold text-pink-600 mb-0.5">
                    Основен фокус
                  </p>
                  <p>Удължаване, оформяне и укрепване на ноктите.</p>
                </div>
                <div className="rounded-2xl bg-slate-50/70 border border-slate-200 px-3 py-2">
                  <p className="text-xs font-semibold text-pink-600 mb-0.5">
                    Резултат
                  </p>
                  <p>
                    Дълги и устойчиви нокти с избрана форма – бадем, квадрат,
                    овал и други, с естествен или по-смел финиш.
                  </p>
                </div>
                <div className="rounded-2xl bg-pink-50/70 border border-pink-100 px-3 py-2">
                  <p className="text-xs font-semibold text-pink-600 mb-0.5">
                    Поддръжка
                  </p>
                  <p>
                    Обичайно на всеки 3–4 седмици, когато нокътната плочка
                    израсне и е необходима корекция и запълване.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 3. ПЕДИКЮР */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-[3fr,2fr] gap-6 md:gap-10 items-start py-8 md:py-10">
          {/* Текстова част */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 border border-pink-100 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-pink-600">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink-500" />
              Педикюр
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
              Какво представлява педикюрът?
            </h2>
            <p className="text-sm text-slate-700">
              Педикюрът е грижа за стъпалата и ноктите на краката. Той съчетава
              естетика и комфорт – почиства, омекотява и освежава кожата, а
              ноктите придобиват чист, подреден вид с или без цвят.
            </p>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">
                Защо е важен?
              </h3>
              <p className="text-sm text-slate-700">
                Освен за красиви стъпала в сандали, редовният педикюр помага за:
              </p>
              <ul className="space-y-1.5 text-sm text-slate-700 list-disc list-inside">
                <li>премахване на загрубяла кожа и натрупвания по петите;</li>
                <li>поддържане на ноктите в правилна форма;</li>
                <li>
                  намаляване на дискомфорт при ходене, причинен от удебелена
                  кожа;
                </li>
                <li>релаксация и усещане за лекота в стъпалата.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">
                Как протича една процедура?
              </h3>
              <p className="text-sm text-slate-700">
                Обикновено включва накисване или омекотяване, почистване на
                стъпалата, внимателна обработка на грубите участъци, оформяне на
                ноктите и кожичките, последвано от нанасяне на лак или гел лак
                при желание. Завършва с хидратиращ крем и кратък масаж.
              </p>
            </div>

            <p className="text-sm text-slate-700">
              Педикюрът е подходящ през цялата година – не само през летните
              месеци. Редовната грижа подобрява вида на стъпалата и дава усещане
              за лекота и комфорт при всяка стъпка.
            </p>
          </div>

          {/* Инфо карта / акценти */}
          <aside className="rounded-3xl border border-pink-100 bg-gradient-to-br from-white via-pink-50 to-white shadow-sm p-5 md:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Педикюрът в няколко акцента
            </h3>
            <div className="grid gap-3 text-sm text-slate-700">
              <div className="rounded-2xl bg-white/70 border border-pink-50 px-3 py-2">
                <p className="text-xs font-semibold text-pink-600 mb-0.5">
                  Основен фокус
                </p>
                <p>
                  Здрави нокти на краката, меки стъпала и свеж, поддържан
                  вид.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50/70 border border-slate-200 px-3 py-2">
                <p className="text-xs font-semibold text-pink-600 mb-0.5">
                  Подходящ, когато…
                </p>
                <p>
                  усещаш сухота, загрубяла кожа или просто искаш релаксираща
                  грижа за краката.
                </p>
              </div>
              <div className="rounded-2xl bg-white/70 border border-pink-50 px-3 py-2">
                <p className="text-xs font-semibold text-pink-600 mb-0.5">
                  Честота
                </p>
                <p>
                  Обикновено на всеки 4–6 седмици, според сезона и
                  индивидуалните нужди.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA – Резервация */}
      <section className="bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-1">
              Не си сигурна коя процедура е за теб?
            </h2>
            <p className="text-sm text-pink-100 max-w-xl">
              Запази час и ще обсъдим заедно състоянието на ноктите и стъпалата
              ти. Ще ти препоръчаме най-подходящото решение според стила и
              ежедневието ти.
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

export default Procedures;
