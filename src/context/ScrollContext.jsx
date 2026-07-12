import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const ScrollContext = createContext({
  scrollProgress: 0,
  scrollVelocity: 0,
  scrollDirection: 'down',
  activeScene: 0,
  mousePos: { x: 0, y: 0 },
  isMobile: false,
  pageIdle: false,
  activeInteraction: null,
  lenisRef: null,
  
  // V2 mascot/layout states
  mascotPose: 'idle',
  mascotEmotion: 'calm',
  hoveredProject: null,
  hoveredService: null,
  currentTrustTab: 'system',
  formFieldFocus: null,
  formSuccess: false,
  isChatOpen: false,
  setIsChatOpen: () => {},
  menuOpen: false,
  setMenuOpen: () => {},
  searchOpen: false,
  setSearchOpen: () => {},
  currentMascotPoint: 'hero_right',
  setCurrentMascotPoint: () => {},
  mascotSpeech: '',
  setMascotSpeech: () => {},
  mascotHovered: false,
  setMascotHovered: () => {},
  
  // V3 hero states
  heroState: 'BOOTING',
  setHeroState: () => {},
  
  setMascotPose: () => {},
  setMascotEmotion: () => {},
  setHoveredProject: () => {},
  setHoveredService: () => {},
  setCurrentTrustTab: () => {},
  setFormFieldFocus: () => {},
  setFormSuccess: () => {},

  // Intro states & refs
  introActive: true,
  introCompleted: false,
  introPos: null,
  introRot: null,
  introScale: null,
  introCamPos: null,
  introCamRot: null,
  introKeyPos: null,
  introKeyRot: null,
  introKeyScale: null,
  introKeyOpacity: null,
  particleState: null,
  introIntensity: null,
  exitTransitionRef: null,
  
  setActiveScene: () => {},
  setActiveInteraction: () => {},
  completeIntro: () => {},
  replayIntro: () => {},
});

export const useScrollSystem = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [activeScene, setActiveSceneState] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop'); // 'mobile'|'tablet'|'laptop'|'desktop'|'wide'
  const [pageIdle, setPageIdle] = useState(false);
  const [activeInteraction, setActiveInteraction] = useState(null);

  // V2 states
  const [mascotPose, setMascotPose] = useState('idle');
  const [mascotEmotion, setMascotEmotion] = useState('calm');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [currentTrustTab, setCurrentTrustTab] = useState('system');
  const [formFieldFocus, setFormFieldFocus] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isChatOpen, rawSetIsChatOpen] = useState(false);
  const [menuOpen, rawSetMenuOpen] = useState(false);
  const [searchOpen, rawSetSearchOpen] = useState(false);

  const setIsChatOpen = (val) => {
    rawSetIsChatOpen(val);
    if (val) {
      rawSetMenuOpen(false);
      rawSetSearchOpen(false);
    }
  };

  const setMenuOpen = (val) => {
    rawSetMenuOpen(val);
    if (val) {
      rawSetIsChatOpen(false);
      rawSetSearchOpen(false);
    }
  };

  const setSearchOpen = (val) => {
    rawSetSearchOpen(val);
    if (val) {
      rawSetIsChatOpen(false);
      rawSetMenuOpen(false);
    }
  };
  const [currentMascotPoint, setCurrentMascotPoint] = useState('hero_right');
  const [mascotSpeech, setMascotSpeech] = useState("");
  const [mascotHovered, setMascotHovered] = useState(false);
  
  // V3 hero-integrated intro State
  const [heroState, setHeroState] = useState('BOOTING');
  const [introCompleted, setIntroCompleted] = useState(false);
  const introActive = heroState !== 'EXPLORE'; 

  // Refs for smooth 3D animations (GSAP will animate these directly for performance)
  const introPos = useRef(new THREE.Vector3(-7.5, 5.5, -12));
  const introRot = useRef(new THREE.Euler(0, 0.4, 0));
  const introScale = useRef({ value: 0.15 });
  const introCamPos = useRef(new THREE.Vector3(0, 0.8, 7.5));
  const introCamRot = useRef(new THREE.Euler(0, 0, 0));
  const introKeyPos = useRef(new THREE.Vector3(0, -0.2, 0.4));
  const introKeyRot = useRef(new THREE.Euler(0, 0, 0));
  const introKeyScale = useRef({ value: 0 });
  const introKeyOpacity = useRef({ value: 0 });
  const particleState = useRef({ speed: 0.03, scatter: 0.05, opacity: 0.8, warpProgress: 0.0 });
  const introIntensity = useRef({ value: 0.8 });

  // Shared trigger ref for coordinating 3D clicks with HTML timelines
  const exitTransitionRef = useRef(null);

  const lenisRef = useRef(null);
  const idleTimerRef = useRef(null);

  // useCallback ensures this function has a stable reference across renders.
  // Without it, Home.jsx's useEffect (which lists setActiveScene as a dep)
  // would re-run on EVERY render, calling window.scrollTo(0,0) each time.
  const setActiveScene = useCallback((index) => {
    setActiveSceneState(index);
  }, []);

  const resetIdleTimer = () => {
    setPageIdle(false);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      setPageIdle(true);
    }, 5000);
  };

  // Intro completion handler
  const completeIntro = () => {
    localStorage.setItem('rightcon_intro_completed', 'true');
    setIntroCompleted(true);
    setHeroState('EXPLORE');
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  // Replay Intro handler
  const replayIntro = () => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.stop();
    }
    
    // Reset all 3D refs to starting configuration
    introPos.current.set(-7.5, 5.5, -12);
    introRot.current.set(0, 0.4, 0);
    introScale.current.value = 0.15;
    introCamPos.current.set(0, 0.8, 7.5);
    introCamRot.current.set(0, 0, 0);
    introKeyPos.current.set(0, -0.2, 0.4);
    introKeyRot.current.set(0, 0, 0);
    introKeyScale.current.value = 0;
    introKeyOpacity.current.value = 0;
    particleState.current = { speed: 0.03, scatter: 0.05, opacity: 0.8, warpProgress: 0.0 };
    introIntensity.current.value = 0.8;
    
    setIntroCompleted(false);
    setHeroState('BOOTING');
    setTimeout(() => {
      setHeroState('LOADING');
    }, 100);
  };

  useEffect(() => {
    // 1. Screen size detection
    const checkScreenSize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
      setIsDesktop(w >= 1024);
      if (w < 768)       setScreenSize('mobile');
      else if (w < 1024) setScreenSize('tablet');
      else if (w < 1280) setScreenSize('laptop');
      else if (w < 1920) setScreenSize('desktop');
      else               setScreenSize('wide');
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Initialize idle timer
    resetIdleTimer();

    // Check development mode bypass
    const isDev = import.meta.env.DEV || 
                  window.location.hostname === "localhost" || 
                  window.location.hostname === "127.0.0.1";
    
    const completed = localStorage.getItem('rightcon_intro_completed') === 'true';
    const isMobileDevice = window.innerWidth < 768;
    const isTabletDevice = window.innerWidth >= 768 && window.innerWidth < 1024;
    const shouldSkip = (completed && !isDev) || isMobileDevice || isTabletDevice || location.pathname !== '/'; // Auto-skip intro on mobile/tablet or inner pages

    setIntroCompleted(shouldSkip);
    setHeroState(shouldSkip ? 'EXPLORE' : 'BOOTING');
    if (!shouldSkip) {
      setTimeout(() => {
        setHeroState('LOADING');
      }, 100);
    }

    // 2. Lenis initialization
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Proper Lenis + ScrollTrigger integration via scrollerProxy
    // This prevents pin sections from fighting smooth scroll
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // If key not claimed, stop scroll immediately
    if (!shouldSkip) {
      lenis.stop();
    }

    // Track scroll events
    const handleScroll = (e) => {
      resetIdleTimer();
      setScrollVelocity(e.velocity);
      
      const dir = e.direction === 1 ? 'down' : (e.direction === -1 ? 'up' : 'down');
      setScrollDirection(dir);

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(progress);
    };

    lenis.on('scroll', handleScroll);

    // 3. Mouse Movement tracking
    const handleMouseMove = (e) => {
      resetIdleTimer();
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);

    // Clean up
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // 3. Centralized route and hover speaker system
  useEffect(() => {
    if (isChatOpen) {
      setMascotSpeech("");
      return;
    }

    if (mascotHovered) {
      const timer = setTimeout(() => {
        setMascotSpeech("Ask the Rightcon AI");
        setMascotPose('wave');
        setMascotEmotion('friendly');
      }, 350); // Snappy hover wave reaction
      return () => clearTimeout(timer);
    } else {
      setMascotSpeech("");
      setMascotPose('idle');
      setMascotEmotion('calm');
    }
  }, [location.pathname, mascotHovered, isChatOpen]);

  useEffect(() => {
    if (lenisRef.current) {
      if (menuOpen || searchOpen || isChatOpen) {
        lenisRef.current.stop();
      } else if (location.pathname !== '/' || heroState === 'EXPLORE') {
        lenisRef.current.start();
      } else {
        lenisRef.current.stop();
      }
    }
  }, [menuOpen, searchOpen, isChatOpen, location.pathname, heroState]);

  return (
    <ScrollContext.Provider value={{
      scrollProgress,
      scrollVelocity,
      scrollDirection,
      activeScene,
      mousePos,
      isMobile,
      isTablet,
      isDesktop,
      screenSize,
      pageIdle,
      activeInteraction,
      lenisRef,
      
      // V2 mascot/layout states
      mascotPose,
      hoveredProject,
      hoveredService,
      currentTrustTab,
      formFieldFocus,
      formSuccess,
      isChatOpen,
      setIsChatOpen,
      menuOpen,
      setMenuOpen,
      searchOpen,
      setSearchOpen,
      currentMascotPoint,
      setCurrentMascotPoint,
      mascotSpeech,
      setMascotSpeech,
      mascotHovered,
      setMascotHovered,
      
      // V3 hero states
      heroState,
      setHeroState,

      setMascotPose,
      setMascotEmotion,
      mascotEmotion,
      setHoveredProject,
      setHoveredService,
      setCurrentTrustTab,
      setFormFieldFocus,
      setFormSuccess,
      
      // Intro Context
      introActive,
      introCompleted,
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
      exitTransitionRef,
      
      setActiveScene,
      setActiveInteraction,
      completeIntro,
      replayIntro,
    }}>
      {children}
    </ScrollContext.Provider>
  );
};
