import React, { useState, useEffect, useRef } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

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
  
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const confettiCanvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API request logs
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

  // Local HTML Canvas Confetti emitter (Snappy visual celebrate)
  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let particles = [];
    const colors = ['#0088cc', '#b89047', '#1c1a17', '#c5a880'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 12,
        vy: -Math.random() * 15 - 8,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1.0,
        gravity: 0.3
      });
    }

    const run = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.01;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      particles = particles.filter(p => p.opacity > 0);

      if (particles.length > 0) {
        animationFrameRef.current = requestAnimationFrame(run);
      }
    };
    run();
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section id="book-a-visit" className="relative min-h-screen w-full py-space-96 md:py-space-160 px-space-24 md:px-space-40 flex items-center border-t border-charcoal/5 select-none theme-dark subpixel-text">
      {/* Background blueprint decorations */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-40 lg:gap-space-64 items-center">
          
          {/* Left Column: Visual Construction & Consultations Collage */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between items-stretch">
            
            {/* Primary sunset villa view */}
            <div className="w-full aspect-[4/5] overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)] rounded-sm relative group bg-graphite">
              <div className="absolute inset-0 blueprint-grid opacity-[0.03] z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&auto=format&fit=crop&q=80" 
                alt="Sunset concrete deck architectural design" 
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1.2s] ease-out brightness-[0.7]"
              />
              <div className="absolute bottom-3 left-3 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-mono text-[7px] text-bronze uppercase">
                EXPOSED_ENVELOPE // RES_01
              </div>
            </div>

            {/* Subtitle / coordinate log */}
            <span className="h-caption font-mono text-[7px] text-ivory/40 tracking-widest text-center mt-4 uppercase block">
              IND_HQ_COORDINATES // ZERO_VENEERS_GUARANTEED
            </span>
          </div>

          {/* Right Column: FAQ Accordion & Form Block (columns 6-12) */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-space-64 lg:pl-space-24">
            
            {/* Header Title */}
            <div className="flex flex-col gap-space-8">
              <span className="h-label-mono text-bronze">
                (08 // ADVISORY CONSULTATION)
              </span>
              <h2 className="h-section-title">
                Commission Your <br />
                <span className="text-bronze italic">Residential Landmark</span>
              </h2>
            </div>

            {/* Technical FAQ (Collapsible Editorial Panel) */}
            <div className="flex flex-col gap-space-24">
              <span className="h-label-mono text-bronze">
                [TECHNICAL BRIEFINGS // FAQ]
              </span>
              
              <div className="flex flex-col border-t border-white/10">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border-b border-white/10 py-space-16 flex flex-col gap-space-12 transition-colors duration-500 hover:bg-white/[0.01] px-2 rounded-sm"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        onMouseEnter={() => setActiveInteraction({ type: 'faq' })}
                        onMouseLeave={() => setActiveInteraction(null)}
                        className="w-full flex justify-between items-start text-left cursor-pointer focus:outline-none"
                      >
                        <div className="flex gap-space-16 items-start">
                          <span className="font-mono text-[9px] text-stone/50 mt-1">
                            (0{idx + 1})
                          </span>
                          <h3 className="font-display text-base md:text-lg font-light text-ivory hover:text-bronze transition-colors tracking-wide">
                            {faq.q}
                          </h3>
                        </div>
                        <span className="text-bronze font-light ml-4">
                          {isOpen ? '—' : '+'}
                        </span>
                      </button>

                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-premium ${
                          isOpen ? 'max-h-[220px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="font-sans text-xs text-ivory/60 pl-space-24 leading-relaxed font-light mt-1">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Consultation Inquiry Form (Graphite concrete card) */}
            <div className="border border-white/10 bg-graphite p-space-32 md:p-space-40 shadow-2xl rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bronze/20 to-transparent"></div>
              
              <canvas 
                ref={confettiCanvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
              ></canvas>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-space-40 text-center gap-space-16 animate-fade-in">
                  <div className="w-12 h-12 rounded-full border border-bronze flex items-center justify-center text-bronze mb-space-16 shadow-[0_0_12px_rgba(184,144,71,0.15)] animate-bounce">
                    ✓
                  </div>
                  <h3 className="font-display text-2xl font-light text-ivory">
                    Advisory Certified
                  </h3>
                  <p className="font-sans text-xs text-ivory/70 max-w-xs leading-relaxed font-light">
                    Your structural design consultation has been booked. Lead geomechanical estimator Maaz Ayoob will review coordinates within 24 hours.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => {
                      setStatus('idle');
                      setFormSuccess(false);
                      setMascotPose('idle');
                    }}
                    className="font-mono text-[9px] tracking-widest text-bronze hover:text-ivory uppercase mt-space-24 underline cursor-pointer"
                  >
                    Register Another Advisory
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-space-32">
                  <div className="flex flex-col gap-space-8">
                    <h3 className="font-display text-xl font-light text-ivory">
                      Request Architectural Advisory
                    </h3>
                    <p className="font-sans text-xs text-ivory/60 leading-relaxed font-light">
                      Please enter your contact specifications below to schedule soil profile maps.
                    </p>
                  </div>

                  <div className="flex flex-col gap-space-8">
                    <input 
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      placeholder="Name"
                      className="input-architectural"
                    />

                    <input 
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      placeholder="Email"
                      className="input-architectural"
                    />

                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      placeholder="Phone"
                      className="input-architectural"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-space-24 justify-between items-start sm:items-center mt-space-16">
                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="btn-primary py-3.5 px-8 tracking-widest"
                    >
                      <span>{status === 'loading' ? 'SCHEDULING...' : 'BOOK CONSULTATION'}</span>
                    </button>
                    
                    <span className="font-mono text-[7.5px] text-stone tracking-wider leading-relaxed max-w-[240px]">
                      BY SUBMITTING YOU INITIATE A FORMAL TECHNICAL REVIEW SESSION. ZERO VENEERS PROMISED.
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* Mascot observation anchor */}
            <div className="flex justify-between items-center text-[7.5px] font-mono text-ivory/40">
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
