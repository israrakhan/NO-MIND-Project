import React from 'react'

export default function Facilitators() {
  const guides = [
    {
      name: 'Liam Richards',
      role: 'Mindfulness Lead & Narrator',
      desc: 'Expert in Zen breathwork and guided visualizations. Liam narrates the daily Morning Presence session.',
      initials: 'LR'
    },
    {
      name: 'Elena Rostova',
      role: 'NLP Master Practitioner',
      desc: 'Cognitive behavior expert focused on linguistic mapping, cognitive reframing, and default network deactivation.',
      initials: 'ER'
    },
    {
      name: 'Saraswati Devi',
      role: 'Spiritual Alignment Guide',
      desc: 'Himalayan lineage practitioner leading mantra integrations, Trataka gaze meditations, and Vedic focus workshops.',
      initials: 'SD'
    }
  ]

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto mb-stack-lg">
      
      {/* Header */}
      <div className="text-center mb-16">
        <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">
          OUR SANCTUARY GUIDES
        </span>
        <h2 className="font-headline-md text-headline-md text-primary font-bold">
          Facilitators of Presence
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base mt-2 leading-relaxed">
          Meet the experienced practitioners who lead our workshops, compile resources, and narrate guided audio paths.
        </p>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {guides.map((guide, idx) => (
          <div 
            key={idx}
            className="bg-surface-tan p-8 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Initials profile card */}
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg mb-6 border border-primary/5 shadow-inner select-none">
                {guide.initials}
              </div>
              
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-bold">
                {guide.name}
              </h3>
              
              <p className="font-label-caps text-[10px] text-secondary font-bold tracking-wider mb-4">
                {guide.role}
              </p>
              
              <p className="font-body-md text-on-surface-variant text-sm md:text-base leading-relaxed">
                {guide.desc}
              </p>
            </div>
            
            <button 
              onClick={() => alert(`Opening bio details for ${guide.name}...`)}
              className="mt-6 text-secondary font-label-caps text-label-caps tracking-wider flex items-center gap-1.5 hover:text-primary transition-colors font-bold select-none text-left cursor-pointer"
            >
              READ FULL BIO
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        ))}
      </div>

    </section>
  )
}
