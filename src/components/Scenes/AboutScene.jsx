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
    <section className="relative min-h-screen w-full py-space-96 md:py-space-160 px-space-24 md:px-space-40 flex items-center overflow-hidden border-t border-charcoal/5 bg-white theme-light subpixel-text">
      <div className="absolute inset-0 architectural-grid opacity-[0.06] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-start">
          
          {/* Left Column: Facade Image — responsive aspect ratio, visible on all viewports */}
          <div className="col-span-12 lg:col-span-4 relative lg:pr-space-24 mb-8 lg:mb-0">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-accent z-20 pointer-events-none"></div>
              <div className="w-full aspect-[16/9] lg:aspect-[3/4] overflow-hidden border border-charcoal/10 shadow-[0_24px_64px_rgba(0,0,0,0.06)] bg-white rounded-none group">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop" 
                  alt="Completed architectural landmark villa exterior" 
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-[1s]"
                />
              </div>
            </div>
            <span className="h-caption font-mono text-[7.5px] text-charcoal/40 mt-3.5 block text-center uppercase tracking-widest">
              ESTATE FACADE // FACADE_01 COMPLETED MONOLITH
            </span>
          </div>

          {/* Right Column: Founder + Testimonials */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-space-96">
            
            {/* Founder section */}
            <div className="flex flex-col gap-space-40">
              <div className="flex flex-col gap-space-8">
                <span className="h-label-mono text-accent">(07 // PEOPLE &amp; INTERVIEWS)</span>
                <h2 className="h-section-title text-charcoal">
                  Building &amp; <br />
                  <span className="text-accent italic">Technical Oversight</span>
                </h2>
              </div>
              
              {/* Photo collage */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-16 items-stretch">
                <div className="col-span-12 md:col-span-7 aspect-[16/9] md:aspect-[4/5] overflow-hidden border border-charcoal/10 relative shadow-[0_24px_48px_rgba(0,0,0,0.05)] bg-white rounded-none group">
                  <img 
                    src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1000&auto=format&fit=crop&q=80" 
                    alt="Maaz Ayoob, Founder of Rightcon" 
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1s]"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-white border border-charcoal/10 px-2 py-0.5 font-mono text-[7px] text-accent uppercase shadow-sm">
                    FOUNDER // CHIEF ESTIMATOR
                  </div>
                </div>

                <div className="hidden md:flex md:col-span-5 flex-col gap-space-16 justify-between">
                  <div className="flex-1 overflow-hidden border border-charcoal/10 relative shadow-sm rounded-none group">
                    <img 
                      src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&auto=format&fit=crop&q=80" 
                      alt="Rightcon architectural planning studio" 
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[1s]"
                    />
                    <div className="absolute bottom-2 left-2 bg-white border border-charcoal/10 px-2 py-0.5 font-mono text-[6.5px] text-charcoal/60">
                      DESIGN_STUDIO // BIM_COORD
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden border border-charcoal/10 relative shadow-sm rounded-none group">
                    <img 
                      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80" 
                      alt="Construction site coordination inspect" 
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1s]"
                    />
                    <div className="absolute bottom-2 left-2 bg-white border border-charcoal/10 px-2 py-0.5 font-mono text-[6.5px] text-charcoal/60">
                      SITE_INSPECT // CUBE_TEST_PASS
                    </div>
                  </div>
                </div>
              </div>

              <blockquote className="font-display text-xl md:text-2xl font-light leading-relaxed border-l-2 border-accent/40 pl-space-24 italic text-charcoal/80">
                "We do not build houses; we construct structural shelters for your peace of mind. A home is a technical artifact designed to outlast generations, requiring geomechanical absolute truth."
              </blockquote>

              <div className="flex flex-col gap-1.5 pl-space-24">
                <span className="font-display text-lg font-light text-charcoal">Maaz Ayoob</span>
                <span className="h-label-mono text-accent font-bold">FOUNDER &amp; CHIEF ESTIMATOR</span>
              </div>
            </div>

            {/* Testimonials */}
            <div className="flex flex-col gap-space-40 border-t border-charcoal/5 pt-space-64">
              <span className="h-label-mono text-accent">
                [COMPLETED RESIDENCES &amp; CLIENT VERIFICATIONS]
              </span>
              
              <div className="flex flex-col gap-space-48">
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-space-32 items-start border-b border-charcoal/5 pb-space-32">
                    
                    <div className="relative w-[180px] h-[136px] flex-shrink-0 select-none mb-6 md:mb-0">
                      <div className="w-[85%] h-[85%] overflow-hidden border border-charcoal/10 rounded-none shadow-sm group">
                        <img 
                          src={t.image} 
                          alt={t.project} 
                          loading="lazy"
                          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
                        />
                      </div>
                      <div className="absolute right-0 bottom-0 w-[45%] h-[45%] overflow-hidden border border-charcoal/10 bg-white rounded-none shadow-md group translate-x-2 translate-y-2">
                        <img 
                          src={t.detailImage} 
                          alt="Material close-up" 
                          loading="lazy"
                          className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500" 
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-space-16">
                      <p className="font-display text-lg leading-relaxed italic text-charcoal/80">
                        "{t.quote}"
                      </p>
                      <div className="flex items-center gap-space-16">
                        <span className="h-label-mono text-accent font-bold">{t.author}</span>
                        <span className="w-4 h-[1px] bg-charcoal/15"></span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/40">{t.project}</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Footer anchor */}
            <div className="flex justify-between items-center text-[7.5px] font-mono text-charcoal/30 border-t border-charcoal/5 pt-4">
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
