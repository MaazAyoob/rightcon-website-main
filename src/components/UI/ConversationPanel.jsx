import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollSystem } from '../../context/ScrollContext';
import { mascotBrain } from '../../services/mascotBrain';

const RESPONSES = {
  welcome: "Welcome. I am Rightcon's AI Digital Architect companion. I monitor this session's structural logs, geomechanical data, and layout coordinates. Select a query or type below to explore our engineering philosophy.",
  project_general: "We are currently reviewing our Selected Monoliths. These are premium residential estates constructed in Bangalore and Mysuru, featuring deep geomechanical plinth raft layouts and Fe550D rebar matrices.",
  project_emerald: "The Emerald Terraces is a 12,500 SQ. FT. Whitefield estate. It is engineered with a 900mm double-layer plinth raft foundation to isolate clay-soil moisture expansion, anchoring M40 columns.",
  project_mono: "The Koramangala Monolith in Bangalore features exposed-aggregate structural pillars cast inside custom resin moulds to eliminate joint lines. It boasts a 3.5m cantilever facade with zero support pillars.",
  project_villa: "The Jayalakshmipuram Villa in Mysuru is anchored using 12 seismic rock-bolt collars directly into shallow granite bedrock. Its stack-ventilated terracotta facade passive-cools the rooms naturally.",
  boq: "Our BOQ concrete estimator calculates slab metrics dynamically using IS_456:2000 standard algorithms. Sliders calculate core concrete volume (cubic yards) and Fe550D reinforcement steel weight (KG).",
  bim: "LOD 400 BIM coordination enables us to resolve utility line and structural rebar geometry collisions in a synchronized virtual twin model, ensuring zero mechanical clashes before site pour.",
  materials: "Rightcon maintains strict trace logs for all materials: hand-cut Travertine blocks, kiln-dried Burma Teak log timber, and Fe550D high-ductility steel rebar joints. We refuse cheap cosmetic veneers or hollow drywalls.",
  why: "We are Karnataka's only studio that anchors a 10-year transferable structural warranty directly in the property deed. Every single column is load-tested at day 7 and day 28 in certified labs.",
  enquiry: "Once you submit an enquiry, our Indiranagar HQ registers the geotechnical coordinates of your site. A certified geomechanical estimator will establish contact within 24 hours to schedule standard penetration tests.",
  nav_projects: "Telemetry scan confirms Completed Monoliths ledger. I can teleport you directly to the Projects page, or we can discuss specific Bangalore/Mysuru locations. Would you like me to take you there?",
  nav_services: "Our design workflows, BOQ concrete calculator, and LOD 400 BIM twin coordination coordinates are loaded. Let's teleport to the Services page.",
  careers_open: "We have active openings for Structural Design Coordinators, Geotechnical Auditors, MEP Clash Detailers, and Site Supervisors in Bangalore. Submit your CV on the Careers page.",
  careers_culture: "At Rightcon Indiranagar HQ, we prioritize zero-tolerance structural execution, scientific bedrock compactions, and collaborative LOD 400 coordinate twinning.",
  contact_speed: "Our certified engineers respond to all geomechanical site requests and estimate registrations within 24 hours.",
  contact_audits: "You can book Standard Penetration Tests (SPT), soil compaction evaluations, exposed-aggregate mould coordination, or full BOQ concrete slabs validation.",
  warranty_registered: "Yes, our 10-Year structural warranty deed is registered directly within the sale deed, anchored inside the property registration logs to protect valuation.",
  concrete_crush: "We load-test M40 concrete cubes at 7 and 28 days in accredited ISO labs. We reject any batch scoring under 40 N/mm².",
  package: "Rightcon coordinates three flagship execution packages: Standard Structural (Fe550D/M25), Premium Villa (Fe550D/M40 with BIM coordination), and Bespoke Monolith (Custom exposed concrete, granite bedrock rock-bolts, and Burma teak log trace registers). Type 'request an estimate' to book a geomechanical advisor audit.",
};

const SUGGESTION_POSES = {
  welcome: { pose: "wave", emotion: "friendly" },
  project_general: { pose: "pointing", emotion: "curious" },
  project_emerald: { pose: "pointing", emotion: "thinking" },
  project_mono: { pose: "pointing", emotion: "excited" },
  project_villa: { pose: "pointing", emotion: "thinking" },
  boq: { pose: "thinking", emotion: "focused" },
  bim: { pose: "inspect", emotion: "thinking" },
  materials: { pose: "inspect", emotion: "focused" },
  why: { pose: "confirmQuality", emotion: "friendly" },
  enquiry: { pose: "pointing", emotion: "helpful" },
  nav_projects: { pose: "pointing", emotion: "friendly" },
  nav_services: { pose: "pointing", emotion: "focused" },
  careers_open: { pose: "wave", emotion: "friendly" },
  careers_culture: { pose: "confident", emotion: "happy" },
  contact_speed: { pose: "confirmQuality", emotion: "friendly" },
  contact_audits: { pose: "pointing", emotion: "helpful" },
  warranty_registered: { pose: "confirmQuality", emotion: "happy" },
  concrete_crush: { pose: "inspect", emotion: "focused" },
  package: { pose: "thinking", emotion: "focused" },
};

const KEYWORDS_DICTIONARY = [
  {
    keys: ["hello", "hi", "hey", "greet", "greetings", "welcome"],
    response: "Hello! I am your Rightcon AI Digital Architect companion. Ask me about our 10-Year Warranty, geomechanical testing, RERA compliance, or LOD 400 BIM coordinate clash resolution.",
    pose: "wave",
    emotion: "friendly"
  },
  {
    keys: ["who are you", "who is this", "your name", "mascot", "bot", "companion"],
    response: "I am the Rightcon Digital Architect companion, a real-time monitor of your project's physical data and geomechanical alignment. I guide visitors through our engineering systems.",
    pose: "confident",
    emotion: "happy"
  },
  {
    keys: ["founder", "maaz", "ayoob", "creator", "owner"],
    response: "Maaz Ayoob is our founder and chief estimator. He leads our team of structural engineers at our Indiranagar headquarters to ensure every slab is structurally unshakeable.",
    pose: "pointing",
    emotion: "curious"
  },
  {
    keys: ["rera", "karnataka rera", "registration", "certified"],
    response: "Rightcon is fully registered under Karnataka RERA (reg: PRM_KA_RERA_1251). We maintain absolute compliance, scheduling transparency, and public ledger auditing.",
    pose: "confirmQuality",
    emotion: "focused"
  },
  {
    keys: ["soil", "bedrock", "foundation", "testing", "borewell", "geomechanical", "clay", "penetration", "spt"],
    response: "We perform Standard Penetration Tests up to 8 meters. Our villas anchor directly into the bedrock with geomechanical compactions to eliminate structural settling risks.",
    pose: "inspect",
    emotion: "thinking"
  },
  {
    keys: ["concrete", "cube", "m40", "compressive", "strength", "crush", "batch"],
    response: "We crush concrete cubes at day 7 and day 28 in certified laboratories. We target a minimum M40 compressive strength (averaging 42.5 N/mm²) to ensure extreme load capacity.",
    pose: "confirmQuality",
    emotion: "focused"
  },
  {
    keys: ["warranty", "deed", "10 year", "structural warranty", "transferable"],
    response: "Rightcon provides Karnataka's first 10-year transferable structural warranty registered inside the property deed. It covers 100% of repairs or recasts, protecting your asset's valuation.",
    pose: "confirmQuality",
    emotion: "happy"
  },
  {
    keys: ["bim", "clash", "lod 400", "lod", "digital twin", "conduit", "clashes", "pipeline"],
    response: "Our LOD 400 BIM coordination compiles a precise digital twin model. We resolve mechanical, structural, and plumbing line clashes in virtual space before pouring any concrete.",
    pose: "inspect",
    emotion: "thinking"
  },
  {
    keys: ["teak", "travertine", "steel", "materials", "sourcing", "providence"],
    response: "We use direct-sourced Burma Teak timber, hand-split Travertine bedrock stone, and high-ductility Fe550D steel rebars. We reject veneers, cheap aggregates, and hollow plaster.",
    pose: "inspect",
    emotion: "focused"
  },
  {
    keys: ["emerald", "terraces", "whitefield"],
    response: "The Emerald Terraces in Whitefield is a 12,500 sq.ft. estate with M40 concrete columns and a 900mm bedrock raft foundation to counter clay soil expansion.",
    pose: "pointing",
    emotion: "thinking"
  },
  {
    keys: ["koramangala", "monolith"],
    response: "The Koramangala Monolith features exposed aggregate concrete cast in custom resin moulds to eliminate joints, supporting a 3.5m cantilever with zero columns.",
    pose: "pointing",
    emotion: "excited"
  },
  {
    keys: ["jayalakshmipuram", "villa", "mysuru", "karnataka"],
    response: "Our Jayalakshmipuram Villa in Mysuru features 12 seismic rock-bolt collars anchored in shallow granite bedrock and a stack-ventilated terracotta cooling system.",
    pose: "pointing",
    emotion: "thinking"
  },
  {
    keys: ["calculator", "boq", "estimator", "slabs", "depth", "volume"],
    response: "Our BOQ concrete estimator calculates slab metrics dynamically using IS_456:2000 standard algorithms. Sliders calculate core concrete volume (cubic yards) and Fe550D reinforcement steel weight (KG).",
    pose: "thinking",
    emotion: "focused"
  },
  {
    keys: ["projects", "portfolio", "monoliths", "estates", "villas", "completed"],
    response: "Opening the Completed Monoliths registry... Preparing coordinate teleportation.",
    pose: "pointing",
    emotion: "helpful",
    navigate: "/projects"
  },
  {
    keys: ["services", "estimator", "boq", "bim", "clash", "calculator", "estimation"],
    response: "Loading BOQ estimators and MEP clash models... Redirecting to Services page.",
    pose: "inspect",
    emotion: "focused",
    navigate: "/services"
  },
  {
    keys: ["process", "workflow", "stages", "casting", "phases", "foundation"],
    response: "Scanning 5-phase foundation and concrete pouring workflows... Redirecting to Process page.",
    pose: "pointing",
    emotion: "helpful",
    navigate: "/process"
  },
  {
    keys: ["materials", "teak", "travertine", "wood", "stone", "marble", "sourcing"],
    response: "Retrieving hand-cut Travertine and Burma Teak logs registry... Navigating to Materials page.",
    pose: "inspect",
    emotion: "focused",
    navigate: "/materials"
  },
  {
    keys: ["about", "history", "philosophy", "legacy", "company", "team", "rightcon"],
    response: "Accessing heritage logs and chief estimator details... Redirecting to About page.",
    pose: "confident",
    emotion: "happy",
    navigate: "/about"
  },
  {
    keys: ["contact", "book", "inquire", "appointment", "schedule", "audit", "office", "hq"],
    response: "Opening geomechanical site coordinate mapping page... Redirecting to Contact page.",
    pose: "pointing",
    emotion: "helpful",
    navigate: "/contact"
  },
  {
    keys: ["warranty", "warranty deed", "10 year", "guarantee"],
    response: "Loading 10-Year Transferable Warranty deed records... Navigating to Why Rightcon page.",
    pose: "confirmQuality",
    emotion: "happy",
    navigate: "/why-rightcon"
  },
  {
    keys: ["careers", "jobs", "hiring", "openings", "join"],
    response: "Retrieving active structural and MEP coordinator job openings... Navigating to Careers board.",
    pose: "wave",
    emotion: "friendly",
    navigate: "/careers"
  },
  {
    keys: ["insights", "blog", "articles", "journal", "education"],
    response: "Opening design education database and engineering articles... Redirecting to Insights page.",
    pose: "pointing",
    emotion: "curious",
    navigate: "/insights"
  },
  {
    keys: ["faq", "frequently asked questions", "questions"],
    response: "Loading standard compliance, RERA, and concrete verification FAQs... Navigating to FAQs.",
    pose: "pointing",
    emotion: "curious",
    navigate: "/faq"
  },
  {
    keys: ["testimonials", "reviews", "clients", "owners"],
    response: "Opening homeowner verification records and testimonials... Navigating to Testimonials page.",
    pose: "wave",
    emotion: "friendly",
    navigate: "/testimonials"
  },
  {
    keys: ["technology", "digital twin", "clash detection"],
    response: "Opening BIM LOD 400 digital twin MEP clash coordinates... Navigating to Technology page.",
    pose: "inspect",
    emotion: "focused",
    navigate: "/technology"
  },
  {
    keys: ["client journey", "journey", "milestones"],
    response: "Retrieving 5-stage geological compaction and handover protocols... Navigating to Client Journey.",
    pose: "pointing",
    emotion: "helpful",
    navigate: "/client-journey"
  },
  {
    keys: ["home", "homepage", "start", "exit"],
    response: "Returning to coordinate entrance... Redirecting to Homepage.",
    pose: "wave",
    emotion: "friendly",
    navigate: "/"
  },
  {
    keys: ["price", "cost", "budget"],
    response: "Our custom villa executions range from ₹3,500 to ₹5,500 per sq. ft., depending on foundations, structural spans, and custom formworks. You can use our BOQ concrete calculator in the Services page or request an audit.",
    pose: "thinking",
    emotion: "focused"
  },
  {
    keys: ["location", "address", "office", "indiranagar"],
    response: "Our design headquarters is located in Indiranagar, Bangalore. We coordinate projects across Bangalore Urban, Bangalore Rural, and Mysuru. You can submit details on our Contact page.",
    pose: "pointing",
    emotion: "friendly"
  },
  {
    keys: ["phone", "email", "whatsapp"],
    response: "Reach our Indiranagar HQ at +91 98451 00000 or email info@rightcon.in. You can also message our estimators on WhatsApp at +91 98451 00000.",
    pose: "wave",
    emotion: "friendly"
  },
  {
    keys: ["package", "packages", "pricing"],
    response: "Rightcon coordinates three flagship execution packages: Standard Structural (Fe550D/M25), Premium Villa (Fe550D/M40 with BIM coordination), and Bespoke Monolith (Custom exposed concrete, granite bedrock rock-bolts, and Burma teak log trace registers). Type 'request an estimate' to book a geomechanical advisor audit.",
    pose: "thinking",
    emotion: "focused"
  }
];

export default function ConversationPanel() {
  const { 
    isChatOpen, 
    setIsChatOpen,
    activeScene,
    hoveredProject,
    hoveredService,
    setMascotPose,
    setMascotEmotion,
    setMascotSpeech,
    menuOpen,
    isTablet,
  } = useScrollSystem();

  const location = useLocation();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [customQuery, setCustomQuery] = useState("");
  
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const [shouldRender, setShouldRender] = useState(isChatOpen);

  useEffect(() => {
    if (isChatOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);

  // Helper to map route welcome messages
  const getWelcomeMessage = (path) => {
    switch (path) {
      case '/services':
        return "Welcome to our Services section. I am here to guide you through our structural estimators, LOD 400 BIM twin checks, and geological penetration logs.";
      case '/about':
        return "Welcome to our Heritage logs. Audit our creator's mandates, Indiranagar HQ telemetry, and geological values.";
      case '/projects':
        return "These are our Completed Monoliths in Bangalore and Mysuru. We build with M40 concrete targets and Fe550D reinforcement grids.";
      case '/process':
        return "This is our step-by-step foundation and concrete casting pipeline. I monitor Standard Penetration Tests, compaction parameters, and structural handovers.";
      case '/materials':
        return "Behold our raw materials registry. We source direct hand-cut Italian Travertine and high-density Burma Teak.";
      case '/careers':
        return "Welcome to our Careers department. We are actively hiring structural coordinators, supervisors, and MEP estimators in Bangalore.";
      case '/contact':
        return "Ready to register site coordinates? Our Indiranagar HQ registers compaction tests and penetrations.";
      case '/why-rightcon':
        return "Audit our structural security registers. We register a 10-Year transferable warranty deed inside the property deed, load-testing columns at day 7 and 28.";
      case '/technology':
        return "This is our BIM LOD 400 coordination deck. We scan mechanical, structural, and plumbing conduit coordinates in virtual twin systems.";
      case '/client-journey':
        return "This is the 5-stage geological advisor map. We guide you from Standard Penetration Test compactions to final blueprint handover.";
      case '/testimonials':
        return "Read verified homeowner validations and structural certifications directly from Bangalore estates.";
      case '/faq':
        return "Have compliance or concrete questions? Ask me about Karnataka RERA, Fe550D steel codes, slab depth calculations, or bedrock compactions.";
      case '/insights':
        return "Read our architectural insights, design guides, and geotechnical blogs.";
      default:
        return "Welcome. I am Rightcon's AI Digital Architect companion. I monitor this session's structural logs, geomechanical data, and layout coordinates.";
    }
  };

  const getPageName = (path) => {
    const formatted = path.substring(1).replace('-', ' ');
    return formatted ? formatted.toUpperCase() : "HOME";
  };

  // Bot response typewriter animator
  const triggerBotResponse = (responseText, matchedEntry = null) => {
    setIsTyping(true);
    setDisplayText("");
    
    let index = 0;
    const speed = 18; // Very snappy and high-end
    
    // Answering gesture
    setMascotPose('inspect');
    setMascotEmotion('focused');

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + responseText.charAt(index));
      index++;
      if (index >= responseText.length) {
        clearInterval(interval);
        setIsTyping(false);
        setMessages((prev) => [...prev, { sender: 'bot', text: responseText }]);
        setDisplayText("");
        
        // Final pose reaction (Answering/Celebration/Waiting)
        if (matchedEntry && matchedEntry.pose) {
          setMascotPose(matchedEntry.pose);
          setMascotEmotion(matchedEntry.emotion || 'calm');
        } else {
          setMascotPose('confirmQuality'); // Thumbs up
          setMascotEmotion('happy');
          setTimeout(() => {
            setMascotPose('idle');
            setMascotEmotion('calm');
          }, 2000);
        }
      }
    }, speed);
  };

  // Initialize page-welcome on first panel open
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      const welcome = getWelcomeMessage(location.pathname);
      triggerBotResponse(welcome);
    }
  }, [isChatOpen]);

  // Handle page shifts in active chat (Conversation Memory)
  useEffect(() => {
    if (isChatOpen && messages.length > 0) {
      const pageName = getPageName(location.pathname);
      const syncNote = `Telemetry synchronized with ${pageName} coordinates. Ask me anything about this section.`;
      triggerBotResponse(syncNote);
    }
  }, [location.pathname]);

  // Auto-focus input after transition completes
  useEffect(() => {
    if (isChatOpen) {
      const timer = setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);

  // Mascot typing/listening pose controller
  useEffect(() => {
    if (!isChatOpen) return;
    
    if (isTyping) {
      // Handled by triggerBotResponse
    } else if (customQuery.trim().length > 0) {
      setMascotPose('attentiveForm'); // Listening / user typing indicator
      setMascotEmotion('focused');
    } else {
      setMascotPose('idle');
      setMascotEmotion('calm');
    }
  }, [customQuery, isTyping, isChatOpen]);

  // Scroll viewport when content changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [displayText, messages]);

  const handleChipClick = async (label, key) => {
    if (isTyping) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: label }]);
    setIsTyping(true);
    setDisplayText("");

    // Set mascot to thinking state
    setMascotPose('listening');
    setMascotEmotion('focused');

    try {
      const reply = await mascotBrain.askMascot(label, location.pathname);
      triggerBotResponse(reply.text, {
        pose: reply.intent,
        emotion: 'helpful'
      });
    } catch (err) {
      console.error("Mascot reply failed:", err);
      setIsTyping(false);
    }

    // Coordinate redirect
    const routeMap = {
      nav_process: '/process',
      nav_contact: '/contact',
      nav_projects: '/projects',
    };
    if (routeMap[key]) {
      setTimeout(() => {
        navigate(routeMap[key]);
        setIsChatOpen(false);
      }, 2000);
    }
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (isTyping || !customQuery.trim()) return;

    const query = customQuery;
    setCustomQuery("");

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setIsTyping(true);
    setDisplayText("");

    // Look thoughtful/nodding while "AI is thinking/generating"
    setMascotPose('listening');
    setMascotEmotion('focused');

    try {
      const reply = await mascotBrain.askMascot(query, location.pathname);
      triggerBotResponse(reply.text, {
        pose: reply.intent,
        emotion: 'focused'
      });
    } catch (err) {
      console.error("Mascot reply failed:", err);
      setIsTyping(false);
    }
  };

  const handleClose = () => {
    setMascotPose('wave');
    setMascotEmotion('friendly');
    setIsChatOpen(false);
  };

  // Suggestion chips (Show only if conversation has not fully progressed)
  const showChips = messages.length <= 1 && !isTyping;
  const CHIPS = [
    { label: "🏡 Tell me about Rightcon", key: "why" },
    { label: "🏗 Show your construction process", key: "nav_process" },
    { label: "📐 Explain BOQ", key: "boq" },
    { label: "🏠 Recommend the right package", key: "package" },
    { label: "💰 Request an estimate", key: "enquiry" },
    { label: "📞 Book a consultation", key: "nav_contact" },
    { label: "📍 View recent projects", key: "nav_projects" }
  ];

  if (!shouldRender) return null;

  return (
    <>
      {/* Tablet Backdrop Overlay */}
      {isTablet && isChatOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1199] animate-fade-in"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}
      
      <div 
        className={`fixed z-[1200] flex flex-col gap-4 font-sans theme-dark text-white select-none transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            isTablet
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] rounded-lg border border-white/10 bg-charcoal/98 shadow-2xl p-6'
              : 'bottom-0 left-0 right-0 w-full rounded-t-xl p-6 pb-safe bg-charcoal/98 border-t border-white/10 md:bottom-28 md:right-12 md:left-auto md:w-[380px] md:rounded-none md:p-space-24 md:border md:bg-charcoal/90 md:backdrop-blur-md md:shadow-[0_32px_80px_rgba(0,0,0,0.35)]'
          }
          ${
            isChatOpen 
              ? 'opacity-100 scale-100 pointer-events-auto' 
              : isTablet
                ? 'opacity-0 scale-95 pointer-events-none'
                : 'opacity-0 translate-y-full pointer-events-none'
          }
        `}
      >
        {/* Mobile drag handle indicator */}
        {!isTablet && (
          <div 
            className="md:hidden bottom-sheet-handle" 
            onClick={handleClose}
            aria-label="Close bottom sheet"
          />
        )}

        {/* Top elegance accent line */}
        <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[var(--color-brand-blue)]/40 to-transparent"></div>

      {/* Header Info */}
      <div className="flex justify-between items-start border-b border-white/10 pb-space-8">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-blue)] animate-pulse"></div>
          <span className="h-label-mono text-[var(--color-brand-blue)] font-bold">
            RIGHTCON AI // COMPANION ONLINE
          </span>
        </div>
        <button 
          onClick={handleClose}
          className="hover:text-[var(--color-brand-blue)] font-sans text-[10px] uppercase tracking-wider transition-colors cursor-pointer text-white/50 border-none bg-transparent"
        >
          Close ✕
        </button>
      </div>

      {/* Chat Messages Viewport */}
      <div ref={chatContainerRef} className="flex flex-col min-h-[140px] max-h-[220px] overflow-y-auto pr-1">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col gap-1 mb-3.5 animate-fade-in ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="font-sans text-[7.5px] text-accent/80 uppercase tracking-widest font-bold">
              {msg.sender === 'user' ? 'VISITOR // INPUT' : 'ARCHITECT // AI'}
            </span>
            <div className={`p-2.5 rounded-none max-w-[85%] text-[11px] font-sans font-light leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-primary/10 border border-primary/30 text-white' 
                : 'bg-white/[0.02] border border-white/10 text-white/95'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-col gap-1 mb-3.5 items-start">
            <span className="font-sans text-[7.5px] text-accent/80 uppercase tracking-widest font-bold">
              ARCHITECT // TELEMETRY FEED
            </span>
            <div className="p-2.5 rounded-none max-w-[85%] text-[11px] font-sans font-light leading-relaxed bg-white/[0.02] border border-white/10 text-white/95">
              {displayText}
              <span className="inline-block w-1.5 h-3 bg-[var(--color-brand-blue)] ml-1 animate-pulse"></span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive suggested chips */}
      {showChips && (
        <div className="flex flex-col gap-2 border-t border-white/10 pt-3.5">
          <span className="font-sans text-[8px] text-accent/80 uppercase tracking-wider mb-1 font-bold">
            RECOMMENDED AUDITS:
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pr-0.5 font-sans">
            {CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip.label, chip.key)}
                className="py-1 px-2 border border-white/10 hover:border-primary/40 rounded-none font-sans text-[9px] text-white/70 hover:text-primary hover:bg-white/[0.02] transition-all cursor-pointer whitespace-nowrap"
              >
                {chip.label.split(' ')[0]} {chip.label.substring(chip.label.indexOf(' ') + 1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom input form */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2 border-t border-white/10 pt-3.5">
        <input 
          ref={inputRef}
          type="text" 
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          placeholder={isTyping ? "AI Architect is answering..." : "Ask a custom question..."}
          disabled={isTyping}
          className="flex-1 bg-charcoal/40 border border-white/10 hover:border-white/20 focus:border-primary/60 focus:outline-none rounded-none px-3 py-1.5 font-sans text-[11px] text-white placeholder-white/30 transition-all disabled:opacity-50"
        />
        <button 
          type="submit" 
          disabled={isTyping || !customQuery.trim()}
          className={`px-3 bg-primary/10 border border-primary/35 hover:bg-primary hover:text-white font-sans text-[10px] font-bold text-primary uppercase tracking-widest transition-all rounded-none cursor-pointer ${
            isTyping || !customQuery.trim() ? 'opacity-40 cursor-default' : ''
          }`}
        >
          Send
        </button>
      </form>

      {/* Reference logs code */}
      <div className="flex justify-between h-label-mono text-[7px] border-t border-white/10 pt-space-8 text-white/30 font-bold">
        <span>SESSION: RC-ARCH-X</span>
        <span>SYS_LOG: ACTIVE</span>
      </div>
      </div>
    </>
  );
}
