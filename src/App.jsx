import React, { useEffect, useState, useRef } from 'react';
import { ScrollProvider, useScrollSystem } from './context/ScrollContext';
import MascotCanvas from './components/Mascot/MascotCanvas';
import LoadingScene from './components/Scenes/LoadingScene';
import HeroScene from './components/Scenes/HeroScene';
import AboutScene from './components/Scenes/AboutScene';
import ProjectsScene from './components/Scenes/ProjectsScene';
import BeliefsScene from './components/Scenes/BeliefsScene';
import AmenitiesScene from './components/Scenes/AmenitiesScene';
import FaqScene from './components/Scenes/FaqScene';
import CtaScene from './components/Scenes/CtaScene';
import Footer from './components/UI/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function MainJourney() {
  const { setActiveScene, isMobile } = useScrollSystem();
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef();

  // Mouse trail for custom luxury cursor
  const cursorDotRef = useRef();
  const cursorGlowRef = useRef();

  useEffect(() => {
    if (!loaded) {
      setActiveScene(0); // Loading scene active
      return;
    }

    // Set Hero scene active initially
    setActiveScene(1);

    // Track scroll positions of scenes to update Mascot targeting coordinates
    const scenes = gsap.utils.toArray('.journey-scene');
    const triggers = [];

    scenes.forEach((scene, index) => {
      const trigger = ScrollTrigger.create({
        trigger: scene,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) {
            // Scene index mappings: 
            // 0: Loading, 1: Hero, 2: About, 3: Projects, 4: Beliefs, 5: Amenities, 6: FAQ, 7: CTA
            setActiveScene(index + 1);
          }
        }
      });
      triggers.push(trigger);
    });

    // Custom cursor movement handler
    const moveCursor = (e) => {
      if (isMobile) return;
      
      const { clientX, clientY } = e;
      
      // Fine dot trail (mix-blend-mode difference)
      if (cursorDotRef.current) {
        gsap.to(cursorDotRef.current, {
          x: clientX - 8,
          y: clientY - 8,
          duration: 0.1,
          ease: "power2.out"
        });
      }
      
      // Outer light glowing circle
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      triggers.forEach(t => t.kill());
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [loaded, setActiveScene, isMobile]);

  return (
    <div className="relative text-white min-h-screen bg-[#12110f] overflow-x-hidden selection:bg-bronze selection:text-[#12110f]" ref={containerRef}>
      
      {/* 1. Custom Editorial Cursor (Desktop Only) */}
      {!isMobile && (
        <>
          <div 
            ref={cursorDotRef} 
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-bronze pointer-events-none z-[9999] mix-blend-mode-difference"
          ></div>
          <div 
            ref={cursorGlowRef} 
            className="fixed top-0 left-0 w-24 h-24 rounded-full pointer-events-none z-[9998] border border-bronze/10 -translate-x-12 -translate-y-12"
          ></div>
        </>
      )}

      {/* 2. Loading overlay */}
      <LoadingScene onLoaded={() => setLoaded(true)} />

      {/* 3. 3D WebGL Canvas Overlay */}
      {loaded && <MascotCanvas />}

      {/* 4. Journey Scenes Stack */}
      {loaded && (
        <main className="relative z-10 w-full flex flex-col">
          {/* Scene 1: Hero */}
          <div className="journey-scene w-full">
            <HeroScene />
          </div>

          {/* Scene 2: About */}
          <div className="journey-scene w-full">
            <AboutScene />
          </div>

          {/* Scene 3: Projects (pinned horizontal scroll in itself) */}
          <div className="journey-scene w-full">
            <ProjectsScene />
          </div>

          {/* Scene 4: Beliefs */}
          <div className="journey-scene w-full">
            <BeliefsScene />
          </div>

          {/* Scene 5: Amenities (pinned slide timeline in itself) */}
          <div className="journey-scene w-full">
            <AmenitiesScene />
          </div>

          {/* Scene 6: FAQ Accordion */}
          <div className="journey-scene w-full">
            <FaqScene />
          </div>

          {/* Scene 7: Inquire CTA */}
          <div className="journey-scene w-full">
            <CtaScene />
          </div>

          {/* Footer details */}
          <Footer />
        </main>
      )}

    </div>
  );
}

export default function App() {
  return (
    <ScrollProvider>
      <MainJourney />
    </ScrollProvider>
  );
}
