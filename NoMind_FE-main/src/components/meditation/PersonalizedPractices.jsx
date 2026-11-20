import { useState, useEffect } from 'react'
import EnrollModal from '../workshops/EnrollModal'
import { getMediaUrl } from '../../utils/cloudinary.js'

export default function PersonalizedPractices({ searchQuery }) {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [scrolledY, setScrolledY] = useState(0)
  const [enrollTarget, setEnrollTarget] = useState(null)

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCourse]);

  const handleClose = () => {
    setSelectedCourse(null)
    setScrolledY(0)
  }

  const handleEnroll = (course) => {
    setEnrollTarget(course)
    setSelectedCourse(null)
    setScrolledY(0)
  }

  const practices = [
    {
      id: 'foundation-course',
      title: 'Foundation Course: Mind Transformation & Emotional Wellbeing Mastery',
      duration: '8 WEEKS',
      category: 'COURSES',
      fee: '₹15,000',
      description: 'An introductory mastery program focused on mental health, basic meditation, mind mechanics, and building resilience.',
      cover: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=640',
      artist: 'Prof. Shivaji Kuche',
      isCourse: true,
      modules: [
        "Introduction to Mental Health and Emotional Wellbeing",
        "Understanding the Mind: Conscious and Subconscious Mind",
        "The Science of Thoughts and Emotions",
        "Power of Positive Thinking",
        "Basics of Manifestation and the Law of Attraction",
        "Understanding Emotional Energy and Vibrational Frequency",
        "Introduction to Spirituality and Inner Peace",
        "Power of Gratitude and Affirmations",
        "Benefits of Naam Smaran (Chanting and Mantra Repetition)",
        "Introduction to Water Therapy and Positive Intention",
        "Understanding the Five Elements and Their Influence on Life",
        "Active Meditation and Relaxation Techniques",
        "Gibberish Meditation for Emotional Release",
        "Daily Habits for a Peaceful and Successful Life",
        "Designing Your Personal Morning and Evening Routine",
        "Goal Setting and Vision Creation",
        "Building Emotional Resilience",
        "Final Transformation Plan and Personal Action Blueprint"
      ]
    },
    {
      id: 'advanced-course',
      title: 'Advanced Course: Advanced Manifestation, Spiritual Intelligence & Emotional Mastery',
      duration: '12 WEEKS',
      category: 'COURSES',
      fee: '₹50,000',
      description: 'Deep-dive program focusing on neuroscience, subconscious reprogramming, high-frequency living, and purpose alignment.',
      cover: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=640',
      artist: 'Prof. Shivaji Kuche',
      isCourse: true,
      modules: [
        "Psychology of Human Behaviour and Emotional Patterns",
        "Neuroscience of Thoughts and Emotions",
        "Advanced Law of Attraction and Manifestation Principles",
        "Energy, Vibration and Frequency Alignment",
        "Reprogramming the Subconscious Mind",
        "Limiting Beliefs and Emotional Blocks",
        "The Science of Visualization and Mental Rehearsal",
        "Spiritual Intelligence and Conscious Living",
        "Karma, Awareness and Mindfulness",
        "Power of Naam Smaran and Sacred Sound Vibrations",
        "Different Types of Chanting and Their Effects",
        "Water Therapy and the Power of Intention",
        "Understanding the Five Elements for Inner Balance",
        "Active Meditation Techniques",
        "Gibberish Meditation for Emotional Detoxification",
        "Breathwork and Energy Activation Practices",
        "Emotional Healing and Forgiveness Techniques",
        "Building a High-Frequency Personality",
        "Creating Abundance and Prosperity Mindset",
        "Relationship and Communication Mastery",
        "Designing a High-Performance Daily Routine",
        "Leadership Through Emotional Intelligence",
        "Purpose, Vision and Life Mission",
        "Personal Transformation Project",
        "Certification and Transformation Presentation"
      ]
    },
    {
      id: 'mastery-trainer-course',
      title: 'Mastery & Trainer Certification Program: Master Coach in Mental Health, Manifestation & Conscious Living',
      duration: '6 MONTHS',
      category: 'COURSES',
      fee: '₹75,000',
      description: 'Professional coach and facilitator certification covering trauma release, public speaking, sound healing, and brand building.',
      cover: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=640',
      artist: 'Prof. Shivaji Kuche',
      isCourse: true,
      modules: [
        "Foundations of Mental Health and Emotional Wellbeing",
        "Advanced Psychology of Human Behaviour",
        "Neuroscience and Neuroplasticity",
        "Subconscious Mind Reprogramming",
        "Advanced Manifestation and Universal Principles",
        "Quantum Thinking and Possibility Mindset",
        "Emotional Intelligence Mastery",
        "Energy Management and Frequency Alignment",
        "Spiritual Intelligence and Conscious Leadership",
        "Deep Study of Naam Smaran and Mantra Science",
        "Advanced Chanting and Sound Healing",
        "Meditation Science and States of Consciousness",
        "Active Meditation Facilitator Training",
        "Gibberish Meditation Facilitator Training",
        "Water Therapy and Mind-Body Connection",
        "Five Elements and Energy Balancing",
        "Mindfulness and Presence Practices",
        "Emotional Healing and Trauma Release Techniques",
        "Forgiveness and Inner Child Healing",
        "Habit Transformation and Identity Change",
        "Stress Management and Burnout Prevention",
        "Purpose Discovery and Life Vision",
        "Building an Abundance Mindset",
        "Success Psychology and Peak Performance",
        "Relationship Transformation Principles",
        "Communication and Public Speaking Skills",
        "Coaching and Facilitation Skills",
        "Designing Transformational Workshops",
        "Group Dynamics and Participant Engagement",
        "Creating a Personal Brand and Coaching Business",
        "Conducting Seminars and Corporate Training Programs",
        "Ethics and Responsibilities of a Wellness Coach",
        "Capstone Transformation Project",
        "Live Workshop Presentation",
        "Certification as a Transformation Coach"
      ]
    },


  ]

  // Filter practices based on search query
  const filteredPractices = practices.filter(practice => {
    const matchesSearch = practice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      practice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      practice.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const getGridClasses = () => {
    const count = filteredPractices.length
    if (count === 1) {
      return "grid grid-cols-1 gap-12 max-w-sm mx-auto justify-center"
    }
    if (count === 2) {
      return "grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-3xl mx-auto justify-center"
    }
    if (count === 3) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto justify-center"
    }
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 justify-center"
  }

  const handlePracticeClick = (practice) => {
    if (practice.isCourse) {
      setSelectedCourse(practice)
      setScrolledY(0)
    } else {
      alert(`Starting audio session: ${practice.title}`)
    }
  }

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-stack-lg mb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">Personalized Practices &amp; Courses</h2>
          <p className="text-on-surface-variant mt-2 text-sm md:text-base">
            Recommended audio sessions and professional certification programs.
          </p>
        </div>
      </div>

      {filteredPractices.length > 0 ? (
        <div className={getGridClasses()}>
          {filteredPractices.map(practice => {
            return (
              <div
                key={practice.id}
                onClick={() => handlePracticeClick(practice)}
                className="bg-surface-tan rounded-[1.5rem] p-4 flex flex-col group cursor-pointer transition-all hover:shadow-[0_20px_40px_rgba(74,54,45,0.08)] border-2 border-transparent hover:border-outline-variant/30"
              >
                {/* Image container */}
                <div className="aspect-square rounded-xl overflow-hidden mb-4 relative select-none">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl transition-transform active:scale-90 select-none">
                      {practice.isCourse ? 'menu_book' : 'play_arrow'}
                    </span>
                  </div>
                  <img
                    className="w-full h-full object-cover"
                    alt={practice.title}
                    src={practice.cover}
                  />
                </div>

                <span className="font-label-caps text-label-caps text-secondary mb-1 font-bold">
                  {practice.duration} • {practice.category} {practice.isCourse && `• ${practice.fee}`}
                </span>

                <h4 className="font-headline-sm text-primary text-[18px] font-bold group-hover:text-secondary transition-colors">
                  {practice.title}
                </h4>

                <p className="text-on-surface-variant text-sm mt-1 line-clamp-2 leading-relaxed flex-1">
                  {practice.description}
                </p>

                <div className="mt-3 text-xs text-outline font-semibold flex items-center justify-between border-t border-outline-variant/10 pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">person</span>
                    {practice.artist}
                  </div>
                  {practice.isCourse && (
                    <span className="text-[10px] font-label-caps text-secondary font-bold uppercase tracking-wider">
                      View Modules
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-surface-container rounded-2xl py-16 px-6 text-center border border-outline-variant/20 max-w-lg mx-auto">
          <span className="material-symbols-outlined text-outline text-5xl mb-4 select-none">search_off</span>
          <h3 className="font-headline-sm text-primary font-bold">No items found</h3>
          <p className="text-on-surface-variant mt-2 text-sm leading-relaxed">
            We couldn't find any items matching your search. Try checking your spelling or clearing the search query.
          </p>
        </div>
      )}

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-primary/20 backdrop-blur-md">
          <main 
            className="modal-container relative w-full max-w-4xl h-[90vh] md:h-[85vh] md:max-h-[820px] bg-surface-container-low border border-outline-variant/50 shadow-2xl overflow-hidden flex flex-col rounded-[2rem] animate-in fade-in zoom-in-95 duration-200"
            data-lenis-prevent
          >
            {/* Top App Bar (Anchored) */}
            <header className="bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-20 flex justify-between items-center w-full px-6 h-16 shrink-0">
              <div className="flex items-center gap-3">
                <img src={getMediaUrl('logo.png')} className="h-5 w-auto object-contain" alt="" />
                <span className="font-label-sm text-label-sm tracking-[0.2em] uppercase text-outline">
                  No Mind Foundation
                </span>
              </div>
              <button 
                onClick={handleClose}
                className="hover:bg-surface-variant transition-colors p-2 rounded-full group cursor-pointer"
              >
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary select-none text-[20px]">
                  close
                </span>
              </button>
            </header>

            {/* Scrollable Content Area */}
            <div 
              className="flex-grow overflow-y-auto custom-scrollbar"
              onScroll={(e) => setScrolledY(e.currentTarget.scrollTop)}
            >
              {/* Hero Section */}
              <section className="relative h-[150px] sm:h-[180px] md:h-[220px] w-full overflow-hidden shrink-0 select-none">
                <div 
                  className="absolute inset-0 bg-cover bg-center brightness-90 saturate-[0.8] transition-transform duration-75" 
                  style={{ 
                    backgroundImage: `url('${selectedCourse.cover}')`,
                    transform: `scale(${1 + scrolledY * 0.00015}) translateY(${scrolledY * 0.15}px)`
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary text-on-primary font-label-sm text-[10px] tracking-widest uppercase font-bold rounded-sm">
                      {selectedCourse.id === 'foundation-course' ? 'Phase 01' : selectedCourse.id === 'advanced-course' ? 'Phase 02' : 'Phase 03'}
                    </span>
                    <span className="text-white drop-shadow-md text-[10px] tracking-[0.3em] font-bold uppercase">
                      {selectedCourse.id === 'foundation-course' ? 'Mind.Transformation_v1.0' : selectedCourse.id === 'advanced-course' ? 'Spiritual.Intelligence_v2.0' : 'Conscious.Coaching_v3.0'}
                    </span>
                  </div>
                  <h1 className="font-display-lg text-xl sm:text-3xl md:text-5xl text-white drop-shadow-lg tracking-tight font-bold">
                    {selectedCourse.title.split(': ')[0]}
                  </h1>
                </div>
              </section>

              {/* Description & Core Info */}
              <section className="px-4 py-6 md:px-12 md:py-10 space-y-8 md:space-y-10">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <h2 className="font-headline-md text-lg sm:text-xl md:text-2xl text-primary-container leading-tight font-bold">
                      {selectedCourse.title.split(': ')[1] || selectedCourse.title}
                    </h2>
                    <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed border-l-2 border-outline-variant/50 pl-4 md:pl-6">
                      {selectedCourse.description}
                    </p>
                  </div>
                  {/* Utilitarian Data Sidebar */}
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:space-y-4">
                    <div 
                      className="data-card bg-surface-container-lowest p-4 md:p-5 border-l-4 border-primary shadow-sm border border-outline-variant/10"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}
                    >
                      <p className="font-label-sm text-[9px] md:text-[10px] text-outline uppercase tracking-[0.2em] mb-1 font-semibold">Program Duration</p>
                      <p className="font-display-lg text-xl sm:text-2xl md:text-3xl text-on-surface font-bold">
                        {selectedCourse.duration.split(' ')[0]}{' '}
                        <span className="text-sm font-label-lg text-outline font-semibold">
                          {selectedCourse.duration.split(' ')[1] || 'WEEKS'}
                        </span>
                      </p>
                    </div>
                    <div 
                      className="data-card bg-surface-container-lowest p-4 md:p-5 border-l-4 border-secondary shadow-sm border border-outline-variant/10"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}
                    >
                      <p className="font-label-sm text-[9px] md:text-[10px] text-outline uppercase tracking-[0.2em] mb-1 font-semibold">Course Investment</p>
                      <p className="font-display-lg text-xl sm:text-2xl md:text-3xl text-secondary font-bold">{selectedCourse.fee}</p>
                    </div>
                  </div>
                </div>

                {/* Course Modules Preview (Utilitarian List) */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                    <h3 className="font-label-lg text-label-lg text-on-surface uppercase tracking-[0.2em] font-bold">
                      Syllabus Modules ({selectedCourse.modules.length})
                    </h3>
                    <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                      {selectedCourse.title.split(': ')[0].toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid gap-px bg-outline-variant/30 border border-outline-variant/30 overflow-hidden rounded-lg">
                    {selectedCourse.modules.map((mod, index) => (
                      <div key={index} className="flex items-start md:items-center p-4 md:p-5 bg-surface-container-lowest">
                        <div className="font-mono text-outline text-xs mr-3 md:mr-6 mt-0.5 md:mt-0">
                          {(index + 1).toString().padStart(2, '0')}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-label-lg text-on-surface font-semibold text-sm">
                            {mod}
                          </h4>
                          <p className="text-[11px] text-on-surface-variant uppercase tracking-wider mt-1 font-medium">
                            Module.{(index + 1).toString().padStart(2, '0')} / Syllabus Module
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Bottom Bar Navigation */}
            <nav className="bg-surface-container-lowest border-t border-outline-variant/30 px-6 py-6 flex flex-row items-center justify-between gap-4 shrink-0">
              <button 
                onClick={handleClose}
                className="text-outline font-label-lg text-xs uppercase tracking-[0.2em] hover:text-primary transition-colors px-4 py-2 cursor-pointer font-bold"
              >
                Return
              </button>
              <button 
                onClick={() => handleEnroll(selectedCourse)}
                className="relative px-6 sm:px-10 py-4 flex items-center justify-center font-label-caps text-xs tracking-widest uppercase font-bold bg-primary-container text-white hover:brightness-110 active:scale-[0.98] transition-all group overflow-hidden rounded-lg shadow-md cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  <span className="material-symbols-outlined mr-2 sm:mr-3 text-[18px]">school</span>
                  Enroll
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
              </button>
            </nav>
          </main>
        </div>
      )}

      {/* Enroll Form Modal */}
      {enrollTarget && (
        <EnrollModal
          program={enrollTarget}
          onClose={() => setEnrollTarget(null)}
        />
      )}
    </section>
  )
}
