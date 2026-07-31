import React from "react";
import { X, Award, CheckCircle2, Coins, Zap } from "lucide-react";
import { DAILY_QUESTS } from "../data/storyData";
import { UserProgress } from "../types";

interface QuestModalProps {
  userProgress: UserProgress;
  onClaimReward: (questId: string, coins: number, stamina: number) => void;
  onClose: () => void;
}

export const QuestModal: React.FC<QuestModalProps> = ({
  userProgress,
  onClaimReward,
  onClose,
}) => {
  const completedCount = userProgress.completedLevelIds.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-3xl border border-amber-500/30 bg-slate-900 shadow-2xl p-6 text-slate-100 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-amber-100">
                蘇格蘭場偵探考核與獎勵
              </h3>
              <p className="text-xs text-amber-200/70">
                完成案件調查，獲得體力補充與金幣津貼
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

        {/* Quest List */}
        <div className="space-y-3">
          {DAILY_QUESTS.map((q) => {
            const isCompleted = completedCount >= q.requiredCompletedCount;
            const isClaimed = userProgress.claimedQuestIds.includes(q.id);

            return (
              <div
                key={q.id}
                className="p-4 rounded-2xl border border-amber-500/20 bg-slate-950/70 flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="text-sm font-serif font-bold text-amber-100 flex items-center gap-2">
                    <span>{q.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      ({Math.min(completedCount, q.requiredCompletedCount)}/{q.requiredCompletedCount})
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{q.desc}</p>
                  <div className="flex items-center gap-3 text-[11px] font-mono pt-1 text-amber-300">
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Coins className="w-3.5 h-3.5" /> +{q.rewardCoins}
                    </span>
                    <span className="flex items-center gap-1 text-rose-400">
                      <Zap className="w-3.5 h-3.5" /> +{q.rewardStamina} 體力
                    </span>
                  </div>
                </div>

                <div>
                  {isClaimed ? (
                    <span className="px-3 py-1.5 rounded-xl text-xs font-serif font-bold bg-slate-800 text-slate-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 已領取
                    </span>
                  ) : isCompleted ? (
                    <button
                      onClick={() =>
                        onClaimReward(q.id, q.rewardCoins, q.rewardStamina)
                      }
                      className="px-4 py-2 rounded-xl text-xs font-serif font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all active:scale-95"
                    >
                      領取獎勵
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl text-xs font-serif text-slate-500 bg-slate-900 border border-slate-800">
                      未達成
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
