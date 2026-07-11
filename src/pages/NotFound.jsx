import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollSystem } from '../context/ScrollContext';
import Footer from '../components/UI/Footer';
import CinematicHero from '../components/UI/CinematicHero';
import ModularSculpture from '../components/Sculptures/ModularSculpture';

const NOTFOUND_SLIDES = [{
  image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=95&auto=format&fit=crop",
  category: "404 // MISMATCH",
  title: "Coordinate Mismatch",
  desc: "The requested spatial route cannot be mapped to our geomechanical twins registry.",
  code: "SYSTEM // FILE_NOT_FOUND",
  detailImg: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=600&auto=format&fit=crop"
}];

export default function NotFound() {
  const { setActiveScene, setMascotPose } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(8);
    setMascotPose('lookAround');
  }, [setActiveScene, setMascotPose]);

  return (
    <div className="w-full flex flex-col bg-white text-charcoal selection:bg-primary selection:text-white pt-0 select-none font-sans">
      <CinematicHero slides={NOTFOUND_SLIDES} coordinates="00.0000° N, 00.0000° E" sculpture={<ModularSculpture />} />

      <section className="py-space-96 px-space-24 md:px-space-40 max-w-4xl mx-auto w-full relative z-10 min-h-[40vh] flex flex-col items-center text-center gap-space-24">
        <span className="h-label-mono text-accent animate-pulse">[COORD_ERROR // PLOT_NOT_FOUND]</span>
        <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light max-w-xs">
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
