/**
 * BehaviourEngine.jsx — Rightcon X V13 AI Behaviour System
 *
 * Runs entirely inside useFrame. Zero React re-renders.
 * All state is in refs. Writes position/rotation/scale to shared refs.
 *
 * Tracks:
 *  - scroll speed & direction
 *  - mouse idle time (to detect active reading state)
 *  - hover states of projects and services
 *  - conversational panel status
 *  - session memory (greeting, calculators, submit flags)
 */

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollSystem } from '../../context/ScrollContext';

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
  waveFarewell:    { pose: 'wavingGoodbye',  emotion: 'friendly' },
  celebrateForm:   { pose: 'celebrating',    emotion: 'excited' },
  attentiveForm:   { pose: 'typing',         emotion: 'focused' },
  memoryWave:      { pose: 'wave',           emotion: 'friendly' },
  memoryPoint:     { pose: 'pointing',       emotion: 'helpful' },
  
  // Custom chat-triggered poses
  wave:            { pose: 'wave',           emotion: 'friendly' },
  shrug:           { pose: 'shrug',          emotion: 'curious' },
  pointing:        { pose: 'pointing',       emotion: 'helpful' },
  thinking:        { pose: 'typing',         emotion: 'focused' },
  confident:       { pose: 'idle',           emotion: 'confident' },
  inspect:         { pose: 'observing',      emotion: 'thinking' },
};

export default function BehaviourEngine({ posRef, rotRef, scaleRef, behaviourStateRef }) {
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
    conversationOpen,
    menuOpen,
    mascotPose,
    mascotEmotion,
  } = useScrollSystem();

  // ── Physics state refs ──
  const velocity      = useRef(new THREE.Vector3(0, 0, 0));
  const targetPos     = useRef(new THREE.Vector3(1.55, -0.65, 0.3));
  const targetRotY    = useRef(-0.4);
  const targetScale   = useRef(0.68);
  const currentPointId = useRef('hero_right');

  // Arrived-sigh drop refs
  const arrivedSighTime = useRef(-1);
  const wasMovingRef = useRef(false);

  // ── Decision & Memory refs ──
  const nextDecisionTime   = useRef(3.0);
  const currentBehaviorKey = useRef('hover');
  
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
  const lastMousePos = useRef({ x: 0, y: 0 });

  // ── Helper: fly to named point ──
  const flyTo = (pointId) => {
    const pt = INTEREST_POINTS[pointId];
    if (!pt) return;
    currentPointId.current = pointId;
    targetPos.current.set(...pt.pos);
    targetRotY.current = pt.rot[1];
    targetScale.current = pt.scale;
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
    const scrollSpeed = Math.abs(scrollVelocity);
    const pos = posRef.current;

    // Track mouse idle to evaluate visitor reading behavior
    const currentMouse = state.pointer;
    if (Math.abs(currentMouse.x - lastMousePos.current.x) < 0.005 && 
        Math.abs(currentMouse.y - lastMousePos.current.y) < 0.005) {
      if (scrollSpeed < 0.1) {
        mouseIdleTime.current += 0.016; // Increment idle time per frame
      }
    } else {
      mouseIdleTime.current = 0;
      lastMousePos.current = { x: currentMouse.x, y: currentMouse.y };
    }

    const isVisitorReading = mouseIdleTime.current > 3.5;

    // ── GOAL EVALUATION TREE ──
    
    // Goal 0.5: Fullscreen Navigation Menu is Open
    if (menuOpen) {
      if (currentPointId.current !== 'nav_observe') {
        flyTo('nav_observe');
        setBehavior('point');
        nextDecisionTime.current = t + 3.0;
      } else if (t > nextDecisionTime.current && currentBehaviorKey.current === 'point') {
        setBehavior('lookAround');
      }
    }
    // Goal 1: Active Chat Panel Open (Reposition Left to avoid cover)
    else if (conversationOpen) {
      if (currentPointId.current !== 'chat_left') {
        flyTo('chat_left');
      }
      
      if (mascotPose && mascotPose !== 'idle') {
        if (currentBehaviorKey.current !== mascotPose) {
          setBehavior(mascotPose);
          nextDecisionTime.current = t + 4.5;
        }
      } else {
        if (currentBehaviorKey.current !== 'observeVisitor') {
          setBehavior('observeVisitor');
          nextDecisionTime.current = t + 6.0;
        }
      }
    }
    // Goal 2: Celebrate Enquiry Form submission
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
    // Goal 3: Focus on active form inputs
    else if (formFieldFocus && !formSuccess) {
      if (currentBehaviorKey.current !== 'attentiveForm') {
        flyTo('cta_side');
        setBehavior('attentiveForm');
        nextDecisionTime.current = t + 4.0;
      }
    }
    // Goal 4: Returning to Hero Section (Wave recognition)
    else if (activeScene <= 1 && scrollProgress < 0.04) {
      if (!contextMemory.current.greeted) {
        contextMemory.current.greeted = true;
        flyTo('hero_right');
        setBehavior('memoryWave');
        nextDecisionTime.current = t + 3.0;
      } else if (!contextMemory.current.revisitedHero) {
        contextMemory.current.revisitedHero = true;
        flyTo('hero_right');
        setBehavior('memoryWave');
        nextDecisionTime.current = t + 3.0;
      } else if (t > nextDecisionTime.current && currentBehaviorKey.current === 'memoryWave') {
        setBehavior('hover');
      }
    }
    // Goal 5: Fast scrolling fly-ahead
    else if (scrollSpeed > 2.0) {
      const nextScene = scrollDirection === 'down' ? Math.min(8, activeScene + 1) : Math.max(0, activeScene - 1);
      const isDown = scrollDirection === 'down';
      
      // Face direction of flight
      targetRotY.current = isDown ? -0.5 : 0.5;
      
      // Pitch down/up based on vertical speed
      setBehavior('hover');
      
      if (activeScene === 3) {
        flyTo('projects_right');
      } else if (activeScene === 5) {
        flyTo('estimator_side');
      } else {
        flyTo(isDown ? 'about_side' : 'hero_left');
      }
      nextDecisionTime.current = t + 2.0;
    }
    // Goal 6: User is reading actively (Stay quiet, observe, out of screen focus)
    else if (isVisitorReading) {
      if (currentPointId.current !== 'nav_observe' && currentPointId.current !== 'about_side') {
        // Fly away to look from corner quietly
        flyTo(activeScene > 4 ? 'about_side' : 'nav_observe');
        setBehavior('hover');
        nextDecisionTime.current = t + 6.0;
      }
    }
    // Goal 7: Context-aware interactive explanation hover triggers
    else if (activeScene === 3) {
      // Projects section
      if (hoveredProject !== null) {
        if (!contextMemory.current.projectsExplained) {
          contextMemory.current.projectsExplained = true;
          flyTo('projects_right');
          setBehavior('projectHologram');
          nextDecisionTime.current = t + 4.0;
        }
      } else if (t > nextDecisionTime.current) {
        flyTo('projects_left');
        setBehavior('lookAround');
        nextDecisionTime.current = t + 5.0;
      }
    }
    else if (activeScene === 5) {
      // Services calculator section
      if (hoveredService === 0) { // BOQ Estimator
        if (!contextMemory.current.boqExplained) {
          contextMemory.current.boqExplained = true;
          flyTo('estimator_side');
          setBehavior('measureBuilding');
          nextDecisionTime.current = t + 4.0;
        }
      } else if (hoveredService === 1) { // BIM Coordination
        if (!contextMemory.current.bimExplained) {
          contextMemory.current.bimExplained = true;
          flyTo('estimator_side');
          setBehavior('checkAlignment');
          nextDecisionTime.current = t + 4.0;
        }
      } else if (hoveredService === 2) { // Materials
        if (!contextMemory.current.materialsExplained) {
          contextMemory.current.materialsExplained = true;
          flyTo('estimator_side');
          setBehavior('inspectMaterials');
          nextDecisionTime.current = t + 4.0;
        }
      } else if (t > nextDecisionTime.current) {
        flyTo('estimator_side');
        setBehavior('observeBlueprint');
        nextDecisionTime.current = t + 5.0;
      }
    }
    // Goal 8: Testimonials
    else if (activeScene === 7) {
      if (currentPointId.current !== 'testimonials') {
        flyTo('testimonials');
        setBehavior('confirmQuality');
        nextDecisionTime.current = t + 4.5;
      }
    }
    // Goal 9: Standard idle pacing / timed decisions
    else if (t > nextDecisionTime.current) {
      // Periodic adjustments
      if (activeScene === 4) {
        flyTo(currentPointId.current === 'process_guide' ? 'process_side' : 'process_guide');
        setBehavior('guideProcess');
      } else if (activeScene === 6) {
        flyTo('trust_corner');
        setBehavior('confirmQuality');
      } else {
        flyTo('about_side');
        setBehavior('lookAround');
      }
      nextDecisionTime.current = t + 3.0 + Math.random() * 3.5;
    }

    // ── PHYSICS POSITION CALCULATIONS ──
    const diff = new THREE.Vector3().subVectors(targetPos.current, pos);
    const dist = diff.length();

    // spring constant gets firmer if further away (fast recovery)
    const springK = 0.012 + Math.min(dist * 0.007, 0.024);
    velocity.current.addScaledVector(diff, springK);
    
    // spring dampening
    velocity.current.multiplyScalar(0.86);

    // Limit maximum physics velocity frame increments
    if (velocity.current.length() > 0.12) {
      velocity.current.setLength(0.12);
    }

    // Apply movement offset to pos vector
    pos.add(velocity.current);

    // ── arrived-sigh hover drop trigger ──
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
    const bankAngle   = lateralVel * -2.2;
    const pitchAngle  = verticalVel * 1.25;

    rotRef.current.x = THREE.MathUtils.lerp(rotRef.current.x, pitchAngle,  0.08);
    rotRef.current.y = THREE.MathUtils.lerp(rotRef.current.y, targetRotY.current, 0.06);
    rotRef.current.z = THREE.MathUtils.lerp(rotRef.current.z, bankAngle,   0.1);

    // ── Target Scale ──
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale.current, 0.05);

    // ── Micro Hover Oscillations ──
    const micro = Math.sin(t * 2.2) * 0.008
                + Math.sin(t * 3.8) * 0.004
                + Math.sin(t * 0.8) * 0.003;

    // Apply sigh-dip math: rapid dip, slow recover
    let sighDip = 0;
    if (arrivedSighTime.current > 0) {
      const age = t - arrivedSighTime.current;
      if (age < 2.0) {
        sighDip = Math.sin(age * Math.PI / 2.0) * -0.11 * Math.exp(-age * 1.6);
      } else {
        arrivedSighTime.current = -1;
      }
    }

    pos.y += micro + sighDip;
  });

  return null;
}
