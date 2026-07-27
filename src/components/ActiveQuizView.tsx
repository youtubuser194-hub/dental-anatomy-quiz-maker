import React, { useState, useEffect } from "react";
import { QuizDeck, QuizQuestion, QuestionUserAnswer, QuizResult } from "../types";
import { Sparkles, Clock, Flag, CheckCircle2, XCircle, ArrowRight, ArrowLeft, Loader2, Award, AlertCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  deck: QuizDeck;
  mode: "practice" | "exam";
  onFinishQuiz: (result: QuizResult) => void;
  onExit: () => void;
}

export const ActiveQuizView: React.FC<Props> = ({ deck, mode, onFinishQuiz, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(mode === "practice");
  const [aiTutorExplanation, setAiTutorExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Timer
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentQuestion: QuizQuestion = deck.questions[currentIndex];
  const selectedOptionIndex = userAnswers[currentQuestion.id];
  const isAnswered = selectedOptionIndex !== undefined;
  const isCorrect = isAnswered && selectedOptionIndex === currentQuestion.correctAnswerIndex;

  const handleSelectOption = (optionIdx: number) => {
    if (mode === "practice" && isAnswered) return; // Frozen in practice mode after answering

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIdx,
    }));
    setAiTutorExplanation(null);
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleAskAiTutor = async () => {
    if (!isAnswered) return;

    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question,
          userAnswer: currentQuestion.options[selectedOptionIndex],
          correctAnswer: currentQuestion.options[currentQuestion.correctAnswerIndex],
          topic: currentQuestion.category || deck.title,
          anatomicalFocus: currentQuestion.anatomicalFocus,
        }),
      });

      const data = await res.json();
      setAiTutorExplanation(data.explanation || "No AI explanation available.");
    } catch (err) {
      console.error(err);
      setAiTutorExplanation("Could not reach AI Tutor. Please check your connection.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmitQuiz = () => {
    const answersArray: QuestionUserAnswer[] = deck.questions.map((q) => {
      const selected = userAnswers[q.id];
      const correct = selected !== undefined && selected === q.correctAnswerIndex;
      return {
        questionId: q.id,
        selectedOptionIndex: selected !== undefined ? selected : -1,
        isCorrect: correct,
        isFlagged: !!flaggedQuestions[q.id],
      };
    });

    const correctCount = answersArray.filter((a) => a.isCorrect).length;
    const scorePct = Math.round((correctCount / deck.questions.length) * 100);

    const result: QuizResult = {
      id: `res_${Date.now()}`,
      deckId: deck.id,
      deckTitle: deck.title,
      scorePercentage: scorePct,
      correctCount,
      totalQuestions: deck.questions.length,
      timeTakenSeconds: secondsElapsed,
      date: new Date().toISOString().split("T")[0],
      answers: answersArray,
      mode,
    };

    onFinishQuiz(result);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Controls Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs tracking-wider uppercase">
            <Award className="w-4 h-4" /> {deck.title}
          </div>
          <h2 className="text-xl font-bold tracking-tight mt-0.5">{deck.category}</h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" /> Time: {formatTime(secondsElapsed)}
          </div>

          <div className="bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700">
            Mode: <span className="text-cyan-400 uppercase font-bold">{mode}</span>
          </div>

          <button
            onClick={onExit}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Exit Quiz
          </button>
        </div>
      </div>

      {/* Progress Bar & Question Navigator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>
            Question <strong className="text-slate-900">{currentIndex + 1}</strong> of {deck.questions.length}
          </span>
          <span>{Math.round(((currentIndex + 1) / deck.questions.length) * 100)}% Complete</span>
        </div>

        {/* Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / deck.questions.length) * 100}%` }}
          />
        </div>

        {/* Quick Question Matrix Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {deck.questions.map((q, idx) => {
            const isAns = userAnswers[q.id] !== undefined;
            const isCurr = idx === currentIndex;
            const isFlag = flaggedQuestions[q.id];

            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setAiTutorExplanation(null);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all relative ${
                  isCurr
                    ? "ring-2 ring-cyan-500 scale-110 z-10 bg-slate-900 text-white"
                    : isAns
                    ? "bg-cyan-100 text-cyan-900 border border-cyan-300"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {idx + 1}
                {isFlag && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            {currentQuestion.anatomicalFocus && (
              <span className="inline-block bg-cyan-50 border border-cyan-200 text-cyan-800 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
                {currentQuestion.anatomicalFocus}
              </span>
            )}
            <h3 className="text-xl font-extrabold text-slate-900 leading-snug">{currentQuestion.question}</h3>
          </div>

          <button
            onClick={toggleFlag}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
              flaggedQuestions[currentQuestion.id]
                ? "bg-amber-50 border-amber-300 text-amber-800"
                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
            }`}
          >
            <Flag className={`w-4 h-4 ${flaggedQuestions[currentQuestion.id] ? "fill-amber-500 text-amber-500" : ""}`} />
            {flaggedQuestions[currentQuestion.id] ? "Flagged" : "Flag"}
          </button>
        </div>

        {/* Option Cards */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, oIdx) => {
            const isThisSelected = selectedOptionIndex === oIdx;
            const isThisCorrect = currentQuestion.correctAnswerIndex === oIdx;

            let cardStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100";

            if (mode === "practice" && isAnswered) {
              if (isThisCorrect) {
                cardStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300 font-bold";
              } else if (isThisSelected && !isThisCorrect) {
                cardStyle = "bg-rose-50 border-rose-400 text-rose-900 font-bold";
              } else {
                cardStyle = "bg-slate-50 border-slate-200 opacity-60 text-slate-500";
              }
            } else if (isThisSelected) {
              cardStyle = "bg-cyan-50 border-cyan-500 text-cyan-950 font-bold ring-2 ring-cyan-300";
            }

            return (
              <button
                key={oIdx}
                onClick={() => handleSelectOption(oIdx)}
                className={`w-full p-4 rounded-xl border text-left text-sm transition-all duration-150 flex items-center justify-between ${cardStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isThisSelected ? "bg-cyan-600 text-white" : "bg-white border border-slate-300 text-slate-700"
                    }`}
                  >
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span>{option}</span>
                </div>

                {mode === "practice" && isAnswered && (
                  <div>
                    {isThisCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    {isThisSelected && !isThisCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Practice Mode Instant Rationale & AI Tutor Trigger */}
        {mode === "practice" && isAnswered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-4">
            {/* Standard Rationale Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-cyan-600" /> Anatomical Explanation & Rationale
                </span>

                <button
                  onClick={handleAskAiTutor}
                  disabled={isAiLoading}
                  className="text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isAiLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Ask AI Tutor Deep Dive
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">{currentQuestion.explanation}</p>

              {currentQuestion.clinicalTip && (
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs font-semibold text-amber-900 mt-2">
                  💡 Board Tip: {currentQuestion.clinicalTip}
                </div>
              )}
            </div>

            {/* AI Tutor Custom Response Box */}
            {aiTutorExplanation && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-cyan-50/80 p-5 rounded-2xl border border-cyan-200 space-y-2 text-xs text-cyan-950">
                <div className="font-bold text-cyan-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-600" /> AI Dental Tutor Deep Analysis
                </div>
                <div className="whitespace-pre-line leading-relaxed">{aiTutorExplanation}</div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
              setAiTutorExplanation(null);
            }
          }}
          disabled={currentIndex === 0}
          className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>

        {currentIndex < deck.questions.length - 1 ? (
          <button
            onClick={() => {
              setCurrentIndex(currentIndex + 1);
              setAiTutorExplanation(null);
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
          >
            Next Question <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmitQuiz}
            className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-lg transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Submit Quiz & See Results
          </button>
        )}
      </div>
    </div>
  );
};
