import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PROJECTS, CONSTRUCTION_PROCESS, TESTIMONIALS, COMPANY_METRICS, SERVICES } from "../data/rightconData";

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeJourney, setActiveJourney] = useState(0);

  // Counter animation simulation
  const [counts, setCounts] = useState({ experience: 0, homes: 0, checks: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounts({
        experience: Math.min(15, Math.floor((15 / steps) * currentStep)),
        homes: Math.min(200, Math.floor((200 / steps) * currentStep)),
        checks: Math.min(150, Math.floor((150 / steps) * currentStep)),
      });

      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const signatureProject = PROJECTS[0]; // Sudheendra Residency

  const clientJourneySteps = [
    {
      phase: "PHASE 01",
      title: "First Briefing",
      desc: "Meeting at our Jayanagar headquarters to establish site parameters, target configurations, and spatial needs.",
    },
    {
      phase: "PHASE 02",
      title: "Architectural Drafting",
      desc: "Our in-house design studio drafts bespoke layout blueprints and compiles 3D facade renders.",
    },
    {
      phase: "PHASE 03",
      title: "Contract Cost Lock",
      desc: "A comprehensive contract is signed, securing material grades and final project cost. No price escalations.",
    },
    {
      phase: "PHASE 04",
      title: "Geotechnical Setup",
      desc: "Soil bearing capacity checks, site marking, excavation plans, and structural logistics alignment.",
    },
    {
      phase: "PHASE 05",
      title: "Execution Logs",
      desc: "Reinforcement audits, cement mix compression tests, and photo logs updated regularly on your client dashboard.",
    },
    {
      phase: "PHASE 06",
      title: "Quality Book Clearance",
      desc: "On-site engineers review our 150+ inspection checkpoints spanning structural, plumbing, and finish items.",
    },
    {
      phase: "PHASE 07",
      title: "Key Handover & Warranty",
      desc: "Formal handover of project documents, keys, structural details, and the 10-Year Guarantee certificate.",
    },
  ];

  const craftsmanshipMaterials = [
    {
      title: "Structural Concrete",
      desc: "M30-grade design concrete mixes, cured systematically and tested for ultimate compression load capacity.",
      image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Reinforced Steel",
      desc: "Primary Vizag Fe-550 TMT steel bars tied with structural offsets to manage building load distribution.",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Waterproofing Envelopes",
      desc: "Multi-layered elastomeric membranes applied to sumps, bathrooms, and terrace areas to prevent leaks.",
      image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Teakwood & Joinery",
      desc: "Hand-selected, seasoned teakwood frames and premium cladding customized by experienced craftsmen.",
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const insights = [
    {
      title: "Concrete Compression Tiers in Residential Architecture",
      cat: "Engineering Spec",
      date: "July 2026",
      readTime: "6 Min Read",
      desc: "A structural guide explaining compression tests, concrete ratios, and curing schedules required for multi-level private frames.",
    },
    {
      title: "The Courtyard Concept: Optimizing Urban Plots for Natural Light",
      cat: "Architecture Design",
      date: "June 2026",
      readTime: "8 Min Read",
      desc: "How structural light wells and open courtyards can reduce home temperatures while keeping inner living rooms private.",
    },
    {
      title: "Why Turnkey Contracts Prevent Project Cost Escalation",
      cat: "Management Log",
      date: "May 2026",
      readTime: "5 Min Read",
      desc: "Analyzing material logistics, price indexes, and how systemized builders prevent budget overruns during execution.",
    },
  ];

  return (
    <div className="space-y-0 text-charcoal bg-white font-sans antialiased">
      
      {/* 1. HERO SECTION (Timeless, Clean Architectural Composition) */}
      <section className="relative min-h-[95vh] lg:min-h-screen flex items-end bg-charcoal text-white pt-32 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
            alt="Rightcon Luxury Estate Facade" 
            className="w-full h-full object-cover scale-100 transition-transform duration-[6000ms] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 lg:px-32 w-full space-y-8">
          <div className="space-y-4 max-w-5xl">
            <div className="flex items-center space-x-3">
              <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-gold">
                RESIDENTIAL BUILDERS
              </span>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-normal leading-[1.02] text-white">
              ENGINEERING HOMES WITH ABSOLUTE PRECISION.
            </h1>
          </div>
          
          <p className="text-neutral-300 text-sm md:text-lg lg:text-xl font-light max-w-2xl leading-relaxed">
            Rightcon constructs premium bespoke residences across Bangalore and Mysore. We combine design architecture with institutional engineering, backed by our structural warranty.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link 
              to="/contact" 
              className="bg-gold text-charcoal hover:bg-white hover:text-charcoal font-mono text-xs uppercase tracking-widest px-8 py-4.5 transition-colors duration-300 text-center font-semibold"
            >
              Request Private Consultation
            </Link>
            <Link 
              to="/projects" 
              className="border border-white/30 text-white hover:border-gold hover:text-gold font-mono text-xs uppercase tracking-widest px-8 py-4.5 transition-colors duration-300 text-center"
            >
              Examine Completed Residencies
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUST INDICATORS (Prismatic Data Sheet Metrics) */}
      <section className="bg-white border-y border-neutral-100 py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            
            <div className="space-y-3 border-l border-neutral-200 pl-6">
              <span className="font-mono text-xs text-gold uppercase tracking-wider block">01 / EXPERIENCE</span>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-charcoal">{counts.experience}+ Years</h3>
              <p className="text-neutral-500 text-xs tracking-wide leading-relaxed font-light">
                Proven civil engineering history constructing custom structures in South India.
              </p>
            </div>

            <div className="space-y-3 border-l border-neutral-200 pl-6">
              <span className="font-mono text-xs text-gold uppercase tracking-wider block">02 / PORTFOLIO</span>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-charcoal">{counts.homes}+ Homes</h3>
              <p className="text-neutral-500 text-xs tracking-wide leading-relaxed font-light">
                Completed private residences handed over to satisfied families.
              </p>
            </div>

            <div className="space-y-3 border-l border-neutral-200 pl-6">
              <span className="font-mono text-xs text-gold uppercase tracking-wider block">03 / COMPLIANCE</span>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-charcoal">{counts.checks}+ checks</h3>
              <p className="text-neutral-500 text-xs tracking-wide leading-relaxed font-light">
                Strict quality milestones recorded in our digital handover Quality Book.
              </p>
            </div>

            <div className="space-y-3 border-l border-neutral-200 pl-6">
              <span className="font-mono text-xs text-gold uppercase tracking-wider block">04 / WARRANTY</span>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-charcoal">{COMPANY_METRICS.structuralWarranty}</h3>
              <p className="text-neutral-500 text-xs tracking-wide leading-relaxed font-light">
                Ten-year structural stability lock signed and bound by official corporate contract.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SIGNATURE PROJECT (Cinematic Split Showcase - G+2 Sudheendra) */}
      <section className="bg-charcoal text-white py-24 md:py-36 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-16 relative z-10">
          <div className="flex justify-between items-end border-b border-neutral-800 pb-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-gold">CINEMATIC SHOWCASE</span>
              <h2 className="font-display font-bold text-3xl md:text-5xl uppercase text-white leading-tight">
                SIGNATURE RESIDENCE
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 lg:block hidden">BANGALORE // BANNERGHATTA</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-7 overflow-hidden group aspect-[16/10] bg-neutral-800 relative">
              <img 
                src={signatureProject.image} 
                alt={signatureProject.title} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
              />
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                <span className="font-mono text-xs text-gold uppercase tracking-widest block">
                  {signatureProject.location} // {signatureProject.scale}
                </span>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-white">
                  {signatureProject.title}
                </h3>
                
                {/* Material Tiers */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["ACC 53 Grade Concrete", "Fe-550 Steel", "Bespoke Joinery", "Astral plumbing"].map((tag) => (
                    <span key={tag} className="font-mono text-[9px] uppercase border border-neutral-800 bg-neutral-900/50 px-2.5 py-1 text-neutral-450">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-neutral-455 text-sm md:text-base leading-relaxed font-light">
                  {signatureProject.solution} This estate features high ceilings, custom wood cladding, and structural steel integrations designed to maximize natural lighting on a suburban Bangalore plot.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-neutral-800 pt-6">
                <div>
                  <span className="font-mono text-[10px] uppercase text-neutral-500 block">BUILT-UP AREA</span>
                  <span className="text-white text-sm font-semibold">{signatureProject.builtUpArea}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-neutral-500 block">FOUNDATION SPEC</span>
                  <span className="text-white text-sm font-semibold">RCC Pile & Column Frame</span>
                </div>
              </div>

              <div className="pt-4">
                <Link 
                  to="/projects" 
                  className="bg-gold text-charcoal hover:bg-white hover:text-charcoal transition-colors duration-300 font-mono text-xs uppercase tracking-widest px-8 py-4 inline-block font-semibold"
                >
                  Examine Case Study Spec
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SERVICES (Alternating Large Layouts - Restored Spacing) */}
      <section className="bg-white py-24 md:py-36 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-24">
          <div className="space-y-3 max-w-2xl border-b border-neutral-100 pb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">WHAT WE DELIVER</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal uppercase">
              CONSTRUCTION CAPABILITIES
            </h2>
          </div>

          <div className="space-y-32">
            {SERVICES.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={service.id}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Photo Frame */}
                  <div className="w-full lg:w-1/2 overflow-hidden aspect-[16/10] bg-neutral-100 relative group border border-neutral-200">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-103"
                    />
                  </div>

                  {/* Information Panel */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <span className="font-mono text-xs text-gold font-semibold uppercase tracking-wider block">
                      0{index + 1} / {service.subtitle}
                    </span>
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-charcoal tracking-tight">
                      {service.title}
                    </h3>
                    
                    {/* Key Spec Tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.slice(0, 3).map((del) => (
                        <span key={del} className="font-mono text-[9px] border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-neutral-500">
                          {del.split(" & ")[0].split(" and ")[0]}
                        </span>
                      ))}
                    </div>

                    <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-light">
                      {service.description}
                    </p>
                    <div className="pt-4 flex items-center space-x-6">
                      <Link 
                        to="/services" 
                        className="font-mono text-xs uppercase tracking-widest text-gold border-b border-gold pb-1 hover:text-charcoal hover:border-charcoal transition-colors"
                      >
                        Examine Deliverable Checklists
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHY RIGHTCON (Split-screen layout replacing grids) */}
      <section className="bg-grain border-y border-neutral-100 py-24 md:py-36 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left side: Bold typography statement */}
            <div className="lg:col-span-5 space-y-6 sticky top-32">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-450 block">ENGINEERING ADVANTAGE</span>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal uppercase leading-tight">
                WHY CONSTRUCT WITH RIGHTCON?
              </h2>
              <div className="w-16 h-0.5 bg-gold"></div>
              <p className="text-neutral-550 font-light text-sm md:text-base leading-relaxed max-w-md">
                We replace traditional contractor approximations with professional structural engineering, locked contracts, and radical visual transparency logs.
              </p>
            </div>

            {/* Right side: Stacked, numbered trust pillars */}
            <div className="lg:col-span-7 space-y-12 pl-0 lg:pl-12">
              
              <div className="space-y-4 border-b border-neutral-200 pb-8 relative group">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-bold text-xl text-charcoal uppercase group-hover:text-gold transition-colors duration-300">
                    01 / Structural Accountability
                  </h3>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">
                  Our in-house structural engineers check steel detailing and concrete mix ratios, guaranteeing safety that warrants a ten-year stability guarantee.
                </p>
              </div>

              <div className="space-y-4 border-b border-neutral-200 pb-8 relative group">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-bold text-xl text-charcoal uppercase group-hover:text-gold transition-colors duration-300">
                    02 / Radical Cost Locking
                  </h3>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">
                  Our estimation protocols itemize every structural footprint, binding the final cost by contract before groundbreaking to prevent mid-project surprises.
                </p>
              </div>

              <div className="space-y-4 border-b border-neutral-200 pb-8 relative group">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-bold text-xl text-charcoal uppercase group-hover:text-gold transition-colors duration-300">
                    03 / Real-Time Portal Logs
                  </h3>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">
                  Homeowners trace execution progress from anywhere, receiving regular photos, cement pour summaries, and curing metrics directly to their screen.
                </p>
              </div>

              <div className="space-y-4 pb-8 relative group">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-bold text-xl text-charcoal uppercase group-hover:text-gold transition-colors duration-300">
                    04 / Controlled Execution
                  </h3>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">
                  All framing, masonry, and custom joinery trades are executed directly by our in-house teams under single-point corporate accountability.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. CONSTRUCTION JOURNEY (Interactive Timeline) */}
      <section className="bg-white py-24 md:py-36 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-16 relative z-10">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">THE ROADMAP</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal uppercase">
              THE CONSTRUCTION JOURNEY
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Step list left */}
            <div className="w-full lg:w-1/3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 lg:border-r border-neutral-150 pb-4 lg:pb-0 lg:pr-8 scrollbar-none gap-2">
              {CONSTRUCTION_PROCESS.map((proc, index) => (
                <button
                  key={proc.step}
                  onClick={() => setActiveStep(index)}
                  className={`text-left font-display font-bold text-sm md:text-base uppercase tracking-wider py-3.5 px-4 border-l-2 whitespace-nowrap lg:whitespace-normal transition-all duration-300 ${
                    activeStep === index
                      ? "text-gold border-gold bg-gold/5"
                      : "text-neutral-400 border-transparent hover:text-charcoal"
                  }`}
                >
                  {proc.step} // {proc.phase}
                </button>
              ))}
            </div>

            {/* Display card right */}
            <div className="w-full lg:w-2/3 bg-grain p-8 md:p-12 border border-neutral-100 flex flex-col justify-between min-h-[300px] relative">
              {/* Thin gold timeline accent line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-neutral-200">
                <div 
                  className="h-full bg-gold transition-all duration-500" 
                  style={{ width: `${((activeStep + 1) / CONSTRUCTION_PROCESS.length) * 100}%` }}
                ></div>
              </div>

              <div className="space-y-6 pt-4">
                <span className="font-mono text-xs text-gold uppercase tracking-widest block font-semibold">
                  PHASE {CONSTRUCTION_PROCESS[activeStep].step}
                </span>
                <h3 className="font-display font-bold text-3xl text-charcoal leading-none">
                  {CONSTRUCTION_PROCESS[activeStep].headline}
                </h3>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-light">
                  {CONSTRUCTION_PROCESS[activeStep].description}
                </p>
              </div>
              <div className="pt-8 border-t border-neutral-200 flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>Phase Activity</span>
                <span className="text-charcoal font-semibold">Quality Verified ✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CRAFTSMANSHIP & MATERIALS (Uncompromising Specs Showcase - Restored Spacing Grid) */}
      <section className="bg-charcoal text-white py-24 md:py-36 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-16">
          <div className="space-y-3 text-center lg:text-left border-b border-neutral-800 pb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-gold">UNCOMPROMISING MATERIALS</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl uppercase text-white leading-tight">
              CRAFTSMANSHIP & MATERIALS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {craftsmanshipMaterials.map((mat, index) => (
              <div key={index} className="bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col justify-between group hover:border-gold/20 transition-all duration-300">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={mat.image} 
                    alt={mat.title} 
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-102 grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="p-6 md:p-8 space-y-4">
                  <span className="font-mono text-xs text-gold">0{index + 1}</span>
                  <h3 className="font-display font-bold text-lg text-white uppercase">{mat.title}</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">{mat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FEATURED RESIDENCES (Asymmetric Editorial Gallery) */}
      <section className="bg-white py-24 md:py-36 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">COMPLETED HOMES</span>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal uppercase">
                FEATURED RESIDENCES
              </h2>
            </div>
            <Link 
              to="/projects" 
              className="font-mono text-xs uppercase tracking-widest text-gold border-b border-gold pb-1 hover:text-charcoal hover:border-charcoal transition-colors"
            >
              Examine Complete Folio
            </Link>
          </div>

          {/* Asymmetric gallery composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Project 1 (Wide display, occupies 7/12) */}
            <div className="lg:col-span-7 group flex flex-col justify-between space-y-4">
              <Link to="/projects">
                <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-150 relative border border-neutral-200">
                  <img 
                    src={PROJECTS[0].image} 
                    alt={PROJECTS[0].title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-charcoal text-xs font-mono uppercase tracking-widest px-4 py-2 border border-neutral-200">
                      View Spec Sheet
                    </span>
                  </div>
                </div>
              </Link>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase">
                  <span>{PROJECTS[0].location}</span>
                  <span>{PROJECTS[0].builtUpArea}</span>
                </div>
                <h4 className="font-display font-bold text-xl text-charcoal group-hover:text-gold transition-colors">
                  {PROJECTS[0].title}
                </h4>
              </div>
            </div>

            {/* Projects 2 & 3 (Stacked vertical cards, occupies 5/12) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              {PROJECTS.slice(1, 3).map((proj) => (
                <div key={proj.id} className="group flex flex-row items-center gap-6 border-b border-neutral-100 pb-6 last:border-0 last:pb-0">
                  <Link to="/projects" className="w-1/3 aspect-square overflow-hidden bg-neutral-150 relative block border border-neutral-200">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                    />
                  </Link>
                  <div className="w-2/3 space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400 uppercase">
                      <span>{proj.location}</span>
                    </div>
                    <h4 className="font-display font-bold text-base text-charcoal group-hover:text-gold transition-colors">
                      {proj.title}
                    </h4>
                    <p className="text-neutral-500 text-xs font-light line-clamp-2">{proj.challenge}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 9. CLIENT JOURNEY (Interactive Weekly Update Timeline) */}
      <section className="bg-grain py-24 md:py-36 border-y border-neutral-100 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-16">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">TRANSPARENT PIPELINE</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal uppercase">
              THE CLIENT ADVISORY JOURNEY
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Steps overview column left */}
            <div className="space-y-4 lg:col-span-1 border-r border-neutral-200 pr-8">
              <p className="text-neutral-600 font-light text-sm md:text-base leading-relaxed">
                Building a private home should be a rewarding path of precision, not a calendar of stress. Here is our step-by-step communication pipeline:
              </p>
              <div className="space-y-2 pt-6">
                {clientJourneySteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveJourney(idx)}
                    className={`w-full flex items-center justify-between text-left font-mono text-xs uppercase py-2.5 px-3 border-l-2 transition-all ${
                      activeJourney === idx 
                        ? "border-gold text-gold font-medium bg-gold/5" 
                        : "border-transparent text-neutral-400 hover:text-charcoal"
                    }`}
                  >
                    <span>0{idx + 1} / {step.title}</span>
                    <span>{activeJourney === idx ? "→" : ""}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step illustration details right */}
            <div className="lg:col-span-2 bg-white p-8 md:p-12 border border-neutral-155 min-h-[250px] flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4 pt-2">
                <span className="font-mono text-[10px] text-gold uppercase block font-semibold">
                  {clientJourneySteps[activeJourney].phase}
                </span>
                <h3 className="font-display font-bold text-3xl text-charcoal leading-none">
                  {clientJourneySteps[activeJourney].title}
                </h3>
                <p className="text-neutral-550 text-sm md:text-base leading-relaxed font-light">
                  {clientJourneySteps[activeJourney].desc}
                </p>
              </div>
              
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-400 mt-6">
                <span>Verification Gate</span>
                <span className="text-gold font-semibold">Contract Bind Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS (Editorial Quotes) */}
      <section className="bg-white py-24 md:py-36 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">CLIENT ADVOCACY</span>
          
          <div className="space-y-6">
            <p className="font-display font-light text-xl md:text-3xl text-charcoal italic leading-relaxed">
              "{TESTIMONIALS[0].quote}"
            </p>
            <div className="w-8 h-0.5 bg-gold mx-auto"></div>
            <div className="space-y-1">
              <h4 className="font-mono text-sm text-charcoal uppercase tracking-widest font-semibold">{TESTIMONIALS[0].author}</h4>
              <p className="text-xs text-neutral-450">{TESTIMONIALS[0].project}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. INSIGHTS (Educational Content) */}
      <section className="bg-grain py-24 md:py-36 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">LATEST ARTICLES</span>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal uppercase">
                ENGINEERING INSIGHTS
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insights.map((art, idx) => (
              <div key={idx} className="bg-white p-8 border border-neutral-150 flex flex-col justify-between hover:shadow-md transition-shadow group">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase">
                    <span>{art.cat}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-charcoal group-hover:text-gold cursor-pointer transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light">
                    {art.desc}
                  </p>
                </div>
                <div className="pt-6 border-t border-neutral-100 mt-6 flex justify-between items-center">
                  <span className="font-mono text-xs text-gold cursor-pointer group-hover:text-charcoal transition-colors">
                    Read Article
                  </span>
                  <span className="text-neutral-300 font-mono text-[9px]">{art.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CONSULTATION CTA (Premium Closing Section) */}
      <section className="bg-charcoal text-white py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" 
            alt="Rightcon bespoke residential build details" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-10">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-gold bg-gold/10 px-3 py-1.5 border border-gold/20 inline-block">
              COMMENCE YOUR BRIEFING
            </span>
            <h2 className="font-display font-bold text-3xl md:text-6xl text-white uppercase leading-tight">
              ESTABLISH YOUR HOUSE LEGACY.
            </h2>
            <p className="text-neutral-450 font-light text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Let's schedule a design and budget overview session. We will evaluate your site dimensions and prepare structural draft parameters.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-gold text-charcoal hover:bg-white hover:text-charcoal transition-colors duration-300 font-mono text-xs uppercase tracking-widest px-8 py-4.5 text-center w-full sm:w-auto font-semibold"
            >
              Book Office Briefing
            </Link>
            <Link 
              to="/cost-calculator" 
              className="border border-white/20 text-white hover:border-gold hover:text-gold transition-colors duration-300 font-mono text-xs uppercase tracking-widest px-8 py-4.5 text-center w-full sm:w-auto"
            >
              Calculate Project Cost
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
