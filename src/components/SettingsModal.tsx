import React from "react";
import { Settings, Volume2, VolumeX, ShieldCheck, RefreshCw, X, LogOut, Info } from "lucide-react";
import { UserProgress } from "../types";

interface SettingsModalProps {
  userProgress: UserProgress;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetProgress: () => void;
  onClose: () => void;
  onOpenAuth: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  userProgress,
  soundEnabled,
  onToggleSound,
  onResetProgress,
  onClose,
  onOpenAuth,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md p-6 rounded-3xl border border-amber-500/30 bg-slate-900/95 space-y-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Settings className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold font-serif text-amber-100">
              系統設定與權限
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Detective Card Info */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-base font-serif">
            <span className="text-slate-200">當前職銜：</span>
            <span className="text-amber-300 font-bold">{userProgress.detectiveRank}</span>
          </div>
          <div className="flex items-center justify-between text-base font-serif">
            <span className="text-slate-200">破解案件總數：</span>
            <span className="text-amber-200 font-mono font-bold">
              {userProgress.completedLevelIds.length} 件
            </span>
          </div>
        </div>

        {/* Settings Controls */}
        <div className="space-y-3">
          {/* Sound Effect Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-amber-500/20">
            <div className="flex items-center gap-2 text-base font-serif text-amber-100 font-bold">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-300" />
              )}
              <span>環境氛圍音效</span>
            </div>

            <button
              onClick={onToggleSound}
              className={`px-3 py-1.5 rounded-xl text-base font-serif font-bold transition-all ${
                soundEnabled
                  ? "bg-amber-950 text-amber-300 border border-amber-500/40"
                  : "bg-slate-800 text-slate-200"
              }`}
            >
              {soundEnabled ? "已開啟" : "已靜音"}
            </button>
          </div>

          {/* Google Account Sync */}
          <button
            onClick={onOpenAuth}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-amber-500/20 text-base font-serif text-amber-100 font-bold hover:border-amber-400 transition-all"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>雲端同步狀態</span>
            </div>
            <span className="text-emerald-400 font-mono text-base">重新登入同步</span>
          </button>

          {/* Reset Progress Button */}
          <button
            onClick={() => {
              if (confirm("確定要重置所有案件進度與遊戲紀錄嗎？")) {
                onResetProgress();
                onClose();
              }
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/20 text-base font-serif text-rose-300 font-bold hover:bg-rose-900/40 transition-all"
          >
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-rose-400" />
              <span>重置偵探紀錄</span>
            </div>
            <span className="text-rose-400 text-base">重新開始</span>
          </button>
        </div>

        <div className="text-base font-serif text-slate-300 text-center pt-2">
          倫敦謎案簿 v2.5 · 1890 貝克街偵探記錄本
        </div>
      </div>
    </div>
  );
};
