import { PROJECTS } from "../data/rightconData";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <div className="bg-white pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-24">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl border-b border-neutral-100 pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">OUR ARCHITECTURAL PORTFOLIO</span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-charcoal uppercase tracking-tight">
            SELECTED RESIDENCES
          </h1>
          <p className="text-neutral-500 font-light text-base md:text-lg leading-relaxed">
            Bespoke private estates engineered with structural fidelity and documented quality audits. Explore our case studies.
          </p>
        </div>

        {/* Scalable Showcase List */}
        <div className="space-y-36 lg:space-y-48">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const projectNumber = String(idx + 1).padStart(2, "0");

            return (
              <div 
                key={project.id} 
                className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center group ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                
                {/* 1. Large Image (≈65% on desktop) */}
                <div className="w-full lg:w-[65%] aspect-[16/10] overflow-hidden bg-neutral-100 border border-neutral-200 relative">
                  <Link to={`/projects/${project.id}`} aria-label={`View case details for ${project.title}`}>
                    {/* Slow zoom and overlay on group hover */}
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500 pointer-events-none"></div>
                  </Link>
                </div>

                {/* 2. Project Information (≈35% on desktop) */}
                <div className="w-full lg:w-[35%] space-y-6">
                  
                  {/* Project Number */}
                  <span className="font-mono text-sm text-gold font-semibold tracking-widest block">
                    {projectNumber}
                  </span>

                  {/* Project Name */}
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal uppercase leading-tight tracking-tight">
                    <Link to={`/projects/${project.id}`} className="hover:text-gold transition-colors duration-300">
                      {project.title}
                    </Link>
                  </h2>

                  {/* Location + Status */}
                  <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider space-y-1">
                    <div>Location: <span className="text-neutral-500 font-semibold">{project.location}</span></div>
                    <div>Scale: <span className="text-neutral-500 font-semibold">{project.builtUpArea || project.scale}</span></div>
                    <div>Status: <span className="text-gold font-semibold">Handed Over</span></div>
                  </div>

                  {/* Editorial Description */}
                  <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed">
                    {project.id === "sudheendra-residency" && "A G+2 open-plan frame featuring double-height visual volumes, incorporating structural steel reinforcement logs and custom concrete casting schedules to support large glass facades."}
                    {project.id === "naresh-residency" && "Designed with a central light well and structural cantilevers. We established a strict pre-construction log and logistics schedule, delivering materials exactly during permitted shifts."}
                    {project.id === "manas-residency" && "An open layout combining the kitchen, dining, and deck spaces, utilizing smart plumbing and wiring paths mapped in pre-construction to optimize structural utility."}
                    {project.id === "ayoob-residency" && "Designed concrete pile foundation frames tied with reinforced shear walls to isolate ground vibrations and support architectural cantilever slabs on an urban corner site."}
                  </p>

                  {/* View Project Button */}
                  <div className="pt-2">
                    <Link 
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center space-x-2 bg-charcoal text-white hover:bg-gold hover:text-charcoal transition-all duration-300 font-mono text-xs uppercase tracking-widest px-8 py-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 min-h-[44px] cursor-pointer group/btn"
                    >
                      <span>View Project case</span>
                      <span className="transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="pt-16 border-t border-neutral-100 text-center space-y-6 max-w-2xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-gold block font-semibold">COMMENCE YOUR PROJECT BRIEF</span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal uppercase">
            WANT TO BUILD YOUR SIGNATURE HOME?
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed font-light">
            Contact our structural coordinators to schedule an overview briefing at our Jayanagar office, where we can inspect site parameters.
          </p>
          <div className="pt-4">
            <Link 
              to="/contact" 
              className="bg-charcoal text-white hover:bg-gold hover:text-charcoal transition-all duration-300 font-mono text-xs uppercase tracking-widest px-8 py-4 inline-block font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 min-h-[44px]"
            >
              Request Private consultation
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
