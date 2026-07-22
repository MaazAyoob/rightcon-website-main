import { useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/rightconData";
import MetallicElement from "../components/MetallicElement";

export default function Blog() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Construction Materials", "House Construction", "Real Estate", "Interior Designing"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCat === "All" || post.category === selectedCat;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="relative bg-white dark:bg-charcoal text-charcoal dark:text-white pt-32 pb-32 min-h-screen transition-colors duration-300 overflow-hidden">
      <MetallicElement variant="villa-gable" className="opacity-50 dark:opacity-75" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-16">

        
        {/* Page Header */}
        <div className="space-y-6 max-w-3xl border-b border-neutral-200 dark:border-neutral-800 pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold block font-semibold">ENGINEERING JOURNALS & GUIDES</span>
          <h1 className="font-display font-light text-4xl md:text-7xl text-charcoal dark:text-white uppercase tracking-tight leading-none">
            Engineering Insights
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 font-light text-sm md:text-base leading-relaxed">
            {BLOG_POSTS.length} articles, technical guides, and material studies on residential house construction, soil testing, approvals, and structural standards.
          </p>
        </div>

        {/* Category & Search Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-all duration-300 cursor-pointer ${
                  selectedCat === cat
                    ? "bg-brand-blue border-brand-blue text-white dark:bg-gold dark:border-gold dark:text-charcoal font-semibold"
                    : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-brand-blue dark:hover:border-gold hover:text-charcoal dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-charcoal dark:text-white focus:outline-none focus:border-brand-blue dark:focus:border-gold"
            />
          </div>

        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-neutral-500 font-mono text-sm">
            No articles match your search parameters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((art) => (
              <article
                key={art.id}
                className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 rounded-sm"
              >
                <div className="space-y-4">
                  {/* Article Featured Image */}
                  <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 hover-zoom">
                    <Link to={`/blog/${art.slug}`}>
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover transition-editorial"
                      />
                    </Link>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-brand-blue dark:text-gold uppercase tracking-widest font-semibold">
                      <span>{art.category}</span>
                      <span className="text-neutral-500 dark:text-neutral-400">{art.date}</span>
                    </div>

                    <h3 className="font-display font-medium text-lg text-charcoal dark:text-white group-hover:text-brand-blue dark:group-hover:text-gold transition-colors duration-300 leading-snug">
                      <Link to={`/blog/${art.slug}`}>{art.title}</Link>
                    </h3>

                    <p className="text-neutral-600 dark:text-neutral-300 text-xs font-light leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                  <span>{art.readTime}</span>
                  <Link
                    to={`/blog/${art.slug}`}
                    className="text-brand-blue dark:text-gold font-semibold hover:text-charcoal dark:hover:text-white transition-colors"
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

