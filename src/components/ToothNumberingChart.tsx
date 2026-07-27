import React, { useState } from "react";
import { PERMANENT_TEETH_DATA } from "../data/dentalAnatomyData";
import { ToothInfo } from "../types";
import { Hash, Sparkles, Filter, ChevronRight, Layers, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  onGenerateQuizForTooth?: (tooth: ToothInfo) => void;
}

export const ToothNumberingChart: React.FC<Props> = ({ onGenerateQuizForTooth }) => {
  const [notationSystem, setNotationSystem] = useState<"Universal" | "FDI" | "Palmer">("Universal");
  const [selectedTooth, setSelectedTooth] = useState<ToothInfo>(PERMANENT_TEETH_DATA[2]); // Default Tooth #3
  const [archFilter, setArchFilter] = useState<"All" | "Maxillary" | "Mandibular">("All");

  const maxillaryTeeth = PERMANENT_TEETH_DATA.filter((t) => t.arch === "Maxillary");
  const mandibularTeeth = PERMANENT_TEETH_DATA.filter((t) => t.arch === "Mandibular");

  const getToothLabel = (tooth: ToothInfo) => {
    if (notationSystem === "FDI") return `#${tooth.fdiNumber}`;
    if (notationSystem === "Palmer") return tooth.palmerNotation;
    return `#${tooth.universalNumber}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header Banner - Editorial Theme */}
      <div className="bg-[#1A1A1A] text-white p-8 border-b-2 border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-[10px] tracking-[0.25em] uppercase mb-1">
            <Hash className="w-3.5 h-3.5" /> Universal & FDI Dental Arch Atlas
          </div>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tighter">Tooth Identification & Morphology</h2>
          <p className="text-stone-400 text-xs sm:text-sm font-light mt-1">
            Switch between Universal (#1-32), FDI World notation, and Palmer notation. Select any tooth for root, canal, and cusp specifications.
          </p>
        </div>

        {/* Notation System Toggle Buttons */}
        <div className="flex items-center gap-1 bg-[#262626] p-1.5 border border-white/10">
          <button
            onClick={() => setNotationSystem("Universal")}
            className={`px-3.5 py-2 text-[10px] uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
              notationSystem === "Universal" ? "bg-white text-black font-black" : "text-stone-400 hover:text-white"
            }`}
          >
            Universal (#1-32)
          </button>
          <button
            onClick={() => setNotationSystem("FDI")}
            className={`px-3.5 py-2 text-[10px] uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
              notationSystem === "FDI" ? "bg-white text-black font-black" : "text-stone-400 hover:text-white"
            }`}
          >
            FDI (#11-48)
          </button>
          <button
            onClick={() => setNotationSystem("Palmer")}
            className={`px-3.5 py-2 text-[10px] uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
              notationSystem === "Palmer" ? "bg-white text-black font-black" : "text-stone-400 hover:text-white"
            }`}
          >
            Palmer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Arch Visualizer */}
        <div className="lg:col-span-8 bg-white border border-black/10 p-8 space-y-8">
          {/* Upper Arch (Maxillary) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-stone-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-indigo-600" /> Upper Arch — Maxillary Teeth
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Quadrants 1 & 2</span>
            </div>

            <div className="grid grid-cols-8 gap-2">
              {maxillaryTeeth.map((tooth) => {
                const isSelected = selectedTooth.universalNumber === tooth.universalNumber;
                return (
                  <button
                    key={`tooth_${tooth.universalNumber}`}
                    onClick={() => setSelectedTooth(tooth)}
                    className={`flex flex-col items-center justify-between p-3 border text-center transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-black text-white border-black font-bold ring-2 ring-indigo-600 z-10"
                        : "bg-[#F9F8F6] hover:bg-stone-200 border-stone-200 text-black"
                    }`}
                  >
                    <span className={`text-xs font-black ${isSelected ? "text-indigo-400" : "text-stone-900"}`}>
                      {getToothLabel(tooth)}
                    </span>
                    <div className="my-1.5 text-lg leading-none">
                      {tooth.type === "Incisor" && "🦷"}
                      {tooth.type === "Canine" && "🔻"}
                      {tooth.type === "Premolar" && "🔷"}
                      {tooth.type === "Molar" && "🟥"}
                    </div>
                    <span className={`text-[9px] uppercase tracking-widest truncate max-w-full font-bold ${isSelected ? "text-stone-300" : "text-stone-500"}`}>
                      {tooth.type}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Arch Midline Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-dashed border-stone-300 w-full" />
            <span className="absolute bg-[#F9F8F6] px-4 text-[9px] font-black text-stone-500 uppercase tracking-[0.25em] border border-stone-300 py-1">
              Anatomical Midline
            </span>
          </div>

          {/* Lower Arch (Mandibular) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-stone-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-black" /> Lower Arch — Mandibular Teeth
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Quadrants 3 & 4</span>
            </div>

            <div className="grid grid-cols-8 gap-2">
              {mandibularTeeth.map((tooth) => {
                const isSelected = selectedTooth.universalNumber === tooth.universalNumber;
                return (
                  <button
                    key={`tooth_${tooth.universalNumber}`}
                    onClick={() => setSelectedTooth(tooth)}
                    className={`flex flex-col items-center justify-between p-3 border text-center transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-black text-white border-black font-bold ring-2 ring-indigo-600 z-10"
                        : "bg-[#F9F8F6] hover:bg-stone-200 border-stone-200 text-black"
                    }`}
                  >
                    <span className={`text-xs font-black ${isSelected ? "text-indigo-400" : "text-stone-900"}`}>
                      {getToothLabel(tooth)}
                    </span>
                    <div className="my-1.5 text-lg leading-none">
                      {tooth.type === "Incisor" && "🦷"}
                      {tooth.type === "Canine" && "🔻"}
                      {tooth.type === "Premolar" && "🔷"}
                      {tooth.type === "Molar" && "🟥"}
                    </div>
                    <span className={`text-[9px] uppercase tracking-widest truncate max-w-full font-bold ${isSelected ? "text-stone-300" : "text-stone-500"}`}>
                      {tooth.type}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Selected Tooth Spec Panel */}
        <div className="lg:col-span-4 bg-white border border-black/10 p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-black/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-indigo-600 block">Tooth Specification</span>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mt-0.5">Quadrant {selectedTooth.quadrant} • {selectedTooth.arch}</div>
            </div>

            {onGenerateQuizForTooth && (
              <button
                onClick={() => onGenerateQuizForTooth(selectedTooth)}
                className="text-[10px] uppercase tracking-widest font-black text-white bg-black hover:bg-stone-800 px-3.5 py-2 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> AI Quiz
              </button>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-serif text-black">{selectedTooth.name}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="bg-[#F9F8F6] border border-stone-200 text-black px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold">
                Univ: #{selectedTooth.universalNumber}
              </span>
              <span className="bg-[#F9F8F6] border border-stone-200 text-black px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold">
                FDI: #{selectedTooth.fdiNumber}
              </span>
              <span className="bg-[#F9F8F6] border border-stone-200 text-black px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold">
                Palmer: {selectedTooth.palmerNotation}
              </span>
            </div>
          </div>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-[#F9F8F6] p-3.5 border border-stone-200">
              <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest block">Cusps</span>
              <span className="text-sm font-bold text-black">{selectedTooth.cuspCount} Cusps</span>
            </div>
            <div className="bg-[#F9F8F6] p-3.5 border border-stone-200">
              <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest block">Roots</span>
              <span className="text-sm font-bold text-black">{selectedTooth.rootCount} Root(s)</span>
            </div>
            <div className="bg-[#F9F8F6] p-3.5 border border-stone-200">
              <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest block">Canals</span>
              <span className="text-sm font-bold text-black">{selectedTooth.canalCount} Canal(s)</span>
            </div>
            <div className="bg-[#F9F8F6] p-3.5 border border-stone-200">
              <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest block">Eruption</span>
              <span className="text-sm font-bold text-black">{selectedTooth.eruptionAge}</span>
            </div>
          </div>

          {/* Key Features Bullet List */}
          <div className="space-y-3 pt-1">
            <span className="text-[10px] font-black uppercase text-stone-900 tracking-[0.2em] block">Key Morphology</span>
            <ul className="space-y-2">
              {selectedTooth.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-light">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* High-Yield Clinical Pearl */}
          <div className="bg-[#F9F8F6] p-4 border-l-2 border-amber-600 text-xs text-stone-800 space-y-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-amber-900 flex items-center gap-1.5 block">
              <Info className="w-3.5 h-3.5 text-amber-600" /> High-Yield Board Pearl
            </span>
            <p className="leading-relaxed font-light mt-1">{selectedTooth.clinicalPearl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
