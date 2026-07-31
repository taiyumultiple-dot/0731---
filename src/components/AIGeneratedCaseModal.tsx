import React, { useState } from "react";
import { X, Bot, Sparkles, Send, Play, RefreshCw, Lock } from "lucide-react";
import { LevelData } from "../types";

interface AIGeneratedCaseModalProps {
  onStartGeneratedCase: (customLevel: LevelData) => void;
  onClose: () => void;
}

export const AIGeneratedCaseModal: React.FC<AIGeneratedCaseModalProps> = ({
  onStartGeneratedCase,
  onClose,
}) => {
  const [theme, setTheme] = useState("大英博物館古埃及詛咒與神秘失蹤案");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const presets = [
    "大英博物館古埃及詛咒與神秘失蹤案",
    "泰晤士河霧夜幽靈馬車與血印標記",
    "大本鐘時間停擺與皇家金庫連環密碼案",
    "海德公園密林中的鍊金術暗碼試探",
  ];

  const handleGenerateCase = async () => {
    if (!theme.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const prompt = `你是一位 19 世紀維多利亞時代倫敦偵探小說家與遊戲設計師。請根據主題「${theme}」生成一個完整的《倫敦謎案簿》遊戲關卡。
請嚴格輸出符合以下 JSON 格式的內容，不要包含任何額外的 Markdown 或文字：

{
  "title": "關卡簡短標題",
  "clientName": "委託人姓名與身分",
  "narrative": "100字左右的案件背景敘述，充滿倫敦濃霧與神秘氛圍",
  "secretNumber": "一個3位不重複數字（例如 591）",
  "endingHook": "破案後的驚天故事伏筆（50字左右）",
  "unlockedClueItem": "解開案件獲得的關鍵道具名稱"
}`;

      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (!data.result) {
        throw new Error("生成失敗");
      }

      // Parse JSON from result
      const jsonMatch = data.result.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("無法解析案件格式");
      }

      const parsed = JSON.parse(jsonMatch[0]);

      const customLevel: LevelData = {
        id: Date.now(),
        volumeId: 999,
        chapterId: 999,
        title: parsed.title || "AI 懸案：" + theme.slice(0, 8),
        subtitle: "Gemini 智囊即時生成 3 位數密碼案",
        staminaCost: 10,
        coinReward: 200,
        clientName: parsed.clientName || "神秘委託人",
        narrative: parsed.narrative || "濃霧瀰漫的倫敦街頭發生命案...",
        openingDialogue: [
          {
            speaker: parsed.clientName || "神秘委託人",
            text: `「偵探先生！請幫幫我！${theme}引發了巨大的恐慌！」`,
            portrait: "client",
          },
          {
            speaker: "夏洛特",
            text: "「冷靜下來，這現場遺留的數字密碼暗示著灰印會的爪牙曾來過這裡。」",
            portrait: "charlotte",
          },
        ],
        puzzleConfig: {
          type: "1a2b",
          digitsCount: 3,
          secretNumber: parsed.secretNumber || "591",
        },
        endingHook: parsed.endingHook || "真相揭曉，但真正的幕後黑手依然潛伏在濃霧中...",
        unlockedClueItem: parsed.unlockedClueItem || "AI 生成極密檔案",
      };

      onStartGeneratedCase(customLevel);
    } catch {
      setErrorMsg("生成案件時遇到訊號波動，請再試一次或點擊預設主題！");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-3xl border border-purple-500/40 bg-slate-900 shadow-2xl p-6 text-slate-100 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-200 hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-purple-100 shadow-lg shadow-purple-900/40">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-purple-100">
              Gemini AI 無限懸案生成器
            </h3>
            <p className="text-base text-purple-300/70">
              輸入任意主題，讓 Gemini 生成獨一無二的倫敦謎案與 1A2B 破譯關卡
            </p>
          </div>
        </div>

        {/* Input & Presets */}
        <div className="space-y-3">
          <label className="block text-base font-serif font-bold text-amber-200">
            設定案件主題或情境：
          </label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="例如：開切爾西城堡幽靈案..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-purple-500/30 text-purple-100 text-base font-serif outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20"
          />

          <div className="space-y-1.5">
            <span className="text-base text-slate-200 font-serif">快速選擇預設主題：</span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setTheme(p)}
                  className="px-2.5 py-1 rounded-xl text-base font-serif border border-purple-500/20 bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {errorMsg && (
          <p className="text-base text-rose-400 font-bold text-center">
            ⚠️ {errorMsg}
          </p>
        )}

        <button
          onClick={handleGenerateCase}
          disabled={loading || !theme.trim()}
          className="w-full py-3.5 rounded-2xl font-serif font-bold text-base text-purple-100 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-600 hover:to-indigo-600 border border-purple-400/40 shadow-xl shadow-purple-950/50 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-purple-300" />
              <span>Gemini 正在撰寫案件檔案與生成 1A2B 密碼...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>立即調閱生成案件並開始調查</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
