import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScrollSystem } from '../../context/ScrollContext';
import ProceduralMascot from './ProceduralMascot';
import BehaviourEngine from './BehaviourEngine';
import HoloProjector from './HoloProjector';
import FuturisticKey from './FuturisticKey';
import IntroParticles from './IntroParticles';
import * as THREE from 'three';

// ── Camera Controller — Cinematic Breathing + Intro Sweeps ──────────────────
function CameraController({ containerRef, currentPos, mousePx, introActive }) {
  const { introCamPos, introCamRot } = useScrollSystem();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Coordinate-based hover check for pointer events toggle
    if (containerRef.current && currentPos.current) {
      const tempV = new THREE.Vector3();
      tempV.copy(currentPos.current);
      tempV.project(state.camera);
      
      const screenX = (tempV.x * 0.5 + 0.5) * state.size.width;
      const screenY = (-(tempV.y * 0.5) + 0.5) * state.size.height;
      
      const dx = screenX - mousePx.current.x;
      const dy = screenY - mousePx.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const isHovering = dist < 70 && !introActive;
      containerRef.current.style.pointerEvents = (introActive || isHovering) ? 'auto' : 'none';
      containerRef.current.style.cursor = isHovering ? 'pointer' : 'default';
    }

    if (introActive) {
      state.camera.position.lerp(introCamPos.current, 0.05);
      state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, introCamRot.current.x, 0.05);
      state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, introCamRot.current.y, 0.05);
      state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, introCamRot.current.z, 0.05);
    } else {
      // Handheld cinematic breathing — multi-frequency for organic feel
      const breathX = Math.sin(t * 0.27) * 0.003 + Math.sin(t * 0.61) * 0.0015;
      const breathY = Math.cos(t * 0.19) * 0.004 + Math.cos(t * 0.43) * 0.002;
      const target = new THREE.Vector3(breathX, breathY, 5.0 + Math.sin(t * 0.15) * 0.05);
      state.camera.position.lerp(target, 0.025);
      state.camera.rotation.z = THREE.MathUtils.lerp(
        state.camera.rotation.z,
        Math.sin(t * 0.23) * 0.003,
        0.03
      );
    }
  });

  return null;
}

// ── Dynamic Lights — Slow Sunlight Drift + Warm Fill ────────────────────────
function DynamicLights() {
  const { introActive, introIntensity } = useScrollSystem();
  const dirRef  = useRef();
  const fillRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (dirRef.current) {
      if (introActive) {
        dirRef.current.intensity = introIntensity.current.value;
      } else {
        // Slow solar orbit (~150s period) + cloud shadow breathing
        dirRef.current.position.set(
          5 + Math.sin(t * 0.04) * 1.5,
          10 + Math.cos(t * 0.025) * 1.2,
          4 + Math.sin(t * 0.035) * 0.8
        );
        dirRef.current.intensity = 1.1 + Math.sin(t * 0.08) * 0.12;
      }
    }
    if (fillRef.current) {
      fillRef.current.intensity = 0.35 + Math.sin(t * 0.12) * 0.08;
    }
  });

  return (
    <>
      <directionalLight
        ref={dirRef}
        position={[5, 10, 4]}
        intensity={0.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Warm architectural fill — interior ambient bounce */}
      <pointLight ref={fillRef} position={[0, -2, 3]} color="#F0E4C0" intensity={0.35} distance={8} decay={2} />
    </>
  );
}

// ── IntroMascotController — GSAP-driven during intro only ───────────────────
function IntroMascotController({ currentPos, currentRot, currentScale }) {
  const { introActive, introPos, introRot, introScale } = useScrollSystem();

  useFrame(() => {
    if (!introActive) return;
    currentPos.current.copy(introPos.current);
    currentRot.current.copy(introRot.current);
    currentScale.current = introScale.current.value;
  });

  return null;
}

// ── Main Canvas ──────────────────────────────────────────────────────────────
export default function MascotCanvas() {
  const { isMobile, introActive, activeScene } = useScrollSystem();
  const zIndex = 40;

  // Shared refs — written by BehaviourEngine/IntroMascotController, read by ProceduralMascot
  const currentPos    = useRef(new THREE.Vector3(1.55, -0.65, 0.3));
  const currentRot    = useRef(new THREE.Euler(0, -0.4, 0));
  const currentScale  = useRef(0.68);

  // behaviourStateRef bridges BehaviourEngine → ProceduralMascot (zero re-renders)
  const behaviourStateRef = useRef({
    pose:     'idle',
    emotion:  'calm',
    behavior: 'hover',
  });

  const containerRef = useRef();
  const mousePx = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (isMobile) return;
    const handleMove = (e) => {
      mousePx.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full webgl-canvas-container"
      style={{ zIndex, pointerEvents: introActive ? 'auto' : 'none' }}
    >
      <Canvas
        style={{ pointerEvents: introActive ? 'auto' : 'none' }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
      >
        {/* Lights */}
        <ambientLight intensity={isMobile ? 0.75 : 0.45} />
        <DynamicLights />
        <pointLight position={[-4, -3, -2]} intensity={0.4} color="#0055ff" />
        <pointLight position={[4, 4, 3]}   intensity={0.7} color="#00f3ff" />

        {/* Camera */}
        <CameraController 
          containerRef={containerRef} 
          currentPos={currentPos} 
          mousePx={mousePx} 
          introActive={introActive} 
        />

        <Suspense fallback={null}>
          <group>
            {/* Intro: GSAP drives refs directly from HeroScene timelines */}
            {introActive && (
              <IntroMascotController
                currentPos={currentPos}
                currentRot={currentRot}
                currentScale={currentScale}
              />
            )}

            {/* Explore: BehaviourEngine takes over, physics-driven */}
            {!introActive && (
              <BehaviourEngine
                posRef={currentPos}
                rotRef={currentRot}
                scaleRef={currentScale}
                behaviourStateRef={behaviourStateRef}
              />
            )}

            {/* Mascot mesh — reads from shared refs every frame */}
            <ProceduralMascot
              posRef={currentPos}
              rotRef={currentRot}
              scaleRef={currentScale}
              behaviourStateRef={behaviourStateRef}
            />

            {/* Intro overlays */}
            {introActive && (
              <>
                <FuturisticKey />
                <IntroParticles />
              </>
            )}

            {/* Project hologram — shown when in projects or projecting */}
            {!introActive && (activeScene === 3 || activeScene === 5 || activeScene === 8) && (
              <HoloProjector posRef={currentPos} scaleRef={currentScale} />
            )}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
