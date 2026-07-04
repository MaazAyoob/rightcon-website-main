/**
 * ProceduralMascot.jsx — V10+V11
 *
 * True Digital Companion — FK Arm Rig + Emotion-Driven Joints
 *
 * Architecture:
 *   - FK arm chain: shoulder → upper_arm → elbow → forearm → wrist → palm → 3 fingers + thumb
 *   - ARM_EMOTION_CONFIGS: joint Euler angles per emotional state (no pose switching)
 *   - Attention model: per-frame look target with natural drift
 *   - Independent eye tracking (6-frame lag behind head)
 *   - Imperfect timing: randomised lerp rates, blink intervals
 *   - Body balance: banking from behaviourStateRef.velocity
 *   - Finger micro-movements: multi-frequency noise per finger
 */

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollSystem } from '../../context/ScrollContext';

// ── ARM_EMOTION_CONFIGS ──────────────────────────────────────────────────────
// LS/LE/LW = Left Shoulder/Elbow/Wrist  RS/RE/RW = Right (mirrored)
// torsoX/torsoY = body lean  headX/headY = head tilt
// LF/RF = finger style key
const EC = {
  calm: {
    LS: [0, 0, 0.15],    LE: [0.15, 0, 0],   LW: [0.05, 0, 0.05],
    RS: [0, 0, -0.15],   RE: [0.15, 0, 0],   RW: [0.05, 0, -0.05],
    torsoX: 0, torsoY: 0, headX: 0, headY: 0,
    LF: 'relaxed', RF: 'relaxed',
  },
  curious: {
    LS: [0.45, 0.1, 0.55],  LE: [0.75, 0, 0],  LW: [-0.1, 0, 0],
    RS: [0.45, -0.1, -0.55], RE: [0.75, 0, 0], RW: [-0.1, 0, 0],
    torsoX: 0.18, torsoY: 0, headX: -0.1, headY: 0,
    LF: 'relaxed', RF: 'relaxed',
  },
  thinking: {
    LS: [0, 0, 0.15],        LE: [0.15, 0, 0], LW: [0, 0, 0],
    RS: [-0.6, 0.1, -0.55],  RE: [1.35, 0, 0], RW: [0.1, 0.15, 0],
    torsoX: 0.05, torsoY: 0.1, headX: 0.1, headY: 0.1,
    LF: 'relaxed', RF: 'chinTouch',
  },
  happy: {
    LS: [-0.2, 0, -0.5], LE: [0.1, 0, 0], LW: [0, 0, 0.2],
    RS: [-0.2, 0, 0.5],  RE: [0.1, 0, 0], RW: [0, 0, -0.2],
    torsoX: -0.06, torsoY: 0, headX: -0.06, headY: 0,
    LF: 'open', RF: 'open',
  },
  excited: {
    LS: [-0.8, 0, -0.35], LE: [0.5, 0, 0], LW: [0, 0, 0.15],
    RS: [-0.8, 0, 0.35],  RE: [0.5, 0, 0], RW: [0, 0, -0.15],
    torsoX: 0, torsoY: 0, headX: -0.04, headY: 0,
    LF: 'open', RF: 'open',
    bounce: true,
  },
  focused: {
    LS: [-0.1, 0, 0.2], LE: [0.5, 0, 0], LW: [0.1, 0, 0],
    RS: [-0.1, 0, -0.2], RE: [0.5, 0, 0], RW: [0.1, 0, 0],
    torsoX: 0.12, torsoY: 0, headX: 0.1, headY: 0,
    LF: 'relaxed', RF: 'relaxed',
  },
  confident: {
    LS: [0.15, 0, -0.65], LE: [1.4, 0, 0], LW: [0, 0, 0.3],
    RS: [0.15, 0, 0.65],  RE: [1.4, 0, 0], RW: [0, 0, -0.3],
    torsoX: -0.04, torsoY: 0, headX: -0.03, headY: 0,
    LF: 'relaxed', RF: 'relaxed',
  },
  helpful: {
    LS: [0, 0, 0.15],           LE: [0.1, 0, 0],  LW: [0, 0, 0],
    RS: [-0.25, 0.05, -0.2],    RE: [0.2, 0, 0],   RW: [0, 0, -0.1],
    torsoX: 0.05, torsoY: 0.05, headX: 0.02, headY: 0.05,
    LF: 'relaxed', RF: 'pointing',
  },
  // ── Intro & special pose configs ──
  wave: {
    LS: [0, 0, 0.15],      LE: [0.15, 0, 0],     LW: [0, 0, 0],
    RS: [-1.15, 0, 0.1],   RE: [0.45, 0, 0.15],  RW: [0, 0, 0],
    torsoX: 0, torsoY: 0.05, headX: 0, headY: 0.05,
    LF: 'relaxed', RF: 'open', waveWrist: true,
  },
  waveFarewell: {
    LS: [0, 0, 0.15],      LE: [0.15, 0, 0],     LW: [0, 0, 0],
    RS: [-1.0, 0, -0.15],  RE: [0.35, 0, 0.1],   RW: [0, 0, 0],
    torsoX: 0, torsoY: 0.08, headX: 0, headY: 0.08,
    LF: 'relaxed', RF: 'open', waveWrist: true, slowWave: true,
  },
  pointing: {
    LS: [0, 0, 0.15],           LE: [0.15, 0, 0],  LW: [0, 0, 0],
    RS: [-0.25, 0.1, -0.25],    RE: [0.18, 0, 0],  RW: [0, 0, -0.1],
    torsoX: 0.04, torsoY: 0.05, headX: 0.02, headY: 0.05,
    LF: 'relaxed', RF: 'pointing',
  },
  celebrating: {
    LS: [-0.95, 0, -0.25], LE: [0.5, 0, 0], LW: [0, 0, 0.1],
    RS: [-0.95, 0, 0.25],  RE: [0.5, 0, 0], RW: [0, 0, -0.1],
    torsoX: 0, torsoY: 0, headX: -0.04, headY: 0,
    LF: 'open', RF: 'open', bounce: true, clap: true,
  },
  sitting: {
    LS: [0.7, 0, -0.1], LE: [0.9, 0, 0], LW: [0.1, 0, 0],
    RS: [0.7, 0, 0.1],  RE: [0.9, 0, 0], RW: [0.1, 0, 0],
    torsoX: 0.28, torsoY: 0, headX: 0, headY: 0,
    LF: 'relaxed', RF: 'relaxed',
  },
  keyPresent: {
    LS: [0, 0, 0.15],           LE: [0.15, 0, 0],  LW: [0, 0, 0],
    RS: [-0.35, 0, -0.25],      RE: [0.55, 0, 0],  RW: [0.15, 0.1, 0],
    torsoX: 0.05, torsoY: 0.05, headX: 0, headY: 0.05,
    LF: 'relaxed', RF: 'open',
  },
  keyReach: {
    LS: [0, 0, 0.15],  LE: [0.15, 0, 0], LW: [0, 0, 0],
    RS: [0.5, -0.2, -0.4], RE: [0.35, 0, 0], RW: [0, 0, 0],
    torsoX: 0, torsoY: -0.15, headX: 0, headY: -0.1,
    LF: 'relaxed', RF: 'curled',
  },
  inspect: {
    LS: [0.05, 0, 0.2],      LE: [0.4, 0, 0],  LW: [0, 0, 0],
    RS: [-0.35, 0.15, -0.45], RE: [1.0, 0, 0], RW: [0.15, 0, 0],
    torsoX: 0.05, torsoY: 0.1, headX: 0.08, headY: 0.1,
    LF: 'relaxed', RF: 'relaxed',
  },
  dustHands: {
    LS: [-0.2, 0, -0.3], LE: [1.1, 0, 0], LW: [0.1, 0, 0],
    RS: [-0.2, 0, 0.3],  RE: [1.1, 0, 0], RW: [0.1, 0, 0],
    torsoX: 0.05, torsoY: 0, headX: 0.1, headY: 0,
    LF: 'open', RF: 'open',
  },
  shrug: {
    LS: [-0.5, 0, -0.4], LE: [0.2, 0, 0], LW: [0, 0, 0.3],
    RS: [-0.5, 0, 0.4],  RE: [0.2, 0, 0], RW: [0, 0, -0.3],
    torsoX: -0.05, torsoY: 0, headX: 0.02, headY: 0,
    LF: 'open', RF: 'open',
  },
};

// Emotion / behavior → config key
const EMOTION_MAP = {
  calm:       'calm',      curious:  'curious',  thinking: 'thinking',
  focused:    'thinking',  happy:    'happy',     excited:  'excited',
  friendly:   'happy',     helpful:  'helpful',  confident:'confident',
  relaxed:    'calm',
};
const BEHAVIOR_MAP = {
  inspect: 'inspect', inspecting: 'inspect', observing: 'inspect',
  checkAlignment: 'inspect', dustHands: 'dustHands', shrug: 'shrug',
  pointing: 'pointing', inviteContinue: 'pointing', memoryPoint: 'pointing',
  waveFarewell: 'waveFarewell', celebrateForm: 'celebrating', sitFarewell: 'sitting',
  attentiveForm: 'thinking', contemplateWork: 'thinking', scanArea: 'curious',
  stretchArms: 'excited', studySkyline: 'curious', adjustJetpack: 'focused',
  checkProgress: 'inspect',
};
const INTRO_POSE_MAP = {
  idle: 'calm', wave: 'wave', reach: 'keyReach',
  present: 'keyPresent', nod: 'calm', celebrating: 'celebrating',
};

// Finger curl configs: [[proximalAngle, distalAngle] × 4 fingers (index, mid, ring, thumb)]
const FINGER_STYLES = {
  relaxed:   [[-0.08, -0.12], [-0.08, -0.12], [-0.08, -0.12], [-0.10, -0.10]],
  open:      [[ 0,     0],    [ 0,     0],    [ 0,     0],    [ 0,     0   ]],
  curled:    [[-0.80, -0.80], [-0.80, -0.80], [-0.80, -0.80], [-0.50, -0.50]],
  pointing:  [[ 0,     0],    [-0.80, -0.80], [-0.80, -0.80], [-0.40, -0.40]],
  chinTouch: [[-0.30, -0.40], [-0.30, -0.40], [-0.30, -0.40], [-0.25, -0.25]],
};

// ── Helper: lerp a [x,y,z] target into a THREE.Vector3 ──────────────────────
function lerpV3(ref, target, rate) {
  ref.x = THREE.MathUtils.lerp(ref.x, target[0], rate);
  ref.y = THREE.MathUtils.lerp(ref.y, target[1], rate);
  ref.z = THREE.MathUtils.lerp(ref.z, target[2], rate);
}

// Apply a Vector3 to a group's rotation
function applyRot(groupRef, v3) {
  if (!groupRef.current) return;
  groupRef.current.rotation.x = v3.x;
  groupRef.current.rotation.y = v3.y;
  groupRef.current.rotation.z = v3.z;
}

export default function ProceduralMascot({ posRef, rotRef, scaleRef, behaviourStateRef, velocityRef }) {
  const {
    mousePos, scrollVelocity, introActive, mascotPose, formFieldFocus, formSuccess, setConversationOpen,
  } = useScrollSystem();

  // ── Randomised lerp rates (imperfect timing — set once at mount) ──
  const rates = useMemo(() => ({
    shoulder: 0.055 + Math.random() * 0.018,
    elbow:    0.080 + Math.random() * 0.018,
    wrist:    0.110 + Math.random() * 0.018,
    finger:   0.140 + Math.random() * 0.020,
    head:     0.070 + Math.random() * 0.015,
    torso:    0.060 + Math.random() * 0.012,
    eye:      0.160 + Math.random() * 0.025,
  }), []);

  // ── Body joint refs ──
  const groupRef     = useRef();
  const bodyBaseRef  = useRef();
  const torsoRef     = useRef();
  const headRef      = useRef();
  const hoverBaseRef = useRef();
  const exhaustRef   = useRef();

  // ── Eye refs ──
  const leftEyeRef  = useRef();
  const rightEyeRef = useRef();

  // ── Arm joint refs (FK chain) ──
  const LShoulderRef = useRef(); const RShoulderRef = useRef();
  const LElbowRef    = useRef(); const RElbowRef    = useRef();
  const LWristRef    = useRef(); const RWristRef    = useRef();

  // ── Finger joint refs [proximal, distal] per finger × 2 hands ──
  const LFI = [useRef(), useRef()]; // Left Index
  const LFM = [useRef(), useRef()]; // Left Middle
  const LFR = [useRef(), useRef()]; // Left Ring
  const LFT = [useRef(), useRef()]; // Left Thumb
  const RFI = [useRef(), useRef()];
  const RFM = [useRef(), useRef()];
  const RFR = [useRef(), useRef()];
  const RFT = [useRef(), useRef()];

  // ── Smooth joint state (Vector3 for each joint, lerped toward target) ──
  const js = useRef({
    LS: new THREE.Vector3(0, 0, 0.15),  LE: new THREE.Vector3(0.15, 0, 0), LW: new THREE.Vector3(0.05, 0, 0.05),
    RS: new THREE.Vector3(0, 0, -0.15), RE: new THREE.Vector3(0.15, 0, 0), RW: new THREE.Vector3(0.05, 0, -0.05),
    torsoX: 0, torsoY: 0, headX: 0, headY: 0,
    // Finger curl state: [proximal, distal] × 4 fingers × 2 hands (flat array)
    LFC: [[-0.08, -0.12], [-0.08, -0.12], [-0.08, -0.12], [-0.10, -0.10]],
    RFC: [[-0.08, -0.12], [-0.08, -0.12], [-0.08, -0.12], [-0.10, -0.10]],
  });

  // ── Attention + eye state ──
  const attention = useRef(new THREE.Vector2(0, 0));
  const eyePos    = useRef(new THREE.Vector2(0, 0)); // Lags behind attention

  // ── Blink state (imperfect timing) ──
  const nextBlink  = useRef(3.5 + Math.random() * 2.5);
  const isBlinking = useRef(false);
  const eyeScaleY  = useRef(1.0);
  const bodyFacingY = useRef(0);
  const visibilityScale = useRef(1.0);

  // ── Materials ──
  const mats = useMemo(() => ({
    ceramic: new THREE.MeshPhysicalMaterial({
      color: '#fcfbfa', roughness: 0.12, metalness: 0.02,
      clearcoat: 1.0, clearcoatRoughness: 0.05,
    }),
    cobalt: new THREE.MeshStandardMaterial({ color: '#07335c', roughness: 0.25, metalness: 0.8 }),
    chrome: new THREE.MeshStandardMaterial({ color: '#e5e5e5', roughness: 0.05, metalness: 1.0 }),
    cyan: new THREE.MeshBasicMaterial({ color: '#00f3ff', transparent: true }),
    gold: new THREE.MeshBasicMaterial({ color: '#D4AF37', transparent: true }),
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // ── 1. Apply global transform ──
    if (groupRef.current) {
      groupRef.current.position.copy(posRef.current);
      groupRef.current.rotation.copy(rotRef.current);
      
      const targetVisibility = (mascotPose === 'vision' || mascotPose === 'trust') ? 0.0 : 1.0;
      visibilityScale.current = THREE.MathUtils.lerp(visibilityScale.current, targetVisibility, 0.08);

      const sv = (typeof scaleRef.current === 'object'
        ? (scaleRef.current.value ?? 1.0) : (scaleRef.current ?? 1.0)) * visibilityScale.current;
      groupRef.current.scale.setScalar(sv);
    }

    // ── 2. Resolve which config to use ──
    const bState  = behaviourStateRef?.current ?? {};
    const emotion  = introActive ? 'calm' : (bState.emotion || 'calm');
    const behavior = introActive ? 'hover'  : (bState.behavior || 'hover');

    // Priority: intro pose > behavior override > emotion
    let configKey;
    if (introActive) {
      configKey = INTRO_POSE_MAP[mascotPose] || 'calm';
    } else if (BEHAVIOR_MAP[behavior]) {
      configKey = BEHAVIOR_MAP[behavior];
    } else {
      configKey = EMOTION_MAP[emotion] || 'calm';
    }

    // Form state overrides
    if (formSuccess)           configKey = 'celebrating';
    if (formFieldFocus && !formSuccess && !introActive) configKey = 'thinking';

    const cfg = EC[configKey] || EC.calm;

    // ── 3. Compute joint targets ──
    let lsTarget = [...cfg.LS];
    let rsTarget = [...cfg.RS];
    let leTarget = [...cfg.LE];
    let reTarget = [...cfg.RE];
    let lwTarget = [...cfg.LW];
    let rwTarget = [...cfg.RW];
    let txTarget = cfg.torsoX;
    let tyTarget = cfg.torsoY;
    let hxTarget = cfg.headX;
    let hyTarget = cfg.headY;

    // Special animations driven by time
    if (cfg.waveWrist) {
      const freq  = cfg.slowWave ? 6 : 11;
      rwTarget[1] = Math.sin(t * freq) * 0.38;
    }
    if (cfg.bounce) {
      txTarget += Math.sin(t * 12) * 0.04;
    }
    if (cfg.clap) {
      const clapT = (Math.sin(t * 10) * 0.5 + 0.5); // 0..1
      lsTarget[2] = -0.25 + clapT * -0.25;
      rsTarget[2] =  0.25 + clapT *  0.25;
    }
    if (configKey === 'dustHands') {
      const rub = Math.sin(t * 12) * 0.04;
      lwTarget[2] =  rub;
      rwTarget[2] = -rub;
    }
    if (configKey === 'sitting') {
      hoverBaseRef.current && (hoverBaseRef.current.rotation.x = THREE.MathUtils.lerp(
        hoverBaseRef.current?.rotation.x || 0, 0.45, 0.08));
    }

    // Inertia from velocity (body balance)
    const vel = velocityRef?.current || new THREE.Vector3(0, 0, 0);
    const velMag = vel.length();
    txTarget += vel.y * 0.4;          // Pitch with vertical velocity
    tyTarget += -vel.x * 0.25;        // Yaw into lateral velocity

    // ── 4. Lerp joints toward targets ──
    lerpV3(js.current.LS, lsTarget, rates.shoulder);
    lerpV3(js.current.LE, leTarget, rates.elbow);
    lerpV3(js.current.LW, lwTarget, rates.wrist);
    lerpV3(js.current.RS, rsTarget, rates.shoulder);
    lerpV3(js.current.RE, reTarget, rates.elbow);
    lerpV3(js.current.RW, rwTarget, rates.wrist);
    js.current.torsoX = THREE.MathUtils.lerp(js.current.torsoX, txTarget, rates.torso);
    js.current.torsoY = THREE.MathUtils.lerp(js.current.torsoY, tyTarget, rates.torso);
    js.current.headX  = THREE.MathUtils.lerp(js.current.headX,  hxTarget, rates.head);
    js.current.headY  = THREE.MathUtils.lerp(js.current.headY,  hyTarget, rates.head);

    // Apply arm joints
    applyRot(LShoulderRef, js.current.LS);
    applyRot(LElbowRef,    js.current.LE);
    applyRot(LWristRef,    js.current.LW);
    applyRot(RShoulderRef, js.current.RS);
    applyRot(RElbowRef,    js.current.RE);
    applyRot(RWristRef,    js.current.RW);

    // ── 5. Torso ──
    if (torsoRef.current) {
      torsoRef.current.rotation.x = js.current.torsoX;
      torsoRef.current.rotation.y = js.current.torsoY;
      // Breathing bob
      const breath = Math.sin(t * 1.3) * 0.014;
      torsoRef.current.position.y = breath + (configKey === 'celebrating' ? Math.abs(Math.sin(t * 11)) * 0.04 : 0);
    }

    // ── 6. Hover thruster base ──
    if (hoverBaseRef.current && configKey !== 'sitting') {
      hoverBaseRef.current.rotation.x = THREE.MathUtils.lerp(hoverBaseRef.current.rotation.x, 0, 0.08);
    }

    // ── 7. Finger curls + micro-movements ──
    const LFStyle = FINGER_STYLES[cfg.LF] || FINGER_STYLES.relaxed;
    const RFStyle = FINGER_STYLES[cfg.RF] || FINGER_STYLES.relaxed;

    const fingerGroups = [
      { refs: [LFI[0], LFI[1]], style: LFStyle[0], side: 'L', fi: 0 },
      { refs: [LFM[0], LFM[1]], style: LFStyle[1], side: 'L', fi: 1 },
      { refs: [LFR[0], LFR[1]], style: LFStyle[2], side: 'L', fi: 2 },
      { refs: [LFT[0], LFT[1]], style: LFStyle[3], side: 'L', fi: 3 },
      { refs: [RFI[0], RFI[1]], style: RFStyle[0], side: 'R', fi: 0 },
      { refs: [RFM[0], RFM[1]], style: RFStyle[1], side: 'R', fi: 1 },
      { refs: [RFR[0], RFR[1]], style: RFStyle[2], side: 'R', fi: 2 },
      { refs: [RFT[0], RFT[1]], style: RFStyle[3], side: 'R', fi: 3 },
    ];

    const isTapping = configKey === 'thinking';

    fingerGroups.forEach(({ refs, style, side, fi }) => {
      const [p0Ref, p1Ref] = refs;
      const [targetProximal, targetDistal] = style;
      // Multi-frequency micro-movement noise per finger (different phase each)
      const phase  = fi * 1.37 + (side === 'R' ? Math.PI : 0);
      const noise  = Math.sin(t * 0.9 + phase) * 0.012 + Math.sin(t * 2.1 + phase * 1.5) * 0.007;
      
      let tapOffset = 0;
      if (isTapping && side === 'R') {
        const tapFreq = 12;
        const seq = (t * tapFreq) % 4; // Sequence 0 to 3 wiggling fingers in order
        const distToSeq = Math.abs(fi - seq);
        if (distToSeq < 0.8) {
          tapOffset = -0.32 * (1.0 - distToSeq); // curl finger slightly
        }
      }

      if (p0Ref.current) {
        p0Ref.current.rotation.x = THREE.MathUtils.lerp(p0Ref.current.rotation.x, targetProximal + noise + tapOffset, rates.finger);
      }
      if (p1Ref.current) {
        p1Ref.current.rotation.x = THREE.MathUtils.lerp(p1Ref.current.rotation.x, targetDistal + noise * 0.7 + tapOffset * 0.7, rates.finger);
      }
    });

    // ── 8. Attention model → head & eye tracking ──
    const scrollSpeed = Math.abs(scrollVelocity);

    // Base: follow mouse softly
    let atX = (mousePos.x || 0) * 0.16;
    let atY = (mousePos.y || 0) * 0.12;

    // Strong velocity → look in movement direction
    if (velMag > 0.025) {
      atX = THREE.MathUtils.lerp(atX, vel.x * 2.8, 0.65);
      atY = THREE.MathUtils.lerp(atY, -vel.y * 2.2, 0.65);
    }

    // Fast scroll → look ahead
    if (scrollSpeed > 1.8) {
      atY = scrollVelocity > 0 ? -0.22 : 0.22;
    }

    // Natural idle drift (prevents dead stare)
    if (scrollSpeed < 0.15 && velMag < 0.015) {
      atX += Math.sin(t * 0.35) * 0.018;
      atY += Math.cos(t * 0.27) * 0.013;
    }

    // Config overrides head orientation
    const headXFinal = js.current.headX + atX;
    const headYFinal = js.current.headY + atY;

    if (headRef.current) {
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, headXFinal, rates.head);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, headYFinal, rates.head);
      
      let headZTilt = 0;
      if (emo === 'curious' || configKey === 'thinking') {
        headZTilt = 0.12; // Subtle head tilt to look thoughtful/inquisitive
      }
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, headZTilt, rates.head);
      
      // Breathing lift on head
      headRef.current.position.y = 0.44 + Math.sin(t * 1.3) * 0.016;
    }

    // Eye moves independently — 6-frame lag
    attention.current.x = THREE.MathUtils.lerp(attention.current.x, atX, 0.08);
    attention.current.y = THREE.MathUtils.lerp(attention.current.y, atY, 0.08);
    eyePos.current.x    = THREE.MathUtils.lerp(eyePos.current.x, attention.current.x, rates.eye);
    eyePos.current.y    = THREE.MathUtils.lerp(eyePos.current.y, attention.current.y, rates.eye);

    // ── 9. Blink (imperfect timing) ──
    if (t > nextBlink.current) {
      isBlinking.current = true;
      nextBlink.current = t + 3.2 + Math.random() * 4.8; // 3.2–8s intervals
    }
    let targetEyeScaleY = 1.0;
    if (isBlinking.current) {
      eyeScaleY.current = THREE.MathUtils.lerp(eyeScaleY.current, 0.05, 0.4);
      if (eyeScaleY.current < 0.08) isBlinking.current = false;
    } else {
      if (emo === 'excited' || emo === 'happy' || emo === 'friendly') {
        targetEyeScaleY = 1.45; // Widen eyes in excitement/surprise
      } else if (emo === 'calm' || emo === 'relaxed' || configKey === 'sitting') {
        targetEyeScaleY = 0.70; // Soften eyes in calm/rest
      }
      eyeScaleY.current = THREE.MathUtils.lerp(eyeScaleY.current, targetEyeScaleY, 0.35);
    }

    // Emotion-driven eye shape
    targetEyeScaleY = eyeScaleY.current;
    let targetEyeScaleX = 1.0;
    if (configKey === 'celebrating' || configKey === 'happy' || formSuccess) {
      targetEyeScaleY = 0.3; targetEyeScaleX = 1.4; // Happy squint
    } else if (configKey === 'thinking' || formFieldFocus) {
      targetEyeScaleY = Math.min(eyeScaleY.current, 0.6); // Narrowed focus
    }

    const eyeL = leftEyeRef.current;
    const eyeR = rightEyeRef.current;
    if (eyeL) {
      eyeL.position.x = -0.10 + eyePos.current.x * 0.35;
      eyeL.position.y =          eyePos.current.y * 0.25;
      eyeL.scale.y = THREE.MathUtils.lerp(eyeL.scale.y, targetEyeScaleY, 0.35);
      eyeL.scale.x = THREE.MathUtils.lerp(eyeL.scale.x, targetEyeScaleX, 0.35);
    }
    if (eyeR) {
      eyeR.position.x =  0.10 + eyePos.current.x * 0.35;
      eyeR.position.y =          eyePos.current.y * 0.25;
      eyeR.scale.y = THREE.MathUtils.lerp(eyeR.scale.y, targetEyeScaleY, 0.35);
      eyeR.scale.x = THREE.MathUtils.lerp(eyeR.scale.x, targetEyeScaleX, 0.35);
    }

    // ── 10. Jetpack exhaust ──
    if (exhaustRef.current) {
      const isSitting = configKey === 'sitting';
      const thrustBase = isSitting ? 0 : 0.8;
      const flicker = isSitting ? 0 : Math.sin(t * 28) * 0.14 + Math.sin(t * 17) * 0.08;
      exhaustRef.current.scale.y = Math.max(0, thrustBase + flicker);
      exhaustRef.current.scale.x = isSitting ? 0 : 0.9 + flicker * 0.3;
      exhaustRef.current.scale.z = exhaustRef.current.scale.x;
      exhaustRef.current.material.opacity = isSitting ? 0 : 0.4 + flicker * 0.2;
    }

    // ── 11. Subtle body pacing sway when idle ──
    const isIdle = scrollSpeed < 0.12 && velMag < 0.01 && !introActive;
    if (isIdle && bodyBaseRef.current) {
      const paceX = Math.sin(t * 0.35) * 0.18;
      bodyBaseRef.current.position.x = THREE.MathUtils.lerp(bodyBaseRef.current.position.x, paceX, 0.04);
      const movingRight = Math.cos(t * 0.35) > 0;
      bodyFacingY.current = THREE.MathUtils.lerp(bodyFacingY.current, movingRight ? 0.2 : -0.2, 0.04);
    } else if (bodyBaseRef.current) {
      bodyBaseRef.current.position.x = THREE.MathUtils.lerp(bodyBaseRef.current.position.x, 0, 0.07);
      bodyFacingY.current = THREE.MathUtils.lerp(bodyFacingY.current, 0, 0.07);
    }
    if (bodyBaseRef.current) {
      bodyBaseRef.current.rotation.y = bodyFacingY.current;
    }
  });

  // Resolve emotion for eye/light colour rendering
  const bState   = behaviourStateRef?.current ?? {};
  const emo      = introActive ? 'calm' : (bState.emotion || 'calm');
  const isCurious  = emo === 'curious';
  const isExcited  = emo === 'excited' || emo === 'happy' || emo === 'friendly';
  const isThinking = emo === 'thinking' || emo === 'focused';

  // ── Helper: single arm subtree ──────────────────────────────────────────────
  const ArmSegment = ({ shoulderRef, elbowRef, wristRef, side,
    fi: [I0,I1], fm: [M0,M1], fr: [R0,R1], ft: [T0,T1] }) => {
    const sign = side === 'L' ? -1 : 1; // X-axis mirror for right arm
    return (
      <group ref={shoulderRef} position={[sign * 0.30, 0.20, 0]}>
        {/* Upper arm */}
        <mesh material={mats.ceramic} position={[0, -0.13, 0]} castShadow>
          <capsuleGeometry args={[0.055, 0.22, 8, 16]} />
        </mesh>
        {/* Elbow ball */}
        <mesh material={mats.chrome} position={[0, -0.27, 0]}>
          <sphereGeometry args={[0.064, 12, 12]} />
        </mesh>
        {/* Elbow joint pivot */}
        <group ref={elbowRef} position={[0, -0.27, 0]}>
          {/* Forearm */}
          <mesh material={mats.ceramic} position={[0, -0.10, 0]} castShadow>
            <capsuleGeometry args={[0.048, 0.18, 8, 16]} />
          </mesh>
          {/* Wrist ball */}
          <mesh material={mats.chrome} position={[0, -0.20, 0]}>
            <sphereGeometry args={[0.055, 12, 12]} />
          </mesh>
          {/* Wrist joint pivot */}
          <group ref={wristRef} position={[0, -0.21, 0]}>
            {/* Palm */}
            <mesh material={mats.ceramic} position={[0, -0.045, 0]}>
              <boxGeometry args={[0.10, 0.065, 0.058]} />
            </mesh>
            {/* ── Index finger ── */}
            <group position={[sign * -0.028, -0.082, 0.01]}>
              <group ref={I0}>
                <mesh material={mats.ceramic} position={[0, -0.028, 0]}>
                  <capsuleGeometry args={[0.011, 0.046, 6, 8]} />
                </mesh>
                <group ref={I1} position={[0, -0.057, 0]}>
                  <mesh material={mats.ceramic} position={[0, -0.022, 0]}>
                    <capsuleGeometry args={[0.009, 0.036, 6, 8]} />
                  </mesh>
                </group>
              </group>
            </group>
            {/* ── Middle finger ── */}
            <group position={[0, -0.085, 0.005]}>
              <group ref={M0}>
                <mesh material={mats.ceramic} position={[0, -0.030, 0]}>
                  <capsuleGeometry args={[0.011, 0.050, 6, 8]} />
                </mesh>
                <group ref={M1} position={[0, -0.062, 0]}>
                  <mesh material={mats.ceramic} position={[0, -0.023, 0]}>
                    <capsuleGeometry args={[0.009, 0.038, 6, 8]} />
                  </mesh>
                </group>
              </group>
            </group>
            {/* ── Ring finger ── */}
            <group position={[sign * 0.028, -0.080, -0.008]}>
              <group ref={R0}>
                <mesh material={mats.ceramic} position={[0, -0.027, 0]}>
                  <capsuleGeometry args={[0.010, 0.044, 6, 8]} />
                </mesh>
                <group ref={R1} position={[0, -0.055, 0]}>
                  <mesh material={mats.ceramic} position={[0, -0.020, 0]}>
                    <capsuleGeometry args={[0.008, 0.032, 6, 8]} />
                  </mesh>
                </group>
              </group>
            </group>
            {/* ── Thumb ── */}
            <group position={[sign * -0.052, -0.042, 0.018]} rotation={[0, 0, sign * -0.4]}>
              <group ref={T0}>
                <mesh material={mats.ceramic} position={[0, -0.022, 0]}>
                  <capsuleGeometry args={[0.013, 0.034, 6, 8]} />
                </mesh>
                <group ref={T1} position={[0, -0.045, 0]}>
                  <mesh material={mats.ceramic} position={[0, -0.018, 0]}>
                    <capsuleGeometry args={[0.011, 0.028, 6, 8]} />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    );
  };

  return (
    <group ref={groupRef} onClick={(e) => {
      e.stopPropagation();
      if (!introActive) setConversationOpen(true);
    }}>
      {/* Reactive emotion glow */}
      <pointLight
        position={[0, 0, 0.5]}
        color={isExcited ? '#D4AF37' : (isThinking ? '#49B8FF' : '#00f3ff')}
        intensity={1.8} distance={4.5} decay={2}
      />

      <group ref={bodyBaseRef}>
        {/* ── TORSO ── */}
        <group ref={torsoRef}>
          <mesh material={mats.ceramic} castShadow receiveShadow>
            <capsuleGeometry args={[0.22, 0.5, 16, 32]} />
          </mesh>
          {/* Chest panel */}
          <mesh position={[0, 0.08, 0.17]} rotation={[0.08, 0, 0]} material={mats.cobalt}>
            <boxGeometry args={[0.16, 0.22, 0.08]} />
          </mesh>
          {/* Spine detail */}
          <mesh position={[0, 0.0, -0.17]} material={mats.chrome}>
            <boxGeometry args={[0.05, 0.3, 0.04]} />
          </mesh>

          {/* ── HEAD ── */}
          <group ref={headRef} position={[0, 0.44, 0]}>
            <mesh material={mats.ceramic} castShadow>
              <sphereGeometry args={[0.26, 32, 32]} />
            </mesh>
            <mesh position={[0, 0.04, 0.08]} material={mats.cobalt}>
              <boxGeometry args={[0.4, 0.1, 0.34]} />
            </mesh>

            {/* Visor eyes */}
            <group position={[0, 0.04, 0.25]}>
              {isCurious ? (<>
                <mesh ref={leftEyeRef}  position={[-0.10, 0, 0]} material={mats.cyan}><torusGeometry args={[0.022, 0.006, 4, 16]} /></mesh>
                <mesh ref={rightEyeRef} position={[ 0.10, 0, 0]} material={mats.cyan}><torusGeometry args={[0.022, 0.006, 4, 16]} /></mesh>
              </>) : isExcited ? (<>
                <mesh ref={leftEyeRef}  position={[-0.10, 0, 0]} material={mats.gold}><sphereGeometry args={[0.022, 8, 8]} /></mesh>
                <mesh ref={rightEyeRef} position={[ 0.10, 0, 0]} material={mats.gold}><sphereGeometry args={[0.022, 8, 8]} /></mesh>
              </>) : isThinking ? (<>
                <mesh ref={leftEyeRef}  position={[-0.10, 0, 0]} rotation={[0,0, 0.35]} material={mats.cyan}><boxGeometry args={[0.04, 0.007, 0.01]} /></mesh>
                <mesh ref={rightEyeRef} position={[ 0.10, 0, 0]} rotation={[0,0,-0.35]} material={mats.cyan}><boxGeometry args={[0.04, 0.007, 0.01]} /></mesh>
              </>) : (<>
                <mesh ref={leftEyeRef}  position={[-0.10, 0, 0]} material={mats.cyan}><boxGeometry args={[0.05, 0.008, 0.01]} /></mesh>
                <mesh ref={rightEyeRef} position={[ 0.10, 0, 0]} material={mats.cyan}><boxGeometry args={[0.05, 0.008, 0.01]} /></mesh>
              </>)}
            </group>

            {/* Chrome ears */}
            <mesh position={[-0.26, 0, 0]} rotation={[0,0, Math.PI/2]} material={mats.chrome}><cylinderGeometry args={[0.06,0.06,0.04,16]} /></mesh>
            <mesh position={[ 0.26, 0, 0]} rotation={[0,0,-Math.PI/2]} material={mats.chrome}><cylinderGeometry args={[0.06,0.06,0.04,16]} /></mesh>
          </group>

          {/* ── ARMS ── */}
          <ArmSegment
            shoulderRef={LShoulderRef} elbowRef={LElbowRef} wristRef={LWristRef} side="L"
            fi={LFI} fm={LFM} fr={LFR} ft={LFT}
          />
          <ArmSegment
            shoulderRef={RShoulderRef} elbowRef={RElbowRef} wristRef={RWristRef} side="R"
            fi={RFI} fm={RFM} fr={RFR} ft={RFT}
          />
        </group>

        {/* ── HOVER THRUSTER BASE ── */}
        <group ref={hoverBaseRef} position={[0, -0.52, 0]}>
          <mesh material={mats.chrome}  position={[0, 0.12, 0]}><cylinderGeometry args={[0.12, 0.10, 0.08, 16]} /></mesh>
          <mesh material={mats.cobalt}  position={[0, 0.02, 0]}><cylinderGeometry args={[0.18, 0.12, 0.14, 16]} /></mesh>
          <mesh material={mats.cyan}    position={[0,-0.06, 0]}><cylinderGeometry args={[0.08, 0.08, 0.02, 16]} /></mesh>
          {/* Exhaust */}
          <mesh ref={exhaustRef} position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.05, 0.005, 0.3, 16, 1, true]} />
            <meshBasicMaterial
              color="#00f3ff" transparent opacity={0.6}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide} depthWrite={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
