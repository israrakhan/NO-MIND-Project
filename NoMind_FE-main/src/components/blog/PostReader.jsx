import React, { useEffect } from 'react'

export default function PostReader({ post, onClose }) {
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [post]);

  if (!post) return null

  const handleOutsideClick = (e) => {
    if (e.target.id === 'post-reader-overlay') {
      onClose()
    }
  }

  return (
    <div
      id="post-reader-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative bg-surface rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-outline-variant/30 animate-scale-up">
        
        {/* Modal Header */}
        <div className="p-6 flex justify-between items-center border-b border-outline-variant/30 bg-surface-container-low">
          <div className="flex items-center gap-3">
            <span className="bg-secondary text-on-secondary px-3.5 py-1 rounded-full font-label-caps text-[10px] font-bold">
              {post.category.toUpperCase()}
            </span>
            <span className="text-on-surface-variant font-label-caps text-label-caps font-semibold">
              {post.readTime}
            </span>
          </div>
          <button
            onClick={onClose}
            className="material-symbols-outlined text-primary hover:text-secondary text-[24px] cursor-pointer select-none"
            aria-label="Close article"
          >
            close
          </button>
        </div>

        {/* Scrollable Article Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 font-body-lg text-on-surface-variant leading-relaxed text-sm md:text-base" data-lenis-prevent>
          
          <h1 className="font-display-lg text-2xl md:text-4xl mb-6 text-primary font-bold leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-10 border-b border-outline-variant/15 pb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shadow-inner">
              {post.author.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-primary">{post.author}</p>
              <p className="text-[10px] text-outline mt-0.5">{post.date} • Sanctuary Journal Writer</p>
            </div>
          </div>

          {/* Article Text Content simulation */}
          <div className="space-y-6">
            <p className="font-quote text-quote text-primary italic leading-relaxed font-semibold">
              "{post.desc}"
            </p>
            <p>
              When we analyze the human brain in states of constant sensory inputs—notably the persistent pinging of modern digital notifications—the Default Mode Network (DMN) remains in a state of hyper-excitation. The DMN is primarily active when we are daydreaming, thinking about the future, or ruminating about self-referential narratives. It is, in essence, the neurological substrate of the "I" or the ego.
            </p>
            <p>
              Professor Shivaji Kuche explains that ancient meditative practices directly quiet this network. In our clinical observations using fMRI scans of practitioners under deep stillness, we noticed a sharp drop in blood flow to DMN hub centers. This deactivation correlates directly with the subjective experience of "No Mind" or absolute silent presence.
            </p>
            <div className="bg-surface-tan p-8 rounded-2xl border-l-4 border-secondary my-8 shadow-inner">
              <p className="font-quote text-quote text-primary font-medium italic text-base md:text-lg">
                "Neuro-Linguistic reframing helps dismantle negative default self-talk. Meditation then steps in to quiet the mental workspace entirely."
              </p>
            </div>
            <p>
              To integrate this practice into daily life, one must first identify the cognitive "triggers" that stimulate DMN activity. Using language reframing, we replace anxious anticipations with a simple statement of presence. For example, replacing "I have so much to do, I will fail" with "In this breath, there is only this task." Followed by a three-minute silent pause, this simple exercise triggers immediate physiological deceleration.
            </p>
            <p>
              As we continue our research at the No Mind Foundation, we remain committed to verifying these ancient paths with rigorous neurological frameworks, proving that the luxury of absolute stillness is not just an aesthetic escape, but a biological necessity for healing.
            </p>
          </div>

          {/* Action Button at the end of article */}
          <div className="mt-12 pt-8 border-t border-outline-variant/25 flex justify-end">
            <button
              onClick={onClose}
              className="bg-secondary text-on-secondary px-8 py-3 rounded-lg hover:bg-primary transition-all active:scale-95 cursor-pointer font-semibold shadow-sm"
            >
              Back to Blogs
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
