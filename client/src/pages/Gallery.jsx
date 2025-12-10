// src/pages/Gallery.jsx
import { useEffect, useState } from "react";
import api from "../api/client";

const categories = [
  { key: "all", label: "Всички" },
  { key: "portfolio", label: "Портфолио" },
  { key: "interior", label: "Интериор" },
  { key: "certificates", label: "Сертификати" },
  { key: "smiles", label: "Усмивки" },
];

const categoryLabel = (key) => {
  const found = categories.find((c) => c.key === key);
  return found ? found.label : "Портфолио";
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [activeCat, setActiveCat] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // за админ формата
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploadCategory, setUploadCategory] = useState("portfolio");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  // проверяваме дали user е admin (от localStorage)
  const storedUser = localStorage.getItem("bb_user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/gallery");
        // default category, ако липсва
        const withCategory = res.data.map((img) => ({
          category: img.category || "portfolio",
          ...img,
        }));
        setImages(withCategory);
      } catch (err) {
        console.error("Fetch gallery error:", err);
        const msg =
          err.response?.data?.message || "Грешка при зареждане на галерията.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filteredImages =
    activeCat === "all"
      ? images
      : images.filter((img) => (img.category || "portfolio") === activeCat);

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError("");
    setUploadMessage("");

    if (!file) {
      setUploadError("Моля, изберете снимка.");
      return;
    }

    try {
      setUploadLoading(true);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption);
      formData.append("category", uploadCategory);

      const res = await api.post("/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const created = {
        ...res.data,
        category: res.data.category || uploadCategory,
      };

      setImages((prev) => [created, ...prev]);
      setUploadMessage("Снимката е качена успешно.");
      setFile(null);
      setCaption("");
      setUploadCategory("portfolio");
    } catch (err) {
      console.error("Upload error:", err);
      const msg =
        err.response?.data?.message ||
        "Възникна грешка при качване на снимката.";
      setUploadError(msg);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Галерия</h1>
          <p className="text-sm text-slate-600 max-w-xl">
            Разгледайте реални резултати от клиенти, уютния интериор на
            студиото, сертификати и усмивките, които създаваме всеки ден.
          </p>
        </div>
      </header>

      {/* Tabs за категориите */}
      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCat(cat.key)}
            className={[
              "px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.16em] uppercase border",
              activeCat === cat.key
                ? "bg-pink-600 border-pink-600 text-white"
                : "border-slate-200 text-slate-600 hover:border-pink-400 hover:text-pink-600",
            ].join(" ")}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Галерия */}
      {loading && <p className="text-sm text-slate-600">Зареждане...</p>}
      {error && (
        <p className="text-sm text-red-600 mb-4">Грешка: {error}</p>
      )}

      {!loading && !error && filteredImages.length === 0 && (
        <p className="text-sm text-slate-500">
          Все още няма добавени снимки в тази секция.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-2">
        {filteredImages.map((img) => (
          <figure
            key={img._id}
            className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
          >
            <div className="aspect-[4/3] bg-slate-100">
              <img
                src={img.imageUrl}
                alt={img.caption || "Галерия"}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="p-3">
              {img.caption && (
                <p className="text-xs text-slate-700 mb-1">{img.caption}</p>
              )}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-pink-50 text-pink-600 border border-pink-100">
                  {categoryLabel(img.category || "portfolio")}
                </span>
                {img.service && (
                  <span className="text-[10px] text-slate-500">
                    услуга: {img.service?.name || "свързана"}
                  </span>
                )}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Админ форма за качване */}
      {isAdmin && (
        <section className="mt-10 border border-slate-200 rounded-2xl bg-white p-4">
          <h2 className="text-sm font-semibold mb-3">
            Админ зона: Качване на нови снимки
          </h2>
          <form className="space-y-3" onSubmit={handleUpload}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Снимка
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0] || null)}
                  className="block w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100"
                />
              </div>
              <div className="w-full sm:w-48">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Категория
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full border border-slate-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="portfolio">Портфолио</option>
                  <option value="interior">Интериор</option>
                  <option value="certificates">Сертификати</option>
                  <option value="smiles">Усмивки</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Описание / надпис (по желание)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Например: Френски маникюр, бебе бумер, интериор на салона..."
              />
            </div>

            {uploadError && (
              <p className="text-xs text-red-600">{uploadError}</p>
            )}
            {uploadMessage && (
              <p className="text-xs text-green-600">{uploadMessage}</p>
            )}

            <button
              type="submit"
              disabled={uploadLoading}
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-[11px] font-semibold tracking-[0.16em] uppercase bg-pink-600 text-white hover:bg-pink-700 disabled:opacity-60"
            >
              {uploadLoading ? "Качване..." : "КАЧИ СНИМКА"}
            </button>
          </form>
        </section>
      )}
    </main>
  );
};

export default Gallery;
