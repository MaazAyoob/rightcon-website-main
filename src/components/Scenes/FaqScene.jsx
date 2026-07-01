import React, { useState } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

const FAQS = [
  {
    q: "What structural grade parameters are applied to concrete?",
    a: "We use a minimum M30/M40 grade mix for all primary columns and slabs. Before pouring, we execute slump tests on-site. Sample cubes are cast and crushed at 7 and 28 days to verify compressive strength specifications against standard design limits."
  },
  {
    q: "Why are soil and geomechanical audits executed first?",
    a: "Bangalore East has high clay expansion zones while Bangalore North sits on shallow granite beds. We run Standard Penetration Tests (SPT) up to 8m to map actual soil load margins, completely eliminating foundation cracking and settling risks."
  },
  {
    q: "Can the 10-year structural warranty be transferred?",
    a: "Yes. Our structural warranty is tied directly to the property deed. If the residence is sold within the 10-year liability coverage period, the protection transfers to the new owner, preserving investment value."
  },
  {
    q: "How are project timelines and structural delays managed?",
    a: "Through LOD 400 BIM modeling, we resolve physical structural collisions and utility route overlays before ground-break. This reduces on-site alterations. Projects are audited weekly against critical path schedules to ensure on-time handover."
  }
];

export default function FaqScene() {
  const [openIndex, setOpenIndex] = useState(null);
  const { setActiveInteraction } = useScrollSystem();

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
    if (openIndex !== idx) {
      setActiveInteraction({ type: 'faq' });
    } else {
      setActiveInteraction(null);
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#12110f] py-24 px-8 md:px-16 flex items-center border-t border-white/5 select-none">
      {/* Background decoration */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col gap-3 mb-16 text-center md:text-left">
          <span className="font-mono text-[9px] text-bronze tracking-[0.25em] uppercase">
            (TECHNICAL FAQ)
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight">
            Your Questions, <span className="text-bronze italic">Answered</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col border-t border-white/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="border-b border-white/10 py-6 md:py-8 flex flex-col gap-4 transition-colors duration-500 hover:bg-white/[0.01] px-4 rounded-sm"
              >
                {/* Header button */}
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  onMouseEnter={() => setActiveInteraction({ type: 'faq' })}
                  onMouseLeave={() => setActiveInteraction(null)}
                  className="w-full flex justify-between items-start text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex gap-4 md:gap-8 items-start">
                    <span className="font-mono text-[10px] text-stone tracking-wider mt-1.5">
                      (0{idx + 1})
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-light text-white hover:text-bronze transition-colors">
                      {faq.q}
                    </h3>
                  </div>
                  
                  {/* Plus/minus sign */}
                  <span className="text-bronze text-xl font-light ml-4 select-none">
                    {isOpen ? '—' : '+'}
                  </span>
                </button>

                {/* Answer box (Collapsible) */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-premium ${
                    isOpen ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="font-sans text-xs md:text-sm font-light text-stone-light leading-relaxed pl-10 md:pl-[68px]">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
