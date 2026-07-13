import React, { useEffect, useRef } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import HeroScene from '../components/Scenes/HeroScene';
import BrandStoryScene from '../components/Scenes/BrandStoryScene';
import ProjectsScene from '../components/Scenes/ProjectsScene';
import ProcessScene from '../components/Scenes/ProcessScene';
import ServicesScene from '../components/Scenes/ServicesScene';
import TrustScene from '../components/Scenes/TrustScene';
import AboutScene from '../components/Scenes/AboutScene';
import CtaScene from '../components/Scenes/CtaScene';
import Footer from '../components/UI/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { setActiveScene, setMascotPose } = useScrollSystem();
  const pageRef = useRef();

  useEffect(() => {
    // Reset scroll to top
    window.scrollTo(0, 0);
    setActiveScene(1);
    setMascotPose('idle');

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

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={pageRef} className="w-full flex flex-col bg-white selection:bg-primary selection:text-white">
      
      {/* Scene 1: Hero */}
      <div className="journey-scene w-full">
        <HeroScene />
      </div>

      {/* Scene 2: Brand Story / Vision */}
      <div className="journey-scene w-full" data-nav-theme="light">
        <BrandStoryScene />
      </div>

      {/* Scene 3: Projects */}
      <div className="journey-scene w-full">
        <ProjectsScene />
      </div>

      {/* Scene 4: Building Process */}
      <div className="journey-scene w-full" data-nav-theme="light">
        <ProcessScene />
      </div>

      {/* Scene 5: Services / Craftsmanship */}
      <div className="journey-scene w-full" data-nav-theme="light">
        <ServicesScene />
      </div>

      {/* Scene 6: Trust */}
      <div className="journey-scene w-full" data-nav-theme="light">
        <TrustScene />
      </div>

      {/* Scene 7: About / People */}
      <div className="journey-scene w-full" data-nav-theme="light">
        <AboutScene />
      </div>

      {/* Scene 8: CTA / Begin Journey */}
      <div className="journey-scene w-full">
        <CtaScene />
      </div>

      {/* Footer details */}
      <Footer />

    </div>
  );
}
