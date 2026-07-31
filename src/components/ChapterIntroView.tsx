import React from "react";
import { ChevronLeft, Heart, Sparkles, BookOpen, MapPin, Target, Volume2 } from "lucide-react";
import { soundFx } from "../utils/audio";
import { CHARACTER_IMAGES } from "../data/characterAssets";
import { IMG_CHAPTERINTRO } from "../data/gameBanners";

interface ChapterIntroViewProps {
  onViewSummary: () => void;
  onContinueChapter: () => void;
  onBack: () => void;
  stamina: number;
  coins: number;
}

export const ChapterIntroView: React.FC<ChapterIntroViewProps> = ({
  onViewSummary,
  onContinueChapter,
  onBack,
  stamina,
  coins,
}) => {
  return (
    <div className="space-y-5 max-w-xl mx-auto pb-24 relative z-10 text-slate-100">
      {/* Top Header Bar (Matching Image 6) */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-indigo-500/20 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-200 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-indigo-300" />
          </button>
          <h1 className="text-lg font-bold font-serif text-amber-100">
            篇章介紹
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-200 text-xs font-mono">
            <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
            <span>心力</span>
            <span className="font-bold text-purple-100">{stamina}</span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-200 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>星點</span>
            <span className="font-bold text-amber-300">{coins}</span>
          </div>
        </div>
      </div>

      {/* Main Hero Card with Adult Xiaowen Portrait (Matching Image 6) */}
      <div className="relative w-full h-[320px] rounded-3xl overflow-hidden border-2 border-indigo-500/30 shadow-2xl bg-slate-950 group">
        <img
          src={IMG_CHAPTERINTRO}
          alt="王小文的引導"
          className="w-full h-full object-cover object-top opacity-85 filter contrast-110 saturate-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 space-y-2 text-left">
          <div className="text-[10px] font-mono tracking-widest text-purple-300 uppercase">
            ✦ CHAPTER 0 ✦
          </div>
          <h2 className="text-3xl font-extrabold font-serif bg-gradient-to-r from-amber-100 via-purple-100 to-indigo-200 bg-clip-text text-transparent">
            第 0 篇：多重宇宙的抉擇
          </h2>
          <p className="text-xs font-serif text-slate-300/90 leading-relaxed font-medium">
            小文的引導：帶著可華穿過五扇門，找回真正的自己。
          </p>
        </div>
      </div>

      {/* Three Metadata Node Cards (Matching Image 6) */}
      <div className="space-y-3">
        {/* Node 1: 故事定位 */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-500/20 backdrop-blur-xl flex items-center gap-3.5 text-left">
          <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-serif font-bold text-purple-200">
              故事定位 ｜ 前導預告
            </div>
            <div className="text-[11px] font-serif text-slate-400">
              開啟生命教育探索之旅的起點
            </div>
          </div>
        </div>

        {/* Node 2: 關鍵場景 */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-500/20 backdrop-blur-xl flex items-center gap-3.5 text-left">
          <div className="w-10 h-10 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-serif font-bold text-indigo-200">
              關鍵場景 ｜ 辦公室、YES/NO之門、折疊大樓
            </div>
            <div className="text-[11px] font-serif text-slate-400">
              現實與迷幻多重世界的交會點
            </div>
          </div>
        </div>

        {/* Node 3: 核心任務 */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-500/20 backdrop-blur-xl flex items-center gap-3.5 text-left">
          <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-serif font-bold text-purple-200">
              核心任務 ｜ 理解改變、做出選擇
            </div>
            <div className="text-[11px] font-serif text-slate-400">
              破解時空鎖，擁抱真正想要的人生
            </div>
          </div>
        </div>
      </div>

      {/* Dialogue Widget (Matching Image 6) */}
      <div className="p-4 rounded-2xl border border-purple-500/30 bg-slate-900/95 backdrop-blur-xl shadow-xl flex items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl border border-purple-500/40 overflow-hidden shrink-0 bg-slate-950">
            <img
              src={IMG_CHAPTERINTRO}
              alt="小文"
              className="w-full h-full object-cover object-top opacity-90 filter contrast-125"
            />
          </div>

          <div className="space-y-0.5">
            <div className="text-xs font-bold font-serif text-purple-300 flex items-center gap-1.5">
              <span>小文</span>
              <span className="text-[10px] font-mono text-purple-400">~||~</span>
            </div>
            <p className="text-xs font-serif text-purple-100 font-medium">
              “想逃出去的話，跟我走。”
            </p>
          </div>
        </div>

        <button
          onClick={() => soundFx.playClick()}
          className="p-2.5 rounded-xl bg-slate-950 border border-purple-500/30 text-purple-300 hover:text-amber-200 transition-all"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Buttons (Matching Image 6) */}
      <div className="grid grid-cols-2 gap-4 pt-1">
        <button
          onClick={onViewSummary}
          className="py-3.5 px-4 rounded-2xl font-serif font-bold text-xs text-purple-200 bg-slate-950/80 hover:bg-slate-900 border border-purple-500/30 transition-all flex items-center justify-center gap-1.5"
        >
          <span>查看總說</span>
          <span>›</span>
        </button>

        <button
          onClick={onContinueChapter}
          className="py-3.5 px-4 rounded-2xl font-serif font-bold text-xs text-amber-100 bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 hover:from-purple-700 hover:to-indigo-700 border border-purple-400/40 shadow-xl shadow-purple-950/60 transition-all flex items-center justify-center gap-1.5 active:scale-98"
        >
          <span>繼續篇章</span>
          <span>›</span>
        </button>
      </div>
    </div>
  );
};
