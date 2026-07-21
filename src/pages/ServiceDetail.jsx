import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SERVICES } from "../data/rightconData";

export default function ServiceDetail() {
  const { id } = useParams();
  
  // Find service by ID or fallback to the first
  const service = SERVICES.find((s) => s.id === id) || SERVICES[0];

  const packagesPricing = {
    construction: {
      price: "₹1,650 - ₹2,150 / sqft",
      timeline: "10 to 14 Months",
      curing: "21 Days water cure logs",
    },
    architecture: {
      price: "Bespoke design index",
      timeline: "2 to 3 Months approvals",
      curing: "AutoCAD & 3D renders",
    },
    insideout: {
      price: "Comprehensive package lock",
      timeline: "Combined site workflow",
      curing: "Bespoke woodwork fitting",
    }
  };

  const currentPricing = packagesPricing[service.id] || packagesPricing.construction;

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
      <section className="relative h-[75vh] flex items-end bg-charcoal text-white overflow-hidden pb-20">
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-40">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover animate-cinematic-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 lg:px-32 w-full space-y-4 fade-up-element visible">
          <span className="font-mono text-xs uppercase tracking-widest text-gold/80 font-medium">
            SERVICE SCOPE // {service.subtitle.toUpperCase()}
          </span>
          <h1 className="font-display font-light text-4xl sm:text-6xl lg:text-7xl tracking-normal uppercase leading-[1.05] text-white">
            {service.title}
          </h1>
        </div>
      </section>

      {/* 2. SPECIFICATION OVERVIEW STRIP */}
      <section className="py-20 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-mono text-xs text-neutral-500 fade-up-element">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-2">PRICING PROFILE</span>
              <span className="text-charcoal font-medium text-sm">{currentPricing.price}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-2">TIMELINE SCHED</span>
              <span className="text-charcoal font-medium text-sm">{currentPricing.timeline}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-2">ENGINEERING CONTROL</span>
              <span className="text-charcoal font-medium text-sm">{currentPricing.curing}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAILED SUMMARY SPLIT */}
      <section className="py-32 md:py-48 bg-white text-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-5 space-y-6 fade-up-element">
              <span className="font-mono text-xs text-gold uppercase tracking-widest block font-medium">01 / CAPABILITY BRIEF</span>
              <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal uppercase leading-tight tracking-tight">
                Engineering & <br />Execution Control
              </h2>
              <p className="text-neutral-500 text-xs md:text-sm leading-relaxed font-light">
                By structuring design and build operations in-house, we remove the scheduling disconnects of regular contracting.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-8 text-neutral-500 text-sm md:text-base leading-relaxed font-light fade-up-element" style={{ transitionDelay: "150ms" }}>
              <p>
                {service.description} Our Jayanagar coordinates manage all structural inspections, ensuring concrete mixes match standard compression ratings before slab pours. All materials are validated against the Rightcon Quality Book standards.
              </p>
              <p>
                We provide fixed-cost locks, fully bound by contract before we break ground, protecting homeowners against mid-project material index escalations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DELIVERABLES SPECS LIST (No boxes, pure whitespace rows) */}
      <section className="py-32 bg-grain border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-16">
          <div className="border-b border-neutral-200/50 pb-6 flex justify-between items-end fade-up-element">
            <h3 className="font-display font-light text-xl text-charcoal uppercase tracking-tight">
              Deliverable Checklist
            </h3>
            <span className="font-mono text-[10px] text-neutral-450">QUALITY CHECK SEC.04</span>
          </div>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10 text-xs text-neutral-550 leading-relaxed font-light fade-up-element" style={{ transitionDelay: "100ms" }}>
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-4 border-b border-neutral-200/40 pb-4">
                <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></span>
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-charcoal uppercase tracking-wider block font-semibold">ITEM 0{idx + 1}</span>
                  <span>{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. PROCESS WORKFLOW FOR SERVICE */}
      <section className="py-32 md:py-48 bg-white text-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block fade-up-element">EXECUTION PROCESS WORKFLOW</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="space-y-4 fade-up-element">
              <span className="font-mono text-xs text-gold font-medium">STAGE 01 / BRIEFING</span>
              <h4 className="font-display font-medium text-xl text-charcoal uppercase tracking-wider">Structural Alignment</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">Reviewing site boundaries, preparing soil profiles, and mapping column loads before casting foundation footprints.</p>
            </div>
            <div className="space-y-4 fade-up-element" style={{ transitionDelay: "100ms" }}>
              <span className="font-mono text-xs text-gold font-medium">STAGE 02 / ANALYSIS</span>
              <h4 className="font-display font-medium text-xl text-charcoal uppercase tracking-wider">Fidelity Casting</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">Monitoring cement mix compression tests, reinforcing concrete frames, and logging water curing metrics systematically.</p>
            </div>
            <div className="space-y-4 fade-up-element" style={{ transitionDelay: "200ms" }}>
              <span className="font-mono text-xs text-gold font-medium">STAGE 03 / HANDOVER</span>
              <h4 className="font-display font-medium text-xl text-charcoal uppercase tracking-wider">Clearance Handover</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">Reviewing finish millwork and electrical fittings against the Quality Book before locking structural guarantees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA CLOSING */}
      <section className="bg-charcoal text-white py-36 md:py-48 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10 fade-up-element">
          <span className="font-mono text-xs uppercase tracking-widest text-gold/80">INQUIRE SERVICE</span>
          <h2 className="font-display font-light text-3xl md:text-5xl text-white uppercase max-w-xl mx-auto leading-tight tracking-tight">
            Ready to engage this service method?
          </h2>
          <p className="text-neutral-400 text-xs leading-relaxed font-light max-w-md mx-auto">
            Schedule an onboarding briefing with our structural civil coordinators. We will evaluate your plot dimensions.
          </p>
          <div className="pt-4">
            <Link 
              to="/contact" 
              className="font-mono text-xs uppercase tracking-widest text-gold border border-gold/30 hover:border-gold px-8 py-4.5 transition-editorial inline-block font-medium"
            >
              Request Office Appointment
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
