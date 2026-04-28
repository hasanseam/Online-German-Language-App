import { useNavigate, useOutletContext, Link } from "react-router";
import { useState } from "react";
import { Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { authService } from "../services/auth.service";

export function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsAdmin, setUser } = useOutletContext<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authService.login({ email, password });
      const payload = authService.getPayload();
      const userProfile = await authService.getUserProfile();
      
      setUser(userProfile);
      setIsLoggedIn(true);
      
      if (payload?.role === "ADMIN") {
        setIsAdmin(true);
        navigate("/admin");
      } else {
        setIsAdmin(false);
        navigate("/courses");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
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

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-700 flex items-center gap-3 rounded-r-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

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
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-black text-white py-3 rounded-lg hover:from-red-700 hover:to-gray-900 hover:scale-105 transition-all duration-300 font-semibold shadow-lg disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {isLoading ? "Anmelden..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-red-600 hover:underline font-semibold">
              Register here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
