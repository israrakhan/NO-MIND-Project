import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { createUser } from "../../api/usersApi";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import ConfirmModal from "../../components/ConfirmModal";

export function UserCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    phone: "",
    fullName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { fieldErrors, generalError, isLoading, handleSubmit } = useFormHandler(
    (formData) => createUser(formData),
    () => navigate("/admin/users"),
    ["fullName", "phone", "password"]
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    await handleSubmit(e, form, (formData) => {
      const errors = {};
      const phoneCleaned = (formData.phone || "").replace(/\D/g, "");
      if (phoneCleaned.length < 10 || phoneCleaned.length > 15) {
        errors.phone = "Phone number must be between 10 and 15 digits";
      }
      return errors;
    });
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold text-[#4A362D] mb-6">New User</h1>

      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow-sm p-6 space-y-4"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            disabled={isLoading}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
              fieldErrors.fullName
                ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
            }`}
          />
          {fieldErrors.fullName && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            disabled={isLoading}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
              fieldErrors.phone
                ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
            }`}
          />
          {fieldErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={isLoading}
              className={`w-full border rounded-lg pl-4 pr-12 py-2 focus:outline-none focus:ring-2 transition ${
                fieldErrors.password
                  ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#BC6034] focus:outline-none cursor-pointer"
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
          {fieldErrors.password && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#BC6034] text-white px-6 py-2 rounded-lg hover:bg-[#A0522D] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
          <button
            type="button"
            onClick={() => setIsCancelModalOpen(true)}
            disabled={isLoading}
            className="border border-gray-300 px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>

      <ConfirmModal
        isOpen={isCancelModalOpen}
        title="Confirm Cancel"
        message="Are you sure you want to cancel? Any unsaved changes will be lost."
        onConfirm={() => {
          setIsCancelModalOpen(false);
          navigate("/admin/users");
        }}
        onCancel={() => setIsCancelModalOpen(false)}
        confirmText="Discard Changes"
        cancelText="Keep Editing"
      />
    </div>
  );
}
