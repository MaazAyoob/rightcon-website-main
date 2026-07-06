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
    <section className="relative min-h-screen w-full py-space-96 md:py-space-160 px-space-24 md:px-space-40 flex items-center overflow-hidden border-t border-white/5 theme-dark subpixel-text">
      {/* Blueprint Grid decorative overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-space-48">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-24 items-start">
          <div className="lg:col-span-1 h-label-mono select-none tracking-widest text-[9.5px]">
            (06 // CREDIBILITY)
          </div>
          <div className="lg:col-span-8 flex flex-col gap-space-16">
            <span className="h-label-mono text-bronze">(GEOMECHANICAL TRUST)</span>
            <h2 className="h-section-title">
              Documented Standards <br />
              <span className="text-bronze italic">&amp; Bedrock Verification.</span>
            </h2>
          </div>
        </div>

        {/* Outer Layout: left column photo, right column documentation bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-stretch mt-4">
          
          {/* Left Column: Visual Compaction and Engineering Inspectors */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
            <div className="w-full aspect-[4/5] overflow-hidden border border-white/10 relative shadow-[0_32px_80px_rgba(0,0,0,0.5)] bg-graphite rounded-sm group">
              <img 
                src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&auto=format&fit=crop&q=80" 
                alt="Architects and structural engineers inspecting bedrock details" 
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1.2s] ease-out brightness-[0.7]"
              />
              <div className="absolute top-3 left-3 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-mono text-[7px] text-bronze uppercase">
                SITE_LOG // DAY_28 CUBE TEST
              </div>
            </div>
            <span className="h-caption font-mono text-[7px] text-ivory/40 tracking-widest text-center mt-4 uppercase">
              STRUCTURAL SITE REPORT // GEOMECHANICAL BEDROCK VERIFIED
            </span>
          </div>

          {/* Right Column: Bento panels stacked */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-space-24">
            
            {/* Bento Card 1: Lead Warranty Deed */}
            <div className="border border-white/10 bg-graphite rounded-sm p-space-32 flex flex-col justify-between shadow-lg relative">
              <div className="absolute top-0 right-0 border-b border-l border-white/10 p-space-12 h-label-mono text-[8px] text-bronze">
                PRM_KA_RERA_1251
              </div>

              <div className="flex flex-col gap-space-16">
                <span className="h-label-mono text-bronze">
                  [DEED OF STRUCTURAL WARRANTY]
                </span>
                <h3 className="font-display text-2xl font-light text-ivory">
                  10-Year Transferable Warranty
                </h3>
                <p className="font-sans text-xs text-ivory/70 leading-relaxed font-light">
                  Rightcon anchors structural liability directly into the property deed. If the residence is transferred to a new owner, the geomechanical warranty protection is fully preserved, safeguarding equity value.
                </p>
              </div>

              <div className="border-t border-white/10 pt-space-24 mt-space-24 flex flex-col gap-space-8">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-stone text-[9px] uppercase">LIABILITY COVERAGE</span>
                  <span className="font-mono font-bold text-[9px] text-ivory">100% REPAIR OR RECAST</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-stone text-[9px] uppercase">DEED ANCHOR STATUS</span>
                  <span className="font-mono text-holo-cyan font-bold text-[9px]">ACTIVE REGISTRATION</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Real-time Quality Audit Logfeed */}
            <div className="border border-white/10 bg-graphite rounded-sm p-space-32 flex flex-col justify-between shadow-lg min-h-[300px]">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-24">
                
                {/* Left: Audit logger parameters */}
                <div className="md:col-span-8 flex flex-col justify-between gap-space-24">
                  <div className="flex flex-col gap-space-12">
                    <div className="flex justify-between items-center">
                      <span className="h-label-mono text-holo-cyan">
                        [AUDIT_LOGGER // COMPRESSION FEED]
                      </span>
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                    </div>
                    <p className="font-sans text-xs text-ivory/75 leading-relaxed font-light">
                      Raw site concrete checks are uploaded dynamically. We verify every concrete pour against laboratory structural standards.
                    </p>
                  </div>

                  {/* scrolling log panels */}
                  <div className="flex flex-col gap-space-8 mt-2">
                    {AUDIT_FEED.map((item, i) => (
                      <div 
                        key={i} 
                        className="flex justify-between items-center bg-charcoal border border-white/5 p-space-12 rounded-sm font-mono text-[8.5px] text-ivory/80"
                      >
                        <div className="flex gap-space-12 items-center">
                          <span className="text-white/40">{item.time}</span>
                          <span>{item.msg}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-sm text-[7px] font-bold ${
                          item.status === 'PASS' || item.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-holo-cyan/10 text-holo-cyan'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Compressive Testing lab image */}
                <div className="md:col-span-4 flex flex-col justify-center">
                  <div className="w-full aspect-[4/5] overflow-hidden border border-white/10 rounded-sm shadow-md relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=600&auto=format&fit=crop" 
                      alt="Concrete compressive testing core" 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[1s]"
                    />
                    <div className="absolute bottom-2.5 left-2.5 bg-charcoal/90 border border-white/5 px-2 py-0.5 font-mono text-[6.5px] text-bronze">
                      TEST // DAY_28_CUBE
                    </div>
                  </div>
                </div>

              </div>

              <div className="h-label-mono text-[8px] border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                <span>LOG STATUS: SYSTEM ONLINE // ZERO DEFECT TARGET REACHED</span>
                <div className="mascot-observation-point">
                  <span className="mascot-observation-dot"></span>
                  <span>Companion Monitoring Credibility Logs</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-24 border-t border-white/10 pt-space-40 mt-4">
          <div className="flex flex-col gap-space-8 border border-white/5 p-space-24 bg-graphite/40 rounded-sm">
            <h4 className="h-label-mono text-bronze">[01] RERA Certified</h4>
            <p className="font-sans text-xs text-ivory/60 leading-relaxed font-light mt-1">
              Registered RERA number mapping with the official government registry logs.
            </p>
          </div>
          <div className="flex flex-col gap-space-8 border border-white/5 p-space-24 bg-graphite/40 rounded-sm">
            <h4 className="h-label-mono text-bronze">[02] Compressive Cube Tests</h4>
            <p className="font-sans text-xs text-ivory/60 leading-relaxed font-light mt-1">
              Sample columns tested inside external ISO labs on day 7 and day 28.
            </p>
          </div>
          <div className="flex flex-col gap-space-8 border border-white/5 p-space-24 bg-graphite/40 rounded-sm">
            <h4 className="h-label-mono text-bronze">[03] Bedrock Core Audits</h4>
            <p className="font-sans text-xs text-ivory/60 leading-relaxed font-light mt-1">
              Standard Penetration Tests up to 8m mapping soil Safe Bearing Capacities.
            </p>
          </div>
          <div className="flex flex-col gap-space-8 border border-white/5 p-space-24 bg-graphite/40 rounded-sm">
            <h4 className="h-label-mono text-bronze">[04] LOD 400 Coordination</h4>
            <p className="font-sans text-xs text-ivory/60 leading-relaxed font-light mt-1">
              Full virtual clash clearance grids to isolate conduit routing defects.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
