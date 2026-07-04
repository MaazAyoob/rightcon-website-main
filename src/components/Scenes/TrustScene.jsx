import React, { useEffect } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

const AUDIT_FEED = [
  { time: "09:30 AM", msg: "Whitefield plinth geomechanical checkpass: 100% bedrock anchor alignment.", status: "OK" },
  { time: "11:15 AM", msg: "Concrete compressive check log: sample cube crushed at 42.5 N/mm² (exceeds M40 target).", status: "PASS" },
  { time: "02:00 PM", msg: "BIM collision scan complete: zero pipeline coordinate clashes resolved.", status: "VERIFIED" },
  { time: "04:45 PM", msg: "Mysuru bedrock rock-bolt anchors load-tested to geomechanical thresholds.", status: "OK" }
];

export default function TrustScene() {
  const { setMascotPose, activeScene } = useScrollSystem();
  const isActive = activeScene === 6;

  useEffect(() => {
    if (isActive) {
      setMascotPose('trust'); // Scales to 0.0 in spline points to fade out/hide mascot
    }
  }, [isActive]);

  return (
    <section className="relative min-h-screen w-full bg-[#050505] py-24 px-8 md:px-16 flex items-center overflow-hidden border-t border-white/5 subpixel-text">
      {/* Blueprint Grid decorative overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] uppercase">
            (SCENE 06 / TRUST & CREDIBILITY)
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-[#F8F8F6] font-light leading-none">
            Rigor &amp; <span className="text-[#D4AF37] italic">Structural Liability</span>
          </h2>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          
          {/* Card 1: Lead Warranty Deed (Gold bordered certificate) */}
          <div className="lg:col-span-5 border border-[#D4AF37]/30 bg-[#171614]/30 rounded-sm p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute top-0 right-0 border-b border-l border-[#D4AF37]/20 p-2 font-mono text-[8px] text-[#D4AF37] tracking-widest">
              PRM_KA_RERA_1251
            </div>

            <div className="flex flex-col gap-6">
              <span className="font-mono text-[9.5px] text-[#D4AF37] tracking-widest uppercase">
                [DEED OF STRUCTURAL WARRANTY]
              </span>
              <h3 className="font-display text-3xl font-light text-[#F8F8F6]">
                10-Year Transferable Warranty
              </h3>
              <p className="font-sans text-xs md:text-[13px] text-stone-light leading-relaxed">
                Rightcon anchors structural liability directly into the property deed. If the residence is transferred to a new owner, the geomechanical warranty protection is fully preserved, safeguarding equity value.
              </p>
            </div>

            <div className="border-t border-[#D4AF37]/20 pt-6 mt-8 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-stone">LIABILITY COVERAGE:</span>
                <span className="font-mono text-[#F8F8F6] font-bold">100% REPAIR OR RECAST</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-stone">DEED ANCHOR STATUS:</span>
                <span className="font-mono text-[#49B8FF] font-bold">ACTIVE REGISTRATION</span>
              </div>
            </div>
          </div>

          {/* Card 2: Real-time Quality Audit Logfeed */}
          <div className="lg:col-span-7 border border-white/5 bg-[#171614]/10 rounded-sm p-8 flex flex-col justify-between shadow-2xl overflow-hidden min-h-[300px]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] text-[#49B8FF] tracking-widest uppercase">
                  [AUDIT_LOGGER // COMPRESSION FEED]
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="font-sans text-xs text-stone-light max-w-lg leading-relaxed">
                Raw site compression check records are uploaded dynamically. We verify every concrete pour against laboratory structural standards.
              </p>
            </div>

            {/* scrolling log panels */}
            <div className="flex flex-col gap-3 my-6">
              {AUDIT_FEED.map((item, i) => (
                <div 
                  key={i} 
                  className="flex justify-between items-center bg-[#050505] border border-white/5 p-3 rounded-sm font-mono text-[10px]"
                >
                  <div className="flex gap-4 items-center">
                    <span className="text-stone/60">{item.time}</span>
                    <span className="text-stone-light">{item.msg}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-sm text-[8px] font-bold ${
                    item.status === 'PASS' || item.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#49B8FF]/10 text-[#49B8FF]'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="font-mono text-[8px] text-stone">
              LOG STATUS: SYSTEM ONLINE // ZERO DEFECT TARGET REACHED
            </div>
          </div>

        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <div className="border border-white/5 p-6 bg-white/[0.01]">
            <h4 className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase mb-1.5">[01] RERA Certified</h4>
            <p className="font-sans text-[11px] text-stone-light">
              Registered RERA number mapping with the official government registry logs.
            </p>
          </div>
          <div className="border border-white/5 p-6 bg-white/[0.01]">
            <h4 className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase mb-1.5">[02] Compressive Cube Tests</h4>
            <p className="font-sans text-[11px] text-stone-light">
              Sample columns tested inside external ISO labs on day 7 and day 28.
            </p>
          </div>
          <div className="border border-white/5 p-6 bg-white/[0.01]">
            <h4 className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase mb-1.5">[03] Bedrock Core Audits</h4>
            <p className="font-sans text-[11px] text-stone-light">
              Standard Penetration Tests up to 8m mapping soil Safe Bearing Capacities.
            </p>
          </div>
          <div className="border border-white/5 p-6 bg-white/[0.01]">
            <h4 className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase mb-1.5">[04] LOD 400 Coordination</h4>
            <p className="font-sans text-[11px] text-stone-light">
              Full virtual clash clearance grids to isolate conduit routing defects.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
