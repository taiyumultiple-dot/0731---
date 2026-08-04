export type PuzzleType = "1a2b" | "cipher" | "logic" | "pattern" | "syllogism" | "balance";

export interface BalanceChip {
  id: string;
  label: string;
  weight: number;
}

export interface SyllogismStatement {
  id: string;
  text: string;
  role: "major" | "minor" | "conclusion" | "fallacy";
  fallacyName?: string; // 若為謬誤，標示謬誤類型（答對後才揭曉）
}

export interface DialogueNode {
  speaker: string;
  text: string;
  // charlotte=成年王小文, client=高中王小文, detective=可華,
  // doctor=同事, suspect/police=神秘通話者（電腦螢幕）
  // 圖片對應請見 src/data/characterAssets.ts + DialogueOverlay.tsx
  portrait: "charlotte" | "client" | "detective" | "suspect" | "doctor" | "police";
}

export interface PuzzleGameConfig {
  type: PuzzleType;
  // For 1A2B
  digitsCount?: number; // 3 or 4
  secretNumber?: string; // e.g. "482"
  // For Cipher
  encryptedText?: string; // e.g. "EHNHU " -> "BAKER"
  solutionText?: string;
  cipherHint?: string;
  // For Logic Deduction
  clues?: string[];
  options?: { id: string; label: string; isCorrect: boolean; explanation: string }[];
  // For Syllogism (大前提-小前提-結論 排序 + 排除謬誤)
  syllogismStatements?: SyllogismStatement[];
  syllogismIntro?: string;
  // For Balance (天秤配重)
  balanceChips?: BalanceChip[];
  balanceIntro?: string;
}

export interface LevelData {
  id: number;
  volumeId: number;
  chapterId: number;
  title: string;
  subtitle: string;
  staminaCost: number;
  coinReward: number;
  narrative: string;
  openingDialogue: DialogueNode[];
  puzzleConfig: PuzzleGameConfig;
  endingHook: string;
  clientName: string;
  unlockedClueItem?: string;
  comingSoon?: boolean;
}

export interface ChapterData {
  id: number;
  volumeId: number;
  title: string;
  subtitle: string;
  levels: LevelData[];
}

export interface VolumeData {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  coverBadge: string;
  chapters: ChapterData[];
}

export interface UserProgress {
  stamina: number;
  maxStamina: number;
  coins: number;
  completedLevelIds: number[];
  currentLevelId: number;
  unlockedClues: string[];
  detectiveRank: string; // e.g., "實習偵探", "貝克街偵探", "皇家皇家大偵探", "名偵探"
  claimedQuestIds: string[];
  capturedMonsterIds: string[];
  weeklyCheckIns: number; // 0-7，本週已簽到天數
  lastCheckInDate: string | null; // ISO 日期字串，避免同一天重複簽到
  weeklyRewardClaimed: boolean;
}

export interface MonsterData {
  id: string;
  name: string;
  englishName: string;
  description: string;
  theme: string; // 對應的道門主題
  digitsCount: number;
}

export interface QuestItem {
  id: string;
  title: string;
  desc: string;
  rewardCoins: number;
  rewardStamina: number;
  requiredCompletedCount: number;
}
