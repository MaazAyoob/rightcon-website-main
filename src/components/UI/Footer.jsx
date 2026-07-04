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
      className="relative w-full bg-[#050505] border-t border-white/5 py-20 px-8 md:px-16 select-none z-10 subpixel-text"
    >
      {/* Decorative architectural grid */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12">
        
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Logo Brand Mark */}
          <div className="flex flex-col items-start leading-none">
            <span className="font-mono text-[7px] md:text-[9.5px] text-stone tracking-[0.25em] uppercase font-semibold">
              EST. 2014 BANGALORE HQ
            </span>
            <span className="font-display text-2xl md:text-3xl font-light tracking-wide mt-2 logo-glow">
              RIGHTCON
            </span>
          </div>

          {/* Right layout block: location + contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-24">
            
            {/* Showroom location */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.2em] uppercase font-semibold">
                (LOCATION)
              </span>
              <address className="not-italic font-sans text-xs md:text-sm font-light text-stone-light max-w-[200px] leading-relaxed">
                12th Main Rd, Indiranagar, Bangalore, Karnataka 560038
              </address>
            </div>

            {/* Inquiries */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.2em] uppercase font-semibold">
                (CONTACT)
              </span>
              <div className="flex flex-col gap-1.5 text-xs md:text-sm font-light text-stone-light">
                <a href="mailto:info@rightcon.in" className="hover:text-white transition-colors">
                  info@rightcon.in
                </a>
                <a href="tel:+919845100000" className="hover:text-white transition-colors">
                  +91 98451 00000
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom footer row */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="font-mono text-[9.5px] text-stone tracking-wider">
            © {new Date().getFullYear()}. RIGHTCON COLLECTIVE. ALL RIGHTS RESERVED.
          </div>

          <div className="flex flex-col sm:flex-row gap-6 md:gap-12 font-mono text-[9.5px] text-stone items-start sm:items-center">
            <a href="#" className="hover:text-white transition-colors">
              PRIVACY POLICY
            </a>

            <button 
              onClick={replayIntro}
              className="hover:text-white transition-colors cursor-pointer text-left font-mono text-[9.5px] text-stone border-none bg-transparent p-0 uppercase outline-none"
            >
              REPLAY INTRO
            </button>
            
            {/* RERA info */}
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF37]">RERA ID:</span>
              <span className="text-stone-light">PRM/KA/RERA/1251/310</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

