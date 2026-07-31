import React from "react";
import { Home, User, BookOpen, Calendar, Settings } from "lucide-react";

export type NavTab = "home" | "characters" | "cases" | "daily" | "settings";

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "home" as NavTab, label: "首頁", icon: Home },
    { id: "characters" as NavTab, label: "人物", icon: User },
    { id: "cases" as NavTab, label: "篇章", icon: BookOpen },
    { id: "daily" as NavTab, label: "每日", icon: Calendar },
    { id: "settings" as NavTab, label: "設定", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-t border-purple-500/20 px-3 py-2 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center py-1 px-3 transition-all group"
            >
              {/* Highlight Glow for Active Tab */}
              {isActive && (
                <div className="absolute -top-1 w-10 h-10 rounded-full bg-purple-500/20 blur-md pointer-events-none" />
              )}

              <div
                className={`relative z-10 p-1.5 rounded-2xl transition-all ${
                  isActive
                    ? "text-purple-300 scale-110 bg-purple-950/80 border border-purple-500/30"
                    : "text-slate-400 group-hover:text-purple-200/80"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span
                className={`text-[11px] font-serif transition-colors mt-0.5 ${
                  isActive
                    ? "text-purple-200 font-bold"
                    : "text-slate-400 group-hover:text-purple-200/70"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
