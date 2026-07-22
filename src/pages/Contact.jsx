import { useState } from "react";
import { COMPANY_METRICS } from "../data/rightconData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    serviceType: "construction",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-charcoal text-charcoal dark:text-white pt-32 pb-24 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 lg:px-32 space-y-24">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-neutral-200 dark:border-neutral-800 pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-gold block font-semibold">CONNECT WITH OUR OFFICE</span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-charcoal dark:text-white uppercase">
            REQUEST BRIEFING
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 font-light text-base md:text-lg leading-relaxed">
            Schedule a private architectural design or civil engineering consultation at our Jayanagar headquarters.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Coordinates Details Column */}
          <div className="space-y-12">
            
            {/* Headquarters details */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-brand-blue dark:text-gold uppercase tracking-widest font-semibold">THE HEADQUARTERS</h3>
              <p className="text-charcoal dark:text-white text-base md:text-lg leading-relaxed font-light">
                Rightcon Constructions Private Limited<br />
                {COMPANY_METRICS.headquarters}<br />
                Bangalore, Karnataka, India
              </p>
              <p className="text-neutral-500 dark:text-neutral-400 font-mono text-xs">
                Coordinates: 12.9250° N, 77.5898° E
              </p>
            </div>

            {/* Direct Communications */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-brand-blue dark:text-gold uppercase tracking-widest font-semibold">DIRECT COMMUNICATIONS</h3>
              <p className="text-charcoal dark:text-white text-base leading-relaxed font-light">
                General Inquiries: info@rightcon.in<br />
                WhatsApp Office: +91 99000 00000 <span className="text-xs text-neutral-500 dark:text-neutral-400">(Placeholder)</span>
              </p>
            </div>

            {/* Maps coordination placeholder */}
            <div className="aspect-[16/9] w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden relative rounded-sm">
              {/* Fallback image representing mapping interface */}
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" 
                alt="Bangalore mapping location placeholder" 
                className="w-full h-full object-cover grayscale opacity-60 dark:opacity-40"
              />
              <div className="absolute inset-0 bg-charcoal/40 dark:bg-black/60 flex items-center justify-center">
                <span className="bg-white dark:bg-neutral-800 text-charcoal dark:text-white font-mono text-xs uppercase tracking-widest px-4 py-2 border border-neutral-300 dark:border-neutral-700 shadow-md">
                  Google Map Area
                </span>
              </div>
            </div>

          </div>

          {/* Form Inquiry Column */}
          <div className="bg-neutral-50 dark:bg-neutral-900 p-8 md:p-12 border border-neutral-200 dark:border-neutral-800 space-y-8 rounded-sm">
            <div className="space-y-2">
              <h3 className="font-sans font-bold text-2xl text-charcoal dark:text-white uppercase">INQUIRY FORM</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs font-light">
                Please provide your plot details to prepare your initial assessment file.
              </p>
            </div>

            {submitted ? (
              <div className="bg-white dark:bg-neutral-800 p-8 border border-gold/40 text-center space-y-4 rounded-sm">
                <span className="text-brand-blue dark:text-gold font-mono text-2xl block">✔</span>
                <h4 className="font-sans font-bold text-lg text-charcoal dark:text-white">BRIEFING FILED</h4>
                <p className="text-neutral-600 dark:text-neutral-300 text-xs leading-relaxed font-light">
                  Thank you. Our Jayanagar engineering coordinator will contact you shortly to confirm your consultation schedule.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 tracking-wider font-semibold">YOUR NAME *</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter full name"
                    className="w-full bg-white dark:bg-neutral-800 text-charcoal dark:text-white border border-neutral-300 dark:border-neutral-700 px-4 py-3 text-sm focus:outline-none focus:border-brand-blue dark:focus:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-1 min-h-[44px] rounded-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 tracking-wider font-semibold">CONTACT PHONE NUMBER *</label>
                  <input 
                    type="tel" 
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Enter phone number"
                    className="w-full bg-white dark:bg-neutral-800 text-charcoal dark:text-white border border-neutral-300 dark:border-neutral-700 px-4 py-3 text-sm focus:outline-none focus:border-brand-blue dark:focus:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-1 min-h-[44px] rounded-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="block text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 tracking-wider font-semibold">PLOT / SITE LOCATION *</label>
                  <input 
                    type="text" 
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. Jayanagar 4th Block, Bangalore"
                    className="w-full bg-white dark:bg-neutral-800 text-charcoal dark:text-white border border-neutral-300 dark:border-neutral-700 px-4 py-3 text-sm focus:outline-none focus:border-brand-blue dark:focus:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-1 min-h-[44px] rounded-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="block text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 tracking-wider font-semibold">REQUIRED SERVICE SCOPE</label>
                  <select 
                    id="service"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                    className="w-full bg-white dark:bg-neutral-800 text-charcoal dark:text-white border border-neutral-300 dark:border-neutral-700 px-4 py-3 text-sm focus:outline-none focus:border-brand-blue dark:focus:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-1 min-h-[44px] rounded-sm"
                  >
                    <option value="construction">Turnkey Civil Construction</option>
                    <option value="architecture">Architectural Design studio</option>
                    <option value="insideout">Insideout Integrated Package</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 tracking-wider font-semibold">BRIEF DESCRIPTION</label>
                  <textarea 
                    id="message"
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Optional message details"
                    className="w-full bg-white dark:bg-neutral-800 text-charcoal dark:text-white border border-neutral-300 dark:border-neutral-700 px-4 py-3 text-sm focus:outline-none focus:border-brand-blue dark:focus:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-1 rounded-sm"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-brand-blue text-white hover:bg-gold hover:text-charcoal dark:bg-gold dark:text-charcoal dark:hover:bg-white dark:hover:text-charcoal transition-colors duration-300 font-mono text-xs uppercase tracking-widest py-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 min-h-[44px] cursor-pointer shadow-md rounded-sm"
                >
                  File Inquiry
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
