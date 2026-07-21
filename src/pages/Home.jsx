import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PROJECTS, CONSTRUCTION_PROCESS, TESTIMONIALS, SERVICES } from "../data/rightconData";
import BrandSignature from "../components/BrandSignature";

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeJourney, setActiveJourney] = useState(0);


  // IntersectionObserver for scroll reveals
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

    const elements = document.querySelectorAll(".fade-up-element, .fade-in-element");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const signatureProject = PROJECTS[0];

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
    <div className="space-y-0 text-charcoal bg-white font-sans antialiased overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO EXPERIENCE */}
      <section className="relative min-h-screen flex flex-col justify-between bg-charcoal text-white overflow-hidden">
        {/* Architecture backdrop */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden opacity-45">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Rightcon Luxury Estate Facade"
            className="w-full h-full object-cover animate-cinematic-zoom-once brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent"></div>
        </div>

        {/*
          Content wrapper:
          - pt-24 clears the fixed 80px navbar without adding visual weight
          - pb-16 keeps it from pressing into the trust bar at the bottom
          - no extra mt/mb that was causing the off-center look
        */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-4 sm:px-6 md:px-20 lg:px-32 w-full pt-28 pb-12 flex-1 flex flex-col justify-center">
          <div className="space-y-5 md:space-y-8 max-w-5xl">

            {/* Tagline + architectural underline (in normal flow, compact) */}
            <div className="flex flex-col items-start gap-2 animate-hero-tagline">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-medium whitespace-nowrap">
                BUILDING PEACE OF MIND
              </span>
              <BrandSignature />
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-[72px] lg:text-[80px] tracking-tight leading-[1.08] text-white animate-hero-title">
              Engineering homes <br className="hidden sm:block" />
              with absolute certainty.
            </h1>

            <p className="text-neutral-300 text-sm md:text-base font-light max-w-2xl leading-relaxed animate-hero-desc">
              Single-point civil accountability. Transparent processes.<br />
              Timeless craftsmanship. Peace of mind, from foundation to finish.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 animate-hero-cta pt-2">
              <Link
                to="/projects"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal bg-gold border border-gold hover:border-white px-6 sm:px-8 py-4 transition-editorial font-medium flex items-center space-x-2 hover:bg-white hover:text-charcoal w-full sm:w-auto justify-center sm:justify-start"
              >
                <span>EXPLORE OUR WORK</span>
                <span>→</span>
              </Link>
              <Link
                to="/about"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/90 hover:text-white pb-1 border-b border-white/30 hover:border-gold transition-editorial flex items-center space-x-2 self-center"
              >
                <span>OUR APPROACH</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Hero Trust Bar */}
        <div className="relative z-20 pb-12 w-full pointer-events-auto hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32">
            <div className="grid grid-cols-5 gap-4 pt-6 border-t border-white/15 text-[9px] font-mono text-neutral-300 uppercase tracking-[0.16em]">
              <div className="flex items-center space-x-3.5">
                <svg className="w-4.5 h-4.5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>FIXED COST CONTRACT</span>
              </div>
              <div className="flex items-center space-x-3.5 border-l border-white/15 pl-6">
                <svg className="w-4.5 h-4.5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>TIMELINE COMMITMENT</span>
              </div>
              <div className="flex items-center space-x-3.5 border-l border-white/15 pl-6">
                <svg className="w-4.5 h-4.5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>QUALITY INSPECTIONS</span>
              </div>
              <div className="flex items-center space-x-3.5 border-l border-white/15 pl-6">
                <svg className="w-4.5 h-4.5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>DEDICATED PROJECT MANAGER</span>
              </div>
              <div className="flex items-center space-x-3.5 border-l border-white/15 pl-6">
                <svg className="w-4.5 h-4.5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>10 YEAR STRUCTURAL WARRANTY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F2EC] py-16 md:py-28 relative border-b border-neutral-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 sm:px-6 md:px-20 lg:px-32">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 md:gap-x-4">
            
            <div className="flex flex-col items-center text-center space-y-2 fade-up-element">
              <h3 className="text-4xl md:text-6xl font-serif font-light text-charcoal/90">12+</h3>
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.18em]">
                YEARS OF<br />EXPERIENCE
              </span>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 md:border-l md:border-neutral-300/40 md:pl-4 fade-up-element" style={{ transitionDelay: "100ms" }}>
              <h3 className="text-4xl md:text-6xl font-serif font-light text-charcoal/90">100+</h3>
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.18em]">
                LUXURY HOMES<br />COMPLETED
              </span>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 md:border-l md:border-neutral-300/40 md:pl-4 fade-up-element" style={{ transitionDelay: "200ms" }}>
              <h3 className="text-4xl md:text-6xl font-serif font-light text-charcoal/90">1</h3>
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.18em]">
                SINGLE POINT<br />ACCOUNTABILITY
              </span>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 md:border-l md:border-neutral-300/40 md:pl-4 fade-up-element" style={{ transitionDelay: "300ms" }}>
              <h3 className="text-4xl md:text-6xl font-serif font-light text-charcoal/90">10</h3>
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.18em]">
                YEAR STRUCTURAL<br />WARRANTY
              </span>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 md:border-l md:border-neutral-300/40 md:pl-4 fade-up-element col-span-2 md:col-span-1" style={{ transitionDelay: "400ms" }}>
              <h3 className="text-4xl md:text-6xl font-serif font-light text-charcoal/90">100%</h3>
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.18em]">
                TRANSPARENT<br />PROCESSES
              </span>
            </div>

          </div>
        </div>
      </section>


      {/* 3. CINEMATIC CENTERPIECE */}
      <section className="relative bg-charcoal text-white overflow-hidden py-24 md:py-32 flex items-center justify-center">
        {/* Serene completed house image */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-35">
          <img 
            src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1920&q=80" 
            alt="Serene living room sanctuary with morning light" 
            className="w-full h-full object-cover scale-100 transition-transform duration-[8000ms] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 w-full">
          <div className="text-center space-y-4 max-w-3xl mx-auto fade-up-element">
            <span className="font-mono text-xs uppercase tracking-widest text-gold/80 block font-medium">OUR PURPOSE</span>
            <h2 className="font-display font-light text-4xl sm:text-6xl md:text-8xl text-white uppercase tracking-tight leading-none">
              Building homes <br />
              families never want <br />
              to leave.
            </h2>
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE PROJECT MOMENT */}
      <section className="bg-charcoal text-white py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-16 relative z-10">
          
          {/* Headline focusing on core trust / experience feel */}
          <div className="space-y-4 max-w-3xl fade-up-element">
            <span className="font-mono text-xs uppercase tracking-widest text-gold/80 block font-medium">EMOTIONAL CENTERPIECE</span>
            <h2 className="font-display font-light text-4xl md:text-6xl text-white uppercase tracking-tight leading-tight">
              A sanctuary of light <br />& absolute quiet.
            </h2>
            <p className="text-neutral-450 text-sm md:text-base leading-relaxed font-light max-w-xl">
              We constructed Sudheendra Residency not merely as a modern G+2 structure, but to solve an architectural puzzle: creating a quiet, sun-drenched sanctuary of peace for the family.
            </p>
          </div>

          {/* Full viewport project image frame with slow transition zoom */}
          <div className="w-full aspect-[16/9] hover-zoom fade-up-element relative">
            <img 
              src={signatureProject.image} 
              alt={signatureProject.title} 
              className="w-full h-full object-cover transition-editorial brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 text-right text-white/80 font-mono text-[9px] uppercase tracking-widest leading-relaxed hidden sm:block">
              <span>Location: Bannerghatta Road, Bangalore</span><br />
              <span>Scale: {signatureProject.builtUpArea} // G+2 Estate</span>
            </div>
          </div>

          {/* Equal 6/6 split — label+title left, body+link right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-8">
            <div className="space-y-6 fade-up-element">
              <span className="font-mono text-xs text-gold uppercase tracking-widest block">01 / ARCHITECTURE FOR TRUST</span>
              <h3 className="font-display font-light text-3xl text-white tracking-tight leading-tight">
                Building to last a century.
              </h3>
            </div>

            <div className="space-y-8 text-neutral-450 text-xs md:text-sm font-light leading-relaxed fade-up-element" style={{ transitionDelay: "150ms" }}>
              <p>
                Prospective homeowners seek one fundamental resolution: that their foundation will remain rock-solid for generations. Our engineers mapped the soil integrity, cast reinforced columns using high-grade Vizag Fe-550 steel, and logged every concrete mix pour to guarantee peace of mind.
              </p>
              <p>
                Behind the double-height visual volumes and the custom teak timber cladding lies a structural framework engineered to withstand urban vibrations and elements, backed by our contract stability lock.
              </p>

              <div>
                <Link
                  to={`/projects/${signatureProject.id}`}
                  className="font-mono text-xs uppercase tracking-widest text-gold border-b border-gold/30 pb-1 hover:text-white hover:border-white transition-editorial"
                >
                  Read the Sudheendra Casing Story →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SERVICES */}
      <section className="bg-white py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-16">
          <div className="space-y-4 max-w-2xl border-b border-neutral-100 pb-8 fade-up-element">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue">WHAT WE DELIVER</span>
            <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal uppercase tracking-tight">
              Construction Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className="flex flex-col gap-8 fade-up-element"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Photo Frame */}
                <div className="w-full aspect-[16/10] bg-neutral-100 relative group hover-zoom">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-editorial"
                  />
                </div>

                {/* Information Panel */}
                <div className="space-y-4">
                  <span className="font-mono text-xs text-gold uppercase tracking-widest block">
                    0{index + 1} / {service.subtitle}
                  </span>
                  <h3 className="font-display font-medium text-2xl text-charcoal tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
                  <Link
                    to={`/services/${service.id}`}
                    className="font-mono text-xs uppercase tracking-widest text-brand-blue border-b border-brand-blue/30 pb-1 hover:text-charcoal hover:border-charcoal transition-editorial inline-block"
                  >
                    Examine Specifications →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY RIGHTCON */}
      <section className="bg-grain py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 relative z-10">
          {/* Equal 6/6 split — heading left, pillars right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

            {/* Left: statement */}
            <div className="space-y-8 lg:sticky top-32 fade-up-element">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-450 block">ENGINEERING ADVANTAGE</span>
              <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal uppercase leading-tight tracking-tight">
                Why construct <br />
                with Rightcon?
              </h2>
              <p className="text-neutral-500 font-light text-sm md:text-base leading-relaxed">
                We replace traditional contractor approximations with professional structural engineering, locked contracts, and radical visual transparency logs.
              </p>
            </div>

            {/* Right: trust pillars */}
            <div className="space-y-12">

              <div className="space-y-3 fade-up-element">
                <span className="font-mono text-xs text-gold uppercase tracking-widest block font-medium">01 / STRUCTURAL ACCOUNTABILITY</span>
                <h3 className="font-display font-medium text-xl text-charcoal">
                  Direct structural audits on steel and concrete.
                </h3>
                <p className="text-neutral-505 text-sm leading-relaxed font-light">
                  Our in-house structural engineers check steel detailing and concrete mix ratios, guaranteeing safety that warrants a ten-year stability guarantee.
                </p>
              </div>

              <div className="space-y-3 fade-up-element">
                <span className="font-mono text-xs text-gold uppercase tracking-widest block font-medium">02 / RADICAL COST LOCKING</span>
                <h3 className="font-display font-medium text-xl text-charcoal">
                  Comprehensive budget transparency without escalations.
                </h3>
                <p className="text-neutral-505 text-sm leading-relaxed font-light">
                  Our estimation protocols itemize every structural footprint, binding the final cost by contract before groundbreaking to prevent mid-project surprises.
                </p>
              </div>

              <div className="space-y-3 fade-up-element">
                <span className="font-mono text-xs text-gold uppercase tracking-widest block font-medium">03 / REAL-TIME PORTAL LOGS</span>
                <h3 className="font-display font-medium text-xl text-charcoal">
                  Digital timeline logs directly to your dashboard.
                </h3>
                <p className="text-neutral-505 text-sm leading-relaxed font-light">
                  Homeowners trace execution progress from anywhere, receiving regular photos, cement pour summaries, and curing metrics directly to their screen.
                </p>
              </div>

              <div className="space-y-3 fade-up-element">
                <span className="font-mono text-xs text-gold uppercase tracking-widest block font-medium">04 / CONTROLLED EXECUTION</span>
                <h3 className="font-display font-medium text-xl text-charcoal">
                  Zero contractor subcontracting leakage.
                </h3>
                <p className="text-neutral-505 text-sm leading-relaxed font-light">
                  All framing, masonry, and custom joinery trades are executed directly by our in-house teams under single-point corporate accountability.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 7. CONSTRUCTION JOURNEY */}
      <section className="bg-white py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-16 relative z-10">
          <div className="space-y-4 fade-up-element">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue">THE ROADMAP</span>
            <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal uppercase tracking-tight">
              The Construction Journey
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Step list left */}
            <div className="w-full lg:w-1/3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 lg:border-r border-neutral-100 pb-4 lg:pb-0 lg:pr-8 scrollbar-none gap-2 fade-up-element">
              {CONSTRUCTION_PROCESS.map((proc, index) => (
                <button
                  key={proc.step}
                  onClick={() => setActiveStep(index)}
                  className={`text-left font-mono text-xs uppercase tracking-wider py-4 px-4 border-l-2 whitespace-nowrap lg:whitespace-normal transition-editorial cursor-pointer ${
                    activeStep === index
                      ? "text-brand-blue border-brand-blue font-medium"
                      : "text-neutral-400 border-transparent hover:text-charcoal"
                  }`}
                >
                  Phase {proc.step} // {proc.phase}
                </button>
              ))}
            </div>

            {/* Display card right */}
            <div className="w-full lg:w-2/3 bg-grain p-8 md:p-16 flex flex-col justify-between min-h-[350px] relative fade-up-element" style={{ transitionDelay: "150ms" }}>
              <div className="space-y-6 pt-4">
                <span className="font-mono text-xs text-brand-blue uppercase tracking-widest block font-medium">
                  PHASE {CONSTRUCTION_PROCESS[activeStep].step}
                </span>
                <h3 className="font-display font-light text-3xl md:text-4xl text-charcoal leading-tight">
                  {CONSTRUCTION_PROCESS[activeStep].headline}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-light max-w-xl">
                  {CONSTRUCTION_PROCESS[activeStep].description}
                </p>
              </div>
              <div className="pt-8 border-t border-neutral-200/50 flex justify-between items-center text-xs font-mono text-neutral-400 mt-8">
                <span>Phase Activity</span>
                <span className="text-charcoal font-medium">Quality Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CRAFTSMANSHIP & MATERIALS */}
      <section className="bg-charcoal text-white py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-16">
          <div className="space-y-4 border-b border-white/10 pb-8 fade-up-element">
            <span className="font-mono text-xs uppercase tracking-widest text-gold/80">UNCOMPROMISING MATERIALS</span>
            <h2 className="font-display font-light text-3xl md:text-5xl uppercase text-white tracking-tight">
              Craftsmanship & Materials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {craftsmanshipMaterials.map((mat, index) => (
              <div key={index} className="flex flex-col justify-between group fade-up-element" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="aspect-square relative hover-zoom">
                  <img 
                    src={mat.image} 
                    alt={mat.title} 
                    className="w-full h-full object-cover transition-editorial grayscale hover:grayscale-0"
                  />
                </div>
                <div className="pt-6 space-y-3">
                  <span className="font-mono text-[10px] text-gold uppercase tracking-widest block font-medium">0{index + 1} / MATERIALS</span>
                  <h3 className="font-display font-medium text-lg text-white uppercase tracking-wider">{mat.title}</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">{mat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FEATURED RESIDENCES */}
      <section className="bg-white py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-8 fade-up-element">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-blue">COMPLETED HOMES</span>
              <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal uppercase tracking-tight">
                Featured Residences
              </h2>
            </div>
            <Link 
              to="/projects" 
              className="font-mono text-xs uppercase tracking-widest text-brand-blue border-b border-brand-blue/30 pb-1 hover:text-charcoal hover:border-charcoal transition-editorial"
            >
              Examine Complete Folio →
            </Link>
          </div>

          {/* Symmetrical 3-equal-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.slice(0, 3).map((proj, idx) => (
              <div key={proj.id} className="space-y-4 fade-up-element" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="aspect-[4/3] w-full relative hover-zoom">
                  <Link to={`/projects/${proj.id}`}>
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-editorial"
                    />
                  </Link>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                    <span>{proj.location}</span>
                    <span>{proj.builtUpArea}</span>
                  </div>
                  <h4 className="font-display font-medium text-xl text-charcoal">
                    <Link to={`/projects/${proj.id}`} className="hover:text-brand-blue transition-colors duration-300">
                      {proj.title}
                    </Link>
                  </h4>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">{proj.challenge}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CLIENT JOURNEY */}
      <section className="bg-grain py-20 md:py-28 border-y border-neutral-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-16">
          <div className="space-y-4 fade-up-element">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue">TRANSPARENT PIPELINE</span>
            <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal uppercase tracking-tight">
              The Client Advisory Journey
            </h2>
          </div>

          {/* Balanced 2-column: steps left, content card right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Steps list */}
            <div className="space-y-6 fade-up-element">
              <p className="text-neutral-555 font-light text-sm leading-relaxed">
                Building a private home should be a rewarding path of precision, not a calendar of stress. Here is our step-by-step communication pipeline:
              </p>
              <div className="space-y-2 pt-4">
                {clientJourneySteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveJourney(idx)}
                    className={`w-full flex items-center justify-between text-left font-mono text-[11px] uppercase py-3 px-3 border-l-2 transition-editorial cursor-pointer ${
                      activeJourney === idx 
                        ? "border-brand-blue text-brand-blue font-medium bg-brand-blue/5" 
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
            <div className="lg:col-span-2 bg-white p-8 md:p-16 border border-neutral-200/50 min-h-[300px] flex flex-col justify-between relative fade-up-element" style={{ transitionDelay: "150ms" }}>
              <div className="space-y-6 pt-2">
                <span className="font-mono text-[10px] text-gold uppercase block font-medium">
                  {clientJourneySteps[activeJourney].phase}
                </span>
                <h3 className="font-display font-light text-3xl text-charcoal leading-tight">
                  {clientJourneySteps[activeJourney].title}
                </h3>
                <p className="text-neutral-555 text-sm leading-relaxed font-light max-w-xl">
                  {clientJourneySteps[activeJourney].desc}
                </p>
              </div>
              
              <div className="pt-8 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-400 mt-8">
                <span>Verification Gate</span>
                <span className="text-brand-blue font-medium">Contract Bind Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. TESTIMONIALS */}
      <section className="bg-white py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-12 fade-up-element">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue">CLIENT ADVOCACY</span>

            <div className="space-y-8">
              <p className="font-display font-light text-2xl md:text-4xl text-charcoal italic leading-relaxed">
                "{TESTIMONIALS[0].quote}"
              </p>
              <div className="w-12 h-px bg-gold/50 mx-auto"></div>
              <div className="space-y-1">
                <h4 className="font-mono text-xs text-charcoal uppercase tracking-widest font-medium">{TESTIMONIALS[0].author}</h4>
                <p className="text-[11px] text-neutral-400 tracking-wider uppercase">{TESTIMONIALS[0].project}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. INSIGHTS */}
      <section className="bg-grain py-20 md:py-28 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8 fade-up-element">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">LATEST ARTICLES</span>
              <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal uppercase tracking-tight">
                Engineering Insights
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {insights.map((art, idx) => (
              <div key={idx} className="flex flex-col justify-between min-h-[280px] bg-white p-8 border border-neutral-200/50 hover:shadow-sm transition-shadow group fade-up-element" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                    <span>{art.cat}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-display font-medium text-xl text-charcoal group-hover:text-gold cursor-pointer transition-editorial leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light">
                    {art.desc}
                  </p>
                </div>
                <div className="pt-6 border-t border-neutral-100 mt-6 flex justify-between items-center">
                  <span className="font-mono text-xs text-brand-blue cursor-pointer group-hover:text-charcoal transition-editorial">
                    Read Article →
                  </span>
                  <span className="text-neutral-400 font-mono text-[10px]">{art.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. CONSULTATION CTA */}
      <section className="bg-charcoal text-white py-24 md:py-32 relative overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" 
            alt="Rightcon bespoke residential build details" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32">
          <div className="max-w-4xl mx-auto text-center space-y-12 fade-up-element">
            <div className="space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-gold/90 bg-gold/10 px-4 py-2 border border-gold/20 inline-block font-medium">
                A PARTNERSHIP FOR CERTAINTY
              </span>
              <h2 className="font-display font-light text-4xl md:text-7xl text-white uppercase tracking-tight leading-[1.1] max-w-3xl mx-auto">
                Your dream home deserves more than a contractor.
              </h2>
              <p className="text-neutral-355 font-light text-sm md:text-base max-w-2xl mx-auto leading-relaxed pt-2">
                It deserves a partner who gives you peace of mind from foundation to finish. We take absolute civil and budget accountability, protecting your investment from cost escalations and builder delays, so you can enjoy the journey of creating your family legacy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link
                to="/contact"
                className="bg-gold text-charcoal hover:bg-white hover:text-charcoal transition-editorial font-mono text-xs uppercase tracking-widest px-10 py-5 text-center w-full sm:w-auto font-medium"
              >
                Book Your Consultation
              </Link>
              <Link
                to="/cost-calculator"
                className="border border-white/20 text-white hover:border-gold hover:text-gold transition-editorial font-mono text-xs uppercase tracking-widest px-10 py-5 text-center w-full sm:w-auto"
              >
                Calculate Project Budget
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

