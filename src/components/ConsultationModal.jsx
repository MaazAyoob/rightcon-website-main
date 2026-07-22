import React, { useState, useEffect } from "react";

export default function ConsultationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    plotSize: "",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  // Body overflow lock and ESC key close handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-charcoal text-charcoal dark:text-white border border-neutral-200 dark:border-neutral-700 shadow-2xl p-6 md:p-10 rounded-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-charcoal dark:hover:text-white text-2xl font-mono p-2 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold rounded"
          aria-label="Close Modal"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-brand-blue/10 dark:bg-gold/10 text-brand-blue dark:text-gold rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h3 id="consultation-modal-title" className="font-display text-2xl font-bold">
              Consultation Requested
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 font-light max-w-md mx-auto leading-relaxed">
              Thank you! Our senior architectural advisor will contact you within 24 hours to schedule your site & project session.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-blue dark:text-gold font-semibold block mb-1">
                BUILDING PEACE OF MIND
              </span>
              <h3 id="consultation-modal-title" className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                Book a Free Consultation
              </h3>
              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 font-light mt-1 max-w-[60ch]">
                Discuss your plot, budget, and architectural requirements with Rightcon's engineering specialists.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sudheendra Rao"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-charcoal dark:text-white focus:outline-none focus:border-brand-blue dark:focus:border-gold transition-colors rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98860 12345"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-charcoal dark:text-white focus:outline-none focus:border-brand-blue dark:focus:border-gold transition-colors rounded-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Project Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Whitefield, Bengaluru"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-charcoal dark:text-white focus:outline-none focus:border-brand-blue dark:focus:border-gold transition-colors rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Plot Size (Sq.Ft)
                  </label>
                  <input
                    type="text"
                    value={formData.plotSize}
                    onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                    placeholder="e.g. 30x40 (1200 Sq.Ft)"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-charcoal dark:text-white focus:outline-none focus:border-brand-blue dark:focus:border-gold transition-colors rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-charcoal dark:text-white focus:outline-none focus:border-brand-blue dark:focus:border-gold transition-colors rounded-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-blue hover:bg-gold text-white hover:text-charcoal dark:bg-gold dark:text-charcoal dark:hover:bg-white transition-all duration-300 font-mono text-xs uppercase tracking-widest font-semibold shadow-md cursor-pointer mt-2 focus-visible:ring-2 focus-visible:ring-brand-blue dark:focus-visible:ring-gold rounded-xs"
              >
                Submit Consultation Request →
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
