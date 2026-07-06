import React, { useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import Footer from '../components/UI/Footer';

export default function PrivacyPolicy() {
  const { setActiveScene, setMascotPose } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(8);
    setMascotPose('idle');
  }, [setActiveScene, setMascotPose]);

  return (
    <div className="w-full flex flex-col bg-charcoal text-ivory selection:bg-bronze selection:text-charcoal pt-space-96 select-none">
      <section className="py-space-96 px-space-24 md:px-space-40 max-w-4xl mx-auto w-full relative z-10 min-h-[60vh] flex flex-col gap-space-32">
        <span className="h-label-mono text-bronze">[REGISTRY // PRIVACY]</span>
        <h1 className="font-display text-4xl font-light text-white uppercase tracking-wider">Privacy Policy</h1>
        
        <p className="font-sans text-xs text-ivory/65 leading-relaxed font-light">
          Rightcon respects client privacy regulations. Geotechnical records, coordinate blueprints, and contract estimations are kept strictly secure inside our isolated studio networks.
        </p>
        <p className="font-sans text-xs text-ivory/65 leading-relaxed font-light">
          Site telemetry logs collected through construction sensors are used strictly for quality checks and structural ledger documentations, complying with Bangalore RERA guidelines.
        </p>
      </section>
      <Footer />
    </div>
  );
}
