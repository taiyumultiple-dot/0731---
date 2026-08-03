import React, { useState, useMemo } from "react";
import { PuzzleGameConfig } from "../types";
import { Scale, Check, RotateCcw } from "lucide-react";
import { soundFx } from "../utils/audio";

interface PuzzleBalanceProps {
  config: PuzzleGameConfig;
  onSuccess: () => void;
}

type Side = "left" | "right" | "none";

export const PuzzleBalance: React.FC<PuzzleBalanceProps> = ({ config, onSuccess }) => {
  const chips = config.balanceChips || [];
  const [assignment, setAssignment] = useState<Record<string, Side>>(
    () => Object.fromEntries(chips.map((c) => [c.id, "none" as Side]))
  );
  const [solved, setSolved] = useState(false);

  const leftSum = useMemo(
    () => chips.filter((c) => assignment[c.id] === "left").reduce((s, c) => s + c.weight, 0),
    [chips, assignment]
  );
  const rightSum = useMemo(
    () => chips.filter((c) => assignment[c.id] === "right").reduce((s, c) => s + c.weight, 0),
    [chips, assignment]
  );

  const usedCount = chips.filter((c) => assignment[c.id] !== "none").length;
  const balanced = usedCount > 0 && leftSum === rightSum && leftSum > 0;
  const tilt = Math.max(-18, Math.min(18, (rightSum - leftSum) * 3));

  const cycleSide = (id: string) => {
    if (solved) return;
    soundFx.playHover();
    setAssignment((prev) => {
      const cur = prev[id];
      const next: Side = cur === "none" ? "left" : cur === "left" ? "right" : "none";
      return { ...prev, [id]: next };
    });
  };

  const handleConfirm = () => {
    if (!balanced) {
      soundFx.playError();
      return;
    }
    soundFx.playVictory();
    setSolved(true);
    setTimeout(() => onSuccess(), 900);
  };

  const handleReset = () => {
    setAssignment(Object.fromEntries(chips.map((c) => [c.id, "none" as Side])));
  };

  return (
    <div className="space-y-5 max-w-xl mx-auto">
      {/* Intro */}
      <div className="p-4 rounded-2xl border border-amber-500/30 bg-slate-900/90 text-center space-y-2 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-serif font-bold bg-amber-950/80 text-amber-300 border border-amber-500/30">
          <Scale className="w-3.5 h-3.5 text-amber-400" />
          <span>失衡天秤獸的價值權重密碼</span>
        </div>
        <p className="text-base text-amber-200/80 leading-relaxed">
          {config.balanceIntro ||
            "點選每張考量卡片，把它放上天秤的左邊或右邊。當兩邊的權重總和相等，天秤就會恢復平衡。"}
        </p>
      </div>

      {/* Visual Scale */}
      <div className="relative h-40 flex items-end justify-center">
        <div
          className="absolute bottom-8 w-56 h-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 shadow-lg transition-transform duration-500 origin-center"
          style={{ transform: `rotate(${tilt}deg)` }}
        />
        <div className="absolute bottom-0 w-2 h-24 bg-amber-600/60 rounded-full" />
        <div className="absolute bottom-24 w-4 h-4 rounded-full bg-amber-400" />
        <div className="w-full flex items-end justify-between px-4">
          <div
            className="flex flex-col items-center gap-1 transition-transform duration-500"
            style={{ transform: `translateY(${Math.max(0, tilt * 1.2)}px)` }}
          >
            <div className="w-16 h-1 bg-amber-500/50 rounded-full" />
            <div className="w-20 h-14 rounded-b-2xl border-2 border-amber-500/40 bg-slate-900/70 flex items-center justify-center font-mono font-bold text-amber-200">
              {leftSum}
            </div>
            <span className="text-base text-slate-300">左側</span>
          </div>
          <div
            className="flex flex-col items-center gap-1 transition-transform duration-500"
            style={{ transform: `translateY(${Math.max(0, -tilt * 1.2)}px)` }}
          >
            <div className="w-16 h-1 bg-amber-500/50 rounded-full" />
            <div className="w-20 h-14 rounded-b-2xl border-2 border-amber-500/40 bg-slate-900/70 flex items-center justify-center font-mono font-bold text-amber-200">
              {rightSum}
            </div>
            <span className="text-base text-slate-300">右側</span>
          </div>
        </div>
      </div>

      {balanced && !solved && (
        <p className="text-center text-base font-bold text-teal-300 animate-in fade-in">
          ✅ 天秤已經平衡了！按下「確認平衡」讓失衡天秤獸現出原形。
        </p>
      )}

      {/* Chips */}
      <div className="space-y-2.5">
        {chips.map((chip) => {
          const side = assignment[chip.id];
          return (
            <button
              key={chip.id}
              onClick={() => cycleSide(chip.id)}
              disabled={solved}
              className={`w-full text-left p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all active:scale-98 ${
                side === "left"
                  ? "border-sky-400 bg-sky-950/50"
                  : side === "right"
                  ? "border-rose-400 bg-rose-950/50"
                  : "border-slate-700 bg-slate-900/70 hover:border-amber-400/50"
              }`}
            >
              <span className="text-base font-serif text-slate-100">{chip.label}</span>
              <span className="flex items-center gap-2 shrink-0">
                <span className="text-base font-mono px-2 py-0.5 rounded-lg bg-slate-950 text-amber-300 border border-amber-500/20">
                  權重 {chip.weight}
                </span>
                <span
                  className={`text-base font-serif font-bold px-2 py-0.5 rounded-lg ${
                    side === "left"
                      ? "bg-sky-900 text-sky-200"
                      : side === "right"
                      ? "bg-rose-900 text-rose-200"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {side === "left" ? "← 左" : side === "right" ? "右 →" : "未放置"}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {!solved && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-2.5 rounded-xl font-serif text-base font-bold border border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重新配置
          </button>
          <button
            onClick={handleConfirm}
            disabled={!balanced}
            className={`flex-1 py-2.5 rounded-xl font-serif font-bold text-base transition-all active:scale-95 ${
              balanced
                ? "text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25"
                : "bg-slate-800 text-slate-300 cursor-not-allowed"
            }`}
          >
            確認平衡
          </button>
        </div>
      )}

      {solved && (
        <div className="text-center p-4 rounded-2xl border border-teal-500/30 bg-teal-950/30 flex items-center justify-center gap-2 text-teal-200 font-serif font-bold animate-in zoom-in">
          <Check className="w-5 h-5" />
          天秤恢復平衡！失衡天秤獸的偽裝正在崩解……
        </div>
      )}
    </div>
  );
};
