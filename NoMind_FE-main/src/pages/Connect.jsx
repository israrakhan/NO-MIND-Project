import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router";
import { submitInquiry } from "../modules/public/api/publicApi.js";

const INTEREST_LABELS = {
  nlp: "NLP Practitioner Certification",
  meditation: "Mindfulness & Meditation Immersion",
  leadership: "Leadership & Communication Mastery",
  youth: "Youth Empowerment Workshop",
  corporate: "Custom Corporate Program",
  other: "Other / General Inquiry",
};

export function Connect() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: location.state?.programTitle ? "other" : "",
    otherInterest: location.state?.programTitle || "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      const trimmed = value.trim();
      if (!trimmed) {
        error = "Full Name is required.";
      } else if (!/^[a-zA-Z\s\-.']{2,50}$/.test(trimmed)) {
        error = "Name must be 2-50 characters and contain only valid characters.";
      }
    }
    if (name === "email") {
      const trimmed = value.trim();
      if (!trimmed) {
        error = "Email address is required.";
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
        error = "Please enter a valid email address.";
      }
    }
    if (name === "phone") {
      const trimmed = value.trim();
      if (!trimmed) {
        error = "Phone number is required.";
      } else if (!/^[0-9]{10}$/.test(trimmed)) {
        error = "Please enter a valid 10-digit phone number.";
      }
    }
    if (name === "interest") {
      if (!value) {
        error = "Please select an area of interest.";
      }
    }
    if (name === "otherInterest") {
      // Note: formData state might be slightly behind during handleChange, 
      // but in handleSubmit it will be correct. We'll use the passed value.
      if (!value.trim()) {
        error = "Please specify your interest.";
      }
    }
    if (name === "message") {
      const trimmed = value.trim();
      if (!trimmed) {
        error = "Message is required.";
      } else if (trimmed.length < 10) {
        error = "Message must be at least 10 characters long.";
      }
    }
    return error;
  };



  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      // Only validate otherInterest if interest is 'other'
      if (key === "otherInterest" && formData.interest !== "other") {
        return;
      }
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const interestLabel =
        formData.interest === "other"
          ? formData.otherInterest.trim() || INTEREST_LABELS.other
          : INTEREST_LABELS[formData.interest] || formData.interest;

      await submitInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        interest: interestLabel,
        subject: `Interest: ${interestLabel}`,
        message: formData.message.trim(),
      });

      setSubmitted(true);

      // Format and open WhatsApp chat with Admin
      const adminPhone = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || "919876543210";
      let cleanAdminPhone = adminPhone.replace(/\D/g, "");
      if (cleanAdminPhone.length === 10) {
        cleanAdminPhone = `91${cleanAdminPhone}`;
      }

      const waText =
        `*New Inquiry from Website*\n\n` +
        `*Name:* ${formData.name.trim()}\n` +
        `*Email:* ${formData.email.trim()}\n` +
        `*Phone:* ${formData.phone.trim()}\n` +
        `*Interest:* ${interestLabel}\n` +
        `*Message:* ${formData.message.trim()}`;

      const encodedMessage = encodeURIComponent(waText);
      const waUrl = `https://wa.me/${cleanAdminPhone}?text=${encodedMessage}`;

      window.open(waUrl, "_blank", "noopener,noreferrer");

      setFormData({ name: "", email: "", phone: "", interest: "", otherInterest: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      const errorMsg = error.message || "Failed to submit message. Please try again.";

      // Attempt to map backend validation errors (e.g., "phone: Phone Required") to frontend fields
      if (typeof errorMsg === 'string' && errorMsg.includes(':')) {
        const parts = errorMsg.split(':');
        const fieldName = parts[0].trim().toLowerCase();
        const fieldError = parts.slice(1).join(':').trim();

        // If the backend error prefix matches one of our form fields, show it under that field
        if (Object.keys(formData).includes(fieldName)) {
          setErrors(prev => ({ ...prev, [fieldName]: fieldError }));
          return;
        }
      }

      setSubmitError(errorMsg);
    } finally {
      setSubmitting(false);
    }
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
    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };
      if (name === "interest" && value !== "other") {
        updated.otherInterest = "";
      }
      return updated;
    });

    // Validate on the fly
    const error = validateField(name, newValue);
    setErrors((prev) => {
      const updated = { ...prev, [name]: error };
      if (name === "interest" && value !== "other") {
        delete updated.otherInterest;
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section with Form on Right */}
      <section className="relative pt-8 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 lg:items-center items-start">

          {/* Left Column Text */}
          <div className="lg:col-span-5 z-10 lg:pr-8">
            <span className="font-label-caps text-label-caps text-secondary mb-4 block font-bold tracking-widest uppercase">
              LET'S CONNECT
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6 leading-tight font-bold">
              Begin Your <span className="text-secondary italic">Journey</span>.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              Every transformation begins with a conversation. Reach out and let's explore how we can support your growth and realization.
            </p>

            <div className="flex flex-col gap-4">
              <a href="tel:+919876543210" className="flex items-center gap-4 bg-surface-tan px-6 py-4 rounded-xl border border-outline-variant/20 shadow-sm hover:border-secondary/30 transition-colors cursor-pointer group">
                <Phone className="w-5 h-5 text-secondary" />
                <div className="text-left">
                  <div className="font-label-caps text-label-caps text-secondary uppercase">Call Us</div>
                  <div className="font-body-md font-semibold text-primary mt-1 group-hover:text-secondary transition-colors">+91 98765 43210</div>
                </div>
              </a>

              <a href="mailto:info@nomindfoundation.org" className="flex items-center gap-4 bg-surface-tan px-6 py-4 rounded-xl border border-outline-variant/20 shadow-sm hover:border-secondary/30 transition-colors cursor-pointer group">
                <Mail className="w-5 h-5 text-secondary" />
                <div className="text-left">
                  <div className="font-label-caps text-label-caps text-secondary uppercase">Email Us</div>
                  <div className="font-body-md font-semibold text-primary mt-1 group-hover:text-secondary transition-colors">info@nomindfoundation.org</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column Form (Replacing the Zen Garden Image) */}
          <div className="lg:col-span-7 z-10 w-full mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-[2rem] shadow-xl border border-outline-variant/20 p-8 md:p-12"
            >
              <h2 className="font-headline-md text-headline-md text-primary mb-8 font-bold">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-label-caps text-xs text-primary mb-2 uppercase font-bold tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full bg-surface-tan/30 border rounded-xl px-4 py-3.5 font-body-md text-sm md:text-base text-on-surface focus:outline-none focus:ring-1 transition-all placeholder:text-on-surface-variant/50 ${errors.name ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-outline-variant/50 focus:ring-secondary focus:border-secondary"
                        }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs mt-1 block font-medium">{errors.name}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-label-caps text-xs text-primary mb-2 uppercase font-bold tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full bg-surface-tan/30 border rounded-xl px-4 py-3.5 font-body-md text-sm md:text-base text-on-surface focus:outline-none focus:ring-1 transition-all placeholder:text-on-surface-variant/50 ${errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-outline-variant/50 focus:ring-secondary focus:border-secondary"
                        }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs mt-1 block font-medium">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block font-label-caps text-xs text-primary mb-2 uppercase font-bold tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full bg-surface-tan/30 border rounded-xl px-4 py-3.5 font-body-md text-sm md:text-base text-on-surface focus:outline-none focus:ring-1 transition-all placeholder:text-on-surface-variant/50 ${errors.phone ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-outline-variant/50 focus:ring-secondary focus:border-secondary"
                        }`}
                      placeholder="e.g. 9876543210"
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-xs mt-1 block font-medium">{errors.phone}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="interest" className="block font-label-caps text-xs text-primary mb-2 uppercase font-bold tracking-wider">
                      Area of Interest *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                      className={`w-full bg-surface-tan/30 border rounded-xl px-4 py-3.5 font-body-md text-sm md:text-base text-on-surface focus:outline-none focus:ring-1 transition-all ${errors.interest ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-outline-variant/50 focus:ring-secondary focus:border-secondary"
                        }`}
                    >
                      <option value="">Select a program</option>
                      <option value="nlp">NLP Practitioner Certification</option>
                      <option value="meditation">Mindfulness & Meditation Immersion</option>
                      <option value="leadership">Leadership & Communication Mastery</option>
                      <option value="youth">Youth Empowerment Workshop</option>
                      <option value="corporate">Custom Corporate Program</option>
                      <option value="other">Other / General Inquiry</option>
                    </select>
                    {errors.interest && (
                      <span className="text-red-500 text-xs mt-1 block font-medium">{errors.interest}</span>
                    )}
                  </div>
                </div>

                {formData.interest === "other" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <label htmlFor="otherInterest" className="block font-label-caps text-xs text-primary mb-2 uppercase mt-6 font-bold tracking-wider">
                      Please specify *
                    </label>
                    <input
                      type="text"
                      id="otherInterest"
                      name="otherInterest"
                      value={formData.otherInterest}
                      onChange={handleChange}
                      required
                      className={`w-full bg-surface-tan/30 border rounded-xl px-4 py-3.5 font-body-md text-sm text-on-surface focus:outline-none focus:ring-1 transition-all placeholder:text-on-surface-variant/50 ${errors.otherInterest ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-outline-variant/50 focus:ring-secondary focus:border-secondary"
                        }`}
                      placeholder="Describe your area of interest..."
                    />
                    {errors.otherInterest && (
                      <span className="text-red-500 text-xs mt-1 block font-medium">{errors.otherInterest}</span>
                    )}
                  </motion.div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="message" className="block font-label-caps text-xs text-primary uppercase font-bold tracking-wider">
                      Your Message *
                    </label>
                    <span className="text-[11px] font-semibold text-on-surface-variant/60 font-body-md select-none">
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={255}
                    rows={5}
                    className={`w-full bg-surface-tan/30 border rounded-xl px-4 py-3.5 font-body-md text-sm md:text-base text-on-surface focus:outline-none focus:ring-1 transition-all resize-none placeholder:text-on-surface-variant/50 ${errors.message ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-outline-variant/50 focus:ring-secondary focus:border-secondary"
                      }`}
                    placeholder="Tell us about your journey..."
                  />
                  {errors.message && (
                    <span className="text-red-500 text-xs mt-1 block font-medium">{errors.message}</span>
                  )}
                </div>

                {submitted && (
                  <div className="bg-secondary/10 border border-secondary/20 text-secondary rounded-xl px-5 py-4 font-body-md text-sm font-semibold flex items-center gap-3">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    Thank you! We received your message and will connect with you soon.
                  </div>
                )}
                {submitError && (
                  <div className="bg-error/10 border border-error/20 text-error rounded-xl px-5 py-4 font-body-md text-sm font-semibold flex items-center gap-3">
                    <span className="material-symbols-outlined text-base">error</span>
                    {submitError}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-white rounded-full font-label-caps text-sm uppercase hover:bg-secondary-container transition-all active:scale-[0.98] disabled:opacity-70 shadow-md hover:shadow-lg"
                  >
                    {submitting ? "SENDING..." : "SEND MESSAGE"} <Send size={16} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

        </div>

        {/* Decorative Blob */}
        <div className="absolute -right-20 top-20 w-64 h-64 bg-petal-pink/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      </section>

      {/* Centers Section */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface border-y border-outline-variant/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-container-max mx-auto"
        >
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-secondary mb-3 block uppercase">
              Our Locations
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Visit Our Centers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-gutter">
            <div className="bg-surface-tan rounded-3xl p-8 border border-outline-variant/20 hover:border-secondary/30 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-secondary mb-6 shadow-sm">
                <MapPin size={20} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3 font-bold">
                Main Center
              </h3>
              <p className="text-on-surface-variant font-body-md text-sm md:text-base mb-6 leading-relaxed">
                Our primary meditation and training center, hosting residential programs and workshops.
              </p>
              <p className="font-label-caps text-label-caps text-primary uppercase font-bold font-bold">New Delhi, India</p>
            </div>

            <div className="bg-surface rounded-3xl p-8 border border-outline-variant/20 hover:border-secondary/30 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-surface-tan rounded-full flex items-center justify-center text-secondary mb-6 shadow-sm">
                <Sparkles size={20} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3 font-bold">
                Corporate Hub
              </h3>
              <p className="text-on-surface-variant font-body-md text-sm md:text-base mb-6 leading-relaxed">
                A dedicated space for empowering organizational and leadership training programs.
              </p>
              <p className="font-label-caps text-label-caps text-primary uppercase font-bold">Gurugram, Haryana</p>
            </div>

            <div className="bg-surface-tan rounded-3xl p-8 border border-outline-variant/20 hover:border-secondary/30 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-secondary mb-6 shadow-sm">
                <Users size={20} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3 font-bold">
                Retreat Center
              </h3>
              <p className="text-on-surface-variant font-body-md text-sm md:text-base mb-6 leading-relaxed">
                Peaceful retreat location for immersive meditation programs and silence workshops.
              </p>
              <p className="font-label-caps text-label-caps text-primary uppercase font-bold">Rishikesh, Uttarakhand</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-container-low">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="font-label-caps text-sm sm:text-base text-secondary mb-3 block uppercase tracking-widest font-bold">
              FAQ
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/10">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3 font-bold">
                Do I need prior experience in meditation or NLP?
              </h3>
              <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed">
                Not at all! Our programs are designed for all levels, from complete beginners to advanced practitioners. We meet you where you are.
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/10">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3 font-bold">
                Are programs available online?
              </h3>
              <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed">
                Yes, we offer hybrid options for many programs. While we believe in-person immersion is most transformative, we understand modern needs and provide online alternatives.
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/10">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3 font-bold">
                How do I choose the right program?
              </h3>
              <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed">
                Reach out to us! We offer free consultation calls to understand your journey and recommend the most suitable path for your growth.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
