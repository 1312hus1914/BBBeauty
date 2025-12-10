// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const storedUser = localStorage.getItem("bb_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Моля, въведете имейл и парола.");
      return;
    }

    try {
      setLoading(true);

      const data = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login response:", data);

      const token = data.token;
      const apiUser = data.user;



      if (!token || !apiUser) {
        setError("Сървърът върна неочакван отговор.");
        return;
      }

      localStorage.setItem("bb_token", token);
      localStorage.setItem("bb_user", JSON.stringify(apiUser));
      navigate("/")

      window.dispatchEvent(new Event("bb-auth-changed"));

      setMessage(`Успешен вход като ${apiUser.name} (${apiUser.role}).`);
    } catch (err) {
      console.error("Login error:", err);
      const msg =
        err.data?.message ||
        (err.status === 429
          ? "Твърде много опити за вход. Моля, опитайте отново след малко."
          : "Грешка при вход. Проверете данните и опитайте отново.");
      setError(msg);
    } finally {
      setLoading(false);
    }

  };

  const handleLogout = () => {
    localStorage.removeItem("bb_token");
    localStorage.removeItem("bb_user");
    window.dispatchEvent(new Event("bb-auth-changed"));
    setMessage("Излязохте от профила.");
    setError("");
  };

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Вход</h1>
      <p className="text-sm text-slate-600 mb-6">
        Влезте във вашия профил. Администраторите използват същата форма за
        вход.
      </p>

      {user && (
        <div className="mb-4 text-xs text-slate-600 bg-slate-100 border border-slate-200 px-3 py-2 rounded-md">
          В момента сте влезли като{" "}
          <span className="font-semibold">
            {user.name} ({user.role})
          </span>
          .
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Имейл
          </label>
          <input
            type="email"
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="example@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Парола
          </label>
          <input
            type="password"
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {message && (
          <div className="text-sm text-green-700 bg-green-50 border border-green-100 px-3 py-2 rounded">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex justify-center items-center px-4 py-2 rounded-full text-sm font-semibold tracking-[0.12em] uppercase bg-pink-600 text-white hover:bg-pink-700 disabled:opacity-60"
        >
          {loading ? "Влизане..." : "Вход"}
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
        <span>Нямате акаунт?</span>
        <Link
          to="/register"
          className="font-semibold text-pink-600 hover:text-pink-700"
        >
          Регистрация
        </Link>
      </div>

      <div className="mt-3 text-right">
        <button
          type="button"
          onClick={handleLogout}
          className="text-[11px] text-slate-500 hover:text-slate-700"
        >
          Изход (изтриване на токена)
        </button>
      </div>
    </main>
  );
};

export default Login;
