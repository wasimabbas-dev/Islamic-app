import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Shield,
} from "lucide-react";

// API Base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface SignupResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  };
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.length >= 2
          ? ""
          : "Name must be at least 2 characters";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Please enter a valid email address";
      case "password":
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      case "confirmPassword":
        return value === formData.password ? "" : "Passwords do not match";
      default:
        return "";
    }
  };

  const getFieldError = (name: string): string => {
    const value = formData[name as keyof SignupFormData] as string;
    const isTouched = touched[name as keyof typeof touched];
    return isTouched ? validateField(name, value) : "";
  };

  const isFieldValid = (name: string): boolean => {
    const value = formData[name as keyof SignupFormData] as string;
    const isTouched = touched[name as keyof typeof touched];
    return isTouched && value.length > 0 && validateField(name, value) === "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate all fields
    let hasErrors = false;
    const newTouched = { ...touched };

    Object.keys(formData).forEach((key) => {
      if (key !== "agreeToTerms" && key !== "confirmPassword") {
        newTouched[key as keyof typeof touched] = true;
        const value = formData[key as keyof SignupFormData] as string;
        if (validateField(key, value) !== "") {
          hasErrors = true;
        }
      }
    });

    setTouched(newTouched);

    // Check confirm password separately
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (hasErrors) {
      setError("Please fix all errors before continuing");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms of Service");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        }),
      });

      const data: SignupResponse = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (data.errors && data.errors.length > 0) {
          throw new Error(data.errors[0].message);
        }
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      if (!data.success || !data.data) {
        throw new Error("Invalid response from server");
      }

      // Store the JWT token
      const { token, user } = data.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      setSuccess("Account created successfully! Redirecting...");

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);

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
            <UserPlus className="w-10 h-10 text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create User Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign up to ask questions, bookmark answers, and follow scholars
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-700 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-violet-700 dark:text-violet-300">
              {success}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${getFieldError("name")
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                    : isFieldValid("name")
                      ? "border-violet-300 dark:border-violet-700 focus:ring-violet-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-violet-500"
                  } bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white`}
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>
            {touched.name && getFieldError("name") && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {getFieldError("name")}
              </p>
            )}
          </div>

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
                onBlur={handleBlur}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${getFieldError("email")
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                    : isFieldValid("email")
                      ? "border-violet-300 dark:border-violet-700 focus:ring-violet-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-violet-500"
                  } bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white`}
                placeholder="your@email.com"
                disabled={loading}
              />
            </div>
            {touched.email && getFieldError("email") && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {getFieldError("email")}
              </p>
            )}
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
                onBlur={handleBlur}
                className={`w-full pl-10 pr-12 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${getFieldError("password")
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                    : isFieldValid("password")
                      ? "border-violet-300 dark:border-violet-700 focus:ring-violet-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-violet-500"
                  } bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white`}
                placeholder="Create a password (min 6 characters)"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                )}
              </button>
            </div>
            {touched.password && getFieldError("password") && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {getFieldError("password")}
              </p>
            )}
            {touched.password && !getFieldError("password") && formData.password.length > 0 && (
              <p className="mt-1 text-xs text-violet-600 dark:text-violet-400">
                ✓ Password meets requirements
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-12 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${getFieldError("confirmPassword")
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                    : isFieldValid("confirmPassword")
                      ? "border-violet-300 dark:border-violet-700 focus:ring-violet-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-violet-500"
                  } bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white`}
                placeholder="Confirm your password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                )}
              </button>
            </div>
            {touched.confirmPassword && getFieldError("confirmPassword") && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {getFieldError("confirmPassword")}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-violet-500 text-violet-600 bg-gray-50 dark:bg-gray-700"
                disabled={loading}
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="text-gray-700 dark:text-gray-300">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
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
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Create Account
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium"
              >
                Sign in here
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

export default Signup;