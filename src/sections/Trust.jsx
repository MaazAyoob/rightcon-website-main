import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { end: 200,  suffix: '+',  label: 'Homes Built',          note: 'Across Bangalore & Mysuru' },
  { end: 12,   suffix: '',   label: 'Years of Practice',     note: 'Est. 2014' },
  { end: 98,   suffix: '%',  label: 'On-Time Delivery',      note: 'Tracked across all projects' },
  { end: 500,  suffix: 'Cr', label: 'Construction Value',    note: 'Rupees · Cumulative' },
  { end: 10,   suffix: 'yr', label: 'Structural Warranty',   note: 'Industry-leading guarantee' },
]

const LOGOS = [
  { name: 'CREDAI',    full: 'Confederation of Real Estate Developers' },
  { name: 'BIS',       full: 'Bureau of Indian Standards' },
  { name: 'RERA',      full: 'Real Estate Regulatory Authority' },
  { name: 'ISO 9001',  full: 'Quality Management System' },
  { name: 'IGBC',      full: 'Indian Green Building Council' },
  { name: 'CIDC',      full: 'Construction Industry Development Council' },
]

export default function Trust() {
  const sectionRef  = useRef(null)
  const labelRef    = useRef(null)
  const lineRef     = useRef(null)
  const statsRef    = useRef(null)
  const logosRef    = useRef(null)
  const counterRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Section label ─────────────────────────────────────────────────
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        }
      )

      // ── Horizontal rule draws across ──────────────────────────────────
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.4, ease: 'power3.out', transformOrigin: 'left center',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      )

      // ── Stat cards stagger in ─────────────────────────────────────────
      gsap.fromTo(
        Array.from(statsRef.current.children),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
        }
      )

      // ── Counter animations — triggered individually ───────────────────
      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i]
        if (!el) return

        const proxy = { val: 0 }

        gsap.to(proxy, {
          val: stat.end,
          duration: 2.2,
          ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: statsRef.current, start: 'top 78%' },
          onUpdate: () => {
            const v = Math.round(proxy.val)
            el.textContent = stat.suffix === 'Cr'
              ? `₹${v}${stat.suffix}`
              : `${v}${stat.suffix}`
          },
        })
      })

      // ── Logo strip reveals staggered ──────────────────────────────────
      gsap.fromTo(
        Array.from(logosRef.current.children),
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: logosRef.current, start: 'top 85%' },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="trust"
      style={{
        backgroundColor: 'var(--color-warm-white)',
        paddingTop: '10rem',
        paddingBottom: '8rem',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container-xl">

        {/* Section label */}
        <div
          ref={labelRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '72px',
            opacity: 0,
          }}
        >
          <div
            style={{
              width: '28px',
              height: '1px',
              backgroundColor: 'var(--color-bronze)',
              flexShrink: 0,
            }}
          />
          <span className="label-md" style={{ color: 'var(--color-stone-500)' }}>
            Track Record · Since 2014
          </span>
        </div>

        {/* Stats grid */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                paddingLeft: i === 0 ? 0 : undefined,
                borderRight: i < STATS.length - 1 ? '1px solid var(--color-stone-200)' : 'none',
                opacity: 0,
              }}
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                  fontWeight: 300,
                  lineHeight: 1.0,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-charcoal)',
                  marginBottom: '12px',
                }}
              >
                <span ref={el => counterRefs.current[i] = el}>
                  {stat.suffix === 'Cr' ? `₹0${stat.suffix}` : `0${stat.suffix}`}
                </span>
              </div>

              {/* Label */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'var(--color-charcoal)',
                  marginBottom: '6px',
                  lineHeight: 1.3,
                }}
              >
                {stat.label}
              </p>

              {/* Note */}
              <p className="label-sm" style={{ color: 'var(--color-stone-400)' }}>
                {stat.note}
              </p>
            </div>
          ))}
        </div>

        {/* Horizontal divider line */}
        <div
          ref={lineRef}
          style={{
            height: '1px',
            backgroundColor: 'var(--color-stone-200)',
            marginTop: '64px',
            marginBottom: '56px',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />

        {/* Certifications + partners */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <span className="label-sm" style={{ color: 'var(--color-stone-400)', flexShrink: 0 }}>
            Certifications & Memberships
          </span>

          <ul
            ref={logosRef}
            style={{
              listStyle: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(20px, 4vw, 48px)',
              flexWrap: 'wrap',
            }}
          >
            {LOGOS.map(logo => (
              <li
                key={logo.name}
                title={logo.full}
                style={{ opacity: 0 }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--color-stone-400)',
                    transition: 'color 0.3s ease',
                    cursor: 'default',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-charcoal)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-stone-400)'}
                >
                  {logo.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
