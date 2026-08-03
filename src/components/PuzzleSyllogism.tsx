import React, { useState, useMemo } from "react";
import { PuzzleGameConfig, SyllogismStatement } from "../types";
import { Brain, Check, XCircle, Sparkles, RotateCcw } from "lucide-react";
import { soundFx } from "../utils/audio";

interface PuzzleSyllogismProps {
  config: PuzzleGameConfig;
  onSuccess: () => void;
}

const ROLE_LABEL: Record<string, string> = {
  major: "大前提",
  minor: "小前提",
  conclusion: "結論",
};

const ROLE_ORDER: SyllogismStatement["role"][] = ["major", "minor", "conclusion"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const PuzzleSyllogism: React.FC<PuzzleSyllogismProps> = ({ config, onSuccess }) => {
  const allStatements = config.syllogismStatements || [];
  const [shuffled] = useState(() => shuffle(allStatements));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [excludedFallacyIds, setExcludedFallacyIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ type: "error" | "info"; msg: string } | null>(null);
  const [solved, setSolved] = useState(false);

  const nextExpectedRole = ROLE_ORDER[selectedIds.length];

  const handleCardClick = (stmt: SyllogismStatement) => {
    if (solved) return;
    if (selectedIds.includes(stmt.id) || excludedFallacyIds.includes(stmt.id)) return;

    if (stmt.role === "fallacy") {
      soundFx.playError();
      setExcludedFallacyIds((prev) => [...prev, stmt.id]);
      setFeedback({
        type: "info",
        msg: `「${stmt.text}」是謬誤（${stmt.fallacyName}），已被你識破排除！`,
      });
      return;
    }

    if (stmt.role !== nextExpectedRole) {
      soundFx.playError();
      setFeedback({
        type: "error",
        msg: `順序還不對喔，現在需要的是「${ROLE_LABEL[nextExpectedRole]}」，再仔細想想邏輯的先後順序。`,
      });
      return;
    }

    soundFx.playHover();
    setFeedback(null);
    const newSelected = [...selectedIds, stmt.id];
    setSelectedIds(newSelected);

    if (newSelected.length === ROLE_ORDER.length) {
      soundFx.playVictory();
      setSolved(true);
      setTimeout(() => onSuccess(), 900);
    }
  };

  const handleReset = () => {
    setSelectedIds([]);
    setExcludedFallacyIds([]);
    setFeedback(null);
  };

  const selectedStatements = useMemo(
    () => selectedIds.map((id) => allStatements.find((s) => s.id === id)!),
    [selectedIds, allStatements]
  );

  return (
    <div className="space-y-5 max-w-xl mx-auto">
      {/* Intro */}
      <div className="p-4 rounded-2xl border border-purple-500/30 bg-slate-900/90 text-center space-y-2 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-serif font-bold bg-purple-950/80 text-purple-300 border border-purple-500/30">
          <Brain className="w-3.5 h-3.5 text-purple-400" />
          <span>詭辯人偶的核心密碼鎖</span>
        </div>
        <p className="text-base text-purple-200/80 leading-relaxed">
          {config.syllogismIntro ||
            "先點出詭辯人偶的謬論並排除，再依「大前提 → 小前提 → 結論」的順序點選正確的推論。"}
        </p>
      </div>

      {/* Assembled Sequence Slots */}
      <div className="grid grid-cols-3 gap-2.5">
        {ROLE_ORDER.map((role, idx) => {
          const stmt = selectedStatements[idx];
          return (
            <div
              key={role}
              className={`p-3 rounded-2xl border-2 min-h-[92px] flex flex-col gap-1 justify-center transition-all ${
                stmt
                  ? "border-purple-400 bg-purple-950/60"
                  : idx === selectedIds.length
                  ? "border-purple-500/50 bg-slate-900/60 animate-pulse"
                  : "border-slate-800 bg-slate-950/40"
              }`}
            >
              <span className="text-base font-mono font-bold text-purple-300">
                {idx + 1}. {ROLE_LABEL[role]}
              </span>
              {stmt && (
                <span className="text-base font-serif text-purple-100 leading-snug">{stmt.text}</span>
              )}
            </div>
          );
        })}
      </div>

      {feedback && (
        <p
          className={`text-center text-base font-bold ${
            feedback.type === "error" ? "text-rose-400 animate-bounce" : "text-teal-300 animate-in fade-in"
          }`}
        >
          {feedback.type === "error" ? "⚠️ " : "✅ "}
          {feedback.msg}
        </p>
      )}

      {/* Statement Cards Pool */}
      <div className="space-y-2.5">
        {shuffled.map((stmt) => {
          const isSelected = selectedIds.includes(stmt.id);
          const isExcluded = excludedFallacyIds.includes(stmt.id);
          if (isSelected) return null;
          return (
            <button
              key={stmt.id}
              onClick={() => handleCardClick(stmt)}
              disabled={isExcluded}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                isExcluded
                  ? "border-rose-900 bg-rose-950/30 opacity-50 line-through cursor-not-allowed"
                  : "border-purple-500/20 bg-slate-900/80 hover:border-purple-400 hover:bg-purple-950/40 active:scale-98"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 ${
                  isExcluded ? "bg-rose-950 text-rose-400" : "bg-purple-950 text-purple-300"
                }`}
              >
                {isExcluded ? <XCircle className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>
              <span className="text-base font-serif text-slate-100 leading-relaxed">{stmt.text}</span>
            </button>
          );
        })}
      </div>

      {(selectedIds.length > 0 || excludedFallacyIds.length > 0) && !solved && (
        <button
          onClick={handleReset}
          className="w-full py-2.5 rounded-xl font-serif text-base font-bold border border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          重新排列
        </button>
      )}

      {solved && (
        <div className="text-center p-4 rounded-2xl border border-teal-500/30 bg-teal-950/30 flex items-center justify-center gap-2 text-teal-200 font-serif font-bold animate-in zoom-in">
          <Check className="w-5 h-5" />
          邏輯鏈完成！詭辯人偶的核心正在崩解……
        </div>
      )}
    </div>
  );
};
