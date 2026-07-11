/**
 * LockSculpture — Why Rightcon Page
 * Theme: Trust & Reliability
 *
 * Two large L-shaped structural keys that interlock precisely.
 * The locking joint is the centrepiece. Very slowly counter-rotates:
 * left key clockwise, right key counter-clockwise.
 * Hover draws them fractionally closer — perfect fit.
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBeam, makeBox, makeJoint, mergeParts, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import SculptureCanvas from './SculptureCanvas';

const W = 0.048; // primary beam section

function buildLeftKey() {
  const parts = [];
  // Vertical drop (left side)
  parts.push(makeBeam(-0.80,  0.60, 0, -0.80, -0.60, 0, W));
  // Horizontal arm (extending right to centre)
  parts.push(makeBeam(-0.80, -0.60, 0,  0.05, -0.60, 0, W));
  // Diagonal brace
  parts.push(makeBeam(-0.80,  0.00, 0,  0.05, -0.60, 0, W * 0.72));
  // Top cap
  parts.push(makeBox(-0.80, 0.64, 0, 0.095, 0.09, 0.095));
  // Notch detail at interlocking corner
  parts.push(makeBeam(-0.08, -0.60, 0, -0.08, -0.30, 0, W * 0.55));
  return mergeParts(parts);
}

function buildRightKey() {
  const parts = [];
  // Vertical rise (right side) — mirror of left
  parts.push(makeBeam( 0.80, -0.60, 0,  0.80,  0.60, 0, W));
  // Horizontal arm (extending left to centre)
  parts.push(makeBeam( 0.80,  0.60, 0, -0.05,  0.60, 0, W));
  // Diagonal brace
  parts.push(makeBeam( 0.80,  0.00, 0, -0.05,  0.60, 0, W * 0.72));
  // Bottom cap
  parts.push(makeBox(0.80, -0.64, 0, 0.095, 0.09, 0.095));
  // Notch detail
  parts.push(makeBeam( 0.08, 0.60, 0,  0.08,  0.30, 0, W * 0.55));
  return mergeParts(parts);
}

function buildJointDetail() {
  const jb = [];
  // Central precision block — the lock point
  jb.push(makeBox(0, 0, 0, 0.15, 0.15, 0.15));
  jb.push(makeJoint(-0.80,  0.60, 0, 0.068));
  jb.push(makeJoint(-0.80, -0.60, 0, 0.068));
  jb.push(makeJoint( 0.80,  0.60, 0, 0.068));
  jb.push(makeJoint( 0.80, -0.60, 0, 0.068));
  jb.push(makeJoint( 0.05, -0.60, 0, 0.055));
  jb.push(makeJoint(-0.05,  0.60, 0, 0.055));
  return mergeParts(jb);
}

function LockScene({ mouseRef, hoverRef, scrollRef, tick }) {
  const mainRef  = useRef();
  const leftRef  = useRef();
  const rightRef = useRef();

  const mats = useMemo(() => ({
    left:  makeMat('primary'),
    right: makeMat('secondary'),
    joint: makeMat('joint'),
  }), []);

  const geos = useMemo(() => ({
    left:  buildLeftKey(),
    right: buildRightKey(),
    joint: buildJointDetail(),
  }), []);

  useFrame((state) => {
    const t     = state.clock.getElapsedTime();
    const mouse = mouseRef.current;
    const isH   = hoverRef.current;

    const { spX, spY } = tick(
      isH ? -mouse.y * 0.10 : 0,
      isH ?  mouse.x * 0.14 : 0,
    );

    if (mainRef.current) {
      mainRef.current.rotation.x = spX + Math.sin(t * 0.22) * 0.018;
      mainRef.current.rotation.y = t * 0.012 + spY;
      const sc = isH ? 1.015 : 1.0;
      mainRef.current.scale.setScalar(
        THREE.MathUtils.lerp(mainRef.current.scale.x, sc, 0.028)
      );
    }

    // Left key: very slow clockwise tilt
    if (leftRef.current) {
      leftRef.current.rotation.z = Math.sin(t * 0.14) * 0.028;
      // Hover: slide left key slightly to the right (tighter fit)
      const tx = isH ? -0.06 : 0;
      leftRef.current.position.x = THREE.MathUtils.lerp(leftRef.current.position.x, tx, 0.03);
    }
    // Right key: counter-rotation
    if (rightRef.current) {
      rightRef.current.rotation.z = -Math.sin(t * 0.14) * 0.028;
      const tx = isH ? 0.06 : 0;
      rightRef.current.position.x = THREE.MathUtils.lerp(rightRef.current.position.x, tx, 0.03);
    }

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.05) * 0.18 + mouse.x * 0.10, 0.010);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, isH ? 3.8 : 4.4, 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={mainRef}>
      <group ref={leftRef}>
        {geos.left  && <mesh geometry={geos.left}  material={mats.left}  />}
      </group>
      <group ref={rightRef}>
        {geos.right && <mesh geometry={geos.right} material={mats.right} />}
      </group>
      {geos.joint && <mesh geometry={geos.joint} material={mats.joint} />}
    </group>
  );
}

export default function LockSculpture() {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas dark hoverRef={interaction.hoverRef}>
      <LockScene {...interaction} />
    </SculptureCanvas>
  );
}
