import React, { useRef, useEffect, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
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
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=90"
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
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=90"
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
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=90"
  }
];

function ProjectCard({ project, idx, onOpen, onHoverStart, onHoverEnd }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Map bounds to max 12 deg tilt
    setRotate({
      x: (y / rect.height) * -12,
      y: (x / rect.width) * 12
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    onHoverEnd();
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onHoverStart(idx)}
      onClick={() => onOpen(project)}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
      className="w-[90vw] md:w-[70vw] lg:w-[50vw] h-[65vh] flex-shrink-0 relative overflow-hidden border border-white/10 bg-[#171614] rounded-sm cursor-pointer group shadow-2xl mr-16 flex flex-col justify-end p-8 md:p-12 select-none"
    >
      {/* Blueprint Grid Overlay on card hover */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.01] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"></div>

      {/* Background Image with slow zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.6s] ease-out brightness-40 group-hover:brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
      </div>

      {/* Floating Blueprint vectors */}
      <div className="absolute top-6 right-6 font-mono text-[8px] text-[#49B8FF]/30 group-hover:text-[#49B8FF] transition-colors tracking-widest">
        SYS_MATRIX // 0{idx + 1}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4">
        <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.25em] uppercase">
          {project.location}
        </span>
        <h3 className="font-display text-3xl sm:text-5xl font-light text-[#F8F8F6] tracking-wide leading-tight group-hover:text-[#D4AF37] transition-colors">
          {project.title}
        </h3>
        
        <div className="w-full h-[1px] bg-white/10 group-hover:bg-[#49B8FF]/30 transition-colors"></div>

        <div className="flex justify-between items-center">
          <span className="font-mono text-[8.5px] text-stone tracking-wider">
            {project.metrics}
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#D4AF37] uppercase border-b border-[#D4AF37]/30 pb-0.5 group-hover:border-[#D4AF37] transition-colors">
            Read Story →
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsScene() {
  const containerRef = useRef();
  const triggerRef = useRef();
  const { setActiveScene, setMascotPose, setHoveredProject } = useScrollSystem();
  
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const horizontalScroll = gsap.fromTo(
      containerRef.current,
      { x: "10vw" },
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
            const prog = self.progress;
            // Guide mascot walking along horizontal flow
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
    // Hide mascot to make building the absolute hero
    setMascotPose('vision');
  };

  const handleCloseDetail = () => {
    setActiveProject(null);
    setMascotPose('pointing');
  };

  return (
    <div ref={triggerRef} className="relative z-10 select-none overflow-hidden">
      {/* Pinned horizontal viewing track */}
      <div className="h-screen w-full flex items-center bg-[#050505] relative">
        
        {/* Intro Tag */}
        <div className="absolute left-8 md:left-24 top-24 z-10 flex flex-col gap-2 max-w-sm">
          <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] uppercase">
            (SCENE 03 / PORTFOLIO)
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-[#F8F8F6] font-light leading-none">
            Selected <span className="text-[#D4AF37] italic">Monoliths</span>
          </h2>
        </div>

        {/* Horizontal track container */}
        <div 
          ref={containerRef} 
          className="flex pl-[10vw] pr-[20vw] items-center h-full relative"
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

        {/* Dynamic Coordinates Indicator */}
        <div className="absolute bottom-8 right-8 md:right-16 font-mono text-[8px] text-stone tracking-widest uppercase">
          HORIZONTAL TRACK PINNED // STRUCTURAL PORTFOLIO ACTIVE
        </div>
      </div>

      {/* Full-Screen Magazine-style Project Detail Overlay */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-[100] w-full h-full bg-[#050505]/95 backdrop-blur-xl flex flex-col overflow-y-auto p-6 md:p-16 text-[#F8F8F6] transition-all duration-500 subpixel-text"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 my-auto">
            
            {/* Header close panel */}
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.25em] uppercase">
                RIGHTCON ESTATE / {activeProject.location}
              </span>
              <button 
                onClick={handleCloseDetail}
                className="font-mono text-[10px] tracking-widest text-[#F8F8F6] hover:text-[#D4AF37] border border-white/20 hover:border-[#D4AF37] py-2 px-5 rounded-sm transition-all duration-300 uppercase cursor-pointer"
              >
                Close Presentation ✕
              </button>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
              
              {/* Media Section */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="w-full aspect-[16/10] overflow-hidden border border-white/10 relative shadow-2xl">
                  {/* Glowing blueprint mesh grid behind image */}
                  <div className="absolute inset-0 blueprint-grid opacity-20 z-0"></div>
                  <img 
                    src={activeProject.image} 
                    alt={activeProject.title} 
                    className="w-full h-full object-cover relative z-10 brightness-75"
                  />
                </div>
                
                {/* Material Swatch selection list */}
                <div className="flex flex-col gap-3 border-t border-white/5 pt-6">
                  <span className="font-mono text-[8px] text-stone tracking-widest uppercase">
                    PROVENANCE MATERIALS
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {activeProject.materials.split(', ').map((mat, i) => (
                      <span 
                        key={i} 
                        className="font-mono text-[9px] text-[#D4AF37] border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-3 py-1.5 rounded-sm"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text specifications / client story editorial block */}
              <div className="lg:col-span-6 flex flex-col gap-8 lg:pl-6">
                
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-4xl sm:text-5xl font-light leading-tight text-[#F8F8F6]">
                    {activeProject.title}
                  </h3>
                  <div className="font-mono text-[8.5px] text-[#49B8FF] tracking-widest uppercase mt-2">
                    LOD 400 BIM STRUCTURAL MATRIX LOGS
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 border-y border-white/10 py-6">
                  <div>
                    <span className="font-mono text-[8px] text-stone uppercase block">Built Area</span>
                    <span className="font-display text-lg text-[#F8F8F6]">{activeProject.builtUp}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-stone uppercase block">Year</span>
                    <span className="font-display text-lg text-[#F8F8F6]">{activeProject.completion}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-stone uppercase block">Soil Profile</span>
                    <span className="font-display text-lg text-[#F8F8F6] text-[#49B8FF]">BEDROCK</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase">[01] Client Mandate</h4>
                  <p className="font-sans text-xs md:text-sm font-light text-stone-light leading-relaxed">
                    {activeProject.clientStory}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase">[02] Geomechanical Compaction</h4>
                  <p className="font-sans text-xs md:text-sm font-light text-stone-light leading-relaxed">
                    {activeProject.beforeAfter}
                  </p>
                </div>

                <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                  <h4 className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase">[03] Architectural Specification Cube logs</h4>
                  <ul className="flex flex-col gap-2">
                    {activeProject.specs.map((spec, i) => (
                      <li key={i} className="font-mono text-[10px] text-stone-light flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#49B8FF]"></span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

