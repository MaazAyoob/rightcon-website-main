import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "advisor",
      text: "Hi! I'm here to answer questions about construction costs, packages, timelines, materials, and the building process.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const drawerRef = useRef(null);
  const navigate = useNavigate();

  // 1. Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 2. Timed one-time tooltip (6 seconds delay, hides after 5 seconds, session locked)
  useEffect(() => {
    const hasSeenTooltip = sessionStorage.getItem("rightcon_chat_tooltip");
    if (!hasSeenTooltip) {
      const showTimer = setTimeout(() => {
        setShowTooltip(true);
        sessionStorage.setItem("rightcon_chat_tooltip", "true");
      }, 6000);

      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 11000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  // 3. Click outside handler to close the drawer
  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        // Close drawer if target isn't the toggle button itself
        const toggleBtn = document.getElementById("chat-toggle-btn");
        if (toggleBtn && !toggleBtn.contains(event.target)) {
          setIsOpen(false);
        }
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleActionClick = (action) => {
    const userMsg = action;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    simulateAdvisorResponse(userMsg);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputValue("");
    simulateAdvisorResponse(userMsg);
  };

  const simulateAdvisorResponse = (query) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const text = query.toLowerCase();
      let reply = "";

      if (text.includes("cost") || text.includes("calculator") || text.includes("price") || text.includes("estimate")) {
        reply = "Our Bangalore turnkey construction rates are: Standard Package at ₹1,650/sqft, Premium at ₹1,850/sqft, and Luxury at ₹2,150/sqft. You can click 'Estimate Cost' or navigate to our Cost Calculator page to get a detailed projection.";
      } else if (text.includes("compare") || text.includes("package") || text.includes("tier")) {
        reply = "We offer three primary specs: Standard (quality essentials), Premium (advanced materials with seasoned wood), and Luxury (custom millwork, automation prep). I can redirect you to our Services page to compare full details.";
      } else if (text.includes("consult") || text.includes("book") || text.includes("meeting") || text.includes("appointment")) {
        reply = "I'd be glad to arrange a briefing at our Jayanagar office or schedule a virtual session. Please check our Contact page to set it up, or leave your phone number here and our engineering advisor will schedule a call.";
      } else if (text.includes("project") || text.includes("portfolio") || text.includes("completed")) {
        reply = "We have delivered over 200 bespoke residences, including the Sudheendra Residency (Bannerghatta, 4,308 sqft) and Naresh Residency (Electronic City). You can view the full case studies on our Projects page.";
      } else if (text.includes("material") || text.includes("steel") || text.includes("cement") || text.includes("concrete")) {
        reply = "Rightcon constructs structures with primary materials only: ACC/Ultratech 53-grade cement, Fe-550 TMT reinforced steel bars, seasoned teakwood joinery, and premium waterproofing membranes.";
      } else if (text.includes("timeline") || text.includes("time") || text.includes("duration")) {
        reply = "A typical G+2 residence takes between 10 to 14 months to complete, which is meticulously itemized into distinct construction phases (Foundation, Frame, Finishes) in our contracts.";
      } else {
        reply = "Thank you for reaching out. We engineer premium homes across Bangalore and Mysore with fixed-cost locks and a 10-Year structural warranty. Let me know if you would like to compare packages, estimate costs, or book a consultation.";
      }

      setMessages((prev) => [...prev, { sender: "advisor", text: reply }]);
    }, 1200);
  };

  return (
    <>
      {/* Tooltip Alert */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-24 right-6 md:right-8 z-[70] bg-charcoal text-white text-xs font-light px-4 py-3 border border-gold/40 shadow-xl max-w-xs transition-opacity duration-300">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
            <span>Need help planning your dream home?</span>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 text-white/50 hover:text-white font-mono text-[9px] px-1"
          >
            ×
          </button>
        </div>
      )}

      {/* Floating Circular 64px Trigger Button */}
      <button
        id="chat-toggle-btn"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[70] w-16 h-16 rounded-full bg-charcoal border border-gold text-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 hover:shadow-gold/15 transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.63m3.75 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12.38m3.75 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h.008M12 3c4.97 0 9 3.582 9 8c0 2.21-1.007 4.218-2.64 5.626L21 21l-4.52-2.124A10.822 10.822 0 0 1 12 19c-4.97 0-9-3.582-9-8s4.03-8 9-8Z" />
          </svg>
        )}
      </button>

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className={`fixed bottom-24 right-4 md:right-8 z-[70] w-[380px] max-w-[calc(100vw-32px)] bg-white border border-neutral-200 shadow-2xl flex flex-col transition-all duration-500 ease-out ${
          isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ height: "480px" }}
      >
        {/* Header */}
        <div className="bg-charcoal text-white p-5 border-b border-gold/30 flex justify-between items-center">
          <div className="space-y-0.5 text-left">
            <div className="font-mono text-[9px] uppercase tracking-widest text-gold font-semibold">RIGHTCON</div>
            <div className="font-display font-bold text-sm tracking-wide">CONSTRUCTION ADVISOR</div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Message area */}
        <div className="flex-grow p-5 overflow-y-auto space-y-4 scrollbar-none text-left">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div 
                className={`max-w-[85%] p-3.5 text-xs leading-relaxed ${
                  msg.sender === "user" 
                    ? "bg-gold text-charcoal font-medium" 
                    : "bg-neutral-50 text-neutral-600 border border-neutral-100 font-light"
                }`}
              >
                {msg.text}
              </div>
              <span className="font-mono text-[8px] text-neutral-400 mt-1 uppercase">
                {msg.sender === "user" ? "YOU" : "RIGHTCON ADVISOR"}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex flex-col items-start">
              <div className="bg-neutral-50 text-neutral-400 text-xs px-4 py-3 border border-neutral-100 font-mono italic">
                Analyzing specification logs...
              </div>
            </div>
          )}
        </div>

        {/* Quick action buttons container */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-100 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => handleActionClick("Estimate Construction Cost")}
            className="bg-white border border-neutral-200 hover:border-gold hover:text-gold text-[10px] font-mono uppercase px-3 py-1.5 transition-colors cursor-pointer"
          >
            Estimate Cost
          </button>
          <button
            onClick={() => handleActionClick("Compare Packages")}
            className="bg-white border border-neutral-200 hover:border-gold hover:text-gold text-[10px] font-mono uppercase px-3 py-1.5 transition-colors cursor-pointer"
          >
            Compare Packages
          </button>
          <button
            onClick={() => handleActionClick("Book Free Consultation")}
            className="bg-white border border-neutral-200 hover:border-gold hover:text-gold text-[10px] font-mono uppercase px-3 py-1.5 transition-colors cursor-pointer"
          >
            Book Consultation
          </button>
          <button
            onClick={() => handleActionClick("View Completed Projects")}
            className="bg-white border border-neutral-200 hover:border-gold hover:text-gold text-[10px] font-mono uppercase px-3 py-1.5 transition-colors cursor-pointer"
          >
            View Projects
          </button>
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-neutral-200 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about your dream home..."
            className="flex-grow text-xs px-3 py-2.5 border border-neutral-200 focus:outline-none focus:border-gold font-light"
          />
          <button
            type="submit"
            className="bg-charcoal text-white hover:bg-gold hover:text-charcoal p-2.5 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}

