import React, { useEffect } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

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
      setMascotPose('vision');
    }
  }, [isActive]);

  return (
    <section className="relative w-full overflow-hidden border-t border-charcoal/5 bg-white theme-light subpixel-text">
      
      {/* Full-bleed hero image strip */}
      <div className="relative w-full h-[45vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&auto=format&fit=crop&q=90"
          alt="Exposed raw concrete terrace detailing"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent"></div>

        {/* Floating label in image */}
        <div className="absolute bottom-6 right-6 bg-white/95 border border-charcoal/10 px-3 py-1.5 font-mono text-[7.5px] text-charcoal/50 shadow-sm">
          FORM_FINISHED_CONCRETE // FA_02
        </div>
      </div>

      {/* Content section */}
      <div className="section-container relative">
        <div className="absolute inset-0 architectural-grid opacity-[0.05] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          {/* Section header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-24 items-start">
            <div className="lg:col-span-1 h-label-mono select-none tracking-widest text-[9.5px] text-charcoal/40">
              (02 // VISION)
            </div>
            <div className="lg:col-span-8 flex flex-col gap-space-16">
              <span className="h-label-mono text-accent">(ENGINEERING PHILOSOPHY)</span>
              <h2 className="h-section-title text-charcoal">
                Crafting residential monoliths <br />
                <span className="text-accent italic">anchored in raw math.</span>
              </h2>
            </div>
          </div>

          {/* Two-column content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40 lg:gap-space-64 mt-space-64 items-start">
            
            {/* Left: Copy + quote */}
            <div className="lg:col-span-6 flex flex-col gap-space-40">
              <div className="flex flex-col gap-space-24">
                <p className="h-body-large text-charcoal/80 leading-relaxed font-light max-w-[var(--max-line-len)]">
                  Rightcon replaces cosmetic veneers and hollow drywalls with raw form-finished concrete, solid Burma teak logs, and certified Fe550D rebar matrices. Every residential landmark represents absolute structural physics.
                </p>
                <p className="h-body text-charcoal/60 leading-relaxed font-light max-w-[var(--max-line-len)]">
                  We believe a home is not a product of commercial marketing—it is a physical monument designed to endure for centuries. We refuse standard developer shortcuts. Instead, we run comprehensive geomechanical profile mapping before a single drop of concrete is poured, ensuring zero settlement risks.
                </p>
              </div>

              <blockquote className="font-display text-xl md:text-2xl font-light leading-relaxed border-l-2 border-accent/50 pl-space-24 italic text-charcoal/80">
                "We do not build houses; we construct structural shelters for your peace of mind. A home is a technical artifact requiring geomechanical absolute truth."
              </blockquote>

              <div className="flex flex-col gap-1.5 pl-space-24">
                <span className="font-display text-base font-light text-charcoal">Maaz Ayoob</span>
                <span className="h-label-mono text-accent font-bold text-[9px]">FOUNDER &amp; CHIEF ESTIMATOR</span>
              </div>
            </div>

            {/* Right: Stats + Timeline */}
            <div className="lg:col-span-6 flex flex-col gap-space-64 lg:border-l lg:border-charcoal/5 lg:pl-space-64">
              
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-x-space-24 gap-y-space-40">
                {[
                  { log: "[LOG_01] CHECKPASS", value: "100", suffix: "%", label: "concrete test logs" },
                  { log: "[LOG_02] COMPLETED", value: "200", suffix: "+", label: "bespoke structures" },
                  { log: "[LOG_03] VOLUME", value: "500", suffix: "k+", label: "sq. ft. built to LOD 400" },
                  { log: "[LOG_04] GUARANTEE", value: "10 yr", suffix: "", label: "transferable warranty" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-space-8 border-b border-charcoal/5 pb-space-16">
                    <span className="h-label-mono text-charcoal/40">{stat.log}</span>
                    <div className="font-display text-4xl md:text-5xl font-light text-charcoal">
                      {stat.value === "10 yr" ? (
                        <span>10 yr</span>
                      ) : (
                        <MiniCounter value={stat.value} suffix={stat.suffix} active={isActive} />
                      )}
                    </div>
                    <p className="h-label-mono text-accent">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="flex flex-col gap-space-24">
                <span className="h-label-mono text-accent">[STRUCTURAL TIMELINE &amp; LEDGER]</span>
                
                <div className="flex flex-col gap-space-24 relative pl-space-16 border-l border-charcoal/5">
                  <div className="relative">
                    <div className="absolute -left-[20px] top-1.5 w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span className="font-mono text-[9px] text-accent block font-semibold">2014 — CORE FOUNDATION INCEPTION</span>
                    <p className="font-sans text-[11px] text-charcoal/60 mt-1">
                      First geological compound testing setup launched in Bangalore East clay belts.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[20px] top-1.5 w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="font-mono text-[9px] text-primary block font-semibold">2019 — LOD 400 BIM STANDARDIZATION</span>
                    <p className="font-sans text-[11px] text-charcoal/60 mt-1">
                      Eliminated visual or routing clashes by testing layout overlaps before site pours.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[20px] top-1.5 w-1.5 h-1.5 rounded-full bg-charcoal/20"></div>
                    <span className="font-mono text-[9px] text-charcoal/40 block font-semibold">2024 — 200TH COMPLETED LANDMARK</span>
                    <p className="font-sans text-[11px] text-charcoal/40 mt-1">
                      200th residential estate delivered on-time with zero structural defects or rework.
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
      </div>
    </section>
  );
}
