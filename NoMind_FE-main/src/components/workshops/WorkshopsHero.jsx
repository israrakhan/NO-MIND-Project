import React from 'react'

export default function WorkshopsHero() {
  const scrollToId = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto overflow-hidden mt-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        
        {/* Left Column Text */}
        <div className="md:col-span-7 z-10">
          <span className="font-label-caps text-label-caps text-secondary mb-4 block font-bold tracking-widest uppercase">
            TRANSFORMATIVE JOURNEYS
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6 leading-tight font-bold">
            Deepen Your Practice through <span className="text-secondary italic">Presence</span>.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed">
            Experience immersive NLP retreats and spiritual sessions designed to unlock your inner potential and foster lasting mental clarity.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToId('schedules')}
              className="bg-secondary hover:bg-primary text-white px-8 py-4 rounded-lg font-label-caps text-label-caps shadow-sm hover:shadow-md transition-all active:scale-95 font-medium cursor-pointer"
            >
              VIEW WORKSHOPS
            </button>
            <button 
              onClick={() => scrollToId('testimonials')}
              className="border-2 border-secondary text-secondary hover:bg-secondary/5 px-8 py-4 rounded-lg font-label-caps text-label-caps transition-all font-medium cursor-pointer"
            >
              OUR VOICES
            </button>
          </div>
        </div>

        {/* Right Column Image */}
        <div className="md:col-span-5 relative mt-8 md:mt-0 select-none">
          <div className="aspect-[0.84] rounded-2xl overflow-hidden bg-surface-tan relative shadow-xl">
            <img 
              alt="Spiritual leader in meditation" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1728933102332-a4f1a281a621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <p className="font-body-md text-white italic text-sm md:text-base leading-relaxed">
                "The silence between your thoughts is where your true self resides."
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Decorative Blob */}
      <div className="absolute -right-20 top-20 w-64 h-64 bg-petal-pink/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    </section>
  )
}
