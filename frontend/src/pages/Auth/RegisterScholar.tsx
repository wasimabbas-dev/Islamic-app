import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User, Lock, Eye, EyeOff, GraduationCap,
  CheckCircle, AlertCircle, Phone, BookOpen, Award,
  Briefcase, FileText, Shield
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ScholarFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  qualification: string;
  specialization: string;
  experience: string;
  bio: string;
  sanadUrl: string;
  agreeToTerms: boolean;
}

const RegisterScholar: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<ScholarFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    qualification: "",
    specialization: "",
    experience: "",
    bio: "",
    sanadUrl: "",
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms of Service");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register-scholar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          qualification: formData.qualification,
          specialization: formData.specialization,
          experience: formData.experience,
          bio: formData.bio,
          sanadUrl: formData.sanadUrl || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess(
        "Your scholar application has been submitted successfully! " +
        "The admin team will review your credentials. " +
        "You will be notified once approved. This usually takes 24-48 hours."
      );

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
            <GraduationCap className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Apply as a Scholar
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join our platform as a verified Hanafi Fiqh scholar. 
            Your application will be reviewed by our admin team.
          </p>
          
          {/* Info Box */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl text-left">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>⚠️ Important:</strong> This registration is for scholars only. 
              Your credentials will be verified before approval. 
              <br />
              <Link to="/signup" className="underline font-medium">
                Click here for regular user registration
              </Link>
            </p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-700 dark:text-emerald-300">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          
          {/* Section: Personal Information */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                placeholder="Your full name with title (e.g., Mufti Abdullah)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password *
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                placeholder="Min 6 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                placeholder="Confirm your password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                  placeholder="+1234567890"
                />
              </div>
            </div>
          </div>

          {/* Section: Qualifications */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Qualifications & Expertise
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Highest Qualification *
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
              placeholder="e.g., PhD in Islamic Jurisprudence, Al-Azhar University"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Area of Specialization *
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
              placeholder="e.g., Hanafi Fiqh, Hadith Studies, Islamic Finance"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Years of Experience *
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
              placeholder="e.g., 15 years of teaching at Darul Uloom"
            />
          </div>

          {/* Section: Bio & Documents */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Biography & Documents
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Detailed Biography *
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
              placeholder="Describe your qualifications, teaching experience, publications, and areas of expertise in detail (minimum 50 characters)..."
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.bio.length}/50 minimum characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Sanad/Certificate URL
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="url"
                name="sanadUrl"
                value={formData.sanadUrl}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                placeholder="https://example.com/your-sanad-certificate.pdf"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Upload your sanad/certificate to a file sharing service and provide the link
            </p>
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-1 border border-gray-300 rounded focus:ring-emerald-500 text-emerald-600"
            />
            <label className="ml-3 text-sm text-gray-700 dark:text-gray-300">
              I confirm that all information provided is accurate and I agree to the{" "}
              <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-emerald-600 hover:underline">Scholar Guidelines</a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <GraduationCap className="w-5 h-5" />
                Submit Scholar Application
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign in
              </Link>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Want to register as a regular user?{" "}
              <Link to="/signup" className="text-violet-600 hover:text-violet-700 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScholar;