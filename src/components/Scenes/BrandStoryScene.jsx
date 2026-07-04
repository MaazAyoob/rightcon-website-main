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
    <section className="relative min-h-screen w-full bg-[#050505] py-32 px-8 md:px-16 flex items-center overflow-hidden border-t border-white/5 subpixel-text">
      {/* Moving background shadows & blueprint grid decoration */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[50vw] h-full bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Rotated Chapter Tag */}
          <div className="hidden lg:block lg:col-span-1 text-stone/40 font-mono text-[9px] tracking-[0.4em] uppercase origin-left transform rotate-90 translate-y-12 select-none">
            (SCENE 02 / VISION)
          </div>

          {/* Left Column: Heading and Editorial manifesto */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            <div className="font-mono text-[9.5px] text-[#D4AF37] tracking-[0.3em] uppercase">
              (ENGINEERING PHILOSOPHY)
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-[#F8F8F6] leading-[1.05]">
              crafting residential <br />
              <span className="text-[#D4AF37] italic">monoliths </span> <br />
              with raw math.
            </h2>
            
            <p className="font-sans text-xs md:text-[15px] font-light text-stone-light leading-relaxed max-w-xl">
              Rightcon replaces cosmetic veneers and hollow drywalls with raw form-finished concrete, solid Burma teak logs, and certified Fe550D rebar matrices. Every residential landmark represents absolute structural physics.
            </p>
          </div>

          {/* Right Column: Statistics Grid & Logs */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:border-l lg:border-white/10 lg:pl-12">
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[8px] text-stone tracking-widest uppercase">
                  [LOG_01] CHECKPASS
                </span>
                <div className="font-display text-4xl md:text-5xl font-light text-[#F8F8F6]">
                  <MiniCounter value="100" suffix="%" active={isActive} />
                </div>
                <p className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase">
                  concrete test logs
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[8px] text-stone tracking-widest uppercase">
                  [LOG_02] COMPLETED
                </span>
                <div className="font-display text-4xl md:text-5xl font-light text-[#F8F8F6]">
                  <MiniCounter value="200" suffix="+" active={isActive} />
                </div>
                <p className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase">
                  bespoke structures
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[8px] text-stone tracking-widest uppercase">
                  [LOG_03] VOLUME
                </span>
                <div className="font-display text-4xl md:text-5xl font-light text-[#F8F8F6]">
                  <MiniCounter value="500" suffix="k+" active={isActive} />
                </div>
                <p className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase">
                  sq. ft. built to LOD 400
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[8px] text-stone tracking-widest uppercase">
                  [LOG_04] GUARANTEE
                </span>
                <div className="font-display text-4xl md:text-5xl font-light text-[#F8F8F6]">
                  <span>10 yr</span>
                </div>
                <p className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase">
                  transferable warranty
                </p>
              </div>
            </div>

            {/* Micro blueprint status box */}
            <div className="border border-white/5 bg-[#171614]/50 p-6 rounded-sm select-none">
              <div className="flex justify-between font-mono text-[8.5px] text-stone">
                <span>COORD: IN_BANGALORE</span>
                <span className="text-[#49B8FF]">GEOM_VERIFIED: PASS</span>
              </div>
              <p className="font-sans text-[11px] font-light text-stone-light italic mt-3 leading-relaxed">
                "We drill and inspect core geomechanical logs before foundation raft layouts are drawn. Zero settling risk is our structural mandate."
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
