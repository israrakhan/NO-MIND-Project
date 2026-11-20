import React from 'react'
import { getMediaUrl } from '../../utils/cloudinary.js'

export default function FounderSection() {
  return (
    <section className="bg-surface-container-low py-stack-lg border-y border-outline-variant/10" id="founder-section">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-16">
        
        {/* Main Founder Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          
          {/* Left Column: Founder Photo */}
          <div className="lg:col-span-5 relative group select-none reveal-left">
            <div className="aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl border border-outline-variant/20 relative">
              <img 
                className="w-full h-full object-cover" 
                alt="Professor Shivaji Kuche"
                src={getMediaUrl('FounderImage.png')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
            
            {/* Absolute badge */}
            <div className="absolute top-4 right-4 lg:-right-2 bg-secondary text-on-secondary px-4.5 py-1.5 rounded-lg font-label-caps text-[10px] font-bold shadow-md">
              FOUNDER
            </div>
          </div>

          {/* Right Column: Founder Info */}
          <div className="lg:col-span-7 lg:pl-12 mt-8 lg:mt-0 reveal-right">
            <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">
              The Lineage of Silence
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mb-2 font-bold leading-tight">
              Professor Shivaji Kuche
            </h2>
            <h3 className="font-body-lg text-body-lg text-secondary italic mb-6">
              Cognitive Scientist &amp; Spiritual Pioneer
            </h3>
            
            <div className="prose font-body-md text-on-surface-variant mb-6 text-sm md:text-base leading-relaxed space-y-4">
              <p>
                Professor Shivaji Kuche has dedicated over three decades to studying the human mind. After training in modern cognitive psychology and linguistics, he traveled throughout the Himalayas to study traditional Vedic mindfulness.
              </p>
              <p>
                His breakthroughs in reframing unconscious patterns through Neuro-Linguistic programming (NLP) led to the founding of the No Mind Foundation. Professor Kuche's academic writings and best-selling books provide a rational, neuroscientific framework for achieving spiritual stillness.
              </p>
            </div>

            {/* Philosophy block */}
            <div className="bg-surface-tan p-8 rounded-2xl border-l-4 border-secondary shadow-inner">
              <p className="font-quote text-quote text-primary font-medium italic text-base md:text-lg">
                "The mind is a beautiful instrument. But it is only in absolute silence that we discover the musician who plays it."
              </p>
              <span className="block mt-4 text-xs font-label-caps text-secondary font-bold tracking-wider">— PROFESSOR SHIVAJI KUCHE</span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-outline-variant/10" />

        {/* Transformative Impact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Heading & Intro */}
          <div className="lg:col-span-5 reveal-left">
            <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">
              Legacy of Service
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mb-4 font-bold leading-tight">
              20+ Years of Transformative Impact
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed text-sm md:text-base mb-6">
              Professor Shivaji Kuche has been providing training for the past
              twenty years at <strong className="text-primary font-semibold">YASHADA</strong>, an institution where
              Class-I and Super Class-I officers receive professional
              training. He has been guiding participants on the subjects of
              mental health, emotional well-being, and overall well-being.
            </p>

            {/* Counseling centers */}
            <div className="bg-surface-tan p-5 rounded-2xl border-l-4 border-secondary shadow-sm">
              <p className="font-body-md text-primary font-semibold text-sm md:text-base leading-relaxed">
                The foundation operates counseling centers in Amravati, Nagpur,
                Thane, and Pune.
              </p>
            </div>
          </div>

          {/* Right Column: Achievements list */}
          <div className="lg:col-span-7 lg:pl-12 mt-8 lg:mt-0 flex flex-col justify-center reveal-right">
            <ul className="space-y-4 font-body-md text-on-surface-variant text-sm md:text-base">
              <li className="flex gap-4 items-start">
                <span className="text-secondary mt-0.5 font-bold text-xl select-none">
                  ✓
                </span>
                <span>
                  Thousands of government officers and employees have received
                  stress management and emotional balance training at YASHADA.
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-secondary mt-0.5 font-bold text-xl select-none">
                  ✓
                </span>
                <span>
                  Visited hundreds of schools offering <strong className="text-primary font-semibold">free training sessions</strong> on meditation,
                  building self-confidence, and visualization techniques.
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-secondary mt-0.5 font-bold text-xl select-none">
                  ✓
                </span>
                <span>
                  Conducted <strong className="text-primary font-semibold">400+ offline sessions</strong> during
                  COVID-19 for doctors and police, entirely as social service
                  without any remuneration.
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-secondary mt-0.5 font-bold text-xl select-none">
                  ✓
                </span>
                <span>
                  Inspired <strong className="text-primary font-semibold">thousands of students</strong> to prepare
                  for prestigious civil services such as IAS and IPS.
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-secondary mt-0.5 font-bold text-xl select-none">
                  ✓
                </span>
                <span>
                  Published <strong className="text-primary font-semibold">3 books</strong> including "Rahasya
                  Manacha" (The Secret of the Mind), highly acclaimed by
                  readers.
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}

