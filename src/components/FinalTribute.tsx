import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles, ArrowUp, Instagram, ExternalLink, Anchor } from 'lucide-react';
import { MEMORIES } from '../data/memories';

interface FinalTributeProps {
  onOpenInstagram: () => void;
}

export const FinalTribute: React.FC<FinalTributeProps> = ({ onOpenInstagram }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const convergeProgress = useTransform(scrollYProgress, [0.1, 0.85], [1, 0]);
  const orbitThumbnails = MEMORIES.slice(0, 8);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-32 flex flex-col items-center justify-center overflow-hidden bg-vault-950 px-6 text-center select-none"
    >
      {/* Background Starry Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] bg-gradient-to-r from-ocean-500/15 via-rose-500/10 to-indigo-600/15 rounded-full blur-[180px]" />
      </div>

      {/* Floating Orbiting Memory Photos converging to the center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {orbitThumbnails.map((item, idx) => {
          const angle = (idx / orbitThumbnails.length) * 2 * Math.PI;
          const baseRadiusX = 360;
          const baseRadiusY = 240;

          return (
            <motion.div
              key={item.id}
              style={{
                x: useTransform(convergeProgress, (val) => Math.cos(angle) * (190 + val * baseRadiusX)),
                y: useTransform(convergeProgress, (val) => Math.sin(angle) * (140 + val * baseRadiusY)),
                rotate: useTransform(convergeProgress, (val) => (idx % 2 === 0 ? 12 : -12) * val),
                scale: useTransform(convergeProgress, [1, 0], [0.65, 0.95]),
                opacity: useTransform(convergeProgress, [1, 0.2], [0.35, 0.85]),
              }}
              className="absolute w-16 h-20 sm:w-20 sm:h-26 md:w-24 md:h-32 rounded-xl overflow-hidden shadow-2xl border border-white/20 glass-panel"
            >
              <img
                src={item.image}
                alt="Memory fragment"
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          );
        })}
      </div>

      {/* Center Tribute Composition */}
      <div className="relative z-20 max-w-3xl flex flex-col items-center">
        {/* Scene 06 Prelude */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-ocean-400/30 text-ocean-400 text-xs font-mono tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
        >
          <Anchor className="w-3.5 h-3.5" />
          <span>The Legacy of Kalyan</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl font-serif italic text-neutral-300 mb-8 max-w-xl leading-relaxed"
        >
          "And somehow... we made all these memories."
        </motion.p>

        {/* Central Crown Name: SRINIVASA KALYAN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative my-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white glow-amber uppercase">
            SRINIVASA KALYAN
          </h1>

          <div className="mt-4 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-ocean-500/10 border border-ocean-400/30 backdrop-blur-md shadow-[0_0_35px_rgba(14,165,233,0.25)]">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-ocean-300 uppercase">
              Brother • Voyager • Friend
            </span>
          </div>
        </motion.div>

        {/* Emotional Farewell Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-lg space-y-2 font-serif text-lg sm:text-xl text-neutral-300"
        >
          <p>Some memories end.</p>
          <p className="text-ocean-300 font-bold">Some stay with us forever.</p>
        </motion.div>

        {/* Instagram Connection Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 p-5 rounded-2xl glass-panel border border-white/15 max-w-md w-full flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center text-white shadow-md">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-neutral-400">Share or connect</p>
              <p className="text-sm font-bold text-white">@srinivasa_kalyan</p>
            </div>
          </div>

          <button
            onClick={onOpenInstagram}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Visit Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Made with ❤️ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-current animate-pulse" />
            <span>for our brother Kalyan</span>
          </div>

          <button
            onClick={scrollToTop}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-vault-900/90 hover:bg-vault-800 text-neutral-300 hover:text-ocean-300 border border-white/10 hover:border-ocean-500/30 text-xs font-mono transition-all shadow-xl active:scale-95 group"
          >
            <span>Back to Beginning</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
