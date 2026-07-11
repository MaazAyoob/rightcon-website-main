/**
 * ContactSculpture — Contact Page
 * Theme: Connection & Welcome
 *
 * An open welcoming architectural gateway.
 * When a form field is focused, the sculpture rotates 5 degrees (0.09 rad) toward the form.
 * After successful submission, the header beam rises (the portal "opens" up).
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBeam, makeBox, makeJoint, mergeParts, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import { useScrollSystem } from '../../context/ScrollContext';
import SculptureCanvas from './SculptureCanvas';

const W = 0.052; // Column width

function buildPortalFrames() {
  const parts = [];

  // Left frame (Column A + Column B + horizontal tie)
  parts.push(makeBeam(-0.8, -0.8, 0, -0.8, 0.8, 0, W));
  parts.push(makeBeam(-0.4, -0.8, 0, -0.4, 0.4, 0, W * 0.75));
  parts.push(makeBeam(-0.8, 0.2, 0, -0.4, 0.2, 0, 0.024));

  // Right frame (Column C + Column D + horizontal tie)
  parts.push(makeBeam(0.4, -0.8, 0, 0.4, 0.4, 0, W * 0.75));
  parts.push(makeBeam(0.8, -0.8, 0, 0.8, 0.8, 0, W));
  parts.push(makeBeam(0.4, 0.2, 0, 0.8, 0.2, 0, 0.024));

  // Base plates
  parts.push(makeBox(-0.6, -0.83, 0, 0.6, 0.06, 0.3));
  parts.push(makeBox(0.6, -0.83, 0, 0.6, 0.06, 0.3));

  return mergeParts(parts);
}

function buildJoints() {
  const parts = [];
  parts.push(makeJoint(-0.8, 0.8, 0, 0.07));
  parts.push(makeJoint(0.8, 0.8, 0, 0.07));
  parts.push(makeJoint(-0.4, 0.4, 0, 0.058));
  parts.push(makeJoint(0.4, 0.4, 0, 0.058));
  return mergeParts(parts);
}

function ContactScene({ mouseRef, hoverRef, tick }) {
  const mainRef = useRef();
  const headerRef = useRef();
  const { formFieldFocus, formSuccess } = useScrollSystem();

  const mats = useMemo(() => ({
    frame: makeMat('primary'),
    joint: makeMat('joint'),
    header: makeMat('accent'),
  }), []);

  const geos = useMemo(() => ({
    frame: buildPortalFrames(),
    joint: buildJoints(),
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouse = mouseRef.current;
    const isH = hoverRef.current;

    // Form focus tilt (if field focused, tilt gently to the right/form side)
    const focusTilt = formFieldFocus ? 0.12 : 0.0;
    const submitLift = formSuccess ? 0.25 : 0.0;

    const { spX, spY } = tick(
      isH ? -mouse.y * 0.12 : 0,
      (isH ? mouse.x * 0.16 : 0) + focusTilt
    );

    if (mainRef.current) {
      mainRef.current.rotation.x = spX;
      mainRef.current.rotation.y = t * 0.015 + spY;
      const sc = (isH ? 1.018 : 1.0) * (1 + Math.sin(t * 0.35) * 0.007);
      mainRef.current.scale.setScalar(
        THREE.MathUtils.lerp(mainRef.current.scale.x, sc, 0.028)
      );
    }

    // Celebratory open animation (raise top beam when successfully submitted)
    if (headerRef.current) {
      const targetY = 0.8 + submitLift + Math.sin(t * 0.6) * (formSuccess ? 0.03 : 0.005);
      headerRef.current.position.y = THREE.MathUtils.lerp(headerRef.current.position.y, targetY, 0.06);
    }

    // Camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.05) * 0.18 + mouse.x * 0.1, 0.01);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, isH ? 4.0 : 4.6, 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={mainRef}>
      {geos.frame && <mesh geometry={geos.frame} material={mats.frame} />}
      {geos.joint && <mesh geometry={geos.joint} material={mats.joint} />}

      {/* Header Beam (pivots / opens up on formSuccess) */}
      <group ref={headerRef} position={[0, 0.8, 0]}>
        <mesh material={mats.header}>
          <boxGeometry args={[1.7, 0.05, 0.05]} />
        </mesh>
        {/* Subtle suspended panel design accent under header */}
        <mesh position={[0, -0.1, 0]} material={mats.frame}>
          <boxGeometry args={[0.8, 0.15, 0.015]} />
        </mesh>
      </group>
    </group>
  );
}

export default function ContactSculpture() {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas dark hoverRef={interaction.hoverRef}>
      <ContactScene {...interaction} />
    </SculptureCanvas>
  );
}
