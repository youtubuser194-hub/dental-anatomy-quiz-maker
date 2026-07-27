export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category: string; // e.g. "Tooth Morphology", "Histology", "Tooth Numbering", "Root Canal Anatomy", "Clinical Vignette"
  anatomicalFocus?: string; // e.g. "Universal #3", "Cusp of Carabelli", "Dentinoenamel Junction"
  clinicalTip?: string;
  diagramHotspotId?: string; // e.g. "pulp_chamber", "enamel_layer", "pdl"
}

export interface QuizDeck {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Basic" | "Intermediate" | "Advanced Board Prep";
  iconName?: string;
  questions: QuizQuestion[];
  createdBy: "system" | "user" | "gemini";
  createdAt: string;
  estimatedMinutes: number;
  tags: string[];
}

export interface QuestionUserAnswer {
  questionId: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
  timeSpentSeconds?: number;
  isFlagged?: boolean;
}

export interface QuizResult {
  id: string;
  deckId: string;
  deckTitle: string;
  scorePercentage: number;
  correctCount: number;
  totalQuestions: number;
  timeTakenSeconds: number;
  date: string;
  answers: QuestionUserAnswer[];
  mode: "practice" | "exam" | "diagram";
}

export interface AnatomicalStructure {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  composition: string;
  clinicalSignificance: string;
  pathologyNote: string;
  color: string;
  pathSvg: string;
  hotspotCoords: { x: number; y: number };
}

export interface ToothInfo {
  universalNumber: number;
  fdiNumber: number;
  palmerNotation: string;
  name: string;
  arch: "Maxillary" | "Mandibular";
  quadrant: 1 | 2 | 3 | 4;
  type: "Incisor" | "Canine" | "Premolar" | "Molar";
  cuspCount: number;
  rootCount: number;
  canalCount: string;
  eruptionAge: string;
  keyFeatures: string[];
  clinicalPearl: string;
}
