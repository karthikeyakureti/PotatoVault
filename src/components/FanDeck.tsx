import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Layers, ArrowRight, ArrowLeft, Shuffle, Maximize2 } from 'lucide-react';
import { MEMORIES, MemoryItem } from '../data/memories';

interface FanDeckProps {
  onOpenLightbox: (memory: MemoryItem) => void;
}

export const FanDeck: React.FC<FanDeckProps> = ({ onOpenLightbox }) => {
  const [deckOrder, setDeckOrder] = useState<number[]>(() =>
    Array.from({ length: MEMORIES.length }, (_, i) => i)
  );
  
  const [spreadProgress, setSpreadProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const flipToBack = (direction: 'left' | 'right' = 'right') => {
    setDeckOrder((prev) => {
      const top = prev[0];
      const rest = prev.slice(1);
      return [...rest, top];
    });
  };

  const flipToPrev = () => {
    setDeckOrder((prev) => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
  };

  const handleShuffle = () => {
    setDeckOrder((prev) => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = (x / rect.width - 0.5) * 2;
    setSpreadProgress(progress);
  };

  const handleMouseLeave = () => {
    setSpreadProgress(0);
  };

  const topMemory = MEMORIES[deckOrder[0]];

  return (
    <section 
      id="fan-deck-section"
      className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center overflow-hidden bg-vault-900/60 select-none"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-ocean-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-20 text-center max-w-3xl px-6 mb-8 md:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-ocean-400/30 text-ocean-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
          <Layers className="w-3.5 h-3.5" />
          <span>Physical Photo Deck</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight glow-amber">
          Flip Through Our Story
        </h2>
        <p className="text-neutral-300 text-sm sm:text-base mt-3 max-w-xl mx-auto font-light leading-relaxed">
          Overlapping snapshots like a physical deck of polaroids. Drag the top photo or swipe away to reveal what came next.
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-4xl h-[420px] sm:h-[480px] md:h-[540px] flex items-center justify-center perspective-1200 px-4"
      >
        <div className="relative w-full h-full flex items-center justify-center preserve-3d">
          {deckOrder
            .slice(0, 6)
            .reverse()
            .map((memIndex, reverseIdx) => {
              const depthIdx = 5 - reverseIdx;
              const memory = MEMORIES[memIndex];
              const isTop = depthIdx === 0;

              const baseRotate = (depthIdx * 3.5) * (depthIdx % 2 === 0 ? 1 : -0.9);
              const mouseSpread = spreadProgress * (depthIdx * 6.5);
              const totalRotate = baseRotate + mouseSpread;

              const xOffset = mouseSpread * 14 + (depthIdx % 2 === 0 ? depthIdx * 2.5 : -depthIdx * 2.5);
              const yOffset = depthIdx * 12;
              const scale = Math.max(0.78, 1 - depthIdx * 0.05);
              const brightness = Math.max(0.55, 1 - depthIdx * 0.09);
              const shadowBlur = isTop ? 40 : 15;

              return (
                <DeckCard
                  key={memory.id}
                  memory={memory}
                  isTop={isTop}
                  depthIdx={depthIdx}
                  xOffset={xOffset}
                  yOffset={yOffset}
                  rotate={totalRotate}
                  scale={scale}
                  brightness={brightness}
                  shadowBlur={shadowBlur}
                  onFlip={flipToBack}
                  onOpenLightbox={() => onOpenLightbox(memory)}
                />
              );
            })}
        </div>
      </div>

      <div className="relative z-20 w-full max-w-xl px-6 mt-8 flex flex-col items-center">
        <motion.div
          key={topMemory.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel w-full rounded-2xl p-4 sm:p-5 text-center border border-ocean-500/20"
        >
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1.5">
            <span className="text-ocean-400 font-bold">Card {topMemory.number}</span>
            <span className="text-neutral-400">{topMemory.date}</span>
          </div>
          <h4 className="text-base sm:text-lg font-serif font-bold text-white mb-1">
            {topMemory.title}
          </h4>
          <p className="text-xs sm:text-sm text-neutral-300 italic font-serif">
            "{topMemory.caption}"
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5">
          <button
            onClick={flipToPrev}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-vault-800/90 hover:bg-vault-700 text-neutral-200 border border-white/10 hover:border-ocean-400/40 transition-all text-xs font-medium backdrop-blur-md shadow-lg active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => flipToBack('right')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-ocean-500 via-indigo-500 to-rose-500 text-white font-bold hover:brightness-110 transition-all text-xs shadow-[0_0_20px_rgba(14,165,233,0.35)] active:scale-95"
          >
            <span>Flip Next Card</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleShuffle}
            title="Shuffle Deck"
            className="p-2.5 rounded-full bg-vault-800/90 hover:bg-vault-700 text-neutral-300 hover:text-ocean-300 border border-white/10 transition-all text-xs backdrop-blur-md shadow-lg active:scale-95"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-neutral-400 font-mono mt-3">
          Tip: Drag or swipe the front photo sideways to toss it back!
        </p>
      </div>
    </section>
  );
};

interface DeckCardProps {
  memory: MemoryItem;
  isTop: boolean;
  depthIdx: number;
  xOffset: number;
  yOffset: number;
  rotate: number;
  scale: number;
  brightness: number;
  shadowBlur: number;
  onFlip: (direction: 'left' | 'right') => void;
  onOpenLightbox: () => void;
}

const DeckCard: React.FC<DeckCardProps> = ({
  memory,
  isTop,
  depthIdx,
  xOffset,
  yOffset,
  rotate,
  scale,
  brightness,
  shadowBlur,
  onFlip,
  onOpenLightbox,
}) => {
  const x = useMotionValue(0);
  const dragRotate = useTransform(x, [-250, 0, 250], [-18, 0, 18]);
  const dragOpacity = useTransform(x, [-300, -180, 0, 180, 300], [0.3, 0.9, 1, 0.9, 0.3]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 90;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset > threshold || velocity > 400) {
      onFlip('right');
    } else if (offset < -threshold || velocity < -400) {
      onFlip('left');
    }
  };

  return (
    <motion.div
      style={{
        zIndex: 50 - depthIdx,
        x: isTop ? x : xOffset,
        rotate: isTop ? dragRotate : rotate,
        opacity: isTop ? dragOpacity : 1,
        filter: `brightness(${brightness})`,
      }}
      animate={{
        x: isTop ? 0 : xOffset,
        y: yOffset,
        rotate: rotate,
        scale: scale,
        transition: { type: 'spring', stiffness: 260, damping: 24 },
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={isTop ? handleDragEnd : undefined}
      className={`absolute w-64 sm:w-72 md:w-80 aspect-[3/4] rounded-2xl p-2.5 bg-neutral-900 border border-white/10 select-none ${
        isTop ? 'cursor-grab active:cursor-grabbing shadow-[0_20px_50px_rgba(0,0,0,0.85)]' : 'pointer-events-none'
      }`}
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-vault-950 border border-white/10 group">
        <img
          src={memory.image}
          alt={memory.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-ocean-300 border border-white/15">
            {memory.number}
          </span>
          {isTop && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenLightbox();
              }}
              className="pointer-events-auto p-1.5 rounded-full bg-ocean-400 hover:bg-ocean-300 text-vault-950 backdrop-blur-md shadow-md transition-transform hover:scale-110"
              title="Open Full-Screen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="absolute bottom-3 inset-x-3 pointer-events-none text-left">
          <p className="text-xs font-mono text-ocean-400/90 mb-0.5">{memory.date}</p>
          <p className="text-sm font-semibold text-white drop-shadow truncate">{memory.title}</p>
        </div>
      </div>
    </motion.div>
  );
};
