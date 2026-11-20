import { getMediaUrl } from '../../utils/cloudinary.js'

export default function FeaturedBook({ onOpenPreview }) {
  return (
    <section className="bg-surface-container-low py-stack-lg mb-stack-lg border-y border-outline-variant/10" id="featured-book">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          
          {/* Left Column: Book Cover Image */}
          <div className="lg:col-span-5 relative group select-none">
            <div className="aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02] border border-outline-variant/20">
              <img 
                className="w-full h-full object-cover" 
                alt="Book cover for Rahasya Manacha by Professor Shivaji Kuche."
                src={getMediaUrl('BookImage.png')}
              />
            </div>
            <div className="absolute top-2 left-1/2 lg:-left-2 -translate-x-1/2 lg:translate-x-0 bg-secondary text-on-secondary px-4 py-1.5 rounded-lg font-label-caps text-[10px] font-bold shadow-md select-none">
              BESTSELLER
            </div>
          </div>

          {/* Right Column: Descriptions */}
          <div className="lg:col-span-7 lg:pl-12 mt-8 lg:mt-0">
            <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">
              Professor's Masterpiece
            </span>
            <h2 className="font-headline-md text-headline-md text-primary mb-2 font-bold leading-tight">
              Rahasya Manache
            </h2>
            <h3 className="font-body-lg text-body-lg text-secondary italic mb-6">
              Secrets of the Mind &amp; The Journey Inward
            </h3>
            
            <div className="prose font-body-md text-on-surface-variant mb-8 space-y-4 text-sm md:text-base leading-relaxed">
              <p>
                Professor Shivaji Kuche's magnum opus explores the intricate layers of human consciousness. Bridging modern psychology with ancient Vedic insights, this publication serves as a roadmap for the silent revolutionary.
              </p>
              
              <div className="flex gap-8 py-5 border-y border-outline-variant/30 my-6">
                <div>
                  <span className="block font-label-caps text-label-caps text-secondary font-bold tracking-wider">PAGES</span>
                  <span className="font-bold text-primary text-lg mt-0.5 block">342</span>
                </div>
                <div className="border-l border-outline-variant/20 pl-8">
                  <span className="block font-label-caps text-label-caps text-secondary font-bold tracking-wider">LANGUAGE</span>
                  <span className="font-bold text-primary text-lg mt-0.5 block">Marathi</span>
                </div>
                <div className="border-l border-outline-variant/20 pl-8">
                  <span className="block font-label-caps text-label-caps text-secondary font-bold tracking-wider">RATING</span>
                  <span className="font-bold text-primary text-lg mt-0.5 block flex items-center gap-1">
                    4.9 <span className="material-symbols-outlined text-secondary text-[16px] select-none" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">

              
              <button 
                onClick={onOpenPreview}
                className="inline-flex items-center justify-center gap-2 border-[1.5px] border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined select-none text-[20px]">menu_book</span>
                Preview Chapter 1
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
