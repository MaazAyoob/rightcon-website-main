import React, { useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';

const TECH_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=1920&q=95&auto=format&fit=crop",
    category: "01 // VIRTUAL TWINNING",
    title: "BIM LOD 400 SCHEMAS.",
    desc: "We coordinate mechanical, electrical, and structural runs inside virtual twins before casting concrete. This eliminates core slab cuts and coordinates columns safely.",
    code: "BIM_LOD_400 // DIGITAL_TWIN",
    detailImg: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=95&auto=format&fit=crop",
    category: "02 // COLLISION PASSES",
    title: "ZERO CORE DRILLS.",
    desc: "By pre-sleeving conduits inside the steel cages, we guarantee zero load-bearing steel cuts on site, preserving structural integrity.",
    code: "CLASH_FREE // ZERO_DRILL",
    detailImg: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop"
  }
];

export default function Technology() {
  const { setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(5); // Target services/estimation coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [setActiveScene, setMascotPose, setMascotEmotion]);

  return (
    <div className="w-full flex flex-col bg-charcoal text-white selection:bg-primary selection:text-white pt-0 select-none font-sans">
      
      {/* 1. Technology slideshow hero */}
      <CinematicHero slides={TECH_SLIDES} coordinates="12.9716° N, 77.5946° E" />

      {/* 2. BIM EXPLANATION DETAILED SECTION */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/5 bg-charcoal relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-center relative z-10">
          
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-space-24">
            <span className="h-label-mono text-accent">[THE ALIGNMENT PROCESS]</span>
            <h2 className="font-display text-3xl font-light text-white leading-snug uppercase tracking-wide">
              Eliminating Structural Core Cuts
            </h2>
            <p className="font-sans text-xs text-white/65 leading-relaxed font-light">
              Traditional builds suffer from trade conflicts on site: pipelines run through concrete beams, forcing builders to drill cores through load-bearing steel reinforcement. 
            </p>
            <p className="font-sans text-xs text-white/65 leading-relaxed font-light">
              Rightcon resolves this inside the virtual model. Every conduit sleeve is cast *into* the slab framework from day one, resulting in a zero-core-cut structure.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 border border-white/10 p-space-32 bg-charcoal rounded-none relative overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-10"></div>
            <svg className="w-full h-[220px] stroke-white/20 fill-none stroke-[0.5]" viewBox="0 0 100 100">
              <rect x="5" y="5" width="90" height="90" />
              <line x1="5" y1="5" x2="95" y2="95" className="blueprint-line" />
              <line x1="95" y1="5" x2="5" y2="95" className="blueprint-line" />
              <circle cx="50" cy="50" r="30" className="stroke-accent/40" />
              <rect x="25" y="25" width="50" height="50" className="stroke-primary/30" />
            </svg>
            <div className="absolute bottom-2.5 left-2.5 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-mono text-[7px] text-accent">
              CAD // VIRTUAL_LOD_400
            </div>
          </div>

        </div>
      </section>

      {/* 2.5 CLASH TELEMETRY CONSOLE */}
      <section className="py-space-64 px-space-24 md:px-space-40 border-t border-white/5 bg-charcoal relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.01] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-40">
          
          <div className="lg:col-span-5 flex flex-col gap-space-24 justify-center">
            <div className="border-l-2 border-accent/40 pl-4">
              <span className="font-mono text-[9px] text-accent block">[LOD 400 INTEGRATION SOFTWARE STACK]</span>
              <h3 className="font-display text-2xl font-light text-white uppercase tracking-wider mt-1">
                Virtual Building Orchestration
              </h3>
            </div>
            <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
              We design coordination boundaries down to the millimeter. Using Autodesk Revit for volumetric models, Tekla for structural rebar steel layouts, and Navisworks for automated clash rules, our architecture is compiled like high-performance software.
            </p>
            <div className="flex flex-col gap-4 font-mono text-[10px] text-white/80 mt-2">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0"></span>
                <span>AUTODESK REVIT // Architectural & Space Twins</span>
              </div>
              <div className="flex items-center gap-3 border-t border-white/5 pt-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0"></span>
                <span>TEKLA STRUCTURES // Heavy Rebar & Column Tolerances</span>
              </div>
              <div className="flex items-center gap-3 border-t border-white/5 pt-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>NAVISWORKS MANAGE // Automated Clash Audit Scans</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 border border-white/10 rounded-none bg-black/40 overflow-x-auto font-mono text-[9px] text-emerald-400 p-6 flex flex-col gap-4 relative">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-white/40 uppercase tracking-widest">[SYSTEM // CLASH_AUDIT_TERMINAL]</span>
              <span className="text-emerald-400/50">STATUS: ACTIVE</span>
            </div>
            <div className="flex flex-col gap-1.5 leading-normal select-none">
              <span className="text-white/40">&gt; rightcon-bim-pipeline --run clash-audit --target index-model-v3</span>
              <span>[INFO] INITIALIZING GEOMECHANICAL COORDINATE MATRIX...</span>
              <span>[INFO] RESOLVING 12.9716° N, 77.5946° E MAP NODES...</span>
              <span className="text-accent">[WARN] DUPLICATE MEP PIPE SLEEVE ENCOUNTERED AT COLUMN C-04 // AUTO-SHIFTING</span>
              <span>[INFO] RUNNING HARD CLASH TEST ON 4,192 GEOMETRIES...</span>
              <span>[SUCCESS] PASS 01 // FOUNDATION PILE MATRIX: 0 CONFLICTS</span>
              <span>[SUCCESS] PASS 02 // RAFT STEEL REINFORCEMENTS: 0 CONFLICTS</span>
              <span>[SUCCESS] PASS 03 // VERTICAL SEISMIC COLUMN CORES: 0 CONFLICTS</span>
              <span>[SUCCESS] PASS 04 // SLAB MEP CONDUIT CONGLOMERATIONS: 0 CONFLICTS</span>
              <span className="text-white mt-2">&gt; AUDIT COMPLETE. CLASH DEVIATION INDEX: 0.00mm. BLUEPRINT KEY VALIDATED.</span>
            </div>
            <div className="absolute bottom-2 right-2 text-[8px] text-white/20">
              SECURE_HASH // 0xFA488219B
            </div>
          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
}
