import React, { useState, useEffect } from "react";

export default function QualityChecksModal({ isOpen, onClose }) {
  const [activeStage, setActiveStage] = useState("Foundation");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const stages = [
    {
      name: "Foundation",
      count: "24 Checks",
      checks: [
        { item: "Excavation Level Audit", spec: "Verified to structural drawing depths & soil bearing capacity." },
        { item: "PCC Thickness & Level", spec: "100mm PCC bed cast with M15 grade concrete level precision." },
        { item: "Steel Reinforcement Matting", spec: "Fe-550 TMT steel rebar spacing, cover blocks & lap length." },
        { item: "Footing Concrete Strength", spec: "M25 mix cube compression test & compaction vibration." },
        { item: "Anti-Termite Soil Treatment", spec: "Chemical barrier spray along perimeter & column footings." },
        { item: "Plinth Beam Level Alignment", spec: "DPC layer application & reinforcement tie-ins." }
      ]
    },
    {
      name: "Structure",
      count: "68 Checks",
      checks: [
        { item: "Column Vertical Alignment", spec: "Plumb bob & laser alignment check within 2mm tolerance." },
        { item: "Beam Reinforcement Tie-off", spec: "Stirrup spacing, shear zone hooks & cover block placement." },
        { item: "Concrete Mix Quality (M25/M30)", spec: "Slump cone test on-site & 7/28-day lab cube compression." },
        { item: "Slab Shuttering & Level", spec: "Plywood shuttering oiling, props bracing & level check." },
        { item: "21-Day Hydration Curing", spec: "Continuous ponding & hessian cloth moisture management." },
        { item: "Blockwork Bond & Mortar Ratio", spec: "1:4 cement-sand mortar ratio & chicken mesh at joints." }
      ]
    },
    {
      name: "Finishing",
      count: "58 Checks",
      checks: [
        { item: "Multi-layer Waterproofing", spec: "Elastomeric membrane on terraces, sumps & bathroom slabs." },
        { item: "Tile Levels & Grout Union", spec: "Laser levelling for vitrified/granite floor joint alignment." },
        { item: "Paint Finish & Primer Seal", spec: "2 coats putty, 1 primer, 2 weather-proof acrylic coats." },
        { item: "Electrical Earth Resistance", spec: "Earthing pit resistance test under 2 Ohms safety limit." },
        { item: "Plumbing Hydrostatic Pressure", spec: "10 bar pressure testing for CPVC lines before concealment." },
        { item: "Teak Joinery & Frame Fitting", spec: "Seasoned teak moisture content audit under 12%." }
      ]
    }
  ];

  const currentStageData = stages.find(s => s.name === activeStage) || stages[0];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-charcoal text-charcoal dark:text-white border border-neutral-200 dark:border-neutral-700 shadow-2xl p-6 md:p-10 rounded-sm overflow-hidden max-h-[90vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quality-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-charcoal dark:hover:text-white text-2xl font-mono p-2 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold rounded"
          aria-label="Close Modal"
        >
          ✕
        </button>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-brand-blue/10 dark:bg-gold/10 text-brand-blue dark:text-gold border border-brand-blue/20 dark:border-gold/20 font-semibold">
              RIGOROUS QUALITY ASSURANCE
            </span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">150 CHECKPOINTS</span>
          </div>
          <h3 id="quality-modal-title" className="font-display font-bold text-2xl md:text-3xl tracking-tight">
            150 Documented Quality Checks
          </h3>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 font-light max-w-[65ch]">
            Our engineers follow 150 documented quality checkpoints across every stage of construction to ensure your home is built the right way.
          </p>
        </div>

        {/* Stage Tabs */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 my-4">
          {stages.map((stage) => (
            <button
              key={stage.name}
              onClick={() => setActiveStage(stage.name)}
              className={`px-6 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold ${
                activeStage === stage.name
                  ? "border-brand-blue dark:border-gold text-brand-blue dark:text-gold font-bold bg-brand-blue/5 dark:bg-gold/10"
                  : "border-transparent text-neutral-500 hover:text-charcoal dark:hover:text-white"
              }`}
            >
              {stage.name} Stage <span className="text-[10px] opacity-70">({stage.count})</span>
            </button>
          ))}
        </div>

        {/* Checklist View */}
        <div className="space-y-3 flex-1 overflow-y-auto pr-2 my-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentStageData.checks.map((chk, idx) => (
              <div 
                key={idx}
                className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xs space-y-1.5"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-brand-blue dark:text-gold font-mono text-xs font-bold">✓</span>
                  <h4 className="font-display font-medium text-sm text-charcoal dark:text-white">{chk.item}</h4>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light pl-5">
                  {chk.spec}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-brand-blue/5 dark:bg-gold/5 border border-brand-blue/10 dark:border-gold/10 text-center rounded-xs">
            <span className="font-mono text-xs text-brand-blue dark:text-gold uppercase tracking-wider font-semibold">
              + 141 More Stage Checks Logged & Verified in Client Portal
            </span>
          </div>
        </div>

        <div className="pt-4 flex justify-between items-center text-xs font-mono border-t border-neutral-200 dark:border-neutral-800 mt-2">
          <span className="text-neutral-500 dark:text-neutral-400 text-[11px]">
            10-Year Structural Guarantee Backed
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-brand-blue text-white dark:bg-gold dark:text-charcoal font-semibold cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold rounded-xs"
          >
            Close Quality Audit Overview
          </button>
        </div>
      </div>
    </div>
  );
}
