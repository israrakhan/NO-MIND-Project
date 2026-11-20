import React from 'react'

export default function FeaturedPost({ onOpenPost }) {
  const featured = {
    id: 'decoding-default-mode-network',
    title: 'Decoding the Default Mode Network: How Silence Rewires the Brain',
    category: 'Neuroscience',
    author: 'Prof. Shivaji Kuche',
    date: 'JULY 2026',
    readTime: '8 min read',
    desc: 'An in-depth neuroscientific analysis of the changes observed in the brain default mode network during periods of absolute silence. Discover how reframing neural pathways with NLP rewires our stress response.',
    cover: 'https://images.unsplash.com/photo-1735151055127-73c610ae901f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  }

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-16">
      <div 
        onClick={() => onOpenPost(featured)}
        className="group relative rounded-[2.5rem] overflow-hidden bg-surface-tan grid grid-cols-1 lg:grid-cols-12 gap-gutter p-6 md:p-10 border border-outline-variant/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        {/* Left: Cover Image */}
        <div className="lg:col-span-6 relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden select-none">
          <img 
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" 
            alt="Zen garden representing default mode network rewiring study."
            src={featured.cover}
          />
          <div className="absolute top-4 left-4 bg-primary text-white px-3.5 py-1 rounded-full font-label-caps text-[10px] font-bold shadow-md">
            FEATURED POST
          </div>
        </div>

        {/* Right: Text Details */}
        <div className="lg:col-span-6 flex flex-col justify-between py-2">
          <div>
            <div className="flex items-center gap-3 text-secondary font-label-caps text-[10px] font-bold tracking-wider mb-4">
              <span>{featured.category.toUpperCase()}</span>
              <span>•</span>
              <span>{featured.readTime}</span>
            </div>
            
            <h2 className="font-headline-md text-2xl md:text-3xl text-primary mb-4 font-bold group-hover:text-secondary transition-colors leading-tight">
              {featured.title}
            </h2>
            
            <p className="font-body-md text-on-surface-variant mb-6 text-sm md:text-base leading-relaxed line-clamp-4">
              {featured.desc}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-outline-variant/10 pt-6 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shadow-inner select-none border border-primary/5">
                SK
              </div>
              <div>
                <p className="text-sm font-bold text-primary leading-none">{featured.author}</p>
                <p className="text-[10px] text-outline mt-0.5">{featured.date}</p>
              </div>
            </div>
            
            <span className="text-secondary font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all text-sm">
              Read Article
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
