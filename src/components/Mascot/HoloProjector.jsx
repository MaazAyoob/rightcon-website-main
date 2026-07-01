import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HoloProjector({ posRef, scaleRef }) {
  const beamRef = useRef();
  const holoRef = useRef();
  const flareRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Read the latest interpolated mascot coordinates from the ref
    const mascotPos = posRef.current;
    
    // Shift hologram position laterally towards the center of the screen
    const isMascotOnRight = mascotPos.x > 0;
    const holoX = isMascotOnRight ? mascotPos.x - 1.2 : mascotPos.x + 1.2;
    const holoY = mascotPos.y + 0.6;
    const holoZ = mascotPos.z + 0.2;

    // Shift emitter coordinate near the mascot right/left hand
    const emitterX = isMascotOnRight ? mascotPos.x - 0.4 : mascotPos.x + 0.4;
    const emitterY = mascotPos.y + 0.1;
    const emitterZ = mascotPos.z + 0.2;

    const currentHoloY = holoY + Math.sin(t * 1.5) * 0.05;

    // 1. Move and rotate holographic villa model
    if (holoRef.current) {
      holoRef.current.position.set(holoX, currentHoloY, holoZ);
      holoRef.current.rotation.y = t * 0.35;
    }

    // 2. Align and scale volumetric cylinder light cone
    if (beamRef.current) {
      const start = new THREE.Vector3(emitterX, emitterY, emitterZ);
      const end = new THREE.Vector3(holoX, currentHoloY, holoZ);
      const distance = start.distanceTo(end);
      
      const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      
      const alignMatrix = new THREE.Matrix4().lookAt(end, start, new THREE.Vector3(0, 1, 0));
      const rotation = new THREE.Euler().setFromRotationMatrix(alignMatrix);
      rotation.x += Math.PI / 2; // Offset geometry orientation

      beamRef.current.position.copy(position);
      beamRef.current.rotation.copy(rotation);
      
      // Scale height/distance of cylinder dynamically
      beamRef.current.scale.set(1, distance, 1);
      
      // Pulse brightness
      beamRef.current.material.opacity = 0.06 + Math.abs(Math.sin(t * 3.0)) * 0.04;
    }

    // 3. Move emitter flare mesh
    if (flareRef.current) {
      flareRef.current.position.set(emitterX, emitterY, emitterZ);
    }
  });

  return (
    <group>
      {/* 1. VOLUMETRIC LIGHT BEAM (aligned on frame renders) */}
      <mesh ref={beamRef}>
        {/* Unit cylinder geometry that we scale on the Y axis in useFrame */}
        <cylinderGeometry args={[0.02, 0.4, 1.0, 16, 1, true]} />
        <meshBasicMaterial
          color="#00f3ff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Emitter glow flare */}
      <mesh ref={flareRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.6} />
      </mesh>

      {/* 2. HOLOGRAPHIC MODEL */}
      <group ref={holoRef}>
        {/* Floating Blueprint Base Grid */}
        <gridHelper 
          args={[1.2, 10, '#00f3ff', '#004455']} 
          position={[0, -0.4, 0]} 
          rotation={[0, 0, 0]}
        />

        {/* Dynamic Architectural Wireframes */}
        {/* Foundation/Slab */}
        <mesh position={[0, -0.38, 0]}>
          <boxGeometry args={[0.9, 0.04, 0.9]} />
          <meshBasicMaterial color="#00f3ff" wireframe />
        </mesh>

        {/* Villa Block 1 (First floor block) */}
        <mesh position={[-0.1, -0.15, 0]}>
          <boxGeometry args={[0.6, 0.4, 0.6]} />
          <meshBasicMaterial color="#00f3ff" wireframe />
        </mesh>

        {/* Villa Block 2 (Cantilever second floor block, shifted right/forward) */}
        <mesh position={[0.15, 0.15, 0.15]}>
          <boxGeometry args={[0.6, 0.3, 0.6]} />
          <meshBasicMaterial color="#00f3ff" wireframe />
        </mesh>

        {/* Glass Wall Pane Frame */}
        <mesh position={[0.3, 0.15, 0.45]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#00f3ff" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>

        {/* Minimal columns */}
        <mesh position={[0.4, -0.15, 0.4]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 6]} />
          <meshBasicMaterial color="#00f3ff" wireframe />
        </mesh>
        <mesh position={[-0.4, -0.15, 0.4]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 6]} />
          <meshBasicMaterial color="#00f3ff" wireframe />
        </mesh>

        {/* Concentric blueprint orbit rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
          <torusGeometry args={[0.7, 0.005, 4, 32]} />
          <meshBasicMaterial color="#00aaee" transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}
