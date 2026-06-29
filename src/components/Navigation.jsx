import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { label: 'Projects', href: '#projects', section: 'projects' },
  { label: 'Services', href: '#services', section: 'services' },
  { label: 'Process',  href: '#process',  section: 'process'  },
  { label: 'Studio',   href: '#studio',   section: 'studio'   },
]

export default function Navigation() {
  const navRef         = useRef(null)
  const progressRef    = useRef(null)
  const [scrollY,      setScrollY]      = useState(0)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrollPct,    setScrollPct]    = useState(0)

  // States derived from scrollY
  const isScrolled = scrollY > 55
  const isCompact  = scrollY > 280

  // Nav entrance — delayed behind hero loader
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 1.5 }
      )
    })
    return () => ctx.revert()
  }, [])

  // Scroll tracking + progress calculation
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrollY(y)

      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? (y / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Section-aware active state via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.35 }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Derived nav styles
  const bgColor    = isScrolled ? 'rgba(248,246,241,0.96)' : 'transparent'
  const border     = isScrolled ? '1px solid rgba(221,216,204,0.8)' : '1px solid rgba(248,246,241,0.06)'
  const blur       = isScrolled ? 'blur(18px) saturate(1.4)' : 'none'
  const logoColor  = isScrolled ? 'var(--color-charcoal)' : 'var(--color-warm-white)'
  const linkColor  = isScrolled ? 'var(--color-stone-500)' : 'rgba(248,246,241,0.62)'
  const activeColor = isScrolled ? 'var(--color-charcoal)' : 'var(--color-warm-white)'

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          opacity: 0,
          backgroundColor: bgColor,
          backdropFilter: blur,
          WebkitBackdropFilter: blur,
          borderBottom: border,
          transition: 'background-color 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease',
          willChange: 'background-color',
        }}
      >
        <div className="container-xl">
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: isCompact ? '52px' : '72px',
              transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Logo */}
            <a
              href="/"
              style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, textDecoration: 'none' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: isScrolled ? 'var(--color-bronze)' : 'rgba(196,154,108,0.65)',
                  maxHeight: isCompact ? '0px' : '14px',
                  overflow: 'hidden',
                  opacity: isCompact ? 0 : 1,
                  transition: 'max-height 0.4s ease, opacity 0.3s ease',
                }}
              >
                Est. 2014
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: isCompact ? '1.1rem' : '1.35rem',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                  color: logoColor,
                  transition: 'color 0.4s ease, font-size 0.4s ease',
                }}
              >
                Rightcon
              </span>
            </a>

            {/* Desktop links */}
            <ul
              style={{
                display: 'none',
                gap: '36px',
                alignItems: 'center',
                listStyle: 'none',
              }}
              className="nav-links"
            >
              {LINKS.map(link => {
                const isActive = activeSection === link.section
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        color: isActive ? activeColor : linkColor,
                        transition: 'color 0.3s ease',
                        position: 'relative',
                        paddingBottom: '2px',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = activeColor}
                      onMouseLeave={e => e.currentTarget.style.color = isActive ? activeColor : linkColor}
                    >
                      {link.label}
                      {/* Active indicator dot */}
                      {isActive && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '-6px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '3px',
                            height: '3px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-bronze)',
                          }}
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* CTA + hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a
                href="#contact"
                className="btn btn-primary nav-cta"
                style={{
                  padding: isCompact ? '9px 20px' : '12px 24px',
                  fontSize: '0.625rem',
                  backgroundColor: isScrolled ? 'var(--color-charcoal)' : 'rgba(248,246,241,0.1)',
                  border: isScrolled ? 'none' : '1px solid rgba(248,246,241,0.22)',
                  backdropFilter: isScrolled ? 'none' : 'blur(8px)',
                  transition: 'background-color 0.4s ease, padding 0.4s ease, border 0.4s ease',
                }}
              >
                <span>Start a Project</span>
              </a>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(v => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
                className="hamburger"
              >
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    style={{
                      display: 'block',
                      height: '1px',
                      width: i === 1 ? '15px' : '22px',
                      backgroundColor: isScrolled ? 'var(--color-charcoal)' : 'var(--color-warm-white)',
                      transformOrigin: 'center',
                      transition: 'transform 0.35s ease, opacity 0.25s ease, width 0.3s ease',
                      transform: menuOpen
                        ? i === 0 ? 'rotate(45deg) translate(4px, 5px)'
                          : i === 2 ? 'rotate(-45deg) translate(4px, -5px)'
                          : 'scale(0)'
                        : 'none',
                      opacity: (menuOpen && i === 1) ? 0 : 1,
                    }}
                  />
                ))}
              </button>
            </div>
          </nav>
        </div>

        {/* Progress bar (State 2+) */}
        {isScrolled && (
          <div
            ref={progressRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '1px',
              width: `${scrollPct}%`,
              backgroundColor: 'var(--color-bronze)',
              opacity: 0.55,
              transition: 'width 0.1s linear',
            }}
          />
        )}
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="nav-mobile"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 45,
              backgroundColor: 'var(--color-charcoal)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(1.5rem, 5vw, 5rem)',
              paddingTop: '120px',
              paddingBottom: '48px',
            }}
          >
            {/* Grain texture on mobile menu */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '220px 220px',
                mixBlendMode: 'overlay',
                opacity: 0.7,
              }}
            />

            <ul style={{ listStyle: 'none' }}>
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2rem, 5vw, 3rem)',
                      fontWeight: 300,
                      letterSpacing: '-0.015em',
                      color: 'var(--color-warm-white)',
                      textDecoration: 'none',
                      display: 'block',
                      paddingBlock: '12px',
                      borderBottom: '1px solid rgba(248,246,241,0.06)',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-bronze-light)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-warm-white)'}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start' }}
              >
                <span>Start a Project</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span className="label-sm" style={{ color: 'var(--color-stone-600)' }}>
                  Bangalore · Mysuru
                </span>
                <span style={{ width: '1px', height: '14px', backgroundColor: 'var(--color-stone-700)' }} />
                <span className="label-sm" style={{ color: 'var(--color-stone-600)' }}>
                  +91 98451 XXXXX
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS for nav desktop links */}
      <style>{`
        @media (min-width: 768px) {
          .nav-links { display: flex !important; }
          .hamburger { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-cta { display: none !important; }
        }
      `}</style>
    </>
  )
}
