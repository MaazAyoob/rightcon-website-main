import { useEffect } from "react";
import { PROJECTS } from "../data/rightconData";
import { Link } from "react-router-dom";

export default function Projects() {
  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll(".fade-up-element");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-white dark:bg-charcoal text-charcoal dark:text-white pt-32 pb-32 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-32">
        
        {/* Page Header */}
        <div className="space-y-6 max-w-3xl border-b border-neutral-200 dark:border-neutral-800 pb-16 fade-up-element">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold block font-semibold">OUR ARCHITECTURAL PORTFOLIO</span>
          <h1 className="font-display font-light text-4xl md:text-7xl text-charcoal dark:text-white uppercase tracking-tight leading-none">
            Selected Residences
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 font-light text-sm md:text-base leading-relaxed">
            Bespoke private estates engineered with structural fidelity. Explore our featured architectural stories.
          </p>
        </div>

        {/* Scalable Showcase List (Asymmetric Editorial Rhythm) */}
        <div className="space-y-40 md:space-y-56">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const projectNumber = String(idx + 1).padStart(2, "0");

            return (
              <div 
                key={project.id} 
                className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                
                {/* 1. Large Image (≈65% on desktop) with Hover Zoom */}
                <div className="w-full lg:w-[65%] aspect-[16/10] bg-neutral-50 dark:bg-neutral-900 hover-zoom fade-up-element border border-neutral-200 dark:border-neutral-800">
                  <Link to={`/projects/${project.id}`} aria-label={`View case details for ${project.title}`}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-editorial"
                    />
                  </Link>
                </div>

                {/* 2. Project Information (≈35% on desktop) */}
                <div className="w-full lg:w-[35%] space-y-8 fade-up-element" style={{ transitionDelay: "150ms" }}>
                  
                  {/* Project Number */}
                  <span className="font-mono text-xs text-brand-blue dark:text-gold uppercase tracking-widest block font-semibold">
                    Portfolio / {projectNumber}
                  </span>

                  {/* Project Name */}
                  <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal dark:text-white uppercase leading-tight tracking-tight">
                    <Link to={`/projects/${project.id}`} className="hover:text-brand-blue dark:hover:text-gold transition-colors duration-300">
                      {project.title}
                    </Link>
                  </h2>

                  {/* Location + Area */}
                  <div className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest space-y-1 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <div>Location: <span className="text-charcoal dark:text-white font-medium">{project.location}</span></div>
                    <div>Area: <span className="text-charcoal dark:text-white font-medium">{project.builtUpArea}</span></div>
                  </div>

                  {/* Editorial Description */}
                  <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm font-light leading-relaxed">
                    {project.id === "sudheendra-residency" && "A double-height volumetric frame integrated with structural steel columns, custom floor concrete logs, and high-performance joinery details."}
                    {project.id === "naresh-residency" && "A light-well central layout designed to pull illumination through narrow plot dimensions. Engineered with cantilevers and robust waterproofing layers."}
                    {project.id === "manas-residency" && "A compact G+1 residence maximizing spatial efficiency, combining open-layout dining with smart system pathways."}
                    {project.id === "ayoob-residency" && "A structural G+2 contemporary residence utilizing vibration-isolated concrete footing frames and bespoke teak cladding accents."}
                  </p>

                  {/* View Project Button */}
                  <div className="pt-2">
                    <Link 
                      to={`/projects/${project.id}`}
                      className="font-mono text-[11px] uppercase tracking-widest text-brand-blue dark:text-gold border-b border-brand-blue/30 dark:border-gold/30 pb-1 hover:text-charcoal dark:hover:text-white hover:border-charcoal dark:hover:border-white transition-editorial inline-block font-semibold"
                    >
                      View Project Spec →
                    </Link>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="pt-24 border-t border-neutral-200 dark:border-neutral-800 text-center space-y-8 max-w-2xl mx-auto fade-up-element">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold block font-semibold">COMMENCE YOUR PROJECT BRIEF</span>
          <h2 className="font-display font-light text-3xl md:text-4xl text-charcoal dark:text-white uppercase tracking-tight">
            Want to build your signature home?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm leading-relaxed font-light">
            Contact our structural coordinators to schedule an overview briefing at our Jayanagar office, where we can inspect site parameters.
          </p>
          <div className="pt-4">
            <Link 
              to="/contact" 
              className="font-mono text-xs uppercase tracking-widest text-white bg-brand-blue hover:bg-gold hover:text-charcoal dark:bg-gold dark:text-charcoal dark:hover:bg-white dark:hover:text-charcoal px-8 py-4.5 transition-all duration-300 inline-block font-semibold shadow-sm"
            >
              Request Private Consultation
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

