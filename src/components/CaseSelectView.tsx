import React from "react";
import { VolumeData, LevelData, UserProgress } from "../types";
import { CheckCircle2, Play, Lock, Zap, Coins, HelpCircle, ChevronRight } from "lucide-react";

interface CaseSelectViewProps {
  volume: VolumeData;
  userProgress: UserProgress;
  onSelectLevel: (level: LevelData) => void;
  onBack: () => void;
}

export const CaseSelectView: React.FC<CaseSelectViewProps> = ({
  volume,
  userProgress,
  onSelectLevel,
  onBack,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Volume Header */}
      <div className="p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 space-y-2 shadow-2xl">
        <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/30">
          {volume.subtitle}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-100">
          {volume.title}
        </h2>
        <p className="text-xs font-serif text-amber-200/80 leading-relaxed">
          {volume.summary}
        </p>
      </div>

      {/* Chapters & Levels Map */}
      <div className="space-y-6">
        {volume.chapters.map((chapter) => (
          <div key={chapter.id} className="space-y-3">
            <h3 className="text-sm font-serif font-bold text-amber-300 border-l-2 border-amber-500 pl-3">
              {chapter.title}：{chapter.subtitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapter.levels.map((level, idx) => {
                const isCompleted = userProgress.completedLevelIds.includes(
                  level.id
                );
                // Level 1 is always unlocked. Other levels unlock if previous level is completed
                const isUnlocked =
                  level.id === 1 ||
                  userProgress.completedLevelIds.includes(level.id - 1) ||
                  isCompleted;

                return (
                  <div
                    key={level.id}
                    onClick={() => {
                      if (isUnlocked) onSelectLevel(level);
                    }}
                    className={`p-5 rounded-2xl border transition-all ${
                      isUnlocked
                        ? "border-amber-500/30 bg-slate-900/80 hover:bg-slate-900 hover:border-amber-400 cursor-pointer shadow-lg hover:shadow-amber-500/10"
                        : "border-slate-800 bg-slate-950/60 opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-950 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold font-serif text-amber-100">
                          {level.title}
                        </h4>
                      </div>

                      {isCompleted ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-serif font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> 已破解
                        </span>
                      ) : isUnlocked ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-serif font-bold bg-amber-950 text-amber-300 border border-amber-500/30">
                          調查中
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-serif bg-slate-900 text-slate-500 flex items-center gap-1 border border-slate-800">
                          <Lock className="w-3 h-3" /> 未解鎖
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-serif text-amber-200/70 line-clamp-2 leading-relaxed mb-3">
                      {level.narrative}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-serif pt-2 border-t border-amber-500/20 text-amber-300/80">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-rose-400 font-mono">
                          <Zap className="w-3 h-3" /> -{level.staminaCost} 體力
                        </span>
                        <span className="flex items-center gap-1 text-yellow-400 font-mono">
                          <Coins className="w-3 h-3" /> +{level.coinReward}
                        </span>
                      </div>

                      {isUnlocked && (
                        <span className="text-amber-400 font-bold flex items-center gap-0.5">
                          開始搜查 <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
