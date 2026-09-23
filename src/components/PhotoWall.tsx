import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Maximize2 } from 'lucide-react';
import { MEMORIES, MemoryItem } from '../data/memories';

interface PhotoWallProps {
  onOpenLightbox: (memory: MemoryItem) => void;
}

export const PhotoWall: React.FC<PhotoWallProps> = ({ onOpenLightbox }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const collageStyles = [
    { colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-2', rotate: '-2deg' },
    { colSpan: 'col-span-1', rowSpan: 'row-span-1', rotate: '2deg' },
    { colSpan: 'col-span-1', rowSpan: 'row-span-1', rotate: '-1.5deg' },
    { colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1', rotate: '1.8deg' },
    { colSpan: 'col-span-1', rowSpan: 'row-span-2', rotate: '-2.5deg' },
    { colSpan: 'col-span-1', rowSpan: 'row-span-1', rotate: '1.2deg' },
    { colSpan: 'col-span-1', rowSpan: 'row-span-1', rotate: '-1deg' },
    { colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-2', rotate: '2.2deg' },
    { colSpan: 'col-span-1', rowSpan: 'row-span-1', rotate: '-2deg' },
    { colSpan: 'col-span-1', rowSpan: 'row-span-1', rotate: '1.5deg' },
    { colSpan: 'col-span-1', rowSpan: 'row-span-1', rotate: '-1.8deg' },
    { colSpan: 'col-span-1', rowSpan: 'row-span-1', rotate: '2deg' },
  ];

  return (
    <section 
      id="photo-wall-section"
      className="relative w-full py-28 flex flex-col items-center justify-center overflow-hidden bg-vault-950 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-ocean-500/10 rounded-full blur-[170px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-rose-500/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-20 text-center max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-ocean-400/30 text-ocean-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
          <Grid className="w-3.5 h-3.5" />
          <span>The Memory Collage</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white glow-amber tracking-tight">
          Every Smile, Every Day
        </h2>
        <p className="text-neutral-300 text-sm sm:text-base mt-3 max-w-xl mx-auto font-light leading-relaxed">
          Hover over each photograph to bring that chapter to life. Tap any picture to examine it full-screen.
        </p>
      </div>

      <div className="relative z-20 w-full max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-[180px] sm:auto-rows-[220px]">
        {MEMORIES.map((item, index) => {
          const style = collageStyles[index % collageStyles.length];
          const isHovered = hoveredId === item.id;
          const isOtherHovered = hoveredId !== null && !isHovered;

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onOpenLightbox(item)}
              animate={{
                scale: isHovered ? 1.05 : 1,
                rotate: isHovered ? '0deg' : style.rotate,
                zIndex: isHovered ? 30 : 1,
                opacity: isOtherHovered ? 0.45 : 1,
                filter: isOtherHovered ? 'blur(1.5px) grayscale(30%)' : 'blur(0px) grayscale(0%)',
              }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`relative ${style.colSpan} ${style.rowSpan} rounded-2xl overflow-hidden glass-panel border border-white/10 cursor-pointer shadow-lg group ${
                isHovered ? 'shadow-[0_25px_60px_rgba(14,165,233,0.35)] ring-2 ring-ocean-400' : ''
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-ocean-300 border border-white/10">
                {item.number}
              </div>

              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-ocean-400 text-vault-950 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                <Maximize2 className="w-3 h-3" />
              </div>

              <div className="absolute bottom-3 inset-x-3 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[11px] font-mono text-ocean-400 block">
                  {item.date}
                </span>
                <h4 className="text-sm sm:text-base font-serif font-bold text-white drop-shadow truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-300 italic font-serif line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-0.5">
                  "{item.caption}"
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
