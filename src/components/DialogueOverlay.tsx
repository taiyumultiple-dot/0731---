import React, { useState, useEffect } from "react";
import { DialogueNode } from "../types";
import { ChevronDown, Sparkles } from "lucide-react";

interface DialogueOverlayProps {
  dialogues: DialogueNode[];
  onComplete: () => void;
}

export const DialogueOverlay: React.FC<DialogueOverlayProps> = ({
  dialogues,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentDialogue = dialogues[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
  }, [dialogues]);

  if (!currentDialogue) return null;

  const handleNext = () => {
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const getSpeakerColor = (speaker: string) => {
    if (speaker.includes("王小文") || speaker.includes("神秘女子"))
      return "text-purple-300 border-purple-500/40 bg-purple-950/90 shadow-purple-900/40";
    if (speaker.includes("可華"))
      return "text-sky-300 border-sky-500/40 bg-sky-950/90 shadow-sky-900/40";
    if (speaker.includes("同事"))
      return "text-emerald-300 border-emerald-500/40 bg-emerald-950/90 shadow-emerald-900/40";
    return "text-amber-300 border-amber-500/40 bg-amber-950/90 shadow-amber-900/40";
  };

  const getCharacterImage = (portrait: string) => {
    switch (portrait) {
      case "charlotte":
        return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
      case "detective":
        return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80";
      case "police":
        return "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80";
      default:
        return "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80";
    }
  };

  return (
    <div
      onClick={handleNext}
      className="fixed inset-0 z-50 flex flex-col justify-end p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md cursor-pointer select-none animate-in fade-in duration-300"
    >
      {/* Background Character Illustration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img
          src={getCharacterImage(currentDialogue.portrait)}
          alt={currentDialogue.speaker}
          className="h-[80vh] max-w-lg object-cover object-top opacity-75 filter contrast-125 saturate-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto w-full mb-12 relative z-10 space-y-3">
        {/* Speaker Name Tag */}
        <div className="flex items-center gap-2">
          <div
            className={`px-4 py-1.5 rounded-xl border text-sm font-bold font-serif shadow-lg ${getSpeakerColor(
              currentDialogue.speaker
            )}`}
          >
            {currentDialogue.speaker}
          </div>
        </div>

        {/* Dialogue Quote Box */}
        <div className="relative p-6 rounded-3xl border border-purple-500/30 bg-slate-900/95 backdrop-blur-xl shadow-2xl text-slate-100 space-y-4">
          <p className="text-sm sm:text-base font-serif leading-relaxed text-purple-100 tracking-wide font-medium">
            {currentDialogue.text}
          </p>

          <div className="flex items-center justify-between pt-2 text-[11px] text-purple-400/80 font-mono">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              劇情演繹 ({currentIndex + 1}/{dialogues.length})
            </span>
            <span className="flex items-center gap-0.5 animate-bounce text-amber-300 font-serif font-bold">
              點擊繼續 <ChevronDown className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
