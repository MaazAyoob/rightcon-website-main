import React, { useState, useEffect } from "react";

/**
 * RIGHTCON 3.3 — Architectural Metallic Elements Collection
 * 
 * 10 Custom Architectural Metallic Sculptures inspired by world-class modern architecture
 * (Apple Stores, Foster + Partners, Zaha Hadid, Louis Vuitton Architecture, BMW Experience Centers).
 * 
 * Materials: Polished Stainless Steel, Brushed Aluminium, Liquid Chrome, Titanium, Dark Gunmetal.
 * Features SVG specular lighting filters & subtle interactive mouse-light tracking.
 */

export function useMouseLight() {
  const [lightPos, setLightPos] = useState({ azimuth: 45, elevation: 55 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const normY = (e.clientY / innerHeight) * 2 - 1;

      // Subtle light shift
      setLightPos({
        azimuth: 45 + normX * 25,
        elevation: 55 - normY * 15
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return lightPos;
}

export function MetallicFilterDefs({ idPrefix = "r33" }) {
  const { azimuth, elevation } = useMouseLight();

  return (
    <defs>
      {/* 1. Liquid Chrome Gradient */}
      <linearGradient id={`${idPrefix}-chrome`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="20%" stopColor="#e2e8f0" />
        <stop offset="40%" stopColor="#475569" />
        <stop offset="65%" stopColor="#cbd5e1" />
        <stop offset="85%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>

      {/* 2. Brushed Steel Gradient */}
      <linearGradient id={`${idPrefix}-steel`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="30%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#cbd5e1" />
        <stop offset="70%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>

      {/* 3. Titanium Dark Gunmetal */}
      <linearGradient id={`${idPrefix}-titanium`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="30%" stopColor="#1e293b" />
        <stop offset="60%" stopColor="#64748b" />
        <stop offset="85%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>

      {/* 4. Champagne Gold Steel */}
      <linearGradient id={`${idPrefix}-champagne`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="30%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#ca8a04" />
        <stop offset="85%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>

      {/* Interactive 3D Specular Light Filter */}
      <filter id={`${idPrefix}-specular`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
        <feSpecularLighting
          in="blur"
          surfaceScale="7"
          specularConstant="1.5"
          specularExponent="45"
          lightingColor="#ffffff"
          result="specular"
        >
          <feDistantLight azimuth={azimuth} elevation={elevation} />
        </feSpecularLighting>
        <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
      </filter>
    </defs>
  );
}

/* =====================================================
   10 CUSTOM ARCHITECTURAL METALLIC OBJECTS
   ===================================================== */

/** 1. Polished Steel Architectural Ribbon (Zaha Hadid inspired) */
export function PolishedRibbon({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-25 dark:opacity-35 z-0 ${className}`}>
      <svg viewBox="0 0 800 400" className="w-full h-full animate-metallic-float">
        <MetallicFilterDefs idPrefix="ribbon" />
        <path
          d="M -50 350 C 200 100, 450 380, 850 50 L 850 90 C 470 420, 220 140, -50 390 Z"
          fill="url(#ribbon-chrome)"
          filter="url(#ribbon-specular)"
        />
        <path
          d="M 50 300 C 250 120, 480 340, 750 80"
          fill="none"
          stroke="url(#ribbon-champagne)"
          strokeWidth="3"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

/** 2. Stainless Steel Structural Beam (I-Beam section joint) */
export function StructuralBeam({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none w-full relative opacity-30 dark:opacity-40 z-0 my-12 ${className}`}>
      <svg viewBox="0 0 1200 40" className="w-full h-10 animate-metallic-shimmer">
        <MetallicFilterDefs idPrefix="beam" />
        {/* Top flange */}
        <rect x="0" y="0" width="1200" height="6" fill="url(#beam-steel)" filter="url(#beam-specular)" />
        {/* Web center line */}
        <rect x="0" y="16" width="1200" height="8" fill="url(#beam-chrome)" />
        {/* Bottom flange */}
        <rect x="0" y="34" width="1200" height="6" fill="url(#beam-steel)" filter="url(#beam-specular)" />
        {/* Beveled joint rivets */}
        <circle cx="200" cy="20" r="3" fill="url(#beam-champagne)" />
        <circle cx="600" cy="20" r="3" fill="url(#beam-champagne)" />
        <circle cx="1000" cy="20" r="3" fill="url(#beam-champagne)" />
      </svg>
    </div>
  );
}

/** 3. Curved Chrome Architectural Sculpture (Foster + Partners pavilion curve) */
export function CurvedSculpture({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-25 dark:opacity-35 z-0 ${className}`}>
      <svg viewBox="0 0 500 500" className="w-full h-full animate-metallic-rotate" style={{ animationDuration: "60s" }}>
        <MetallicFilterDefs idPrefix="curved" />
        <ellipse
          cx="250"
          cy="250"
          rx="210"
          ry="140"
          fill="none"
          stroke="url(#curved-chrome)"
          strokeWidth="28"
          filter="url(#curved-specular)"
        />
        <ellipse
          cx="250"
          cy="250"
          rx="180"
          ry="110"
          fill="none"
          stroke="url(#curved-champagne)"
          strokeWidth="4"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

/** 4. Brushed Aluminium Geometric Frame (Apple Store chamfered frame) */
export function GeometricFrame({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-20 dark:opacity-30 z-0 ${className}`}>
      <svg viewBox="0 0 300 300" className="w-full h-full animate-metallic-pulse">
        <MetallicFilterDefs idPrefix="frame" />
        <path
          d="M 20 20 L 280 20 L 280 280 L 20 280 Z M 50 50 L 50 250 L 250 250 L 250 50 Z"
          fill="url(#frame-steel)"
          filter="url(#frame-specular)"
        />
      </svg>
    </div>
  );
}

/** 5. Floating Metallic Wall Panel (Precision titanium panel) */
export function WallPanel({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-20 dark:opacity-30 z-0 ${className}`}>
      <svg viewBox="0 0 400 600" className="w-full h-full animate-metallic-float">
        <MetallicFilterDefs idPrefix="panel" />
        <rect x="20" y="20" width="360" height="560" rx="8" fill="url(#panel-titanium)" filter="url(#panel-specular)" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="url(#panel-chrome)" strokeWidth="2" opacity="0.4" />
        <line x1="20" y1="400" x2="380" y2="400" stroke="url(#panel-chrome)" strokeWidth="2" opacity="0.4" />
      </svg>
    </div>
  );
}

/** 6. Chrome Architectural Fins (Vertical structural louvers) */
export function ArchitecturalFins({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-25 dark:opacity-35 z-0 ${className}`}>
      <svg viewBox="0 0 200 600" className="w-full h-full animate-metallic-shimmer">
        <MetallicFilterDefs idPrefix="fins" />
        <rect x="20" y="0" width="16" height="600" fill="url(#fins-chrome)" filter="url(#fins-specular)" />
        <rect x="70" y="0" width="16" height="600" fill="url(#fins-steel)" filter="url(#fins-specular)" />
        <rect x="120" y="0" width="16" height="600" fill="url(#fins-chrome)" filter="url(#fins-specular)" />
        <rect x="170" y="0" width="16" height="600" fill="url(#fins-steel)" filter="url(#fins-specular)" />
      </svg>
    </div>
  );
}

/** 7. Stainless Steel Arc (Sweeping geometric arc) */
export function StainlessArc({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-20 dark:opacity-30 z-0 ${className}`}>
      <svg viewBox="0 0 600 600" className="w-full h-full animate-metallic-float">
        <MetallicFilterDefs idPrefix="arc" />
        <path
          d="M 50 550 A 450 450 0 0 1 550 50"
          fill="none"
          stroke="url(#arc-chrome)"
          strokeWidth="32"
          strokeLinecap="round"
          filter="url(#arc-specular)"
        />
      </svg>
    </div>
  );
}

/** 8. Polished Metal Monolith (Sleek gunmetal column) */
export function PolishedMonolith({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-20 dark:opacity-30 z-0 ${className}`}>
      <svg viewBox="0 0 180 500" className="w-full h-full animate-metallic-pulse">
        <MetallicFilterDefs idPrefix="mono" />
        <polygon points="20,480 90,20 160,480" fill="url(#mono-titanium)" filter="url(#mono-specular)" />
        <line x1="90" y1="20" x2="90" y2="480" stroke="url(#mono-champagne)" strokeWidth="2" opacity="0.8" />
      </svg>
    </div>
  );
}

/** 9. Intersecting Ring (Torus ring weaving behind images) */
export function IntersectingRing({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-25 dark:opacity-35 z-0 ${className}`}>
      <svg viewBox="0 0 450 450" className="w-full h-full animate-metallic-rotate" style={{ animationDuration: "50s" }}>
        <MetallicFilterDefs idPrefix="ring" />
        <circle cx="225" cy="225" r="180" fill="none" stroke="url(#ring-chrome)" strokeWidth="36" filter="url(#ring-specular)" />
      </svg>
    </div>
  );
}

/** 10. Abstract Engineered Structural Joint (Node joint with connecting struts) */
export function StructuralJoint({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-25 dark:opacity-35 z-0 ${className}`}>
      <svg viewBox="0 0 300 300" className="w-full h-full animate-metallic-float">
        <MetallicFilterDefs idPrefix="joint" />
        {/* Node sphere */}
        <circle cx="150" cy="150" r="45" fill="url(#joint-chrome)" filter="url(#joint-specular)" />
        {/* Struts */}
        <line x1="150" y1="150" x2="30" y2="30" stroke="url(#joint-steel)" strokeWidth="16" />
        <line x1="150" y1="150" x2="270" y2="30" stroke="url(#joint-steel)" strokeWidth="16" />
        <line x1="150" y1="150" x2="150" y2="280" stroke="url(#joint-steel)" strokeWidth="16" />
      </svg>
    </div>
  );
}
