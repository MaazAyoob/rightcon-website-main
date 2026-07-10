import React, { useState, useEffect, useRef } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';
import { BRAND_COLORS } from '../../config/colors';

const FAQS = [
  {
    q: "What structural grade parameters are applied to concrete?",
    a: "We use a minimum M30/M40 grade mix for all primary columns and slabs. Before pouring, we execute slump tests on-site. Sample cubes are cast and crushed at 7 and 28 days to verify compressive strength specifications against standard design limits."
  },
  {
    q: "Why are soil and geomechanical audits executed first?",
    a: "Bangalore East has high clay expansion zones while Bangalore North sits on shallow granite beds. We run Standard Penetration Tests (SPT) up to 8m to map actual soil load margins, completely eliminating foundation cracking and settling risks."
  },
  {
    q: "Can the 10-year structural warranty be transferred?",
    a: "Yes. Our structural warranty is tied directly to the property deed. If the residence is sold within the 10-year liability coverage period, the protection transfers to the new owner, preserving investment value."
  },
  {
    q: "How are project timelines and structural delays managed?",
    a: "Through LOD 400 BIM modeling, we resolve physical structural collisions and utility route overlays before ground-break. This reduces on-site alterations. Projects are audited weekly against critical path schedules to ensure on-time handover."
  }
];

export default function CtaScene() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const { 
    setMascotPose, 
    setFormFieldFocus, 
    setFormSuccess,
    formSuccess,
    setActiveInteraction
  } = useScrollSystem();
  
  const [status, setStatus] = useState('idle');
  const confettiCanvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormSuccess(true);
      setMascotPose('celebrating');
      triggerConfetti();
      setFormData({ name: '', email: '', phone: '' });
    }, 1200);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setMascotPose('typing');
  };

  const handleFocus = (field) => {
    setFormFieldFocus(field);
    setMascotPose('typing');
  };

  const handleBlur = () => {
    setFormFieldFocus(null);
    setMascotPose('idle');
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
    if (openFaqIndex !== idx) {
      setActiveInteraction({ type: 'faq' });
    } else {
      setActiveInteraction(null);
    }
  };

  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let particles = [];
    const colors = [BRAND_COLORS.primary, BRAND_COLORS.accent, BRAND_COLORS.charcoal, BRAND_COLORS.white];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2, y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 12, vy: -Math.random() * 15 - 8,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1.0, gravity: 0.3
      });
    }
    const run = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.vy += p.gravity; p.x += p.vx; p.y += p.vy;
        p.rotation += p.rotationSpeed; p.opacity -= 0.01;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
        ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      particles = particles.filter(p => p.opacity > 0);
      if (particles.length > 0) animationFrameRef.current = requestAnimationFrame(run);
    };
    run();
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <section id="book-a-visit" className="relative w-full py-16 md:py-24 px-5 md:px-10 border-t border-charcoal/5 select-none bg-charcoal subpixel-text">
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Image */}
          <div className="col-span-12 lg:col-span-5 flex flex-col">
            <div className="w-full aspect-[4/3] md:aspect-[4/5] overflow-hidden border border-white/10 shadow-2xl rounded-none relative group bg-white">
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&auto=format&fit=crop&q=80" 
                alt="Sunset concrete deck architectural design" 
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1.2s] ease-out brightness-[0.7]"
              />
              <div className="absolute bottom-3 left-3 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-mono text-[7px] text-accent uppercase">
                EXPOSED_ENVELOPE // RES_01
              </div>
            </div>
            <span className="h-caption font-mono text-[7px] text-white/30 tracking-widest text-center mt-3 uppercase block">
              IND_HQ_COORDINATES // ZERO_VENEERS_GUARANTEED
            </span>
          </div>

          {/* Right Column: FAQ + Form */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-10 lg:pl-6">
            
            {/* Header */}
            <div className="flex flex-col gap-2">
              <span className="h-label-mono text-accent">(08 // ADVISORY CONSULTATION)</span>
              <h2 className="font-display text-3xl md:text-5xl font-light text-white tracking-wide leading-tight">
                Commission Your <br />
                <span className="text-accent italic">Residential Landmark</span>
              </h2>
            </div>

            {/* FAQ Accordion — FIXED: dark section uses dark-friendly colors */}
            <div className="flex flex-col gap-4">
              <span className="h-label-mono text-accent/80">[TECHNICAL BRIEFINGS // FAQ]</span>
              
              <div className="flex flex-col border-t border-white/10">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border-b border-white/10 py-4 flex flex-col gap-3"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex justify-between items-start text-left cursor-pointer focus:outline-none gap-4"
                      >
                        <div className="flex gap-4 items-start">
                          <span className="font-mono text-[9px] text-white/30 mt-1 flex-shrink-0">
                            (0{idx + 1})
                          </span>
                          <h3 className="font-display text-sm md:text-base font-light text-white/90 hover:text-accent transition-colors tracking-wide">
                            {faq.q}
                          </h3>
                        </div>
                        <span className="text-accent font-light flex-shrink-0 text-lg leading-none mt-0.5">
                          {isOpen ? '—' : '+'}
                        </span>
                      </button>

                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isOpen ? 'max-h-[220px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="font-sans text-xs text-white/55 pl-8 leading-relaxed font-light mt-1">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Consultation Form — white card on dark bg */}
            <div className="border border-white/10 bg-white p-6 md:p-8 shadow-xl rounded-none relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent via-primary to-transparent"></div>
              
              <canvas 
                ref={confettiCanvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
              ></canvas>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary mb-4 shadow-[0_0_12px_rgba(0,0,170,0.15)] animate-bounce">
                    ✓
                  </div>
                  <h3 className="font-display text-2xl font-light text-charcoal">Advisory Certified</h3>
                  <p className="font-sans text-xs text-charcoal/70 max-w-xs leading-relaxed font-light">
                    Your structural design consultation has been booked. Lead geomechanical estimator Maaz Ayoob will review coordinates within 24 hours.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => { setStatus('idle'); setFormSuccess(false); setMascotPose('idle'); }}
                    className="font-sans text-[11px] tracking-widest text-primary hover:text-primary/80 uppercase mt-6 underline cursor-pointer"
                  >
                    Register Another Advisory
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-xl font-light text-charcoal">Request Architectural Advisory</h3>
                    <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
                      Enter your contact details below to schedule a soil profile consultation.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <input 
                      type="text" name="name" required
                      value={formData.name} onChange={handleInputChange}
                      onFocus={() => handleFocus('name')} onBlur={handleBlur}
                      placeholder="Full Name"
                      className="input-architectural"
                    />
                    <input 
                      type="email" name="email" required
                      value={formData.email} onChange={handleInputChange}
                      onFocus={() => handleFocus('email')} onBlur={handleBlur}
                      placeholder="Email Address"
                      className="input-architectural"
                    />
                    <input 
                      type="tel" name="phone"
                      value={formData.phone} onChange={handleInputChange}
                      onFocus={() => handleFocus('phone')} onBlur={handleBlur}
                      placeholder="Phone Number"
                      className="input-architectural"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="btn-primary py-3.5 px-8 tracking-widest w-full sm:w-auto"
                    >
                      <span>{status === 'loading' ? 'SCHEDULING...' : 'BOOK CONSULTATION'}</span>
                    </button>
                    <span className="font-sans text-[10px] text-charcoal/50 tracking-wider leading-relaxed max-w-[220px]">
                      ZERO VENEERS PROMISED. FORMAL TECHNICAL REVIEW INITIATED.
                    </span>
                  </div>
                </form>
              )}
            </div>

            <div className="flex justify-between items-center text-[7.5px] font-mono text-white/30">
              <span>SYSTEM: CONSULT_ROOM // ONLINE</span>
              <div className="mascot-observation-point">
                <span className="mascot-observation-dot"></span>
                <span>Mascot Observing Consultation Booking</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
