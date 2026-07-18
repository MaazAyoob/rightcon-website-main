import { useParams, Link } from "react-router-dom";
import { SERVICES } from "../data/rightconData";

export default function ServiceDetail() {
  const { id } = useParams();
  
  // Find service by ID or fallback to the first
  const service = SERVICES.find((s) => s.id === id) || SERVICES[0];

  const packagesPricing = {
    turnkey: {
      price: "₹1,650 - ₹2,150 / sqft",
      timeline: "10 to 14 Months",
      curing: "21 Days water cure logs",
    },
    architectural: {
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

  const currentPricing = packagesPricing[service.id] || packagesPricing.turnkey;

  return (
    <div className="bg-white pt-24 pb-24 min-h-screen">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[65vh] flex items-end bg-charcoal text-white overflow-hidden pb-16">
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-50">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover animate-[zoomSlow_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 lg:px-32 w-full space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-gold font-semibold">
            SERVICE SCOPE // {service.subtitle.toUpperCase()}
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-normal uppercase leading-[1.05] text-white">
            {service.title}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 mt-20 space-y-24">
        
        {/* 2. SPECIFICATION OVERVIEW STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-neutral-100 font-mono text-xs text-neutral-500">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-1">PRICING PROFILE</span>
            <span className="text-charcoal font-semibold">{currentPricing.price}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-1">TIMELINE SCHED</span>
            <span className="text-charcoal font-semibold">{currentPricing.timeline}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block tracking-wider mb-1">ENGINEERING CONTROL</span>
            <span className="text-charcoal font-semibold">{currentPricing.curing}</span>
          </div>
        </div>

        {/* 3. DETAILED SUMMARY SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-gold block">01 / CAPABILITY BRIEF</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal uppercase leading-tight">
              ENGINEERING & EXECUTION CONTROL
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed font-light">
              By structuring design and build operations in-house, we remove the scheduling disconnects of regular contracting. Every stage operates under single-point corporate accountability.
            </p>
          </div>
          <div className="lg:col-span-7 space-y-6 text-neutral-550 text-sm leading-relaxed font-light">
            <p>
              {service.description} Our Jayanagar coordinates manage all structural inspections, ensuring concrete mixes match standard compression ratings before slab pours. All materials are validated against the Rightcon Quality Book standards.
            </p>
            <p>
              We provide fixed-cost locks, fully bound by contract before we break ground, protecting homeowners against mid-project material index escalations.
            </p>
          </div>
        </div>

        {/* 4. DELIVERABLES SPECS BOARD */}
        <div className="bg-grain p-8 md:p-12 border border-neutral-100 space-y-8">
          <div className="border-b border-neutral-200 pb-6 flex justify-between items-end">
            <h3 className="font-display font-bold text-lg text-charcoal uppercase">
              DELIVERABLE INSPECTIONS CHECKLIST
            </h3>
            <span className="font-mono text-[9px] text-neutral-400">QUALITY CHECK SEC.04</span>
          </div>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-neutral-650 leading-relaxed font-light">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 bg-white p-4 border border-neutral-200/50">
                <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2"></span>
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-charcoal uppercase tracking-wider block font-semibold">ITEM 0{idx + 1}</span>
                  <span>{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 5. PROCESS WORKFLOW FOR SERVICE */}
        <div className="space-y-8">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">EXECUTION PROCESS WORKFLOW</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 border border-neutral-150">
              <span className="font-mono text-xs text-gold">STAGE.01</span>
              <h4 className="font-display font-bold text-lg text-charcoal uppercase">Structural Alignment</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">Reviewing site boundaries, preparing soil profiles, and mapping column loads before casting foundation footprints.</p>
            </div>
            <div className="space-y-3 p-6 border border-neutral-150">
              <span className="font-mono text-xs text-gold">STAGE.02</span>
              <h4 className="font-display font-bold text-lg text-charcoal uppercase">Fidelity Casting</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">Monitoring cement mix compression tests, reinforcing concrete frames, and logging water curing metrics systematically.</p>
            </div>
            <div className="space-y-3 p-6 border border-neutral-150">
              <span className="font-mono text-xs text-gold">STAGE.03</span>
              <h4 className="font-display font-bold text-lg text-charcoal uppercase">Clearance Handover</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">Reviewing finish millwork and electrical fittings against the Quality Book before locking structural guarantees.</p>
            </div>
          </div>
        </div>

        {/* 6. CTA CLOSING */}
        <div className="bg-charcoal text-white p-8 md:p-16 text-center space-y-8 border border-neutral-800 relative">
          <span className="font-mono text-xs uppercase tracking-widest text-gold">INQUIRE SERVICE</span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white uppercase max-w-xl mx-auto leading-tight">
            READY TO ENGAGE THIS SERVICE METHOD?
          </h2>
          <p className="text-neutral-400 text-xs leading-relaxed font-light max-w-md mx-auto">
            Schedule an onboarding briefing with our structural civil coordinators. We will evaluate your plot dimensions.
          </p>
          <div className="pt-4">
            <Link 
              to="/contact" 
              className="bg-gold text-charcoal hover:bg-white hover:text-charcoal transition-colors duration-300 font-mono text-xs uppercase tracking-widest px-8 py-4 inline-block font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 min-h-[44px]"
            >
              Request Office Appointment
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
