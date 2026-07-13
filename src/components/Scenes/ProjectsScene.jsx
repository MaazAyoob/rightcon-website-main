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
    clientStory: "Designed for a multi-generational family requesting absolute thermal privacy. The central light well acts as a passive chimney stack, drawing hot air up and reducing ambient temperature inside the living areas by 4Â°C naturally.",
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
    specs: ["Foundation: Lime-stabilized raft", "Brick compressive strength: 15 N/mmÂ²", "Ventilation: Passive screen vents"],
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
            loading="lazy"
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
                ðŸ“ {project.location}
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
                Open Story â†’
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Mobile Snap-Scroll Card ─────────────────────────────────────────────────
function MobileProjectCard({ project, idx, isActive, onOpen }) {
  return (
    <div
      className="snap-card flex-shrink-0 flex flex-col bg-charcoal border border-white/[0.08] overflow-hidden"
      style={{ width: '88vw', maxWidth: 380 }}
    >
      <div className="w-full relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={optimizeUnsplashUrl(project.image, 500, 75)}
          alt={project.title}
          loading={idx === 0 ? 'eager' : 'lazy'}
          className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'scale-100' : 'scale-[1.04] brightness-75'}`}
          style={{ objectPosition: 'center top' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent z-10" />
        <div className="absolute top-3 left-3 z-20 bg-charcoal/90 border border-white/10 px-2 py-0.5 font-mono text-[8px] text-accent uppercase font-bold">
          COMPLETED // {project.completion}
        </div>
        <div className="absolute top-3 right-3 z-20 w-8 h-8 bg-primary/90 flex items-center justify-center font-mono text-[10px] text-white font-bold">
          0{idx + 1}
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] text-primary font-bold tracking-widest uppercase">STRUCTURAL MONOLITH</span>
          <h3 className="font-display text-2xl font-light text-white tracking-tight leading-tight">{project.title}</h3>
          <span className="font-sans text-[11px] text-white/45">📍 {project.location}</span>
        </div>
        <p className="font-sans text-[12px] text-white/60 leading-relaxed font-light line-clamp-3">{project.desc}</p>
        <div className="grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-3 mt-auto">
          <div>
            <span className="font-mono text-[7.5px] text-white/30 uppercase tracking-wide block">Built Up</span>
            <span className="font-mono text-[11px] text-accent font-bold">{project.builtUp}</span>
          </div>
          <div>
            <span className="font-mono text-[7.5px] text-white/30 uppercase tracking-wide block">Materials</span>
            <span className="font-sans text-[11px] text-white/70 line-clamp-1">{project.materials.split(',')[0]}</span>
          </div>
        </div>
        <button onClick={() => onOpen(project)} className="w-full btn-primary text-[10px] tracking-widest mt-1" style={{ minHeight: 52 }}>
          Open Story →
        </button>
      </div>
    </div>
  );
}

function MobileProjectsScene({ onOpen }) {
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.clientWidth * 0.88 + 16;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIdx(Math.min(Math.max(0, idx), PROJECTS.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative z-10 select-none theme-dark bg-charcoal overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <img
          src={optimizeUnsplashUrl(PROJECTS[activeIdx]?.image, 400, 50)}
          alt=""
          className="w-full h-full object-cover brightness-[0.08] blur-sm scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-charcoal/90"></div>
        <div className="absolute inset-0 blueprint-grid opacity-[0.03]"></div>
      </div>
      <div className="relative z-10 pt-12 pb-10">
        <div className="flex flex-col gap-2 px-5 mb-7">
          <span className="h-label-mono text-accent">(03 // PORTFOLIO)</span>
          <h2 className="h-section-title text-white">Selected <span className="text-accent italic">Monoliths</span></h2>
          <p className="font-sans text-xs text-white/45 leading-relaxed">Swipe to explore completed estates.</p>
        </div>
        <div ref={scrollRef} className="snap-scroll-x px-5">
          {PROJECTS.map((project, idx) => (
            <MobileProjectCard key={idx} project={project} idx={idx} isActive={idx === activeIdx} onOpen={onOpen} />
          ))}
          <div className="flex-shrink-0 w-5" />
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                el.scrollTo({ left: i * (el.clientWidth * 0.88 + 16), behavior: 'smooth' });
              }}
              className={`h-1.5 rounded-full transition-all duration-300 touch-manipulation ${activeIdx === i ? 'bg-accent w-6' : 'bg-white/25 w-1.5'}`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
        <div className="text-center font-mono text-[9px] text-white/30 mt-2 tracking-wider">
          PROJECT {String(activeIdx + 1).padStart(2, '0')} OF {String(PROJECTS.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}

function TabletProjectsScene({ onOpen }) {
  return (
    <div className="relative z-10 select-none theme-dark bg-charcoal border-t border-white/5">
      <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none"></div>
      <div className="relative z-10 section-container">
        <div className="flex flex-col gap-2 mb-10">
          <span className="h-label-mono text-accent">(03 // PORTFOLIO)</span>
          <h2 className="h-section-title text-white">Selected <span className="text-accent italic">Monoliths</span></h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="flex flex-col bg-charcoal border border-white/10 overflow-hidden group">
              <div className="w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img
                  src={optimizeUnsplashUrl(project.image, 700, 80)}
                  alt={project.title}
                  loading={idx < 2 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <h3 className="font-display text-xl font-light text-white tracking-tight">{project.title}</h3>
                <span className="font-sans text-[11px] text-white/45">📍 {project.location}</span>
                <p className="font-sans text-xs text-white/55 leading-relaxed line-clamp-2">{project.desc}</p>
                <button onClick={() => onOpen(project)} className="link-editorial text-[10px] self-start mt-1">Open Story →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopProjectsScene({ onOpen }) {
  const containerRef = useRef();
  const triggerRef = useRef();
  const { setMascotPose, setHoveredProject } = useScrollSystem();
  const [activeProject, setActiveProject] = useState(null);
  const [scrollProgressFloat, setScrollProgressFloat] = useState(0);
  const activeProjectRef = useRef(null);

  const warpProgress = (p) => {
    const i = Math.floor(p);
    const t = p - i;
    const ps = 0.25, pe = 0.75;
    let warpedT = t < ps ? 0 : t > pe ? 1 : ((t - ps) / (pe - ps)) ** 2 * (3 - 2 * ((t - ps) / (pe - ps)));
    return i + warpedT;
  };

  useEffect(() => { activeProjectRef.current = activeProject; }, [activeProject]);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current, pin: true, start: "top top", end: "+=4000",
      onUpdate: (self) => {
        setScrollProgressFloat(warpProgress(self.progress * (PROJECTS.length - 1)));
        if (self.isActive && !activeProjectRef.current) setMascotPose('pointing');
      }
    });
    return () => trigger.kill();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCardStyle = (index, cur) => {
    const diff = index - cur, abs = Math.abs(diff);
    if (diff === 0) return { transform: 'translate3d(0,0,0) scale(1)', opacity: 1, zIndex: 10, filter: 'none', boxShadow: '0 32px 64px rgba(0,0,0,0.4)', pointerEvents: 'auto' };
    const opacity = abs <= 1 ? 1 - abs * 0.45 : 0;
    const scale = abs <= 1 ? 1 - abs * 0.22 : 0.78;
    const blur = abs <= 1 ? abs * 3 : 3;
    return {
      transform: `translate3d(${diff * 42}%, 0, ${-abs * 150}px) scale(${scale})`,
      opacity: Math.max(0, opacity), zIndex: Math.max(1, 10 - abs),
      filter: blur > 0.1 ? `blur(${blur}px)` : 'none',
      boxShadow: `0 ${32 - abs * 16}px ${64 - abs * 32}px rgba(0,0,0,${0.4 - abs * 0.2})`,
      pointerEvents: abs < 0.5 ? 'auto' : 'none'
    };
  };

  return (
    <div ref={triggerRef} className="relative z-10 select-none overflow-hidden theme-dark bg-charcoal">
      <div className="absolute inset-0 z-0 bg-charcoal overflow-hidden">
        {PROJECTS.map((p, i) => {
          const d = Math.abs(i - scrollProgressFloat), op = Math.max(0, 1 - d);
          return (
            <div key={i} className="absolute inset-0 transition-opacity duration-300" style={{ opacity: op, zIndex: op > 0.01 ? 1 : 0 }}>
              <img src={optimizeUnsplashUrl(p.image, 1200, 70)} alt={p.title} className="w-full h-full object-cover brightness-[0.14] grayscale-[30%] blur-sm scale-[1.02]" />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none z-10" />
      </div>
      <div className="h-screen w-full flex items-center justify-center relative z-10 overflow-visible">
        <div className="absolute left-10 xl:left-16 top-24 z-20 flex flex-col gap-2 max-w-sm">
          <span className="h-label-mono text-accent">(03 // PORTFOLIO)</span>
          <h2 className="h-section-title">Selected <span className="text-accent italic">Monoliths</span></h2>
        </div>
        <div ref={containerRef} className="relative w-full h-[58vh] min-h-[400px] flex items-center justify-center overflow-visible mt-20" style={{ perspective: 1200 }}>
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={idx} project={project} idx={idx}
              onOpen={(p) => { setActiveProject(p); setMascotPose('vision'); }}
              onHoverStart={() => { setHoveredProject(idx); setMascotPose('pointing'); }}
              onHoverEnd={() => { setHoveredProject(null); setMascotPose('idle'); }}
              isActive={Math.abs(idx - scrollProgressFloat) < 0.5}
              cardStyle={getCardStyle(idx, scrollProgressFloat)}
            />
          ))}
        </div>
        <div className="absolute right-10 top-24 z-20">
          <div className="mascot-observation-point bg-charcoal/80 backdrop-blur-md">
            <span className="mascot-observation-dot" /><span>Mascot Observing Projects</span>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 h-label-mono text-white/30 z-20">TRACK PINNED // STRUCTURAL PORTFOLIO ACTIVE</div>
      </div>
      {activeProject && (
        <div className="fixed inset-0 z-[100] w-full h-full bg-charcoal/98 backdrop-blur-2xl flex flex-col overflow-y-auto p-6 md:p-10 theme-dark">
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 my-auto py-10">
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <span className="h-label-mono text-accent">RIGHTCON ESTATE / {activeProject.location}</span>
              <button onClick={() => { setActiveProject(null); setMascotPose('pointing'); }} className="btn-secondary py-2 px-6 text-[8.5px] tracking-widest border-white/15 text-white hover:border-accent hover:text-accent">Close ✕</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 flex flex-col gap-8">
                <div className="w-full aspect-[16/9] overflow-hidden border border-white/5 shadow-2xl group">
                  <img src={optimizeUnsplashUrl(activeProject.image, 1200, 85)} alt={activeProject.title} className="w-full h-full object-cover brightness-[0.8] group-hover:scale-[1.01] transition-all duration-[1s]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[4/3] overflow-hidden border border-white/5 shadow-xl group"><img src={optimizeUnsplashUrl(activeProject.interior, 600, 80)} alt="Interior" className="w-full h-full object-cover brightness-[0.85] group-hover:scale-[1.02] transition-all duration-[1s]" /></div>
                  <div className="aspect-[4/3] overflow-hidden border border-white/5 shadow-xl group"><img src={optimizeUnsplashUrl(activeProject.evening, 600, 80)} alt="Evening" className="w-full h-full object-cover brightness-[0.8] group-hover:scale-[1.02] transition-all duration-[1s]" /></div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-8 lg:pl-6">
                <div><h3 className="h-section-title font-light">{activeProject.title}</h3><div className="h-label-mono text-primary mt-1">LOD 400 BIM STRUCTURAL MATRIX LOGS</div></div>
                <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-5">
                  {[['Built Area', activeProject.builtUp], ['Year', activeProject.completion], ['Soil', 'BEDROCK']].map(([k, v]) => (
                    <div key={k}><span className="h-caption font-mono text-[8px] uppercase block">{k}</span><span className="font-display text-xl text-white">{v}</span></div>
                  ))}
                </div>
                <div><h4 className="h-label-mono text-accent mb-2">[01] Client Mandate</h4><p className="font-sans text-sm text-white/90 leading-relaxed font-light">{activeProject.clientStory}</p></div>
                <div><h4 className="h-label-mono text-accent mb-2">[02] Compaction</h4><p className="font-sans text-xs text-white/70 leading-relaxed font-light">{activeProject.beforeAfter}</p></div>
                <div className="border-t border-white/10 pt-5">
                  <h4 className="h-label-mono text-accent mb-3">[03] Specifications</h4>
                  <ul className="flex flex-col gap-2">{activeProject.specs.map((s, i) => <li key={i} className="font-mono text-[9.5px] text-white/80 flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />{s}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Export: Adaptive per screen size ───────────────────────────────────
export default function ProjectsScene() {
  const { isMobile, isTablet } = useScrollSystem();
  const [activeProject, setActiveProject] = useState(null);

  const handleOpen = (project) => setActiveProject(project);
  const handleClose = () => setActiveProject(null);

  if (isMobile) return (
    <>
      <MobileProjectsScene onOpen={handleOpen} />
      {activeProject && (
        <div className="fixed inset-0 z-[200] bg-charcoal/98 backdrop-blur-2xl overflow-y-auto theme-dark p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="h-label-mono text-accent text-[9px]">{activeProject.location}</span>
            <button onClick={handleClose} className="flex items-center justify-center w-10 h-10 text-white touch-manipulation" aria-label="Close">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <img src={optimizeUnsplashUrl(activeProject.image, 800, 80)} alt={activeProject.title} className="w-full h-full object-cover" />
          </div>
          <h2 className="font-display text-3xl font-light text-white tracking-tight">{activeProject.title}</h2>
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            {[['Built Area', activeProject.builtUp], ['Year', activeProject.completion], ['Location', activeProject.location], ['Profile', 'BEDROCK']].map(([k, v]) => (
              <div key={k} className="spec-card">
                <span className="spec-card-key">{k}</span>
                <span className="spec-card-value text-white">{v}</span>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm text-white/75 leading-relaxed">{activeProject.clientStory}</p>
          <div className="pb-safe" />
        </div>
      )}
    </>
  );

  if (isTablet) return (
    <>
      <TabletProjectsScene onOpen={handleOpen} />
      {activeProject && (
        <div className="fixed inset-0 z-[200] bg-charcoal/98 backdrop-blur-2xl overflow-y-auto theme-dark p-8 flex flex-col gap-8">
          <div className="flex justify-between items-center border-b border-white/10 pb-5">
            <span className="h-label-mono text-accent">RIGHTCON ESTATE / {activeProject.location}</span>
            <button onClick={handleClose} className="btn-secondary text-[9px] px-4 py-2 border-white/15 text-white">Close âœ•</button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img src={optimizeUnsplashUrl(activeProject.image, 1000, 80)} alt={activeProject.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-3xl font-light text-white">{activeProject.title}</h2>
              <p className="font-sans text-sm text-white/70 leading-relaxed">{activeProject.clientStory}</p>
            </div>
            <div className="flex flex-col gap-3">
              {[['Built Area', activeProject.builtUp], ['Year', activeProject.completion], ['Metrics', activeProject.metrics]].map(([k, v]) => (
                <div key={k} className="spec-card border-white/10">
                  <span className="spec-card-key text-white/40">{k}</span>
                  <span className="spec-card-value text-white text-sm">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );

  return <DesktopProjectsScene onOpen={handleOpen} />;
}
