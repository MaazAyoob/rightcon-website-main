import React from "react";

/**
 * RIGHTCON 4.0 — Clean Photorealistic Metallic Elements Collection (No White Border Artifacts)
 * 
 * Smooth liquid chrome, 24k polished gold, brushed stainless steel, and titanium gunmetal.
 * Zero harsh white outline strokes or border artifacts.
 */

export function MetallicFilterDefs({ idPrefix = "r33" }) {
  return (
    <defs>
      {/* 1. Liquid Chrome Gradient */}
      <linearGradient id={`${idPrefix}-chrome`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="20%" stopColor="#e2e8f0" />
        <stop offset="40%" stopColor="#475569" />
        <stop offset="60%" stopColor="#94a3b8" />
        <stop offset="85%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>

      {/* 2. Stainless Steel Gradient */}
      <linearGradient id={`${idPrefix}-steel`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#e2e8f0" />
        <stop offset="75%" stopColor="#475569" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>

      {/* 3. Titanium Dark Gunmetal */}
      <linearGradient id={`${idPrefix}-titanium`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="30%" stopColor="#1e293b" />
        <stop offset="60%" stopColor="#94a3b8" />
        <stop offset="85%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>

      {/* 4. 24K Champagne Gold */}
      <linearGradient id={`${idPrefix}-champagne`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="25%" stopColor="#ffffff" />
        <stop offset="55%" stopColor="#ca8a04" />
        <stop offset="80%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>

      {/* Natural Specular Lighting Filter */}
      <filter id={`${idPrefix}-specular`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
        <feSpecularLighting
          in="blur"
          surfaceScale="6"
          specularConstant="1.8"
          specularExponent="45"
          lightingColor="#ffffff"
          result="specular"
        >
          <feDistantLight azimuth={45} elevation={55} />
        </feSpecularLighting>
        <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
      </filter>
    </defs>
  );
}

/* =====================================================
   CLEAN METALLIC SCULPTURES (NO HARSH WHITE BORDERS)
   ===================================================== */

/** 1. Polished Steel Architectural Ribbon */
export function PolishedRibbon({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-70 dark:opacity-85 z-0 ${className}`}>
      <svg viewBox="0 0 800 400" className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]">
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
          strokeWidth="6"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}

/** 2. Stainless Steel Structural Beam */
export function StructuralBeam({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none w-full relative opacity-80 dark:opacity-95 z-0 my-12 ${className}`}>
      <svg viewBox="0 0 1200 40" className="w-full h-10 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.2)]">
        <MetallicFilterDefs idPrefix="beam" />
        <rect x="0" y="0" width="1200" height="7" fill="url(#beam-steel)" filter="url(#beam-specular)" />
        <rect x="0" y="15" width="1200" height="10" fill="url(#beam-chrome)" />
        <rect x="0" y="33" width="1200" height="7" fill="url(#beam-steel)" filter="url(#beam-specular)" />
        <circle cx="200" cy="20" r="4" fill="url(#beam-champagne)" />
        <circle cx="600" cy="20" r="4" fill="url(#beam-champagne)" />
        <circle cx="1000" cy="20" r="4" fill="url(#beam-champagne)" />
      </svg>
    </div>
  );
}

/** 3. Curved Chrome Architectural Sculpture */
export function CurvedSculpture({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-70 dark:opacity-85 z-0 ${className}`}>
      <svg viewBox="0 0 500 500" className="w-full h-full filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
        <MetallicFilterDefs idPrefix="curved" />
        <ellipse
          cx="250"
          cy="250"
          rx="210"
          ry="140"
          fill="none"
          stroke="url(#curved-chrome)"
          strokeWidth="36"
          filter="url(#curved-specular)"
        />
        <ellipse
          cx="250"
          cy="250"
          rx="180"
          ry="110"
          fill="none"
          stroke="url(#curved-champagne)"
          strokeWidth="6"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}

/** 4. Brushed Aluminium Geometric Frame */
export function GeometricFrame({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-70 dark:opacity-85 z-0 ${className}`}>
      <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
        <MetallicFilterDefs idPrefix="frame" />
        <path
          d="M 20 20 L 280 20 L 280 280 L 20 280 Z M 50 50 L 50 250 L 250 250 L 250 50 Z"
          fill="url(#frame-steel)"
          filter="url(#frame-specular)"
        />
        <rect x="22" y="22" width="256" height="256" fill="none" stroke="url(#frame-champagne)" strokeWidth="3" opacity="0.8" />
      </svg>
    </div>
  );
}

/** 5. Floating Metallic Wall Panel */
export function WallPanel({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-70 dark:opacity-85 z-0 ${className}`}>
      <svg viewBox="0 0 400 600" className="w-full h-full">
        <MetallicFilterDefs idPrefix="panel" />
        <rect x="20" y="20" width="360" height="560" rx="8" fill="url(#panel-titanium)" filter="url(#panel-specular)" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="url(#panel-chrome)" strokeWidth="3" opacity="0.7" />
        <line x1="20" y1="400" x2="380" y2="400" stroke="url(#panel-chrome)" strokeWidth="3" opacity="0.7" />
      </svg>
    </div>
  );
}

/** 6. Chrome Architectural Fins */
export function ArchitecturalFins({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-70 dark:opacity-85 z-0 ${className}`}>
      <svg viewBox="0 0 200 600" className="w-full h-full">
        <MetallicFilterDefs idPrefix="fins" />
        <rect x="20" y="0" width="18" height="600" fill="url(#fins-chrome)" filter="url(#fins-specular)" />
        <rect x="70" y="0" width="18" height="600" fill="url(#fins-steel)" filter="url(#fins-specular)" />
        <rect x="120" y="0" width="18" height="600" fill="url(#fins-chrome)" filter="url(#fins-specular)" />
        <rect x="170" y="0" width="18" height="600" fill="url(#fins-steel)" filter="url(#fins-specular)" />
      </svg>
    </div>
  );
}

/** 7. Stainless Steel Arc */
export function StainlessArc({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-70 dark:opacity-85 z-0 ${className}`}>
      <svg viewBox="0 0 600 600" className="w-full h-full">
        <MetallicFilterDefs idPrefix="arc" />
        <path
          d="M 50 550 A 450 450 0 0 1 550 50"
          fill="none"
          stroke="url(#arc-chrome)"
          strokeWidth="38"
          strokeLinecap="round"
          filter="url(#arc-specular)"
        />
      </svg>
    </div>
  );
}

/** 8. Polished Metal Monolith */
export function PolishedMonolith({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-70 dark:opacity-85 z-0 ${className}`}>
      <svg viewBox="0 0 180 500" className="w-full h-full">
        <MetallicFilterDefs idPrefix="mono" />
        <polygon points="20,480 90,20 160,480" fill="url(#mono-titanium)" filter="url(#mono-specular)" />
        <line x1="90" y1="20" x2="90" y2="480" stroke="url(#mono-champagne)" strokeWidth="3" opacity="0.9" />
      </svg>
    </div>
  );
}

/** 9. Intersecting Ring */
export function IntersectingRing({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-70 dark:opacity-85 z-0 ${className}`}>
      <svg viewBox="0 0 450 450" className="w-full h-full filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]">
        <MetallicFilterDefs idPrefix="ring" />
        <circle cx="225" cy="225" r="180" fill="none" stroke="url(#ring-chrome)" strokeWidth="42" filter="url(#ring-specular)" />
        <circle cx="225" cy="225" r="156" fill="none" stroke="url(#ring-champagne)" strokeWidth="4" opacity="0.85" />
      </svg>
    </div>
  );
}

/** 10. Abstract Engineered Structural Joint */
export function StructuralJoint({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-70 dark:opacity-85 z-0 ${className}`}>
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <MetallicFilterDefs idPrefix="joint" />
        <circle cx="150" cy="150" r="50" fill="url(#joint-chrome)" filter="url(#joint-specular)" />
        <line x1="150" y1="150" x2="30" y2="30" stroke="url(#joint-steel)" strokeWidth="18" />
        <line x1="150" y1="150" x2="270" y2="30" stroke="url(#joint-steel)" strokeWidth="18" />
        <line x1="150" y1="150" x2="150" y2="280" stroke="url(#joint-steel)" strokeWidth="18" />
      </svg>
    </div>
  );
}

/** 11. Modern Villa Gable Roof & Facade Sculpture (Real Estate Apex Motif - Clean Liquid Chrome & Gold) */
export function VillaGableSculpture({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-75 dark:opacity-90 z-0 ${className}`}>
      <svg viewBox="0 0 500 500" className="w-full h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
        <MetallicFilterDefs idPrefix="villa" />
        
        {/* Outer Heavy Liquid Chrome Gable Roof Chevron */}
        <path
          d="M 50 380 L 250 80 L 450 380 L 400 380 L 250 145 L 100 380 Z"
          fill="url(#villa-chrome)"
          filter="url(#villa-specular)"
        />

        {/* Inner Cantilever Beam in 24k Gold */}
        <path
          d="M 120 340 L 250 160 L 380 340"
          fill="none"
          stroke="url(#villa-champagne)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#villa-specular)"
        />

        {/* Base Structural Steel Foundation Bar */}
        <line x1="30" y1="410" x2="470" y2="410" stroke="url(#villa-steel)" strokeWidth="16" filter="url(#villa-specular)" />
      </svg>
    </div>
  );
}

/** 12. Structural Foundation Column & Beam Grid */
export function FoundationGridSculpture({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-70 dark:opacity-85 z-0 ${className}`}>
      <svg viewBox="0 0 600 400" className="w-full h-full filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
        <MetallicFilterDefs idPrefix="fgrid" />
        
        {/* Steel & Chrome Columns */}
        <rect x="50" y="40" width="22" height="320" fill="url(#fgrid-steel)" filter="url(#fgrid-specular)" />
        <rect x="220" y="40" width="22" height="320" fill="url(#fgrid-chrome)" filter="url(#fgrid-specular)" />
        <rect x="390" y="40" width="22" height="320" fill="url(#fgrid-steel)" filter="url(#fgrid-specular)" />
        <rect x="530" y="40" width="22" height="320" fill="url(#fgrid-chrome)" filter="url(#fgrid-specular)" />

        {/* Gold Slab Beams */}
        <rect x="30" y="60" width="540" height="18" fill="url(#fgrid-champagne)" filter="url(#fgrid-specular)" />
        <rect x="30" y="180" width="540" height="18" fill="url(#fgrid-steel)" filter="url(#fgrid-specular)" />
        <rect x="30" y="320" width="540" height="18" fill="url(#fgrid-champagne)" filter="url(#fgrid-specular)" />
      </svg>
    </div>
  );
}

/** 13. Cantilever Luxury Residence Box Frame */
export function CantileverFrameSculpture({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-75 dark:opacity-90 z-0 ${className}`}>
      <svg viewBox="0 0 500 400" className="w-full h-full filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]">
        <MetallicFilterDefs idPrefix="cbox" />
        
        {/* Liquid Chrome Cantilever Frame */}
        <path
          d="M 60 80 L 440 40 L 440 280 L 60 320 Z M 100 110 L 100 290 L 400 250 L 400 70 Z"
          fill="url(#cbox-chrome)"
          filter="url(#cbox-specular)"
        />

        {/* Gold Vertical Structural Glazing Bar */}
        <line x1="250" y1="58" x2="250" y2="298" stroke="url(#cbox-champagne)" strokeWidth="8" filter="url(#cbox-specular)" />
      </svg>
    </div>
  );
}

/** 14. Real Estate High-Rise & Residence Skyline Lines */
export function TowerSkylineSculpture({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-70 dark:opacity-85 z-0 ${className}`}>
      <svg viewBox="0 0 400 600" className="w-full h-full filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]">
        <MetallicFilterDefs idPrefix="skyline" />
        
        {/* Tower 1 Stainless Steel */}
        <rect x="40" y="120" width="100" height="440" rx="4" fill="url(#skyline-steel)" filter="url(#skyline-specular)" />

        {/* Tower 2 Chrome Apex Tower */}
        <polygon points="180,560 180,40 260,100 260,560" fill="url(#skyline-chrome)" filter="url(#skyline-specular)" />

        {/* Tower 3 Titanium Gunmetal */}
        <rect x="290" y="220" width="80" height="340" rx="4" fill="url(#skyline-titanium)" filter="url(#skyline-specular)" />

        {/* Gold Floor Divisions */}
        <line x1="180" y1="180" x2="260" y2="180" stroke="url(#skyline-champagne)" strokeWidth="4" filter="url(#skyline-specular)" />
        <line x1="180" y1="300" x2="260" y2="300" stroke="url(#skyline-champagne)" strokeWidth="4" filter="url(#skyline-specular)" />
      </svg>
    </div>
  );
}
