import { getMediaUrl } from '../../utils/cloudinary.js'

export default function ResourceArchive({ searchQuery, searchCategory }) {
  // All resources data
  const resources = [
    {
      id: 'paper-neural-correlates',
      type: 'paper',
      category: 'Research Papers',
      tag: 'ACADEMIC PAPER',
      date: 'OCT 2023',
      title: 'Neural Correlates of No-Mind Meditation: A Longitudinal Study',
      desc: "A peer-reviewed exploration into the neuroplastic changes observed in long-term practitioners of Professor Kuche's meditation techniques. This paper details the shift in the default mode network during periods of absolute silence.",
      author: 'Prof. Shivaji Kuche',
      keywords: ['neural', 'correlates', 'academic', 'research', 'meditation', 'longitudinal', 'brain', 'science']
    },
    {
      id: 'book-power-subconscious-mind',
      type: 'book',
      category: 'Practical Guides',
      tag: 'PRACTICAL GUIDE',
      title: 'The Power of Your Subconscious Mind',
      cover: getMediaUrl('power_subconscious_mind.png'),
      amazonUrl: 'https://www.amazon.in/Power-Your-Subconscious-Mind-Success/dp/8172345666?s=bazaar',
      keywords: ['power', 'subconscious', 'mind', 'book', 'practical', 'guide', 'meditation']
    },
    {
      id: 'book-learning-silence-mind',
      type: 'book',
      category: 'Philosophical Texts',
      tag: 'SPIRITUAL WISDOM',
      title: 'Learning to Silence the Mind',
      cover: getMediaUrl('learning_silence_mind.png'),
      amazonUrl: 'https://www.amazon.in/Learning-Silence-Mind-Osho/dp/1250006228/ref=sr_1_1?crid=2SI1TR8ZCDQ3J&dib=eyJ2IjoiMSJ9.EbceDrWF4f_S9Zbmeg-hqaNORaia-RYKhxUxrzHtb2Erf1MUZ1bgyh1cj6Vq0Wlo4lLQkeC22bmoohqMN3DjI9D4F98Rz34d91XI0Q8IcWDA9-GjK84pPBOiMtu-n3YrjaWfg1goBMSRueZWF1m2iSBpbPUSr4YxGTkXCyMChoKImYfVEazfk3Bgl4FFJVlMSeZK4-HjHEG0g7I9h3J90kwTVTuUIEMS_R4MPBgFlMg.S1DG_lhFiZHjP39bHx2a7EcI9vWUAi05aDNiBZ6W5SU&dib_tag=se&keywords=learning+to+silence+the+mind&qid=1783944480&sprefix=learning+to+silence+the+mind%2Caps%2C339&sr=8-1',
      keywords: ['learning', 'silence', 'mind', 'book', 'osho', 'philosophy', 'meditation']
    },
    {
      id: 'audio-companion-series',
      type: 'audio',
      category: 'Practical Guides',
      title: 'Companion Audio Series',
      desc: "Listen to Professor Kuche narrate key chapters and guide you through the foundational meditations mentioned in his books.",
      keywords: ['audio', 'chapter', 'void', 'peace', 'narration', 'listen']
    }
  ]

  // Filter logic
  const filtered = resources.filter(res => {
    const matchesCategory = searchCategory === 'All Resources' || res.category === searchCategory
    const matchesSearch = searchQuery === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.desc && res.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
      res.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Check if a specific resource is visible in the filtered results
  const isVisible = (id) => filtered.some(res => res.id === id)

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg" id="resource-archive">

      {/* Header */}
      <div className="flex justify-between items-end mb-stack-md">
        <div>
          <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">Archive</span>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">Publications &amp; Research</h2>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-stretch">

          {/* Research Article Card (Span 2) */}
          {isVisible('paper-neural-correlates') && (
            <div className="md:col-span-2 bg-[#EEDCC8] hover:shadow-[0_20px_25px_-5px_rgba(74,54,45,0.08)] hover:-translate-y-1 transition-all duration-300 p-8 rounded-[24px] flex flex-col justify-between border border-outline-variant/10">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-surface px-3 py-1 rounded-full font-label-caps text-[10px] text-secondary font-bold">
                    ACADEMIC PAPER
                  </span>
                  <span className="text-on-surface-variant font-label-caps text-label-caps font-semibold">
                    OCT 2023
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-4 font-bold">
                  Neural Correlates of No-Mind Meditation: A Longitudinal Study
                </h3>
                <p className="font-body-md text-on-surface-variant mb-6 text-sm md:text-base leading-relaxed">
                  A peer-reviewed exploration into the neuroplastic changes observed in long-term practitioners of Professor Kuche's meditation techniques. This paper details the shift in the default mode network during periods of absolute silence.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-6 border-t border-primary/15">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center border border-primary/5 select-none font-bold text-primary text-sm shadow-inner">
                    SK
                  </div>
                  <span className="font-body-md font-bold text-primary text-sm">Prof. Shivaji Kuche</span>
                </div>
                <a
                  onClick={(e) => { e.preventDefault(); alert("Opening academic index paper..."); }}
                  className="text-secondary font-semibold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer text-sm"
                  href="#"
                >
                  Read Full PDF
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </div>
            </div>
          )}

          {/* Book Item 1 */}
          {isVisible('book-power-subconscious-mind') && (
            <div className="bg-[#EEDCC8] hover:shadow-[0_20px_25px_-5px_rgba(74,54,45,0.08)] hover:-translate-y-1 transition-all duration-300 p-4 rounded-[24px] flex flex-col justify-between border border-outline-variant/10">
              <div>
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 select-none border border-outline-variant/20 shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    alt="Book cover for 'The Power of Your Subconscious Mind' by Dr. Joseph Murphy."
                    src={getMediaUrl('power_subconscious_mind.png')}
                  />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-bold truncate" title="The Power of Your Subconscious Mind">
                  The Power of Your Subconscious Mind
                </h3>
                <p className="font-label-caps text-label-caps text-secondary mb-4 font-bold tracking-wider">
                  PRACTICAL GUIDE
                </p>
              </div>
              <a
                href="https://www.amazon.in/Power-Your-Subconscious-Mind-Success/dp/8172345666?s=bazaar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary font-semibold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer text-sm pt-4 border-t border-primary/10 mt-auto"
              >
                Get on Amazon
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
          )}

          {/* Book Item 2 */}
          {isVisible('book-learning-silence-mind') && (
            <div className="bg-[#EEDCC8] hover:shadow-[0_20px_25px_-5px_rgba(74,54,45,0.08)] hover:-translate-y-1 transition-all duration-300 p-4 rounded-[24px] flex flex-col justify-between border border-outline-variant/10">
              <div>
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 select-none border border-outline-variant/20 shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    alt="Book cover for 'Learning to Silence the Mind' by Osho."
                    src={getMediaUrl('learning_silence_mind.png')}
                  />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-bold truncate" title="Learning to Silence the Mind">
                  Learning to Silence the Mind
                </h3>
                <p className="font-label-caps text-label-caps text-secondary mb-4 font-bold tracking-wider">
                  SPIRITUAL WISDOM
                </p>
              </div>
              <a
                href="https://www.amazon.in/Learning-Silence-Mind-Osho/dp/1250006228/ref=sr_1_1?crid=2SI1TR8ZCDQ3J&dib=eyJ2IjoiMSJ9.EbceDrWF4f_S9Zbmeg-hqaNORaia-RYKhxUxrzHtb2Erf1MUZ1bgyh1cj6Vq0Wlo4lLQkeC22bmoohqMN3DjI9D4F98Rz34d91XI0Q8IcWDA9-GjK84pPBOiMtu-n3YrjaWfg1goBMSRueZWF1m2iSBpbPUSr4YxGTkXCyMChoKImYfVEazfk3Bgl4FFJVlMSeZK4-HjHEG0g7I9h3J90kwTVTuUIEMS_R4MPBgFlMg.S1DG_lhFiZHjP39bHx2a7EcI9vWUAi05aDNiBZ6W5SU&dib_tag=se&keywords=learning+to+silence+the+mind&qid=1783944480&sprefix=learning+to+silence+the+mind%2Caps%2C339&sr=8-1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary font-semibold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer text-sm pt-4 border-t border-primary/10 mt-auto"
              >
                Get on Amazon
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
          )}

          {/* Bento: YouTube Shorts & Reels */}
          {isVisible('audio-companion-series') && (
            <div className="md:col-span-2 bg-primary-container text-on-primary-container p-8 rounded-[24px] relative overflow-hidden group shadow-md border border-white/5 flex flex-col sm:flex-row gap-6 items-center justify-between">
              <div className="relative z-10 flex-1">
                <span className="font-label-caps text-label-caps text-petal-pink font-bold uppercase tracking-wider mb-2 block">
                  YouTube Shorts &amp; Reels
                </span>
                <h3 className="font-headline-sm text-headline-sm text-white mb-4 font-bold">
                  Wisdom in Motion
                </h3>
                <p className="text-on-primary-container/80 mb-8 text-sm md:text-base leading-relaxed max-w-md">
                  Watch quick video teachings, daily meditation guidelines, and philosophical insights directly from our channel.
                </p>
                <a 
                  href="https://www.youtube.com/@shivajikuche1798/featured"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-petal-pink font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all text-sm cursor-pointer"
                >
                  Watch Channel
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>

              {/* YouTube Shorts Vertical Preview Card */}
              <div className="relative z-10 w-full sm:w-[150px] md:w-[170px] shrink-0 select-none">
                <a 
                  href="https://www.youtube.com/@shivajikuche1798/featured"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[9/16] w-full rounded-2xl overflow-hidden group/short cursor-pointer shadow-lg border border-white/10"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=640"
                    alt="YouTube Shorts Preview"
                    className="w-full h-full object-cover group-hover/short:scale-105 transition-transform duration-500 opacity-90"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover/short:bg-black/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-md group-hover/short:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-[24px] font-variation-settings-[FILL_1]">
                        play_arrow
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Decorative Graphic */}
              <div className="absolute right-[-10%] bottom-[-20%] w-64 h-64 border-[20px] border-on-primary-container/10 rounded-full select-none pointer-events-none"></div>
            </div>
          )}

        </div>
      ) : (
        <div className="bg-surface-container rounded-2xl py-12 px-6 text-center border border-outline-variant/20 max-w-lg mx-auto">
          <span className="material-symbols-outlined text-outline text-5xl mb-4 select-none">search_off</span>
          <h3 className="font-headline-sm text-primary font-bold">No resources matched</h3>
          <p className="text-on-surface-variant mt-2 text-sm">
            Try adjusting your search terms or picking another category.
          </p>
        </div>
      )}

    </section>
  )
}
