import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollSystem } from '../../context/ScrollContext';

export default function SignatureHeader() {
  const [isLight, setIsLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setMenuOpen, setSearchOpen, isMobile } = useScrollSystem();
  const observerRef = useRef(null);

  useEffect(() => {
    const NAV_HEIGHT = 80;

    const update = () => {
      const lightSections = document.querySelectorAll('[data-nav-theme="light"], .theme-light, section.bg-white, div.bg-white:not(.theme-dark *):not(.bg-charcoal *)');
      let overLight = false;
      lightSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < NAV_HEIGHT && rect.bottom > 0) {
          overLight = true;
        }
      });
      setIsLight(overLight);
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    observerRef.current = new MutationObserver(update);
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const textColor = isLight
    ? 'text-[var(--color-charcoal)]'
    : 'text-white';

  const brandBlueHover = 'hover:text-[var(--color-primary)]';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center transition-all duration-500
        px-5 xs:px-6 md:px-10 h-[60px] md:h-[72px] lg:h-[80px]
        bg-transparent border-b border-transparent ${textColor}
      `}
    >
      {/* ── Menu Trigger (Top-Left) ── */}
      <button
        id="header-menu-trigger"
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Open navigation menu"
        className={`
          flex items-center gap-2.5 transition-all duration-300 group
          cursor-pointer focus:outline-none touch-manipulation
          /* Mobile: 48×48 touch target */
          min-w-[48px] min-h-[48px] -ml-2.5 md:ml-0
          justify-center md:justify-start
          ${brandBlueHover}
        `}
      >
        {/* Architectural Crosshair Marker */}
        <div className="relative w-4 h-4 flex items-center justify-center border border-current/40 group-hover:border-[var(--color-primary)] transition-colors flex-shrink-0">
          <div className="absolute w-[1px] h-3 bg-current/40 group-hover:bg-[var(--color-primary)] transition-colors"></div>
          <div className="absolute w-3 h-[1px] bg-current/40 group-hover:bg-[var(--color-primary)] transition-colors"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
        </div>
        {/* Label hidden on small mobile, visible md+ */}
        <span className="hidden xs:inline font-sans font-semibold text-[10px] tracking-[0.15em] uppercase transition-colors">
          EXPLORE
        </span>
        <span className="hidden md:inline font-sans font-semibold text-[11px] tracking-[0.15em] uppercase transition-colors">
          DIRECTORY
        </span>
      </button>

      {/* ── RIGHTCON Logo (Center) ── */}
      <Link
        to="/"
        aria-label="Rightcon — Go to homepage"
        className={`
          absolute left-1/2 -translate-x-1/2 font-display font-semibold
          tracking-[0.18em] xs:tracking-[0.2em] md:tracking-[0.25em]
          text-sm xs:text-base md:text-lg lg:text-xl
          transition-colors duration-300
          ${brandBlueHover}
          /* Ensure minimum tap area */
          min-h-[44px] flex items-center
        `}
      >
        RIGHTCON
      </Link>

      {/* ── Action Buttons (Top-Right) ── */}
      <div className="flex items-center gap-2 xs:gap-3 md:gap-4 z-10">

        {/* Search — icon on mobile, text on sm+ */}
        <button
          id="header-search-trigger"
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
          className={`
            flex items-center justify-center
            min-w-[44px] min-h-[44px]
            font-sans font-semibold text-[10px] tracking-[0.15em] uppercase
            transition-colors duration-300 cursor-pointer border-none bg-transparent
            focus:outline-none touch-manipulation
            ${brandBlueHover} opacity-70 hover:opacity-100
          `}
        >
          {/* Text on sm+ */}
          <span className="hidden sm:inline">[SEARCH]</span>
          {/* Icon on mobile */}
          <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* INQUIRE CTA */}
        <Link
          id="header-inquire-cta"
          to="/contact"
          className={`
            flex items-center justify-center
            font-sans font-semibold tracking-[0.15em] uppercase
            border transition-all duration-300
            /* Mobile: compact, tablet+: full */
            text-[10px] px-3 min-h-[40px] xs:px-4 md:px-6 md:min-h-[44px]
            rounded-none
            ${!isLight
              ? 'border-white/25 text-white hover:border-[var(--color-primary)] hover:bg-primary hover:text-white'
              : 'border-[var(--color-charcoal)]/25 text-[var(--color-charcoal)] hover:border-[var(--color-primary)] hover:bg-primary hover:text-white'
            }
          `}
        >
          {/* Short label on tiny screens */}
          <span className="xs:hidden">→</span>
          <span className="hidden xs:inline">INQUIRE</span>
        </Link>
      </div>
    </header>
  );
}
