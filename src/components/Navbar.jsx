import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close mobile nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Materials", path: "/#materials" },
    { name: "Journey", path: "/#journey" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-charcoal/95 backdrop-blur-md py-4 shadow-lg border-b border-neutral-800/80"
            : "bg-gradient-to-b from-charcoal/90 via-charcoal/40 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <Link
            to="/"
            className="flex flex-col items-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4"
            aria-label="Rightcon Homepage"
          >
            <span className="font-display font-bold text-2xl tracking-[0.1em] text-white leading-none">RIGHTCON</span>
            <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-gold mt-1">BUILDING PEACE OF MIND</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-mono text-[10px] uppercase tracking-[0.12em] hover:text-gold transition-colors duration-200 relative py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 ${
                    isActive
                      ? "text-gold font-semibold"
                      : "text-white/90"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="border border-white/50 hover:border-white text-white text-[10px] font-mono uppercase tracking-[0.15em] px-6 py-3 font-semibold hover:bg-white hover:text-charcoal transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 min-h-[44px] flex items-center justify-center"
            >
              BOOK A CONSULTATION
            </Link>
          </div>

          {/* Mobile Menu Toggle (Minimum 44x44 touch target) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold z-50 w-11 h-11 flex items-center justify-center cursor-pointer"
            aria-label="Toggle Navigation Drawer"
            aria-expanded={isOpen}
          >
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
                  isOpen ? "transform rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
                  isOpen ? "transform -rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay (Blur Backdrop Drawer) */}
      <div
        className={`fixed inset-y-0 right-0 w-[300px] max-w-[85vw] bg-charcoal/98 backdrop-blur-lg z-45 border-l border-neutral-800 shadow-2xl flex flex-col justify-center items-center transition-transform duration-500 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-8 text-center w-full px-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`font-display font-semibold text-2xl tracking-[0.1em] uppercase hover:text-gold transition-colors ${
                  isActive ? "text-gold" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="pt-6">
            <Link
              to="/contact"
              className="bg-gold text-charcoal text-sm font-mono uppercase tracking-widest py-4 block hover:bg-white hover:text-charcoal transition-all duration-300 font-semibold min-h-[48px] text-center"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop Mask */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        ></div>
      )}
    </>
  );
}
