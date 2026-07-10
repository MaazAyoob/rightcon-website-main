import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollSystem } from '../../context/ScrollContext';
import { BRAND_COLORS } from '../../config/colors';

export default function IntroParticles() {
  const { introActive, heroState, particleState, introKeyPos } = useScrollSystem();
  const pointsRef = useRef();
  const geomRef = useRef();

  const count = 1000;
  
  // Generate random particles in a container box
  const [positions, initialPositions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 12 - 4; // Behind and ahead of screen
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;
      
      spd[i] = 0.3 + Math.random() * 0.7;
    }
    return [pos, initPos, spd];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !geomRef.current || !introActive) return;

    const t = state.clock.getElapsedTime();
    const pState = particleState?.current || { speed: 0.02, scatter: 0.05, opacity: 1, warpProgress: 0 };
    const { speed, scatter, opacity, warpProgress } = pState;

    const posAttr = geomRef.current.attributes.position;
    const array = posAttr.array;
    const keyPos = introKeyPos?.current || new THREE.Vector3(0, 0, 0);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      const bx = initialPositions[idx];
      const by = initialPositions[idx + 1];
      const bz = initialPositions[idx + 2];

      if (warpProgress > 0.001) {
        // Scene 7: Hyper warp explosion flying past camera
        // Move towards the screen (positive Z direction)
        array[idx + 2] += speed * speeds[i] * 2.5;
        
        // Push outwards
        array[idx] += (bx > 0 ? 1 : -1) * scatter * 0.1 * speeds[i];
        array[idx + 1] += (by > 0 ? 1 : -1) * scatter * 0.1 * speeds[i];

        // Loop particles to make the tunnel look infinite
        if (array[idx + 2] > 7) {
          array[idx + 2] = -12;
          array[idx] = (Math.random() - 0.5) * 10;
          array[idx + 1] = (Math.random() - 0.5) * 8;
        }
      } else if (heroState === 'UNLOCKING' || heroState === 'MASCOT_PRESENTING' || heroState === 'WAITING_FOR_KEY' || heroState === 'KEY_ACCEPTED') {
        // Scene 5-6: Some particles swirl around the key, others drift
        if (i % 4 === 0) {
          // Swirling orbit around the key
          const targetX = keyPos.x + Math.sin(t * 3.0 + i) * 0.45;
          const targetY = keyPos.y + Math.cos(t * 2.0 + i) * 0.45;
          const targetZ = keyPos.z + Math.sin(t * 1.2 + i) * 0.45;
          
          array[idx] = THREE.MathUtils.lerp(array[idx], targetX, 0.06);
          array[idx + 1] = THREE.MathUtils.lerp(array[idx + 1], targetY, 0.06);
          array[idx + 2] = THREE.MathUtils.lerp(array[idx + 2], targetZ, 0.06);
        } else {
          // Standard slow drift
          array[idx] = bx + Math.sin(t * 0.25 + i) * 0.25;
          array[idx + 1] = by + Math.cos(t * 0.2 + i) * 0.25;
          array[idx + 2] += speed * speeds[i] * 0.1;
          
          if (array[idx + 2] > 6) array[idx + 2] = -10;
        }
      } else {
        // Scene 1-4: Ambient dust floating slowly
        array[idx] = bx + Math.sin(t * 0.15 + i) * 0.15;
        array[idx + 1] = by + Math.cos(t * 0.12 + i) * 0.15;
        array[idx + 2] += speed * speeds[i] * 0.15;
        
        if (array[idx + 2] > 6) {
          array[idx + 2] = -10;
        }
      }
    }

    posAttr.needsUpdate = true;
    pointsRef.current.material.opacity = opacity;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={BRAND_COLORS.primary}
        size={0.03}
        transparent
        opacity={1.0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
