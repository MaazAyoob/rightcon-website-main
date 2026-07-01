import React, { useEffect, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

const LOADING_STEPS = [
  "INITIALIZING GEOMECHANICAL ENGINE...",
  "MAPPING BANGALORE SOIL PROFILES...",
  "RESOLVING LOD 400 BIM CLASHES...",
  "CALIBRATING ARCHITECTURAL BLUEPRINTS...",
  "ASSEMBLING CERAMIC MASCOT CORE...",
  "ESTABLISHING SECURE DEED REGISTRY...",
  "SYSTEM ONLINE"
];

export default function LoadingScene({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const { lenisRef } = useScrollSystem();

  useEffect(() => {
    // Lock scroll during loading
    if (lenisRef.current) {
      lenisRef.current.stop();
    }

    const duration = 2400; // 2.4 seconds total loading
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [lenisRef]);

  // Rotate text descriptions during loading
  useEffect(() => {
    if (progress >= 100) {
      setStepIndex(LOADING_STEPS.length - 1);
      // Wait for user to absorb "System Online"
      const fadeTimer = setTimeout(() => {
        setVisible(false);
        if (lenisRef.current) {
          lenisRef.current.start();
        }
        if (onLoaded) {
          onLoaded();
        }
      }, 600);
      return () => clearTimeout(fadeTimer);
    }

    const currentStep = Math.floor((progress / 100) * (LOADING_STEPS.length - 1));
    setStepIndex(currentStep);
  }, [progress, onLoaded, lenisRef]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-[#12110f] z-50 flex flex-col justify-between p-12 select-none pointer-events-auto">
      {/* Blueprint background decoration */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>

      {/* Top row metadata */}
      <div className="flex justify-between items-start font-mono text-[9px] text-stone tracking-[0.2em] relative z-10">
        <div>RIGHTCON COLLECTIVE / TECH SPEC v2.0</div>
        <div>UTC+05:30 / 12.9716° N, 77.5946° E</div>
      </div>

      {/* Center Logo Assembly */}
      <div className="flex flex-col items-center justify-center relative z-10 flex-grow">
        {/* Abstract floating cubes decoration */}
        <div className="w-16 h-16 border border-stone-light/10 relative mb-8 flex items-center justify-center">
          <div className="absolute w-8 h-8 border border-bronze/40 animate-spin" style={{ animationDuration: '6s' }}></div>
          <div className="absolute w-12 h-12 border border-holo-cyan/20 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-light tracking-[0.25em] text-white">
          RIGHTCON
        </h1>
        <div className="mt-4 font-mono text-[9px] text-stone tracking-[0.4em] uppercase">
          Structural Science & Bespoke Estates
        </div>
      </div>

      {/* Bottom status feeds */}
      <div className="flex flex-col gap-4 max-w-lg relative z-10">
        <div className="flex justify-between items-end font-mono text-[10px] tracking-wider text-stone-light">
          <span className="text-[#00f3ff] drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
            {LOADING_STEPS[stepIndex]}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#00f3ff] transition-all duration-75"
            style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(0, 243, 255, 0.8)' }}
          ></div>
        </div>

        <div className="font-mono text-[8px] text-stone tracking-widest leading-relaxed">
          ESTIMATED TIME TO FULL RESOLUTION: {Math.max(0, (1 - progress/100) * 2.4).toFixed(1)}s <br />
          COMPRESSIVE STRENGTH MIN: M40 / REBAR PROFILE: Fe550D
        </div>
      </div>
    </div>
  );
}
