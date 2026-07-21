import { useState } from "react";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(null);

  const faqData = [
    {
      cat: "planning",
      q: "What is included in a turnkey construction package?",
      a: "Our turnkey construction package covers the entire lifecycle: soil testing, design drawings, structural mapping, excavation, site engineering supervision, material logistics (cement, steel, brick, masonry), wiring, plumbing, and structural validation certificates."
    },
    {
      cat: "planning",
      q: "Can I customize the material specifications?",
      a: "Yes. While our packages have standard baselines (ACC/Ultratech 53-grade cement, Vizag steel, Finolex wires), our engineering team coordinates custom specifications depending on aesthetic and architectural needs."
    },
    {
      cat: "execution",
      q: "How does Rightcon manage quality checkpoints?",
      a: "We maintain our proprietary Quality Book which outlines 150+ inspection points checked by our on-site engineers. These include cement grade verification, concrete compression tests, structural steel lap sizing, and plaster water curing tracking."
    },
    {
      cat: "execution",
      q: "What is the typical timeline for a G+2 home?",
      a: "A standard G+2 premium residential project in Bangalore requires between 10 to 14 months. This timeline accounts for soil stabilization, reinforced concrete frame cures, masonry, custom joinery fabrication, and electrical handovers."
    },
    {
      cat: "materials",
      q: "What grades of steel and cement do you deploy?",
      a: "We construct using primary mill steel and cement only: Vizag Fe-550 TMT reinforced bars and ACC/Ultratech 53-Grade cement. We do not purchase secondary grade products or unbranded local cement."
    },
    {
      cat: "legal",
      q: "Do you coordinate BDA and BBMP construction sanctions?",
      a: "Yes. Our Jayanagar coordinates manage all licensing, sanctions, soil logging files, BDA layout clearance certificates, and electricity meter coordination directly under our comprehensive contract scope."
    }
  ];

  const filteredFaqs = faqData.filter((faq) => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl border-b border-neutral-100 pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-blue">PROCEDURE DIRECTORY</span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-charcoal uppercase tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-neutral-500 font-light text-base leading-relaxed">
            Find technical specifications, planning timelines, material certifications, and contracting guidelines.
          </p>
        </div>

        {/* Live Search Input Box */}
        <div className="relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs by keywords (e.g. steel, sanction, timeline)..."
            className="w-full bg-grain border border-neutral-200 px-5 py-4 text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-1"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-450 font-mono text-[10px]"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <div key={idx} className="border-b border-neutral-100 pb-4">
                  <button
                    onClick={() => setActiveIdx(isSelected ? null : idx)}
                    aria-expanded={isSelected}
                    className="w-full flex items-center justify-between text-left py-4 hover:text-gold transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 cursor-pointer"
                  >
                    <span className="font-sans font-bold text-base md:text-lg text-charcoal uppercase tracking-tight flex items-center space-x-3">
                      <span className="font-mono text-xs text-neutral-400 font-normal">[{faq.cat.toUpperCase()}]</span>
                      <span>{faq.q}</span>
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
            })
          ) : (
            <div className="text-center py-12 text-neutral-400 font-mono text-xs">
              No matching records found for "{searchQuery}". Try searching structural terms.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

