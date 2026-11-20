import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { createBooking } from "../../api/bookingsApi";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import ConfirmModal from "../../components/ConfirmModal";

export const isValidClientName = (name) => {
  if (!name || typeof name !== "string") return false;
  const clean = name.trim();
  if (clean.length < 2 || clean.length > 50) return false;
  return /^[a-zA-Z\s'-]{2,50}$/.test(clean);
};

export function BookingCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    clientName: "",
    date: "",
    time: "",
    service: "",
    bookingType: "Individual",
    participants: "",
    ageGroup: "",
    occupation: "",
  });
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { fieldErrors, generalError, isLoading, handleSubmit } = useFormHandler(
    (formData) => createBooking({ ...formData, status: "pending" }),
    () => navigate("/admin/bookings"),
    ["clientName", "date", "time", "service"]
  );

  const validateBooking = (formData) => {
    const errors = {};
    const cleanName = (formData.clientName || "").trim();
    if (!cleanName) {
      errors.clientName = "Client Name is required.";
    } else if (!isValidClientName(cleanName)) {
      errors.clientName = "Client Name must contain only letters and spaces (min 2 characters, no numbers or special characters).";
    }

    if (formData.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.date);
      if (selectedDate < today) {
        errors.date = "Booking date cannot be in the past.";
      }
    }
    return errors;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "clientName") {
      value = value.replace(/[^a-zA-Z\s'-]/g, "").slice(0, 50);
    }
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e) => {
    await handleSubmit(e, form, validateBooking);
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold text-[#4A362D] mb-6">
        New Custom Booking
      </h1>

      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow-sm p-6 space-y-4"
      >
        {/* Client Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Enter client name"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
              fieldErrors["clientName"]
                ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
            }`}
          />
          {fieldErrors["clientName"] && (
            <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors["clientName"]}</p>
          )}
        </div>

        {/* Date & Time row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Appointment <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              disabled={isLoading}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
                fieldErrors["date"]
                  ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500 text-red-900"
                  : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
              }`}
            />
            {fieldErrors["date"] && (
              <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors["date"]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
                fieldErrors["time"]
                  ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
              }`}
            />
            {fieldErrors["time"] && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors["time"]}</p>
            )}
          </div>
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="service"
            value={form.service}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="e.g. NLP Session"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition ${
              fieldErrors["service"]
                ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
            }`}
          />
          {fieldErrors["service"] && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors["service"]}</p>
          )}
        </div>

        {/* Booking Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Booking Type
          </label>
          <select
            name="bookingType"
            value={form.bookingType}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#BC6034]/40 focus:border-[#BC6034] bg-white"
          >
            <option value="Individual">Individual</option>
            <option value="Group">Group</option>
          </select>
        </div>

        {/* No. of Participants — only for Group */}
        {form.bookingType === "Group" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              No. of Participants
            </label>
            <input
              type="number"
              name="participants"
              value={form.participants}
              onChange={handleChange}
              disabled={isLoading}
              min="2"
              placeholder="Enter number of participants"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
            />
          </div>
        )}

        {/* Age Group & Occupation row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age Group
            </label>
            <select
              name="ageGroup"
              value={form.ageGroup}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#BC6034]/40 focus:border-[#BC6034] bg-white"
            >
              <option value="">Select age group</option>
              <option value="Under 18">Under 18</option>
              <option value="18-25">18 – 25</option>
              <option value="26-35">26 – 35</option>
              <option value="36-45">36 – 45</option>
              <option value="46-60">46 – 60</option>
              <option value="60+">60+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="e.g. Teacher, Engineer"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#BC6034] text-white px-6 py-2 rounded-lg hover:bg-[#A0522D] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
          <button
            type="button"
            onClick={() => setIsCancelModalOpen(true)}
            disabled={isLoading}
            className="border border-gray-300 px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
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
          navigate("/admin/bookings");
        }}
        onCancel={() => setIsCancelModalOpen(false)}
        confirmText="Discard Changes"
        cancelText="Keep Editing"
      />
    </div>
  );
}
