import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Premium architectural images
const IMG = {
  hero:  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2560&q=92&auto=format&fit=crop',
  inset: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=88&auto=format&fit=crop',
}

export default function Hero() {
  const sectionRef  = useRef(null)
  const loaderRef   = useRef(null)
  const imageRef    = useRef(null)
  const gradientRef = useRef(null)
  const gridRef     = useRef(null)
  const metaRef     = useRef(null)
  const eyebrowRef  = useRef(null)
  const line1Ref    = useRef(null)
  const line2Ref    = useRef(null)
  const line3Ref    = useRef(null)
  const subRef      = useRef(null)
  const ctaRef      = useRef(null)
  const insetRef    = useRef(null)
  const scrollRef   = useRef(null)
  const leftRef     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Master timeline — slow, deliberate ─────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Stage 1: Loader curtain peels open (1.3s)
      tl.to(loaderRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.3,
        ease: 'power3.inOut',
        delay: 0.25,
      })

      // Stage 2: Image wipes up from bottom while de-scaling (1.8s)
      tl.fromTo(imageRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.12 },
        { clipPath: 'inset(0% 0% 0% 0%)',   scale: 1.0, duration: 1.8 },
        '-=0.65'
      )

      // Stage 3: Gradient atmosphere fills in
      tl.fromTo(gradientRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4 },
        '-=1.5'
      )

      // Stage 4: Grid materialises
      tl.fromTo(gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.0 },
        '-=0.8'
      )

      // Stage 5: Top metadata (coordinates)
      tl.fromTo(metaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.85 },
        '-=0.4'
      )

      // Stage 6: Eyebrow rule + label
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.85 },
        '-=0.4'
      )

      // Stage 7: Headline lines — masked, slow stagger
      tl.fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { yPercent: 108, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.20 },
        '-=0.35'
      )

      // Stage 8: Sub-copy — pause before appearing (tension)
      tl.fromTo(subRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1.0 },
        '+=0.2'
      )

      // Stage 9: CTAs — intentionally last
      tl.fromTo(Array.from(ctaRef.current.children),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.14 },
        '-=0.4'
      )

      // Stage 10: Inset card (after everything — depth reveal)
      tl.fromTo(insetRef.current,
        { opacity: 0, y: 32, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
        '-=0.9'
      )

      // Stage 11: Scroll indicator
      tl.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7 },
        '-=0.5'
      )

      // Scroll dot loop — starts after entire sequence
      gsap.to('.hero-dot', {
        y: 18,
        duration: 1.9,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: tl.totalDuration() + 0.4,
      })

      // ── Scroll choreography ─────────────────────────────────────────────
      const section = sectionRef.current

      // Background: slow scale simulates camera drift
      gsap.to(imageRef.current, {
        scale: 1.07,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 2.0,
        },
      })

      // Left text panel: lifts and dissolves
      gsap.to(leftRef.current, {
        y: -70,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '40% top',
          end: 'bottom top',
          scrub: 0.9,
        },
      })

      // Inset card: different Y rate — depth separation
      gsap.to(insetRef.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
      }}
    >

      {/* ─ Layer 0: Loader curtain ──────────────────────────────────────── */}
      <div
        ref={loaderRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 60,
          backgroundColor: 'var(--color-charcoal)',
          transformOrigin: 'top center',
        }}
      />

      {/* ─ Layer 1: Background image ────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          ref={imageRef}
          src={IMG.hero}
          alt="Luxury villa by Rightcon Design and Build, Bangalore"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            clipPath: 'inset(0% 0% 100% 0%)',
            transform: 'scale(1.12)',
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
          loading="eager"
          decoding="async"
          // @ts-ignore
          fetchpriority="high"
        />
      </div>

      {/* ─ Layer 2: Asymmetric gradient — heavy left, soft top/bottom ───── */}
      <div
        ref={gradientRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0,
          background: [
            'linear-gradient(to right, rgba(18,16,12,0.92) 0%, rgba(18,16,12,0.65) 38%, rgba(18,16,12,0.22) 62%, rgba(18,16,12,0.0) 80%)',
            'linear-gradient(to top, rgba(18,16,12,0.75) 0%, rgba(18,16,12,0.0) 42%)',
            'linear-gradient(to bottom, rgba(18,16,12,0.45) 0%, transparent 28%)',
          ].join(', '),
        }}
      />

      {/* ─ Layer 3: Film grain ──────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 5,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '220px 220px',
          mixBlendMode: 'overlay',
          opacity: 0.65,
        }}
      />

      {/* ─ Layer 4: Radial vignette ─────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 5,
          background: 'radial-gradient(ellipse at 65% 50%, transparent 30%, rgba(8,6,4,0.58) 100%)',
        }}
      />

      {/* ─ Layer 5: Subtle grid ─────────────────────────────────────────── */}
      <div
        ref={gridRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 6,
          opacity: 0,
          backgroundImage: [
            'linear-gradient(rgba(248,246,241,0.025) 1px, transparent 1px)',
            'linear-gradient(to right, rgba(248,246,241,0.025) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '88px 88px',
        }}
      />

      {/* ─ Layer 6: Content ────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
          paddingTop: '72px',
        }}
      >

        {/* Top metadata bar */}
        <div
          ref={metaRef}
          style={{
            paddingTop: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span className="label-sm" style={{ color: 'rgba(196,154,108,0.6)' }}>
              12°58′N · 77°35′E
            </span>
            <span style={{ display: 'block', width: '32px', height: '1px', backgroundColor: 'rgba(248,246,241,0.12)' }} />
            <span className="label-sm" style={{ color: 'rgba(248,246,241,0.25)' }}>
              Bangalore · Mysuru
            </span>
          </div>
          <span className="label-sm" style={{ color: 'rgba(248,246,241,0.2)' }}>
            RC — 2026
          </span>
        </div>

        {/* Main editorial block — anchored bottom-left */}
        <div
          ref={leftRef}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: 'clamp(5rem, 9vh, 8rem)',
            maxWidth: 'min(680px, 55%)',
          }}
        >

          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '28px',
              opacity: 0,
            }}
          >
            <div style={{ width: '28px', height: '1px', backgroundColor: 'var(--color-bronze)', flexShrink: 0 }} />
            <span className="label-md" style={{ color: 'var(--color-bronze-light)' }}>
              Design + Build · Residential Engineering
            </span>
          </div>

          {/* Headline — three masked lines */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.4rem, 8vw, 8.5rem)',
              fontWeight: 300,
              lineHeight: 0.94,
              letterSpacing: '-0.022em',
              color: 'var(--color-warm-white)',
              marginBottom: '36px',
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span
                ref={line1Ref}
                style={{ display: 'block', transform: 'translateY(108%)', opacity: 0 }}
              >
                Designed
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <em
                ref={line2Ref}
                style={{
                  display: 'block',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  transform: 'translateY(108%)',
                  opacity: 0,
                  color: 'var(--color-stone-300)',
                }}
              >
                with intent.
              </em>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span
                ref={line3Ref}
                style={{ display: 'block', transform: 'translateY(108%)', opacity: 0 }}
              >
                Built to endure.
              </span>
            </span>
          </h1>

          {/* Sub-copy — restrained, precision language */}
          <p
            ref={subRef}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.94rem, 1.1vw, 1.1rem)',
              fontWeight: 300,
              lineHeight: 1.68,
              color: 'rgba(248,246,241,0.58)',
              maxWidth: '40ch',
              marginBottom: '44px',
              opacity: 0,
            }}
          >
            Premium Design + Build from soil audit to final handover.
            Every structure engineered. Every material verified.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}
          >
            <a href="#contact" className="btn btn-primary" style={{ opacity: 0 }}>
              <span>Begin Your Project</span>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#projects" className="btn btn-ghost" style={{ opacity: 0 }}>
              View Our Work
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(248,246,241,0.08)',
            paddingBlock: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span className="label-sm" style={{ color: 'rgba(248,246,241,0.2)' }}>
            RERA Registered · IS 456:2000 · ISO 9001 Aligned
          </span>
          <div
            ref={scrollRef}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0 }}
          >
            <span className="label-sm" style={{ color: 'rgba(248,246,241,0.28)' }}>Scroll</span>
            <div
              style={{
                width: '1px',
                height: '48px',
                backgroundColor: 'rgba(248,246,241,0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                className="hero-dot"
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '1px',
                  height: '40%',
                  backgroundColor: 'var(--color-bronze)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─ Layer 7: Floating inset card (right side, different parallax) ─ */}
      <div
        ref={insetRef}
        style={{
          position: 'absolute',
          right: 'clamp(1.5rem, 5vw, 5rem)',
          bottom: '18vh',
          width: 'clamp(160px, 16vw, 260px)',
          zIndex: 28,
          opacity: 0,
        }}
        className="hero-inset-card"
      >
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: '3 / 4',
          }}
        >
          <img
            src={IMG.inset}
            alt="Architectural concrete detail — Rightcon"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            loading="eager"
            decoding="async"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(18,16,12,0.88) 0%, transparent 58%)',
            }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 14px' }}>
            <p className="label-sm" style={{ color: 'rgba(196,154,108,0.85)' }}>
              Koramangala Residence
            </p>
            <p className="label-sm" style={{ marginTop: '4px', color: 'rgba(248,246,241,0.32)' }}>
              4,200 sq.ft · Bangalore · 2024
            </p>
          </div>
        </div>
        {/* Corner marks */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '20px', height: '20px',
            borderTop: '1px solid var(--color-bronze)',
            borderLeft: '1px solid var(--color-bronze)',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: 0, right: 0,
            width: '20px', height: '20px',
            borderBottom: '1px solid rgba(248,246,241,0.18)',
            borderRight: '1px solid rgba(248,246,241,0.18)',
          }}
        />
      </div>

      {/* ─ Layer 8: Hero → next section overlap bleed ─────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '18vh',
          zIndex: 35,
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent 0%, var(--color-warm-white) 100%)',
        }}
      />

    </section>
  )
}
