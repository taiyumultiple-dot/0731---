import React from "react";
import { Award, Coins, Zap, ChevronRight, CheckCircle, Sparkles } from "lucide-react";
import { LevelData } from "../types";

interface VictoryModalProps {
  level: LevelData;
  onNextLevel: () => void;
  onBackToHub: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  level,
  onNextLevel,
  onBackToHub,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-3xl border border-amber-500/40 bg-slate-900 shadow-2xl p-6 sm:p-8 text-center space-y-5 overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        {/* Case Closed Stamp Badge */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-xl shadow-amber-500/30 flex items-center justify-center animate-bounce">
          <Award className="w-8 h-8 text-slate-950" />
        </div>

        <div>
          <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/30 mb-2">
            CASE CLOSED · 破案成功
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-100">
            {level.title}
          </h2>
          <p className="mt-1 text-xs text-amber-200/80 font-serif">
            案件委託人：{level.clientName}
          </p>
        </div>

        {/* Story Ending Hook */}
        <div className="p-4 rounded-2xl border border-amber-500/20 bg-slate-950/80 text-xs font-serif text-amber-100/90 leading-relaxed text-left space-y-1">
          <span className="text-[10px] text-amber-400 font-bold block mb-1">
            🔍 案情後續發展：
          </span>
          <p>{level.endingHook}</p>
        </div>

        {/* Unlocked Clue Item */}
        {level.unlockedClueItem && (
          <div className="p-3 rounded-xl border border-purple-500/30 bg-purple-950/40 text-xs font-serif text-purple-200 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>獲得證物：<b>{level.unlockedClueItem}</b></span>
          </div>
        )}

        {/* Rewards Section */}
        <div className="flex items-center justify-center gap-4 py-2 border-y border-amber-500/20">
          <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-yellow-400">
            <Coins className="w-4 h-4 fill-yellow-400" />
            <span>+{level.coinReward} 金幣</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-rose-400">
            <Zap className="w-4 h-4 fill-rose-400" />
            <span>偵探經驗提升</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onBackToHub}
            className="py-3 rounded-2xl font-serif font-bold text-xs border border-amber-500/30 bg-amber-950/40 text-amber-200 hover:bg-amber-900/60 transition-all"
          >
            回到事務所
          </button>
          <button
            onClick={onNextLevel}
            className="py-3 rounded-2xl font-serif font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1"
          >
            <span>繼續下一關</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
