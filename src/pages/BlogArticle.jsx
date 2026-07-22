import { useParams, Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/rightconData";
import MetallicElement from "../components/MetallicElement";

export default function BlogArticle() {
  const { id } = useParams();

  const article = BLOG_POSTS.find((p) => p.slug === id || p.id === id) || BLOG_POSTS[0];

  return (
    <div className="relative bg-white dark:bg-charcoal text-charcoal dark:text-white pt-24 pb-32 min-h-screen transition-colors duration-300 overflow-hidden">
      <MetallicElement variant="villa-gable" className="opacity-40 dark:opacity-60" />
      <div className="relative z-10">

      {/* Article Hero */}
      <section className="relative h-[60vh] flex items-end bg-charcoal text-white overflow-hidden pb-12">
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-40">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-20 w-full space-y-4">
          <div className="flex justify-between items-center text-[10px] font-mono text-gold uppercase tracking-widest font-semibold">
            <span>{article.category}</span>
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
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          <div>
            <span className="block text-[10px] text-neutral-400">PUBLISHED BY</span>
            <span className="text-charcoal dark:text-white font-semibold">Rightcon Engineering Desk</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-neutral-400">DATE RELEASED</span>
            <span className="text-charcoal dark:text-white font-semibold">{article.date}</span>
          </div>
        </div>

        {/* Article Body */}
        <div 
          className="space-y-6 text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed font-light article-body-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Closing Actions */}
        <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link 
            to="/blogs"
            className="text-brand-blue dark:text-gold hover:text-charcoal dark:hover:text-white font-mono text-xs uppercase tracking-widest transition-colors font-semibold"
          >
            ← Back to Engineering Journals
          </Link>
          <Link 
            to="/contact"
            className="bg-brand-blue text-white hover:bg-gold hover:text-charcoal dark:bg-gold dark:text-charcoal dark:hover:bg-white dark:hover:text-charcoal transition-all duration-300 font-mono text-xs uppercase tracking-widest px-8 py-4 font-semibold shadow-sm"
          >
            Book Construction Consultation
          </Link>
        </div>

      </div>

    </div>
    </div>
  );
}


