import React, { useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';

const ABOUT_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1920&q=95&auto=format&fit=crop",
    category: "01 // CHIEF MANDATE",
    title: "MAAZ AYOOB'S VISION.",
    desc: "A home is not an aesthetic veneer. It is a geomechanical blueprint—an envelope of concrete, steel, and stone calculated to outlast centuries. We sink friction piles directly into verified bedrock.",
    code: "FOUNDER // CHIEF_ESTIMATOR",
    detailImg: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=95&auto=format&fit=crop",
    category: "02 // GEOLOGICAL STUDY",
    title: "BEDROCKcomp SOIL CORES.",
    desc: "Standard Penetration Tests mapping clay expansion layers up to 8m deep. Every structural foundation is calculated to counter geomechanical settlements before pouring concrete.",
    code: "SOIL_SPT // DRILL_RECORD",
    detailImg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=95&auto=format&fit=crop",
    category: "03 // COMPUTATIONAL LAYOUTS",
    title: "BIM VIRTUAL TWINNING.",
    desc: "Virtual coordination grids modeling structural pillars and MEP conduits at LOD 400 specs. Eliminating onsite structural drill cuts and pipeline clashes in virtual space.",
    code: "LOD_400 // CLASH_PASS",
    detailImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop"
  }
];

export default function About() {
  const { setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(7); // Target Testimonials/About coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [setActiveScene, setMascotPose, setMascotEmotion]);

  return (
    <div className="w-full flex flex-col bg-white text-charcoal selection:bg-primary selection:text-white pt-0 select-none">
      
      {/* 1. Cinematic Slideshow Hero */}
      <CinematicHero slides={ABOUT_SLIDES} coordinates="12.9716° N, 77.5946° E" />
      <section className="py-space-96 md:py-space-160 px-space-24 md:px-space-40 border-t border-charcoal/5 bg-white relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.015] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto flex flex-col gap-space-32 text-center items-center relative z-10">
          <span className="h-label-mono text-primary font-bold">[02 // DESIGN MANDATE]</span>
          
          <blockquote className="font-display text-2xl md:text-4xl font-light italic leading-relaxed text-charcoal">
            "We reject superficial veneers. Construction is a geomechanical science. Every concrete pour, steel rebar layout, and wood joint must reflect physical honesty and structural integrity."
          </blockquote>
          
          <div className="flex flex-col gap-1.5 mt-4">
            <span className="font-display text-lg font-light text-charcoal">Maaz Ayoob</span>
            <span className="h-label-mono text-accent font-bold">FOUNDER &amp; CHIEF ESTIMATOR</span>
          </div>
        </div>
      </section>

      {/* 3. COORD TIMELINE LEDGER */}
      <section className="py-space-96 md:py-space-160 px-space-24 md:px-space-40 border-t border-white/5 bg-charcoal">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-space-48">
          <div className="lg:col-span-4 flex flex-col gap-space-16">
            <span className="h-label-mono text-accent">[03 // STUDIO TIMELINE]</span>
            <h2 className="font-display text-3xl font-light text-white uppercase tracking-wide">Historical Ledger</h2>
            <p className="font-sans text-xs text-white/60 leading-relaxed font-light mt-2 max-w-xs">
              A chronological history tracking geotechnical milestones, virtual coordination upgrades, and RERA registries.
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-space-40 border-l border-white/10 pl-space-32">
            <div className="relative">
              <span className="font-sans text-xs text-accent block font-bold">2014 // STUDIO FOUNDING</span>
              <p className="font-sans text-xs text-white/70 mt-2 font-light leading-relaxed">
                Rightcon begins operations in Indiranagar, Bangalore, focusing strictly on soil geomechanics, compaction indexes, and foundations.
              </p>
            </div>
            <div className="relative">
              <span className="font-sans text-xs text-accent block font-bold">2018 // BIM CAD ARCHIVES</span>
              <p className="font-sans text-xs text-white/70 mt-2 font-light leading-relaxed">
                Integrated virtual twin coordinate mapping at LOD 400 specifications, resolving sub-surface MEP conduit overlaps prior to concrete pour.
              </p>
            </div>
            <div className="relative">
              <span className="font-sans text-xs text-accent block font-bold">2022 // COMPRESSIVE CUBE MANDATE</span>
              <p className="font-sans text-xs text-white/70 mt-2 font-light leading-relaxed">
                Established strict laboratory compression checks on day 7 and day 28 for all load-bearing columns cast across Bangalore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPLETED RESIDENCES VERIFICATIONS */}
      <section className="py-space-96 md:py-space-160 px-space-24 md:px-space-40 border-t border-charcoal/5 bg-white relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.015] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-48 relative z-10">
          <span className="h-label-mono text-primary font-bold">[04 // CLIENT STORIES]</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-32">
            <div className="border border-charcoal/10 p-space-32 bg-white rounded-none flex flex-col gap-space-24 justify-between shadow-sm">
              <p className="font-display text-lg italic leading-relaxed text-charcoal/90">
                "Rightcon's geomechanical compaction test logs were extremely thorough. They drilled 8m deep soil cores to secure a perfect bedrock plinth footing for our active clay lot."
              </p>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] text-accent font-bold">DR. ADITYA SEN</span>
                <span className="font-sans text-[9px] text-charcoal/40 uppercase">OWNER // THE EMERALD TERRACES</span>
              </div>
            </div>

            <div className="border border-charcoal/10 p-space-32 bg-white rounded-none flex flex-col gap-space-24 justify-between shadow-sm">
              <p className="font-display text-lg italic leading-relaxed text-charcoal/90">
                "The physical honesty of the exposed concrete formwork and solid teak woodwork is unmatched. They do not hide structural defects behind veneers."
              </p>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] text-accent font-bold">KIRAN RAO</span>
                <span className="font-sans text-[9px] text-charcoal/40 uppercase">OWNER // KORAMANGALA MONOLITH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}
