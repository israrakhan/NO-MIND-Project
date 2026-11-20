import { useNavigate } from 'react-router'
import { getMediaUrl } from '../../utils/cloudinary.js'

export default function LandingHero() {
  const navigate = useNavigate();

  return (
    <section className="relative mb-16 min-h-[560px] flex items-center mt-6 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center lg:items-start w-full">

        {/* Left Column Text */}
        <div className="lg:col-span-6 z-10 space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container text-petal-pink font-label-caps text-[10px] font-bold uppercase tracking-widest border border-primary/10">
            Est. 2014 • The Sanctuary
          </span>

          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-[1.1] font-bold">
            The Luxury of <br />
            <span className="italic text-secondary font-light">Absolute Stillness</span>
          </h1>

          <p className="font-body-lg text-on-surface-variant max-w-xl text-base md:text-lg lg:text-body-lg leading-relaxed">
            A curated path for the modern mind. Experience the high-art of mindfulness within your personal sanctuary home, guided by ancient wisdom and refined aesthetics.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => navigate('/connect')}
              className="bg-secondary text-on-secondary px-8 py-4 rounded-full font-bold tracking-wide hover:bg-primary transition-all hover:scale-105 shadow-md hover:shadow-lg cursor-pointer select-none active:scale-95"
            >
              Begin Your Journey
            </button>
            <button
              onClick={() => navigate('/workshops')}
              className="border border-secondary text-secondary px-8 py-4 rounded-full font-bold hover:bg-secondary/5 transition-all cursor-pointer select-none"
            >
              Explore Session
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 relative mt-12 lg:mt-0 select-none">
          <div className="group relative w-full aspect-video lg:aspect-[4/3] rounded-[40px] lg:rounded-[48px] overflow-hidden shadow-2xl border-[12px] border-surface-container-high bg-surface-tan/10 cursor-default">

            {/* Dark Color Tint Overlay */}
            <div className="absolute inset-0 bg-[#4A362D]/50 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10 pointer-events-none"></div>

            <video
              className="w-full h-full object-cover"
              src={getMediaUrl('video.mp4')}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>

      </div>
    </section>
  )
}
