import { Link } from "react-router-dom";

export default function Blog() {
  const articles = [
    {
      id: "concrete-compression",
      title: "Concrete Compression Tiers in Residential Architecture",
      cat: "Engineering",
      date: "July 2026",
      readTime: "6 Min Read",
      author: "Ir. Ayoob, Lead Structural Engineer",
      image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80",
      desc: "A structural guide explaining compression tests, concrete ratios, and curing schedules required for multi-level private frames."
    },
    {
      id: "courtyard-concept",
      title: "The Courtyard Concept: Optimizing Urban Plots for Natural Light",
      cat: "Architecture",
      date: "June 2026",
      readTime: "8 Min Read",
      author: "Jayanagar Design Studio",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      desc: "How structural light wells and open courtyards can reduce home temperatures while keeping inner living rooms private."
    },
    {
      id: "turnkey-contracts",
      title: "Why Turnkey Contracts Prevent Project Cost Escalation",
      cat: "Management",
      date: "May 2026",
      readTime: "5 Min Read",
      author: "Rightcon Logistics Desk",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      desc: "Analyzing material logistics, price indexes, and how systemized builders prevent budget overruns during execution."
    }
  ];

  return (
    <div className="bg-white pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-24">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl border-b border-neutral-100 pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-blue">ENGINEERING JOURNALS</span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-charcoal uppercase tracking-tight">
            ENGINEERING INSIGHTS
          </h1>
          <p className="text-neutral-500 font-light text-base md:text-lg leading-relaxed">
            Articles, guides, and studies on residential structural design, civil engineering standards, and Bangalore construction parameters.
          </p>
        </div>

        {/* Featured Journal Article (Hero visual) */}
        <div className="group border border-neutral-200 overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-3/5 aspect-[16/10] overflow-hidden bg-neutral-100">
            <img 
              src={articles[0].image} 
              alt={articles[0].title} 
              className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-102"
            />
          </div>
          <div className="w-full lg:w-2/5 p-8 lg:p-0 lg:pr-12 space-y-6">
            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-450 uppercase">
              <span>{articles[0].cat}</span>
              <span>{articles[0].readTime}</span>
            </div>
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-charcoal group-hover:text-gold transition-colors duration-300 leading-tight">
              <Link to={`/blog/${articles[0].id}`}>{articles[0].title}</Link>
            </h2>
            <p className="text-neutral-500 text-sm font-light leading-relaxed">
              {articles[0].desc}
            </p>
            <div className="pt-4 border-t border-neutral-100 flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase">
              <span>BY {articles[0].author}</span>
              <Link to={`/blog/${articles[0].id}`} className="text-gold font-semibold hover:text-charcoal transition-colors">Read Article →</Link>
            </div>
          </div>
        </div>

        {/* Editorial Grid of Supporting Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
          {articles.slice(1).map((art) => (
            <div key={art.id} className="group border border-neutral-200 p-8 space-y-6 hover:shadow-md transition-shadow">
              <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100 border border-neutral-200">
                <img 
                  src={art.image} 
                  alt={art.title} 
                  className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-103"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase">
                  <span>{art.cat}</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="font-sans font-bold text-xl text-charcoal group-hover:text-gold transition-colors duration-300 leading-tight">
                  <Link to={`/blog/${art.id}`}>{art.title}</Link>
                </h3>
                <p className="text-neutral-500 text-xs font-light leading-relaxed">
                  {art.desc}
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-100 flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase">
                <span>{art.author}</span>
                <Link to={`/blog/${art.id}`} className="text-gold font-semibold hover:text-charcoal transition-colors">Read →</Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

