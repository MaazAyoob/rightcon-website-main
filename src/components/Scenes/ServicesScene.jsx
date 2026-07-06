import React, { useState, useEffect } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

const MATERIALS_LIST = [
  {
    name: "Travertine Bedrock",
    desc: "Exposed Travertine blocks, hand-split to preserve natural limestone pits and veins.",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=500&auto=format&fit=crop"
  },
  {
    name: "Burma Lumber Teak",
    desc: "Kiln-dried high-density log timber cuts, detailing natural oil grains flush against concrete.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&auto=format&fit=crop"
  },
  {
    name: "Aggregate Concrete",
    desc: "Form-finished concrete cast in bespoke resin molds, revealing raw, tactile aggregates.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop"
  },
  {
    name: "Ductile Fe550D Steel",
    desc: "Heavy reinforcement bars, load-tested and verification logged directly from mills.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&auto=format&fit=crop"
  }
];

export default function ServicesScene() {
  const { setMascotPose, setHoveredService } = useScrollSystem();
  const [activeTab, setActiveTab] = useState('boq');

  // Concrete Estimator state (for BOQ)
  const [area, setArea] = useState(2500); // sq ft
  const [thickness, setThickness] = useState(6); // inches

  // Calculations derived
  const slabCubicYds = Math.round((area * (thickness / 12)) / 27);
  const concreteGrade = area > 3500 ? "M40 Grade" : "M30 Grade";
  const reinforcementSteelKg = Math.round(area * 4.5); // 4.5kg per sq ft standard structural index

  const handleTabClick = (tabId, idx) => {
    setActiveTab(tabId);
    setHoveredService(idx);
    setMascotPose('pointing');
  };

  useEffect(() => {
    setMascotPose('idle');
  }, []);

  return (
    <section className="relative min-h-screen w-full py-space-96 md:py-space-160 px-space-24 md:px-space-40 flex items-center overflow-hidden border-t border-charcoal/5 theme-stone subpixel-text">
      {/* Decorative blueprint grids */}
      <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-space-48">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-24 items-start">
          <div className="lg:col-span-1 h-label-mono select-none tracking-widest text-[9.5px]">
            (05 // SERVICES)
          </div>
          <div className="lg:col-span-8 flex flex-col gap-space-16">
            <span className="h-label-mono text-bronze">(CRAFTSMANSHIP SERVICES)</span>
            <h2 className="h-section-title">
              Structural Providence <br />
              <span className="text-bronze italic">&amp; Clash Management.</span>
            </h2>
          </div>
        </div>

        {/* Outer Layout: left 4 columns visual, right 8 columns content panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-start">
          
          {/* Left Column: Visual site details */}
          <div className="hidden lg:block lg:col-span-4 relative pr-space-24">
            <div className="w-full aspect-[3/4] overflow-hidden border border-charcoal/15 bg-concrete shadow-[0_32px_80px_rgba(0,0,0,0.06)] rounded-sm group">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop" 
                alt="Raw construction concrete reinforcement steel" 
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1s]"
              />
            </div>
            <span className="h-caption font-mono text-[7px] text-charcoal/50 mt-3 block text-center uppercase tracking-widest">
              STRUC_CORE // DAY_12 FOUNDATION SLAB
            </span>
          </div>

          {/* Content panel (Right 8 columns) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-space-40">
            
            {/* Horizontal Segmented Selectors */}
            <div className="flex border-b border-charcoal/10 w-full justify-between gap-space-16 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => handleTabClick('boq', 0)}
                className={`flex-shrink-0 pb-3 border-b-2 transition-all duration-500 cursor-pointer text-left min-w-[140px] ${
                  activeTab === 'boq' 
                    ? 'border-bronze text-bronze font-semibold' 
                    : 'border-transparent text-charcoal/40 hover:text-charcoal'
                }`}
              >
                <span className="h-label-mono block mb-1">01</span>
                <span className="font-display text-sm md:text-base font-light">BOQ Estimator</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabClick('bim', 1)}
                className={`flex-shrink-0 pb-3 border-b-2 transition-all duration-500 cursor-pointer text-left min-w-[140px] ${
                  activeTab === 'bim' 
                    ? 'border-holo-cyan text-holo-cyan font-semibold' 
                    : 'border-transparent text-charcoal/40 hover:text-charcoal'
                }`}
              >
                <span className="h-label-mono block mb-1">02</span>
                <span className="font-display text-sm md:text-base font-light">BIM Clash</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabClick('materials', 2)}
                className={`flex-shrink-0 pb-3 border-b-2 transition-all duration-500 cursor-pointer text-left min-w-[140px] ${
                  activeTab === 'materials' 
                    ? 'border-charcoal text-charcoal font-semibold' 
                    : 'border-transparent text-charcoal/40 hover:text-charcoal'
                }`}
              >
                <span className="h-label-mono block mb-1">03</span>
                <span className="font-display text-sm md:text-base font-light">Material Swatch</span>
              </button>
            </div>

            {/* Dynamic Dashboard Card (Warm Ivory card floating on Architectural Stone background) */}
            <div className="bg-ivory border border-charcoal/10 rounded-sm p-space-32 md:p-space-40 shadow-[0_24px_48px_rgba(0,0,0,0.03)] min-h-[440px] flex flex-col justify-between relative overflow-hidden">
              
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bronze/20 to-transparent"></div>

              <div className="w-full h-full flex flex-col justify-between">
                
                {/* 1. BOQ Estimation tool */}
                {activeTab === 'boq' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-space-32 animate-fade-in">
                    
                    {/* Left: Input sliders and metrics */}
                    <div className="md:col-span-7 flex flex-col justify-between gap-space-24">
                      <div className="flex flex-col gap-space-8">
                        <span className="h-label-mono text-bronze">[CALCULATOR REGISTER]</span>
                        <h4 className="font-display text-2xl font-light text-charcoal">RCC Slab Core Volumetrics</h4>
                        <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light mt-1">
                          Adjust built area and target slab depth to calculate concrete volumes and rebar weights. Formulated from IS_456 codes.
                        </p>
                      </div>

                      {/* Sliders */}
                      <div className="flex flex-col gap-space-16 bg-charcoal/[0.02] p-space-24 border border-charcoal/5 rounded-sm">
                        <div className="flex flex-col gap-space-8">
                          <div className="flex justify-between h-label-mono text-charcoal/70">
                            <span>Target Built Area</span>
                            <span className="text-bronze font-bold text-xs">{area} SQ. FT.</span>
                          </div>
                          <input 
                            type="range" 
                            min="1000" 
                            max="8000" 
                            step="100" 
                            value={area}
                            onChange={(e) => setArea(parseInt(e.target.value))}
                            className="w-full accent-bronze bg-charcoal/10 h-[2px] rounded-sm cursor-pointer"
                          />
                        </div>

                        <div className="flex flex-col gap-space-8">
                          <div className="flex justify-between h-label-mono text-charcoal/70">
                            <span>Slab Depth Thickness</span>
                            <span className="text-bronze font-bold text-xs">{thickness} INCHES</span>
                          </div>
                          <input 
                            type="range" 
                            min="4" 
                            max="12" 
                            step="1" 
                            value={thickness}
                            onChange={(e) => setThickness(parseInt(e.target.value))}
                            className="w-full accent-bronze bg-charcoal/10 h-[2px] rounded-sm cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Metrics Outputs */}
                      <div className="grid grid-cols-3 gap-space-16 border-t border-charcoal/10 pt-space-24">
                        <div>
                          <span className="h-caption font-mono text-[7.5px] block">Concrete Grade</span>
                          <span className="font-display text-lg text-charcoal font-light mt-1 block">{concreteGrade}</span>
                        </div>
                        <div>
                          <span className="h-caption font-mono text-[7.5px] block">Concrete Volume</span>
                          <span className="font-display text-lg text-bronze font-semibold mt-1 block">{slabCubicYds} CU. YD</span>
                        </div>
                        <div>
                          <span className="h-caption font-mono text-[7.5px] block">Rebar Weight</span>
                          <span className="font-display text-lg text-holo-cyan font-semibold mt-1 block">{reinforcementSteelKg} KG</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Technical Blueprint Drawing */}
                    <div className="md:col-span-5 flex flex-col justify-center">
                      <div className="w-full aspect-[4/5] overflow-hidden border border-charcoal/10 rounded-sm relative shadow-md group">
                        <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none"></div>
                        <img 
                          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop" 
                          alt="BIM drawing blueprint details" 
                          className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1s]"
                        />
                        <div className="absolute bottom-2.5 left-2.5 bg-charcoal/90 border border-white/5 px-2 py-0.5 font-mono text-[6.5px] text-bronze">
                          DWG // REF_LOD_400_SLAB
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. BIM Clash viewport */}
                {activeTab === 'bim' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-space-32 animate-fade-in">
                    
                    {/* Left: Laser sweep scan */}
                    <div className="md:col-span-7 flex flex-col gap-space-24 justify-between">
                      <div className="flex flex-col gap-space-8">
                        <span className="h-label-mono text-holo-cyan">[COORDINATE LAYER VERIFICATION]</span>
                        <h4 className="font-display text-2xl font-light text-charcoal">LOD 400 Clash Scan</h4>
                        <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light mt-1">
                          We overlay physical geometry data of structure rebar matrices, MEP conduits, and layout ducts onto digital models to clear errors before cast.
                        </p>
                      </div>

                      {/* Scanning animation canvas */}
                      <div className="w-full aspect-[16/8] relative border border-charcoal/10 bg-charcoal/[0.03] flex items-center justify-center overflow-hidden rounded-sm">
                        <div className="absolute inset-0 blueprint-grid opacity-25"></div>
                        
                        <div className="absolute w-[1.5px] h-full bg-holo-cyan left-0 top-0 shadow-[0_0_8px_var(--color-holo-cyan)]" style={{
                          animation: 'sweep 4s linear infinite'
                        }}></div>

                        <div className="absolute flex flex-col items-center z-10 gap-1.5 bg-ivory border border-holo-cyan/20 p-space-16 rounded-sm shadow-md">
                          <span className="font-mono text-[7.5px] text-holo-cyan animate-pulse">COLLISION RESOLVER ONLINE</span>
                          <span className="font-mono text-[8.5px] text-emerald-600 font-bold">ZERO GEOMETRICAL CLASHES FOUND</span>
                        </div>
                      </div>

                      <div className="h-label-mono text-charcoal/50 text-[7.5px]">
                        RESOLVING SHIELD CONDUIT OVERLAYS // STATUS: PASS
                      </div>
                    </div>

                    {/* Right: Site inspection, Engineer review */}
                    <div className="md:col-span-5 flex flex-col justify-center">
                      <div className="w-full aspect-[4/5] overflow-hidden border border-charcoal/10 rounded-sm relative shadow-md group">
                        <img 
                          src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop" 
                          alt="Geotechnical coordination review" 
                          className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1s]"
                        />
                        <div className="absolute bottom-2.5 left-2.5 bg-charcoal/90 border border-white/5 px-2 py-0.5 font-mono text-[6.5px] text-holo-cyan">
                          SITE_INSPECT // BIM_CLASH_AUDIT
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* 3. Material Swatches */}
                {activeTab === 'materials' && (
                  <div className="flex flex-col gap-space-24 animate-fade-in">
                    <div className="flex flex-col gap-space-8">
                      <span className="h-label-mono text-bronze">[LEDGER SPECIFICATIONS]</span>
                      <h4 className="font-display text-2xl font-light text-charcoal">Material Sourcing Swatches</h4>
                      <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light mt-1">
                        Macro textures of natural travertine bedrock, teak lumber logs, aggregate-concrete, and Fe550D rebar joints. We refuse veneers.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-space-16">
                      {MATERIALS_LIST.map((mat, i) => (
                        <div key={i} className="flex flex-col border border-charcoal/10 rounded-sm overflow-hidden bg-charcoal/[0.01]">
                          <div className="w-full aspect-[16/9] overflow-hidden">
                            <img 
                              src={mat.image} 
                              alt={mat.name} 
                              className="w-full h-full object-cover grayscale-[25%] hover:grayscale-0 hover:scale-101 transition-all duration-700" 
                            />
                          </div>
                          <div className="p-space-16 flex flex-col gap-1">
                            <span className="font-mono text-[8.5px] font-bold text-bronze uppercase">{mat.name}</span>
                            <p className="font-sans text-[10px] text-charcoal/60 leading-relaxed font-light">{mat.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Coordinates and Mascot Anchor inside Card */}
              <div className="border-t border-charcoal/10 pt-space-16 mt-space-24 flex justify-between items-center text-[7.5px] font-mono text-charcoal/40">
                <span>SYSTEM ID: RC_SERVICES_DASH</span>
                <div className="mascot-observation-point">
                  <span className="mascot-observation-dot"></span>
                  <span>Mascot Auditing Calculations</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
