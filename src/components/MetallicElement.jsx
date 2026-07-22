import React from "react";
import {
  CurvedSculpture,
  PolishedRibbon,
  StructuralBeam,
  GeometricFrame,
  PolishedMonolith,
  IntersectingRing,
  ArchitecturalFins,
  StainlessArc
} from "./ArchitecturalMetallicCollection";

/**
 * RIGHTCON 3.3 — Architectural Metallic Elements Wrapper
 */
export default function MetallicElement({ variant = "hero-sculpture", className = "" }) {
  switch (variant) {
    case "hero-sculpture":
      return (
        <CurvedSculpture
          className={`right-0 top-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[640px] lg:h-[640px] ${className}`}
        />
      );

    case "signature-arc":
      return (
        <PolishedRibbon
          className={`left-0 top-1/3 -translate-y-1/2 w-[600px] h-[300px] sm:w-[900px] sm:h-[450px] lg:w-[1200px] lg:h-[600px] ${className}`}
        />
      );

    case "beam-divider":
      return <StructuralBeam className={className} />;

    case "cta-frame":
      return (
        <GeometricFrame
          className={`top-6 right-6 w-[160px] h-[160px] sm:w-[260px] sm:h-[260px] ${className}`}
        />
      );

    case "footer-brand":
      return (
        <PolishedMonolith
          className={`bottom-0 right-10 w-[120px] h-[340px] sm:w-[180px] sm:h-[480px] ${className}`}
        />
      );

    case "intersecting-ring":
      return (
        <IntersectingRing
          className={`right-10 top-10 w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] ${className}`}
        />
      );

    case "architectural-fins":
      return (
        <ArchitecturalFins
          className={`left-0 top-0 w-[100px] h-full ${className}`}
        />
      );

    default:
      return null;
  }
}

