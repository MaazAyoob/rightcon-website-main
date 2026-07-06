// Luxury Architectural Project Case Studies and Services Registry
export const PROJECTS_DATA = [
  {
    id: "emerald-terraces",
    title: "The Emerald Terraces",
    category: "Luxury Villas",
    status: "Completed",
    location: "Whitefield, Bangalore",
    area: "8,500 Sq.Ft",
    year: "2024",
    client: "Dr. Aditya Sen",
    heroImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&auto=format&fit=crop&q=80",
    overview: "A monolithic residence featuring exposed cast-in-place concrete and floating travertine terraces, detailed with structural geomechanical precision to float above the site's natural contours.",
    challenge: "The property is built on an unstable 18-degree clay slope. Standard footings threatened structural shifting over a 5-year cycle, necessitating a specialized deep geomechanical compaction piles foundation.",
    process: "We executed 18 friction piles reaching 12m deep to secure bedrock anchor coordinates, then cast a seismic raft slab using Day 28 cubes test verified M40 grade concrete.",
    materials: ["Exposed Cast Concrete", "Italian Travertine Slabs", "Teak Lumber Frames", "Raw Structural Steel"],
    timeline: "18 Months (Geotechnical audit to handover)",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop"
    ],
    beforeImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
    testimonial: {
      quote: "Rightcon's geomechanical rigour was absolute. While other contractors suggested generic pillars, Maaz mapped the bedrock profile and delivered a landmark that feels structurally unshakeable.",
      author: "Dr. Aditya Sen"
    }
  },
  {
    id: "koramangala-monolith",
    title: "Koramangala Monolith",
    category: "Residential",
    status: "Completed",
    location: "Koramangala, Bangalore",
    area: "6,200 Sq.Ft",
    year: "2023",
    client: "Kiran & Nidhi Rao",
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&auto=format&fit=crop&q=80",
    overview: "A brutalist-inspired multi-generational home structured with raw concrete spans, expansive floor-to-ceiling structural glazing, and integrated inner courtyard breeze shafts.",
    challenge: "High groundwater table level in Koramangala required active hydrostatic pressure mitigation and multi-layer waterproof membranes to prevent subgrade moisture seepage.",
    process: "We implemented double tanking and dynamic pressure relief valves under the reinforced concrete basement raft, with constant laser telemetry checking for shift coordinates.",
    materials: ["Textured Formwork Concrete", "Belgium Performance Glass", "Basalt Stone Tile", "Custom Brass Fixtures"],
    timeline: "14 Months (Soil audit to handover)",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop"
    ],
    beforeImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=800&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop",
    testimonial: {
      quote: "The visual honesty of the concrete finish is remarkable. There are zero plaster layers, zero covers—just raw geomechanical strength configured beautifully.",
      author: "Kiran Rao"
    }
  },
  {
    id: "jayalakshmipuram-villa",
    title: "Jayalakshmipuram Villa",
    category: "Luxury Villas",
    status: "Ongoing",
    location: "Mysuru",
    area: "11,000 Sq.Ft",
    year: "2026",
    client: "Ranganath Family Trust",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80",
    overview: "An expansive private estate structured around a central heritage block, incorporating local stone masonry, teak lattices, and sustainable rainwater harvesting systems.",
    challenge: "Integrating modern heavy-load column loads with heritage local load-bearing mud-brick vaults without risking load distribution failure.",
    process: "We modeled the structural junctions using dynamic BIM LOD 400 software, integrating hidden steel structural grids to redirect heavy loads into independent footings.",
    materials: ["Mysore Chamundi Stone", "Burma Teak Wood Lattices", "Copper Sheets", "Exposed Concrete Vaults"],
    timeline: "24 Months (In Progress)",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop"
    ],
    beforeImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
    testimonial: {
      quote: "Rightcon treats construction like watchmaking. Their drawings are clash-free, and their geologists inspect bedrock samples like gemologists.",
      author: "Ranganath Prasad"
    }
  }
];

export const SERVICES_DATA = [
  {
    id: "turnkey",
    title: "Turnkey Construction",
    category: "End-to-End Craftsmanship",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80",
    overview: "Complete project ownership from geomechanical analysis to final travertine layout details, securing clash clearance models across all trades.",
    benefits: ["Clash-free MEP coordinates", "Direct vendor procurement networks", "Single point of liability"],
    deliverables: ["Virtual twin BIM coordination charts", "Material transparency registry", "RERA compliance documentation"],
    faq: [
      { q: "What is BIM LOD 400 coordination?", a: "It is a detail level model containing exact installation coordinates for piping and conduits, preventing onsite cutting or structural modifications." }
    ]
  },
  {
    id: "architecture",
    title: "Architectural Design",
    category: "Spatial Craftsmanship",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80",
    overview: "Bespoke architectural layout planning focused on volumetric transitions, raw exposure of concrete structural envelopes, and solar positioning coordination.",
    benefits: ["Optimized thermal insulation profiles", "Travertine stone cladding configurations", "Natural courtyard ventilation breeze shafts"],
    deliverables: ["Visual schematic renders", "CAD layout schedules", "Volumetric daylight analysis reports"],
    faq: [
      { q: "Do you design for specific Bangalore climates?", a: "Yes, our designs utilize high thermal mass exposed concrete and custom timber lattices to regulate temperature without relying entirely on HVAC." }
    ]
  },
  {
    id: "interior-design",
    title: "Interior Design",
    category: "Tactile Finishes",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop&q=80",
    overview: "Bespoke interior architectural coordination integrating Burmese teak fittings, brushed brass fixtures, and natural basalt stone slabs.",
    benefits: ["Zero laminate / veneer policies", "Bespoke furniture joinery details", "Exposed concrete slab finishes coordination"],
    deliverables: ["Joinery blueprint schedules", "Material sourcing swatches", "Custom lighting coordinate maps"],
    faq: [
      { q: "What is your zero-veneer policy?", a: "We believe in raw material honesty. We construct using solid timbers, raw brasses, and natural stones rather than simulated plastic laminates." }
    ]
  },
  {
    id: "boq-audits",
    title: "BOQ Estimations & Audits",
    category: "Precision Budgets",
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&auto=format&fit=crop&q=80",
    overview: "Rigorous material audits estimating raw volume specifications to isolate discrepancies, ensuring transparency before columns are poured.",
    benefits: ["Isolate material wastage by 8%", "Itemized geomechanical concrete maps", "Zero hidden invoice changes"],
    deliverables: ["Bill of Quantities ledger documents", "Material specification comparisons", "Vendor quote audits"],
    faq: [
      { q: "Why are third-party BOQ audits valuable?", a: "They ensure contractors do not inflate concrete or steel estimates, saving project capital." }
    ]
  },
  {
    id: "structural-engineering",
    title: "Structural Engineering",
    category: "Geomechanical Stability",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&auto=format&fit=crop&q=80",
    overview: "Precision calculations for pile foundations, seismic rafts, and heavy load distribution frames to anchor your residence to the site's geomechanical bedrock.",
    benefits: ["Bedrock compaction reports", "Friction piles anchoring specifications", "Seismic column reinforcements layouts"],
    deliverables: ["Structural calculation reports", "Reinforcement steel schedule records", "Geotechnical site logs"],
    faq: [
      { q: "Do you design structures for earthquakes?", a: "Yes, Mysuru and Bangalore are in low seismic zones, but our residences are engineered to withstand zone 3 specifications." }
    ]
  },
  {
    id: "project-management",
    title: "Project Management",
    category: "On-Site Rigour",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&auto=format&fit=crop&q=80",
    overview: "Daily site coordination supervising reinforcing bar alignments, concrete pour curing timelines, and RERA compliance registry checks.",
    benefits: ["Daily photographic ledger updates", "Weekly cubic crush checks telemetry", "Subgrade hydrostatic sealing audits"],
    deliverables: ["Construction stage records", "Lab concrete test documents", "MEP pressure test reports"],
    faq: [
      { q: "How are clients updated on site progress?", a: "We maintain a live digital logbook where daily site photos and concrete test outcomes are registered." }
    ]
  },
  {
    id: "material-procurement",
    title: "Material Procurement",
    category: "Sourcing Integrity",
    heroImage: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1600&auto=format&fit=crop&q=80",
    overview: "Direct procurement loops securing first-quality natural stone quarries in Italy, teak yards, and Fe-550D primary steel mills.",
    benefits: ["Verified stone slabs load testing", "Teak moisture content auditing", "Zero intermediate contractor markup fees"],
    deliverables: ["Material origin certificates", "Compressive load verification logs", "Custom order tracking sheets"],
    faq: [
      { q: "How do you verify material quality?", a: "Every stone block and teak batch is audited for density and moisture limits before shipping coordinates are cleared." }
    ]
  },
  {
    id: "bim-coordination",
    title: "BIM Coordination",
    category: "Computational Twins",
    heroImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=1600&auto=format&fit=crop&q=80",
    overview: "High precision modeling in BIM LOD 400 twins to coordinate pipes, air ducts, and structural frames prior to reinforcement pours.",
    benefits: ["Clash-free routing guarantees", "Precision structural slab pre-sleeves", "Accurate pre-cutting lists"],
    deliverables: ["BIM model twin files", "Clash report documents", "Slab core sleeve layout drawings"],
    faq: [
      { q: "What software do you coordinate with?", a: "We operate on Revit and Navisworks, exporting clean IFC files complying with international building standards." }
    ]
  }
];

export const INSIGHTS_DATA = [
  {
    id: "geomechanical-foundation-rules",
    title: "Geomechanical Foundations: Bedrock vs Soil Compaction",
    author: "Maaz Ayoob",
    date: "June 14, 2026",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop",
    excerpt: "An engineering study explaining why friction piles and geomechanical bedrock mapping are critical to preventing structural settlements in clay soils."
  },
  {
    id: "clash-free-mep-twin",
    title: "Resolving Conduit Collisions with BIM LOD 400 Twins",
    author: "BIM Coordination Studio",
    date: "May 28, 2026",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=800&auto=format&fit=crop",
    excerpt: "How pre-modeling structural and MEP runs prevents reinforcement cuts, saving concrete integrity in critical load-bearing zones."
  },
  {
    id: "travertine-selection-guide",
    title: "The Travertine Ledger: Material Sourcing in Italy",
    author: "Procurement Division",
    date: "April 11, 2026",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop",
    excerpt: "A guide to selecting, cataloging, and testing load capacities of natural Travertine slabs for exterior facades."
  }
];

export const CAREERS_DATA = [
  {
    id: "geotechnical-engineer",
    title: "Lead Geotechnical Engineer",
    location: "Bangalore HQ",
    type: "Full-Time",
    experience: "5+ Years",
    desc: "Oversee bedrock mapping, soil Compaction audits, and friction piles reinforcement logs across Karnataka project sites."
  },
  {
    id: "bim-coordinator",
    title: "BIM LOD 400 Modeler",
    location: "Indiranagar Studio",
    type: "Full-Time",
    experience: "3+ Years",
    desc: "Resolve trade collisions (structural vs mechanical) inside virtual twin models before site casting schedules."
  }
];
