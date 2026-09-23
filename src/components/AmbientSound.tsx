import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AmbientSound: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft warm ambient drone chords (C Major 9 chord frequencies: C3, G3, B3, D4, E4)
      const freqs = [130.81, 196.00, 246.94, 293.66, 329.63];
      const oscillators: OscillatorNode[] = [];

      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.03, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscillators.push(osc);
      });

      oscNodesRef.current = oscillators;
      setIsPlaying(true);
    } catch (err) {
      console.error('Audio initialization error:', err);
    }
  };

  const stopAmbientSound = () => {
    if (audioCtxRef.current) {
      oscNodesRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      oscNodesRef.current = [];
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? 'Mute Ambient Soundtrack' : 'Play Cinematic Ambient Drone'}
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-full glass-panel border transition-all duration-300 shadow-2xl active:scale-95 flex items-center gap-2 ${
        isPlaying
          ? 'border-amber-400/60 bg-amber-500/20 text-amber-300'
          : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
      }`}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 animate-pulse" />
          <span className="text-[11px] font-mono pr-1 hidden sm:inline">Ambient On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4" />
          <span className="text-[11px] font-mono pr-1 hidden sm:inline">Sound</span>
        </>
      )}
    </button>
  );
};
