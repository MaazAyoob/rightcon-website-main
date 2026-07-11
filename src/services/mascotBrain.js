/**
 * mascotBrain.js — Rightcon X V18.1 Mascot Believable Intelligence
 *
 * Core coordinator abstraction layer.
 * Includes:
 *   - MascotBrain (main state manager + memory registry)
 *   - MascotBehaviourEngine (translates page contexts & actions into behavioral intents)
 *   - ConversationManager (manages message threads & matches inputs)
 *   - LLMProvider (base class for completions)
 *   - GeminiProvider (mock provider fallback for keyword mappings, ready for async fetch later)
 */

class LLMProvider {
  async generateCompletion(prompt, context) {
    throw new Error("Method generateCompletion() must be implemented.");
  }
}

class GeminiProvider extends LLMProvider {
  constructor(conversationManager) {
    super();
    this.conversationManager = conversationManager;
  }

  async generateCompletion(prompt, context) {
    // Simulated async network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

    const promptLower = prompt.toLowerCase().trim();
    
    // Fallback dictionary matching for off-line operation
    const keywordMatches = [
      {
        keys: ["hello", "hi", "hey", "greet", "greetings", "welcome"],
        response: "Hello! I am your Rightcon Digital Engineer. Ask me about our 10-Year Warranty, geomechanical testing, RERA compliance, or LOD 400 BIM coordinate clash resolution.",
        intent: "welcome_visitor"
      },
      {
        keys: ["who are you", "who is this", "your name", "mascot", "bot", "companion"],
        response: "I am Rightcon's Digital Engineer. I monitor this session's structural logs, geomechanical compactions, and coordinates.",
        intent: "confident"
      },
      {
        keys: ["rera", "karnataka rera", "registration", "certified"],
        response: "Rightcon is registered under RERA Karnataka (PRM_KA_RERA_1251). We operate on structural transparency.",
        intent: "confirm_quality"
      },
      {
        keys: ["soil", "bedrock", "foundation", "testing", "geomechanical", "compaction", "spt"],
        response: "We coordinate Standard Penetration Tests up to 12m deep to secure bedrock anchors and verify zero-settlement foundation rafts.",
        intent: "measure_building"
      },
      {
        keys: ["concrete", "cube", "m40", "strength", "crush"],
        response: "We crush concrete test cubes at day 7 and day 28 in certified labs to ensure Fe550D reinforcement grids meet structural loads.",
        intent: "check_alignment"
      },
      {
        keys: ["warranty", "deed", "10 year", "structural warranty"],
        response: "Our 10-Year structural warranty is registered directly inside the sale deed, protecting your villa's valuation.",
        intent: "confirm_quality"
      },
      {
        keys: ["bim", "clash", "lod 400", "twin", "collision"],
        response: "LOD 400 BIM twins resolve plumbing, electrical, and structural layout overlaps in virtual space before pouring concrete.",
        intent: "check_alignment"
      },
      {
        keys: ["materials", "teak", "travertine", "wood", "stone"],
        response: "We verify teak trace registers and Italian Travertine quarry logs directly, with a strict zero-laminate structural policy.",
        intent: "inspect_materials"
      }
    ];

    for (const match of keywordMatches) {
      for (const key of match.keys) {
        if (promptLower.includes(key)) {
          return {
            text: match.response,
            intent: match.intent
          };
        }
      }
    }

    // Default conversational fallbacks
    const fallbacks = [
      {
        text: "I've registered your query. I monitor our geomechanical testing logs, Fe550D rebar matrices, and BIM coordination models. Try asking about 'BIM clashes' or 'M40 concrete testing'.",
        intent: "idle_explore"
      },
      {
        text: "Bedrock and compaction records verified. Ask me about our 10-Year transferable warranty deed, or direct quarry Travertine logs.",
        intent: "inspect_materials"
      }
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}

class ConversationManager {
  constructor() {
    this.messages = [];
  }

  addMessage(sender, text) {
    this.messages.push({ sender, text, timestamp: Date.now() });
    if (this.messages.length > 20) {
      this.messages.shift(); // keep history bounded
    }
  }

  getHistory() {
    return this.messages;
  }
}

class MascotBehaviourEngine {
  constructor(brain) {
    this.brain = brain;
    this.activeIntent = "idle_explore";
  }

  updatePageContext(path) {
    this.brain.recordPageVisit(path);
    
    // Set natural behavioral intent overrides based on active page
    switch (path) {
      case '/':
        this.activeIntent = "welcome_visitor";
        break;
      case '/about':
      case '/careers':
        this.activeIntent = "examine_history";
        break;
      case '/projects':
        this.activeIntent = "inspect_project";
        break;
      case '/services':
        this.activeIntent = "measure_building";
        break;
      case '/process':
        this.activeIntent = "check_alignment";
        break;
      case '/materials':
        this.activeIntent = "inspect_materials";
        break;
      case '/insights':
        this.activeIntent = "read_article";
        break;
      case '/contact':
        this.activeIntent = "receptionist_wait";
        break;
      default:
        this.activeIntent = "idle_explore";
    }
    return this.activeIntent;
  }
}

class MascotBrain {
  constructor() {
    this.memory = this.loadMemory();
    this.conversationManager = new ConversationManager();
    this.behaviourEngine = new MascotBehaviourEngine(this);
    this.llmProvider = new GeminiProvider(this.conversationManager);
  }

  loadMemory() {
    try {
      const stored = localStorage.getItem('rightcon_mascot_memory');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Mascot memory failed loading:", e);
    }
    
    return {
      pageVisits: {},      // pathname -> count
      pageDwellTimes: {},  // pathname -> seconds spent
      chatOpenedCount: 0,
      keyClaimed: false,
      welcomeCount: 0,
      favoriteSection: 'home'
    };
  }

  saveMemory() {
    try {
      localStorage.setItem('rightcon_mascot_memory', JSON.stringify(this.memory));
    } catch (e) {
      console.warn("Mascot memory failed saving:", e);
    }
  }

  recordPageVisit(path) {
    if (!this.memory.pageVisits[path]) {
      this.memory.pageVisits[path] = 0;
    }
    this.memory.pageVisits[path]++;
    
    // Evaluate favorite section based on highest visits
    let maxVisits = 0;
    let favorite = 'home';
    Object.entries(this.memory.pageVisits).forEach(([p, visits]) => {
      if (visits > maxVisits && p !== '/') {
        maxVisits = visits;
        favorite = p.substring(1);
      }
    });
    this.memory.favoriteSection = favorite;
    this.saveMemory();
  }

  recordDwellTime(path, seconds) {
    if (!this.memory.pageDwellTimes[path]) {
      this.memory.pageDwellTimes[path] = 0;
    }
    this.memory.pageDwellTimes[path] += seconds;
    this.saveMemory();
  }

  incrementChatOpened() {
    this.memory.chatOpenedCount++;
    this.saveMemory();
  }

  setKeyClaimed() {
    this.memory.keyClaimed = true;
    this.saveMemory();
  }

  async askMascot(query, pageContext = "") {
    this.conversationManager.addMessage('user', query);
    
    const contextStr = `Active Page: ${pageContext}. Favorite Page: ${this.memory.favoriteSection}. Key Claimed: ${this.memory.keyClaimed}.`;
    const replyObj = await this.llmProvider.generateCompletion(query, contextStr);
    
    this.conversationManager.addMessage('bot', replyObj.text);
    return replyObj;
  }
}

// Export singleton instance
export const mascotBrain = new MascotBrain();
