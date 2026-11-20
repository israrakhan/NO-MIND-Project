import { useState } from 'react';
import { Youtube, Play } from 'lucide-react';

const REELS = [
  {
    id: 1,
    videoId: "dJc9VhbT9n4",
    title: "Aagaaz: Rise & Win",
    description: "A powerful motivational teaching on resilience. Learn to strengthen your inner resolve, overcome challenges, and write your own destiny.",
  },
  {
    id: 2,
    videoId: "9XJGdN755f8",
    title: "Defining True Success",
    description: "Key reflections from 20 years of counseling IAS, IPS officers, and politicians. True success is not in your position, but in your daily happiness.",
  },
  {
    id: 3,
    videoId: "bs0DRG32APU",
    title: "NLP & Coincidences",
    description: "Ever thought of a friend and they instantly called you? Understand how Neuro-Linguistic Programming and Quantum Physics explain these everyday coincidences.",
  },
  {
    id: 4,
    videoId: "MEik5Anf8LI",
    title: "The Science of Déjà Vu",
    description: "Why do unfamiliar places sometimes feel so familiar? Discover how the subconscious mind maps memories and coordinates with quantum fields.",
  }
];

export default function LandingReels() {
  const [activeVideoId, setActiveVideoId] = useState(null);

  return (
    <section className="mb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto reveal">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="font-label-caps text-label-caps text-secondary mb-4 block uppercase tracking-widest font-bold">
            YouTube Reels &amp; Shorts
          </span>
          <h2 className="font-display-lg text-3xl md:text-5xl text-primary font-bold">
            Wisdom in Seconds
          </h2>
        </div>
        <p className="text-on-surface-variant text-base max-w-md leading-relaxed">
          Explore bite-sized video teachings, daily meditation guidelines, and philosophical insights directly from Prof. Shivaji Kuche's channel.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {REELS.map((reel) => (
          <div
            key={reel.id}
            onClick={() => setActiveVideoId(reel.videoId)}
            className="group block bg-surface-tan/30 rounded-[2rem] p-4 border border-outline-variant/10 hover:border-secondary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            {/* Aspect 9:16 Portrait Video Card */}
            <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden shadow-md mb-4 bg-primary/5 select-none">
              {activeVideoId === reel.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${reel.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={reel.title}
                  className="w-full h-full object-cover"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  <img 
                    src={`https://img.youtube.com/vi/${reel.videoId}/maxresdefault.jpg`} 
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Play size={20} fill="currentColor" className="ml-1 text-white" />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Title & Description */}
            <div className="px-1 py-2">
              <h3 className="font-headline-sm text-base text-primary font-bold mb-1.5 group-hover:text-secondary transition-colors truncate">
                {reel.title}
              </h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                {reel.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <a
          href="https://www.youtube.com/@shivajikuche1798/shorts"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-[#E60000] text-white px-7 py-3 rounded-full font-label-caps text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Youtube size={16} />
          View All Shorts on YouTube
        </a>
      </div>
    </section>
  );
}
