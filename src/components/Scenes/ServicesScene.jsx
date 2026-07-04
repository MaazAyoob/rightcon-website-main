import React, { useState, useEffect } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

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
    <section className="relative min-h-screen w-full bg-[#050505] py-24 px-8 md:px-16 flex items-center overflow-hidden border-t border-white/5 subpixel-text">
      {/* Decorative blueprint grids */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] uppercase">
            (SCENE 05 / CRAFTSMANSHIP SERVICES)
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-[#F8F8F6] font-light leading-none">
            Structural <span className="text-[#D4AF37] italic">Providence</span> &amp; Audits
          </h2>
        </div>

        {/* Inner layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-4">
          
          {/* Left Column: Premium service selectors */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-center">
            
            {/* Tab 1: BOQ */}
            <button
              onClick={() => handleTabClick('boq', 0)}
              className={`w-full text-left p-6 border rounded-sm transition-all duration-500 cursor-pointer ${
                activeTab === 'boq' 
                  ? 'border-[#D4AF37] bg-white/[0.02] shadow-lg shadow-[#D4AF37]/5' 
                  : 'border-white/5 hover:border-white/20 bg-transparent'
              }`}
            >
              <div className="font-mono text-[8px] text-[#D4AF37] tracking-widest mb-1.5">[PHASE 01]</div>
              <h3 className="font-display text-xl sm:text-2xl font-light text-[#F8F8F6] mb-2">BOQ Estimator</h3>
              <p className="font-sans text-[11.5px] text-stone leading-relaxed">
                Quantitative core volume calculation for reinforced cement concrete grids and footings.
              </p>
            </button>

            {/* Tab 2: BIM Twins */}
            <button
              onClick={() => handleTabClick('bim', 1)}
              className={`w-full text-left p-6 border rounded-sm transition-all duration-500 cursor-pointer ${
                activeTab === 'bim' 
                  ? 'border-[#49B8FF] bg-white/[0.02] shadow-lg shadow-[#49B8FF]/5' 
                  : 'border-white/5 hover:border-white/20 bg-transparent'
              }`}
            >
              <div className="font-mono text-[8px] text-[#49B8FF] tracking-widest mb-1.5">[PHASE 02]</div>
              <h3 className="font-display text-xl sm:text-2xl font-light text-[#F8F8F6] mb-2">LOD 400 BIM Coordination</h3>
              <p className="font-sans text-[11.5px] text-stone leading-relaxed">
                Pre-construction utility route collisions solved inside our synchronized virtual digital twins.
              </p>
            </button>

            {/* Tab 3: Materials */}
            <button
              onClick={() => handleTabClick('materials', 2)}
              className={`w-full text-left p-6 border rounded-sm transition-all duration-500 cursor-pointer ${
                activeTab === 'materials' 
                  ? 'border-white/20 bg-white/[0.02]' 
                  : 'border-white/5 hover:border-white/20 bg-transparent'
              }`}
            >
              <div className="font-mono text-[8px] text-stone tracking-widest mb-1.5">[PHASE 03]</div>
              <h3 className="font-display text-xl sm:text-2xl font-light text-[#F8F8F6] mb-2">Tactile Ledger Providence</h3>
              <p className="font-sans text-[11.5px] text-stone leading-relaxed">
                Absolute trace log receipts of raw Travertine, Burma Teak planks, and Fe550D rebar matrices.
              </p>
            </button>

          </div>

          {/* Right Column: Dynamic Interactive Calculator / Visualizer Panel (85% focus) */}
          <div className="lg:col-span-8 border border-white/5 bg-[#171614]/20 rounded-sm p-8 md:p-12 relative flex flex-col justify-between overflow-hidden shadow-2xl min-h-[480px]">
            
            {/* Top Cyan gradient line decoration */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#49B8FF]/30 to-transparent"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full w-full items-stretch relative z-10">
              
              {/* Left Column Spacer (for Hologram placement) */}
              <div className="hidden md:block md:col-span-5 pointer-events-none"></div>

              {/* Right Content Column */}
              <div className="col-span-12 md:col-span-7 flex flex-col justify-between h-full">
                {/* Tab Content 1: BOQ Concrete Calculator */}
                {activeTab === 'boq' && (
                  <div className="flex flex-col gap-8 animate-fade-in h-full justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[8px] text-[#D4AF37] tracking-widest">[INTERACTIVE ESTIMATION PANEL]</span>
                      <h4 className="font-display text-2xl font-light text-[#F8F8F6]">RCC Slab Core Estimator</h4>
                      <p className="font-sans text-xs text-stone-light">
                        Select target slab parameters. The model computes volume density, rebar structural threshold indexes, and concrete checkpass logs.
                      </p>
                    </div>

                    {/* SLIDERS */}
                    <div className="flex flex-col gap-6 my-2 bg-white/[0.01] p-5 border border-white/5 rounded-sm">
                      {/* Area Slider */}
                      <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between font-mono text-[9px] text-[#F8F8F6]">
                          <span>Target Built Area</span>
                          <span className="text-[#D4AF37]">{area} SQ. FT.</span>
                        </div>
                        <input 
                          type="range" 
                          min="1000" 
                          max="8000" 
                          step="100" 
                          value={area}
                          onChange={(e) => setArea(parseInt(e.target.value))}
                          className="w-full accent-[#D4AF37] bg-white/10 h-[2px] rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Thickness Slider */}
                      <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between font-mono text-[9px] text-[#F8F8F6]">
                          <span>Slab Depth Thickness</span>
                          <span className="text-[#D4AF37]">{thickness} INCHES</span>
                        </div>
                        <input 
                          type="range" 
                          min="4" 
                          max="12" 
                          step="1" 
                          value={thickness}
                          onChange={(e) => setThickness(parseInt(e.target.value))}
                          className="w-full accent-[#D4AF37] bg-white/10 h-[2px] rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* RESULTS */}
                    <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                      <div>
                        <span className="font-mono text-[7px] text-stone uppercase block">Concrete Grade</span>
                        <span className="font-display text-sm text-[#F8F8F6] font-semibold">{concreteGrade}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[7px] text-stone block">Concrete Volume</span>
                        <span className="font-display text-sm text-[#D4AF37] font-semibold">{slabCubicYds} CU. YD</span>
                      </div>
                      <div>
                        <span className="font-mono text-[7px] text-stone block">Rebar Weight</span>
                        <span className="font-display text-sm text-[#49B8FF] font-semibold">{reinforcementSteelKg} KG</span>
                      </div>
                    </div>

                    <div className="font-mono text-[7px] text-stone/50 tracking-wide mt-2">
                      *ESTIMATION COMPILED ACCORDING TO IS_456:2000 REINFORCED CONCRETE SPECIFICATION
                    </div>
                  </div>
                )}

                {/* Tab Content 2: BIM Twin Collisions */}
                {activeTab === 'bim' && (
                  <div className="flex flex-col gap-6 animate-fade-in h-full justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[8px] text-[#49B8FF] tracking-widest">[VIRTUAL BLUEPRINT SCREEN]</span>
                      <h4 className="font-display text-2xl font-light text-[#F8F8F6]">LOD 400 Clash Detection</h4>
                      <p className="font-sans text-xs text-stone-light">
                        We import architectural files into localized coordinate mesh layers to map ducts, plumbing lines, and structural rebars, solving geometry errors before site pour.
                      </p>
                    </div>

                    {/* Animated Clash grid block */}
                    <div className="w-full aspect-[16/7] relative border border-[#49B8FF]/20 bg-[#050505]/50 flex items-center justify-center overflow-hidden">
                      {/* Grid background */}
                      <div className="absolute inset-0 blueprint-grid opacity-30"></div>
                      
                      {/* Sweeping laser scanner */}
                      <div className="absolute w-[2px] h-full bg-[#49B8FF] left-0 top-0 animate-pulse shadow-[0_0_8px_#49B8FF]" style={{
                        animation: 'sweep 4s linear infinite'
                      }}></div>

                      <style>{`
                        @keyframes sweep {
                          0% { left: 0%; }
                          50% { left: 100%; }
                          100% { left: 0%; }
                        }
                      `}</style>

                      {/* Collision indicators */}
                      <div className="absolute flex flex-col items-center z-10 gap-1 bg-[#171614] border border-[#49B8FF]/30 p-2.5 rounded-sm">
                        <span className="font-mono text-[7.5px] text-[#49B8FF] animate-pulse">COLLISION RESOLVER STATUS</span>
                        <span className="font-mono text-[9px] text-emerald-400 font-bold">0 DUCT CLASHES DETECTED</span>
                      </div>
                    </div>

                    <div className="font-mono text-[7px] text-stone mt-2">
                      RESOLVING CAD COORDINATE CLASHES // ALL PIPELINE CHECKS PASSED
                    </div>
                  </div>
                )}

                {/* Tab Content 3: Material Providence */}
                {activeTab === 'materials' && (
                  <div className="flex flex-col gap-6 animate-fade-in h-full justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[8px] text-stone tracking-widest">[LEDGER TRACE LOGS]</span>
                      <h4 className="font-display text-2xl font-light text-[#F8F8F6]">Material Ledger Sourcing</h4>
                      <p className="font-sans text-xs text-stone-light">
                        Each shipment of structural material is catalogued. We reject low-grade aggregates or scrap-rolled reinforcement steels.
                      </p>
                    </div>

                    {/* Vertical Swatch Rows */}
                    <div className="flex flex-col gap-3 my-2">
                      {/* Swatch 1 */}
                      <div className="flex gap-4 items-center border border-white/5 p-3 bg-white/[0.01] rounded-sm">
                        <div className="w-16 h-12 bg-stone/20 overflow-hidden rounded-sm flex-shrink-0">
                          <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400" alt="Travertine" className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-mono text-[8px] text-[#D4AF37] uppercase font-semibold">Travertine Stone</span>
                          <p className="font-sans text-[10.5px] text-stone mt-0.5 leading-relaxed">Sourced directly from certified quarry blocks.</p>
                        </div>
                      </div>

                      {/* Swatch 2 */}
                      <div className="flex gap-4 items-center border border-white/5 p-3 bg-white/[0.01] rounded-sm">
                        <div className="w-16 h-12 bg-stone/20 overflow-hidden rounded-sm flex-shrink-0">
                          <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400" alt="Burma Teak" className="w-full h-full object-cover grayscale-[35%] hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-mono text-[8px] text-[#D4AF37] uppercase font-semibold">Burma Teak</span>
                          <p className="font-sans text-[10.5px] text-stone mt-0.5 leading-relaxed">High-density log lumber logs, kiln-dried.</p>
                        </div>
                      </div>

                      {/* Swatch 3 */}
                      <div className="flex gap-4 items-center border border-white/5 p-3 bg-white/[0.01] rounded-sm">
                        <div className="w-16 h-12 bg-stone/20 overflow-hidden rounded-sm flex-shrink-0">
                          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400" alt="Fe550D" className="w-full h-full object-cover grayscale-[50%] hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-mono text-[8px] text-[#D4AF37] uppercase font-semibold">Fe550D Rebars</span>
                          <p className="font-sans text-[10.5px] text-stone mt-0.5 leading-relaxed">Direct mills log records, maximum ductility.</p>
                        </div>
                      </div>
                    </div>

                    <div className="font-mono text-[7px] text-stone">
                      ORIGIN DATA REGISTRY: LEDGER_BLOCK_0412A // MILL_VERIFIED
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
