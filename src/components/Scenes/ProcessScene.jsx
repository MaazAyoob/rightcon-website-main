import React, { useEffect, useRef, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    name: "Foundation",
    tag: "GEOMECHANICAL PLINTH",
    desc: "Bedrock anchor bolts and a 900mm double-layer moisture raft slab isolated by high-density elastomer barriers.",
    color: "#49B8FF"
  },
  {
    name: "Columns",
    tag: "ZERO-TOLERANCE PILLARS",
    desc: "M40 concrete mix columns cast in customized resin moulds to ensure absolute geometric alignment with zero seam lines.",
    color: "#49B8FF"
  },
  {
    name: "Walls",
    tag: "THERMAL SHEAR WALLS",
    desc: "Exposed concrete shear blocks coupled with insulating clay-block cavities to naturally regulate internal heat index.",
    color: "#49B8FF"
  },
  {
    name: "Roof",
    tag: "CANTILEVER CEILING",
    desc: "Post-tensioned concrete ceiling slab extending into dramatic cantilevers up to 3.5 meters without support pillars.",
    color: "#D4AF37"
  },
  {
    name: "Windows",
    tag: "SEAMLESS CURTAIN WALLS",
    desc: "High-performance double-glazed glass panes with low-E coating, framed inside deep architectural stone recesses.",
    color: "#49B8FF"
  },
  {
    name: "Interior",
    tag: "MATERIAL INTEGRATION",
    desc: "Solid Burma teak floorboards laid flush against hand-cut travertine blocks, eliminating typical drywalls.",
    color: "#D4AF37"
  },
  {
    name: "Lighting",
    tag: "ATMOSPHERIC SHADOWS",
    desc: "Concealed light grids mapping light beams across raw concrete textures, designed to mimic pathing of natural sunlight.",
    color: "#D4AF37"
  },
  {
    name: "Finished Home",
    tag: "LOD 400 COMPLETE",
    desc: "The structural landmark stands complete. Verified against original geomechanical BIM blueprints, ready for generational transfer.",
    color: "#D4AF37"
  }
];

export default function ProcessScene() {
  const triggerRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { setMascotPose, activeScene } = useScrollSystem();

  useEffect(() => {
    const pin = ScrollTrigger.create({
      trigger: triggerRef.current,
      pin: true,
      start: "top top",
      end: "+=2400", // Scroll length to build the house
      scrub: 0.5,
      onUpdate: (self) => {
        const prog = self.progress;
        const step = Math.min(Math.floor(prog * STAGES.length), STAGES.length - 1);
        setCurrentStep(step);
        
        if (self.isActive) {
          setMascotPose('process');
        }
      }
    });

    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === triggerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative z-10 select-none">
      <section className="h-screen w-full bg-[#050505] flex items-center px-8 md:px-16 overflow-hidden border-t border-white/5 subpixel-text">
        <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Stylized Vector House Build Animation (85% focus) */}
          <div className="col-span-12 lg:col-span-6 relative flex flex-col items-center justify-center h-[50vh] lg:h-[65vh] border border-white/5 bg-[#171614]/20 rounded-sm p-8 overflow-hidden shadow-2xl">
            <div className="absolute top-6 left-6 font-mono text-[8px] text-stone tracking-widest uppercase">
              GEOM_RENDERER // BUILD_PIPELINE
            </div>
            
            {/* The SVG Canvas house segments */}
            <div className="w-[85%] h-[75%] relative flex items-center justify-center">
              
              <svg 
                viewBox="0 0 400 300" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(73,184,255,0.15)]"
              >
                {/* 1. FOUNDATION SLAB (Cyan blueprint line) */}
                <path 
                  d="M50 250 H350 V260 H50 Z" 
                  stroke="#49B8FF" 
                  strokeWidth="2.5" 
                  className={`transition-all duration-700 ${currentStep >= 0 ? 'opacity-100 stroke-[#49B8FF]' : 'opacity-10'}`} 
                  style={{ fill: currentStep >= 0 ? 'rgba(73, 184, 255, 0.1)' : 'transparent' }}
                />
                
                {/* 2. COLUMNS (Pillars) */}
                <g className={`transition-all duration-700 ${currentStep >= 1 ? 'opacity-100' : 'opacity-10'}`}>
                  <rect x="80" y="150" width="16" height="100" stroke="#49B8FF" strokeWidth="2" fill="rgba(73, 184, 255, 0.05)" />
                  <rect x="180" y="150" width="16" height="100" stroke="#49B8FF" strokeWidth="2" fill="rgba(73, 184, 255, 0.05)" />
                  <rect x="290" y="150" width="16" height="100" stroke="#49B8FF" strokeWidth="2" fill="rgba(73, 184, 255, 0.05)" />
                </g>

                {/* 3. WALLS */}
                <g className={`transition-all duration-700 ${currentStep >= 2 ? 'opacity-100' : 'opacity-15'}`}>
                  {/* Left Wall panel */}
                  <path d="M96 150 H180 V250 H96 Z" stroke="#49B8FF" strokeWidth="1.5" fill="rgba(73, 184, 255, 0.03)" />
                  {/* Right Wall panel */}
                  <path d="M196 150 H290 V250 H196 Z" stroke="#49B8FF" strokeWidth="1.5" fill="rgba(73, 184, 255, 0.03)" />
                </g>

                {/* 4. ROOF SLAB (Gold Accent) */}
                <path 
                  d="M40 140 H340 V150 H40 Z" 
                  stroke="#D4AF37" 
                  strokeWidth="2" 
                  className={`transition-all duration-700 ${currentStep >= 3 ? 'opacity-100 stroke-[#D4AF37]' : 'opacity-10'}`} 
                  style={{ fill: currentStep >= 3 ? 'rgba(212, 175, 55, 0.1)' : 'transparent' }}
                />

                {/* 5. WINDOWS (Reflective curtain panes) */}
                <g className={`transition-all duration-700 ${currentStep >= 4 ? 'opacity-100' : 'opacity-5'}`}>
                  {/* Left window pane details */}
                  <rect x="105" y="165" width="60" height="70" stroke="#49B8FF" strokeWidth="1" fill="rgba(73, 184, 255, 0.15)" />
                  <line x1="105" y1="200" x2="165" y2="200" stroke="#49B8FF" strokeWidth="1" />
                  {/* Right window pane details */}
                  <rect x="210" y="165" width="65" height="70" stroke="#49B8FF" strokeWidth="1" fill="rgba(73, 184, 255, 0.15)" />
                  <line x1="210" y1="200" x2="275" y2="200" stroke="#49B8FF" strokeWidth="1" />
                </g>

                {/* 6. INTERIOR FURNITURE (Outline Teak table/couch) */}
                <g className={`transition-all duration-700 ${currentStep >= 5 ? 'opacity-100' : 'opacity-5'}`}>
                  {/* Table outline */}
                  <rect x="120" y="215" width="30" height="15" stroke="#D4AF37" strokeWidth="1" fill="rgba(212, 175, 55, 0.05)" />
                  <line x1="120" y1="230" x2="120" y2="250" stroke="#D4AF37" strokeWidth="1" />
                  <line x1="150" y1="230" x2="150" y2="250" stroke="#D4AF37" strokeWidth="1" />
                  {/* Couch outline */}
                  <path d="M220 220 H260 V250 H220 Z" stroke="#D4AF37" strokeWidth="1" />
                </g>

                {/* 7. LIGHTING (Atmospheric warm beams) */}
                <g className={`transition-all duration-700 ${currentStep >= 6 ? 'opacity-100' : 'opacity-0'}`}>
                  <polygon points="135,150 110,215 160,215" fill="rgba(212, 175, 55, 0.12)" />
                  <polygon points="242,150 215,220 270,220" fill="rgba(212, 175, 55, 0.12)" />
                </g>

                {/* 8. FINISHED RESIDENCE SHADING OVERLAY */}
                {currentStep >= 7 && (
                  <rect 
                    x="50" 
                    y="140" 
                    width="290" 
                    height="120" 
                    fill="url(#finishedGradient)" 
                    className="opacity-20 animate-fade-in pointer-events-none"
                  />
                )}

                <defs>
                  <linearGradient id="finishedGradient" x1="50" y1="140" x2="340" y2="260" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#49B8FF" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
              </svg>

            </div>

            {/* Stage lights indicator */}
            <div className="flex gap-2.5 mt-4">
              {STAGES.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === currentStep 
                      ? 'w-8 bg-[#49B8FF]' 
                      : (i < currentStep ? 'w-3 bg-[#49B8FF]/40' : 'w-1.5 bg-white/10')
                  }`}
                ></div>
              ))}
            </div>

          </div>

          {/* Right Column: Descriptions (Content pacing) */}
          <div className="col-span-12 lg:col-span-5 lg:pl-8 flex flex-col justify-center gap-6">
            
            {/* Timeline progress line */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.25em] uppercase">
                (SCENE 04 / PROCESS JOURNEY)
              </span>
              <div className="w-full h-[1px] bg-white/10 relative mt-2">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#49B8FF] transition-all duration-300"
                  style={{ 
                    width: `${((currentStep + 1) / STAGES.length) * 100}%`,
                    boxShadow: '0 0 8px rgba(73, 184, 255, 0.6)'
                  }}
                ></div>
              </div>
            </div>

            {/* active milestone content */}
            <div className="flex flex-col gap-4 min-h-[220px] justify-center">
              <div className="font-mono text-[9.5px] text-[#49B8FF] tracking-widest uppercase">
                PHASE 0{currentStep + 1} // {STAGES[currentStep].tag}
              </div>
              <h3 className="font-display text-4xl sm:text-5xl text-[#F8F8F6] font-light tracking-wide leading-tight">
                {STAGES[currentStep].name}
              </h3>
              <p className="font-sans text-xs md:text-sm font-light text-stone-light leading-relaxed">
                {STAGES[currentStep].desc}
              </p>
            </div>

            {/* Coordinates feedback logs */}
            <div className="font-mono text-[7.5px] text-stone tracking-wider border-t border-white/5 pt-4">
              LOD_400_COORD: STG_0{currentStep + 1}_LOG_CHECK // COMPRESSION_OK: TRUE
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
