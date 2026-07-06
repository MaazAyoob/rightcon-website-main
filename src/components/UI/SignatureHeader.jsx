import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollSystem } from '../../context/ScrollContext';

export default function SignatureHeader() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { setMenuOpen, setSearchOpen } = useScrollSystem();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-space-16 px-space-24 md:px-space-40 flex justify-between items-center ${
        scrolled 
          ? 'bg-ivory/25 backdrop-blur-[2px] border-b border-[#20201E]/10 text-[#20201E] shadow-sm' 
          : 'bg-transparent border-b border-transparent text-[#F5F2EB]'
      }`}
    >
      {/* Signature Navigation Trigger (Top-Left) */}
      <button 
        type="button"
        onClick={() => setMenuOpen(true)}
        className="flex items-center gap-space-8 text-inherit hover:text-[var(--color-bronze)] font-mono text-[9px] tracking-[0.2em] uppercase transition-all duration-300 group cursor-pointer focus:outline-none"
      >
        {/* Architectural Crosshair Marker */}
        <div className="relative w-4 h-4 flex items-center justify-center border border-current/20 group-hover:border-[var(--color-bronze)] transition-colors">
          <div className="absolute w-[1px] h-3 bg-current/20 group-hover:bg-[var(--color-bronze)] transition-colors"></div>
          <div className="absolute w-3 h-[1px] bg-current/20 group-hover:bg-[var(--color-bronze)] transition-colors"></div>
          <div className="w-1.5 h-1.5 bg-[#2D4E73] rounded-full"></div>
        </div>
        <span className="font-medium text-inherit group-hover:text-[var(--color-bronze)] transition-colors">INDEX // EXPLORE</span>
      </button>

      {/* Rightcon Branding Logo (Center) */}
      <Link 
        to="/" 
        className="absolute left-1/2 -translate-x-1/2 font-display text-lg md:text-xl font-light tracking-[0.25em] text-inherit hover:text-[var(--color-bronze)] transition-colors"
      >
        RIGHTCON
      </Link>

      {/* Action Buttons (Top-Right) */}
      <div className="flex items-center gap-space-16 z-10 text-inherit">
        <button 
          type="button"
          onClick={() => setSearchOpen(true)}
          className="font-mono text-[8px] tracking-[0.15em] text-inherit/60 hover:text-[var(--color-bronze)] transition-colors uppercase cursor-pointer border-none bg-transparent outline-none focus:outline-none"
        >
          [SEARCH]
        </button>
        <Link 
          to="/contact" 
          className={`btn-secondary py-1.5 px-4 md:px-6 text-[8px] tracking-[0.15em] rounded-none transition-all duration-300 ${
            scrolled 
              ? 'border-[#20201E]/10 hover:border-[var(--color-bronze)] hover:text-[var(--color-bronze)] text-[#20201E]' 
              : 'border-[#F5F2EB]/20 hover:border-[var(--color-bronze)] hover:text-[var(--color-bronze)] text-[#F5F2EB]'
          }`}
        >
          INQUIRE
        </Link>
      </div>
    </header>
  );
}
