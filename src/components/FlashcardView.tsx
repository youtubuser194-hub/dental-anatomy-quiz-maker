import React, { useState } from "react";
import { PRESET_QUIZ_DECKS } from "../data/presetQuizzes";
import { QuizQuestion } from "../types";
import { RotateCw, Check, X, Sparkles, ChevronLeft, ChevronRight, Layers, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const FlashcardView: React.FC = () => {
  const [selectedDeckId, setSelectedDeckId] = useState<string>(PRESET_QUIZ_DECKS[0].id);
  const activeDeck = PRESET_QUIZ_DECKS.find((d) => d.id === selectedDeckId) || PRESET_QUIZ_DECKS[0];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [knownCount, setKnownCount] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);

  const currentCard: QuizQuestion = activeDeck.questions[currentIndex];

  const handleNextCard = (known: boolean) => {
    if (known) setKnownCount((prev) => prev + 1);
    else setReviewCount((prev) => prev + 1);

    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < activeDeck.questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        alert(`Flashcard Deck Complete!\nMastered: ${knownCount + (known ? 1 : 0)}\nNeeds Review: ${reviewCount + (!known ? 1 : 0)}`);
        setCurrentIndex(0);
        setKnownCount(0);
        setReviewCount(0);
      }
    }, 200);
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Banner - Editorial Theme */}
      <div className="bg-[#1A1A1A] text-white p-8 border-b-2 border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-[10px] tracking-[0.25em] uppercase mb-1">
            <Layers className="w-3.5 h-3.5" /> Spaced Repetition Flashcard Suite
          </div>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tighter">Dental Anatomy Flashcards</h2>
          <p className="text-stone-400 text-xs sm:text-sm font-light mt-1">
            Flip cards to memorize tooth numbers, histology layers, root canal configurations, and clinical pearls.
          </p>
        </div>

        {/* Deck Select Dropdown */}
        <div className="bg-[#262626] p-2 border border-white/10">
          <select
            value={selectedDeckId}
            onChange={(e) => {
              setSelectedDeckId(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
              setKnownCount(0);
              setReviewCount(0);
            }}
            className="bg-transparent text-[10px] uppercase tracking-wider font-extrabold text-indigo-400 outline-none cursor-pointer pr-4"
          >
            {PRESET_QUIZ_DECKS.map((deck) => (
              <option key={deck.id} value={deck.id} className="bg-[#1A1A1A] text-white">
                {deck.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-extrabold text-stone-600 bg-white p-4 border border-black/10">
        <span>
          Item <strong className="text-black font-black">{currentIndex + 1}</strong> of {activeDeck.questions.length}
        </span>
        <div className="flex items-center gap-6">
          <span className="text-stone-900">Mastered: <strong className="text-indigo-600 font-black">{knownCount}</strong></span>
          <span className="text-stone-900">Needs Review: <strong className="text-rose-600 font-black">{reviewCount}</strong></span>
        </div>
      </div>

      {/* Flip Card Stage */}
      <div className="relative perspective-1000 min-h-[380px]">
        <motion.div
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-full bg-white border border-black/10 p-10 cursor-pointer hover:border-black transition-all flex flex-col justify-between min-h-[380px] relative overflow-hidden"
        >
          {/* Card Front */}
          <div className={`space-y-6 ${isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-indigo-600">
                {currentCard.category || "Anatomical Inquiry"}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(currentCard.question);
                }}
                className="p-1.5 text-stone-400 hover:text-black hover:bg-stone-100 transition-colors"
                title="Read aloud"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="py-6 text-center">
              <h3 className="text-2xl md:text-3xl font-serif text-black leading-snug max-w-xl mx-auto">
                {currentCard.question}
              </h3>
            </div>

            <div className="text-center text-[10px] uppercase tracking-[0.2em] font-extrabold text-stone-400 flex items-center justify-center gap-2 pt-4">
              <RotateCw className="w-3.5 h-3.5" /> Click anywhere to reveal rationale
            </div>
          </div>

          {/* Card Back (Rotated 180 deg) */}
          <div
            style={{ transform: "rotateY(180deg)" }}
            className={`absolute inset-0 p-10 bg-[#1A1A1A] text-white flex flex-col justify-between ${
              isFlipped ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-400">
                Correct Answer & Clinical Rationale
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(currentCard.options[currentCard.correctAnswerIndex]);
                }}
                className="p-1.5 text-stone-400 hover:text-white transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="text-2xl font-serif italic text-emerald-400 border-b border-white/10 pb-2">
                {currentCard.options[currentCard.correctAnswerIndex]}
              </div>

              <p className="text-xs text-stone-300 leading-relaxed font-light">{currentCard.explanation}</p>

              {currentCard.clinicalTip && (
                <p className="text-xs font-light text-amber-300 bg-[#262626] p-3 border-l-2 border-amber-500">
                  💡 {currentCard.clinicalTip}
                </p>
              )}
            </div>

            <div className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500">Click to flip back</div>
          </div>
        </motion.div>
      </div>

      {/* Rating Buttons */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <button
          onClick={() => handleNextCard(false)}
          className="px-6 py-3.5 bg-[#EBE9E4] hover:bg-stone-300 text-black font-extrabold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" /> Needs Review
        </button>

        <button
          onClick={() => handleNextCard(true)}
          className="px-8 py-3.5 bg-black hover:bg-stone-800 text-white font-extrabold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2 cursor-pointer"
        >
          <Check className="w-3.5 h-3.5 text-indigo-400" /> Got It Mastered
        </button>
      </div>
    </div>
  );
};
