import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { fetchUserById, updateUser } from "../../api/usersApi";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import ConfirmModal from "../../components/ConfirmModal";

export function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [existing, setExisting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ fullName: "", phone: "" });
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { fieldErrors, generalError, isLoading, handleSubmit } = useFormHandler(
    (formData) => updateUser(id, formData),
    () => navigate("/admin/users"),
    ["fullName", "phone"]
  );

  useEffect(() => {
    const load = async () => {
      try {
        const user = await fetchUserById(id);
        setExisting(user);
        setForm({
          fullName: user?.fullName || user?.name || "",
          phone: user?.phone || user?.contactNumber || "",
        });
      } catch {
        setExisting(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-500">Loading user...</div>;
  if (!existing) return <div className="p-6 text-red-500">User not found.</div>;

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
      <h1 className="text-2xl font-bold text-[#4A362D] mb-6">Edit User</h1>

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
            placeholder="John Doe"
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
            placeholder="03001234567"
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

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#BC6034] text-white px-6 py-2 rounded-lg hover:bg-[#A0522D] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? "Saving..." : "Save"}
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
