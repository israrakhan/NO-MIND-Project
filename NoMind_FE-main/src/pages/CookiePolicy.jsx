import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Info, Mail, Settings } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <div className="bg-surface pt-4 md:pt-8 pb-16 md:pb-24 px-margin-mobile md:px-margin-desktop select-text">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary font-label-caps text-xs tracking-widest uppercase font-bold rounded-full mb-2">
            <Info size={14} /> Policies
          </div>
          <h1 className="font-display-lg text-3xl md:text-5xl text-primary font-bold tracking-tight leading-tight">
            Cookie Policy
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
            This Cookie Policy explains how No Mind Foundation uses cookies and similar technologies to recognize you when you visit our website.
          </p>
        </div>

        {/* Content Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-10 shadow-sm space-y-8"
        >
          {/* What are Cookies Section */}
          <section className="space-y-4">
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold flex items-center gap-3">
              <Info className="text-secondary" size={24} />
              What Are Cookies?
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed pl-9">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
          </section>

          {/* How We Use Cookies */}
          <section className="space-y-4">
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold flex items-center gap-3">
              <ShieldCheck className="text-secondary" size={24} />
              How We Use Cookies
            </h2>
            <div className="text-on-surface-variant text-sm md:text-base leading-relaxed pl-9 space-y-3">
              <p>
                We use first-party and third-party cookies for several reasons:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as secure areas or authentication.</li>
                <li><strong>Analytics and Performance:</strong> These cookies collect information that is used in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are.</li>
                <li><strong>Preference Cookies:</strong> These cookies allow our website to remember choices you make (such as language preferences or system settings) to provide a more personalized experience.</li>
              </ul>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="space-y-4">
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold flex items-center gap-3">
              <Settings className="text-secondary" size={24} />
              How Can I Control Cookies?
            </h2>
            <div className="text-on-surface-variant text-sm md:text-base leading-relaxed pl-9 space-y-3">
              <p>
                You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
              </p>
              <p>
                Most browsers allow you to manage cookies through their settings. You can usually find these settings in the 'Options' or 'Preferences' menu of your browser.
              </p>
            </div>
          </section>

          {/* Contact Support */}
          <section className="space-y-4 pt-4 border-t border-outline-variant/20">
            <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold flex items-center gap-3">
              <Mail className="text-secondary" size={24} />
              Questions About This Policy
            </h2>
            <div className="text-on-surface-variant text-sm md:text-base leading-relaxed pl-9 space-y-3">
              <p>
                If you have any questions about our use of cookies or other technologies, please email us:
              </p>
              <div className="mt-4 p-4 bg-surface-tan/30 border border-outline-variant/20 rounded-xl max-w-max">
                <p className="font-semibold text-primary">No Mind Legal & Privacy Team</p>
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
