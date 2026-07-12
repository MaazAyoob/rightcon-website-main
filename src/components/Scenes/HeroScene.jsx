import React, { useEffect, useRef, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import { optimizeUnsplashUrl } from '../../utils/image';
import gsap from 'gsap';
import HeroSculpture from './HeroSculpture';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=95&auto=format&fit=crop",
    category: "01 // LANDMARK RESIDENCE",
    title: "ARCHITECTURAL RIGOR.",
    desc: "Bangalore & Mysuru's premier structural landmarks. Crafted using deep geomechanical soil profiles, zero-tolerance column logic, and absolute raw material honesty.",
    code: "STRUC_DETAIL // CUBE_01",
    detailImg: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=95&auto=format&fit=crop",
    category: "02 // GEOMECHANICAL AUDITS",
    title: "FOUNDATION STRENGTH.",
    desc: "12m deep bedrock friction piles, self-compacting M40 concrete checks, and ISO lab crushing certifications to secure coordinates.",
    code: "BEDROCK_CORE // DAY_01",
    detailImg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1920&q=95&auto=format&fit=crop",
    category: "03 // MATERIAL PROVIDENCE",
    title: "CRAFTSMAN DETAIL.",
    desc: "Exquisite raw travertine blocks, custom timber lattices, and raw exposed concrete formworks designed without fake aesthetic skins.",
    code: "TRAVERTINE // ORIGIN_IT",
    detailImg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=95&auto=format&fit=crop",
    category: "04 // VIRTUAL TWINNING",
    title: "INTEGRATED SPACES.",
    desc: "BIM coordinated MEP channels pre-modeled inside digital twins, ensuring zero onsite structural drill conflicts or slab cuts.",
    code: "BIM_LOD_400 // CLASH_PASS",
    detailImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=95&auto=format&fit=crop",
    category: "05 // RESIDENTIAL MANDATE",
    title: "COMMISSION VALUES.",
    desc: "An architectural shield designed to protect structural peace of mind, backed by our 10-Year Transferable Deed of Warranty.",
    code: "WARRANTY // ACTIVE_DEED",
    detailImg: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&auto=format&fit=crop"
  }
];

export default function HeroScene() {
  const { 
    isMobile,
    isTablet,
    scrollProgress, 
    setMascotPose,
    setMascotEmotion,
    heroState,
    setHeroState,
    completeIntro,
    introPos,
    introRot,
    introScale,
    introCamPos,
    introCamRot,
    introKeyPos,
    introKeyRot,
    introKeyScale,
    introKeyOpacity,
    particleState,
    introIntensity,
    exitTransitionRef
  } = useScrollSystem();

  const particleCanvasRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Parallax scaling
  const bgScale = 1.0 + scrollProgress * 0.15;
  const textTranslateY = scrollProgress * -120;

  // Slide timing rotation
  useEffect(() => {
    if (heroState !== 'EXPLORE') return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroState]);

  // Phase 1: Genuine Load Counter (approx 2-3 seconds duration)
  useEffect(() => {
    if (heroState === 'EXPLORE') {
      setLoadingFinished(true);
      return;
    }
    if (heroState === 'BOOTING') {
      setLoadingFinished(false);
      setLoadingProgress(0);
      return;
    }
    if (heroState !== 'LOADING') return;

    setLoadingFinished(false);
    setLoadingProgress(0);

    // Hits 100% in ~2s — feels quick but genuine
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoadingFinished(true);
            setHeroState('HERO_READY');
          }, 300);
          return 100;
        }
        const jump = Math.random() > 0.7 ? 12 : 7;
        return Math.min(100, prev + jump);
      });
    }, 42);

    return () => clearInterval(interval);
  }, [heroState]);

  // Phase 2: Fade overlay quickly then start arrival
  useEffect(() => {
    if (heroState !== 'HERO_READY') return;
    const timer = setTimeout(() => {
      setHeroState('MASCOT_ARRIVING');
    }, 500); // Short fade then immediately start arrival
    return () => clearTimeout(timer);
  }, [heroState]);

  // Phase 3: Single clean arc arrival — 1.8s total
  useEffect(() => {
    if (heroState !== 'MASCOT_ARRIVING') return;

    // Initialize: off-screen top-left
    introPos.current.set(-7.0, 5.0, -12.0);
    introRot.current.set(0, 0.4, 0);
    introScale.current.value = 0.08;
    introCamPos.current.set(0, 0.5, 7.0);
    introCamRot.current.set(0, 0, 0);
    introKeyPos.current.set(0, -0.2, 0.4);
    introKeyRot.current.set(0, 0, 0);
    introKeyScale.current.value = 0;
    introKeyOpacity.current.value = 0;
    particleState.current = { speed: 0.03, scatter: 0.05, opacity: 0.8, warpProgress: 0.0 };
    introIntensity.current.value = 0.8;

    setMascotPose('idle');
    setMascotEmotion('curious');

    const tl = gsap.timeline({
      onComplete: () => setHeroState('MASCOT_PRESENTING')
    });

    // One smooth cinematic arc into landing position
    tl.to(introPos.current, { x: 1.5, y: -0.65, z: 0.35, duration: 1.8, ease: 'power2.out' });
    tl.to(introScale.current, { value: 0.65, duration: 1.8, ease: 'power2.out' }, '<');
    tl.to(introRot.current,   { y: -0.4, z: 0.0, duration: 1.8, ease: 'power2.out' }, '<');
    tl.to(introCamPos.current,{ y: 0.0, z: 6.0, duration: 1.8, ease: 'power2.inOut' }, '<');

    return () => { tl.kill(); };
  }, [heroState]);

  // Phase 4: Greeting + key presentation — 3s total
  useEffect(() => {
    if (heroState !== 'MASCOT_PRESENTING') return;

    const tl = gsap.timeline({
      onComplete: () => setHeroState('WAITING_FOR_KEY')
    });

    // Wave (1s)
    tl.call(() => { setMascotPose('wave'); setMascotEmotion('friendly'); });
    tl.to({}, { duration: 1.0 });

    // Retrieve key (1.2s)
    tl.call(() => {
      setMascotPose('reach');
      setMascotEmotion('thinking');
      introKeyPos.current.set(1.68, -0.85, 0.45);
      introKeyScale.current.value = 0.0;
      introKeyOpacity.current.value = 1.0;
      gsap.to(introKeyPos.current, { x: 0.0, y: -0.15, z: 0.8, duration: 1.2, ease: 'back.out(1.2)' });
      gsap.to(introKeyScale.current, { value: 0.5, duration: 1.2, ease: 'power2.out' });
    });
    tl.to({}, { duration: 1.2 });

    // Offer key forward (0.8s)
    tl.call(() => {
      setMascotPose('present');
      setMascotEmotion('helpful');
      gsap.to(introKeyPos.current, { z: 1.2, y: -0.1, duration: 0.8, ease: 'power2.out' });
      gsap.to(introCamPos.current, { y: 0.1, z: 5.2, duration: 0.8, ease: 'power2.out' });
    });
    tl.to({}, { duration: 0.8 });

    return () => { tl.kill(); };
  }, [heroState]);

  // Visitor Clicks Key: Claims blueprint and starts dissolve
  const handleKeyClaim = () => {
    if (heroState !== 'WAITING_FOR_KEY') return;
    setHeroState('KEY_ACCEPTED');

    setMascotPose('nod');
    setMascotEmotion('excited');

    const tl = gsap.timeline({
      onComplete: () => {
        setHeroState('UNLOCKING');
      }
    });

    // Scatter blueprint particles
    tl.to(particleState.current, {
      speed: 4.5,
      scatter: 15.0,
      warpProgress: 1.0,
      duration: 1.5,
      ease: "power3.in"
    });

    // Key dissolves
    tl.to(introKeyScale.current, {
      value: 0.0,
      duration: 0.5,
      ease: "power2.in"
    }, 0);
    tl.to(introKeyOpacity.current, {
      value: 0.0,
      duration: 0.5,
      ease: "power2.in"
    }, 0);
  };

  // Phase 5: Zoom out camera, reset coordinates, unlock scroll trigger
  useEffect(() => {
    if (heroState !== 'UNLOCKING') return;

    const tl = gsap.timeline({
      onComplete: () => {
        setMascotPose('idle');
        completeIntro(); // Unlocks scrolling & sets EXPLORE state
      }
    });

    // Zoom camera back
    tl.to(introCamPos.current, {
      x: 0,
      y: 0,
      z: 5.0,
      duration: 1.4,
      ease: "power2.inOut"
    });

    // Reposition mascot to default page side hover slot
    tl.to(introPos.current, {
      x: 1.5,
      y: -0.65,
      z: 0.35,
      duration: 1.4,
      ease: "power2.inOut"
    }, 0);

    return () => {
      tl.kill();
    };
  }, [heroState]);

  // Connect 3D click callbacks to refs
  useEffect(() => {
    if (exitTransitionRef) {
      exitTransitionRef.current = {
        triggerEnter: handleKeyClaim
      };
    }
    return () => {
      if (exitTransitionRef) {
        exitTransitionRef.current = null;
      }
    };
  }, [heroState]);

  // Floating backdrop dust lines
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Blueprint-themed ambient particles — elevation markers, dimension lines, nodes
    const particleCount = isMobile ? 12 : isTablet ? 22 : 38;
    const particleTypes = ['cross', 'square', 'dot', 'dimLine', 'elevMarker', 'gridNode'];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.12,
        opacity: Math.random() * 0.3 + 0.08,
        type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
        length: Math.random() * 18 + 8 // for dimLine type
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20 || p.x > canvas.width + 20) {
          p.x = Math.random() * canvas.width;
        }

        const color = `rgba(63, 169, 245, ${p.opacity})`;
        const goldColor = `rgba(212, 175, 55, ${p.opacity * 0.6})`;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 0.8;

        if (p.type === 'cross') {
          // Survey cross-hair marker
          ctx.beginPath();
          ctx.moveTo(p.x - 4, p.y); ctx.lineTo(p.x + 4, p.y);
          ctx.moveTo(p.x, p.y - 4); ctx.lineTo(p.x, p.y + 4);
          ctx.stroke();
          // Centre dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'square') {
          // Column grid reference box
          ctx.strokeRect(p.x - 3, p.y - 3, 6, 6);
        } else if (p.type === 'dimLine') {
          // Dimension annotation line with tick marks
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.length, p.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - 3); ctx.lineTo(p.x, p.y + 3);
          ctx.moveTo(p.x + p.length, p.y - 3); ctx.lineTo(p.x + p.length, p.y + 3);
          ctx.stroke();
        } else if (p.type === 'elevMarker') {
          // Elevation arrow marker (↑ style)
          ctx.strokeStyle = goldColor;
          ctx.fillStyle = goldColor;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y + 5); ctx.lineTo(p.x, p.y - 5);
          ctx.moveTo(p.x - 2, p.y - 2); ctx.lineTo(p.x, p.y - 5); ctx.lineTo(p.x + 2, p.y - 2);
          ctx.stroke();
        } else if (p.type === 'gridNode') {
          // Structural grid intersection node
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Simple dust dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile, isTablet]);

  // Compute loading message log — Construction vocabulary
  let loadingLog = "Loading Architectural Experience...";
  if (loadingProgress >= 90) loadingLog = "Preparing Site Walkthrough...";
  else if (loadingProgress >= 70) loadingLog = "Synchronising Construction Workflow...";
  else if (loadingProgress >= 55) loadingLog = "Validating Foundation Design...";
  else if (loadingProgress >= 40) loadingLog = "Loading Material Library...";
  else if (loadingProgress >= 20) loadingLog = "Initialising Site Planning...";

  // Cinematic guide subtitles — construction persona
  let guideTitle = "";
  let guideText = "";
  let guideTag = "";

  if (heroState === 'MASCOT_ARRIVING') {
    guideTag = "SITE INSPECTION";
    guideTitle = "Digital Architect Arriving";
    guideText = "Your guide is arriving to walk you through Rightcon's construction philosophy and craftsmanship.";
  } else if (heroState === 'MASCOT_PRESENTING') {
    guideTag = "STRUCTURAL BRIEFING";
    guideTitle = "Preparing the Blueprint Key";
    guideText = "The architectural key to this journey is being retrieved. It represents trust, precision, and the beginning of your home.";
  } else if (heroState === 'WAITING_FOR_KEY') {
    guideTag = "HANDOVER READY";
    guideTitle = "Accept your Blueprint Key";
    guideText = "Click the key to begin your Rightcon journey — a guided tour of craftsmanship, structural integrity, and design excellence.";
  }

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden p-space-24 md:p-space-40 select-none theme-dark subpixel-text">
      
      {/* 1. Premium 3D Architectural Sculpture Background */}
      <HeroSculpture />

      {/* Text readability zone — dark-left → transparent-right (desktop split layout) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.88) 35%, rgba(10,10,10,0.55) 58%, rgba(10,10,10,0.18) 76%, rgba(10,10,10,0) 90%)'
        }}
      ></div>
      {/* Bottom vignette — scroll cue + footer readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent z-[1] pointer-events-none"></div>
      {/* Top vignette — nav bar readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/35 via-transparent to-transparent z-[1] pointer-events-none"></div>
      {/* Mobile safe — gradient dark overlay on small screens (no col split, text covers full width) */}
      <div 
        className="absolute inset-0 lg:hidden z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0.80) 100%)'
        }}
      ></div>

      {/* 2. Floating Blueprint Dust Overlay Canvas */}
      <canvas 
        ref={particleCanvasRef}
        className="absolute inset-0 z-[2] pointer-events-none mix-blend-screen opacity-10"
      ></canvas>

      {/* 3. Luxury Preloader Screen */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center bg-charcoal z-30 transition-all duration-1000 ${
          loadingFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center gap-space-24 max-w-xs text-center text-ivory">
          <div className="flex flex-col items-center gap-space-8">
            <span className="h-label-mono text-bronze">Rightcon · Design Studio</span>
            <div className="font-display text-[2.6rem] text-ivory font-light tracking-[0.2em] relative mt-1">
              RIGHTCON
              <div className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-bronze/30 blueprint-line"></div>
            </div>
          </div>
          
          <div className="flex flex-col gap-space-8 font-mono text-[8.5px] mt-2 w-full">
            <span className="text-holo-cyan uppercase tracking-wider">{loadingLog}</span>
            <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-bronze transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[7px] text-ivory/40 mt-0.5">
              <span>STRUCTURAL ANALYSIS</span>
              <span>{loadingProgress}%</span>
            </div>
          </div>

          <div className="text-[7px] font-mono text-ivory/30 max-w-[260px] leading-loose mt-1 uppercase border-t border-white/5 pt-3 w-full text-left">
            <div className="flex justify-between"><span>SITE REF</span><span>RCB-2026-MYS-01</span></div>
            <div className="flex justify-between"><span>COORDINATES</span><span>12.9716°N 77.5946°E</span></div>
            <div className="flex justify-between"><span>BIM LOD</span><span>400 / IFC-2x3</span></div>
            <div className="flex justify-between"><span>FOUNDATION LOGS</span><span className="text-holo-cyan">PASS</span></div>
          </div>
          
          <button
            onClick={() => {
              setMascotPose('idle');
              completeIntro();
            }}
            className="font-mono text-[7.5px] text-white/40 hover:text-bronze tracking-widest uppercase cursor-pointer border-none bg-transparent outline-none mt-4 transition-colors z-40 focus:outline-none"
          >
            [SKIP ENTIRE INTRO]
          </button>
        </div>
      </div>

      {/* 4. Guide Text Overlay */}
      {loadingFinished && heroState !== 'EXPLORE' && guideTitle && (
        <div className="absolute bottom-space-96 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-sm text-center pointer-events-none guide-banner-enter">
          <div className="glass-panel border-bronze/20 px-space-24 py-space-16 rounded-sm shadow-2xl flex flex-col items-center gap-space-8">
            <div className="flex items-center gap-space-8">
              <div className="w-1 h-1 rounded-full bg-holo-cyan animate-ping"></div>
              <span className="h-label-mono text-bronze">
                {guideTag}
              </span>
            </div>
            <h2 className="font-display text-sm font-light text-ivory tracking-wide">
              {guideTitle}
            </h2>
            <p className="font-sans text-[9px] text-ivory/60 leading-relaxed max-w-[260px]">
              {guideText}
            </p>
          </div>
        </div>
      )}

      {/* 5. Minimal Header (Visible during booting intro only; hidden in explore) */}
      {heroState !== 'EXPLORE' ? (
        <header className="relative z-10 w-full flex justify-between items-center py-space-16 border-b border-white/5">
          <div className="flex flex-col items-start leading-none text-ivory">
            <span className="h-label-mono text-bronze">
              Rightcon · Architecture &amp; Rigor
            </span>
            <span className="font-display text-xl md:text-2xl font-light tracking-[0.25em] mt-1">
              RIGHTCON
            </span>
          </div>
          <div className="flex items-center gap-space-16 z-20">
            <button
              onClick={() => {
                setMascotPose('idle');
                completeIntro();
              }}
              className="font-mono text-[8px] text-bronze hover:text-white uppercase tracking-widest border border-bronze/30 hover:border-white/50 px-3 py-1 bg-transparent cursor-pointer transition-all focus:outline-none"
            >
              SKIP INTRO →
            </button>
            <span className="font-mono text-[8px] text-holo-cyan uppercase tracking-widest hidden sm:inline">
              GEOTECHNICAL INTRO ACTIVE
            </span>
          </div>
        </header>
      ) : (
        <div className="h-space-40 w-full pointer-events-none"></div>
      )}

      {/* 6. Dynamic Slide Immersive Text */}
      <div 
        className="relative z-20 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center transition-all duration-1000 mt-space-40"
        style={{ 
          transform: `translateY(${textTranslateY}px)`,
          filter: (heroState !== 'EXPLORE') ? 'blur(3px)' : 'none',
          opacity: (heroState !== 'EXPLORE') ? 0.5 : 1.0
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-center">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-7 flex flex-col gap-space-24">
            <div className="h-label-mono text-ivory/50 flex items-center gap-space-8 transition-all duration-500">
              <span>({HERO_SLIDES[currentSlide].category})</span>
              <span className="w-8 h-[1px] bg-white/20"></span>
              <span>THE ARCHITECTURAL MANIFESTO</span>
            </div>
            
            <h1 className="h-hero-display text-ivory flex flex-col transition-all duration-[0.8s] ease-out">
              <span className="animate-fade-in-up font-display font-light uppercase tracking-tight">
                {HERO_SLIDES[currentSlide].title.split('.')[0]}
              </span>
            </h1>
            
            <div className="max-w-md mt-2">
              <p className="h-body-large text-ivory/90 font-light mb-space-24 leading-relaxed transition-all duration-500">
                {HERO_SLIDES[currentSlide].desc}
              </p>
              
              <div className="flex gap-space-16 items-center">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('home-projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary py-3 px-8 text-[9px] tracking-widest rounded-none cursor-pointer border-none outline-none"
                >
                  <span>Explore Exhibition</span>
                </button>
                <span className="font-mono text-[8px] tracking-widest text-holo-cyan/80 uppercase">
                  BIM LOD 400 INTEGRATED
                </span>
              </div>
            </div>
          </div>
          
          {/* Right Column: Floating Asymmetric Card matching current slide */}
          <div className="hidden lg:flex lg:col-span-5 relative h-full min-h-[350px] items-center justify-center">
            {/* Subtle Blueprint grid background for card */}
            <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none rounded-sm border border-white/5 bg-white/[0.01]"></div>

            {/* A single, stunning asymmetrical floating image card */}
            <div className="absolute right-[5%] w-[260px] aspect-[3/4] z-10 border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)] bg-charcoal overflow-hidden group rotate-[2deg] hover:rotate-0 transition-all duration-700 hover:scale-103">
              <img 
                src={optimizeUnsplashUrl(HERO_SLIDES[currentSlide].detailImg, isMobile ? 500 : 800, isMobile ? 70 : 80)} 
                alt="Exposed architectural details" 
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1s]"
              />
              <div className="absolute bottom-3 left-3 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-mono text-[7.5px] text-bronze uppercase">
                {HERO_SLIDES[currentSlide].code}
              </div>
            </div>
            
            {/* Mascot Safe Zone overlay point */}
            <div className="absolute left-[5%] bottom-[10%] z-20">
              <div className="mascot-observation-point bg-charcoal/80 backdrop-blur-md">
                <span className="mascot-observation-dot"></span>
                <span>Mascot Landing Anchor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Swipeable Info Card (Hidden on lg+) */}
      {heroState === 'EXPLORE' && HERO_SLIDES[currentSlide].detailImg && (
        <div className="lg:hidden relative z-20 w-full mt-4">
          <div className="glass-panel border-bronze/10 p-3 flex items-center gap-3 bg-charcoal/85 backdrop-blur-md">
            <div className="w-12 h-12 flex-shrink-0 border border-white/10 overflow-hidden">
              <img 
                src={optimizeUnsplashUrl(HERO_SLIDES[currentSlide].detailImg, 150, 70)} 
                alt="Detail" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="font-mono text-[8px] text-accent font-bold uppercase tracking-widest truncate">
                {HERO_SLIDES[currentSlide].code}
              </span>
              <p className="font-sans text-[11px] text-white/70 line-clamp-2 leading-snug">
                {HERO_SLIDES[currentSlide].desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 7. Footer Scroll Cue with slideshow slide indicator */}
      <div className="relative z-20 w-full flex justify-between items-center border-t border-white/5 pt-space-16 text-ivory">
        <div className="flex items-center gap-space-24">
          <div className="flex items-center gap-space-8">
            <div className="w-12 h-[1px] bg-bronze/50"></div>
            <span className="font-mono text-[9px] text-bronze tracking-[0.3em] uppercase">
              Scroll to Enter
            </span>
          </div>
          
          {/* Slideshow dot indicators */}
          {heroState === 'EXPLORE' && (
            <div className="flex gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlide(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === i ? 'bg-bronze w-4' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="h-caption font-mono text-[8px] text-ivory/40">
          SLIDE 0{currentSlide + 1} OF 0{HERO_SLIDES.length} // 12.9716° N, 77.5946° E
        </div>
      </div>
    </section>
  );
}
