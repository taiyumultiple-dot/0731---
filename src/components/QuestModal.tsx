import React from "react";
import { X, Award, CheckCircle2, Coins, Zap, CalendarCheck, Radar, Gift } from "lucide-react";
import { DAILY_QUESTS } from "../data/storyData";
import { UserProgress } from "../types";

interface QuestModalProps {
  userProgress: UserProgress;
  onClaimReward: (questId: string, coins: number, stamina: number) => void;
  onCheckIn: () => void;
  onClaimWeeklyReward: () => void;
  onStartTracking: () => void;
  onClose: () => void;
}

export const QuestModal: React.FC<QuestModalProps> = ({
  userProgress,
  onClaimReward,
  onCheckIn,
  onClaimWeeklyReward,
  onStartTracking,
  onClose,
}) => {
  const completedCount = userProgress.completedLevelIds.length;
  const today = new Date().toISOString().slice(0, 10);
  const alreadyCheckedInToday = userProgress.lastCheckInDate === today;
  const canClaimWeekly = userProgress.weeklyCheckIns >= 7 && !userProgress.weeklyRewardClaimed;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-3xl border border-amber-500/30 bg-slate-900 shadow-2xl p-6 text-slate-100 space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-amber-100">
                五門事務所 · 每日修練
              </h3>
              <p className="text-base text-amber-200/70">
                持續練習思辨與自我覺察，累積心力與星點獎勵
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-200 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 七日打卡日曆 */}
        <div className="p-4 rounded-2xl border border-indigo-500/30 bg-slate-950/70 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-base font-serif font-bold text-indigo-200">
              <CalendarCheck className="w-4 h-4 text-indigo-300" />
              <span>七日打卡日曆</span>
            </div>
            <span className="text-base font-mono text-indigo-300">
              {userProgress.weeklyCheckIns} / 7
            </span>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 7 }).map((_, idx) => {
              const filled = idx < userProgress.weeklyCheckIns;
              return (
                <div
                  key={idx}
                  className={`aspect-square rounded-lg border flex items-center justify-center text-base font-mono font-bold ${
                    filled
                      ? "border-indigo-400 bg-indigo-900/70 text-indigo-200"
                      : "border-slate-800 bg-slate-900 text-slate-300"
                  }`}
                >
                  {filled ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
              );
            })}
          </div>
          <p className="text-base text-slate-200">
            連續七天的自我提問練習，能幫助你更熟悉「思考的樂趣」。集滿七天，小文會給你一份特別的鼓勵。
          </p>
          {canClaimWeekly ? (
            <button
              onClick={onClaimWeeklyReward}
              className="w-full py-2.5 rounded-xl font-serif font-bold text-base text-slate-950 bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-300 hover:to-purple-300 shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Gift className="w-4 h-4" /> 領取七日獎勵 +500 星點
            </button>
          ) : (
            <button
              onClick={onCheckIn}
              disabled={alreadyCheckedInToday}
              className={`w-full py-2.5 rounded-xl font-serif font-bold text-base transition-all active:scale-95 ${
                alreadyCheckedInToday
                  ? "bg-slate-800 text-slate-300 cursor-not-allowed"
                  : "text-slate-950 bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-300 hover:to-purple-300 shadow-md"
              }`}
            >
              {alreadyCheckedInToday ? "今日已簽到" : "今日簽到"}
            </button>
          )}
        </div>

        {/* 怪獸追跡（迷惘化身追蹤） */}
        <div className="p-4 rounded-2xl border border-teal-500/30 bg-slate-950/70 space-y-2">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-teal-200">
            <Radar className="w-4 h-4 text-teal-300" />
            <span>迷惘化身追蹤</span>
          </div>
          <p className="text-base text-slate-200">
            除了五道門裡的核心迷惘，日常生活中也散落著大大小小的「迷惘化身」。追蹤並看清牠們，是持續練習思辨與自我覺察的方式。
          </p>
          <button
            onClick={onStartTracking}
            disabled={userProgress.stamina < 30}
            className={`w-full py-2.5 rounded-xl font-serif font-bold text-base transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
              userProgress.stamina < 30
                ? "bg-slate-800 text-slate-300 cursor-not-allowed"
                : "text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 shadow-md"
            }`}
          >
            <Radar className="w-4 h-4" />
            啟動追蹤（消耗 30 心力）
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
                  <div className="text-base font-serif font-bold text-amber-100 flex items-center gap-2">
                    <span>{q.title}</span>
                    <span className="text-base font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-200">
                      ({Math.min(completedCount, q.requiredCompletedCount)}/{q.requiredCompletedCount})
                    </span>
                  </div>
                  <p className="text-base text-slate-200">{q.desc}</p>
                  <div className="flex items-center gap-3 text-base font-mono pt-1 text-amber-300">
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Coins className="w-3.5 h-3.5" /> +{q.rewardCoins}
                    </span>
                    <span className="flex items-center gap-1 text-rose-400">
                      <Zap className="w-3.5 h-3.5" /> +{q.rewardStamina} 心力
                    </span>
                  </div>
                </div>

                <div>
                  {isClaimed ? (
                    <span className="px-3 py-1.5 rounded-xl text-base font-serif font-bold bg-slate-800 text-slate-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 已領取
                    </span>
                  ) : isCompleted ? (
                    <button
                      onClick={() =>
                        onClaimReward(q.id, q.rewardCoins, q.rewardStamina)
                      }
                      className="px-4 py-2 rounded-xl text-base font-serif font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all active:scale-95"
                    >
                      領取獎勵
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl text-base font-serif text-slate-300 bg-slate-900 border border-slate-800">
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
