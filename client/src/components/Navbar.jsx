import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navItems = [
    { to: "/", label: "НАЧАЛО", end: true },
    { to: "/za-nas", label: "ЗА НАС" },
    { to: "/protseduri", label: "ПРОЦЕДУРИ" },
    { to: "/tseni", label: "ЦЕНИ" },
    { to: "/galeriya", label: "ГАЛЕРИЯ" },
    { to: "/kontakti", label: "КОНТАКТИ" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(() => {
        const stored = localStorage.getItem("bb_user");
        return stored ? JSON.parse(stored) : null;
    });

    const navigate = useNavigate();

    // Listen for auth changes (login/logout) and storage changes
    useEffect(() => {
        const handleAuthChange = () => {
            const stored = localStorage.getItem("bb_user");
            setCurrentUser(stored ? JSON.parse(stored) : null);
        };

        window.addEventListener("bb-auth-changed", handleAuthChange);
        window.addEventListener("storage", handleAuthChange);

        return () => {
            window.removeEventListener("bb-auth-changed", handleAuthChange);
            window.removeEventListener("storage", handleAuthChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("bb_token");
        localStorage.removeItem("bb_user");
        window.dispatchEvent(new Event("bb-auth-changed"));
        setOpen(false);
        navigate("/");
    };

    const isAdmin = currentUser?.role === "admin";
    const firstName = currentUser?.name?.split(" ")[0] || "";

    return (
        <header className="bg-white shadow-sm sticky top-0 z-20">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Brand */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg">
                        B
                    </div>
                    <div className="leading-tight">
                        <div className="text-sm font-semibold tracking-wide">
                            B&B BEAUTY
                        </div>
                        <div className="text-[11px] text-slate-500 uppercase">
                            Nail &amp; Beauty Studio
                        </div>
                    </div>
                </Link>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                [
                                    "text-xs font-semibold tracking-[0.08em] uppercase",
                                    "transition-colors",
                                    isActive
                                        ? "text-pink-600"
                                        : "text-slate-700 hover:text-pink-500",
                                ].join(" ")
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}

                    {/* Admin badge when logged in as admin */}
                    {isAdmin && (
                        <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-slate-900 text-pink-200 uppercase tracking-[0.16em]">
                            ADMIN
                        </span>
                    )}

                    {/* Auth area */}
                    {!currentUser ? (
                        <Link
                            to="/login"
                            className="text-[11px] font-medium text-slate-500 hover:text-slate-800 border border-slate-200 px-3 py-1 rounded-full"
                        >
                            Вход
                        </Link>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] text-slate-600">
                                Здравей, <span className="font-semibold">{firstName}</span>
                            </span>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="text-[11px] font-medium text-slate-500 hover:text-slate-800 border border-slate-200 px-3 py-1 rounded-full"
                            >
                                Изход
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile burger button */}
                <button
                    type="button"
                    className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-slate-200"
                    onClick={() => setOpen((o) => !o)}
                >
                    <span className="sr-only">Отвори навигацията</span>
                    <div className="space-y-[5px]">
                        <span className="block w-5 h-[2px] bg-slate-800" />
                        <span className="block w-5 h-[2px] bg-slate-800" />
                    </div>
                </button>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-slate-200 bg-white">
                    <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    [
                                        "text-xs font-semibold tracking-[0.08em] uppercase py-1",
                                        isActive
                                            ? "text-pink-600"
                                            : "text-slate-700 hover:text-pink-500",
                                    ].join(" ")
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}

                        {/* Admin badge info */}
                        {isAdmin && (
                            <span className="inline-flex items-center text-[10px] font-semibold px-2 py-1 rounded-full bg-slate-900 text-pink-200 uppercase tracking-[0.16em] mt-1 w-max">
                                ADMIN
                            </span>
                        )}
                        {currentUser && (
                            <Link
                                to="/my-bookings"
                                className="text-[11px] text-slate-600 hover:text-pink-600"
                            >
                                Моите резервации
                            </Link>
                        )}

                        {isAdmin && (
                            <Link
                                to="/admin"
                                className="text-[11px] text-slate-600 hover:text-pink-600"
                            >
                                Админ панел
                            </Link>
                        )}


                        {/* Auth controls for mobile */}
                        {!currentUser ? (
                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center justify-center text-[11px] font-medium text-slate-600 border border-slate-200 px-3 py-1 rounded-full self-start mt-2 hover:text-slate-800"
                            >
                                Вход
                            </Link>
                        ) : (
                            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600">
                                <span>
                                    Здравей, <span className="font-semibold">{firstName}</span>
                                </span>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="ml-3 text-[11px] font-medium text-slate-600 border border-slate-200 px-3 py-1 rounded-full"
                                >
                                    Изход
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
