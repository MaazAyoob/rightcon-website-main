import { COMPANY_METRICS } from "../data/rightconData";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-white pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-24">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-neutral-100 pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">OUR STORY & PHILOSOPHY</span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-charcoal uppercase tracking-tight">
            ABOUT RIGHTCON
          </h1>
          <p className="text-neutral-500 font-light text-base md:text-lg leading-relaxed">
            Constructing bespoke residences in Bangalore and Mysore on the principles of transparency, structured workflows, and engineering discipline.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal uppercase leading-tight">
              THE SYSTEM-DRIVEN BUILD METHOD
            </h2>
            <div className="w-12 h-0.5 bg-gold"></div>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-light">
              Rightcon was founded to transform the traditionally unpredictable residential construction process into a systematic, stress-free engineering execution. Over the past {COMPANY_METRICS.yearsExperience} years, we have refined a framework that covers every detail of a residential build.
            </p>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-light">
              By keeping architectural design, civil engineering, and finishing trades entirely in-house, we eliminate contractor hand-offs and structural discrepancies. Every project operates under the oversight of professional project managers who track execution using our 150-checkpoint Quality Book.
            </p>
            <div className="pt-4">
              <Link 
                to="/projects" 
                className="inline-block bg-charcoal text-white hover:bg-gold hover:text-charcoal transition-all duration-300 font-mono text-xs uppercase tracking-widest px-8 py-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 min-h-[44px] text-center"
              >
                Examine Our Residences
              </Link>
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-6 aspect-[4/3] overflow-hidden bg-neutral-100 border border-neutral-200">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" 
              alt="Rightcon Office Meeting and Collaborative Blueprint Planning" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.01]"
            />
          </div>

        </div>

        {/* Corporate Metrics Strip */}
        <div className="bg-grain py-12 px-8 border border-neutral-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-neutral-450 uppercase block tracking-wider">MANAGEMENT EXPERTISE</span>
            <span className="font-display font-bold text-2xl text-charcoal">Structural Specialists</span>
            <p className="text-neutral-500 text-xs font-light leading-relaxed">Led by M.Tech structural engineers with BDA/BBMP sanction clearances.</p>
          </div>
          <div className="space-y-1 md:border-l md:border-neutral-200 md:pl-8">
            <span className="font-mono text-[10px] text-neutral-450 uppercase block tracking-wider">REGULATORY SANCTIONS</span>
            <span className="font-display font-bold text-2xl text-charcoal">BBMP & BDA Compliant</span>
            <p className="text-neutral-500 text-xs font-light leading-relaxed">Systemized layout blueprints matching local zoning laws precisely.</p>
          </div>
          <div className="space-y-1 md:border-l md:border-neutral-200 md:pl-8">
            <span className="font-mono text-[10px] text-neutral-450 uppercase block tracking-wider">PROJECT ASSISTANCE</span>
            <span className="font-display font-bold text-2xl text-charcoal">Single-Point Support</span>
            <p className="text-neutral-500 text-xs font-light leading-relaxed">Weekly digital reports containing photo logs and cylinder testing records.</p>
          </div>
        </div>

        {/* Engineering Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-neutral-100">
          <div className="space-y-4">
            <span className="font-mono text-xs text-gold font-semibold uppercase tracking-wider block">01 / TRANSPARENCY</span>
            <h3 className="font-display font-bold text-xl text-charcoal uppercase">CONTRACT LOCKED COST</h3>
            <p className="text-neutral-500 text-sm leading-relaxed font-light">
              We provide all-inclusive pricing schedules with zero cost escalations, fully underwritten in our execution contracts.
            </p>
          </div>
          <div className="space-y-4">
            <span className="font-mono text-xs text-gold font-semibold uppercase tracking-wider block">02 / CRAFTSMANSHIP</span>
            <h3 className="font-display font-bold text-xl text-charcoal uppercase">IN-HOUSE RESPONSIBILITY</h3>
            <p className="text-neutral-500 text-sm leading-relaxed font-light">
              From our structural detailing engineers to our carpentry and finishing trades, all operations are managed by in-house Rightcon employees.
            </p>
          </div>
          <div className="space-y-4">
            <span className="font-mono text-xs text-gold font-semibold uppercase tracking-wider block">03 / VERIFICATION</span>
            <h3 className="font-display font-bold text-xl text-charcoal uppercase">THE QUALITY BOOK</h3>
            <p className="text-neutral-500 text-sm leading-relaxed font-light">
              We compile a physical and digital record of structural compliance, slab cure logs, and material testing results for the client.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
