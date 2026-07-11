/**
 * GeometricSculpture — FAQ Page
 * Theme: Clarity
 *
 * A clean folded architectural chevron (like a museum facade V-form).
 * Features two large inclined panels meeting at a central ridge.
 * The fold angle breathes and shifts dynamically as user scrolls,
 * symbolising structural clarity and open reflection.
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBeam, makeBox, makeJoint, mergeParts, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import SculptureCanvas from './SculptureCanvas';

function buildFins(len = 1.3, count = 6) {
  const parts = [];
  // Ridge beam (centre connector)
  parts.push(makeBeam(0, -0.7, 0, 0, 0.7, 0, 0.048));
  parts.push(makeJoint(0, -0.7, 0, 0.06));
  parts.push(makeJoint(0, 0.7, 0, 0.06));
  return mergeParts(parts);
}

function GeometricScene({ mouseRef, hoverRef, scrollRef, tick }) {
  const mainRef = useRef();

  const leftPanelRef = useRef();
  const rightPanelRef = useRef();

  const mats = useMemo(() => ({
    panel: makeMat('primary'),
    ridge: makeMat('joint'),
    fins:  makeMat('secondary'),
  }), []);

  const geos = useMemo(() => ({
    ridge: buildFins(),
  }), []);

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
      mainRef.current.rotation.y = t * 0.015 + spY;
      const sc = (isH ? 1.018 : 1.0) * (1 + Math.sin(t * 0.3) * 0.006);
      mainRef.current.scale.setScalar(
        THREE.MathUtils.lerp(mainRef.current.scale.x, sc, 0.028)
      );
    }

    // Fold angle - left and right panels open and close like a book
    // Scroll makes the chevron open wider
    const foldBase = 0.5 + Math.sin(t * 0.4) * 0.05; // harmonic sway
    const foldTarget = foldBase + scroll * 0.4; // opens wider on scroll

    if (leftPanelRef.current) {
      // Rotate around the central Y axis
      leftPanelRef.current.rotation.y = -foldTarget;
    }
    if (rightPanelRef.current) {
      rightPanelRef.current.rotation.y = foldTarget;
    }

    // Camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.05) * 0.18 + mouse.x * 0.1, 0.01);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, isH ? 4.0 : 4.6, 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={mainRef}>
      {/* Central ridge beam and joints */}
      {geos.ridge && <mesh geometry={geos.ridge} material={mats.ridge} />}

      {/* Left Fold Plane (pivots around central Y axis) */}
      <group ref={leftPanelRef}>
        {/* We translate the geometry so the pivot point is on the inner edge (x = 0) */}
        <mesh position={[-0.45, 0, 0]} material={mats.panel}>
          <boxGeometry args={[0.9, 1.4, 0.024]} />
        </mesh>
        {/* Horizontal structure ribs */}
        {[-0.5, -0.2, 0.1, 0.4].map((y, idx) => (
          <mesh key={idx} position={[-0.45, y, 0.02]} material={mats.fins}>
            <boxGeometry args={[0.8, 0.025, 0.02]} />
          </mesh>
        ))}
      </group>

      {/* Right Fold Plane */}
      <group ref={rightPanelRef}>
        <mesh position={[0.45, 0, 0]} material={mats.panel}>
          <boxGeometry args={[0.9, 1.4, 0.024]} />
        </mesh>
        {/* Horizontal structure ribs */}
        {[-0.5, -0.2, 0.1, 0.4].map((y, idx) => (
          <mesh key={idx} position={[0.45, y, 0.02]} material={mats.fins}>
            <boxGeometry args={[0.8, 0.025, 0.02]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function GeometricSculpture() {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas dark hoverRef={interaction.hoverRef}>
      <GeometricScene {...interaction} />
    </SculptureCanvas>
  );
}
