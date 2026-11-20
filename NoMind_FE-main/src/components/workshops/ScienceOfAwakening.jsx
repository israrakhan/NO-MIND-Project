import React from 'react'

export default function ScienceOfAwakening() {
  const features = [
    {
      icon: 'psychology',
      title: 'Mind Mapping',
      description: 'Identify and rewire the unconscious patterns that dictate your emotional responses and daily habits.'
    },
    {
      icon: 'self_improvement',
      title: 'Spiritual Alignment',
      description: 'Integrate NLP techniques with deep meditation to achieve a state of effortless flow and profound inner peace.'
    },
    {
      icon: 'diversity_2',
      title: 'Group Synergy',
      description: 'Harness the power of collective presence in intimate settings designed for vulnerable growth and shared discovery.'
    }
  ]

  return (
    <section className="bg-surface-container-low py-stack-lg border-y border-outline-variant/10">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-stack-lg">
          <h2 className="font-headline-md text-headline-md text-primary font-bold">The Science of Awakening</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base leading-relaxed mt-2">
            Our NLP-driven spiritual sessions bridge the gap between ancient wisdom and modern neuroscience.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-surface-tan p-8 rounded-2xl transition-all duration-300 hover:translate-y-[-4px] hover:shadow-md border border-transparent hover:border-outline-variant/20"
            >
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-secondary mb-6 shadow-sm">
                <span className="material-symbols-outlined text-[36px] select-none">{feature.icon}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-4 font-bold">
                {feature.title}
              </h3>
              <p className="font-body-md text-on-surface-variant text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
