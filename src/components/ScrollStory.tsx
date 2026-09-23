import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Instagram, ExternalLink, Compass, ShieldCheck, Anchor, Ship } from 'lucide-react';
import { MEMORIES, MemoryItem } from '../data/memories';
import mem10 from '../../images/memory10.jpg';
import mem11 from '../../images/memory11.jpg';

interface ScrollStoryHeroProps {
  onOpenLightbox: (memory: MemoryItem) => void;
  onOpenInstagram: () => void;
}

export const ScrollStoryHero: React.FC<ScrollStoryHeroProps> = ({ onOpenLightbox, onOpenInstagram }) => {
  const [activePhoto, setActivePhoto] = useState<'mem10' | 'mem11'>('mem10');
  const containerRef = useRef<HTMLDivElement>(null);

  const mem10Item = MEMORIES.find((m) => m.id === 'mem-10') || MEMORIES[0];
  const mem11Item = MEMORIES.find((m) => m.id === 'mem-11') || MEMORIES[1];
  const instagramUrl = 'https://www.instagram.com/_kalyan_setty_?stkn=MXZ1OXVjaWVzbHNnNw==';

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden bg-vault-950 px-4 sm:px-6 lg:px-12"
    >
      {/* Dynamic Ambient Background Illumination */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-ocean-500/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] bg-coral-500/12 rounded-full blur-[170px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[190px]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-vault-950/60 to-vault-950" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT COLUMN: Emotional Friendship & Merchant Navy Officer Story */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-ocean-400/30 text-ocean-400 text-xs font-mono tracking-widest uppercase mb-6 shadow-[0_0_25px_rgba(56,189,248,0.15)]">
            <Anchor className="w-3.5 h-3.5 text-ocean-400 animate-pulse" />
            <span>Merchant Navy Officer • Srinivasa Kalyan</span>
          </div>

          {/* Headline / Friendship & Sea Quote */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-tight leading-[1.15] mb-6">
            <span className="block text-neutral-300 font-serif font-light text-xl sm:text-2xl mb-2">
              "He charts courses across the high seas...
            </span>
            <span className="bg-gradient-to-r from-ocean-400 via-rose-300 to-champagne-300 bg-clip-text text-transparent italic">
              yet friendship remains the one harbor
            </span>{' '}
            <span className="text-white block mt-1">
              that will always call him home."
            </span>
          </h1>

          {/* Emotional Subtext */}
          <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed max-w-xl mb-8">
            From the maritime grounds of Commander Ali Academy to steering vessels through international waters, Kalyan sails the globe—yet our bond stays anchored forever.
          </p>

          {/* CTA & Instagram Connect Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            {/* Instagram Primary Button */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold text-sm shadow-[0_0_25px_rgba(253,29,29,0.35)] hover:shadow-[0_0_35px_rgba(253,29,29,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
              <Instagram className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span>@_kalyan_setty_</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Explore Memories Button */}
            <a
              href="#memories-around-us"
              className="flex items-center gap-2 px-6 py-3 rounded-full glass-panel hover:bg-white/10 text-white font-medium text-sm border border-white/15 hover:border-ocean-400/50 transition-all duration-300 active:scale-95 shadow-lg"
            >
              <Compass className="w-4 h-4 text-ocean-400" />
              <span>Explore The Vault</span>
              <ChevronDown className="w-4 h-4 text-neutral-400 animate-bounce" />
            </a>
          </div>

          {/* Stats & Trust Anchors */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6 text-left w-full max-w-md">
            <div>
              <p className="text-2xl font-serif font-black text-white">7 Seas</p>
              <p className="text-xs font-mono text-ocean-400 uppercase tracking-wider mt-0.5">Voyages</p>
            </div>
            <div>
              <p className="text-2xl font-serif font-black text-white">11</p>
              <p className="text-xs font-mono text-rose-400 uppercase tracking-wider mt-0.5">Chapters</p>
            </div>
            <div>
              <p className="text-2xl font-serif font-black text-white">⚓</p>
              <p className="text-xs font-mono text-champagne-400 uppercase tracking-wider mt-0.5">Anchored Bond</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Featured Memories (Memory 10 & Memory 11) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center"
        >
          {/* Card Toggle Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-full glass-panel border border-white/10 mb-5 shadow-xl">
            <button
              onClick={() => setActivePhoto('mem10')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                activePhoto === 'mem10'
                  ? 'bg-ocean-500 text-vault-950 font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>The Cadet (Memory 10)</span>
            </button>
            <button
              onClick={() => setActivePhoto('mem11')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                activePhoto === 'mem11'
                  ? 'bg-rose-500 text-white font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Ship className="w-3.5 h-3.5" />
              <span>High Seas (Memory 11)</span>
            </button>
          </div>

          {/* Interactive Featured Card Container */}
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-3xl p-3 glass-panel border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.85)] group select-none">
            <AnimatePresence mode="wait">
              {activePhoto === 'mem10' ? (
                <motion.div
                  key="mem10"
                  initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => onOpenLightbox(mem10Item)}
                  className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={mem10}
                    alt="Srinivasa Kalyan at Commander Ali Maritime Academy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vault-950 via-vault-950/20 to-black/30 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono font-bold text-ocean-400 border border-ocean-400/30">
                      ⚓ COMMANDER ALI ACADEMY
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-ocean-500/80 text-vault-950 text-xs font-mono font-bold">
                      #10
                    </span>
                  </div>

                  {/* Bottom Captions */}
                  <div className="absolute bottom-4 inset-x-4 text-left pointer-events-none">
                    <span className="text-xs font-mono text-ocean-300 block mb-1">Cadet Milestone</span>
                    <h3 className="text-xl font-serif font-bold text-white drop-shadow">
                      The Merchant Navy Cadet
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 italic font-serif mt-1 drop-shadow">
                      "Where dreams of commanding the high seas turned into discipline and pride."
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="mem11"
                  initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotate: -2 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => onOpenLightbox(mem11Item)}
                  className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={mem11}
                    alt="Srinivasa Kalyan on deck over the open sea"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vault-950 via-vault-950/20 to-black/30 pointer-events-none" />

                  <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono font-bold text-rose-400 border border-rose-400/30">
                      🚢 MERCHANT VESSEL ON WATCH
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/80 text-white text-xs font-mono font-bold">
                      #11
                    </span>
                  </div>

                  <div className="absolute bottom-4 inset-x-4 text-left pointer-events-none">
                    <span className="text-xs font-mono text-rose-300 block mb-1">High Seas Voyage</span>
                    <h3 className="text-xl font-serif font-bold text-white drop-shadow">
                      Voyager of the High Seas
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 italic font-serif mt-1 drop-shadow">
                      "Steering through open waters. No ocean is too vast to disconnect this bond."
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute -bottom-3 inset-x-0 flex justify-center pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-vault-900 border border-white/20 text-[11px] font-mono text-neutral-300 shadow-xl">
                Click photo to expand full-screen
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Scene 2: Parallax First Photograph with Scroll Reveal Typography
export const SceneTwoOrigins: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const firstMemory = MEMORIES.find((m) => m.id === 'mem-01') || MEMORIES[2];

  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const fgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const fgRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-28 flex flex-col items-center justify-center overflow-hidden bg-vault-950 px-6"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 filter blur-3xl scale-125"
      >
        <img
          src={firstMemory.image}
          alt="Ambient memory glow"
          className="w-full h-full max-w-4xl object-cover"
        />
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-20 text-center max-w-3xl mb-12"
      >
        <span className="text-xs font-mono tracking-widest uppercase text-ocean-400 mb-2 block">
          Chapter 01 • Before The Oceans
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white glow-amber">
          Ours has too many chapters.
        </h2>
      </motion.div>

      <motion.div
        style={{ y: fgY, rotate: fgRotate }}
        className="relative z-20 max-w-sm sm:max-w-md w-full aspect-[4/5] rounded-3xl p-3 glass-panel border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-md group"
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-vault-900">
          <img
            src={firstMemory.image}
            alt={firstMemory.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vault-950/90 via-transparent to-black/20 pointer-events-none" />

          <div className="absolute bottom-4 inset-x-4 text-left">
            <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-ocean-300 border border-white/10">
              BEFORE THE VOYAGE
            </span>
            <p className="text-white font-serif font-bold text-lg mt-1.5 drop-shadow">
              {firstMemory.title}
            </p>
            <p className="text-neutral-300 text-xs italic font-serif">
              "{firstMemory.caption}"
            </p>
          </div>
        </div>
      </motion.div>

      <div className="relative z-20 max-w-4xl text-center mt-20 px-4">
        <p className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-300 leading-snug tracking-tight">
          "WE WERE JUST MAKING MEMORIES...
          <br />
          <span className="bg-gradient-to-r from-ocean-400 via-rose-300 to-champagne-300 bg-clip-text text-transparent font-black mt-2 inline-block">
            ...WITHOUT REALIZING THEY WOULD BECOME THE BEST ONES."
          </span>
        </p>
      </div>
    </section>
  );
};

interface InterludeProps {
  number: string;
  tag: string;
  quote: string;
  subtext: string;
}

export const StoryInterlude: React.FC<InterludeProps> = ({ number, tag, quote, subtext }) => {
  return (
    <div className="relative w-full py-20 flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-vault-950 border-y border-white/[0.04]">
      <div className="relative z-10 max-w-3xl flex flex-col items-center">
        <span className="px-3 py-1 rounded-full glass-pill text-[11px] font-mono text-ocean-400 tracking-widest uppercase mb-4 border border-ocean-500/20">
          {number} • {tag}
        </span>
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight mb-3">
          "{quote}"
        </blockquote>
        <p className="text-xs sm:text-sm text-neutral-400 font-mono tracking-wider">
          {subtext}
        </p>
      </div>
    </div>
  );
};
