import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * RIGHTCON 5.2.1 — Centralized IntersectionObserver Scroll Reveal Hook
 * 
 * Rules:
 * - Triggers ONCE when element enters viewport.
 * - Immediately unobserves to guarantee ZERO re-triggering or flickering.
 * - Respects prefers-reduced-motion.
 */
export function useReveal(selector = ".fade-up-element, .fade-in-element, .scale-in-element", options = {}) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is preferred, add is-visible immediately to all matching elements
    if (prefersReducedMotion) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const defaultOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
      ...options,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // Unobserve immediately once revealed
        }
      });
    }, defaultOptions);

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      // If already visible, don't observe
      if (!el.classList.contains("is-visible")) {
        observer.observe(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [selector, options, prefersReducedMotion]);
}
