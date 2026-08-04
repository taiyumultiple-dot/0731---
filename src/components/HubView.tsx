import React, { useState } from "react";
import { STORY_VOLUMES } from "../data/storyData";
import { UserProgress, VolumeData, LevelData } from "../types";
import {
  Sparkles,
  ChevronRight,
  DoorClosed,
  Compass,
  User,
  BookOpen,
  X,
  Radio,
} from "lucide-react";
import { IMG_WENWEN_FULL } from "../data/characterFullBody";
import { IMG_HUB } from "../data/gameBanners";

const FIVE_DOORS_ROADMAP = [
  { unit: "第一道門・追求真理", title: "消失的邏輯", monster: "詭辯人偶" },
  { unit: "第二道門・認識自己", title: "鏡中的陌生人", monster: "鏡影怪" },
  { unit: "第三道門・正確抉擇", title: "天秤上的謊言", monster: "失衡天秤獸" },
  { unit: "第四道門・創造意義", title: "時鐘裡的沙漏人", monster: "沙漏人" },
  { unit: "第五道門・圓滿生命", title: "風暴中心的寂靜", monster: "雜念風暴" },
];

interface HubViewProps {
  userProgress: UserProgress;
  onSelectVolume: (vol: VolumeData) => void;
  onOpenInventory: () => void;
  onOpenQuests: () => void;
  onOpenAICaseGenerator: () => void;
  onQuickContinue: () => void;
  onOpenCaseDetail: (level: LevelData) => void;
  onNavigateToChapterIntro: () => void;
  onNavigateToStoryOverview: () => void;
  onNavigateToChoiceMoment: () => void;
  onNavigateToFiveDoors: () => void;
  onNavigateToStoryTeaser: () => void;
}

export const HubView: React.FC<HubViewProps> = ({
  userProgress,
  onSelectVolume,
  onOpenInventory,
  onOpenQuests,
  onOpenAICaseGenerator,
  onQuickContinue,
  onOpenCaseDetail,
  onNavigateToChapterIntro,
  onNavigateToStoryOverview,
  onNavigateToChoiceMoment,
  onNavigateToFiveDoors,
  onNavigateToStoryTeaser,
}) => {
  const [storySummaryOpen, setStorySummaryOpen] = useState(false);
  const [choiceDoorModalOpen, setChoiceDoorModalOpen] = useState(false);

  const completedCount = userProgress.completedLevelIds.length;
  const allLevels = STORY_VOLUMES.flatMap((v) =>
    v.chapters.flatMap((c) => c.levels)
  );

  // 判斷第0篇（Volume 1）是否已全部完成，決定「進入篇章」要去哪
  const volume1LevelIds = STORY_VOLUMES[0].chapters.flatMap((c) =>
    c.levels.map((l) => l.id)
  );
  const isVolume1Complete = volume1LevelIds.every((id) =>
    userProgress.completedLevelIds.includes(id)
  );
  const nextVolume = isVolume1Complete ? STORY_VOLUMES[1] : STORY_VOLUMES[0];

  const handleEnterChapter = () => {
    if (isVolume1Complete && STORY_VOLUMES[1]) {
      onSelectVolume(STORY_VOLUMES[1]);
    } else {
      onNavigateToFiveDoors();
    }
  };
  const currentLevel =
    allLevels.find((l) => l.id === userProgress.currentLevelId) ||
    allLevels[0];

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-24 relative z-10">
      {/* Page Background Theme */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <img
          src={IMG_HUB}
          alt=""
          className="w-full h-full object-cover opacity-[0.10] blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/92 to-slate-950" />
      </div>

      {/* Quick Access Screen Switcher Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 text-base font-serif font-bold text-purple-200 custom-scrollbar">
        <button
          onClick={onNavigateToStoryTeaser}
          className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 hover:text-amber-200 shrink-0 transition-all shadow-sm"
        >
          ✦ 前導預告
        </button>
        <button
          onClick={onNavigateToChapterIntro}
          className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 hover:text-amber-200 shrink-0 transition-all shadow-sm"
        >
          ✦ 篇章介紹
        </button>
        <button
          onClick={onNavigateToStoryOverview}
          className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 hover:text-amber-200 shrink-0 transition-all shadow-sm"
        >
          ✦ 故事總說
        </button>
        <button
          onClick={onNavigateToChoiceMoment}
          className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 hover:border-purple-400 hover:text-amber-200 shrink-0 transition-all shadow-sm"
        >
          ✦ 抉擇時刻
        </button>
        <button
          onClick={onNavigateToFiveDoors}
          className="px-3 py-1.5 rounded-full bg-purple-950/90 border border-purple-400/50 text-amber-300 shrink-0 transition-all shadow-md"
        >
          ✦ 穿越五扇門
        </button>
      </div>

      {/* CARD 1: Top Guide Banner (Matching Screenshot 3) */}
      <div className="relative p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-purple-950/90 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 flex-1 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-mono font-bold tracking-wider text-purple-300 bg-purple-950/80 border border-purple-500/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>來自未來的引導</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif bg-gradient-to-r from-amber-100 via-purple-100 to-indigo-200 bg-clip-text text-transparent tracking-wide">
              新的旅程已開啟
            </h2>

            {/* Quote */}
            <p className="text-base sm:text-base font-serif text-slate-300/90 leading-relaxed font-medium">
              「小文正在整理下一道門的線索。準備好面對下一個關卡了嗎？」
            </p>

            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={onNavigateToChapterIntro}
                className="px-5 py-2.5 rounded-2xl font-serif font-bold text-base text-purple-100 bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 hover:from-purple-700 hover:to-indigo-700 border border-purple-400/40 shadow-xl shadow-purple-900/50 transition-all flex items-center gap-1.5 group active:scale-98"
              >
                <span>查看篇章</span>
                <ChevronRight className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Portrait Image */}
          <div
            onClick={onNavigateToChapterIntro}
            className="relative shrink-0 w-36 h-48 sm:w-44 sm:h-56 rounded-2xl border-2 border-indigo-500/40 overflow-hidden shadow-2xl bg-slate-950 group cursor-pointer"
          >
            <img
              src={IMG_WENWEN_FULL}
              alt="長大後的王小文"
              className="w-full h-full object-contain object-top opacity-95 group-hover:scale-105 transition-transform duration-500 filter contrast-110 saturate-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
            <div className="absolute bottom-2 left-2 right-2 text-center text-base font-serif font-bold text-purple-200 bg-slate-950/85 py-1 rounded-lg border border-purple-500/30 backdrop-blur-sm">
              神秘女子 · 王小文
            </div>
          </div>
        </div>
      </div>

      {/* CARD: Five Units Preview */}
      <div className="relative p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 shadow-2xl space-y-4 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <DoorClosed className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-serif font-bold text-amber-100">五大單元預告</h3>
        </div>
        <p className="text-base text-slate-200">
          五道門，代表五個生命教育單元。內容製作中，敬請期待。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { no: "01", theme: "追求真理", desc: "哲學思考・看穿詭辯的邏輯練習" },
            { no: "02", theme: "認識自己", desc: "人學探索・找出真正的自己" },
            { no: "03", theme: "正確抉擇", desc: "價值思辨・學會為選擇負責" },
            { no: "04", theme: "創造意義", desc: "終極目標・正視生命有限" },
            { no: "05", theme: "圓滿生命", desc: "靈性修養・在喧鬧中找到平靜" },
          ].map((u) => (
            <div
              key={u.no}
              className="p-3.5 rounded-2xl border border-amber-500/20 bg-slate-950/70 flex items-center gap-3"
            >
              <span className="shrink-0 w-9 h-9 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-300 font-mono font-bold flex items-center justify-center">
                {u.no}
              </span>
              <div>
                <div className="text-base font-serif font-bold text-amber-100">{u.theme}</div>
                <div className="text-base text-slate-300">{u.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 2: Main Chapter Card (Matching Screenshot 3) */}
      <div className="relative p-6 sm:p-7 rounded-3xl border border-indigo-500/30 bg-slate-900/90 shadow-2xl space-y-6 backdrop-blur-xl">
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold font-serif bg-gradient-to-r from-amber-100 via-indigo-100 to-purple-200 bg-clip-text text-transparent">
            {nextVolume.title}
          </h2>

          <div className="px-3 py-1 rounded-full text-base font-mono font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 shadow-inner">
            進度：
            {
              nextVolume.chapters
                .flatMap((c) => c.levels)
                .filter((l) => userProgress.completedLevelIds.includes(l.id)).length
            }
            {" / "}
            {nextVolume.chapters.flatMap((c) => c.levels).length}
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-base font-serif text-slate-300/80 italic font-medium">
          {nextVolume.subtitle}
        </p>

        {/* Three Feature Nodes */}
        <div className="space-y-3 pt-1">
          {/* Node 1: 核心主題 */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-indigo-500/20 hover:border-indigo-400/40 transition-all flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
              <Sparkles className="w-4 h-4 text-purple-300" />
            </div>
            <div className="space-y-0.5 text-left">
              <div className="text-base font-bold font-serif text-purple-200">
                核心主題 ｜ 選擇與改變
              </div>
              <div className="text-base font-serif text-slate-200 leading-snug">
                每一個選擇，正在重塑你的未來與可能。
              </div>
            </div>
          </div>

          {/* Node 2: 場景線索 */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-indigo-500/20 hover:border-indigo-400/40 transition-all flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
              <DoorClosed className="w-4 h-4 text-indigo-300" />
            </div>
            <div className="space-y-0.5 text-left">
              <div className="text-base font-bold font-serif text-indigo-200">
                場景線索 ｜ 辦公室／平行世界／五扇門
              </div>
              <div className="text-base font-serif text-slate-200 leading-snug">
                現實與幻想交錯，找出通往真相的線索。
              </div>
            </div>
          </div>

          {/* Node 3: 探索目標 */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-indigo-500/20 hover:border-indigo-400/40 transition-all flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
              <User className="w-4 h-4 text-purple-300" />
            </div>
            <div className="space-y-0.5 text-left">
              <div className="text-base font-bold font-serif text-purple-200">
                探索目標 ｜ 回到真正的自己
              </div>
              <div className="text-base font-serif text-slate-200 leading-snug">
                穿越無數可能性，找回迷失的初心。
              </div>
            </div>
          </div>
        </div>

        {/* Primary Enter Chapter Button */}
        <div className="pt-2 space-y-3">
          <button
            onClick={handleEnterChapter}
            className="w-full py-4 px-6 rounded-2xl font-serif font-bold text-base text-amber-100 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 hover:from-indigo-800 hover:to-purple-800 border-2 border-indigo-500/40 shadow-xl shadow-indigo-950/60 transition-all flex items-center justify-center gap-2 group active:scale-98"
          >
            <span>進入篇章</span>
            <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary Story Brief Link */}
          <button
            onClick={onNavigateToStoryOverview}
            className="w-full text-center text-base font-serif text-indigo-300 hover:text-indigo-200 flex items-center justify-center gap-1 transition-colors py-1"
          >
            <span>查看故事簡介</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* YES / NO Choice Door Preview Card (Matching Screenshot 1 & 3) */}
      <div className="p-5 rounded-3xl border border-purple-500/30 bg-slate-900/80 shadow-xl space-y-3 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-purple-300">
            <Compass className="w-4 h-4 text-purple-400" />
            <span>命運的選擇之門（YES / NO）</span>
          </div>

          <button
            onClick={onNavigateToChoiceMoment}
            className="text-base font-serif text-amber-300 hover:underline flex items-center gap-0.5 font-bold"
          >
            開啟抉擇時刻 <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <p className="text-base font-serif text-slate-300/80 leading-relaxed">
          電腦螢幕跳出視窗：「你真的想要改變？」——滑鼠移至 YES 門，通往神秘冒險；移至 NO 門，則是如父親般的輪迴人生。
        </p>

        <button
          onClick={onNavigateToChoiceMoment}
          className="w-full py-2.5 rounded-2xl border border-purple-500/40 bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 text-base font-bold font-serif flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>進入辦公桌抉擇 (Image 1 畫面)</span>
        </button>
      </div>

      {/* Five Doors Roadmap Preview */}
      <div className="p-5 rounded-3xl border border-indigo-500/30 bg-slate-900/80 shadow-xl space-y-3 text-left">
        <div className="flex items-center gap-2 text-base font-serif font-bold text-indigo-200">
          <DoorClosed className="w-4 h-4 text-indigo-300" />
          <span>五道門總覽 ｜ 5 個生命教育單元</span>
        </div>
        <p className="text-base font-serif text-slate-300/80 leading-relaxed">
          五道門，各自代表一個生命教育單元與一段故事。內容正在製作中，完成後會陸續在「篇章」開放遊玩。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {FIVE_DOORS_ROADMAP.map((door, idx) => (
            <div
              key={door.title}
              className="p-3 rounded-2xl bg-slate-950/80 border border-indigo-500/20 space-y-0.5"
            >
              <div className="flex items-center gap-2 text-base font-mono font-bold text-indigo-300">
                <span className="w-5 h-5 rounded-md bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-base">
                  {idx + 1}
                </span>
                <span>{door.unit}</span>
              </div>
              <div className="text-base font-bold font-serif text-amber-100 pl-7">
                《{door.title}》
              </div>
              <div className="text-base font-serif text-slate-300/70 pl-7">
                {door.monster}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
