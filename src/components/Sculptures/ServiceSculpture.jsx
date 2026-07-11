/**
 * ServiceSculpture — Service Detail Page
 * Theme: Engineering Systems Detail
 *
 * Renders real estate/structural specific sculptures:
 *   - Turnkey / Construction: Stacked structural column/building skeleton
 *   - Architecture / BIM: Interconnected space frame structural grid
 *   - Interiors / Materials / BOQ: Precision measuring framework panel grid
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBeam, makeBox, makeJoint, mergeParts, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import SculptureCanvas from './SculptureCanvas';

function buildBuildingSkeleton() {
  const parts = [];
  // 4 columns
  parts.push(makeBeam(-0.6, -0.8, -0.6, -0.6, 0.8, -0.6, 0.04));
  parts.push(makeBeam( 0.6, -0.8, -0.6,  0.6, 0.8, -0.6, 0.04));
  parts.push(makeBeam(-0.6, -0.8,  0.6, -0.6, 0.8,  0.6, 0.04));
  parts.push(makeBeam( 0.6, -0.8,  0.6,  0.6, 0.8,  0.6, 0.04));

  // Horizontal structural floor bands at Y = -0.4, 0.2, 0.8
  const floors = [-0.4, 0.2, 0.8];
  floors.forEach((y) => {
    parts.push(makeBeam(-0.6, y, -0.6,  0.6, y, -0.6, 0.03));
    parts.push(makeBeam( 0.6, y, -0.6,  0.6, y,  0.6, 0.03));
    parts.push(makeBeam( 0.6, y,  0.6, -0.6, y,  0.6, 0.03));
    parts.push(makeBeam(-0.6, y,  0.6, -0.6, y, -0.6, 0.03));
    // Cross diagonals on floors
    parts.push(makeBeam(-0.6, y, -0.6,  0.6, y,  0.6, 0.015));
  });

  // Corner joint pegs
  const corners = [
    [-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]
  ];
  corners.forEach((c) => {
    floors.forEach((y) => {
      parts.push(makeJoint(c[0], y, c[1], 0.055));
    });
  });

  return mergeParts(parts);
}

function buildStructuralGrid() {
  const parts = [];
  // Irregular interconnected structural space-frame grid representing BIM coordination
  const points = [
    [-0.8, -0.6, -0.4], [0.8, -0.6, -0.4], [0.8, 0.6, -0.4], [-0.8, 0.6, -0.4],
    [-0.5, -0.3,  0.4], [0.5, -0.3,  0.4], [0.5, 0.5,  0.4], [-0.5, 0.5,  0.4],
    [0.0, 0.9, 0.0], [0.0, -0.9, 0.0]
  ];

  // Draw beams between points
  points.forEach((p, idx) => {
    parts.push(makeJoint(p[0], p[1], p[2], 0.05));
    // Connect to next index in ring
    if (idx < 4) {
      const next = (idx + 1) % 4;
      parts.push(makeBeam(p[0], p[1], p[2], points[next][0], points[next][1], points[next][2], 0.024));
      // Connect to depth counterpart
      parts.push(makeBeam(p[0], p[1], p[2], points[idx + 4][0], points[idx + 4][1], points[idx + 4][2], 0.024));
    } else if (idx < 8) {
      const next = 4 + ((idx - 4 + 1) % 4);
      parts.push(makeBeam(p[0], p[1], p[2], points[next][0], points[next][1], points[next][2], 0.024));
    }
  });

  // Connect top and bottom apexes
  parts.push(makeBeam(0.0, 0.9, 0.0, 0.8, 0.6, -0.4, 0.02));
  parts.push(makeBeam(0.0, 0.9, 0.0, -0.8, 0.6, -0.4, 0.02));
  parts.push(makeBeam(0.0, 0.9, 0.0, 0.5, 0.5, 0.4, 0.02));
  parts.push(makeBeam(0.0, 0.9, 0.0, -0.5, 0.5, 0.4, 0.02));

  parts.push(makeBeam(0.0, -0.9, 0.0, 0.8, -0.6, -0.4, 0.02));
  parts.push(makeBeam(0.0, -0.9, 0.0, -0.8, -0.6, -0.4, 0.02));
  parts.push(makeBeam(0.0, -0.9, 0.0, 0.5, -0.3, 0.4, 0.02));
  parts.push(makeBeam(0.0, -0.9, 0.0, -0.5, -0.3, 0.4, 0.02));

  return mergeParts(parts);
}

function buildMeasuringFrame() {
  const parts = [];
  // Flat structured panel measuring board (representing BOQ drafting / interiors)
  parts.push(makeBox(0, 0, 0, 1.4, 1.4, 0.03)); // base board
  // Grid divisions on top
  for (let x = -0.6; x <= 0.6; x += 0.3) {
    parts.push(makeBeam(x, -0.7, 0.02, x, 0.7, 0.02, 0.015));
  }
  for (let y = -0.6; y <= 0.6; y += 0.3) {
    parts.push(makeBeam(-0.7, y, 0.02, 0.7, y, 0.02, 0.015));
  }
  return mergeParts(parts);
}

function ServiceScene({ serviceId, mouseRef, hoverRef, scrollRef, tick }) {
  const mainRef = useRef();

  const mats = useMemo(() => ({
    frame: makeMat('primary'),
    joint: makeMat('joint'),
  }), []);

  const geom = useMemo(() => {
    if (serviceId === 'turnkey' || serviceId === 'structural-engineering' || serviceId === 'project-management') {
      return buildBuildingSkeleton();
    }
    if (serviceId === 'architecture' || serviceId === 'bim-coordination') {
      return buildStructuralGrid();
    }
    return buildMeasuringFrame();
  }, [serviceId]);

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

export default function ServiceSculpture({ serviceId }) {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas hoverRef={interaction.hoverRef}>
      <ServiceScene serviceId={serviceId} {...interaction} />
    </SculptureCanvas>
  );
}
