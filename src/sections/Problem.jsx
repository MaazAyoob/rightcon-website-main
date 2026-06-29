import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROBLEMS = [
  {
    num: '01',
    traditional: {
      tag: 'Budget Overruns',
      headline: 'Costs spiral without warning.',
      body: 'Verbal estimates. Hidden charges. What begins at ₹80 lakh becomes ₹1.2 crore after the foundation is poured. By then, you have no exit.',
      footnote: 'Reported in over 68% of residential projects in Bangalore',
    },
    rightcon: {
      tag: 'Fixed-Price Contract',
      headline: 'One price. In writing. Before we begin.',
      body: 'Every BOQ line item is priced and signed before ground breaks. The number on page one is the number on the final invoice. No renegotiations mid-project.',
      footnote: 'Zero cost overruns across 200+ completed homes',
    },
  },
  {
    num: '02',
    traditional: {
      tag: 'Material Substitution',
      headline: 'You never know what went into your walls.',
      body: 'Grade-53 cement specified. Grade-43 delivered. Steel of unknown origin. No batch records. No verification. The difference is invisible — until it fails.',
      footnote: 'Found in 52% of resale property structural audits',
    },
    rightcon: {
      tag: 'Full Material Traceability',
      headline: 'Every bag of cement has a paper trail.',
      body: 'Certified suppliers only. Batch numbers recorded. Third-party lab tests at every pour. You receive a complete material report with your handover documents.',
      footnote: '100% material documentation, foundation to finish',
    },
  },
  {
    num: '03',
    traditional: {
      tag: 'Timeline Delays',
      headline: '"Six more months" becomes a familiar phrase.',
      body: 'No milestones in the contract. No accountability in the timeline. Your EMIs run while construction stalls. Delays of 12–18 months are considered normal.',
      footnote: 'Average residential delay in Bangalore: 14 months',
    },
    rightcon: {
      tag: 'Contractual Milestones',
      headline: 'We write the deadline into the contract.',
      body: 'Milestone-linked payment schedule. If we miss a deadline, you receive written compensation. We have not paid a single penalty in 12 years of practice.',
      footnote: '98% on-time project delivery — tracked and verified',
    },
  },
  {
    num: '04',
    traditional: {
      tag: 'Structural Shortcuts',
      headline: 'Design and structure are afterthoughts.',
      body: 'No soil test. Column sizes guessed from experience. Rebar reduced to cut cost. The home looks complete from the outside. The engineering is unknown.',
      footnote: 'Soil testing skipped in an estimated 80% of residential builds',
    },
    rightcon: {
      tag: 'Engineering Integrity',
      headline: 'Every column is load-calculated.',
      body: 'Mandatory soil audit before design. Structural drawings by licensed engineers. IS 456:2000 compliance verified at every stage. 10-year structural warranty in writing.',
      footnote: 'IS 456:2000 compliant · RERA registered · Independently verified',
    },
  },
]

export default function Problem() {
  const sectionRef  = useRef(null)
  const wrapRef     = useRef(null)
  const slideRefs   = useRef([])    // one ref per slide (wraps left+right together)
  const progressRef = useRef(null)
  const counterRef  = useRef(null)
  const dotRefs     = useRef([])

  useEffect(() => {
    // Wait a tick so DOM measurements are ready
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {

        // Entrance fade
        gsap.fromTo(wrapRef.current,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.8,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 88%' }
          }
        )

        // Initialise slides
        slideRefs.current.forEach((el, i) => {
          if (!el) return
          gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 50 })
        })

        // Pin + drive
        const totalScroll = window.innerHeight * (PROBLEMS.length + 0.8)

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 0.8,
          onUpdate(self) {
            const rawIndex = self.progress * PROBLEMS.length
            const index    = Math.min(Math.floor(rawIndex), PROBLEMS.length - 1)

            // Progress bar
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleY(${self.progress})`
            }

            // Counter
            if (counterRef.current) {
              counterRef.current.textContent = `0${index + 1} — 0${PROBLEMS.length}`
            }

            // Dots
            dotRefs.current.forEach((dot, i) => {
              if (!dot) return
              dot.style.backgroundColor = i === index
                ? 'var(--color-bronze)'
                : i < index
                  ? 'rgba(184,134,46,0.35)'
                  : 'rgba(248,246,241,0.14)'
              dot.style.transform = `scale(${i === index ? 1.5 : 1})`
            })

            // Slides
            slideRefs.current.forEach((el, i) => {
              if (!el) return
              const target = {
                opacity: i === index ? 1 : 0,
                y:       i < index ? -40 : i === index ? 0 : 50,
              }
              gsap.to(el, { ...target, duration: 0.4, overwrite: 'auto', ease: 'power3.out' })
            })
          },
        })

      }, sectionRef)

      return () => ctx.revert()
    })

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="problem"
      style={{
        backgroundColor: 'var(--color-charcoal)',
        height: '100vh',
        minHeight: '680px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '220px 220px', mixBlendMode: 'overlay', opacity: 0.5,
      }} />

      <div ref={wrapRef} style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, opacity: 0 }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'clamp(1.5rem, 5vw, 5rem)',
          paddingTop: '88px', paddingBottom: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '24px', height: '1px', backgroundColor: 'var(--color-bronze)' }} />
            <span className="label-md" style={{ color: 'var(--color-stone-600)' }}>
              Why most homes disappoint
            </span>
          </div>
          <span ref={counterRef} className="label-md"
            style={{ color: 'rgba(248,246,241,0.22)', fontVariantNumeric: 'tabular-nums' }}>
            01 — 04
          </span>
        </div>

        {/* Slides */}
        <div style={{ flex: 1, position: 'relative', padding: 'clamp(1.5rem, 5vw, 5rem)', paddingTop: 0 }}>
          {PROBLEMS.map((p, i) => (
            <div
              key={p.num}
              ref={el => slideRefs.current[i] = el}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                inset: i === 0 ? 'auto' : 0,
                display: 'grid',
                gridTemplateColumns: '1fr 1px 1fr',
                gap: 0,
                height: '100%',
                alignItems: 'center',
                opacity: i === 0 ? 1 : 0,
                paddingTop: 'clamp(2rem, 5vh, 5rem)',
              }}
            >
              {/* Left — problem */}
              <div style={{ paddingRight: 'clamp(1.5rem, 4vw, 5rem)' }}>
                {/* Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <span className="label-sm" style={{ color: 'rgba(248,246,241,0.2)' }}>{p.num}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.59rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'rgba(248,246,241,0.22)',
                    padding: '4px 10px', border: '1px solid rgba(248,246,241,0.08)',
                  }}>{p.traditional.tag}</span>
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.7rem, 3vw, 3rem)',
                  fontWeight: 300, lineHeight: 1.06,
                  letterSpacing: '-0.016em',
                  color: 'rgba(248,246,241,0.48)',
                  marginBottom: '18px', maxWidth: '28ch',
                }}>
                  {p.traditional.headline}
                </h2>

                <p style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 300,
                  fontSize: 'clamp(0.88rem, 0.95vw, 0.98rem)',
                  lineHeight: 1.74, color: 'rgba(248,246,241,0.28)',
                  maxWidth: '44ch', marginBottom: '20px',
                }}>
                  {p.traditional.body}
                </p>

                <p className="label-sm" style={{ color: 'rgba(248,246,241,0.16)' }}>
                  ↗ {p.traditional.footnote}
                </p>
              </div>

              {/* Center divider */}
              <div style={{ position: 'relative', height: '60%', alignSelf: 'center', backgroundColor: 'rgba(248,246,241,0.06)' }}>
                <div ref={i === 0 ? progressRef : null} style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  backgroundColor: 'var(--color-bronze)',
                  transformOrigin: 'top center',
                  transform: 'scaleY(0)', opacity: 0.45,
                }} />
              </div>

              {/* Right — solution */}
              <div style={{ paddingLeft: 'clamp(1.5rem, 4vw, 5rem)' }}>
                {/* Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <span className="label-sm" style={{ color: 'rgba(196,154,108,0.45)' }}>{p.num}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.59rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--color-bronze)',
                    padding: '4px 10px', border: '1px solid rgba(184,134,46,0.3)',
                  }}>{p.rightcon.tag}</span>
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.7rem, 3vw, 3rem)',
                  fontWeight: 300, lineHeight: 1.06,
                  letterSpacing: '-0.016em',
                  color: 'var(--color-warm-white)',
                  marginBottom: '18px', maxWidth: '28ch',
                }}>
                  {p.rightcon.headline}
                </h2>

                <p style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 300,
                  fontSize: 'clamp(0.88rem, 0.95vw, 0.98rem)',
                  lineHeight: 1.74, color: 'rgba(248,246,241,0.62)',
                  maxWidth: '44ch', marginBottom: '20px',
                }}>
                  {p.rightcon.body}
                </p>

                <p className="label-sm" style={{ color: 'var(--color-bronze-light)', opacity: 0.65 }}>
                  ✓ {p.rightcon.footnote}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar: dots + hint */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'clamp(1.5rem, 5vw, 5rem)',
          paddingTop: 0, paddingBottom: 'clamp(1.5rem, 3.5vh, 2.5rem)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {PROBLEMS.map((_, i) => (
              <div
                key={i}
                ref={el => dotRefs.current[i] = el}
                style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  backgroundColor: i === 0 ? 'var(--color-bronze)' : 'rgba(248,246,241,0.14)',
                  transition: 'background-color 0.35s ease, transform 0.3s ease',
                }}
              />
            ))}
          </div>
          <span className="label-sm" style={{ color: 'rgba(248,246,241,0.16)' }}>
            Scroll to advance
          </span>
        </div>
      </div>

      {/* Bleed into next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '12vh', zIndex: 10, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, transparent, var(--color-warm-white))',
      }} />
    </section>
  )
}
