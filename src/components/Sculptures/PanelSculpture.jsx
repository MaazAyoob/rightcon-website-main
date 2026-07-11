/**
 * PanelSculpture — Materials Page
 * Theme: Craftsmanship & Materials
 *
 * 5 thin metallic plates, fanned out in a spread of CNC-machined panels.
 * Each plate showcases slightly different material properties (roughness,
 * metalness, specular color offsets) to represent titanium, brushed steel, etc.
 * Scroll changes the spread rotation.
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeBox, makeMat } from './sculptureGeom';
import { useSculptureInteraction } from '../../hooks/useSculptureInteraction';
import SculptureCanvas from './SculptureCanvas';

const NUM_PANELS = 5;

function PanelScene({ mouseRef, hoverRef, scrollRef, tick }) {
  const mainRef = useRef();
  const panelRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const mats = useMemo(() => {
    return [
      makeMat('primary', { roughness: 0.15, metalness: 0.98, color: new THREE.Color('#D8DCE2') }), // Highly polished titanium
      makeMat('secondary', { roughness: 0.35, metalness: 0.88, color: new THREE.Color('#B4B8BF') }), // Satin aluminium
      makeMat('depth', { roughness: 0.45, metalness: 0.82, color: new THREE.Color('#8C9098') }), // Sandblasted grey
      makeMat('accent', { roughness: 0.05, metalness: 0.99, color: new THREE.Color('#EAF0F6') }), // Chrome spec
      makeMat('dark', { roughness: 0.28, metalness: 0.90, color: new THREE.Color('#6C7076') }), // Gunmetal steel
    ];
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

    // Adjust fan angle/spread of panels based on scroll
    // Scroll increases/decreases the fan spread
    const maxFan = 0.45 + scroll * 0.25;

    panelRefs.forEach((ref, idx) => {
      if (ref.current) {
        // Distribute rotation from -maxFan to +maxFan
        const ratio = (idx / (NUM_PANELS - 1)) * 2 - 1; // -1.0 to 1.0
        const targetRotZ = ratio * maxFan;
        const targetX = ratio * 0.35;
        const targetY = -Math.abs(ratio) * 0.15;
        const targetZ = -idx * 0.18; // layered depth offset

        ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetRotZ, 0.05);
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.05);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.05);
        ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.05);

        // Add a micro-breathe on each individual panel rotation
        ref.current.rotation.y = Math.sin(t * 0.3 + idx) * 0.02;
      }
    });

    // Camera
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(t * 0.05) * 0.18 + mouse.x * 0.1, 0.01);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, isH ? 3.9 : 4.5, 0.025);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={mainRef}>
      {/* 5 Layered metallic plates */}
      {mats.map((mat, idx) => (
        <group key={idx} ref={panelRefs[idx]}>
          {/* Main sheet panel */}
          <mesh material={mat} castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.9, 0.03]} />
          </mesh>
          {/* Subtle joint rivets at corners */}
          <mesh position={[-0.7, 0.4, 0.02]} material={mats[3]}>
            <sphereGeometry args={[0.02, 8, 8]} />
          </mesh>
          <mesh position={[0.7, 0.4, 0.02]} material={mats[3]}>
            <sphereGeometry args={[0.02, 8, 8]} />
          </mesh>
          <mesh position={[-0.7, -0.4, 0.02]} material={mats[3]}>
            <sphereGeometry args={[0.02, 8, 8]} />
          </mesh>
          <mesh position={[0.7, -0.4, 0.02]} material={mats[3]}>
            <sphereGeometry args={[0.02, 8, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function PanelSculpture() {
  const interaction = useSculptureInteraction();
  return (
    <SculptureCanvas dark hoverRef={interaction.hoverRef}>
      <PanelScene {...interaction} />
    </SculptureCanvas>
  );
}
