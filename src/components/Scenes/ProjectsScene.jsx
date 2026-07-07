import React, { useRef, useEffect, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import { optimizeUnsplashUrl } from '../../utils/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "The Emerald Terraces",
    location: "Whitefield, Bangalore",
    metrics: "12,500 SQ. FT. / M40 CONCRETE",
    builtUp: "10,200 SQ. FT.",
    completion: "2025",
    materials: "Travertine, Burma Teak, Exposed Concrete Slabs",
    desc: "This custom Whitefield estate balances cantilever concrete projections with central courtyards, creating open, sunlit volumes and moisture-isolated slab systems.",
    clientStory: "Designed for a multi-generational family requesting absolute thermal privacy. The central light well acts as a passive chimney stack, drawing hot air up and reducing ambient temperature inside the living areas by 4°C naturally.",
    beforeAfter: "Active geomechanical clay expansion zone engineered into a zero-tolerance bedrock raft foundation.",
    specs: ["Raft thickness: 900mm", "Column count: 32 (M40 grade)", "Rebar grade: Fe550D primary joints"],
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=90",
    interior: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&auto=format&fit=crop",
    evening: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop",
    construction: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&auto=format&fit=crop",
    material: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&auto=format&fit=crop"
  },
  {
    title: "Koramangala Monolith",
    location: "Koramangala, Bangalore",
    metrics: "8,200 SQ. FT. / BRUSHED CONCRETE",
    builtUp: "7,400 SQ. FT.",
    completion: "2026",
    materials: "Raw Aggregate Plates, Double Insulated Envelopes, Chrome Framing",
    desc: "A massive raw concrete monolith. Exposed aggregate structural pillars, deep geometric recesses, and dual-layer thermal insulating envelopes.",
    clientStory: "The client demanded structural visibility. All primary pillars are aggregate-finished concrete cast in customized resin moulds to ensure no joint lines. The cantilevered second-story projections stretch 3.5m without support.",
    beforeAfter: "Loose silty soil pre-stabilized using geomechanical compaction piles prior to slab pour.",
    specs: ["Compaction piles: 18 nodes", "Cantilever depth: 3.5m", "Thermal insulation: U-value 0.35"],
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=90",
    interior: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop",
    evening: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop",
    construction: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop",
    material: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop"
  },
  {
    title: "Jayalakshmipuram Villa",
    location: "Mysuru, Karnataka",
    metrics: "11,000 SQ. FT. / BEDROCK COLLAR",
    builtUp: "9,800 SQ. FT.",
    completion: "2024",
    materials: "Granite Plinths, Terracotta Convections, Burma Teak Joints",
    desc: "A response to Mysuru's hot dry climate. Anchored directly in bedrock footings with stack-ventilated terracotta facades that passive-cool the interiors.",
    clientStory: "Built on shallow granite blocks requiring direct collar anchorage. We utilized low-impact diamond core drills to preserve block geomechanical structural stability, then constructed active solar chimney shafts.",
    beforeAfter: "Shallow rock slope anchored directly using 12 seismic rock-bolt collars.",
    specs: ["Rock-bolt collars: 12 seismic anchors", "Plinth elevation: 1200mm", "Ventilation: Passive terracotta ducts"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=90",
    interior: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop",
    evening: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop",
    construction: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=500&auto=format&fit=crop",
    material: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&auto=format&fit=crop"
  }
];

function ProjectCard({ project, idx, onOpen, onHoverStart, onHoverEnd }) {
  const cardRef = useRef(null);
  const { isMobile } = useScrollSystem();

  return (
    <div 
      ref={cardRef}
      onMouseLeave={onHoverEnd}
      onMouseEnter={() => onHoverStart(idx)}
      onClick={() => onOpen(project)}
      className="w-[80vw] md:w-[60vw] lg:w-[48vw] flex-shrink-0 relative cursor-pointer group mr-space-96 flex flex-col select-none"
    >
      <div className="w-full aspect-[16/10] overflow-hidden relative shadow-[0_24px_64px_rgba(0,0,0,0.45)] bg-charcoal">
        <div className="absolute inset-0 blueprint-grid opacity-[0.04] z-0"></div>
        <img 
          src={optimizeUnsplashUrl(project.image, isMobile ? 800 : 1200, isMobile ? 70 : 85)} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-101 transition-all duration-[1.4s] ease-out brightness-[0.8]"
        />
        
        {/* Interaction indicator */}
        <div className="absolute top-space-16 right-space-16 h-label-mono text-white/30 group-hover:text-bronze transition-colors flex items-center gap-2 bg-charcoal/40 backdrop-blur-md px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-holo-cyan animate-pulse"></span>
          <span>SYS_MATRIX // 0{idx + 1}</span>
        </div>
      </div>

      <div className="flex flex-col gap-space-8 mt-space-24">
        <div className="flex justify-between items-baseline">
          <span className="h-label-mono text-bronze font-bold">
            {project.location}
          </span>
          <span className="h-label-mono text-white/30">
            {project.completion}
          </span>
        </div>
        <div className="flex justify-between items-start gap-space-16 mt-1">
          <h3 className="font-display text-2xl md:text-3xl font-light group-hover:text-bronze transition-colors text-ivory tracking-wide">
            {project.title}
          </h3>
          <span className="link-editorial mt-1 flex-shrink-0">
            Open Story →
          </span>
        </div>
        <div className="w-full h-[1px] bg-white/10 mt-space-8"></div>
        <span className="h-caption font-mono text-[7.5px] mt-1 text-ivory/50">
          {project.metrics}
        </span>
      </div>
    </div>
  );
}

export default function ProjectsScene() {
  const containerRef = useRef();
  const triggerRef = useRef();
  const { isMobile, setActiveScene, setMascotPose, setHoveredProject } = useScrollSystem();
  
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const horizontalScroll = gsap.fromTo(
      containerRef.current,
      { x: "15vw" },
      {
        x: () => `-${containerRef.current.scrollWidth - window.innerWidth + 200}px`,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=2200",
          onUpdate: (self) => {
            if (self.isActive && !activeProject) {
              setMascotPose('pointing');
            }
          }
        }
      }
    );

    return () => {
      horizontalScroll.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === triggerRef.current) t.kill();
      });
    };
  }, [activeProject]);

  const handleHoverStart = (idx) => {
    if (activeProject) return;
    setHoveredProject(idx);
    setMascotPose('pointing');
  };

  const handleHoverEnd = () => {
    setHoveredProject(null);
    setMascotPose('idle');
  };

  const handleOpenDetail = (project) => {
    setActiveProject(project);
    setMascotPose('vision');
  };

  const handleCloseDetail = () => {
    setActiveProject(null);
    setMascotPose('pointing');
  };

  return (
    <div ref={triggerRef} className="relative z-10 select-none overflow-hidden theme-dark">
      <div className="h-screen w-full flex items-center bg-bg-dark relative">
        <div className="absolute left-space-24 md:left-space-40 top-space-96 z-10 flex flex-col gap-space-8 max-w-sm">
          <span className="h-label-mono text-bronze">
            (03 // PORTFOLIO)
          </span>
          <h2 className="h-section-title">
            Selected <span className="text-bronze italic">Monoliths</span>
          </h2>
        </div>

        <div 
          ref={containerRef} 
          className="flex pl-[15vw] pr-[20vw] items-center h-full relative"
        >
          {PROJECTS.map((project, idx) => (
            <ProjectCard 
              key={idx} 
              project={project} 
              idx={idx}
              onOpen={handleOpenDetail}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />
          ))}
        </div>

        {/* Mascot Observation Area for Horizontal Scroll */}
        <div className="absolute right-space-40 top-space-96 z-10">
          <div className="mascot-observation-point bg-charcoal/80 backdrop-blur-md">
            <span className="mascot-observation-dot"></span>
            <span>Mascot Observing Projects</span>
          </div>
        </div>

        <div className="absolute bottom-space-40 right-space-40 md:right-space-40 h-label-mono text-ivory/30">
          TRACK PINNED // STRUCTURAL PORTFOLIO ACTIVE
        </div>
      </div>

      {activeProject && (
        <div 
          className="fixed inset-0 z-[100] w-full h-full bg-charcoal/98 backdrop-blur-2xl flex flex-col overflow-y-auto p-space-24 md:p-space-40 theme-dark transition-all duration-500 subpixel-text"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-40 my-auto py-space-40">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-space-24">
              <span className="h-label-mono text-bronze">
                RIGHTCON ESTATE / {activeProject.location}
              </span>
              <button 
                onClick={handleCloseDetail}
                className="btn-secondary py-2 px-6 text-[8.5px] tracking-widest border-white/15 text-ivory hover:border-bronze hover:text-bronze"
              >
                Close Presentation ✕
              </button>
            </div>

            {/* Asymmetrical grid containing detailed story components */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-start mt-space-24">
              
              {/* Left Column: Visual Story Spread */}
              <div className="lg:col-span-7 flex flex-col gap-space-40">
                {/* 1. Project Hero */}
                <div className="w-full aspect-[16/9] overflow-hidden border border-white/5 relative shadow-2xl rounded-sm group">
                  <div className="absolute inset-0 blueprint-grid opacity-10 z-0"></div>
                  <img 
                    src={optimizeUnsplashUrl(activeProject.image, isMobile ? 800 : 1200, isMobile ? 70 : 85)} 
                    alt={activeProject.title} 
                    className="w-full h-full object-cover relative z-10 brightness-[0.8] group-hover:scale-101 transition-all duration-[1s]"
                  />
                  <div className="absolute top-3 left-3 z-20 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-mono text-[7px] text-bronze uppercase">
                    EXTERIOR_HERO // {activeProject.location}
                  </div>
                </div>

                {/* 2. Interior and Evening Overlapping Collage */}
                <div className="grid grid-cols-2 gap-space-16 relative">
                  <div className="aspect-[4/3] overflow-hidden border border-white/5 rounded-sm shadow-xl relative group">
                    <img 
                      src={optimizeUnsplashUrl(activeProject.interior, isMobile ? 400 : 600, isMobile ? 70 : 80)} 
                      alt="Interior spaces" 
                      className="w-full h-full object-cover brightness-[0.85] group-hover:scale-102 transition-all duration-[1s]"
                    />
                    <div className="absolute top-2 left-2 z-20 bg-charcoal/80 px-2 py-0.5 border border-white/5 font-mono text-[6.5px] text-ivory">
                      INTERIOR_VOLUMETRICS
                    </div>
                  </div>

                  <div className="aspect-[4/3] overflow-hidden border border-white/5 rounded-sm shadow-xl relative group">
                    <img 
                      src={optimizeUnsplashUrl(activeProject.evening, isMobile ? 400 : 600, isMobile ? 70 : 80)} 
                      alt="Evening sunset exterior" 
                      className="w-full h-full object-cover brightness-[0.8] group-hover:scale-102 transition-all duration-[1s]"
                    />
                    <div className="absolute top-2 left-2 z-20 bg-charcoal/80 px-2 py-0.5 border border-white/5 font-mono text-[6.5px] text-bronze">
                      EVENING_LIGHT_RESONANCE
                    </div>
                  </div>
                </div>

                {/* 3. Materials and Technical Details Grid */}
                <div className="grid grid-cols-3 gap-space-16 border-t border-white/10 pt-space-24">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[7px] text-white/40 uppercase">Day_45 Core Concrete</span>
                    <div className="aspect-square overflow-hidden border border-white/5 rounded-sm group">
                      <img 
                        src={optimizeUnsplashUrl(activeProject.construction, isMobile ? 400 : 500, isMobile ? 70 : 80)} 
                        alt="Construction phase" 
                        className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[7px] text-white/40 uppercase">Burma Teak Detail</span>
                    <div className="aspect-square overflow-hidden border border-white/5 rounded-sm group">
                      <img 
                        src={optimizeUnsplashUrl(activeProject.material, isMobile ? 400 : 500, isMobile ? 70 : 80)} 
                        alt="Teak detail" 
                        className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>

                  <div className="border border-white/5 bg-white/[0.01] p-3 rounded-sm flex flex-col justify-between font-mono text-[7.5px] leading-relaxed text-ivory/50 uppercase">
                    <div>[SOIL CHECKPASS]</div>
                    <div className="text-holo-cyan font-bold">100% COMPACTED</div>
                    <div>BIM COORD: VERIFIED</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative facts */}
              <div className="lg:col-span-5 flex flex-col gap-space-40 lg:pl-space-24">
                
                <div className="flex flex-col gap-space-8">
                  <h3 className="h-section-title font-light">
                    {activeProject.title}
                  </h3>
                  <div className="h-label-mono text-holo-cyan">
                    LOD 400 BIM STRUCTURAL MATRIX LOGS
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-space-24 border-y border-white/10 py-space-24">
                  <div>
                    <span className="h-caption font-mono text-[8px] uppercase block">Built Area</span>
                    <span className="font-display text-xl text-ivory">{activeProject.builtUp}</span>
                  </div>
                  <div>
                    <span className="h-caption font-mono text-[8px] uppercase block">Year</span>
                    <span className="font-display text-xl text-ivory">{activeProject.completion}</span>
                  </div>
                  <div>
                    <span className="h-caption font-mono text-[8px] uppercase block">Soil Profile</span>
                    <span className="font-display text-xl text-holo-cyan font-semibold">BEDROCK</span>
                  </div>
                </div>

                <div className="flex flex-col gap-space-16">
                  <h4 className="h-label-mono text-bronze">[01] Client Mandate</h4>
                  <p className="font-sans text-sm text-ivory/90 leading-relaxed font-light">
                    {activeProject.clientStory}
                  </p>
                </div>

                <div className="flex flex-col gap-space-16">
                  <h4 className="h-label-mono text-bronze">[02] Compaction comps</h4>
                  <p className="font-sans text-xs text-ivory/70 leading-relaxed font-light">
                    {activeProject.beforeAfter}
                  </p>
                </div>

                <div className="flex flex-col gap-space-16 border-t border-white/10 pt-space-24">
                  <h4 className="h-label-mono text-bronze">[03] Structural Cube specifications</h4>
                  <ul className="flex flex-col gap-space-8">
                    {activeProject.specs.map((spec, i) => (
                      <li key={i} className="font-mono text-[9.5px] text-ivory/80 flex gap-space-8 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-holo-cyan"></span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mascot observation anchor */}
                <div className="border border-white/5 p-4 rounded-sm flex items-center justify-between">
                  <div className="mascot-observation-point">
                    <span className="mascot-observation-dot"></span>
                    <span>Companion Monitoring Project Story</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
