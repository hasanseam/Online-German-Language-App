import { useNavigate, useOutletContext } from "react-router";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsAdmin } = useOutletContext<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app this would call an API
    setIsLoggedIn(true);

    // If admin credentials, set admin flag
    if (email === "admin@deutschlernen.com") {
      setIsAdmin(true);
      navigate("/admin");
    } else {
      navigate("/courses");
    }
  };

  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-red-600">
          <div className="flex justify-center mb-4">
            <div className="flex gap-1">
              <div className="w-2 h-16 bg-black rounded"></div>
              <div className="w-2 h-16 bg-red-600 rounded"></div>
              <div className="w-2 h-16 bg-yellow-500 rounded"></div>
            </div>
          </div>
          <h2 className="text-3xl text-center mb-2 text-gray-800">Anmelden</h2>
          <p className="text-center text-gray-600 mb-8">Login to Your Account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-black text-white py-3 rounded-lg hover:from-red-700 hover:to-gray-900 hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-red-600 hover:underline font-semibold">
              Register here
            </a>
          </p>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-red-600">
            <p className="text-sm text-gray-700">
              <strong>Demo-Anmeldedaten:</strong><br />
              Admin: admin@deutschlernen.com<br />
              Student: student@deutschlernen.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
