import { useParams, Link } from "react-router-dom";
import { PROJECTS, TESTIMONIALS } from "../data/rightconData";

export default function ProjectDetail() {
  const { id } = useParams();
  
  // Find project by ID or fallback to the first
  const project = PROJECTS.find((p) => p.id === id) || PROJECTS[0];
  const relatedProjects = PROJECTS.filter((p) => p.id !== project.id);
  
  // Find testimonial matching this project
  const testimonial = TESTIMONIALS.find((t) => t.project.includes(project.title)) || TESTIMONIALS[0];

  return (
    <div className="bg-white pt-24 pb-24 min-h-screen">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[80vh] flex items-end bg-charcoal text-white overflow-hidden pb-16">
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-50">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover animate-[zoomSlow_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 lg:px-32 w-full space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-gold font-semibold">
            CASE RESIDENCE // {project.location.toUpperCase()}
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-normal uppercase leading-[1.05] text-white">
            {project.title}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 mt-20 space-y-24">
        
        {/* 2. SPECIFICATION OVERVIEW STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-y border-neutral-100 font-mono text-xs text-neutral-500">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-1">LOCATION SITE</span>
            <span className="text-charcoal font-semibold">{project.location}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-1">BUILT-UP METRIC</span>
            <span className="text-charcoal font-semibold">{project.builtUpArea}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-1">DESIGN SCALE</span>
            <span className="text-charcoal font-semibold">{project.scale}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-1">STRUCTURE STATUS</span>
            <span className="text-charcoal font-semibold">Handed Over (10-Yr Guarantee Lock)</span>
          </div>
        </div>

        {/* 3. CONTEXT & CHALLENGE SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-gold block">01 / CONTEXT & SCALE</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal uppercase leading-tight">
              THE SITE BRIEFING & ANGLE
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed font-light">
              Designing a high-end private home on Bangalore urban configurations requires maximizing natural illumination while ensuring structural protection. This build combines open-floor engineering plans with high ceilings to draw ventilation across all G+2 levels.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-charcoal font-semibold">THE GEOTECHNICAL CHALLENGE</h3>
                <p className="text-neutral-550 text-xs leading-relaxed font-light">
                  {project.challenge}
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-charcoal font-semibold">THE ENGINEERING RESOLUTION</h3>
                <p className="text-neutral-550 text-xs leading-relaxed font-light">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. STRUCTURAL DETAILS & MATERIAL SPEC */}
        <div className="bg-grain p-8 md:p-12 border border-neutral-100 space-y-8">
          <div className="border-b border-neutral-200 pb-6 flex justify-between items-end">
            <h3 className="font-display font-bold text-lg text-charcoal uppercase">
              TECHNICAL SPECIFICATIONS LOGS
            </h3>
            <span className="font-mono text-[9px] text-neutral-400">QUALITY BOOK SEC.08</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-gold uppercase tracking-wider font-semibold">FOUNDATION FRAME</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">
                Reinforced concrete piles excavated down to hard rock soil levels. Tied column framework using Fe-550 TMT grade steel logs.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-gold uppercase tracking-wider font-semibold">CONCRETE CHEMISTRY</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">
                M30 design mix using 53-grade certified cement. Curing periods monitored on-site and verified via structural compression checks.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-gold uppercase tracking-wider font-semibold">WATERPROOFING SYSTEM</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">
                Polyurethane multi-coat elastomeric waterproofing applied to raw slab decks, sumps, and cantilever elements.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-200">
            <span className="font-mono text-[10px] text-neutral-400 block tracking-widest uppercase mb-3">AUDITED CHECKPOINTS CLEARANCE</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-500 leading-relaxed font-light">
              {project.technicalHighlights.map((feat, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5. STAGGERED PHOTO GALLERY */}
        <div className="space-y-8">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">VISUAL LOG GALLERY</span>
          {project.gallery && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
              {project.gallery[0] && (
                <div className="md:col-span-8 aspect-[16/10] overflow-hidden border border-neutral-200">
                  <img 
                    src={project.gallery[0]} 
                    alt={`${project.title} internal space 1`} 
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-102"
                  />
                </div>
              )}
              {project.gallery[1] && (
                <div className="md:col-span-4 aspect-[3/4] overflow-hidden border border-neutral-200">
                  <img 
                    src={project.gallery[1]} 
                    alt={`${project.title} internal space 2`} 
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-102"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* 6. CLIENT TESTIMONIAL ADVOACY */}
        <div className="bg-charcoal text-white p-8 md:p-16 text-center space-y-8 border border-neutral-800 relative">
          <span className="font-mono text-xs uppercase tracking-widest text-gold">CLIENT SATISFACTION BRIEF</span>
          <p className="font-display font-light text-xl md:text-2xl text-neutral-200 italic max-w-3xl mx-auto leading-relaxed">
            "{testimonial.quote}"
          </p>
          <div className="space-y-1">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-semibold">{testimonial.author}</h4>
            <p className="text-xs text-neutral-500">{testimonial.project}</p>
          </div>
        </div>

        {/* 7. RELATED PROJECTS LINK */}
        <div className="space-y-8 pt-8 border-t border-neutral-100">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">EXAMINE RELATED PROJECTS</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((p) => (
              <Link 
                key={p.id}
                to={`/projects/${p.id}`}
                className="group block border border-neutral-200 p-6 space-y-4 hover:border-gold transition-colors"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-100 border border-neutral-200">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-gold block">{p.location}</span>
                    <h4 className="font-display font-bold text-lg text-charcoal group-hover:text-gold transition-colors">
                      {p.title}
                    </h4>
                  </div>
                  <span className="font-mono text-xs text-gold">View Spec →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
