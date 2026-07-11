import React, { useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import Footer from '../components/UI/Footer';
import CinematicHero from '../components/UI/CinematicHero';
import LockSculpture from '../components/Sculptures/LockSculpture';

const TERMS_SLIDES = [{
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=95&auto=format&fit=crop",
  category: "REGISTRY // TERMS",
  title: "Terms & Conditions",
  desc: "Commission agreements are subject to geomechanical bedrock validation logs. Sourcing estimations are itemized under RERA approved BOQ ledgers.",
  code: "TERMS // STIPULATION",
  detailImg: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&auto=format&fit=crop"
}];

export default function TermsConditions() {
  const { setActiveScene, setMascotPose } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(8);
    setMascotPose('idle');
  }, [setActiveScene, setMascotPose]);

  return (
    <div className="w-full flex flex-col bg-white text-charcoal selection:bg-primary selection:text-white pt-0 select-none font-sans">
      <CinematicHero slides={TERMS_SLIDES} coordinates="12.9716° N, 77.5946° E" sculpture={<LockSculpture />} />

      <section className="py-space-96 px-space-24 md:px-space-40 max-w-4xl mx-auto w-full relative z-10 min-h-[40vh] flex flex-col gap-space-32">
        <span className="h-label-mono text-accent">[REGISTRY // TERMS]</span>
        <h2 className="font-display text-2xl font-light text-charcoal uppercase tracking-wider">Contractual Accord</h2>
        
        <p className="font-sans text-xs text-charcoal/65 leading-relaxed font-light">
          Commission agreements are subject to geomechanical bedrock validation logs. Sourcing estimations are itemized under RERA approved BOQ ledgers.
        </p>
        <p className="font-sans text-xs text-charcoal/65 leading-relaxed font-light">
          Structural warranty terms require ongoing inspection compliance as documented inside the geomechanical registry reports. Unauthorized slab drilling voiding warranty parameters.
        </p>
      </section>
      <Footer />
    </div>
  );
}
