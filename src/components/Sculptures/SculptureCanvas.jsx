import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function CanvasContextDisposer() {
  const { gl } = useThree();
  useEffect(() => {
    return () => {
      // Force context loss immediately to free up GPU resources on unmount
      const extension = gl.getExtension('WEBGL_lose_context');
      if (extension) {
        extension.loseContext();
      }
      gl.dispose();
    };
  }, [gl]);
  return null;
}

/**
 * SculptureCanvas — shared Canvas wrapper for all V17 page sculptures.
 *
 * Props:
 *   children  — the sculpture component(s)
 *   dark      — boolean. true = dark studio bg (#141416), false = light (#F5F5F3)
 *   fov       — camera field of view (default 44)
 *   cameraZ   — camera Z position (default 4.6)
 *   style     — additional style overrides for the container div
 */

function StudioLights({ hoverRef }) {
  const rimRef = useRef();
  const keyRef = useRef();

  useFrame((state) => {
    const t   = state.clock.getElapsedTime();
    const isH = hoverRef?.current || false;
    // Blue rim brightens on hover
    if (rimRef.current) {
      rimRef.current.intensity = THREE.MathUtils.lerp(
        rimRef.current.intensity,
        isH ? 2.8 : 2.0,
        0.04
      );
    }
    // Key light slow breathing — studio cloud drift
    if (keyRef.current) {
      keyRef.current.intensity = 3.0 + Math.sin(t * 0.08) * 0.20;
    }
  });

  return (
    <>
      {/* Soft ambient — fills the environment */}
      <ambientLight intensity={0.28} color="#E8ECF2" />
      {/* Warm key light — upper right front, primary illumination */}
      <directionalLight
        ref={keyRef}
        position={[5, 9, 7]}
        intensity={3.0}
        color="#F0EBE4"
      />
      {/* Rightcon brand blue rim — left back, edge definition */}
      <pointLight
        ref={rimRef}
        position={[-6, 2.5, -4.5]}
        intensity={2.0}
        color="#0000AA"
        distance={20}
        decay={2}
      />
      {/* Cool soft fill — lifts shadow side */}
      <pointLight
        position={[-3, -3, 6]}
        intensity={0.38}
        color="#DDE4F5"
        distance={12}
        decay={2}
      />
      {/* Very subtle heritage gold — warm upper-right glint */}
      <pointLight
        position={[7, 5, 2]}
        intensity={0.26}
        color="#C9A227"
        distance={14}
        decay={2.5}
      />
      {/* Underside bounce — shadow depth under beams */}
      <pointLight
        position={[0, -6, 0]}
        intensity={0.14}
        color="#D0D4DC"
        distance={10}
        decay={2}
      />
    </>
  );
}

export default function SculptureCanvas({
  children,
  dark = false,
  fov = 44,
  cameraZ = 4.6,
  hoverRef,
  style = {},
}) {
  const bg = '#F5F5F3';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <Canvas
        camera={{ position: [0, 0.1, cameraZ], fov }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <CanvasContextDisposer />
        <color attach="background" args={[bg]} />
        <StudioLights hoverRef={hoverRef} />
        {children}
      </Canvas>
    </div>
  );
}

export { StudioLights };
