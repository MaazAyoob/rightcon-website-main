/**
 * EvolutionSculpture — Process Page
 * Theme: Construction Evolution
 *
 * Gradually assembles itself based on scroll progress:
 *   - Scroll 0.0 to 0.2: Foundation slab fades in
 *   - Scroll 0.2 to 0.5: 4 main columns scale up in Y
 *   - Scroll 0.5 to 0.75: Horizontal beams scale out in X
 *   - Scroll 0.75 to 0.9: X-bracing diagonals fade/scale in
 *   - Scroll 0.9 to 1.0: Roof slab descends from above
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBeam, makeBox, makeJoint, mergeParts, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import SculptureCanvas from './SculptureCanvas';

const COL_X = [-1.2, -0.4, 0.4, 1.2];
const COL_H = 1.4;
const BASE_Y = -0.7;

function EvolutionScene({ mouseRef, hoverRef, scrollRef, tick }) {
  const mainRef = useRef();

  // Sub-element refs for animation steps
  const foundationRef = useRef();
  const colRefs = [useRef(), useRef(), useRef(), useRef()];
  const beamRefs = [useRef(), useRef(), useRef()];
  const braceRef = useRef();
  const roofRef = useRef();

  const mats = useMemo(() => ({
    foundation: makeMat('depth'),
    columns: makeMat('primary'),
    beams: makeMat('secondary'),
    bracing: makeMat('accent'),
    roof: makeMat('joint'),
  }), []);

  // Pre-bake geometry parts
  const colGeom = useMemo(() => {
    // A single column segment starting at 0, rising up to COL_H
    return new THREE.BoxGeometry(0.06, COL_H, 0.06);
  }, []);

  const beamGeom = useMemo(() => {
    // A beam connecting adjacent columns (span = 0.8)
    return new THREE.BoxGeometry(0.8, 0.045, 0.045);
  }, []);

  const braceGeom = useMemo(() => {
    const parts = [];
    // Diagonal cross braces in the left and right bays
    parts.push(makeBeam(-1.2, BASE_Y, 0, -0.4, BASE_Y + COL_H, 0, 0.02));
    parts.push(makeBeam(-1.2, BASE_Y + COL_H, 0, -0.4, BASE_Y, 0, 0.02));
    parts.push(makeBeam(0.4, BASE_Y, 0, 1.2, BASE_Y + COL_H, 0, 0.02));
    parts.push(makeBeam(0.4, BASE_Y + COL_H, 0, 1.2, BASE_Y, 0, 0.02));
    return mergeParts(parts);
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
      const sc = (isH ? 1.018 : 1.0) * (1 + Math.sin(t * 0.3) * 0.006);
      mainRef.current.scale.setScalar(
        THREE.MathUtils.lerp(mainRef.current.scale.x, sc, 0.03)
      );
    }

    // --- CONSTRUCTION SEQUENCE STEP ANIMATIONS ---

    // 1. Foundation Slab (Scroll: 0.0 -> 0.2)
    if (foundationRef.current) {
      const fProg = Math.min(1.0, Math.max(0.0, scroll / 0.2));
      foundationRef.current.scale.set(fProg, 1, fProg);
    }

    // 2. Columns rising (Scroll: 0.2 -> 0.5)
    colRefs.forEach((ref, idx) => {
      if (ref.current) {
        const start = 0.2 + idx * 0.05; // staggered start
        const end = start + 0.15;
        const cProg = Math.min(1.0, Math.max(0.0, (scroll - start) / (end - start)));
        // scale from bottom: position must adjust as scaleY grows
        ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, cProg, 0.08);
        ref.current.position.y = BASE_Y + (COL_H * ref.current.scale.y) / 2;
      }
    });

    // 3. Beams spanning (Scroll: 0.5 -> 0.75)
    beamRefs.forEach((ref, idx) => {
      if (ref.current) {
        const start = 0.5 + idx * 0.06;
        const end = start + 0.12;
        const bProg = Math.min(1.0, Math.max(0.0, (scroll - start) / (end - start)));
        ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, bProg, 0.08);
      }
    });

    // 4. Bracing fade/scale (Scroll: 0.75 -> 0.9)
    if (braceRef.current) {
      const brProg = Math.min(1.0, Math.max(0.0, (scroll - 0.75) / 0.15));
      braceRef.current.scale.setScalar(THREE.MathUtils.lerp(braceRef.current.scale.x, brProg, 0.08));
    }

    // 5. Roof descending (Scroll: 0.9 -> 1.0)
    if (roofRef.current) {
      const rProg = Math.min(1.0, Math.max(0.0, (scroll - 0.9) / 0.1));
      // Descends from above
      const startY = BASE_Y + COL_H + 0.8;
      const endY = BASE_Y + COL_H + 0.03;
      roofRef.current.position.y = THREE.MathUtils.lerp(roofRef.current.position.y, THREE.MathUtils.lerp(startY, endY, rProg), 0.08);
      roofRef.current.scale.setScalar(THREE.MathUtils.lerp(roofRef.current.scale.x, rProg, 0.08));
    }

    // Camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.05) * 0.2 + mouse.x * 0.1, 0.01);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, isH ? 4.0 : 4.6, 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={mainRef}>
      {/* 1. Foundation slab */}
      <group ref={foundationRef} position={[0, BASE_Y - 0.04, 0]}>
        <mesh material={mats.foundation}>
          <boxGeometry args={[3.2, 0.08, 0.8]} />
        </mesh>
      </group>

      {/* 2. Rising columns */}
      {COL_X.map((x, idx) => (
        <group key={idx} ref={colRefs[idx]} position={[x, BASE_Y, 0]} scale={[1, 0, 1]}>
          <mesh geometry={colGeom} material={mats.columns} />
        </group>
      ))}

      {/* 3. Spanning horizontal beams */}
      {/* Beam 0: Col 0 -> Col 1 */}
      <group ref={beamRefs[0]} position={[-0.8, BASE_Y + COL_H, 0]} scale={[0, 1, 1]}>
        <mesh geometry={beamGeom} material={mats.beams} />
      </group>
      {/* Beam 1: Col 1 -> Col 2 */}
      <group ref={beamRefs[1]} position={[0, BASE_Y + COL_H, 0]} scale={[0, 1, 1]}>
        <mesh geometry={beamGeom} material={mats.beams} />
      </group>
      {/* Beam 2: Col 2 -> Col 3 */}
      <group ref={beamRefs[2]} position={[0.8, BASE_Y + COL_H, 0]} scale={[0, 1, 1]}>
        <mesh geometry={beamGeom} material={mats.beams} />
      </group>

      {/* 4. Diagonal cross bracing */}
      <group ref={braceRef} scale={[0, 0, 0]}>
        {braceGeom && <mesh geometry={braceGeom} material={mats.bracing} />}
      </group>

      {/* 5. Roof slab */}
      <group ref={roofRef} position={[0, BASE_Y + COL_H + 0.8, 0]} scale={[0, 0, 0]}>
        <mesh material={mats.roof}>
          <boxGeometry args={[3.4, 0.06, 0.9]} />
        </mesh>
      </group>
    </group>
  );
}

export default function EvolutionSculpture() {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas dark hoverRef={interaction.hoverRef}>
      <EvolutionScene {...interaction} />
    </SculptureCanvas>
  );
}
