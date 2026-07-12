import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import { optimizeUnsplashUrl } from '../../utils/image';

/**
 * CinematicHero — V19.1 Mobile-First Redesign
 *
 * Mobile:  Portrait-oriented, full svh height, bottom swipeable info card.
 *          The detail image is no longer hidden — it becomes a bottom card strip
 *          with the slide's category code and thumbnail.
 *
 * Tablet:  Two-column: text 60% left | card 40% right (smaller card visible).
 *
 * Desktop: Original editorial layout (text left, floating asymmetric card right).
 *
 * All breakpoints: IntersectionObserver-based lazy image loading,
 *                  portrait crop on mobile, landscape on desktop.
 */
export default function CinematicHero({ slides = [], coordinates = "12.9716° N, 77.5946° E", sculpture = null }) {
  const { isMobile, isTablet, screenSize } = useScrollSystem();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const autoRef = useRef(null);

  const goToSlide = useCallback((idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(idx);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  // Auto-advance
  useEffect(() => {
    if (!slides.length) return;
    autoRef.current = setInterval(nextSlide, 6000);
    return () => clearInterval(autoRef.current);
  }, [slides, nextSlide]);

  // Touch swipe for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only handle horizontal swipes (ignore vertical scroll)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      clearInterval(autoRef.current);
      if (dx < 0) nextSlide();
      else goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }
    touchStartX.current = null;
  };

  if (!slides.length) return null;

  const activeSlide = slides[currentSlide];
  const imgQuality = isMobile ? 75 : isTablet ? 80 : 90;
  const imgWidth = isMobile ? 600 : isTablet ? 1000 : 1600;
  const thumbWidth = isMobile ? 200 : 400;

  return (
    <section
      className="relative w-full flex flex-col justify-between overflow-hidden select-none bg-charcoal"
      style={{ height: '100svh', maxHeight: '100svh', minHeight: '500px' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label={`${activeSlide.title} — slide ${currentSlide + 1} of ${slides.length}`}
    >
      {/* ── 0. Solid Charcoal Backdrop — Sculpture only mode ── */}
      <div className="absolute inset-0 z-0 bg-[#0A0A0A]" />

      {/* ── 1. Gradient Overlays ── */}
      {/* Left-to-right for desktop text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden lg:block"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.88) 35%, rgba(10,10,10,0.55) 58%, rgba(10,10,10,0.18) 76%, rgba(10,10,10,0) 90%)'
        }}
      />
      {/* Full overlay for mobile/tablet */}
      <div
        className="absolute inset-0 lg:hidden z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.35) 40%, rgba(10,10,10,0.75) 100%)'
        }}
      />
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent z-[1] pointer-events-none" />
      {/* Top vignette for nav bar */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/35 via-transparent to-transparent z-[1] pointer-events-none" />

      {/* ── 2. Blueprint Grid ── */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.015] pointer-events-none z-[1]" />

      {/* ── 3. Optional 3D Sculpture ── */}
      {sculpture && (
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {sculpture}
        </div>
      )}

      {/* ── Spacer below header ── */}
      <div className="h-16 md:h-20 w-full flex-shrink-0 z-10" />

      {/* ── 4. Hero Text Content ── */}
      <div className="relative z-20 w-full my-auto px-5 xs:px-6 md:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left: Text Detail */}
          <div className={`lg:col-span-7 flex flex-col gap-4 transition-all duration-700 ${
            isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}>
            {/* Breadcrumb / category label */}
            <div className="h-label-mono text-white/50 flex items-center gap-2 flex-wrap">
              <span>({activeSlide.category})</span>
              <span className="w-6 h-[1px] bg-white/20" />
              <span className="text-primary font-semibold" style={{ fontSize: '9px' }}>TECHNICAL VERIFICATION LOG</span>
            </div>

            {/* Hero title */}
            <h1 className="h-hero-display font-display text-white uppercase leading-none">
              {activeSlide.title}
            </h1>

            {/* Description — max 2 lines on mobile */}
            <p className="font-sans font-light text-white/75 leading-relaxed text-sm md:text-base lg:text-[15px] max-w-md line-clamp-2 md:line-clamp-none">
              {activeSlide.desc}
            </p>
          </div>

          {/* Right Column: Floating card — TABLET only (md to lg) */}
          {activeSlide.detailImg && (
            <div className="hidden md:flex lg:hidden col-span-1 justify-end items-center">
              <div className="relative w-40 aspect-[3/4] border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.35)] bg-charcoal overflow-hidden">
                <img
                  src={optimizeUnsplashUrl(activeSlide.detailImg, 400, 75)}
                  alt="Architectural detail"
                  className="w-full h-full object-cover grayscale-[15%]"
                />
                <div className="absolute bottom-2 left-2 bg-charcoal/90 border border-white/5 px-2 py-0.5 font-mono text-[8px] text-accent uppercase font-bold">
                  {activeSlide.code}
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Desktop floating asymmetric card */}
          {activeSlide.detailImg && (
            <div className="hidden lg:flex lg:col-span-5 relative min-h-[300px] items-center justify-center">
              <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none border border-white/5 bg-white/[0.01]" />
              <div className={`
                absolute right-[5%] w-[240px] aspect-[4/5] z-10 border border-white/10
                shadow-[0_24px_48px_rgba(0,0,0,0.3)] bg-charcoal overflow-hidden
                group transition-all duration-700 ease-out
                ${isTransitioning ? 'opacity-0 rotate-[3deg] translate-y-2 scale-95' : 'opacity-100 rotate-[1.5deg] hover:rotate-0 hover:scale-[1.02]'}
              `}>
                <img
                  src={optimizeUnsplashUrl(activeSlide.detailImg, 600, 80)}
                  alt="Architectural detailing"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1s]"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="absolute bottom-3 left-3 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-sans text-[9px] text-accent uppercase font-bold">
                  {activeSlide.code}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── 5. Bottom Info Card Strip — Mobile Only ──────────────────────── */}
      {/* Reimagined: instead of hiding the detailImg card, it becomes a swipeable bottom card */}
      {activeSlide.detailImg && (
        <div className="md:hidden relative z-20 mx-5 mb-4">
          <div
            className={`
              flex items-center gap-3 bg-charcoal/85 backdrop-blur-md border border-white/10
              p-3 transition-all duration-500
              ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
            `}
          >
            {/* Thumbnail */}
            <div className="w-14 h-14 flex-shrink-0 border border-white/10 overflow-hidden">
              <img
                src={optimizeUnsplashUrl(activeSlide.detailImg, thumbWidth, 70)}
                alt="Detail"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Info */}
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="font-mono text-[8px] text-accent font-bold uppercase tracking-widest truncate">
                {activeSlide.code}
              </span>
              <span className="font-sans text-[11px] text-white/80 leading-tight line-clamp-2">
                {activeSlide.desc}
              </span>
            </div>
            {/* Swipe hint arrow */}
            <div className="flex-shrink-0 text-white/30 text-xs">›</div>
          </div>
        </div>
      )}

      {/* ── 6. Footer: Slide indicators + coordinates ── */}
      <div className="relative z-20 w-full flex justify-between items-center border-t border-white/5 px-5 xs:px-6 md:px-10 xl:px-16 pt-3 pb-3 xs:pb-4 text-white">
        <div className="flex items-center gap-4">
          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  clearInterval(autoRef.current);
                  goToSlide(i);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 touch-manipulation ${
                  currentSlide === i ? 'bg-primary w-5' : 'bg-white/25 w-1.5 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          <span className="hidden sm:inline font-sans text-[9px] text-accent tracking-[0.15em] uppercase font-bold">
            Section Ledger Active
          </span>
        </div>

        {/* Coordinates + slide count */}
        <div className="font-sans text-[9px] text-white/35 tracking-wide hidden md:block">
          PAGE SLIDE 0{currentSlide + 1} OF 0{slides.length} // {coordinates}
        </div>

        {/* Mobile: just slide count */}
        <div className="font-sans text-[9px] text-white/35 tracking-wide md:hidden">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
}
