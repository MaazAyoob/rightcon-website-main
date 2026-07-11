/**
 * PathSculpture — Client Journey Page
 * Theme: Guidance & Milestones
 *
 * 5 stepped platform levels connected by a continuous inclined ramp path.
 * As the user scrolls, the pathway elements illuminate/grow sequentially.
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBeam, makeBox, makeJoint, mergeParts, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import SculptureCanvas from './SculptureCanvas';

const PLATFORMS = [
  [-1.2, -0.6,  0.2],
  [-0.6, -0.3, -0.1],
  [ 0.0,  0.0,  0.1],
  [ 0.6,  0.3, -0.1],
  [ 1.2,  0.6,  0.2],
];

function buildSteppes() {
  const parts = [];
  PLATFORMS.forEach((pos, idx) => {
    // Platform blocks
    parts.push(makeBox(pos[0], pos[1] - 0.04, pos[2], 0.35, 0.05, 0.25));
    // Support pillar under each
    parts.push(makeBeam(pos[0], -0.9, pos[2], pos[0], pos[1] - 0.04, pos[2], 0.024));
  });
  // Unified base ground slab
  parts.push(makeBox(0, -0.92, 0, 3.2, 0.05, 0.8));
  return mergeParts(parts);
}

function PathScene({ mouseRef, hoverRef, scrollRef, tick }) {
  const mainRef = useRef();
  const pathRefs = [useRef(), useRef(), useRef(), useRef()];

  const mats = useMemo(() => ({
    base:  makeMat('depth'),
    step:  makeMat('primary'),
    joint: makeMat('joint'),
    path:  makeMat('accent'),
  }), []);

  const geos = useMemo(() => ({
    steppes: buildSteppes(),
  }), []);

  // Ramp geometry calculation
  const ramps = useMemo(() => {
    return PLATFORMS.slice(0, -1).map((start, idx) => {
      const end = PLATFORMS[idx + 1];
      const startV = new THREE.Vector3(start[0], start[1], start[2]);
      const endV = new THREE.Vector3(end[0], end[1], end[2]);
      const dir = endV.clone().sub(startV);
      const len = dir.length();
      const center = new THREE.Vector3().addVectors(startV, endV).multiplyScalar(0.5);

      const quat = new THREE.Quaternion();
      const norm = dir.clone().normalize();
      if (norm.y < -0.9999) {
        quat.set(0, 0, 1, 0);
      } else {
        quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), norm);
      }

      return { center, len, quat };
    });
  }, []);

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

    // Scroll-driven path propagation
    pathRefs.forEach((ref, idx) => {
      if (ref.current) {
        const startVal = idx * 0.22;
        const endVal = startVal + 0.22;
        const pProg = Math.min(1.0, Math.max(0.0, (scroll - startVal) / (endVal - startVal)));
        ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, pProg, 0.08);
      }
    });

    // Camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.05) * 0.18 + mouse.x * 0.1, 0.01);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, isH ? 4.0 : 4.6, 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={mainRef}>
      {geos.steppes && <mesh geometry={geos.steppes} material={mats.base} />}

      {/* Joint nodes on platforms */}
      {PLATFORMS.map((pos, idx) => (
        <mesh key={idx} position={[pos[0], pos[1], pos[2]]} material={mats.joint}>
          <boxGeometry args={[0.06, 0.06, 0.06]} />
        </mesh>
      ))}

      {/* Ramps linking platforms — scale Y up from bottom as scroll advances */}
      {ramps.map((ramp, idx) => (
        <group
          key={idx}
          position={[ramp.center.x, ramp.center.y, ramp.center.z]}
          quaternion={ramp.quat}
        >
          <group ref={pathRefs[idx]} scale={[1, 0, 1]}>
            <mesh material={mats.path}>
              <boxGeometry args={[0.048, ramp.len, 0.016]} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

export default function PathSculpture() {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas dark hoverRef={interaction.hoverRef}>
      <PathScene {...interaction} />
    </SculptureCanvas>
  );
}
