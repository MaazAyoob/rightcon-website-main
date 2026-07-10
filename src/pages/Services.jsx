import React, { useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import { SERVICES_DATA } from '../data/mockData';
import { Link } from 'react-router-dom';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';

const SERVICES_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=95&auto=format&fit=crop",
    category: "01 // STRUCTURAL EXECUTION",
    title: "RCC SLAB VOLUMETRICS.",
    desc: "Rigorous casting of geomechanical friction pile foundations and load-bearing column matrices. Custom concrete mixes crushed at ISO laboratories.",
    code: "RCC_VOL // FOUNDATION",
    detailImg: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1920&q=95&auto=format&fit=crop",
    category: "02 // COMPUTATIONAL AUDITS",
    title: "LOD 400 BIM CLASH.",
    desc: "Virtual twins scanning pipeline, mechanical, and structural conduits in 3D. Clearing geometric collisions to prevent onsite core drilling errors.",
    code: "BIM_CLASH // SCANNER",
    detailImg: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=95&auto=format&fit=crop",
    category: "03 // MATERIAL LEDGERS",
    title: "MATERIAL PROVIDENCE.",
    desc: "Maintaining digital ledgers tracing travertine blocks, kiln-dried Burma teak lumber logs, and Fe550D reinforcement rebars straight from mills.",
    code: "PROVIDENCE // LEDGER",
    detailImg: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop"
  }
];

export default function Services() {
  const { setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(5); // Mascot targets Services coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [setActiveScene, setMascotPose, setMascotEmotion]);

  return (
    <div className="w-full flex flex-col bg-white text-charcoal selection:bg-primary selection:text-white pt-0 select-none">
      
      {/* 1. Services slideshow hero */}
      <CinematicHero slides={SERVICES_SLIDES} coordinates="12.9716° N, 77.5946° E" />

      {/* 2. SERVICES LISTING BENTO GRID */}
      <section className="py-space-96 px-space-24 md:px-space-40 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-32">
          {SERVICES_DATA.map((srv, idx) => (
            <Link 
              key={srv.id}
              to={`/services/${srv.id}`}
              className="group border border-charcoal/10 p-space-32 bg-white rounded-none hover:border-accent/45 transition-all duration-700 flex flex-col justify-between min-h-[360px] shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 border-b border-l border-charcoal/10 p-space-12 h-label-mono text-[8px]">
                CODE // 0{idx+1}
              </div>

              <div className="flex flex-col gap-space-16 mt-4">
                <span className="font-mono text-[8.5px] text-accent font-bold">{srv.category.toUpperCase()}</span>
                <h3 className="font-display text-2xl font-light text-white group-hover:text-accent transition-colors">
                  {srv.title}
                </h3>
                <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
                  {srv.overview}
                </p>
              </div>

              <div className="border-t border-charcoal/10 pt-space-24 mt-space-24 flex justify-between items-center text-xs">
                <span className="font-mono text-charcoal/50 text-[9px] uppercase tracking-wider">READ COMPLIANCE</span>
                <span className="font-mono text-[9px] text-accent hover:text-white transition-colors">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. CONSULTATION ADVISORY CTA */}
      <section className="py-space-96 px-space-24 md:px-space-40 bg-white border-t border-charcoal/5 relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.01] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-space-24 relative z-10">
          <span className="h-label-mono text-accent">[STRUCTURAL CONSULTATIVE REGISTRY]</span>
          <h2 className="font-display text-3xl font-light text-white uppercase tracking-wide">
            Discuss Your Geomechanical Specifications
          </h2>
          <p className="font-sans text-xs text-charcoal/60 max-w-md mx-auto leading-relaxed font-light">
            Book a consultation with our Indiranagar estimating engineers to review soil friction logs and coordinate RERA scheduling parameters.
          </p>
          <Link 
            to="/contact?advisory=true" 
            className="btn-primary py-3.5 px-8 tracking-widest text-[9px] rounded-none self-center mt-4"
          >
            <span>REQUEST TECHNICAL ADVISORY</span>
          </Link>
        </div>
      </section>

      <Footer />

    </div>
  );
}
