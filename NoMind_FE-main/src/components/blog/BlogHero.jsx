import React from 'react'

export default function BlogHero({ selectedCategory, setSelectedCategory }) {
  const categories = ['All', 'Neuroscience', 'Mindfulness', 'Philosophy', 'Retreats']

  return (
    <header className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-12 mt-6 text-center">
      <span className="font-label-caps text-label-caps text-secondary mb-3 block uppercase tracking-widest font-bold">
        WISDOM &amp; REFLECTIONS
      </span>
      
      <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6 font-bold leading-tight">
        The Sanctuary Journal
      </h1>
      
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed text-sm md:text-base">
        Explore essays, peer-reviewed research summaries, and spiritual notes from our guides on neuroplasticity, meditation discipline, and modern philosophy.
      </p>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2.5 border-b border-outline-variant/15 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full font-label-caps text-label-caps tracking-wider transition-all select-none cursor-pointer ${
              selectedCategory === cat
                ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-tan hover:text-primary'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  )
}
