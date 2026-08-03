import React from "react";
import { ChevronLeft, Heart, Sparkles, Bot, Award, Volume2, VolumeX } from "lucide-react";

interface HeaderNavProps {
  onBackToOffice?: () => void;
  stamina: number;
  maxStamina: number;
  coins: number;
  onOpenQuests: () => void;
  onOpenAICaseGenerator: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  title?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onBackToOffice,
  stamina,
  maxStamina,
  coins,
  onOpenQuests,
  onOpenAICaseGenerator,
  soundEnabled,
  onToggleSound,
  title = "五門事務所",
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 border-b border-indigo-500/20 bg-slate-950/85 backdrop-blur-xl shadow-lg text-slate-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Title & Navigation */}
        <div className="flex items-center gap-2">
          {onBackToOffice && (
            <button
              onClick={onBackToOffice}
              className="px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-200 text-base font-serif font-bold transition-all flex items-center gap-1 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">回到探索所</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-400 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center font-serif font-bold text-slate-950 text-base">
              ✦
            </div>
            <h1 className="text-base sm:text-lg font-bold font-serif tracking-wider bg-gradient-to-r from-amber-100 via-purple-100 to-indigo-200 bg-clip-text text-transparent animate-glitch-flicker">
              {title}
            </h1>
          </div>
        </div>

        {/* Right: Resources (Matching Screenshot: 心力 & 星點) */}
        <div className="flex items-center gap-2">
          {/* AI Multiverse Generator Button */}
          <button
            onClick={onOpenAICaseGenerator}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-base font-bold font-serif bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-700 hover:to-indigo-700 text-purple-100 border border-purple-400/30 shadow-md shadow-purple-900/40 transition-all hover:scale-105"
            title="Gemini AI 動態生成平行宇宙篇章"
          >
            <Bot className="w-3.5 h-3.5 text-purple-300" />
            <span>AI 無限多重宇宙</span>
          </button>

          {/* Quests Button */}
          <button
            onClick={onOpenQuests}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-base font-bold font-serif bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 transition-all"
            title="每日探索考核"
          >
            <Award className="w-4 h-4 text-purple-400" />
            <span className="hidden md:inline">每日考核</span>
          </button>

          {/* 心力 (Stamina / Heart) */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-200 text-base font-mono font-bold shadow-inner"
            title="目前心力（每次探索消耗 10-20 心力）"
          >
            <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400 animate-pulse" />
            <span className="text-purple-100">心力</span>
            <span className="text-purple-300 font-extrabold">{stamina}</span>
          </div>

          {/* 星點 (Coins / Star Points) */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-200 text-base font-mono font-bold shadow-inner"
            title="探索星點"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span className="text-indigo-100">星點</span>
            <span className="text-amber-300 font-extrabold">{coins}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
            title={soundEnabled ? "靜音" : "開啟背景氛圍音"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
