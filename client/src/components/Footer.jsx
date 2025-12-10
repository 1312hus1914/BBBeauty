const Footer = () => {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between gap-1">
        <span>© {new Date().getFullYear()} AK Dev </span>
        <span>B&B Beauty Studio</span>
      </div>
    </footer>
  );
};

export default Footer;
