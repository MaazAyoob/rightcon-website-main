import React, { useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';

const WHY_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1920&q=95&auto=format&fit=crop",
    category: "01 // VERIFIED STANDARDS",
    title: "THE CREDIBILITY REGISTRY.",
    desc: "We eliminate contractor estimation risks. Each rightcon structure anchors directly into verified geomechanical tests, self-compacting M40 concrete checks, and ISO lab crushing logs.",
    code: "REGISTRY // ACTIVE_LOGS",
    detailImg: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=95&auto=format&fit=crop",
    category: "02 // 10-YEAR WARRANTY DEED",
    title: "STRUCTURAL PEACE.",
    desc: "Our 10-Year transferable structural deed is registered directly inside your property title, guaranteeing structural Recast or Repair liability coordinates.",
    code: "WARRANTY // TRANSFERABLE",
    detailImg: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop"
  }
];

const CREDENTIALS = [
  { num: "01", title: "RERA Registered", desc: "Fully certified under Karnataka RERA registries, ensuring strict scheduling logs and transparency rules." },
  { num: "02", title: "Bedrock Soil Testing", desc: "Standard Penetration Tests up to 8m mapping geomechanical soil properties before pouring footings." },
  { num: "03", title: "Day 7/28 Concrete Tests", desc: "Cube samples compressed in ISO certified laboratories to verify strict loading load capacity tolerances." },
  { num: "04", title: "LOD 400 Coordination", desc: "Clash-free digital twins modeled in BIM coordinating structural spans, eliminating drilling defects." }
];

export default function WhyRightcon() {
  const { setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(6); // Mascot targets Trust/Materials coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [setActiveScene, setMascotPose, setMascotEmotion]);

  return (
    <div className="w-full flex flex-col bg-charcoal text-white selection:bg-primary selection:text-white pt-0 select-none font-sans">
      
      {/* 1. Why Rightcon slideshow hero */}
      <CinematicHero slides={WHY_SLIDES} coordinates="12.9716° N, 77.5946° E" />

      {/* 1.5 PERFORMANCE STATS BAR */}
      <section className="py-12 px-space-24 md:px-space-40 border-t border-b border-white/5 bg-charcoal/50 relative">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-accent uppercase tracking-wider">[STRUCTURAL DEFECTS]</span>
            <span className="font-display text-4xl md:text-5xl font-light text-white">0.0%</span>
            <span className="font-sans text-[10px] text-white/40">Tested under active loading limits</span>
          </div>
          <div className="flex flex-col gap-2 border-l border-white/5 md:pl-4">
            <span className="font-mono text-xs text-accent uppercase tracking-wider">[SOIL CORE DRILLS]</span>
            <span className="font-display text-4xl md:text-5xl font-light text-white">8m - 12m</span>
            <span className="font-sans text-[10px] text-white/40">Friction piling deep bedrock mapping</span>
          </div>
          <div className="flex flex-col gap-2 border-l border-white/5 md:pl-4">
            <span className="font-mono text-xs text-accent uppercase tracking-wider">[CONCRETE CERTIFIED]</span>
            <span className="font-display text-4xl md:text-5xl font-light text-white">100%</span>
            <span className="font-sans text-[10px] text-white/40">ISO laboratory cube crushing checks</span>
          </div>
          <div className="flex flex-col gap-2 border-l border-white/5 md:pl-4">
            <span className="font-mono text-xs text-accent uppercase tracking-wider">[BIM CLASH AUDITS]</span>
            <span className="font-display text-4xl md:text-5xl font-light text-white">LOD 400</span>
            <span className="font-sans text-[10px] text-white/40">Complete virtual plumbing & column twins</span>
          </div>
        </div>
      </section>

      {/* 2. CORE CREDENTIALS INDEX */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/5 bg-charcoal relative">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-48 relative z-10">
          <span className="h-label-mono text-accent">[THE CREDIBILITY REGISTRY]</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-32">
            {CREDENTIALS.map((cred, idx) => (
              <div 
                key={idx} 
                className="border border-white/5 p-space-32 bg-charcoal/30 rounded-none flex flex-col gap-space-16 justify-between hover:border-accent/35 transition-all duration-500"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[8.5px] text-accent font-bold">REGISTRY // {cred.num}</span>
                  <h3 className="font-display text-xl font-light text-white mt-2 uppercase tracking-wide">{cred.title}</h3>
                  <p className="font-sans text-xs text-white/65 leading-relaxed font-light mt-2">
                    {cred.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 COMPARISON MATRIX */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/5 bg-charcoal relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.01] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-space-48">
          <div className="border-l-2 border-accent/40 pl-4">
            <span className="font-mono text-[9px] text-accent block">[CONTRACTUAL DIFFERENCES]</span>
            <h3 className="font-display text-2xl font-light text-white uppercase tracking-wider mt-1">
              Rightcon Assurance vs. Traditional Builders
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-white/10 font-mono text-[10.5px]">
              <thead>
                <tr className="bg-charcoal border-b border-white/10 text-accent uppercase tracking-wider">
                  <th className="p-4 border-r border-white/10">Feature</th>
                  <th className="p-4 border-r border-white/10 text-white/40">Traditional Contractors</th>
                  <th className="p-4 text-accent font-bold">Rightcon Assurance</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10 hover:bg-white/[0.01]">
                  <td className="p-4 border-r border-white/10 font-bold text-white uppercase">Soil Geomechanics</td>
                  <td className="p-4 border-r border-white/10 text-white/50">Vague visual inspection, uniform foundation sizing</td>
                  <td className="p-4 text-white font-light">
                    Deep bedrock core drilling (8m - 12m) to map precise bearing indexes.
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/[0.01]">
                  <td className="p-4 border-r border-white/10 font-bold text-white uppercase">Slab Coordination</td>
                  <td className="p-4 border-r border-white/10 text-white/50">Manual drill cuts on-site; frequent structural steel rebar splits</td>
                  <td className="p-4 text-white font-light">
                    Zero core drill cuts. All conduit lines are pre-sleeved in 3D BIM models at LOD 400.
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/[0.01]">
                  <td className="p-4 border-r border-white/10 font-bold text-white uppercase">Material Auditing</td>
                  <td className="p-4 border-r border-white/10 text-white/50">Contractor-selected local batches with unverified provenance ledger</td>
                  <td className="p-4 text-white font-light">
                    Direct quarry/mill invoices and certified laboratory crushing reports (Day 7/28).
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="p-4 border-r border-white/10 font-bold text-white uppercase">Warranty Title</td>
                  <td className="p-4 border-r border-white/10 text-white/50">1-year verbal/simple contract; expires if contractor closes shop</td>
                  <td className="p-4 text-white font-light">
                    10-year transferable deed of warranty registered directly inside the property title.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. 10-YEAR DEED OF STRUCTURAL WARRANTY */}
      <section className="py-space-96 px-space-24 md:px-space-40 max-w-7xl mx-auto w-full relative z-10">
        <div className="border border-white/10 bg-charcoal p-space-32 md:p-space-64 shadow-2xl rounded-none flex flex-col gap-space-32">
          <span className="h-label-mono text-accent">[STRUCTURAL WARRANTY DEED]</span>
          <h2 className="font-display text-3xl font-light text-white uppercase tracking-wide">10-Year Transferable Warranty</h2>
          
          <p className="font-sans text-sm text-white/70 leading-relaxed font-light max-w-2xl">
            Our warranty maps structural liability directly to the geomechanical coordinates of the site. Registered inside the property deed, it remains active if ownership changes, protecting future asset valuations.
          </p>

          <div className="border-t border-white/10 pt-6 flex justify-between items-center text-[9px] font-mono text-white/40">
            <span>RERA REG: ACTIVE</span>
            <span>LIABILITY COVERAGE: 100% OF RECAST OR REPAIR</span>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}
