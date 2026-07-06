import React, { useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';

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
    <div className="w-full flex flex-col bg-charcoal text-ivory selection:bg-bronze selection:text-charcoal pt-space-96 select-none font-sans">
      
      {/* 1. Journey slideshow hero */}
      <CinematicHero slides={JOURNEY_SLIDES} coordinates="12.9716° N, 77.5946° E" />

      {/* 2. MILESTONE LIST */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/5 bg-graphite relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-48 relative z-10">
          <span className="h-label-mono text-bronze">[JOURNEY STEPS]</span>
          
          <div className="flex flex-col border-t border-white/10">
            {JOURNEY_STEPS.map((step, idx) => (
              <div 
                key={idx} 
                className="border-b border-white/10 py-space-32 grid grid-cols-1 md:grid-cols-12 gap-space-24 items-start hover:bg-white/[0.01] px-4 transition-colors duration-300"
              >
                <div className="md:col-span-2 font-mono text-xs text-bronze font-bold">
                  STEP // {step.num}
                </div>
                <div className="md:col-span-4 font-display text-lg font-light text-white tracking-wide uppercase">
                  {step.phase}
                </div>
                <div className="md:col-span-6 font-sans text-xs text-ivory/60 leading-relaxed font-light">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}
