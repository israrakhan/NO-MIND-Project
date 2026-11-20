import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function LandingRetreats() {
  const col1 = [
    {
      text: 'When I was posted in Pune, Dr. Shivaji Kuche conducted an outstanding session for our police officers and personnel. His program was truly impactful and inspiring. I sincerely thank him for his valuable contribution.',
      author: 'Abhinav Deshmukh, IPS',
      designation: ''
    },
    {
      text: 'I personally attended Dr. Shivaji Kuche’s three-day meditation program. It was a truly beautiful and transformative experience. The meditation sessions were deeply peaceful, enriching, and inspiring.',
      author: 'Dr. Dilip Bhujbal, IPS',
      designation: ''
    },
    {
      text: 'The mindfulness and meditation practices offered by No Mind have completely reshaped how I handle high-stress environments. I feel more centered, clear, and energized throughout my daily routine.',
      author: 'Priya Sen',
      designation: 'Senior Software Architect'
    }
  ];

  const col2 = [
    {
      text: 'I had the opportunity to experience Dr. Shivaji Kuche’s sessions personally. I organized his sessions for the entire Amravati Police Department, and I witnessed a remarkable transformation in the mindset, motivation, and overall performance of our police officers and personnel.',
      author: 'Dr. Hari Balaji, IPS',
      designation: ''
    },
    {
      text: 'Dr. Shivaji Kuche has always been dedicated to serving society through seminars and motivational programs for students and people from all walks of life. I had the privilege of working with him, and I am truly proud to call him my friend.',
      author: 'Swapnil Wankhede, IAS',
      designation: 'Commissioner, Jabalpur'
    },
    {
      text: 'I enrolled in the retreats with an open mind, and left with a profound sense of self-awareness. The guidance and philosophy are highly practical and easily integrated into a modern lifestyle.',
      author: 'Vikram Aditya',
      designation: 'Creative Director'
    }
  ];

  const col3 = [
    {
      text: 'I personally attended Dr. Shivaji Kuche’s sessions in Mumbai. I had organized these sessions for my officers at Nariman Point, Mumbai. Dr. Kuche’s sessions are truly inspiring, highly motivating, and life-changing.',
      author: 'Rajesh Dabre, IRS',
      designation: 'Commissioner, Customs & GST'
    },
    {
      text: 'Silence is not the absence of sound, but the presence of self. When you drop the noise of the mind, the universe begins to speak.',
      author: 'Prof. Shivaji Kuche',
      designation: 'Founder of No Mind Philosophy'
    },
    {
      text: 'When I was the General Manager at Raymond, Amravati, I invited Dr. Shivaji Kuche to conduct a program for our employees. His sessions brought about a remarkable transformation across the entire factory. We witnessed a significant positive change in the employees’ mindset, attitude, and politeness.',
      author: 'Sanjay Sharma',
      designation: 'Director, Raymond'
    }
  ];

  const renderCard = (card, index) => {
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="bg-white border border-outline-variant/30 rounded-none p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[200px]"
      >
        {/* Quote Content */}
        <div className="flex flex-col items-center text-center">
          <Quote className="text-secondary/20 rotate-180 mb-2" size={28} />
          <blockquote className="font-body-md text-sm md:text-base text-primary leading-relaxed mb-4 font-medium italic">
            "{card.text}"
          </blockquote>
        </div>
        
        {/* Author Details */}
        <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3 mt-auto">
          <div className="text-left">
            <p className="font-body-md font-bold text-primary text-xs md:text-sm">{card.author}</p>
            {card.designation && (
              <p className="text-[9px] font-label-caps text-on-surface-variant uppercase tracking-wider font-semibold mt-0.5">{card.designation}</p>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto relative select-text" id="testimonials">
      
      {/* Header */}
      <div className="text-center mb-16">
        <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest font-bold">
          VOICES OF TRANSFORMATION
        </span>
        <h2 className="font-headline-md text-headline-md text-primary font-bold">
          Real Stories, Real Healing
        </h2>
      </div>

      {/* Masonry Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          {col1.map((card, idx) => renderCard(card, idx))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          {col2.map((card, idx) => renderCard(card, idx))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6">
          {col3.map((card, idx) => renderCard(card, idx))}
        </div>
      </div>

    </section>
  );
}
