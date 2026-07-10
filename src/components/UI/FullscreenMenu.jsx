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
  const { menuOpen, setMenuOpen, setMascotPose, setMascotEmotion } = useScrollSystem();
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
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.03, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(".menu-anim-preview", { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out", delay: 0.2 });
    }
  }, [menuOpen, setMascotPose]);

  if (!menuOpen) return null;

  const currentItem = hoveredState.isPrimary 
    ? PRIMARY_ITEMS[hoveredState.idx] 
    : SECONDARY_ITEMS[hoveredState.idx];

  const handleHover = (isPrimary, idx) => {
    setHoveredState({ isPrimary, idx });
    const item = isPrimary ? PRIMARY_ITEMS[idx] : SECONDARY_ITEMS[idx];
    if (item && item.mascotPose) {
      setMascotPose(item.mascotPose);
      setMascotEmotion(item.mascotEmotion || 'calm');
      
      const speechTextMap = {
        "HOME": "Return to the exhibition entrance and home coordinate ledger.",
        "PROJECTS": "Behold our completed Bangalore & Mysuru residential estates.",
        "SERVICES": "Check our IS_456 BOQ estimators and digital twin MEP designs.",
        "PROCESS": "Walk through our 5-phase foundation and concrete casting timeline.",
        "MATERIALS": "See our direct trace records of teak logs and Travertine bedrock.",
        "ABOUT": "Audit our geological history, Indiranagar HQ, and creator's mandates.",
        "INSIGHTS": "Explore engineering journals and architectural design education.",
        "CONTACT": "Schedule geological standard penetration testing for your site.",
        "WHY RIGHTCON": "Verify our 10-year transferable structural warranty deed.",
        "BIM TECHNOLOGY": "Inspect virtual BIM LOD 400 MEP clash coordinates.",
        "CLIENT JOURNEY": "Review our geological advisory compaction check protocols.",
        "TESTIMONIALS": "Read homeowner verifications from Bangalore villas.",
        "CAREERS": "Apply for structural coordinator and supervisor openings.",
        "GENERAL FAQ": "Audit RERA registers, Fe550D rebar standards, and concrete targets."
      };
      
    }
  };

  const handleClose = () => {
    setMenuOpen(false);
    setMascotPose('idle');
    setMascotEmotion('calm');
  };

  return (
    <div 
      data-lenis-prevent
      className="fixed inset-0 z-[1000] menu-grid-overlay menu-anim-bg select-none bg-charcoal text-white"
    >
      
      {/* Blueprint Grid Overlay using Brand Blue */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.015] pointer-events-none"></div>

      {/* Close button (Top-Right) */}
      <button 
        type="button"
        onClick={handleClose}
        className="absolute top-space-24 right-space-24 md:right-space-40 z-50 text-white hover:text-primary font-sans text-[11px] tracking-widest transition-all cursor-pointer border-none bg-transparent outline-none uppercase"
      >
        Close ✕
      </button>

      {/* Left Column: Asymmetrical Editorial Preview Panel (Desktop Only) */}
      <div className="hidden lg:flex flex-col justify-between p-space-40 md:p-space-64 border-r border-white/10 relative bg-charcoal select-none h-full max-h-screen overflow-y-auto">
        
        {/* Dynamic Chapter description */}
        <div className="flex flex-col gap-space-8 menu-anim-preview">
          <span className="h-label-mono text-primary font-semibold">{currentItem.tagline}</span>
          <p className="font-sans text-[11px] text-white/60 leading-relaxed font-light max-w-xs mt-1">
            {currentItem.desc}
          </p>
        </div>

        {/* Dynamic Asymmetric Editorial collage */}
        <div className="relative w-full aspect-[4/3] max-w-[280px] mx-auto my-auto menu-anim-preview select-none overflow-visible flex items-center justify-center py-8">
          {/* Main big image */}
          <div className="w-[75%] h-[90%] overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-10 bg-charcoal rounded-none">
            <img 
              src={currentItem.img} 
              alt={currentItem.label} 
              className="w-full h-full object-cover transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
          </div>

          {/* Secondary overlapping thumbnail */}
          {currentItem.photos && currentItem.photos[0] && (
            <div className="absolute -left-[12%] -bottom-[5%] w-[45%] aspect-square z-20 border border-white/10 bg-charcoal shadow-lg rounded-none overflow-hidden rotate-[-4deg] hover:rotate-0 transition-transform duration-500 hover:scale-105">
              <img 
                src={currentItem.photos[0]} 
                alt="Material reference" 
                className="w-full h-full object-cover grayscale-[15%]"
              />
            </div>
          )}

          {/* Tertiary overlapping thumbnail */}
          {currentItem.photos && currentItem.photos[1] && (
            <div className="absolute -right-[12%] -top-[5%] w-[40%] aspect-[3/4] z-0 border border-white/10 bg-charcoal shadow-lg rounded-none overflow-hidden rotate-[3deg] hover:rotate-0 transition-transform duration-500 hover:scale-105 opacity-80">
              <img 
                src={currentItem.photos[1]} 
                alt="Detail close-up" 
                className="w-full h-full object-cover grayscale-[25%]"
              />
            </div>
          )}
        </div>

        {/* Dynamic statistical preview at bottom */}
        <div className="flex flex-col gap-2 border-t border-white/10 pt-4 menu-anim-preview">
          <span className="font-sans text-[7.5px] text-accent tracking-widest uppercase font-bold">[METRIC RECORDS LEDGER]</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[8px] text-white/50">
            {currentItem.stats.map((stat, sIdx) => (
              <div key={sIdx} className="flex justify-between border-b border-white/5 pb-1">
                <span>{stat.split(' // ')[0]}</span>
                <span className="text-white font-bold">{stat.split(' // ')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: High-contrast navigation links list (Scrollable catalog grid) */}
      <div 
        className="flex flex-col justify-between p-space-24 md:p-space-64 bg-charcoal relative overflow-y-auto select-none pt-space-96 lg:pt-space-64 h-full max-h-screen"
      >
        
        {/* Editorial double column links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-40 my-auto items-start">
          
          {/* Column 1: Primary pages */}
          <div className="md:col-span-7 flex flex-col gap-space-6">
            <span className="h-label-mono text-white/30 mb-2 font-bold">[01 // PRIMARY CHAPTERS]</span>
            {PRIMARY_ITEMS.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <div 
                  key={idx}
                  className="menu-anim-link"
                  onMouseEnter={() => handleHover(true, idx)}
                >
                  <NavLink 
                    to={item.path} 
                    onClick={handleClose}
                    className={`menu-link-item ${isActive ? 'active' : ''}`}
                    style={{ color: isActive ? BRAND_COLORS.primary : undefined }}
                  >
                    <span className="font-sans text-[10px] text-white/20 tracking-wider font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="font-display font-light tracking-tight text-white hover:text-primary transition-colors">{item.label}</span>
                  </NavLink>
                </div>
              );
            })}
          </div>

          {/* Column 2: Reference ledgers */}
          <div className="md:col-span-5 flex flex-col gap-space-6 md:border-l md:border-white/10 md:pl-space-32">
            <span className="h-label-mono text-white/30 mb-2 font-bold">[02 // TECHNICAL REGISTRIES]</span>
            {SECONDARY_ITEMS.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <div 
                  key={idx}
                  className="menu-anim-link"
                  onMouseEnter={() => handleHover(false, idx)}
                >
                  <NavLink 
                    to={item.path} 
                    onClick={handleClose}
                    className="flex items-center gap-3 py-1 hover:pl-2 transition-all group"
                  >
                    <span className="font-sans text-[9px] text-white/20 tracking-wider font-semibold">
                      R{idx + 1}
                    </span>
                    <span className="font-sans text-[11px] font-light tracking-wider text-white/70 group-hover:text-primary transition-colors">{item.label}</span>
                  </NavLink>
                </div>
              );
            })}
          </div>

        </div>

        {/* Expanded Navigation Footer (At the bottom) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-white/10 pt-space-24 mt-space-40 gap-space-16 text-white/50">
          
          {/* Social vectors */}
          <div className="flex gap-space-16 h-label-mono text-[8.5px] text-white/40">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">YouTube</a>
          </div>

          {/* Quick Contacts */}
          <div className="flex gap-space-16 h-label-mono text-[8.5px] text-white/40">
            <a href="https://wa.me/919845100000" className="hover:text-primary transition-colors">WhatsApp</a>
            <a href="tel:+919845100000" className="hover:text-primary transition-colors">Call</a>
            <a href="mailto:info@rightcon.in" className="hover:text-primary transition-colors">Email</a>
          </div>

        </div>

      </div>

    </div>
  );
}
