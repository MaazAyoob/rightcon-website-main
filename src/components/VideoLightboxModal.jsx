import React, { useEffect } from "react";

export default function VideoLightboxModal({ isOpen, onClose, story, onNextStory, onBookConsultation }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !story) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-charcoal text-white border border-neutral-800 shadow-2xl rounded-sm overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 md:px-6 border-b border-neutral-800">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gold font-semibold block">
              HOMEOWNER TESTIMONIAL
            </span>
            <h3 id="video-modal-title" className="font-display font-medium text-lg md:text-xl text-white">
              {story.customerName} — {story.location}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-2xl font-mono p-2 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-gold rounded"
            aria-label="Close Lightbox"
          >
            ✕
          </button>
        </div>

        {/* Video Player Frame / Production Lightbox Architecture */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {story.videoUrl ? (
            <iframe
              src={story.videoUrl}
              title={`${story.customerName} Testimonial Video`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            /* Graceful Production "Video Story Coming Soon" State */
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-neutral-900 via-charcoal to-black">
              <img
                src={story.thumbnail}
                alt={story.customerName}
                className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-sm"
                loading="lazy"
                decoding="async"
              />
              <div className="relative z-10 space-y-4 max-w-md bg-black/70 p-6 backdrop-blur-md border border-white/10 rounded-sm">
                <div className="w-14 h-14 rounded-full border border-gold/40 text-gold flex items-center justify-center mx-auto text-xl font-mono">
                  ▶
                </div>
                <h4 className="font-display font-medium text-xl text-white">
                  Official Video Story Coming Soon
                </h4>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  "{story.quote}"
                </p>
                <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 border border-gold/20">
                  Production Testimonial Video In Edit
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Post-Playback CTAs (Preserved Exactly from PRD) */}
        <div className="p-4 md:p-6 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400 font-light max-w-sm hidden md:block">
            Experience authentic client journeys built on transparency and engineering precision.
          </p>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={onNextStory}
              className="px-5 py-3 border border-neutral-700 hover:border-gold text-white hover:text-gold transition-colors font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer w-full sm:w-auto text-center focus-visible:ring-2 focus-visible:ring-gold rounded-xs"
            >
              Watch Next Story →
            </button>
            <button
              onClick={() => {
                onClose();
                onBookConsultation();
              }}
              className="px-5 py-3 bg-gold text-charcoal hover:bg-white transition-colors font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer w-full sm:w-auto text-center focus-visible:ring-2 focus-visible:ring-gold rounded-xs"
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
