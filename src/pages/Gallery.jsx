import { useState } from "react";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxImg, setLightboxImg] = useState(null);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      cat: "structures",
      title: "Signature Facade Frame",
      desc: "Completed G+2 concrete pile residency, structural facade lines."
    },
    {
      url: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80",
      cat: "materials",
      title: "Raw Concrete Hydration",
      desc: "Audited concrete mix casting columns, cured for 21 days."
    },
    {
      url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      cat: "structures",
      title: "Vizag Fe-550 TMT Detailing",
      desc: "Structural steel grid detailing, column offset reinforcement."
    },
    {
      url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
      cat: "interiors",
      title: "Bespoke Teakwood Joinery",
      desc: "Seasoned Grade-A timber panel door frameworks."
    },
    {
      url: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80",
      cat: "materials",
      title: "Multi-Coat Waterproofing",
      desc: "Elastomeric deck membranes applied to sumps and balconies."
    },
    {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      cat: "interiors",
      title: "Integrated Living Spaces",
      desc: "Integrated light courtyards and open living floor plans."
    }
  ];

  const filteredImages = activeCategory === "all" 
    ? images 
    : images.filter((img) => img.cat === activeCategory);

  return (
    <div className="bg-white pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-16">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl border-b border-neutral-100 pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-blue">VISUAL RECORDS</span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-charcoal uppercase tracking-tight">
            ARCHITECTURAL GALLERY
          </h1>
          <p className="text-neutral-500 font-light text-base md:text-lg leading-relaxed">
            A visual directory of raw civil executions, engineering materials quality checks, and finished custom residences.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-4 border-b border-neutral-100 pb-6 font-mono text-xs uppercase tracking-widest">
          {["all", "structures", "materials", "interiors"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-2 border-b-2 transition-all cursor-pointer ${
                activeCategory === cat 
                  ? "border-gold text-gold font-semibold" 
                  : "border-transparent text-neutral-400 hover:text-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setLightboxImg(img)}
              className="group cursor-zoom-in border border-neutral-200 p-4 space-y-4 hover:border-gold hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
              </div>
              <div className="space-y-1 text-left">
                <span className="font-mono text-[9px] text-gold uppercase tracking-wider">{img.cat}</span>
                <h3 className="font-sans font-bold text-base text-charcoal uppercase leading-tight">{img.title}</h3>
                <p className="text-neutral-500 text-[11px] font-light leading-relaxed">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox */}
        {lightboxImg && (
          <div 
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col justify-center items-center p-6 cursor-zoom-out"
          >
            <div className="max-w-4xl w-full space-y-4 text-center">
              <div className="aspect-[16/10] w-full overflow-hidden bg-charcoal border border-neutral-800">
                <img 
                  src={lightboxImg.url} 
                  alt={lightboxImg.title} 
                  className="w-full h-full object-contain mx-auto"
                />
              </div>
              <div className="space-y-1 text-white">
                <span className="font-mono text-xs text-gold uppercase tracking-widest block">{lightboxImg.cat}</span>
                <h4 className="font-sans font-bold text-lg uppercase">{lightboxImg.title}</h4>
                <p className="text-neutral-400 text-xs font-light max-w-md mx-auto">{lightboxImg.desc}</p>
              </div>
            </div>
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 text-white hover:text-gold font-mono text-lg cursor-pointer"
            >
              × CLOSE
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

