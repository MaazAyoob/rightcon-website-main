import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// ─────────────────────────────────────────────────────────────────────────────
// Geometry primitives — shared across all V17 sculptures
// ─────────────────────────────────────────────────────────────────────────────

/**
 * makeBeam — creates a BoxGeometry beam between two 3D points.
 * @param {number} w — cross-section width/depth (square)
 */
export function makeBeam(ax, ay, az, bx, by, bz, w = 0.030) {
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

/**
 * makeBox — axis-aligned box placed at a position.
 */
export function makeBox(x, y, z, w, h, d) {
  const geo = new THREE.BoxGeometry(w, h, d);
  geo.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
  return geo;
}

/**
 * makeJoint — small cubic node at a position.
 */
export function makeJoint(x, y, z, s = 0.052) {
  const geo = new THREE.BoxGeometry(s, s, s);
  geo.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
  return geo;
}

/**
 * makeArcBeams — creates N beam segments approximating an arc (ring segment).
 * @param {number} cx,cy,cz — centre
 * @param {number} rx,ry — ellipse radii
 * @param {number} tilt — tilt of the arc plane (rotation X, radians)
 * @param {number} N — number of segments
 * @param {number} w — beam width
 */
export function makeArcBeams(cx, cy, cz, rx, ry, tilt, N = 16, w = 0.025) {
  const geos = [];
  for (let i = 0; i < N; i++) {
    const a0 = (i / N) * Math.PI * 2;
    const a1 = ((i + 1) / N) * Math.PI * 2;
    const x0 = cx + rx * Math.cos(a0);
    const y0 = cy + ry * Math.sin(a0) * Math.cos(tilt);
    const z0 = cz + ry * Math.sin(a0) * Math.sin(tilt);
    const x1 = cx + rx * Math.cos(a1);
    const y1 = cy + ry * Math.sin(a1) * Math.cos(tilt);
    const z1 = cz + ry * Math.sin(a1) * Math.sin(tilt);
    const g = makeBeam(x0, y0, z0, x1, y1, z1, w);
    if (g) geos.push(g);
  }
  return geos;
}

/**
 * mergeParts — merges an array of BufferGeometries into one draw call.
 * Returns null if array is empty.
 */
export function mergeParts(arr) {
  const valid = arr.filter(Boolean);
  if (valid.length === 0) return null;
  return mergeGeometries(valid);
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared PBR material factory — V17 material palette
// Base: #C9CDD2 (brushed aluminium / satin metallic)
// ─────────────────────────────────────────────────────────────────────────────

export const MAT_COLORS = {
  primary:   '#C9CDD2',   // primary structural members
  secondary: '#B4B8BF',   // secondary members / bracing
  depth:     '#A0A4AB',   // depth / receding elements
  accent:    '#D8DCE2',   // accent / forward elements
  joint:     '#E2E6EC',   // precision joint nodes — lightest, highest spec
  dark:      '#8E9298',   // dark contrast members
};

/**
 * makeMat — creates a MeshStandardMaterial with V17 palette
 * @param {'primary'|'secondary'|'depth'|'accent'|'joint'|'dark'} role
 * @param {object} overrides — any THREE.MeshStandardMaterial props
 */
export function makeMat(role = 'primary', overrides = {}) {
  const defaults = {
    primary:   { metalness: 0.93, roughness: 0.22 },
    secondary: { metalness: 0.89, roughness: 0.34 },
    depth:     { metalness: 0.86, roughness: 0.40 },
    accent:    { metalness: 0.95, roughness: 0.14 },
    joint:     { metalness: 0.98, roughness: 0.08 },
    dark:      { metalness: 0.88, roughness: 0.30 },
  };
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(MAT_COLORS[role] || MAT_COLORS.primary),
    ...(defaults[role] || defaults.primary),
    ...overrides,
  });
}
