/**
 * AssemblySculpture — Services Page
 * Theme: Engineering Systems
 *
 * A mechanical assembly consisting of structural beams, joints, and rotating
 * precision components. Represents mechanical engineering precision and coordination.
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBeam, makeBox, makeJoint, mergeParts, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import SculptureCanvas from './SculptureCanvas';

const BEAM_Y = [-0.6, 0.0, 0.6];
const RADIUS = 0.35;

function buildFixedFrame() {
  const parts = [];
  // 2 vertical main posts
  parts.push(makeBeam(-1.1, -0.9, 0, -1.1, 0.9, 0, 0.05));
  parts.push(makeBeam( 1.1, -0.9, 0,  1.1, 0.9, 0, 0.05));

  // Diagonal support ties in corners
  parts.push(makeBeam(-1.1,  0.6, 0, -0.7,  0.9, 0, 0.024));
  parts.push(makeBeam(-1.1, -0.6, 0, -0.7, -0.9, 0, 0.024));
  parts.push(makeBeam( 1.1,  0.6, 0,  0.7,  0.9, 0, 0.024));
  parts.push(makeBeam( 1.1, -0.6, 0,  0.7, -0.9, 0, 0.024));

  // Base plates
  parts.push(makeBox(-1.1, -0.93, 0, 0.25, 0.06, 0.25));
  parts.push(makeBox( 1.1, -0.93, 0, 0.25, 0.06, 0.25));

  return mergeParts(parts);
}

function AssemblyScene({ mouseRef, hoverRef, scrollRef, tick }) {
  const mainRef = useRef();

  // Mechanical rotating element refs
  const gearRefs = [useRef(), useRef(), useRef()];
  const linkRef = useRef();

  const mats = useMemo(() => ({
    frame: makeMat('primary'),
    gear:  makeMat('accent'),
    joint: makeMat('joint'),
    link:  makeMat('secondary'),
  }), []);

  const geos = useMemo(() => ({
    fixed: buildFixedFrame(),
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
      const sc = (isH ? 1.018 : 1.0) * (1 + Math.sin(t * 0.35) * 0.007);
      mainRef.current.scale.setScalar(
        THREE.MathUtils.lerp(mainRef.current.scale.x, sc, 0.028)
      );
    }

    // 1. Gears rotate at different speeds/directions
    // Scroll increases mechanical speed
    const baseSpeed = 0.5 + scroll * 1.5;
    if (gearRefs[0].current) gearRefs[0].current.rotation.z =  t * baseSpeed;
    if (gearRefs[1].current) gearRefs[1].current.rotation.z = -t * baseSpeed * 1.2;
    if (gearRefs[2].current) gearRefs[2].current.rotation.z =  t * baseSpeed * 0.8;

    // 2. Interconnecting sliding link arm
    if (linkRef.current) {
      // Harmonic linear motion driven by gear angle
      const angle = t * baseSpeed;
      const ox = Math.cos(angle) * RADIUS;
      const oy = Math.sin(angle) * RADIUS;
      linkRef.current.position.set(ox - 0.2, oy, 0.1);
      linkRef.current.rotation.z = Math.sin(t * 0.6) * 0.08;
    }

    // Camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.05) * 0.18 + mouse.x * 0.1, 0.01);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, isH ? 4.0 : 4.6, 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={mainRef}>
      {/* Fixed chassis frames */}
      {geos.fixed && <mesh geometry={geos.fixed} material={mats.frame} />}

      {/* Rotating gear 1 (Left) */}
      <group ref={gearRefs[0]} position={[-0.5, 0.2, 0]}>
        <mesh material={mats.gear}>
          <cylinderGeometry args={[RADIUS, RADIUS, 0.06, 6]} />
        </mesh>
        {/* Gear teeth/studs */}
        <mesh position={[0, RADIUS, 0]} material={mats.joint}>
          <boxGeometry args={[0.06, 0.08, 0.08]} />
        </mesh>
        <mesh position={[0, -RADIUS, 0]} material={mats.joint}>
          <boxGeometry args={[0.06, 0.08, 0.08]} />
        </mesh>
      </group>

      {/* Rotating gear 2 (Right) */}
      <group ref={gearRefs[1]} position={[0.5, -0.2, 0]}>
        <mesh material={mats.gear}>
          <cylinderGeometry args={[RADIUS * 0.8, RADIUS * 0.8, 0.06, 5]} />
        </mesh>
        <mesh position={[0, RADIUS * 0.8, 0]} material={mats.joint}>
          <boxGeometry args={[0.05, 0.07, 0.07]} />
        </mesh>
      </group>

      {/* Rotating gear 3 (Center Top) */}
      <group ref={gearRefs[2]} position={[0, 0.6, -0.1]}>
        <mesh material={mats.gear}>
          <cylinderGeometry args={[RADIUS * 0.5, RADIUS * 0.5, 0.04, 8]} />
        </mesh>
      </group>

      {/* Connecting linkage mechanical arm */}
      <group ref={linkRef} position={[-0.2, 0.2, 0.1]}>
        <mesh material={mats.link}>
          <boxGeometry args={[1.2, 0.03, 0.03]} />
        </mesh>
        <mesh position={[-0.6, 0, 0]} material={mats.joint}>
          <sphereGeometry args={[0.045, 16, 16]} />
        </mesh>
        <mesh position={[0.6, 0, 0]} material={mats.joint}>
          <sphereGeometry args={[0.045, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

export default function AssemblySculpture() {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas dark hoverRef={interaction.hoverRef}>
      <AssemblyScene {...interaction} />
    </SculptureCanvas>
  );
}
