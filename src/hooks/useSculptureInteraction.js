import { useRef, useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';

/**
 * useSculptureInteraction
 * Shared hook for all V17 sculptures.
 * Returns stable refs for mouse position, hover state, and scroll progress.
 * Spring physics are pre-initialized as refs — each sculpture calls tick() in useFrame.
 */
export function useSculptureInteraction() {
  const { scrollProgress } = useScrollSystem();

  const mouseRef  = useRef({ x: 0, y: 0 });
  const hoverRef  = useRef(false);
  const scrollRef = useRef(0);
  scrollRef.current = scrollProgress;

  // Spring state refs — critically damped physically weighted spring
  const spX = useRef({ v: 0, p: 0 }); // pitch (mouse Y → X rotation)
  const spY = useRef({ v: 0, p: 0 }); // yaw   (mouse X → Y rotation)

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
      hoverRef.current = e.clientY < window.innerHeight;
    };
    const onLeave = () => { hoverRef.current = false; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /**
   * tick(targetX, targetY) — call inside useFrame
   * Advances spring physics and returns { spX, spY } (current positions).
   * targetX / targetY are the desired angles (radians) driven by mouse.
   */
  function tick(targetX = 0, targetY = 0) {
    const STIFF = 0.048, DAMP = 0.845;
    spX.current.v = spX.current.v * DAMP + (targetX - spX.current.p) * STIFF;
    spX.current.p += spX.current.v;
    spY.current.v = spY.current.v * DAMP + (targetY - spY.current.p) * STIFF;
    spY.current.p += spY.current.v;
    return { spX: spX.current.p, spY: spY.current.p };
  }

  return { mouseRef, hoverRef, scrollRef, tick };
}
