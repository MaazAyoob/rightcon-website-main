import React, { useState, useEffect, useRef } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

const RESPONSES = {
  welcome: "Welcome. I am Rightcon's AI Digital Architect companion. I monitor this session's structural logs, geomechanical data, and layout coordinates. Select a query or type below to explore our engineering philosophy.",
  project_general: "We are currently reviewing our Selected Monoliths. These are premium residential estates constructed in Bangalore and Mysuru, featuring deep geomechanical plinth raft layouts and Fe550D rebar matrices.",
  project_emerald: "The Emerald Terraces is a 12,500 SQ. FT. Whitefield estate. It is engineered with a 900mm double-layer plinth raft foundation to isolate clay-soil moisture expansion, anchoring 32 columns of M40-grade concrete.",
  project_mono: "The Koramangala Monolith in Bangalore features exposed-aggregate structural pillars cast inside custom resin moulds to eliminate joint lines. It boasts a 3.5m cantilever facade with zero support pillars.",
  project_villa: "The Jayalakshmipuram Villa in Mysuru is anchored using 12 seismic rock-bolt collars directly into shallow granite bedrock. Its stack-ventilated terracotta facade passive-cools the rooms naturally.",
  boq: "Our BOQ concrete estimator calculates slab metrics dynamically using IS_456:2000 standard algorithms. Sliders calculate core concrete volume (cubic yards) and Fe550D reinforcement steel weight (KG).",
  bim: "LOD 400 BIM coordination enables us to resolve utility line and structural rebar geometry collisions in a synchronized virtual twin model, ensuring zero mechanical clashes before site pour.",
  materials: "Rightcon maintains strict trace logs for all materials: hand-cut Travertine blocks, kiln-dried Burma Teak log timber, and Fe550D high-ductility steel rebar joints. We refuse cheap cosmetic veneers or hollow drywalls.",
  why: "We are Karnataka's only studio that anchors a 10-year transferable structural warranty directly in the property deed. Every single column is load-tested at day 7 and day 28 in certified labs.",
  enquiry: "Once you submit an enquiry, our Indiranagar HQ registers the geotechnical coordinates of your site. A certified geomechanical estimator will establish contact within 24 hours to schedule standard penetration tests."
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
  enquiry: { pose: "pointing", emotion: "helpful" }
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
  }
];

export default function ConversationPanel() {
  const { 
    conversationOpen, 
    setConversationOpen,
    activeScene,
    hoveredProject,
    hoveredService,
    setMascotPose,
    setMascotEmotion
  } = useScrollSystem();

  const [activeText, setActiveText] = useState(RESPONSES.welcome);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [customQuery, setCustomQuery] = useState("");
  const textEndRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    if (!conversationOpen) return;
    
    setIsTyping(true);
    setDisplayText("");
    
    let index = 0;
    const text = activeText;
    const speed = 22; // ms per char (snappy yet readable)
    
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [activeText, conversationOpen]);

  // Scroll to bottom of message when text updates
  useEffect(() => {
    if (textEndRef.current) {
      textEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayText]);

  // Mascot attentive typing focus pose
  useEffect(() => {
    if (!conversationOpen) return;
    if (customQuery.trim().length > 0 && !isTyping) {
      setMascotPose('attentiveForm');
      setMascotEmotion('focused');
    } else if (customQuery.trim().length === 0 && !isTyping) {
      setMascotPose('idle');
      setMascotEmotion('calm');
    }
  }, [customQuery, conversationOpen, isTyping, setMascotPose, setMascotEmotion]);

  if (!conversationOpen) return null;

  // Build context-aware prompts based on what the user is currently viewing
  const getPrompts = () => {
    const list = [];
    
    if (activeScene === 3) {
      if (hoveredProject === 0) {
        list.push({ label: "Tell me about The Emerald Terraces", key: "project_emerald" });
      } else if (hoveredProject === 1) {
        list.push({ label: "Tell me about Koramangala Monolith", key: "project_mono" });
      } else if (hoveredProject === 2) {
        list.push({ label: "Tell me about Jayalakshmipuram Villa", key: "project_villa" });
      } else {
        list.push({ label: "Tell me about these projects", key: "project_general" });
      }
    } else if (activeScene === 5) {
      if (hoveredService === 0) {
        list.push({ label: "Explain the BOQ concrete estimator", key: "boq" });
      } else if (hoveredService === 1) {
        list.push({ label: "Explain LOD 400 Clash Detection", key: "bim" });
      } else if (hoveredService === 2) {
        list.push({ label: "Explain Material Providence logs", key: "materials" });
      } else {
        list.push({ label: "Explain BOQ slabs & coordination", key: "boq" });
      }
    }

    // Default static prompts
    list.push({ label: "Why choose Rightcon?", key: "why" });
    list.push({ label: "What materials do you use?", key: "materials" });
    list.push({ label: "What happens after I inquire?", key: "enquiry" });

    // Filter duplicates
    const unique = [];
    const seen = new Set();
    list.forEach(item => {
      if (!seen.has(item.key)) {
        seen.add(item.key);
        unique.push(item);
      }
    });

    return unique.slice(0, 3); // Return max 3 contextually relevant prompts
  };

  const handleSelectPrompt = (key) => {
    if (isTyping) return;
    setActiveText(RESPONSES[key] || RESPONSES.welcome);
    const sp = SUGGESTION_POSES[key] || SUGGESTION_POSES.welcome;
    setMascotPose(sp.pose);
    setMascotEmotion(sp.emotion);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (isTyping || !customQuery.trim()) return;

    const queryLower = customQuery.toLowerCase().trim();
    let matched = null;

    for (const entry of KEYWORDS_DICTIONARY) {
      for (const key of entry.keys) {
        if (queryLower.includes(key)) {
          matched = entry;
          break;
        }
      }
      if (matched) break;
    }

    if (matched) {
      setActiveText(matched.response);
      setMascotPose(matched.pose);
      setMascotEmotion(matched.emotion);
    } else {
      const fallbacks = [
        "I've logged your query regarding that coordinate layer. Try asking about: RERA, 10-Year Warranty, M40 Concrete, or LOD 400 BIM Clashes.",
        "My telemetry database covers bedrock testing, materials sourcing, and BIM clash detection. Try asking about 'soil testing', 'Burma teak', or 'seismic anchors'!",
        "Query unresolved. I specialize in Rightcon's structural blueprints and geomechanical auditing. Try asking about 'foundations', 'cantilever', or 'Mysuru villa'."
      ];
      const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      setActiveText(randomFallback);
      setMascotPose('shrug');
      setMascotEmotion('curious');
    }

    setCustomQuery("");
  };

  const handleClose = () => {
    setConversationOpen(false);
    setMascotPose('idle');
    setMascotEmotion('calm');
  };

  return (
    <div className="fixed bottom-28 right-8 md:right-12 z-[100] w-[90%] max-w-sm glass-panel rounded-sm p-space-24 shadow-[0_32px_80px_rgba(0,0,0,0.35)] flex flex-col gap-space-16 animate-fade-in font-sans theme-dark text-ivory select-none">
      
      {/* Visual elegant bronze line at top */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-bronze/40 to-transparent"></div>

      {/* Header info */}
      <div className="flex justify-between items-start border-b border-white/10 pb-space-8">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse"></div>
          <span className="h-label-mono text-bronze font-bold">
            RIGHTCON AI // COMPANION ONLINE
          </span>
        </div>
        <button 
          onClick={handleClose}
          className="hover:text-bronze font-mono text-[9px] uppercase tracking-wider transition-colors cursor-pointer text-white/50 border-none bg-transparent"
        >
          Close ✕
        </button>
      </div>

      {/* Dialog viewport */}
      <div className="flex flex-col min-h-[110px] max-h-[180px] overflow-y-auto pr-1">
        <p className="text-[12.5px] font-sans font-light leading-relaxed text-ivory/95">
          {displayText}
          {isTyping && (
            <span className="inline-block w-1.5 h-3 bg-bronze ml-1 animate-pulse"></span>
          )}
        </p>
        <div ref={textEndRef} />
      </div>

      {/* Dynamic interactive prompts */}
      <div className="flex flex-col gap-2 border-t border-white/10 pt-space-12">
        <span className="h-label-mono mb-1">
          SUGGESTED QUERIES:
        </span>
        {getPrompts().map((prompt, i) => (
          <button
            key={i}
            disabled={isTyping}
            onClick={() => handleSelectPrompt(prompt.key)}
            className={`w-full text-left py-2 px-3 border border-white/10 hover:border-bronze/40 rounded-sm font-mono text-[9px] tracking-wide text-ivory/70 hover:text-bronze transition-all bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer ${
              isTyping ? 'opacity-40 cursor-default' : ''
            }`}
          >
            &gt; {prompt.label}
          </button>
        ))}
      </div>

      {/* Custom query input form */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2 border-t border-white/10 pt-3">
        <input 
          type="text" 
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          placeholder="Ask a custom question..."
          className="flex-1 bg-charcoal/40 border border-white/10 hover:border-white/20 focus:border-bronze/60 focus:outline-none rounded-sm px-3 py-1.5 font-mono text-[9px] text-ivory placeholder-white/30 transition-all"
        />
        <button 
          type="submit" 
          disabled={isTyping || !customQuery.trim()}
          className={`px-3 bg-bronze/10 border border-bronze/35 hover:bg-bronze hover:text-charcoal font-mono text-[9.5px] font-bold text-bronze uppercase tracking-widest transition-all rounded-sm cursor-pointer ${
            isTyping || !customQuery.trim() ? 'opacity-40 cursor-default' : ''
          }`}
        >
          Send
        </button>
      </form>

      {/* Coordinates reference log */}
      <div className="flex justify-between h-label-mono text-[7px] border-t border-white/10 pt-space-8 text-ivory/40">
        <span>SESSION: RC-ARCH-X</span>
        <span>SYS_LOG: ACTIVE</span>
      </div>

    </div>
  );
}
