import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useScrollSystem } from '../context/ScrollContext';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';
import ContactSculpture from '../components/Sculptures/ContactSculpture';

const CONTACT_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&q=95&auto=format&fit=crop",
    category: "01 // COMMISSION REGISTRY",
    title: "REQUEST ADVISORY.",
    desc: "Commence site audits and geomechanical coordinate calculations. Fill the parameter fields below to submit details directly to Maaz Ayoob.",
    code: "CONSULTATION // AUDIT",
    detailImg: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1920&q=95&auto=format&fit=crop",
    category: "02 // INDIRANAGAR DESIGN HQ",
    title: "HQ COORDINATES.",
    desc: "Rightcon Design HQ: 12th Main Road, Indiranagar, Bangalore. Where structural blueprints are compiled, BIM twins synchronized, and materials inspected.",
    code: "STUDIO // HQ_LOC",
    detailImg: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop"
  }
];

const FAQS = [
  { 
    q: "Where do you execute projects?", 
    a: "We actively construct premium residences across Bangalore and Mysuru, mapping local geomechanical conditions directly at each site." 
  },
  { 
    q: "Do you offer architectural design separately?", 
    a: "We work as a complete turnkey execution studio, handling geomechanical piles, structural slabs, and BIM planning coordinates under a single point of contract." 
  },
  { 
    q: "What is your deed of structural warranty?", 
    a: "Rightcon registers a 10-Year Transferable geomechanical warranty directly inside the property deed, preserved during any ownership transfer." 
  }
];

export default function Contact() {
  const { setActiveScene, setMascotPose, setMascotEmotion, setFormFieldFocus, setFormSuccess } = useScrollSystem();
  const [searchParams] = useSearchParams();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(8); // Target CTA / Contact mascot coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');

    // Handle advisory scroll focus
    if (searchParams.get('advisory') === 'true') {
      setFormData(prev => ({ 
        ...prev, 
        message: "REQUESTING GEOMECHANICAL SITE COMPACTION ADVISORY. Please coordinate foundation core checks." 
      }));
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [setActiveScene, setMascotPose, setMascotEmotion, searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
    }, 6000);
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="w-full flex flex-col bg-white text-charcoal selection:bg-primary selection:text-white pt-0 select-none font-sans">
      
      {/* 1. Contact Hero */}
      <CinematicHero slides={CONTACT_SLIDES} coordinates="12.9716° N, 77.6412° E" sculpture={<ContactSculpture />} />

      {/* 2. INQUIRY FORM & ADDRESSES */}
      <section ref={formRef} className="py-space-96 px-space-24 md:px-space-40 border-t border-charcoal/5 bg-white relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-space-64 items-start relative z-10">
          
          {/* Glass Form */}
          <div className="col-span-12 lg:col-span-7 border border-charcoal/10 bg-charcoal/50 p-space-32 md:p-space-40 shadow-2xl rounded-none">
            {submitted ? (
              <div className="py-space-40 text-center flex flex-col gap-space-16 items-center">
                <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center text-accent text-xl mb-4">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-light text-white uppercase tracking-wide">Advisory Booked</h3>
                <p className="font-sans text-xs text-charcoal/60 max-w-xs leading-relaxed font-light">
                  Your coordinates have been registered. Maaz Ayoob will review details and schedule contact within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-space-32">
                <div className="flex flex-col gap-space-8">
                  <h3 className="font-display text-2xl font-light text-white uppercase tracking-wide">Request Advisory Consultation</h3>
                  <p className="font-sans text-xs text-charcoal/60 font-light">
                    Enter contact specifications to schedule a geomechanical review.
                  </p>
                </div>

                <div className="flex flex-col gap-space-12">
                  <input 
                    type="text" 
                    required 
                    placeholder="Full Name" 
                    value={formData.name}
                    onFocus={() => setFormFieldFocus('name')}
                    onBlur={() => setFormFieldFocus(null)}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-architectural"
                  />
                  <input 
                    type="email" 
                    required 
                    placeholder="Email Address" 
                    value={formData.email}
                    onFocus={() => setFormFieldFocus('email')}
                    onBlur={() => setFormFieldFocus(null)}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-architectural"
                  />
                  <input 
                    type="tel" 
                    required 
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onFocus={() => setFormFieldFocus('phone')}
                    onBlur={() => setFormFieldFocus(null)}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-architectural"
                  />
                  <textarea 
                    placeholder="Describe your site location & specifications" 
                    value={formData.message}
                    onFocus={() => setFormFieldFocus('message')}
                    onBlur={() => setFormFieldFocus(null)}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-architectural min-h-[80px]"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-primary py-3.5 px-8 tracking-widest text-[9.5px] rounded-none self-start"
                >
                  <span>BOOK ADVISORY</span>
                </button>
              </form>
            )}
          </div>

          {/* Locations & coordinates */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-space-48">
            
            {/* Offices */}
            <div className="flex flex-col gap-space-24 border-b border-charcoal/5 pb-8">
              <span className="h-label-mono text-accent">[OFFICE COORDINATES]</span>
              
              <div className="flex flex-col gap-4 font-light text-xs text-charcoal/70">
                <div className="flex flex-col gap-1">
                  <h4 className="font-mono text-xs text-white font-bold">BANGALORE DESIGN HQ</h4>
                  <address className="not-italic leading-relaxed">
                    12th Main Rd, Indiranagar, Bangalore, Karnataka 560038
                  </address>
                </div>
                
                <div className="flex flex-col gap-1 mt-4">
                  <h4 className="font-mono text-xs text-white font-bold">MYSURU STUDIO</h4>
                  <address className="not-italic leading-relaxed">
                    Jayalakshmipuram, Mysuru, Karnataka 570012
                  </address>
                </div>
              </div>
            </div>

            {/* Google Map Container placeholder */}
            <div className="w-full aspect-[4/3] border border-charcoal/10 bg-charcoal rounded-none overflow-hidden relative">
              <div className="absolute inset-0 blueprint-grid opacity-10"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                <span className="font-mono text-[8px] text-accent uppercase">MAP Telemetry // RC_LOC_COORD</span>
                <span className="font-display text-sm font-light text-white/50 mt-2">Indiranagar // 12.9716° N, 77.6412° E</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. TECHNICAL FAQS ACCORDION */}
      <section className="py-space-96 px-space-24 md:px-space-40 max-w-5xl mx-auto w-full relative z-10 border-t border-charcoal/5">
        <div className="flex flex-col gap-space-48">
          <div className="flex flex-col gap-space-8 text-center items-center">
            <span className="h-label-mono text-accent">[TECHNICAL BRIEFINGS // FAQ]</span>
            <h2 className="font-display text-2xl md:text-3xl font-light text-white uppercase tracking-wide">General Questions</h2>
          </div>

          <div className="flex flex-col border-t border-charcoal/10">
            {FAQS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="border-b border-charcoal/10 py-space-16 flex flex-col gap-space-12 transition-colors duration-500 hover:bg-white/[0.01] px-2 rounded-none"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-start text-left cursor-pointer focus:outline-none"
                  >
                    <div className="flex gap-space-16 items-start">
                      <span className="font-mono text-[9px] text-charcoal/50/50 mt-1">
                        (0{idx + 1})
                      </span>
                      <h3 className="font-display text-base md:text-lg font-light text-charcoal hover:text-accent transition-colors tracking-wide leading-snug">
                        {item.q}
                      </h3>
                    </div>
                    <span className="text-accent font-light ml-4">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>

                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-premium ${
                      isOpen ? 'max-h-[220px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="font-sans text-xs text-charcoal/60 pl-space-24 leading-relaxed font-light mt-1">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}
