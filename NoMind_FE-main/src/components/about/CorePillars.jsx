import React from 'react'

export default function CorePillars() {
  const pillars = [
    {
      icon: 'psychology',
      title: 'NLP Rewiring',
      description: 'Rewiring the subconscious default mode network by identifying and reframing language patterns and core mental narratives.'
    },
    {
      icon: 'spa',
      title: 'Silent Sanctuary',
      description: 'Creating physical and digital environments designed to suppress external visual and auditory clutter, allowing the nervous system to rest.'
    },
    {
      icon: 'self_improvement',
      title: 'Conscious Presence',
      description: 'Integrating ancient meditative listening methods with modern attention-training exercises to stabilize baseline focus in the present moment.'
    }
  ]

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto" id="core-pillars">
      <div className="text-center mb-stack-lg reveal">
        <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">
          OUR FOUNDATIONAL PACTS
        </span>
        <h2 className="font-headline-md text-headline-md text-primary font-bold">
          The Pillars of No Mind
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base mt-2 leading-relaxed">
          Our methodology is anchored in three primary practices that guide seekers from chaos to clarity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {pillars.map((pillar, idx) => (
          <div 
            key={idx}
            className={`bg-surface-tan p-8 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center reveal ${
              idx === 0 ? 'delay-100' : idx === 1 ? 'delay-200' : 'delay-300'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-secondary mb-6 shadow-sm select-none">
              <span className="material-symbols-outlined text-[30px] font-variation-settings-[FILL_1]">{pillar.icon}</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-4 font-bold">
              {pillar.title}
            </h3>
            <p className="font-body-md text-on-surface-variant text-sm md:text-base leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
