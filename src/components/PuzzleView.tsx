import React, { useState } from "react";
import { LevelData } from "../types";
import { Puzzle1A2B } from "./Puzzle1A2B";
import { PuzzleCipher } from "./PuzzleCipher";
import { PuzzleLogic } from "./PuzzleLogic";
import { PuzzleSyllogism } from "./PuzzleSyllogism";
import { DialogueOverlay } from "./DialogueOverlay";
import { FileText, MessageSquare, Sparkles } from "lucide-react";

interface PuzzleViewProps {
  level: LevelData;
  onSuccess: () => void;
  stamina: number;
}

export const PuzzleView: React.FC<PuzzleViewProps> = ({
  level,
  onSuccess,
  stamina,
}) => {
  const [showDialogue, setShowDialogue] = useState(
    level.openingDialogue && level.openingDialogue.length > 0
  );

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-2">
      {/* Dialogue Cutscene Overlay */}
      {showDialogue && (
        <DialogueOverlay
          dialogues={level.openingDialogue}
          onComplete={() => setShowDialogue(false)}
        />
      )}

      {/* Case Header Card */}
      <div className="p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 shadow-2xl space-y-3">
        <div className="flex items-center justify-between text-base font-serif">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30">
            {level.subtitle}
          </span>
          <span className="text-amber-400 font-bold">
            委託人：{level.clientName}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-100">
          {level.title}
        </h2>

        <p className="text-base sm:text-base font-serif text-amber-200/90 leading-relaxed p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/20">
          {level.narrative}
        </p>

        {level.openingDialogue && level.openingDialogue.length > 0 && (
          <button
            onClick={() => setShowDialogue(true)}
            className="text-base font-serif text-purple-300 hover:text-purple-200 flex items-center gap-1 underline"
          >
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            <span>重播對話紀錄</span>
          </button>
        )}
      </div>

      {/* Active Puzzle Render */}
      {level.puzzleConfig.type === "1a2b" && (
        <Puzzle1A2B
          config={level.puzzleConfig}
          onSuccess={onSuccess}
          stamina={stamina}
        />
      )}

      {level.puzzleConfig.type === "cipher" && (
        <PuzzleCipher config={level.puzzleConfig} onSuccess={onSuccess} />
      )}

      {level.puzzleConfig.type === "logic" && (
        <PuzzleLogic config={level.puzzleConfig} onSuccess={onSuccess} />
      )}

      {level.puzzleConfig.type === "syllogism" && (
        <PuzzleSyllogism config={level.puzzleConfig} onSuccess={onSuccess} />
      )}
    </div>
  );
};
