/**
 * FoundationSculpture — About Page
 * Theme: Growth & Foundation
 *
 * 4 structural column stacks of increasing height, connected by horizontal
 * beams. As scroll increases, upper column extensions grow into view —
 * symbolising a company building itself up over time.
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBeam, makeBox, makeJoint, mergeParts, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import SculptureCanvas from './SculptureCanvas';

const COL_X   = [-1.5, -0.5, 0.5, 1.5];
const COL_H   = [0.9,  1.3,  1.7,  1.4];   // column heights (varied skyline)
const BASE_Y  = -0.9;

function buildFoundationGeo() {
  const pb = [], bb = [], jb = [];

  // Base plinth slab
  bb.push(makeBox(0, BASE_Y - 0.04, 0, 3.6, 0.08, 0.60));

  COL_X.forEach((x, i) => {
    const h = COL_H[i];
    const topY = BASE_Y + h;

    // Main column shaft
    pb.push(makeBeam(x, BASE_Y, 0, x, topY, 0, 0.050));

    // Horizontal beams at every 0.4 units up the column
    if (i < COL_X.length - 1) {
      const x2 = COL_X[i + 1];
      const sharedH = Math.min(COL_H[i], COL_H[i + 1]);
      for (let fy = 0; fy <= sharedH - 0.3; fy += 0.4) {
        const y = BASE_Y + fy;
        pb.push(makeBeam(x, y, 0, x2, y, 0, 0.030));
      }
    }

    // Joint nodes at column base and top
    jb.push(makeJoint(x, BASE_Y,  0, 0.058));
    jb.push(makeJoint(x, topY, 0, 0.048));
  });

  return {
    baseGeo: mergeParts(bb),
    frameGeo: mergeParts(pb),
    jointGeo: mergeParts(jb),
  };
}

// Upper extension columns — animated by scroll
function buildExtensions() {
  // Each column gets an upper extension piece that grows via scaleY
  return COL_X.map((x, i) => {
    const topY = BASE_Y + COL_H[i];
    const extH = [0.5, 0.6, 0.5, 0.4][i];
    return { x, startY: topY, endY: topY + extH, extH };
  });
}

function FoundationScene({ mouseRef, hoverRef, scrollRef, tick }) {
  const mainRef = useRef();
  const extRefs = [useRef(), useRef(), useRef(), useRef()];
  const spY     = useRef(0);

  const mats = useMemo(() => ({
    base:  makeMat('depth'),
    frame: makeMat('primary'),
    joint: makeMat('joint'),
    ext:   makeMat('accent'),
  }), []);

  const geos = useMemo(() => buildFoundationGeo(), []);
  const exts = useMemo(() => buildExtensions(), []);

  useFrame((state) => {
    const t      = state.clock.getElapsedTime();
    const mouse  = mouseRef.current;
    const isH    = hoverRef.current;
    const scroll = Math.min(scrollRef.current, 1.0);

    const { spX, spY: sy } = tick(
      isH ? -mouse.y * 0.12 : 0,
      isH ?  mouse.x * 0.16 : 0,
    );

    if (mainRef.current) {
      mainRef.current.rotation.x = spX;
      mainRef.current.rotation.y = t * 0.015 + sy;
      const sc = (isH ? 1.016 : 1.0) * (1 + Math.sin(t * 0.35) * 0.008);
      mainRef.current.scale.setScalar(
        THREE.MathUtils.lerp(mainRef.current.scale.x, sc, 0.028)
      );
    }

    // Scroll-driven extension growth
    extRefs.forEach((ref, i) => {
      if (!ref.current) return;
      const delay = i * 0.12;
      const t0 = Math.min(1, Math.max(0, (scroll - delay) / (1 - delay)));
      const scaleY = THREE.MathUtils.lerp(ref.current.scale.y, t0, 0.06);
      ref.current.scale.y = scaleY;
      // Grow from bottom → move pivot to base of extension
      ref.current.position.y = exts[i].startY + (exts[i].extH * scaleY) / 2;
    });

    // Camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.05) * 0.20 + mouse.x * 0.10, 0.010);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, isH ? 4.0 : 4.6, 0.025);
    state.camera.lookAt(0, 0.1, 0);
  });

  return (
    <group ref={mainRef} position={[0.2, 0.2, 0]}>
      {geos.baseGeo  && <mesh geometry={geos.baseGeo}  material={mats.base}  />}
      {geos.frameGeo && <mesh geometry={geos.frameGeo} material={mats.frame} />}
      {geos.jointGeo && <mesh geometry={geos.jointGeo} material={mats.joint} />}

      {/* Upper extensions — scroll-driven growth */}
      {exts.map((ext, i) => (
        <group key={i} ref={extRefs[i]} position={[ext.x, ext.startY, 0]} scale={[1, 0, 1]}>
          <mesh material={mats.ext}>
            <boxGeometry args={[0.044, ext.extH, 0.044]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function FoundationSculpture() {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas dark hoverRef={interaction.hoverRef}>
      <FoundationScene {...interaction} />
    </SculptureCanvas>
  );
}
