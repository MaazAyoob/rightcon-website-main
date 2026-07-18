import { useState } from "react";
import { ESTIMATOR_PACKAGES } from "../data/rightconData";
import { Link } from "react-router-dom";

export default function CostCalculator() {
  const [plotArea, setPlotArea] = useState(1200);
  const [floors, setFloors] = useState(2); // G+1 is 2 levels
  const [packageType, setPackageType] = useState(1); // Index of package
  const [sumpLiters, setSumpLiters] = useState(8000);
  const [hasSump, setHasSump] = useState(false);
  const [compoundFeet, setCompoundFeet] = useState(100);
  const [hasCompound, setHasCompound] = useState(false);

  const selectedPkg = ESTIMATOR_PACKAGES[packageType];
  const builtUpArea = plotArea * floors;
  
  // Calculations based on Bangalore market averages
  const minCivilCost = builtUpArea * selectedPkg.minPrice;
  const maxCivilCost = builtUpArea * selectedPkg.maxPrice;
  
  const sumpCost = hasSump ? sumpLiters * 8.5 : 0; // ₹8.5 per Liter for brickwork sump
  const compoundCost = hasCompound ? compoundFeet * 1250 : 0; // ₹1,250 per running foot
  
  const totalMin = minCivilCost + sumpCost + compoundCost;
  const totalMax = maxCivilCost + sumpCost + compoundCost;

  return (
    <div className="bg-white pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 space-y-24">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl border-b border-neutral-100 pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">STRUCTURAL PLANNING</span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-charcoal uppercase">
            COST CALCULATOR
          </h1>
          <p className="text-neutral-500 font-light text-base md:text-lg leading-relaxed">
            Estimate construction cost parameters based on standard Bangalore material tiers and built-up area scales.
          </p>
        </div>

        {/* Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Inputs Column */}
          <div className="bg-grain p-8 md:p-12 border border-neutral-100 space-y-8">
            
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-charcoal uppercase">1. Site Specifications</h3>
              
              <div className="space-y-2">
                <label className="flex justify-between text-xs font-mono uppercase text-neutral-500 tracking-wider">
                  <span>Plot Area (Sq. Ft.)</span>
                  <span className="text-charcoal font-semibold">{plotArea} sqft</span>
                </label>
                <input 
                  type="range" 
                  min="600" 
                  max="4000" 
                  step="100"
                  value={plotArea} 
                  onChange={(e) => setPlotArea(Number(e.target.value))}
                  className="w-full accent-charcoal cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                  <span>600 sqft (20x30)</span>
                  <span>4000 sqft (50x80)</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex justify-between text-xs font-mono uppercase text-neutral-500 tracking-wider">
                  <span>Number of Floors (Levels)</span>
                  <span className="text-charcoal font-semibold">{floors === 1 ? "Ground Only (1)" : `G+${floors - 1} (${floors})`}</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFloors(f)}
                      aria-label={`${f === 1 ? "Ground Level" : `Ground plus ${f - 1} levels`}`}
                      className={`flex-1 font-mono text-xs py-3.5 border focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 ${
                        floors === f 
                          ? "bg-charcoal text-white border-charcoal" 
                          : "bg-white text-neutral-600 border-neutral-200 hover:border-charcoal"
                      }`}
                    >
                      {f === 1 ? "G" : `G+${f - 1}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-charcoal uppercase">2. Material Specification Package</h3>
              <div className="space-y-2">
                {ESTIMATOR_PACKAGES.map((pkg, idx) => (
                  <button
                    key={pkg.name}
                    onClick={() => setPackageType(idx)}
                    aria-label={`Select ${pkg.name} Specification Package`}
                    className={`w-full flex items-center justify-between text-left p-4 border focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 ${
                      packageType === idx 
                        ? "bg-white border-gold shadow-sm" 
                        : "bg-white border-neutral-200 hover:border-charcoal"
                    }`}
                  >
                    <div>
                      <h4 className="font-display font-bold text-sm text-charcoal uppercase">{pkg.name}</h4>
                      <p className="text-[10px] text-neutral-400 font-mono mt-1">Estimates: ₹{pkg.minPrice} - ₹{pkg.maxPrice} / sqft</p>
                    </div>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      packageType === idx ? "border-gold bg-gold" : "border-neutral-300"
                    }`}>
                      {packageType === idx && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-charcoal uppercase">3. Structural Optionals</h3>
              
              <div className="space-y-4 bg-white p-4 border border-neutral-100">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={hasSump}
                    onChange={(e) => setHasSump(e.target.checked)}
                    className="accent-charcoal w-4 h-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                  />
                  <span className="text-xs font-mono uppercase text-neutral-600">INCORPORATE UNDERGROUND SUMP TANK</span>
                </label>
                {hasSump && (
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <label className="flex justify-between text-xs font-mono text-neutral-400">
                      <span>Sump Capacity (Liters)</span>
                      <span className="text-charcoal font-semibold">{sumpLiters.toLocaleString()} Liters</span>
                    </label>
                    <input 
                      type="range" 
                      min="5000" 
                      max="20000" 
                      step="1000"
                      value={sumpLiters} 
                      onChange={(e) => setSumpLiters(Number(e.target.value))}
                      className="w-full accent-charcoal cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4 bg-white p-4 border border-neutral-100">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={hasCompound}
                    onChange={(e) => setHasCompound(e.target.checked)}
                    className="accent-charcoal w-4 h-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                  />
                  <span className="text-xs font-mono uppercase text-neutral-600">INCORPORATE COMPOUND WALL</span>
                </label>
                {hasCompound && (
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <label className="flex justify-between text-xs font-mono text-neutral-400">
                      <span>Compound Boundary (Running Feet)</span>
                      <span className="text-charcoal font-semibold">{compoundFeet} Rft</span>
                    </label>
                    <input 
                      type="range" 
                      min="50" 
                      max="400" 
                      step="10"
                      value={compoundFeet} 
                      onChange={(e) => setCompoundFeet(Number(e.target.value))}
                      className="w-full accent-charcoal cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                    />
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Outputs Column */}
          <div className="border border-neutral-200 p-8 md:p-12 space-y-8">
            <h3 className="font-display font-bold text-xl text-charcoal uppercase border-b border-neutral-100 pb-4">
              ESTIMATION SUMMARY
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500 font-light">Plot Area Scope</span>
                <span className="text-charcoal font-mono font-medium">{plotArea} sqft</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500 font-light">Design Floor Count</span>
                <span className="text-charcoal font-mono font-medium">{floors}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500 font-light">Est. Built-up Area</span>
                <span className="text-charcoal font-mono font-medium">{builtUpArea.toLocaleString()} sqft</span>
              </div>
              
              <div className="border-t border-neutral-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 font-light">Base Construction Cost</span>
                  <span className="text-charcoal font-mono">
                    ₹{minCivilCost.toLocaleString()} - ₹{maxCivilCost.toLocaleString()}
                  </span>
                </div>
                {hasSump && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500 font-light">Sump Tank Cost (₹8.5/L)</span>
                    <span className="text-charcoal font-mono">₹{sumpCost.toLocaleString()}</span>
                  </div>
                )}
                {hasCompound && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500 font-light">Compound Wall (₹1,250/Rft)</span>
                    <span className="text-charcoal font-mono">₹{compoundCost.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-grain p-6 border-t-2 border-gold space-y-2">
              <span className="font-mono text-[10px] uppercase text-neutral-400 tracking-widest block">TOTAL PROJECTED RANGE</span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal">
                ₹{totalMin.toLocaleString()} - ₹{totalMax.toLocaleString()}*
              </h2>
              <span className="text-[10px] text-neutral-400 font-light block leading-relaxed pt-2">
                * This calculation provides a standard structure range based on regular Bangalore soil levels and structural clearances. Final structural engineering and architectural costs are bound by legal contract.
              </span>
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-gold font-semibold">SELECTED PACKAGE SPECIFICATIONS</h4>
              <ul className="space-y-2.5">
                {selectedPkg.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-neutral-500 leading-relaxed font-light">
                    <span className="w-1 h-1 bg-gold rounded-full mt-2"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <Link
                to="/contact"
                className="w-full inline-block bg-charcoal text-white hover:bg-gold hover:text-charcoal text-center transition-colors duration-300 font-mono text-xs uppercase tracking-widest py-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 min-h-[44px]"
              >
                File Consultation with this Estimate
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
