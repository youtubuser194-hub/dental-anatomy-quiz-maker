import React, { useState } from "react";
import { QuizDeck } from "../types";
import { BookOpen, Sparkles, Clock, Layers, Search, Filter, Plus, Play, Award, Trash2 } from "lucide-react";

interface Props {
  decks: QuizDeck[];
  onStartQuiz: (deck: QuizDeck, mode: "practice" | "exam") => void;
  onOpenAiGenerator: () => void;
  onOpenBuilder: () => void;
  onDeleteCustomDeck?: (deckId: string) => void;
  completedResultsCount: number;
  avgScore: number;
}

export const QuizLibrary: React.FC<Props> = ({
  decks,
  onStartQuiz,
  onOpenAiGenerator,
  onOpenBuilder,
  onDeleteCustomDeck,
  completedResultsCount,
  avgScore,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const filteredDecks = decks.filter((deck) => {
    const matchesSearch =
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty =
      selectedDifficulty === "All" || deck.difficulty === selectedDifficulty;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10">
      {/* Hero Welcome Banner - Editorial Theme */}
      <div className="bg-[#1A1A1A] text-white p-8 sm:p-12 border-b-2 border-black relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <span className="text-indigo-400 text-[10px] uppercase tracking-[0.25em] font-extrabold block">
              Module Assessment & Curriculum • High-Yield Board Review
            </span>

            <h1 className="text-4xl sm:text-6xl font-serif tracking-tighter leading-[0.95] font-normal">
              Dental Anatomy <br />
              <span className="italic font-serif text-slate-300">& Board Case Studies</span>
            </h1>

            <p className="text-stone-400 text-xs sm:text-sm max-w-2xl leading-relaxed font-light">
              Interactive 2D tooth cross-sections, Universal & FDI #1-32 numbering charts, Gemini AI assessment generation, and board-style clinical vignettes.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenAiGenerator}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] uppercase tracking-[0.2em] font-black transition-all flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI Quiz Generator
              </button>

              <button
                onClick={onOpenBuilder}
                className="px-6 py-3.5 bg-white text-black hover:bg-stone-200 text-[10px] uppercase tracking-[0.2em] font-black transition-colors flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5 text-black" /> Build Custom Assessment
              </button>
            </div>
          </div>

          {/* Editorial Quick Stats Widget */}
          <div className="lg:col-span-4 bg-[#262626] p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Curriculum Progress</span>
              <Award className="w-4 h-4 text-indigo-400" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-serif italic text-4xl font-normal text-white">{completedResultsCount}</div>
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Modules Done</div>
              </div>
              <div>
                <div className="font-serif italic text-4xl font-normal text-indigo-400">{avgScore}%</div>
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Avg Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 border border-black/10 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search database (Enamel, MB2, #19)..."
            className="w-full pl-10 pr-4 py-2 bg-[#F9F8F6] border border-stone-300 text-xs font-medium text-black outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-[10px] uppercase tracking-widest font-black text-stone-600">Level:</span>
          <div className="flex items-center gap-1 bg-[#EBE9E4] p-1">
            {["All", "Basic", "Intermediate", "Advanced Board Prep"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold transition-all ${
                  selectedDifficulty === diff
                    ? "bg-black text-white"
                    : "text-stone-700 hover:text-black"
                }`}
              >
                {diff === "Advanced Board Prep" ? "Board Prep" : diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDecks.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white border border-black/10 space-y-3">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="text-lg font-serif italic text-stone-800">No Assessment Decks Found</h3>
            <p className="text-xs text-stone-500 font-light">Try adjusting your filter terms or generate a custom AI assessment.</p>
          </div>
        ) : (
          filteredDecks.map((deck) => (
            <div
              key={deck.id}
              className="bg-white border border-black/10 p-7 hover:border-black transition-all duration-200 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-indigo-600">
                    {deck.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 ${
                        deck.difficulty === "Basic"
                          ? "bg-stone-100 text-stone-800 border border-stone-200"
                          : deck.difficulty === "Intermediate"
                          ? "bg-amber-50 text-amber-900 border border-amber-200"
                          : "bg-stone-900 text-white"
                      }`}
                    >
                      {deck.difficulty}
                    </span>

                    {deck.createdBy === "user" && onDeleteCustomDeck && (
                      <button
                        onClick={() => onDeleteCustomDeck(deck.id)}
                        className="p-1 text-stone-300 hover:text-rose-600 transition-colors"
                        title="Delete Deck"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-serif text-black leading-snug group-hover:text-indigo-600 transition-colors">
                  {deck.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed font-light line-clamp-2">{deck.description}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-black/5">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-stone-500">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" /> {deck.questions.length} Items
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" /> ~{deck.estimatedMinutes} mins
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onStartQuiz(deck, "practice")}
                    className="py-3 px-3 bg-[#EBE9E4] hover:bg-stone-300 text-black font-extrabold text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-black/70" /> Practice
                  </button>

                  <button
                    onClick={() => onStartQuiz(deck, "exam")}
                    className="py-3 px-3 bg-black hover:bg-stone-800 text-white font-extrabold text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 text-indigo-400" /> Timed Exam
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
