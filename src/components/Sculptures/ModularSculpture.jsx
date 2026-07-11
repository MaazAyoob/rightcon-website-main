/**
 * ModularSculpture — Projects Page
 * Theme: Architecture / Modular Forms
 *
 * 6 modular building block volumes that slowly drift and rearrange
 * themselves into different architectural forms as the user scrolls.
 * Hovering pulls them slightly closer together into a compact cluster.
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBox, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import SculptureCanvas from './SculptureCanvas';

function buildBlocks() {
  // Dimensions for 6 different modular block shapes
  return [
    { size: [0.65, 0.90, 0.65], matRole: 'primary' },
    { size: [0.55, 1.20, 0.55], matRole: 'secondary' },
    { size: [0.70, 0.60, 0.70], matRole: 'depth' },
    { size: [0.50, 0.80, 0.50], matRole: 'accent' },
    { size: [0.60, 1.05, 0.60], matRole: 'joint' },
    { size: [0.45, 0.75, 0.45], matRole: 'dark' },
  ];
}

// Position layout A (dispersed configuration at scroll = 0)
const LAYOUT_A = [
  [-0.9,  0.1,  0.2],
  [ 0.0,  0.3, -0.4],
  [ 0.8, -0.2,  0.3],
  [-0.5, -0.4, -0.2],
  [ 0.6,  0.4,  0.1],
  [-1.0, -0.3, -0.3],
];

// Position layout B (condensed skyline configuration at scroll = 1)
const LAYOUT_B = [
  [-0.6, -0.2,  0.0],
  [-0.1,  0.1,  0.1],
  [ 0.4, -0.3, -0.1],
  [-0.4, -0.25, -0.2],
  [ 0.2,  0.05,  0.2],
  [ 0.7, -0.2,  0.1],
];

function ModularScene({ mouseRef, hoverRef, scrollRef, tick }) {
  const mainRef = useRef();
  const blockRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const mats = useMemo(() => ({
    primary:   makeMat('primary'),
    secondary: makeMat('secondary'),
    depth:     makeMat('depth'),
    accent:    makeMat('accent'),
    joint:     makeMat('joint'),
    dark:      makeMat('dark'),
  }), []);

  const blocks = useMemo(() => buildBlocks(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouse = mouseRef.current;
    const isH = hoverRef.current;
    const scroll = Math.min(scrollRef.current, 1.0);

    const { spX, spY } = tick(
      isH ? -mouse.y * 0.12 : 0,
      isH ? mouse.x * 0.16 : 0
    );

    if (mainRef.current) {
      mainRef.current.rotation.x = spX;
      mainRef.current.rotation.y = t * 0.012 + spY;
      const sc = (isH ? 1.018 : 1.0) * (1 + Math.sin(t * 0.3) * 0.006);
      mainRef.current.scale.setScalar(
        THREE.MathUtils.lerp(mainRef.current.scale.x, sc, 0.028)
      );
    }

    // Interpolate positions between Layout A and Layout B driven by scroll progress
    blockRefs.forEach((ref, idx) => {
      if (ref.current) {
        const startPos = LAYOUT_A[idx];
        const endPos = LAYOUT_B[idx];

        // Hover effect pulls blocks 15% closer to center (cohesion)
        const scaleFactor = isH ? 0.85 : 1.0;

        const targetX = THREE.MathUtils.lerp(startPos[0], endPos[0], scroll) * scaleFactor;
        const targetY = THREE.MathUtils.lerp(startPos[1], endPos[1], scroll) * scaleFactor;
        const targetZ = THREE.MathUtils.lerp(startPos[2], endPos[2], scroll) * scaleFactor;

        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.05);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.05);
        ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.05);

        // Individual slow rotation on each block
        ref.current.rotation.y = Math.sin(t * 0.2 + idx) * 0.04;
      }
    });

    // Camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.05) * 0.15 + mouse.x * 0.08, 0.01);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, isH ? 3.9 : 4.5, 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={mainRef}>
      {blocks.map((block, idx) => (
        <group key={idx} ref={blockRefs[idx]}>
          <mesh material={mats[block.matRole]} castShadow receiveShadow>
            <boxGeometry args={block.size} />
          </mesh>
          {/* Add a subtle top slab layer on each block for high architectural maquette fidelity */}
          <mesh position={[0, block.size[1] / 2 + 0.015, 0]} material={mats.joint}>
            <boxGeometry args={[block.size[0] + 0.03, 0.03, block.size[2] + 0.03]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function ModularSculpture() {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas dark hoverRef={interaction.hoverRef}>
      <ModularScene {...interaction} />
    </SculptureCanvas>
  );
}
