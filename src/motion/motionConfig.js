/**
 * RIGHTCON 5.2.1 — Centralized Motion Design Tokens & Configuration
 * 
 * Defines global motion constants for durations, easings, distances, scales, and stagger intervals.
 * Inspired by luxury architectural craftsmanship (Apple, Tesla, Linear, Stripe, Aman Hotels).
 */

export const MOTION_TOKENS = {
  // Architectural Easing Curves
  easings: {
    architectural: "cubic-bezier(0.22, 1, 0.36, 1)", // Primary architectural curve
    soft: "cubic-bezier(0.16, 1, 0.3, 1)",          // Secondary soft curve
  },

  // Motion Durations (ms)
  durations: {
    fast: 200,      // Micro-interactions, button hover
    normal: 400,    // Standard card reveals, modal transitions
    slow: 600,      // Timeline progress growth, large text reveals
    premium: 800,   // Hero image reveals, section transitions
    page: 400,      // Route transition duration
  },

  // Motion Distances (px)
  distances: {
    small: 8,       // Hover lift, route slide
    medium: 24,     // Text fade-up, section scroll reveal
    large: 40,      // Hero element slide
  },

  // Scale Factors
  scales: {
    cardHover: 1.01,  // Max card scale on hover
    imageHover: 1.03, // Max image scale on hover
    modalInitial: 0.98, // Initial modal scale
  },

  // Stagger Intervals (ms)
  stagger: {
    xs: 60,   // Rapid list items
    sm: 100,  // Standard card grids
    md: 150,  // Feature showcases
    lg: 200,  // Sequential steps
  }
};

/**
 * Returns calculated stagger delay in ms based on index and preset
 */
export function getStaggerDelay(index, preset = "sm") {
  const interval = MOTION_TOKENS.stagger[preset] || MOTION_TOKENS.stagger.sm;
  return `${index * interval}ms`;
}
