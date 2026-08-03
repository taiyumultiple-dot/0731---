import React from "react";
import { X, Film } from "lucide-react";

interface VideoPlayerModalProps {
  videoUrl: string;
  posterUrl?: string;
  title: string;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  videoUrl,
  posterUrl,
  title,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-3xl border border-purple-500/30 bg-slate-900 shadow-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-200 font-serif font-bold">
            <Film className="w-4 h-4 text-purple-400" />
            <span>{title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-300 hover:text-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden border border-purple-500/20 bg-black">
          <video
            src={videoUrl}
            poster={posterUrl}
            controls
            playsInline
            className="w-full h-auto max-h-[70vh] block"
          >
            您的瀏覽器不支援影片播放。
          </video>
        </div>

        <p className="text-base text-center text-slate-300">
          這是示範用的公開測試影片。等你把正式動畫給我，我會直接替換成真正的內容。
        </p>
      </div>
    </div>
  );
};
