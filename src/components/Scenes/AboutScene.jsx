import React, { useEffect } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

export default function AboutScene() {
  const { activeScene, setMascotPose } = useScrollSystem();
  const isActive = activeScene === 7;

  useEffect(() => {
    if (isActive) {
      // Mascot is in calm, respectful, breathing state
      setMascotPose('people');
    }
  }, [isActive]);

  return (
    <section className="relative min-h-screen w-full bg-[#050505] py-32 px-8 md:px-16 flex items-center overflow-hidden border-t border-white/5 subpixel-text">
      {/* Decorative grids */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Rotated section tag */}
          <div className="hidden lg:block lg:col-span-1 text-stone/40 font-mono text-[9px] tracking-[0.4em] uppercase origin-left transform rotate-90 translate-y-12 select-none">
            (SCENE 07 / PEOPLE)
          </div>

          {/* Left Column: Vision & Emotional Storytelling */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] uppercase">
              (FOUNDER'S MANDATE)
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-[#F8F8F6] leading-[1.05]">
              Building <br />
              <span className="text-[#D4AF37] italic">Peace of Mind</span>
            </h2>
            
            <p className="font-sans text-xs md:text-[15px] font-light text-stone-light leading-relaxed max-w-xl">
              "We don't build houses; we construct structural shelters for your peace of mind. A home is a technical artifact designed to outlast generations, requiring geomechanical absolute truth."
            </p>

            <div className="flex flex-col gap-1.5 border-l border-[#D4AF37]/40 pl-6 mt-4">
              <span className="font-display text-lg text-[#F8F8F6] font-light">Maaz Ayoob</span>
              <span className="font-mono text-[8px] text-stone tracking-wider">FOUNDER &amp; CHIEF ESTIMATOR</span>
            </div>

            {/* Overlapping magazine photo grid */}
            <div className="grid grid-cols-12 gap-4 mt-8">
              <div className="col-span-8 overflow-hidden aspect-[4/3] border border-white/10 bg-stone/20 relative shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&auto=format&fit=crop" 
                  alt="Architectural studio sketching table" 
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="col-span-4 overflow-hidden aspect-[1/1] border border-white/10 bg-stone/20 relative mt-8 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=500&auto=format&fit=crop" 
                  alt="Architectural concrete texture check" 
                  className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Journey & Values */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:border-l lg:border-white/10 lg:pl-12">
            
            {/* Timeline */}
            <div className="flex flex-col gap-8">
              <h3 className="font-mono text-[9px] text-[#D4AF37] tracking-[0.25em] uppercase">
                [STUDIO TIMELINE]
              </h3>
              
              <div className="flex flex-col gap-6 relative pl-6 border-l border-white/10">
                <div className="relative">
                  <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-[#49B8FF]"></div>
                  <span className="font-mono text-[10px] text-[#49B8FF] block font-semibold">2014 — ESTABLISHMENT</span>
                  <p className="font-sans text-xs text-stone-light mt-1">
                    Rightcon initializes operations in Bangalore, focusing on geomechanical analysis.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                  <span className="font-mono text-[10px] text-[#D4AF37] block font-semibold">2018 — LOD 400 BIM</span>
                  <p className="font-sans text-xs text-stone-light mt-1">
                    Standardized clash clearance models inside virtual twins, resolving duct pipeline collisions.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-[#49B8FF]"></div>
                  <span className="font-mono text-[10px] text-[#49B8FF] block font-semibold">2022 — ZERO DEFECT MANDATE</span>
                  <p className="font-sans text-xs text-stone-light mt-1">
                    Introduction of day 7 and day 28 compressive tests on every columns cast.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
              <h3 className="font-mono text-[9px] text-[#D4AF37] tracking-[0.25em] uppercase mb-2">
                [OUR MISSION CHECKS]
              </h3>
              <p className="font-sans text-xs text-stone-light leading-relaxed">
                We believe that premium architecture requires complete transparency. No hollow drywalls, no cheap cosmetic veneers. Only aggregate-concrete foundations, solid lumber teak, and lifelong geomechanical peace of mind.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
