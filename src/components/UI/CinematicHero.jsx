import React, { useEffect, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import { optimizeUnsplashUrl } from '../../utils/image';

export default function CinematicHero({ slides = [], coordinates = "12.9716° N, 77.5946° E", sculpture = null }) {
  const { isMobile } = useScrollSystem();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) return null;

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative h-[80vh] md:h-[90vh] w-full flex flex-col justify-between overflow-hidden p-space-24 md:p-space-40 select-none theme-dark subpixel-text bg-transparent">
      
      {/* 0. Optional 3D Sculpture Background */}
      {sculpture && sculpture}

      {/* 1. Readability overlays over the light canvas background */}
      {/* Text readability zone — dark-left → transparent-right (desktop split layout) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.88) 35%, rgba(10,10,10,0.55) 58%, rgba(10,10,10,0.18) 76%, rgba(10,10,10,0) 90%)'
        }}
      ></div>
      {/* Bottom vignette — scroll cue + footer readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent z-[1] pointer-events-none"></div>
      {/* Top vignette — nav bar readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/35 via-transparent to-transparent z-[1] pointer-events-none"></div>
      {/* Mobile safe — gradient dark overlay on small screens (no col split, text covers full width) */}
      <div 
        className="absolute inset-0 lg:hidden z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0.80) 100%)'
        }}
      ></div>

      {/* Fine architectural grid overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.015] pointer-events-none z-[1]"></div>

      {/* spacer to push text down */}
      <div className="h-space-40 w-full pointer-events-none z-10"></div>

      {/* 2. Dynamic Slide Immersive Text */}
      <div className="relative z-20 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center transition-all duration-1000">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-center">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-7 flex flex-col gap-space-16">
            <div className="h-label-mono text-white/50 flex items-center gap-space-8 transition-all duration-500">
              <span>({activeSlide.category})</span>
              <span className="w-8 h-[1px] bg-white/10"></span>
              <span className="text-primary font-semibold">TECHNICAL VERIFICATION LOG</span>
            </div>
            
            <h1 className="h-hero-display font-display text-white transition-all duration-[0.8s] ease-out uppercase">
              {activeSlide.title}
            </h1>
            
            <div className="max-w-md mt-2">
              <p className="font-sans text-xs md:text-sm font-light text-white/80 leading-relaxed mb-space-24 transition-all duration-500">
                {activeSlide.desc}
              </p>
            </div>
          </div>
          
          {/* Right Column: Floating Asymmetric Card */}
          {activeSlide.detailImg && (
            <div className="hidden lg:flex lg:col-span-5 relative h-full min-h-[300px] items-center justify-center">
              <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none rounded-none border border-white/5 bg-white/[0.01]"></div>
              
              <div className="absolute right-[5%] w-[240px] aspect-[4/5] z-10 border border-white/10 shadow-[0_24px_48px_rgba(0,0,0,0.3)] bg-charcoal overflow-hidden group rotate-[1.5deg] hover:rotate-0 transition-all duration-700 hover:scale-102 rounded-none">
                <img 
                  src={optimizeUnsplashUrl(activeSlide.detailImg, isMobile ? 500 : 800, isMobile ? 70 : 80)} 
                  alt="Architectural detailing" 
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1s]"
                />
                <div className="absolute bottom-3 left-3 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-sans text-[9px] text-accent uppercase font-bold">
                  {activeSlide.code}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Footer with slideshow progress indicators */}
      <div className="relative z-20 w-full flex justify-between items-center border-t border-white/5 pt-space-16 text-white mt-space-40">
        <div className="flex items-center gap-space-24">
          <div className="flex items-center gap-space-8">
            <div className="w-12 h-[1px] bg-accent/50"></div>
            <span className="font-sans text-[10px] text-accent tracking-[0.15em] uppercase font-bold">
              Section Ledger Active
            </span>
          </div>
          
          {/* Slideshow dot indicators */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentSlide(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === i ? 'bg-primary w-4' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="h-caption font-sans text-[10px] text-white/40">
          PAGE SLIDE 0{currentSlide + 1} OF 0{slides.length} // {coordinates}
        </div>
      </div>
    </section>
  );
}
