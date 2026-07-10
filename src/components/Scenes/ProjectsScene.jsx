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
  },
  {
    title: "Indiranagar Pavilion",
    location: "Indiranagar, Bangalore",
    metrics: "9,800 SQ. FT. / PRE-STRESSED SLABS",
    builtUp: "8,900 SQ. FT.",
    completion: "2026",
    materials: "Brushed Aluminum, Fluted Glass, Exposed Steel Channels",
    desc: "A light-filled steel pavilion engineered using pre-stressed floor slabs, cantilever steel beams, and double-glazed fluted glass curtain walls.",
    clientStory: "Built for a high-tech entrepreneur desiring a seamless indoor-outdoor office and residential workspace. The structure utilizes active hydronic cooling loops integrated directly into the exposed concrete slab to minimize air conditioning loads.",
    beforeAfter: "Constructed over loose organic fill, utilizing deep micro-pile configurations anchored to local granite bedrock.",
    specs: ["Micro-pile count: 28 nodes", "Steel grade: Fe 550 structural channels", "Glazing: Double-glazed fluted paneling"],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=90",
    interior: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop",
    evening: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop",
    construction: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop",
    material: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop"
  },
  {
    title: "Gokulam Courtyard House",
    location: "Gokulam, Mysuru",
    metrics: "7,500 SQ. FT. / BRICK CONVECTION",
    builtUp: "6,800 SQ. FT.",
    completion: "2025",
    materials: "Hand-pressed Clay Bricks, Oxidized Steel, Local Sadarahalli Granite",
    desc: "A modern courtyard residence showcasing traditional hand-pressed brick screens paired with minimal black steel framing and passive ventilation paths.",
    clientStory: "The owner required a low-energy house utilizing native craft styles. We engineered self-supporting brick arches and hollow clay-block ceilings to trap warm air, combined with deep water harvesting sumps underneath the central courtyard.",
    beforeAfter: "Reclaimed agricultural soil stabilized using lime-stabilization grouting blocks prior to raft foundation layout.",
    specs: ["Foundation: Lime-stabilized raft", "Brick compressive strength: 15 N/mm²", "Ventilation: Passive screen vents"],
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop&q=90",
    interior: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop",
    evening: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop",
    construction: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&auto=format&fit=crop",
    material: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&auto=format&fit=crop"
  }
];

function ProjectCard({ project, idx, onOpen, onHoverStart, onHoverEnd, isActive, cardStyle }) {
  const cardRef = useRef(null);
  const { isMobile } = useScrollSystem();

  return (
    <div 
      ref={cardRef}
      onMouseLeave={onHoverEnd}
      onMouseEnter={() => onHoverStart(idx)}
      className="absolute w-[85%] sm:w-[70vw] lg:w-[58vw] h-full transition-all duration-500 ease-out origin-center cursor-pointer select-none"
      style={cardStyle}
    >
      <div className="flex flex-col h-full bg-charcoal border border-white/10 select-none overflow-hidden relative shadow-2xl">
        
        {/* Project image - occupies approx 80% if inactive, or shrinks to 55% if active */}
        <div 
          className="w-full transition-all duration-500 ease-in-out relative overflow-hidden"
          style={{ height: isActive ? '55%' : '82%' }}
        >
          <img 
            src={optimizeUnsplashUrl(project.image, isMobile ? 500 : 1000, isMobile ? 70 : 85)} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-[1s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-10"></div>
          
          {isActive && (
            <div className="absolute top-4 left-4 bg-charcoal/95 border border-white/15 px-3 py-1 font-sans text-[8.5px] text-accent uppercase font-bold tracking-wider z-20 animate-fade-in">
              COMPLETED // {project.completion}
            </div>
          )}
        </div>

        {/* Card Content details */}
        <div className="p-space-24 flex flex-col justify-between flex-1 bg-charcoal transition-all duration-500 ease-in-out">
          <div className="flex flex-col gap-1.5">
            {isActive && (
              <span className="font-sans text-[9px] text-primary font-bold tracking-[0.2em] uppercase animate-fade-in">
                0{idx + 1} // STRUCTURAL MONOLITH
              </span>
            )}
            <h3 className="font-display text-2xl md:text-3xl font-light text-white tracking-tight leading-none uppercase">
              {project.title}
            </h3>
            {isActive && (
              <span className="font-sans text-[10.5px] text-white/50 animate-fade-in">
                📍 {project.location}
              </span>
            )}
          </div>

          {isActive && (
            <div className="flex flex-col gap-2 mt-4 border-t border-white/5 pt-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="font-sans text-[8px] text-white/40 uppercase tracking-wider">Metrics</span>
                  <span className="font-sans text-[9.5px] text-white/80 font-bold tracking-wide mt-0.5">{project.metrics}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[8px] text-white/40 uppercase tracking-wider">Built Up</span>
                  <span className="font-sans text-[9.5px] text-accent font-bold tracking-wide mt-0.5">{project.builtUp}</span>
                </div>
              </div>
            </div>
          )}

          {isActive && (
            <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto animate-fade-in">
              <span className="font-sans text-[8.5px] text-white/40 tracking-wider">
                SYS_MATRIX // 0{idx + 1}
              </span>
              <button 
                onClick={() => onOpen(project)}
                className="link-editorial text-[9.5px] font-bold tracking-widest cursor-pointer bg-transparent border-none text-accent hover:text-white transition-colors"
              >
                Open Story →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsScene() {
  const containerRef = useRef();
  const triggerRef = useRef();
  const { isMobile, setActiveScene, setMascotPose, setHoveredProject } = useScrollSystem();
  
  const [activeProject, setActiveProject] = useState(null);
  const [scrollProgressFloat, setScrollProgressFloat] = useState(0);
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;

  // Use a ref so the onUpdate callback always sees the latest value
  // without needing to recreate the ScrollTrigger on every change
  const activeProjectRef = useRef(null);

  const warpProgress = (p) => {
    const i = Math.floor(p);
    const t = p - i;
    let warpedT = t;
    
    const plateauStart = 0.25;
    const plateauEnd = 0.75;
    
    if (t < plateauStart) {
      warpedT = 0;
    } else if (t > plateauEnd) {
      warpedT = 1;
    } else {
      const normalizedT = (t - plateauStart) / (plateauEnd - plateauStart);
      warpedT = normalizedT * normalizedT * (3 - 2 * normalizedT);
    }
    return i + warpedT;
  };

  // Keep ref in sync with state (so callbacks don't go stale)
  useEffect(() => {
    activeProjectRef.current = activeProject;
  }, [activeProject]);

  // Create trigger ONCE on mount — no dependency on activeProject
  // (avoids kill/recreate cycle that causes scroll position jumps)
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      pin: true,
      // No scrub — scrub fights user scroll when there is no linked tween
      start: "top top",
      end: "+=4000",
      onUpdate: (self) => {
        const rawProgress = self.progress * (PROJECTS.length - 1);
        setScrollProgressFloat(warpProgress(rawProgress));
        if (self.isActive && !activeProjectRef.current) {
          setMascotPose('pointing');
        }
      }
    });

    return () => {
      trigger.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const touchStartRef = useRef(0);
  
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diffX = touchStartRef.current - e.changedTouches[0].clientX;
    const swipeThreshold = 50;
    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0) {
        setScrollProgressFloat((prev) => Math.min(PROJECTS.length - 1, prev + 1));
      } else {
        setScrollProgressFloat((prev) => Math.max(0, prev - 1));
      }
    }
  };

  const getCardStyle = (index, currentProgress) => {
    const diff = index - currentProgress;
    const absDiff = Math.abs(diff);

    let scale = 1.0;
    let translateX = 0;
    let opacity = 1.0;
    let zIndex = 10;
    let blurVal = 0;

    if (diff === 0) {
      scale = 1.0;
      translateX = 0;
      opacity = 1.0;
      zIndex = 10;
      blurVal = 0;
    } else {
      // Side cards: scale 0.78, opacity 0.55, blur 3px
      if (absDiff <= 1) {
        opacity = 1.0 - absDiff * 0.45;
        scale = 1.0 - absDiff * 0.22;
        blurVal = absDiff * 3;
      } else {
        opacity = 0;
        scale = 0.78;
        blurVal = 3;
      }

      const baseTranslate = isMobile ? 100 : (isTablet ? 60 : 42);
      translateX = diff * baseTranslate;
      zIndex = Math.max(1, Math.round(10 - absDiff));
    }

    const translateZ = -absDiff * 150;

    return {
      transform: `translate3d(${translateX}%, 0, ${translateZ}px) scale(${scale})`,
      opacity: Math.max(0, opacity),
      zIndex: zIndex,
      filter: blurVal > 0.1 ? `blur(${blurVal}px)` : 'none',
      boxShadow: `0 ${32 - absDiff * 16}px ${64 - absDiff * 32}px rgba(0, 0, 0, ${0.4 - absDiff * 0.2})`,
      pointerEvents: absDiff < 0.5 ? 'auto' : 'none',
    };
  };

  return (
    <div ref={triggerRef} className="relative z-10 select-none overflow-hidden theme-dark">
      
      {/* Background Image Cross-Fade Stack */}
      <div className="absolute inset-0 z-0 bg-charcoal overflow-hidden">
        {PROJECTS.map((project, idx) => {
          const dist = Math.abs(idx - scrollProgressFloat);
          const opacity = Math.max(0, 1 - dist);
          return (
            <div
              key={idx}
              className="absolute inset-0 transition-opacity duration-300 ease-out"
              style={{ opacity, zIndex: opacity > 0.01 ? 1 : 0 }}
            >
              <img
                src={optimizeUnsplashUrl(project.image, isMobile ? 600 : 1200, isMobile ? 60 : 75)}
                alt={project.title}
                className="w-full h-full object-cover brightness-[0.14] grayscale-[30%] blur-sm scale-102"
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none z-10"></div>
      </div>

      <div 
        className="h-screen w-full flex items-center justify-center relative z-10 overflow-visible"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute left-space-24 md:left-space-40 top-space-96 z-20 flex flex-col gap-space-8 max-w-sm">
          <span className="h-label-mono text-accent">
            (03 // PORTFOLIO)
          </span>
          <h2 className="h-section-title">
            Selected <span className="text-accent italic">Monoliths</span>
          </h2>
        </div>

        {/* 3D Carousel track */}
        <div 
          ref={containerRef} 
          className="relative w-full h-[58vh] min-h-[400px] flex items-center justify-center overflow-visible mt-20"
          style={{ perspective: 1200 }}
        >
          {PROJECTS.map((project, idx) => {
            const isActive = Math.abs(idx - scrollProgressFloat) < 0.5;
            const cardStyle = getCardStyle(idx, scrollProgressFloat);
            return (
              <ProjectCard 
                key={idx} 
                project={project} 
                idx={idx}
                onOpen={handleOpenDetail}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                isActive={isActive}
                cardStyle={cardStyle}
              />
            );
          })}
        </div>

        {/* Mascot Observation Area for Horizontal Scroll */}
        <div className="absolute right-space-40 top-space-96 z-20">
          <div className="mascot-observation-point bg-charcoal/80 backdrop-blur-md">
            <span className="mascot-observation-dot"></span>
            <span>Mascot Observing Projects</span>
          </div>
        </div>

        <div className="absolute bottom-space-40 right-space-40 md:right-space-40 h-label-mono text-white/30 z-20">
          TRACK PINNED // STRUCTURAL PORTFOLIO ACTIVE
        </div>
      </div>

      {activeProject && (
        <div 
          className="fixed inset-0 z-[100] w-full h-full bg-charcoal/98 backdrop-blur-2xl flex flex-col overflow-y-auto p-space-24 md:p-space-40 theme-dark transition-all duration-500 subpixel-text"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-40 my-auto py-space-40">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-space-24">
              <span className="h-label-mono text-accent">
                RIGHTCON ESTATE / {activeProject.location}
              </span>
              <button 
                onClick={handleCloseDetail}
                className="btn-secondary py-2 px-6 text-[8.5px] tracking-widest border-white/15 text-white hover:border-accent hover:text-accent"
              >
                Close Presentation ✕
              </button>
            </div>

            {/* Asymmetrical grid containing detailed story components */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-start mt-space-24">
              
              {/* Left Column: Visual Story Spread */}
              <div className="lg:col-span-7 flex flex-col gap-space-40">
                {/* 1. Project Hero */}
                <div className="w-full aspect-[16/9] overflow-hidden border border-white/5 relative shadow-2xl rounded-none group">
                  <div className="absolute inset-0 blueprint-grid opacity-10 z-0"></div>
                  <img 
                    src={optimizeUnsplashUrl(activeProject.image, isMobile ? 800 : 1200, isMobile ? 70 : 85)} 
                    alt={activeProject.title} 
                    className="w-full h-full object-cover relative z-10 brightness-[0.8] group-hover:scale-101 transition-all duration-[1s]"
                  />
                  <div className="absolute top-3 left-3 z-20 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-mono text-[7px] text-accent uppercase">
                    EXTERIOR_HERO // {activeProject.location}
                  </div>
                </div>

                {/* 2. Interior and Evening Overlapping Collage */}
                <div className="grid grid-cols-2 gap-space-16 relative">
                  <div className="aspect-[4/3] overflow-hidden border border-white/5 rounded-none shadow-xl relative group">
                    <img 
                      src={optimizeUnsplashUrl(activeProject.interior, isMobile ? 400 : 600, isMobile ? 70 : 80)} 
                      alt="Interior spaces" 
                      className="w-full h-full object-cover brightness-[0.85] group-hover:scale-102 transition-all duration-[1s]"
                    />
                    <div className="absolute top-2 left-2 z-20 bg-charcoal/80 px-2 py-0.5 border border-white/5 font-mono text-[6.5px] text-white">
                      INTERIOR_VOLUMETRICS
                    </div>
                  </div>

                  <div className="aspect-[4/3] overflow-hidden border border-white/5 rounded-none shadow-xl relative group">
                    <img 
                      src={optimizeUnsplashUrl(activeProject.evening, isMobile ? 400 : 600, isMobile ? 70 : 80)} 
                      alt="Evening sunset exterior" 
                      className="w-full h-full object-cover brightness-[0.8] group-hover:scale-102 transition-all duration-[1s]"
                    />
                    <div className="absolute top-2 left-2 z-20 bg-charcoal/80 px-2 py-0.5 border border-white/5 font-mono text-[6.5px] text-accent">
                      EVENING_LIGHT_RESONANCE
                    </div>
                  </div>
                </div>

                {/* 3. Materials and Technical Details Grid */}
                <div className="grid grid-cols-3 gap-space-16 border-t border-white/10 pt-space-24">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[7px] text-white/40 uppercase">Day_45 Core Concrete</span>
                    <div className="aspect-square overflow-hidden border border-white/5 rounded-none group">
                      <img 
                        src={optimizeUnsplashUrl(activeProject.construction, isMobile ? 400 : 500, isMobile ? 70 : 80)} 
                        alt="Construction phase" 
                        className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[7px] text-white/40 uppercase">Burma Teak Detail</span>
                    <div className="aspect-square overflow-hidden border border-white/5 rounded-none group">
                      <img 
                        src={optimizeUnsplashUrl(activeProject.material, isMobile ? 400 : 500, isMobile ? 70 : 80)} 
                        alt="Teak detail" 
                        className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>

                  <div className="border border-white/5 bg-white/[0.01] p-3 rounded-none flex flex-col justify-between font-mono text-[7.5px] leading-relaxed text-white/50 uppercase">
                    <div>[SOIL CHECKPASS]</div>
                    <div className="text-primary font-bold">100% COMPACTED</div>
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
                  <div className="h-label-mono text-primary">
                    LOD 400 BIM STRUCTURAL MATRIX LOGS
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-space-24 border-y border-white/10 py-space-24">
                  <div>
                    <span className="h-caption font-mono text-[8px] uppercase block">Built Area</span>
                    <span className="font-display text-xl text-white">{activeProject.builtUp}</span>
                  </div>
                  <div>
                    <span className="h-caption font-mono text-[8px] uppercase block">Year</span>
                    <span className="font-display text-xl text-white">{activeProject.completion}</span>
                  </div>
                  <div>
                    <span className="h-caption font-mono text-[8px] uppercase block">Soil Profile</span>
                    <span className="font-display text-xl text-primary font-semibold">BEDROCK</span>
                  </div>
                </div>

                <div className="flex flex-col gap-space-16">
                  <h4 className="h-label-mono text-accent">[01] Client Mandate</h4>
                  <p className="font-sans text-sm text-white/90 leading-relaxed font-light">
                    {activeProject.clientStory}
                  </p>
                </div>

                <div className="flex flex-col gap-space-16">
                  <h4 className="h-label-mono text-accent">[02] Compaction comps</h4>
                  <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                    {activeProject.beforeAfter}
                  </p>
                </div>

                <div className="flex flex-col gap-space-16 border-t border-white/10 pt-space-24">
                  <h4 className="h-label-mono text-accent">[03] Structural Cube specifications</h4>
                  <ul className="flex flex-col gap-space-8">
                    {activeProject.specs.map((spec, i) => (
                      <li key={i} className="font-mono text-[9.5px] text-white/80 flex gap-space-8 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mascot observation anchor */}
                <div className="border border-white/5 p-4 rounded-none flex items-center justify-between">
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
