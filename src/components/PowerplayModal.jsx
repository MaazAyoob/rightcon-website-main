import React, { useState, useEffect } from "react";

export default function PowerplayModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("Daily Site Progress");

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

  const capabilities = [
    {
      title: "Daily Site Progress",
      metric: "98.4% On-Time Execution",
      desc: "Site engineers upload daily photo logs, concrete pour receipts, steel binding audits, and manpower counts directly to your owner dashboard.",
      items: ["High-res Site Photos", "Daily Labor Logs", "Material Inward Slips", "Curing Timelines"]
    },
    {
      title: "Material Procurement",
      metric: "100% Verified Grade Steel & Cement",
      desc: "Transparent tracking of Vizag/Tata TMT steel deliveries, UltraTech cement batch tests, and aggregate quality clearances before use on site.",
      items: ["Batch Test Reports", "Mill Test Certificates", "Quantity Inward Slips", "Supplier Audits"]
    },
    {
      title: "Purchase Lifecycle",
      metric: "Zero Price Escalation Lock",
      desc: "Every purchase order is cross-checked against your contract BOQ, preventing price creep or unapproved material substitutions.",
      items: ["Approved BOQ Items", "Vendor Purchase Orders", "Invoice Matching", "Cost Escalation Shield"]
    },
    {
      title: "Project Timelines",
      metric: "Gantt Chart Tracking",
      desc: "Real-time milestone tracking for excavation, foundation, slab casting, brickwork, plastering, and interior handover.",
      items: ["Baseline Schedule", "Critical Path Audits", "Milestone Approvals", "Slab Cast Target Dates"]
    },
    {
      title: "Team Coordination",
      metric: "Single-Point PM Accountability",
      desc: "Dedicated project manager coordinates architect, structural consultant, MEP engineer, and site supervisors under one app portal.",
      items: ["Direct PM Access", "Actionable MoM Logs", "Issue Resolution Tickets", "Weekly Site Calls"]
    },
    {
      title: "Documentation & Approvals",
      metric: "Cloud Storage Repo",
      desc: "Instant access to sanctioned BBMP/BDA plans, structural drawings, quality check certificates, and payment milestone receipts.",
      items: ["Sanctioned Blueprints", "Structural Calculations", "Quality Sign-offs", "10-Year Warranty Bond"]
    }
  ];

  const currentCap = capabilities.find(c => c.title === activeTab) || capabilities[0];

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
        aria-labelledby="powerplay-modal-title"
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
              POWERPLAY INTEGRATED
            </span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">REAL-TIME PORTAL</span>
          </div>
          <h3 id="powerplay-modal-title" className="font-display font-bold text-2xl md:text-3xl tracking-tight">
            Technology-Driven Construction Management
          </h3>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 font-light max-w-[65ch]">
            We use Powerplay to manage project progress, procurement, purchase lifecycle, approvals, timelines, and team coordination, keeping every project organised and on track.
          </p>
        </div>

        {/* Tab selection bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 my-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          {capabilities.map((cap) => (
            <button
              key={cap.title}
              onClick={() => setActiveTab(cap.title)}
              className={`p-2.5 text-[10px] font-mono text-center rounded-xs transition-all cursor-pointer leading-tight flex flex-col items-center justify-center min-h-[50px] focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold ${
                activeTab === cap.title
                  ? "bg-brand-blue text-white dark:bg-gold dark:text-charcoal font-bold shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-charcoal dark:hover:text-white"
              }`}
            >
              {cap.title}
            </button>
          ))}
        </div>

        {/* Dashboard visual preview card */}
        <div className="bg-neutral-900 text-white p-6 md:p-8 border border-neutral-800 rounded-xs space-y-6 flex-1 my-2 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-gold uppercase tracking-widest block font-medium">CAPABILITY PREVIEW</span>
              <h4 className="font-display font-bold text-xl text-white">{currentCap.title}</h4>
            </div>
            <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded text-neutral-300 self-start sm:self-auto">
              {currentCap.metric}
            </span>
          </div>

          <p className="text-xs md:text-sm text-neutral-300 font-light leading-relaxed max-w-[65ch]">
            {currentCap.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentCap.items.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs font-mono text-neutral-300 bg-white/5 p-2.5 rounded border border-white/5">
                <span className="text-gold">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-brand-blue text-white dark:bg-gold dark:text-charcoal font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold rounded-xs"
          >
            Close Dashboard Preview
          </button>
        </div>
      </div>
    </div>
  );
}
