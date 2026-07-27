import React from "react";
import { Sparkles, Layers, BookOpen, Hash, Edit3, Award, PlusCircle } from "lucide-react";

export type TabType = "decks" | "diagram" | "arch" | "flashcards" | "builder";

interface Props {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenAiGenerator: () => void;
  customDecksCount: number;
}

export const HeaderNavbar: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  onOpenAiGenerator,
  customDecksCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-black/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & App Name */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onSelectTab("decks")}>
            <div className="w-10 h-10 rounded-none bg-black flex items-center justify-center text-white font-serif text-xl font-bold">
              <span>D</span>
            </div>

            <div>
              <h1 className="font-serif italic text-2xl tracking-tighter uppercase font-black text-black leading-none">
                Dento<span className="not-italic text-indigo-600">Quest</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mt-1">
                Dental Anatomy & INBDE Board Suite
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-semibold text-black/50">
            {[
              { id: "decks", label: "Quiz Library", icon: BookOpen },
              { id: "diagram", label: "Tooth Anatomy", icon: Layers },
              { id: "arch", label: "Dental Arch #1-32", icon: Hash },
              { id: "flashcards", label: "Flashcards", icon: Award },
              { id: "builder", label: `Quiz Builder ${customDecksCount ? `(${customDecksCount})` : ""}`, icon: Edit3 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id as TabType)}
                  className={`py-2 transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "text-black font-extrabold border-b-2 border-black"
                      : "hover:text-black"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-600" : "text-black/40"}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* AI Generator Trigger CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAiGenerator}
              className="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] uppercase tracking-[0.2em] font-black transition-all flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Generator
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 gap-2 border-t border-black/5 no-scrollbar">
          {[
            { id: "decks", label: "Library" },
            { id: "diagram", label: "Tooth Anatomy" },
            { id: "arch", label: "Arch #1-32" },
            { id: "flashcards", label: "Flashcards" },
            { id: "builder", label: "Builder" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id as TabType)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap ${
                activeTab === tab.id ? "bg-black text-white" : "bg-[#EBE9E4] text-black/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
