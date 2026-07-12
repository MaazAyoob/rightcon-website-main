import React, { useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';
import PathSculpture from '../components/Sculptures/PathSculpture';

const JOURNEY_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&q=95&auto=format&fit=crop",
    category: "01 // DESIGN CONTRACT",
    title: "DIRECT COMMISSION.",
    desc: "Every villa project begins with geomechanical audits. We analyze soil friction records and map plinth alignments before finalizing plans.",
    code: "JOURNEY // SITE_AUDIT",
    detailImg: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=95&auto=format&fit=crop",
    category: "02 // STAGE TELEMETRY",
    title: "CONCRETE AUDITING.",
    desc: "Casting columns, testing slump loads, and compiling daily photographic logs. Sourced materials are checked at each construction stage.",
    code: "CUBE_TELEMETRY // RERA",
    detailImg: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop"
  }
];

const JOURNEY_STEPS = [
  { num: "01", phase: "GEOTECHNICAL AUDIT", desc: "Before structural drawings begin, geomechanical engineers drill bedrock cores to determine load-bearing capacities." },
  { num: "02", phase: "VIRTUAL BIM REVIEW", desc: "You walk through the 3D model, verifying spatial flow, MEP runs, and structural coordination grids." },
  { num: "03", phase: "REAL-TIME AUDIT FEED", desc: "During execution, concrete cubic checks and compression test logs are uploaded dynamically to your ledger." },
  { num: "04", phase: "WARRANTY HANDOVER", desc: "Upon completion, the geomechanical warranty is anchored to the property registry deed." }
];

export default function ClientJourney() {
  const { setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(4); // Target Process coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [setActiveScene, setMascotPose, setMascotEmotion]);

  return (
    <div className="w-full flex flex-col bg-white text-charcoal selection:bg-primary selection:text-white pt-0 select-none font-sans">
      
      {/* 1. Client Journey slideshow hero */}
      <CinematicHero slides={JOURNEY_SLIDES} coordinates="12.9716° N, 77.5946° E" sculpture={<PathSculpture />} />

      {/* 2. MILESTONE LIST */}
      <section className="section-container border-t border-charcoal/5 bg-white relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-48 relative z-10">
          <span className="h-label-mono text-accent">[JOURNEY STEPS]</span>
          
          <div className="flex flex-col border-t border-charcoal/10">
            {JOURNEY_STEPS.map((step, idx) => (
              <div 
                key={idx} 
                className="border-b border-charcoal/10 py-space-32 grid grid-cols-1 md:grid-cols-12 gap-space-24 items-start hover:bg-charcoal/[0.01] px-4 transition-colors duration-300"
              >
                <div className="md:col-span-2 font-mono text-xs text-accent font-bold">
                  STEP // {step.num}
                </div>
                <div className="md:col-span-4 font-display text-lg font-light text-charcoal tracking-wide uppercase">
                  {step.phase}
                </div>
                <div className="md:col-span-6 font-sans text-xs text-charcoal/60 leading-relaxed font-light">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 CLIENT PORTAL PREVIEW */}
      <section className="section-container border-t border-charcoal/5 bg-charcoal relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.01] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-space-48">
          
          <div className="border-l-2 border-accent/40 pl-4">
            <span className="font-mono text-[9px] text-accent block">[THE REAL-TIME TELEMETRY SYSTEM]</span>
            <h3 className="font-display text-2xl font-light text-white uppercase tracking-wider mt-1">
              Client Assurance Portal Mockup
            </h3>
          </div>

          <div className="border border-charcoal/10 rounded-none bg-white/10 overflow-hidden p-space-24 md:p-space-40 flex flex-col gap-8 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-charcoal/5 pb-6">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] text-white/40 uppercase">ACTIVE COMMISSION REFERENCE</span>
                <span className="font-display text-xl text-white tracking-wide uppercase">RC // KORAMANGALA_RESIDENCE_04</span>
              </div>
              <div className="flex gap-4 font-mono text-[10px]">
                <div className="bg-primary/20 border border-primary/40 text-primary px-3 py-1.5 uppercase rounded-none">
                  RERA REG: COMPLIANT
                </div>
                <div className="bg-accent/20 border border-accent/40 text-accent px-3 py-1.5 uppercase rounded-none">
                  WARRANTY REGISTERED
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Telemetry Card 1 */}
              <div className="border border-charcoal/5 p-5 bg-charcoal/50 rounded-none flex flex-col justify-between min-h-[140px] hover:border-white/15 transition-all">
                <span className="font-mono text-[8px] text-accent uppercase">[SOIL COMPACTION INDEX]</span>
                <div className="flex flex-col gap-1 mt-4">
                  <span className="font-display text-3xl font-light text-white">98.4%</span>
                  <span className="font-mono text-[8px] text-primary">PROCTOR DENSITY MATRIX</span>
                </div>
              </div>

              {/* Telemetry Card 2 */}
              <div className="border border-charcoal/5 p-5 bg-charcoal/50 rounded-none flex flex-col justify-between min-h-[140px] hover:border-white/15 transition-all">
                <span className="font-mono text-[8px] text-accent uppercase">[CONCRETE CURING INDEX]</span>
                <div className="flex flex-col gap-1 mt-4">
                  <span className="font-display text-3xl font-light text-white">92.1%</span>
                  <span className="font-mono text-[8px] text-primary">DAY 28 COMPRESSIVE TARGET</span>
                </div>
              </div>

              {/* Telemetry Card 3 */}
              <div className="border border-charcoal/5 p-5 bg-charcoal/50 rounded-none flex flex-col justify-between min-h-[140px] hover:border-white/15 transition-all">
                <span className="font-mono text-[8px] text-accent uppercase">[SLUMP TEST DEVIATION]</span>
                <div className="flex flex-col gap-1 mt-4">
                  <span className="font-display text-3xl font-light text-white">+2.0mm</span>
                  <span className="font-mono text-[8px] text-emerald-500">OPTIMAL STRUCTURAL FLOW</span>
                </div>
              </div>

              {/* Telemetry Card 4 */}
              <div className="border border-charcoal/5 p-5 bg-charcoal/50 rounded-none flex flex-col justify-between min-h-[140px] hover:border-white/15 transition-all">
                <span className="font-mono text-[8px] text-accent uppercase">[GEOMECHANICAL SETTLEMENT]</span>
                <div className="flex flex-col gap-1 mt-4">
                  <span className="font-display text-3xl font-light text-white">0.00mm</span>
                  <span className="font-mono text-[8px] text-emerald-500">4 SENSOR NODES ONLINE</span>
                </div>
              </div>
            </div>

            <div className="border-t border-charcoal/5 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[9px] font-mono text-white/40">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>LIVE TELEMETRY STREAM UPDATED // SECONDS AGO</span>
              </div>
              <span>CLIENT SIGNATURE AUTH: VALIDATED</span>
            </div>

          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
}
