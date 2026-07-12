import React, { useEffect } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

const AUDIT_FEED = [
  { time: "09:30 AM", msg: "Whitefield plinth geomechanical checkpass: 100% bedrock anchor alignment.", status: "OK" },
  { time: "11:15 AM", msg: "Concrete compressive check log: sample cube crushed at 42.5 N/mm² (exceeds M40 target).", status: "PASS" },
  { time: "02:00 PM", msg: "BIM collision scan complete: zero pipeline coordinate clashes resolved.", status: "VERIFIED" },
  { time: "04:45 PM", msg: "Mysuru bedrock rock-bolt anchors load-tested to geomechanical thresholds.", status: "OK" }
];

const CREDENTIALS = [
  { code: "01", title: "RERA Certified", desc: "Registered RERA number mapping with the official government registry logs." },
  { code: "02", title: "Compressive Cube Tests", desc: "Sample columns tested inside external ISO labs on day 7 and day 28." },
  { code: "03", title: "Bedrock Core Audits", desc: "Standard Penetration Tests up to 8m mapping soil Safe Bearing Capacities." },
  { code: "04", title: "LOD 400 Coordination", desc: "Full virtual clash clearance grids to isolate conduit routing defects." },
];

export default function TrustScene() {
  const { setMascotPose, activeScene } = useScrollSystem();
  const isActive = activeScene === 6;

  useEffect(() => {
    if (isActive) {
      setMascotPose('trust');
    }
  }, [isActive]);

  return (
    <section className="relative min-h-screen w-full py-space-96 md:py-space-160 px-space-24 md:px-space-40 flex items-center overflow-hidden border-t border-charcoal/5 bg-white subpixel-text">
      <div className="absolute inset-0 architectural-grid opacity-[0.06] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-space-48">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-24 items-start">
          <div className="lg:col-span-1 h-label-mono select-none tracking-widest text-[9.5px] text-charcoal/40">
            (06 // CREDIBILITY)
          </div>
          <div className="lg:col-span-8 flex flex-col gap-space-16">
            <span className="h-label-mono text-primary">(GEOMECHANICAL TRUST)</span>
            <h2 className="h-section-title text-charcoal">
              Documented Standards <br />
              <span className="text-accent italic">&amp; Bedrock Verification.</span>
            </h2>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-stretch">
                     {/* Left: Photo with strong editorial treatment */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-accent z-20 pointer-events-none"></div>
              <div className="w-full aspect-[16/9] lg:aspect-[4/5] overflow-hidden border border-charcoal/10 relative shadow-[0_32px_80px_rgba(0,0,0,0.07)] bg-white rounded-none group">
                <img 
                  src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&auto=format&fit=crop&q=80" 
                  alt="Architects and structural engineers inspecting bedrock details" 
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-[1.2s] ease-out"
                />
                <div className="absolute top-3 left-3 bg-white border border-charcoal/10 px-2.5 py-0.5 font-mono text-[7px] text-accent uppercase shadow-sm">
                  SITE_LOG // DAY_28 CUBE TEST
                </div>
              </div>
            </div>
            <span className="h-caption font-mono text-[7px] text-charcoal/40 tracking-widest text-center mt-4 uppercase">
              STRUCTURAL SITE REPORT // GEOMECHANICAL BEDROCK VERIFIED
            </span>
          </div>

          {/* Right: Warranty card + audit log */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-space-24">
            
            {/* Warranty card — white with charcoal accent border */}
            <div className="border border-charcoal/10 bg-white rounded-none p-space-32 flex flex-col justify-between shadow-[0_8px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-primary to-transparent"></div>
              
              <div className="absolute top-4 right-4 border border-charcoal/10 bg-charcoal/[0.02] p-space-12 h-label-mono text-[8px] text-accent">
                PRM_KA_RERA_1251
              </div>

              <div className="flex flex-col gap-space-16">
                <span className="h-label-mono text-accent">[DEED OF STRUCTURAL WARRANTY]</span>
                <h3 className="font-display text-2xl font-light text-charcoal">
                  10-Year Transferable Warranty
                </h3>
                <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
                  Rightcon anchors structural liability directly into the property deed. If the residence is transferred to a new owner, the geomechanical warranty protection is fully preserved, safeguarding equity value.
                </p>
              </div>

              <div className="border-t border-charcoal/5 pt-space-24 mt-space-24 flex flex-col gap-space-8">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-charcoal/50 text-[9px] uppercase">LIABILITY COVERAGE</span>
                  <span className="font-mono font-bold text-[9px] text-charcoal">100% REPAIR OR RECAST</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-charcoal/50 text-[9px] uppercase">DEED ANCHOR STATUS</span>
                  <span className="font-mono text-primary font-bold text-[9px]">ACTIVE REGISTRATION</span>
                </div>
              </div>
            </div>

            {/* Audit log — white card */}
            <div className="border border-charcoal/10 bg-white rounded-none p-space-32 flex flex-col gap-space-24 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
              <div className="flex justify-between items-center">
                <span className="h-label-mono text-primary">[AUDIT_LOGGER // COMPRESSION FEED]</span>
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
              </div>

              <div className="flex flex-col gap-space-8">
                {AUDIT_FEED.map((item, i) => (
                  <div 
                    key={i} 
                    className="flex flex-col sm:flex-row justify-between sm:items-center bg-charcoal/[0.02] border border-charcoal/5 p-space-12 font-mono text-[8.5px] text-charcoal/70 gap-2"
                  >
                    <div className="flex gap-space-12 items-start sm:items-center">
                      <span className="text-charcoal/30 flex-shrink-0">{item.time}</span>
                      <span className="leading-normal">{item.msg}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[7px] font-bold flex-shrink-0 self-start sm:self-auto ${
                      item.status === 'PASS' || item.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-primary/5 text-primary border border-primary/10'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-label-mono text-[8px] border-t border-charcoal/5 pt-4 flex justify-between items-center text-charcoal/40">
                <span>LOG STATUS: SYSTEM ONLINE // ZERO DEFECT TARGET REACHED</span>
                <div className="mascot-observation-point">
                  <span className="mascot-observation-dot"></span>
                  <span>Companion Monitoring Credibility Logs</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Credentials grid — white cards with left accent border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-24 border-t border-charcoal/5 pt-space-40">
          {CREDENTIALS.map((c, i) => (
            <div key={i} className="flex flex-col gap-space-8 border-l-2 border-accent/30 pl-space-16 py-space-8 hover:border-accent transition-colors duration-300 group">
              <h4 className="h-label-mono text-primary group-hover:text-accent transition-colors">[{c.code}] {c.title}</h4>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light mt-1">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
