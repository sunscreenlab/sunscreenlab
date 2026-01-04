// uv-filters.js
// Canonical registry of known UV filters and explicit non-filters
// This file is DATA ONLY — no logic, no side effects

export const UV_FILTERS = [
  // ===== INORGANIC (MINERAL) =====
  {
    inci: "zinc oxide",
    type: "mineral",
    spectrum: ["UVA", "UVB"]
  },
  {
    inci: "titanium dioxide",
    type: "mineral",
    spectrum: ["UVB", "partial UVA"]
  },

  // ===== ORGANIC (CHEMICAL) =====
  {
    inci: "diethylamino hydroxybenzoyl hexyl benzoate",
    aka: ["uvinul a plus"],
    type: "chemical",
    spectrum: ["UVA"]
  },
  {
    inci: "ethylhexyl triazone",
    aka: ["uvinul t 150"],
    type: "chemical",
    spectrum: ["UVB"]
  },
  {
    inci: "bis-ethylhexyloxyphenol methoxyphenyl triazine",
    aka: ["tinosorb s", "bemotrizinol"],
    type: "chemical",
    spectrum: ["UVA", "UVB"]
  },
  {
    inci: "methylene bis-benzotriazolyl tetramethylbutylphenol",
    aka: ["tinosorb m", "bisoctrizole"],
    type: "chemical",
    spectrum: ["UVA", "UVB"]
  },
  {
    inci: "diethylhexyl butamido triazone",
    aka: ["iscotrizinol"],
    type: "chemical",
    spectrum: ["UVB"]
  },
  {
    inci: "ethylhexyl methoxycinnamate",
    aka: ["octinoxate"],
    type: "chemical",
    spectrum: ["UVB"]
  },
  {
    inci: "butyl methoxydibenzoylmethane",
    aka: ["avobenzone"],
    type: "chemical",
    spectrum: ["UVA"]
  },
  {
    inci: "homosalate",
    type: "chemical",
    spectrum: ["UVB"]
  },
  {
    inci: "octocrylene",
    type: "chemical",
    spectrum: ["UVB", "partial UVA"]
  },
  {
    inci: "octisalate",
    aka: ["ethylhexyl salicylate"],
    type: "chemical",
    spectrum: ["UVB"]
  },
  {
    inci: "phenylbenzimidazole sulfonic acid",
    aka: ["ensulizole"],
    type: "chemical",
    spectrum: ["UVB"]
  },
  {
    inci: "terephthalylidene dicamphor sulfonic acid",
    aka: ["ecamsule", "mexoryl sx"],
    type: "chemical",
    spectrum: ["UVA"]
  },
  {
    inci: "drometrizole trisiloxane",
    aka: ["mexoryl xl"],
    type: "chemical",
    spectrum: ["UVA", "UVB"]
  },
  {
    inci: "polysilicone-15",
    aka: ["parsol slx"],
    type: "chemical",
    spectrum: ["UVB"]
  }
];

// Explicitly NOT UV filters.
// These should never trigger warnings or inference.
export const UV_FILTER_IGNORE = [
  // Cooling / fragrance
  "camphor",
  "menthol",
  "menthyl lactate",
  "peppermint oil",

  // Acids that are NOT UV filters
  "salicylic acid",
  "citric acid",
  "lactic acid",
  "ascorbic acid",
  "ferulic acid",
  "glycolic acid",

  // Common false positives
  "benzyl alcohol",
  "benzyl benzoate",
  "phenoxyethanol"
];
