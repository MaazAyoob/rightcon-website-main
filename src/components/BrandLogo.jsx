import React from "react";

export default function BrandLogo({ light = false, showText = true, size = "md" }) {
  const iconBaseColor = "#0000AA";
  const iconAccentColor = "#0022FF";
  const windowColor = "#FFFFFF";
  const textColor = light ? "text-white" : "text-charcoal";

  const sizeMap = {
    sm: { icon: "h-6 w-6", text: "text-sm", sub: "text-[7px]" },
    md: { icon: "h-8 w-8", text: "text-base", sub: "text-[8px]" },
    lg: { icon: "h-10 w-10", text: "text-lg", sub: "text-[9px]" },
  };
  const s = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center space-x-2">
      {/* Hexagonal 'R' Brand Icon — always brand blue */}
      <svg
        viewBox="0 0 100 100"
        className={`${s.icon} flex-shrink-0`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left vertical bar */}
        <polygon points="10,28 22,35 22,81 10,74" fill={iconBaseColor} />

        {/* Top-left bevel — brighter accent */}
        <polygon points="10,28 50,5 50,19" fill={iconAccentColor} />
        <polygon points="10,28 50,19 22,35" fill={iconBaseColor} />

        {/* Outer hexagon right wall */}
        <path d="M 50 5 L 90 28 L 90 74 L 78 81 L 78 35 L 50 19 Z" fill={iconBaseColor} />

        {/* Bridge from left bar to house */}
        <path d="M 22 42 L 40 47 L 40 57 L 22 50 Z" fill={iconBaseColor} />

        {/* Center house hexagon */}
        <polygon points="40,47 52,40 64,47 64,61 52,68 40,61" fill={iconBaseColor} />

        {/* 4 white windows */}
        <rect x="46" y="49" width="3" height="3" fill={windowColor} />
        <rect x="54" y="49" width="3" height="3" fill={windowColor} />
        <rect x="46" y="56" width="3" height="3" fill={windowColor} />
        <rect x="54" y="56" width="3" height="3" fill={windowColor} />

        {/* Slanted bottom leg */}
        <polygon points="50,97 62,90 44,70 32,77" fill={iconBaseColor} />
      </svg>

      {showText && (
        <div className="flex flex-col items-start leading-none select-none">
          <span className={`font-display font-bold tracking-[0.12em] uppercase ${s.text} ${textColor}`}>
            RIGHTCON
          </span>
          <span className={`font-sans tracking-[0.18em] text-neutral-400 mt-0.5 uppercase ${s.sub}`}>
            Building Peace of Mind
          </span>
        </div>
      )}
    </div>
  );
}

