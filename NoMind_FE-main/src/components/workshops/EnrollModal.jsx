import { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { submitEnrollment } from '../../modules/public/api/publicApi.js';
import { toast } from 'sonner';

export default function EnrollModal({ program, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    ageGroup: "",
    occupation: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);


  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "name") {
      const trimmed = value.trim();
      if (!trimmed) {
        errorMsg = "Full Name is required.";
      } else if (!/^[a-zA-Z\s'-]{2,50}$/.test(trimmed)) {
        errorMsg = "Name must be between 2 and 50 alphabetic characters.";
      }
    }
    if (name === "email") {
      const trimmed = value.trim();
      if (!trimmed) {
        errorMsg = "Email address is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        errorMsg = "Please enter a valid email address.";
      }
    }
    if (name === "phone") {
      const trimmed = value.trim();
      const digits = trimmed.replace(/\D/g, "");
      if (!trimmed) {
        errorMsg = "Phone number is required.";
      } else if (digits.length < 10 || digits.length > 15 || !/^\d+$/.test(trimmed)) {
        errorMsg = "Please enter a valid numeric phone number (10-15 digits).";
      }
    }
    if (name === "ageGroup") {
      if (!value) {
        errorMsg = "Please select an age group.";
      }
    }
    if (name === "occupation") {
      const trimmed = value.trim();
      if (!trimmed) {
        errorMsg = "Occupation is required.";
      } else if (!/^[a-zA-Z\s]{2,50}$/.test(trimmed)) {
        errorMsg = "Occupation must be 2-50 characters and contain only letters.";
      }
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "name") {
      newValue = value.replace(/[^a-zA-Z\s'-]/g, "").slice(0, 50);
    }
    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 15);
    }
    setForm({ ...form, [name]: newValue });
    
    // Validate on the fly
    const errorMsg = validateField(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const errorMsg = validateField(key, form[key]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    try {
      await submitEnrollment({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        ageGroup: form.ageGroup,
        occupation: form.occupation.trim(),
        message: form.message.trim(),
        program: program.title,
        programId: typeof program.id === "number" ? program.id : null,
      });
      setSubmitted(true);
    } catch (submitError) {
      const backendMessage = submitError.response?.data?.message;
      toast.error(backendMessage || submitError.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-surface rounded-[2rem] shadow-2xl w-full max-w-md z-10 flex flex-col max-h-[85vh] overflow-hidden border border-outline-variant/30"
      >
        <div className="bg-primary px-5 pt-6 pb-4 md:px-8 md:pt-8 md:pb-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-on-primary/70 hover:text-on-primary transition-colors bg-white/10 p-1.5 rounded-full backdrop-blur-sm"
          >
            <X size={18} />
          </button>
          <p className="text-petal-pink font-label-caps text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-1 font-bold">
            Enroll Now
          </p>
          <h2 className="text-on-primary font-headline-sm text-xl md:text-2xl font-bold leading-tight pr-6">
            {program.title}
          </h2>
        </div>
        <div className="px-5 pt-5 pb-16 md:px-8 md:py-6 overflow-y-auto custom-scrollbar flex-grow" data-lenis-prevent>
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-secondary text-3xl">check_circle</span>
              </div>
              <h3 className="font-headline-sm text-primary text-xl font-bold mb-3">Request Sent!</h3>
              <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
                Thank you, <strong className="text-primary">{form.name}</strong>. We'll reach out to you at <strong className="text-primary">{form.email}</strong> shortly to confirm your booking.
              </p>
              <button onClick={onClose} className="w-full py-3.5 bg-secondary text-on-secondary rounded-full text-sm font-label-caps font-bold tracking-wide hover:bg-primary transition-colors active:scale-[0.98]">
                RETURN
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">

              <div>
                <label className="block text-xs font-label-caps font-bold text-primary mb-1.5 uppercase tracking-wider">Full Name *</label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  placeholder="Your full name" 
                  className={`w-full bg-surface-tan/30 border rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-1 transition-all placeholder:text-on-surface-variant/50 ${
                    errors.name ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-outline-variant/50 focus:ring-secondary focus:border-secondary"
                  }`} 
                />
                {errors.name && (
                  <span className="text-red-500 text-[11px] mt-1 block font-medium">{errors.name}</span>
                )}
              </div>
              <div>
                <label className="block text-xs font-label-caps font-bold text-primary mb-1.5 uppercase tracking-wider">Email Address *</label>
                <input 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="you@example.com" 
                  className={`w-full bg-surface-tan/30 border rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-1 transition-all placeholder:text-on-surface-variant/50 ${
                    errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-outline-variant/50 focus:ring-secondary focus:border-secondary"
                  }`} 
                />
                {errors.email && (
                  <span className="text-red-500 text-[11px] mt-1 block font-medium">{errors.email}</span>
                )}
              </div>
              <div>
                <label className="block text-xs font-label-caps font-bold text-primary mb-1.5 uppercase tracking-wider">Phone Number *</label>
                <input 
                  name="phone" 
                  type="tel" 
                  value={form.phone} 
                  onChange={handleChange} 
                  placeholder="e.g. 9876543210" 
                  className={`w-full bg-surface-tan/30 border rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-1 transition-all placeholder:text-on-surface-variant/50 ${
                    errors.phone ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-outline-variant/50 focus:ring-secondary focus:border-secondary"
                  }`} 
                />
                {errors.phone && (
                  <span className="text-red-500 text-[11px] mt-1 block font-medium">{errors.phone}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label-caps font-bold text-primary mb-1.5 uppercase tracking-wider">Age Group *</label>
                  <select 
                    name="ageGroup" 
                    value={form.ageGroup} 
                    onChange={handleChange} 
                    className={`w-full bg-surface-tan/30 border rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-1 transition-all ${
                      errors.ageGroup ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-outline-variant/50 focus:ring-secondary focus:border-secondary"
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Under 18">Under 18</option>
                    <option value="18-25">18 – 25</option>
                    <option value="26-35">26 – 35</option>
                    <option value="36-45">36 – 45</option>
                    <option value="46-60">46 – 60</option>
                    <option value="60+">60+</option>
                  </select>
                  {errors.ageGroup && (
                    <span className="text-red-500 text-[11px] mt-1 block font-medium">{errors.ageGroup}</span>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-label-caps font-bold text-primary mb-1.5 uppercase tracking-wider">Occupation *</label>
                  <input 
                    name="occupation" 
                    value={form.occupation} 
                    onChange={handleChange} 
                    placeholder="e.g. Teacher" 
                    className={`w-full bg-surface-tan/30 border rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-1 transition-all placeholder:text-on-surface-variant/50 ${
                      errors.occupation ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-outline-variant/50 focus:ring-secondary focus:border-secondary"
                    }`} 
                  />
                  {errors.occupation && (
                    <span className="text-red-500 text-[11px] mt-1 block font-medium">{errors.occupation}</span>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-label-caps font-bold text-primary mb-1.5 uppercase tracking-wider">Message (optional)</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={2} placeholder="Any questions or specific requirements..." className="w-full bg-surface-tan/30 border border-outline-variant/50 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-all resize-none placeholder:text-on-surface-variant/50" />
              </div>
              <div className="flex gap-3 pt-4 border-t border-outline-variant/20 mt-2">
                <button type="button" onClick={onClose} className="flex-1 border border-outline-variant text-primary py-3.5 rounded-full text-xs font-label-caps font-bold tracking-wide hover:bg-surface-tan transition-colors active:scale-[0.98]">
                  CANCEL
                </button>
                <button type="submit" className="flex-[1.5] bg-secondary text-on-secondary py-3.5 rounded-full text-xs font-label-caps font-bold tracking-wide hover:bg-primary transition-colors active:scale-[0.98] shadow-md">
                  ENROLL
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
