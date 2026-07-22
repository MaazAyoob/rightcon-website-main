import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS, CUSTOMER_STORIES } from "../data/rightconData";
import BrandSignature from "../components/BrandSignature";
import MetallicElement from "../components/MetallicElement";
import ConsultationModal from "../components/ConsultationModal";
import ProcessModal from "../components/ProcessModal";
import PowerplayModal from "../components/PowerplayModal";
import QualityChecksModal from "../components/QualityChecksModal";
import VideoLightboxModal from "../components/VideoLightboxModal";
import { useReveal } from "../motion/useReveal";

export default function Home() {
  // Modal states
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isProcessOpen, setIsProcessOpen] = useState(false);
  const [isPowerplayOpen, setIsPowerplayOpen] = useState(false);
  const [isQualityOpen, setIsQualityOpen] = useState(false);
  
  // Video Lightbox states
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  const [isVideoLightboxOpen, setIsVideoLightboxOpen] = useState(false);

  // Section 3: Journey active step state
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);

  // Centralized once-only scroll reveals
  useReveal(".fade-up-element, .fade-in-element, .scale-in-element");


  // Smooth scroll handler for Secondary CTA
  const scrollToJourney = () => {
    const section = document.getElementById("construction-journey");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Section 3: Your Construction Journey steps (Preserved Exactly from PRD)
  const journeySteps = [
    {
      stepNumber: "01",
      title: "1. Consultation",
      heading: "Consultation",
      desc: "We understand your requirements, budget, lifestyle, and answer all your questions before getting started."
    },
    {
      stepNumber: "02",
      title: "2. Site Visit",
      heading: "Site Visit",
      desc: "Our team visits your site to understand the plot, surroundings, site conditions, and project requirements."
    },
    {
      stepNumber: "03",
      title: "3. Design",
      heading: "Design",
      desc: "Our architects design a home that's tailored to your needs, balancing functionality, aesthetics, and your budget."
    },
    {
      stepNumber: "04",
      title: "4. Package / BOQ",
      heading: "Package / BOQ",
      desc: "Choose the approach that suits you best. Build with one of our carefully curated packages or opt for a customised BOQ with complete clarity on materials, specifications, quantities, and costs."
    },
    {
      stepNumber: "05",
      title: "5. Agreement",
      heading: "Agreement",
      desc: "Once everything is finalized, we prepare the agreement, define the scope of work, and assign a dedicated project team to your home."
    },
    {
      stepNumber: "06",
      title: "6. Construction",
      heading: "Construction",
      desc: "Construction begins with structured planning, technology-driven project management, regular updates, and 150 documented quality checkpoints."
    },
    {
      stepNumber: "07",
      title: "7. Handover",
      heading: "Handover",
      desc: "After final inspections and quality approvals, we hand over your completed home along with the necessary documentation."
    }
  ];

  // Dynamic Featured Projects from Dataset
  const featuredProjects = PROJECTS.slice(0, 3);

  // Dynamic Customer Stories from Dataset
  const customerStories = CUSTOMER_STORIES;

  // Video Lightbox Navigation
  const handleOpenStory = (index) => {
    setSelectedStoryIndex(index);
    setIsVideoLightboxOpen(true);
  };

  const handleNextStory = () => {
    if (selectedStoryIndex !== null) {
      setSelectedStoryIndex((selectedStoryIndex + 1) % customerStories.length);
    }
  };

  return (
    <div className="space-y-0 text-charcoal dark:text-white bg-white dark:bg-charcoal font-sans antialiased overflow-x-hidden transition-colors duration-300">
      
      {/* ==================================================
          SECTION 1: HERO SECTION
          ================================================== */}
      <section 
        aria-label="Hero Section"
        className="relative hero-dvh flex flex-col justify-between bg-white dark:bg-charcoal text-charcoal dark:text-white transition-colors duration-300 overflow-hidden border-b border-neutral-200 dark:border-neutral-800"
      >
        <div className="relative z-10 responsive-container w-full pt-32 sm:pt-36 pb-16 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              {/* Eyebrow Tag + Brand Signature */}
              <div className="flex flex-col items-start gap-3 animate-hero-tagline">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-blue dark:text-gold font-semibold whitespace-nowrap">
                  BUILDING PEACE OF MIND
                </span>
                <BrandSignature />
              </div>

              {/* H1 Headline (Preserved Exactly from PRD - Fluid Sizing) */}
              <h1 className="font-display font-bold text-fluid-hero tracking-tight text-charcoal dark:text-white animate-hero-title">
                Building a home <br className="hidden sm:block" />
                shouldn't be stressful.
              </h1>

              {/* Lead Paragraph Subheading (Preserved Exactly from PRD - Fluid Sizing) */}
              <p className="text-neutral-600 dark:text-neutral-300 text-fluid-lead font-light max-w-[62ch] leading-relaxed animate-hero-desc">
                We'll help you understand the cost, the process, and every decision before construction begins, so you can build with confidence.
              </p>

              {/* Action Buttons Container */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 animate-hero-cta">
                {/* Primary CTA (Black Anodized Aluminium with subtle hairline light reflection sweep) */}
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="btn-anodized-black min-h-[48px] cursor-pointer focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label="Book a Free Consultation"
                >
                  <span>Book a Free Consultation</span>
                  <span className="ml-2">→</span>
                </button>

                {/* Secondary CTA (Minimal Outline) */}
                <button
                  onClick={scrollToJourney}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-brand-blue dark:text-gold border border-brand-blue/30 dark:border-gold/30 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-brand-blue dark:hover:border-gold px-8 py-4 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 min-h-[48px] cursor-pointer rounded-xs focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold"
                  aria-label="See How We Work"
                >
                  <span>See How We Work</span>
                  <span>↓</span>
                </button>
              </div>
            </div>

            {/* Right Architectural Photography Showcase (Mounted Photo Frame) */}
            <div className="lg:col-span-5 hidden lg:block animate-hero-desc">
              <div className="mounted-photo-frame aspect-[4/5] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                  alt="Rightcon Architectural Estate Entrance" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Architectural Trust Metrics Bar */}
        <div className="relative z-20 pb-12 w-full hidden lg:block border-t border-neutral-200 dark:border-neutral-800 pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
            <div className="grid grid-cols-4 gap-6 text-[10px] font-mono text-neutral-600 dark:text-neutral-300 uppercase tracking-[0.18em]">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-brand-blue dark:bg-gold flex-shrink-0"></span>
                <span>BOQ-FIRST COST CLARITY</span>
              </div>
              <div className="flex items-center space-x-3 border-l border-neutral-200 dark:border-neutral-800 pl-6">
                <span className="w-2 h-2 rounded-full bg-brand-blue dark:bg-gold flex-shrink-0"></span>
                <span>POWERPLAY TECH DASHBOARD</span>
              </div>
              <div className="flex items-center space-x-3 border-l border-neutral-200 dark:border-neutral-800 pl-6">
                <span className="w-2 h-2 rounded-full bg-brand-blue dark:bg-gold flex-shrink-0"></span>
                <span>150 DOCUMENTED AUDITS</span>
              </div>
              <div className="flex items-center space-x-3 border-l border-neutral-200 dark:border-neutral-800 pl-6">
                <span className="w-2 h-2 rounded-full bg-brand-blue dark:bg-gold flex-shrink-0"></span>
                <span>10-YEAR STRUCTURAL BOND</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Shadow Gap Divider */}
      <div className="architectural-shadow-gap" />

      {/* ==================================================
          SECTION 2: WHY HOMEOWNERS CHOOSE RIGHTCON
          ================================================== */}
      <section 
        aria-label="Why Homeowners Choose Rightcon"
        className="bg-neutral-50 dark:bg-neutral-900 text-charcoal dark:text-white py-16 sm:py-24 md:py-32 relative overflow-hidden transition-colors duration-300 border-b border-neutral-200 dark:border-neutral-800"
      >
        <div className="responsive-container space-y-12 md:space-y-16 relative z-10">
          
          {/* Section Header (Preserved Exactly from PRD) */}
          <div className="space-y-4 max-w-3xl fade-up-element">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold font-semibold block">
              THE RIGHTCON DIFFERENCE
            </span>
            <h2 className="font-display font-bold text-fluid-h2 text-charcoal dark:text-white tracking-tight">
              Why Homeowners Choose Rightcon
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-fluid-lead font-light leading-relaxed max-w-[65ch]">
              Building a home is one of the biggest decisions you'll ever make. We've built our entire process to make it clear, transparent, and stress-free from day one.
            </p>
          </div>

          {/* 6 Responsive Cards (2x3 Grid on Desktop, 1-Column on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: BOQ-First Construction */}
            <div className="bg-white dark:bg-neutral-800/90 p-8 border border-neutral-200 dark:border-neutral-700/80 hover:border-brand-blue/40 dark:hover:border-gold/40 hover:-translate-y-1.5 shadow-sm hover:shadow-xl transition-all duration-300 group rounded-xs flex flex-col justify-between fade-up-element">
              <div className="space-y-4">
                <span className="font-mono text-xs text-brand-blue dark:text-gold uppercase tracking-widest block font-semibold">01 / SPECIFICATION</span>
                <h3 className="font-display font-bold text-xl text-charcoal dark:text-white group-hover:text-brand-blue dark:group-hover:text-gold transition-colors">
                  BOQ-First Construction
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm font-light leading-relaxed">
                  Every home is unique. That's why we begin with a detailed BOQ, giving you complete clarity on materials, specifications, quantities, and costs before construction begins.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-700/60 mt-6 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>Material & Cost Lock</span>
                <span className="text-brand-blue dark:text-gold font-bold">100% Fixed</span>
              </div>
            </div>

            {/* Card 2: Two Carefully Curated Packages */}
            <div className="bg-white dark:bg-neutral-800/90 p-8 border border-neutral-200 dark:border-neutral-700/80 hover:border-brand-blue/40 dark:hover:border-gold/40 hover:-translate-y-1.5 shadow-sm hover:shadow-xl transition-all duration-300 group rounded-xs flex flex-col justify-between fade-up-element" style={{ transitionDelay: "100ms" }}>
              <div className="space-y-4">
                <span className="font-mono text-xs text-brand-blue dark:text-gold uppercase tracking-widest block font-semibold">02 / FLEXIBILITY</span>
                <h3 className="font-display font-bold text-xl text-charcoal dark:text-white group-hover:text-brand-blue dark:group-hover:text-gold transition-colors">
                  Two Carefully Curated Packages
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm font-light leading-relaxed">
                  Choose from our two thoughtfully designed construction packages or build your home with a customised BOQ approach.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-700/60 mt-6 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>Custom or Curated</span>
                <span className="text-brand-blue dark:text-gold font-bold">Tailored Specs</span>
              </div>
            </div>

            {/* Card 3: Dedicated Team */}
            <div className="bg-white dark:bg-neutral-800/90 p-8 border border-neutral-200 dark:border-neutral-700/80 hover:border-brand-blue/40 dark:hover:border-gold/40 hover:-translate-y-1.5 shadow-sm hover:shadow-xl transition-all duration-300 group rounded-xs flex flex-col justify-between fade-up-element" style={{ transitionDelay: "200ms" }}>
              <div className="space-y-4">
                <span className="font-mono text-xs text-brand-blue dark:text-gold uppercase tracking-widest block font-semibold">03 / EXPERT GOVERNANCE</span>
                <h3 className="font-display font-bold text-xl text-charcoal dark:text-white group-hover:text-brand-blue dark:group-hover:text-gold transition-colors">
                  Dedicated Team
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm font-light leading-relaxed">
                  Every project is managed by a dedicated team of architects, engineers, project managers, and site engineers working together from design to handover.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-700/60 mt-6 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>In-House Specialists</span>
                <span className="text-brand-blue dark:text-gold font-bold">Zero Subcontracting</span>
              </div>
            </div>

            {/* Card 4: Proven Construction Process (Interactive Timeline Modal On Click) */}
            <button
              onClick={() => setIsProcessOpen(true)}
              className="bg-white dark:bg-neutral-800/90 p-8 border border-neutral-200 dark:border-neutral-700/80 hover:border-brand-blue dark:hover:border-gold hover:-translate-y-1.5 shadow-sm hover:shadow-xl transition-all duration-300 group rounded-xs flex flex-col justify-between text-left cursor-pointer fade-up-element focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold"
              style={{ transitionDelay: "300ms" }}
              aria-label="Open Proven Construction Process Modal"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-brand-blue dark:text-gold uppercase tracking-widest font-semibold">04 / WORKFLOW</span>
                  <span className="px-2 py-0.5 text-[9px] font-mono bg-brand-blue/10 dark:bg-gold/10 text-brand-blue dark:text-gold rounded border border-brand-blue/20 dark:border-gold/20">INTERACTIVE TIMELINE</span>
                </div>
                <h3 className="font-display font-bold text-xl text-charcoal dark:text-white group-hover:text-brand-blue dark:group-hover:text-gold transition-colors">
                  Proven Construction Process
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm font-light leading-relaxed">
                  Every project follows a structured construction journey with dedicated meetings, technical reviews, site studies, and milestone-based execution.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-700/60 mt-6 flex items-center justify-between text-xs font-mono text-brand-blue dark:text-gold font-semibold">
                <span>Explore Timeline Modal</span>
                <span className="group-hover:translate-x-1 transition-transform">View Stages →</span>
              </div>
            </button>

            {/* Card 5: Technology Driven (Interactive Powerplay Modal On Click) */}
            <button 
              onClick={() => setIsPowerplayOpen(true)}
              className="bg-white dark:bg-neutral-800/90 p-8 border border-neutral-200 dark:border-neutral-700/80 hover:border-brand-blue dark:hover:border-gold hover:-translate-y-1.5 shadow-sm hover:shadow-xl transition-all duration-300 group rounded-xs flex flex-col justify-between text-left cursor-pointer fade-up-element focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold"
              style={{ transitionDelay: "400ms" }}
              aria-label="Open Powerplay Technology Portal Modal"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-brand-blue dark:text-gold uppercase tracking-widest font-semibold">05 / DIGITAL INTEGRATION</span>
                  <span className="px-2 py-0.5 text-[9px] font-mono bg-brand-blue/10 dark:bg-gold/10 text-brand-blue dark:text-gold rounded border border-brand-blue/20 dark:border-gold/20">POWERPLAY PORTAL</span>
                </div>
                <h3 className="font-display font-bold text-xl text-charcoal dark:text-white group-hover:text-brand-blue dark:group-hover:text-gold transition-colors">
                  Technology Driven
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm font-light leading-relaxed">
                  We use Powerplay to manage project progress, procurement, purchase lifecycle, approvals, timelines, and team coordination, keeping every project organised and on track.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-700/60 mt-6 flex items-center justify-between text-xs font-mono text-brand-blue dark:text-gold font-semibold">
                <span>Preview Powerplay Dashboard</span>
                <span className="group-hover:translate-x-1 transition-transform">Launch Portal →</span>
              </div>
            </button>

            {/* Card 6: 150 Documented Quality Checks (Interactive Checklist Modal On Click) */}
            <button 
              onClick={() => setIsQualityOpen(true)}
              className="bg-white dark:bg-neutral-800/90 p-8 border border-neutral-200 dark:border-neutral-700/80 hover:border-brand-blue dark:hover:border-gold hover:-translate-y-1.5 shadow-sm hover:shadow-xl transition-all duration-300 group rounded-xs flex flex-col justify-between text-left cursor-pointer fade-up-element focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold"
              style={{ transitionDelay: "500ms" }}
              aria-label="Open 150 Quality Checks Modal"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-brand-blue dark:text-gold uppercase tracking-widest font-semibold">06 / ENGINEERING RIGOR</span>
                  <span className="px-2 py-0.5 text-[9px] font-mono bg-brand-blue/10 dark:bg-gold/10 text-brand-blue dark:text-gold rounded border border-brand-blue/20 dark:border-gold/20">150 CHECKPOINTS</span>
                </div>
                <h3 className="font-display font-bold text-xl text-charcoal dark:text-white group-hover:text-brand-blue dark:group-hover:text-gold transition-colors">
                  150 Documented Quality Checks
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm font-light leading-relaxed">
                  Our engineers follow 150 documented quality checkpoints across every stage of construction to ensure your home is built the right way.
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-700/60 mt-6 flex items-center justify-between text-xs font-mono text-brand-blue dark:text-gold font-semibold">
                <span>View Quality Checklist</span>
                <span className="group-hover:translate-x-1 transition-transform">Open Audits →</span>
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3: YOUR CONSTRUCTION JOURNEY
          ================================================== */}
      <section 
        id="construction-journey"
        aria-label="Your Construction Journey"
        className="bg-white dark:bg-charcoal text-charcoal dark:text-white py-24 md:py-32 relative overflow-hidden transition-colors duration-300 border-b border-neutral-200 dark:border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 space-y-16 relative z-10">
          
          <div className="space-y-4 max-w-3xl fade-up-element">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold font-semibold block">
              SEQUENTIAL ROADMAP
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal dark:text-white tracking-tight">
              Your Construction Journey
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-base font-light leading-relaxed max-w-[65ch]">
              Walk through the sequential process of building with Rightcon, instilling confidence and transparency at every step.
            </p>
          </div>

          {/* Stepper Container — Responsive Desktop Horizontal Stepper + Mobile Vertical Timeline Ladder */}
          <div className="space-y-12">
            
            {/* Desktop Horizontal Stepper Bar */}
            <div className="hidden lg:block border-b border-neutral-200 dark:border-neutral-800 pb-8 fade-up-element">
              <div className="grid grid-cols-7 gap-2 relative">
                {/* Structural Steel I-Beam Track Line */}
                <div className="absolute top-1/2 left-0 right-0 structural-beam-track -translate-y-1/2 z-0"></div>

                {journeySteps.map((step, idx) => {
                  const isActive = activeJourneyStep === idx;
                  return (
                    <button
                      key={step.stepNumber}
                      onClick={() => setActiveJourneyStep(idx)}
                      className="relative z-10 flex flex-col items-center text-center space-y-3 cursor-pointer group transition-all focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold rounded"
                      aria-label={`Select Stage ${step.stepNumber}: ${step.heading}`}
                    >
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                          isActive
                            ? "bg-brand-blue text-white dark:bg-gold dark:text-charcoal scale-110 shadow-lg ring-4 ring-brand-blue/20 dark:ring-gold/20"
                            : "bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-500 group-hover:border-brand-blue dark:group-hover:border-gold group-hover:text-charcoal dark:group-hover:text-white"
                        }`}
                      >
                        {step.stepNumber}
                      </div>
                      <span className={`font-display text-xs font-medium uppercase tracking-wider transition-colors ${
                        isActive
                          ? "text-brand-blue dark:text-gold font-bold"
                          : "text-neutral-500 group-hover:text-charcoal dark:group-hover:text-white"
                      }`}>
                        {step.heading}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Journey Step Detail Display Card (Desktop & Tablet) */}
            <div className="hidden md:block bg-neutral-50 dark:bg-neutral-900 p-8 md:p-12 border border-neutral-200 dark:border-neutral-800 rounded-xs relative fade-up-element">
              <div className="space-y-4 max-w-3xl">
                <span className="font-mono text-xs text-brand-blue dark:text-gold uppercase tracking-widest font-semibold block">
                  STAGE {journeySteps[activeJourneyStep].stepNumber} // {journeySteps[activeJourneyStep].heading}
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-charcoal dark:text-white">
                  {journeySteps[activeJourneyStep].title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed font-light max-w-[65ch]">
                  {journeySteps[activeJourneyStep].desc}
                </p>
              </div>

              <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-500 mt-8">
                <span>Stage Milestone Quality Clearance</span>
                <span className="text-brand-blue dark:text-gold font-semibold">100% Documented</span>
              </div>
            </div>

            {/* Mobile Vertical Timeline Ladder Layout (Stacked Single-Column) */}
            <div className="block md:hidden space-y-6">
              {journeySteps.map((step) => (
                <div 
                  key={step.stepNumber}
                  className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xs space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-full bg-brand-blue text-white dark:bg-gold dark:text-charcoal font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {step.stepNumber}
                    </span>
                    <h3 className="font-display font-bold text-lg text-charcoal dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 font-light leading-relaxed pl-11">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Architectural Shadow Gap Divider */}
      <div className="architectural-shadow-gap" />

      {/* ==================================================
          SECTION 4: FEATURED PROJECTS
          ================================================== */}
      <section 
        aria-label="Featured Projects"
        className="bg-neutral-50 dark:bg-neutral-900 text-charcoal dark:text-white py-24 md:py-32 relative transition-colors duration-300 border-b border-neutral-200 dark:border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 space-y-16 relative z-10">
          
          {/* Section Header (Preserved Exactly from PRD) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-8 fade-up-element">
            <div className="space-y-4 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold font-semibold block">
                COMPLETED RESIDENCES
              </span>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal dark:text-white tracking-tight">
                Homes We're Proud to Have Built
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 text-base font-light leading-relaxed max-w-[65ch]">
                Every home tells a different story. Here are a few projects that reflect our commitment to quality, thoughtful design, and exceptional execution.
              </p>
            </div>

            <Link
              to="/projects"
              className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold border-b border-brand-blue/30 dark:border-gold/30 pb-1 hover:text-charcoal dark:hover:text-white hover:border-charcoal dark:hover:border-white transition-all font-semibold whitespace-nowrap self-start md:self-auto focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold"
            >
              View All Projects →
            </Link>
          </div>

          {/* Dynamic 3-Column Project Grid (Mounted Photo Frames) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((proj, idx) => (
              <div 
                key={proj.id} 
                className="bg-white dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700/80 rounded-xs overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 fade-up-element"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div>
                  <div className="p-2">
                    <div className="aspect-[4/3] w-full relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 mounted-photo-frame">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono text-gold uppercase tracking-wider rounded-xs z-10">
                        {proj.stage}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                      <span>{proj.location}</span>
                      <span>{proj.builtUpArea}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-charcoal dark:text-white group-hover:text-brand-blue dark:group-hover:text-gold transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-xs font-light leading-relaxed line-clamp-2">
                      {proj.challenge || "Custom luxury residential construction by Rightcon with engineered foundations and premium finishes."}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-neutral-100 dark:border-neutral-700/60 mt-4">
                  <Link
                    to={`/projects/${proj.id}`}
                    className="font-mono text-xs uppercase tracking-wider text-brand-blue dark:text-gold hover:text-charcoal dark:hover:text-white font-semibold flex items-center justify-between group-hover:translate-x-1 transition-transform focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold"
                  >
                    <span>View Project</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Section CTA Button */}
          <div className="text-center pt-6 fade-up-element">
            <Link
              to="/projects"
              className="inline-block font-mono text-xs uppercase tracking-[0.18em] text-brand-blue dark:text-gold border border-brand-blue/40 dark:border-gold/40 hover:bg-brand-blue hover:text-white dark:hover:bg-gold dark:hover:text-charcoal px-10 py-4 font-semibold transition-all duration-300 shadow-sm rounded-xs focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold"
            >
              [ View All Projects ]
            </Link>
          </div>

        </div>
      </section>

      {/* Architectural Shadow Gap Divider */}
      <div className="architectural-shadow-gap" />

      {/* ==================================================
          SECTION 5: CUSTOMER STORIES
          ================================================== */}
      <section 
        aria-label="Customer Stories"
        className="bg-white dark:bg-charcoal text-charcoal dark:text-white py-24 md:py-32 relative overflow-hidden transition-colors duration-300 border-b border-neutral-200 dark:border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 space-y-16 relative z-10">
          
          {/* Section Header (Preserved Exactly from PRD) */}
          <div className="space-y-4 max-w-3xl fade-up-element">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold font-semibold block">
              AUTHENTIC TESTIMONIALS
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal dark:text-white tracking-tight">
              Hear It From the Families We've Built For
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-base font-light leading-relaxed max-w-[65ch]">
              Every home has a story, and every family has a different experience. Here's what a few of our homeowners had to say about building with Rightcon.
            </p>
          </div>

          {/* Video Cards Layout (3 Cards Data-Driven Architecture) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customerStories.map((story, idx) => (
              <button 
                key={story.id}
                onClick={() => handleOpenStory(idx)}
                className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xs overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 text-left cursor-pointer fade-up-element focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold"
                style={{ transitionDelay: `${idx * 150}ms` }}
                aria-label={`Watch testimonial story for ${story.customerName}`}
              >
                <div>
                  <div className="p-2">
                    {/* Video Thumbnail Frame + Large Play Button */}
                    <div className="aspect-video w-full relative overflow-hidden bg-neutral-900 mounted-photo-frame">
                      <img
                        src={story.thumbnail}
                        alt={story.customerName}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-12 h-12 rounded-full bg-brand-blue/90 text-white dark:bg-gold/90 dark:text-charcoal flex items-center justify-center text-base font-mono pl-0.5 shadow-lg group-hover:scale-110 transition-transform">
                          ▶
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-[10px] font-mono text-white/90 uppercase tracking-widest z-20">
                        {story.location}
                      </div>
                    </div>
                  </div>

                  {/* Customer Info & Quote */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-display font-bold text-xl text-charcoal dark:text-white group-hover:text-brand-blue dark:group-hover:text-gold transition-colors">
                      {story.customerName}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm font-light italic leading-relaxed">
                      "{story.quote}"
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-neutral-200/60 dark:border-neutral-800 mt-4 flex justify-between items-center text-xs font-mono text-brand-blue dark:text-gold font-semibold">
                  <span>Watch Video Story</span>
                  <span className="group-hover:translate-x-1 transition-transform">Play →</span>
                </div>
              </button>
            ))}
          </div>

          {/* Section CTA Banner (Preserved Exactly from PRD) */}
          <div className="bg-neutral-900 text-white p-8 md:p-12 border border-neutral-800 rounded-xs flex flex-col md:flex-row items-center justify-between gap-8 fade-up-element">
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold font-semibold block">
                BUILD YOUR FAMILY LEGACY
              </span>
              <h3 className="font-display font-bold text-xl md:text-3xl text-white tracking-tight">
                Ready to Start Your Home Building Journey? Join the families who trusted Rightcon to build their dream home.
              </h3>
            </div>

            <button
              onClick={() => setIsConsultationOpen(true)}
              className="btn-anodized-black min-h-[48px] cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-gold"
            >
              Book a Free Consultation
            </button>
          </div>

        </div>
      </section>

      {/* Architectural Shadow Gap Divider */}
      <div className="architectural-shadow-gap" />

      {/* ==================================================
          SECTION 6: FINAL CTA SECTION
          ================================================== */}
      <section 
        aria-label="Final Call to Action"
        className="bg-neutral-100 dark:bg-neutral-950 text-charcoal dark:text-white py-24 md:py-36 relative overflow-hidden transition-colors duration-300"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="max-w-4xl mx-auto text-center space-y-10 fade-up-element">
            
            {/* Heading & Subheading (Preserved Exactly from PRD) */}
            <div className="space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold bg-brand-blue/10 dark:bg-gold/10 px-4 py-2 border border-brand-blue/20 dark:border-gold/20 inline-block font-semibold">
                DIRECT CONTACT PATHS
              </span>
              <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-charcoal dark:text-white tracking-tight leading-[1.08]">
                Ready to Build Your Dream Home?
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 font-light text-base md:text-lg max-w-[62ch] mx-auto leading-relaxed">
                Whether you're just getting started or already have plans in hand, we're here to make your home building journey clear, transparent, and stress-free.
              </p>
            </div>

            {/* Multiple Contact Buttons Layout */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              
              {/* Primary Button (Black Anodized CTA) */}
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="btn-anodized-black min-h-[50px] w-full sm:w-auto cursor-pointer focus-visible:ring-2 focus-visible:ring-gold"
              >
                Book a Free Consultation
              </button>

              {/* Secondary Buttons: Call Us & WhatsApp Us */}
              <a
                href="tel:+919886012345"
                className="border border-brand-blue/40 text-brand-blue hover:bg-neutral-200 dark:border-white/40 dark:text-white dark:hover:border-gold dark:hover:text-gold transition-all duration-300 font-mono text-xs uppercase tracking-widest px-8 py-4 text-center w-full sm:w-auto font-semibold cursor-pointer rounded-xs focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold"
              >
                Call Us
              </a>

              <a
                href="https://wa.me/919606592959"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-300 font-mono text-xs uppercase tracking-widest px-8 py-4 text-center w-full sm:w-auto font-semibold shadow-md hover:scale-105 cursor-pointer rounded-xs focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================
          MODAL COMPONENTS ARCHITECTURE
          ================================================== */}
      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <ProcessModal 
        isOpen={isProcessOpen}
        onClose={() => setIsProcessOpen(false)}
      />

      <PowerplayModal 
        isOpen={isPowerplayOpen}
        onClose={() => setIsPowerplayOpen(false)}
      />

      <QualityChecksModal 
        isOpen={isQualityOpen}
        onClose={() => setIsQualityOpen(false)}
      />

      <VideoLightboxModal 
        isOpen={isVideoLightboxOpen}
        onClose={() => setIsVideoLightboxOpen(false)}
        story={selectedStoryIndex !== null ? customerStories[selectedStoryIndex] : null}
        onNextStory={handleNextStory}
        onBookConsultation={() => setIsConsultationOpen(true)}
      />

    </div>
  );
}
