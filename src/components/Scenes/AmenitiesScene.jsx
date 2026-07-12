import React, { useEffect, useRef, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AMENITIES = [
  {
    title: "Calibrated Foundation Audits",
    desc: "We pull structural core soil logs and measure Safe Bearing Capacity limits. Raft footings are cast over high-density elastomer barriers to isolate moisture transfers completely.",
    bigImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&auto=format&fit=crop",
    smallImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=600&auto=format&fit=crop"
  },
  {
    title: "LOD 400 BIM Coordination",
    desc: "Every beam, column, and utility conduit is mapped inside our digital twin model. We resolve geometric clashes in pre-construction to guarantee absolute routing precision on site.",
    bigImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop",
    smallImage: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&auto=format&fit=crop"
  },
  {
    title: "Tactile Material Providence",
    desc: "We maintain digital ledger receipts of all primary raw materials. Sourcing natural travertine blocks, solid Burma teak logs, and Fe550D reinforcement rebars directly from partner mills.",
    bigImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1000&auto=format&fit=crop",
    smallImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop"
  }
];

export default function AmenitiesScene() {
  const containerRef = useRef();
  const triggerRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    // Pin section and cycle indices on scroll progress
    const pin = ScrollTrigger.create({
      trigger: triggerRef.current,
      pin: true,
      start: "top top",
      end: "+=1500",
      onUpdate: (self) => {
        const prog = self.progress;
        const idx = Math.min(Math.floor(prog * 3), 2);
        setActiveIndex(idx);
        setLineProgress(prog * 100);
      }
    });

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative z-10 select-none">
      <section className="h-screen w-full bg-charcoal flex items-center px-8 md:px-16 overflow-hidden">
        
        {/* Fine background lines */}
        <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Visual Showcase (Double Overlapping Images) */}
          <div className="col-span-12 md:col-span-6 relative flex items-center justify-center h-[50vh] md:h-[65vh]">
            
            {AMENITIES.map((item, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                  idx === activeIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
                }`}
              >
                {/* Big primary image */}
                <div className="w-[70%] h-[80%] overflow-hidden border border-white/5 bg-white/20 relative img-zoom-hover shadow-2xl -translate-x-8">
                  <img 
                    src={item.bigImage} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale-[20%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/40 to-transparent"></div>
                </div>

                {/* Small overlay secondary image */}
                <div className="absolute right-0 bottom-4 w-[40%] aspect-[4/5] overflow-hidden border border-white/10 bg-white/20 shadow-2xl translate-y-4">
                  <img 
                    src={item.smallImage} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale-[10%]"
                  />
                </div>
              </div>
            ))}

          </div>

          {/* Right Column: Technical Description Slides */}
          <div className="col-span-12 md:col-span-5 md:pl-8 flex flex-col justify-center gap-8">
            
            {/* Horizontal Timeline indicator line */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-white tracking-[0.25em] uppercase">
                (SCIENCE PROCESS FEED)
              </span>
              <div className="w-full h-[1px] bg-white/10 relative mt-2">
                <div 
                  className="absolute top-0 left-0 h-full bg-accent transition-all duration-150"
                  style={{ width: `${lineProgress}%`, boxShadow: '0 0 6px rgba(184, 144, 71, 0.6)' }}
                ></div>
              </div>
            </div>

            {/* Slides container */}
            <div className="relative min-h-[220px]">
              {AMENITIES.map((item, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 flex flex-col gap-4 transition-all duration-500 ${
                    idx === activeIndex 
                      ? 'opacity-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <div className="font-mono text-[10px] text-accent tracking-widest uppercase">
                    PHASE 0{idx + 1}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-white font-light">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm font-light text-white/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress dot counters */}
            <div className="flex gap-3">
              {AMENITIES.map((_, idx) => (
                <span 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    idx === activeIndex ? 'bg-primary' : 'bg-white/10'
                  }`}
                ></span>
              ))}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
