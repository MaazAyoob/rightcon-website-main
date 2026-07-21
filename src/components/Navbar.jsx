import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-charcoal/95 backdrop-blur-md py-3 shadow-lg border-b border-neutral-800/80"
            : "bg-gradient-to-b from-charcoal/90 via-charcoal/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 flex-shrink-0"
            aria-label="Rightcon Homepage"
          >
            <BrandLogo light={true} />
          </Link>

          {/* Desktop Nav — lg and above */}
          <div className="hidden lg:flex items-center space-x-5 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-mono text-[10px] uppercase tracking-[0.12em] hover:text-gold transition-colors duration-200 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 ${
                    isActive ? "text-gold font-semibold" : "text-white/90"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="border border-gold bg-gold hover:border-white text-charcoal text-[10px] font-mono uppercase tracking-[0.15em] px-5 py-3 font-semibold hover:bg-white hover:text-charcoal transition-all duration-300 min-h-[44px] flex items-center justify-center whitespace-nowrap"
            >
              BOOK A CONSULTATION
            </Link>
          </div>

          {/* Hamburger — below lg */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white focus:outline-none w-11 h-11 flex items-center justify-center cursor-pointer relative z-[65]"
            aria-label="Toggle Navigation Drawer"
            aria-expanded={isOpen}
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${isOpen ? "transform rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${isOpen ? "transform -rotate-45 -translate-y-2" : ""}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-[300px] max-w-[85vw] bg-charcoal backdrop-blur-lg z-[60] border-l border-neutral-800 shadow-2xl flex flex-col justify-center items-center transition-transform duration-500 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-6 text-center w-full px-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`font-sans font-semibold text-xl tracking-[0.1em] uppercase hover:text-gold transition-colors ${
                  isActive ? "text-gold" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4">
            <Link
              to="/contact"
              className="bg-brand-blue text-white text-sm font-mono uppercase tracking-widest py-4 block hover:bg-gold hover:text-charcoal transition-all duration-300 font-semibold min-h-[48px] text-center"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] lg:hidden"
        />
      )}
    </>
  );
}

