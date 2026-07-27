import React, { useState } from "react";
import { QuizDeck, QuizQuestion } from "../types";
import { Plus, Trash2, Edit3, Save, Download, Upload, CheckCircle, FileText, X } from "lucide-react";

interface Props {
  onSaveCustomDeck: (deck: QuizDeck) => void;
  onImportDeck: (deck: QuizDeck) => void;
}

export const CustomQuizBuilder: React.FC<Props> = ({ onSaveCustomDeck, onImportDeck }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("Custom Quiz");
  const [difficulty, setDifficulty] = useState<"Basic" | "Intermediate" | "Advanced Board Prep">("Intermediate");

  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: "custom_q1",
      question: "Which cell forms enamel during dental embryogenesis?",
      options: ["Ameloblasts", "Odontoblasts", "Cementoblasts", "Osteoblasts"],
      correctAnswerIndex: 0,
      explanation: "Ameloblasts are ectodermal cells responsible for enamel matrix secretion and mineralization.",
      category: "Embryology",
      anatomicalFocus: "Ameloblasts",
    },
  ]);

  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  // Active Draft Question Form
  const [draftQ, setDraftQ] = useState<QuizQuestion>({
    id: `q_${Date.now()}`,
    question: "",
    options: ["", "", "", ""],
    correctAnswerIndex: 0,
    explanation: "",
    category: "General Morphology",
    anatomicalFocus: "",
    clinicalTip: "",
  });

  const handleAddOrUpdateQuestion = () => {
    if (!draftQ.question.trim() || draftQ.options.some((opt) => !opt.trim())) {
      alert("Please fill out the question text and all 4 choices.");
      return;
    }

    if (editingQuestionIndex !== null) {
      const updated = [...questions];
      updated[editingQuestionIndex] = draftQ;
      setQuestions(updated);
      setEditingQuestionIndex(null);
    } else {
      setQuestions([...questions, { ...draftQ, id: `q_${Date.now()}` }]);
    }

    // Reset draft
    setDraftQ({
      id: `q_${Date.now()}`,
      question: "",
      options: ["", "", "", ""],
      correctAnswerIndex: 0,
      explanation: "",
      category: "General Morphology",
      anatomicalFocus: "",
      clinicalTip: "",
    });
  };

  const handleEditQuestion = (index: number) => {
    setEditingQuestionIndex(index);
    setDraftQ({ ...questions[index] });
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
    if (editingQuestionIndex === index) {
      setEditingQuestionIndex(null);
    }
  };

  const handleSaveDeck = () => {
    if (!title.trim()) {
      alert("Please give your quiz deck a title!");
      return;
    }

    if (questions.length === 0) {
      alert("Please add at least 1 question to your deck.");
      return;
    }

    const newDeck: QuizDeck = {
      id: `custom_deck_${Date.now()}`,
      title,
      description: description || `User created quiz with ${questions.length} questions.`,
      category: category || "Custom Quiz",
      difficulty,
      iconName: "FileText",
      questions,
      createdBy: "user",
      createdAt: new Date().toISOString().split("T")[0],
      estimatedMinutes: Math.ceil(questions.length * 1.5),
      tags: ["Custom", difficulty],
    };

    onSaveCustomDeck(newDeck);
    alert("Quiz Deck saved successfully!");
    // Reset form
    setTitle("");
    setDescription("");
  };

  const handleExportJSON = () => {
    const deckData: QuizDeck = {
      id: `custom_deck_${Date.now()}`,
      title: title || "Dental Anatomy Quiz",
      description: description || "Exported dental anatomy quiz deck",
      category,
      difficulty,
      questions,
      createdBy: "user",
      createdAt: new Date().toISOString().split("T")[0],
      estimatedMinutes: Math.ceil(questions.length * 1.5),
      tags: ["Exported"],
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(deckData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${(title || "dental_quiz").toLowerCase().replace(/\s+/g, "_")}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedDeck = JSON.parse(event.target?.result as string);
        if (importedDeck && importedDeck.title && Array.isArray(importedDeck.questions)) {
          onImportDeck(importedDeck);
          alert(`Successfully imported quiz deck: "${importedDeck.title}"!`);
        } else {
          alert("Invalid JSON format for quiz deck.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Editorial Header Banner */}
      <div className="bg-[#1A1A1A] text-white p-8 border-b-2 border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-[10px] tracking-[0.25em] uppercase mb-1">
            <Edit3 className="w-3.5 h-3.5" /> Quiz Authoring & Curriculum Studio
          </div>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tighter">Manual Assessment Builder</h2>
          <p className="text-stone-400 text-xs sm:text-sm font-light mt-1">
            Construct custom assessment decks, attach detailed anatomical rationales, and export or import JSON decks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="px-5 py-3 bg-[#262626] hover:bg-stone-800 text-white border border-white/10 font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-2">
            <Upload className="w-3.5 h-3.5 text-indigo-400" /> Import JSON
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={handleExportJSON}
            className="px-5 py-3 bg-[#262626] hover:bg-stone-800 text-white border border-white/10 font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" /> Export JSON
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Deck Metadata & Question Composer */}
        <div className="lg:col-span-7 bg-white border border-black/10 p-8 space-y-6">
          <h3 className="text-xl font-serif text-black border-b border-black/10 pb-3">1. Assessment Specification</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest block">Quiz Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Endodontic Canal Prep Final Exam"
                className="w-full px-4 py-2.5 bg-[#F9F8F6] border border-stone-300 text-xs font-medium text-black outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest block">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Tooth Morphology"
                className="w-full px-4 py-2.5 bg-[#F9F8F6] border border-stone-300 text-xs font-medium text-black outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short summary of what this quiz covers..."
              rows={2}
              className="w-full px-4 py-2.5 bg-[#F9F8F6] border border-stone-300 text-xs font-medium text-black outline-none focus:border-black"
            />
          </div>

          <h3 className="text-xl font-serif text-black border-b border-black/10 pb-3 pt-4">
            2. {editingQuestionIndex !== null ? "Edit Item" : "Compose New Item"}
          </h3>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest block">Question Statement</label>
              <textarea
                value={draftQ.question}
                onChange={(e) => setDraftQ({ ...draftQ, question: e.target.value })}
                placeholder="e.g. Which cusp on the maxillary 1st molar is considered non-functional?"
                rows={2}
                className="w-full px-4 py-2.5 bg-[#F9F8F6] border border-stone-300 text-xs font-medium text-black outline-none focus:border-black"
              />
            </div>

            {/* 4 Options Grid */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest block">
                Answer Choices (Select radio button for correct answer)
              </label>

              {draftQ.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="correct_choice"
                    checked={draftQ.correctAnswerIndex === idx}
                    onChange={() => setDraftQ({ ...draftQ, correctAnswerIndex: idx })}
                    className="w-4 h-4 text-black cursor-pointer"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updatedOpts = [...draftQ.options];
                      updatedOpts[idx] = e.target.value;
                      setDraftQ({ ...draftQ, options: updatedOpts });
                    }}
                    placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                    className={`flex-1 px-4 py-2 text-xs outline-none ${
                      draftQ.correctAnswerIndex === idx
                        ? "border-2 border-black bg-white font-bold text-black"
                        : "bg-[#F9F8F6] border border-stone-300 text-black focus:border-black"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-stone-900 uppercase tracking-widest block">Explanation & Rationale</label>
              <textarea
                value={draftQ.explanation}
                onChange={(e) => setDraftQ({ ...draftQ, explanation: e.target.value })}
                placeholder="Explain why the correct answer is right..."
                rows={2}
                className="w-full px-4 py-2.5 bg-[#F9F8F6] border border-stone-300 text-xs font-medium text-black outline-none focus:border-black"
              />
            </div>

            <button
              onClick={handleAddOrUpdateQuestion}
              className="w-full py-3.5 bg-black hover:bg-stone-800 text-white font-extrabold text-[10px] uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {editingQuestionIndex !== null ? (
                <>
                  <Save className="w-3.5 h-3.5 text-indigo-400" /> Save Updated Item
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-indigo-400" /> Add Item To List
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Added Questions List & Final Save */}
        <div className="lg:col-span-5 bg-white border border-black/10 p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-black/10">
            <div>
              <h3 className="text-2xl font-serif text-black">Questions ({questions.length})</h3>
              <p className="text-[10px] uppercase tracking-wider text-stone-500 font-bold mt-0.5">Drafted assessment items</p>
            </div>

            <button
              onClick={handleSaveDeck}
              disabled={questions.length === 0}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" /> Save Deck
            </button>
          </div>

          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
            {questions.length === 0 ? (
              <div className="text-center py-12 text-stone-400 text-xs font-light">
                No items added yet. Use the composer on the left to add questions.
              </div>
            ) : (
              questions.map((q, idx) => (
                <div key={q.id || idx} className="p-4 border border-stone-200 bg-[#F9F8F6] space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-stone-200 pb-2">
                    <span className="text-xs font-serif text-black leading-snug">
                      Q{idx + 1}. {q.question}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleEditQuestion(idx)}
                        className="p-1 text-stone-400 hover:text-black transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(idx)}
                        className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`text-[10px] px-2.5 py-1 font-medium ${
                          q.correctAnswerIndex === oIdx
                            ? "bg-black text-white font-bold"
                            : "text-stone-700"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
