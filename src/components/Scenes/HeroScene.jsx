import React, { useEffect, useRef, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import gsap from 'gsap';

export default function HeroScene() {
  const { 
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

  // Parallax scaling
  const bgScale = 1.0 + scrollProgress * 0.15;
  const textTranslateY = scrollProgress * -120;

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
      gsap.to(introKeyPos.current, { x: 0.0, y: 0.05, z: 1.8, duration: 1.2, ease: 'back.out(1.2)' });
      gsap.to(introKeyScale.current, { value: 0.8, duration: 1.2, ease: 'power2.out' });
    });
    tl.to({}, { duration: 1.2 });

    // Offer key forward (0.8s)
    tl.call(() => {
      setMascotPose('present');
      setMascotEmotion('helpful');
      gsap.to(introKeyPos.current, { z: 2.5, y: 0.1, duration: 0.8, ease: 'power2.out' });
      gsap.to(introCamPos.current, { y: 0.2, z: 3.2, duration: 0.8, ease: 'power2.out' });
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
    const particleCount = 38;
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
  }, []);

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
    <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden p-8 md:p-16 select-none bg-[#050505] subpixel-text">
      
      {/* 1. Cinematic Background Video (Softly visible underneath) */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out brightness-35 grayscale-[20%]"
        style={{ transform: `scale(${bgScale})` }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90&auto=format&fit=crop"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-exterior-44161-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-transparent"></div>
        <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none"></div>
      </div>

      {/* 2. Floating Blueprint Dust Overlay Canvas */}
      <canvas 
        ref={particleCanvasRef}
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen"
      ></canvas>

      {/* 3. Luxury Preloader Screen — Construction Identity */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/78 backdrop-blur-[5px] z-30 transition-all duration-1000 ${
          loadingFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center gap-5 max-w-xs text-center">
          {/* Brand Identity */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-[8px] text-[#D4AF37] tracking-[0.35em] uppercase">Rightcon · Design Studio</span>
            <div className="font-display text-[2.6rem] text-[#F8F8F6] font-light tracking-[0.18em] relative mt-1">
              RIGHTCON
              <div className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent blueprint-line"></div>
            </div>
          </div>
          
          {/* Loading status */}
          <div className="flex flex-col gap-1.5 font-mono text-[8.5px] mt-2 w-full">
            <span className="text-[#3FA9F5] uppercase tracking-wider">{loadingLog}</span>
            
            {/* Elegant progress bar */}
            <div className="w-full h-[2px] bg-white/8 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-gradient-to-r from-[#3FA9F5] to-[#D4AF37] transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[7px] text-[#F8F8F6]/35 mt-0.5">
              <span>STRUCTURAL ANALYSIS</span>
              <span>{loadingProgress}%</span>
            </div>
          </div>

          {/* Construction coordinate metadata */}
          <div className="text-[7px] font-mono text-stone/35 max-w-[260px] leading-loose mt-1 uppercase border-t border-white/5 pt-3 w-full text-left">
            <div className="flex justify-between"><span>SITE REF</span><span>RCB-2024-MYS-01</span></div>
            <div className="flex justify-between"><span>COORDINATES</span><span>12.9716°N 77.5946°E</span></div>
            <div className="flex justify-between"><span>BIM LOD</span><span>400 / IFC-2x3</span></div>
            <div className="flex justify-between"><span>FOUNDATION</span><span className="text-[#3FA9F5]">PASS</span></div>
          </div>
        </div>
      </div>

      {/* 4. Guide Text Overlay (Slides up, construction-themed) */}
      {loadingFinished && heroState !== 'EXPLORE' && guideTitle && (
        <div className="absolute bottom-24 left-1/2 z-20 w-[90%] max-w-md text-center pointer-events-none guide-banner-enter">
          <div className="bg-[#171614]/80 border border-[#D4AF37]/25 backdrop-blur-md px-6 py-5 rounded-sm shadow-2xl flex flex-col items-center gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#3FA9F5] animate-ping"></div>
              <span className="font-mono text-[7.5px] text-[#D4AF37] tracking-[0.35em] uppercase font-semibold">
                {guideTag}
              </span>
            </div>
            <h2 className="font-display text-base font-light text-[#F8F8F6] tracking-wide">
              {guideTitle}
            </h2>
            <p className="font-sans text-[10px] text-stone-light/75 leading-relaxed max-w-[280px]">
              {guideText}
            </p>
          </div>
        </div>
      )}

      {/* 5. Nav Header (Floating Luxury Editorial) */}
      <header className="relative z-10 w-full flex justify-between items-center py-6 border-b border-white/5 bg-gradient-to-b from-black/25 to-transparent">
        <div className="flex flex-col items-start leading-none">
          <span className="font-mono text-[7px] md:text-[9.5px] text-[#D4AF37] tracking-[0.3em] uppercase font-semibold">
            Rightcon · Architecture &amp; Rigor
          </span>
          <span className="font-display text-2xl md:text-3xl font-light text-[#F8F8F6] tracking-[0.2em] mt-1.5">
            RIGHTCON
          </span>
        </div>

        <a 
          href="#book-a-visit" 
          className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase px-5 py-3 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#050505] transition-all duration-700 rounded-sm bg-white/5 backdrop-blur-md shadow-lg"
        >
          Inquire
        </a>
      </header>

      {/* 6. Hero Immersive Text (Defocussed/blurred during entry swoop) */}
      <div 
        className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center transition-all duration-1000"
        style={{ 
          transform: `translateY(${textTranslateY}px)`,
          filter: (heroState !== 'EXPLORE') ? 'blur(3.5px)' : 'none',
          opacity: (heroState !== 'EXPLORE') ? 0.6 : 1.0
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display text-5xl sm:text-7xl md:text-[8.5rem] italic font-light tracking-tight leading-[0.95] text-[#F8F8F6] flex flex-col">
              <span className="animate-fade-in-up">ARCHITECTURAL</span>
              <span className="text-[#D4AF37] not-italic ml-[10%] md:ml-[18%] mt-3 drop-shadow-xl">
                RIGOR.
              </span>
            </h1>
          </div>
          
          <div className="lg:col-span-4 max-w-sm lg:pl-6">
            <div className="font-mono text-[9.5px] text-stone tracking-[0.25em] mb-4 uppercase">
              (CHAPTER 01 / STORY)
            </div>
            <p className="font-sans text-xs md:text-[14px] font-light text-stone-light leading-relaxed mb-6">
               Bangalore &amp; Mysuru's premier structural landmarks. Crafted using deep geomechanical soil profiles, zero-tolerance column logic, and absolute raw material honesty.
            </p>
            <div className="flex gap-4 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#49B8FF] animate-ping"></span>
              <span className="font-mono text-[8px] tracking-widest text-[#49B8FF]/80 uppercase">
                BIM LOD 400 INTEGRATED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Footer Scroll Cue */}
      <div className="relative z-10 w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-[#D4AF37]/50"></div>
          <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] uppercase">
            Scroll to Enter
          </span>
        </div>
        <div className="font-mono text-[8px] text-stone/60 tracking-wider">
          ESTATE COORDINATES: 12.9716° N, 77.5946° E
        </div>
      </div>
    </section>
  );
}
