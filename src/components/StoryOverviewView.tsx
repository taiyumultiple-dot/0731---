import React, { useRef, useState } from "react";
import { ChevronLeft, Heart, Sparkles, Bus, Zap, Briefcase, Monitor, DoorClosed, CheckCircle2, Building2, RotateCcw, Compass, MessageCircle, Volume2, VolumeX } from "lucide-react";
import { IMG_DUO } from "../data/characterFullBody";

interface StoryOverviewViewProps {
  onStartExploration: () => void;
  onBackToChapters: () => void;
  onVideoEnd: () => void;
  stamina: number;
  coins: number;
}

export const StoryOverviewView: React.FC<StoryOverviewViewProps> = ({
  onStartExploration,
  onBackToChapters,
  onVideoEnd,
  stamina,
  coins,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };
  const storyTimeline = [
    {
      icon: Bus,
      text: "車上，可華望著疲憊開車的父親，半夢半醒間想著自己是否也會變成這樣的大人。窗外忽然爆發刺眼強光，將他整個世界吞沒——「到底發生了什麼……啊！！」",
    },
    {
      icon: Zap,
      text: "光芒中，他以高中生模樣在失重的異次元裡劇烈旋轉墜落，穿梭過飛舞考卷的金色氣旋、巨大鑰匙門縫、古色哲學長廊……",
    },
    {
      icon: Briefcase,
      text: "『啪！』可華重重跌落在堆滿文件的辦公桌上驚醒，抬頭卻是陌生的辦公格子間，自己也穿著皺巴巴的西裝——「這、這是哪裡？！」",
    },
    {
      icon: MessageCircle,
      text: "同事拍拍他的肩膀，丟下一疊公文袋：「又在做夢了，上班不要偷懶耶！」可華這才驚覺自己的手掌爬滿了中年人的皺紋。",
    },
    {
      icon: Monitor,
      text: "螢幕反射出滄桑的中年臉孔，可華崩潰大喊：「我還是高中生啊！」同事只冷冷回了句：「事沒做完別想走。」轉身離去。",
    },
    {
      icon: DoorClosed,
      text: "頹然倒在椅子上的可華，電腦螢幕突然跳出黑色視窗——「你真的想要改變？」隨即傳來一個選項檔案：探索，YES／NO。",
    },
    {
      icon: Heart,
      text: "滑鼠移向兩端，兩扇門具現於眼前：NO 門是父親般日復一日的輪迴人生；YES 門則透出未知而恐怖的氣息，門縫中隱約有雙雙紅眼窺視。",
    },
    {
      icon: CheckCircle2,
      text: "可華顫抖著按下 YES！世界如電腦故障般爆裂閃爍，長大後的小文從門中優雅步出，微笑伸出手：「答對了。跟著我！」",
    },
    {
      icon: Building2,
      text: "可華握住她的手踏入門中，光芒散去，兩人置身於幾何折疊、如《全面啟動》般懸浮的巨大城市。小文轉身指向五扇古典鑰匙門：「來吧。我們必須穿過這五道關卡，才能回到真正的家。」",
    },
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-24 relative z-10 text-slate-100">
      {/* Top Header Bar (Matching Screenshot 2) */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-indigo-500/20 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToChapters}
            className="p-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-200 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-indigo-300" />
          </button>
          <h1 className="text-lg font-bold font-serif text-amber-100">
            故事總說
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-200 text-base font-mono">
            <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
            <span>心力</span>
            <span className="font-bold text-purple-100">{stamina}</span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-200 text-base font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>星點</span>
            <span className="font-bold text-amber-300">{coins}</span>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-base font-serif text-slate-200 text-center">
        了解篇章全貌，找回探索的初心。
      </p>

      {/* Hero Header Box with Autoplay Opening Animation */}
      <div className="relative rounded-3xl border-2 border-indigo-500/30 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Full-Width Autoplay Video */}
        <div className="relative w-full h-[300px] sm:h-[420px] bg-slate-950 group">
          <video
            ref={videoRef}
            src="/assets/videos/chapter0_intro.mp4"
            poster={IMG_DUO}
            autoPlay
            muted={muted}
            playsInline
            onEnded={onVideoEnd}
            className="w-full h-full object-contain bg-black"
          />
          <button
            onClick={toggleMute}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-slate-950/80 border border-purple-400/40 text-purple-200 opacity-80 hover:opacity-100 transition-opacity"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-base font-serif font-bold bg-slate-950/80 text-purple-200 border border-purple-400/30">
            播放中，結束後自動進入旅程……
          </div>
        </div>

        <div className="p-6 sm:p-7 space-y-2 text-left">
          <div className="inline-block px-3 py-1 rounded-full text-base font-mono font-bold text-purple-300 bg-purple-950/80 border border-purple-500/30">
            第 0 篇
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif bg-gradient-to-r from-amber-100 via-purple-100 to-indigo-200 bg-clip-text text-transparent">
            多重宇宙的抉擇
          </h2>
          <p className="text-base font-serif text-slate-300/80">
            神秘通話者發來了一個選項。
          </p>
        </div>
      </div>

      <p className="text-base text-center text-slate-300/70 -mt-3">
        動畫播放結束後會自動進入對話與關卡，也可以先點下方「開始探索」直接跳過。
      </p>

      {/* Main Story Summary Container (Matching Screenshot 2) */}
      <div className="p-6 rounded-3xl border border-indigo-500/30 bg-slate-900/90 shadow-2xl space-y-5 text-left backdrop-blur-xl">
        {/* Title Badge */}
        <div className="flex items-center justify-center gap-2 text-base font-bold font-serif text-amber-200 border-b border-indigo-500/20 pb-3">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>✦ 故事簡介 ✦</span>
          <Sparkles className="w-4 h-4 text-purple-400" />
        </div>

        {/* Timeline Items */}
        <div className="space-y-4">
          {storyTimeline.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-purple-950/80 border border-purple-500/30 text-purple-300 shrink-0 shadow-md">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-base font-serif text-slate-300/90 leading-relaxed pt-0.5">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Tagline Quote */}
        <div className="pt-3 border-t border-indigo-500/20 text-center text-base font-serif text-amber-200/90 font-medium">
          ✦ 每一次選擇，都是看見自己、理解生命的一次第練習。✦
        </div>
      </div>

      {/* Bottom Action Bar (Matching Screenshot 2) */}
      <div className="grid grid-cols-2 gap-4 pt-1">
        <button
          onClick={onBackToChapters}
          className="py-3.5 px-4 rounded-2xl font-serif font-bold text-base text-purple-200 bg-slate-950/80 hover:bg-slate-900 border border-purple-500/30 transition-all flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4 text-purple-400" />
          <span>重新選擇篇章</span>
        </button>

        <button
          onClick={onStartExploration}
          className="py-3.5 px-4 rounded-2xl font-serif font-bold text-base text-amber-100 bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 hover:from-purple-700 hover:to-indigo-700 border border-purple-400/40 shadow-xl shadow-purple-950/60 transition-all flex items-center justify-center gap-1.5 active:scale-98"
        >
          <Compass className="w-4 h-4 text-amber-300" />
          <span>開始探索</span>
        </button>
      </div>
    </div>
  );
};
