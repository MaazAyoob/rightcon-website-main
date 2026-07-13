import React, { useEffect, useRef, useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import { optimizeUnsplashUrl } from '../../utils/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    name: "Foundation",
    tag: "GEOMECHANICAL RAFT",
    desc: "A 900mm double-layer moisture raft slab isolated by high-density elastomer barriers is anchored directly in bedrock.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&auto=format&fit=crop&q=80"
  },
  {
    name: "Structure",
    tag: "ZERO-TOLERANCE PILLARS",
    desc: "Primary column matrices are cast in high-density aggregate M40 concrete using customized resin moulds to ensure seamless vertical alignment.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&auto=format&fit=crop&q=80"
  },
  {
    name: "Brickwork",
    tag: "THERMAL BLOCK CAVITIES",
    desc: "Dual-layer clay blocks are woven into exposed concrete margins to insulate the internal micro-climate naturally.",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1000&auto=format&fit=crop&q=80"
  },
  {
    name: "MEP Installation",
    tag: "CONDUIT COORDINATION",
    desc: "Plumbing lines, mechanical ducts, and fire suppression systems are integrated into structural slab overlays using LOD 400 coordination overlays.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1000&auto=format&fit=crop&q=80"
  },
  {
    name: "Finishing",
    tag: "CRAFTSMAN DETAIL",
    desc: "Natural Travertine stone blocks are hand-cut and joined flush against kiln-dried Burma teak planks with zero trim lines.",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1000&auto=format&fit=crop&q=80"
  },
  {
    name: "Completed Home",
    tag: "LOD 400 COMPLETED LANDMARK",
    desc: "The residential monolith stands complete. Verified against virtual clash twins and ready for generational handover.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80"
  }
];

// ── Mobile Vertical Timeline Card ───────────────────────────────────────────
function TimelineCard({ stage, idx, total }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="timeline-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${idx * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${idx * 0.08}s`
      }}
    >
      {/* Step Number Badge */}
      <div className="timeline-card-number">
        {String(idx + 1).padStart(2, '0')}
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-3 border border-charcoal/8 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Full-width Image */}
        <div className="w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img
            src={optimizeUnsplashUrl(stage.image, 600, 75)}
            alt={stage.name}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
        </div>

        {/* Text Content */}
        <div className="px-4 pb-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[8px] font-bold text-accent uppercase tracking-widest">
              STAGE 0{idx + 1} // {stage.tag}
            </span>
          </div>
          <h3 className="font-display text-xl font-light text-charcoal tracking-tight leading-tight">
            {stage.name}
          </h3>
          <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
            {stage.desc}
          </p>
          {/* Progress indicator */}
          <div className="mt-1 flex items-center gap-2">
            <div className="h-[1px] flex-1 bg-charcoal/8">
              <div
                className="h-full bg-gradient-to-r from-accent to-primary transition-none"
                style={{ width: `${((idx + 1) / total) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[8px] text-charcoal/30 flex-shrink-0">
              {idx + 1}/{total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tablet: Alternating left-right timeline ──────────────────────────────────
function TabletTimelineCard({ stage, idx, total }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const isLeft = idx % 2 === 0;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex gap-6 items-start ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(32px) translateX(${isLeft ? '-' : ''}16px)`,
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${idx * 0.06}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${idx * 0.06}s`
      }}
    >
      {/* Card */}
      <div className="flex-1 border border-charcoal/10 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden group">
        <div className="overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <img
            src={optimizeUnsplashUrl(stage.image, 800, 80)}
            alt={stage.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ objectPosition: 'center 35%' }}
          />
        </div>
        <div className="p-5 flex flex-col gap-2">
          <span className="font-mono text-[8px] font-bold text-accent uppercase tracking-widest">
            {stage.tag}
          </span>
          <h3 className="font-display text-2xl font-light text-charcoal tracking-tight">
            {stage.name}
          </h3>
          <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
            {stage.desc}
          </p>
        </div>
      </div>

      {/* Center step badge */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0 pt-4">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-mono text-xs font-bold shadow-[0_0_0_4px_rgba(0,0,170,0.12)]">
          {String(idx + 1).padStart(2, '0')}
        </div>
        {idx < total - 1 && (
          <div className="w-[1px] flex-1 bg-gradient-to-b from-primary/40 to-transparent min-h-[60px]" />
        )}
      </div>
    </div>
  );
}

// ── Desktop: Pinned Horizontal Scroll (original) ─────────────────────────────
function DesktopProcessScene() {
  const triggerRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { setMascotPose } = useScrollSystem();

  useEffect(() => {
    const pin = ScrollTrigger.create({
      trigger: triggerRef.current,
      pin: true,
      start: "top top",
      end: "+=2000",
      onUpdate: (self) => {
        const prog = self.progress;
        const step = Math.min(Math.floor(prog * STAGES.length), STAGES.length - 1);
        setCurrentStep(step);
        if (self.isActive) {
          setMascotPose('process');
        }
      }
    });

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative z-10 select-none">
      <section className="h-screen w-full flex items-center px-10 xl:px-16 overflow-hidden border-t border-charcoal/5 bg-white theme-light subpixel-text">
        <div className="absolute inset-0 architectural-grid opacity-[0.06] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Left: Image */}
          <div className="col-span-7 flex flex-col justify-center">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-accent z-20 pointer-events-none"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary z-20 pointer-events-none"></div>
              
              <div className="w-full overflow-hidden border border-charcoal/10 relative shadow-[0_32px_80px_rgba(0,0,0,0.07)] bg-white" style={{ aspectRatio: '16/10' }}>
                {STAGES.map((stage, idx) => (
                  <img 
                    key={idx}
                    src={optimizeUnsplashUrl(stage.image, 1200, 85)}
                    alt={stage.name}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                      idx === currentStep ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-[1.02]'
                    }`}
                    style={{ objectPosition: 'center 35%' }}
                  />
                ))}
                <div className="absolute top-4 right-4 z-20 bg-white/95 border border-charcoal/10 px-3 py-1.5 font-mono text-[8px] text-charcoal/50 shadow-sm">
                  STAGE {String(currentStep + 1).padStart(2,'0')} / {String(STAGES.length).padStart(2,'0')}
                </div>
              </div>
            </div>

            {/* Step progress dots */}
            <div className="flex gap-2 mt-5 items-center">
              {STAGES.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-[2px] transition-all duration-500 rounded-full ${
                    i === currentStep 
                      ? 'w-10 bg-accent' 
                      : (i < currentStep ? 'w-4 bg-accent/40' : 'w-2 bg-charcoal/10')
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Step details */}
          <div className="col-span-5 pl-6 flex flex-col justify-center gap-6">
            
            <div className="flex flex-col gap-2">
              <span className="h-label-mono text-accent">(04 // CONSTRUCTION JOURNEY)</span>
              <div className="w-full h-[2px] bg-charcoal/5 relative mt-1 overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / STAGES.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 min-h-[200px] justify-center">
              <div className="font-mono text-[9px] font-bold text-charcoal/30 uppercase tracking-widest">
                STAGE 0{currentStep + 1} // {STAGES[currentStep].tag}
              </div>
              <h3 className="font-display text-4xl font-light text-charcoal tracking-wide leading-none">
                {STAGES[currentStep].name}
              </h3>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed font-light">
                {STAGES[currentStep].desc}
              </p>
            </div>

            {/* Stages list */}
            <div className="flex flex-col gap-2 border-t border-charcoal/5 pt-4">
              {STAGES.map((stage, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-3 py-1 transition-all duration-300 ${
                    i === currentStep ? 'opacity-100' : 'opacity-25'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${
                    i < currentStep ? 'bg-accent' : i === currentStep ? 'bg-primary' : 'bg-charcoal/20'
                  }`} />
                  <span className={`font-mono text-[8.5px] uppercase tracking-wider ${
                    i === currentStep ? 'text-charcoal font-bold' : 'text-charcoal/40'
                  }`}>{stage.name}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-charcoal/5 pt-4 flex justify-between items-center">
              <span className="h-caption font-mono text-[7px] text-charcoal/30">
                LOD_400_COORD: STG_0{currentStep + 1}_LOG_CHECK // PASS
              </span>
              <div className="mascot-observation-point">
                <span className="mascot-observation-dot"></span>
                <span>Mascot Tracking Process</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────
export default function ProcessScene() {
  const { isMobile, isTablet } = useScrollSystem();

  // ── Mobile: Premium Vertical Timeline ──
  if (isMobile) {
    return (
      <section className="relative z-10 select-none border-t border-charcoal/5 bg-white theme-light overflow-x-hidden"
        style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', paddingLeft: 'var(--section-px)', paddingRight: 'var(--section-px)' }}
      >
        <div className="absolute inset-0 architectural-grid opacity-[0.04] pointer-events-none"></div>

        <div className="relative z-10">
          {/* Section Header */}
          <div className="flex flex-col gap-3 mb-10">
            <span className="h-label-mono text-accent">(04 // CONSTRUCTION JOURNEY)</span>
            <h2 className="h-section-title text-charcoal">Construction<br /><span className="text-accent italic">Timeline.</span></h2>
            <p className="font-sans text-sm text-charcoal/55 leading-relaxed font-light max-w-xs">
              Six precision phases from bedrock to handover. Every stage documented and verified.
            </p>
          </div>

          {/* Sticky step indicator */}
          <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-sm border border-charcoal/8 px-4 py-2.5 mb-6 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0"></div>
            <span className="font-mono text-[10px] text-charcoal/70 uppercase tracking-wider">
              Construction Sequence Log
            </span>
            <span className="font-mono text-[10px] text-primary font-bold ml-auto">
              {STAGES.length} Stages
            </span>
          </div>

          {/* Vertical Timeline Cards */}
          <div className="timeline-vertical">
            {STAGES.map((stage, idx) => (
              <TimelineCard key={idx} stage={stage} idx={idx} total={STAGES.length} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Tablet: Alternating timeline ──
  if (isTablet) {
    return (
      <section className="relative z-10 select-none border-t border-charcoal/5 bg-white theme-light overflow-x-hidden"
        style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', paddingLeft: 'var(--section-px)', paddingRight: 'var(--section-px)' }}
      >
        <div className="absolute inset-0 architectural-grid opacity-[0.04] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="flex flex-col gap-3 mb-14 text-center">
            <span className="h-label-mono text-accent">(04 // CONSTRUCTION JOURNEY)</span>
            <h2 className="h-section-title text-charcoal">Construction<br /><span className="text-accent italic">Timeline.</span></h2>
          </div>

          {/* Alternating Cards */}
          <div className="flex flex-col gap-10">
            {STAGES.map((stage, idx) => (
              <TabletTimelineCard key={idx} stage={stage} idx={idx} total={STAGES.length} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop: Original pinned horizontal scroll ──
  return <DesktopProcessScene />;
}
