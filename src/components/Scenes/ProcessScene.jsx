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
      end: "+=2000", // Scroll length
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
      <section className="h-screen w-full flex items-center px-space-24 md:px-space-40 overflow-hidden border-t border-charcoal/5 theme-light subpixel-text">
        <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-space-40 lg:gap-space-64 items-center relative z-10">
          
          {/* Left Column: Asymmetrical Visual Display of Construction Steps */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
            
            <div className="w-full aspect-[16/10] overflow-hidden border border-charcoal/10 relative shadow-[0_24px_48px_rgba(0,0,0,0.06)] rounded-sm bg-ivory">
              {STAGES.map((stage, idx) => (
                <img 
                  key={idx}
                  src={optimizeUnsplashUrl(stage.image, isMobile ? 800 : 1200, isMobile ? 70 : 85)}
                  alt={stage.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    idx === currentStep ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95'
                  }`}
                />
              ))}
            </div>

            {/* Micro progress indicator */}
            <div className="flex gap-space-8 mt-space-24 items-center">
              {STAGES.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-[2px] transition-all duration-500 ${
                    i === currentStep 
                      ? 'w-8 bg-charcoal' 
                      : (i < currentStep ? 'w-3 bg-charcoal/30' : 'w-1.5 bg-charcoal/10')
                  }`}
                ></div>
              ))}
            </div>

          </div>

          {/* Right Column: Minimal Technical Specification Copy */}
          <div className="col-span-12 lg:col-span-5 lg:pl-space-24 flex flex-col justify-center gap-space-24">
            
            <div className="flex flex-col gap-space-8">
              <span className="h-label-mono text-bronze">
                (04 // CONSTRUCTION JOURNEY)
              </span>
              <div className="w-full h-[1px] bg-charcoal/10 relative mt-1">
                <div 
                  className="absolute top-0 left-0 h-full bg-bronze transition-all duration-300"
                  style={{ 
                    width: `${((currentStep + 1) / STAGES.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Active milestone content */}
            <div className="flex flex-col gap-space-16 min-h-[220px] justify-center">
              <div className="font-mono text-[9px] font-bold text-charcoal/40 uppercase tracking-widest">
                STAGE 0{currentStep + 1} // {STAGES[currentStep].tag}
              </div>
              <h3 className="font-display text-3xl font-light text-charcoal tracking-wide">
                {STAGES[currentStep].name}
              </h3>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed font-light">
                {STAGES[currentStep].desc}
              </p>
            </div>

            {/* Metadata and Mascot Anchor */}
            <div className="border-t border-charcoal/10 pt-space-16 flex justify-between items-center">
              <span className="h-caption font-mono text-[7px]">
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
