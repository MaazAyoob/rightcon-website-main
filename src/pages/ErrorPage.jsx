import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="bg-charcoal text-white min-h-screen flex items-center justify-center p-6 select-none relative overflow-hidden">
      
      {/* Background typographic stamp */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-white/[0.01] text-[20rem] tracking-tighter uppercase select-none pointer-events-none">
        404
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-md mx-auto">
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-gold bg-gold/10 px-3 py-1.5 border border-gold/20 inline-block">
            404 // SITE DEVIATION
          </span>
          <h1 className="font-display font-bold text-4xl uppercase tracking-tight text-white leading-tight">
            COORDINATE NOT FOUND.
          </h1>
          <p className="text-neutral-450 font-light text-xs sm:text-sm leading-relaxed">
            The structural route or file path you requested does not exist in our active website log files.
          </p>
        </div>

        <div className="pt-4">
          <Link 
            to="/" 
            className="bg-gold text-charcoal hover:bg-white hover:text-charcoal transition-all duration-300 font-mono text-xs uppercase tracking-widest px-8 py-4 inline-block font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 min-h-[44px]"
          >
            Return to Homepage
          </Link>
        </div>
      </div>

    </div>
  );
}

