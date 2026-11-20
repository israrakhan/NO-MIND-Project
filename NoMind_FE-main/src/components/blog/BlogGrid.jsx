import React from 'react'

export default function BlogGrid({ selectedCategory, onOpenPost }) {
  const posts = [
    {
      id: 'philosophy-vedic-silence',
      title: 'The Philosophy of Vedic Silence',
      category: 'Philosophy',
      author: 'Prof. Shivaji Kuche',
      date: 'JUNE 2026',
      readTime: '6 min read',
      desc: 'Exploring how ancient Vedic scriptures described the states of absolute stillness and silence, and mapping them to modern psychological constructs of mindfulness.',
      cover: 'https://images.unsplash.com/photo-1631962757933-04f8f9210f1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    },
    {
      id: 'somatic-release-dissolving-stress',
      title: 'Somatic Release: Dissolving Stress in the Body',
      category: 'Neuroscience',
      author: 'Liam Richards',
      date: 'MAY 2026',
      readTime: '7 min read',
      desc: 'How chronic emotional tension is stored in somatic muscle tissue, and how Zen breathwork releases stress by shifting nervous system baselines.',
      cover: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    },
    {
      id: 'vulnerable-growth-collective',
      title: 'Vulnerable Growth in Collective Settings',
      category: 'Retreats',
      author: 'Elena Rostova',
      date: 'APRIL 2026',
      readTime: '5 min read',
      desc: 'An exploration of group synergy during silent retreats. Why sharing vulnerability in quiet spaces accelerates neuro-cognitive reframing.',
      cover: 'https://images.unsplash.com/photo-1728933102332-a4f1a281a621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    },
    {
      id: 'reframing-unconscious-dialogue',
      title: 'Reframing Your Unconscious Dialogue',
      category: 'Philosophy',
      author: 'Elena Rostova',
      date: 'MARCH 2026',
      readTime: '8 min read',
      desc: 'Our internal dialogue forms the architecture of our thoughts. Discover simple NLP strategies to identify and pivot negative default scripts.',
      cover: 'https://images.unsplash.com/photo-1766345080484-06f05d102458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    },
    {
      id: 'trataka-candle-gazing-meditation',
      title: 'Trataka Gaze: Candle Light Meditation',
      category: 'Mindfulness',
      author: 'Saraswati Devi',
      date: 'FEB 2026',
      readTime: '5 min read',
      desc: 'The ancient practice of steady candle gazing. How focusing physical vision on a single flame induces rapid mental stillness and suppresses cerebral chat.',
      cover: 'https://images.unsplash.com/photo-1768122735840-8f0a04cbfef6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    }
  ]

  const filtered = posts.filter(
    (post) => selectedCategory === 'All' || post.category === selectedCategory
  )

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg">
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter items-stretch">
          {filtered.map((post) => (
            <div
              key={post.id}
              onClick={() => onOpenPost(post)}
              className="bg-surface-tan rounded-[1.5rem] p-4 flex flex-col group cursor-pointer transition-all hover:shadow-[0_20px_40px_rgba(74,54,45,0.08)] border-2 border-transparent hover:border-outline-variant/30"
            >
              {/* Image Container */}
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 relative select-none">
                <img
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  alt={post.title}
                  src={post.cover}
                />
              </div>

              {/* Tag & Read Time */}
              <div className="flex items-center gap-2 font-label-caps text-label-caps text-secondary mb-2 font-bold uppercase tracking-wider">
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              {/* Title */}
              <h4 className="font-headline-sm text-primary text-lg font-bold group-hover:text-secondary transition-colors mb-2">
                {post.title}
              </h4>

              {/* Description */}
              <p className="font-body-md text-on-surface-variant text-sm mt-1 leading-relaxed line-clamp-3 mb-6 flex-1">
                {post.desc}
              </p>

              {/* Author and Date Footer */}
              <div className="flex items-center gap-3 border-t border-outline-variant/10 pt-4 mt-auto">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs select-none border border-primary/5">
                  {getInitials(post.author)}
                </div>
                <div>
                  <p className="text-xs font-bold text-primary leading-none">{post.author}</p>
                  <p className="text-[9px] text-outline mt-0.5">{post.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface-container rounded-2xl py-12 px-6 text-center border border-outline-variant/20 max-w-lg mx-auto">
          <span className="material-symbols-outlined text-outline text-5xl mb-4 select-none">feed</span>
          <h3 className="font-headline-sm text-primary font-bold">No articles found</h3>
          <p className="text-on-surface-variant mt-2 text-sm">
            We haven't published any posts under the "{selectedCategory}" category yet. Check back soon!
          </p>
        </div>
      )}
    </section>
  )
}
