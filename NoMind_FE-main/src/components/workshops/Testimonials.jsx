import { useState, useEffect } from 'react'

export default function Testimonials() {
  const testimonials = [
    {
      text: "I personally attended Dr. Shivaji Kuche’s sessions in Mumbai. I had organized these sessions for my officers at Nariman Point, Mumbai. Dr. Kuche’s sessions are truly inspiring, highly motivating, and life-changing.",
      author: "Rajesh Dabre, IRS",
      designation: "Commissioner, Customs & GST"
    },
    {
      text: "I had the opportunity to experience Dr. Shivaji Kuche’s sessions personally. I organized his sessions for the entire Amravati Police Department, and I witnessed a remarkable transformation in the mindset, motivation, and overall performance of our police officers and personnel.",
      author: "Dr. Hari Balaji, IPS",
      designation: "SP, Amravati"
    },
    {
      text: "Dr. Shivaji Kuche has always been dedicated to serving society through seminars and motivational programs for students and people from all walks of life. I had the privilege of working with him, and I am truly proud to call him my friend.",
      author: "Swapnil Wankhede, IAS",
      designation: "Commissioner, Jabalpur"
    },
    {
      text: "When I was posted in Pune, Dr. Shivaji Kuche conducted an outstanding session for our police officers and personnel. His program was truly impactful and inspiring. I sincerely thank him for his valuable contribution.",
      author: "Abhinav Deshmukh, IPS",
      designation: "SP, Pune"
    },
    {
      text: "I personally attended Dr. Shivaji Kuche’s three-day meditation program. It was a truly beautiful and transformative experience. The meditation sessions were deeply peaceful, enriching, and inspiring.",
      author: "Dr. Dilip Bhujbal, IPS",
      designation: "IGP, Maharashtra"
    },
    {
      text: "When I was the General Manager at Raymond, Amravati, I invited Dr. Shivaji Kuche to conduct a program for our employees. His sessions brought about a remarkable transformation across the entire factory. We witnessed a significant positive change in the employees’ mindset, attitude, and politeness. It was truly an outstanding experience.",
      author: "Sanjay Sharma",
      designation: "Director, Raymond"
    }
  ];

  const getInitials = (name) => {
    const cleanName = name.replace('Dr. ', '').split(',')[0];
    const parts = cleanName.trim().split(' ');
    return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipping(true);
      
      // Swap content halfway through the 3D flip transition
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 250);

      setTimeout(() => {
        setIsFlipping(false);
      }, 500);

    }, 5000);
    
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto overflow-hidden bg-surface-container/30 rounded-[3rem] my-16 border border-outline-variant/10" id="testimonials">
      
      {/* Header */}
      <div className="text-center mb-12">
        <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">
          VOICES OF TRANSFORMATION
        </span>
        <h2 className="font-headline-md text-headline-md text-primary font-bold">
          Real Stories, Real Healing
        </h2>
      </div>

      {/* 3D Vertical Flip Card Container */}
      <div className="max-w-6xl mx-auto [perspective:1000px] pb-4 pt-4 px-12">
        <div 
          className={`bg-white rounded-[2rem] p-8 md:p-12 flex items-center shadow-xl border border-outline-variant/20 relative [transform-style:preserve-3d] transition-all duration-500 ease-in-out min-h-[380px] sm:min-h-[300px] md:min-h-[280px] ${
            isFlipping ? '[transform:rotateX(90deg)] opacity-0' : '[transform:rotateX(0deg)] opacity-100'
          }`}
        >
          {/* Circular Avatar overlapping the left edge */}
          <div className="absolute -left-10 md:-left-12 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#EEDCC8] border-[4px] border-white shadow-md flex items-center justify-center font-bold text-secondary text-base md:text-lg select-none">
            {getInitials(current.author)}
          </div>
          
          {/* Content Area */}
          <div className="pl-12 md:pl-16 flex-1 flex flex-col justify-between min-h-[180px]">
            <div>
              <blockquote className="font-quote text-quote text-primary italic mb-8 leading-relaxed font-semibold text-base md:text-lg">
                "{current.text}"
              </blockquote>
            </div>

            <div className="flex justify-between items-end border-t border-outline-variant/10 pt-6 mt-auto">
              <div>
                <p className="font-body-md font-bold text-primary text-sm md:text-base">{current.author}</p>
                {current.designation && (
                  <p className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold mt-0.5">{current.designation}</p>
                )}
              </div>
              
              {/* Pagination Dots */}
              <div className="flex gap-1.5 items-center">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (currentIndex === idx || isFlipping) return;
                      setIsFlipping(true);
                      setTimeout(() => {
                        setCurrentIndex(idx);
                      }, 250);
                      setTimeout(() => {
                        setIsFlipping(false);
                      }, 500);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx ? 'bg-secondary w-5' : 'bg-secondary/20 hover:bg-secondary/40'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Large decorative quote mark in the background */}
          <div className="absolute right-8 top-6 opacity-5 select-none pointer-events-none">
            <span className="material-symbols-outlined text-primary text-[100px] font-variation-settings-[FILL_1]">
              format_quote
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}
