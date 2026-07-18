import { useState } from "react";

export default function Careers() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "structural-engineer",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const roles = [
    {
      title: "Senior Structural Detailing Engineer",
      dept: "Design & Engineering Studio",
      loc: "Jayanagar, Bangalore",
      desc: "Compile slab framing layouts, column details, and foundation load plans. Requires M.Tech in Structural Engineering and 5+ years experience."
    },
    {
      title: "Site Civil Supervisor",
      dept: "Project Execution Desk",
      loc: "Site-Based (Bangalore)",
      desc: "Supervise concrete castings, water curing logs, and manage framing trades. Requires B.E./Diploma in Civil Engineering and 3+ years experience."
    },
    {
      title: "Lead Finishing Architect",
      dept: "Architectural Studio",
      loc: "Jayanagar, Bangalore",
      desc: "Design internal joinery layouts, woodwork cladding details, and coordinate finishing trades. Requires B.Arch and 4+ years experience."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 space-y-24">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl border-b border-neutral-100 pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">JOIN THE TEAM</span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-charcoal uppercase tracking-tight">
            CAREERS AT RIGHTCON
          </h1>
          <p className="text-neutral-500 font-light text-base md:text-lg leading-relaxed">
            Constructing Bangalore's premium residences requires engineering discipline, precision, and craftsmanship. We look for dedicated professionals to join our studios.
          </p>
        </div>

        {/* Culture & Operations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal uppercase leading-tight">
              ENGINEERING RESIDENTIAL INNOVATION
            </h2>
            <div className="w-12 h-0.5 bg-gold"></div>
            <p className="text-neutral-600 text-sm leading-relaxed font-light">
              Rightcon replaces standard builder compromises with in-house accountability. We hire talented engineers, detailers, and project managers who operate under our strict Quality Book standards.
            </p>
            <p className="text-neutral-600 text-sm leading-relaxed font-light">
              We offer structured career paths, exposure to premium civil projects, and a collaborative work culture at our Jayanagar headquarters.
            </p>
          </div>
          <div className="lg:col-span-6 aspect-[16/10] overflow-hidden bg-neutral-100 border border-neutral-200">
            <img 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" 
              alt="Engineers reviewing structural details on site" 
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </div>
        </div>

        {/* Open Positions Grid */}
        <div className="space-y-12">
          <h2 className="font-display font-bold text-2xl text-charcoal uppercase border-b border-neutral-100 pb-4">
            OPEN POSITIONS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, idx) => (
              <div key={idx} className="border border-neutral-150 p-8 space-y-6 flex flex-col justify-between hover:border-gold transition-colors duration-300">
                <div className="space-y-4">
                  <span className="font-mono text-xs text-gold font-semibold uppercase">{role.dept}</span>
                  <h3 className="font-display font-bold text-lg text-charcoal uppercase leading-tight">{role.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light">{role.desc}</p>
                </div>
                <div className="pt-6 border-t border-neutral-100 mt-6 text-[10px] font-mono text-neutral-400 uppercase">
                  Location: {role.loc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-grain p-8 md:p-12 border border-neutral-100 max-w-3xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl text-charcoal uppercase">APPLY TO RIGHTCON</h2>
            <p className="text-neutral-405 text-xs font-light">Please file your details. Our HR studio will review your application records.</p>
          </div>

          {submitted ? (
            <div className="bg-white p-8 border border-gold/30 text-center space-y-4">
              <span className="text-gold font-mono text-xl block">✔</span>
              <h4 className="font-display font-bold text-lg text-charcoal">APPLICATION FILED</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">Thank you. Our Jayanagar HR coordinator will review your profile logs shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="app-name" className="block text-xs font-mono uppercase text-neutral-500 tracking-wider">FULL NAME *</label>
                  <input 
                    type="text" 
                    id="app-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter full name"
                    className="w-full bg-white border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-1 min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="app-email" className="block text-xs font-mono uppercase text-neutral-500 tracking-wider">EMAIL ADDRESS *</label>
                  <input 
                    type="email" 
                    id="app-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter email"
                    className="w-full bg-white border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-1 min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="app-phone" className="block text-xs font-mono uppercase text-neutral-500 tracking-wider">PHONE NUMBER *</label>
                  <input 
                    type="tel" 
                    id="app-phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Enter phone number"
                    className="w-full bg-white border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-1 min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="app-role" className="block text-xs font-mono uppercase text-neutral-500 tracking-wider">TARGET ROLE</label>
                  <select 
                    id="app-role"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="w-full bg-white border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-1 min-h-[44px]"
                  >
                    <option value="structural-engineer">Senior Structural Detailing Engineer</option>
                    <option value="site-supervisor">Site Civil Supervisor</option>
                    <option value="lead-architect">Lead Finishing Architect</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="app-msg" className="block text-xs font-mono uppercase text-neutral-500 tracking-wider">PROFILE OVERVIEW</label>
                <textarea 
                  id="app-msg"
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your structural detailing or execution history"
                  className="w-full bg-white border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-1"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-charcoal text-white hover:bg-gold hover:text-charcoal transition-colors duration-300 font-mono text-xs uppercase tracking-widest py-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 min-h-[44px] cursor-pointer"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
