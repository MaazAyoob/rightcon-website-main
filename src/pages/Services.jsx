import { useState, useEffect } from "react";
import { SERVICES } from "../data/rightconData";
import { Link } from "react-router-dom";
import MetallicElement from "../components/MetallicElement";

export default function Services() {
  const [activeFaq, setActiveFaq] = useState(null);


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
  }, []);

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
    <div className="relative bg-white dark:bg-charcoal text-charcoal dark:text-white pt-28 pb-32 min-h-screen transition-colors duration-300 overflow-hidden">
      <MetallicElement variant="cantilever-frame" className="opacity-40 dark:opacity-60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-36">


        
        {/* Page Header */}
        <div className="space-y-6 max-w-3xl border-b border-neutral-200 dark:border-neutral-800 pb-16 fade-up-element">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold block font-semibold">OUR CAPABILITIES</span>
          <h1 className="font-display font-light text-4xl md:text-7xl text-charcoal dark:text-white uppercase tracking-tight leading-none">
            Construction & <br />Design Services
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 font-light text-sm md:text-base leading-relaxed">
            Professional systems for residential design and civil execution. We bring engineering discipline and craftsmanship to every foundation we cast.
          </p>
        </div>

        {/* Detailed Services Breakdown (Alternating editorial grids) */}
        <div className="space-y-40 md:space-y-56">
          {SERVICES.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={service.id} 
                className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Large Service Image with Zoom */}
                <div className="w-full lg:w-1/2 aspect-[16/10] bg-neutral-50 dark:bg-neutral-900 hover-zoom fade-up-element border border-neutral-200 dark:border-neutral-800">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-editorial"
                  />
                </div>

                {/* Service Details */}
                <div className="w-full lg:w-1/2 space-y-8 fade-up-element" style={{ transitionDelay: "150ms" }}>
                  <span className="font-mono text-xs text-brand-blue dark:text-gold uppercase tracking-widest block font-semibold">
                    Portfolio / 0{index + 1}
                  </span>
                  <h2 className="font-display font-light text-3xl md:text-5xl text-charcoal dark:text-white tracking-tight uppercase leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-300 text-xs md:text-sm leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Core Deliverables without Card background */}
                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 space-y-6">
                    <h4 className="font-mono text-xs text-charcoal dark:text-white font-semibold uppercase tracking-widest">
                      SPECIFICATION DELIVERABLES
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                          <span className="w-1.5 h-1.5 bg-brand-blue dark:bg-gold rounded-full mt-1.5"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link 
                      to={`/services/${service.id}`} 
                      className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold border-b border-brand-blue/30 dark:border-gold/30 pb-1 hover:text-charcoal dark:hover:text-white hover:border-charcoal dark:hover:border-white transition-editorial"
                    >
                      Examine Service Method →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Accordion FAQ Section */}
        <div className="pt-32 border-t border-neutral-200 dark:border-neutral-800 max-w-4xl mx-auto space-y-16 fade-up-element">
          <div className="text-center space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold font-semibold">PROCEDURE FAQS</span>
            <h2 className="font-display font-light text-3xl md:text-4xl text-charcoal dark:text-white uppercase tracking-tight">
              Engineering Systems
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isSelected = activeFaq === idx;
              return (
                <div key={idx} className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
                  <button
                    onClick={() => setActiveFaq(isSelected ? null : idx)}
                    aria-expanded={isSelected}
                    className="w-full flex items-center justify-between text-left py-4 hover:text-brand-blue dark:hover:text-gold transition-editorial cursor-pointer"
                  >
                    <span className="font-sans font-medium text-base md:text-xl text-charcoal dark:text-white uppercase tracking-tight">
                      {faq.q}
                    </span>
                    <span className="font-mono text-xs text-brand-blue dark:text-gold ml-4">
                      {isSelected ? "[-]" : "[+]"}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isSelected ? "max-h-[220px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm leading-relaxed font-light pt-2 pb-4">
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

