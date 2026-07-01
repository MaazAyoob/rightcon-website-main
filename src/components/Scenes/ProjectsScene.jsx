import React, { useRef, useEffect, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PROJECTS = [
  {
    title: "The Emerald Terraces",
    location: "Whitefield, Bangalore",
    metrics: "12,500 SQ. FT. / M40 CONCRETE",
    desc: "This custom Whitefield estate balances cantilever concrete projections with central courtyards, creating open, sunlit volumes and moisture-isolated slab systems.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=90"
  },
  {
    title: "Koramangala Monolith",
    location: "Koramangala, Bangalore",
    metrics: "8,200 SQ. FT. / BRUSHED CONCRETE",
    desc: "A massive raw concrete monolith. Exposed aggregate structural pillars, deep geometric recesses, and dual-layer thermal insulating envelopes.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=90"
  },
  {
    title: "Jayalakshmipuram Villa",
    location: "Mysuru, Karnataka",
    metrics: "11,000 SQ. FT. / BEDROCK COLLAR",
    desc: "A response to Mysuru's hot dry climate. Anchored directly in bedrock footings with stack-ventilated terracotta facades that passive-cool the interiors.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=90"
  }
];

export default function ProjectsScene() {
  const containerRef = useRef();
  const triggerRef = useRef();
  const [activeProject, setActiveProject] = useState(0);
  const { setActiveInteraction } = useScrollSystem();
  
  useEffect(() => {
    // GSAP ScrollTrigger to translate the projects track horizontally
    const pin = gsap.fromTo(
      containerRef.current,
      { translateX: "0vw" },
      {
        translateX: `-${200}vw`, // Translate 2 screens worth
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=2000",
          onUpdate: (self) => {
            // Update active project index based on scroll progress
            const prog = self.progress;
            if (prog < 0.33) {
              setActiveProject(0);
            } else if (prog < 0.66) {
              setActiveProject(1);
            } else {
              setActiveProject(2);
            }
          }
        }
      }
    );

    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative z-10 select-none">
      {/* Pinned horizontal viewing track */}
      <div className="h-screen w-[300vw] flex overflow-hidden bg-[#12110f]" ref={containerRef}>
        
        {PROJECTS.map((project, idx) => (
          <div 
            key={idx} 
            className="w-screen h-screen flex flex-col justify-center px-8 md:px-24 py-16 relative flex-shrink-0"
          >
            {/* Background grids */}
            <div className="absolute inset-0 blueprint-grid opacity-[0.04] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center z-10">
              
              {/* Image Column */}
              <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
                <div className="font-mono text-[9px] text-bronze tracking-[0.3em] uppercase">
                  (SELECTED WORKS — 0{idx + 1} / 03)
                </div>
                
                <div className="w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden border border-white/5 bg-stone/20 img-zoom-hover relative group">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Text Description Column */}
              <div className="col-span-12 md:col-span-5 flex flex-col gap-6 md:pl-4">
                <div className="flex flex-col gap-1">
                  <div className="font-mono text-[9px] text-stone tracking-[0.2em] uppercase">
                    {project.location}
                  </div>
                  <h2 className="font-display text-4xl md:text-6xl font-light text-white leading-tight mt-1">
                    {project.title}
                  </h2>
                </div>

                <div className="font-mono text-[10px] text-bronze tracking-widest uppercase py-2 border-y border-white/10">
                  {project.metrics}
                </div>

                <p className="font-sans text-xs md:text-sm font-light text-stone-light leading-relaxed">
                  {project.desc}
                </p>

                {/* Micro interaction link */}
                <div className="mt-4">
                  <button 
                    type="button" 
                    onMouseEnter={() => setActiveInteraction({ type: 'projects' })}
                    onMouseLeave={() => setActiveInteraction(null)}
                    className="font-mono text-[9px] tracking-[0.25em] text-white hover:text-bronze uppercase border-b border-bronze/40 pb-1 cursor-pointer transition-colors"
                  >
                    Examine Architectural Blueprints
                  </button>
                </div>
              </div>

            </div>

            {/* Floating subtle coordinates details */}
            <div className="absolute bottom-8 right-8 md:right-16 font-mono text-[8px] text-stone tracking-widest hidden md:block">
              RIGID MATRIX COORDINATES: R_SEC_0{idx + 1} // ELEVATION CHECKPASS: OK
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
