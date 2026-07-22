import { Link } from "react-router-dom";
import { COMPANY_METRICS } from "../data/rightconData";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-24 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 sm:px-6 md:px-20 lg:px-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-12 pb-16 border-b border-neutral-800">
          
          {/* Brand/Philosophy */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <Link to="/">
              <BrandLogo light={true} height={48} />
            </Link>
            <p className="text-neutral-400 text-sm max-w-xs leading-relaxed font-light">
              Crafting premium private residences with mathematical precision and absolute structural transparency across Bangalore and Mysore.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gold font-semibold">Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/projects" className="text-neutral-400 hover:text-white text-sm transition-colors font-light">Completed Residences</Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-400 hover:text-white text-sm transition-colors font-light">Construction & Design Services</Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-white text-sm transition-colors font-light">Our Story & Engineering</Link>
              </li>
              <li>
                <Link to="/cost-calculator" className="text-neutral-400 hover:text-white text-sm transition-colors font-light">Interactive Cost Estimator</Link>
              </li>
            </ul>
          </div>

          {/* Media Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gold font-semibold">Insights & Media</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/blog" className="text-neutral-400 hover:text-white text-sm transition-colors font-light">Engineering Journals</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-neutral-400 hover:text-white text-sm transition-colors font-light">Architectural Gallery</Link>
              </li>
              <li>
                <Link to="/careers" className="text-neutral-400 hover:text-white text-sm transition-colors font-light">Careers</Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-400 hover:text-white text-sm transition-colors font-light">Search FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Office Coordinates */}
          <div className="space-y-4 col-span-1">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gold font-semibold">Headquarters</h4>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              {COMPANY_METRICS.headquarters}<br />
              Bangalore, Karnataka, India
            </p>
            <p className="text-neutral-500 text-xs font-mono">
              Coordinates: 12.9250° N, 77.5898° E
            </p>
          </div>

          {/* Communications */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gold font-semibold">Inquiries</h4>
            <p className="text-neutral-400 text-sm font-light">
              General: info@rightcon.in<br />
              Direct: +91 99000 00000 <span className="text-xs text-neutral-500">(Placeholder)</span>
            </p>
            <div className="pt-2">
              <a 
                href="https://wa.me/919900000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-gold hover:bg-gold hover:text-charcoal text-gold font-mono text-xs uppercase tracking-widest px-4 py-2 transition-all duration-300 font-semibold"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-neutral-500 text-xs font-mono">
          <p>© {new Date().getFullYear()} Rightcon Constructions Pvt. Ltd. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-neutral-300 cursor-pointer">Terms of Build</span>
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Lock</span>
            <span className="hover:text-neutral-300 cursor-pointer">10-Year Structural Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

