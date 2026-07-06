import React, { useEffect } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

const TESTIMONIALS = [
  {
    quote: "The cantilever aggregate projections stretch 3.5m with absolute zero vibration. A geomechanical masterpiece in exposed form-finished concrete.",
    author: "DR. R. MENON",
    project: "OWNER, KORAMANGALA MONOLITH",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop&q=80",
    detailImage: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=500&auto=format&fit=crop"
  },
  {
    quote: "Rightcon's core soil log analysis pre-stabilized our active clay foundation. They did not compromise on rebar loads, ensuring structural peace of mind.",
    author: "ANANYA RAO",
    project: "CLIENT, THE EMERALD TERRACES",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop&q=80",
    detailImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&auto=format&fit=crop"
  }
];

export default function AboutScene() {
  const { activeScene, setMascotPose } = useScrollSystem();
  const isActive = activeScene === 7;

  useEffect(() => {
    if (isActive) {
      setMascotPose('people');
    }
  }, [isActive]);

  return (
    <section className="relative min-h-screen w-full py-space-96 md:py-space-160 px-space-24 md:px-space-40 flex items-center overflow-hidden border-t border-charcoal/5 theme-light subpixel-text">
      {/* Decorative grids */}
      <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-start">
          
          {/* Left Column: Facade Monolith Overview Image */}
          <div className="hidden lg:block lg:col-span-4 relative pr-space-24">
            <div className="w-full aspect-[3/4] overflow-hidden border border-charcoal/15 bg-concrete shadow-[0_32px_80px_rgba(0,0,0,0.06)] rounded-sm group">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop" 
                alt="Completed architectural landmark villa exterior" 
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-[1s]"
              />
            </div>
            <span className="h-caption font-mono text-[7px] text-charcoal/50 mt-3 block text-center uppercase tracking-widest">
              ESTATE FACADE // FACADE_01 COMPLETED MONOLITH
            </span>
          </div>

          {/* Right Column: Founder Mandate & Testimonials (columns 5-12) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-space-96">
            
            {/* 1. Founder Mandate */}
            <div className="flex flex-col gap-space-40">
              <div className="flex flex-col gap-space-8">
                <span className="h-label-mono text-bronze">(07 // PEOPLE &amp; INTERVIEWS)</span>
                <h2 className="h-section-title">
                  Building &amp; <br />
                  <span className="text-bronze italic">Technical Oversight</span>
                </h2>
              </div>
              
              {/* Asymmetrical Collage Spread */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-16 items-stretch mt-4">
                {/* Large Founder Portrait */}
                <div className="md:col-span-7 aspect-[4/5] overflow-hidden border border-charcoal/10 relative shadow-[0_24px_48px_rgba(0,0,0,0.05)] bg-concrete rounded-sm group">
                  <img 
                    src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1000&auto=format&fit=crop&q=80" 
                    alt="Maaz Ayoob, Founder of Rightcon" 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[1s]"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-charcoal/90 border border-white/5 px-2 py-0.5 font-mono text-[7px] text-bronze uppercase">
                    FOUNDER // CHIEF ESTIMATOR
                  </div>
                </div>

                {/* Team Collaboration */}
                <div className="hidden md:flex md:col-span-5 flex-col gap-space-16 justify-between">
                  <div className="aspect-[4/3] overflow-hidden border border-charcoal/10 relative shadow-md rounded-sm group">
                    <img 
                      src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&auto=format&fit=crop&q=80" 
                      alt="Rightcon architectural planning studio" 
                      className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 transition-all duration-[1s]"
                    />
                    <div className="absolute bottom-2 left-2 bg-charcoal/90 px-2 py-0.5 border border-white/5 font-mono text-[6.5px] text-ivory">
                      DESIGN_STUDIO // BIM_COORD
                    </div>
                  </div>

                  <div className="aspect-[4/3] overflow-hidden border border-charcoal/10 relative shadow-md rounded-sm group">
                    <img 
                      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80" 
                      alt="Construction site coordination inspect" 
                      className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1s]"
                    />
                    <div className="absolute bottom-2 left-2 bg-charcoal/90 px-2 py-0.5 border border-white/5 font-mono text-[6.5px] text-holo-cyan">
                      SITE_INSPECT // CUBE_TEST_PASS
                    </div>
                  </div>
                </div>
              </div>

              <blockquote className="font-display text-xl md:text-2xl font-light leading-relaxed border-l-2 border-bronze/40 pl-space-24 italic text-charcoal/90">
                "We do not build houses; we construct structural shelters for your peace of mind. A home is a technical artifact designed to outlast generations, requiring geomechanical absolute truth."
              </blockquote>

              <div className="flex flex-col gap-1.5 pl-space-24">
                <span className="font-display text-lg font-light text-charcoal">Maaz Ayoob</span>
                <span className="h-label-mono text-bronze font-bold">FOUNDER &amp; CHIEF ESTIMATOR</span>
              </div>
            </div>

            {/* Testimonials formatted as published interviews */}
            <div className="flex flex-col gap-space-40 border-t border-charcoal/10 pt-space-64">
              <span className="h-label-mono text-bronze">
                [COMPLETED RESIDENCES &amp; CLIENT VERIFICATIONS]
              </span>
              
              <div className="flex flex-col gap-space-48">
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-space-32 items-start border-b border-charcoal/10 pb-space-32">
                    
                    {/* Overlapping thumbnail collage */}
                    <div className="relative w-[200px] h-[150px] flex-shrink-0 select-none mb-6 md:mb-0">
                      <div className="w-[85%] h-[85%] overflow-hidden border border-charcoal/10 rounded-sm shadow-sm group">
                        <img 
                          src={t.image} 
                          alt={t.project} 
                          className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 transition-all duration-500" 
                        />
                      </div>
                      <div className="absolute right-0 bottom-0 w-[45%] h-[45%] overflow-hidden border border-charcoal/15 bg-ivory rounded-sm shadow-md group translate-x-2 translate-y-2">
                        <img 
                          src={t.detailImage} 
                          alt="Material close-up" 
                          className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500" 
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-space-16">
                      <p className="font-display text-lg leading-relaxed italic text-charcoal/90">
                        "{t.quote}"
                      </p>
                      <div className="flex items-center gap-space-16">
                        <span className="h-label-mono text-bronze font-bold">{t.author}</span>
                        <span className="w-1.5 h-[1px] bg-charcoal/10"></span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/50">{t.project}</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Companion coordinates anchor */}
            <div className="flex justify-between items-center text-[7.5px] font-mono text-charcoal/40 border-t border-charcoal/10 pt-4">
              <span>LEDGER REF: RC_ABOUT_INT</span>
              <div className="mascot-observation-point">
                <span className="mascot-observation-dot"></span>
                <span>Mascot Verifying Client Stories</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
