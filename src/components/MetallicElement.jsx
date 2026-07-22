import React from "react";

/**
 * RIGHTCON 5.1 — Architectural Material Component System
 * 
 * Functional architectural elements:
 * - ArchitecturalDivider: Titanium shadow gap & stainless steel expansion joint transition
 * - MountedFrame: Architectural metallic photo frame reveal
 */
export default function MetallicElement({ variant = "beam-divider", className = "", children }) {
  switch (variant) {
    case "beam-divider":
    case "shadow-gap":
      return (
        <div className={`w-full my-8 ${className}`}>
          <div className="architectural-shadow-gap" />
        </div>
      );

    case "mounted-frame":
      return (
        <div className={`mounted-photo-frame ${className}`}>
          {children}
        </div>
      );

    // Legacy decorative variants return null to ensure ZERO floating chrome blobs or abstract sculptures render
    case "hero-sculpture":
    case "villa-gable":
    case "foundation-grid":
    case "cantilever-frame":
    case "tower-skyline":
    case "signature-arc":
    case "cta-frame":
    case "footer-brand":
    case "intersecting-ring":
    case "architectural-fins":
    case "curved-sculpture":
    default:
      return null;
  }
}
