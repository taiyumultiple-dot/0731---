import React, { useState } from "react";
import { X, User, Sparkles, DoorClosed, BookOpen } from "lucide-react";
import { CHARACTER_IMAGES } from "../data/characterAssets";

interface InventoryModalProps {
  unlockedClues: string[];
  onClose: () => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  unlockedClues,
  onClose,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"characters" | "items">("characters");

  const characters = [
    {
      id: "kehua",
      name: "可華",
      role: "主角 · 高中生",
      desc: "面臨升學與人生方向的選擇，害怕重蹈父親日復一日平庸生活的覆轍。在強光中穿梭於多重宇宙，跌入辦公室後按下了 YES，踏上尋找真正自我的旅程。",
      image: CHARACTER_IMAGES.KEHUA_OFFICE,
    },
    {
      id: "xiaowen",
      name: "王小文",
      role: "長大後的神秘女子 · 引導者",
      desc: "成熟自信的引導者。在可華按下 YES 門後微笑出現，引領他穿越折疊城市的五扇關卡。言談間隱約透漏著對可華過去與未來的深刻了解。",
      image: CHARACTER_IMAGES.WENWEN_BUST,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl border border-purple-500/30 bg-slate-900 shadow-2xl p-6 text-slate-100 space-y-4 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-amber-100">
                人物圖鑑與時空線索
              </h3>
              <p className="text-xs text-purple-200/70">
                多重宇宙的人物關係與探索到的關鍵線索
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Tabs */}
        <div className="flex rounded-2xl bg-slate-950/80 p-1 border border-purple-500/20 text-xs font-serif font-bold">
          <button
            onClick={() => setActiveSubTab("characters")}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeSubTab === "characters"
                ? "bg-purple-900/80 text-purple-200 border border-purple-400/30 shadow-md"
                : "text-slate-400 hover:text-purple-200"
            }`}
          >
            登場人物
          </button>
          <button
            onClick={() => setActiveSubTab("items")}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeSubTab === "items"
                ? "bg-purple-900/80 text-purple-200 border border-purple-400/30 shadow-md"
                : "text-slate-400 hover:text-purple-200"
            }`}
          >
            時空線索 ({unlockedClues.length})
          </button>
        </div>

        {/* Content */}
        {activeSubTab === "characters" ? (
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
            {characters.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl border border-purple-500/20 bg-slate-950/80 flex items-start gap-3"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-14 h-18 rounded-xl object-cover shrink-0 border border-purple-500/30"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm font-serif text-purple-200">
                      {c.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30">
                      {c.role}
                    </span>
                  </div>
                  <p className="text-[11px] font-serif text-slate-300/80 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
            {unlockedClues.length === 0 ? (
              <div className="py-8 text-center space-y-2 text-slate-500">
                <p className="text-xs font-serif">尚無獲得的時空線索。</p>
                <p className="text-[11px]">完成篇章關卡即可解鎖平行宇宙關鍵線索！</p>
              </div>
            ) : (
              unlockedClues.map((clue, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-purple-500/20 bg-slate-950/80 flex items-center gap-3 text-xs font-serif text-amber-100"
                >
                  <div className="p-2 rounded-xl bg-purple-950 text-purple-300 border border-purple-500/30">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-purple-200">{clue}</div>
                    <span className="text-[10px] text-slate-400">已歸檔於時空圖鑑</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
