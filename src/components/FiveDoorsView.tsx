import React from "react";
import { ChevronLeft, Heart, Sparkles, Volume2, Lock, CheckCircle, DoorClosed } from "lucide-react";
import { STORY_VOLUMES } from "../data/storyData";
import { LevelData } from "../types";
import { soundFx } from "../utils/audio";
import { CHARACTER_IMAGES } from "../data/characterAssets";
import { IMG_FIVEDOORS, IMG_CHAPTERINTRO } from "../data/gameBanners";

interface FiveDoorsViewProps {
  completedLevelIds: number[];
  onSelectLevel: (level: LevelData) => void;
  onBack: () => void;
  stamina: number;
  coins: number;
}

export const FiveDoorsView: React.FC<FiveDoorsViewProps> = ({
  completedLevelIds,
  onSelectLevel,
  onBack,
  stamina,
  coins,
}) => {
  const chapter0 = STORY_VOLUMES[0].chapters[0];
  const doors = chapter0.levels;

  const doorGlowStyles = [
    "from-purple-600/80 via-purple-900/90 to-indigo-950 border-purple-400 text-purple-200 shadow-purple-500/50",
    "from-sky-600/80 via-indigo-900/90 to-slate-950 border-sky-400 text-sky-200 shadow-sky-500/50",
    "from-amber-500/90 via-purple-800/90 to-amber-950 border-amber-300 text-amber-100 shadow-amber-400/80 scale-110",
    "from-fuchsia-600/80 via-purple-900/90 to-slate-950 border-fuchsia-400 text-fuchsia-200 shadow-fuchsia-500/50",
    "from-teal-600/80 via-emerald-900/90 to-slate-950 border-teal-400 text-teal-200 shadow-teal-500/50",
  ];

  return (
    <div className="space-y-4 max-w-xl mx-auto pb-24 relative z-10 text-slate-100">
      {/* Header Nav (Matching Image 5) */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-indigo-500/20 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-200 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-indigo-300" />
          </button>
          <h1 className="text-lg font-bold font-serif text-amber-100">
            穿越關卡
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

      {/* Subtitle */}
      <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs font-serif font-bold text-purple-200 text-center flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>✦ 下一步：跟隨小文，穿過五扇門。✦</span>
      </div>

      {/* Main Inception City Artwork Stage with 5 Doors (Matching Image 5) */}
      <div className="relative w-full h-[380px] sm:h-[420px] rounded-3xl overflow-hidden border-2 border-indigo-500/40 shadow-2xl bg-slate-950 group">
        {/* Background Image: Inception folded skyscrapers */}
        <img
          src={IMG_FIVEDOORS}
          alt="折疊城市五扇門"
          className="w-full h-full object-cover object-center opacity-75 filter contrast-125 saturate-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-purple-950/40" />

        {/* Floating 5 Doors Interactive Cluster in Center */}
        <div className="absolute inset-x-2 top-10 bottom-24 flex items-center justify-center gap-2 px-2 overflow-x-auto custom-scrollbar">
          {doors.map((level, idx) => {
            const isCompleted = completedLevelIds.includes(level.id);
            const isUnlocked =
              idx === 0 || completedLevelIds.includes(doors[idx - 1].id);
            const style = doorGlowStyles[idx % doorGlowStyles.length];

            return (
              <button
                key={level.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectLevel(level);
                }}
                className={`relative shrink-0 w-24 h-44 sm:w-28 sm:h-52 rounded-2xl border-2 bg-gradient-to-b ${style} p-2 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-md group/door ${
                  !isUnlocked ? "opacity-60 grayscale" : "cursor-pointer"
                }`}
              >
                {/* Door Frame Crown Badge */}
                <div className="text-[10px] font-mono font-bold tracking-wider opacity-90 border-b border-white/20 pb-1 w-full flex items-center justify-center gap-1">
                  <span>關卡 0{level.id}</span>
                  {isCompleted && (
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                  )}
                  {!isUnlocked && <Lock className="w-3 h-3 text-slate-400" />}
                </div>

                {/* Door Center Icon / Emblem */}
                <div className="my-auto space-y-1">
                  <div className="w-10 h-10 rounded-full bg-slate-950/70 border border-white/30 flex items-center justify-center mx-auto shadow-inner group-hover/door:scale-110 transition-transform">
                    <DoorClosed className="w-5 h-5 text-amber-200" />
                  </div>
                  <div className="text-[11px] font-bold font-serif leading-tight px-1 drop-shadow-md">
                    {level.title}
                  </div>
                </div>

                {/* Bottom Cost */}
                <div className="text-[9px] font-serif font-bold bg-slate-950/80 px-2 py-0.5 rounded-full border border-white/20 text-purple-200">
                  {level.staminaCost} 心力
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Dialogue Widget floating on stage (Matching Image 5) */}
        <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl border border-purple-500/40 bg-slate-950/90 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-purple-500/40 overflow-hidden shrink-0 bg-slate-900">
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
                來吧。我們得穿過這五扇門，才能回家。
              </p>
            </div>
          </div>

          <button
            onClick={() => soundFx.playClick()}
            className="p-2 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300 hover:text-amber-200 transition-all"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
