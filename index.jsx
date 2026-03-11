import { useState, useEffect, useCallback } from "react";
import { BookOpen, FlaskConical, Brain, Clock, User, ChevronRight, Zap, Target, TrendingUp, Calendar, CheckCircle, Home, MessageSquare, Table, ArrowRight, Flame, ArrowLeft, AlertTriangle, Star, RotateCcw, Minus, Check, Beaker } from "lucide-react";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Libre+Franklin:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #16120e;
      --bg2: #1c1812;
      --surface: #211d18;
      --surface2: #2a251f;
      --surface3: #332e27;
      --border: rgba(255,235,190,0.07);
      --border2: rgba(255,235,190,0.13);
      --border3: rgba(255,235,190,0.22);

      --gold: #e8b84b;
      --gold-dim: rgba(232,184,75,0.1);
      --gold-mid: rgba(232,184,75,0.2);
      --gold-bright: #f0ca6e;

      --sage: #7eb89a;
      --sage-dim: rgba(126,184,154,0.1);

      --rose: #d4706a;
      --rose-dim: rgba(212,112,106,0.1);

      --sky: #6aadd4;
      --sky-dim: rgba(106,173,212,0.1);

      --lavender: #9b85c7;
      --lavender-dim: rgba(155,133,199,0.1);

      --text: #f5ead8;
      --text-warm: #c9b89a;
      --text-muted: #7a6e60;
      --text-faint: #4a433b;

      --font-display: 'Playfair Display', Georgia, serif;
      --font-body: 'Libre Franklin', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;

      --r: 10px;
      --r-lg: 16px;
      --r-xl: 22px;
    }

    html, body, #root { height: 100%; background: var(--bg); color: var(--text); }
    body {
      font-family: var(--font-body);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    /* Grain texture overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      opacity: 0.6;
    }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border3); border-radius: 3px; }

    .serif { font-family: var(--font-display); }
    .mono { font-family: var(--font-mono); }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0px); }
      50%      { transform: translateY(-5px); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes glow-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(232,184,75,0.3); }
      50%       { box-shadow: 0 0 0 8px rgba(232,184,75,0); }
    }

    .fade-up   { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; }
    .fade-in   { animation: fadeIn 0.35s ease both; }
    .float     { animation: floatY 3.5s ease-in-out infinite; }

    .d1 { animation-delay: 0.06s; }
    .d2 { animation-delay: 0.12s; }
    .d3 { animation-delay: 0.18s; }
    .d4 { animation-delay: 0.24s; }
    .d5 { animation-delay: 0.30s; }
    .d6 { animation-delay: 0.36s; }

    /* ── Cards ── */
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--r-lg);
      transition: border-color 0.2s, box-shadow 0.25s, transform 0.2s;
    }
    .card:hover { border-color: var(--border2); }
    .card-lift {
      cursor: pointer;
    }
    .card-lift:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(232,184,75,0.08);
      border-color: var(--border3);
    }

    /* ── Buttons ── */
    .btn {
      display: inline-flex; align-items: center; gap: 7px;
      font-family: var(--font-body); font-size: 13px; font-weight: 600;
      border-radius: var(--r); padding: 10px 20px;
      cursor: pointer; transition: all 0.2s; border: none; letter-spacing: 0.01em;
    }
    .btn-gold {
      background: var(--gold); color: #1a1409;
    }
    .btn-gold:hover {
      background: var(--gold-bright);
      transform: translateY(-1px);
      box-shadow: 0 6px 22px rgba(232,184,75,0.3);
    }
    .btn-outline {
      background: transparent; color: var(--text-warm);
      border: 1px solid var(--border2);
    }
    .btn-outline:hover {
      border-color: var(--border3); color: var(--text);
      background: rgba(255,255,255,0.03);
    }

    /* ── Inputs ── */
    .field {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: var(--r);
      padding: 11px 15px;
      color: var(--text);
      font-family: var(--font-body);
      font-size: 14px;
      width: 100%;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .field:focus {
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(232,184,75,0.1);
    }
    .field::placeholder { color: var(--text-faint); }

    /* ── Progress ── */
    .bar-track {
      background: var(--surface3);
      border-radius: 999px;
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      border-radius: 999px;
      transition: width 0.9s cubic-bezier(0.34,1.56,0.64,1);
    }

    /* ── Nav ── */
    .nav-btn {
      display: flex; align-items: center; gap: 9px;
      padding: 9px 12px; border-radius: 9px;
      cursor: pointer; transition: all 0.15s;
      color: var(--text-muted); font-size: 13px; font-weight: 500;
      border: none; background: none; width: 100%; text-align: left;
      font-family: var(--font-body);
    }
    .nav-btn:hover { background: rgba(255,235,190,0.04); color: var(--text-warm); }
    .nav-btn.on {
      background: var(--gold-dim);
      color: var(--gold);
      border: 1px solid rgba(232,184,75,0.18);
    }

    /* ── Divider ── */
    .rule { border: none; border-top: 1px solid var(--border); }

    /* ── Label ── */
    .label {
      font-family: var(--font-mono);
      font-size: 9.5px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-muted);
    }

    /* ── Pill tag ── */
    .pill {
      display: inline-flex; align-items: center;
      font-family: var(--font-mono); font-size: 10px;
      padding: 2px 8px; border-radius: 99px;
      letter-spacing: 0.04em;
    }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const UNITS = [
  { id:1, title:"Atomic Structure & Properties",        color:"#6aadd4", bg:"rgba(106,173,212,0.1)",  icon:"⚛️",  topics:8 },
  { id:2, title:"Molecular & Ionic Compound Structure", color:"#7eb89a", bg:"rgba(126,184,154,0.1)", icon:"🔗",  topics:7 },
  { id:3, title:"Intermolecular Forces & Properties",   color:"#e8b84b", bg:"rgba(232,184,75,0.1)",  icon:"💧",  topics:6 },
  { id:4, title:"Chemical Reactions",                   color:"#d4706a", bg:"rgba(212,112,106,0.1)", icon:"⚗️",  topics:9 },
  { id:5, title:"Kinetics",                             color:"#9b85c7", bg:"rgba(155,133,199,0.1)", icon:"⚡",  topics:7 },
  { id:6, title:"Thermodynamics",                       color:"#d4906a", bg:"rgba(212,144,106,0.1)", icon:"🔥",  topics:8 },
  { id:7, title:"Equilibrium",                          color:"#6abfbf", bg:"rgba(106,191,191,0.1)", icon:"⚖️",  topics:7 },
  { id:8, title:"Acids & Bases",                        color:"#d4706a", bg:"rgba(212,112,106,0.1)", icon:"🧪",  topics:9 },
  { id:9, title:"Electrochemistry",                     color:"#c9a84c", bg:"rgba(201,168,76,0.1)",  icon:"🔋",  topics:6 },
];

const NAV = [
  { id:"dashboard",  label:"Dashboard",    icon:Home },
  { id:"units",      label:"Units",        icon:BookOpen },
  { id:"flashcards", label:"Flashcards",   icon:Brain },
  { id:"problems",   label:"Problem Bank", icon:Target },
  { id:"chatbot",    label:"AI Tutor",     icon:MessageSquare },
  { id:"reference",  label:"Reference",    icon:Table },
  { id:"exam",       label:"Exam Mode",    icon:Clock },
];

// ─── STUDY GUIDE DATA ─────────────────────────────────────────────────────────
const GUIDE_DATA = {
  1: {
    title:"Atomic Structure & Properties", icon:"⚛️", color:"#6aadd4",
    overview:"Unit 1 covers the fundamental building blocks of matter — atoms, subatomic particles, electron configurations, and periodic trends. This unit is the conceptual foundation for all of AP Chemistry.",
    apTips:["Electron configuration appears on nearly every AP exam","Periodic trends are heavily tested — know all four","Know the Cr and Cu exceptions to Aufbau cold"],
    sections:[
      { id:"1-1", title:"Subatomic Particles & the Nucleus",
        content:`Atoms consist of protons (charge +1, mass ≈ 1 amu), neutrons (charge 0, mass ≈ 1 amu) in the nucleus, and electrons (charge −1, negligible mass) surrounding it.\n\nAtomic number (Z) = number of protons = defines the element.\nMass number (A) = protons + neutrons.\nIsotopes: same Z, different A (same element, different neutron count).\nAverage atomic mass = weighted average by natural abundance.`,
        equations:[{label:"Mass Number",formula:"A = Z + N"},{label:"Avg Atomic Mass",formula:"Σ(mass × abundance)"}],
        keyTerms:["atomic number","mass number","isotope","nucleon"],
        mistake:"Don't confuse mass number (always a whole number) with atomic mass (weighted average, usually a decimal)." },
      { id:"1-2", title:"Electron Configuration",
        content:`Electrons fill orbitals following three rules:\n• Aufbau Principle: Fill lowest energy first (1s→2s→2p→3s→3p→4s→3d→4p…)\n• Pauli Exclusion: Max 2 electrons per orbital, opposite spins\n• Hund's Rule: Fill degenerate orbitals singly before pairing\n\nExceptions: Cr = [Ar] 3d⁵4s¹ · Cu = [Ar] 3d¹⁰4s¹\n(Half-filled and fully-filled d subshells have extra stability)`,
        equations:[{label:"Max e⁻ per shell",formula:"2n²"},{label:"Subshell capacity",formula:"s:2 / p:6 / d:10 / f:14"}],
        keyTerms:["orbital","subshell","valence electron","Aufbau","Pauli","Hund's rule","paramagnetic"],
        mistake:"Use noble gas shorthand on the AP exam. [Ar] 3d⁶4s² is much faster than writing the full configuration." },
      { id:"1-3", title:"Photoelectron Spectroscopy (PES)",
        content:`PES measures binding energy needed to remove electrons from each subshell.\n\nReading a PES spectrum:\n• Higher binding energy (left) = core electrons, closer to nucleus\n• Lower binding energy (right) = valence electrons\n• Peak height ∝ number of electrons in that subshell\n• Use to identify elements or verify electron configuration`,
        equations:[{label:"Photon energy",formula:"E = hf = hc/λ"},{label:"Photoelectric",formula:"KE = hf − BE"}],
        keyTerms:["binding energy","PES spectrum","photoelectron","ionization"],
        mistake:"PES graphs often put HIGH binding energy on the LEFT (reversed x-axis). Always check the axis direction before interpreting." },
      { id:"1-4", title:"Periodic Trends",
        content:`Trends arise from changes in nuclear charge (Z) and electron shielding:\n\nAtomic Radius: ↑ down a group (more shells), ↓ across a period (more protons, same shielding)\nIonization Energy: ↑ across a period, ↓ down a group. Exceptions: Be>B and N>O\nElectronegativity: ↑ across and up. Fluorine is highest (4.0).\nElectron Affinity: Generally more negative across a period.\nIonic Radii: Cations < parent atom; Anions > parent atom.`,
        equations:[],
        keyTerms:["atomic radius","ionization energy","electron affinity","electronegativity","shielding","Zeff"],
        mistake:"IE exceptions: Be>B (filled 2s harder to remove than 2p) and N>O (half-filled 2p is extra stable). These appear on AP exams regularly." },
      { id:"1-5", title:"Coulomb's Law in Chemistry",
        content:`F = kq₁q₂/r² explains most of Unit 1. Larger charge or smaller distance = stronger interaction.\n\nApplications:\n• Smaller atoms → higher IE (electrons closer to nucleus)\n• Fluorine most electronegative (high Z, tiny size)\n• Lattice energy higher for smaller, higher-charge ions\n• All periodic trends have a Coulomb's Law explanation`,
        equations:[{label:"Coulomb's Law",formula:"F = k(q₁q₂)/r²"},{label:"Potential Energy",formula:"E ∝ q₁q₂/r"}],
        keyTerms:["Coulomb's law","electrostatic force","nuclear charge","effective nuclear charge"],
        mistake:"Coulomb's Law is the conceptual key to all of Unit 1. When a question asks 'why,' the answer usually involves charge magnitude and/or distance." },
    ]
  },
  2: {
    title:"Molecular & Ionic Compound Structure", icon:"🔗", color:"#7eb89a",
    overview:"Unit 2 covers bonding — ionic and covalent bonds, Lewis structures, formal charge, VSEPR theory, and molecular geometry. Structure determines properties.",
    apTips:["Lewis structures with formal charge are very common FRQ topics","VSEPR geometry names must be memorized precisely","Resonance and bond order appear frequently"],
    sections:[
      { id:"2-1", title:"Ionic vs. Covalent Bonding",
        content:`Bonds form when atoms reach lower energy together than apart.\n\nIonic: Metal + nonmetal, electron transfer, electrostatic attraction, crystal lattice.\nCovalent: Nonmetal + nonmetal, electron sharing. Single (2e), double (4e), triple (6e).\nPolar covalent: Unequal sharing when ΔEN ≠ 0.\n\nΔEN guide:\n• <0.4 → nonpolar covalent\n• 0.4–1.7 → polar covalent\n• >1.7 → ionic`,
        equations:[{label:"Bond polarity",formula:"ΔEN = |EN_A − EN_B|"}],
        keyTerms:["ionic bond","covalent bond","polar covalent","electronegativity difference","lattice energy"],
        mistake:"ΔEN cutoffs are approximate guidelines, not rigid rules. The AP exam expects you to know the trend, not memorize exact values." },
      { id:"2-2", title:"Lewis Structures & Formal Charge",
        content:`Steps to draw Lewis structures:\n1. Count total valence electrons (+1 per negative charge, −1 per positive charge)\n2. Connect atoms with single bonds\n3. Complete octets on terminal atoms\n4. Place remaining electrons on central atom\n5. Convert lone pairs to multiple bonds if needed\n6. Minimize formal charges\n\nFormal Charge = V − L − B/2\n(V=valence e⁻, L=lone pair e⁻, B=bonding e⁻)`,
        equations:[{label:"Formal Charge",formula:"FC = V − L − B/2"}],
        keyTerms:["Lewis structure","formal charge","octet rule","expanded octet","lone pair"],
        mistake:"Hydrogen can ONLY have 2 electrons total. It is always a terminal atom and never gets an expanded octet or lone pairs." },
      { id:"2-3", title:"Resonance & Bond Order",
        content:`Resonance: multiple valid Lewis structures differing only in electron positions. The real molecule is a resonance HYBRID — a blend of all structures with delocalized electrons.\n\nBond order in hybrid = (total bonds across all structures) / (number of structures)\nExample: O₃ → bond order = 1.5\n\nHigher bond order → shorter bond → stronger bond → higher bond energy.`,
        equations:[{label:"Avg Bond Order",formula:"BO = total bonds / # structures"}],
        keyTerms:["resonance","resonance hybrid","delocalization","bond order","bond length","bond energy"],
        mistake:"Resonance structures are NOT molecules in equilibrium. The molecule is always the hybrid." },
      { id:"2-4", title:"VSEPR & Molecular Geometry",
        content:`VSEPR minimizes repulsion between electron domains (bonding + lone pairs).\n\n2 domains: linear (180°)\n3 domains: trigonal planar (120°) or bent (1 LP)\n4 domains: tetrahedral (109.5°), trigonal pyramidal (107°, 1 LP), bent (104.5°, 2 LP)\n5 domains: trigonal bipyramidal, seesaw, T-shape, linear\n6 domains: octahedral, square pyramidal, square planar\n\nDistinguish electron geometry (all domains) from molecular geometry (atoms only).`,
        equations:[],
        keyTerms:["VSEPR","electron domain","molecular geometry","electron geometry","bond angle","lone pair"],
        mistake:"Molecular geometry names refer to ATOM positions, not lone pairs. H₂O is 'bent,' not 'tetrahedral,' even with 4 electron domains." },
    ]
  },
  3: {
    title:"Intermolecular Forces & Properties", icon:"💧", color:"#e8b84b",
    overview:"Unit 3 explores forces between molecules and how they determine physical properties like boiling point, vapor pressure, viscosity, and solubility.",
    apTips:["Always identify ALL IMFs present, then determine which is strongest","Explain properties using specific force names on FRQs","Surface tension, viscosity, and vapor pressure are all IMF applications"],
    sections:[
      { id:"3-1", title:"Types of Intermolecular Forces",
        content:`London Dispersion Forces (LDF): Present in ALL molecules. Temporary dipoles from electron fluctuation. Strength ↑ with more electrons and larger surface area.\n\nDipole-Dipole: Between polar molecules. Permanent dipole alignment. Stronger than LDF for similar-sized molecules.\n\nHydrogen Bonding: H directly bonded to F, O, or N; interacts with lone pair of F/O/N on another molecule. Strongest IMF between neutral molecules.\n\nIon-Dipole: Between ions and polar molecules. Strongest IMF overall. Key in dissolving ionic compounds.`,
        equations:[],
        keyTerms:["London dispersion","dipole-dipole","hydrogen bond","ion-dipole","polarizability","temporary dipole"],
        mistake:"H-bonding requires H bonded directly to F, O, or N. HCl does NOT have hydrogen bonding — Cl is electronegative but too large." },
      { id:"3-2", title:"Properties Explained by IMFs",
        content:`Stronger IMFs → higher boiling point, higher melting point, higher viscosity, higher surface tension, lower vapor pressure.\n\nVapor Pressure: Weaker IMFs → molecules escape more easily → higher VP. Inversely related to BP.\n\nClausius-Clapeyron: ln(P₂/P₁) = −ΔHvap/R × (1/T₂ − 1/T₁)\n\nSolubility ("like dissolves like"): Polar solvents dissolve polar/ionic solutes. Nonpolar solvents dissolve nonpolar solutes.`,
        equations:[{label:"Clausius-Clapeyron",formula:"ln(P₂/P₁) = −ΔHvap/R × (1/T₂ − 1/T₁)"}],
        keyTerms:["vapor pressure","boiling point","viscosity","surface tension","miscibility","like dissolves like"],
        mistake:"Higher vapor pressure = LOWER boiling point, not higher. Many students flip this on FRQs." },
      { id:"3-3", title:"Types of Solids",
        content:`Ionic: cations + anions, electrostatic forces, high MP, brittle, conducts when molten (NaCl, MgO)\nMetallic: cations + electron sea, malleable, excellent conductor (Fe, Cu, Au)\nMolecular: molecules + IMFs, low-moderate MP, poor conductor (ice, sugar, CO₂)\nCovalent Network: atoms + covalent bonds throughout, extremely high MP, very hard, usually poor conductor (diamond, SiO₂)`,
        equations:[],
        keyTerms:["ionic solid","metallic solid","molecular solid","covalent network solid","crystal lattice"],
        mistake:"Diamond's extreme hardness comes from covalent bonds to EVERY neighboring atom in a 3D network — not from IMFs." },
    ]
  },
  4: {
    title:"Chemical Reactions", icon:"⚗️", color:"#d4706a",
    overview:"Unit 4 is the calculation engine of AP Chemistry — reaction types, balancing, stoichiometry, limiting reagents, yield, and redox. Mastering this unit is essential for all subsequent topics.",
    apTips:["Stoichiometry calculations appear on every single AP exam","Net ionic equations are almost always tested","Limiting reagent problems often have both a conceptual and calculation part"],
    sections:[
      { id:"4-1", title:"Reaction Types & Net Ionic Equations",
        content:`Major reaction types: synthesis (A+B→AB), decomposition, single replacement, double replacement (metathesis), combustion (hydrocarbon+O₂→CO₂+H₂O), redox.\n\nNet ionic equations: Write only species that actually react. Split strong electrolytes into ions. Keep weak acids, weak bases, and precipitates molecular.\n\nSpectator ions appear on both sides unchanged — omit them.`,
        equations:[],
        keyTerms:["net ionic equation","spectator ion","precipitate","metathesis","combustion","redox"],
        mistake:"Only strong electrolytes are split into ions in net ionic equations. Weak acids and precipitates stay in molecular form." },
      { id:"4-2", title:"Stoichiometry",
        content:`Mole Map: grams ÷MM→ moles →×ratio→ moles →×MM→ grams\n\nKey relationships:\n• 1 mol = 6.022×10²³ particles\n• 1 mol ideal gas at STP = 22.4 L\n• Molarity (M) = mol / L solution\n• Dilution: M₁V₁ = M₂V₂\n\nALWAYS balance the equation before calculating.`,
        equations:[{label:"Moles from mass",formula:"n = m / M"},{label:"Molarity",formula:"M = n / V(L)"},{label:"Dilution",formula:"M₁V₁ = M₂V₂"}],
        keyTerms:["mole","molar mass","molar ratio","stoichiometry","molarity","Avogadro's number"],
        mistake:"Molar ratios come from COEFFICIENTS in the balanced equation, not subscripts. Always balance first." },
      { id:"4-3", title:"Limiting Reagent & Percent Yield",
        content:`Limiting reagent runs out first, limits product formation.\n\nTo find it:\n1. Convert all reactants to moles\n2. Divide each by stoichiometric coefficient\n3. Smallest result = limiting reagent\n\nPercent yield = (actual yield / theoretical yield) × 100%`,
        equations:[{label:"Percent Yield",formula:"% yield = (actual/theoretical) × 100%"}],
        keyTerms:["limiting reagent","excess reagent","theoretical yield","actual yield","percent yield"],
        mistake:"% yield cannot exceed 100% in theory. If yours does, your theoretical yield is wrong." },
      { id:"4-4", title:"Oxidation States & Redox",
        content:`OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons).\n\nOS rules:\n1. Pure element = 0\n2. Monatomic ion = charge\n3. F always −1\n4. O usually −2 (peroxide: −1)\n5. H: +1 with nonmetals, −1 with metals\n6. Sum = overall charge`,
        equations:[],
        keyTerms:["oxidation state","OIL RIG","oxidizing agent","reducing agent","half-reaction"],
        mistake:"The oxidizing agent is REDUCED. It causes oxidation by accepting electrons from the other species." },
    ]
  },
  5: {
    title:"Kinetics", icon:"⚡", color:"#9b85c7",
    overview:"Unit 5 covers the speed of chemical reactions — rate laws, integrated rate laws, activation energy, Arrhenius equation, and mechanisms.",
    apTips:["Rate law determination from data is a guaranteed FRQ topic","Integrated rate laws and half-life are tested mathematically","Mechanisms must be consistent with both the rate law and overall equation"],
    sections:[
      { id:"5-1", title:"Reaction Rates & Rate Laws",
        content:`Rate = change in concentration / time. Always positive.\nFor aA + bB → cC: Rate = −(1/a)Δ[A]/Δt = +(1/c)Δ[C]/Δt\n\nRate Law: Rate = k[A]ⁿ[B]ᵐ\nOrders (n, m) are determined EXPERIMENTALLY — not from the balanced equation.\n\nDetermining order from data:\n• Double [A], rate doubles → 1st order\n• Double [A], rate quadruples → 2nd order\n• Double [A], no rate change → 0th order`,
        equations:[{label:"Rate Law",formula:"Rate = k[A]ⁿ[B]ᵐ"}],
        keyTerms:["reaction rate","rate law","rate constant k","reaction order","overall order"],
        mistake:"Rate law orders come from EXPERIMENTAL DATA — NEVER from the balanced equation." },
      { id:"5-2", title:"Integrated Rate Laws & Half-Life",
        content:`Integrated rate laws relate [A] to time:\n• 0th order: [A]t = [A]₀ − kt\n• 1st order: ln[A]t = ln[A]₀ − kt\n• 2nd order: 1/[A]t = 1/[A]₀ + kt\n\nHalf-lives:\n• 1st: t₁/₂ = 0.693/k (CONSTANT — doesn't depend on concentration)\n• 0th: t₁/₂ = [A]₀/2k · 2nd: t₁/₂ = 1/(k[A]₀)\n\nIdentify order: find which graph is LINEAR.`,
        equations:[{label:"1st order",formula:"ln[A]t = ln[A]₀ − kt"},{label:"1st half-life",formula:"t₁/₂ = 0.693/k"}],
        keyTerms:["integrated rate law","half-life","zero order","first order","second order","graphical analysis"],
        mistake:"Only 1st order reactions have a CONSTANT half-life. This is why radioactive decay has a well-defined half-life." },
      { id:"5-3", title:"Arrhenius Equation & Mechanisms",
        content:`Arrhenius: k = Ae^(−Ea/RT)\nHigher T → larger k → faster rate.\nln(k₂/k₁) = (Ea/R)(1/T₁ − 1/T₂)\n\nCatalysts lower Ea — shown as a lower peak in energy diagrams. Do NOT change ΔH.\n\nMechanisms: series of elementary steps summing to the overall reaction.\nRate-determining step (RDS) = slowest step → controls overall rate.\nIntermediates: produced then consumed. Catalysts: consumed then regenerated.`,
        equations:[{label:"Arrhenius",formula:"k = Ae^(−Ea/RT)"},{label:"Two-temp form",formula:"ln(k₂/k₁) = (Ea/R)(1/T₁ − 1/T₂)"}],
        keyTerms:["Arrhenius","activation energy","frequency factor","transition state","catalyst","rate-determining step","intermediate"],
        mistake:"A catalyst lowers Ea but does NOT change ΔH. Only the activation energy barrier changes." },
    ]
  },
  6: {
    title:"Thermodynamics", icon:"🔥", color:"#d4906a",
    overview:"Unit 6 covers energy flow in chemical systems — enthalpy, entropy, Gibbs free energy, and spontaneity. The central equation ΔG = ΔH − TΔS connects all three.",
    apTips:["ΔG = ΔH − TΔS is one of the most tested equations in AP Chem","Hess's Law calculations appear almost every year","Entropy sign prediction is a common conceptual question"],
    sections:[
      { id:"6-1", title:"Enthalpy (ΔH) & Hess's Law",
        content:`ΔH = heat at constant pressure. Exothermic: ΔH<0. Endothermic: ΔH>0.\n\nHess's Law: ΔH is a state function — path doesn't matter.\nΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants)\nΔH°f of elements in standard state = 0.\n\nBond enthalpy: ΔH ≈ Σ BE(broken) − Σ BE(formed)\nCalorimetry: q = mcΔT`,
        equations:[{label:"Hess's Law",formula:"ΔH°rxn = ΣΔH°f(prod) − ΣΔH°f(react)"},{label:"Bond enthalpy",formula:"ΔH ≈ ΣBE(broken) − ΣBE(formed)"},{label:"Calorimetry",formula:"q = mcΔT"}],
        keyTerms:["enthalpy","exothermic","endothermic","Hess's Law","standard enthalpy of formation","bond enthalpy","calorimetry"],
        mistake:"When reversing a reaction in Hess's Law, FLIP the sign of ΔH. When multiplying, scale ΔH by the same factor." },
      { id:"6-2", title:"Entropy & Gibbs Free Energy",
        content:`Entropy (S): energy dispersal / disorder. Always positive.\n\nΔS > 0 when: solid→liquid→gas, gas moles increase, dissolving, mixing, heating.\n\nGibbs Free Energy: ΔG = ΔH − TΔS\nΔG<0: spontaneous · ΔG>0: nonspontaneous · ΔG=0: equilibrium\n\nSpontaneity:\n• ΔH<0, ΔS>0 → always spontaneous\n• ΔH>0, ΔS<0 → never spontaneous\n• ΔH<0, ΔS<0 → spontaneous at LOW T\n• ΔH>0, ΔS>0 → spontaneous at HIGH T\n\nΔG° = −RT ln K = −nFE°cell`,
        equations:[{label:"Gibbs",formula:"ΔG = ΔH − TΔS"},{label:"Standard ΔG",formula:"ΔG° = −RT ln K"},{label:"Electrochemistry",formula:"ΔG° = −nFE°cell"}],
        keyTerms:["entropy","Gibbs free energy","spontaneous","Third Law","enthalpy driven","entropy driven"],
        mistake:"Spontaneous does NOT mean fast. Diamond→graphite is spontaneous but takes millions of years." },
    ]
  },
  7: {
    title:"Equilibrium", icon:"⚖️", color:"#6abfbf",
    overview:"Unit 7 covers dynamic equilibrium — the state where forward and reverse rates are equal. Master ICE tables and Le Chatelier's Principle and you've mastered this unit.",
    apTips:["ICE tables are the most tested calculation in this unit","Le Chatelier's Principle appears on virtually every AP exam","Know what K vs Q tell you and how to use each"],
    sections:[
      { id:"7-1", title:"Equilibrium Constant (K)",
        content:`At equilibrium, forward rate = reverse rate. Concentrations are constant but not necessarily equal.\n\nFor aA + bB ⇌ cC + dD:\nKc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ\n\nRules: Pure solids and pure liquids are NOT included.\nK >> 1: Products favored · K << 1: Reactants favored\n\nQ vs K: Q uses current concentrations.\nQ < K → shifts right · Q > K → shifts left\n\nKp = Kc(RT)^Δn`,
        equations:[{label:"Equilibrium expression",formula:"Kc = [prod]^coeff / [react]^coeff"},{label:"Kp and Kc",formula:"Kp = Kc(RT)^Δn"}],
        keyTerms:["equilibrium constant K","reaction quotient Q","Kc","Kp","dynamic equilibrium"],
        mistake:"Pure solids and liquids are NEVER included in K or Q expressions." },
      { id:"7-2", title:"ICE Tables & Le Chatelier",
        content:`ICE Table: Initial → Change → Equilibrium\n• Change row: −x for reactants, +x for products (scaled by coefficients)\n• Substitute into K, solve for x\n• Small x approximation: valid if x/[A]₀ < 5%\n\nLe Chatelier's Principle: System shifts to counteract disturbance.\n• Add reactant → shift right\n• Decrease volume → shift toward fewer gas moles\n• Increase T → shifts in endothermic direction AND changes K\n• Add inert gas at constant V → NO shift`,
        equations:[{label:"5% rule",formula:"x / [A]₀ < 0.05"}],
        keyTerms:["ICE table","small x approximation","Le Chatelier","shift","stress"],
        mistake:"Temperature is the ONLY change that alters K. Concentration and pressure changes shift equilibrium but do NOT change K." },
    ]
  },
  8: {
    title:"Acids & Bases", icon:"🧪", color:"#d4706a",
    overview:"Unit 8 is one of the largest units — acid-base definitions, strong vs. weak, pH, buffers, and titrations. Very calculation-heavy.",
    apTips:["pH calculations appear on every AP exam","Buffer problems (Henderson-Hasselbalch) are almost always on the FRQ","Know your strong acids and bases — they fully dissociate"],
    sections:[
      { id:"8-1", title:"Acid-Base Definitions",
        content:`Arrhenius: Acid → H⁺ in water; Base → OH⁻ in water.\nBrønsted-Lowry: Acid = H⁺ donor; Base = H⁺ acceptor. Every reaction produces a conjugate pair.\nLewis: Acid = e⁻ pair acceptor; Base = e⁻ pair donor.\n\nStrong acids: HCl, HBr, HI, HNO₃, H₂SO₄, HClO₃, HClO₄\nStrong bases: Group 1 hydroxides + Ca(OH)₂, Sr(OH)₂, Ba(OH)₂\nAll others are weak.`,
        equations:[{label:"Water autoionization",formula:"Kw = [H⁺][OH⁻] = 1.0×10⁻¹⁴"},{label:"Conjugate relationship",formula:"Ka × Kb = Kw"}],
        keyTerms:["Arrhenius","Brønsted-Lowry","Lewis acid/base","conjugate pair","amphoteric","strong acid","weak acid"],
        mistake:"The conjugate base of a weak acid IS a real weak base — matters for equivalence point and buffer calculations." },
      { id:"8-2", title:"pH Calculations",
        content:`pH = −log[H⁺] · pOH = −log[OH⁻] · pH + pOH = 14\n\nStrong acid: [H⁺] = [acid]\nWeak acid: [H⁺] ≈ √(Ka×C); pH = −log[H⁺]\nWeak base: [OH⁻] ≈ √(Kb×C); pH = 14 − pOH\n\nHenderson-Hasselbalch: pH = pKa + log([A⁻]/[HA])\nAt half-equivalence: [A⁻]=[HA] → pH = pKa`,
        equations:[{label:"pH",formula:"pH = −log[H⁺]"},{label:"Weak acid approx",formula:"[H⁺] ≈ √(Ka × C)"},{label:"Henderson-Hasselbalch",formula:"pH = pKa + log([A⁻]/[HA])"}],
        keyTerms:["pH","pOH","pKa","Ka","Kb","buffer","Henderson-Hasselbalch","half-equivalence point"],
        mistake:"pH is logarithmic. pH 3 is 10× more acidic than pH 4. Never interpolate pH linearly." },
      { id:"8-3", title:"Buffers & Titrations",
        content:`Buffer: weak acid + conjugate base in significant amounts. Resists pH change.\nBest buffer: [HA] ≈ [A⁻], pH ≈ pKa. Effective range: pKa ± 1.\n\nStrong acid added: reacts with A⁻ → HA\nStrong base added: reacts with HA → A⁻\n(Always work in moles first before H-H)\n\nTitration equivalence points:\n• Strong acid + strong base → pH = 7\n• Weak acid + strong base → pH > 7\n• Weak base + strong acid → pH < 7`,
        equations:[{label:"Equivalence point",formula:"moles acid = moles base"},{label:"Half-equiv point",formula:"pH = pKa"}],
        keyTerms:["buffer","buffer capacity","titration","equivalence point","half-equivalence point","indicator"],
        mistake:"Weak acid/strong base equivalence point is NOT pH 7. The conjugate base makes the solution BASIC." },
    ]
  },
  9: {
    title:"Electrochemistry", icon:"🔋", color:"#c9a84c",
    overview:"Unit 9 covers galvanic and electrolytic cells, standard cell potential, the Nernst equation, and electrolysis. Everything connects back to redox chemistry.",
    apTips:["E°cell = E°cathode − E°anode is heavily tested","The triangle: ΔG°, K, and E°cell all link together","Nernst equation connects standard to non-standard conditions"],
    sections:[
      { id:"9-1", title:"Galvanic Cells & Cell Potential",
        content:`Galvanic cell converts spontaneous redox energy → electrical energy.\n\nAnode: oxidation (An Ox) — negative electrode\nCathode: reduction (Red Cat) — positive electrode\nElectrons flow: anode → wire → cathode\nSalt bridge: maintains neutrality\n\nCell notation: Anode | Anode sol'n || Cathode sol'n | Cathode\n\nE°cell = E°cathode − E°anode\nPositive E°cell → spontaneous.`,
        equations:[{label:"Cell potential",formula:"E°cell = E°cathode − E°anode"},{label:"ΔG linkage",formula:"ΔG° = −nFE°cell"},{label:"K linkage",formula:"E°cell = (0.0592/n) log K"}],
        keyTerms:["galvanic cell","anode","cathode","salt bridge","standard reduction potential","Faraday's constant"],
        mistake:"E° values are INTENSIVE — do NOT multiply by stoichiometric coefficients when scaling a reaction." },
      { id:"9-2", title:"Nernst Equation & Electrolysis",
        content:`Nernst equation (non-standard conditions):\nE = E° − (0.0592/n) log Q (at 25°C)\n\nAs reaction proceeds: Q↑ → E↓\nAt equilibrium: Q = K, E = 0 (dead battery)\n\nConcentration cells: same electrodes, different [ion]. E° = 0 but E ≠ 0.\n\nElectrolytic cells: external energy drives nonspontaneous reaction.\nElectrolysis mass: m = (M × I × t) / (n × F)`,
        equations:[{label:"Nernst equation",formula:"E = E° − (0.0592/n) log Q"},{label:"Electrolysis mass",formula:"m = (M × I × t) / (n × F)"}],
        keyTerms:["Nernst equation","concentration cell","electrolytic cell","electrolysis","Faraday's constant"],
        mistake:"A 'dead battery' has E = 0, not E° = 0. The standard potential E° is unchanged; actual potential drops to zero at equilibrium." },
    ]
  },
};

// ─── FLASHCARD DATA ───────────────────────────────────────────────────────────
const FC_DATA = {
  1:[
    {id:"1-001",front:"What is the atomic number?",back:"The number of protons in the nucleus. Defines the element and equals the number of electrons in a neutral atom.",unit:1},
    {id:"1-002",front:"State the Aufbau Principle",back:"Electrons fill the lowest-energy orbitals first: 1s→2s→2p→3s→3p→4s→3d→4p…",unit:1},
    {id:"1-003",front:"State Hund's Rule",back:"Electrons fill degenerate orbitals singly with parallel spins before any pairing occurs.",unit:1},
    {id:"1-004",front:"What are the two Aufbau exceptions?",back:"Cr: [Ar] 3d⁵4s¹ · Cu: [Ar] 3d¹⁰4s¹\nHalf-filled and fully-filled d subshells have extra stability.",unit:1},
    {id:"1-005",front:"Atomic radius trend across a period",back:"DECREASES left→right. More protons increase Zeff, pulling electrons closer. Same number of shells.",unit:1},
    {id:"1-006",front:"Ionization energy trend across a period",back:"INCREASES left→right. Higher Zeff holds electrons more tightly.\nExceptions: Be>B and N>O",unit:1},
    {id:"1-007",front:"What does a PES spectrum show?",back:"Binding energies of electrons in each subshell. Higher binding energy (left) = core electrons. Peak height = number of electrons in that subshell.",unit:1},
    {id:"1-008",front:"What is electronegativity?",back:"Tendency to attract bonding electrons. Increases across a period and UP a group. Fluorine = 4.0 (highest).",unit:1},
    {id:"1-009",front:"Paramagnetic vs. diamagnetic",back:"Paramagnetic: unpaired electrons → attracted to magnetic field.\nDiamagnetic: all paired → unaffected.",unit:1},
    {id:"1-010",front:"Formal charge formula",back:"FC = V − L − B/2\n(V=valence e⁻, L=lone pair e⁻, B=bonding e⁻)\nBest structure minimizes FC values.",unit:1},
  ],
  2:[
    {id:"2-001",front:"Steps to draw a Lewis structure",back:"1. Count total valence e⁻\n2. Connect with single bonds\n3. Complete terminal octets\n4. Remaining e⁻ on central atom\n5. Add multiple bonds if needed\n6. Minimize formal charges",unit:2},
    {id:"2-002",front:"What is a resonance hybrid?",back:"The real molecule — a blend of all resonance structures with delocalized electrons. The molecule does NOT flip between structures.",unit:2},
    {id:"2-003",front:"VSEPR: 4 domains, 0 lone pairs",back:"Tetrahedral — 109.5°\nExample: CH₄, NH₄⁺",unit:2},
    {id:"2-004",front:"VSEPR: 4 domains, 1 lone pair",back:"Trigonal pyramidal — ~107°\nExample: NH₃, PCl₃",unit:2},
    {id:"2-005",front:"VSEPR: 4 domains, 2 lone pairs",back:"Bent — ~104.5°\nExample: H₂O, H₂S",unit:2},
    {id:"2-006",front:"When does a molecule have net dipole?",back:"Has polar bonds AND bond dipoles don't cancel by symmetry.\nCO₂: linear → cancel → no net dipole.\nH₂O: bent → net dipole.",unit:2},
    {id:"2-007",front:"Bond order effect on bond length and strength",back:"Higher bond order → shorter bond → stronger bond → higher bond energy.\nTriple > Double > Single",unit:2},
  ],
  3:[
    {id:"3-001",front:"What forces are present in ALL molecules?",back:"London Dispersion Forces (LDF). Arise from temporary dipoles. Strength increases with molar mass and surface area.",unit:3},
    {id:"3-002",front:"What is required for hydrogen bonding?",back:"H must be directly bonded to F, O, or N — and interact with a lone pair on F/O/N of another molecule.",unit:3},
    {id:"3-003",front:"How do IMFs relate to boiling point?",back:"Stronger IMFs → higher boiling point. More energy needed to overcome attractions.",unit:3},
    {id:"3-004",front:"How do IMFs relate to vapor pressure?",back:"Stronger IMFs → LOWER vapor pressure. Molecules held more tightly. Inversely related to BP.",unit:3},
    {id:"3-005",front:"'Like dissolves like'",back:"Polar solvents dissolve polar/ionic solutes. Nonpolar solvents dissolve nonpolar solutes.",unit:3},
    {id:"3-006",front:"Compare the four types of solids",back:"Ionic: electrostatic, high MP, brittle\nMetallic: electron sea, malleable, conductor\nMolecular: IMFs, low MP, poor conductor\nNetwork covalent: covalent bonds, very high MP",unit:3},
  ],
  4:[
    {id:"4-001",front:"OIL RIG",back:"Oxidation Is Loss (of electrons)\nReduction Is Gain (of electrons)",unit:4},
    {id:"4-002",front:"How do you find the limiting reagent?",back:"Convert to moles. Divide each by stoichiometric coefficient. Smallest result = limiting reagent.",unit:4},
    {id:"4-003",front:"Percent yield formula",back:"% yield = (actual yield / theoretical yield) × 100%\nCannot exceed 100% in theory.",unit:4},
    {id:"4-004",front:"What is a net ionic equation?",back:"Shows only species that actually react. Strong electrolytes split into ions. Weak acids/bases and precipitates stay molecular.",unit:4},
    {id:"4-005",front:"Oxidation state rules (priority)",back:"1. Pure element = 0\n2. Monatomic ion = charge\n3. F always −1\n4. O usually −2\n5. H: +1 (nonmetals), −1 (metals)\n6. Sum = overall charge",unit:4},
    {id:"4-006",front:"Dilution equation",back:"M₁V₁ = M₂V₂\nMoles of solute are conserved.",unit:4},
  ],
  5:[
    {id:"5-001",front:"What is the rate law?",back:"Rate = k[A]ⁿ[B]ᵐ\nOrders determined EXPERIMENTALLY — never from the balanced equation.",unit:5},
    {id:"5-002",front:"1st order integrated rate law",back:"ln[A]t = ln[A]₀ − kt\nHalf-life: t₁/₂ = 0.693/k (constant, independent of [A]₀)",unit:5},
    {id:"5-003",front:"How does a catalyst affect a reaction?",back:"Lowers activation energy (Ea). Does NOT change ΔH or concentrations. Not consumed overall.",unit:5},
    {id:"5-004",front:"What is the rate-determining step?",back:"The SLOWEST elementary step. Rate law of the overall reaction = rate law of the slow step.",unit:5},
    {id:"5-005",front:"Intermediate vs. catalyst in a mechanism",back:"Intermediate: produced then consumed, not at start.\nCatalyst: consumed then regenerated, present at start and end.",unit:5},
  ],
  6:[
    {id:"6-001",front:"Hess's Law",back:"ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants)\nΔH is a state function. Reverse: flip sign. Multiply: scale ΔH.",unit:6},
    {id:"6-002",front:"Gibbs Free Energy",back:"ΔG = ΔH − TΔS\nΔG < 0: spontaneous · ΔG > 0: nonspontaneous · ΔG = 0: equilibrium",unit:6},
    {id:"6-003",front:"When always spontaneous?",back:"ΔH < 0 and ΔS > 0 → always spontaneous at all temperatures.",unit:6},
    {id:"6-004",front:"When is ΔS positive?",back:"Solid→liquid→gas, gas moles increase in reaction, dissolving, mixing, or heating.",unit:6},
    {id:"6-005",front:"How are ΔG°, K, and E°cell related?",back:"ΔG° = −RT ln K\nΔG° = −nFE°cell\nPositive E°cell → negative ΔG° → K > 1",unit:6},
  ],
  7:[
    {id:"7-001",front:"What goes in the K expression?",back:"Only aqueous (aq) and gaseous (g) species. Pure solids and liquids are EXCLUDED.",unit:7},
    {id:"7-002",front:"Q vs K",back:"Q < K → shifts right · Q > K → shifts left · Q = K → equilibrium",unit:7},
    {id:"7-003",front:"Le Chatelier: increase temperature",back:"Endothermic: K increases, shifts right.\nExothermic: K decreases, shifts left.",unit:7},
    {id:"7-004",front:"Le Chatelier: decrease volume",back:"Shifts toward FEWER moles of gas.\nAdding inert gas at constant volume: no shift.",unit:7},
    {id:"7-005",front:"ICE table setup",back:"I = Initial · C = Change (−x reactants, +x products, scaled by coefficients) · E = Equilibrium\nSolve for x. Check 5% rule.",unit:7},
  ],
  8:[
    {id:"8-001",front:"List the 7 strong acids",back:"HCl, HBr, HI, HNO₃, H₂SO₄, HClO₃, HClO₄\nAll others are weak.",unit:8},
    {id:"8-002",front:"pH of a weak acid — steps",back:"1. Write Ka expression\n2. [H⁺] ≈ √(Ka × C)\n3. Check: x/C < 5%\n4. pH = −log[H⁺]",unit:8},
    {id:"8-003",front:"Henderson-Hasselbalch equation",back:"pH = pKa + log([A⁻]/[HA])\nHalf-equivalence: pH = pKa · Effective range: pKa ± 1",unit:8},
    {id:"8-004",front:"Equivalence point: weak acid + strong base",back:"pH > 7. Conjugate base (A⁻) is present → solution is basic.\nUse Kb = Kw/Ka",unit:8},
    {id:"8-005",front:"Ka × Kb relationship",back:"Ka × Kb = Kw = 1.0 × 10⁻¹⁴ at 25°C\nStronger acid → weaker conjugate base",unit:8},
    {id:"8-006",front:"Lewis acid vs. Lewis base",back:"Lewis acid: electron pair ACCEPTOR\nLewis base: electron pair DONOR\nNo H⁺ transfer needed.",unit:8},
  ],
  9:[
    {id:"9-001",front:"Anode vs. cathode",back:"Anode: OXIDATION (An Ox) — negative in galvanic cell\nCathode: REDUCTION (Red Cat) — positive\nElectrons: anode → wire → cathode",unit:9},
    {id:"9-002",front:"Standard cell potential formula",back:"E°cell = E°cathode − E°anode\nDo NOT flip signs or multiply E° by coefficients.\nPositive E°cell → spontaneous",unit:9},
    {id:"9-003",front:"Nernst equation",back:"E = E° − (0.0592/n) log Q at 25°C\nQ increases → E decreases → dead battery when E = 0",unit:9},
    {id:"9-004",front:"What does the salt bridge do?",back:"Maintains electrical neutrality. Anions flow to anode, cations to cathode. Required for sustained current.",unit:9},
    {id:"9-005",front:"Electrolysis mass calculation",back:"m = (M × I × t) / (n × F)\nF = 96485 C/mol, I = amps, t = seconds",unit:9},
  ],
};

const getAllCards = () => Object.values(FC_DATA).flat();
const getCardsByUnit = (uid) => FC_DATA[uid] || [];

// ─── LOCAL STORAGE HOOK ───────────────────────────────────────────────────────
function useLS(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  const set = (v) => {
    const next = typeof v === "function" ? v(val) : v;
    setVal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  };
  return [val, set];
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [goal, setGoal] = useState("");

  const goals = [
    { id:"5",    label:"Score a 5",     emoji:"🏆", sub:"Top score" },
    { id:"4",    label:"Score a 4",     emoji:"⭐", sub:"Solid pass" },
    { id:"pass", label:"Just pass",     emoji:"✅", sub:"Get credit" },
    { id:"learn",label:"Actually learn",emoji:"🧠", sub:"Understand it" },
  ];

  const canNext = [name.trim().length > 0, examDate.length > 0, goal.length > 0];

  const steps = ["Who are you?", "Exam date?", "Your goal?"];

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24, position:"relative" }}>
      {/* Background grid lines */}
      <div style={{ position:"fixed", inset:0, backgroundImage:"linear-gradient(rgba(232,184,75,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,184,75,0.03) 1px, transparent 1px)", backgroundSize:"48px 48px", pointerEvents:"none" }}/>
      {/* Warm glow */}
      <div style={{ position:"fixed", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(232,184,75,0.06) 0%, transparent 70%)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }}/>

      <div className="fade-up" style={{ width:"100%", maxWidth:420, position:"relative", zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:52, height:52, borderRadius:"50%", background:"var(--surface2)", border:"1px solid rgba(232,184,75,0.25)", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:16, animation:"glow-pulse 2.5s infinite" }}>
            <FlaskConical size={22} color="var(--gold)" strokeWidth={1.5}/>
          </div>
          <div className="serif" style={{ fontSize:28, fontWeight:700, letterSpacing:"-0.01em", color:"var(--text)" }}>
            Chem<span style={{ color:"var(--gold)", fontStyle:"italic" }}>Core</span>
          </div>
          <div style={{ color:"var(--text-muted)", fontSize:12, marginTop:4, fontFamily:"var(--font-mono)", letterSpacing:"0.08em" }}>AP CHEMISTRY · STUDY SYSTEM</div>
        </div>

        <div className="card" style={{ padding:"28px 30px" }}>
          {/* Step indicator */}
          <div style={{ display:"flex", gap:6, marginBottom:28 }}>
            {steps.map((s,i) => (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", gap:5, opacity: i > step ? 0.35 : 1, transition:"opacity 0.3s" }}>
                <div style={{ height:2, borderRadius:999, background: i <= step ? "var(--gold)" : "var(--surface3)", transition:"background 0.4s" }}/>
                <span style={{ fontSize:9, fontFamily:"var(--font-mono)", color: i === step ? "var(--gold)" : "var(--text-muted)", letterSpacing:"0.06em" }}>{s.toUpperCase()}</span>
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="fade-in">
              <div className="serif" style={{ fontSize:22, fontWeight:600, marginBottom:6, fontStyle:"italic" }}>What should we call you?</div>
              <p style={{ color:"var(--text-muted)", fontSize:13, marginBottom:20, lineHeight:1.6 }}>Your name personalises your study experience.</p>
              <input className="field" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&canNext[0]&&setStep(1)} autoFocus/>
            </div>
          )}

          {step === 1 && (
            <div className="fade-in">
              <div className="serif" style={{ fontSize:22, fontWeight:600, marginBottom:6, fontStyle:"italic" }}>When's the big day?</div>
              <p style={{ color:"var(--text-muted)", fontSize:13, marginBottom:20, lineHeight:1.6 }}>We'll count down the days for you.</p>
              <input className="field" type="date" value={examDate} onChange={e=>setExamDate(e.target.value)}/>
            </div>
          )}

          {step === 2 && (
            <div className="fade-in">
              <div className="serif" style={{ fontSize:22, fontWeight:600, marginBottom:6, fontStyle:"italic" }}>What's the goal?</div>
              <p style={{ color:"var(--text-muted)", fontSize:13, marginBottom:18, lineHeight:1.6 }}>This shapes what we focus on together.</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {goals.map(g => (
                  <button key={g.id} onClick={()=>setGoal(g.id)} style={{
                    background: goal===g.id ? "var(--gold-dim)" : "var(--surface2)",
                    border: `1px solid ${goal===g.id ? "rgba(232,184,75,0.35)" : "var(--border)"}`,
                    borderRadius:10, padding:"13px 12px", cursor:"pointer", textAlign:"left",
                    transition:"all 0.15s"
                  }}>
                    <div style={{ fontSize:22, marginBottom:5 }}>{g.emoji}</div>
                    <div style={{ fontSize:12, fontWeight:600, color: goal===g.id ? "var(--gold)" : "var(--text)", fontFamily:"var(--font-body)" }}>{g.label}</div>
                    <div style={{ fontSize:10, color:"var(--text-muted)", marginTop:1 }}>{g.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:26, alignItems:"center" }}>
            {step > 0
              ? <button className="btn btn-outline" style={{ padding:"9px 16px", fontSize:12 }} onClick={()=>setStep(s=>s-1)}>← Back</button>
              : <div/>
            }
            {step < 2
              ? <button className="btn btn-gold" disabled={!canNext[step]} onClick={()=>setStep(s=>s+1)} style={{ opacity:canNext[step]?1:0.4 }}>Continue →</button>
              : <button className="btn btn-gold" disabled={!goal} onClick={()=>onComplete({name:name.trim(),examDate,goal})} style={{ opacity:goal?1:0.4 }}>
                  <Zap size={13}/> Begin
                </button>
            }
          </div>
        </div>

        <p style={{ textAlign:"center", color:"var(--text-faint)", fontSize:11, marginTop:16, fontFamily:"var(--font-mono)" }}>
          All data stored locally on your device
        </p>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage, profile }) {
  const daysLeft = profile?.examDate
    ? Math.max(0, Math.ceil((new Date(profile.examDate) - new Date()) / 86400000))
    : null;
  const urgent = daysLeft !== null && daysLeft <= 14;

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      background: "var(--bg2)",
      borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0, overflow: "hidden"
    }}>
      {/* Brand */}
      <div style={{ padding:"20px 16px 16px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:30, height:30, borderRadius:"50%", background:"var(--surface2)", border:"1px solid rgba(232,184,75,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <FlaskConical size={13} color="var(--gold)" strokeWidth={1.5}/>
          </div>
          <div>
            <div className="serif" style={{ fontSize:15, fontWeight:700, lineHeight:1 }}>
              Chem<span style={{ color:"var(--gold)", fontStyle:"italic" }}>Core</span>
            </div>
            <div style={{ fontSize:8, fontFamily:"var(--font-mono)", color:"var(--text-faint)", letterSpacing:"0.08em", marginTop:2 }}>AP CHEMISTRY</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"12px 8px", overflowY:"auto", display:"flex", flexDirection:"column", gap:1 }}>
        <div style={{ fontSize:8.5, fontFamily:"var(--font-mono)", color:"var(--text-faint)", padding:"4px 8px 8px", letterSpacing:"0.1em" }}>STUDY</div>
        {NAV.slice(0,4).map(item => (
          <button key={item.id} className={`nav-btn ${page===item.id?"on":""}`} onClick={()=>setPage(item.id)}>
            <item.icon size={14} strokeWidth={1.5}/>{item.label}
          </button>
        ))}
        <div style={{ fontSize:8.5, fontFamily:"var(--font-mono)", color:"var(--text-faint)", padding:"12px 8px 8px", letterSpacing:"0.1em" }}>TOOLS</div>
        {NAV.slice(4).map(item => (
          <button key={item.id} className={`nav-btn ${page===item.id?"on":""}`} onClick={()=>setPage(item.id)}>
            <item.icon size={14} strokeWidth={1.5}/>{item.label}
          </button>
        ))}
      </nav>

      {/* Countdown */}
      {daysLeft !== null && (
        <div style={{
          margin:"0 10px 10px",
          padding:"12px 14px",
          background: urgent ? "rgba(212,112,106,0.1)" : "var(--gold-dim)",
          border: `1px solid ${urgent ? "rgba(212,112,106,0.25)" : "rgba(232,184,75,0.2)"}`,
          borderRadius:10
        }}>
          <div style={{ fontSize:8.5, fontFamily:"var(--font-mono)", color: urgent ? "var(--rose)" : "var(--gold)", letterSpacing:"0.1em", marginBottom:4 }}>
            {urgent ? "⚠ EXAM SOON" : "EXAM COUNTDOWN"}
          </div>
          <div className="serif" style={{ fontSize:28, fontWeight:700, color: urgent ? "var(--rose)" : "var(--text)", lineHeight:1, marginBottom:2 }}>
            {daysLeft}
          </div>
          <div style={{ fontSize:11, color:"var(--text-muted)" }}>days remaining</div>
        </div>
      )}

      {/* Profile */}
      <button className="nav-btn" style={{ margin:"0 8px 12px", borderTop:"1px solid var(--border)", paddingTop:12 }} onClick={()=>setPage("profile")}>
        <div style={{ width:24, height:24, borderRadius:"50%", background:"linear-gradient(135deg, var(--gold), var(--sage))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:"#1a1409", flexShrink:0, fontFamily:"var(--font-display)" }}>
          {profile?.name?.[0]?.toUpperCase() || "?"}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:12, fontWeight:600, color:"var(--text-warm)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{profile?.name || "Student"}</div>
          <div style={{ fontSize:9, color:"var(--text-faint)", fontFamily:"var(--font-mono)" }}>Profile</div>
        </div>
      </button>
    </aside>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ profile, progress, setPage }) {
  const daysLeft = profile?.examDate ? Math.max(0, Math.ceil((new Date(profile.examDate) - new Date()) / 86400000)) : null;
  const totalMastery = Math.round(UNITS.reduce((s,u) => s + (progress.unitMastery?.[u.id] || 0), 0) / 9);
  const weakUnits = UNITS.filter(u => (progress.unitMastery?.[u.id] || 0) < 40).slice(0, 3);

  const stats = [
    { label:"Mastery",      value:`${totalMastery}%`, icon:TrendingUp, color:"var(--gold)",     bg:"var(--gold-dim)",      sub:"overall progress" },
    { label:"Streak",       value:progress.streak||0,  icon:Flame,      color:"var(--rose)",     bg:"var(--rose-dim)",      sub:"days in a row" },
    { label:"Cards",        value:progress.cardsMastered||0, icon:Brain, color:"var(--sage)",    bg:"var(--sage-dim)",      sub:"mastered" },
    { label:"Days left",    value:daysLeft ?? "—",     icon:Calendar,   color:"var(--sky)",      bg:"var(--sky-dim)",       sub:"to exam" },
  ];

  return (
    <div style={{ padding:"32px 32px 48px", maxWidth:920, margin:"0 auto" }}>
      {/* Header */}
      <div className="fade-up" style={{ marginBottom:30 }}>
        <div style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--text-muted)", letterSpacing:"0.12em", marginBottom:8 }}>
          {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}).toUpperCase()}
        </div>
        <div className="serif" style={{ fontSize:32, fontWeight:700, letterSpacing:"-0.02em", lineHeight:1.15 }}>
          Good {new Date().getHours()<12?"morning":new Date().getHours()<17?"afternoon":"evening"},{" "}
          <span style={{ color:"var(--gold)", fontStyle:"italic" }}>{profile?.name?.split(" ")[0] || "Student"}</span>
        </div>
        <div style={{ color:"var(--text-muted)", marginTop:6, fontSize:13, lineHeight:1.5 }}>
          {daysLeft != null
            ? `${daysLeft} days until your AP exam — every session counts.`
            : "Set your exam date in Profile to start the countdown."}
        </div>
      </div>

      {/* Stats row */}
      <div className="fade-up d1" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:24 }}>
        {stats.map((s, i) => (
          <div key={i} className="card" style={{ padding:"18px 16px" }}>
            <div style={{ width:30, height:30, borderRadius:8, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
              <s.icon size={14} color={s.color} strokeWidth={1.75}/>
            </div>
            <div className="serif" style={{ fontSize:26, fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:4 }}>{s.sub}</div>
            <div style={{ fontSize:9, fontFamily:"var(--font-mono)", color:"var(--text-faint)", marginTop:2, letterSpacing:"0.08em" }}>{s.label.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Body grid */}
      <div className="fade-up d2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
        {/* Unit progress */}
        <div className="card" style={{ padding:"20px 22px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:16 }}>
            <div className="serif" style={{ fontSize:15, fontWeight:600 }}>Unit Progress</div>
            <button onClick={()=>setPage("units")} style={{ fontSize:11, color:"var(--gold)", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", letterSpacing:"0.02em" }}>View all →</button>
          </div>
          {UNITS.map(u => {
            const pct = progress.unitMastery?.[u.id] || 0;
            return (
              <div key={u.id} style={{ display:"flex", alignItems:"center", gap:9, marginBottom:9 }}>
                <span style={{ fontSize:11, width:16, textAlign:"center" }}>{u.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                    <span style={{ fontSize:10, color:"var(--text-muted)", fontFamily:"var(--font-mono)" }}>U{u.id}</span>
                    <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color: pct>0 ? u.color : "var(--text-faint)" }}>{pct}%</span>
                  </div>
                  <div className="bar-track" style={{ height:3 }}>
                    <div className="bar-fill" style={{ width:`${pct}%`, background: u.color }}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {/* Quick actions */}
          <div className="card" style={{ padding:"18px 20px" }}>
            <div className="serif" style={{ fontSize:15, fontWeight:600, marginBottom:14 }}>Jump in</div>
            {[
              { label:"Review Flashcards",  icon:Brain,       color:"var(--sage)",   action:"flashcards" },
              { label:"Practice Problems",  icon:Target,      color:"var(--sky)",    action:"problems" },
              { label:"Ask the AI Tutor",   icon:MessageSquare, color:"var(--gold)", action:"chatbot" },
              { label:"Take a Timed Exam",  icon:Clock,       color:"var(--rose)",   action:"exam" },
            ].map((a, i) => (
              <button key={i} onClick={()=>setPage(a.action)} style={{
                display:"flex", alignItems:"center", gap:10, padding:"9px 10px",
                borderRadius:8, background:"var(--surface2)", border:"1px solid var(--border)",
                cursor:"pointer", transition:"all 0.15s", textAlign:"left", width:"100%", marginBottom:6,
                fontFamily:"var(--font-body)"
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=a.color;e.currentTarget.style.background=`${a.color}10`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--surface2)";}}>
                <div style={{ width:24, height:24, borderRadius:6, background:`${a.color}15`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <a.icon size={12} color={a.color} strokeWidth={2}/>
                </div>
                <span style={{ fontSize:12, color:"var(--text-warm)", fontWeight:500 }}>{a.label}</span>
                <span style={{ marginLeft:"auto", color:"var(--text-faint)", fontSize:12 }}>→</span>
              </button>
            ))}
          </div>

          {/* Focus areas */}
          {weakUnits.length > 0 && (
            <div className="card" style={{ padding:"14px 18px", borderColor:"rgba(212,112,106,0.18)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:10 }}>
                <Target size={12} color="var(--rose)" strokeWidth={2}/>
                <div style={{ fontSize:11, fontWeight:600, color:"var(--rose)", fontFamily:"var(--font-body)" }}>Needs attention</div>
              </div>
              {weakUnits.map(u => (
                <button key={u.id} onClick={()=>setPage(`unit-${u.id}`)} style={{
                  display:"flex", alignItems:"center", gap:8, width:"100%", background:"none",
                  border:"none", cursor:"pointer", padding:"3px 0", textAlign:"left"
                }}>
                  <span style={{ fontSize:11 }}>{u.icon}</span>
                  <span style={{ fontSize:11, color:"var(--text-warm)", fontFamily:"var(--font-body)" }}>Unit {u.id}: {u.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Units grid */}
      <div className="fade-up d3">
        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:14 }}>
          <div className="serif" style={{ fontSize:18, fontWeight:600 }}>All Units</div>
          <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--text-muted)" }}>9 UNITS · AP CHEM</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {UNITS.map((u, i) => {
            const pct = progress.unitMastery?.[u.id] || 0;
            return (
              <div key={u.id} className="card card-lift" onClick={()=>setPage(`unit-${u.id}`)} style={{ padding:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:u.bg, border:`1px solid ${u.color}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{u.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:8.5, fontFamily:"var(--font-mono)", color:u.color, marginBottom:2 }}>UNIT {u.id}</div>
                    <div style={{ fontSize:11, fontWeight:600, lineHeight:1.3, color:"var(--text-warm)" }}>{u.title}</div>
                  </div>
                </div>
                <div className="bar-track" style={{ height:2.5, marginBottom:6 }}>
                  <div className="bar-fill" style={{ width:`${pct}%`, background:u.color }}/>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontSize:10, color:"var(--text-faint)", fontFamily:"var(--font-mono)" }}>{u.topics} topics</span>
                  <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color: pct>0 ? u.color : "var(--text-faint)" }}>{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── UNITS PAGE ───────────────────────────────────────────────────────────────
function UnitsPage({ progress, setPage }) {
  return (
    <div style={{ padding:"32px", maxWidth:800, margin:"0 auto" }}>
      <div className="fade-up" style={{ marginBottom:28 }}>
        <div className="serif" style={{ fontSize:28, fontWeight:700, letterSpacing:"-0.01em" }}>All Units</div>
        <div style={{ color:"var(--text-muted)", fontSize:13, marginTop:5 }}>9 units covering the full AP Chemistry curriculum</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {UNITS.map((u, i) => {
          const pct = progress.unitMastery?.[u.id] || 0;
          return (
            <div key={u.id} className={`card card-lift fade-up d${Math.min(i+1,6)}`} onClick={()=>setPage(`unit-${u.id}`)} style={{ padding:"16px 20px", display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:11, background:u.bg, border:`1px solid ${u.color}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{u.icon}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:9, marginBottom:6 }}>
                  <span style={{ fontSize:9.5, fontFamily:"var(--font-mono)", color:u.color }}>UNIT {u.id}</span>
                  <span className="serif" style={{ fontSize:14, fontWeight:600, color:"var(--text)" }}>{u.title}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div className="bar-track" style={{ height:3, flex:1 }}>
                    <div className="bar-fill" style={{ width:`${pct}%`, background:u.color }}/>
                  </div>
                  <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color:u.color, flexShrink:0 }}>{pct}%</span>
                </div>
              </div>
              <ChevronRight size={15} color="var(--text-faint)" strokeWidth={1.5}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── UNIT HUB ─────────────────────────────────────────────────────────────────
function UnitHub({ unitId, setPage }) {
  const unit = UNITS.find(u => u.id === unitId);
  if (!unit) return null;

  const actions = [
    { label:"Study Guide",  icon:BookOpen,    desc:"Notes, equations & exam tips", action:()=>setPage(`guide-${unitId}`) },
    { label:"Flashcards",   icon:Brain,       desc:"Spaced repetition practice",   action:()=>setPage("flashcards") },
    { label:"Problems",     icon:Target,      desc:"Practice problems",            action:()=>setPage("problems") },
    { label:"Unit Quiz",    icon:CheckCircle, desc:"Test your knowledge",          action:()=>setPage("exam") },
  ];

  return (
    <div style={{ padding:"32px", maxWidth:640, margin:"0 auto" }}>
      <button onClick={()=>setPage("units")} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-muted)", fontSize:12, display:"flex", alignItems:"center", gap:5, marginBottom:24, fontFamily:"var(--font-body)" }}>
        <ArrowLeft size={12} strokeWidth={2}/> Back to Units
      </button>

      <div className="fade-up" style={{ marginBottom:28, padding:"22px 24px", borderRadius:16, background:unit.bg, border:`1px solid ${unit.color}25` }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ fontSize:42, lineHeight:1 }}>{unit.icon}</span>
          <div>
            <div style={{ fontSize:9.5, fontFamily:"var(--font-mono)", color:unit.color, marginBottom:4, letterSpacing:"0.1em" }}>UNIT {unit.id}</div>
            <div className="serif" style={{ fontSize:22, fontWeight:700, lineHeight:1.2 }}>{unit.title}</div>
            <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:4 }}>{unit.topics} topics · AP Chemistry</div>
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {actions.map((s, i) => (
          <div key={i} className={`card card-lift fade-up d${i+1}`} onClick={s.action} style={{ padding:"18px 20px" }}>
            <div style={{ width:36, height:36, borderRadius:9, background:unit.bg, border:`1px solid ${unit.color}25`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
              <s.icon size={16} color={unit.color} strokeWidth={1.5}/>
            </div>
            <div className="serif" style={{ fontSize:14, fontWeight:600, marginBottom:4 }}>{s.label}</div>
            <div style={{ fontSize:11, color:"var(--text-muted)", lineHeight:1.5 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── STUDY GUIDE ──────────────────────────────────────────────────────────────
function StudyGuide({ unitId, setPage }) {
  const guide = GUIDE_DATA[unitId];
  if (!guide) return <div style={{ padding:40, textAlign:"center", color:"var(--text-muted)" }}>Coming soon!</div>;

  const firstId = guide.sections[0]?.id;
  const [open, setOpen] = useState({ [firstId]: true });
  const toggle = (id) => setOpen(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ padding:"32px", maxWidth:820, margin:"0 auto" }}>
      <button onClick={()=>setPage(`unit-${unitId}`)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-muted)", fontSize:12, display:"flex", alignItems:"center", gap:5, marginBottom:24, fontFamily:"var(--font-body)" }}>
        <ArrowLeft size={12} strokeWidth={2}/> Unit {unitId}
      </button>

      {/* Header */}
      <div className="fade-up" style={{ marginBottom:24, padding:"22px 26px", borderRadius:16, background:`${guide.color}08`, border:`1px solid ${guide.color}20` }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
          <span style={{ fontSize:30, lineHeight:1 }}>{guide.icon}</span>
          <div>
            <div style={{ fontSize:9.5, fontFamily:"var(--font-mono)", color:guide.color, letterSpacing:"0.1em", marginBottom:3 }}>UNIT {unitId} · STUDY GUIDE</div>
            <div className="serif" style={{ fontSize:20, fontWeight:700 }}>{guide.title}</div>
          </div>
        </div>
        <p style={{ fontSize:13, color:"var(--text-warm)", lineHeight:1.75, marginBottom:14 }}>{guide.overview}</p>
        <div style={{ background:"rgba(126,184,154,0.07)", border:"1px solid rgba(126,184,154,0.2)", borderRadius:9, padding:"11px 14px" }}>
          <div style={{ fontSize:9, fontFamily:"var(--font-mono)", color:"var(--sage)", letterSpacing:"0.1em", marginBottom:7 }}>AP EXAM TIPS</div>
          {guide.apTips.map((tip, i) => (
            <div key={i} style={{ display:"flex", gap:8, marginBottom: i < guide.apTips.length-1 ? 6 : 0 }}>
              <span style={{ color:"var(--sage)", fontSize:11, flexShrink:0, marginTop:1 }}>✦</span>
              <span style={{ fontSize:12, color:"var(--text-warm)", lineHeight:1.65 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="fade-up d1">
        {guide.sections.map((sec, idx) => (
          <div key={sec.id} style={{
            marginBottom:6,
            background:"var(--surface)",
            border:`1px solid ${open[sec.id] ? guide.color+"28" : "var(--border)"}`,
            borderRadius:12,
            overflow:"hidden",
            transition:"border-color 0.2s"
          }}>
            <button onClick={()=>toggle(sec.id)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:20, height:20, borderRadius:5, background:`${guide.color}15`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:9.5, fontFamily:"var(--font-mono)", color:guide.color, fontWeight:600 }}>{idx+1}</span>
                </div>
                <span className="serif" style={{ fontSize:14, fontWeight:600, color:"var(--text)" }}>{sec.title}</span>
              </div>
              <span style={{ color:"var(--text-faint)", fontSize:11, transition:"transform 0.2s", display:"inline-block", transform: open[sec.id] ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
            </button>

            {open[sec.id] && (
              <div style={{ padding:"0 20px 20px", animation:"fadeIn 0.2s ease" }}>
                <hr className="rule" style={{ marginBottom:16 }}/>
                <div style={{ fontSize:13, lineHeight:1.9, color:"var(--text-warm)", whiteSpace:"pre-line" }}>{sec.content}</div>

                {sec.equations?.length > 0 && (
                  <div style={{ background:"rgba(106,173,212,0.06)", border:"1px solid rgba(106,173,212,0.18)", borderRadius:9, padding:"12px 16px", marginTop:14 }}>
                    <div style={{ fontSize:9, fontFamily:"var(--font-mono)", color:"var(--sky)", letterSpacing:"0.1em", marginBottom:10 }}>KEY EQUATIONS</div>
                    {sec.equations.map((eq, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom: i < sec.equations.length-1 ? 7 : 0 }}>
                        <span style={{ fontSize:10, color:"var(--text-muted)", flexShrink:0, minWidth:120, fontFamily:"var(--font-body)" }}>{eq.label}</span>
                        <code style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--sky)", background:"rgba(106,173,212,0.1)", padding:"3px 8px", borderRadius:5 }}>{eq.formula}</code>
                      </div>
                    ))}
                  </div>
                )}

                {sec.keyTerms?.length > 0 && (
                  <div style={{ marginTop:14 }}>
                    <div style={{ fontSize:9, fontFamily:"var(--font-mono)", color:"var(--text-faint)", letterSpacing:"0.1em", marginBottom:8 }}>KEY TERMS</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {sec.keyTerms.map((term, i) => (
                        <span key={i} style={{ fontSize:10, fontFamily:"var(--font-mono)", padding:"3px 9px", borderRadius:99, background:`${guide.color}10`, color:guide.color, border:`1px solid ${guide.color}25` }}>{term}</span>
                      ))}
                    </div>
                  </div>
                )}

                {sec.mistake && (
                  <div style={{ display:"flex", gap:10, background:"rgba(232,184,75,0.06)", border:"1px solid rgba(232,184,75,0.2)", borderRadius:9, padding:"11px 14px", marginTop:14 }}>
                    <AlertTriangle size={12} color="var(--gold)" strokeWidth={1.75} style={{ flexShrink:0, marginTop:2 }}/>
                    <div>
                      <div style={{ fontSize:9, fontFamily:"var(--font-mono)", color:"var(--gold)", letterSpacing:"0.1em", marginBottom:4 }}>COMMON MISTAKE</div>
                      <div style={{ fontSize:12, color:"var(--text-warm)", lineHeight:1.7 }}>{sec.mistake}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:10, justifyContent:"center", marginTop:28 }}>
        <button className="btn btn-outline" onClick={()=>setPage(`unit-${unitId}`)}>← Unit Hub</button>
        <button className="btn btn-gold" onClick={()=>setPage("flashcards")}><Brain size={13}/> Study Flashcards</button>
      </div>
    </div>
  );
}

// ─── FLASHCARDS ───────────────────────────────────────────────────────────────
function FlashcardDeckSelector({ cardProgress, onStart }) {
  const [mode, setMode] = useState("all");
  const [selectedUnits, setSelectedUnits] = useState([]);
  const totalCards = getAllCards().length;

  const toggleUnit = (id) => setSelectedUnits(prev =>
    prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
  );

  const getStats = (uid) => {
    const cards = getCardsByUnit(uid);
    const mastered = cards.filter(c => (cardProgress[c.id]?.confidence || 0) >= 2).length;
    return { total:cards.length, mastered, pct: cards.length ? Math.round(mastered/cards.length*100) : 0 };
  };

  const buildDeck = () => {
    let cards;
    if (mode === "all") cards = getAllCards();
    else if (mode === "weak") {
      cards = getAllCards().filter(c => !cardProgress[c.id] || (cardProgress[c.id].confidence || 0) < 2);
      if (!cards.length) cards = getAllCards();
    } else {
      const units = selectedUnits.length ? selectedUnits : [1];
      cards = units.flatMap(u => getCardsByUnit(u));
    }
    onStart([...cards].sort(() => Math.random() - 0.5));
  };

  return (
    <div style={{ padding:"32px", maxWidth:780, margin:"0 auto" }}>
      <div className="fade-up" style={{ marginBottom:26 }}>
        <div className="serif" style={{ fontSize:28, fontWeight:700, letterSpacing:"-0.01em" }}>Flashcards</div>
        <div style={{ color:"var(--text-muted)", fontSize:13, marginTop:5 }}>{totalCards} cards · spaced repetition</div>
      </div>

      {/* Mode tabs */}
      <div className="fade-up d1" style={{ display:"flex", gap:6, marginBottom:20, padding:"4px", background:"var(--surface)", borderRadius:10, border:"1px solid var(--border)", width:"fit-content" }}>
        {[{id:"all",label:"All cards"},{id:"weak",label:"Weak cards"},{id:"selected",label:"By unit"}].map(m => (
          <button key={m.id} onClick={()=>setMode(m.id)} style={{
            padding:"8px 16px", borderRadius:7, fontFamily:"var(--font-body)",
            background: mode===m.id ? "var(--surface3)" : "transparent",
            border: mode===m.id ? "1px solid var(--border2)" : "1px solid transparent",
            color: mode===m.id ? "var(--text)" : "var(--text-muted)",
            cursor:"pointer", fontSize:12, fontWeight:500, transition:"all 0.15s"
          }}>{m.label}</button>
        ))}
      </div>

      {/* Unit grid */}
      <div className="fade-up d2" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:24 }}>
        {UNITS.map(u => {
          const stats = getStats(u.id);
          const sel = selectedUnits.includes(u.id);
          return (
            <div key={u.id} onClick={()=>mode==="selected"&&toggleUnit(u.id)} style={{
              padding:"12px 14px", borderRadius:10, cursor: mode==="selected" ? "pointer" : "default",
              background: sel&&mode==="selected" ? `${u.color}0d` : "var(--surface)",
              border:`1px solid ${sel&&mode==="selected" ? u.color+"35" : "var(--border)"}`,
              opacity: mode==="selected"&&!sel ? 0.5 : 1,
              transition:"all 0.15s"
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <span style={{ fontSize:15 }}>{u.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:8.5, fontFamily:"var(--font-mono)", color: sel&&mode==="selected" ? u.color : "var(--text-faint)", letterSpacing:"0.08em" }}>UNIT {u.id}</div>
                  <div style={{ fontSize:11, fontWeight:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", color:"var(--text-warm)" }}>{u.title}</div>
                </div>
                {mode==="selected"&&sel && <Check size={12} color={u.color} strokeWidth={2.5}/>}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"var(--text-faint)", fontFamily:"var(--font-mono)", marginBottom:5 }}>
                <span>{stats.total}</span>
                <span style={{ color: stats.pct>60?"var(--sage)":stats.pct>30?"var(--gold)":"var(--text-faint)" }}>{stats.pct}%</span>
              </div>
              <div style={{ height:2, background:"var(--surface3)", borderRadius:999 }}>
                <div style={{ height:"100%", width:`${stats.pct}%`, background:u.color, borderRadius:999, transition:"width 0.6s" }}/>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display:"flex", justifyContent:"center" }}>
        <button className="btn btn-gold" onClick={buildDeck} style={{ fontSize:14, padding:"13px 34px" }}>
          <Brain size={15}/> Start Session
        </button>
      </div>
    </div>
  );
}

function FlashcardSession({ deck, cardProgress, onUpdate, onFinish }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);

  const card = deck[index];
  const unit = UNITS.find(u => u.id === card?.unit);
  const pct = (index / deck.length) * 100;

  const rate = (conf) => {
    setResults(r => [...r, {id:card.id, conf}]);
    onUpdate(card.id, conf);
    if (index + 1 >= deck.length) { setDone(true); return; }
    setFlipped(false);
    setTimeout(() => setIndex(i => i+1), 90);
  };

  if (done) {
    const counts = results.reduce((acc, r) => { acc[r.conf]=(acc[r.conf]||0)+1; return acc; }, {});
    const score = Math.round(((counts.good||0)+(counts.easy||0)) / deck.length * 100);
    return (
      <div style={{ maxWidth:480, margin:"0 auto", padding:"44px 32px", textAlign:"center" }}>
        <div className="fade-up">
          <div style={{ fontSize:52, marginBottom:14 }}>{score>=80?"🏆":score>=60?"⭐":"💪"}</div>
          <div className="serif" style={{ fontSize:26, fontWeight:700, marginBottom:6 }}>Session complete</div>
          <div style={{ color:"var(--text-muted)", fontSize:13, marginBottom:28 }}>{deck.length} cards reviewed</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:28 }}>
            {[
              {label:"Score", value:`${score}%`, c:score>=80?"var(--sage)":"var(--gold)"},
              {label:"Cards", value:deck.length, c:"var(--sky)"},
              {label:"Confident", value:(counts.good||0)+(counts.easy||0), c:"var(--sage)"},
              {label:"Review", value:(counts.again||0)+(counts.hard||0), c:"var(--rose)"},
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding:16, textAlign:"center" }}>
                <div className="serif" style={{ fontSize:24, fontWeight:700, color:s.c }}>{s.value}</div>
                <div style={{ fontSize:9.5, color:"var(--text-muted)", fontFamily:"var(--font-mono)", marginTop:4, letterSpacing:"0.08em" }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
            <button className="btn btn-outline" onClick={onFinish}>Exit</button>
            <button className="btn btn-gold" onClick={()=>{setIndex(0);setFlipped(false);setResults([]);setDone(false);}}>
              <RotateCcw size={13}/> Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!card) return null;

  const ratings = [
    {k:"again", label:"Again", color:"var(--rose)",   bg:"rgba(212,112,106,0.12)", icon:RotateCcw},
    {k:"hard",  label:"Hard",  color:"var(--gold)",   bg:"rgba(232,184,75,0.1)",   icon:Minus},
    {k:"good",  label:"Good",  color:"var(--sky)",    bg:"rgba(106,173,212,0.1)",  icon:Check},
    {k:"easy",  label:"Easy",  color:"var(--sage)",   bg:"rgba(126,184,154,0.1)",  icon:Star},
  ];

  return (
    <div style={{ maxWidth:640, margin:"0 auto", padding:"28px 28px 48px" }}>
      {/* Header bar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <button onClick={onFinish} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-muted)", display:"flex", alignItems:"center", gap:5, fontSize:12, fontFamily:"var(--font-body)" }}>
          <ArrowLeft size={13} strokeWidth={1.5}/> Exit
        </button>
        <span style={{ fontSize:11, fontFamily:"var(--font-mono)", color:"var(--text-muted)" }}>{index+1} / {deck.length}</span>
        <div style={{ width:56 }}/>
      </div>

      {/* Progress line */}
      <div style={{ height:2, background:"var(--surface3)", borderRadius:999, marginBottom:28, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg, var(--gold), var(--sage))", transition:"width 0.35s", borderRadius:999 }}/>
      </div>

      {/* Card */}
      <div onClick={!flipped ? ()=>setFlipped(true) : undefined} style={{ perspective:1200, cursor:flipped?"default":"pointer", marginBottom:22 }}>
        <div style={{
          minHeight:240,
          position:"relative", transformStyle:"preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition:"transform 0.44s cubic-bezier(0.4,0,0.2,1)"
        }}>
          {/* Front */}
          <div style={{
            position:"absolute", inset:0, backfaceVisibility:"hidden",
            background:"var(--surface)", border:`1px solid ${unit?.color || "var(--gold)"}25`,
            borderRadius:16, padding:"30px 34px",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            boxShadow:`0 12px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)`
          }}>
            <div style={{ fontSize:9, fontFamily:"var(--font-mono)", color:unit?.color||"var(--gold)", letterSpacing:"0.12em", marginBottom:18, opacity:0.8 }}>
              {unit?.icon} UNIT {card.unit} · TAP TO REVEAL
            </div>
            <div className="serif" style={{ fontSize:19, fontWeight:600, textAlign:"center", lineHeight:1.55, color:"var(--text)" }}>{card.front}</div>
          </div>
          {/* Back */}
          <div style={{
            position:"absolute", inset:0, backfaceVisibility:"hidden",
            transform:"rotateY(180deg)",
            background:`linear-gradient(145deg, var(--surface), ${unit?.color||"var(--gold)"}06)`,
            border:`1px solid ${unit?.color||"var(--gold)"}30`,
            borderRadius:16, padding:"24px 30px",
            display:"flex", flexDirection:"column", justifyContent:"center",
            boxShadow:`0 12px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`
          }}>
            <div style={{ fontSize:9, fontFamily:"var(--font-mono)", color:unit?.color||"var(--gold)", letterSpacing:"0.12em", marginBottom:14 }}>ANSWER</div>
            <div style={{ fontSize:14, lineHeight:1.85, color:"var(--text)", whiteSpace:"pre-line" }}>{card.back}</div>
          </div>
        </div>
      </div>

      {!flipped && (
        <div style={{ textAlign:"center", color:"var(--text-faint)", fontSize:12, marginBottom:16, fontFamily:"var(--font-mono)", letterSpacing:"0.04em" }}>
          click to reveal
        </div>
      )}

      {flipped && (
        <div className="fade-up" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
          {ratings.map(r => (
            <button key={r.k} onClick={()=>rate(r.k)} style={{
              padding:"13px 6px", borderRadius:10, cursor:"pointer",
              background:r.bg, border:`1px solid ${r.color}35`,
              display:"flex", flexDirection:"column", alignItems:"center", gap:6,
              transition:"all 0.15s", fontFamily:"var(--font-body)"
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 20px ${r.color}25`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
              <r.icon size={15} color={r.color} strokeWidth={1.75}/>
              <span style={{ fontSize:11, fontWeight:600, color:r.color, letterSpacing:"0.02em" }}>{r.label}</span>
            </button>
          ))}
        </div>
      )}

      <div style={{ textAlign:"center", marginTop:18 }}>
        <span style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--text-faint)" }}>{unit?.icon} {unit?.title}</span>
      </div>
    </div>
  );
}

function Flashcards({ cardProgress, setCardProgress }) {
  const [deck, setDeck] = useState(null);
  const update = useCallback((cardId, conf) => {
    setCardProgress(prev => ({
      ...prev,
      [cardId]: {
        confidence: {again:0, hard:1, good:2, easy:3}[conf],
        lastStudied: Date.now(),
        timesStudied: ((prev[cardId]?.timesStudied) || 0) + 1
      }
    }));
  }, [setCardProgress]);

  if (deck) return <FlashcardSession deck={deck} cardProgress={cardProgress} onUpdate={update} onFinish={()=>setDeck(null)}/>;
  return <FlashcardDeckSelector cardProgress={cardProgress} onStart={setDeck}/>;
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function Profile({ profile, setProfile, progress, setProgress }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name:profile.name, examDate:profile.examDate });
  const save = () => { setProfile(p => ({...p, ...form})); setEditing(false); };
  const reset = () => {
    if (window.confirm("Reset all progress? This cannot be undone."))
      setProgress({unitMastery:{}, streak:0, problemsSolved:0, cardsMastered:0});
  };

  const goalLabels = {"5":"Score a 5 🏆","4":"Score a 4 ⭐",pass:"Just pass ✅",learn:"Actually learn 🧠"};

  return (
    <div style={{ padding:"32px", maxWidth:560, margin:"0 auto" }}>
      <div className="fade-up serif" style={{ fontSize:28, fontWeight:700, letterSpacing:"-0.01em", marginBottom:24 }}>Profile</div>

      <div className="card fade-up d1" style={{ padding:"22px 24px", marginBottom:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
          <div style={{ width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg, var(--gold), var(--sage))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:700, color:"#1a1409", fontFamily:"var(--font-display)" }}>
            {profile.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="serif" style={{ fontSize:17, fontWeight:600 }}>{profile.name}</div>
            <div style={{ fontSize:10, fontFamily:"var(--font-mono)", color:"var(--text-muted)", letterSpacing:"0.08em", marginTop:2 }}>AP CHEMISTRY STUDENT</div>
          </div>
        </div>

        {editing ? (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div>
              <label style={{ fontSize:10, color:"var(--text-muted)", marginBottom:6, display:"block", fontFamily:"var(--font-mono)", letterSpacing:"0.08em" }}>NAME</label>
              <input className="field" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
            </div>
            <div>
              <label style={{ fontSize:10, color:"var(--text-muted)", marginBottom:6, display:"block", fontFamily:"var(--font-mono)", letterSpacing:"0.08em" }}>EXAM DATE</label>
              <input className="field" type="date" value={form.examDate} onChange={e=>setForm(f=>({...f,examDate:e.target.value}))}/>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn btn-gold" onClick={save}>Save changes</button>
              <button className="btn btn-outline" onClick={()=>setEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            {[
              {label:"Exam Date", value: profile.examDate ? new Date(profile.examDate).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}) : "Not set"},
              {label:"Goal",      value: goalLabels[profile.goal] || profile.goal},
              {label:"Study Streak", value: `${progress.streak||0} days`},
              {label:"Cards Mastered", value: progress.cardsMastered||0},
            ].map((item, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid var(--border)" }}>
                <span style={{ fontSize:12, color:"var(--text-muted)" }}>{item.label}</span>
                <span style={{ fontSize:12, fontWeight:500, color:"var(--text-warm)" }}>{item.value}</span>
              </div>
            ))}
            <button className="btn btn-outline" style={{ marginTop:14 }} onClick={()=>setEditing(true)}>Edit profile</button>
          </div>
        )}
      </div>

      <div className="card fade-up d2" style={{ padding:"16px 20px", borderColor:"rgba(212,112,106,0.2)" }}>
        <div className="serif" style={{ fontSize:13, fontWeight:600, color:"var(--rose)", marginBottom:5 }}>Reset data</div>
        <div style={{ fontSize:12, color:"var(--text-muted)", marginBottom:12, lineHeight:1.5 }}>Permanently delete all progress, mastery data, and study history.</div>
        <button onClick={reset} style={{ background:"var(--rose-dim)", border:"1px solid rgba(212,112,106,0.3)", color:"var(--rose)", padding:"8px 16px", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:500, fontFamily:"var(--font-body)" }}>
          Reset all progress
        </button>
      </div>
    </div>
  );
}

// ─── COMING SOON ──────────────────────────────────────────────────────────────
function ComingSoon({ title, icon:Icon, color="var(--gold)", desc }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:440, padding:40, flexDirection:"column", gap:16, textAlign:"center" }}>
      <div className="float" style={{ width:68, height:68, borderRadius:18, background:`${color}12`, border:`1px solid ${color}25`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Icon size={28} color={color} strokeWidth={1.25}/>
      </div>
      <div className="serif" style={{ fontSize:22, fontWeight:700 }}>{title}</div>
      <div style={{ color:"var(--text-muted)", maxWidth:320, fontSize:13, lineHeight:1.65 }}>{desc || "This feature is in development."}</div>
      <span style={{ fontSize:9.5, fontFamily:"var(--font-mono)", padding:"4px 12px", borderRadius:99, background:`${color}12`, color:color, border:`1px solid ${color}25`, letterSpacing:"0.08em" }}>COMING SOON</span>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [profile, setProfile] = useLS("cc-profile", null);
  const [progress, setProgress] = useLS("cc-progress", {unitMastery:{}, streak:0, problemsSolved:0, cardsMastered:0});
  const [cardProgress, setCardProgress] = useLS("cc-cards", {});
  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    if (profile && !progress.seeded) {
      setProgress(p => ({...p, seeded:true, streak:4, problemsSolved:23, unitMastery:{1:72,2:55,3:30,4:45,5:10,6:0,7:0,8:0,9:0}}));
    }
  }, [profile]);

  useEffect(() => {
    const mastered = Object.values(cardProgress).filter(c => c.confidence >= 2).length;
    setProgress(p => ({...p, cardsMastered:mastered}));
  }, [cardProgress]);

  if (!profile) {
    return <><GlobalStyles/><Onboarding onComplete={d => setProfile({...d, joinDate:new Date().toISOString()})}/></>;
  }

  const render = () => {
    if (page === "dashboard") return <Dashboard profile={profile} progress={progress} setPage={setPage}/>;
    if (page === "units")     return <UnitsPage  progress={progress} setPage={setPage}/>;
    if (page === "flashcards")return <Flashcards cardProgress={cardProgress} setCardProgress={setCardProgress}/>;
    if (page === "profile")   return <Profile profile={profile} setProfile={setProfile} progress={progress} setProgress={setProgress}/>;

    const unitM = page.match(/^unit-(\d+)$/);
    if (unitM) return <UnitHub unitId={parseInt(unitM[1])} setPage={setPage}/>;
    const guideM = page.match(/^guide-(\d+)$/);
    if (guideM) return <StudyGuide unitId={parseInt(guideM[1])} setPage={setPage}/>;

    const stubs = {
      problems: {title:"Problem Bank",    icon:Target,       color:"var(--sky)",      desc:"500+ AP Chemistry problems with full worked solutions, organised by unit. Coming in Phase 4."},
      chatbot:  {title:"AI Tutor",        icon:MessageSquare,color:"var(--gold)",     desc:"A conversational tutor trained on AP Chemistry concepts, ready to answer your questions 24/7. Coming in Phase 5."},
      reference:{title:"Reference Sheet", icon:Table,        color:"var(--sage)",     desc:"Interactive periodic table, formula sheet, solubility rules, and reduction potential table. Coming in Phase 6."},
      exam:     {title:"Exam Mode",       icon:Clock,        color:"var(--rose)",     desc:"Timed 25-question AP exam simulations with full grading and detailed feedback. Coming in Phase 7."},
    };
    if (stubs[page]) return <ComingSoon {...stubs[page]}/>;
    return <Dashboard profile={profile} progress={progress} setPage={setPage}/>;
  };

  return (
    <>
      <GlobalStyles/>
      <div style={{ display:"flex", height:"100vh", overflow:"hidden" }}>
        <Sidebar page={page} setPage={setPage} profile={profile}/>
        <main style={{ flex:1, overflowY:"auto", position:"relative", background:"var(--bg)" }}>
          {/* Subtle warm ambient glow */}
          <div style={{ position:"fixed", top:0, left:220, right:0, bottom:0, pointerEvents:"none", zIndex:0 }}>
            <div style={{ position:"absolute", width:600, height:400, borderRadius:"50%", background:"radial-gradient(ellipse, rgba(232,184,75,0.035) 0%, transparent 65%)", top:"-10%", right:"10%", transform:"rotate(-20deg)" }}/>
            <div style={{ position:"absolute", width:400, height:500, borderRadius:"50%", background:"radial-gradient(ellipse, rgba(126,184,154,0.025) 0%, transparent 65%)", bottom:"5%", left:"20%" }}/>
          </div>
          <div style={{ position:"relative", zIndex:1 }}>
            {render()}
          </div>
        </main>
      </div>
    </>
  );
}
