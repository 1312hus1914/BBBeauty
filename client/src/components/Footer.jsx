const Footer = () => {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between gap-1">
        <span>© {new Date().getFullYear()} B&B Beauty Studio</span>
        <span>Красотата е достъпна – влез в клуба.</span>
      </div>
    </footer>
  );
};

export default Footer;
