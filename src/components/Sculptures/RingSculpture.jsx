/**
 * RingSculpture — Testimonials Page
 * Theme: Relationships
 *
 * 3 concentric elliptical ring structures tilted on different axes.
 * They rotate extremely slowly at different speeds, creating a calm, serene
 * orbital choreography. Symbolises enduring partnerships.
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeArcBeams, makeJoint, mergeParts, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import SculptureCanvas from './SculptureCanvas';

function buildRing(rX, rY, tilt) {
  const parts = [];
  // Build approximation arc beams
  const arcParts = makeArcBeams(0, 0, 0, rX, rY, tilt, 24, 0.024);
  parts.push(...arcParts);

  // Add 4 nodes around the ring perimeter
  const angles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
  angles.forEach((angle) => {
    const x = rX * Math.cos(angle);
    const y = rY * Math.sin(angle) * Math.cos(tilt);
    const z = rY * Math.sin(angle) * Math.sin(tilt);
    parts.push(makeJoint(x, y, z, 0.048));
  });

  return mergeParts(parts);
}

function RingScene({ mouseRef, hoverRef, scrollRef, tick }) {
  const mainRef = useRef();

  const outerRingRef = useRef();
  const midRingRef = useRef();
  const innerRingRef = useRef();

  const mats = useMemo(() => ({
    outer: makeMat('primary'),
    mid:   makeMat('secondary'),
    inner: makeMat('accent'),
  }), []);

  const geos = useMemo(() => ({
    outer: buildRing(1.30, 1.30, 0.25),
    mid:   buildRing(0.95, 0.95, -0.32),
    inner: buildRing(0.60, 0.60, 0.15),
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouse = mouseRef.current;
    const isH = hoverRef.current;
    const scroll = Math.min(scrollRef.current, 1.0);

    const { spX, spY } = tick(
      isH ? -mouse.y * 0.10 : 0,
      isH ? mouse.x * 0.14 : 0
    );

    if (mainRef.current) {
      mainRef.current.rotation.x = spX;
      mainRef.current.rotation.y = t * 0.01 + spY;
      const sc = (isH ? 1.018 : 1.0) * (1 + Math.sin(t * 0.2) * 0.005);
      mainRef.current.scale.setScalar(
        THREE.MathUtils.lerp(mainRef.current.scale.x, sc, 0.028)
      );
    }

    // 3 rings rotate independently
    // Scroll increases rotational offset
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = t * 0.045 + scroll * 0.5;
      outerRingRef.current.rotation.x = Math.sin(t * 0.15) * 0.04;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.y = -t * 0.062 - scroll * 0.7;
      midRingRef.current.rotation.z = Math.cos(t * 0.12) * 0.05;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = t * 0.082 + scroll * 0.9;
      innerRingRef.current.rotation.x = -Math.sin(t * 0.18) * 0.06;
    }

    // Camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.04) * 0.18 + mouse.x * 0.08, 0.01);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, isH ? 4.0 : 4.6, 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={mainRef}>
      {/* 3 Rings */}
      <group ref={outerRingRef}>
        {geos.outer && <mesh geometry={geos.outer} material={mats.outer} />}
      </group>
      <group ref={midRingRef}>
        {geos.mid && <mesh geometry={geos.mid} material={mats.mid} />}
      </group>
      <group ref={innerRingRef}>
        {geos.inner && <mesh geometry={geos.inner} material={mats.inner} />}
      </group>
    </group>
  );
}

export default function RingSculpture() {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas dark hoverRef={interaction.hoverRef}>
      <RingScene {...interaction} />
    </SculptureCanvas>
  );
}
