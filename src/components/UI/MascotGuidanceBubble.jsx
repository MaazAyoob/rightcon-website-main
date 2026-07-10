import React, { useEffect, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

export default function MascotGuidanceBubble() {
  const {
    currentMascotPoint,
    mascotSpeech,
    isChatOpen,
    introActive,
    isMobile,
  } = useScrollSystem();

  const [displayText, setDisplayText] = useState("");
  const [visible, setVisible] = useState(false);

  // Animate speech bubble text when mascotSpeech changes
  useEffect(() => {
    if (isChatOpen || introActive || isMobile || !mascotSpeech) {
      setVisible(false);
      return;
    }

    setVisible(true);
    setDisplayText("");

    let index = 0;
    const text = mascotSpeech;
    const speed = 20; // Snappy typing

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [mascotSpeech, isChatOpen, introActive, isMobile]);

  if (!visible) return null;

  // Coordinate-based positioning classes
  let positionClass = "";
  switch (currentMascotPoint) {
    case 'hero_right':
      positionClass = "bottom-[220px] right-8 md:right-16";
      break;
    case 'hero_left':
      positionClass = "bottom-[220px] left-8 md:left-16";
      break;
    case 'hero_high':
      positionClass = "top-[180px] right-8 md:right-16";
      break;
    case 'nav_observe':
      positionClass = "top-[180px] left-8 md:left-16";
      break;
    case 'about_side':
    case 'trust_corner':
    case 'process_guide':
    case 'footer_farewell':
    case 'projects_right':
      positionClass = "bottom-[240px] right-8 md:right-16";
      break;
    case 'testimonials':
    case 'estimator_side':
    case 'process_side':
    case 'cta_side':
    case 'projects_left':
      positionClass = "bottom-[240px] left-8 md:left-16";
      break;
    default:
      positionClass = "bottom-36 right-8";
  }

  return (
    <div
      className={`fixed z-[1050] ${positionClass} px-4 py-2 rounded-full border border-accent/35 select-none transition-all duration-300 animate-fade-in text-white font-mono text-[9px] bg-charcoal/90 backdrop-blur-md shadow-lg flex items-center gap-2`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
      <span>{displayText}</span>
    </div>
  );
}
