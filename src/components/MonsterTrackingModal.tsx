import React, { useState } from "react";
import { X, Radar, Send, Delete, Sparkles, PartyPopper } from "lucide-react";
import { MonsterData } from "../types";
import { soundFx } from "../utils/audio";

interface MonsterTrackingModalProps {
  monster: MonsterData;
  onCapture: (monsterId: string, coinsReward: number) => void;
  onClose: () => void;
}

interface Attempt {
  guess: string;
  aCount: number;
  bCount: number;
}

const MAX_ATTEMPTS = 8;

function generateSecret(digitsCount: number): string {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const shuffled = [...digits].sort(() => Math.random() - 0.5);
  if (shuffled[0] === "0") {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled.slice(0, digitsCount).join("");
}

export const MonsterTrackingModal: React.FC<MonsterTrackingModalProps> = ({
  monster,
  onCapture,
  onClose,
}) => {
  const digitsCount = monster.digitsCount;
  const [secret, setSecret] = useState(() => generateSecret(digitsCount));
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [status, setStatus] = useState<"tracking" | "captured" | "escaped">("tracking");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const trackingSignal = Math.max(0, 100 - attempts.length * (100 / MAX_ATTEMPTS));

  const handleDigitClick = (num: number) => {
    setErrorMsg(null);
    if (currentGuess.length >= digitsCount) return;
    if (currentGuess.includes(num.toString())) {
      soundFx.playError();
      setErrorMsg("追蹤代碼不含重複數字！");
      return;
    }
    soundFx.playHover();
    setCurrentGuess((prev) => prev + num.toString());
  };

  const handleBackspace = () => setCurrentGuess((prev) => prev.slice(0, -1));

  const handleRetry = () => {
    setSecret(generateSecret(digitsCount));
    setAttempts([]);
    setCurrentGuess("");
    setStatus("tracking");
    setErrorMsg(null);
  };

  const handleSubmit = () => {
    if (status !== "tracking") return;
    if (currentGuess.length !== digitsCount) {
      soundFx.playError();
      setErrorMsg(`請輸入完整 ${digitsCount} 位數字`);
      return;
    }

    let a = 0;
    let b = 0;
    for (let i = 0; i < digitsCount; i++) {
      if (currentGuess[i] === secret[i]) a++;
      else if (secret.includes(currentGuess[i])) b++;
    }

    const newAttempts = [{ guess: currentGuess, aCount: a, bCount: b }, ...attempts];
    setAttempts(newAttempts);
    setCurrentGuess("");

    if (a === digitsCount) {
      soundFx.playVictory();
      setStatus("captured");
    } else if (newAttempts.length >= MAX_ATTEMPTS) {
      soundFx.playError();
      setStatus("escaped");
    } else {
      soundFx.playClick();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md rounded-3xl border border-teal-500/30 bg-slate-900 shadow-2xl p-5 sm:p-6 text-slate-100 space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between pb-3 border-b border-teal-500/20">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-300">
              <Radar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-teal-100">迷惘化身追蹤</h3>
              <p className="text-base text-teal-200/70">{monster.theme} · {monster.englishName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-300 hover:text-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === "captured" ? (
          <div className="text-center space-y-4 py-6 animate-in zoom-in duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-teal-400 to-emerald-400 p-0.5 shadow-xl shadow-teal-500/30 flex items-center justify-center animate-bounce">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <PartyPopper className="w-7 h-7 text-teal-300" />
              </div>
            </div>
            <h4 className="text-lg font-serif font-bold text-teal-100">ENCOUNTER SECURED</h4>
            <p className="text-base font-serif text-teal-200/80 leading-relaxed px-2">
              你看清了「{monster.name}」的真面目——{monster.description}
            </p>
            <button
              onClick={() => onCapture(monster.id, 60)}
              className="px-6 py-3 rounded-2xl font-serif font-bold text-base text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 shadow-lg shadow-teal-500/25 transition-all active:scale-95"
            >
              收錄進圖鑑，+60 星點
            </button>
          </div>
        ) : status === "escaped" ? (
          <div className="text-center space-y-4 py-6">
            <p className="text-2xl">💨</p>
            <h4 className="text-lg font-serif font-bold text-slate-200">「{monster.name}」逃走了……</h4>
            <p className="text-base font-serif text-slate-300/80">
              沒關係，迷惘不會只出現一次。深呼吸，再追蹤一次看看？
            </p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={handleRetry}
                className="px-5 py-2.5 rounded-2xl font-serif font-bold text-base text-teal-100 bg-teal-900/60 hover:bg-teal-800/80 border border-teal-500/40 transition-all active:scale-95"
              >
                再追蹤一次
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl font-serif font-bold text-base text-slate-200 bg-slate-800 hover:bg-slate-700 transition-all active:scale-95"
              >
                先休息
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="p-3.5 rounded-2xl border border-teal-500/20 bg-slate-950/60 space-y-1.5">
              <h4 className="text-base font-serif font-bold text-teal-200">「{monster.name}」</h4>
              <p className="text-base text-slate-300/80 leading-relaxed">{monster.description}</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-base font-serif font-bold text-teal-300">
                <span>追蹤訊號</span>
                <span className="font-mono">{attempts.length} / {MAX_ATTEMPTS} 次嘗試</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-950 border border-teal-500/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${trackingSignal}%` }}
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-3">
              {Array.from({ length: digitsCount }).map((_, idx) => {
                const char = currentGuess[idx] || "";
                return (
                  <div
                    key={idx}
                    className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-2 flex items-center justify-center font-mono text-xl sm:text-2xl font-bold shadow-inner transition-all ${
                      char
                        ? "border-teal-400 bg-teal-950/60 text-teal-200 scale-105"
                        : "border-teal-500/20 bg-slate-900/60 text-slate-300"
                    }`}
                  >
                    {char || "•"}
                  </div>
                );
              })}
            </div>

            {errorMsg && (
              <p className="text-center text-base font-bold text-rose-400 animate-bounce">⚠️ {errorMsg}</p>
            )}

            <div className="p-3.5 rounded-3xl border border-teal-500/20 bg-slate-900/80 space-y-2.5">
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                  const used = currentGuess.includes(num.toString());
                  return (
                    <button
                      key={num}
                      onClick={() => handleDigitClick(num)}
                      disabled={used}
                      className={`py-2.5 sm:py-3 rounded-xl font-mono text-base font-bold border transition-all active:scale-95 ${
                        used
                          ? "opacity-30 border-slate-800 bg-slate-950 text-slate-300"
                          : "border-teal-500/30 bg-gradient-to-b from-teal-950/50 to-slate-900 text-teal-100 hover:border-teal-400 hover:bg-teal-900/50"
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setCurrentGuess("")}
                  className="py-2.5 rounded-xl font-serif text-base font-bold border border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800 transition-all"
                >
                  清除
                </button>
                <button
                  onClick={() => handleDigitClick(0)}
                  disabled={currentGuess.includes("0")}
                  className={`py-2.5 rounded-xl font-mono text-base font-bold border transition-all active:scale-95 ${
                    currentGuess.includes("0")
                      ? "opacity-30 border-slate-800 bg-slate-950 text-slate-300"
                      : "border-teal-500/30 bg-gradient-to-b from-teal-950/50 to-slate-900 text-teal-100 hover:border-teal-400 hover:bg-teal-900/50"
                  }`}
                >
                  0
                </button>
                <button
                  onClick={handleBackspace}
                  className="py-2.5 rounded-xl font-serif text-base font-bold border border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center"
                >
                  <Delete className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-2xl font-serif font-bold text-base text-slate-950 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>發送追蹤訊號</span>
              </button>
            </div>

            {attempts.length > 0 && (
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                {attempts.map((att, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-teal-500/20 bg-slate-950/60 font-mono text-base text-teal-100"
                  >
                    <span className="tracking-widest text-teal-200">{att.guess}</span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-bold">
                        {att.aCount} A
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-500/30 font-bold">
                        {att.bCount} B
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-base text-center text-slate-300/60 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> A 代表位置正確，B 代表數字存在但位置錯誤
            </p>
          </>
        )}
      </div>
    </div>
  );
};
