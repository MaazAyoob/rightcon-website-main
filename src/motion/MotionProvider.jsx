import React, { createContext, useContext } from "react";
import { MOTION_TOKENS, getStaggerDelay } from "./motionConfig";
import { useReducedMotion } from "./useReducedMotion";

const MotionContext = createContext({
  tokens: MOTION_TOKENS,
  prefersReducedMotion: false,
  getStaggerDelay,
});

export function MotionProvider({ children }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionContext.Provider
      value={{
        tokens: MOTION_TOKENS,
        prefersReducedMotion,
        getStaggerDelay,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}
