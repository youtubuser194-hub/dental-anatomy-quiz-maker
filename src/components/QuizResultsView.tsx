import React, { useState } from "react";
import { QuizResult, QuizDeck } from "../types";
import { Award, RotateCcw, Home, CheckCircle2, XCircle, Flag, Sparkles, ChevronDown, ChevronUp, Layers, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  result: QuizResult;
  deck: QuizDeck;
  onRetryQuiz: () => void;
  onReturnToLibrary: () => void;
}

export const QuizResultsView: React.FC<Props> = ({ result, deck, onRetryQuiz, onReturnToLibrary }) => {
  const [filter, setFilter] = useState<"all" | "incorrect" | "flagged">("all");
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  const toggleExpand = (qId: string) => {
    setExpandedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const getGradeBadge = (pct: number) => {
    if (pct >= 90) return { label: "A - Master", color: "bg-emerald-500 text-white", message: "Outstanding! You have mastered this dental anatomy topic." };
    if (pct >= 80) return { label: "B - Advanced", color: "bg-teal-500 text-white", message: "Great performance! High chance of board exam success." };
    if (pct >= 70) return { label: "C - Competent", color: "bg-amber-500 text-white", message: "Pass mark achieved. Review missed questions to solidify concepts." };
    return { label: "Needs Review", color: "bg-rose-500 text-white", message: "Below board threshold. Use Flashcards and Interactive Diagrams to review." };
  };

  const grade = getGradeBadge(result.scorePercentage);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const filteredAnswers = result.answers.filter((ans) => {
    if (filter === "incorrect") return !ans.isCorrect;
    if (filter === "flagged") return ans.isFlagged;
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12">
      {/* Score Summary Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Quiz Completed</span>
            <h2 className="text-3xl font-black tracking-tight">{result.deckTitle}</h2>
            <p className="text-xs text-slate-400">Mode: {result.mode.toUpperCase()} • Time taken: {formatTime(result.timeTakenSeconds)}</p>
          </div>

          <div className="flex items-center gap-6 bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
            <div className="text-center">
              <div className="text-4xl font-black text-cyan-400">{result.scorePercentage}%</div>
              <div className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">Final Score</div>
            </div>

            <div className="h-10 border-r border-slate-700" />

            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {result.correctCount} / {result.totalQuestions}
              </div>
              <div className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">Correct Answers</div>
            </div>
          </div>
        </div>

        {/* Grade Banner */}
        <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 text-xs">
          <span className={`px-3 py-1 rounded-lg font-bold text-xs uppercase ${grade.color}`}>{grade.label}</span>
          <p className="text-slate-300 font-medium">{grade.message}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onReturnToLibrary}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-cyan-400" /> Return to Library
          </button>

          <button
            onClick={onRetryQuiz}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Retry Quiz
          </button>
        </div>
      </div>

      {/* Itemized Question Breakdown & Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Question Item Review</h3>
            <p className="text-xs text-slate-400">Examine rationales and verify missed questions</p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(["all", "incorrect", "flagged"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  filter === f ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredAnswers.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs font-medium">
              No questions matched the selected filter "{filter}".
            </div>
          ) : (
            filteredAnswers.map((ans, idx) => {
              const q = deck.questions.find((question) => question.id === ans.questionId);
              if (!q) return null;

              const isExpanded = !!expandedQuestions[q.id];

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border p-5 transition-all space-y-3 ${
                    ans.isCorrect ? "bg-emerald-50/30 border-emerald-200" : "bg-rose-50/30 border-rose-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      {ans.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-500">Question {idx + 1}</span>
                          {ans.isFlagged && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">Flagged</span>}
                          {q.category && <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">{q.category}</span>}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">{q.question}</h4>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Answers summary line */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium pt-1">
                    <div className={`p-2.5 rounded-xl border ${ans.isCorrect ? "bg-emerald-100/60 border-emerald-300 text-emerald-950 font-bold" : "bg-rose-100/60 border-rose-300 text-rose-950"}`}>
                      Your Answer: {ans.selectedOptionIndex >= 0 ? q.options[ans.selectedOptionIndex] : "Unanswered"}
                    </div>
                    {!ans.isCorrect && (
                      <div className="p-2.5 rounded-xl bg-emerald-100/60 border border-emerald-300 text-emerald-950 font-bold">
                        Correct Answer: {q.options[q.correctAnswerIndex]}
                      </div>
                    )}
                  </div>

                  {/* Expandable Explanation */}
                  {(isExpanded || !ans.isCorrect) && (
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed mt-2 space-y-1">
                      <span className="font-bold text-slate-900 block mb-1">Explanation:</span>
                      <p>{q.explanation}</p>
                      {q.clinicalTip && <p className="text-amber-800 font-semibold pt-1">💡 Board Tip: {q.clinicalTip}</p>}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
