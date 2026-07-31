import React, { useState } from "react";
import { Zap, Coins, ShoppingBag, X, CheckCircle2, Sparkles } from "lucide-react";

interface ShopModalProps {
  coins: number;
  stamina: number;
  maxStamina: number;
  onBuyStamina: (cost: number, staminaAmount: number) => void;
  onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  coins,
  stamina,
  maxStamina,
  onBuyStamina,
  onClose,
}) => {
  const [purchaseNotice, setPurchaseNotice] = useState<string | null>(null);

  const shopItems = [
    {
      id: "pot_small",
      title: "維多利亞濃縮提神藥劑",
      staminaAmount: 30,
      coinCost: 50,
      desc: "恢復 30 點精力，供連續進行 3 次案件推理探查。",
      icon: "🧪",
    },
    {
      id: "pot_large",
      title: "貝克街偵探皇家特調藥水",
      staminaAmount: 100,
      coinCost: 150,
      desc: "立即全額補滿精力 100 點，助你一舉破獲連環案件！",
      icon: "⚗️",
    },
  ];

  const handlePurchase = (cost: number, amount: number) => {
    if (coins < cost) {
      setPurchaseNotice("金幣不足！可前往「每日考核」完成調查領取金幣補給！");
      setTimeout(() => setPurchaseNotice(null), 3000);
      return;
    }

    onBuyStamina(cost, amount);
    setPurchaseNotice(`成功購買藥劑！獲得 +${amount} 精力！`);
    setTimeout(() => setPurchaseNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-6 rounded-3xl border border-amber-500/30 bg-slate-900/95 space-y-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold font-serif text-amber-100">
              維多利亞藥劑商店
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Resources Status */}
        <div className="flex items-center justify-around p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/20 text-base font-serif">
          <div className="flex items-center gap-2">
            <span className="text-slate-200">當前精力：</span>
            <span className="flex items-center gap-1 text-rose-400 font-mono font-bold">
              <Zap className="w-4 h-4 fill-rose-400" /> {stamina} / {maxStamina}
            </span>
          </div>
          <div className="w-px h-4 bg-amber-500/20" />
          <div className="flex items-center gap-2">
            <span className="text-slate-200">當前金幣：</span>
            <span className="flex items-center gap-1 text-yellow-400 font-mono font-bold">
              <Coins className="w-4 h-4 fill-yellow-400" /> {coins}
            </span>
          </div>
        </div>

        {purchaseNotice && (
          <div className="p-3 rounded-xl bg-amber-950/90 border border-amber-500/40 text-amber-200 text-base font-serif text-center animate-in fade-in">
            {purchaseNotice}
          </div>
        )}

        {/* Items List */}
        <div className="space-y-3">
          {shopItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-amber-500/20 bg-slate-950/60 hover:border-amber-400/50 transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-500/30 text-2xl flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-base font-bold font-serif text-amber-100">
                    {item.title}
                  </h3>
                  <p className="text-base font-serif text-amber-200/70 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handlePurchase(item.coinCost, item.staminaAmount)}
                className="px-4 py-2.5 rounded-xl font-serif font-bold text-base text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition-all shrink-0 flex items-center gap-1"
              >
                <Coins className="w-3.5 h-3.5 fill-slate-950" />
                <span>{item.coinCost}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
