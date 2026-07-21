import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PROJECTS, TESTIMONIALS } from "../data/rightconData";

export default function ProjectDetail() {
  const { id } = useParams();
  
  // Find project by ID or fallback to the first
  const project = PROJECTS.find((p) => p.id === id) || PROJECTS[0];
  const relatedProjects = PROJECTS.filter((p) => p.id !== project.id);
  
  // Find testimonial matching this project
  const testimonial = TESTIMONIALS.find((t) => t.project.includes(project.title)) || TESTIMONIALS[0];

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
  }, [id]); // Reset observer on route change

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[85vh] flex items-end bg-charcoal text-white overflow-hidden pb-24">
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-40">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover animate-cinematic-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 w-full space-y-4 fade-up-element visible">
          <span className="font-mono text-xs uppercase tracking-widest text-gold/80 font-medium">
            CASE RESIDENCE // {project.location.toUpperCase()}
          </span>
          <h1 className="font-display font-light text-4xl sm:text-6xl lg:text-8xl tracking-tight uppercase leading-[1.02] text-white">
            {project.title}
          </h1>
        </div>
      </section>

      {/* 2. EDITORIAL STORY SECTION */}
      <section className="py-32 md:py-48 bg-white text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-6 fade-up-element">
              <span className="font-mono text-xs text-gold uppercase tracking-widest block font-medium">01 / THE STORY</span>
              <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal uppercase leading-tight tracking-tight">
                Crafting <br />
                living sanctuary.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-neutral-500 text-sm md:text-base font-light leading-relaxed fade-up-element" style={{ transitionDelay: "150ms" }}>
              <p>
                Every private home we construct is conceived as an enduring family sanctuary. Beyond physical concrete structures, we focus on the emotional relationship between natural light, spatial volumes, and the people who inhabit them.
              </p>
              <p>
                The design coordinates for this estate emphasize high, open ceilings that welcome the morning breeze, casting shifting shadows over seasoned teak wood panels and raw structural pillars throughout the day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESIGN PHILOSOPHY SECTION */}
      <section className="py-32 md:py-48 bg-grain text-charcoal border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-6 fade-up-element">
              <span className="font-mono text-xs text-gold uppercase tracking-widest block font-medium">02 / PHILOSOPHY</span>
              <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal uppercase leading-tight tracking-tight">
                The Site Brief <br />
                & Orientation
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-12 fade-up-element" style={{ transitionDelay: "150ms" }}>
              <p className="text-neutral-500 text-sm md:text-base font-light leading-relaxed">
                Constructing premium homes on Bangalore's dense urban parameters demands strategic window and volume placement. We utilize light wells and cantilevers to capture cool air, blocking busy street traffic noise while preserving direct, quiet light paths.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-neutral-200/50 pt-12">
                <div className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-charcoal font-semibold">THE GEOTECHNICAL CHALLENGE</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light">{project.challenge}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-charcoal font-semibold">THE ARCHITECTURAL RESPONSE</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light">{project.solution}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONSTRUCTION JOURNEY SECTION */}
      <section className="py-32 md:py-48 bg-white text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-6 fade-up-element">
              <span className="font-mono text-xs text-gold uppercase tracking-widest block font-medium">03 / CHRONOLOGY</span>
              <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal uppercase leading-tight tracking-tight">
                Fidelity <br />
                in Execution
              </h2>
              <p className="text-neutral-500 font-light text-xs md:text-sm leading-relaxed max-w-sm">
                We execute every project in sequential engineering stages, keeping construction metrics tightly audited.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-12 fade-up-element" style={{ transitionDelay: "150ms" }}>
              <div className="space-y-4 border-l border-neutral-100 pl-8 relative">
                <span className="absolute -left-1.5 top-2 w-2.5 h-2.5 bg-gold rounded-full"></span>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block">STAGE 01 — SETUP</span>
                <h4 className="font-sans font-medium text-lg text-charcoal">Geotechnical Foundation Mapping</h4>
                <p className="text-neutral-500 text-xs font-light leading-relaxed">
                  Soil bearing capability reports guide structural excavations down to hard stratum, casting concrete columns reinforced by Fe-550 TMT grade logs.
                </p>
              </div>
              <div className="space-y-4 border-l border-neutral-100 pl-8 relative">
                <span className="absolute -left-1.5 top-2 w-2.5 h-2.5 bg-gold rounded-full"></span>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block">STAGE 02 — STRUCTURE</span>
                <h4 className="font-sans font-medium text-lg text-charcoal">Precision Framing & Pouring</h4>
                <p className="text-neutral-500 text-xs font-light leading-relaxed">
                  Each floor slab concrete mix undergoes design lab compression audits, cured continuously for 21 days with structural log verification.
                </p>
              </div>
              <div className="space-y-4 border-l border-neutral-100 pl-8 relative">
                <span className="absolute -left-1.5 top-2 w-2.5 h-2.5 bg-gold rounded-full"></span>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block">STAGE 03 — CLEARANCE</span>
                <h4 className="font-sans font-medium text-lg text-charcoal">System Handover & Stability Seal</h4>
                <p className="text-neutral-500 text-xs font-light leading-relaxed">
                  Handing over complete documentation logs, material invoices, plumbing routes, and registering the official 10-Year stability warranty bond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PHOTO GALLERY SECTION (Asymmetric spreads) */}
      {project.gallery && (
        <section className="py-32 bg-grain border-y border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-16">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block fade-up-element">04 / VISUAL ARCHIVE</span>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
              {project.gallery[0] && (
                <div className="md:col-span-8 aspect-[16/10] overflow-hidden bg-neutral-100 hover-zoom fade-up-element">
                  <img 
                    src={project.gallery[0]} 
                    alt={`${project.title} space 1`} 
                    className="w-full h-full object-cover transition-editorial"
                  />
                </div>
              )}
              {project.gallery[1] && (
                <div className="md:col-span-4 aspect-[3/4] overflow-hidden bg-neutral-100 hover-zoom fade-up-element" style={{ transitionDelay: "150ms" }}>
                  <img 
                    src={project.gallery[1]} 
                    alt={`${project.title} space 2`} 
                    className="w-full h-full object-cover transition-editorial"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6. MATERIALS SECTION */}
      <section className="py-32 md:py-48 bg-white text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-6 fade-up-element">
              <span className="font-mono text-xs text-gold uppercase tracking-widest block font-medium">05 / MATERIALITY</span>
              <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal uppercase leading-tight tracking-tight">
                Honest <br />
                Material Choice
              </h2>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 fade-up-element" style={{ transitionDelay: "150ms" }}>
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">TMT Structural steel</h4>
                <p className="text-neutral-500 text-xs leading-relaxed font-light">Vizag Fe-550 TMT grade steel logs constructed with custom lap-lengths to manage stress and shear dynamics.</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">High-Strength Concrete</h4>
                <p className="text-neutral-500 text-xs leading-relaxed font-light">Design mix cement concrete structures with regular crushing test validation audits at slab castings.</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">Bespoke Timber Joinery</h4>
                <p className="text-neutral-500 text-xs leading-relaxed font-light">Hand-selected, kiln-seasoned teak wood frames and details crafted by master carpenters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TECHNICAL SPECIFICATIONS SECTION (Quiet parameters at bottom) */}
      <section className="py-24 md:py-32 bg-grain border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-16">
          <div className="border-b border-neutral-200/60 pb-6 flex justify-between items-end fade-up-element">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">06 / ENGINEERING PROTOCOLS</span>
            <span className="font-mono text-[9px] text-neutral-450">STABILITY INDEX SEC.08</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-mono text-xs text-neutral-500 fade-up-element" style={{ transitionDelay: "100ms" }}>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-2">Location</span>
              <span className="text-charcoal font-medium">{project.location}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-2">Built-up Area</span>
              <span className="text-charcoal font-medium">{project.builtUpArea}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-2">Structural Scale</span>
              <span className="text-charcoal font-medium">{project.scale}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-2">Stability Bond</span>
              <span className="text-charcoal font-medium">10-Year structural lock warranty</span>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-200/50 fade-up-element" style={{ transitionDelay: "200ms" }}>
            <span className="font-mono text-[10px] text-neutral-400 block tracking-widest uppercase mb-4">Inspection checkpoints cleared:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-550 leading-relaxed font-light">
              {project.technicalHighlights.map((feat, idx) => (
                <li key={idx} className="flex items-center space-x-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. CLIENT TESTIMONIAL & CTA SECTION */}
      <section className="bg-charcoal text-white py-32 md:py-48 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10 fade-up-element">
          <span className="font-mono text-xs uppercase tracking-widest text-gold/80">07 / CLIENT EXPERIENCE</span>
          <p className="font-display font-light text-2xl md:text-3xl text-neutral-200 italic leading-relaxed">
            "{testimonial.quote}"
          </p>
          <div className="space-y-1">
            <h4 className="font-mono text-xs text-white uppercase tracking-widest font-medium">{testimonial.author}</h4>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{testimonial.project}</p>
          </div>
        </div>
      </section>

      {/* RELATED PROJECTS */}
      <section className="py-32 bg-white text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block fade-up-element">Related residencies</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {relatedProjects.slice(0, 2).map((p, idx) => (
              <Link 
                key={p.id}
                to={`/projects/${p.id}`}
                className="group block space-y-6 fade-up-element"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-50 hover-zoom">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-editorial"
                  />
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-gold block">{p.location}</span>
                    <h4 className="font-sans font-medium text-xl text-charcoal group-hover:text-gold transition-colors">
                      {p.title}
                    </h4>
                  </div>
                  <span className="font-mono text-xs text-gold">View Spec →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

