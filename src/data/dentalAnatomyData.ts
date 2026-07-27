import { AnatomicalStructure, ToothInfo } from "../types";

export const ANATOMICAL_STRUCTURES: AnatomicalStructure[] = [
  {
    id: "enamel",
    name: "Enamel",
    subtitle: "Outermost protective calcified layer of the crown",
    description: "The hardest substance in the human body, composed of highly organized hydroxyapatite crystallites forming enamel rods.",
    composition: "96% Inorganic Hydroxyapatite, 1% Organic Protein (Amelogenins/Enamelins), 3% Water",
    clinicalSignificance: "Protects inner dentin and pulp against masticatory wear, thermal insult, and chemical attack. Demineralizes at pH < 5.5.",
    pathologyNote: "Lacks cellular repair capacity. Acid erosion and caries lead to irreversible structural breakdown requiring restorative therapy.",
    color: "#0284c7", // Bright cyan/blue
    pathSvg: "M 100 20 C 180 20, 260 70, 270 160 C 270 180, 260 200, 250 200 C 220 180, 180 170, 100 170 C 20 170, -20 180, -50 200 C -60 200, -70 180, -70 160 C -60 70, 20 20, 100 20 Z",
    hotspotCoords: { x: 50, y: 18 }
  },
  {
    id: "dentin",
    name: "Dentin",
    subtitle: "Main bulk and shock-absorbing body of the tooth",
    description: "A mineralized yellow-tinted collagenous tissue traversed by millions of microscopic dentinal tubules extending from pulp to DEJ.",
    composition: "70% Inorganic Hydroxyapatite, 20% Organic Collagen Matrix, 10% Water",
    clinicalSignificance: "Formed continuously throughout life by odontoblasts. Transmits nerve impulses via hydrodynamic fluid movement in tubules.",
    pathologyNote: "Softer than enamel; caries spreads rapidly once penetrating the Dentinoenamel Junction (DEJ). Can deposit secondary/reparative dentin.",
    color: "#eab308", // Golden yellow
    pathSvg: "",
    hotspotCoords: { x: 50, y: 35 }
  },
  {
    id: "pulp_chamber",
    name: "Dental Pulp (Chamber & Canals)",
    subtitle: "Living neurovascular heart of the tooth",
    description: "Soft connective tissue occupying the central pulp cavity and root canals, rich in nerves, blood vessels, lymphatics, and odontoblasts.",
    composition: "Unmineralized vascular connective tissue, sensory nerves (A-delta and C fibers), odontoblasts, fibroblasts, immune cells",
    clinicalSignificance: "Maintains tooth vitality, nutrition, and sensory feedback. Provides reparative odontoblastic response to deep stimuli.",
    pathologyNote: "Irreversible inflammation (pulpitis) or necrosis caused by severe caries or trauma requires Root Canal Treatment (RCT) or extraction.",
    color: "#ef4444", // Deep red
    pathSvg: "",
    hotspotCoords: { x: 50, y: 52 }
  },
  {
    id: "cementum",
    name: "Cementum",
    subtitle: "Bone-like calcified outer layer covering the root",
    description: "A thin specialized layer covering the root dentin from the Cementoenamel Junction (CEJ) to the apex, anchoring PDL fibers.",
    composition: "50% Inorganic Hydroxyapatite, 50% Collagen and Organic Matrix",
    clinicalSignificance: "Anchors Sharpey's fibers of the Periodontal Ligament. Acellular at cervical root, cellular at root apex.",
    pathologyNote: "Exposed cementum during periodontal recession causes root hypersensitivity and root caries susceptibility.",
    color: "#f97316", // Amber orange
    pathSvg: "",
    hotspotCoords: { x: 30, y: 68 }
  },
  {
    id: "pdl",
    name: "Periodontal Ligament (PDL)",
    subtitle: "Fibrous shock absorber anchoring tooth in socket",
    description: "Dense organized vascular collagen fiber bundles connecting root cementum to the surrounding alveolar bone socket.",
    composition: "Type I & III Collagen fibers (Sharpey's fibers), mechanoreceptors, osteoblasts, cementoblasts, fibroblasts",
    clinicalSignificance: "Absorbs occlusal forces, acts as a sensory proprioceptor during chewing, and mediates orthodontic tooth movement.",
    pathologyNote: "Periodontitis causes irreversible PDL destruction, leading to periodontal pocketing, bone loss, and tooth mobility.",
    color: "#10b981", // Emerald green
    pathSvg: "",
    hotspotCoords: { x: 22, y: 76 }
  },
  {
    id: "alveolar_bone",
    name: "Alveolar Bone / Socket",
    subtitle: "Jawbone ridge supporting tooth roots",
    description: "Thickened ridge of jawbone containing tooth sockets (alveoli), consisting of compact cribriform plate (lamina dura) and spongy trabecular bone.",
    composition: "65% Mineral (Calcium Hydroxyapatite), 35% Organic Matrix & Osteocytes",
    clinicalSignificance: "Dynamic tissue undergoing constant remodeling in response to masticatory forces and orthodontic pressure.",
    pathologyNote: "Without tooth stimulation or in severe periodontitis, alveolar bone resorbs permanently.",
    color: "#8b5cf6", // Purple
    pathSvg: "",
    hotspotCoords: { x: 12, y: 82 }
  },
  {
    id: "gingiva",
    name: "Gingiva & Free Sulcus",
    subtitle: "Gum tissue forming protective seal",
    description: "Keratinized mucosal tissue surrounding the neck of teeth and overlying alveolar bone.",
    composition: "Stratified squamous epithelium, collagenous lamina propria, junctional epithelium",
    clinicalSignificance: "Junctional epithelium forms an organic attachment seal at the CEJ preventing bacterial invasion into deep periodontal tissues.",
    pathologyNote: "Gingivitis is reversible inflammation of the free and attached gingiva without loss of bone or PDL.",
    color: "#ec4899", // Coral pink
    pathSvg: "",
    hotspotCoords: { x: 18, y: 55 }
  }
];

export const PERMANENT_TEETH_DATA: ToothInfo[] = [
  // Upper Arch - Maxillary Right Quadrant 1 (#1 to #8)
  { universalNumber: 1, fdiNumber: 18, palmerNotation: "8┘", name: "Maxillary Right Third Molar", arch: "Maxillary", quadrant: 1, type: "Molar", cuspCount: 3, rootCount: 3, canalCount: "1-4 (fused)", eruptionAge: "17-21 yrs", keyFeatures: ["Highly variable anatomy", "Often impacted", "Short fused roots"], clinicalPearl: "Wisdom tooth that often requires surgical extraction due to impaction or pericoronitis." },
  { universalNumber: 2, fdiNumber: 17, palmerNotation: "7┘", name: "Maxillary Right Second Molar", arch: "Maxillary", quadrant: 1, type: "Molar", cuspCount: 4, rootCount: 3, canalCount: "3-4", eruptionAge: "12-13 yrs", keyFeatures: ["Smaller distolingual cusp", "Rhomboidal occlusal outline", "3 roots"], clinicalPearl: "Distolingual cusp is noticeably smaller than on 1st molar." },
  { universalNumber: 3, fdiNumber: 16, palmerNotation: "6┘", name: "Maxillary Right First Molar", arch: "Maxillary", quadrant: 1, type: "Molar", cuspCount: 5, rootCount: 3, canalCount: "3-4 (MB2 ~70%)", eruptionAge: "6-7 yrs", keyFeatures: ["Oblique ridge", "Cusp of Carabelli (ML cusp)", "Largest maxillary tooth"], clinicalPearl: "Cornerstone 6-year molar. High frequency of 2nd mesiobuccal canal (MB2) in endodontics!" },
  { universalNumber: 4, fdiNumber: 15, palmerNotation: "5┘", name: "Maxillary Right Second Premolar", arch: "Maxillary", quadrant: 1, type: "Premolar", cuspCount: 2, rootCount: 1, canalCount: "1-2", eruptionAge: "10-12 yrs", keyFeatures: ["Equal cusp heights (Buccal & Lingual)", "Single root usually", "Oval occlusal outline"], clinicalPearl: "Cusps are almost equal in length compared to 1st premolar." },
  { universalNumber: 5, fdiNumber: 14, palmerNotation: "4┘", name: "Maxillary Right First Premolar", arch: "Maxillary", quadrant: 1, type: "Premolar", cuspCount: 2, rootCount: 2, canalCount: "2", eruptionAge: "10-11 yrs", keyFeatures: ["Mesial developmental groove", "Deep mesial root concavity", "2 distinct roots"], clinicalPearl: "Mesial concavity makes matrix placement challenging in restorative procedures." },
  { universalNumber: 6, fdiNumber: 13, palmerNotation: "3┘", name: "Maxillary Right Canine", arch: "Maxillary", quadrant: 1, type: "Canine", cuspCount: 1, rootCount: 1, canalCount: "1", eruptionAge: "11-12 yrs", keyFeatures: ["Longest root in human mouth", "Prominent labial ridge", "Cornerstone of arch"], clinicalPearl: "Cornerstone tooth establishing canine guidance and corner of lip facial support." },
  { universalNumber: 7, fdiNumber: 12, palmerNotation: "2┘", name: "Maxillary Right Lateral Incisor", arch: "Maxillary", quadrant: 1, type: "Incisor", cuspCount: 0, rootCount: 1, canalCount: "1", eruptionAge: "8-9 yrs", keyFeatures: ["Peg lateral variation common", "Deep lingual fossa & pit", "Rounded distoincisal angle"], clinicalPearl: "Second most common tooth to be congenitally missing or peg-shaped (after third molars)." },
  { universalNumber: 8, fdiNumber: 11, palmerNotation: "1┘", name: "Maxillary Right Central Incisor", arch: "Maxillary", quadrant: 1, type: "Incisor", cuspCount: 0, rootCount: 1, canalCount: "1", eruptionAge: "7-8 yrs", keyFeatures: ["Widest anterior crown", "Straight incisal edge", "Prominent cingulum"], clinicalPearl: "Most prominent tooth in smile line aesthetics." },

  // Upper Arch - Maxillary Left Quadrant 2 (#9 to #16)
  { universalNumber: 9, fdiNumber: 21, palmerNotation: "└1", name: "Maxillary Left Central Incisor", arch: "Maxillary", quadrant: 2, type: "Incisor", cuspCount: 0, rootCount: 1, canalCount: "1", eruptionAge: "7-8 yrs", keyFeatures: ["Widest anterior crown", "Straight incisal edge", "Prominent cingulum"], clinicalPearl: "Symmetrical pair to Tooth #8." },
  { universalNumber: 10, fdiNumber: 22, palmerNotation: "└2", name: "Maxillary Left Lateral Incisor", arch: "Maxillary", quadrant: 2, type: "Incisor", cuspCount: 0, rootCount: 1, canalCount: "1", eruptionAge: "8-9 yrs", keyFeatures: ["Peg lateral common", "Lingual pit caries prone"], clinicalPearl: "Check lingual pit carefully for pit-and-fissure caries." },
  { universalNumber: 11, fdiNumber: 23, palmerNotation: "└3", name: "Maxillary Left Canine", arch: "Maxillary", quadrant: 2, type: "Canine", cuspCount: 1, rootCount: 1, canalCount: "1", eruptionAge: "11-12 yrs", keyFeatures: ["Longest root", "Pointed cusp tip"], clinicalPearl: "Extremely anchored tooth; excellent abutment for fixed prosthodontics." },
  { universalNumber: 12, fdiNumber: 24, palmerNotation: "└4", name: "Maxillary Left First Premolar", arch: "Maxillary", quadrant: 2, type: "Premolar", cuspCount: 2, rootCount: 2, canalCount: "2", eruptionAge: "10-11 yrs", keyFeatures: ["2 roots (B & L)", "Mesial concavity"], clinicalPearl: "Buccal cusp is longer than lingual cusp." },
  { universalNumber: 13, fdiNumber: 25, palmerNotation: "└5", name: "Maxillary Left Second Premolar", arch: "Maxillary", quadrant: 2, type: "Premolar", cuspCount: 2, rootCount: 1, canalCount: "1-2", eruptionAge: "10-12 yrs", keyFeatures: ["Single root", "Equal cusp lengths"], clinicalPearl: "More rounded occlusal outline than 1st premolar." },
  { universalNumber: 14, fdiNumber: 26, palmerNotation: "└6", name: "Maxillary Left First Molar", arch: "Maxillary", quadrant: 2, type: "Molar", cuspCount: 5, rootCount: 3, canalCount: "3-4 (MB2)", eruptionAge: "6-7 yrs", keyFeatures: ["Oblique ridge", "Cusp of Carabelli"], clinicalPearl: "Upper left cornerstone 6-year molar." },
  { universalNumber: 15, fdiNumber: 27, palmerNotation: "└7", name: "Maxillary Left Second Molar", arch: "Maxillary", quadrant: 2, type: "Molar", cuspCount: 4, rootCount: 3, canalCount: "3-4", eruptionAge: "12-13 yrs", keyFeatures: ["4 cusps", "Roots closer together"], clinicalPearl: "Erupts behind 1st molar at age 12 (12-year molar)." },
  { universalNumber: 16, fdiNumber: 28, palmerNotation: "└8", name: "Maxillary Left Third Molar", arch: "Maxillary", quadrant: 2, type: "Molar", cuspCount: 3, rootCount: 3, canalCount: "1-3", eruptionAge: "17-21 yrs", keyFeatures: ["Upper left wisdom tooth"], clinicalPearl: "Upper third molars may erupt buccally if short on space." },

  // Lower Arch - Mandibular Left Quadrant 3 (#17 to #24)
  { universalNumber: 17, fdiNumber: 38, palmerNotation: "┌8", name: "Mandibular Left Third Molar", arch: "Mandibular", quadrant: 3, type: "Molar", cuspCount: 4, rootCount: 2, canalCount: "1-3", eruptionAge: "17-21 yrs", keyFeatures: ["Lower left wisdom tooth", "Often horizontally impacted"], clinicalPearl: "Horizontal impactions close to Inferior Alveolar Nerve (IAN) require CBCT evaluation." },
  { universalNumber: 18, fdiNumber: 37, palmerNotation: "┌7", name: "Mandibular Left Second Molar", arch: "Mandibular", quadrant: 3, type: "Molar", cuspCount: 4, rootCount: 2, canalCount: "3-4", eruptionAge: "11-13 yrs", keyFeatures: ["Rectangular occlusal outline", "Cross-shaped (+ pattern) groove"], clinicalPearl: "Symmetrical 4 cusps separated by a central cross-shaped groove pattern." },
  { universalNumber: 19, fdiNumber: 36, palmerNotation: "┌6", name: "Mandibular Left First Molar", arch: "Mandibular", quadrant: 3, type: "Molar", cuspCount: 5, rootCount: 2, canalCount: "3-4", eruptionAge: "6-7 yrs", keyFeatures: ["5 cusps (3 Buccal, 2 Lingual)", "Largest mandibular tooth"], clinicalPearl: "First permanent tooth to erupt in lower arch! 3 canals typical (2 mesial, 1 distal)." },
  { universalNumber: 20, fdiNumber: 35, palmerNotation: "┌5", name: "Mandibular Left Second Premolar", arch: "Mandibular", quadrant: 3, type: "Premolar", cuspCount: 3, rootCount: 1, canalCount: "1", eruptionAge: "11-12 yrs", keyFeatures: ["3-cusp form (Y-pattern groove) or 2-cusp (H or U pattern)"], clinicalPearl: "Y-shaped groove pattern with 1 buccal and 2 lingual cusps is most common." },
  { universalNumber: 21, fdiNumber: 34, palmerNotation: "┌4", name: "Mandibular Left First Premolar", arch: "Mandibular", quadrant: 3, type: "Premolar", cuspCount: 2, rootCount: 1, canalCount: "1", eruptionAge: "10-12 yrs", keyFeatures: ["Non-functional afunctional lingual cusp", "Transverse ridge"], clinicalPearl: "Lingual cusp is very small and non-functional; occlusal surface slants 45 degrees lingually." },
  { universalNumber: 22, fdiNumber: 33, palmerNotation: "┌3", name: "Mandibular Left Canine", arch: "Mandibular", quadrant: 3, type: "Canine", cuspCount: 1, rootCount: 1, canalCount: "1-2", eruptionAge: "9-10 yrs", keyFeatures: ["Smoother labial surface than upper canine", "Occasionally bifurcated root"], clinicalPearl: "Smooth, continuous convex labial curvature." },
  { universalNumber: 23, fdiNumber: 32, palmerNotation: "┌2", name: "Mandibular Left Lateral Incisor", arch: "Mandibular", quadrant: 3, type: "Incisor", cuspCount: 0, rootCount: 1, canalCount: "1", eruptionAge: "7-8 yrs", keyFeatures: ["Slightly larger crown than central incisor", "Incisal edge twisted on root"], clinicalPearl: "Crown appears twisted distally on root axis." },
  { universalNumber: 24, fdiNumber: 31, palmerNotation: "┌1", name: "Mandibular Left Central Incisor", arch: "Mandibular", quadrant: 3, type: "Incisor", cuspCount: 0, rootCount: 1, canalCount: "1", eruptionAge: "6-7 yrs", keyFeatures: ["Smallest tooth in permanent dentition", "Symmetrical crown"], clinicalPearl: "Most symmetrical tooth in the entire human mouth." },

  // Lower Arch - Mandibular Right Quadrant 4 (#25 to #32)
  { universalNumber: 25, fdiNumber: 41, palmerNotation: "┐1", name: "Mandibular Right Central Incisor", arch: "Mandibular", quadrant: 4, type: "Incisor", cuspCount: 0, rootCount: 1, canalCount: "1", eruptionAge: "6-7 yrs", keyFeatures: ["Smallest tooth", "Highly symmetrical"], clinicalPearl: "Forms lower midline contact with Tooth #24." },
  { universalNumber: 26, fdiNumber: 42, palmerNotation: "┐2", name: "Mandibular Right Lateral Incisor", arch: "Mandibular", quadrant: 4, type: "Incisor", cuspCount: 0, rootCount: 1, canalCount: "1", eruptionAge: "7-8 yrs", keyFeatures: ["Larger than central incisor", "Crown twisted distally"], clinicalPearl: "Incisal edge tilts distally." },
  { universalNumber: 27, fdiNumber: 43, palmerNotation: "┐3", name: "Mandibular Right Canine", arch: "Mandibular", quadrant: 4, type: "Canine", cuspCount: 1, rootCount: 1, canalCount: "1-2", eruptionAge: "9-10 yrs", keyFeatures: ["Long root", "Straight mesial outline"], clinicalPearl: "Erupts before maxillary canine!" },
  { universalNumber: 28, fdiNumber: 44, palmerNotation: "┐4", name: "Mandibular Right First Premolar", arch: "Mandibular", quadrant: 4, type: "Premolar", cuspCount: 2, rootCount: 1, canalCount: "1", eruptionAge: "10-12 yrs", keyFeatures: ["45 degree lingual slant", "Tiny lingual cusp"], clinicalPearl: "Bur entry must be perpendicular to occlusal plane, angled lingually." },
  { universalNumber: 29, fdiNumber: 45, palmerNotation: "┐5", name: "Mandibular Right Second Premolar", arch: "Mandibular", quadrant: 4, type: "Premolar", cuspCount: 3, rootCount: 1, canalCount: "1", eruptionAge: "11-12 yrs", keyFeatures: ["Y-groove pattern", "Functional lingual cusps"], clinicalPearl: "Frequently replaces primary 2nd molar (#T)." },
  { universalNumber: 30, fdiNumber: 46, palmerNotation: "┐6", name: "Mandibular Right First Molar", arch: "Mandibular", quadrant: 4, type: "Molar", cuspCount: 5, rootCount: 2, canalCount: "3-4", eruptionAge: "6-7 yrs", keyFeatures: ["5 cusps", "Largest lower tooth", "2 roots"], clinicalPearl: "Lower right 6-year molar powerhouse." },
  { universalNumber: 31, fdiNumber: 47, palmerNotation: "┐7", name: "Mandibular Right Second Molar", arch: "Mandibular", quadrant: 4, type: "Molar", cuspCount: 4, rootCount: 2, canalCount: "3-4", eruptionAge: "11-13 yrs", keyFeatures: ["4 cusps (+ pattern)", "2 roots"], clinicalPearl: "Symmetrical + pattern occlusal grooves." },
  { universalNumber: 32, fdiNumber: 48, palmerNotation: "┐8", name: "Mandibular Right Third Molar", arch: "Mandibular", quadrant: 4, type: "Molar", cuspCount: 4, rootCount: 2, canalCount: "1-3", eruptionAge: "17-21 yrs", keyFeatures: ["Lower right wisdom tooth"], clinicalPearl: "Frequently requires impaction management." }
];
