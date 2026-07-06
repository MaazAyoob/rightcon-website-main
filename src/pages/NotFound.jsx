import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollSystem } from '../context/ScrollContext';
import Footer from '../components/UI/Footer';

export default function NotFound() {
  const { setActiveScene, setMascotPose } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(8);
    setMascotPose('lookAround');
  }, [setActiveScene, setMascotPose]);

  return (
    <div className="w-full flex flex-col bg-charcoal text-ivory selection:bg-bronze selection:text-charcoal pt-space-96 select-none">
      <section className="py-space-160 px-space-24 md:px-space-40 max-w-4xl mx-auto w-full relative z-10 min-h-[60vh] flex flex-col justify-center items-center text-center gap-space-24">
        
        <div className="relative w-16 h-16 flex items-center justify-center border border-bronze/45 rounded-sm">
          <div className="absolute w-[1px] h-12 bg-white/20"></div>
          <div className="absolute w-12 h-[1px] bg-white/20"></div>
          <span className="font-mono text-[9px] text-bronze font-bold">404</span>
        </div>

        <span className="h-label-mono text-[#2D4E73] animate-pulse">[COORD_ERROR // PLOT_NOT_FOUND]</span>
        <h1 className="font-display text-4xl font-light text-white uppercase tracking-wider">
          Coordinate Mismatch
        </h1>
        
        <p className="font-sans text-xs text-ivory/60 leading-relaxed font-light max-w-xs">
          The requested spatial route cannot be mapped to our geomechanical twins registry.
        </p>

        <Link 
          to="/" 
          className="btn-primary py-3 px-8 text-[9px] tracking-widest mt-4 rounded-none"
        >
          <span>Return HQ</span>
        </Link>

      </section>
      <Footer />
    </div>
  );
}
