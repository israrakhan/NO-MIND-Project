import React from 'react'

export default function AboutHero() {
  const handleScroll = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center">
        
        {/* Left Column Text */}
        <div>
          <span className="font-label-caps text-label-caps text-secondary mb-4 block uppercase tracking-widest font-bold">
            The Digital Sanctuary
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6 font-bold leading-tight">
            Cultivating Presence &amp; Stillness
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed">
            The No Mind Foundation bridges ancient spiritual traditions with modern Neuro-Linguistic programming to clear the path to your true self. We provide spaces, literature, and practices to facilitate deep inward focus.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handleScroll('founder-section')}
              className="bg-[#BC6034] text-white px-8 py-3 rounded-lg font-body-md font-semibold hover:brightness-90 transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              Meet Our Founder
            </button>
            <button 
              onClick={() => handleScroll('core-pillars')}
              className="border-[1.5px] border-[#BC6034] text-[#BC6034] px-8 py-3 rounded-lg font-body-md font-semibold hover:bg-[#BC6034]/5 transition-all cursor-pointer"
            >
              Our Core Pillars
            </button>
          </div>
        </div>

        {/* Right Column Image */}
        <div className="relative h-[320px] md:h-[440px] select-none">
          <div className="absolute inset-0 rounded-[24px] overflow-hidden shadow-lg border border-outline-variant/10">
            <img 
              className="w-full h-full object-cover" 
              alt="Zen garden pebbles and single stone representing silence and focus."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3dh10N6tV9Oa-MRZ13AarlTs5Myns5rBALkKMyjgrOjrUllifRWgmcqDrI85RS8DHdjkGIXRYCTzM2uJMqA3deBPnmvHmvH64M0JLPZvgAiQihWL7ytuCi7KW1vozFvm0o1YpBBN8D9Sii12sq17OkR1P45vI4BVxhNm2qQzy2bfn3Ut_RIkVj_Jd8bzfmaU0SBzkFLu1fufuqAquswYV9bwAxCHFGf1cDg99-6ek62yIU5_oMLDFBqo5DhkEQMoIFqlQ-IU6Dac"
            />
          </div>
          
          {/* Accent Blur Nodes */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-petal-pink/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        </div>

      </div>
    </header>
  )
}
