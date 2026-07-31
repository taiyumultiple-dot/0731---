import React, { useState } from "react";
import { PuzzleGameConfig } from "../types";
import { KeyRound, Check, HelpCircle, Sparkles } from "lucide-react";

interface PuzzleCipherProps {
  config: PuzzleGameConfig;
  onSuccess: () => void;
}

export const PuzzleCipher: React.FC<PuzzleCipherProps> = ({ config, onSuccess }) => {
  const encryptedText = config.encryptedText || "EDNHU VWUHHW";
  const solutionText = (config.solutionText || "BAKER STREET").toUpperCase();

  const [inputVal, setInputVal] = useState("");
  const [shift, setShift] = useState(3);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quick Caesar Shift Helper Preview
  const decodeCaesar = (str: string, shiftAmount: number) => {
    return str
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") {
          const code = char.charCodeAt(0) - 65;
          const newCode = (code - shiftAmount + 26) % 26;
          return String.fromCharCode(newCode + 65);
        }
        return char;
      })
      .join("");
  };

  const previewText = decodeCaesar(encryptedText, shift);

  const handleSubmit = () => {
    const formattedInput = inputVal.trim().toUpperCase();
    if (formattedInput === solutionText || previewText === solutionText) {
      setErrorMsg(null);
      onSuccess();
    } else {
      setErrorMsg("解密文字不正確，試著調整推移位數或檢查拼字！");
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Cipher Card */}
      <div className="p-5 rounded-3xl border border-amber-500/30 bg-slate-900/90 text-center space-y-3 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-serif font-bold bg-amber-950/80 text-amber-300 border border-amber-500/30">
          <KeyRound className="w-3.5 h-3.5 text-amber-400" />
          <span>凱撒位移密碼解密</span>
        </div>

        <p className="text-base text-amber-200/80">截獲的灰印會密函字母如下：</p>

        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 font-mono text-xl sm:text-2xl font-bold tracking-widest text-amber-300 shadow-inner">
          {encryptedText}
        </div>

        {config.cipherHint && (
          <p className="text-base text-purple-300/90 italic p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
            💡 {config.cipherHint}
          </p>
        )}
      </div>

      {/* Caesar Wheel / Shift Slider */}
      <div className="p-5 rounded-3xl border border-amber-500/20 bg-slate-900/80 space-y-4">
        <div className="flex items-center justify-between text-base font-serif text-amber-200">
          <span>位移滾輪調整 (Shift): <b className="text-amber-400 font-mono text-base">{shift}</b></span>
          <span className="text-base text-slate-200">目前預覽: <b className="font-mono text-amber-300">{previewText}</b></span>
        </div>

        <input
          type="range"
          min={0}
          max={25}
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />

        <div className="space-y-2 pt-2">
          <label className="block text-base font-serif font-bold text-amber-200">
            輸入解密後的英文單字：
          </label>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value.toUpperCase())}
            placeholder={previewText}
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-amber-500/30 text-amber-100 font-mono text-lg font-bold tracking-wider outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        {errorMsg && (
          <p className="text-base font-bold text-rose-400 text-center animate-bounce">
            ⚠️ {errorMsg}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-2xl font-serif font-bold text-base text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>驗證解密答案</span>
        </button>
      </div>
    </div>
  );
};
