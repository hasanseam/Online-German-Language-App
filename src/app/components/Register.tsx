import { Link } from "react-router";
import { useState } from "react";
import { Mail, Lock, User, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { authService } from "../../services/auth.service";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    try {
      await authService.register({
        fullName: name,
        email,
        password,
      });
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-yellow-500">
          <div className="flex justify-center mb-4">
            <div className="flex gap-1">
              <div className="w-2 h-16 bg-black rounded"></div>
              <div className="w-2 h-16 bg-red-600 rounded"></div>
              <div className="w-2 h-16 bg-yellow-500 rounded"></div>
            </div>
          </div>

          {isSuccess ? (
            <div className="text-center py-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl mb-4 text-gray-800">Registrierung erfolgreich!</h2>
              <p className="text-gray-600 mb-8">
                Your account has been created successfully. You can now log in to start learning.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-black text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-gray-900 hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-3xl text-center mb-2 text-gray-800">Registrieren</h2>
              <p className="text-center text-gray-600 mb-8">Create Your Account</p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-700 flex items-center gap-3 rounded-r-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-lg hover:from-yellow-400 hover:to-yellow-500 hover:scale-105 transition-all duration-300 font-bold shadow-lg disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isLoading ? "Registrieren..." : "Register"}
                </button>
              </form>

              <p className="text-center mt-6 text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-red-600 hover:underline font-semibold">
                  Login here
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
