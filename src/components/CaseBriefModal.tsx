import React, { useState } from "react";
import { LevelData } from "../types";
import { ChevronDown, ChevronUp, Heart, ChevronRight, BookOpen, Sparkles, DoorClosed } from "lucide-react";
import { CHARACTER_IMAGES } from "../data/characterAssets";
import { IMG_WENWEN_PORTRAIT } from "../data/characterPortraits";

interface CaseBriefModalProps {
  level: LevelData;
  onContinue: () => void;
  onBackToChapters: () => void;
  onClose: () => void;
}

export const CaseBriefModal: React.FC<CaseBriefModalProps> = ({
  level,
  onContinue,
  onBackToChapters,
  onClose,
}) => {
  const [expandedDetails, setExpandedDetails] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl p-6 rounded-3xl border border-purple-500/30 bg-slate-900/95 space-y-5 shadow-2xl my-8">
        {/* Top Badge */}
        <div className="flex items-center justify-between text-xs font-serif">
          <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 font-mono font-bold">
            第0篇｜多重宇宙的抉擇｜關卡前置
          </span>
        </div>

        {/* Level Title */}
        <h2 className="text-2xl font-extrabold font-serif bg-gradient-to-r from-amber-100 via-purple-100 to-indigo-200 bg-clip-text text-transparent">
          #{level.id < 10 ? `0${level.id}` : level.id} {level.title}
        </h2>

        {/* Client / Guide Brief Box */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/20 flex items-start gap-4">
          <div className="w-16 h-20 rounded-xl border border-purple-500/30 overflow-hidden shrink-0 bg-slate-900">
            <img
              src={IMG_WENWEN_PORTRAIT}
              alt="王小文"
              className="w-full h-full object-cover object-top filter contrast-110"
            />
          </div>

          <div className="space-y-1 flex-1">
            <p className="text-xs sm:text-sm font-serif text-purple-100 leading-relaxed font-bold">
              {level.clientName}：『破解這關的時空密碼鎖，從平行世界中鎖定打破輪迴的關鍵鑰匙！』
            </p>
          </div>
        </div>

        {/* Chapter Metadata */}
        <div className="space-y-1 text-xs font-serif text-purple-300/90 border-t border-b border-purple-500/20 py-3">
          <div className="flex items-center justify-between">
            <span>第一章：辦公室的 GLITCH 與五扇門 | 第 {level.id}/5 關</span>
          </div>
          <div className="flex items-center gap-4 pt-1">
            <span className="text-purple-200 font-bold">{level.puzzleConfig.digitsCount || 3} 位數時空密碼</span>
            <span className="text-purple-400 font-mono flex items-center gap-1 font-bold">
              <Heart className="w-3.5 h-3.5 fill-purple-400" /> 消耗 {level.staminaCost} 心力
            </span>
          </div>
        </div>

        {/* Collapsible Story Detail */}
        <div className="space-y-2">
          <button
            onClick={() => setExpandedDetails((prev) => !prev)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-purple-500/20 text-xs font-serif font-bold text-purple-300 hover:text-purple-100 transition-all"
          >
            <span className="flex items-center gap-1">
              {expandedDetails ? "▼" : "▶"} 查看劇情細節與任務說明
            </span>
            {expandedDetails ? (
              <ChevronUp className="w-4 h-4 text-purple-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-purple-400" />
            )}
          </button>

          {expandedDetails && (
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-purple-500/20 text-xs font-serif text-purple-200/90 leading-relaxed space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
              <p>{level.narrative}</p>
              <p className="text-slate-400 italic pt-1 border-t border-purple-500/10">
                進入關卡後觀看故事對話演繹，隨後開啟密碼推算解密。若想選擇其他關卡，點擊下方「返回章節」即可。
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onBackToChapters}
            className="flex-1 py-3.5 px-4 rounded-2xl font-serif font-bold text-xs text-purple-200 bg-slate-950/80 hover:bg-slate-800 border border-purple-500/30 transition-all text-center"
          >
            返回章節
          </button>

          <button
            onClick={onContinue}
            className="flex-1 py-3.5 px-4 rounded-2xl font-serif font-bold text-xs text-purple-950 bg-gradient-to-r from-purple-300 via-indigo-200 to-amber-200 hover:from-purple-200 hover:to-amber-100 shadow-xl shadow-purple-900/40 transition-all flex items-center justify-center gap-1 active:scale-98"
          >
            <span>開啟探索</span>
            <ChevronRight className="w-4 h-4 text-purple-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
