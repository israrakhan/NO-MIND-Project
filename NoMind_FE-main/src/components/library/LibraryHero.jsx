import React from 'react'

export default function LibraryHero() {
  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center">
        
        {/* Left Column Text */}
        <div className="order-2 md:order-1">
          <span className="font-label-caps text-label-caps text-secondary mb-4 block uppercase tracking-widest font-bold">
            Knowledge Sanctuary
          </span>
          <h1 className="font-display-lg text-display-lg text-primary mb-6 font-bold leading-tight">
            The Library of Boundless Mind
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed">
            Explore the scholarly and spiritual lineage of Professor Shivaji Kuche. A collection of transformative literature, research papers, and ancient wisdom reimagined for the modern consciousness.
          </p>

        </div>

        {/* Right Column Image */}
        <div className="order-1 md:order-2 relative h-[360px] md:h-[480px] select-none">
          <div className="absolute inset-0 rounded-[24px] overflow-hidden shadow-lg border border-outline-variant/10">
            <img 
              className="w-full h-full object-cover" 
              alt="Serene, high-end library scene with soft afternoon sunlight streaming through windows."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9w9ZGvRIV2JL6dhJ-KUN-of0BqS7_DBY3DO6ki_j-ysrupxuk84DbRTxTujUcaIcEzhk8INTrLnPQbdI-trC1ewbCrtcBFmyNYiPnNfT1M04_y1K6Hs88Qw41V0_G1ekiFt1oLzaXnpGWY1jSYgPCzIlwtL86IHCu_8KiWF_g3LusskvkAMqVlKWdB75Ay8UBlzqmMzH1j4LeDlIPob8AHW40_yLBhkYey-7PF0tYE3Qh24iZSmVzjHPtZGm4jwQ4G41eUeWzaXo"
            />
          </div>
          
          {/* Aesthetic Blur Overlay */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-petal-pink/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        </div>

      </div>
    </header>
  )
}
