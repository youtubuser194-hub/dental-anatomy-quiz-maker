import React, { useState } from "react";
import { ANATOMICAL_STRUCTURES } from "../data/dentalAnatomyData";
import { AnatomicalStructure } from "../types";
import { Sparkles, CheckCircle2, XCircle, Info, HelpCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  onStartQuizOnStructure?: (structureName: string) => void;
}

export const AnatomicalToothDiagram: React.FC<Props> = ({ onStartQuizOnStructure }) => {
  const [selectedStructure, setSelectedStructure] = useState<AnatomicalStructure>(ANATOMICAL_STRUCTURES[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Spotter Quiz Mode State
  const [spotterMode, setSpotterMode] = useState<boolean>(false);
  const [targetStructure, setTargetStructure] = useState<AnatomicalStructure | null>(null);
  const [spotterFeedback, setSpotterFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [spotterScore, setSpotterScore] = useState<number>(0);
  const [spotterTotal, setSpotterTotal] = useState<number>(0);
  const [spotterStreak, setSpotterStreak] = useState<number>(0);

  const startSpotterGame = () => {
    setSpotterMode(true);
    setSpotterScore(0);
    setSpotterTotal(0);
    setSpotterStreak(0);
    pickNextTarget();
  };

  const pickNextTarget = () => {
    const randomItem = ANATOMICAL_STRUCTURES[Math.floor(Math.random() * ANATOMICAL_STRUCTURES.length)];
    setTargetStructure(randomItem);
    setSpotterFeedback(null);
  };

  const handleStructureClick = (structure: AnatomicalStructure) => {
    if (spotterMode && targetStructure) {
      if (spotterFeedback !== null) return; // Wait for next turn
      const isCorrect = structure.id === targetStructure.id;
      if (isCorrect) {
        setSpotterFeedback("correct");
        setSpotterScore((prev) => prev + 1);
        setSpotterStreak((prev) => prev + 1);
      } else {
        setSpotterFeedback("incorrect");
        setSpotterStreak(0);
      }
      setSpotterTotal((prev) => prev + 1);

      setTimeout(() => {
        pickNextTarget();
      }, 1600);
    } else {
      setSelectedStructure(structure);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Editorial Header Banner */}
      <div className="bg-[#1A1A1A] text-white p-8 border-b-2 border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-[10px] tracking-[0.25em] uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Anatomical Atlas
          </div>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tighter">Tooth Micro-Anatomy & Cross-Section</h2>
          <p className="text-stone-400 text-xs sm:text-sm font-light mt-1">
            Explore histological layers from enamel matrix to alveolar bone, or test your recognition speed in Spotter Mode.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (spotterMode) {
                setSpotterMode(false);
              } else {
                startSpotterGame();
              }
            }}
            className={`px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] font-black transition-all flex items-center gap-2 ${
              spotterMode
                ? "bg-white text-black hover:bg-stone-200"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {spotterMode ? (
              <>
                <Info className="w-3.5 h-3.5" /> Exit Spotter Mode
              </>
            ) : (
              <>
                <HelpCircle className="w-3.5 h-3.5" /> Spotter Identification Mode
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Diagram & Info Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left/Main Column: Vector Cross Section Tooth Graphic in Reference Plate style */}
        <div className="lg:col-span-7 bg-white border border-black/10 p-8 flex flex-col items-center justify-center relative min-h-[520px]">
          <div className="absolute top-4 right-4 bg-black text-white text-[9px] px-3 py-1 font-bold tracking-[0.2em] uppercase">
            Reference Plate 1.1
          </div>

          {/* Spotter Game Bar Overlay */}
          {spotterMode && targetStructure && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 left-4 right-28 bg-[#1A1A1A] text-white p-4 border border-black flex items-center justify-between z-20"
            >
              <div>
                <div className="text-[9px] text-indigo-400 uppercase tracking-widest font-extrabold">Anatomical Target</div>
                <div className="text-sm font-bold font-serif">
                  Identify: <span className="text-amber-300 font-extrabold italic">{targetStructure.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold">
                <div className="bg-black/60 px-3 py-1 border border-white/10">
                  Score: <span className="text-indigo-400">{spotterScore}</span> / {spotterTotal}
                </div>
                <div className="bg-black/60 px-3 py-1 border border-white/10">
                  Streak: <span className="text-amber-400">🔥 {spotterStreak}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Feedback Overlay */}
          <AnimatePresence>
            {spotterFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`absolute inset-0 bg-[#1A1A1A]/90 backdrop-blur-xs flex flex-col items-center justify-center z-30 p-6 text-center ${
                  spotterFeedback === "correct" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {spotterFeedback === "correct" ? (
                  <>
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-2" />
                    <h3 className="text-3xl font-serif italic">Spot-On Identification</h3>
                    <p className="text-stone-300 text-xs mt-2 max-w-sm font-light">
                      You correctly identified <strong className="text-white">{targetStructure?.name}</strong>.
                    </p>
                  </>
                ) : (
                  <>
                    <XCircle className="w-16 h-16 text-rose-400 mb-2" />
                    <h3 className="text-3xl font-serif italic">Incorrect Structure</h3>
                    <p className="text-stone-300 text-xs mt-2 max-w-sm font-light">
                      That was not <strong className="text-white">{targetStructure?.name}</strong>. Try again!
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cross-Section Anatomical Tooth SVG Graphic */}
          <div className="w-full max-w-md my-auto relative pt-10 pb-4">
            <svg viewBox="0 0 400 520" className="w-full h-auto select-none">
              <defs>
                {/* Gradients */}
                <linearGradient id="enamelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="dentinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
                <linearGradient id="pulpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Alveolar Bone (Socket) */}
              <g
                onClick={() => handleStructureClick(ANATOMICAL_STRUCTURES.find((s) => s.id === "alveolar_bone")!)}
                onMouseEnter={() => setHoveredId("alveolar_bone")}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer transition-all duration-200"
              >
                {/* Left Alveolar Bone */}
                <path
                  d="M 20 280 Q 60 280 80 320 Q 95 380 95 480 L 10 480 Z"
                  fill="url(#boneGrad)"
                  opacity={hoveredId === "alveolar_bone" || selectedStructure.id === "alveolar_bone" ? 1 : 0.85}
                  stroke={hoveredId === "alveolar_bone" || selectedStructure.id === "alveolar_bone" ? "#facc15" : "#6b21a8"}
                  strokeWidth={hoveredId === "alveolar_bone" || selectedStructure.id === "alveolar_bone" ? 4 : 2}
                  filter={hoveredId === "alveolar_bone" ? "url(#glow)" : undefined}
                />
                {/* Right Alveolar Bone */}
                <path
                  d="M 380 280 Q 340 280 320 320 Q 305 380 305 480 L 390 480 Z"
                  fill="url(#boneGrad)"
                  opacity={hoveredId === "alveolar_bone" || selectedStructure.id === "alveolar_bone" ? 1 : 0.85}
                  stroke={hoveredId === "alveolar_bone" || selectedStructure.id === "alveolar_bone" ? "#facc15" : "#6b21a8"}
                  strokeWidth={hoveredId === "alveolar_bone" || selectedStructure.id === "alveolar_bone" ? 4 : 2}
                />
                <circle cx="50" cy="360" r="3" fill="#e9d5ff" opacity="0.6" />
                <circle cx="40" cy="410" r="4" fill="#e9d5ff" opacity="0.6" />
                <circle cx="350" cy="360" r="3" fill="#e9d5ff" opacity="0.6" />
                <circle cx="360" cy="410" r="4" fill="#e9d5ff" opacity="0.6" />
              </g>

              {/* 2. Gingiva (Gums) */}
              <g
                onClick={() => handleStructureClick(ANATOMICAL_STRUCTURES.find((s) => s.id === "gingiva")!)}
                onMouseEnter={() => setHoveredId("gingiva")}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer transition-all duration-200"
              >
                <path
                  d="M 20 280 Q 75 275 110 250 Q 120 280 80 320 Z"
                  fill="#f472b6"
                  stroke={hoveredId === "gingiva" || selectedStructure.id === "gingiva" ? "#facc15" : "#db2777"}
                  strokeWidth={hoveredId === "gingiva" || selectedStructure.id === "gingiva" ? 3 : 1.5}
                />
                <path
                  d="M 380 280 Q 325 275 290 250 Q 280 280 320 320 Z"
                  fill="#f472b6"
                  stroke={hoveredId === "gingiva" || selectedStructure.id === "gingiva" ? "#facc15" : "#db2777"}
                  strokeWidth={hoveredId === "gingiva" || selectedStructure.id === "gingiva" ? 3 : 1.5}
                />
              </g>

              {/* 3. Periodontal Ligament (PDL) */}
              <g
                onClick={() => handleStructureClick(ANATOMICAL_STRUCTURES.find((s) => s.id === "pdl")!)}
                onMouseEnter={() => setHoveredId("pdl")}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer transition-all duration-200"
              >
                <path
                  d="M 112 250 Q 96 320 120 480 L 126 480 Q 102 320 118 250 Z"
                  fill="#34d399"
                  stroke={hoveredId === "pdl" || selectedStructure.id === "pdl" ? "#facc15" : "#059669"}
                  strokeWidth={hoveredId === "pdl" || selectedStructure.id === "pdl" ? 3 : 1}
                />
                <path
                  d="M 288 250 Q 304 320 280 480 L 274 480 Q 298 320 282 250 Z"
                  fill="#34d399"
                  stroke={hoveredId === "pdl" || selectedStructure.id === "pdl" ? "#facc15" : "#059669"}
                  strokeWidth={hoveredId === "pdl" || selectedStructure.id === "pdl" ? 3 : 1}
                />
              </g>

              {/* 4. Cementum */}
              <g
                onClick={() => handleStructureClick(ANATOMICAL_STRUCTURES.find((s) => s.id === "cementum")!)}
                onMouseEnter={() => setHoveredId("cementum")}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer transition-all duration-200"
              >
                <path
                  d="M 118 250 Q 102 320 126 480 L 133 480 Q 110 320 124 250 Z"
                  fill="#fb923c"
                  stroke={hoveredId === "cementum" || selectedStructure.id === "cementum" ? "#facc15" : "#ea580c"}
                  strokeWidth={hoveredId === "cementum" || selectedStructure.id === "cementum" ? 3 : 1}
                />
                <path
                  d="M 282 250 Q 298 320 274 480 L 267 480 Q 290 320 276 250 Z"
                  fill="#fb923c"
                  stroke={hoveredId === "cementum" || selectedStructure.id === "cementum" ? "#facc15" : "#ea580c"}
                  strokeWidth={hoveredId === "cementum" || selectedStructure.id === "cementum" ? 3 : 1}
                />
              </g>

              {/* 5. Dentin Layer */}
              <g
                onClick={() => handleStructureClick(ANATOMICAL_STRUCTURES.find((s) => s.id === "dentin")!)}
                onMouseEnter={() => setHoveredId("dentin")}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer transition-all duration-200"
              >
                <path
                  d="M 200 45 C 240 45, 275 80, 275 140 C 275 200, 275 250, 267 480 L 133 480 C 125 250, 125 200, 125 140 C 125 80, 160 45, 200 45 Z"
                  fill="url(#dentinGrad)"
                  stroke={hoveredId === "dentin" || selectedStructure.id === "dentin" ? "#facc15" : "#ca8a04"}
                  strokeWidth={hoveredId === "dentin" || selectedStructure.id === "dentin" ? 4 : 2}
                  filter={hoveredId === "dentin" ? "url(#glow)" : undefined}
                />
                <line x1="160" y1="110" x2="180" y2="130" stroke="#ca8a04" strokeWidth="1" opacity="0.4" />
                <line x1="240" y1="110" x2="220" y2="130" stroke="#ca8a04" strokeWidth="1" opacity="0.4" />
                <line x1="150" y1="180" x2="180" y2="190" stroke="#ca8a04" strokeWidth="1" opacity="0.4" />
                <line x1="250" y1="180" x2="220" y2="190" stroke="#ca8a04" strokeWidth="1" opacity="0.4" />
              </g>

              {/* 6. Enamel Layer */}
              <g
                onClick={() => handleStructureClick(ANATOMICAL_STRUCTURES.find((s) => s.id === "enamel")!)}
                onMouseEnter={() => setHoveredId("enamel")}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer transition-all duration-200"
              >
                <path
                  d="M 200 20 C 265 20, 295 70, 290 220 L 275 220 C 280 150, 255 45, 200 45 C 145 45, 120 150, 125 220 L 110 220 C 105 70, 135 20, 200 20 Z"
                  fill="url(#enamelGrad)"
                  stroke={hoveredId === "enamel" || selectedStructure.id === "enamel" ? "#facc15" : "#0284c7"}
                  strokeWidth={hoveredId === "enamel" || selectedStructure.id === "enamel" ? 4 : 2}
                  filter={hoveredId === "enamel" ? "url(#glow)" : undefined}
                />
                <path d="M 140 30 Q 160 22 175 35 Q 200 18 225 35 Q 240 22 260 30" fill="none" stroke="#e0f2fe" strokeWidth="2" opacity="0.8" />
              </g>

              {/* 7. Dental Pulp Chamber */}
              <g
                onClick={() => handleStructureClick(ANATOMICAL_STRUCTURES.find((s) => s.id === "pulp_chamber")!)}
                onMouseEnter={() => setHoveredId("pulp_chamber")}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer transition-all duration-200"
              >
                <path
                  d="M 200 120 C 215 120, 225 130, 225 150 C 225 170, 215 190, 208 230 L 208 480 L 192 480 L 192 230 C 185 190, 175 170, 175 150 C 175 130, 185 120, 200 120 Z"
                  fill="url(#pulpGrad)"
                  stroke={hoveredId === "pulp_chamber" || selectedStructure.id === "pulp_chamber" ? "#facc15" : "#b91c1c"}
                  strokeWidth={hoveredId === "pulp_chamber" || selectedStructure.id === "pulp_chamber" ? 3 : 1.5}
                  filter={hoveredId === "pulp_chamber" ? "url(#glow)" : undefined}
                />
                <path d="M 175 150 L 165 135 M 225 150 L 235 135" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Hotspot Indicators */}
              {ANATOMICAL_STRUCTURES.map((struct) => {
                const isSelected = selectedStructure.id === struct.id;
                const isHovered = hoveredId === struct.id;
                if (!isSelected && !isHovered) return null;

                return (
                  <g key={`tag_${struct.id}`} className="pointer-events-none">
                    <circle cx={struct.hotspotCoords.x * 4} cy={struct.hotspotCoords.y * 5.2} r="6" fill="#facc15" stroke="#000" strokeWidth="2" />
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="mt-2 text-[10px] uppercase tracking-wider italic text-black/50">
            Fig 1.2: Longitudinal cross-section of maxillary incisor crown & root apparatus.
          </p>

          {/* Quick Selection Buttons */}
          <div className="w-full flex flex-wrap items-center justify-center gap-2 pt-6 mt-4 border-t border-black/5">
            {ANATOMICAL_STRUCTURES.map((s) => {
              const isActive = selectedStructure.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleStructureClick(s)}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-[#EBE9E4] text-black/80 hover:bg-stone-300"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Anatomical Breakdown Card */}
        <div className="lg:col-span-5 bg-white border border-black/10 p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-black/10">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5" style={{ backgroundColor: selectedStructure.color }} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-stone-500">Active Layer</span>
            </div>
            {onStartQuizOnStructure && (
              <button
                onClick={() => onStartQuizOnStructure(selectedStructure.name)}
                className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-stone-100 px-3 py-1.5 border border-stone-200"
              >
                <Sparkles className="w-3.5 h-3.5" /> Quiz On Tissue
              </button>
            )}
          </div>

          <div>
            <h3 className="text-3xl font-serif text-black">{selectedStructure.name}</h3>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">{selectedStructure.subtitle}</p>
          </div>

          <p className="text-stone-700 text-xs leading-relaxed font-light">{selectedStructure.description}</p>

          <div className="space-y-4 pt-2">
            <div className="bg-[#F9F8F6] p-4 border-l-2 border-black">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-900 block mb-1">Composition & Matrix</span>
              <p className="text-xs text-stone-700 leading-relaxed font-light">{selectedStructure.composition}</p>
            </div>

            <div className="bg-[#F9F8F6] p-4 border-l-2 border-indigo-600">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-900 block mb-1">Clinical Significance</span>
              <p className="text-xs text-stone-700 leading-relaxed font-light">{selectedStructure.clinicalSignificance}</p>
            </div>

            <div className="bg-[#F9F8F6] p-4 border-l-2 border-amber-600">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-amber-900 block mb-1">Board Pearl</span>
              <p className="text-xs text-stone-700 leading-relaxed font-light">{selectedStructure.pathologyNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
