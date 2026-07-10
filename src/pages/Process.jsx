import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollSystem } from '../context/ScrollContext';
import { optimizeUnsplashUrl } from '../utils/image';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';

const PROCESS_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=95&auto=format&fit=crop",
    category: "01 // FOUNDATION EXCAVATION",
    title: "GEOTECHNICAL ANCHORS.",
    desc: "Every milestone begins with soil tests. We drill core profiles up to 12m deep to map exact load coordinates before structural concrete is poured.",
    code: "SOIL_SPT // DEEP_PILE",
    detailImg: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=95&auto=format&fit=crop",
    category: "02 // STRUCTURAL CASTING",
    title: "ISO LABORATORY TESTS.",
    desc: "Columns and beams cast in resin moulds are compression-crushed at days 7 and 28 in certified laboratories, guaranteeing zero alignment deviation.",
    code: "CUBE_CRUSH // ISO_9001",
    detailImg: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=1920&q=95&auto=format&fit=crop",
    category: "03 // MEP COORDINATION",
    title: "LOD 400 MEP INTEGRATION.",
    desc: "Assembling structural frames and pipeline routes inside unified 3D virtual twins to prevent structural concrete slab drills.",
    code: "MEP_BIM // CLASH_PASS",
    detailImg: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&auto=format&fit=crop"
  }
];

const PROCESS_STAGES = [
  {
    num: "01",
    title: "Geotechnical Core Compaction",
    desc: "Rigorous bedrock analysis and coordinate mapping. We secure structural alignment by anchor-compaction piling before any column footings are poured.",
    log: "COORD_LOG // DAY_01: BEDROCK CORE TESTING COMPLETED",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop"
  },
  {
    num: "02",
    title: "Structural Raft & Foundation",
    desc: "Pouring M40-grade concrete onto dual-membrane waterproofing tanking sheets. Day 7 crushing cube tests run in external labs map the curing progress.",
    log: "SLAB_LOG // DAY_28: CUBE STRENGTH 100% ASSURED",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop"
  },
  {
    num: "03",
    title: "BIM Integrated MEP Routing",
    desc: "Virtual LOD 400 twin alignment checks coordinate plumbing and electrical pathways, eliminating core structural cutting drill errors.",
    log: "BIM_LOG // DAY_60: ZERO COLLISONS REGISTERED",
    img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=800&auto=format&fit=crop"
  },
  {
    num: "04",
    title: "Travertine Envelope Facades",
    desc: "Precision installation of natural travertine wall facade anchors, leaving expansion cavities for weather stability.",
    log: "FACADE_LOG // DAY_180: STONE SENSORS CALIBRATED",
    img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop"
  },
  {
    num: "05",
    title: "Handover Calibration & Warranty",
    desc: "Final structural checks, RERA filing validation, and anchor registration of the 10-Year Transferable Deed of Warranty directly to the property registry.",
    log: "DEED_LOG // DAY_360: ACTIVE DEED ANCHORED",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop"
  }
];

export default function Process() {
  const { isMobile, setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(4); // Target Process mascot coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [setActiveScene, setMascotPose, setMascotEmotion]);

  return (
    <div className="w-full flex flex-col bg-charcoal text-white selection:bg-primary selection:text-white pt-0 select-none font-sans">
      
      {/* 1. Process slideshow hero */}
      <CinematicHero slides={PROCESS_SLIDES} coordinates="12.9716° N, 77.5946° E" />

      {/* 2. DYNAMIC WORKFLOW PRESENTATION */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/5 bg-charcoal relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-stretch relative z-10">
          
          {/* Left Side: Stages list selectors */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col border-t border-white/10">
              {PROCESS_STAGES.map((stg, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveStage(i)}
                  className={`w-full text-left py-space-24 border-b border-white/10 flex justify-between items-center transition-all duration-300 cursor-pointer group ${
                    activeStage === i ? 'text-accent' : 'text-white/65 hover:text-white'
                  }`}
                >
                  <div className="flex gap-space-16 items-center">
                    <span className="font-mono text-[9px] text-white/30">(STAGE 0{i+1})</span>
                    <h3 className="font-display text-lg font-light tracking-wide">{stg.title}</h3>
                  </div>
                  <span className="font-mono text-xs">{activeStage === i ? '●' : '○'}</span>
                </button>
              ))}
            </div>

            <div className="bg-charcoal border border-white/5 p-space-24 rounded-none mt-8">
              <span className="font-mono text-[9.5px] text-primary block uppercase">
                {PROCESS_STAGES[activeStage].log}
              </span>
            </div>
          </div>

          {/* Right Side: Image and description of active stage */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-space-24 justify-between">
            <div className="w-full aspect-[16/10] overflow-hidden border border-white/10 shadow-2xl rounded-none bg-charcoal">
              <img 
                src={optimizeUnsplashUrl(PROCESS_STAGES[activeStage].img, isMobile ? 800 : 1200, isMobile ? 70 : 85)} 
                alt={PROCESS_STAGES[activeStage].title} 
                className="w-full h-full object-cover grayscale-[10%]"
              />
            </div>
            
            <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed font-light pl-space-16 border-l-2 border-accent/30">
              {PROCESS_STAGES[activeStage].desc}
            </p>
          </div>

        </div>
      </section>

      {/* 2.5 TELEMETRY & EXECUTION STANDARDS */}
      <section className="py-space-64 px-space-24 md:px-space-40 border-t border-white/5 bg-charcoal relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.01] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="border-l-2 border-accent/40 pl-4 mb-12">
            <span className="font-mono text-[9px] text-accent block">[QUALITY & VERIFICATION TOLERANCES]</span>
            <h3 className="font-display text-2xl font-light text-white uppercase tracking-wider mt-1">
              Geomechanical Tolerances
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/5 p-6 bg-charcoal/40">
              <span className="font-mono text-[8px] text-accent block">METRIC // COMPACTION</span>
              <h4 className="text-white font-display text-lg font-light tracking-wide mt-2">98.5% Proctor Density</h4>
              <p className="text-white/60 text-xs mt-2 font-light leading-relaxed">
                Backfill compaction verified by soil sand replacement checks at every 250 sqm grid section.
              </p>
            </div>
            <div className="border border-white/5 p-6 bg-charcoal/40">
              <span className="font-mono text-[8px] text-accent block">METRIC // REBAR SPAN</span>
              <h4 className="text-white font-display text-lg font-light tracking-wide mt-2">±3mm Column Alignment</h4>
              <p className="text-white/60 text-xs mt-2 font-light leading-relaxed">
                Laser-guided structural coordinate scans ensure concrete reinforcement cage deviation stays under 3mm.
              </p>
            </div>
            <div className="border border-white/5 p-6 bg-charcoal/40">
              <span className="font-mono text-[8px] text-accent block">METRIC // QUALITY ASSURANCE</span>
              <h4 className="text-white font-display text-lg font-light tracking-wide mt-2">100% External Lab Audits</h4>
              <p className="text-white/60 text-xs mt-2 font-light leading-relaxed">
                All day 7/28 concrete cubes compression test logs are registered via independent NABL laboratories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ADVISORY CONSULTATION CTA */}
      <section className="py-space-96 px-space-24 md:px-space-40 bg-charcoal border-t border-white/5 relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.01] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-space-24 relative z-10">
          <span className="h-label-mono text-accent">[STRUCTURAL EXECUTION ADVISORY]</span>
          <h2 className="font-display text-3xl font-light text-white uppercase tracking-wide">
            Track Your Home's Milestones
          </h2>
          <p className="font-sans text-xs text-white/60 max-w-md mx-auto leading-relaxed font-light">
            We schedule geotechnical compaction checks for every building coordinate. Connect with Maaz Ayoob to schedule audit profiles.
          </p>
          <Link 
            to="/contact?advisory=true" 
            className="btn-primary py-3.5 px-8 tracking-widest text-[9px] rounded-none self-center mt-4"
          >
            <span>REGISTER SITE COORDINATES</span>
          </Link>
        </div>
      </section>

      <Footer />

    </div>
  );
}
