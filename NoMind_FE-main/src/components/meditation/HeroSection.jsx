import React from 'react'
import { getMediaUrl } from '../../utils/cloudinary.js'

export default function HeroSection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-stack-lg">
      <div className="relative rounded-[2rem] overflow-hidden bg-surface-tan min-h-[480px] flex items-center p-8 md:p-16 shadow-sm hover:shadow-md transition-shadow duration-300">
        
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <video 
            className="w-full h-full object-cover scale-x-[-1]" 
            src={getMediaUrl('video1.mp4')}
            autoPlay 
            muted 
            loop 
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-tan/95 via-surface-tan/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-[1.5px] bg-secondary"></span>
            <span className="font-label-caps text-label-caps text-secondary tracking-widest uppercase font-semibold">
              Wisdom of the Day
            </span>
          </div>
          
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-8 leading-tight italic">
            "The quieter you become, the more you are able to hear."
          </h1>
          

        </div>
      </div>
    </section>
  )
}
