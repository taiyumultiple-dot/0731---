// Web Audio API Synthesizer for 人生探索所 sound effects + ambient music

class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public musicEnabled: boolean = true;

  private musicNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private musicLfo: OscillatorNode | null = null;
  private musicMasterGain: GainNode | null = null;
  private musicPlaying = false;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx?.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public playClick() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio context suspended or user interaction needed
    }
  }

  /** Soft, subtle hover tick — meant to be used sparingly on primary interactive elements */
  public playHover() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }

  /** Whoosh transition sound used when switching between screens */
  public playSwoosh() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2200, this.ctx.currentTime + 0.3);
      filter.Q.value = 0.8;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + 0.3);
    } catch {
      // Ignore
    }
  }

  /** Heavy creaking door sound — used for the five-doors / choice-moment screens */
  public playDoor() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(90, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(55, this.ctx.currentTime + 0.6);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(500, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.14, this.ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    } catch {
      // Ignore
    }
  }

  /** Low buzzer used for incorrect puzzle answers */
  public playError() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      [180, 140].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.12 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.12);
        osc.stop(this.ctx.currentTime + idx * 0.12 + 0.15);
      });
    } catch {
      // Ignore
    }
  }

  public playVictory() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.1 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.3);
      });
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * Ambient background pad — a slowly shifting minor-key drone built from a few
   * detuned oscillators + a slow LFO on the filter, meant to loop indefinitely
   * behind the UI. Must be started from a user-gesture handler (browser autoplay policy).
   */
  public startAmbient() {
    if (!this.musicEnabled || this.musicPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0, this.ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 2.5);
      master.connect(this.ctx.destination);
      this.musicMasterGain = master;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 900;
      filter.connect(master);

      // Slow LFO sweeping the filter for a "breathing" pad feel
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 0.05;
      lfoGain.gain.value = 300;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      this.musicLfo = lfo;

      // A minor-ish stacked chord: A2, C3, E3, A3 (slightly detuned pairs for width)
      const freqs = [110, 110.6, 130.8, 164.8, 220];
      freqs.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.value = freq;

        const gain = this.ctx.createGain();
        gain.gain.value = 0.5 / freqs.length;

        osc.connect(gain);
        gain.connect(filter);
        osc.start();
        this.musicNodes.push({ osc, gain });
      });

      this.musicPlaying = true;
    } catch {
      // Ignore
    }
  }

  public stopAmbient() {
    if (!this.musicPlaying || !this.ctx) return;
    try {
      const ctx = this.ctx;
      if (this.musicMasterGain) {
        this.musicMasterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      }
      const nodesToStop = this.musicNodes;
      const lfoToStop = this.musicLfo;
      setTimeout(() => {
        nodesToStop.forEach(({ osc }) => {
          try {
            osc.stop();
          } catch {
            // Already stopped
          }
        });
        try {
          lfoToStop?.stop();
        } catch {
          // Already stopped
        }
      }, 1100);
      this.musicNodes = [];
      this.musicLfo = null;
      this.musicMasterGain = null;
      this.musicPlaying = false;
    } catch {
      // Ignore
    }
  }

  public toggleMusic(on: boolean) {
    this.musicEnabled = on;
    if (on) {
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
  }
}

export const soundFx = new SoundManager();
