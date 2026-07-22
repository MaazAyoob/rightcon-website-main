import React, { useState, useEffect } from "react";

export default function ProcessModal({ isOpen, onClose }) {
  const [activeStep, setActiveStep] = useState(0);

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

  const timelineSteps = [
    {
      code: "Agreement",
      title: "1. Agreement & Contract Lock",
      desc: "Finalizing contract scope, material specifications, locked budget terms, and assigning overall project parameters with zero cost escalations."
    },
    {
      code: "Team Allocation",
      title: "2. Dedicated Team Allocation",
      desc: "Assigning dedicated senior project manager, principal architect, structural engineer, and site engineer to manage your build."
    },
    {
      code: "DIM",
      title: "3. Design Initiation Meeting (DIM)",
      desc: "First in-depth workshop with the homeowner to review plot orientation, lifestyle requirements, spatial budgets, and structural vision."
    },
    {
      code: "AII & KYS",
      title: "4. Architectural Inputs & Know Your Site (AII & KYS)",
      desc: "Geotechnical soil testing, site contour survey, structural load assessment, and Vastu-aligned architectural layout drafting."
    },
    {
      code: "Design Development",
      title: "5. Design Development Phase",
      desc: "Crafting comprehensive 2D floor plans, 3D exterior facade elevations, structural frame details, and MEP schematics."
    },
    {
      code: "PIM",
      title: "6. Project Initiation Meeting (PIM)",
      desc: "Alignment meeting across execution, procurement, quality, and management teams prior to site ground-breaking."
    },
    {
      code: "Construction",
      title: "7. Structured Civil Execution",
      desc: "Foundations, columns, slabs casting, masonry, plumbing/electrical rough-in, and finishing execution monitored daily."
    },
    {
      code: "Quality Reviews",
      title: "8. 150 Quality Audits & Inspection Clearance",
      desc: "Engineers conduct 150 documented quality checkpoints across concrete strength, steel tie-offs, waterproofing, and tile levelling."
    },
    {
      code: "Handover",
      title: "9. Final Handover & Structural Warranty Seal",
      desc: "Formal key handover, completion documentation clearance, as-built drawings delivery, and 10-Year Structural Warranty certificate."
    }
  ];

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
        aria-labelledby="process-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-charcoal dark:hover:text-white text-2xl font-mono p-2 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold rounded"
          aria-label="Close Modal"
        >
          ✕
        </button>

        <div className="space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-blue dark:text-gold font-semibold block">
            INTERACTIVE TIMELINE
          </span>
          <h3 id="process-modal-title" className="font-display font-bold text-2xl md:text-3xl tracking-tight">
            Proven Construction Process
          </h3>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 font-light max-w-[65ch]">
            Click through our sequential project execution milestones to see how Rightcon maintains strict quality and schedule control.
          </p>
        </div>

        {/* Stepper sequence bar */}
        <div className="py-5 my-4 border-y border-neutral-200 dark:border-neutral-800 overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-2 min-w-max px-1">
            {timelineSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <button
                  onClick={() => setActiveStep(idx)}
                  className={`px-3.5 py-2 text-[10px] font-mono uppercase tracking-wider rounded-xs transition-all cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold ${
                    activeStep === idx
                      ? "bg-brand-blue text-white dark:bg-gold dark:text-charcoal font-bold shadow-sm"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-charcoal dark:hover:text-white"
                  }`}
                >
                  {step.code}
                </button>
                {idx < timelineSteps.length - 1 && (
                  <span className="text-neutral-400 dark:text-neutral-600 text-xs">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Selected Step Explanation Card */}
        <div className="bg-neutral-50 dark:bg-neutral-900 p-6 md:p-8 border border-neutral-200 dark:border-neutral-800 space-y-3 flex-1 flex flex-col justify-center rounded-xs">
          <span className="font-mono text-xs text-brand-blue dark:text-gold uppercase font-semibold">
            Stage {activeStep + 1} of {timelineSteps.length} // {timelineSteps[activeStep].code}
          </span>
          <h4 className="font-display font-bold text-xl md:text-2xl text-charcoal dark:text-white">
            {timelineSteps[activeStep].title}
          </h4>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light max-w-[65ch]">
            {timelineSteps[activeStep].desc}
          </p>
        </div>

        <div className="pt-4 flex justify-between items-center text-xs font-mono">
          <button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(prev => prev - 1)}
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold rounded-xs"
          >
            ← Previous Stage
          </button>
          <span className="text-neutral-500 dark:text-neutral-400 text-[11px]">
            Step {activeStep + 1} / {timelineSteps.length}
          </span>
          <button
            disabled={activeStep === timelineSteps.length - 1}
            onClick={() => setActiveStep(prev => prev + 1)}
            className="px-4 py-2 bg-brand-blue text-white dark:bg-gold dark:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold rounded-xs"
          >
            Next Stage →
          </button>
        </div>
      </div>
    </div>
  );
}
