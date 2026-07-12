import React from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

const BELIEFS = [
  {
    num: "01",
    title: "Structural Integrity",
    desc: "Footings anchored directly in bedrock geomechanical profiles, calculated using Safe Bearing Capacity (SBC) thresholds."
  },
  {
    num: "02",
    title: "Zero-Defect Execution",
    desc: "Compressive cube testing, slump verification, and rebar load mapping on every column cast."
  },
  {
    num: "03",
    title: "Material Honesty",
    desc: "Exposed form-finished concrete, solid Burma teak planks, and hand-cut travertine. We reject cosmetic plastic veneers."
  },
  {
    num: "04",
    title: "Construction Science",
    desc: "3D virtual coordination using LOD 400 BIM models to resolve duct, utility, and rebar geometric conflicts."
  },
  {
    num: "05",
    title: "Micro-Site Adaptation",
    desc: "Designing ventilation chambers and solar thermal buffer slabs to naturally regulate internal temperatures."
  }
];

export default function BeliefsScene() {
  const { scrollProgress } = useScrollSystem();
  
  // Parallax shifts for architectural photography columns
  const shiftY = (scrollProgress - 0.5) * -60;

  return (
    <section className="relative min-h-screen w-full bg-charcoal py-24 px-8 md:px-16 flex items-center overflow-hidden border-t border-white/5">
      {/* Decorative Blueprint background */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Editorial Statement and Photography Collage */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] text-accent tracking-[0.25em] uppercase">
                (OUR CORE MANDATE)
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight">
                A Mandate of <br />
                <span className="text-accent italic">Structural Perfection</span>
              </h2>
              <p className="font-sans text-xs md:text-sm font-light text-white/70 leading-relaxed mt-4">
                To construct with absolute geomechanical truth. We reject decorative covers and hollow drywalls. Every project exposes raw form-finished concrete, solid Burma teak, and certified Fe550D rebar matrices.
              </p>
            </div>

            {/* Collage of raw construction textures */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8 overflow-hidden aspect-[4/3] border border-white/5 bg-white/20 relative img-zoom-hover">
                <img 
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=90" 
                  alt="Modern luxury interior concrete wall" 
                  className="w-full h-full object-cover transition-transform duration-100 ease-out"
                  style={{ transform: `scale(1.1) translateY(${shiftY * 0.5}px)` }}
                />
              </div>
              <div className="col-span-4 overflow-hidden aspect-[1/1] border border-white/5 bg-white/20 relative mt-8 img-zoom-hover">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&auto=format&fit=crop" 
                  alt="Raw structural architecture lines" 
                  className="w-full h-full object-cover transition-transform duration-100 ease-out"
                  style={{ transform: `scale(1.1) translateY(${shiftY * -0.3}px)` }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Architectural Grid of Beliefs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {BELIEFS.map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col gap-3 group border-t border-white/5 pt-6 hover:border-accent/30 transition-colors duration-500"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] text-white tracking-widest uppercase">
                      ({item.num})
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                  </div>
                  <h3 className="font-display text-xl text-white font-light group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs font-light text-white leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
              
              {/* Extra branding block to balance out 5 items in a 2x3 grid */}
              <div className="hidden md:flex flex-col justify-between border-t border-accent/10 bg-white/5 p-6 rounded-none select-none">
                <span className="font-mono text-[8px] text-accent tracking-[0.25em] uppercase">
                  RIGHTCON LABORATORY
                </span>
                <p className="font-sans text-[11px] font-light text-white italic leading-relaxed mt-4">
                  "Every detail is load-tested inside our laboratory before deployment to site logs."
                </p>
                <div className="h-6 w-full border-t border-dashed border-white/10 mt-4 flex items-center justify-end font-mono text-[7px] text-white/50 tracking-wider">
                  COORD_SYS: BLR_EAST // VERIFIED
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
