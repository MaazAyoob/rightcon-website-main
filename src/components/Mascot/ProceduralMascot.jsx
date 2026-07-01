import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollSystem } from '../../context/ScrollContext';

export default function ProceduralMascot({ posRef, rotRef, scaleRef }) {
  const { mousePos, scrollVelocity, scrollDirection, pageIdle, activeInteraction } = useScrollSystem();
  
  // Joint refs
  const groupRef = useRef();
  const bodyBaseRef = useRef(); // Node for local pacing translations and direction alignments
  const headRef = useRef();
  const torsoRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftHandRef = useRef();
  const rightHandRef = useRef();
  const hoverBaseRef = useRef();

  // Smooth interpolators
  const currentHandL = useRef(new THREE.Vector3(-0.45, 0, 0));
  const currentHandR = useRef(new THREE.Vector3(0.45, 0, 0));
  const bodyFacingY = useRef(0);
  const localTranslationX = useRef(0);

  // Materials
  const whiteCeramicMat = new THREE.MeshPhysicalMaterial({
    color: '#fcfbfa',
    roughness: 0.12,
    metalness: 0.02,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  });

  const cobaltBlueMat = new THREE.MeshStandardMaterial({
    color: '#07335c',
    roughness: 0.25,
    metalness: 0.8,
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: '#e5e5e5',
    roughness: 0.05,
    metalness: 1.0,
  });

  const glowingCyanMat = new THREE.MeshBasicMaterial({
    color: '#00f3ff',
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // 1. Sync global positions from Canvas controllers
    if (groupRef.current) {
      groupRef.current.position.copy(posRef.current);
      groupRef.current.rotation.copy(rotRef.current);
      groupRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
    }

    // 2. Continuous Scroll Speed and Direction Alignment
    const speed = Math.abs(scrollVelocity);
    const isScrollWalking = speed > 0.15;
    
    // Determine pacing values when stationary (scroll velocity near zero)
    const isStationary = speed < 0.15;
    let targetLocalX = 0;
    let targetFacingY = 0;
    let pacingSpeed = 0;

    if (isStationary && !activeInteraction) {
      // Pace back and forth along a slow sine wave (clamped range of 0.8 units)
      const paceTime = t * 0.45;
      targetLocalX = Math.sin(paceTime) * 0.4;
      
      // Walking swing velocity derived from pacing speed (cosine)
      pacingSpeed = Math.abs(Math.cos(paceTime)) * 0.45;
      
      // Face pacing direction: face left when moving left, right when moving right
      const movingRight = Math.cos(paceTime) > 0;
      targetFacingY = movingRight ? 0.35 : -0.35;
    } else if (isScrollWalking) {
      // Scroll active: turn body 180 degrees to walk backwards when scrolling up
      targetFacingY = scrollDirection === 'up' ? Math.PI : 0;
    }

    // Interpolate pacing offsets
    localTranslationX.current = THREE.MathUtils.lerp(localTranslationX.current, targetLocalX, 0.08);
    bodyFacingY.current = THREE.MathUtils.lerp(bodyFacingY.current, targetFacingY, 0.08);

    if (bodyBaseRef.current) {
      bodyBaseRef.current.position.x = localTranslationX.current;
      bodyBaseRef.current.rotation.y = bodyFacingY.current;
    }

    // Tilt body forward slightly during active movement
    const activeSpeed = isScrollWalking ? speed * 0.25 : pacingSpeed;
    const isMoving = isScrollWalking || (isStationary && pacingSpeed > 0.05 && !activeInteraction);
    
    if (isMoving) {
      torsoRef.current.rotation.x = THREE.MathUtils.lerp(torsoRef.current.rotation.x, 0.15, 0.1);
    } else {
      torsoRef.current.rotation.x = THREE.MathUtils.lerp(torsoRef.current.rotation.x, 0, 0.1);
    }

    // 3. Pose Dictionary Interpolation (State Machine)
    let targetL = new THREE.Vector3(-0.45, 0.0, 0.0);
    let targetR = new THREE.Vector3(0.45, 0.0, 0.0);
    let targetTorsoY = 0;

    if (activeInteraction) {
      if (activeInteraction.type === 'faq' || activeInteraction.type === 'projects') {
        // Point right hand toward interactive content
        targetR.set(0.3, -0.05, 0.25);
        targetL.set(-0.4, -0.05, 0.1);
      } else if (activeInteraction.type === 'form') {
        // Observe typing: hands folded/rest forward
        targetR.set(0.18, 0.02, 0.28);
        targetL.set(-0.18, 0.02, 0.28);
        targetTorsoY = 0.04;
      }
    } else if (isMoving) {
      // Walk sways: swing hands in opposition
      const swayOffset = Math.sin(t * 8) * 0.15 * Math.min(1.0, activeSpeed);
      targetL.set(-0.45, swayOffset, swayOffset);
      targetR.set(0.45, -swayOffset, -swayOffset);
    } else if (pageIdle) {
      // Inactive shifts: slow weight balance shifts
      const idleShift = Math.sin(t * 0.7) * 0.04;
      targetL.set(-0.45, idleShift, 0.05);
      targetR.set(0.45, -idleShift, 0.05);
      targetTorsoY = Math.sin(t * 0.3) * 0.03;
    } else {
      // Idle float
      targetL.set(-0.45, Math.sin(t * 1.8) * 0.02, 0.0);
      targetR.set(0.45, Math.cos(t * 1.8) * 0.02, 0.0);
    }

    currentHandL.current.lerp(targetL, 0.1);
    currentHandR.current.lerp(targetR, 0.1);

    if (leftHandRef.current) leftHandRef.current.position.copy(currentHandL.current);
    if (rightHandRef.current) rightHandRef.current.position.copy(currentHandR.current);
    if (torsoRef.current) torsoRef.current.rotation.y = THREE.MathUtils.lerp(torsoRef.current.rotation.y, targetTorsoY, 0.05);

    // 4. Subtle Cursor Eye & Head tracking (MAX 10 DEGREES limit)
    const clampLimit = 0.174;
    let lookTargetX = 0;
    let lookTargetY = 0;

    if (!isScrollWalking) {
      lookTargetX = THREE.MathUtils.clamp(mousePos.x * 0.22, -clampLimit, clampLimit);
      lookTargetY = THREE.MathUtils.clamp(mousePos.y * 0.18, -clampLimit, clampLimit);
      
      // Slowly look around if idle
      if (pageIdle) {
        lookTargetX += Math.sin(t * 0.4) * 0.04;
        lookTargetY += Math.cos(t * 0.25) * 0.03;
      }
    }

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, lookTargetX, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, lookTargetY, 0.08);
    }

    // 5. Visor Eye Sweeps (Scanning text)
    let scanOffset = 0;
    if (isStationary && !activeInteraction) {
      // Slow horizontal sweeps left-right
      scanOffset = Math.sin(t * 1.2) * 0.025;
    }
    
    if (leftEyeRef.current) leftEyeRef.current.position.x = -0.11 + scanOffset;
    if (rightEyeRef.current) rightEyeRef.current.position.x = 0.11 + scanOffset;

    // 6. Blinking visor
    const isBlinking = (t % 4.8) < 0.12;
    const eyeScaleY = isBlinking ? 0.05 : 1.0;
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, eyeScaleY, 0.35);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, eyeScaleY, 0.35);
    }

    // 7. Breathing bob cycles
    const breath = Math.sin(t * 1.3) * 0.015;
    if (torsoRef.current) {
      torsoRef.current.position.y = breath;
    }
    if (headRef.current) {
      headRef.current.position.y = 0.44 + breath * 1.2;
    }
    if (hoverBaseRef.current) {
      hoverBaseRef.current.position.y = -0.52 + breath * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={bodyBaseRef}>
        {/* 1. TORSO */}
        <mesh ref={torsoRef} material={whiteCeramicMat} castShadow receiveShadow>
          <capsuleGeometry args={[0.22, 0.5, 16, 32]} />
          
          {/* Cobalt chest plate */}
          <mesh position={[0, 0.08, 0.16]} rotation={[0.08, 0, 0]} material={cobaltBlueMat}>
            <boxGeometry args={[0.16, 0.22, 0.08]} />
          </mesh>

          {/* Spine plates */}
          <mesh position={[0, 0.0, -0.16]} material={chromeMat}>
            <boxGeometry args={[0.05, 0.3, 0.04]} />
          </mesh>
        </mesh>

        {/* 2. HEAD */}
        <group ref={headRef} position={[0, 0.44, 0]}>
          <mesh material={whiteCeramicMat} castShadow>
            <sphereGeometry args={[0.26, 32, 32]} />
          </mesh>
          
          {/* Visor Frame */}
          <mesh position={[0, 0.04, 0.08]} material={cobaltBlueMat}>
            <boxGeometry args={[0.4, 0.1, 0.34]} />
          </mesh>

          {/* Visor Eyes (X translated dynamically for sweeps) */}
          <mesh ref={leftEyeRef} position={[-0.11, 0.04, 0.24]} material={glowingCyanMat}>
            <boxGeometry args={[0.06, 0.03, 0.03]} />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.11, 0.04, 0.24]} material={glowingCyanMat}>
            <boxGeometry args={[0.06, 0.03, 0.03]} />
          </mesh>

          {/* Chrome ears */}
          <mesh position={[-0.26, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={chromeMat}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          </mesh>
          <mesh position={[0.26, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={chromeMat}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          </mesh>
        </group>

        {/* 3. LEFT HAND */}
        <group ref={leftHandRef} position={[-0.45, 0, 0]}>
          <mesh material={whiteCeramicMat} castShadow>
            <sphereGeometry args={[0.07, 16, 16]} />
          </mesh>
          <mesh position={[0.02, 0, 0]} material={chromeMat}>
            <sphereGeometry args={[0.03, 16, 16]} />
          </mesh>
        </group>

        {/* 4. RIGHT HAND */}
        <group ref={rightHandRef} position={[0.45, 0, 0]}>
          <mesh material={whiteCeramicMat} castShadow>
            <sphereGeometry args={[0.07, 16, 16]} />
          </mesh>
          <mesh position={[-0.02, 0, 0]} material={chromeMat}>
            <sphereGeometry args={[0.03, 16, 16]} />
          </mesh>
        </group>

        {/* 5. HOVER THRUSTER BASE */}
        <group ref={hoverBaseRef} position={[0, -0.52, 0]}>
          <mesh material={chromeMat} position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.12, 0.1, 0.08, 16]} />
          </mesh>
          <mesh material={cobaltBlueMat} position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.18, 0.12, 0.14, 16]} />
          </mesh>
          <mesh material={glowingCyanMat} position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
