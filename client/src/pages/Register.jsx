// src/pages/Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!name || !phone || !email || !password || !password2) {
      setError("Моля, попълнете всички полета.");
      return;
    }

    if (password !== password2) {
      setError("Паролите не съвпадат.");
      return;
    }

    try {
      setLoading(true);

      const data = await api.post("/auth/register", {
        name,
        phone,
        email,
        password,
      });

      const apiUser = data.user;
      const apiMsg = data.message;

      if (apiUser) {
        setMessage(
          apiMsg ||
          `Успешна регистрация, ${apiUser.name}. Вече можете да влезете с вашия имейл и парола.`
        );
      } else {
        setMessage(
          apiMsg ||
          "Успешна регистрация. Вече можете да влезете с вашия имейл и парола."
        );
      }

      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setPassword2("");
    } catch (err) {
      console.error("Register error:", err);
      const msg =
        err.data?.message ||
        (err.status === 429
          ? "Твърде много опити за регистрация. Моля, опитайте отново след малко."
          : "Възникна грешка при регистрация. Опитайте отново.");
      setError(msg);
    } finally {
      setLoading(false);
    }

  };

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Регистрация</h1>
      <p className="text-sm text-slate-600 mb-6">
        Създайте свой профил, за да управлявате резервациите си и да качвате
        снимки в секцията „Усмивки“ в галерията.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Име и фамилия
          </label>
          <input
            type="text"
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Име и фамилия"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Телефон
          </label>
          <input
            type="tel"
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="08..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Потвърдете паролата
          </label>
          <input
            type="password"
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="••••••••"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
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
          {loading ? "Регистриране..." : "Регистрация"}
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
        <span>Вече имате акаунт?</span>
        <Link
          to="/login"
          className="font-semibold text-pink-600 hover:text-pink-700"
        >
          Вход
        </Link>
      </div>
    </main>
  );
};

export default Register;
