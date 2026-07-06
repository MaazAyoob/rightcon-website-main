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
    <div className="w-full flex flex-col bg-charcoal text-ivory selection:bg-bronze selection:text-charcoal pt-space-96 select-none font-sans">
      
      {/* 1. Technology slideshow hero */}
      <CinematicHero slides={TECH_SLIDES} coordinates="12.9716° N, 77.5946° E" />

      {/* 2. BIM EXPLANATION DETAILED SECTION */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/5 bg-graphite relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-center relative z-10">
          
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-space-24">
            <span className="h-label-mono text-bronze">[THE ALIGNMENT PROCESS]</span>
            <h2 className="font-display text-3xl font-light text-white leading-snug uppercase tracking-wide">
              Eliminating Structural Core Cuts
            </h2>
            <p className="font-sans text-xs text-ivory/65 leading-relaxed font-light">
              Traditional builds suffer from trade conflicts on site: pipelines run through concrete beams, forcing builders to drill cores through load-bearing steel reinforcement. 
            </p>
            <p className="font-sans text-xs text-ivory/65 leading-relaxed font-light">
              Rightcon resolves this inside the virtual model. Every conduit sleeve is cast *into* the slab framework from day one, resulting in a zero-core-cut structure.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 border border-white/10 p-space-32 bg-charcoal rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-10"></div>
            <svg className="w-full h-[220px] stroke-white/20 fill-none stroke-[0.5]" viewBox="0 0 100 100">
              <rect x="5" y="5" width="90" height="90" />
              <line x1="5" y1="5" x2="95" y2="95" className="blueprint-line" />
              <line x1="95" y1="5" x2="5" y2="95" className="blueprint-line" />
              <circle cx="50" cy="50" r="30" className="stroke-bronze/40" />
              <rect x="25" y="25" width="50" height="50" className="stroke-[#2D4E73]/30" />
            </svg>
            <div className="absolute bottom-2.5 left-2.5 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-mono text-[7px] text-bronze">
              CAD // VIRTUAL_LOD_400
            </div>
          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
}
