import React from "react";
import { Sparkles, ChevronRight, Compass } from "lucide-react";
import { CHARACTER_IMAGES } from "../data/characterAssets";

interface StoryTeaserViewProps {
  onStartExploration: () => void;
  onContinueJourney: () => void;
}

export const StoryTeaserView: React.FC<StoryTeaserViewProps> = ({
  onStartExploration,
  onContinueJourney,
}) => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-between py-6 px-4 text-center max-w-xl mx-auto space-y-6">
      {/* Multiverse Memory Shards Artwork Container */}
      <div className="relative w-full h-[380px] sm:h-[420px] rounded-3xl overflow-hidden border-2 border-indigo-500/30 shadow-2xl bg-slate-950 group">
        {/* Floating Multiverse Anime Art */}
        <img
          src={CHARACTER_IMAGES.WENWEN_FULL}
          alt="多重宇宙的抉擇 前導預告"
          className="w-full h-full object-cover object-center filter contrast-125 saturate-110 opacity-80 group-hover:scale-105 transition-transform duration-700"
        />

        {/* Ambient Dark Purple Vignette & Memory Shards */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-purple-950/30" />
        
        {/* Cosmic Particles / Glitch Overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-purple-300/80 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/30">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            MULTIVERSE MEMORY SHARDS
          </span>
          <span>PARALLEL TIMELINE // #00</span>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-end p-6 space-y-2">
          <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-400/50 flex items-center justify-center text-amber-200 shadow-lg backdrop-blur-md">
            ✦
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif bg-gradient-to-r from-amber-100 via-purple-100 to-indigo-200 bg-clip-text text-transparent drop-shadow-lg tracking-wider">
            多重宇宙的抉擇
          </h2>
          <div className="text-xs font-serif font-bold text-purple-300/90 tracking-widest uppercase">
            ✦ 第0篇 ｜ 前導預告 ✦
          </div>
        </div>
      </div>

      {/* Floating Card Controls (Matching Screenshot 4) */}
      <div className="w-full p-6 rounded-3xl border border-indigo-500/30 bg-slate-900/90 shadow-2xl backdrop-blur-xl space-y-4 text-center">
        <p className="text-xs sm:text-sm font-serif text-slate-300/90 leading-relaxed font-medium">
          在迷惘與輪迴之間，做出改變人生第一個選擇。
        </p>

        <div className="space-y-2.5 pt-1">
          {/* Primary Button */}
          <button
            onClick={onStartExploration}
            className="w-full py-3.5 px-6 rounded-2xl font-serif font-bold text-xs sm:text-sm text-amber-100 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 hover:from-indigo-800 hover:to-purple-800 border border-indigo-400/40 shadow-xl shadow-indigo-950/60 transition-all flex items-center justify-center gap-2 group active:scale-98"
          >
            <span>開始探索</span>
            <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary Button */}
          <button
            onClick={onContinueJourney}
            className="w-full py-3 px-6 rounded-2xl font-serif font-bold text-xs text-indigo-200 bg-slate-950/80 hover:bg-slate-900 border border-indigo-500/30 transition-all flex items-center justify-center gap-1"
          >
            <span>繼續旅程</span>
            <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
          </button>
        </div>

        <div className="pt-2 text-[11px] font-serif text-amber-300/80 flex items-center justify-center gap-1">
          <span>✦ 你的選擇，將決定你看見的未來。✦</span>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="text-[10px] font-serif text-slate-500">
        © 2025 人生探索所 · 多重宇宙互動劇情遊戲
      </div>
    </div>
  );
};
