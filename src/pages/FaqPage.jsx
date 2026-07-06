import React, { useEffect, useState } from 'react';
import { useScrollSystem } from '../context/ScrollContext';
import CinematicHero from '../components/UI/CinematicHero';
import Footer from '../components/UI/Footer';

const FAQ_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1920&q=95&auto=format&fit=crop",
    category: "01 // FAQ LEDGER",
    title: "TECHNICAL BRIEFINGS.",
    desc: "Rigorous answers regarding Karnataka RERA certifications, geomechanical foundation limits, and material provenance audits.",
    code: "FAQS // METRIC_ANSWERS",
    detailImg: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=1920&q=95&auto=format&fit=crop",
    category: "02 // COORD RESOLVING",
    title: "BIM TWINS Q&A.",
    desc: "Explaining how we pre-slipped MEP piping inside steel skeletons to guarantee a zero-structural-drill build.",
    code: "BIM // SLAB_PROTECT",
    detailImg: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&auto=format&fit=crop"
  }
];

const FAQS_LIST = [
  { q: "What is your RERA number?", a: "Rightcon projects operate under KAR RERA No: PRM/KA/RERA/1251/310/PR/210424/004381." },
  { q: "How do geomechanical audits save budget?", a: "By testing soil compression early, we calculate the exact piling depth required. This prevents contractor over-estimation and protects steel consumption." },
  { q: "What concrete standard limits do you enforce?", a: "We pour Fe-550D structural reinforcements and M40 concrete checked on Day 7 and Day 28 using compressive crush limits." },
  { q: "Do you model MEP pipelines virtually?", a: "Yes. All water, ventilation, and power conduits are routed in 3D BIM twins to guarantee zero onsite core drilling." }
];

export default function FaqPage() {
  const { setActiveScene, setMascotPose, setMascotEmotion } = useScrollSystem();
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveScene(8); // Target CTA/FAQ coordinates
    setMascotPose('idle');
    setMascotEmotion('calm');
  }, [setActiveScene, setMascotPose, setMascotEmotion]);

  return (
    <div className="w-full flex flex-col bg-charcoal text-ivory selection:bg-bronze selection:text-charcoal pt-space-96 select-none font-sans">
      
      {/* 1. Faq slideshow hero */}
      <CinematicHero slides={FAQ_SLIDES} coordinates="12.9716° N, 77.5946° E" />

      {/* 2. ACCORDION */}
      <section className="py-space-96 px-space-24 md:px-space-40 border-t border-white/5 bg-graphite relative">
        <div className="max-w-4xl mx-auto w-full relative z-10">
          <div className="flex flex-col border-t border-white/10">
            {FAQS_LIST.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="border-b border-white/10 py-space-24 flex flex-col gap-space-16 transition-colors duration-500 hover:bg-white/[0.01] px-4 rounded-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex justify-between items-start text-left cursor-pointer focus:outline-none"
                  >
                    <div className="flex gap-space-16 items-start">
                      <span className="font-mono text-[9px] text-stone/50 mt-1">
                        (0{idx + 1})
                      </span>
                      <h3 className="font-display text-lg md:text-xl font-light text-white hover:text-bronze transition-colors tracking-wide leading-snug">
                        {item.q}
                      </h3>
                    </div>
                    <span className="text-bronze font-light ml-4">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>

                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-premium ${
                      isOpen ? 'max-h-[220px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="font-sans text-xs text-ivory/60 pl-space-24 leading-relaxed font-light mt-1">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}
