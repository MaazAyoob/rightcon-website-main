import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useScrollSystem } from '../context/ScrollContext';
import { optimizeUnsplashUrl } from '../utils/image';
import { SERVICES_DATA, PROJECTS_DATA } from '../data/mockData';
import Footer from '../components/UI/Footer';

// Dynamic consult mappings
const CONSULTATIVE_MAPPING = {
  "turnkey": {
    target: "Homeowners seeking single-point structural responsibility, zero contractor finger-pointing, and absolute visual transparency.",
    problems: "Solves fragmented subcontractor scheduling, uncoordinated drawings, sudden billing changes, and construction timeline inflation.",
    execution: "We compile geomechanical audits, generate LOD 400 virtual twin models, contract all specialized masons directly, and coordinate everyday onsite casting under our 10-Year structural deed of warranty.",
    difference: "Most builders contract out coordination. Rightcon manages all geomechanical core tests and concrete cube tests in-house with full transparency."
  },
  "architecture": {
    target: "Clients prioritizing volumetric light transitions, exposed raw concrete, and honest spatial layouts without fake skins.",
    problems: "Solves dark interior spaces, poor cross-ventilation, and layouts that lack structural flow.",
    execution: "We analyze solar coordinates, design structural mass envelopes, and coordinate structural frames with timber screen lattices to regulate natural light.",
    difference: "We design structures where the structure is the finish. There is no fake plaster or veneer hiding structural mistakes."
  },
  "interior-design": {
    target: "Homeowners demanding authentic tactile details, customized solid wood joinery, and natural quarry-cut stone finishes.",
    problems: "Solves peeling plastic laminates, low-durability MDF elements, and generic visual themes.",
    execution: "We sketch details of timber-to-concrete joints, direct-source natural stone slabs, and coordinate custom brass fittings in-house.",
    difference: "We enforce a zero-veneer policy. Every timber surface is solid, dried wood; every stone is solid quarry block."
  },
  "boq-audits": {
    target: "Developers and owners seeking absolute material audit transparency before pouring foundations.",
    problems: "Solves inflated builder estimations, material supply theft, and sudden post-contract invoices.",
    execution: "We audit structural drawings, calculate rebar steel metrics using IS_456 codes, and compile itemized Bills of Quantities.",
    difference: "Our estimators coordinate directly with laboratory checks, providing concrete volume limits that match physical calculations."
  },
  "structural-engineering": {
    target: "Individuals building on complex geotechnical conditions (clay, slopes) requiring certified geomechanical safety.",
    problems: "Solves structural settlement cracks, foundation shifts, and unverified concrete structural limits.",
    execution: "We drill geotechnical soil cores up to 12m deep, test soil bearing capacities, and model foundation rafts in 3D CAD platforms.",
    difference: "We coordinate design directly with geomechanics. Every column is backed by certified laboratory compression tests."
  },
  "project-management": {
    target: "Owners requiring strict day-to-day supervision of rebar offsets, curing schedules, and structural compliance.",
    problems: "Solves bad concrete curing, misaligned steel configurations, and uncertified contractor handovers.",
    execution: "We station site engineers, log compression cube samples on day 7 and 28, and record daily telemetry files in our digital registry.",
    difference: "We check concrete with laboratory pressure crush tests on every single pour."
  },
  "material-procurement": {
    target: "Homeowners seeking direct mill and quarry material provenance without intermediate contractor markups.",
    problems: "Solves fake material grades, structural timber warping, and middleman billing inflation.",
    execution: "We audit quarries in Italy, purchase high-density wood logs, verify Fe550D steel mill certificates, and manage logistics to site.",
    difference: "We provide direct vendor invoices to the client, guaranteeing zero hidden markups on raw materials."
  },
  "bim-coordination": {
    target: "Complex residential estates requiring seamless MEP piping and structural beam integration.",
    problems: "Solves drilling through freshly poured load beams and pipeline collision delays.",
    execution: "We pre-assemble structural, mechanical, electrical, and plumbing drawings into unified 3D virtual twins at LOD 400 specifications.",
    difference: "We coordinate and resolve clashes in virtual space before a single column is cast on site."
  }
};

export default function ServiceDetail() {
  const { id } = useParams();
  const { isMobile, setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();

  // Find service
  const service = SERVICES_DATA.find(s => s.id === id);
  const consult = CONSULTATIVE_MAPPING[id] || {
    target: "Homeowners seeking specialized structural planning.",
    problems: "Solves coordination delays and material waste.",
    execution: "We audit layout plans and manage coordinates.",
    difference: "We operate on structural transparency and geomechanical tests."
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(5); // Target Services mascot coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [id, setActiveScene, setMascotPose, setMascotEmotion]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center font-mono text-xs text-white bg-charcoal">
        <span>[ERROR: SERVICE_NOT_FOUND]</span>
        <Link to="/services" className="underline mt-4 text-accent uppercase">Back to Index</Link>
      </div>
    );
  }

  // Find some related projects to link to
  const relatedProjects = PROJECTS_DATA.slice(0, 2);

  return (
    <div className="w-full flex flex-col bg-charcoal text-white selection:bg-primary selection:text-white pt-space-96 select-none font-sans">
      
      {/* BREADCRUMBS */}
      <div className="px-space-24 md:px-space-40 max-w-7xl mx-auto w-full z-10">
        <nav className="breadcrumb-nav">
          <Link to="/" className="breadcrumb-link">HOME</Link>
          <span>/</span>
          <Link to="/services" className="breadcrumb-link">SERVICES</Link>
          <span>/</span>
          <span className="text-accent font-semibold">{service.category.toUpperCase()}</span>
          <span>/</span>
          <span className="text-white/40">{service.title.toUpperCase()}</span>
        </nav>
      </div>

      {/* 1. SERVICE HERO */}
      <section className="py-space-64 px-space-24 md:px-space-40 max-w-7xl mx-auto w-full relative z-10">
        <h1 className="font-display text-4xl md:text-7xl font-light text-white leading-none mt-space-24 uppercase tracking-wide">
          {service.title}
        </h1>
        
        <div className="w-full aspect-[21/9] overflow-hidden border border-white/10 rounded-none mt-space-40 relative bg-charcoal shadow-2xl">
          <img 
            src={optimizeUnsplashUrl(service.heroImage, isMobile ? 800 : 1600, isMobile ? 70 : 85)} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 2. CONSULTATIVE DIAGNOSIS SECTION */}
      <section className="py-space-96 px-space-24 md:px-space-40 max-w-7xl mx-auto w-full relative z-10 border-t border-white/5 mt-space-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-64">
          
          {/* Who is it for & Problems */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-space-40">
            
            {/* Target Client */}
            <div className="flex flex-col gap-space-16 border-b border-white/5 pb-8">
              <span className="h-label-mono text-accent">[WHO IS THIS SERVICE FOR?]</span>
              <p className="font-display text-xl md:text-2xl font-light leading-relaxed text-white">
                {consult.target}
              </p>
            </div>

            {/* Problems Solved */}
            <div className="flex flex-col gap-space-16">
              <span className="h-label-mono text-accent">[WHAT PROBLEMS DOES IT SOLVE?]</span>
              <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed font-light">
                {consult.problems}
              </p>
            </div>

          </div>

          {/* Execution & Differences */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-space-40">
            
            {/* Execution */}
            <div className="flex flex-col gap-space-16 border-b border-white/5 pb-8">
              <span className="h-label-mono text-accent">[HOW DOES RIGHTCON EXECUTE IT?]</span>
              <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed font-light">
                {consult.execution}
              </p>
            </div>

            {/* The Difference */}
            <div className="flex flex-col gap-space-16">
              <span className="h-label-mono text-accent">[WHY IS RIGHTCON DIFFERENT?]</span>
              <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed font-light">
                {consult.difference}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. DELIVERABLES & MOCK CAD BLUEPRINTS */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/5 bg-charcoal relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-space-40 items-center relative z-10">
          
          {/* Deliverables list */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-space-32">
            <span className="h-label-mono text-accent">[02 // WHAT WILL THE CLIENT RECEIVE?]</span>
            <h3 className="font-display text-2xl font-light text-white uppercase tracking-wide">Documented Deliverables</h3>
            
            <div className="flex flex-col gap-space-16">
              {service.deliverables.map((del, i) => (
                <div key={i} className="flex gap-space-16 items-center bg-charcoal/50 border border-white/5 p-space-16 rounded-none">
                  <span className="font-mono text-xs text-accent font-bold">0{i+1}</span>
                  <span className="font-sans text-xs text-white/80 font-light">{del.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Blueprint mockup */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-space-32">
            <span className="h-label-mono text-accent">[CAD SCHEMATIC]</span>
            
            <div className="w-full aspect-[4/3] border border-white/10 p-space-24 flex items-center justify-center bg-charcoal rounded-none overflow-hidden relative">
              <div className="absolute inset-0 blueprint-grid opacity-10"></div>
              <svg className="w-full h-full stroke-white/20 fill-none stroke-[0.5]" viewBox="0 0 100 100">
                <rect x="10" y="10" width="80" height="80" />
                <line x1="10" y1="10" x2="90" y2="90" className="blueprint-line" />
                <line x1="90" y1="10" x2="10" y2="90" className="blueprint-line" />
                <circle cx="50" cy="50" r="25" className="stroke-accent/40" />
                <rect x="30" y="30" width="40" height="40" className="stroke-primary/20" />
              </svg>
              <div className="absolute bottom-2.5 left-2.5 bg-charcoal/90 border border-white/5 px-2.5 py-0.5 font-mono text-[7px] text-accent">
                TELEMETRY // COORDINATION_GRID
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SERVICE FAQS */}
      {service.faq && (
        <section className="py-space-96 px-space-24 md:px-space-40 max-w-7xl mx-auto w-full relative z-10 border-t border-white/5">
          <div className="max-w-3xl mx-auto flex flex-col gap-space-48">
            <div className="flex flex-col gap-space-8 text-center items-center">
              <span className="h-label-mono text-accent">[03 // TECHNICAL ACCORD // Q&amp;A]</span>
              <h2 className="font-display text-2xl md:text-3xl font-light text-white uppercase tracking-wide">Technical Faq</h2>
            </div>

            <div className="flex flex-col border-t border-white/10">
              {service.faq.map((item, idx) => (
                <div key={idx} className="border-b border-white/10 py-space-24 flex flex-col gap-3">
                  <div className="flex gap-space-16 items-start">
                    <span className="font-mono text-[9px] text-white/50 mt-1">(Q)</span>
                    <h3 className="font-display text-lg font-light text-white leading-snug">{item.q}</h3>
                  </div>
                  <p className="font-sans text-xs text-white/60 pl-space-24 leading-relaxed font-light">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. CONSULTATION CTA */}
      <section className="py-space-96 px-space-24 md:px-space-40 bg-charcoal border-t border-white/5 relative">
        <div className="absolute inset-0 blueprint-grid opacity-[0.01] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-space-24 relative z-10">
          <span className="h-label-mono text-accent">[DIRECT SITE ADVISORY REGISTRY]</span>
          <h2 className="font-display text-3xl font-light text-white uppercase tracking-wide">
            Book Site Compaction Review
          </h2>
          <p className="font-sans text-xs text-white/60 max-w-md mx-auto leading-relaxed font-light">
            Secure geomechanical audits for your custom home lot coordinate parameters.
          </p>
          <Link 
            to="/contact?advisory=true" 
            className="btn-primary py-3.5 px-8 tracking-widest text-[9px] rounded-none self-center mt-4"
          >
            <span>BOOK TECHNICAL ADVISORY</span>
          </Link>
        </div>
      </section>

      <Footer />

    </div>
  );
}
