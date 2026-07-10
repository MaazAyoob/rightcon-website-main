import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollSystem } from '../../context/ScrollContext';
import { BRAND_COLORS } from '../../config/colors';

export default function FuturisticKey() {
  const { 
    introActive,
    introKeyPos, 
    introKeyRot, 
    introKeyScale, 
    introKeyOpacity,
    exitTransitionRef
  } = useScrollSystem();

  const groupRef = useRef();
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const holoHouseRef = useRef();

  const [hovered, setHovered] = useState(false);

  // Materials
  const goldMaterial = new THREE.MeshPhysicalMaterial({
    color: BRAND_COLORS.accent,
    roughness: 0.1,
    metalness: 0.95,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const bronzeMaterial = new THREE.MeshStandardMaterial({
    color: BRAND_COLORS.accent,
    roughness: 0.25,
    metalness: 0.85,
  });

  const crystalMaterial = new THREE.MeshPhysicalMaterial({
    color: BRAND_COLORS.white,
    roughness: 0.05,
    metalness: 0.05,
    transparent: true,
    opacity: 0.75,
    transmission: 0.9,
    ior: 1.5,
    thickness: 0.5,
  });

  const glowingCyanMaterial = new THREE.MeshBasicMaterial({
    color: BRAND_COLORS.primary,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: BRAND_COLORS.primary,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
  });

  // Track hover status to update cursor
  useEffect(() => {
    if (introActive && hovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered, introActive]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (exitTransitionRef?.current?.triggerEnter) {
      exitTransitionRef.current.triggerEnter();
    }
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Only render/animate if intro is active
    if (!groupRef.current || !introActive) return;

    // Apply values from the GSAP-animated refs
    const scale = introKeyScale?.current?.value ?? 0;
    groupRef.current.scale.set(scale, scale, scale);
    
    if (scale > 0.001) {
      groupRef.current.position.copy(introKeyPos.current);
      groupRef.current.rotation.copy(introKeyRot.current);
      
      // Auto-rotations for gyroscopic elements
      if (coreRef.current) {
        coreRef.current.rotation.y = t * 1.5;
        coreRef.current.position.y = Math.sin(t * 2.0) * 0.05; // Gentle float bounce
      }
      if (holoHouseRef.current) {
        holoHouseRef.current.rotation.y = t * 2.5 + (hovered ? Math.sin(t * 8) * 0.5 : 0);
        holoHouseRef.current.rotation.x = t * 0.5;
      }
      if (ring1Ref.current) {
        ring1Ref.current.rotation.x = t * 0.8;
        ring1Ref.current.rotation.y = t * 0.4;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.y = -t * 0.6;
        ring2Ref.current.rotation.z = t * 0.3;
      }
      if (ring3Ref.current) {
        ring3Ref.current.rotation.x = -t * 0.4;
        ring3Ref.current.rotation.z = -t * 0.7;
      }

      // Adjust opacity of material elements based on ref
      const opacity = introKeyOpacity?.current?.value ?? 1.0;
      crystalMaterial.opacity = 0.75 * opacity;
      glowingCyanMaterial.opacity = 0.8 * opacity;
      wireframeMaterial.opacity = 0.4 * opacity;
      
      // Update opacity on other standard/physical materials
      goldMaterial.opacity = opacity;
      goldMaterial.transparent = opacity < 0.99;
      bronzeMaterial.opacity = opacity;
      bronzeMaterial.transparent = opacity < 0.99;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Invisible wider hit area sphere for easier raycast clicking */}
      <mesh visible={true}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* 1. CENTRAL GLOWING CRYSTAL CORE (Luxury Gem) */}
      <group ref={coreRef}>
        {/* Outer Crystal Sheath */}
        <mesh material={crystalMaterial}>
          <octahedronGeometry args={[0.24]} />
        </mesh>
        
        {/* Inner Glowing Energy Core */}
        <mesh material={glowingCyanMaterial}>
          <octahedronGeometry args={[0.12]} />
        </mesh>

        {/* Tiny rotating holographic house inside the key */}
        <group ref={holoHouseRef} scale={0.07}>
          <mesh material={wireframeMaterial}>
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
          <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 4]} material={wireframeMaterial}>
            <boxGeometry args={[0.75, 0.75, 1.02]} />
          </mesh>
        </group>

        {/* Small energy points orbiting */}
        <mesh position={[0, 0.35, 0]} material={glowingCyanMaterial}>
          <sphereGeometry args={[0.02, 8, 8]} />
        </mesh>
        <mesh position={[0, -0.35, 0]} material={glowingCyanMaterial}>
          <sphereGeometry args={[0.02, 8, 8]} />
        </mesh>
      </group>

      {/* 2. ROTATING GYROSCOPIC RINGS (Architectural Orbitals) */}
      {/* Ring 1 - Gold Torus */}
      <mesh ref={ring1Ref} material={goldMaterial}>
        <torusGeometry args={[0.4, 0.015, 8, 48]} />
      </mesh>

      {/* Ring 2 - Bronze Torus */}
      <mesh ref={ring2Ref} material={bronzeMaterial}>
        <torusGeometry args={[0.48, 0.01, 8, 48]} />
      </mesh>

      {/* Ring 3 - Fine Blueprint wireframe ring */}
      <mesh ref={ring3Ref} material={wireframeMaterial}>
        <torusGeometry args={[0.56, 0.005, 4, 32]} />
      </mesh>

      {/* 3. KEY SHAFT AND TEETH (Blueprint / Architectural lines) */}
      {/* Key Shaft */}
      <group position={[0, -0.65, 0]}>
        <mesh material={wireframeMaterial}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 8, 4, true]} />
        </mesh>
        
        {/* Accent Solid Gold Collars */}
        <mesh position={[0, 0.2, 0]} material={goldMaterial}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 16]} />
        </mesh>
        <mesh position={[0, -0.2, 0]} material={goldMaterial}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 16]} />
        </mesh>

        {/* Key Teeth - Luxury abstract architectural block structures */}
        <group position={[0.12, -0.15, 0]}>
          {/* Teeth Block 1 */}
          <mesh position={[0, 0.08, 0]} material={goldMaterial}>
            <boxGeometry args={[0.15, 0.05, 0.05]} />
          </mesh>
          {/* Teeth Block 2 */}
          <mesh position={[-0.03, -0.02, 0]} material={bronzeMaterial}>
            <boxGeometry args={[0.09, 0.05, 0.05]} />
          </mesh>
          {/* Glowing node at bottom of teeth */}
          <mesh position={[0.04, -0.02, 0]} material={glowingCyanMaterial}>
            <boxGeometry args={[0.04, 0.04, 0.06]} />
          </mesh>
        </group>
      </group>

      {/* 4. BASE PRISM HILT (Abstract Architectural Roof design) */}
      <group position={[0, 0.65, 0]}>
        {/* Solid gold triangle prism */}
        <mesh rotation={[0, 0, Math.PI / 4]} material={goldMaterial}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
        </mesh>
        {/* Blueprint wireframe box surrounding it */}
        <mesh material={wireframeMaterial}>
          <boxGeometry args={[0.26, 0.26, 0.26]} />
        </mesh>
      </group>
    </group>
  );
}
