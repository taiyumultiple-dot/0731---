import React from "react";
import { ChevronLeft, Heart, Sparkles, Bus, Zap, Briefcase, Monitor, DoorClosed, CheckCircle2, Building2, RotateCcw, Compass } from "lucide-react";
import { CHARACTER_IMAGES } from "../data/characterAssets";
import { IMG_OVERVIEW } from "../data/gameBanners";

interface StoryOverviewViewProps {
  onStartExploration: () => void;
  onBackToChapters: () => void;
  stamina: number;
  coins: number;
}

export const StoryOverviewView: React.FC<StoryOverviewViewProps> = ({
  onStartExploration,
  onBackToChapters,
  stamina,
  coins,
}) => {
  const storyTimeline = [
    {
      icon: Bus,
      text: "可華在車上思考自己是否會變成和父親一樣，半夢半醒間被一陣強光吞沒。",
    },
    {
      icon: Zap,
      text: "他以高中生模樣墜入光怪陸離的平行世界，短暫穿梭各種未來片段。",
    },
    {
      icon: Briefcase,
      text: "醒來後卻發現自己成為中年上班族，辦公室裡，同事只催他工作、追著績效。",
    },
    {
      icon: Monitor,
      text: "電腦螢幕突然跳出神秘通話者，問他——「你真的想要改變？」並送來「探索，YES / NO」的選項。",
    },
    {
      icon: DoorClosed,
      text: "當可華將滑鼠移向 YES 與 NO，兩扇代表未知與輪迴的人生之門浮現在眼前。",
    },
    {
      icon: CheckCircle2,
      text: "他最終按下 YES，故障般的世界閃動，長大後的小文從中走出，對他伸出手：「跟我來。」",
    },
    {
      icon: Building2,
      text: "他們來到一座折疊的城市，高樓交錯、光影倒流，五扇門懸浮在時空之中，通往不同的可能與真相。可華踏上了回家的探索之旅……",
    },
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-24 relative z-10 text-slate-100">
      {/* Top Header Bar (Matching Screenshot 2) */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-indigo-500/20 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToChapters}
            className="p-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-200 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-indigo-300" />
          </button>
          <h1 className="text-lg font-bold font-serif text-amber-100">
            故事總說
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-200 text-base font-mono">
            <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
            <span>心力</span>
            <span className="font-bold text-purple-100">{stamina}</span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-200 text-base font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>星點</span>
            <span className="font-bold text-amber-300">{coins}</span>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-base font-serif text-slate-200 text-center">
        了解篇章全貌，找回探索的初心。
      </p>

      {/* Hero Header Box with Artwork (Kehua & Xiaowen High School Duo) */}
      <div className="relative p-6 sm:p-7 rounded-3xl border-2 border-indigo-500/30 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10 text-left">
          {/* Left Text */}
          <div className="space-y-2 flex-1">
            <div className="inline-block px-3 py-1 rounded-full text-base font-mono font-bold text-purple-300 bg-purple-950/80 border border-purple-500/30">
              第 0 篇
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif bg-gradient-to-r from-amber-100 via-purple-100 to-indigo-200 bg-clip-text text-transparent">
              多重宇宙的抉擇
            </h2>
            <p className="text-base font-serif text-slate-300/80">
              神秘通話者發來了一個選項。
            </p>
          </div>

          {/* Right Anime Art (Kehua & Xiaowen) */}
          <div className="w-36 h-36 rounded-2xl border border-purple-500/30 overflow-hidden shrink-0 shadow-xl bg-slate-950">
            <img
              src={IMG_OVERVIEW}
              alt="可華與小文"
              className="w-full h-full object-cover object-top opacity-90 filter contrast-110"
            />
          </div>
        </div>
      </div>

      {/* Main Story Summary Container (Matching Screenshot 2) */}
      <div className="p-6 rounded-3xl border border-indigo-500/30 bg-slate-900/90 shadow-2xl space-y-5 text-left backdrop-blur-xl">
        {/* Title Badge */}
        <div className="flex items-center justify-center gap-2 text-base font-bold font-serif text-amber-200 border-b border-indigo-500/20 pb-3">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>✦ 故事簡介 ✦</span>
          <Sparkles className="w-4 h-4 text-purple-400" />
        </div>

        {/* Timeline Items */}
        <div className="space-y-4">
          {storyTimeline.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-purple-950/80 border border-purple-500/30 text-purple-300 shrink-0 shadow-md">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-base font-serif text-slate-300/90 leading-relaxed pt-0.5">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Tagline Quote */}
        <div className="pt-3 border-t border-indigo-500/20 text-center text-base font-serif text-amber-200/90 font-medium">
          ✦ 每一次選擇，都是看見自己、理解生命的一次第練習。✦
        </div>
      </div>

      {/* Bottom Action Bar (Matching Screenshot 2) */}
      <div className="grid grid-cols-2 gap-4 pt-1">
        <button
          onClick={onBackToChapters}
          className="py-3.5 px-4 rounded-2xl font-serif font-bold text-base text-purple-200 bg-slate-950/80 hover:bg-slate-900 border border-purple-500/30 transition-all flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4 text-purple-400" />
          <span>重新選擇篇章</span>
        </button>

        <button
          onClick={onStartExploration}
          className="py-3.5 px-4 rounded-2xl font-serif font-bold text-base text-amber-100 bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 hover:from-purple-700 hover:to-indigo-700 border border-purple-400/40 shadow-xl shadow-purple-950/60 transition-all flex items-center justify-center gap-1.5 active:scale-98"
        >
          <Compass className="w-4 h-4 text-amber-300" />
          <span>開始探索</span>
        </button>
      </div>
    </div>
  );
};
