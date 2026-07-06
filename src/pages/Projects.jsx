import React, { useState, useEffect } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import { PROJECTS_DATA } from '../data/mockData';
import { Link } from 'react-router-dom';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';

const PROJECTS_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=95&auto=format&fit=crop",
    category: "01 // WHITEFIELD LANDMARK",
    title: "THE EMERALD TERRACES.",
    desc: "A geomechanical masterpiece cast in M40 concrete. Sinking bedrock friction piles 12 meters deep to pre-stabilize foundations under active clay expansion zones.",
    code: "EMERALD // CONCRETE_LOG",
    detailImg: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=95&auto=format&fit=crop",
    category: "02 // KORAMANGALA MONOLITH",
    title: "EXPOSED AGGREGATE CAST.",
    desc: "Exposed aggregate structural pillars cast in customized resin moulds to ensure absolute zero joint offsets. Boasting a supportless 3.5m cantilever facade projection.",
    code: "MONOLITH // CANTILEVER",
    detailImg: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=95&auto=format&fit=crop",
    category: "03 // MYSURU COMMISSION",
    title: "JAYALAKSHMIPURAM VILLA.",
    desc: "Bedrock anchor collars drilled using low-impact diamond cores, locking frameworks into a solid granite plinth elevation. Passive terracotta convection ducts cool the interiors.",
    code: "MYSURU // GRANITE_ANCHOR",
    detailImg: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop"
  }
];

export default function Projects() {
  const { setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(3); // Mascot targets Projects scene coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [setActiveScene, setMascotPose, setMascotEmotion]);

  // Filter projects
  const filteredProjects = PROJECTS_DATA.filter(p => {
    const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
    const statusMatch = selectedStatus === 'All' || p.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="w-full flex flex-col bg-charcoal text-ivory selection:bg-bronze selection:text-charcoal pt-0 select-none">
      
      {/* 1. Projects Slideshow Hero */}
      <CinematicHero slides={PROJECTS_SLIDES} coordinates="12.9716° N, 77.5946° E" />

      {/* 2. ADVANCED FILTER TABS */}
      <section className="py-space-24 px-space-24 md:px-space-40 border-t border-b border-white/5 bg-graphite/40">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-space-16 font-mono text-[9px] tracking-wider">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-space-12 items-center">
            <span className="text-white/30 mr-2">CATEGORY:</span>
            {['All', 'Residential', 'Luxury Villas', 'Interiors'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 border transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat 
                    ? 'border-bronze text-bronze font-bold' 
                    : 'border-white/5 text-ivory/60 hover:text-ivory'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Status */}
          <div className="flex gap-space-12 items-center">
            <span className="text-white/30 mr-2">STATUS:</span>
            {['All', 'Completed', 'Ongoing'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 border transition-all duration-300 cursor-pointer ${
                  selectedStatus === st 
                    ? 'border-bronze text-bronze font-bold' 
                    : 'border-white/5 text-ivory/60 hover:text-ivory'
                }`}
              >
                {st.toUpperCase()}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. ASYMMETRICAL PROJECTS LISTING */}
      <section className="py-space-96 px-space-24 md:px-space-40 max-w-7xl mx-auto w-full relative z-10">
        {filteredProjects.length === 0 ? (
          <div className="py-space-64 text-center font-mono text-xs text-white/30">
            [ZERO PROJECTS MATCHING SELECTED PARAMS]
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-40 items-start">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              const colSpan = isEven ? 'col-span-12 md:col-span-7' : 'col-span-12 md:col-span-5';
              const offsetClass = isEven ? '' : 'md:translate-y-space-48';

              return (
                <div key={project.id} className={`${colSpan} ${offsetClass} flex flex-col gap-space-16`}>
                  <Link 
                    to={`/projects/${project.id}`} 
                    className="group block border border-white/10 p-space-20 bg-graphite rounded-sm hover:border-bronze/40 transition-all duration-700 shadow-xl"
                  >
                    <div className="w-full aspect-[4/3] overflow-hidden border border-white/5 relative bg-charcoal">
                      <img 
                        src={project.heroImage} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-103 transition-all duration-[1.2s]"
                      />
                      <div className="absolute top-3 left-3 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-mono text-[7px] text-bronze uppercase">
                        {project.location}
                      </div>
                    </div>

                    <div className="flex justify-between items-start mt-space-24">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[8px] text-bronze font-bold">{project.category.toUpperCase()}</span>
                        <h2 className="font-display text-2xl font-light text-white mt-1 group-hover:text-bronze transition-colors">
                          {project.title}
                        </h2>
                        <p className="font-sans text-xs text-ivory/60 leading-relaxed font-light mt-2 max-w-sm">
                          {project.overview}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-stone hover:text-bronze mt-1">→</span>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[8px] font-mono text-white/30">
                      <span>AREA: {project.area}</span>
                      <span>YEAR: {project.year}</span>
                      <span className="text-[#2D4E73]">{project.status.toUpperCase()}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />

    </div>
  );
}
