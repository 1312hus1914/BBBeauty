const Price = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Цени</h1>
      <p className="text-sm text-slate-600 mb-4">
        Тук ще има 4 секции с таблици: Маникюр, Ноктопластика, Педикюр и още
        една категория по ваш избор. Във всяка таблица колоните са:
        „Име на услуга“, „Времетраене“, „Цена“.
      </p>
      {/* по-късно: ще добавим разгръщащи се секции (dropdown / accordion) с таблици */}
    </main>
  );
};

export default Price;
