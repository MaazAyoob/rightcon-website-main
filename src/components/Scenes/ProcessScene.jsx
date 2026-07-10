import React, { useEffect, useRef, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import { optimizeUnsplashUrl } from '../../utils/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    name: "Foundation",
    tag: "GEOMECHANICAL RAFT",
    desc: "A 900mm double-layer moisture raft slab isolated by high-density elastomer barriers is anchored directly in bedrock.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&auto=format&fit=crop&q=80"
  },
  {
    name: "Structure",
    tag: "ZERO-TOLERANCE PILLARS",
    desc: "Primary column matrices are cast in high-density aggregate M40 concrete using customized resin moulds to ensure seamless vertical alignment.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&auto=format&fit=crop&q=80"
  },
  {
    name: "Brickwork",
    tag: "THERMAL BLOCK CAVITIES",
    desc: "Dual-layer clay blocks are woven into exposed concrete margins to insulate the internal micro-climate naturally.",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1000&auto=format&fit=crop&q=80"
  },
  {
    name: "MEP Installation",
    tag: "CONDUIT COORDINATION",
    desc: "Plumbing lines, mechanical ducts, and fire suppression systems are integrated into structural slab overlays using LOD 400 coordination overlays.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1000&auto=format&fit=crop&q=80"
  },
  {
    name: "Finishing",
    tag: "CRAFTSMAN DETAIL",
    desc: "Natural Travertine stone blocks are hand-cut and joined flush against kiln-dried Burma teak planks with zero trim lines.",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1000&auto=format&fit=crop&q=80"
  },
  {
    name: "Completed Home",
    tag: "LOD 400 COMPLETED LANDMARK",
    desc: "The residential monolith stands complete. Verified against virtual clash twins and ready for generational handover.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80"
  }
];

export default function ProcessScene() {
  const triggerRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { isMobile, setMascotPose } = useScrollSystem();

  useEffect(() => {
    const pin = ScrollTrigger.create({
      trigger: triggerRef.current,
      pin: true,
      start: "top top",
      end: "+=2000",
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
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative z-10 select-none">
      <section className="h-screen w-full flex items-center px-space-24 md:px-space-40 overflow-hidden border-t border-charcoal/5 bg-white subpixel-text">
        <div className="absolute inset-0 architectural-grid opacity-[0.06] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-space-40 lg:gap-space-64 items-center relative z-10">
          
          {/* Left Column: Image with decorative frame */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
            <div className="relative">
              {/* Decorative corner accents */}
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-accent z-20 pointer-events-none"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary z-20 pointer-events-none"></div>
              
              <div className="w-full aspect-[16/10] overflow-hidden border border-charcoal/10 relative shadow-[0_32px_80px_rgba(0,0,0,0.07)] bg-white">
                {STAGES.map((stage, idx) => (
                  <img 
                    key={idx}
                    src={optimizeUnsplashUrl(stage.image, isMobile ? 800 : 1200, isMobile ? 70 : 85)}
                    alt={stage.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                      idx === currentStep ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-[1.02]'
                    }`}
                  />
                ))}
                <div className="absolute top-4 right-4 z-20 bg-white/95 border border-charcoal/10 px-3 py-1.5 font-mono text-[8px] text-charcoal/50 shadow-sm">
                  STAGE {String(currentStep + 1).padStart(2,'0')} / {String(STAGES.length).padStart(2,'0')}
                </div>
              </div>
            </div>

            {/* Step progress dots */}
            <div className="flex gap-2 mt-6 items-center">
              {STAGES.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-[2px] transition-all duration-500 rounded-full ${
                    i === currentStep 
                      ? 'w-10 bg-accent' 
                      : (i < currentStep ? 'w-4 bg-accent/40' : 'w-2 bg-charcoal/10')
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Right Column: Step details */}
          <div className="col-span-12 lg:col-span-5 lg:pl-space-24 flex flex-col justify-center gap-space-24">
            
            <div className="flex flex-col gap-space-8">
              <span className="h-label-mono text-accent">(04 // CONSTRUCTION JOURNEY)</span>
              <div className="w-full h-[2px] bg-charcoal/5 relative mt-1 overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / STAGES.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex flex-col gap-space-16 min-h-[200px] justify-center">
              <div className="font-mono text-[9px] font-bold text-charcoal/30 uppercase tracking-widest">
                STAGE 0{currentStep + 1} // {STAGES[currentStep].tag}
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-light text-charcoal tracking-wide leading-none">
                {STAGES[currentStep].name}
              </h3>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
                {STAGES[currentStep].desc}
              </p>
            </div>

            {/* Stages list */}
            <div className="flex flex-col gap-2 border-t border-charcoal/5 pt-space-16">
              {STAGES.map((stage, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-3 py-1 transition-all duration-300 ${
                    i === currentStep ? 'opacity-100' : 'opacity-25'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${
                    i < currentStep ? 'bg-accent' : i === currentStep ? 'bg-primary' : 'bg-charcoal/20'
                  }`}></div>
                  <span className={`font-mono text-[8.5px] uppercase tracking-wider ${
                    i === currentStep ? 'text-charcoal font-bold' : 'text-charcoal/40'
                  }`}>{stage.name}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-charcoal/5 pt-space-16 flex justify-between items-center">
              <span className="h-caption font-mono text-[7px] text-charcoal/30">
                LOD_400_COORD: STG_0{currentStep + 1}_LOG_CHECK // PASS
              </span>
              <div className="mascot-observation-point">
                <span className="mascot-observation-dot"></span>
                <span>Mascot Tracking Process</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
