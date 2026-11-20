import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, HeartHandshake, Mail, Eye } from 'lucide-react';

export default function Accessibility() {
  return (
    <div className="bg-surface pt-4 md:pt-8 pb-16 md:pb-24 px-margin-mobile md:px-margin-desktop select-text">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary font-label-caps text-xs tracking-widest uppercase font-bold rounded-full mb-2">
            <Eye size={14} /> Accessibility
          </div>
          <h1 className="font-display-lg text-3xl md:text-5xl text-primary font-bold tracking-tight leading-tight">
            Accessibility Statement
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
            No Mind Foundation is committed to providing a digital environment that is accessible, inclusive, and welcoming to all individuals.
          </p>
        </div>

        {/* Content Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-10 shadow-sm space-y-8"
        >
          {/* Commitment Section */}
          <section className="space-y-4">
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold flex items-center gap-3">
              <HeartHandshake className="text-secondary" size={24} />
              Our Commitment
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed pl-9">
              We believe that the internet should be available and accessible to anyone, and are committed to providing a website that is accessible to the widest possible audience, regardless of circumstance and ability. We actively work to align our digital experiences with the Web Content Accessibility Guidelines (WCAG 2.1, Level AA).
            </p>
          </section>

          {/* Standards & Guidelines */}
          <section className="space-y-4">
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold flex items-center gap-3">
              <ShieldCheck className="text-secondary" size={24} />
              Conformance Standards
            </h2>
            <div className="text-on-surface-variant text-sm md:text-base leading-relaxed pl-9 space-y-3">
              <p>
                To achieve accessibility, we test and improve our platforms using best practices including:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Keyboard Navigation:</strong> Standard navigation commands can be used to navigate the site without a pointer cursor.</li>
                <li><strong>Alt Text & Semantics:</strong> Providing text alternatives for media and images to assist screen-reader software.</li>
                <li><strong>Clear Visual Contrast:</strong> Ensuring text contrast meets or exceeds the WCAG standards for comfortable viewing.</li>
                <li><strong>Responsive Scale:</strong> Supporting browser zooming up to 200% without breaking layouts.</li>
              </ul>
            </div>
          </section>

          {/* Contact Support */}
          <section className="space-y-4 pt-4 border-t border-outline-variant/20">
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold flex items-center gap-3">
              <Mail className="text-secondary" size={24} />
              Feedback & Assistance
            </h2>
            <div className="text-on-surface-variant text-sm md:text-base leading-relaxed pl-9 space-y-3">
              <p>
                We are constantly working to improve our website. If you encounter any accessibility barriers or have suggestions for improvements, please reach out directly:
              </p>
              <div className="mt-4 p-4 bg-surface-tan/30 border border-outline-variant/20 rounded-xl max-w-max">
                <p className="font-semibold text-primary">No Mind Support Team</p>
                <a href="mailto:contact@nomind.org" className="text-secondary hover:underline font-bold text-sm block mt-1">
                  contact@nomind.org
                </a>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
