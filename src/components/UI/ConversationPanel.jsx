import React, { useState, useEffect, useRef } from 'react';
import { useScrollSystem } from '../../context/ScrollContext';

const RESPONSES = {
  welcome: "Welcome. I am Rightcon's AI Digital Architect companion. I monitor this session's structural logs, geomechanical data, and layout coordinates. Select a query below to explore our engineering philosophy.",
  project_general: "We are currently reviewing our Selected Monoliths. These are premium residential estates constructed in Bangalore and Mysuru, featuring deep geomechanical plinth raft layouts and Fe550D rebar matrices.",
  project_emerald: "The Emerald Terraces is a 12,500 SQ. FT. Whitefield estate. It is engineered with a 900mm double-layer plinth raft foundation to isolate clay-soil moisture expansion, anchoring 32 columns of M40-grade concrete.",
  project_mono: "The Koramangala Monolith in Bangalore features exposed-aggregate structural pillars cast inside custom resin moulds to eliminate joint lines. It boasts a 3.5m cantilever facade with zero support pillars.",
  project_villa: "The Jayalakshmipuram Villa in Mysuru is anchored using 12 seismic rock-bolt collars directly into shallow granite bedrock. Its stack-ventilated terracotta facade passive-cools the rooms naturally.",
  boq: "Our BOQ concrete estimator calculates slab metrics dynamically using IS_456:2000 standard algorithms. Sliders calculate core concrete volume (cubic yards) and Fe550D reinforcement steel weight (KG).",
  bim: "LOD 400 BIM coordination enables us to resolve utility line and structural rebar geometry collisions in a synchronized virtual twin model, ensuring zero mechanical clashes before site pour.",
  materials: "Rightcon maintains strict trace logs for all materials: hand-cut Travertine blocks, kiln-dried Burma Teak log lumber, and Fe550D high-ductility steel rebar joints. We refuse cheap cosmetic veneers or hollow drywalls.",
  why: "We are Karnataka's only studio that anchors a 10-year transferable structural warranty directly in the property deed. Every single column is load-tested at day 7 and day 28 in certified labs.",
  enquiry: "Once you submit an enquiry, our Indiranagar HQ registers the geotechnical coordinates of your site. A certified geomechanical estimator will establish contact within 24 hours to schedule standard penetration tests."
};

export default function ConversationPanel() {
  const { 
    conversationOpen, 
    setConversationOpen,
    activeScene,
    hoveredProject,
    hoveredService
  } = useScrollSystem();

  const [activeText, setActiveText] = useState(RESPONSES.welcome);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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

  if (!conversationOpen) return null;

  // Build context-aware prompts based on what the user is currently viewing
  const getPrompts = () => {
    const list = [];
    
    if (activeScene === 3) {
      // Projects scene active
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
      // Services scene active
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
  };

  return (
    <div className="fixed bottom-28 right-8 md:right-16 z-[100] w-[90%] max-w-sm border border-white/10 bg-[#171614]/85 backdrop-blur-xl rounded-md p-6 shadow-2xl flex flex-col gap-5 animate-fade-in font-sans text-white select-none">
      
      {/* Visual Cyan decoration line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#49B8FF] to-transparent"></div>

      {/* Header info */}
      <div className="flex justify-between items-start border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#49B8FF] animate-ping"></div>
          <span className="font-mono text-[8px] text-[#49B8FF] tracking-[0.25em] uppercase font-bold">
            RIGHTCON AI // COMPANION ONLINE
          </span>
        </div>
        <button 
          onClick={() => setConversationOpen(false)}
          className="text-stone hover:text-[#D4AF37] font-mono text-[9px] uppercase tracking-wider transition-colors cursor-pointer"
        >
          Close ✕
        </button>
      </div>

      {/* Dialog viewport */}
      <div className="flex flex-col min-h-[120px] max-h-[220px] overflow-y-auto pr-1">
        <p className="text-[12.5px] font-light text-stone-light leading-relaxed">
          {displayText}
          {isTyping && (
            <span className="inline-block w-1.5 h-3 bg-[#49B8FF] ml-1 animate-pulse"></span>
          )}
        </p>
        <div ref={textEndRef} />
      </div>

      {/* Dynamic interactive prompts */}
      <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
        <span className="font-mono text-[7px] text-stone tracking-widest uppercase mb-1">
          SUGGESTED QUERIES:
        </span>
        {getPrompts().map((prompt, i) => (
          <button
            key={i}
            disabled={isTyping}
            onClick={() => handleSelectPrompt(prompt.key)}
            className={`w-full text-left py-2 px-3 border border-white/5 hover:border-[#D4AF37]/50 rounded-sm font-mono text-[9px] tracking-wide text-stone-light hover:text-[#D4AF37] transition-all bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer ${
              isTyping ? 'opacity-40 cursor-default' : ''
            }`}
          >
            &gt; {prompt.label}
          </button>
        ))}
      </div>

      {/* Blueprint Coordinates reference log */}
      <div className="flex justify-between font-mono text-[7px] text-stone/50 border-t border-white/5 pt-3">
        <span>SESSION: RC-ARCH-X</span>
        <span>SYS_LOG: BOQ_ACTIVE</span>
      </div>

    </div>
  );
}
