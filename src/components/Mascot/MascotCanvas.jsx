import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScrollSystem } from '../../context/ScrollContext';
import ProceduralMascot from './ProceduralMascot';
import HoloProjector from './HoloProjector';
import * as THREE from 'three';

// Continuous Spline coordinates synced to scroll progress (0.0 to 1.0)
const SPLINE_POINTS = [
  { progress: 0.0,  pos: [1.6, -0.65, 0.3],  rot: [0, -0.4, 0],    scale: 0.7,   zIndex: 10 },  // Hero
  { progress: 0.15, pos: [0.0, -0.3, 0.4],   rot: [0, -0.1, 0],    scale: 0.65,  zIndex: 20 },  // Hero -> About curve
  { progress: 0.3,  pos: [-1.6, -0.7, 0.3],  rot: [0, 0.4, 0],     scale: 0.58,  zIndex: 10 },  // About (soil logs)
  { progress: 0.45, pos: [0.0, -0.1, 0.1],   rot: [0, 0.1, 0],     scale: 0.55,  zIndex: 20 },  // About -> Projects curve
  { progress: 0.6,  pos: [1.6, 0.25, -0.4],  rot: [0, -0.4, 0],    scale: 0.55,  zIndex: 20 },  // Projects
  { progress: 0.72, pos: [-0.2, -0.4, 0.2],  rot: [0, -0.2, 0],    scale: 0.58,  zIndex: 20 },  // Projects -> Beliefs curve
  { progress: 0.8,  pos: [-1.8, -0.7, 0.2],  rot: [0, 0.3, 0],     scale: 0.58,  zIndex: 10 },  // Beliefs
  { progress: 0.88, pos: [1.7, -0.6, 0.2],   rot: [0, -0.3, 0],    scale: 0.6,   zIndex: 20 },  // Amenities
  { progress: 0.94, pos: [-1.8, 0.45, -0.7], rot: [0.12, 0.45, 0], scale: 0.5,   zIndex: 10 },  // FAQ
  { progress: 1.0,  pos: [1.4, -0.5, 0.3],   rot: [0, -0.2, 0],    scale: 0.65,  zIndex: 20 }   // CTA Form
];

// Helper to interpolate target spline coordinates based on scroll progress
const getInterpolatedTarget = (progress, isMobile) => {
  let k1 = SPLINE_POINTS[0];
  let k2 = SPLINE_POINTS[SPLINE_POINTS.length - 1];
  
  for (let i = 0; i < SPLINE_POINTS.length - 1; i++) {
    if (progress >= SPLINE_POINTS[i].progress && progress <= SPLINE_POINTS[i+1].progress) {
      k1 = SPLINE_POINTS[i];
      k2 = SPLINE_POINTS[i+1];
      break;
    }
  }

  const span = k2.progress - k1.progress;
  const t = span > 0 ? (progress - k1.progress) / span : 0;
  
  // Custom ease in-out interpolation step
  const easeT = t * t * (3 - 2 * t);

  // Scale interpolation
  const scale = THREE.MathUtils.lerp(k1.scale, k2.scale, easeT) * (isMobile ? 0.72 : 1.0);

  // Rotation interpolation
  const rot = [
    THREE.MathUtils.lerp(k1.rot[0], k2.rot[0], easeT),
    THREE.MathUtils.lerp(k1.rot[1], k2.rot[1], easeT),
    THREE.MathUtils.lerp(k1.rot[2], k2.rot[2], easeT)
  ];

  // Position interpolation
  let pos1 = [...k1.pos];
  let pos2 = [...k2.pos];

  if (isMobile) {
    // Compress layout boundaries for vertical mobile screens
    pos1[0] = pos1[0] * 0.15;
    pos2[0] = pos2[0] * 0.15;
    pos1[1] = pos1[1] - 0.08;
    pos2[1] = pos2[1] - 0.08;
  }

  const pos = [
    THREE.MathUtils.lerp(pos1[0], pos2[0], easeT),
    THREE.MathUtils.lerp(pos1[1], pos2[1], easeT),
    THREE.MathUtils.lerp(pos1[2], pos2[2], easeT)
  ];

  return { pos, rot, scale, zIndex: k2.zIndex };
};

// Canvas wrapper to run coordinates LERPs inside R3F render loop
function MascotController({ currentPos, currentRot, currentScale }) {
  const { scrollProgress, isMobile } = useScrollSystem();

  useFrame(() => {
    // Compute target coordinates at active scroll percentage
    const target = getInterpolatedTarget(scrollProgress, isMobile);

    // Apply continuous smooth LERPs for a trailing suspension feel
    currentPos.current.lerp(new THREE.Vector3(...target.pos), 0.06);
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, target.scale, 0.06);

    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, target.rot[0], 0.06);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, target.rot[1], 0.06);
    currentRot.current.z = THREE.MathUtils.lerp(currentRot.current.z, target.rot[2], 0.06);
  });

  return (
    <ProceduralMascot 
      posRef={currentPos}
      rotRef={currentRot}
      scaleRef={currentScale}
    />
  );
}

export default function MascotCanvas() {
  const { scrollProgress, activeScene, isMobile } = useScrollSystem();
  const zIndex = 40; // High z-index to stay visible above all background section visuals

  // Keep references to smoothly interpolated position, rotation, and scale values
  const currentPos = useRef(new THREE.Vector3(0, 0.4, 0));
  const currentRot = useRef(new THREE.Euler(0, 0, 0));
  const currentScale = useRef(0.85);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none transition-all duration-300 webgl-canvas-container"
      style={{ zIndex: zIndex, pointerEvents: 'none' }}
    >
      <Canvas
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <ambientLight intensity={isMobile ? 0.75 : 0.45} />
        
        {/* Architectural lighting studio rig */}
        <directionalLight 
          position={[5, 10, 4]} 
          intensity={1.1} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-4, -3, -2]} intensity={0.4} color="#0055ff" />
        <pointLight position={[4, 4, 3]} intensity={0.7} color="#00f3ff" />
        
        <Suspense fallback={null}>
          <group>
            {/* Mascot Controller updates refs on frame renders */}
            <MascotController 
              currentPos={currentPos} 
              currentRot={currentRot} 
              currentScale={currentScale}
            />

            {/* Project blueprint holograms */}
            {(activeScene === 1 || activeScene === 2 || activeScene === 3 || activeScene === 5) && (
              <HoloProjector 
                posRef={currentPos} 
                scaleRef={currentScale} 
              />
            )}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
