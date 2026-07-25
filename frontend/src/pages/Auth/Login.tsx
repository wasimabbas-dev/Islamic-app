import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle } from "lucide-react";

// API Base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface LoginResponse {
  success: boolean;
  message: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';  // Add this line
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: "USER" | "SCHOLAR" | "ADMIN";
    };
  };
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 403) {
          // Check if it's a scholar-specific rejection
          const responseData = data as any;
          if (responseData.status === 'PENDING') {
            throw new Error(
              "Your scholar application is still under review. The admin team has been notified. Please wait for approval."
            );
          } else if (responseData.status === 'REJECTED') {
            throw new Error(
              "Your scholar application was not approved. You can register as a regular user or contact admin for more details."
            );
          }
          throw new Error(
            data.message || "Account pending admin approval"
          );
        }
        throw new Error(data.message || "Login failed");
      }

      if (!data.success || !data.data) {
        throw new Error("Invalid response from server");
      }

      // Store the JWT token
      const { token, user } = data.data;
      
      // Store token in localStorage (or sessionStorage based on rememberMe)
      if (formData.rememberMe) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("currentUser", JSON.stringify(user));
      }

      setSuccess("Login successful! Redirecting...");

      // Redirect based on role
      setTimeout(() => {
        switch (user.role) {
          case "ADMIN":
            navigate("/dashboard/admin");
            break;
          case "SCHOLAR":
            navigate("/dashboard/scholar");
            break;
          default:
            navigate("/");
        }
      }, 1000);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/30 mb-4">
            <LogIn className="w-10 h-10 text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to continue your Islamic learning journey
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-700 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
            <p className="text-sm text-violet-700 dark:text-violet-300">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-colors"
                placeholder="your@email.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-colors"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-violet-500 text-violet-600 bg-gray-50 dark:bg-gray-700"
                disabled={loading}
              />
              <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-linear-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>

          {/* Signup Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium"
              >
                Create one now
              </Link>
            </p>
          </div>

          {/* Scholar Registration Link */}
          <div className="text-center pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Are you a scholar?{" "}
              <Link
                to="/register-scholar"
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
              >
                Register as a Scholar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;