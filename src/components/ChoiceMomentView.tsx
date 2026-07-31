import React, { useState } from "react";
import { ChevronLeft, Heart, Sparkles, Volume2, VolumeX, Shield, Radio, Check } from "lucide-react";
import { soundFx } from "../utils/audio";
import { CHARACTER_IMAGES } from "../data/characterAssets";
import { IMG_CHOICE } from "../data/gameBanners";

interface ChoiceMomentViewProps {
  onSelectYes: () => void;
  onSelectNo: () => void;
  onBack: () => void;
  stamina: number;
  coins: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const ChoiceMomentView: React.FC<ChoiceMomentViewProps> = ({
  onSelectYes,
  onSelectNo,
  onBack,
  stamina,
  coins,
  soundEnabled,
  onToggleSound,
}) => {
  const [glitching, setGlitching] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);

  const handleYes = () => {
    soundFx.playClick();
    setGlitching(true);
    setTimeout(() => {
      onSelectYes();
    }, 1200);
  };

  const handleNo = () => {
    soundFx.playClick();
    alert("「維持輪迴...你依然在日復一日的辦公室裡，追著永遠做不完的績效。」\n請嘗試點擊 YES 踏出改變的第一步！");
  };

  const handlePlayVoice = () => {
    setVoicePlaying(true);
    soundFx.playClick();
    setTimeout(() => {
      setVoicePlaying(false);
    }, 2000);
  };

  return (
    <div className={`space-y-4 max-w-xl mx-auto pb-20 relative z-10 ${glitching ? "animate-pulse filter invert contrast-200" : ""}`}>
      {/* Top Header Bar (Matching Image 1 Header) */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-indigo-500/20 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-200 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-indigo-300" />
          </button>
          <h1 className="text-lg font-bold font-serif text-amber-100 flex items-center gap-2">
            抉擇時刻
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

      {/* Subtitle Header */}
      <div className="text-center space-y-0.5">
        <div className="text-base font-bold font-serif text-indigo-200">
          第 0 篇 ｜ 多重宇宙的抉擇
        </div>
        <p className="text-base font-serif text-slate-200">
          — 神秘通話者發來了一個選項。—
        </p>
      </div>

      {/* Choice Buttons Bar (Matching Image 1) */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={handleYes}
          className="py-2.5 px-4 rounded-2xl border-2 border-purple-400 bg-purple-950/90 text-purple-100 text-base font-bold font-serif shadow-lg shadow-purple-950/80 hover:bg-purple-900 flex items-center justify-center gap-1.5 group transition-all"
        >
          <span className="text-base font-mono text-purple-300 font-extrabold">YES</span>
          <span className="text-slate-300">｜</span>
          <span>探索未知</span>
        </button>

        <button
          onClick={handleNo}
          className="py-2.5 px-4 rounded-2xl border border-slate-700 bg-slate-900/80 text-slate-300 text-base font-bold font-serif hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-all"
        >
          <span className="text-base font-mono text-slate-200 font-extrabold">NO</span>
          <span className="text-slate-300">｜</span>
          <span>維持輪迴</span>
        </button>
      </div>

      {/* Consciousness Gauge (Matching Image 1: 意識穩定度 58/100) */}
      <div className="p-3 rounded-2xl border border-indigo-500/20 bg-slate-950/80 space-y-1.5 text-left">
        <div className="flex items-center justify-between text-base font-mono text-slate-300">
          <span className="text-purple-300 font-bold font-serif">意識穩定度：58 / 100</span>
          <span className="text-indigo-400 text-base animate-pulse">GLITCH ALERT</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-900 border border-indigo-500/30 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-amber-300 transition-all duration-500 rounded-full"
            style={{ width: "58%" }}
          />
        </div>
      </div>

      {/* Main Office Scene Visual (Matching Image 1) */}
      <div className="relative w-full h-[440px] sm:h-[480px] rounded-3xl overflow-hidden border-2 border-indigo-500/30 shadow-2xl bg-slate-950 group">
        <img
          src={IMG_CHOICE}
          alt="辦公室電腦抉擇"
          className="w-full h-full object-contain object-top opacity-90 filter contrast-125 saturate-110"
        />

        {/* Dark Office Overlay & Glitch Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-purple-950/40" />

        {/* Left & Right Door Overlay Texts (Matching Image 1) */}
        <div className="absolute top-12 left-3 flex flex-col items-start space-y-1 text-left">
          <span className="text-base font-bold font-serif text-purple-200 bg-purple-950/80 px-2 py-1 rounded-lg border border-purple-500/40 backdrop-blur-sm">
            探索未知
          </span>
          <span className="text-base font-serif text-purple-300/80 bg-slate-950/80 px-1.5 py-0.5 rounded">
            不確定的未來
          </span>
        </div>

        <div className="absolute top-12 right-3 flex flex-col items-end space-y-1 text-right">
          <span className="text-base font-bold font-serif text-slate-300 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-700 backdrop-blur-sm">
            維持輪迴
          </span>
          <span className="text-base font-serif text-slate-200 bg-slate-950/80 px-1.5 py-0.5 rounded">
            重複的每一天
          </span>
        </div>

        {/* Holographic Computer Prompt Modal floating over Desk (Matching Image 1) */}
        <div className="absolute bottom-6 left-4 right-4 p-4 rounded-2xl border-2 border-purple-400/60 bg-slate-950/90 backdrop-blur-xl shadow-2xl text-left space-y-3">
          <div className="flex items-center justify-between text-base font-mono text-purple-300 border-b border-purple-500/30 pb-2">
            <span className="flex items-center gap-1.5 font-bold">
              <Radio className="w-3.5 h-3.5 text-purple-400 animate-ping" />
              未知來電
            </span>
            <span className="text-base text-purple-400">•••</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-extrabold font-serif text-amber-100">
              你真的想要改變？
            </h3>
            <p className="text-base font-serif text-purple-200/80">
              探索，YES / NO
            </p>
          </div>

          {/* Desktop Prompt YES/NO buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleYes}
              className="py-2 rounded-xl border border-purple-400 bg-purple-900/80 hover:bg-purple-800 text-purple-100 font-mono font-bold text-base shadow-md transition-all active:scale-98 text-center"
            >
              YES
            </button>
            <button
              onClick={handleNo}
              className="py-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-mono font-bold text-base transition-all text-center"
            >
              NO
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Dialogue Voice Widget (Matching Image 1) */}
      <div className="p-4 rounded-2xl border border-purple-500/30 bg-slate-900/95 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl border border-purple-500/40 overflow-hidden shrink-0 bg-slate-950">
            <img
              src={CHARACTER_IMAGES.MYSTERY_CALLER}
              alt="神秘通話者"
              className="w-full h-full object-cover object-top opacity-90 filter contrast-125"
            />
          </div>

          <div className="space-y-0.5">
            <div className="text-base font-bold font-serif text-purple-300 flex items-center gap-1.5">
              <span>神秘通話者</span>
              <span className="text-base font-mono text-purple-400">~||~</span>
            </div>
            <p className="text-base font-serif text-purple-100 leading-snug font-medium">
              「冷靜。你真的想要改變嗎？」
            </p>
          </div>
        </div>

        <button
          onClick={handlePlayVoice}
          className={`p-2.5 rounded-xl border transition-all ${
            voicePlaying
              ? "bg-purple-800 border-purple-400 text-amber-300 animate-bounce"
              : "bg-slate-950 border-purple-500/30 text-purple-300 hover:text-amber-200"
          }`}
          title="播放對話語音"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
