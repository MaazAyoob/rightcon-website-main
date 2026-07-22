import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "./useReducedMotion";

/**
 * RIGHTCON 5.2.1 — Standardized Route Page Transition Component
 * 
 * Provides smooth, subtle route transitions:
 * - Resets window scroll position to top
 * - Applies soft opacity fade and 10px upward slide
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset scroll to top on route change
    window.scrollTo(0, 0);

    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 20);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (prefersReducedMotion) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <div
      className={`w-full transition-all duration-400 ease-architectural ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}
