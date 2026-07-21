/**
 * BrandSignature — Architectural underline for the tagline.
 *
 * Sits in normal document flow directly below "BUILDING PEACE OF MIND".
 * Acts as an elegant underline that rises into one subtle roof peak at center.
 * 200px wide. 12px tall viewBox. No glow, no shadow, no absolute positioning.
 *
 * Path anatomy:
 *   M 0 10  → start at baseline left
 *   H 75    → flat left segment
 *   L 100 2 → rise to peak (center)
 *   L 125 10→ return to baseline
 *   H 200   → flat right segment
 *
 * Total path length ≈ 202px → stroke-dasharray matches in CSS.
 */
export default function BrandSignature() {
  return (
    <svg
      aria-hidden="true"
      width="200"
      height="12"
      viewBox="0 0 200 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <path
        d="M 0 10 H 75 L 100 2 L 125 10 H 200"
        stroke="#C9A227"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="brand-sig-line"
      />
    </svg>
  );
}

