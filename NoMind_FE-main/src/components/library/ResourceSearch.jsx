import React, { useState } from 'react'

export default function ResourceSearch({ 
  searchQuery, 
  setSearchQuery, 
  searchCategory, 
  setSearchCategory 
}) {
  const [localQuery, setLocalQuery] = useState(searchQuery)
  const [localCategory, setLocalCategory] = useState(searchCategory)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchQuery(localQuery)
    setSearchCategory(localCategory)
  }

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg">
      <div className="bg-surface-tan/30 border border-outline-variant/30 p-8 md:p-12 rounded-[24px]">
        <h3 className="font-headline-sm text-headline-sm text-primary mb-8 text-center font-bold">
          Find a Specific Resource
        </h3>
        
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter items-end">
          
          {/* Keyword Search */}
          <div className="md:col-span-1">
            <label className="font-label-caps text-label-caps text-secondary mb-2 block font-semibold tracking-wider">
              SEARCH KEYWORDS
            </label>
            <input 
              className="stationery-input w-full py-3 px-0 text-body-md text-primary placeholder:text-outline/65 border-b border-secondary/50 focus:border-secondary focus:outline-none transition-colors" 
              placeholder="e.g. Consciousness, Vedas" 
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
          </div>
          
          {/* Category Dropdown */}
          <div className="md:col-span-1">
            <label className="font-label-caps text-label-caps text-secondary mb-2 block font-semibold tracking-wider">
              CATEGORY
            </label>
            <select 
              className="stationery-input w-full py-3 px-0 text-body-md text-primary bg-transparent border-b border-secondary/50 focus:border-secondary focus:outline-none transition-colors cursor-pointer"
              value={localCategory}
              onChange={(e) => setLocalCategory(e.target.value)}
            >
              <option value="All Resources">All Resources</option>
              <option value="Research Papers">Research Papers</option>
              <option value="Philosophical Texts">Philosophical Texts</option>
              <option value="Practical Guides">Practical Guides</option>
            </select>
          </div>
          
          {/* Search Button */}
          <button 
            type="submit"
            className="bg-primary hover:bg-secondary text-on-primary py-3.5 rounded-lg font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
          >
            <span className="material-symbols-outlined text-[18px] select-none">search</span>
            Browse Library
          </button>
          
        </form>
      </div>
    </section>
  )
}
