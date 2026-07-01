import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const ScrollContext = createContext({
  scrollProgress: 0,
  scrollVelocity: 0,
  scrollDirection: 'down', // 'down' or 'up'
  activeScene: 0,
  mousePos: { x: 0, y: 0 },
  isMobile: false,
  pageIdle: false,
  activeInteraction: null, // { type, element }
  lenisRef: null,
  setActiveScene: () => {},
  setActiveInteraction: () => {},
});

export const useScrollSystem = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [activeScene, setActiveSceneState] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [pageIdle, setPageIdle] = useState(false);
  const [activeInteraction, setActiveInteraction] = useState(null);
  
  const lenisRef = useRef(null);
  const idleTimerRef = useRef(null);

  const setActiveScene = (index) => {
    setActiveSceneState(index);
  };

  // Reset idle timer helper
  const resetIdleTimer = () => {
    setPageIdle(false);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      setPageIdle(true);
    }, 5000); // 5 seconds of inactivity triggers idle state
  };

  useEffect(() => {
    // 1. Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Initialize idle timer
    resetIdleTimer();

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

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Track scroll events
    const handleScroll = (e) => {
      resetIdleTimer();
      setScrollVelocity(e.velocity);
      
      // Determine direction (1 is down, -1 is up)
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
      window.removeEventListener('resize', checkMobile);
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

  return (
    <ScrollContext.Provider value={{
      scrollProgress,
      scrollVelocity,
      scrollDirection,
      activeScene,
      mousePos,
      isMobile,
      pageIdle,
      activeInteraction,
      lenisRef,
      setActiveScene,
      setActiveInteraction,
    }}>
      {children}
    </ScrollContext.Provider>
  );
};
