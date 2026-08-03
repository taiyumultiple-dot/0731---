import React, { useState, useEffect } from "react";
import { PuzzleGameConfig } from "../types";
import { Lock, RefreshCw, Send, Sparkles, HelpCircle, Check, Delete, Brain } from "lucide-react";
import { soundFx } from "../utils/audio";

interface Puzzle1A2BProps {
  config: PuzzleGameConfig;
  onSuccess: () => void;
  stamina: number;
}

interface Attempt {
  guess: string;
  aCount: number;
  bCount: number;
}

export const Puzzle1A2B: React.FC<Puzzle1A2BProps> = ({ config, onSuccess }) => {
  const digitsCount = config.digitsCount || 3;
  const secret = config.secretNumber || "482";

  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [reasoningPower, setReasoningPower] = useState<number>(100);
  const [markedNumbers, setMarkedNumbers] = useState<Record<number, "normal" | "crossed" | "highlight">>(
    {
      0: "normal",
      1: "normal",
      2: "normal",
      3: "normal",
      4: "normal",
      5: "normal",
      6: "normal",
      7: "normal",
      8: "normal",
      9: "normal",
    }
  );

  const [aiHint, setAiHint] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showBreatheHint, setShowBreatheHint] = useState<boolean>(false);

  // 推理力歸零時，給予一個「深呼吸」的溫柔恢復，而非硬性卡關
  useEffect(() => {
    if (reasoningPower <= 15) {
      setShowBreatheHint(true);
      const timer = setTimeout(() => {
        setReasoningPower((prev) => Math.min(100, prev + 30));
        setShowBreatheHint(false);
      }, 2200);
      return () => clearTimeout(timer);
    } else {
      setShowBreatheHint(false);
    }
  }, [reasoningPower]);

  // Number Keypad Click
  const handleDigitClick = (num: number) => {
    setErrorMsg(null);
    if (currentGuess.length >= digitsCount) return;
    if (currentGuess.includes(num.toString())) {
      soundFx.playError();
      setErrorMsg("密碼不含重複數字！");
      return;
    }
    soundFx.playHover();
    setCurrentGuess((prev) => prev + num.toString());
  };

  const handleBackspace = () => {
    setErrorMsg(null);
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setErrorMsg(null);
    setCurrentGuess("");
  };

  // Evaluate 1A2B logic
  const handleGuessSubmit = () => {
    if (currentGuess.length !== digitsCount) {
      soundFx.playError();
      setErrorMsg(`請輸入完整 ${digitsCount} 位數字`);
      return;
    }

    let a = 0;
    let b = 0;

    for (let i = 0; i < digitsCount; i++) {
      if (currentGuess[i] === secret[i]) {
        a++;
      } else if (secret.includes(currentGuess[i])) {
        b++;
      }
    }

    const newAttempt = { guess: currentGuess, aCount: a, bCount: b };
    setAttempts((prev) => [newAttempt, ...prev]);
    setCurrentGuess("");

    // Check Win
    if (a === digitsCount) {
      soundFx.playVictory();
      setReasoningPower(100);
      setTimeout(() => {
        onSuccess();
      }, 500);
    } else {
      soundFx.playClick();
      // 推理力隨嘗試消耗，越接近答案回復越多，鼓勵持續思考而非懲罰嘗試
      setReasoningPower((prev) => {
        const delta = -14 + a * 6 + b * 2;
        const next = Math.max(0, Math.min(100, prev + delta));
        return next;
      });
    }
  };

  // Toggle Number Notepad State (Normal -> Crossed -> Highlight)
  const toggleNumberMark = (num: number) => {
    setMarkedNumbers((prev) => {
      const current = prev[num] || "normal";
      const next = current === "normal" ? "crossed" : current === "crossed" ? "highlight" : "normal";
      return { ...prev, [num]: next };
    });
  };

  // Ask AI Guide Xiaowen for Hint
  const fetchAIHint = async () => {
    setLoadingHint(true);
    setAiHint(null);
    try {
      const historyStr = attempts
        .map((att) => `嘗試：${att.guess} -> ${att.aCount}A${att.bCount}B`)
        .join("\n");

      const prompt = `你是《五門事務所》裡的引路人「小文」，先一步穿越五道門、通曉生命智慧。可華正在破解一組 ${digitsCount} 位不重複數字密碼。
正確答案是 ${secret}。
可華目前的嘗試紀錄如下：
${historyStr || "目前尚未有嘗試紀錄"}

請用小文溫柔而堅定的語氣給予可華一個關鍵邏輯提示（例如提示某個數字的位置、或者引導排除某個數），切記不要直接暴露出完整的 ${digitsCount} 位答案數值！字數在 60 字以內。`;

      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.result) {
        setAiHint(data.result);
      } else {
        setAiHint("「觀察你的嘗試紀錄：注意 A 代表數字與位置皆正確，B 代表位置需調整。」");
      }
    } catch {
      setAiHint("「試著先把不可能出現的數字在下方筆記本中劃掉，縮小搜查範圍！」");
    } finally {
      setLoadingHint(false);
    }
  };

  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Target Title & Prompt */}
      <div className="p-4 rounded-2xl border border-amber-500/30 bg-slate-900/90 text-center space-y-2 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-serif font-bold bg-amber-950/80 text-amber-300 border border-amber-500/30">
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>{digitsCount} 位數 1A2B 密碼破譯</span>
        </div>
        <p className="text-base text-amber-200/80 leading-relaxed">
          玩法：輸入 {digitsCount} 位不重複數字。<b>A</b> 代表數字與位置均正確，<b>B</b> 代表數字正確但位置錯誤。
        </p>
        <button
          onClick={() => setShowTutorial((v) => !v)}
          className="text-base font-serif text-amber-300 hover:text-amber-200 underline underline-offset-2"
        >
          {showTutorial ? "收起範例 ▲" : "還是看不懂？看範例教學 ▼"}
        </button>

        {showTutorial && (
          <div className="mt-2 p-3.5 rounded-2xl border border-amber-500/20 bg-slate-950/80 text-left space-y-2.5 animate-in fade-in duration-300">
            <p className="text-base text-amber-100">
              假設密碼是三位數，你完全不知道答案，先隨便猜一組試試水溫：
            </p>
            <div className="flex items-center gap-2 font-mono text-base">
              <span className="px-2 py-1 rounded-lg bg-slate-900 text-amber-200 border border-amber-500/20">
                你猜：1 2 3
              </span>
              <span className="text-slate-300">→</span>
              <span className="px-2 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                1A
              </span>
              <span className="px-2 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-500/30">
                1B
              </span>
            </div>
            <p className="text-base text-slate-200 leading-relaxed">
              代表：1、2、3 這三個數字裡，有 <b>1 個</b>數字「位置也對」（1A），有 <b>1 個</b>數字「有出現在密碼裡，但位置不對」（1B），另外 1 個數字完全不在密碼裡。
            </p>
            <p className="text-base text-amber-100">再猜第二組，縮小範圍：</p>
            <div className="flex items-center gap-2 font-mono text-base">
              <span className="px-2 py-1 rounded-lg bg-slate-900 text-amber-200 border border-amber-500/20">
                你猜：1 4 2
              </span>
              <span className="text-slate-300">→</span>
              <span className="px-2 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                2A
              </span>
              <span className="px-2 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-500/30">
                0B
              </span>
            </div>
            <p className="text-base text-slate-200 leading-relaxed">
              換掉一個數字（3→4）、對調了位置（2 從第三位換到第三位不變），結果 A 從 1 變 2，代表新猜的組合裡有更多位置對了。像這樣每猜一次都在收集線索，慢慢就能推出正確答案——不用死記硬背，跟著 A/B 的變化調整就好。
            </p>
          </div>
        )}
      </div>

      {/* Reasoning Power Bar */}
      <div className="p-3.5 rounded-2xl border border-pink-500/30 bg-slate-900/90 space-y-1.5 shadow-lg">
        <div className="flex items-center justify-between text-base font-serif font-bold">
          <div className="flex items-center gap-1.5 text-pink-300">
            <Brain className="w-4 h-4" />
            <span>推理力</span>
          </div>
          <span className="font-mono text-pink-200">{reasoningPower} / 100</span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-950 border border-pink-500/20 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              reasoningPower <= 15
                ? "bg-gradient-to-r from-rose-500 to-rose-400 animate-pulse"
                : "bg-gradient-to-r from-pink-500 via-fuchsia-400 to-purple-400"
            }`}
            style={{ width: `${reasoningPower}%` }}
          />
        </div>
        {showBreatheHint && (
          <p className="text-base font-serif text-rose-300 pt-0.5 animate-in fade-in duration-300">
            「先別急，深呼吸一下……小文正在幫你恢復推理力。」
          </p>
        )}
      </div>

      {/* Secret Password Display Slots */}
      <div className="flex justify-center items-center gap-3">
        {Array.from({ length: digitsCount }).map((_, idx) => {
          const char = currentGuess[idx] || "";
          return (
            <div
              key={idx}
              className={`w-14 h-16 sm:w-16 sm:h-20 rounded-2xl border-2 flex items-center justify-center font-mono text-2xl sm:text-3xl font-bold shadow-inner transition-all ${
                char
                  ? "border-amber-400 bg-amber-950/60 text-amber-200 shadow-amber-500/20 scale-105"
                  : "border-amber-500/20 bg-slate-900/60 text-slate-300"
              }`}
            >
              {char || "•"}
            </div>
          );
        })}
      </div>

      {errorMsg && (
        <p className="text-center text-base font-bold text-rose-400 animate-bounce">
          ⚠️ {errorMsg}
        </p>
      )}

      {/* On-Screen Keypad */}
      <div className="p-4 rounded-3xl border border-amber-500/20 bg-slate-900/80 backdrop-blur-md space-y-3 shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
            const isUsedInGuess = currentGuess.includes(num.toString());
            return (
              <button
                key={num}
                onClick={() => handleDigitClick(num)}
                disabled={isUsedInGuess}
                className={`py-3 sm:py-3.5 rounded-xl font-mono text-lg font-bold border transition-all active:scale-95 ${
                  isUsedInGuess
                    ? "opacity-30 border-slate-800 bg-slate-950 text-slate-300"
                    : "border-amber-500/30 bg-gradient-to-b from-amber-950/50 to-slate-900 text-amber-100 hover:border-amber-400 hover:bg-amber-900/50 shadow-md"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleClear}
            className="py-3 rounded-xl font-serif text-base font-bold border border-slate-700 bg-slate-950 text-slate-200 hover:text-slate-200 hover:bg-slate-800 transition-all"
          >
            清除
          </button>
          <button
            onClick={() => handleDigitClick(0)}
            disabled={currentGuess.includes("0")}
            className={`py-3 rounded-xl font-mono text-lg font-bold border transition-all active:scale-95 ${
              currentGuess.includes("0")
                ? "opacity-30 border-slate-800 bg-slate-950 text-slate-300"
                : "border-amber-500/30 bg-gradient-to-b from-amber-950/50 to-slate-900 text-amber-100 hover:border-amber-400 hover:bg-amber-900/50 shadow-md"
            }`}
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="py-3 rounded-xl font-serif text-base font-bold border border-slate-700 bg-slate-950 text-slate-200 hover:text-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-1"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleGuessSubmit}
          className="w-full py-3.5 rounded-2xl font-serif font-bold text-base text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <Send className="w-4 h-4" />
          <span>提交試探暗碼</span>
        </button>
      </div>

      {/* Deduction Tracker Notebook (0-9 Number Elimination Grid) */}
      <div className="p-4 rounded-2xl border border-amber-500/20 bg-slate-900/70 space-y-2">
        <div className="flex items-center justify-between text-base font-serif text-amber-300/80">
          <span>🔎 偵探推理草稿簿 (點擊數字可標記刪除或圈選)</span>
          <span className="text-base text-slate-200">紅劃掉 / 綠圈選</span>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
            const state = markedNumbers[num];
            return (
              <button
                key={num}
                onClick={() => toggleNumberMark(num)}
                className={`h-9 rounded-xl font-mono text-base font-bold border transition-all flex items-center justify-center ${
                  state === "crossed"
                    ? "bg-rose-950/80 border-rose-600 text-rose-400 line-through opacity-60"
                    : state === "highlight"
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 ring-1 ring-emerald-400"
                    : "bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-600"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Guide Xiaowen Hint */}
      <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-950/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-base font-bold font-serif text-purple-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>小文的線索指引</span>
          </div>
          <button
            onClick={fetchAIHint}
            disabled={loadingHint}
            className="px-3 py-1 rounded-xl text-base font-serif font-bold text-purple-200 bg-purple-900/60 hover:bg-purple-800/80 border border-purple-400/30 transition-all flex items-center gap-1"
          >
            {loadingHint ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <HelpCircle className="w-3.5 h-3.5 text-purple-300" />
            )}
            <span>{loadingHint ? "研判中..." : "求助小文"}</span>
          </button>
        </div>

        {aiHint && (
          <p className="text-base font-serif text-purple-100/90 leading-relaxed p-3 rounded-xl bg-purple-950/60 border border-purple-500/20 animate-in fade-in duration-300">
            {aiHint}
          </p>
        )}
      </div>

      {/* Attempt History Feed */}
      {attempts.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-base font-serif font-bold text-amber-300/80">
            歷史試探紀錄 ({attempts.length} 次)
          </h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {attempts.map((att, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl border border-amber-500/20 bg-slate-900/80 font-mono text-base text-amber-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base text-slate-300">#{attempts.length - idx}</span>
                  <span className="text-base font-bold tracking-widest text-amber-200">{att.guess}</span>
                </div>
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
        </div>
      )}
    </div>
  );
};
