import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { createMilestone, fetchMilestones } from "../../api/experienceApi";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import ConfirmModal from "../../components/ConfirmModal";
import { validateYearPeriod } from "../../../../utils/validators";

const ICON_OPTIONS = [
  "GraduationCap",
  "Award",
  "Briefcase",
  "Users2",
  "Globe",
  "Heart",
  "Sparkles",
  "TrendingUp",
  "Brain",
  "Star",
  "Target",
  "BookOpen",
];

export function ExperienceCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    year: "",
    title: "",
    description: "",
    icon: "Award",
    displayOrder: "",
  });
  const [existingOrderStrings, setExistingOrderStrings] = useState([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [nextOrder, setNextOrder] = useState(1);
  const [usedOrders, setUsedOrders] = useState([]);

  useEffect(() => {
    const getNextOrder = async () => {
      try {
        const list = await fetchMilestones();
        if (list && list.length > 0) {
          const orders = list.map((m) => parseInt(m.order || m.displayOrder, 10)).filter((n) => !isNaN(n));
          setUsedOrders(orders);
          const maxOrder = Math.max(...orders, 0);
          setNextOrder(maxOrder + 1);
        }
      } catch (err) {
        // Fallback to default
      }
    };
    getNextOrder();
  }, []);

  const { fieldErrors, generalError, isLoading, handleSubmit } = useFormHandler(
    async (formData) => {
      await createMilestone({
        ...formData,
        displayOrder: formData.displayOrder ? parseInt(formData.displayOrder, 10) : nextOrder,
      });
    },
    () => navigate("/admin/experience"),
    ["title", "year", "description", "displayOrder"],
    "Milestone added successfully!"
  );

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e) => {
    await handleSubmit(e, form, (formData) => {
      const errors = {};
      if (formData.title) {
        if (formData.title.length > 50) {
          errors.title = "Title cannot exceed 50 characters";
        }
        if (!/^[a-zA-Z\s]+$/.test(formData.title)) {
          errors.title = "Title can only contain letters and spaces";
        }
      }
      if (formData.year) {
        const yearError = validateYearPeriod(formData.year);
        if (yearError) {
          errors.year = yearError;
        }
      }
      if (formData.displayOrder) {
        const order = parseInt(formData.displayOrder, 10);
        if (order < 1 || order > 99) {
          errors.displayOrder = "Display Order must be between 1 and 99";
        } else if (usedOrders.includes(order)) {
          errors.displayOrder = "This display order is already in use by another milestone";
        }
      }
      if (formData.description && formData.description.length > 500) {
        errors.description = "Description cannot exceed 500 characters";
      }
      return errors;
    });
  };

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#4A362D]">New Milestone</h1>
        <p className="text-sm text-gray-500">
          Add a new entry to the Sanctuary Timeline on the About page
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow border border-gray-100 p-6 space-y-5"
      >

        {/* Title */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-gray-500">
              {form.title.length}/50
            </span>
          </div>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={isLoading}
            maxLength={50}
            placeholder="e.g. NLP Mastery & Training"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
              fieldErrors["title"]
                ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
            }`}
          />
          {fieldErrors["title"] && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors["title"]}</p>
          )}
        </div>

        {/* Year & Order row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year / Period <span className="text-red-500">*</span>
            </label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Enter a year (2015) or range (2010-2015, 2018-Present)"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                fieldErrors["year"]
                  ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
              }`}
            />
            {fieldErrors["year"] && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors["year"]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Order <span className="text-red-500">*</span>
            </label>
            <input
              name="displayOrder"
              type="number"
              value={form.displayOrder}
              onChange={handleChange}
              disabled={isLoading}
              placeholder={"e.g. " + nextOrder}
              min="1"
              max="99"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                fieldErrors["displayOrder"]
                  ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
              }`}
            />
            {fieldErrors["displayOrder"] && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors["displayOrder"]}</p>
            )}
          </div>
        </div>

        {/* Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Icon
          </label>
          <select
            name="icon"
            value={form.icon}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
          >
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-gray-500">
              {form.description.length}/500
            </span>
          </div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            disabled={isLoading}
            rows={4}
            maxLength={500}
            placeholder="Brief description of this milestone..."
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition resize-none ${
              fieldErrors["description"]
                ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
            }`}
          />
          {fieldErrors["description"] && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors["description"]}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-[#BC6034] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#A35429] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Adding..." : "Add Milestone"}
          </button>
          <button
            type="button"
            onClick={() => setIsCancelModalOpen(true)}
            className="flex-1 text-center py-2.5 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
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
          navigate("/admin/experience");
        }}
        onCancel={() => setIsCancelModalOpen(false)}
        confirmText="Discard Changes"
        cancelText="Keep Editing"
      />
    </div>
  );
}

