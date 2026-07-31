import React from "react";

export const AtmosphereEffects: React.FC = () => {
  // 產生一批隨機漂浮粒子的參數（只計算一次）
  const particles = React.useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 14 + 10,
      delay: Math.random() * 10,
      driftX: (Math.random() - 0.5) * 60,
      opacity: Math.random() * 0.4 + 0.15,
      hue: Math.random() > 0.5 ? "rgba(196,181,253," : "rgba(147,197,253,",
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,15,0.85)_100%)]" />

      {/* Breathing Gaslamp Ambient Light Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,119,6,0.12),transparent_60%)] animate-pulse duration-10000" />

      {/* Floating Fog Particles Layer */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_80%,rgba(148,163,184,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(100,116,139,0.15),transparent_50%)] animate-pulse duration-7000" />

      {/* Drifting Star Dust Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-drift"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: `${p.hue}${p.opacity})`,
            boxShadow: `0 0 ${p.size * 2}px ${p.hue}${p.opacity})`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            // @ts-ignore custom CSS vars for the keyframe
            "--drift-x": `${p.driftX}px`,
            "--drift-y": `-140px`,
            "--particle-opacity": p.opacity,
          } as React.CSSProperties}
        />
      ))}

      {/* Fine Paper / Leather Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
