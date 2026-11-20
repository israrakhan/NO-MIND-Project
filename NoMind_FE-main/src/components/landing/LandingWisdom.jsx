import React from 'react'
import { Youtube } from 'lucide-react'
import { getMediaUrl } from '../../utils/cloudinary.js'

export default function LandingWisdom() {
  return (
    <section className="mb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="bg-primary-container rounded-[3rem] p-8 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-xl border border-primary/10">
        
        {/* Decorative graphic backdrop */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_30%_30%,_white_0%,_transparent_60%)] pointer-events-none"></div>

        <div className="relative z-10 flex-1 text-center md:text-left">
          <p className="text-petal-pink font-label-caps text-label-caps mb-6 tracking-[0.2em] font-bold uppercase">
            DAILY WISDOM
          </p>
          <h2 className="font-display-lg text-2xl md:text-4xl text-white font-headline-sm italic mb-8 max-w-3xl leading-relaxed">
            "Silence is not the absence of sound, but the presence of self."
          </h2>
          
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-full border border-white/20 overflow-hidden select-none shadow-sm">
              <img 
                className="w-full h-full object-cover" 
                alt="Portrait of Professor Shivaji Kuche"
                src={getMediaUrl('FounderImage.png')}
              />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm">Prof. Shivaji Kuche</p>
              <p className="text-white/60 text-xs font-semibold">Founder of No Mind Philosophy</p>
            </div>
          </div>
        </div>

        {/* YouTube Circle Button */}
        <a 
          href="https://www.youtube.com/@shivajikuche1798/featured"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 bg-[#FF0000] text-white w-24 h-24 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-xl cursor-pointer select-none"
          aria-label="Visit our YouTube channel"
        >
          <Youtube size={36} className="text-white" />
        </a>

      </div>
    </section>
  )
}
