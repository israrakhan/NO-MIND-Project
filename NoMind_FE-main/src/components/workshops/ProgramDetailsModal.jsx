import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { API_BASE_URL } from '../../api/httpClient.js';

const getImageSrc = (image) => {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  const path = image.startsWith("/") ? image : `/${image}`;
  return `${API_BASE_URL}${path}`;
};

export default function ProgramDetailsModal({ program, onClose, onEnroll }) {
  if (!program) return null;

  const imgSrc = getImageSrc(program.image) || "https://images.unsplash.com/photo-1669676648180-cb9db2aae514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-outline-variant/20 p-6 md:p-8 relative z-10 max-h-[90vh] overflow-y-auto scrollbar-hide"
          data-lenis-prevent
        >
          {/* Program Image Banner */}
          <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 select-none border border-outline-variant/10 shadow-sm">
            <img
              src={imgSrc}
              alt={program.title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-primary/40 hover:text-primary transition-colors hover:bg-surface-tan/40 rounded-full cursor-pointer"
            aria-label="Close details"
          >
            <X size={20} />
          </button>

          {/* Program Badge & Title */}
          <div className="mb-6 pr-6">
            <span className="font-label-caps text-[10px] text-secondary mb-2 block uppercase font-bold tracking-widest bg-surface-tan px-2.5 py-1 rounded-full w-max">
              {program.level || 'Workshop'}
            </span>
            <h2 className="font-display-lg text-2xl md:text-3xl text-primary font-bold leading-tight mt-1">
              {program.title}
            </h2>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-outline-variant/20 my-6">
            {program.date && (
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary select-none">calendar_today</span>
                <div>
                  <p className="font-label-caps text-[9px] opacity-60 font-semibold tracking-wider">DATE</p>
                  <p className="font-body-md text-sm font-semibold text-primary">
                    {new Date(program.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            )}

            {program.duration && (
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary select-none">schedule</span>
                <div>
                  <p className="font-label-caps text-[9px] opacity-60 font-semibold tracking-wider">DURATION</p>
                  <p className="font-body-md text-sm font-semibold text-primary">{program.duration}</p>
                </div>
              </div>
            )}

            {program.location && (
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary select-none">location_on</span>
                <div>
                  <p className="font-label-caps text-[9px] opacity-60 font-semibold tracking-wider">LOCATION</p>
                  <p className="font-body-md text-sm font-semibold text-primary">{program.location}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary select-none">payments</span>
              <div>
                <p className="font-label-caps text-[9px] opacity-60 font-semibold tracking-wider">PRICE</p>
                <p className="font-body-md text-sm font-semibold text-primary">
                  {program.price ? `$${program.price}` : 'Enquire'}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h4 className="font-label-caps text-[10px] text-secondary mb-2 block uppercase font-bold tracking-widest">
              Program Overview
            </h4>
            <p className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-wrap">
              {program.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onEnroll(program);
              }}
              className="flex-1 bg-secondary text-white font-label-caps text-xs uppercase hover:bg-secondary-container transition-all active:scale-[0.98] py-3.5 rounded-full font-bold shadow-sm cursor-pointer text-center"
            >
              Enroll Now
            </button>
            <button
              onClick={onClose}
              className="sm:px-6 bg-surface-tan/40 hover:bg-surface-tan/80 text-primary font-label-caps text-xs uppercase transition-all py-3.5 rounded-full font-bold cursor-pointer text-center"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
