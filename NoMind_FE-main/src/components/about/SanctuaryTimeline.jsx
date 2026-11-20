import React from 'react'

export default function SanctuaryTimeline({ customMilestones = [], loading = false }) {
  const defaultMilestones = [
    {
      year: '2012',
      title: 'Himalayan Solitude',
      description: "Professor Kuche retreats to the Himalayan foothills to synthesize cognitive psychology with Vedic silence techniques."
    },
    {
      year: '2015',
      title: 'The Silent Mind Publication',
      description: "Release of Professor Kuche's first handbook detailing attention training and NLP frameworks for modern seekers."
    },
    {
      year: '2019',
      title: 'Himalayan Sanctuary Launch',
      description: "Opening of our physical silence retreat in Uttarakhand, welcoming hundreds of practitioners annually."
    },
    {
      year: '2023',
      title: 'Digital Sanctuary Rollout',
      description: "Launch of the No Mind Meditation Portal and companion audio series, bringing Professor Kuche's teachings to a global scale."
    },
    {
      year: '2026',
      title: 'Rahasya Manacha Bestseller',
      description: "Release of Professor Kuche's Marathi/English magnum opus, establishing No Mind as a leading voice in modern mindfulness."
    }
  ]

  const milestones = customMilestones.length > 0 ? customMilestones : defaultMilestones;

  return (
    <section className="bg-primary text-white py-stack-lg border-y border-outline-variant/10">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-label-caps text-label-caps text-petal-pink mb-2 block uppercase tracking-widest font-bold">
            OUR SACRED TIMELINE
          </span>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight">
            Sanctuary Milestones
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base mt-2 leading-relaxed">
            The path of growth, study, and shared wisdom that shaped the No Mind Foundation.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line indicator */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-white/10 -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {milestones.map((stone, idx) => (
              <div 
                key={idx}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-petal-pink border-4 border-primary -translate-x-1/2 z-10 shadow-sm"></div>

                {/* Left/Right content block */}
                <div className={`w-full md:w-1/2 pl-10 ${
                  idx % 2 === 0 ? 'md:pl-0 md:pr-12' : 'md:pl-12 md:pr-0'
                }`}>
                  <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 ${
                    idx % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}>
                    <span className="font-display-lg text-2xl font-bold text-petal-pink block mb-2">
                      {stone.year}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-white mb-2 font-bold">
                      {stone.title}
                    </h3>
                    <p className="text-white/90 text-base leading-loose">
                      {stone.description}
                    </p>
                  </div>
                </div>
                
                {/* Space holder for desktop */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
