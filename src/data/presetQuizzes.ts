import { QuizDeck } from "../types";

export const PRESET_QUIZ_DECKS: QuizDeck[] = [
  {
    id: "deck_tooth_numbering_masterclass",
    title: "Tooth Numbering & Identification Masterclass",
    description: "Master the Universal Numbering System (#1-32), FDI World Dental Federation notation (#11-48), and primary teeth lettering (A-T).",
    category: "Tooth Identification",
    difficulty: "Basic",
    iconName: "Hash",
    estimatedMinutes: 8,
    createdBy: "system",
    createdAt: "2026-01-15",
    tags: ["Universal", "FDI Notation", "Primary Teeth", "Quadrants"],
    questions: [
      {
        id: "num_q1",
        question: "Under the Universal Numbering System, which tooth number designates the permanent maxillary right first molar?",
        options: ["Tooth #3", "Tooth #14", "Tooth #19", "Tooth #30"],
        correctAnswerIndex: 0,
        explanation: "In the Universal Numbering System, counting begins at tooth #1 (maxillary right third molar) and proceeds clockwise to #16 (maxillary left third molar), then drops down to #17 (mandibular left third molar) and across to #32. Tooth #3 is the maxillary right first molar.",
        category: "Tooth Identification",
        anatomicalFocus: "Universal #3",
        clinicalTip: "Mnemonic for maxillary right quadrant: #1 (3rd Molar) to #8 (Central Incisor)."
      },
      {
        id: "num_q2",
        question: "What is the FDI notation equivalent for the permanent mandibular left first molar (Universal #19)?",
        options: ["FDI Tooth #36", "FDI Tooth #26", "FDI Tooth #46", "FDI Tooth #16"],
        correctAnswerIndex: 0,
        explanation: "FDI notation uses two digits: the first digit is the quadrant (1 = Maxillary Right, 2 = Maxillary Left, 3 = Mandibular Left, 4 = Mandibular Right). The second digit is tooth position from midline (1 to 8). Mandibular left quadrant is 3, first molar is position 6, making it FDI Tooth 36.",
        category: "Tooth Identification",
        anatomicalFocus: "FDI #36",
        clinicalTip: "FDI Quadrant codes: 1=UR, 2=UL, 3=LL, 4=LR for permanent teeth."
      },
      {
        id: "num_q3",
        question: "In the primary (deciduous) dentition using the Universal system, which letter represents the primary maxillary left central incisor?",
        options: ["Letter F", "Letter E", "Letter A", "Letter J"],
        correctAnswerIndex: 0,
        explanation: "Primary teeth in the Universal system use letters A through T. Maxillary right second primary molar is A. Counting clockwise across the maxillary arch: A to J. Tooth E is upper right central incisor, and F is upper left central incisor.",
        category: "Tooth Identification",
        anatomicalFocus: "Primary Tooth F",
        clinicalTip: "Primary teeth A-J are upper arch (A=right 2nd molar, J=left 2nd molar), K-T are lower arch."
      },
      {
        id: "num_q4",
        question: "Which permanent tooth is designated as Tooth #24 in the Universal Numbering System?",
        options: ["Mandibular Left Central Incisor", "Mandibular Right Central Incisor", "Maxillary Left Central Incisor", "Mandibular Left Lateral Incisor"],
        correctAnswerIndex: 0,
        explanation: "Tooth #24 is the mandibular left central incisor. Tooth #25 is the mandibular right central incisor immediately across the midline.",
        category: "Tooth Identification",
        anatomicalFocus: "Universal #24",
        clinicalTip: "Midline lower arch lies between Tooth #24 (left central) and Tooth #25 (right central)."
      },
      {
        id: "num_q5",
        question: "In FDI notation, what does the first digit '5' signify?",
        options: ["Primary Maxillary Right Quadrant", "Primary Mandibular Left Quadrant", "Permanent Maxillary Right Quadrant", "Permanent Mandibular Right Quadrant"],
        correctAnswerIndex: 0,
        explanation: "For primary teeth in FDI notation, quadrants are numbered 5 to 8 clockwise starting from primary maxillary right (5 = Maxillary Right, 6 = Maxillary Left, 7 = Mandibular Left, 8 = Mandibular Right).",
        category: "Tooth Identification",
        anatomicalFocus: "FDI Primary Quadrant 5",
        clinicalTip: "Primary FDI Quadrants: 5=UR, 6=UL, 7=LL, 8=LR."
      }
    ]
  },
  {
    id: "deck_histology_and_microanatomy",
    title: "Tooth Histology & Micro-Anatomy",
    description: "In-depth study of Enamel, Dentin, Pulp, Cementum, Periodontal Ligament, and Alveolar Bone structures.",
    category: "Histology",
    difficulty: "Intermediate",
    iconName: "Layers",
    estimatedMinutes: 10,
    createdBy: "system",
    createdAt: "2026-01-18",
    tags: ["Enamel", "Dentin", "Pulp", "PDL", "Histology"],
    questions: [
      {
        id: "hist_q1",
        question: "Which cell type is responsible for the formation of secondary and tertiary (reactive) dentin throughout a person's life?",
        options: ["Odontoblasts", "Ameloblasts", "Cementoblasts", "Osteoblasts"],
        correctAnswerIndex: 0,
        explanation: "Odontoblasts line the outer layer of the dental pulp and remain functional throughout life to produce secondary dentin as part of normal aging, and tertiary (reparative) dentin in response to trauma or caries. Ameloblasts die upon tooth eruption and cannot form new enamel.",
        category: "Histology",
        anatomicalFocus: "Odontoblasts & Dentin",
        clinicalTip: "Odontoblast cell bodies reside inside the pulp chamber with process extensions into dentinal tubules."
      },
      {
        id: "hist_q2",
        question: "What percentage of mature human dental enamel consists of inorganic mineral content (hydroxyapatite crystals)?",
        options: ["Approximately 96%", "Approximately 70%", "Approximately 50%", "Approximately 35%"],
        correctAnswerIndex: 0,
        explanation: "Enamel is the hardest tissue in the human body, composed of ~96% inorganic hydroxyapatite crystals, 1% organic material (enamelin/amelogenin), and 3% water.",
        category: "Histology",
        anatomicalFocus: "Enamel Hydroxyapatite",
        clinicalTip: "Because enamel lacks living cells, it cannot regenerate cellularly once destroyed by acid demineralization."
      },
      {
        id: "hist_q3",
        question: "What are the collagen bundle fibers that anchor the Periodontal Ligament (PDL) directly into the cementum and alveolar bone called?",
        options: ["Sharpey's Fibers", "Tomes' Process", "Lines of Von Ebner", "Hunter-Schreger Bands"],
        correctAnswerIndex: 0,
        explanation: "Sharpey's fibers are the terminal ends of principal collagen fibers of the periodontal ligament that embed into the cementum on one side and the periosteum/alveolar bone on the other side, securing the tooth in its socket.",
        category: "Histology",
        anatomicalFocus: "Periodontal Ligament (PDL)",
        clinicalTip: "Sharpey's fibers provide mechanoreception, dampening heavy masticatory forces."
      },
      {
        id: "hist_q4",
        question: "The junction where enamel meets dentin inside the tooth crown is known clinically and histologically as the:",
        options: ["Dentinoenamel Junction (DEJ)", "Cementodentinal Junction (CDJ)", "Mucogingival Junction (MGJ)", "Cervical Line"],
        correctAnswerIndex: 0,
        explanation: "The Dentinoenamel Junction (DEJ) is the scalloped interface separating enamel and dentin. It acts as a structural stop against crack propagation from enamel into dentin.",
        category: "Histology",
        anatomicalFocus: "Dentinoenamel Junction (DEJ)",
        clinicalTip: "Caries spreads laterally rapidly once it penetrates the DEJ because dentin is softer and organic."
      },
      {
        id: "hist_q5",
        question: "Which type of cementum is found primarily in the apical third of tooth roots and contains trapped cementocytes?",
        options: ["Cellular Cementum", "Acellular Cementum", "Primary Cementum", "Enameloid Cementum"],
        correctAnswerIndex: 0,
        explanation: "Cellular cementum forms rapidly in the apical third and furcation areas of the root after tooth eruption and contains entrapped cementocytes in lacunae. Acellular cementum forms first and covers the cervical half of the root.",
        category: "Histology",
        anatomicalFocus: "Cellular Cementum",
        clinicalTip: "Apical cellular cementum continues to deposit throughout life to compensate for occlusal tooth wear."
      }
    ]
  },
  {
    id: "deck_cusp_and_occlusal_morphology",
    title: "Occlusal Surface & Cusp Morphology",
    description: "Detailed breakdown of Cusps, Ridges, Grooves, Fossa, and specific anatomical landmarks like Cusp of Carabelli.",
    category: "Tooth Morphology",
    difficulty: "Intermediate",
    iconName: "Sparkles",
    estimatedMinutes: 10,
    createdBy: "system",
    createdAt: "2026-01-20",
    tags: ["Cusps", "Cusp of Carabelli", "Oblique Ridge", "Grooves"],
    questions: [
      {
        id: "morph_q1",
        question: "The Cusp of Carabelli, a non-functional supplementary cusp, is most commonly located on which surface of which tooth?",
        options: [
          "Mesiolingual surface of Maxillary First Molar",
          "Distobuccal surface of Maxillary First Molar",
          "Mesiolingual surface of Mandibular First Molar",
          "Distolingual surface of Maxillary Second Molar"
        ],
        correctAnswerIndex: 0,
        explanation: "The Cusp of Carabelli (tubercle of Carabelli) is found on the mesiolingual cusp of the permanent maxillary first molar (Universal #3 and #14). It is present in approximately 70-80% of European populations.",
        category: "Tooth Morphology",
        anatomicalFocus: "Cusp of Carabelli",
        clinicalTip: "Cusp of Carabelli is a key diagnostic landmark for maxillary 1st molar identification!"
      },
      {
        id: "morph_q2",
        question: "Which permanent molar uniquely features an Oblique Ridge running diagonally across its occlusal surface from mesiolingual cusp to distobuccal cusp?",
        options: ["Maxillary Molars", "Mandibular First Molar", "Mandibular Second Molar", "Maxillary First Premolar"],
        correctAnswerIndex: 0,
        explanation: "Maxillary molars (especially 1st and 2nd maxillary molars) possess a prominent Oblique Ridge formed by the union of the triangular ridge of the distobuccal cusp and the distal ridge of the mesiolingual cusp.",
        category: "Tooth Morphology",
        anatomicalFocus: "Oblique Ridge",
        clinicalTip: "When preparing class II amalgam or composite cavities, preserve the oblique ridge if caries hasn't crossed it."
      },
      {
        id: "morph_q3",
        question: "How many major cusps does a classic permanent mandibular first molar typically possess?",
        options: ["5 Cusps (3 Buccal, 2 Lingual)", "4 Cusps (2 Buccal, 2 Lingual)", "3 Cusps (1 Buccal, 2 Lingual)", "6 Cusps"],
        correctAnswerIndex: 0,
        explanation: "The permanent mandibular first molar (#19 and #30) is the largest tooth in the mandibular arch and typically features 5 cusps: Mesiobuccal, Distobuccal, Distal, Mesiolingual, and Distolingual.",
        category: "Tooth Morphology",
        anatomicalFocus: "Mandibular 1st Molar",
        clinicalTip: "The 5th cusp on mandibular 1st molar is the small Distal Cusp situated on the distobuccal corner."
      },
      {
        id: "morph_q4",
        question: "The prominent ridge formed by the junction of a buccal triangular ridge and a lingual triangular ridge across the occlusal surface is called a:",
        options: ["Transverse Ridge", "Oblique Ridge", "Marginal Ridge", "Cingulum"],
        correctAnswerIndex: 0,
        explanation: "A Transverse Ridge is created when a buccal triangular ridge and a lingual triangular ridge meet directly across the middle of an occlusal surface (e.g., mandibular 1st premolar).",
        category: "Tooth Morphology",
        anatomicalFocus: "Transverse Ridge",
        clinicalTip: "Transverse ridges bisect occlusal surfaces transversely."
      },
      {
        id: "morph_q5",
        question: "On maxillary central incisors, the smooth convex rounded elevation on the cervical third of the lingual surface is known as the:",
        options: ["Cingulum", "Mamelon", "Fossa", "Labiolingual Ridge"],
        correctAnswerIndex: 0,
        explanation: "The Cingulum is a bulge or rounded prominence on the cervical third of the lingual aspect of anterior teeth (incisors and canines).",
        category: "Tooth Morphology",
        anatomicalFocus: "Cingulum",
        clinicalTip: "Mamelons are the 3 rounded protuberances on incisal edges of newly erupted incisors."
      }
    ]
  },
  {
    id: "deck_root_and_canal_morphology",
    title: "Root & Root Canal Morphology Essentials",
    description: "Crucial root anatomy, MB2 canal prevalence, root concavities, and endodontic clinical pearls.",
    category: "Root Canal Anatomy",
    difficulty: "Advanced Board Prep",
    iconName: "GitCommit",
    estimatedMinutes: 12,
    createdBy: "system",
    createdAt: "2026-01-22",
    tags: ["Roots", "Root Canals", "MB2 Canal", "Endodontics"],
    questions: [
      {
        id: "root_q1",
        question: "Which root of the permanent maxillary first molar is notorious for containing a second mesiobuccal canal (MB2) in over 60-80% of cases?",
        options: ["Mesiobuccal Root", "Distobuccal Root", "Palatal Root", "Mesiodistal Root"],
        correctAnswerIndex: 0,
        explanation: "The Mesiobuccal (MB) root of the maxillary first molar frequently harbors a second canal (MB2). Untreated MB2 canals are a leading cause of endodontic treatment failure in maxillary molars.",
        category: "Root Canal Anatomy",
        anatomicalFocus: "Maxillary 1st Molar MB2",
        clinicalTip: "Always search palatal to the main MB1 orifice using a dental operating microscope to locate MB2."
      },
      {
        id: "root_q2",
        question: "How many roots and root canals does a typical permanent maxillary first premolar (Universal #5 and #12) possess?",
        options: ["2 Roots and 2 Canals", "1 Root and 1 Canal", "3 Roots and 3 Canals", "2 Roots and 3 Canals"],
        correctAnswerIndex: 0,
        explanation: "Maxillary first premolars typically have 2 roots (1 Buccal, 1 Palatal) and 2 root canals in approximately 70-80% of teeth. They also feature a deep mesial developmental root concavity.",
        category: "Root Canal Anatomy",
        anatomicalFocus: "Maxillary 1st Premolar",
        clinicalTip: "Beware of the mesial root concavity when placing matrix bands or scaling to avoid iatrogenic perforation!"
      },
      {
        id: "root_q3",
        question: "Which tooth in the permanent human dentition has the longest root?",
        options: ["Maxillary Canine", "Mandibular Canine", "Maxillary Central Incisor", "Maxillary First Molar Palatal Root"],
        correctAnswerIndex: 0,
        explanation: "The maxillary canine (Universal #6 and #11) has the longest single root of any tooth in the mouth (averaging 17mm root length, ~27mm overall tooth length), making it the cornerstone of the dental arch.",
        category: "Root Canal Anatomy",
        anatomicalFocus: "Maxillary Canine Root",
        clinicalTip: "The canine ridge overlying the root provides strong canine guidance and facial support."
      },
      {
        id: "root_q4",
        question: "In permanent mandibular first molars, how many root canals are most commonly found across its 2 roots (Mesial and Distal)?",
        options: ["3 Canals (2 Mesial, 1 Distal)", "2 Canals (1 Mesial, 1 Distal)", "4 Canals (2 Mesial, 2 Distal)", "1 Canal"],
        correctAnswerIndex: 0,
        explanation: "Mandibular first molars typically have 2 roots (Mesial root and Distal root) containing 3 canals: Mesiobuccal (MB), Mesiolingual (ML), and a single broad Distal (D) canal. Occasionally a second distal canal (Distobuccal/Distolingual) is present.",
        category: "Root Canal Anatomy",
        anatomicalFocus: "Mandibular 1st Molar Canals",
        clinicalTip: "The mesial root almost always contains 2 distinct canals (MB & ML)."
      }
    ]
  },
  {
    id: "deck_board_clinical_vignettes",
    title: "INBDE & NBDHE Clinical Board Vignettes",
    description: "Scenario-based clinical questions linking dental anatomy directly to pathology, radiography, and patient treatment.",
    category: "Clinical Vignettes",
    difficulty: "Advanced Board Prep",
    iconName: "Stethoscope",
    estimatedMinutes: 15,
    createdBy: "system",
    createdAt: "2026-01-25",
    tags: ["INBDE", "Board Review", "Clinical Cases", "Radiography"],
    questions: [
      {
        id: "board_q1",
        question: "A 24-year-old patient presents with severe lingering pain to cold stimuli in tooth #19. Upon bitewing radiography, caries is seen penetrating through enamel and deep into dentin near the pulp chamber. Which dental tissue contains sensory nerve fibers (A-delta and C fibers) that transmit this sharp, acute pulpal pain?",
        options: ["Dental Pulp", "Enamel", "Cementum", "Alveolar Bone"],
        correctAnswerIndex: 0,
        explanation: "The dental pulp is the only innervated soft tissue within the hard tooth structure. Pain from temperature or caries is sensed by nerve fibers in the pulp-dentin complex, primarily unmyelinated C-fibers (dull, throbbing pain) and myelinated A-delta fibers (sharp, fast pain). Enamel is entirely devoid of nerve endings.",
        category: "Clinical Vignettes",
        anatomicalFocus: "Dental Pulp Nerve Supply",
        clinicalTip: "Hydrodynamic theory: fluid movement inside dentinal tubules stimulates A-delta nerve endings near odontoblasts."
      },
      {
        id: "board_q2",
        question: "During a routine periodontal probing examination, the clinician detects a Grade II furcation involvement on tooth #30. Between which root surfaces is this furcation entrance located on a mandibular molar?",
        options: ["Buccal and Lingual surfaces", "Mesial and Distal surfaces", "Mesial and Palatal surfaces", "Occlusal and Apical surfaces"],
        correctAnswerIndex: 0,
        explanation: "Mandibular molars have two roots (Mesial and Distal). Their furcation entrances are located on the Buccal and Lingual surfaces mid-way down the root trunk.",
        category: "Clinical Vignettes",
        anatomicalFocus: "Mandibular Furcation",
        clinicalTip: "Maxillary molars have 3 furcation entrances: Mesial, Distal, and Buccal!"
      },
      {
        id: "board_q3",
        question: "A pediatric patient aged 8 presents for a checkup. Which permanent teeth are typically erupting or fully erupted in the oral cavity at age 8?",
        options: [
          "Permanent First Molars & Central/Lateral Incisors",
          "Permanent Premolars & Canines",
          "Permanent Second Molars",
          "Permanent Third Molars"
        ],
        correctAnswerIndex: 0,
        explanation: "At age 6-7, permanent first molars and mandibular central incisors erupt. By age 7-8, maxillary central incisors and mandibular lateral incisors erupt, followed by maxillary lateral incisors at age 8-9.",
        category: "Clinical Vignettes",
        anatomicalFocus: "Tooth Eruption Chronology",
        clinicalTip: "First permanent molars are often called '6-year molars' because they erupt behind primary 2nd molars without replacing primary teeth."
      }
    ]
  }
];
