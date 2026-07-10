import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollSystem } from '../../context/ScrollContext';

const SEARCHABLE_INDEX = [
  { type: "PAGE", title: "Home Exhibition", path: "/", desc: "Entrance lobby. Bangalore & Mysuru's premier residential monoliths." },
  { type: "PAGE", title: "About Rightcon Studio", path: "/about", desc: "Founder Maaz Ayoob's mandate, structural safety history, and planning ledger." },
  { type: "PAGE", title: "Services & Dashboard", path: "/services", desc: " RCC Slabs estimation, BOQ audits, and virtual twin clash scanning." },
  { type: "PAGE", title: "Construction Process Guide", path: "/process", desc: "Step-by-step casting: geomechanical foundations, pillars, masonry, and handovers." },
  { type: "PAGE", title: "Material Providence Ledger", path: "/materials", desc: "Trace logs of hand-cut Travertine rock, solid teak wood logs, and rebar steel." },
  { type: "PAGE", title: "Why Rightcon", path: "/why-rightcon", desc: "Transferable 10-Year structural deed of warranty, RERA registry, and laboratory logs." },
  { type: "PAGE", title: "Technology (BIM LOD 400)", path: "/technology", desc: "Clash-free structural overlays, virtual twin calculations, and SPT borewell tests." },
  { type: "PAGE", title: "Client Journey Logs", path: "/client-journey", desc: "Pre-construction geomechanical advisory, site checks, and handover timelines." },
  { type: "PAGE", title: "Testimonials spread", path: "/testimonials", desc: "Verifications from Koramangala Monolith and Emerald Terraces homeowners." },
  { type: "PAGE", title: "General FAQ Ledger", path: "/faq", desc: "Karnataka RERA details, compaction ratios, and compressive cube records." },
  { type: "PAGE", title: "Technical Journal Insights", path: "/insights", desc: "Editorial architectural reviews, Bangalore soil guides, and blueprints." },
  { type: "PAGE", title: "Careers openings", path: "/careers", desc: "Open positions for structural estimators, site supervisors, and draft leads." },
  { type: "PAGE", title: "Contact & Advisory", path: "/contact", desc: "Schedule penetration tests, register coordinates, or consult Chief Estimator." },
  
  { type: "PROJECT", title: "The Emerald Terraces, Whitefield", path: "/projects/emerald-terraces", desc: "8,500 sq.ft. estate with a 12m deep bedrock friction piles foundation to isolate clay-soil expansion." },
  { type: "PROJECT", title: "Koramangala Monolith, Bangalore", path: "/projects/koramangala-monolith", desc: "Exposed aggregate residential villa featuring a 3.5m supportless cantilever structure." },
  { type: "PROJECT", title: "Jayalakshmipuram Villa, Mysuru", path: "/projects/jayalakshmipuram-villa", desc: "Granite plinth estate anchored using 12 direct bedrock rock-bolt seismic collars." },
  
  { type: "SERVICE", title: "BOQ Slabs Concrete Estimator", path: "/services/boq-estimator", desc: "RCC volumetric calculations and rebar weight estimation based on IS_456 codes." },
  { type: "SERVICE", title: "LOD 400 BIM Clash coordination", path: "/services/bim-clash", desc: "Virtual twin assembly scanning structures to solve MEP pipe overlaps." },
  { type: "SERVICE", title: "Material Providence log audits", path: "/services/material-providence", desc: "Receipt registry detailing quarries and log mills certificates of teak and travertine." }
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { setMascotPose, setMascotEmotion } = useScrollSystem();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setMascotPose('inspect');
      setMascotEmotion('thinking');
    } else {
      setMascotPose('idle');
      setMascotEmotion('calm');
    }
  }, [isOpen, setMascotPose, setMascotEmotion]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const filtered = SEARCHABLE_INDEX.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 5));
  }, [query]);

  if (!isOpen) return null;

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-charcoal/98 backdrop-blur-2xl flex flex-col justify-start items-center p-space-24 md:p-space-40 font-sans text-white">
      
      {/* Blueprint Grid background decoration using Brand Blue */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.015] pointer-events-none"></div>

      {/* Close button */}
      <button 
        type="button"
        onClick={onClose}
        className="absolute top-space-24 right-space-24 md:right-space-40 font-sans text-[11px] uppercase tracking-widest text-white/50 hover:text-primary cursor-pointer border-none bg-transparent outline-none"
      >
        Close [ESC] ✕
      </button>

      <div className="max-w-3xl w-full flex flex-col gap-space-40 mt-[15vh] relative z-10">
        
        {/* Search header info */}
        <div className="flex flex-col gap-space-8">
          <span className="h-label-mono text-primary font-semibold">[GEOTECHNICAL GLOBAL REGISTRY SEARCH]</span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white tracking-wide uppercase">
            Search Digital HQ Logs
          </h2>
        </div>

        {/* Input box */}
        <div className="w-full relative border-b-2 border-white/10 focus-within:border-primary transition-colors py-2">
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type coordinates, services, or materials (e.g. 'soil', 'BIM', 'monolith')..."
            className="w-full bg-transparent border-none outline-none font-display text-lg md:text-2xl font-light placeholder-white/20 text-white"
          />
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4 min-h-[300px]">
          {results.length > 0 ? (
            <div className="flex flex-col gap-3">
              <span className="h-label-mono text-white/20">LOG ENTRIES FOUND ({results.length})</span>
              {results.map((item, i) => (
                <div 
                  key={i}
                  onClick={() => handleNavigate(item.path)}
                  className="group flex flex-col md:flex-row md:items-center justify-between border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-primary/35 p-space-16 rounded-none cursor-pointer transition-all duration-300"
                >
                  <div className="flex flex-col gap-1 max-w-xl">
                    <span className="font-sans text-[9px] text-primary font-semibold">{item.type} // REFERENCE</span>
                    <h4 className="font-display text-base font-light text-white group-hover:text-primary transition-colors mt-0.5">{item.title}</h4>
                    <p className="font-sans text-[11px] text-white/60 font-light mt-0.5">{item.desc}</p>
                  </div>
                  <span className="font-sans text-[10px] text-white/30 group-hover:text-primary tracking-wider transition-colors mt-3 md:mt-0">EXPLORE LOG →</span>
                </div>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="py-space-40 text-center flex flex-col gap-2 font-sans text-[11px] text-white/40 uppercase">
              <span>[WARNING: ZERO MATCHING TELEMETRY RECORDS FOUND]</span>
              <span>Audit spelling coordinates and retry.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <span className="h-label-mono text-white/20">SUGGESTED FILTERS</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Soil Testing", "Warranty Deed", "M40 Concrete", "BIM coord"].map((word, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuery(word)}
                    className="border border-white/10 hover:border-primary/35 bg-white/[0.01] hover:bg-white/[0.03] p-space-12 rounded-none font-sans text-[11px] tracking-wide text-white/70 hover:text-primary transition-all cursor-pointer text-left"
                  >
                    &gt; {word}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
