import { useState } from "react";
import { useNavigate } from "react-router";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import { getMediaUrl } from "../../../utils/cloudinary.js";

export function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(form.phone, form.password);
    setLoading(false);
    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center justify-center gap-3 mb-6">
          <img
            src={getMediaUrl('logo.png')}
            alt="No Mind Foundation"
            className="h-35 w-35 rounded-full object-cover shadow-md"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#4A362D]">
              NoMind Admin & Operator Login
            </h2>
            <p className="text-sm text-[#BC6034] font-semibold tracking-widest uppercase">
              No Mind Foundation
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#BC6034]"
              placeholder="e.g. 9876543210"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-[#BC6034]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#BC6034]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c.36.8 1.1 1.98 2.046 3.777C5.69 17.438 8.15 19.5 12 19.5c3.85 0 6.31-2.062 8.02-3.723.947-1.799 1.686-2.977 2.046-3.777a10.477 10.477 0 0 0-2.046-3.777C18.31 6.562 15.85 4.5 12 4.5c-3.85 0-6.31 2.062-8.02 3.723ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c.36.8 1.1 1.98 2.046 3.777C5.69 17.438 8.15 19.5 12 19.5c3.85 0 6.31-2.062 8.02-3.723.947-1.799 1.686-2.977 2.046-3.777M6.228 6.228 17.772 17.772M9.88 9.88a3 3 0 1 0 4.24 4.24M6.228 6.228 17.772 17.772"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#BC6034] text-white py-2 rounded-lg hover:bg-[#A0522D] transition font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
