import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollSystem } from '../../context/ScrollContext';

export default function HoloProjector({ posRef, scaleRef }) {
  const { hoveredProject, activeScene, hoveredService } = useScrollSystem();
  
  const beamRef = useRef();
  const holoRef = useRef();
  const flareRef = useRef();

  // Self-assembly refs for Scene 4
  const fRef = useRef();
  const cRef = useRef();
  const wRef = useRef();
  const rRef = useRef();

  // Opacity fade timers
  const lastContext = useRef({ activeScene: -1, hoveredProject: -1, hoveredService: -1 });
  const hologramStartTime = useRef(0);
  const opacityRef = useRef(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Read the latest interpolated mascot coordinates
    const mascotPos = posRef.current;
    const isMascotOnRight = mascotPos.x > 0;
    
    // Position hologram compact and close to the hand
    const holoX = isMascotOnRight ? mascotPos.x - 0.6 : mascotPos.x + 0.6;
    const holoY = mascotPos.y + 0.35;
    const holoZ = mascotPos.z + 0.2;

    // Hand emitter coords
    const emitterX = isMascotOnRight ? mascotPos.x - 0.4 : mascotPos.x + 0.4;
    const emitterY = mascotPos.y + 0.1;
    const emitterZ = mascotPos.z + 0.2;

    const currentHoloY = holoY + Math.sin(t * 2.0) * 0.03; // Hover bobbing

    // Update hologram position & rotation
    if (holoRef.current) {
      holoRef.current.position.set(holoX, currentHoloY, holoZ);
      holoRef.current.rotation.y = t * 0.45;
    }

    // Volumetric beam positioning
    if (beamRef.current) {
      const start = new THREE.Vector3(emitterX, emitterY, emitterZ);
      const end = new THREE.Vector3(holoX, currentHoloY, holoZ);
      const distance = start.distanceTo(end);
      
      const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const alignMatrix = new THREE.Matrix4().lookAt(end, start, new THREE.Vector3(0, 1, 0));
      const rotation = new THREE.Euler().setFromRotationMatrix(alignMatrix);
      rotation.x += Math.PI / 2;

      beamRef.current.position.copy(position);
      beamRef.current.rotation.copy(rotation);
      beamRef.current.scale.set(1, distance, 1);
    }

    if (flareRef.current) {
      flareRef.current.position.set(emitterX, emitterY, emitterZ);
    }

    // ── Context Check for Opacity Fading ──
    const currentContext = { activeScene, hoveredProject, hoveredService };
    const contextChanged = 
      lastContext.current.activeScene !== activeScene ||
      lastContext.current.hoveredProject !== hoveredProject ||
      lastContext.current.hoveredService !== hoveredService;

    if (contextChanged) {
      lastContext.current = currentContext;
      hologramStartTime.current = t; // Reset timer
    }

    const age = t - hologramStartTime.current;
    
    // Evaluate if hologram is active
    const hasHolo = 
      activeScene === 3 || 
      activeScene === 4 || 
      activeScene === 5 || 
      activeScene === 7 || 
      activeScene === 8;

    let targetOpacity = 0.0;
    if (hasHolo) {
      if (age < 0.5) {
        targetOpacity = age / 0.5; // Fade-in (0.5s)
      } else if (age >= 0.5 && age < 3.5) {
        targetOpacity = 1.0; // Fully visible (3.0s)
      } else if (age >= 3.5 && age < 4.0) {
        targetOpacity = (4.0 - age) / 0.5; // Fade-out (0.5s)
      } else {
        targetOpacity = 0.0;
      }
    }

    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, targetOpacity, 0.15);

    // Apply opacities in 3D graph
    if (beamRef.current) {
      beamRef.current.material.opacity = (0.05 + Math.abs(Math.sin(t * 3.5)) * 0.035) * opacityRef.current;
    }
    if (flareRef.current) {
      flareRef.current.material.opacity = 0.6 * opacityRef.current;
    }
    if (holoRef.current) {
      holoRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          if (child.material.userData.baseOpacity === undefined) {
            child.material.userData.baseOpacity = child.material.opacity ?? 1.0;
          }
          child.material.transparent = true;
          child.material.opacity = child.material.userData.baseOpacity * opacityRef.current;
        }
      });
    }

    // ── Self-Assembly Anim for Scene 4 (Process) ──
    if (activeScene === 4) {
      const buildProgress = (t * 1.5) % 4; // 0 to 4 cycle (2.6s)
      const fScale = Math.min(1.0, Math.max(0.0, buildProgress * 2.0));
      const cScale = Math.min(1.0, Math.max(0.0, (buildProgress - 1.0) * 2.0));
      const wScale = Math.min(1.0, Math.max(0.0, (buildProgress - 2.0) * 2.0));
      const rScale = Math.min(1.0, Math.max(0.0, (buildProgress - 3.0) * 2.0));

      if (fRef.current) fRef.current.scale.set(1.0, fScale, 1.0);
      if (cRef.current) cRef.current.scale.set(1.0, cScale, 1.0);
      if (wRef.current) wRef.current.scale.set(1.0, wScale, 1.0);
      if (rRef.current) rRef.current.scale.set(1.0, rScale, 1.0);
    }
  });

  return (
    <group>
      {/* 1. Volumetric Emitter Light Beam */}
      <mesh ref={beamRef}>
        <cylinderGeometry args={[0.015, 0.22, 1.0, 16, 1, true]} />
        <meshBasicMaterial
          color="#3FA9F5"
          transparent
          opacity={0.0}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Emitter flare light */}
      <mesh ref={flareRef}>
        <sphereGeometry args={[0.024, 16, 16]} />
        <meshBasicMaterial color="#3FA9F5" transparent opacity={0.0} />
      </mesh>

      {/* 2. Micro Hologram Group */}
      <group ref={holoRef} scale={[0.22, 0.22, 0.22]}>
        
        {/* Flat blueprint coordinate base grid */}
        <gridHelper 
          args={[1.0, 8, '#3FA9F5', '#003344']} 
          position={[0, -0.4, 0]} 
        />

        {/* ── Scene 3: Portfolio (Villa Wireframes) ── */}
        {activeScene === 3 && (
          <group>
            {(hoveredProject === 0 || hoveredProject === null) && (
              <group>
                <mesh position={[-0.1, -0.15, 0]}>
                  <boxGeometry args={[0.7, 0.25, 0.7]} />
                  <meshBasicMaterial color="#3FA9F5" wireframe />
                </mesh>
                <mesh position={[0.2, 0.15, 0.1]}>
                  <boxGeometry args={[0.6, 0.25, 0.6]} />
                  <meshBasicMaterial color="#3FA9F5" wireframe />
                </mesh>
                <mesh position={[0.4, -0.27, 0.3]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
                  <meshBasicMaterial color="#3FA9F5" wireframe />
                </mesh>
                <mesh position={[-0.4, -0.27, 0.3]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
                  <meshBasicMaterial color="#3FA9F5" wireframe />
                </mesh>
              </group>
            )}

            {hoveredProject === 1 && (
              <group>
                <mesh position={[0, -0.05, 0]}>
                  <boxGeometry args={[0.8, 0.7, 0.8]} />
                  <meshBasicMaterial color="#3FA9F5" wireframe />
                </mesh>
                <mesh position={[0.15, 0.15, 0.15]}>
                  <boxGeometry args={[0.4, 0.4, 0.5]} />
                  <meshBasicMaterial color="#00aaff" transparent opacity={0.2} />
                </mesh>
              </group>
            )}

            {hoveredProject === 2 && (
              <group>
                <mesh position={[0, -0.25, 0]}>
                  <boxGeometry args={[0.9, 0.15, 0.9]} />
                  <meshBasicMaterial color="#3FA9F5" wireframe />
                </mesh>
                <mesh position={[0, 0.05, 0]}>
                  <boxGeometry args={[0.7, 0.4, 0.7]} />
                  <meshBasicMaterial color="#3FA9F5" wireframe />
                </mesh>
                <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
                  <boxGeometry args={[0.5, 0.5, 0.72]} />
                  <meshBasicMaterial color="#00aaff" wireframe />
                </mesh>
              </group>
            )}
          </group>
        )}

        {/* ── Scene 4: Process (Self-Assembly House) ── */}
        {activeScene === 4 && (
          <group>
            {/* Foundation */}
            <mesh ref={fRef} position={[0, -0.36, 0]}>
              <boxGeometry args={[0.8, 0.08, 0.8]} />
              <meshBasicMaterial color="#3FA9F5" wireframe />
            </mesh>
            {/* Columns */}
            <group ref={cRef}>
              <mesh position={[-0.3, -0.16, -0.3]}><cylinderGeometry args={[0.016, 0.016, 0.32, 6]} /><meshBasicMaterial color="#3FA9F5" wireframe /></mesh>
              <mesh position={[ 0.3, -0.16, -0.3]}><cylinderGeometry args={[0.016, 0.016, 0.32, 6]} /><meshBasicMaterial color="#3FA9F5" wireframe /></mesh>
              <mesh position={[-0.3, -0.16,  0.3]}><cylinderGeometry args={[0.016, 0.016, 0.32, 6]} /><meshBasicMaterial color="#3FA9F5" wireframe /></mesh>
              <mesh position={[ 0.3, -0.16,  0.3]}><cylinderGeometry args={[0.016, 0.016, 0.32, 6]} /><meshBasicMaterial color="#3FA9F5" wireframe /></mesh>
            </group>
            {/* Walls */}
            <group ref={wRef}>
              <mesh position={[0, -0.16, -0.38]}><boxGeometry args={[0.58, 0.32, 0.02]} /><meshBasicMaterial color="#0077ff" wireframe /></mesh>
              <mesh position={[-0.38, -0.16, 0]} rotation={[0, Math.PI / 2, 0]}><boxGeometry args={[0.58, 0.32, 0.02]} /><meshBasicMaterial color="#0077ff" wireframe /></mesh>
            </group>
            {/* Roof */}
            <mesh ref={rRef} position={[0, 0.16, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.52, 0.52, 0.78]} />
              <meshBasicMaterial color="#D4AF37" wireframe />
            </mesh>
          </group>
        )}

        {/* ── Scene 5: Services (BOQ / BIM / Materials) ── */}
        {activeScene === 5 && (
          <group>
            {/* BOQ Estimator */}
            {(hoveredService === 0 || hoveredService === null) && (
              <group>
                <mesh position={[0, -0.1, 0]}>
                  <boxGeometry args={[0.9, 0.12, 0.9]} />
                  <meshBasicMaterial color="#3FA9F5" transparent opacity={0.15} wireframe />
                </mesh>
                {/* Dimension helper lines */}
                <mesh position={[0.48, -0.1, 0]}>
                  <boxGeometry args={[0.01, 0.2, 0.9]} />
                  <meshBasicMaterial color="#D4AF37" wireframe />
                </mesh>
                {/* Rebar cross-wires */}
                <mesh position={[0, -0.06, -0.2]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.006, 0.006, 0.85, 8]} />
                  <meshBasicMaterial color="#D4AF37" />
                </mesh>
                <mesh position={[0, -0.06, 0.2]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.006, 0.006, 0.85, 8]} />
                  <meshBasicMaterial color="#D4AF37" />
                </mesh>
                <mesh position={[-0.2, -0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.006, 0.006, 0.85, 8]} />
                  <meshBasicMaterial color="#49B8FF" />
                </mesh>
                <mesh position={[0.2, -0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.006, 0.006, 0.85, 8]} />
                  <meshBasicMaterial color="#49B8FF" />
                </mesh>
              </group>
            )}

            {/* BIM Clash pipelines */}
            {hoveredService === 1 && (
              <group>
                <mesh position={[0, -0.08, -0.15]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.03, 0.03, 0.95, 12]} />
                  <meshBasicMaterial color="#0077ff" wireframe />
                </mesh>
                <mesh position={[0.15, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.04, 0.04, 0.95, 12]} />
                  <meshBasicMaterial color="#49B8FF" wireframe />
                </mesh>
                <mesh position={[0.15, 0.0, -0.15]}>
                  <sphereGeometry args={[0.045, 16, 16]} />
                  <meshBasicMaterial color="#D4AF37" transparent opacity={0.8} />
                </mesh>
                <mesh position={[0.15, 0.0, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.10, 0.003, 4, 16]} />
                  <meshBasicMaterial color="#49B8FF" />
                </mesh>
              </group>
            )}

            {/* Materials swatches */}
            {hoveredService === 2 && (
              <group>
                {/* Travertine stone */}
                <mesh position={[-0.26, -0.12, 0.08]}>
                  <boxGeometry args={[0.20, 0.28, 0.20]} />
                  <meshBasicMaterial color="#D4AF37" wireframe />
                </mesh>
                {/* Teak plank log */}
                <mesh position={[0.05, 0.0, -0.08]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.38, 12]} />
                  <meshBasicMaterial color="#D4AF37" wireframe />
                </mesh>
                {/* Rebar bundle */}
                <mesh position={[0.26, -0.12, 0.12]}>
                  <cylinderGeometry args={[0.04, 0.04, 0.28, 8, 4, true]} />
                  <meshBasicMaterial color="#3FA9F5" wireframe />
                </mesh>
              </group>
            )}
          </group>
        )}

        {/* ── Scene 7: Testimonials (Quality Shield Badge) ── */}
        {activeScene === 7 && (
          <group>
            {/* Outer ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.36, 0.02, 8, 24]} />
              <meshBasicMaterial color="#3FA9F5" wireframe />
            </mesh>
            {/* Golden Star core */}
            <mesh rotation={[0, 0, 0]}>
              <octahedronGeometry args={[0.22, 0]} />
              <meshBasicMaterial color="#D4AF37" wireframe />
            </mesh>
            {/* Secondary ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.42, 0.008, 4, 32]} />
              <meshBasicMaterial color="#49B8FF" transparent opacity={0.5} />
            </mesh>
          </group>
        )}

        {/* ── Scene 8: Contact & Footer (Key + Scroll) ── */}
        {activeScene === 8 && (
          <group>
            {/* Key shaft */}
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
              <meshBasicMaterial color="#D4AF37" wireframe />
            </mesh>
            {/* Key handle ring */}
            <mesh position={[0, 0.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.08, 0.016, 8, 16]} />
              <meshBasicMaterial color="#D4AF37" wireframe />
            </mesh>
            {/* Key bit */}
            <mesh position={[0.05, 0.0, 0]}>
              <boxGeometry args={[0.08, 0.05, 0.02]} />
              <meshBasicMaterial color="#D4AF37" wireframe />
            </mesh>
            {/* Rolled Blueprint Scroll */}
            <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.07, 0.07, 0.6, 12, 1, true]} />
              <meshBasicMaterial color="#49B8FF" wireframe />
            </mesh>
          </group>
        )}

        {/* Secondary decorative concentric outer blueprint ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.22, 0]}>
          <torusGeometry args={[0.55, 0.003, 4, 32]} />
          <meshBasicMaterial color="#00aaee" transparent opacity={0.12} />
        </mesh>
      </group>
    </group>
  );
}
