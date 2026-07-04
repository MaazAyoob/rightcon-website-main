import React, { useState, useEffect, useRef } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

export default function CtaScene() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const { 
    setMascotPose, 
    setFormFieldFocus, 
    setFormSuccess,
    formSuccess 
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

  // Local HTML Canvas Confetti emitter
  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let particles = [];
    const colors = ['#00f3ff', '#D4AF37', '#ffffff', '#0077ff'];

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
    <section id="book-a-visit" className="relative min-h-screen w-full bg-[#050505] py-24 px-8 md:px-16 flex items-center border-t border-white/5 select-none subpixel-text">
      {/* Background blueprint decorations */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Heading, metrics and detailed structural logs */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] uppercase">
              (SCENE 08 / ADVISORY REQUEST)
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-[#F8F8F6] leading-tight">
              Begin Your <br />
              <span className="text-[#D4AF37] italic">Dream Home Journey</span>
            </h2>
            <p className="font-sans text-xs md:text-sm font-light text-stone-light leading-relaxed max-w-md">
              Schedule a private site geologic survey or request our portfolio brochure. Our estimator coordinates soil Safe Bearing Capacities and finishes logs.
            </p>
            
            <div className="flex flex-col gap-2 font-mono text-[10px] text-stone mt-4">
              <div>HQ: INDIRANAGAR STUDIO, BANGALORE</div>
              <div>METRIC COMPLIANCE REGISTER: VERIFIED</div>
            </div>
          </div>

          {/* Right Column: Premium Inquiry Card */}
          <div className="lg:col-span-6 border border-white/5 bg-[#171614] p-8 md:p-12 shadow-2xl rounded-sm relative overflow-hidden">
            
            {/* Top border neon glow */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#49B8FF]/40 to-transparent"></div>

            {/* Confetti canvas */}
            <canvas 
              ref={confettiCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            ></canvas>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full border border-[#49B8FF] flex items-center justify-center text-[#49B8FF] mb-4 shadow-[0_0_12px_rgba(73,184,255,0.4)] animate-bounce">
                  ✓
                </div>
                <h3 className="font-display text-3xl text-[#F8F8F6] font-light">
                  Submission Certified
                </h3>
                <p className="font-sans text-xs text-stone-light max-w-xs leading-relaxed">
                  Your structural advisory inquiry has been registered. Our lead geomechanical engineer will establish contact within 24 business hours.
                </p>
                <button 
                  type="button" 
                  onClick={() => {
                    setStatus('idle');
                    setFormSuccess(false);
                    setMascotPose('idle');
                  }}
                  className="font-mono text-[9px] tracking-widest text-[#D4AF37] hover:text-white uppercase mt-6 underline cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl text-[#F8F8F6] font-light">
                    Inquire for Estimations
                  </h3>
                  <p className="font-sans text-xs text-stone">
                    Please provide standard details below to initialize geologic audits.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <input 
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      placeholder="Name"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-xs md:text-sm font-light text-white placeholder-stone focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input 
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      placeholder="Email"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-xs md:text-sm font-light text-white placeholder-stone focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      placeholder="Phone"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-xs md:text-sm font-light text-white placeholder-stone focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mt-4">
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto font-mono text-[9.5px] tracking-[0.25em] bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#050505] uppercase font-bold py-4 px-9 transition-all cursor-pointer rounded-sm shadow-lg hover:shadow-[#D4AF37]/10"
                  >
                    {status === 'loading' ? 'CERTIFYING...' : 'REQUEST ESTIMATE'}
                  </button>
                  
                  <span className="font-mono text-[7.5px] text-stone tracking-wider leading-relaxed max-w-[240px]">
                    BY CLICKING REQUEST, YOU AGREE TO DATA REGISTRY AUDIT TERMS. ZERO VENEERS GUARANTEED.
                  </span>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
