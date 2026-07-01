import React, { useEffect, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

// Simple count up effect hook
function Counter({ value, suffix = "", duration = 1200, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) {
      // For string values like "10 yr"
      return;
    }

    const stepTime = Math.max(Math.floor(duration / end), 10);
    const timer = setInterval(() => {
      start += Math.ceil(end / 40); // Increment speed
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration, active]);

  const displayVal = isNaN(parseInt(value, 10)) ? value : count;

  return (
    <span>{displayVal}{suffix}</span>
  );
}

export default function AboutScene() {
  const { activeScene, scrollProgress } = useScrollSystem();
  const isActive = activeScene === 2;

  // Parallax transform for the image
  const imgY = (scrollProgress - 0.25) * 80;

  return (
    <section className="relative min-h-screen w-full bg-[#12110f] py-24 px-8 md:px-16 flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Rotated section tag */}
          <div className="hidden md:block md:col-span-1 text-stone/40 font-mono text-[10px] tracking-[0.4em] uppercase origin-left transform rotate-90 translate-y-8 select-none">
            (ABOUT)
          </div>

          {/* Left Column: Heading and Image */}
          <div className="md:col-span-5 flex flex-col gap-12">
            <h2 className="font-display text-4xl md:text-6xl font-light text-white leading-tight">
              engineering <br />
              <span className="text-bronze italic">science </span> <br />
              structural <br />
              <span className="font-sans text-2xl md:text-3xl font-light text-stone-light tracking-wide block mt-2">
                craftsmanship.
              </span>
            </h2>

            <div className="w-full aspect-[4/5] overflow-hidden relative border border-white/5 bg-stone/10">
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&auto=format&fit=crop&q=90" 
                alt="Architectural structure concrete and glass" 
                className="w-full h-full object-cover transition-transform duration-100 ease-out"
                style={{ transform: `scale(1.15) translateY(${imgY}px)` }}
              />
            </div>
          </div>

          {/* Right Column: Descriptions & Counters */}
          <div className="md:col-span-6 flex flex-col gap-16 md:pl-8">
            <div className="flex flex-col gap-6">
              <div className="font-mono text-[9px] text-bronze tracking-[0.25em] uppercase">
                (RIGOROUS CODE STANDARDS)
              </div>
              <p className="font-sans text-sm md:text-base font-light text-stone-light leading-relaxed">
                Every element of a Rightcon landmark reflects a commitment to structural physics. From the geomechanical analysis of laterite soils to zero-tolerance column alignments, we treat engineering as a rigorous science.
              </p>
              <p className="font-sans text-sm md:text-base font-light text-stone leading-relaxed">
                Whether planning cantilever projections, stack-ventilating central courtyards, or detailing travertine stone slabs, Rightcon builds absolute generational longevity.
              </p>
            </div>

            {/* Counters grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-white/10 pt-12">
              <div className="flex flex-col gap-2">
                <div className="font-display text-4xl md:text-5xl font-light text-white">
                  <Counter value="100" suffix="%" active={isActive} />
                </div>
                <p className="font-mono text-[9px] text-stone tracking-wider leading-normal uppercase">
                  concrete verification &amp; rebar logs
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="font-display text-4xl md:text-5xl font-light text-white">
                  <Counter value="200" suffix="+" active={isActive} />
                </div>
                <p className="font-mono text-[9px] text-stone tracking-wider leading-normal uppercase">
                  bespoke estates constructed
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="font-display text-4xl md:text-5xl font-light text-white">
                  <Counter value="500" suffix="k" active={isActive} />
                </div>
                <p className="font-mono text-[9px] text-stone tracking-wider leading-normal uppercase">
                  sq. ft. built to LOD 400 BIM
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="font-display text-4xl md:text-5xl font-light text-white">
                  <span>10 yr</span>
                </div>
                <p className="font-mono text-[9px] text-stone tracking-wider leading-normal uppercase">
                  transferable structural warranty
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
