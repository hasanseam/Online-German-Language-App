import { Link } from "react-router";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="flex gap-1">
            <div className="w-3 h-20 bg-black rounded"></div>
            <div className="w-3 h-20 bg-red-600 rounded"></div>
            <div className="w-3 h-20 bg-yellow-500 rounded"></div>
          </div>
        </div>
        <h1 className="text-6xl mb-4 text-gray-800">404</h1>
        <h2 className="text-3xl mb-2 text-gray-800">Seite nicht gefunden</h2>
        <p className="text-xl mb-8 text-gray-500">
          Die gesuchte Seite existiert nicht.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-black text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-gray-900 hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
