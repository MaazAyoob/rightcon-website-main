import React, { useEffect, useState, useRef } from 'react';
import { ScrollProvider, useScrollSystem } from './context/ScrollContext';
import MascotCanvas from './components/Mascot/MascotCanvas';
import HeroScene from './components/Scenes/HeroScene';
import BrandStoryScene from './components/Scenes/BrandStoryScene';
import ProjectsScene from './components/Scenes/ProjectsScene';
import ProcessScene from './components/Scenes/ProcessScene';
import ServicesScene from './components/Scenes/ServicesScene';
import TrustScene from './components/Scenes/TrustScene';
import AboutScene from './components/Scenes/AboutScene';
import CtaScene from './components/Scenes/CtaScene';
import Footer from './components/UI/Footer';
import ConversationPanel from './components/UI/ConversationPanel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function MainJourney() {
  const { 
    setActiveScene, 
    isMobile,
    heroState
  } = useScrollSystem();
  
  const containerRef = useRef();

  // Mouse trail for custom luxury cursor
  const cursorDotRef = useRef();
  const cursorGlowRef = useRef();

  useEffect(() => {
    // Set active scene initially
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
      
      if (cursorDotRef.current) {
        gsap.to(cursorDotRef.current, {
          x: clientX - 8,
          y: clientY - 8,
          duration: 0.1,
          ease: "power2.out"
        });
      }
      
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
  }, [setActiveScene, isMobile]);

  return (
    <div className="relative text-white min-h-screen bg-[#050505] overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#050505]" ref={containerRef}>
      
      {/* 1. Custom Editorial Cursor (Desktop Only) */}
      {!isMobile && (
        <>
          <div 
            ref={cursorDotRef} 
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[#D4AF37] pointer-events-none z-[9999] mix-blend-mode-difference"
          ></div>
          <div 
            ref={cursorGlowRef} 
            className="fixed top-0 left-0 w-24 h-24 rounded-full pointer-events-none z-[9998] border border-[#D4AF37]/10 -translate-x-12 -translate-y-12"
          ></div>
        </>
      )}

      {/* 2. 3D WebGL Canvas Overlay (Renders immediately) */}
      <MascotCanvas />

      {/* 2.5 Conversational AI Panel Interface */}
      <ConversationPanel />

      {/* 3. Journey Scenes Stack */}
      <main className="relative z-10 w-full flex flex-col">
        {/* Scene 1: Hero */}
        <div className="journey-scene w-full">
          <HeroScene />
        </div>

        {/* Scene 2: Brand Story / Vision */}
        <div className="journey-scene w-full">
          <BrandStoryScene />
        </div>

        {/* Scene 3: Projects */}
        <div className="journey-scene w-full">
          <ProjectsScene />
        </div>

        {/* Scene 4: Building Process */}
        <div className="journey-scene w-full">
          <ProcessScene />
        </div>

        {/* Scene 5: Services / Craftsmanship */}
        <div className="journey-scene w-full">
          <ServicesScene />
        </div>

        {/* Scene 6: Trust */}
        <div className="journey-scene w-full">
          <TrustScene />
        </div>

        {/* Scene 7: About / People */}
        <div className="journey-scene w-full">
          <AboutScene />
        </div>

        {/* Scene 8: CTA / Begin Journey */}
        <div className="journey-scene w-full">
          <CtaScene />
        </div>

        {/* Footer details */}
        <Footer />
      </main>

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

