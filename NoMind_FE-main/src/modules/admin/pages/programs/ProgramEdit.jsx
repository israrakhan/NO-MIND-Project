import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { Upload, X } from "lucide-react";
import { fetchProgramById, updateProgram, fetchAllPrograms } from "../../api/programsApi";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import { API_BASE_URL } from "../../../../api/httpClient";
import { isValidTitle, isValidAudienceType } from "./ProgramCreate";
import ConfirmModal from "../../components/ConfirmModal";
import { validateDuration } from "../../../../utils/validators";

const ICON_OPTIONS = [
  "Brain",
  "Users",
  "Target",
  "Award",
  "BookOpen",
  "GraduationCap",
  "Sparkles",
  "Clock",
  "Heart",
  "Star",
];

export function ProgramEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [highlights, setHighlights] = useState([""]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [notFound, setNotFound] = useState(false);

  const { fieldErrors, generalError, isLoading, handleSubmit } = useFormHandler(
    async (formData) => {
      const cleanHighlights = [...new Set(highlights.map((h) => h.trim()).filter(Boolean))];
      const { image, ...restForm } = formData;
      await updateProgram(
        id,
        { ...restForm, highlights: cleanHighlights },
        imageFile,
      );
    },
    () => navigate("/admin/programs"),
    ["title", "icon", "duration", "level", "date", "location", "description"],
  );

  useEffect(() => {
    const load = async () => {
      try {
        const program = await fetchProgramById(id);
        if (!program) {
          setNotFound(true);
          return;
        }
        setForm({
          title: program.title || "",
          icon: program.icon || "",
          duration: program.duration || "",
          level: program.level || "",
          description: program.description || "",
          image: program.image || "",
          date: program.date || "",
          location: program.location || "",
          eventStatus: program.eventStatus || "active",
        });
        setHighlights(
          program.highlights && program.highlights.length > 0
            ? program.highlights
            : [""],
        );
      } catch {
        setNotFound(true);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "level") {
      value = value.replace(/[^a-zA-Z\s'-]/g, "").slice(0, 50);
    }
    setForm({ ...form, [name]: value });
  };

  const handleHighlightChange = (index, value) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const addHighlight = () => setHighlights([...highlights, ""]);

  const removeHighlight = (index) => {
    if (highlights.length === 1) return;
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const getImageSrc = (image) => {
    if (!image) return null;
    if (image.startsWith("http://") || image.startsWith("https://"))
      return image;
    const path = image.startsWith("/") ? image : `/${image}`;
    return `${API_BASE_URL}${path}`;
  };

  const validateProgram = async (formData) => {
    const errors = {};
    const cleanTitle = (formData.title || "").trim();
    if (!cleanTitle) {
      errors.title = "Workshop title is required.";
    } else if (!isValidTitle(cleanTitle)) {
      errors.title = "Title must contain at least 2 letters and valid characters (no @, #, $, %, ^).";
    } else {
      try {
        const allPrograms = await fetchAllPrograms();
        const duplicate = allPrograms.some(
          (p) =>
            String(p.id) !== String(id) &&
            p.title &&
            p.title.trim().toLowerCase() === cleanTitle.toLowerCase()
        );
        if (duplicate) {
          errors.title = "A workshop with this title already exists.";
        }
      } catch (err) {
        console.error("Failed to check duplicate titles:", err);
      }
    }

    const cleanLevel = (formData.level || "").trim();
    if (cleanLevel && !isValidAudienceType(cleanLevel)) {
      errors.level = "Audience Type must contain only letters and spaces (no numbers or special characters).";
    }

    if (formData.description && formData.description.length > 1000) {
      errors.description = "Description cannot exceed 1000 characters.";
    }
    return errors;
  };

  const onSubmit = async (e) => {
    await handleSubmit(e, form, async (formData) => {
      const errors = await validateProgram(formData);
      
      const seenHighlights = new Set();
      highlights.forEach((h, index) => {
        const trimmedH = h.trim();
        if (!trimmedH) {
          errors[`highlight_${index}`] = "Cannot be empty";
        } else if (seenHighlights.has(trimmedH.toLowerCase())) {
          errors[`highlight_${index}`] = "Duplicate highlight";
        } else {
          seenHighlights.add(trimmedH.toLowerCase());
        }
      });

      if (formData.location) {
        const locationRegex = /^[A-Za-z0-9\s,.-]+$/;
        if (!locationRegex.test(formData.location) || !/[A-Za-z]/.test(formData.location)) {
          errors.location = "Please enter a valid location (e.g., 'Nagpur, Maharashtra, India').";
        }
      }

      if (formData.duration) {
        const durationError = validateDuration(formData.duration);
        if (durationError) errors.duration = durationError;
      }

      return errors;
    });
  };

  if (notFound) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Workshop not found.</p>
        <Link
          to="/admin/programs"
          className="text-[#BC6034] hover:underline text-sm mt-2 inline-block"
        >
          Back to Workshops
        </Link>
      </div>
    );
  }

  if (!form) return <div className="p-6 text-gray-400 text-sm">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#4A362D]">Edit Workshop</h1>
        <p className="text-sm text-gray-500">Update workshop details</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow border border-gray-100 p-6 space-y-5"
      >

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Workshop Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={isLoading}
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

        {/* Icon & Duration row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon <span className="text-red-500">*</span>
            </label>
            <select
              name="icon"
              value={form.icon}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                fieldErrors["icon"]
                  ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
              }`}
            >
              <option value="" disabled>Select Icon</option>
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
            {fieldErrors["icon"] && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors["icon"]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="e.g. 3 Months"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                fieldErrors["duration"]
                  ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
              }`}
            />
            {fieldErrors["duration"] && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors["duration"]}</p>
            )}
          </div>
        </div>

        {/* Level / Audience Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Audience Type <span className="text-red-500">*</span>
          </label>
          <input
            name="level"
            value={form.level}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="e.g. Beginner, Intermediate, All Levels"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
              fieldErrors["level"]
                ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500 text-red-900"
                : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
            }`}
          />
          {fieldErrors["level"] && (
            <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors["level"]}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                fieldErrors["date"]
                  ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
              }`}
            />
            {fieldErrors["date"] && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors["date"]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="e.g. Nagpur, Maharashtra, India"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                fieldErrors["location"]
                  ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
              }`}
            />
            {fieldErrors["location"] && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors["location"]}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <span
              className={`text-xs font-semibold ${
                form.description?.length > 1000 ? "text-red-500 font-bold" : "text-gray-400"
              }`}
            >
              {form.description?.length || 0} / 1000
            </span>
          </div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            disabled={isLoading}
            rows={4}
            placeholder="Brief description of this program..."
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition resize-none ${
              fieldErrors["description"]
                ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500 text-red-900"
                : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
            }`}
          />
          {fieldErrors["description"] && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {fieldErrors["description"]}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Program Image
          </label>
          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#BC6034] hover:bg-[#EEDCC8]/20 transition-colors p-4">
            <Upload className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-sm text-gray-500">Click to upload image</span>
            <span className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isLoading}
            />
          </label>
          {(imagePreview || form.image) && (
            <div className="mt-2 relative">
              <img
                src={imagePreview || getImageSrc(form.image)}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => {
                  if (imagePreview) {
                    setImageFile(null);
                    setImagePreview("");
                  } else {
                    setForm({ ...form, image: "" });
                  }
                }}
                disabled={isLoading}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 disabled:opacity-50"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Highlights */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Highlights
            </label>
            <button
              type="button"
              onClick={addHighlight}
              disabled={isLoading}
              className="text-xs text-[#BC6034] hover:underline disabled:opacity-50"
            >
              + Add Highlight
            </button>
          </div>
          <div className="space-y-2">
            {highlights.map((h, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <input
                    value={h}
                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                    disabled={isLoading}
                    placeholder={`Highlight ${index + 1}`}
                    className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition disabled:bg-gray-50 ${
                      fieldErrors[`highlight_${index}`]
                        ? "border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500"
                        : "border-gray-300 focus:ring-[#BC6034]/40 focus:border-[#BC6034]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    disabled={highlights.length === 1 || isLoading}
                    className="text-red-400 hover:text-red-600 disabled:opacity-30 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
                {fieldErrors[`highlight_${index}`] && (
                  <p className="text-red-500 text-xs">{fieldErrors[`highlight_${index}`]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-[#BC6034] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#A35429] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save Changes"}
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
          navigate("/admin/programs");
        }}
        onCancel={() => setIsCancelModalOpen(false)}
        confirmText="Discard Changes"
        cancelText="Keep Editing"
      />
    </div>
  );
}
