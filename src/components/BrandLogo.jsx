import React from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * BrandLogo — uses Logo-light.png (black text) in Light Mode
 * and Logo.png (white text) in Dark Mode.
 *
 * Props:
 *   light    {boolean} — true = force Dark mode logo (white text), false = force Light mode logo (black text)
 *   height   {number}  — rendered height in px (default 48)
 *   className {string} — optional extra CSS classes
 */
export default function BrandLogo({ light, height = 48, className = "" }) {
  let isThemeDark = false;
  try {
    const { theme } = useTheme();
    isThemeDark = theme === "dark";
  } catch (e) {
    // Fallback if rendered outside ThemeProvider
  }

  const useWhiteLogo = light !== undefined ? light : isThemeDark;
  const logoSrc = useWhiteLogo ? "/Logo.png" : "/Logo-light.png";

  return (
    <img
      src={logoSrc}
      alt="Rightcon — Building Peace of Mind"
      className={className}
      style={{
        height: `${height}px`,
        width: "auto",
        maxWidth: "360px",
        display: "block",
        objectFit: "contain",
      }}
    />
  );
}
