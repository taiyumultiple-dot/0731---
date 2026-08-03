import React, { useState } from "react";
import { Sparkles, Compass, CheckCircle2, ShieldCheck, DoorClosed } from "lucide-react";

interface LandingModalProps {
  onStartGame: () => void;
}

export const LandingModal: React.FC<LandingModalProps> = ({ onStartGame }) => {
  const [googleUser, setGoogleUser] = useState<string | null>(null);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  const handleGoogleLogin = () => {
    setGoogleUser("taiyumultiple@gmail.com");
    setSyncMsg("已連結 Google 帳號 taiyumultiple@gmail.com，雲端存檔同步成功！");
    setTimeout(() => {
      setSyncMsg(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md transition-all">
      {/* Background Multiverse Cyberpunk Glitch Image Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950/80 to-slate-950 pointer-events-none" />

      <div className="relative w-full max-w-md p-8 rounded-3xl border border-purple-500/30 bg-slate-900/95 text-center space-y-6 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Glow Effects */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Title */}
        <div className="space-y-1 relative z-10">
          <div className="text-base font-mono tracking-[0.3em] font-bold text-purple-400 uppercase">
            FIVE DOORS AGENCY
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif bg-gradient-to-r from-amber-100 via-purple-100 to-indigo-200 bg-clip-text text-transparent tracking-wider drop-shadow-md">
            五門事務所
          </h1>
          <p className="text-base font-serif text-purple-200/70 pt-1">
            穿越五道門，找回真正的自己
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 relative z-10 pt-2">
          <button
            onClick={onStartGame}
            className="w-full py-4 px-6 rounded-2xl font-serif font-bold text-base text-purple-950 bg-gradient-to-r from-purple-300 via-indigo-200 to-amber-200 hover:from-purple-200 hover:to-amber-100 shadow-xl shadow-purple-900/40 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <DoorClosed className="w-5 h-5 text-purple-950 animate-pulse" />
            <span>開啟多重宇宙探索</span>
          </button>

          <p className="text-base font-serif text-slate-200 px-4 leading-relaxed">
            未登入時進度保存在此裝置；登入 Google 帳號可開啟跨裝置雲端同步。
          </p>

          {!googleUser ? (
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 px-5 rounded-2xl font-serif text-base font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <div className="w-4 h-4 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center text-base">
                G
              </div>
              <span>以 Google 帳號遊玩</span>
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-base font-serif font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>已連結 {googleUser}</span>
            </div>
          )}
        </div>

        {syncMsg && (
          <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-200 text-base font-serif animate-in fade-in duration-300 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>{syncMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};
