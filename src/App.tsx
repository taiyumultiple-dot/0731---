import React, { useState, useEffect } from "react";
import { UserProgress, VolumeData, LevelData } from "./types";
import { STORY_VOLUMES } from "./data/storyData";
import { AtmosphereEffects } from "./components/AtmosphereEffects";
import { HeaderNav } from "./components/HeaderNav";
import { HubView } from "./components/HubView";
import { CaseSelectView } from "./components/CaseSelectView";
import { PuzzleView } from "./components/PuzzleView";
import { VictoryModal } from "./components/VictoryModal";
import { QuestModal } from "./components/QuestModal";
import { AIGeneratedCaseModal } from "./components/AIGeneratedCaseModal";
import { InventoryModal } from "./components/InventoryModal";
import { LandingModal } from "./components/LandingModal";
import { BottomNavBar, NavTab } from "./components/BottomNavBar";
import { ShopModal } from "./components/ShopModal";
import { SettingsModal } from "./components/SettingsModal";
import { CaseBriefModal } from "./components/CaseBriefModal";
import { StoryTeaserView } from "./components/StoryTeaserView";
import { ChoiceMomentView } from "./components/ChoiceMomentView";
import { StoryOverviewView } from "./components/StoryOverviewView";
import { FiveDoorsView } from "./components/FiveDoorsView";
import { ChapterIntroView } from "./components/ChapterIntroView";
import { soundFx } from "./utils/audio";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Game Progress State
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem("multiverse_exploration_progress_v3");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return {
      stamina: 85,
      maxStamina: 100,
      coins: 200,
      completedLevelIds: [1],
      currentLevelId: 2,
      unlockedClues: ["GLITCH 故障門的鑰匙", "高中課本的信紙"],
      detectiveRank: "初入多重宇宙",
      claimedQuestIds: [],
    };
  });

  useEffect(() => {
    localStorage.setItem(
      "multiverse_exploration_progress_v3",
      JSON.stringify(userProgress)
    );
  }, [userProgress]);

  // View States
  type ViewState =
    | "hub"
    | "case-select"
    | "puzzle"
    | "story-teaser"
    | "story-overview"
    | "choice-moment"
    | "chapter-intro"
    | "five-doors";

  const [currentView, setCurrentView] = useState<ViewState>("hub");

  // Centralized screen navigation helper — plays a whoosh transition sound
  const goTo = (view: ViewState) => {
    soundFx.playSwoosh();
    setCurrentView(view);
  };
  const [activeNavTab, setActiveNavTab] = useState<NavTab>("home");

  const [selectedVolume, setSelectedVolume] = useState<VolumeData | null>(
    STORY_VOLUMES[0]
  );
  const [activeLevel, setActiveLevel] = useState<LevelData | null>(null);

  // Modals
  const [landingModalOpen, setLandingModalOpen] = useState(true);
  const [caseBriefModal, setCaseBriefModal] = useState<LevelData | null>(null);

  const [victoryModalOpen, setVictoryModalOpen] = useState(false);
  const [questModalOpen, setQuestModalOpen] = useState(false);
  const [aiCaseModalOpen, setAiCaseModalOpen] = useState(false);
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [shopModalOpen, setShopModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Sound Toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundFx.enabled = next;
      soundFx.toggleMusic(next);
      return next;
    });
  };

  // Rank Upgrade Checker
  const updateRank = (completedCount: number) => {
    if (completedCount >= 5) return "多重宇宙主宰者";
    if (completedCount >= 3) return "平行世界穿越者";
    if (completedCount >= 1) return "生命抉擇者";
    return "初入多重宇宙";
  };

  // Bottom Navigation Bar Tab Switching
  const handleTabChange = (tab: NavTab) => {
    soundFx.playClick();
    setActiveNavTab(tab);

    if (tab === "home") {
      goTo("hub");
    } else if (tab === "cases") {
      goTo("five-doors");
    } else if (tab === "characters") {
      setInventoryModalOpen(true);
    } else if (tab === "daily") {
      setQuestModalOpen(true);
    } else if (tab === "settings") {
      setSettingsModalOpen(true);
    }
  };

  // Level Brief Selection
  const handleOpenCaseDetail = (level: LevelData) => {
    soundFx.playClick();
    setCaseBriefModal(level);
  };

  // Start Level Investigation
  const handleStartInvestigation = (level: LevelData) => {
    soundFx.playClick();
    setCaseBriefModal(null);

    if (userProgress.stamina < level.staminaCost) {
      alert("心力不足，請前往商店補給！");
      setShopModalOpen(true);
      return;
    }

    // Deduct stamina
    setUserProgress((prev) => ({
      ...prev,
      stamina: Math.max(0, prev.stamina - level.staminaCost),
      currentLevelId: level.id,
    }));

    setActiveLevel(level);
    goTo("puzzle");
  };

  // Quick Continue from Hub
  const handleQuickContinue = () => {
    const allLevels = STORY_VOLUMES.flatMap((v) =>
      v.chapters.flatMap((c) => c.levels)
    );
    const nextLevel =
      allLevels.find((l) => l.id === userProgress.currentLevelId) ||
      allLevels[0];

    handleOpenCaseDetail(nextLevel);
  };

  // Puzzle Success Victory Handler
  const handleLevelVictory = () => {
    if (!activeLevel) return;
    soundFx.playVictory();

    const isFirstTime = !userProgress.completedLevelIds.includes(
      activeLevel.id
    );

    setUserProgress((prev) => {
      const newCompleted = isFirstTime
        ? [...prev.completedLevelIds, activeLevel.id]
        : prev.completedLevelIds;

      const newClues =
        activeLevel.unlockedClueItem &&
        !prev.unlockedClues.includes(activeLevel.unlockedClueItem)
          ? [...prev.unlockedClues, activeLevel.unlockedClueItem]
          : prev.unlockedClues;

      return {
        ...prev,
        coins: prev.coins + (isFirstTime ? activeLevel.coinReward : 50),
        completedLevelIds: newCompleted,
        unlockedClues: newClues,
        currentLevelId: activeLevel.id + 1,
        detectiveRank: updateRank(newCompleted.length),
      };
    });

    setVictoryModalOpen(true);
  };

  // Next Level Handler from Victory Modal
  const handleNextLevel = () => {
    setVictoryModalOpen(false);
    if (!activeLevel) return;

    const allLevels = STORY_VOLUMES.flatMap((v) =>
      v.chapters.flatMap((c) => c.levels)
    );
    const currentIdx = allLevels.findIndex((l) => l.id === activeLevel.id);

    if (currentIdx >= 0 && currentIdx < allLevels.length - 1) {
      handleOpenCaseDetail(allLevels[currentIdx + 1]);
    } else {
      goTo("five-doors");
    }
  };

  // Claim Quest Reward
  const handleClaimQuestReward = (
    questId: string,
    rewardCoins: number,
    rewardStamina: number
  ) => {
    soundFx.playVictory();
    setUserProgress((prev) => ({
      ...prev,
      coins: prev.coins + rewardCoins,
      stamina: Math.min(prev.maxStamina, prev.stamina + rewardStamina),
      claimedQuestIds: [...prev.claimedQuestIds, questId],
    }));
  };

  // Buy Stamina Potion in Shop
  const handleBuyStamina = (cost: number, staminaAmount: number) => {
    soundFx.playVictory();
    setUserProgress((prev) => ({
      ...prev,
      coins: Math.max(0, prev.coins - cost),
      stamina: Math.min(prev.maxStamina, prev.stamina + staminaAmount),
    }));
  };

  // Reset Progress
  const handleResetProgress = () => {
    const defaultProgress = {
      stamina: 85,
      maxStamina: 100,
      coins: 200,
      completedLevelIds: [],
      currentLevelId: 1,
      unlockedClues: ["GLITCH 故障門的鑰匙"],
      detectiveRank: "初入多重宇宙",
      claimedQuestIds: [],
    };
    setUserProgress(defaultProgress);
    localStorage.removeItem("multiverse_exploration_progress_v3");
    goTo("hub");
    setLandingModalOpen(true);
  };

  // AI Generated Custom Case Start
  const handleStartGeneratedCase = (customLevel: LevelData) => {
    setAiCaseModalOpen(false);
    handleOpenCaseDetail(customLevel);
  };

  return (
    <div className="min-h-screen relative font-serif text-amber-100 bg-slate-950 transition-colors duration-500 selection:bg-purple-500 selection:text-slate-950 pb-20">
      {/* Multiverse Atmosphere Glitch & Particle Effects */}
      <AtmosphereEffects />

      {/* Landing Start Modal */}
      {landingModalOpen && (
        <LandingModal
          onStartGame={() => {
            soundFx.playClick();
            soundFx.startAmbient();
            setLandingModalOpen(false);
          }}
        />
      )}

      {/* Global Header Nav */}
      <HeaderNav
        onBackToOffice={
          currentView !== "hub" ? () => goTo("hub") : undefined
        }
        stamina={userProgress.stamina}
        maxStamina={userProgress.maxStamina}
        coins={userProgress.coins}
        onOpenQuests={() => setQuestModalOpen(true)}
        onOpenAICaseGenerator={() => setAiCaseModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        title="人生探索所"
      />

      {/* Main View Switcher */}
      <main className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
        {currentView === "hub" && (
          <HubView
            userProgress={userProgress}
            onSelectVolume={(vol) => {
              setSelectedVolume(vol);
              goTo("case-select");
            }}
            onOpenInventory={() => setInventoryModalOpen(true)}
            onOpenQuests={() => setQuestModalOpen(true)}
            onOpenAICaseGenerator={() => setAiCaseModalOpen(true)}
            onQuickContinue={handleQuickContinue}
            onOpenCaseDetail={handleOpenCaseDetail}
            onNavigateToChapterIntro={() => goTo("chapter-intro")}
            onNavigateToStoryOverview={() => goTo("story-overview")}
            onNavigateToChoiceMoment={() => goTo("choice-moment")}
            onNavigateToFiveDoors={() => goTo("five-doors")}
            onNavigateToStoryTeaser={() => goTo("story-teaser")}
          />
        )}

        {currentView === "story-teaser" && (
          <StoryTeaserView
            onStartExploration={() => goTo("choice-moment")}
            onContinueJourney={() => goTo("five-doors")}
          />
        )}

        {currentView === "choice-moment" && (
          <ChoiceMomentView
            onSelectYes={() => goTo("five-doors")}
            onSelectNo={() => alert("「維持輪迴：你選擇留在辦公室裏，但隨時可按 YES 改變命運。」")}
            onBack={() => goTo("hub")}
            stamina={userProgress.stamina}
            coins={userProgress.coins}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
          />
        )}

        {currentView === "story-overview" && (
          <StoryOverviewView
            onStartExploration={() => goTo("choice-moment")}
            onBackToChapters={() => goTo("five-doors")}
            stamina={userProgress.stamina}
            coins={userProgress.coins}
          />
        )}

        {currentView === "chapter-intro" && (
          <ChapterIntroView
            onViewSummary={() => goTo("story-overview")}
            onContinueChapter={() => goTo("five-doors")}
            onBack={() => goTo("hub")}
            stamina={userProgress.stamina}
            coins={userProgress.coins}
          />
        )}

        {currentView === "five-doors" && (
          <FiveDoorsView
            completedLevelIds={userProgress.completedLevelIds}
            onSelectLevel={handleOpenCaseDetail}
            onBack={() => goTo("hub")}
            stamina={userProgress.stamina}
            coins={userProgress.coins}
          />
        )}

        {currentView === "case-select" && selectedVolume && (
          <CaseSelectView
            volume={selectedVolume}
            userProgress={userProgress}
            onSelectLevel={handleOpenCaseDetail}
            onBack={() => goTo("hub")}
          />
        )}

        {currentView === "puzzle" && activeLevel && (
          <PuzzleView
            level={activeLevel}
            onSuccess={handleLevelVictory}
            stamina={userProgress.stamina}
          />
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeNavTab}
        onTabChange={handleTabChange}
      />

      {/* Case Brief Modal */}
      {caseBriefModal && (
        <CaseBriefModal
          level={caseBriefModal}
          onContinue={() => handleStartInvestigation(caseBriefModal)}
          onBackToChapters={() => {
            setCaseBriefModal(null);
            goTo("five-doors");
          }}
          onClose={() => setCaseBriefModal(null)}
        />
      )}

      {/* Modals */}
      {victoryModalOpen && activeLevel && (
        <VictoryModal
          level={activeLevel}
          onNextLevel={handleNextLevel}
          onBackToHub={() => {
            setVictoryModalOpen(false);
            goTo("five-doors");
          }}
        />
      )}

      {questModalOpen && (
        <QuestModal
          userProgress={userProgress}
          onClaimReward={handleClaimQuestReward}
          onClose={() => setQuestModalOpen(false)}
        />
      )}

      {aiCaseModalOpen && (
        <AIGeneratedCaseModal
          onStartGeneratedCase={handleStartGeneratedCase}
          onClose={() => setAiCaseModalOpen(false)}
        />
      )}

      {inventoryModalOpen && (
        <InventoryModal
          unlockedClues={userProgress.unlockedClues}
          onClose={() => setInventoryModalOpen(false)}
        />
      )}

      {shopModalOpen && (
        <ShopModal
          coins={userProgress.coins}
          stamina={userProgress.stamina}
          maxStamina={userProgress.maxStamina}
          onBuyStamina={handleBuyStamina}
          onClose={() => setShopModalOpen(false)}
        />
      )}

      {settingsModalOpen && (
        <SettingsModal
          userProgress={userProgress}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onResetProgress={handleResetProgress}
          onClose={() => setSettingsModalOpen(false)}
          onOpenAuth={() => {
            setSettingsModalOpen(false);
            setLandingModalOpen(true);
          }}
        />
      )}
    </div>
  );
}
