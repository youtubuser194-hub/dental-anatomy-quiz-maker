import React, { useState, useEffect } from "react";
import { QuizDeck, QuizResult, ToothInfo } from "./types";
import { PRESET_QUIZ_DECKS } from "./data/presetQuizzes";
import { HeaderNavbar, TabType } from "./components/HeaderNavbar";
import { QuizLibrary } from "./components/QuizLibrary";
import { AnatomicalToothDiagram } from "./components/AnatomicalToothDiagram";
import { ToothNumberingChart } from "./components/ToothNumberingChart";
import { AiQuizGeneratorModal } from "./components/AiQuizGeneratorModal";
import { CustomQuizBuilder } from "./components/CustomQuizBuilder";
import { ActiveQuizView } from "./components/ActiveQuizView";
import { QuizResultsView } from "./components/QuizResultsView";
import { FlashcardView } from "./components/FlashcardView";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("decks");
  const [customDecks, setCustomDecks] = useState<QuizDeck[]>(() => {
    try {
      const saved = localStorage.getItem("dental_custom_quiz_decks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizResults, setQuizResults] = useState<QuizResult[]>(() => {
    try {
      const saved = localStorage.getItem("dental_quiz_results");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Quiz State
  const [activeDeck, setActiveDeck] = useState<QuizDeck | null>(null);
  const [activeMode, setActiveMode] = useState<"practice" | "exam" | null>(null);
  const [latestResult, setLatestResult] = useState<QuizResult | null>(null);

  // AI Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [initialAiTopic, setInitialAiTopic] = useState<string>("");

  useEffect(() => {
    try {
      localStorage.setItem("dental_custom_quiz_decks", JSON.stringify(customDecks));
    } catch (e) {
      console.error("Failed to save custom decks to localStorage", e);
    }
  }, [customDecks]);

  useEffect(() => {
    try {
      localStorage.setItem("dental_quiz_results", JSON.stringify(quizResults));
    } catch (e) {
      console.error("Failed to save quiz results to localStorage", e);
    }
  }, [quizResults]);

  const allDecks = [...PRESET_QUIZ_DECKS, ...customDecks];

  const handleStartQuiz = (deck: QuizDeck, mode: "practice" | "exam") => {
    setActiveDeck(deck);
    setActiveMode(mode);
    setLatestResult(null);
  };

  const handleFinishQuiz = (result: QuizResult) => {
    setQuizResults((prev) => [result, ...prev]);
    setLatestResult(result);
  };

  const handleSaveCustomDeck = (newDeck: QuizDeck) => {
    setCustomDecks((prev) => [newDeck, ...prev]);
    setActiveTab("decks");
  };

  const handleImportDeck = (deck: QuizDeck) => {
    setCustomDecks((prev) => [deck, ...prev]);
  };

  const handleDeleteCustomDeck = (deckId: string) => {
    if (confirm("Are you sure you want to delete this custom quiz deck?")) {
      setCustomDecks((prev) => prev.filter((d) => d.id !== deckId));
    }
  };

  const handleGenerateQuizForTooth = (tooth: ToothInfo) => {
    setInitialAiTopic(`Tooth #${tooth.universalNumber} (${tooth.name}) Morphology & Clinical Pearls`);
    setIsAiModalOpen(true);
  };

  const handleStartQuizOnStructure = (structureName: string) => {
    setInitialAiTopic(`${structureName} Histology & Anatomical Features`);
    setIsAiModalOpen(true);
  };

  const avgScore = quizResults.length
    ? Math.round(quizResults.reduce((acc, r) => acc + r.scorePercentage, 0) / quizResults.length)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Header */}
      <HeaderNavbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setActiveDeck(null);
          setLatestResult(null);
        }}
        onOpenAiGenerator={() => {
          setInitialAiTopic("");
          setIsAiModalOpen(true);
        }}
        customDecksCount={customDecks.length}
      />

      {/* Main Content Area */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Render Active Running Quiz */}
        {activeDeck && activeMode && !latestResult && (
          <ActiveQuizView
            deck={activeDeck}
            mode={activeMode}
            onFinishQuiz={handleFinishQuiz}
            onExit={() => {
              setActiveDeck(null);
              setActiveMode(null);
            }}
          />
        )}

        {/* Render Quiz Result View */}
        {latestResult && activeDeck && (
          <QuizResultsView
            result={latestResult}
            deck={activeDeck}
            onRetryQuiz={() => setLatestResult(null)}
            onReturnToLibrary={() => {
              setActiveDeck(null);
              setActiveMode(null);
              setLatestResult(null);
              setActiveTab("decks");
            }}
          />
        )}

        {/* Main Tab Views when not taking quiz */}
        {!activeDeck && !latestResult && (
          <>
            {activeTab === "decks" && (
              <QuizLibrary
                decks={allDecks}
                onStartQuiz={handleStartQuiz}
                onOpenAiGenerator={() => {
                  setInitialAiTopic("");
                  setIsAiModalOpen(true);
                }}
                onOpenBuilder={() => setActiveTab("builder")}
                onDeleteCustomDeck={handleDeleteCustomDeck}
                completedResultsCount={quizResults.length}
                avgScore={avgScore}
              />
            )}

            {activeTab === "diagram" && (
              <AnatomicalToothDiagram onStartQuizOnStructure={handleStartQuizOnStructure} />
            )}

            {activeTab === "arch" && (
              <ToothNumberingChart onGenerateQuizForTooth={handleGenerateQuizForTooth} />
            )}

            {activeTab === "flashcards" && <FlashcardView />}

            {activeTab === "builder" && (
              <CustomQuizBuilder onSaveCustomDeck={handleSaveCustomDeck} onImportDeck={handleImportDeck} />
            )}
          </>
        )}
      </main>

      {/* AI Quiz Generator Modal */}
      <AiQuizGeneratorModal
        isOpen={isAiModalOpen}
        initialTopic={initialAiTopic}
        onClose={() => setIsAiModalOpen(false)}
        onQuizGenerated={(generatedDeck) => {
          setCustomDecks((prev) => [generatedDeck, ...prev]);
          handleStartQuiz(generatedDeck, "practice");
        }}
      />
    </div>
  );
}
