import React, { useEffect, useState } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import { CAREERS_DATA } from '../data/mockData';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';
import FoundationSculpture from '../components/Sculptures/FoundationSculpture';

const CAREERS_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=95&auto=format&fit=crop",
    category: "01 // ESTIMATION HQ",
    title: "BUILD WITH RIGOR.",
    desc: "We look for geologists, BIM twin coordinators, and structural supervisors who demand geotechnical transparency over cheap covers.",
    code: "CAREERS // ESTIMATION_TEAM",
    detailImg: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=1920&q=95&auto=format&fit=crop",
    category: "02 // STRUCTURAL SUPERVISION",
    title: "ON-SITE EXCELLENCE.",
    desc: "Coordinate reinforcement grids, compile crushing logbooks, and enforce quality control standards across Bangalore estates.",
    code: "SITE_LOGS // REBAR_COORD",
    detailImg: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop"
  }
];

export default function Careers() {
  const { setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Geotechnical Engineer' });

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(7); // Target About/Careers mascot coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [setActiveScene, setMascotPose, setMascotEmotion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col bg-white text-charcoal selection:bg-primary selection:text-white pt-0 select-none font-sans">
      
      {/* 1. Careers slideshow hero */}
      <CinematicHero slides={CAREERS_SLIDES} coordinates="12.9716° N, 77.5946° E" sculpture={<FoundationSculpture />} />

      {/* 2. OPEN ROLES GRID */}
      <section className="section-container border-t border-charcoal/5 bg-white relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-48 relative z-10">
          <span className="h-label-mono text-accent">[OPEN POSITIONS]</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-32">
            {CAREERS_DATA.map((job) => (
              <div 
                key={job.id} 
                className="border border-charcoal/5 p-space-32 bg-charcoal rounded-none hover:border-accent/40 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[240px]"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[8px] font-mono text-white/50">
                    <span>{job.location.toUpperCase()} // {job.type.toUpperCase()}</span>
                    <span>EXP: {job.experience}</span>
                  </div>
                  <h3 className="font-display text-xl font-light text-white mt-2 uppercase tracking-wide">{job.title}</h3>
                  <p className="font-sans text-xs text-white/60 leading-relaxed font-light mt-2">
                    {job.desc}
                  </p>
                </div>

                <a 
                  href="#apply-form" 
                  onClick={() => setFormData(prev => ({ ...prev, role: job.title }))}
                  className="font-mono text-[9px] text-accent hover:text-white uppercase tracking-widest mt-6"
                >
                  Apply for this role ↓
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. APPLICATION FORM (Glassy panel) */}
      <section id="apply-form" className="section-container max-w-3xl mx-auto w-full relative z-10">
        <div className="border border-charcoal/10 bg-charcoal p-space-32 md:p-space-40 shadow-2xl rounded-none">
          
          {submitted ? (
            <div className="py-space-40 text-center flex flex-col gap-space-16 items-center animate-scale-in">
              <div className="w-14 h-14 rounded-full border border-accent flex items-center justify-center text-accent text-2xl mb-4 shadow-[0_0_15px_rgba(201,162,39,0.3)] animate-pulse">
                ✓
              </div>
              <h3 className="font-display text-2xl font-light text-white uppercase tracking-wide">Application Logged</h3>
              <p className="font-sans text-xs text-white/60 max-w-xs leading-relaxed font-light">
                Your credentials have been indexed in our coordination registry. Maaz Ayoob's estimating office will evaluate details within 3 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-space-32">
              <div className="flex flex-col gap-space-8">
                <h3 className="font-display text-2xl font-light text-white uppercase tracking-wide">Submit Credentials</h3>
                <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
                  Join our structural team in Indiranagar.
                </p>
              </div>

              <div className="flex flex-col gap-space-8">
                <input 
                  type="text" 
                  required
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-architectural"
                />
                <input 
                  type="email" 
                  required
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-architectural"
                />
                <div className="border-b border-white/10 py-4 flex flex-col gap-2">
                  <span className="font-mono text-[8px] text-white/30">SELECT ROLE:</span>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="bg-transparent border-none outline-none font-sans text-xs text-white/80 cursor-pointer"
                  >
                    {CAREERS_DATA.map(j => (
                      <option key={j.id} value={j.title} className="bg-charcoal text-white">{j.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary min-h-[56px] px-8 tracking-widest text-[9.5px] rounded-none self-start flex items-center justify-center"
              >
                <span>SUBMIT APPLICATION</span>
              </button>
            </form>
          )}

        </div>
      </section>

      <Footer />

    </div>
  );
}
