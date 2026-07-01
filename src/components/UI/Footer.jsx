import React from 'react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#12110f] border-t border-white/5 py-16 px-8 md:px-16 select-none z-10">
      {/* Decorative architectural grid */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12">
        
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Logo Brand Mark */}
          <div className="flex flex-col items-start leading-none">
            <span className="font-mono text-[7px] md:text-[9px] text-stone tracking-[0.25em] uppercase font-semibold">
              EST. 2014 BANGALORE HQ
            </span>
            <span className="font-display text-2xl md:text-3xl font-light text-white tracking-wide mt-1">
              RIGHTCON
            </span>
          </div>

          {/* Right layout block: location + contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-24">
            
            {/* Showroom location */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-bronze tracking-[0.2em] uppercase font-semibold">
                (LOCATION)
              </span>
              <address className="not-italic font-sans text-xs md:text-sm font-light text-stone-light max-w-[200px] leading-relaxed">
                12th Main Rd, Indiranagar, Bangalore, Karnataka 560038
              </address>
            </div>

            {/* Inquiries */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-bronze tracking-[0.2em] uppercase font-semibold">
                (CONTACT)
              </span>
              <div className="flex flex-col gap-1 text-xs md:text-sm font-light text-stone-light">
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

          <div className="flex flex-col sm:flex-row gap-6 md:gap-12 font-mono text-[9.5px] text-stone">
            <a href="#" className="hover:text-white transition-colors">
              PRIVACY POLICY
            </a>
            
            {/* RERA info */}
            <div className="flex items-center gap-2">
              <span className="text-bronze">RERA ID:</span>
              <span className="text-stone-light">PRM/KA/RERA/1251/310</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
