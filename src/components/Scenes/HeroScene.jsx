import React from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

export default function HeroScene() {
  const { scrollProgress } = useScrollSystem();
  
  // Subtle parallax zoom based on scroll progress
  const bgScale = 1.0 + scrollProgress * 0.15;
  const textTranslateY = scrollProgress * -150;

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden p-8 md:p-16 select-none">
      {/* 1. Cinematic Background Video or High-End Image */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-100 ease-out brightness-40 grayscale-[20%]"
        style={{ transform: `scale(${bgScale})` }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90&auto=format&fit=crop"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-exterior-44161-large.mp4" type="video/mp4" />
        </video>
        {/* Architectural grid overlay */}
        <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none"></div>
        {/* Soft bottom vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-transparent to-transparent opacity-80"></div>
      </div>

      {/* 2. Nav Header (Floating Editorial) */}
      <header className="relative z-10 w-full flex justify-between items-center py-4">
        <div className="flex flex-col items-start leading-none">
          <span className="font-mono text-[7px] md:text-[9px] text-bronze tracking-[0.25em] uppercase font-semibold">
            Rightcon · Science &amp; Build
          </span>
          <span className="font-display text-xl md:text-2xl font-light text-white tracking-wide mt-1">
            RIGHTCON
          </span>
        </div>

        {/* Action button */}
        <a 
          href="#book-a-visit" 
          className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-bronze text-bronze hover:bg-bronze hover:text-[#12110f] transition-all duration-500 rounded-sm"
        >
          Inquire
        </a>
      </header>

      {/* 3. Hero Storytelling text */}
      <div 
        className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center"
        style={{ transform: `translateY(${textTranslateY}px)` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <h1 className="font-display text-5xl md:text-8xl italic font-light tracking-tight leading-[1.0] text-white flex flex-col">
              <span>ARCHITECTURAL</span>
              <span className="text-bronze not-italic ml-[10%] md:ml-[15%] mt-2">
                RIGOR.
              </span>
            </h1>
          </div>
          
          <div className="md:col-span-4 max-w-xs md:max-w-none">
            <div className="font-mono text-[10px] text-stone tracking-[0.25em] mb-3 uppercase">
              (ENGINEERING PHILOSOPHY)
            </div>
            <p className="font-sans text-xs md:text-sm font-light text-stone-light leading-relaxed">
              We construct residential landmarks across Bangalore &amp; Mysuru combining geomechanical soil analysis, zero-defect engineering, and raw material truth.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Footer scroll cue */}
      <div className="relative z-10 w-full flex items-center gap-4">
        <div className="w-12 h-[1px] bg-bronze/50"></div>
        <span className="font-mono text-[9px] text-bronze tracking-[0.3em]">
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}
