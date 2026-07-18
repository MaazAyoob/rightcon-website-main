import { useState } from "react";
import { SERVICES } from "../data/rightconData";
import { Link } from "react-router-dom";

export default function Services() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "What is included in a turnkey construction package?",
      a: "Our turnkey construction package covers the entire lifecycle: soil testing, design drawings, structural mapping, excavation, site engineering supervision, material logistics (cement, steel, brick, masonry), wiring, plumbing, and structural validation certificates.",
    },
    {
      q: "How does Rightcon manage quality checkpoints?",
      a: "We maintain our proprietary Quality Book which outlines 150+ inspection points checked by our on-site engineers. These include cement grade verification, concrete compression tests, structural steel lap sizing, and plaster water curing tracking.",
    },
    {
      q: "What are 'Insideout' packages?",
      a: "Insideout packages integrate our architectural design studio directly with our construction teams and custom interior finishing millwork. This ensures that layout designs translate exactly into construction, with zero discrepancy in final fittings.",
    },
    {
      q: "Can I customize the material specifications?",
      a: "Yes. While our packages have standard baselines (ACC/Ultratech 53-grade cement, Vizag steel, Finolex wires), our engineering team coordinates custom specifications depending on aesthetic and architectural needs.",
    },
  ];

  return (
    <div className="bg-white pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-32">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl border-b border-neutral-100 pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">OUR CAPABILITIES</span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-charcoal uppercase tracking-tight">
            CONSTRUCTION & DESIGN SERVICES
          </h1>
          <p className="text-neutral-500 font-light text-base md:text-lg leading-relaxed">
            Professional systems for residential design and civil execution. We bring engineering discipline and craftsmanship to every foundation we cast.
          </p>
        </div>

        {/* Detailed Services Breakdown */}
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
                {/* Large Service Image */}
                <div className="w-full lg:w-1/2 aspect-[16/10] overflow-hidden bg-neutral-100 border border-neutral-200">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-102"
                  />
                </div>

                {/* Service Details */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <span className="font-mono text-xs text-gold uppercase tracking-widest font-semibold block">
                    0{index + 1} / {service.subtitle}
                  </span>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal tracking-tight uppercase leading-none">
                    {service.title}
                  </h2>
                  <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Core Deliverables Grid */}
                  <div className="border-t border-neutral-150 pt-6 space-y-4">
                    <h4 className="font-mono text-xs text-charcoal font-semibold uppercase tracking-wider">
                      SPECIFICATION DELIVERABLES
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-xs text-neutral-500 leading-relaxed font-light">
                          <span className="w-1 h-1 bg-gold rounded-full mt-2"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <Link 
                      to="/cost-calculator" 
                      className="inline-block bg-charcoal text-white hover:bg-gold hover:text-charcoal transition-all duration-300 font-mono text-xs uppercase tracking-widest px-8 py-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 min-h-[44px] text-center"
                    >
                      Estimate Work Scope
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Accordion FAQ Section */}
        <div className="pt-20 border-t border-neutral-100 max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">PROCEDURE FAQS</span>
            <h2 className="font-display font-bold text-3xl text-charcoal uppercase">
              ENGINEERING SYSTEMS
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isSelected = activeFaq === idx;
              return (
                <div key={idx} className="border-b border-neutral-100 pb-4">
                  <button
                    onClick={() => setActiveFaq(isSelected ? null : idx)}
                    aria-expanded={isSelected}
                    className="w-full flex items-center justify-between text-left py-4 hover:text-gold transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 cursor-pointer"
                  >
                    <span className="font-display font-bold text-base md:text-lg text-charcoal uppercase tracking-tight">
                      {faq.q}
                    </span>
                    <span className="font-mono text-xs text-gold ml-4">
                      {isSelected ? "[-]" : "[+]"}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isSelected ? "max-h-[220px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-neutral-500 text-sm leading-relaxed font-light pt-2 pb-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
