/**
 * RIGHTCON 3.2 — Metallic Design System Tokens
 * 
 * Centralized design tokens for polished chrome, stainless steel,
 * architectural lighting presets, SVG filters, animations, and opacity scales.
 */

export const METALLIC_GRADIENTS = {
  liquidChrome: "linear-gradient(135deg, #e2e8f0 0%, #ffffff 25%, #64748b 45%, #cbd5e1 65%, #ffffff 85%, #94a3b8 100%)",
  brushedSteel: "linear-gradient(180deg, #f8fafc 0%, #cbd5e1 30%, #94a3b8 50%, #e2e8f0 70%, #ffffff 100%)",
  champagneChrome: "linear-gradient(135deg, #fef08a 0%, #ffffff 30%, #ca8a04 55%, #fef08a 80%, #a16207 100%)",
  obsidianSteel: "linear-gradient(135deg, #334155 0%, #64748b 30%, #1e293b 60%, #475569 85%, #0f172a 100%)"
};

export const METALLIC_OPACITY = {
  lightMode: {
    ambient: 0.18,
    highlight: 0.28,
    border: 0.35
  },
  darkMode: {
    ambient: 0.22,
    highlight: 0.35,
    border: 0.45
  }
};

export const METALLIC_ZINDEX = {
  background: 0,
  accentOverlay: 1,
  contentLayer: 10
};

export const METALLIC_ANIMATIONS = {
  floatSlow: "floatMetallic 32s ease-in-out infinite alternate",
  rotateSlow: "rotateMetallic 40s linear infinite",
  shimmerSlow: "shimmerMetallic 25s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate",
  pulseSlow: "pulseMetallic 20s ease-in-out infinite alternate"
};

export const METALLIC_RESPONSIVE = {
  heroSculpture: "w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[580px] lg:h-[580px]",
  signatureArc: "w-[300px] h-[150px] sm:w-[500px] sm:h-[250px] lg:w-[700px] lg:h-[350px]",
  beamDivider: "w-full h-[2px] sm:h-[3px]",
  ctaFrame: "w-[120px] h-[120px] sm:w-[200px] sm:h-[200px]",
  footerBrand: "w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]"
};

export const SVG_METALLIC_FILTERS = {
  chromeSpec: {
    id: "rightcon-chrome-specular",
    elevation: 60,
    azimuth: 45,
    surfaceScale: 5,
    specularConstant: 1.2,
    specularExponent: 35
  },
  steelSoft: {
    id: "rightcon-steel-soft",
    elevation: 40,
    azimuth: 135,
    surfaceScale: 3,
    specularConstant: 0.8,
    specularExponent: 20
  }
};
