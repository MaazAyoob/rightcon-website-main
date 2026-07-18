import { useParams, Link } from "react-router-dom";

export default function BlogArticle() {
  const { id } = useParams();

  const articlesData = {
    "concrete-compression": {
      title: "Concrete Compression Tiers in Residential Architecture",
      cat: "Engineering",
      date: "July 18, 2026",
      readTime: "6 Min Read",
      author: "Ir. Ayoob, Lead Structural Engineer",
      image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
      content: [
        "In residential G+2 and G+3 constructs, structural foundation integrity relies entirely on concrete compression profiles. Concrete compression strength is categorized into distinct tiers, with M20, M25, and M30 grade mixes acting as standard benchmarks. Higher-load structures demand systematic utilization of design concrete mixes rather than volume approximations.",
        "Compression index capacity is validated utilizing standard concrete testing cubes. During casting, on-site engineers pour fresh cement mix into testing grids. These specimens are cured systematically in clean water tanks and audited at 7-day and 28-day intervals under compression validation equipment. A typical M30 design mix must demonstrate resistance over 30 Newtons per square millimeter (N/mm²) to pass certification rules.",
        "Water hydration cycles are the single most critical parameter in civil frame casting. Insufficient hydration prevents proper mineral bounding, leading to micro-deflections in load bearing frames. Rightcon enforces strict water curing logs for a minimum of 21 days on structural columns and slab decks, logging results directly into the client Quality Book. This guarantees that your house foundation remains secure for generations."
      ]
    },
    "courtyard-concept": {
      title: "The Courtyard Concept: Optimizing Urban Plots for Natural Light",
      cat: "Architecture",
      date: "June 24, 2026",
      readTime: "8 Min Read",
      author: "Jayanagar Design Studio",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      content: [
        "Urban Bangalore site plots (such as standard 30x40 or 40x60 dimensions) are constrained by tight lateral boundaries. Traditional designs lead to dark, enclosed living areas that rely heavily on artificial lighting. The integration of structural light wells and central courtyard envelopes resolves this constraint.",
        "A courtyard functions as a thermodynamic pump. Warm air rises and escapes through upper ventilators, drawing cool air in through lower site openings. By strategically placing courtyards beside main living quarters, we introduce cross-ventilation, reducing indoor temperatures during hot Bangalore afternoons by up to 3 degrees Celsius without mechanical systems.",
        "From an architectural lighting standpoint, courtyard skylights maximize daylight exposure. Sunlight reflects off inner walls, dispersing warm illumination into adjacent spaces. This creates a visually open, premium atmosphere while maintaining complete privacy from neighboring sites."
      ]
    },
    "turnkey-contracts": {
      title: "Why Turnkey Contracts Prevent Project Cost Escalation",
      cat: "Project Economics",
      date: "May 10, 2026",
      readTime: "5 Min Read",
      author: "Rightcon Logistics Desk",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
      content: [
        "Residential home construction is notoriously prone to price escalations. Fluctuations in raw material indices—specifically structural steel and cement—can increase budgets by 15% to 25% mid-project under standard labor-contracting arrangements.",
        "Turnkey contracts resolve this unpredictability by locking cost parameters bound by legal agreements before groundbreaking. A professional builder compiles all material grids, structural coordinates, and finish items into an all-inclusive estimate lock. By managing procurement directly, turnkey contractors insulate the client from raw supply price spikes.",
        "At Rightcon, our cost calculator parameters and estimation charts are itemized directly in our execution documents. We sign binding contract-locks with zero escalation clauses, ensuring structural quality without financial surprise."
      ]
    }
  };

  const article = articlesData[id] || articlesData["concrete-compression"];

  return (
    <div className="bg-white pt-24 pb-24 min-h-screen">
      
      {/* Article Hero */}
      <section className="relative h-[60vh] flex items-end bg-charcoal text-white overflow-hidden pb-12">
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-50">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-20 w-full space-y-4">
          <div className="flex justify-between items-center text-[10px] font-mono text-gold uppercase tracking-widest">
            <span>{article.cat}</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl tracking-tight uppercase leading-[1.1] text-white">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 mt-16 space-y-12">
        
        {/* Author Metadata */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-6 text-xs text-neutral-450 font-mono">
          <div>
            <span className="block text-[10px] text-neutral-400">PUBLISHED AUTHOR</span>
            <span className="text-charcoal font-semibold">{article.author}</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-neutral-400">DATE RELEASED</span>
            <span className="text-charcoal font-semibold">{article.date}</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-8 text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Closing Actions */}
        <div className="pt-12 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link 
            to="/blog"
            className="text-neutral-400 hover:text-gold font-mono text-xs uppercase tracking-widest transition-colors"
          >
            ← Back to Journals
          </Link>
          <Link 
            to="/contact"
            className="bg-charcoal text-white hover:bg-gold hover:text-charcoal transition-colors duration-300 font-mono text-xs uppercase tracking-widest px-6 py-3.5 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 min-h-[44px]"
          >
            Request Project Consultation
          </Link>
        </div>

      </div>

    </div>
  );
}
