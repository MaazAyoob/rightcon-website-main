import React, { useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';

const MATERIALS_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1920&q=95&auto=format&fit=crop",
    category: "01 // LIMESTONE BLOCKS",
    title: "TRAVERTINE STONE.",
    desc: "Unfilled, brushed travertine blocks imported directly from Tivoli, Italy. Anchored to building frames via structural stainless steel angles.",
    code: "TRAVERTINE // ORIGIN_IT",
    detailImg: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1920&q=95&auto=format&fit=crop",
    category: "02 // KILN-DRIED TIMBER",
    title: "BURMA TEAK LUMBER.",
    desc: "High density teakwood logs with strictly audited moisture coefficients to prevent structural warp, finished without artificial synthetic veneers.",
    code: "BURMA_TEAK // HARDWOOD",
    detailImg: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=95&auto=format&fit=crop",
    category: "03 // HIGH-GRADE REBAR",
    title: "Fe550D TMT REBARS.",
    desc: "High ductility steel reinforcement rods offering heavy seismic load resistance. Sourced directly from primary steel mills.",
    code: "STEEL_REBAR // TMT_550D",
    detailImg: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=600&auto=format&fit=crop"
  }
];

const MATERIALS_REGISTRY = [
  {
    name: "Day 28 Cubic Concrete",
    spec: "M40 Grade Self-Compacting",
    origin: "ISO 9001 Batching Plants",
    desc: "Specifically blended concrete mixes designed to resist seismic rafts shift loads. Monitored through slump testing and DAY 7 / DAY 28 structural crush limits.",
    img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=600&auto=format&fit=crop"
  },
  {
    name: "Structural Carbon Steel",
    spec: "Fe-550D TMT Reinforcements",
    origin: "Primary Steel Mills Only",
    desc: "High ductility steel rods offering seismic absorption capacities, coordinate bent strictly according to coordinate clash designs.",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop"
  },
  {
    name: "Italian Travertine Slabs",
    spec: "Unfilled / Brushed Facades",
    origin: "Tivoli Quarries, Italy",
    desc: "Premium exterior cladding slabs, anchored to structural envelopes via hidden stainless steel brackets with weather cavities.",
    img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&auto=format&fit=crop"
  },
  {
    name: "Burma Teak Timber",
    spec: "First-Quality Grade A Logs",
    origin: "Sustainably Harvested Stocks",
    desc: "High density timber lattices offering natural weather defenses and warp resistance, hand finished without artificial veneers.",
    img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop"
  }
];

export default function Materials() {
  const { setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(6); // Target Trust & Materials mascot coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [setActiveScene, setMascotPose, setMascotEmotion]);

  return (
    <div className="w-full flex flex-col bg-charcoal text-ivory selection:bg-bronze selection:text-charcoal pt-space-96 select-none font-sans">
      
      {/* 1. Materials slideshow hero */}
      <CinematicHero slides={MATERIALS_SLIDES} coordinates="12.9716° N, 77.5946° E" />

      {/* 2. DETAILED MATERIALS REGISTER */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/5 bg-graphite relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-64 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-40">
            {MATERIALS_REGISTRY.map((mat, i) => (
              <div 
                key={i} 
                className="border border-white/5 p-space-32 bg-charcoal/30 rounded-sm hover:border-bronze/35 transition-all duration-700 flex flex-col justify-between min-h-[440px] shadow-xl group"
              >
                <div className="w-full aspect-[16/10] overflow-hidden border border-white/5 rounded-sm relative bg-charcoal">
                  <img 
                    src={mat.img} 
                    alt={mat.name} 
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1s]"
                  />
                  <div className="absolute top-2 left-2 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-mono text-[7px] text-bronze uppercase">
                    ORIGIN // {mat.origin}
                  </div>
                </div>

                <div className="flex flex-col gap-space-12 mt-6">
                  <span className="font-mono text-[8.5px] text-bronze font-bold">{mat.spec.toUpperCase()}</span>
                  <h3 className="font-display text-2xl font-light text-white group-hover:text-bronze transition-colors">
                    {mat.name}
                  </h3>
                  <p className="font-sans text-xs text-ivory/60 leading-relaxed font-light mt-1">
                    {mat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. MATERIAL CONSULTATION CTA */}
      <section className="py-space-96 px-space-24 md:px-space-40 bg-charcoal border-t border-white/5 relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.01] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-space-24 relative z-10">
          <span className="h-label-mono text-bronze">[PROVENANCE ADVISORY REGISTRY]</span>
          <h2 className="font-display text-3xl font-light text-white uppercase tracking-wide">
            Audit Sourcing Ledger Reports
          </h2>
          <p className="font-sans text-xs text-ivory/60 max-w-md mx-auto leading-relaxed font-light">
            We provide direct quarry and mill certification details to all custom home commissions.
          </p>
          <Link 
            to="/contact?advisory=true" 
            className="btn-primary py-3.5 px-8 tracking-widest text-[9px] rounded-none self-center mt-4"
          >
            <span>REQUEST MATERIAL AUDIT</span>
          </Link>
        </div>
      </section>

      <Footer />

    </div>
  );
}
