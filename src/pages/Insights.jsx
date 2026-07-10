import React, { useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import { INSIGHTS_DATA } from '../data/mockData';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';

const INSIGHTS_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=95&auto=format&fit=crop",
    category: "01 // SOIL MECHANICS",
    title: "GEOTECHNICAL CORE GUIDES.",
    desc: "Understanding foundation settlement codes in Bangalore. Why friction piles and geotechnical bedrock mapping prevent long-term villa alignment offsets.",
    code: "FOUNDATIONS // MANUAL",
    detailImg: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=1920&q=95&auto=format&fit=crop",
    category: "02 // COLLISION RESOLVING",
    title: "LOD 400 MEP BLUEPRINTS.",
    desc: "A guide to resolving geometric overlaps in 3D CAD modeling before casting concrete, preserving critical structural slab integrity.",
    code: "BIM_TUTORIAL // DUCT_PASS",
    detailImg: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&auto=format&fit=crop"
  }
];

export default function Insights() {
  const { setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(7); // Target About & Insights mascot coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [setActiveScene, setMascotPose, setMascotEmotion]);

  return (
    <div className="w-full flex flex-col bg-charcoal text-white selection:bg-primary selection:text-white pt-0 select-none font-sans">
      
      {/* 1. Insights slideshow hero */}
      <CinematicHero slides={INSIGHTS_SLIDES} coordinates="12.9716° N, 77.5946° E" />

      {/* 2. CORE ARTICLE GRID */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/10 bg-charcoal relative">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-32">
            {INSIGHTS_DATA.map((art, idx) => (
              <div 
                key={art.id}
                className="group flex flex-col gap-space-16 border border-white/10 p-space-20 bg-charcoal hover:border-accent/40 transition-all duration-700 rounded-none shadow-md"
              >
                <div className="w-full aspect-[4/3] overflow-hidden border border-white/10 bg-charcoal relative">
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1s]"
                  />
                  <div className="absolute top-2 left-2 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-mono text-[7px] text-accent uppercase">
                    JOURNAL // RC_0{idx+1}
                  </div>
                </div>

                <div className="flex flex-col gap-space-12 mt-2">
                  <div className="flex justify-between items-center text-[7.5px] font-mono text-charcoal/40">
                    <span>BY {art.author.toUpperCase()}</span>
                    <span>{art.date}</span>
                  </div>
                  <h3 className="font-display text-xl font-light text-charcoal group-hover:text-accent transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light mt-1">
                    {art.excerpt}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 mt-4 text-right">
                  <span className="font-mono text-[8px] text-accent hover:text-charcoal transition-colors">READ BRIEFING →</span>
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
