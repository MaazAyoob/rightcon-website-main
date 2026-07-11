/**
 * ProjectSculpture — Project Detail Page
 * Theme: The Project Architecture
 *
 * Renders a specialized sculpture based on project type:
 *   - Luxury Villa (emerald-terraces, jayalakshmipuram-villa): Elegant flowing architectural ribs
 *   - Commercial / Monolith (koramangala-monolith): Sharp geometric frames / towers
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBeam, makeBox, makeJoint, makeArcBeams, mergeParts, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import SculptureCanvas from './SculptureCanvas';

function buildVillaRibs() {
  const parts = [];
  // Build elegant curved vertical ribs fanned outwards
  for (let i = 0; i < 6; i++) {
    const angle = (i / 5) * Math.PI * 0.4 - Math.PI * 0.2; // fan spread -36deg to +36deg
    const x = Math.sin(angle) * 0.8;
    const z = Math.cos(angle) * 0.8 - 0.8;

    // Outer rib curve
    const arcParts = makeArcBeams(x, -0.7, z, 0.6 + i * 0.12, 1.3, angle, 12, 0.024);
    if (arcParts) parts.push(...arcParts);

    // Structural columns
    parts.push(makeBeam(x, -0.7, z, x, 0.6, z, 0.028));
  }
  return mergeParts(parts);
}

function buildMonolithFrames() {
  const parts = [];
  // 3 sharp layered geometric rectangular frames rotated at offsets
  const widths = [1.2, 0.9, 0.6];
  const heights = [1.5, 1.1, 0.7];
  const depthOffsets = [0.2, 0, -0.2];

  widths.forEach((w, idx) => {
    const h = heights[idx];
    const z = depthOffsets[idx];
    const halfW = w / 2;
    const halfH = h / 2;

    // Outer frame rectangle
    parts.push(makeBeam(-halfW, -halfH, z,  halfW, -halfH, z, 0.045)); // bottom
    parts.push(makeBeam(-halfW,  halfH, z,  halfW,  halfH, z, 0.045)); // top
    parts.push(makeBeam(-halfW, -halfH, z, -halfW,  halfH, z, 0.045)); // left
    parts.push(makeBeam( halfW, -halfH, z,  halfW,  halfH, z, 0.045)); // right

    // Cross braces
    parts.push(makeBeam(-halfW, -halfH, z,  halfW,  halfH, z, 0.022));

    // Corner joints
    parts.push(makeJoint(-halfW, -halfH, z, 0.055));
    parts.push(makeJoint( halfW, -halfH, z, 0.055));
    parts.push(makeJoint(-halfW,  halfH, z, 0.055));
    parts.push(makeJoint( halfW,  halfH, z, 0.055));
  });

  return mergeParts(parts);
}

function ProjectScene({ projectId, mouseRef, hoverRef, scrollRef, tick }) {
  const mainRef = useRef();

  const mats = useMemo(() => ({
    frame: makeMat('primary'),
    joint: makeMat('joint'),
    accent: makeMat('accent'),
  }), []);

  const geom = useMemo(() => {
    const isVilla = projectId === 'emerald-terraces' || projectId === 'jayalakshmipuram-villa';
    return isVilla ? buildVillaRibs() : buildMonolithFrames();
  }, [projectId]);

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
      mainRef.current.rotation.y = t * 0.015 + spY + scroll * 0.4;
      const sc = (isH ? 1.018 : 1.0) * (1 + Math.sin(t * 0.35) * 0.007);
      mainRef.current.scale.setScalar(
        THREE.MathUtils.lerp(mainRef.current.scale.x, sc, 0.028)
      );
    }

    // Camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.05) * 0.18 + mouse.x * 0.1, 0.01);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, isH ? 4.0 : 4.6, 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={mainRef}>
      {geom && <mesh geometry={geom} material={mats.frame} />}
    </group>
  );
}

export default function ProjectSculpture({ projectId }) {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas hoverRef={interaction.hoverRef}>
      <ProjectScene projectId={projectId} {...interaction} />
    </SculptureCanvas>
  );
}
