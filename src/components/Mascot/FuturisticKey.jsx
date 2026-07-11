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
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* 1. CENTRAL KEY BODY (Floating and Rotating Together) */}
      <group ref={coreRef}>
        {/* KEY BOW (Architectural Handle) - Centered at Y = 0.3 */}
        {/* Outer Gold Ring */}
        <mesh position={[0, 0.3, 0]} material={goldMaterial}>
          <torusGeometry args={[0.22, 0.04, 16, 64]} />
        </mesh>
        {/* Inner Bronze Detail Ring */}
        <mesh position={[0, 0.3, 0]} material={bronzeMaterial}>
          <torusGeometry args={[0.27, 0.015, 12, 48]} />
        </mesh>
        
        {/* Tiny rotating holographic house inside the key bow loop */}
        <group ref={holoHouseRef} position={[0, 0.3, 0]} scale={0.06}>
          <mesh material={wireframeMaterial}>
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
          <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 4]} material={wireframeMaterial}>
            <boxGeometry args={[0.75, 0.75, 1.02]} />
          </mesh>
        </group>

        {/* Small glowing energy node inside the holographic house */}
        <mesh position={[0, 0.3, 0]} material={glowingCyanMaterial}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>

        {/* KEY SHAFT (Stem) - Centered at Y = -0.2 */}
        {/* Main Solid Gold Shaft */}
        <mesh position={[0, -0.2, 0]} material={goldMaterial}>
          <cylinderGeometry args={[0.035, 0.035, 0.7, 16]} />
        </mesh>
        
        {/* Blueprint Wireframe outer sheath */}
        <mesh position={[0, -0.2, 0]} material={wireframeMaterial}>
          <cylinderGeometry args={[0.045, 0.045, 0.72, 8, 4, true]} />
        </mesh>
        
        {/* Accent Collars */}
        {/* Upper Collar (Bow-Shaft Join) */}
        <mesh position={[0, 0.1, 0]} material={bronzeMaterial}>
          <cylinderGeometry args={[0.052, 0.052, 0.04, 16]} />
        </mesh>
        {/* Middle Decorative Collar */}
        <mesh position={[0, -0.2, 0]} material={goldMaterial}>
          <cylinderGeometry args={[0.048, 0.048, 0.03, 16]} />
        </mesh>
        {/* Lower Collar (Shaft-Tip Join) */}
        <mesh position={[0, -0.5, 0]} material={bronzeMaterial}>
          <cylinderGeometry args={[0.048, 0.048, 0.04, 16]} />
        </mesh>

        {/* KEY TEETH (Bit) - Architectural Silhouette at bottom right */}
        <group position={[0, -0.4, 0]}>
          {/* Main Key Bit Plate */}
          <mesh position={[0.08, 0, 0]} material={goldMaterial}>
            <boxGeometry args={[0.12, 0.16, 0.03]} />
          </mesh>
          {/* Tooth Cut Block 1 */}
          <mesh position={[0.16, 0.05, 0]} material={bronzeMaterial}>
            <boxGeometry args={[0.06, 0.03, 0.035]} />
          </mesh>
          {/* Tooth Cut Block 2 */}
          <mesh position={[0.14, 0.0, 0]} material={goldMaterial}>
            <boxGeometry args={[0.04, 0.03, 0.035]} />
          </mesh>
          {/* Tooth Cut Block 3 */}
          <mesh position={[0.17, -0.05, 0]} material={bronzeMaterial}>
            <boxGeometry args={[0.07, 0.03, 0.035]} />
          </mesh>
          {/* High-tech Blueprint glowing node on the edge */}
          <mesh position={[0.19, 0.0, 0]} material={glowingCyanMaterial}>
            <boxGeometry args={[0.02, 0.02, 0.04]} />
          </mesh>
        </group>

        {/* 2. ROTATING GYROSCOPIC RINGS (Architectural Orbitals centered on the bow) */}
        {/* Ring 1 - Gold Torus */}
        <mesh ref={ring1Ref} position={[0, 0.3, 0]} material={goldMaterial}>
          <torusGeometry args={[0.35, 0.01, 8, 48]} />
        </mesh>

        {/* Ring 2 - Bronze Torus */}
        <mesh ref={ring2Ref} position={[0, 0.3, 0]} material={bronzeMaterial}>
          <torusGeometry args={[0.42, 0.007, 8, 48]} />
        </mesh>

        {/* Ring 3 - Fine Blueprint wireframe ring */}
        <mesh ref={ring3Ref} position={[0, 0.3, 0]} material={wireframeMaterial}>
          <torusGeometry args={[0.48, 0.004, 4, 32]} />
        </mesh>
      </group>
    </group>
  );
}
