import React from 'react'
import { getMediaUrl } from '../../utils/cloudinary.js'

export default function LandingPhilosophy() {
  return (
    <section className="mb-16 py-16 border-t border-outline-variant/10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] lg:grid-cols-[1.25fr_0.75fr] gap-12 items-center">
        
        {/* Left Column: Text Content */}
        <div className="space-y-6">
          <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">
            The Art of No Mind
          </span>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Architecture of the Soul
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed text-sm md:text-base">
            Professor Shivaji Kuche's core philosophy posits that luxury is not about possession, but about the quality of consciousness. Our "Sanctuary Home" model integrates high-design with spiritual discipline, creating environments that naturally induce a state of meditative flow.
          </p>
          
          {/* Stats details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-outline-variant/10">
            <div>
              <h4 className="font-display-lg text-3xl font-bold text-primary mb-2">3k+</h4>
              <p className="text-xs text-on-surface-variant font-semibold font-label-caps text-label-caps uppercase tracking-wider">
                Global Seekers
              </p>
            </div>
            <div>
              <h4 className="font-display-lg text-3xl font-bold text-primary mb-2">12</h4>
              <p className="text-xs text-on-surface-variant font-semibold font-label-caps text-label-caps uppercase tracking-wider">
                Sacred Destinations
              </p>
            </div>
            <div>
              <h4 className="font-display-lg text-3xl font-bold text-primary mb-2">15+</h4>
              <p className="text-xs text-on-surface-variant font-semibold font-label-caps text-label-caps uppercase tracking-wider">
                Wisdom Guides
              </p>
            </div>
            <div>
              <h4 className="font-display-lg text-3xl font-bold text-primary mb-2">98%</h4>
              <p className="text-xs text-on-surface-variant font-semibold font-label-caps text-label-caps uppercase tracking-wider">
                Satisfaction Rate
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic circular graphic & quote */}
        <div className="relative flex justify-center select-none mt-12 md:mt-0">
          <div className="relative w-full max-w-[360px] aspect-square rounded-[5rem] overflow-hidden shadow-xl bg-surface-tan border border-outline-variant/10 flex items-center justify-center p-8">
            
            {/* Concentric rings graphic overlay */}
            <div className="absolute inset-0 border-[24px] border-white/40 rounded-[5rem]"></div>
            <div className="absolute inset-12 border-[24px] border-white/20 rounded-[5rem]"></div>
            
            <div className="bg-surface rounded-full aspect-square w-full flex flex-col items-center justify-center p-6 text-center shadow-inner relative z-10">
              <img 
                className="h-8 md:h-10 w-auto opacity-75 mb-3 object-contain" 
                src={getMediaUrl('logo.png')} 
                alt="No Mind Foundation Logo" 
              />
              <p className="text-primary italic text-xs md:text-sm font-headline-sm leading-relaxed px-2">
                "Your home is an extension of your body, and your body is the vessel of your awareness."
              </p>
              <span className="text-[9px] uppercase tracking-widest text-[#BC6034] font-bold mt-3">
                — Philosophy —
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
