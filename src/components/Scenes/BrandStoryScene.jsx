import React, { useEffect } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import Counter from './AboutScene'; // We can write a custom micro counter inside this file for self-containment

function MiniCounter({ value, suffix = "", duration = 1500, active }) {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) return;

    const increment = Math.ceil(end / 30);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [value, active]);

  return <span>{isNaN(parseInt(value, 10)) ? value : count}{suffix}</span>;
}

export default function BrandStoryScene() {
  const { activeScene, setMascotPose } = useScrollSystem();
  const isActive = activeScene === 2;

  useEffect(() => {
    if (isActive) {
      // Mascot is absent/hidden in Scene 2
      setMascotPose('vision');
    }
  }, [isActive]);

  return (
    <section className="relative min-h-screen w-full py-space-96 md:py-space-160 px-space-24 md:px-space-40 flex items-center overflow-hidden theme-light subpixel-text border-t border-charcoal/5">
      {/* Blueprint grid decoration */}
      <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Editorial Rhythm: Header block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-24 items-start">
          <div className="lg:col-span-1 h-label-mono select-none tracking-widest text-[9.5px]">
            (02 // VISION)
          </div>
          <div className="lg:col-span-8 flex flex-col gap-space-16">
            <span className="h-label-mono text-bronze">(ENGINEERING PHILOSOPHY)</span>
            <h2 className="h-section-title">
              Crafting residential monoliths <br />
              <span className="text-bronze italic">anchored in raw math.</span>
            </h2>
          </div>
        </div>

        {/* Asymmetrical magazine columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40 lg:gap-space-64 mt-space-64 items-start">
          
          {/* Left Column: Personal Statement & Photo Spread */}
          <div className="lg:col-span-6 flex flex-col gap-space-40">
            <div className="flex flex-col gap-space-24">
              <p className="h-body-large text-charcoal/90 leading-relaxed font-light">
                Rightcon replaces cosmetic veneers and hollow drywalls with raw form-finished concrete, solid Burma teak logs, and certified Fe550D rebar matrices. Every residential landmark represents absolute structural physics.
              </p>
              <p className="h-body text-charcoal/70 leading-relaxed">
                We believe a home is not a product of commercial marketing—it is a physical monument designed to endure for centuries. We refuse standard developer shortcuts. Instead, we run comprehensive geomechanical profile mapping before a single drop of concrete is poured, ensuring zero settlement risks.
              </p>
            </div>

            {/* Asymmetrical Collage Spread */}
            <div className="relative w-full aspect-[16/10] overflow-hidden border border-charcoal/10 bg-ivory shadow-[0_24px_48px_rgba(0,0,0,0.04)] rounded-sm group mt-4">
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop" 
                alt="Exposed raw concrete terrace detailing" 
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-[1.4s] ease-out"
              />
              <div className="absolute bottom-3 left-3 bg-ivory border border-charcoal/10 px-2 py-0.5 font-mono text-[7px] text-charcoal uppercase">
                FORM_FINISHED_CONCRETE // FA_02
              </div>
            </div>

            {/* Client quotation section */}
            <blockquote className="font-display text-xl md:text-2xl font-light leading-relaxed border-l-2 border-bronze/40 pl-space-24 italic text-charcoal/90 mt-4">
              "We do not build houses; we construct structural shelters for your peace of mind. A home is a technical artifact requiring geomechanical absolute truth."
            </blockquote>
          </div>

          {/* Right Column: Statistics Grid & Timeline Ledger */}
          <div className="lg:col-span-6 flex flex-col gap-space-64 lg:border-l lg:border-charcoal/10 lg:pl-space-64">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-space-24 gap-y-space-40">
              <div className="flex flex-col gap-space-8 border-b border-charcoal/5 pb-space-16">
                <span className="h-label-mono text-charcoal/50">[LOG_01] CHECKPASS</span>
                <div className="font-display text-4xl md:text-5xl font-light text-charcoal">
                  <MiniCounter value="100" suffix="%" active={isActive} />
                </div>
                <p className="h-label-mono text-bronze">concrete test logs</p>
              </div>

              <div className="flex flex-col gap-space-8 border-b border-charcoal/5 pb-space-16">
                <span className="h-label-mono text-charcoal/50">[LOG_02] COMPLETED</span>
                <div className="font-display text-4xl md:text-5xl font-light text-charcoal">
                  <MiniCounter value="200" suffix="+" active={isActive} />
                </div>
                <p className="h-label-mono text-bronze">bespoke structures</p>
              </div>

              <div className="flex flex-col gap-space-8 border-b border-charcoal/5 pb-space-16">
                <span className="h-label-mono text-charcoal/50">[LOG_03] VOLUME</span>
                <div className="font-display text-4xl md:text-5xl font-light text-charcoal">
                  <MiniCounter value="500" suffix="k+" active={isActive} />
                </div>
                <p className="h-label-mono text-bronze">sq. ft. built to LOD 400</p>
              </div>

              <div className="flex flex-col gap-space-8 border-b border-charcoal/5 pb-space-16">
                <span className="h-label-mono text-charcoal/50">[LOG_04] GUARANTEE</span>
                <div className="font-display text-4xl md:text-5xl font-light text-charcoal">
                  <span>10 yr</span>
                </div>
                <p className="h-label-mono text-bronze">transferable warranty</p>
              </div>
            </div>

            {/* Technical Timeline (Integrated directly into vision layout) */}
            <div className="flex flex-col gap-space-24">
              <span className="h-label-mono text-bronze">[STRUCTURAL TIMELINE &amp; LEDGER]</span>
              
              <div className="flex flex-col gap-space-24 relative pl-space-16 border-l border-charcoal/10">
                <div className="relative">
                  <div className="absolute -left-[20px] top-1.5 w-1.5 h-1.5 rounded-full bg-bronze"></div>
                  <span className="font-mono text-[9px] text-bronze block font-semibold">2014 — CORE FOUNDATION INCEPTION</span>
                  <p className="font-sans text-[11px] text-charcoal/70 mt-1">
                    First geological compound testing setup launched in Bangalore East clay belts.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[20px] top-1.5 w-1.5 h-1.5 rounded-full bg-holo-cyan"></div>
                  <span className="font-mono text-[9px] text-holo-cyan block font-semibold">2019 — LOD 400 BIM STANDARDIZATION</span>
                  <p className="font-sans text-[11px] text-charcoal/70 mt-1">
                    Eliminated visual or routing clashes by testing layout overlaps before site pours.
                  </p>
                </div>
              </div>
            </div>

            {/* Mascot observation anchor */}
            <div className="flex justify-end pt-4">
              <div className="mascot-observation-point">
                <span className="mascot-observation-dot"></span>
                <span>Mascot Observing Vision Ledger</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
