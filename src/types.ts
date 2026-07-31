export type PuzzleType = "1a2b" | "cipher" | "logic" | "pattern";

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
}

export interface QuestItem {
  id: string;
  title: string;
  desc: string;
  rewardCoins: number;
  rewardStamina: number;
  requiredCompletedCount: number;
}
