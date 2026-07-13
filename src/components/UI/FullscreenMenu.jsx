import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useScrollSystem } from '../../context/ScrollContext';
import gsap from 'gsap';
import { BRAND_COLORS } from '../../config/colors';

const PRIMARY_ITEMS = [
  { 
    label: "HOME", 
    path: "/", 
    desc: "Exhibition entrance: Bangalore & Mysuru's premier structural residential landmarks.",
    tagline: "ARCHITECTURAL START // COORD_01",
    img: "https://images.unsplash.com/photo-160058515340-be6161a56a0c?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format&fit=crop"
    ],
    stats: ["ESTABLISHED // 2014", "LANDMARKS IN BLR // 12", "RERA REGISTRY // ACTIVE", "WARRANTY DEED // ACTIVE"],
    mascotPose: "wave",
    mascotEmotion: "friendly"
  },
  { 
    label: "PROJECTS", 
    path: "/projects", 
    desc: "Bespoke residential monoliths engineered to outlast generations.",
    tagline: "COMPLETED PORTFOLIO // LOD_400",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&auto=format&fit=crop"
    ],
    stats: ["COMPLETED AREA // 85K SQ.FT.", "ACTIVE VILLAS // 4 ESTATES", "CONCRETE STRENGTH // M40 TARGET", "ALIGNMENT OFFSET // ZERO"],
    mascotPose: "pointing",
    mascotEmotion: "helpful"
  },
  { 
    label: "SERVICES", 
    path: "/services", 
    desc: "Turnkey structural executions, BOQ audits, and BIM clash analysis.",
    tagline: "CRAFTSMAN ADVISORY // EXPERTISE",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=400&auto=format&fit=crop"
    ],
    stats: ["BOQ ESTIMATIONS // 100%", "BIM CLASH CHECKS // PASS", "SOIL LOG ANCHORS // VERIFIED", "HQ ESTIMATORS // 12 COORDS"],
    mascotPose: "thinking",
    mascotEmotion: "focused"
  },
  { 
    label: "PROCESS", 
    path: "/process", 
    desc: "A transparent step-by-step walk through geomechanical foundation & concrete casting.",
    tagline: "CONSTRUCTION JOURNEY // TRANSPARENT",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&auto=format&fit=crop"
    ],
    stats: ["CAST PHASES // 5 PHASES", "PILES DEPTH // UP TO 12m", "SLAB RATIO // IS_456 CODE", "HANDOVER STATUS // READY"],
    mascotPose: "inspect",
    mascotEmotion: "thinking"
  },
  { 
    label: "MATERIALS", 
    path: "/materials", 
    desc: "Raw material registries detailing Travertine stone slabs and teak lumber logs.",
    tagline: "MATERIAL PROVIDENCE // QUALITY",
    img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&auto=format&fit=crop"
    ],
    stats: ["WOOD DENSITY // HIGH DENSITY", "TRAVERTINE SOURCE // ITALY", "STEEL GRADE // Fe550D LABS", "VENEER PLIES // REJECTED"],
    mascotPose: "inspect",
    mascotEmotion: "focused"
  },
  { 
    label: "ABOUT", 
    path: "/about", 
    desc: "Rightcon's geological legacy, team coordination, and founder's mandate.",
    tagline: "COMPANY HERITAGE // INTERVIEWS",
    img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop"
    ],
    stats: ["FOUNDER CHIEF // MAAZ AYOOB", "ESTIMATORS HQ // 12 MEMBERS", "SITE ENGINEERS // 24 ACTIVE", "LEDGER COMMITS // 150+"],
    mascotPose: "confident",
    mascotEmotion: "happy"
  },
  { 
    label: "INSIGHTS", 
    path: "/insights", 
    desc: "Architectural guidelines, engineering calculations, and material notes.",
    tagline: "DESIGN EDUCATION // JOURNAL",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop"
    ],
    stats: ["JOURNAL COPIES // 48 GUIDES", "BLUEPRINT GUIDES // 12 PLANS", "SITE IMAGES // 350+ FILES", "AUTHORS DIRECT // CHIEF ENG"],
    mascotPose: "pointing",
    mascotEmotion: "curious"
  },
  { 
    label: "CONTACT", 
    path: "/contact", 
    desc: "Schedule geological Compaction audits and project blueprints at our studio.",
    tagline: "DESIGN CONSULTATION // BOOKING",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400&auto=format&fit=crop"
    ],
    stats: ["RESPONSE SPEED // <24H", "SITE AUDITS // WEEKLY MAP", "HQ COORDINATES // INDIRANAGAR", "STUDIO HOURS // 09:00 - 18:00"],
    mascotPose: "pointing",
    mascotEmotion: "helpful"
  }
];

const SECONDARY_ITEMS = [
  { 
    label: "WHY RIGHTCON", 
    path: "/why-rightcon", 
    desc: "Transferable 10-Year structural deed of warranty, compressive testing data, and client protocols.",
    tagline: "WARRANTY DEED // TRUST LOG",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&auto=format&fit=crop"
    ],
    stats: ["WARRANTY TERM // 10 YEARS", "RERA STATUS // 100% REGIST", "CRAFT VERIFIED // SECURE", "CLAIM RATE // 0.0%"],
    mascotPose: "confident",
    mascotEmotion: "happy"
  },
  { 
    label: "BIM TECHNOLOGY", 
    path: "/technology", 
    desc: "Virtual BIM LOD 400 twin modeling, clash scanning systems, and core SPT logs.",
    tagline: "TECHNOLOGY DEPT // CLASH_FREE",
    img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&auto=format&fit=crop"
    ],
    stats: ["BIM DEP LEVEL // LOD 400", "MEP RESOLVED // PASS", "VIRTUAL COORDS // BLR_HQ", "SOIL PENETRATION // SPT_CORE"],
    mascotPose: "inspect",
    mascotEmotion: "focused"
  },
  { 
    label: "CLIENT JOURNEY", 
    path: "/client-journey", 
    desc: "Geological advisory protocols, compaction checks, and timeline stage maps.",
    tagline: "CLIENT RELATIONS // PROTOCOL",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop"
    ],
    stats: ["MAP MILESTONES // 5 STAGES", "REPORT SPEED // WEEKLY", "GEOTECH AUDIT // INCLUDED", "HANDOVER RATE // 100%"],
    mascotPose: "pointing",
    mascotEmotion: "helpful"
  },
  { 
    label: "TESTIMONIALS", 
    path: "/testimonials", 
    desc: "Homeowner verifications and validation journals from Bangalore estates.",
    tagline: "CLIENT VERIFICATION // STATEMENTS",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format&fit=crop"
    ],
    stats: ["KORAMANGALA RES // PASS", "EMERALD VILLA // ACTIVE", "CLIENTS SATISFIED // 45+", "SITE INSPEC RATE // 100%"],
    mascotPose: "celebrating",
    mascotEmotion: "excited"
  },
  { 
    label: "CAREERS", 
    path: "/careers", 
    desc: "Bangalore roles for structural coordinators, geologists, and supervisors.",
    tagline: "CAREER OPPORTUNITIES // HR",
    img: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop"
    ],
    stats: ["OPENINGS // 4 ROLES", "LOCATION // INDIRANAGAR", "EXP RANGE // 2-8 YEARS", "SOIL CORE TECH // NEEDED"],
    mascotPose: "wave",
    mascotEmotion: "friendly"
  },
  { 
    label: "GENERAL FAQ", 
    path: "/faq", 
    desc: " Compaction specifications, RERA registers, and compressive testing details.",
    tagline: "TECHNICAL ACCORD // Q&A",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop"
    ],
    stats: ["FAQ CATEGORIES // 4", "RERA LEDGER // ACTIVE", "STEEL STANDARD // Fe550D", "SLAB REBARS // IS_456"],
    mascotPose: "pointing",
    mascotEmotion: "curious"
  }
];

export default function FullscreenMenu() {
  const { menuOpen, setMenuOpen, setMascotPose, setMascotEmotion, setHoveredMenuItem } = useScrollSystem();
  const [hoveredState, setHoveredState] = useState({ isPrimary: true, idx: 0 });
  const location = useLocation();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setMenuOpen]);

  useEffect(() => {
    if (menuOpen) {
      if (setMascotPose) {
        setMascotPose('wave');
      }
      gsap.fromTo(".menu-anim-bg", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
      gsap.fromTo(".menu-anim-link", 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.04, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(".menu-anim-preview", { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out", delay: 0.2 });
      gsap.fromTo(".menu-anim-img", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.05 });
    }
  }, [menuOpen, setMascotPose]);

  if (!menuOpen) return null;

  const currentItem = hoveredState.isPrimary 
    ? PRIMARY_ITEMS[hoveredState.idx] 
    : SECONDARY_ITEMS[hoveredState.idx];

  const handleHover = (isPrimary, idx) => {
    setHoveredState({ isPrimary, idx });
    if (setHoveredMenuItem) {
      setHoveredMenuItem({ isPrimary, idx });
    }
    const item = isPrimary ? PRIMARY_ITEMS[idx] : SECONDARY_ITEMS[idx];
    if (item && item.mascotPose) {
      setMascotPose(item.mascotPose);
      setMascotEmotion(item.mascotEmotion || 'calm');
    }
  };

  const handleClose = () => {
    setMenuOpen(false);
    setMascotPose('idle');
    setMascotEmotion('calm');
    if (setHoveredMenuItem) {
      setHoveredMenuItem(null);
    }
  };

  return (
    <div 
      data-lenis-prevent
      className="fixed inset-0 z-[1000] menu-anim-bg select-none bg-charcoal text-white overflow-hidden"
    >
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.015] pointer-events-none"></div>

      {/* ── Close Button (Top-Right) — 48px tap area on mobile ── */}
      <button 
        type="button"
        onClick={handleClose}
        aria-label="Close navigation menu"
        className="absolute top-3 right-4 md:top-6 md:right-10 z-50 
          flex items-center justify-center
          min-w-[48px] min-h-[48px]
          text-white hover:text-primary font-sans text-[11px] tracking-widest 
          transition-all cursor-pointer border-none bg-transparent outline-none uppercase
          touch-manipulation"
      >
        <span className="hidden sm:inline mr-1">Close</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE/TABLET LAYOUT (below lg): Image carousel top + editorial links
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col h-full max-h-screen">

        {/* ── Top Image Carousel — Preview for selected nav item ── */}
        <div className="menu-anim-img relative w-full flex-shrink-0 overflow-hidden"
          style={{ height: '30vh', minHeight: 150, maxHeight: 260 }}
        >
          <img
            key={currentItem.img}
            src={currentItem.img}
            alt={currentItem.label}
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 img-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/90"></div>
          <div className="absolute inset-0 blueprint-grid opacity-[0.03]"></div>

          {/* Slide item info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
            <span className="h-label-mono text-accent font-bold" style={{ fontSize: '9px' }}>{currentItem.tagline}</span>
            <h2 className="font-display text-xl md:text-2xl font-light text-white tracking-tight leading-tight">{currentItem.label}</h2>
            <p className="font-sans text-white/55 leading-relaxed font-light line-clamp-1" style={{ fontSize: '11px' }}>
              {currentItem.desc}
            </p>
          </div>

          {/* RIGHTCON wordmark top-left */}
          <div className="absolute top-4 left-5 font-display text-sm font-semibold tracking-[0.2em] text-white/80">
            RIGHTCON
          </div>

          {/* Slide dots */}
          <div className="absolute top-4 right-16 flex gap-1.5">
            {PRIMARY_ITEMS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  hoveredState.isPrimary && hoveredState.idx === i
                    ? 'bg-accent w-4'
                    : 'bg-white/25 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Navigation Links — Scrollable ── */}
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none">
          
          {/* Primary Pages */}
          <div className="flex flex-col px-5 pt-5 pb-2">
            <span className="mb-2 font-bold" style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              [01 // PRIMARY CHAPTERS]
            </span>
            <div className="flex flex-col divide-y divide-white/[0.06]">
              {PRIMARY_ITEMS.map((item, idx) => {
                const isActive = location.pathname === item.path;
                const isSelected = hoveredState.isPrimary && hoveredState.idx === idx;
                return (
                  <div
                    key={idx}
                    className="menu-anim-link"
                    onTouchStart={() => handleHover(true, idx)}
                    onMouseEnter={() => handleHover(true, idx)}
                    onMouseLeave={() => setHoveredMenuItem && setHoveredMenuItem(null)}
                  >
                    <NavLink
                      to={item.path}
                      onClick={handleClose}
                      className={`
                        flex items-center gap-3 pr-4 transition-all duration-300 touch-manipulation min-h-[56px]
                        ${isActive || isSelected ? 'pl-2' : 'pl-0'}
                      `}
                    >
                      <span className={`font-mono font-bold w-6 flex-shrink-0 transition-colors ${isActive ? 'text-accent' : 'text-white/20'}`}
                        style={{ fontSize: '9px' }}>
                        0{idx + 1}
                      </span>
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <span className={`font-display font-light tracking-tight leading-none transition-colors ${
                          isActive ? 'text-accent' : isSelected ? 'text-white' : 'text-white/55'
                        }`} style={{ fontSize: '22px' }}>
                          {item.label}
                        </span>
                        <span className="font-sans text-white/30 tracking-wide truncate" style={{ fontSize: '9px' }}>
                          {item.tagline.split(' // ')[0]}
                        </span>
                      </div>
                      <svg 
                        className={`w-3.5 h-3.5 flex-shrink-0 transition-all duration-300 ${isSelected ? 'text-accent opacity-100' : 'text-white/10 opacity-0'}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Secondary Pages */}
          <div className="flex flex-col px-5 pt-3 pb-4 border-t border-white/[0.06]">
            <span className="mb-2.5 font-bold" style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              [02 // TECHNICAL REGISTRIES]
            </span>
            <div className="flex flex-wrap gap-2">
              {SECONDARY_ITEMS.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={idx}
                    to={item.path}
                    onClick={handleClose}
                    className={`
                      flex items-center gap-2 px-3 border transition-all duration-300 touch-manipulation min-h-[40px]
                      font-sans tracking-wider
                      ${isActive
                        ? 'border-accent/40 text-accent bg-accent/5'
                        : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                      }
                    `}
                    style={{ fontSize: '10px' }}
                    onTouchStart={() => handleHover(false, idx)}
                    onMouseEnter={() => handleHover(false, idx)}
                    onMouseLeave={() => setHoveredMenuItem && setHoveredMenuItem(null)}
                  >
                    <span className="text-white/20 font-bold" style={{ fontSize: '8px' }}>R{idx + 1}</span>
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center px-5 py-4 border-t border-white/[0.06] mt-auto pb-safe">
            <div className="flex gap-5" style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors min-h-[44px] flex items-center">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors min-h-[44px] flex items-center">LinkedIn</a>
            </div>
            <div className="flex gap-4" style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              <a href="https://wa.me/919845100000" className="hover:text-primary transition-colors min-h-[44px] flex items-center">WhatsApp</a>
              <a href="tel:+919845100000" className="hover:text-primary transition-colors min-h-[44px] flex items-center">Call</a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT (1024px+): Full editorial two-column  
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:grid h-full" style={{ gridTemplateColumns: '4.5fr 5.5fr' }}>

        {/* Left Column: Editorial Preview Panel */}
        <div className="flex flex-col justify-between p-10 xl:p-16 border-r border-white/10 relative bg-charcoal select-none h-full max-h-screen overflow-y-auto">
          
          <div className="font-display text-lg font-semibold tracking-[0.25em] text-white/70">
            RIGHTCON
          </div>

          <div className="flex flex-col gap-3 menu-anim-preview">
            <span className="h-label-mono text-primary font-semibold">{currentItem.tagline}</span>
            <p className="font-sans text-white/60 leading-relaxed font-light max-w-xs mt-1" style={{ fontSize: '12px' }}>
              {currentItem.desc}
            </p>
          </div>

          {/* Asymmetric Editorial Collage */}
          <div className="relative w-full aspect-[4/3] max-w-[300px] mx-auto my-auto menu-anim-preview select-none overflow-visible flex items-center justify-center py-8">
            <div className="w-[75%] h-[90%] overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-10 bg-charcoal">
              <img src={currentItem.img} alt={currentItem.label} className="w-full h-full object-cover transition-all duration-700 ease-out img-hero" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
            </div>
            {currentItem.photos && currentItem.photos[0] && (
              <div className="absolute -left-[12%] -bottom-[5%] w-[45%] aspect-square z-20 border border-white/10 bg-charcoal shadow-lg overflow-hidden rotate-[-4deg] hover:rotate-0 transition-transform duration-500 hover:scale-105">
                <img src={currentItem.photos[0]} alt="Material reference" className="w-full h-full object-cover grayscale-[15%]" />
              </div>
            )}
            {currentItem.photos && currentItem.photos[1] && (
              <div className="absolute -right-[12%] -top-[5%] w-[40%] aspect-[3/4] z-0 border border-white/10 bg-charcoal shadow-lg overflow-hidden rotate-[3deg] hover:rotate-0 transition-transform duration-500 hover:scale-105 opacity-80">
                <img src={currentItem.photos[1]} alt="Detail close-up" className="w-full h-full object-cover grayscale-[25%]" />
              </div>
            )}
          </div>

          {/* Metric Records Ledger */}
          <div className="flex flex-col gap-2 border-t border-white/10 pt-4 menu-anim-preview">
            <span className="font-sans text-accent tracking-widest uppercase font-bold" style={{ fontSize: '8px' }}>[METRIC RECORDS LEDGER]</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-white/50" style={{ fontSize: '8px' }}>
              {currentItem.stats.map((stat, sIdx) => (
                <div key={sIdx} className="flex justify-between border-b border-white/5 pb-1">
                  <span>{stat.split(' // ')[0]}</span>
                  <span className="text-white font-bold">{stat.split(' // ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Navigation Links */}
        <div className="flex flex-col justify-between p-10 xl:p-16 bg-charcoal relative overflow-y-auto select-none pt-20 h-full max-h-screen">
          
          <div className="grid grid-cols-12 gap-10 my-auto items-start">
            
            {/* Primary pages */}
            <div className="col-span-7 flex flex-col gap-1">
              <span className="h-label-mono text-white/30 mb-3 font-bold">[01 // PRIMARY CHAPTERS]</span>
              {PRIMARY_ITEMS.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <div key={idx} className="menu-anim-link" onMouseEnter={() => handleHover(true, idx)} onMouseLeave={() => setHoveredMenuItem && setHoveredMenuItem(null)}>
                    <NavLink
                      to={item.path}
                      onClick={handleClose}
                      className={`menu-link-item ${isActive ? 'active' : ''}`}
                      style={{ color: isActive ? BRAND_COLORS.primary : undefined }}
                    >
                      <span className="font-sans text-white/20 tracking-wider font-semibold w-7" style={{ fontSize: '10px' }}>
                        0{idx + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-display font-light tracking-tight transition-colors" style={{ color: 'inherit' }}>
                          {item.label}
                        </span>
                        <span className="font-sans text-white/25 tracking-wide font-normal" style={{ fontSize: '9px' }}>
                          {item.tagline.split(' // ')[0]}
                        </span>
                      </div>
                    </NavLink>
                  </div>
                );
              })}
            </div>

            {/* Secondary pages */}
            <div className="col-span-5 flex flex-col gap-1 border-l border-white/10 pl-8">
              <span className="h-label-mono text-white/30 mb-3 font-bold">[02 // TECHNICAL REGISTRIES]</span>
              {SECONDARY_ITEMS.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <div key={idx} className="menu-anim-link" onMouseEnter={() => handleHover(false, idx)} onMouseLeave={() => setHoveredMenuItem && setHoveredMenuItem(null)}>
                    <NavLink
                      to={item.path}
                      onClick={handleClose}
                      className="flex items-center gap-3 hover:pl-2 transition-all duration-300 group min-h-[44px]"
                    >
                      <span className="font-sans text-white/20 tracking-wider font-semibold" style={{ fontSize: '9px' }}>R{idx + 1}</span>
                      <div className="flex flex-col gap-0.5">
                        <span className={`font-sans font-light tracking-wider transition-colors ${
                          isActive ? 'text-accent' : 'text-white/70 group-hover:text-primary'
                        }`} style={{ fontSize: '12px' }}>
                          {item.label}
                        </span>
                        <span className="font-sans text-white/25 tracking-wide" style={{ fontSize: '9px' }}>
                          {item.tagline.split(' // ')[0]}
                        </span>
                      </div>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-white/10 pt-6 mt-10 gap-4">
            <div className="flex gap-5 h-label-mono text-white/40" style={{ fontSize: '9px' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">YouTube</a>
            </div>
            <div className="flex gap-5 h-label-mono text-white/40" style={{ fontSize: '9px' }}>
              <a href="https://wa.me/919845100000" className="hover:text-primary transition-colors">WhatsApp</a>
              <a href="tel:+919845100000" className="hover:text-primary transition-colors">Call</a>
              <a href="mailto:info@rightcon.in" className="hover:text-primary transition-colors">Email</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
