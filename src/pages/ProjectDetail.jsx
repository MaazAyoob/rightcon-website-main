import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useScrollSystem } from '../context/ScrollContext';
import { PROJECTS_DATA } from '../data/mockData';
import { optimizeUnsplashUrl } from '../utils/image';
import Footer from '../components/UI/Footer';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isMobile, setActiveScene, setMascotPose } = useScrollSystem();
  
  // Find project
  const project = PROJECTS_DATA.find(p => p.id === id);

  // Before & After Interactive slider states
  const [sliderPos, setSliderPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(3); // Set active scene to projects for mascot targets
    setMascotPose('idle');
  }, [id, setActiveScene, setMascotPose]);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    
    window.addEventListener('resize', updateWidth);
    
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
      observer.disconnect();
    };
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center font-mono text-xs text-white bg-charcoal">
        <span>[ERROR: PROJECT_NOT_FOUND]</span>
        <Link to="/projects" className="underline mt-4 text-bronze uppercase">Back to Index</Link>
      </div>
    );
  }

  // Handle before/after slide drag
  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  // Find related projects
  const relatedProjects = PROJECTS_DATA.filter(p => p.id !== project.id).slice(0, 2);

  return (
    <div className="w-full flex flex-col bg-charcoal text-ivory selection:bg-bronze selection:text-charcoal pt-space-96 select-none">
      
      {/* BREADCRUMBS & META HEADER */}
      <div className="px-space-24 md:px-space-40 max-w-7xl mx-auto w-full z-10">
        <nav className="breadcrumb-nav">
          <Link to="/" className="breadcrumb-link">HOME</Link>
          <span>/</span>
          <Link to="/projects" className="breadcrumb-link">PROJECTS</Link>
          <span>/</span>
          <span className="text-bronze font-semibold">{project.category}</span>
          <span>/</span>
          <span className="text-white/40">{project.title}</span>
        </nav>
      </div>

      {/* 1. FULL-SCREEN HERO */}
      <section className="py-space-64 px-space-24 md:px-space-40 max-w-7xl mx-auto w-full relative z-10">
        <h1 className="font-display text-4xl md:text-7xl font-light text-white leading-none mt-space-24 uppercase tracking-wide">
          {project.title}
        </h1>
        
        <div className="w-full aspect-[21/9] overflow-hidden border border-white/10 rounded-sm mt-space-40 relative bg-graphite shadow-2xl">
          <img 
            src={optimizeUnsplashUrl(project.heroImage, isMobile ? 800 : 1600, isMobile ? 70 : 85)} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 2. OVERVIEW & PROJECT FACTS */}
      <section className="py-space-64 px-space-24 md:px-space-40 max-w-7xl mx-auto w-full relative z-10 border-t border-white/5 mt-space-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40">
          
          {/* Facts column */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-space-24">
            <span className="h-label-mono text-bronze">[PROJECT STATS]</span>
            <div className="flex flex-col gap-space-12 font-mono text-[9px] text-ivory/70">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/30">CLIENT</span>
                <span>{project.client}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/30">LOCATION</span>
                <span>{project.location}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/30">AREA SIZE</span>
                <span>{project.area}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/30">YEAR</span>
                <span>{project.year}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/30">STATUS</span>
                <span className="text-[#2D4E73]">{project.status}</span>
              </div>
            </div>
          </div>

          {/* Narrative Overview column */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-space-16">
            <span className="h-label-mono text-bronze">[01 // OVERVIEW]</span>
            <p className="font-display text-2xl font-light leading-relaxed text-white">
              {project.overview}
            </p>
          </div>

        </div>
      </section>

      {/* 3. NARRATIVE GALLERY COLLAGE */}
      <section className="py-space-64 px-space-24 md:px-space-40 max-w-7xl mx-auto w-full relative z-10">
        <span className="h-label-mono text-bronze mb-space-32 block">[02 // DESIGN PORTRAIT GALLERY]</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-24">
          {project.gallery.map((img, idx) => (
            <div key={idx} className="aspect-[3/4] overflow-hidden border border-white/10 rounded-sm bg-graphite group">
              <img 
                src={img} 
                alt={`${project.title} gallery ${idx + 1}`} 
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-[1s]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. STRUCTURAL CHALLENGE, SITE CONTEXT & DESIGN PHILOSOPHY */}
      <section className="py-space-96 md:py-space-160 px-space-24 md:px-space-40 border-t border-white/5 bg-graphite relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-48 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-64">
            {/* Challenge & Site Context */}
            <div className="flex flex-col gap-space-24">
              <span className="h-label-mono text-bronze">[03 // THE GEOMECHANICAL CHALLENGE]</span>
              <h2 className="font-display text-3xl font-light text-white leading-snug">
                Soil Compaction &amp; Site Context
              </h2>
              <p className="font-sans text-xs text-ivory/65 leading-relaxed font-light">
                {project.challenge}
              </p>
              <div className="border border-white/5 p-space-16 bg-charcoal/40 rounded-sm font-mono text-[8.5px] text-[#2D4E73] mt-2">
                SITE_CONTEXT // SBC_LIMIT: 220 kN/m² // PROFILE: SILTY_CLAY
              </div>
            </div>

            {/* Design Philosophy & Construction Timeline */}
            <div className="flex flex-col gap-space-24">
              <span className="h-label-mono text-bronze">[04 // DESIGN PHILOSOPHY &amp; TIMELINE]</span>
              <h2 className="font-display text-3xl font-light text-white leading-snug">
                Volumetric Massing &amp; Timelines
              </h2>
              <p className="font-sans text-xs text-ivory/65 leading-relaxed font-light">
                {project.process}
              </p>
              <div className="flex justify-between items-center bg-charcoal/40 border border-white/5 p-space-16 rounded-sm font-mono text-[8.5px] text-bronze">
                <span>CONSTRUCTION TIMELINE</span>
                <span>{project.timeline}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE BEFORE & AFTER SLIDER */}
      <section className="py-space-96 px-space-24 md:px-space-40 max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-space-32">
        <div className="flex flex-col gap-space-8">
          <span className="h-label-mono text-bronze">[05 // BEFORE &amp; AFTER SLIDER]</span>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white">
            Excavation Site vs. Completed Slab Structural Facade
          </h2>
        </div>

        {/* Drag container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="image-comparison-container select-none touch-none shadow-2xl bg-graphite rounded-sm"
        >
          {/* Before image (Excavation) */}
          <img 
            src={optimizeUnsplashUrl(project.beforeImage, isMobile ? 800 : 1200, isMobile ? 70 : 80)} 
            alt="Excavation site" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-[0.7]"
          />
          <div className="absolute top-3 left-3 bg-charcoal/90 border border-white/5 px-2 py-0.5 font-mono text-[7px] text-bronze z-20">
            DAY_01 // GEOTECHNICAL CORE EXCAVATION
          </div>

          {/* After image (Completed facade) */}
          <div 
            className="absolute inset-0 overflow-hidden" 
            style={{ width: `${sliderPos}%` }}
          >
            <img 
              src={optimizeUnsplashUrl(project.afterImage, isMobile ? 800 : 1200, isMobile ? 70 : 80)} 
              alt="Completed facade" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-[0.8]"
              style={{ width: containerWidth ? `${containerWidth}px` : '100%', maxWidth: 'none' }}
            />
            <div className="absolute top-3 right-3 bg-charcoal/90 border border-white/5 px-2 py-0.5 font-mono text-[7px] text-[#2D4E73] z-20 whitespace-nowrap">
              DAY_360 // LANDMARK COMPLETE
            </div>
          </div>

          {/* Slider line handle */}
          <div 
            className="comparison-handle" 
            style={{ left: `${sliderPos}%` }}
          >
            <div className="comparison-handle-button">↔</div>
          </div>
        </div>
      </section>

      {/* 6. MATERIAL PALETTE & FLOOR PLANS */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/5 bg-graphite relative">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-start">
          
          {/* Materials Swatches */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-space-32">
            <span className="h-label-mono text-bronze">[06 // COMPONENT MATERIALS]</span>
            <h3 className="font-display text-2xl font-light text-white">Travertine &amp; Teak Timber Swatches</h3>
            
            <div className="grid grid-cols-2 gap-space-16">
              {project.materials.map((mat, i) => (
                <div key={i} className="border border-white/5 p-space-20 bg-charcoal/40 rounded-sm">
                  <span className="font-mono text-[8.5px] text-bronze font-bold">MATERIAL_0{i+1}</span>
                  <h4 className="font-display text-base font-light text-white mt-1">{mat}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Floor Plans Mock */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-space-32">
            <span className="h-label-mono text-bronze">[07 // FLOOR PLAN MODEL]</span>
            <h3 className="font-display text-2xl font-light text-white">Blueprint Skeletal Coordinates</h3>
            
            <div className="w-full aspect-[4/3] border border-white/10 relative p-space-24 flex items-center justify-center bg-charcoal rounded-sm overflow-hidden">
              <div className="absolute inset-0 blueprint-grid opacity-10"></div>
              {/* SVG drawing lines to look like an architectural sketch */}
              <svg className="w-full h-full stroke-white/20 fill-none stroke-[0.5]" viewBox="0 0 100 100">
                <line x1="10" y1="10" x2="90" y2="10" className="blueprint-line" />
                <line x1="90" y1="10" x2="90" y2="90" />
                <line x1="90" y1="90" x2="10" y2="90" />
                <line x1="10" y1="90" x2="10" y2="10" />
                <rect x="25" y="25" width="50" height="50" />
                <circle cx="50" cy="50" r="15" className="stroke-bronze/40" />
                <line x1="0" y1="50" x2="100" y2="50" className="stroke-white/5" />
                <line x1="50" y1="0" x2="50" y2="100" className="stroke-white/5" />
              </svg>
              <div className="absolute bottom-2.5 left-2.5 bg-charcoal/90 border border-white/5 px-2 py-0.5 font-mono text-[7px] text-bronze">
                LOD_400 // CLASH_CLEARED_GRID
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. CLIENT TESTIMONIAL (Interview) */}
      <section className="py-space-96 md:py-space-160 px-space-24 md:px-space-40 max-w-7xl mx-auto w-full relative z-10 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-space-24">
          <span className="h-label-mono text-bronze">[08 // CLIENT INTERVIEW]</span>
          <p className="font-display text-2xl font-light italic leading-relaxed text-white">
            "{project.testimonial.quote}"
          </p>
          <div className="flex flex-col gap-1 mt-4">
            <span className="font-mono text-[9px] text-bronze font-bold uppercase">{project.testimonial.author}</span>
            <span className="font-mono text-[8px] text-white/30">CLIENT OF COMMISSION</span>
          </div>
        </div>
      </section>

      {/* 8. RELATED PROJECTS */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/5 bg-graphite">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-48">
          <span className="h-label-mono text-bronze">[09 // ADDITIONAL CHAPTERS]</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-32">
            {relatedProjects.map((p, i) => (
              <Link 
                to={`/projects/${p.id}`} 
                key={p.id}
                className="group flex gap-space-24 border border-white/5 p-space-16 bg-charcoal/30 hover:border-bronze/35 rounded-sm transition-all duration-700"
              >
                <div className="w-[120px] aspect-square overflow-hidden border border-white/5 flex-shrink-0 bg-charcoal">
                  <img 
                    src={optimizeUnsplashUrl(p.heroImage, isMobile ? 400 : 500, isMobile ? 70 : 80)} 
                    alt={p.title} 
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[8px] text-bronze uppercase">{p.category}</span>
                    <h4 className="font-display text-lg font-light text-white mt-1">{p.title}</h4>
                  </div>
                  <span className="font-mono text-[9px] text-stone hover:text-bronze transition-colors">EXPLORE →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONSULTATION CTA */}
      <section className="py-space-96 px-space-24 md:px-space-40 bg-charcoal border-t border-white/5 relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.01] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-space-24 relative z-10">
          <span className="h-label-mono text-bronze">[DIRECT COMMISSION REGISTRY]</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-white uppercase tracking-wide">
            Build Your Own Structural Landmark
          </h2>
          <p className="font-sans text-xs text-ivory/60 max-w-lg mx-auto leading-relaxed font-light">
            Each rightcon villa begins with a geomechanical soil compaction review. Secure your site coordinates with our engineering estimators.
          </p>
          <Link 
            to="/contact?advisory=true" 
            className="btn-primary py-3.5 px-8 tracking-widest text-[9.5px] rounded-none self-center mt-4"
          >
            <span>BOOK GEOMECHANICAL ADVISORY</span>
          </Link>
        </div>
      </section>

      <Footer />

    </div>
  );
}
