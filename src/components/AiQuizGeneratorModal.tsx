import React, { useState } from "react";
import { QuizDeck } from "../types";
import { Sparkles, Loader2, X, GraduationCap, CheckCircle, HelpCircle, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onQuizGenerated: (newDeck: QuizDeck) => void;
  initialTopic?: string;
}

export const AiQuizGeneratorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onQuizGenerated,
  initialTopic = "",
}) => {
  const [topic, setTopic] = useState<string>(initialTopic || "Tooth Morphology & Cusp Anatomy");
  const [difficulty, setDifficulty] = useState<"Basic" | "Intermediate" | "Advanced Board Prep">("Intermediate");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [questionType, setQuestionType] = useState<string>("Mixed (MCQ + Vignettes)");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const topicPresets = [
    "Tooth Morphology & Cusp Anatomy",
    "Universal #1-32 & FDI Numbering",
    "Histology of Enamel, Dentin & Pulp",
    "Endodontic Root Canal Anatomy (MB2)",
    "INBDE Board Exam Clinical Cases",
    "Primary Dentition & Eruption Age",
    "Periodontal Ligament & Bone Support",
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          difficulty,
          questionCount,
          questionType,
        }),
      });

      if (!response.ok) {
        throw new Error("Server failed to generate quiz questions");
      }

      const data = await response.json();
      if (!data.questions || data.questions.length === 0) {
        throw new Error("No questions returned from AI generator.");
      }

      const generatedDeck: QuizDeck = {
        id: `ai_deck_${Date.now()}`,
        title: `AI Quiz: ${topic}`,
        description: `Custom AI-generated ${difficulty} quiz with ${data.questions.length} high-yield questions on ${topic}.`,
        category: "AI Generated",
        difficulty,
        iconName: "Sparkles",
        questions: data.questions,
        createdBy: "gemini",
        createdAt: new Date().toISOString().split("T")[0],
        estimatedMinutes: Math.ceil(data.questions.length * 1.5),
        tags: [topic.split(" ")[0], difficulty, "AI Generated"],
      };

      onQuizGenerated(generatedDeck);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to generate AI quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="bg-white border-2 border-black w-full max-w-2xl overflow-hidden my-8"
        >
          {/* Top Header */}
          <div className="bg-[#1A1A1A] text-white p-6 border-b border-black flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-serif tracking-tight">Gemini AI Quiz Generator</h3>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-extrabold mt-0.5">Instantly generate high-yield board level questions</p>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={isLoading}
              className="text-stone-400 hover:text-white p-2 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {errorMessage && (
              <div className="bg-rose-50 border-l-2 border-rose-600 text-rose-900 p-4 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Topic Input & Presets */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-900 block">
                Quiz Subject / Anatomical Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Maxillary 1st Molar MB2 canal or Dentinoenamel Junction"
                className="w-full px-4 py-3 bg-[#F9F8F6] border border-stone-300 text-xs font-medium text-black outline-none focus:border-black"
              />

              <div className="flex flex-wrap gap-1.5 pt-2">
                {topicPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTopic(preset)}
                    className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
                      topic === preset
                        ? "bg-black text-white font-black"
                        : "bg-[#F9F8F6] hover:bg-stone-200 text-stone-700 border border-stone-200"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-900 block">
                Target Board Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { level: "Basic", desc: "Dental Hygiene / Assistant Basics" },
                  { level: "Intermediate", desc: "Dental Student Core Anatomy" },
                  { level: "Advanced Board Prep", desc: "INBDE / NBDHE Board Cases" },
                ].map((item) => {
                  const isSelected = difficulty === item.level;
                  return (
                    <button
                      key={item.level}
                      type="button"
                      onClick={() => setDifficulty(item.level as any)}
                      className={`p-3.5 border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-black text-white border-black"
                          : "bg-[#F9F8F6] border-stone-200 hover:border-black text-stone-800"
                      }`}
                    >
                      <div className="text-xs font-bold font-serif">{item.level}</div>
                      <div className={`text-[10px] mt-1 leading-tight font-light ${isSelected ? "text-stone-300" : "text-stone-500"}`}>{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Count & Format */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-900 block">
                  Question Count
                </label>
                <div className="flex items-center gap-2">
                  {[3, 5, 10, 15].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuestionCount(num)}
                      className={`flex-1 py-2 text-[10px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                        questionCount === num
                          ? "bg-black text-white border-black font-black"
                          : "bg-[#F9F8F6] text-stone-700 border-stone-300 hover:bg-stone-200"
                      }`}
                    >
                      {num} Qs
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-900 block">
                  Question Format
                </label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F9F8F6] border border-stone-300 text-xs font-medium text-black outline-none focus:border-black"
                >
                  <option value="Mixed (MCQ + Vignettes)">Mixed (MCQ + Vignettes)</option>
                  <option value="Clinical Vignettes Only">Clinical Vignettes Only</option>
                  <option value="Identification & Spotters">Identification & Spotters</option>
                  <option value="Direct Recall">Direct Recall</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="p-6 bg-[#F9F8F6] border-t border-black/10 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-stone-500">
              Model: <strong className="text-black">Gemini 2.5 Flash</strong>
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2.5 text-[10px] uppercase tracking-widest font-extrabold text-stone-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isLoading || !topic.trim()}
                className="px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-extrabold text-white bg-black hover:bg-stone-800 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Generate Quiz Deck
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
