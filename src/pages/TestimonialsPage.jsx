import React, { useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';
import RingSculpture from '../components/Sculptures/RingSculpture';

const TESTIMONIAL_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=95&auto=format&fit=crop",
    category: "01 // THE EMERALD TERRACES",
    title: "ADITYA SEN'S LANDMARK.",
    desc: "Reviewing bedrock pile drills and geomechanical compaction integrity in Whitefield, Bangalore.",
    code: "SEN_ESTATE // SLAB_PASS",
    detailImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=95&auto=format&fit=crop",
    category: "02 // KORAMANGALA MONOLITH",
    title: "KIRAN RAO'S MONOLITH.",
    desc: "Documenting exposed concrete formwork without veneers and structural glazing hydrostatic pressure tests.",
    code: "RAO_ESTATE // CONCRETE_RAW",
    detailImg: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop"
  }
];

const INTERVIEWS = [
  {
    author: "Dr. Aditya Sen",
    project: "The Emerald Terraces",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
    quote: "Rightcon's geological rigour was outstanding. While typical builders suggest simple concrete pillars, Maaz mapped the bedrock profile and designed deep compaction piles."
  },
  {
    author: "Kiran & Nidhi Rao",
    project: "Koramangala Monolith",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop",
    quote: "The visual honesty of the raw concrete structures is incredible. There are no overlays, no veneers—just pure structural confidence."
  },
  {
    author: "Ranganath Prasad",
    project: "Jayalakshmipuram Villa",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
    quote: "Rightcon treats residential construction like Swiss watchmaking. Their plans are clash-free, and their geologists check bedrock samples meticulously."
  }
];

export default function TestimonialsPage() {
  const { setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(7); // Target About/Testimonials coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [setActiveScene, setMascotPose, setMascotEmotion]);

  return (
    <div className="w-full flex flex-col bg-charcoal text-white selection:bg-primary selection:text-white pt-0 select-none font-sans">
      
      {/* 1. Testimonials slideshow hero */}
      <CinematicHero slides={TESTIMONIAL_SLIDES} coordinates="12.9716° N, 77.5946° E" sculpture={<RingSculpture />} />

      {/* 2. DETAILED INTERVIEWS LIST */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/10 bg-charcoal relative">
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-space-48">
          
          <div className="flex flex-col gap-space-64">
            {INTERVIEWS.map((int, i) => (
              <div 
                key={i} 
                className="flex flex-col md:flex-row gap-space-40 items-center border-b border-white/10 pb-space-40"
              >
                <div className="w-[320px] aspect-[4/3] overflow-hidden border border-charcoal/15 bg-charcoal rounded-none shadow-md group flex-shrink-0">
                  <img 
                    src={int.image} 
                    alt={int.project} 
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1s]" 
                  />
                </div>
                <div className="flex flex-col gap-space-16">
                  <p className="font-display text-xl md:text-2xl font-light italic leading-relaxed text-charcoal/90">
                    "{int.quote}"
                  </p>
                  <div className="flex items-center gap-space-16 font-mono text-[9px]">
                    <span className="text-accent font-bold uppercase">{int.author}</span>
                    <span className="text-charcoal/30">|</span>
                    <span className="text-charcoal/50 uppercase">{int.project}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
}
