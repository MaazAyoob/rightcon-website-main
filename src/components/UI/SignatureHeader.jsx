import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollSystem } from '../../context/ScrollContext';

export default function SignatureHeader() {
  const [isLight, setIsLight] = useState(false);
  const { setMenuOpen, setSearchOpen } = useScrollSystem();
  const observerRef = useRef(null);

  useEffect(() => {
    // Observe elements tagged with [data-nav-theme="light"].
    // When any such element enters the top 80px of the viewport (navbar zone),
    // switch to dark/blue text; otherwise stay white on dark backgrounds.
    const NAV_HEIGHT = 80;

    const update = () => {
      const lightSections = document.querySelectorAll('[data-nav-theme="light"]');
      let overLight = false;
      lightSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Section overlaps the navbar band (top 0 → NAV_HEIGHT)
        if (rect.top < NAV_HEIGHT && rect.bottom > 0) {
          overLight = true;
        }
      });
      setIsLight(overLight);
    };

    // Run on every scroll frame
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    // Also set up a MutationObserver so newly mounted sections are picked up
    observerRef.current = new MutationObserver(update);
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    // Initial check
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-space-16 px-space-24 md:px-space-40 flex justify-between items-center ${
        isLight
          ? 'bg-transparent border-b border-black/10 text-[var(--color-brand-blue)]'
          : 'bg-transparent border-b border-transparent text-white'
      }`}
    >
      {/* Signature Navigation Trigger (Top-Left) */}
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        className="flex items-center gap-space-8 text-inherit hover:text-[var(--color-brand-blue)] font-sans text-[11px] tracking-[0.15em] uppercase transition-all duration-300 group cursor-pointer focus:outline-none"
      >
        {/* Architectural Crosshair Marker */}
        <div className="relative w-4 h-4 flex items-center justify-center border border-current/40 group-hover:border-[var(--color-brand-blue)] transition-colors">
          <div className="absolute w-[1px] h-3 bg-current/40 group-hover:bg-[var(--color-brand-blue)] transition-colors"></div>
          <div className="absolute w-3 h-[1px] bg-current/40 group-hover:bg-[var(--color-brand-blue)] transition-colors"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
        </div>
        <span className="font-semibold text-inherit group-hover:text-[var(--color-brand-blue)] transition-colors hidden sm:inline">EXPLORE DIRECTORY</span>
      </button>

      {/* Rightcon Branding Logo (Center) */}
      <Link
        to="/"
        className="absolute left-1/2 -translate-x-1/2 font-display text-sm xs:text-base md:text-xl font-semibold tracking-[0.2em] md:tracking-[0.25em] text-inherit hover:text-[var(--color-brand-blue)] transition-colors"
      >
        RIGHTCON
      </Link>

      {/* Action Buttons (Top-Right) */}
      <div className="flex items-center gap-space-12 sm:gap-space-16 z-10 text-inherit">
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="font-sans text-[10px] tracking-[0.15em] text-inherit/70 hover:text-[var(--color-brand-blue)] transition-colors uppercase cursor-pointer border-none bg-transparent outline-none focus:outline-none font-semibold flex items-center justify-center"
        >
          <span className="hidden sm:inline">[SEARCH]</span>
          <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <Link
          to="/contact"
          className={`btn-secondary py-1.5 px-3 sm:px-6 text-[10px] tracking-[0.15em] rounded-none transition-all duration-300 font-semibold ${
            isLight
              ? 'border-[var(--color-brand-blue)]/40 hover:border-[var(--color-brand-blue)] hover:text-white hover:bg-primary text-[var(--color-brand-blue)]'
              : 'border-white/20 hover:border-[var(--color-brand-blue)] hover:text-white hover:bg-primary text-white'
          }`}
        >
          INQUIRE
        </Link>
      </div>
    </header>
  );
}
