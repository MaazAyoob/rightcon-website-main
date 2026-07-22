import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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

  const isDark = theme === "dark";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? "bg-charcoal/95 backdrop-blur-md py-3 shadow-lg border-b border-neutral-700/90"
              : "bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-neutral-300"
            : isDark
              ? "bg-charcoal/90 backdrop-blur-md py-4 border-b border-neutral-800"
              : "bg-white/90 backdrop-blur-md py-4 border-b border-neutral-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 flex-shrink-0"
            aria-label="Rightcon Homepage"
          >
            <BrandLogo light={isDark} height={48} />
          </Link>

          {/* Desktop Nav — lg and above */}
          <div className="hidden lg:flex items-center space-x-5 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-display text-[12px] uppercase tracking-[0.1em] transition-colors duration-200 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 ${
                    isDark
                      ? isActive ? "text-gold font-bold" : "text-white/90 hover:text-gold"
                      : isActive ? "text-brand-blue font-bold" : "text-charcoal hover:text-brand-blue font-semibold"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold dark:bg-gold shadow-[0_1px_4px_rgba(201,162,39,0.5)]" />
                  )}
                </Link>
              );
            })}


            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isDark
                  ? "border-neutral-700 bg-neutral-800 text-gold hover:bg-neutral-700 hover:border-gold"
                  : "border-neutral-300 bg-neutral-100 text-charcoal hover:bg-neutral-200 hover:border-brand-blue"
              }`}
            >
              {isDark ? (
                /* Sun Icon */
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.78a1 1 0 011.415 0l.707.707a1 1 0 01-1.414 1.414l-.708-.707a1 1 0 010-1.414zm2.78 4.22a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-1.414 5.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-5.636-1.414a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM4 10a1 1 0 01-1-1V8a1 1 0 112 0v1a1 1 0 01-1 1zm1.414-5.636a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd"/>
                </svg>
              ) : (
                /* Moon Icon */
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <Link
              to="/contact"
              className={`border text-[11px] font-display uppercase tracking-[0.1em] px-5 py-3 font-semibold transition-all duration-300 min-h-[44px] flex items-center justify-center whitespace-nowrap ${
                isDark
                  ? "border-gold bg-gold text-charcoal hover:bg-white hover:text-charcoal hover:border-white"
                  : "border-brand-blue bg-brand-blue text-white hover:bg-charcoal hover:text-white hover:border-charcoal shadow-sm"
              }`}
            >
              BOOK A CONSULTATION
            </Link>
          </div>

          {/* Hamburger & Theme Switcher — below lg */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`p-2 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                isDark
                  ? "border-neutral-700 bg-neutral-800 text-gold"
                  : "border-neutral-300 bg-neutral-100 text-charcoal"
              }`}
            >
              {isDark ? (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.78a1 1 0 011.415 0l.707.707a1 1 0 01-1.414 1.414l-.708-.707a1 1 0 010-1.414zm2.78 4.22a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-1.414 5.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-5.636-1.414a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM4 10a1 1 0 01-1-1V8a1 1 0 112 0v1a1 1 0 01-1 1zm1.414-5.636a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd"/>
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none w-11 h-11 flex items-center justify-center cursor-pointer relative z-[65] ${
                isDark ? "text-white" : "text-charcoal"
              }`}
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
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-[300px] max-w-[85vw] backdrop-blur-lg z-[60] shadow-2xl flex flex-col justify-center items-center transition-transform duration-500 ease-in-out lg:hidden ${
          isDark ? "bg-charcoal border-l border-neutral-800 text-white" : "bg-white border-l border-neutral-200 text-charcoal"
        } ${
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
                className={`font-display font-semibold text-xl tracking-[0.1em] uppercase transition-colors ${
                  isDark
                    ? isActive ? "text-gold" : "text-white hover:text-gold"
                    : isActive ? "text-brand-blue" : "text-charcoal hover:text-brand-blue"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 space-y-3">
            <Link
              to="/contact"
              className="bg-brand-blue text-white text-sm font-mono uppercase tracking-widest py-4 block hover:bg-gold hover:text-charcoal transition-all duration-300 font-semibold min-h-[48px] text-center shadow-md"
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

