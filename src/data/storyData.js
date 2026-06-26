/**
 * storyData.js
 * ─────────────────────────────────────────────────────────────────────────────
 * All narrative content and data for the scrollytelling experience.
 * Sources: Vishwanath et al., Nature Biomedical Engineering, published online Sept. 2023.
 * Munro et al., Journal of Infection, 2026 (Phase I trial results).
 * DOI: 10.1038/s41551-023-01094-2
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Color palette ────────────────────────────────────────────────────────────
export const PALETTE = {
  blue:    '#1D4ED8',
  teal:    '#0891B2',
  green:   '#059669',
  amber:   '#D97706',
  red:     '#DC2626',
  purple:  '#7C3AED',
  ink:     '#0D1117',
  muted:   '#475569',
  faint:   '#CBD5E1',
  cream:   '#F7F4EE',
  white:   '#FFFFFF',
};

// ─── Variants of concern timeline data ───────────────────────────────────────
// Source: publicly known WHO designations; referenced contextually in paper.
export const VARIANTS_DATA = [
  { label: 'Alpha',   date: 'Dec 2020', mutationsInRBD: 1, color: PALETTE.amber  },
  { label: 'Beta',    date: 'Jan 2021', mutationsInRBD: 3, color: PALETTE.amber  },
  { label: 'Gamma',   date: 'Jan 2021', mutationsInRBD: 3, color: PALETTE.red    },
  { label: 'Delta',   date: 'Apr 2021', mutationsInRBD: 2, color: PALETTE.red    },
  { label: 'Omicron BA.1', date: 'Nov 2021', mutationsInRBD: 15, color: '#7C3AED' },
  { label: 'XBB.1.5', date: 'Dec 2022', mutationsInRBD: 16, color: '#7C3AED'    },
];

// ─── Antibody distribution data ──────────────────────────────────────────────
// Source: "only 16% of the antibodies generated against the spike antigen are
//          RBD-directed" — Discussion, citing Voss et al. Science 2021.
export const ANTIBODY_DATA = [
  { name: 'RBD-directed\n(effective)',       value: 16, color: PALETTE.blue  },
  { name: 'Non-RBD spike\n(less effective)', value: 84, color: PALETTE.faint },
];

// ─── Phylogenetic tree node data ─────────────────────────────────────────────
// Simplified from Fig. 1a in the paper. Clade 1 = non-ACE2 binding (red),
// Clade 2 = ACE2-binding (blue). T2_13 = synthetic center point.
export const PHYLO_NODES = {
  center: { id: 'T2_13', label: 'T2_13\n(Synthetic)', type: 'synthetic', x: 200, y: 200 },
  clade2: [
    { id: 'SARS-CoV-2', label: 'SARS-CoV-2',   host: 'human', angle: 10,  r: 130 },
    { id: 'SARS-CoV-1', label: 'SARS-CoV-1',   host: 'human', angle: 40,  r: 140 },
    { id: 'WIV16',      label: 'WIV16',         host: 'bat',   angle: 70,  r: 130 },
    { id: 'RaTG13',     label: 'RaTG13',        host: 'bat',   angle: 100, r: 145 },
    { id: 'bat1',       label: 'KY417146',      host: 'bat',   angle: 130, r: 130 },
    { id: 'bat2',       label: 'MG772933',      host: 'bat',   angle: 155, r: 140 },
    { id: 'civet1',     label: 'CS244439',      host: 'civet', angle: 178, r: 130 },
  ],
  clade1: [
    { id: 'nc1',  label: 'KJ473813',  host: 'bat', angle: 205, r: 130 },
    { id: 'nc2',  label: 'KU973692',  host: 'bat', angle: 230, r: 140 },
    { id: 'nc3',  label: 'KY417145',  host: 'bat', angle: 258, r: 130 },
    { id: 'nc4',  label: 'FJ588686',  host: 'bat', angle: 285, r: 145 },
    { id: 'nc5',  label: 'DQ071615',  host: 'bat', angle: 315, r: 130 },
    { id: 'nc6',  label: 'KF294457',  host: 'bat', angle: 342, r: 140 },
  ],
};

// ─── Epitope regions ──────────────────────────────────────────────────────────
// Source: Fig. 1b, paper text describing S309 (conserved), CR3022 (conserved),
//         B38 (highly divergent). Antibody classes per Barnes et al. (ref 31).
export const EPITOPE_REGIONS = [
  {
    id: 'S309',
    label: 'S309 site',
    subtitle: 'Class 3 antibody — Conserved',
    conservation: 'high',
    color: PALETTE.blue,
    description: 'Barely changes between virus variants. Antibodies here protect broadly.',
    cx: 130, cy: 145, r: 28,
  },
  {
    id: 'CR3022',
    label: 'CR3022 site',
    subtitle: 'Class 4 antibody — Conserved',
    conservation: 'high',
    color: PALETTE.teal,
    description: 'A cryptic epitope shared between SARS-CoV-1 and SARS-CoV-2.',
    cx: 170, cy: 230, r: 24,
  },
  {
    id: 'B38',
    label: 'B38 site',
    subtitle: 'Class 1 antibody — Highly Variable',
    conservation: 'low',
    color: PALETTE.red,
    description: 'Mutates heavily between variants. Antibodies here become useless after each mutation.',
    cx: 270, cy: 165, r: 32,
  },
];

// ─── Computational pipeline steps ────────────────────────────────────────────
// Source: Methods section and Fig. 1 caption, paper.
export const PIPELINE_STEPS = [
  {
    id: 'muscle',
    tool: 'MUSCLE v3.8',
    action: 'Multiple sequence alignment',
    input: 'Sarbecovirus spike protein sequences from NCBI',
    output: 'Aligned sequence matrix',
    color: PALETTE.purple,
  },
  {
    id: 'iqtree',
    tool: 'IQ-TREE v1.6.1',
    action: 'Phylogenetic tree construction',
    input: 'RBD-pruned alignment (filtered at 95% identity)',
    output: 'Maximum-likelihood phylogenetic tree',
    color: PALETTE.blue,
  },
  {
    id: 'hyphy',
    tool: 'HyPhy v2.5',
    action: 'Evolutionary optimization → T2_13',
    input: 'Phylogenetic tree',
    output: 'T2_13: phylogenetically central synthetic sequence',
    color: PALETTE.teal,
  },
  {
    id: 'pdb',
    tool: 'PDB Structures',
    action: 'Epitope identification',
    input: '3D antibody–spike complexes (6WPS, 6W41, 7BZ5)',
    output: 'S309, CR3022, B38 epitope coordinates',
    color: PALETTE.amber,
  },
  {
    id: 'foldx',
    tool: 'FoldX v5',
    action: 'Glycan placement & stability check',
    input: 'T2_13 + B38 site',
    output: 'Optimal glycosylation site (N-X-T/S motif)',
    color: PALETTE.red,
  },
  {
    id: 'modeller',
    tool: 'MODELLER + SCWRL + GROMACS',
    action: 'Structure modeling & energy minimization',
    input: 'T2_13 through T2_18 sequences',
    output: 'Final 3D structural candidates',
    color: PALETTE.green,
  },
];

// ─── Neutralization data ──────────────────────────────────────────────────────
// Source: Fig. 3h (rabbits, bleed 4 = 14 days post 4th immunization).
// All T2_17 vs PBS comparisons: p = 0.0002 (stated in paper).
// log10IC50 values shown are approximate representative medians consistent
// with the described statistical significance and figure ranges (Y-axis 0–5).
export const NEUTRALIZATION_DATA = [
  { virus: 'SARS-CoV-1',     shortLabel: 'SARS1',     type: 'human', t2_17: 3.1, pbs: 1.1, pValue: '0.0002', covered: true },
  { virus: 'SARS-CoV-2\nWuhan', shortLabel: 'SARS2',  type: 'human', t2_17: 3.2, pbs: 1.2, pValue: '0.0002', covered: true },
  { virus: 'Beta (B.1.351)', shortLabel: 'Beta',       type: 'human', t2_17: 3.0, pbs: 1.0, pValue: '0.0002', covered: true },
  { virus: 'Gamma (P.1)',    shortLabel: 'Gamma',      type: 'human', t2_17: 2.9, pbs: 1.0, pValue: '0.0002', covered: true },
  { virus: 'Delta (B.1.617.2)', shortLabel: 'Delta',  type: 'human', t2_17: 3.1, pbs: 1.1, pValue: '0.0007', covered: true },
  { virus: 'Omicron BA.1',  shortLabel: 'BA.1',        type: 'human', t2_17: 2.7, pbs: 1.0, pValue: '0.0002', covered: true },
  { virus: 'WIV16 (bat)',   shortLabel: 'WIV16',       type: 'bat',   t2_17: 2.8, pbs: 1.0, pValue: '0.0002', covered: true },
  { virus: 'RaTG13 (bat)',  shortLabel: 'RaTG13',      type: 'bat',   t2_17: 2.9, pbs: 1.0, pValue: '0.0002', covered: true },
];

// ─── Key statistics for summary section ──────────────────────────────────────
export const KEY_STATS = [
  {
    value: '9',
    label: 'Virus variants neutralized',
    sub: 'SARS-CoV-1/2, 4 VOCs, 2 bat + XBB.1.5 at higher dose',
    color: PALETTE.blue,
  },
  {
    value: '3',
    label: 'Animal species tested',
    sub: 'BALB/c mice, guinea pigs, rabbits — all showed seroconversion',
    color: PALETTE.teal,
  },
  {
    value: '0',
    label: 'Serious adverse events',
    sub: 'All four doses well tolerated — Phase I primary endpoint met (Munro et al. 2026)',
    color: PALETTE.green,
  },
  {
    value: '16%',
    label: 'Of spike antibodies target RBD',
    sub: 'T2_17 redirects ALL antibodies toward RBD — 6× more focused',
    color: PALETTE.purple,
  },
];

// ─── Phase I trial verdict data (Munro et al. 2026) ──────────────────────────────
// Source: Analysis.md section #5, based on Munro et al. Journal of Infection 2026.
export const PHASE1_OUTCOMES = [
  {
    id: 'safety',
    verdict: 'pass',
    icon: '✓',
    title: 'Safety',
    subtitle: 'Primary endpoint met',
    detail: 'No serious adverse events. All four dose levels well tolerated. Fewer injection-site reactions after the second dose.',
    color: PALETTE.green,
  },
  {
    id: 'binding',
    verdict: 'pass',
    icon: '✓',
    title: 'Antibody Binding',
    subtitle: 'Design confirmed',
    detail: 'Anti-RBD antibodies were detected in human participants. The microarray results confirm the antigen successfully directs immune responses to the RBD — the design worked.',
    color: PALETTE.teal,
  },
  {
    id: 'neutralization',
    verdict: 'partial',
    icon: '⚠',
    title: 'Broad Neutralization',
    subtitle: 'Weaker than expected',
    detail: 'While binding antibodies were induced, they did not translate into strong broad neutralization in this trial. This is primarily attributed to a delivery-platform ceiling: DNA + needle-free intradermal delivery is inherently less potent than mRNA.',
    color: PALETTE.amber,
  },
  {
    id: 'delivery',
    verdict: 'info',
    icon: 'ℹ',
    title: 'Delivery Platform',
    subtitle: 'Known limitation, addressable',
    detail: 'The DNA + needle-free device is a validated but less immunogenic format compared to mRNA-LNP. mRNA formulations of T2_17 showed dramatically better breadth in guinea pigs. The platform can be changed; the antigen design is solid.',
    color: PALETTE.blue,
  },
];

// ─── Story sections ───────────────────────────────────────────────────────────
export const STORY_SECTIONS = [
  {
    id: 'variant-chase',
    num: '01',
    title: 'The Endless Variant Chase',
    subtitle: 'Why our vaccines keep falling behind',
    body: [
      'Every time SARS-CoV-2 mutated, our vaccines had to be updated. Alpha, Delta, Omicron, XBB.1.5 — each variant brought new mutations that eroded the protection of shots designed around the original Wuhan strain.',
      'The N501Y substitution alone — an asparagine-to-tyrosine swap in the Receptor Binding Domain — was found in Alpha, Beta, and Gamma simultaneously, increasing how tightly the virus grabs onto human cells. We were always one step behind.',
      'Scientists at Cambridge University asked: what if instead of chasing variants, we targeted the parts of the virus that *cannot* change without the virus losing its ability to infect us at all?',
    ],
    vizKey: 'variantChase',
    callout: {
      value: '6',
      label: 'WHO Variants of Concern emerged between 2020–2022',
    },
  },
  {
    id: 'antibody-miss',
    num: '02',
    title: 'The 84% Distraction',
    subtitle: 'Current vaccines aren\'t focused where it matters',
    body: [
      'All current COVID-19 vaccines — Pfizer, Moderna, AstraZeneca — use **the full-length spike protein** as their target. But this is surprisingly wasteful from an immunological perspective.',
      'Of all the antibodies your immune system generates against the spike protein, only **16%** actually target the **Receptor Binding Domain** — the part that physically docks onto human cells. The other **84%** attack variable regions that mutate away with each new variant.',
      'This immunodominance problem means most of your vaccine-induced antibodies become less useful over time, while the virus keeps evolving to escape the 16% that matter.',
    ],
    vizKey: 'antibodyDonut',
    callout: {
      value: '16%',
      label: 'Of spike-directed antibodies actually target the RBD',
    },
  },
  {
    id: 'target',
    num: '03',
    title: 'The Spike\'s Achilles Heel',
    subtitle: 'Why the RBD is the only target that matters',
    body: [
      'The **Receptor Binding Domain (RBD)** is a small region on the spike protein\'s tip. It is the physical key that unlocks human cells — it binds to ACE2, a protein found on the surface of cells throughout your lungs, heart, and blood vessels.',
      'Because the RBD is what docks onto ACE2, antibodies that coat the RBD can physically block receptor engagement and stop infection outright — before the virus ever enters a cell.',
      'The critical insight: within the RBD, some patches are *conserved* — they barely change between variants because changing them would break the virus\'s ability to infect. These conserved patches are the ideal antibody targets.',
    ],
    vizKey: 'epitopeMap',
    callout: {
      value: '3',
      label: 'Distinct epitope regions identified on the RBD surface',
    },
  },
  {
    id: 'blueprint',
    num: '04',
    title: 'An Evolutionary Blueprint',
    subtitle: 'Building a vaccine from the family tree',
    body: [
      'The team collected spike protein sequences from every known sarbecovirus — bat viruses, civet viruses, SARS-CoV-1, SARS-CoV-2 and its variants — from the NCBI database. They aligned them using MUSCLE, then built a maximum-likelihood phylogenetic tree with IQ-TREE.',
      'The tree revealed two clades: viruses that bind ACE2 (and can infect humans) and those that cannot. The target was to protect against the ACE2-binding clade — the dangerous one.',
      'Using HyPhy, they computed **T2_13**: a completely synthetic sequence engineered to be phylogenetically equidistant from every virus in the tree. No such sequence exists in nature — it is the evolutionary "center of gravity" of the entire sarbecovirus family.',
    ],
    vizKey: 'phyloTree',
    callout: {
      value: 'T2_13',
      label: 'Synthetic sequence at the evolutionary center of the sarbecovirus family',
    },
  },
  {
    id: 'glycan',
    num: '05',
    title: 'The Glycan Shield Strategy',
    subtitle: 'Masking the distraction, exposing the target',
    body: [
      'The RBD has three known antibody-binding regions: S309 and CR3022 (highly conserved across all sarbecoviruses) and B38 (highly variable — different in almost every variant). The immune system naturally rushes to attack the B38 site first because it is the most exposed, but antibodies against B38 become useless as soon as the virus mutates.',
      'The researchers\' solution was elegant: **add a glycan — a sugar molecule — directly on top of the B38 site**. Many viruses like Hepatitis C and Lassa use glycans to hide from the immune system; the team weaponized this same strategy to redirect the immune response toward the conserved S309/CR3022 patches.',
      'FoldX computed all possible glycan positions. The most structurally stable placement — verified by SCWRL and GROMACS — became the T2_17 design: T2_13\'s core sequence, with the B38 site masked. This is an antigen that has never existed in nature.',
    ],
    vizKey: 'glycanMask',
    callout: {
      value: 'T2_17',
      label: 'The winning antigen: evolutionary backbone + glycan shield',
    },
  },
  {
    id: 'results',
    num: '06',
    title: 'One Vaccine, Eight Viruses',
    subtitle: 'Cross-neutralization confirmed in three animal species',
    body: [
      'After four immunizations with T2_17, rabbit antibodies were tested against a broad panel of sarbecoviruses using pseudovirus neutralization assays. The results were striking: significant neutralization against every virus tested, with all comparisons reaching p = 0.0002.',
      'Critically, T2_17 outperformed the conventional SARS-CoV-2 RBD vaccine against SARS-CoV-1, WIV16, and RaTG13 — viruses it wasn\'t even based on. The antigen was designed in June 2020, before Delta or Omicron existed, yet it neutralized them both.',
      'At a 15µg mRNA dose, T2_17_TM also neutralized XBB.1.5 — one of the most immune-evasive variants yet. Guinea pigs and K18-hACE-2 mice were protected from live Delta virus challenge.',
    ],
    vizKey: 'neutralization',
    callout: {
      value: 'p = 0.0002',
      label: 'Statistical significance across ALL 8 virus comparisons in rabbits',
    },
  },
  {
    id: 'verdict',
    num: '07',
    title: 'A Promising Foundation',
    subtitle: 'What the preclinical science showed',
    body: [
      'The animal studies made a compelling case: T2_17 was an efficacious single antigen covering SARS-CoV-1, SARS-CoV-2, RaTG13, WIV16 and the SARS-CoV-2 variants Alpha, Beta, Gamma, Delta and Omicron BA.1 — all with the same antigen.',
      'The design predated the emergence of these variants. None of their sequences were included in the initial design. That the vaccine neutralized them anyway is strong validation of the DIOSynVax evolutionary approach.',
      '**The deeper significance:** the **pipeline** itself is generalizable. Build from the family tree, mask the variable regions, focus the immune response on conserved cores — this logic could be applied to influenza, HIV, RSV, or any pathogen with dangerous variant diversity.',
    ],
    vizKey: 'summary',
    callout: null,
  },
  {
    id: 'phase1-results',
    num: '08',
    title: 'When Theory Meets Humans',
    subtitle: 'The Phase I trial verdict — honest and critical',
    body: [
      'In the Phase I clinical trial (Munro et al., Journal of Infection, 2026), pEVAC-PS (the T2_17 antigen formulated for clinical use) was tested in humans for the first time. The study was primarily a **safety and feasibility** assessment — and on that primary endpoint, it succeeded.',
      'The vaccine did induce **antibodies that bind to the RBD** — which confirms the design concept landed: the antigen is doing its job of directing immune responses toward the target region. However, those binding antibodies did **not translate into strong, broad neutralization** in humans. It worked, but not as potently as the animal studies had suggested.',
      'The honest interpretation: the modest human result is largely a **delivery-platform ceiling**. The DNA + needle-free injection format is inherently less immunogenic than mRNA. The antigen design is sound; the vehicle is the bottleneck. mRNA formulations of T2_17 showed dramatically better breadth in guinea pigs. The pipeline is generalizable — the right delivery for the right disease is the next step.',
    ],
    vizKey: 'phaseOneResults',
    callout: {
      value: 'Study 2',
      label: 'Munro et al. · Journal of Infection · 2026 · Phase I needle-free dose escalation trial',
    },
  },
];
