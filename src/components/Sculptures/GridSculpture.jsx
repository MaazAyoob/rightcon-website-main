/**
 * GridSculpture — Technology Page
 * Theme: Innovation
 *
 * A kinetic engineering sculpture inspired by computational design and parametric
 * architecture. A triangular space-frame grid where node positions breathing/flex.
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBeam, makeJoint, mergeParts, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import SculptureCanvas from './SculptureCanvas';

const NODES = [
  [-1.0,  0.6,  0.2], [ 0.0,  0.8, -0.1], [ 1.0,  0.6,  0.3],
  [-1.2,  0.0, -0.3], [ 0.0,  0.1,  0.2], [ 1.2, -0.1, -0.2],
  [-0.9, -0.6,  0.1], [ 0.0, -0.7, -0.3], [ 1.0, -0.5,  0.2],
  [-0.5,  0.3, -0.4], [ 0.5,  0.4,  0.4],
  [-0.6, -0.3,  0.3], [ 0.5, -0.2, -0.3],
];

// Connection lines indices pairs
const EDGES = [
  [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8],
  [0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8],
  [0, 9], [9, 1], [1, 10], [10, 2],
  [3, 9], [9, 4], [4, 10], [10, 5],
  [3, 11], [11, 4], [4, 12], [12, 5],
  [6, 11], [11, 7], [7, 12], [12, 8],
  [9, 11], [10, 12], [9, 10], [11, 12]
];

function GridScene({ mouseRef, hoverRef, scrollRef, tick }) {
  const mainRef = useRef();

  const mats = useMemo(() => ({
    beam:  makeMat('secondary'),
    joint: makeMat('joint'),
  }), []);

  // Update dynamic space frame geometry on every frame using dynamic mesh groupings
  // to avoid garbage collection overhead, we use direct three.js Object3D references or
  // draw them as separate instance meshes. To keep code extremely simple and performance high,
  // we will animate the nodes' positions in useFrame, and reconstruct the lines/beams or
  // use helper lines. Let's make an arrays of nodes and connect them with Cylinder/Box components.
  // This is highly robust.
  const jointsRef = useRef([]);
  const beamsRef = useRef([]);

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
      const sc = (isH ? 1.020 : 1.0) * (1 + Math.sin(t * 0.35) * 0.008);
      mainRef.current.scale.setScalar(
        THREE.MathUtils.lerp(mainRef.current.scale.x, sc, 0.028)
      );
    }

    // Dynamic wave/displacement on nodes (computational grid breathing)
    const positions = NODES.map((n, idx) => {
      const freq = 0.4 + idx * 0.05;
      const amp = 0.08 + scroll * 0.12;
      return new THREE.Vector3(
        n[0] + Math.sin(t * freq) * amp,
        n[1] + Math.cos(t * freq * 0.9) * amp,
        n[2] + Math.sin(t * freq * 1.2) * amp
      );
    });

    // Update joint positions
    positions.forEach((pos, idx) => {
      if (jointsRef.current[idx]) {
        jointsRef.current[idx].position.copy(pos);
      }
    });

    // Update connecting beams (scale & rotation)
    EDGES.forEach((edge, idx) => {
      const mesh = beamsRef.current[idx];
      if (mesh) {
        const pA = positions[edge[0]];
        const pB = positions[edge[1]];
        const dir = pB.clone().sub(pA);
        const len = dir.length();

        mesh.position.addVectors(pA, pB).multiplyScalar(0.5);
        mesh.scale.set(1, len, 1);

        const quat = new THREE.Quaternion();
        const norm = dir.normalize();
        if (norm.y < -0.9999) {
          quat.set(0, 0, 1, 0);
        } else {
          quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), norm);
        }
        mesh.quaternion.copy(quat);
      }
    });

    // Camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.05) * 0.18 + mouse.x * 0.1, 0.01);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, isH ? 4.0 : 4.6, 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={mainRef}>
      {/* Dynamic joints */}
      {NODES.map((_, idx) => (
        <mesh
          key={idx}
          ref={(el) => (jointsRef.current[idx] = el)}
          material={mats.joint}
        >
          <boxGeometry args={[0.055, 0.055, 0.055]} />
        </mesh>
      ))}

      {/* Dynamic connecting beams */}
      {EDGES.map((_, idx) => (
        <mesh
          key={idx}
          ref={(el) => (beamsRef.current[idx] = el)}
          material={mats.beam}
        >
          <boxGeometry args={[0.016, 1.0, 0.016]} />
        </mesh>
      ))}
    </group>
  );
}

export default function GridSculpture() {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas dark hoverRef={interaction.hoverRef}>
      <GridScene {...interaction} />
    </SculptureCanvas>
  );
}
