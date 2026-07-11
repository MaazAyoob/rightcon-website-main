import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { useScrollSystem } from '../../context/ScrollContext';
import * as THREE from 'three';
import { CanvasContextDisposer } from '../Sculptures/SculptureCanvas';

// ─────────────────────────────────────────────────────────────────────────────
// Geometry helpers — pre-baked into BufferGeometry for single-draw merging
// ─────────────────────────────────────────────────────────────────────────────

function makeBeam(ax, ay, az, bx, by, bz, w = 0.030) {
  const start = new THREE.Vector3(ax, ay, az);
  const end   = new THREE.Vector3(bx, by, bz);
  const dir   = end.clone().sub(start);
  const len   = dir.length();
  if (len < 0.001) return null;
  const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const geo    = new THREE.BoxGeometry(w, len, w);
  const norm   = dir.normalize();
  const quat   = new THREE.Quaternion();
  if (norm.y < -0.9999) quat.set(0, 0, 1, 0);
  else quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), norm);
  geo.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(quat));
  geo.applyMatrix4(new THREE.Matrix4().makeTranslation(center.x, center.y, center.z));
  return geo;
}

function makeJoint(x, y, z, s = 0.052) {
  const geo = new THREE.BoxGeometry(s, s, s);
  geo.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
  return geo;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sculpture geometry — "Steel Portal Frame Assembly"
// Split into 6 independent groups for layered animation
// ─────────────────────────────────────────────────────────────────────────────

function buildSculptureGeos() {
  const ZF = 0.40;   // front face z
  const ZB = -0.40;  // back face z

  const PRI  = 0.033;
  const SEC  = 0.021;
  const PUR  = 0.018;
  const ROOF = 0.017;

  const og = [], bg = [], pg = [], cg = [], rg = [], jg = [];

  const pb = (arr, ...a) => { const g = makeBeam(...a); if (g) arr.push(g); };

  const CX = [-1.5, -0.5, 0.5, 1.5];
  const LY = [-1.0, 0.0, 1.0];

  // ── OUTER FRAME — front + back ───────────────────────────────────────────
  [ZF, ZB].forEach(Z => {
    CX.forEach(x => {
      pb(og, x, LY[0], Z, x, LY[1], Z, PRI);
      pb(og, x, LY[1], Z, x, LY[2], Z, PRI);
    });
    for (let li = 0; li < 3; li++)
      for (let ci = 0; ci < 3; ci++)
        pb(og, CX[ci], LY[li], Z, CX[ci+1], LY[li], Z, PRI);
  });

  // ── X-BRACING — front + back ──────────────────────────────────────────────
  [ZF, ZB].forEach(Z => {
    // Bay 0: both stories
    pb(bg, -1.5, 0.0, Z, -0.5, 1.0, Z, SEC);
    pb(bg, -1.5, 1.0, Z, -0.5, 0.0, Z, SEC);
    pb(bg, -1.5,-1.0, Z, -0.5, 0.0, Z, SEC);
    pb(bg, -1.5, 0.0, Z, -0.5,-1.0, Z, SEC);
    // Bay 2: top story only
    pb(bg,  0.5, 0.0, Z,  1.5, 1.0, Z, SEC);
    pb(bg,  0.5, 1.0, Z,  1.5, 0.0, Z, SEC);
  });

  // ── DEPTH PURLINS ─────────────────────────────────────────────────────────
  CX.forEach(x => {
    LY.forEach(y => {
      pb(pg, x, y, ZF, x, y, ZB, PUR * 1.35);
      jg.push(makeJoint(x, y,  ZF, 0.052));
      jg.push(makeJoint(x, y,  ZB, 0.048));
    });
    pb(pg, x,  0.5, ZF, x,  0.5, ZB, PUR);
    pb(pg, x, -0.5, ZF, x, -0.5, ZB, PUR);
  });

  // ── CANTILEVER ARM ────────────────────────────────────────────────────────
  pb(cg, 1.5, 1.0, ZF, 2.2, 1.0, ZF, PRI * 0.82);
  pb(cg, 1.5, 1.0, ZB, 2.2, 1.0, ZB, PRI * 0.75);
  pb(cg, 1.5, 0.0, ZF, 2.2, 1.0, ZF, SEC * 1.1);
  pb(cg, 1.5, 0.0, ZB, 2.2, 1.0, ZB, SEC * 0.95);
  pb(cg, 2.2, 1.0, ZF, 2.2, 1.0, ZB, PUR * 1.2);
  pb(cg, 2.2, 1.0, ZF, 2.2, 0.45, ZF, PRI * 0.62);
  pb(cg, 2.2, 1.0, ZB, 2.2, 0.45, ZB, PRI * 0.58);
  jg.push(makeJoint(2.2, 1.0,  ZF, 0.047));
  jg.push(makeJoint(2.2, 1.0,  ZB, 0.043));
  jg.push(makeJoint(2.2, 0.45, ZF, 0.040));

  // ── ROOF + FLOOR PLANE BRACING ────────────────────────────────────────────
  pb(rg, -1.5, 1.0, ZF, -0.5, 1.0, ZB, ROOF);
  pb(rg, -0.5, 1.0, ZF, -1.5, 1.0, ZB, ROOF);
  pb(rg,  0.5, 1.0, ZF,  1.5, 1.0, ZB, ROOF);
  pb(rg,  1.5, 1.0, ZF,  0.5, 1.0, ZB, ROOF);
  pb(rg, -1.5,-1.0, ZF, -0.5,-1.0, ZB, ROOF * 0.85);
  pb(rg, -0.5,-1.0, ZF, -1.5,-1.0, ZB, ROOF * 0.85);
  pb(rg, -1.5, 0.0, ZF, -1.5, 1.0, ZB, ROOF * 0.75);
  pb(rg, -1.5, 1.0, ZF, -1.5, 0.0, ZB, ROOF * 0.75);

  const mg = (arr) => arr.length > 0 ? mergeGeometries(arr) : null;
  return {
    outerGeo: mg(og), bracingGeo: mg(bg), purlinGeo: mg(pg),
    cantGeo:  mg(cg), roofGeo:   mg(rg), jointGeo:  mg(jg),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Studio lighting
// ─────────────────────────────────────────────────────────────────────────────

function StudioLights({ hoverRef }) {
  const rimRef = useRef();
  const keyRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const isH = hoverRef?.current || false;
    if (rimRef.current) {
      rimRef.current.intensity = THREE.MathUtils.lerp(
        rimRef.current.intensity, isH ? 3.0 : 2.2, 0.04
      );
    }
    if (keyRef.current) {
      keyRef.current.intensity = 3.2 + Math.sin(t * 0.08) * 0.20;
    }
  });

  return (
    <>
      <ambientLight intensity={0.28} color="#E8ECF2" />
      <directionalLight ref={keyRef} position={[5, 9, 7]} intensity={3.2} color="#F0EBE4" />
      <pointLight ref={rimRef} position={[-6, 2.5, -4.5]} intensity={2.2} color="#0000AA" distance={18} decay={2} />
      <pointLight position={[-3, -3, 6]} intensity={0.42} color="#DDE4F5" distance={12} decay={2} />
      <pointLight position={[7, 5, 2]} intensity={0.30} color="#C9A227" distance={14} decay={2.5} />
      <pointLight position={[0, -5, 1]} intensity={0.18} color="#D8DCE4" distance={10} decay={2} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The sculpture — multi-group independent animation
// ─────────────────────────────────────────────────────────────────────────────

function ArchitecturalSculpture({ mouseRef, hoverRef, scrollRef }) {
  const mainRef    = useRef();
  const outerRef   = useRef();
  const bracingRef = useRef();
  const purlinRef  = useRef();
  const cantRef    = useRef();
  const roofRef    = useRef();

  const spX = useRef({ v: 0, p: 0 });
  const spY = useRef({ v: 0, p: 0 });

  // ── Shiny polished metal — mirror/chrome finish ──────────────────────────
  const mats = useMemo(() => ({
    outer: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#71797E'),   // metallic grey — primary columns/beams
      metalness: 1.0, roughness: 0.08,
    }),
    bracing: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#636B70'),   // slightly darker — X-bracing
      metalness: 1.0, roughness: 0.10,
    }),
    purlin: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#6A7276'),   // mid tone — depth purlins
      metalness: 1.0, roughness: 0.09,
    }),
    cant: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#7E868B'),   // lighter — cantilever, most polished face
      metalness: 1.0, roughness: 0.06,
    }),
    roof: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#5E6669'),   // darkest — roof/floor bracing
      metalness: 1.0, roughness: 0.12,
    }),
    joint: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9AA0A6'),   // lightest — joint nodes, near-chrome
      metalness: 1.0, roughness: 0.03,
    }),
  }), []);

  const geos = useMemo(() => buildSculptureGeos(), []);

  useFrame((state) => {
    const t      = state.clock.getElapsedTime();
    const mouse  = mouseRef?.current  || { x: 0, y: 0 };
    const isH    = hoverRef?.current  || false;
    const scroll = Math.min(scrollRef?.current || 0, 1.0);

    // Spring physics
    const STIFF = 0.048, DAMP = 0.845;
    const tX = isH ? -mouse.y * 0.16 : 0;
    const tY = isH ?  mouse.x * 0.20 : 0;
    spX.current.v = spX.current.v * DAMP + (tX - spX.current.p) * STIFF;
    spX.current.p += spX.current.v;
    spY.current.v = spY.current.v * DAMP + (tY - spY.current.p) * STIFF;
    spY.current.p += spY.current.v;

    // Main group
    if (mainRef.current) {
      mainRef.current.rotation.y = t * 0.018 + spY.current.p;
      mainRef.current.rotation.x = t * -0.004 + spX.current.p + scroll * 0.20;
      const breath = 1.0 + Math.sin(t * 0.37) * 0.011;
      const sc     = breath * (isH ? 1.020 : 1.0);
      const cur    = mainRef.current.scale;
      cur.x = THREE.MathUtils.lerp(cur.x, sc, 0.030);
      cur.y = THREE.MathUtils.lerp(cur.y, sc, 0.030);
      cur.z = THREE.MathUtils.lerp(cur.z, sc, 0.030);
    }

    // Outer frame — micro roll
    if (outerRef.current)   outerRef.current.rotation.z   = Math.sin(t * 0.21) * 0.005;
    // Bracing — counter-rotation
    if (bracingRef.current) {
      bracingRef.current.rotation.y = -t * 0.009 + scroll * -0.22;
      bracingRef.current.rotation.x =  Math.sin(t * 0.30) * 0.007 + scroll * 0.14;
    }
    // Purlins — Z-plane flex
    if (purlinRef.current) {
      purlinRef.current.rotation.x = Math.sin(t * 0.27) * 0.006;
      purlinRef.current.rotation.z = Math.sin(t * 0.19) * 0.004;
    }
    // Cantilever — micro articulation at pivot
    if (cantRef.current) {
      cantRef.current.rotation.z = Math.sin(t * 0.43) * 0.009 + scroll * -0.12;
      cantRef.current.rotation.y = Math.sin(t * 0.31) * 0.008;
    }
    // Roof bracing — slow plane tilt
    if (roofRef.current)    roofRef.current.rotation.x    = scroll * 0.18 + Math.sin(t * 0.18) * 0.005;

    // Camera — slow orbit + parallax
    const orbitX  = Math.sin(t * 0.055) * 0.24;
    const orbitY  = 0.10 + Math.sin(t * 0.082) * 0.11;
    const targetZ = isH ? 4.05 : 4.60;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, orbitX + mouse.x * 0.13, 0.010);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, orbitY + mouse.y * 0.07, 0.010);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.026);
    state.camera.lookAt(0.35, 0.0, 0.0);
  });

  return (
    <group ref={mainRef} position={[0.35, 0.05, 0]}>
      <group ref={outerRef}>
        {geos.outerGeo   && <mesh geometry={geos.outerGeo}   material={mats.outer}   />}
      </group>
      <group ref={bracingRef}>
        {geos.bracingGeo && <mesh geometry={geos.bracingGeo} material={mats.bracing} />}
      </group>
      <group ref={purlinRef}>
        {geos.purlinGeo  && <mesh geometry={geos.purlinGeo}  material={mats.purlin}  />}
      </group>
      {/* Cantilever pivots at column D top [1.5, 1.0, 0] */}
      <group ref={cantRef} position={[1.5, 1.0, 0]}>
        <group position={[-1.5, -1.0, 0]}>
          {geos.cantGeo && <mesh geometry={geos.cantGeo} material={mats.cant} />}
        </group>
      </group>
      <group ref={roofRef}>
        {geos.roofGeo    && <mesh geometry={geos.roofGeo}    material={mats.roof}    />}
      </group>
      {geos.jointGeo     && <mesh geometry={geos.jointGeo}   material={mats.joint}   />}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSculpture() {
  const { scrollProgress } = useScrollSystem();

  const mouseRef  = useRef({ x: 0, y: 0 });
  const hoverRef  = useRef(false);
  const scrollRef = useRef(0);
  scrollRef.current = scrollProgress;

  React.useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
      hoverRef.current = e.clientY < window.innerHeight;
    };
    const onLeave = () => { hoverRef.current = false; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0.1, 4.6], fov: 44 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <CanvasContextDisposer />
        <color attach="background" args={['#F5F5F3']} />
        <StudioLights hoverRef={hoverRef} />
        <ArchitecturalSculpture mouseRef={mouseRef} hoverRef={hoverRef} scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
