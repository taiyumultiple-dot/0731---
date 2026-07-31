import React, { useState } from "react";
import { PuzzleGameConfig } from "../types";
import { FileSearch, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface PuzzleLogicProps {
  config: PuzzleGameConfig;
  onSuccess: () => void;
}

export const PuzzleLogic: React.FC<PuzzleLogicProps> = ({ config, onSuccess }) => {
  const clues = config.clues || [];
  const options = config.options || [];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const handleSelectOption = (option: (typeof options)[0]) => {
    setSelectedOptionId(option.id);
    if (option.isCorrect) {
      setFeedback({
        isCorrect: true,
        text: option.explanation,
      });
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setFeedback({
        isCorrect: false,
        text: option.explanation,
      });
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Evidence Clues Box */}
      <div className="p-5 rounded-3xl border border-amber-500/30 bg-slate-900/90 space-y-3 shadow-2xl">
        <div className="flex items-center gap-2 text-base font-serif font-bold text-amber-300">
          <FileSearch className="w-4 h-4 text-amber-400" />
          <span>搜查線索與涉案人證詞分析</span>
        </div>

        <div className="space-y-2">
          {clues.map((clue, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/20 text-base font-serif text-amber-100/90 leading-relaxed"
            >
              • {clue}
            </div>
          ))}
        </div>
      </div>

      {/* Suspect Selection */}
      <div className="space-y-3">
        <h4 className="text-base font-serif font-bold text-amber-300/80">
          經過邏輯推理，你認為誰是說謊的嫌疑犯？
        </h4>

        <div className="space-y-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt)}
              className={`w-full p-4 rounded-2xl border text-left font-serif text-base sm:text-base font-bold transition-all flex items-center justify-between ${
                selectedOptionId === opt.id
                  ? opt.isCorrect
                    ? "border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-lg shadow-emerald-950/40"
                    : "border-rose-500 bg-rose-950/60 text-rose-200"
                  : "border-amber-500/20 bg-slate-900/80 text-amber-100 hover:border-amber-400 hover:bg-slate-800"
              }`}
            >
              <span>{opt.label}</span>
              {selectedOptionId === opt.id &&
                (opt.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400" />
                ))}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border text-base font-serif leading-relaxed animate-in fade-in duration-300 flex items-start gap-2.5 ${
            feedback.isCorrect
              ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-200"
              : "bg-rose-950/80 border-rose-500/50 text-rose-200"
          }`}
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold mb-1">
              {feedback.isCorrect ? "破案推理成功！" : "推理盲點提醒："}
            </strong>
            <p>{feedback.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};
