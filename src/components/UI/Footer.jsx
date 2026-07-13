import React, { useEffect, useRef } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const { replayIntro, setMascotPose } = useScrollSystem();
  const footerRef = useRef(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 95%",
      end: "bottom bottom",
      onToggle: (self) => {
        if (self.isActive) {
          // Mascot sits down, jetpack off, looks at logo
          setMascotPose('sitting');
        } else {
          setMascotPose('idle');
        }
      }
    });

    return () => trigger.kill();
  }, [setMascotPose]);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full border-t border-white/5 py-space-96 px-space-24 md:px-space-40 select-none z-10 theme-dark bg-charcoal subpixel-text"
    >
      {/* Decorative architectural grid */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-space-64">
        
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-space-40">
          
          {/* Logo Brand Mark */}
          <div className="flex flex-col items-start leading-none text-white">
            <span className="h-label-mono text-accent">
              EST. 2014 / BANGALORE DESIGN HQ
            </span>
            <span className="font-display text-4xl md:text-5xl font-light tracking-[0.25em] mt-3">
              RIGHTCON
            </span>
          </div>

          {/* Right layout block: location + contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-40 md:gap-space-96">
            
            {/* Showroom location */}
            <div className="flex flex-col gap-space-8">
              <span className="h-label-mono text-accent">
                (LOCATION)
              </span>
              <address className="not-italic font-sans text-xs text-white/65 leading-relaxed font-light max-w-[220px]">
                12th Main Rd, Indiranagar, Bangalore, Karnataka 560038
              </address>
            </div>

            {/* Inquiries */}
            <div className="flex flex-col gap-space-8">
              <span className="h-label-mono text-accent">
                (CONTACT)
              </span>
              <div className="flex flex-col gap-space-8 text-xs text-white/65 font-light">
                <a href="mailto:info@rightcon.in" className="hover:text-accent transition-colors">
                  info@rightcon.in
                </a>
                <a href="tel:+919845100000" className="hover:text-accent transition-colors">
                  +91 98451 00000
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom footer row */}
        <div className="border-t border-white/10 pt-space-32 flex flex-col md:flex-row justify-between items-start md:items-center gap-space-24">
          <div className="h-label-mono text-[9px] text-white/40">
            © {new Date().getFullYear()}. RIGHTCON COLLECTIVE. ALL RIGHTS RESERVED.
          </div>

          <div className="flex flex-col sm:flex-row gap-space-16 md:gap-space-40 h-label-mono text-[9px] items-start sm:items-center">
            <a href="/privacy" className="hover:text-accent transition-colors">
              PRIVACY POLICY
            </a>

            <button 
              onClick={replayIntro}
              className="hover:text-accent transition-colors cursor-pointer text-left border-none bg-transparent p-0 outline-none uppercase font-mono tracking-widest text-[9px]"
            >
              REPLAY INTRO
            </button>
            
            {/* RERA info */}
            <div className="flex items-center gap-space-8">
              <span className="text-accent font-bold">RERA ID:</span>
              <span className="text-white/60 font-light">PRM/KA/RERA/1251/310</span>
            </div>

            {/* Mascot observation anchor */}
            <div className="mascot-observation-point">
              <span className="mascot-observation-dot"></span>
              <span>Mascot Resting Station</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
