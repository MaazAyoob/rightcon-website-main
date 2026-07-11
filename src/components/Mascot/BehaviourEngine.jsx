/**
 * BehaviourEngine.jsx — Rightcon X V18.1 Believable Mascot Behaviour Engine
 *
 * Runs inside useFrame. Interpolates target positions via quadratic Bezier paths
 * to create smooth cinematic flights. Implements Layer 1 (Autonomous idle behaviors),
 * Layer 2 (Visitor awareness & predictive scroll), and Layer 3 (Page-specific intent triggers).
 */

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { useScrollSystem } from '../../context/ScrollContext';
import { mascotBrain } from '../../services/mascotBrain';

const INTEREST_POINTS = {
  hero_right:      { pos: [1.55, -0.65, 0.3],  rot: [0, -0.4, 0],  scale: 0.68 },
  hero_left:       { pos: [-1.5, -0.5,  0.2],  rot: [0,  0.4, 0],  scale: 0.60 },
  hero_high:       { pos: [0.9,  0.35, -0.2],  rot: [0, -0.2, 0],  scale: 0.42 },
  nav_observe:     { pos: [-1.7, 0.75, -0.3],  rot: [0,  0.5, 0],  scale: 0.32 },
  projects_left:   { pos: [-1.4, -0.4,  0.2],  rot: [0,  0.4, 0],  scale: 0.58 },
  projects_right:  { pos: [1.5,  -0.3,  0.1],  rot: [0, -0.4, 0],  scale: 0.52 },
  process_guide:   { pos: [1.5,   0.15,-0.2],  rot: [0, -0.4, 0],  scale: 0.55 },
  process_side:    { pos: [-1.3,  0.2,  0.0],  rot: [0,  0.3, 0],  scale: 0.50 },
  estimator_side:  { pos: [-1.5, -0.5,  0.2],  rot: [0,  0.3, 0],  scale: 0.58 },
  trust_corner:    { pos: [1.4,   0.3, -0.2],  rot: [0, -0.3, 0],  scale: 0.38 },
  testimonials:    { pos: [-1.4, -0.35, 0.2],  rot: [0,  0.4, 0],  scale: 0.55 },
  about_side:      { pos: [1.5,  -0.6,  0.3],  rot: [0, -0.3, 0],  scale: 0.55 },
  cta_side:        { pos: [-1.4, -0.5,  0.4],  rot: [0,  0.4, 0],  scale: 0.65 },
  footer_farewell: { pos: [1.2,  -1.35, 0.5],  rot: [0, -0.2, 0],  scale: 0.62 },
  chat_left:       { pos: [-1.38, -0.05, 0.4], rot: [0,  0.5, 0],  scale: 0.66 },
};

const BEHAVIOR_POSES = {
  hover:           { pose: 'idle',           emotion: 'calm' },
  lookAround:      { pose: 'idle',           emotion: 'curious' },
  observeBlueprint:{ pose: 'observing',      emotion: 'thinking' },
  projectHologram: { pose: 'projecting',     emotion: 'thinking' },
  measureBuilding: { pose: 'measuring',      emotion: 'focused' },
  checkAlignment:  { pose: 'checkAlignment', emotion: 'focused' },
  readData:        { pose: 'readData',       emotion: 'focused' },
  inspectMaterials:{ pose: 'inspecting',     emotion: 'focused' },
  confirmQuality:  { pose: 'confirmQuality', emotion: 'friendly' },
  inviteContinue:  { pose: 'pointing',       emotion: 'helpful' },
  point:           { pose: 'pointing',       emotion: 'helpful' },
  guideProcess:    { pose: 'pointing',       emotion: 'helpful' },
  observeVisitor:  { pose: 'idle',           emotion: 'curious' },
  waveFarewell:    { pose: 'waveFarewell',   emotion: 'friendly' },
  celebrateForm:   { pose: 'celebrating',    emotion: 'excited' },
  attentiveForm:   { pose: 'thinking',       emotion: 'focused' },
  memoryWave:      { pose: 'wave',           emotion: 'friendly' },
  memoryPoint:     { pose: 'pointing',       emotion: 'helpful' },
  
  // Custom micro-actions
  visorClean:      { pose: 'visorClean',     emotion: 'calm' },
  jetpackAdjust:   { pose: 'jetpackAdjust',  emotion: 'focused' },
  wristCheck:      { pose: 'wristCheck',     emotion: 'calm' },
  thinking:        { pose: 'typing',         emotion: 'focused' },
  confident:       { pose: 'idle',           emotion: 'confident' },
  inspect:         { pose: 'observing',      emotion: 'thinking' },
  wave:            { pose: 'wave',           emotion: 'friendly' },
};

const AUTONOMOUS_BEHAVIORS = [
  { key: 'inspect_sculpture', pose: 'inspect', emotion: 'curious', point: 'hero_high', duration: 4.5 },
  { key: 'clean_visor', pose: 'visorClean', emotion: 'calm', point: 'about_side', duration: 3.5 },
  { key: 'read_blueprint', pose: 'observeBlueprint', emotion: 'thinking', point: 'estimator_side', duration: 5.0 },
  { key: 'measure_sculpture', pose: 'measureBuilding', emotion: 'focused', point: 'hero_left', duration: 4.0 },
  { key: 'watch_user', pose: 'observeVisitor', emotion: 'curious', point: 'nav_observe', duration: 4.5 },
  { key: 'hover_pacing', pose: 'hover', emotion: 'calm', point: 'about_side', duration: 6.0 },
  { key: 'study_images', pose: 'inspect', emotion: 'focused', point: 'projects_left', duration: 5.0 },
  { key: 'examine_architecture', pose: 'inspect', emotion: 'curious', point: 'projects_right', duration: 4.5 },
  { key: 'look_at_buildings', pose: 'pointing', emotion: 'helpful', point: 'hero_right', duration: 4.0 },
  { key: 'adjust_jetpack', pose: 'jetpackAdjust', emotion: 'focused', point: 'trust_corner', duration: 3.5 },
  { key: 'think_quietly', pose: 'thinking', emotion: 'focused', point: 'about_side', duration: 5.5 },
  { key: 'wrist_check', pose: 'wristCheck', emotion: 'calm', point: 'nav_observe', duration: 3.0 }
];

export default function BehaviourEngine({ posRef, rotRef, scaleRef, behaviourStateRef }) {
  const location = useLocation();
  const {
    activeScene,
    scrollVelocity,
    scrollDirection,
    pageIdle,
    introActive,
    hoveredProject,
    hoveredService,
    formFieldFocus,
    formSuccess,
    scrollProgress,
    isChatOpen,
    menuOpen,
    mascotPose,
    mascotEmotion,
    setCurrentMascotPoint,
    isMobile,
    mascotHovered,
  } = useScrollSystem();

  // ── Bezier Trajectory Refs ──
  const isFlyingBezier = useRef(false);
  const bezierProgress = useRef(0);
  const bezierDuration = useRef(1.5);
  const bezierStart    = useRef(new THREE.Vector3());
  const bezierControl  = useRef(new THREE.Vector3());
  const bezierEnd      = useRef(new THREE.Vector3());

  // Look-back before departure refs
  const lookBackEnd    = useRef(0);
  const isLookingBack  = useRef(false);

  // ── Physics state refs ──
  const velocity       = useRef(new THREE.Vector3(0, 0, 0));
  const targetPos      = useRef(new THREE.Vector3(1.55, -0.65, 0.3));
  const targetRotY     = useRef(-0.4);
  const targetScale    = useRef(0.68);
  const currentPointId  = useRef('hero_right');

  // Arrived-sigh drop refs
  const arrivedSighTime = useRef(-1);
  const wasMovingRef   = useRef(false);

  // ── Decision & Memory refs ──
  const nextDecisionTime   = useRef(3.0);
  const currentBehaviorKey = useRef('hover');
  const lastStatePoint     = useRef('hero_right');
  const activeAutonomousIdx = useRef(-1);

  // Track page statistics in memory
  const lastTimeRef = useRef(0);

  const contextMemory = useRef({
    greeted: false,
    projectsExplained: false,
    boqExplained: false,
    bimExplained: false,
    materialsExplained: false,
    formCelebrated: false,
    revisitedHero: false,
  });

  const mouseIdleTime = useRef(0);
  const lastMousePos  = useRef({ x: 0, y: 0 });

  // Sync route context directly to the brain singleton
  useEffect(() => {
    mascotBrain.behaviourEngine.updatePageContext(location.pathname);
  }, [location.pathname]);

  // ── Helper: fly to named point with Bezier path setup ──
  const flyTo = (pointId, forceDirect = false) => {
    const pt = INTEREST_POINTS[pointId];
    if (!pt) return;
    
    const prevPointId = currentPointId.current;
    currentPointId.current = pointId;
    
    // Base positions
    let targetX = pt.pos[0];
    let targetY = pt.pos[1];
    let targetZ = pt.pos[2];
    
    // Scale modifier on mobile - smaller mascot (0.42 scale) to fit margins without overlapping text
    const scaleFactor = isMobile ? 0.42 : 1.0;
    targetScale.current = pt.scale * scaleFactor;
    
    // Mobile position shifting to clear layout / overlaps
    if (isMobile) {
      if (pointId === 'chat_left') {
        targetX = -0.3;
        targetY = 0.55;
      } else if (pointId === 'nav_observe') {
        targetX = -0.9;
        targetY = 0.65;
      } else if (pointId === 'hero_right') {
        targetX = 0.85;
        targetY = -0.7;
        targetZ = 0.4;
      } else if (pointId === 'hero_left') {
        targetX = -0.85;
        targetY = -0.7;
        targetZ = 0.4;
      } else if (pointId === 'projects_left') {
        targetX = -0.85;
        targetY = -0.8;
        targetZ = 0.35;
      } else if (pointId === 'projects_right') {
        targetX = 0.85;
        targetY = -0.8;
        targetZ = 0.35;
      } else if (pointId === 'about_side') {
        targetX = 0.8;
        targetY = -0.85;
        targetZ = 0.4;
      } else if (pointId === 'testimonials') {
        targetX = -0.8;
        targetY = -0.85;
        targetZ = 0.4;
      } else if (pointId === 'process_guide') {
        targetX = 0.8;
        targetY = -0.65;
        targetZ = 0.3;
      } else if (pointId === 'process_side') {
        targetX = -0.8;
        targetY = -0.65;
        targetZ = 0.3;
      } else if (pointId === 'estimator_side') {
        targetX = -0.8;
        targetY = -0.75;
        targetZ = 0.35;
      } else if (pointId === 'trust_corner') {
        targetX = 0.8;
        targetY = -0.65;
        targetZ = 0.3;
      } else if (pointId === 'cta_side') {
        targetX = -0.8;
        targetY = -0.85;
        targetZ = 0.45;
      }
    }
    
    const newEnd = new THREE.Vector3(targetX, targetY, targetZ);
    
    // Set up Bezier path if distance is meaningful and not forced
    const dist = posRef.current.distanceTo(newEnd);
    if (dist > 0.5 && !forceDirect && prevPointId !== pointId) {
      bezierStart.current.copy(posRef.current);
      bezierEnd.current.copy(newEnd);
      
      // Calculate control point: midpoint + outward/upward arch offset
      const midpoint = new THREE.Vector3().addVectors(bezierStart.current, bezierEnd.current).multiplyScalar(0.5);
      const perpOffset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.8,
        1.1 + Math.random() * 0.5,
        (Math.random() - 0.5) * 0.6
      );
      bezierControl.current.addVectors(midpoint, perpOffset);
      
      bezierProgress.current = 0;
      bezierDuration.current = 1.1 + dist * 0.28;
      isFlyingBezier.current = true;
      
      // Trigger short look-back sequence before flying
      isLookingBack.current = true;
      lookBackEnd.current = performance.now() / 1000 + 0.45; // 450ms lookback
    } else {
      isFlyingBezier.current = false;
      targetPos.current.copy(newEnd);
    }
    
    targetRotY.current = pt.rot[1];
    
    // Synchronize active coordinate point with React state
    if (lastStatePoint.current !== currentPointId.current) {
      lastStatePoint.current = currentPointId.current;
      Promise.resolve().then(() => {
        setCurrentMascotPoint(currentPointId.current);
      });
    }
  };

  // ── Helper: set behavior state ──
  const setBehavior = (behaviorKey) => {
    currentBehaviorKey.current = behaviorKey;
    const bState = BEHAVIOR_POSES[behaviorKey] || BEHAVIOR_POSES.hover;
    if (behaviourStateRef) {
      behaviourStateRef.current = { ...bState, behavior: behaviorKey };
    }
  };

  useFrame((state) => {
    if (introActive) return;

    const t = state.clock.getElapsedTime();
    if (lastTimeRef.current === 0) lastTimeRef.current = t;
    const dt = t - lastTimeRef.current;
    lastTimeRef.current = t;

    // Record dwell statistics
    mascotBrain.recordDwellTime(location.pathname, dt);

    const scrollSpeed = Math.abs(scrollVelocity);
    const pos = posRef.current;

    // Track mouse idle to evaluate visitor reading behavior
    const currentMouse = state.pointer;
    if (Math.abs(currentMouse.x - lastMousePos.current.x) < 0.005 && 
        Math.abs(currentMouse.y - lastMousePos.current.y) < 0.005) {
      if (scrollSpeed < 0.1) {
        mouseIdleTime.current += dt;
      }
    } else {
      mouseIdleTime.current = 0;
      lastMousePos.current = { x: currentMouse.x, y: currentMouse.y };
    }

    const isVisitorReading = mouseIdleTime.current > 3.0;

    // ── ATTENTION & MOOD DECISION ENGINE ──
    
    // 0. Fullscreen Navigation Menu Open
    if (menuOpen) {
      if (currentPointId.current !== 'nav_observe') {
        flyTo('nav_observe');
        setBehavior('point');
        nextDecisionTime.current = t + 3.0;
      } else if (t > nextDecisionTime.current && currentBehaviorKey.current === 'point') {
        setBehavior('lookAround');
      }
    }
    // 1. Mascot Hovered (Wave recognition & scale pulse)
    else if (mascotHovered && !isChatOpen) {
      targetScale.current = (INTEREST_POINTS[currentPointId.current]?.scale || 0.6) * (isMobile ? 0.75 : 1.0) * 1.15;
      if (mascotPose && mascotPose !== 'idle') {
        if (currentBehaviorKey.current !== mascotPose) {
          setBehavior(mascotPose);
        }
      } else {
        if (currentBehaviorKey.current !== 'observeVisitor') {
          setBehavior('observeVisitor');
        }
      }
    }
    // 2. Active Chat Panel Open
    else if (isChatOpen) {
      if (currentPointId.current !== 'chat_left') {
        flyTo('chat_left');
      }
      if (mascotPose && mascotPose !== 'idle') {
        if (currentBehaviorKey.current !== mascotPose) {
          setBehavior(mascotPose);
        }
      } else {
        if (currentBehaviorKey.current !== 'observeVisitor') {
          setBehavior('observeVisitor');
        }
      }
    }
    // 3. Celebrate Enquiry Form submission
    else if (formSuccess) {
      if (!contextMemory.current.formCelebrated) {
        flyTo('cta_side');
        setBehavior('celebrateForm');
        contextMemory.current.formCelebrated = true;
        nextDecisionTime.current = t + 5.0;
      } else if (t > nextDecisionTime.current) {
        setBehavior('hover');
      }
    }
    // 4. Focus on active form inputs
    else if (formFieldFocus && !formSuccess) {
      if (currentBehaviorKey.current !== 'attentiveForm') {
        flyTo('cta_side');
        setBehavior('attentiveForm');
        nextDecisionTime.current = t + 4.0;
      }
    }
    // 5. Returning/Entering Hero Section (Dynamic welcome greetings based on memory)
    else if (location.pathname === '/' && scrollProgress < 0.04) {
      if (!contextMemory.current.greeted) {
        contextMemory.current.greeted = true;
        flyTo('hero_right');
        setBehavior('memoryWave');
        nextDecisionTime.current = t + 3.0;
      } else if (t > nextDecisionTime.current && currentBehaviorKey.current === 'memoryWave') {
        setBehavior('hover');
      }
    }
    // 6. Fast scrolling (Fly-ahead anticipation)
    else if (scrollSpeed > 1.8) {
      const isDown = scrollDirection === 'down';
      
      // Face flight heading
      targetRotY.current = isDown ? -0.55 : 0.55;
      setBehavior('hover');
      
      if (activeScene === 3) {
        flyTo('projects_right');
      } else if (activeScene === 5) {
        flyTo('estimator_side');
      } else {
        flyTo(isDown ? 'about_side' : 'hero_left');
      }
      nextDecisionTime.current = t + 2.5;
    }
    // 7. Meet visitor halfway on scroll reversals
    else if (scrollVelocity < -0.6 && currentPointId.current === 'footer_farewell') {
      flyTo('about_side');
      setBehavior('lookAround');
      nextDecisionTime.current = t + 3.0;
    }
    // 8. User is reading quietly (Stay stationary, stop distracting bobbing)
    else if (isVisitorReading) {
      // Keep stationary. Damping logic handles locking position.
    }
    // 9. Page context active behaviors
    else if (location.pathname === '/projects' && hoveredProject !== null) {
      if (!contextMemory.current.projectsExplained) {
        contextMemory.current.projectsExplained = true;
        flyTo('projects_right');
        setBehavior('projectHologram');
        nextDecisionTime.current = t + 4.0;
      }
    }
    else if (location.pathname === '/services' && hoveredService !== null) {
      const servicesPoses = {
        0: 'measureBuilding',
        1: 'checkAlignment',
        2: 'inspectMaterials'
      };
      const p = servicesPoses[hoveredService] || 'observeBlueprint';
      if (currentBehaviorKey.current !== p) {
        flyTo('estimator_side');
        setBehavior(p);
        nextDecisionTime.current = t + 4.5;
      }
    }
    // 10. Autonomous Idle Behaviors (Layer 1)
    else if (pageIdle && t > nextDecisionTime.current) {
      // Pick a random behavior that isn't the current one
      let idx;
      do {
        idx = Math.floor(Math.random() * AUTONOMOUS_BEHAVIORS.length);
      } while (idx === activeAutonomousIdx.current);
      
      activeAutonomousIdx.current = idx;
      const b = AUTONOMOUS_BEHAVIORS[idx];
      
      flyTo(b.point);
      setBehavior(b.pose);
      nextDecisionTime.current = t + b.duration;
    }
    // Base fallback paced adjustments
    else if (t > nextDecisionTime.current) {
      if (location.pathname === '/about') {
        flyTo('about_side');
        setBehavior('observeBlueprint');
      } else if (location.pathname === '/process') {
        flyTo(currentPointId.current === 'process_guide' ? 'process_side' : 'process_guide');
        setBehavior('guideProcess');
      } else {
        // Hero base pacing
        flyTo(currentPointId.current === 'hero_right' ? 'hero_left' : 'hero_right');
        setBehavior('lookAround');
      }
      nextDecisionTime.current = t + 4.0 + Math.random() * 4.0;
    }

    // ── KINEMATIC BEZIER FLIGHT PHYSICS ──
    if (isFlyingBezier.current) {
      if (isLookingBack.current) {
        // Look back briefly before take-off
        if (performance.now() / 1000 > lookBackEnd.current) {
          isLookingBack.current = false;
        }
        // Face opposite flight direction (look back)
        targetRotY.current = (bezierEnd.current.x > bezierStart.current.x) ? -0.7 : 0.7;
      } else {
        bezierProgress.current += dt / bezierDuration.current;
        
        if (bezierProgress.current >= 1.0) {
          bezierProgress.current = 1.0;
          isFlyingBezier.current = false;
          targetPos.current.copy(bezierEnd.current);
        } else {
          // Quadratic Bezier interpolation: B(u) = (1-u)^2 * P0 + 2*(1-u)*u * P_ctrl + u^2 * P1
          const u = bezierProgress.current;
          
          // Easing: smoothstep
          const e = u * u * (3 - 2 * u);
          
          const term1 = Math.pow(1 - e, 2);
          const term2 = 2 * (1 - e) * e;
          const term3 = Math.pow(e, 2);
          
          const nextPos = new THREE.Vector3()
            .addScaledVector(bezierStart.current, term1)
            .addScaledVector(bezierControl.current, term2)
            .addScaledVector(bezierEnd.current, term3);
            
          targetPos.current.copy(nextPos);
          
          // Compute forward flight heading tangent to rotate mascot
          const tangent = new THREE.Vector3()
            .addScaledVector(bezierStart.current, -2 * (1 - e))
            .addScaledVector(bezierControl.current, 2 - 4 * e)
            .addScaledVector(bezierEnd.current, 2 * e)
            .normalize();
            
          // Turn body into flight path
          targetRotY.current = Math.atan2(tangent.x, tangent.z) + Math.PI;
        }
      }
    }

    // ── Damping toward targetPos ──
    const diff = new THREE.Vector3().subVectors(targetPos.current, pos);
    const dist = diff.length();

    // spring constant gets firmer if further away (fast recovery)
    const springK = isVisitorReading ? 0.08 : (0.012 + Math.min(dist * 0.007, 0.024));
    velocity.current.addScaledVector(diff, springK);
    
    // spring dampening (higher dampening on reading block)
    velocity.current.multiplyScalar(isVisitorReading ? 0.78 : 0.86);

    // Limit maximum physics velocity frame increments
    if (velocity.current.length() > 0.12) {
      velocity.current.setLength(0.12);
    }

    // Apply movement offset to pos vector
    pos.add(velocity.current);

    // arrived-sigh hover drop trigger
    if (dist > 0.65) {
      wasMovingRef.current = true;
    }

    if (dist < 0.12 && wasMovingRef.current) {
      wasMovingRef.current = false;
      arrivedSighTime.current = t; // start Y sigh-dip
    }

    // ── Rotation Banking ──
    const lateralVel = velocity.current.x;
    const verticalVel = velocity.current.y;
    const bankAngle   = lateralVel * -2.5;
    const pitchAngle  = verticalVel * 1.5;

    rotRef.current.x = THREE.MathUtils.lerp(rotRef.current.x, pitchAngle,  0.08);
    rotRef.current.y = THREE.MathUtils.lerp(rotRef.current.y, targetRotY.current, 0.06);
    rotRef.current.z = THREE.MathUtils.lerp(rotRef.current.z, bankAngle,   0.1);

    // ── Target Scale ──
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale.current, 0.05);

    // ── Micro Hover Oscillations ──
    // Disable oscillations entirely if user is reading to keep screen static
    const micro = isVisitorReading ? 0 : (
      Math.sin(t * 2.2) * 0.008 +
      Math.sin(t * 3.8) * 0.004 +
      Math.sin(t * 0.8) * 0.003
    );

    // Apply sigh-dip math: rapid dip, slow recover
    let sighDip = 0;
    if (arrivedSighTime.current > 0 && !isVisitorReading) {
      const age = t - arrivedSighTime.current;
      if (age < 2.0) {
        sighDip = Math.sin(age * Math.PI / 2.0) * -0.11 * Math.exp(-age * 1.6);
      } else {
        arrivedSighTime.current = -1;
      }
    }

    pos.y += micro + sighDip;

    // Synchronize active coordinate point with React state
    if (lastStatePoint.current !== currentPointId.current) {
      lastStatePoint.current = currentPointId.current;
      Promise.resolve().then(() => {
        setCurrentMascotPoint(currentPointId.current);
      });
    }
  });

  return null;
}
