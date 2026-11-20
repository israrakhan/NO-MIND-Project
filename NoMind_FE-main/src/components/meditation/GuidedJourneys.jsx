import { useNavigate } from 'react-router'
import { getMediaUrl } from '../../utils/cloudinary.js'

export default function GuidedJourneys() {
  const navigate = useNavigate();

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-stack-lg">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">Guided Journeys</h2>
          <p className="text-on-surface-variant mt-2 text-sm md:text-base">Explore curated paths for your specific intentions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        {/* Stress Relief Playlist Card */}
        <div className="md:col-span-7 group relative rounded-[2rem] overflow-hidden bg-surface-tan h-[400px] shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-700 select-none">
            <img 
              className="w-full h-full object-cover" 
              alt="A macro close-up of a person performing a peaceful yoga stretch in a soft-lit studio."
              src={getMediaUrl('image1.JPG')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-primary/10"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10">
            <h3 className="font-headline-md text-white text-headline-sm md:text-headline-md mb-4 font-bold">Stress Relief</h3>
            <p className="text-white/80 mb-6 max-w-md text-sm md:text-base leading-relaxed">
              Dissolve the weight of the day with somatic release and rhythmic breathing techniques.
            </p>
            <button 
              onClick={() => navigate('/connect')}
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-2.5 rounded-lg font-body-md hover:bg-white hover:text-primary transition-all active:scale-95 font-medium cursor-pointer"
            >
              Begin Journey
            </button>
          </div>
        </div>

        {/* Right side cards */}
        <div className="md:col-span-5 flex flex-col gap-gutter">
          
          {/* Spiritual Growth Card */}
          <div 
            onClick={() => navigate('/workshops')}
            className="min-h-[188px] rounded-[2rem] bg-secondary p-8 flex flex-col justify-between group cursor-pointer overflow-hidden relative shadow-sm hover:shadow-lg hover:bg-primary transition-all duration-300"
          >
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-secondary-container/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div className="relative z-10">
              <span className="font-label-caps text-label-caps text-petal-pink mb-2 block font-semibold tracking-widest">12 SESSIONS</span>
              <h3 className="font-headline-sm text-white text-headline-sm font-bold">
                Spiritual Growth
              </h3>
            </div>
            <div className="flex justify-between items-center relative z-10">
              <p className="text-white/80 text-sm max-w-[200px] leading-relaxed">
                Deepen your connection to the self and universal consciousness.
              </p>
              <span className="material-symbols-outlined text-white text-[36px] select-none">
                self_improvement
              </span>
            </div>
          </div>

          {/* Foundation Library Card */}
          <div 
            onClick={() => navigate('/library')}
            className="min-h-[188px] rounded-[2rem] bg-surface-tan p-8 flex items-center justify-center border border-outline-variant/20 hover:border-secondary/40 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-secondary shadow-sm group-hover:scale-105 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-[32px] select-none">auto_stories</span>
              </div>
              <h4 className="font-headline-sm text-primary text-body-lg font-bold">Foundation Library</h4>
              <p className="text-on-surface-variant text-sm mt-1">Readings &amp; Mantras</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
