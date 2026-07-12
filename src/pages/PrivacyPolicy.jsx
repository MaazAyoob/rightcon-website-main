import React, { useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import Footer from '../components/UI/Footer';
import CinematicHero from '../components/UI/CinematicHero';
import LockSculpture from '../components/Sculptures/LockSculpture';

const PRIVACY_SLIDES = [{
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=95&auto=format&fit=crop",
  category: "REGISTRY // PRIVACY",
  title: "Privacy Policy",
  desc: "Rightcon respects client privacy regulations. Geotechnical records, coordinate blueprints, and contract estimations are kept strictly secure inside our isolated studio networks.",
  code: "PRIVACY // SECURE",
  detailImg: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&auto=format&fit=crop"
}];

export default function PrivacyPolicy() {
  const { setActiveScene, setMascotPose } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(8);
    setMascotPose('idle');
  }, [setActiveScene, setMascotPose]);

  return (
    <div className="w-full flex flex-col bg-white text-charcoal selection:bg-primary selection:text-white pt-0 select-none font-sans">
      <CinematicHero slides={PRIVACY_SLIDES} coordinates="12.9716° N, 77.5946° E" sculpture={<LockSculpture />} />

      <section className="section-container max-w-4xl mx-auto w-full relative z-10 min-h-[40vh] flex flex-col gap-space-32">
        <span className="h-label-mono text-accent">[REGISTRY // PRIVACY]</span>
        <h2 className="font-display text-2xl font-light text-charcoal uppercase tracking-wider">Data Handling Guidelines</h2>
        
        <p className="font-sans text-xs text-charcoal/65 leading-relaxed font-light">
          Rightcon respects client privacy regulations. Geotechnical records, coordinate blueprints, and contract estimations are kept strictly secure inside our isolated studio networks.
        </p>
        <p className="font-sans text-xs text-charcoal/65 leading-relaxed font-light">
          Site telemetry logs collected through construction sensors are used strictly for quality checks and structural ledger documentations, complying with Bangalore RERA guidelines.
        </p>
      </section>
      <Footer />
    </div>
  );
}
