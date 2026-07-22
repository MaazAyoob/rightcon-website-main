import React from "react";

/**
 * BrandLogo — uses the real Rightcon Logo.png and Favicon.png files.
 *
 * Props:
 *   light    {boolean} — true = on dark background (navbar / footer)
 *   height   {number}  — rendered height in px (default 56)
 */
export default function BrandLogo({ light = false, height = 48, className = "" }) {
  return (
    <img
      src="/Logo.png"
      alt="Rightcon — Building Peace of Mind"
      className={className}
      style={{
        height: `${height}px`,
        width: "auto",
        maxWidth: "360px",
        display: "block",
        objectFit: "contain",
        mixBlendMode: light ? "screen" : "normal",
      }}
    />
  );
}
