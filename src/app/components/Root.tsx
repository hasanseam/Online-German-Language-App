import { Outlet, Link, useLocation } from "react-router";
import { BookOpen, LogOut, User } from "lucide-react";
import { useState } from "react";

export function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white shadow-lg relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black via-red-600 to-yellow-500 animate-gradient-x"></div>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex flex-col w-10 h-8 rounded overflow-hidden shadow-md">
              <div className="flex-1 bg-black"></div>
              <div className="flex-1 bg-red-600"></div>
              <div className="flex-1 bg-yellow-500"></div>
            </div>
            <span className="text-2xl font-bold text-yellow-500">DeutschLernen</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/courses"
              className={`hover:text-yellow-400 transition ${location.pathname.includes('/courses') ? 'border-b-2 border-yellow-500' : ''}`}
            >
              Courses
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className={`hover:text-yellow-400 transition ${location.pathname === '/admin' ? 'border-b-2 border-yellow-500' : ''}`}
              >
                Admin Dashboard
              </Link>
            )}

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>User</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="hover:text-yellow-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet context={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }} />
      </main>

      <footer className="bg-black text-gray-300 border-t-4 border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="flex items-center justify-center gap-2">
            &copy; 2026 DeutschLernen.
            <span className="text-yellow-500">Deutsch lernen mit Vertrauen</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
