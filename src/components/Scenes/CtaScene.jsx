import React, { useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

export default function CtaScene() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const { setActiveInteraction } = useScrollSystem();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '' });
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="book-a-visit" className="relative min-h-screen w-full bg-[#12110f] py-24 px-8 md:px-16 flex items-center border-t border-white/5 select-none">
      {/* Background decoration */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Heading and Details */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="font-mono text-[9px] text-bronze tracking-[0.25em] uppercase">
              (ATELIER ADVISORY)
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-light text-white leading-tight">
              Discover the Essence of <br />
              <span className="text-bronze italic">Structural Living</span>
            </h2>
            <p className="font-sans text-xs md:text-sm font-light text-stone-light leading-relaxed max-w-md">
              Experience the harmony of structural engineering science and refined materiality. Schedule a private geological advisory or request an architectural brochure to begin.
            </p>
            
            <div className="flex flex-col gap-2 font-mono text-[10px] text-stone mt-4">
              <div>BANGALORE SHOWROOM & LAB OPEN DAILY</div>
              <div>STUDIO: 12TH MAIN, INDIRANAGAR</div>
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="lg:col-span-6 border border-white/5 bg-[#171614] p-8 md:p-12 shadow-2xl rounded-sm relative overflow-hidden">
            {/* Top border glow decoration */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent opacity-40"></div>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full border border-[#00f3ff] flex items-center justify-center text-[#00f3ff] mb-4">
                  ✓
                </div>
                <h3 className="font-display text-2xl text-white font-light">
                  Submission Certified
                </h3>
                <p className="font-sans text-xs text-stone-light max-w-xs leading-relaxed">
                  Your request has been logged. Our lead estimator will contact you within 48 business hours with core geological profiles.
                </p>
                <button 
                  type="button" 
                  onClick={() => setStatus('idle')}
                  className="font-mono text-[9px] tracking-wider text-bronze hover:text-white uppercase mt-4 underline cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl text-white font-light">
                    Envision Your Life With Rightcon
                  </h3>
                  <p className="font-sans text-xs text-stone">
                    Complete fields below to initialize standard consultation.
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
                      onFocus={() => setActiveInteraction({ type: 'form' })}
                      onBlur={() => setActiveInteraction(null)}
                      placeholder="Name"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-xs md:text-sm font-light text-white placeholder-stone focus:outline-none focus:border-bronze transition-colors"
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
                      onFocus={() => setActiveInteraction({ type: 'form' })}
                      onBlur={() => setActiveInteraction(null)}
                      placeholder="Email"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-xs md:text-sm font-light text-white placeholder-stone focus:outline-none focus:border-bronze transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => setActiveInteraction({ type: 'form' })}
                      onBlur={() => setActiveInteraction(null)}
                      placeholder="Phone"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-xs md:text-sm font-light text-white placeholder-stone focus:outline-none focus:border-bronze transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mt-4">
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto font-mono text-[9px] tracking-[0.25em] bg-bronze hover:bg-bronze-light text-[#12110f] uppercase font-bold py-3.5 px-8 transition-colors disabled:opacity-50 cursor-pointer rounded-sm"
                  >
                    {status === 'loading' ? 'LOGGING...' : 'REQUEST'}
                  </button>
                  
                  <span className="font-mono text-[7.5px] text-stone tracking-wider leading-relaxed max-w-[240px]">
                    BY SENDING REQUEST, YOU AGREE TO DATA REGISTRY COMPLIANCE. NO VENEERS PROMISED.
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
