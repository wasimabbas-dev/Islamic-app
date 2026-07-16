// src/pages/Auth/Signup.tsx
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
  Phone,
  Calendar,
} from "lucide-react";

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: string;
  agreeToTerms: boolean;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    agreeToTerms: false,
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "fullName":
        return value.length >= 2
          ? ""
          : "Full name must be at least 2 characters";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Please enter a valid email address";
      case "password":
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Password must contain at least one uppercase letter";
        if (!/[a-z]/.test(value))
          return "Password must contain at least one lowercase letter";
        if (!/[0-9]/.test(value))
          return "Password must contain at least one number";
        return "";
      case "confirmPassword":
        return value === formData.password ? "" : "Passwords do not match";
      default:
        return "";
    }
  };

  const getFieldError = (name: string) => {
    const value = formData[name as keyof SignupFormData] as string;
    const isTouched = touched[name as keyof typeof touched];
    return isTouched ? validateField(name, value) : "";
  };

  const isFieldValid = (name: string) => {
    const value = formData[name as keyof SignupFormData] as string;
    const isTouched = touched[name as keyof typeof touched];
    return isTouched && validateField(name, value) === "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    const errors = Object.keys(formData).filter((key) => {
      if (key === "agreeToTerms") {
        return !formData.agreeToTerms;
      }
      const value = formData[key as keyof SignupFormData] as string;
      return validateField(key, value) !== "";
    });

    if (errors.length > 0) {
      setError("Please fix all errors before continuing");
      // Mark all fields as touched
      setTouched({
        fullName: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms of Service");
      return;
    }

    setLoading(true);

    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      if (existingUsers.some((user: any) => user.email === formData.email)) {
        setError("This email is already registered. Please login instead.");
        setLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        createdAt: new Date().toISOString(),
        role: "user",
        isVerified: false,
        preferences: {
          theme: "light",
          notifications: true,
          language: "en",
        },
      };

      // Save to localStorage
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Auto-login user
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
        }),
      );

      setSuccess("Account created successfully! Redirecting...");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/30 mb-4">
            <UserPlus className="w-10 h-10 text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join our community of Islamic knowledge seekers
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-700 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-violet-700 dark:text-violet-300">
                {success}
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
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
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                  getFieldError("fullName")
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                    : isFieldValid("fullName")
                      ? "border-violet-300 dark:border-violet-700 focus:ring-violet-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-violet-500"
                } bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white`}
                placeholder="Enter your full name"
              />
            </div>
            {touched.fullName && getFieldError("fullName") && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {getFieldError("fullName")}
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
                className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                  getFieldError("email")
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                    : isFieldValid("email")
                      ? "border-violet-300 dark:border-violet-700 focus:ring-violet-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-violet-500"
                } bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white`}
                placeholder="your@email.com"
              />
            </div>
            {touched.email && getFieldError("email") && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {getFieldError("email")}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-colors"
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Date of Birth (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-colors"
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
                onBlur={handleBlur}
                className={`w-full pl-10 pr-12 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                  getFieldError("password")
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                    : isFieldValid("password")
                      ? "border-violet-300 dark:border-violet-700 focus:ring-violet-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-violet-500"
                } bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white`}
                placeholder="Create a strong password"
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
            {touched.password && getFieldError("password") && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {getFieldError("password")}
              </p>
            )}
            {touched.password &&
              !getFieldError("password") &&
              formData.password.length > 0 && (
                <p className="mt-1 text-xs text-violet-600 dark:text-violet-400">
                  ✓ Strong password
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
                className={`w-full pl-10 pr-12 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                  getFieldError("confirmPassword")
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                    : isFieldValid("confirmPassword")
                      ? "border-violet-300 dark:border-violet-700 focus:ring-violet-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-violet-500"
                } bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
            className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20"
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
        </form>
      </div>
    </div>
  );
};

export default Signup;
