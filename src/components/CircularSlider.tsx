import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Compass, Sparkles } from 'lucide-react';
import { MEMORIES, MemoryItem } from '../data/memories';

interface CircularSliderProps {
  onOpenLightbox: (memory: MemoryItem) => void;
}

export const CircularSlider: React.FC<CircularSliderProps> = ({ onOpenLightbox }) => {
  const items = MEMORIES.slice(0, 10);
  const total = items.length;
  const anglePerItem = 360 / total;

  const [currentAngle, setCurrentAngle] = useState(0);
  const targetAngleRef = useRef(0);
  const currentAngleRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const lastDragXRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const lastInteractionTimeRef = useRef(Date.now());
  const rafIdRef = useRef<number | null>(null);

  const getActiveIndex = (angle: number) => {
    const normalized = ((-angle % 360) + 360) % 360;
    const rawIndex = Math.round(normalized / anglePerItem) % total;
    return (rawIndex + total) % total;
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(480);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setRadius(260);
      } else if (width < 1024) {
        setRadius(380);
      } else {
        setRadius(500);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loop = () => {
      const now = Date.now();
      const idleTime = now - lastInteractionTimeRef.current;

      if (!isDraggingRef.current) {
        if (idleTime > 2500 && !isHovered) {
          targetAngleRef.current -= 0.12;
        }

        if (Math.abs(velocityRef.current) > 0.01) {
          targetAngleRef.current += velocityRef.current;
          velocityRef.current *= 0.92;
        } else {
          velocityRef.current = 0;
        }

        const diff = targetAngleRef.current - currentAngleRef.current;
        currentAngleRef.current += diff * 0.1;
      }

      setCurrentAngle(currentAngleRef.current);
      const newActive = getActiveIndex(currentAngleRef.current);
      setActiveIndex(newActive);

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isHovered, total, anglePerItem]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = Date.now();
    velocityRef.current = 0;
    lastInteractionTimeRef.current = Date.now();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastDragXRef.current;
    const now = Date.now();
    const dt = Math.max(1, now - lastDragTimeRef.current);

    const sensitivity = window.innerWidth < 640 ? 0.35 : 0.22;
    const angleDelta = deltaX * sensitivity;

    currentAngleRef.current += angleDelta;
    targetAngleRef.current = currentAngleRef.current;
    velocityRef.current = (angleDelta / dt) * 16;

    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = now;
    lastInteractionTimeRef.current = now;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    lastInteractionTimeRef.current = Date.now();

    const snapActive = getActiveIndex(targetAngleRef.current);
    const snapTarget = -snapActive * anglePerItem;
    setTimeout(() => {
      if (!isDraggingRef.current && Math.abs(velocityRef.current) < 0.2) {
        const current = targetAngleRef.current;
        const offset = Math.round((current - snapTarget) / 360) * 360;
        targetAngleRef.current = snapTarget + offset;
      }
    }, 400);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    lastInteractionTimeRef.current = Date.now();
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    targetAngleRef.current -= delta * 0.15;
  };

  const rotateTo = (index: number) => {
    lastInteractionTimeRef.current = Date.now();
    velocityRef.current = 0;
    const curActive = getActiveIndex(targetAngleRef.current);
    let diff = (index - curActive) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    targetAngleRef.current -= diff * anglePerItem;
  };

  const handlePrev = () => {
    rotateTo((activeIndex - 1 + total) % total);
  };

  const handleNext = () => {
    rotateTo((activeIndex + 1) % total);
  };

  const activeMemory = items[activeIndex] || items[0];

  return (
    <section 
      id="memories-around-us"
      className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center overflow-hidden bg-vault-950 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-ocean-500/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Section Header */}
      <div className="relative z-20 text-center max-w-3xl px-6 mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-ocean-400/30 text-ocean-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive 3D Carousel</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight glow-amber">
          Memories Around Us
        </h2>
        <p className="text-neutral-300 text-sm sm:text-base mt-3 max-w-xl mx-auto font-light leading-relaxed">
          Step into the orbit of our friendship. Every turn captures a snapshot of time that shaped who we are.
        </p>
      </div>

      {/* 3D Circular Orbit Stage */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-full max-w-6xl h-[420px] sm:h-[480px] md:h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y perspective-1200"
      >
        {/* Central Core Monogram Emblem (Prestigious SK Crest) */}
        <div className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none transition-transform duration-700">
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-ocean-500/20 via-rose-500/15 to-transparent backdrop-blur-md border border-white/20 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(14,165,233,0.25)] animate-pulse-slow">
              <span className="text-xl sm:text-2xl font-serif font-black tracking-widest text-white drop-shadow">
                SK
              </span>
              <span className="text-[10px] font-mono tracking-widest text-ocean-300 uppercase mt-0.5">
                KALYAN
              </span>
            </div>
            <div className="absolute -inset-2 rounded-full border border-ocean-400/20 animate-ping opacity-30 pointer-events-none" />
          </div>
          <span className="text-xs text-neutral-400 tracking-wider font-mono mt-3 opacity-90">
            Spin through the memories...
          </span>
        </div>

        {/* Orbiting Photo Cards */}
        <div className="relative w-full h-full flex items-center justify-center preserve-3d">
          {items.map((item, idx) => {
            const itemAngle = (idx * anglePerItem + currentAngle) % 360;
            const rad = (itemAngle * Math.PI) / 180;

            const sin = Math.sin(rad);
            const cos = Math.cos(rad);

            const x = sin * radius;
            const z = (cos - 1) * radius * 0.75;
            const depthFactor = (cos + 1) / 2;
            const isActive = idx === activeIndex;

            const scale = 0.65 + depthFactor * 0.45;
            const opacity = 0.35 + depthFactor * 0.65;
            const blurAmount = (1 - depthFactor) * 4;
            const zIndex = Math.round(depthFactor * 100);

            return (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isActive) {
                    onOpenLightbox(item);
                  } else {
                    rotateTo(idx);
                  }
                }}
                style={{
                  transform: `translate3d(${x}px, 0px, ${z}px) scale(${scale})`,
                  opacity: opacity,
                  filter: `blur(${blurAmount}px) brightness(${0.6 + depthFactor * 0.5})`,
                  zIndex: zIndex,
                  willChange: 'transform, opacity, filter',
                }}
                className={`absolute w-44 sm:w-56 md:w-64 aspect-[3/4] rounded-2xl p-2 transition-shadow duration-300 cursor-pointer ${
                  isActive 
                    ? 'ring-2 ring-ocean-400 shadow-[0_15px_45px_rgba(14,165,233,0.35)]' 
                    : 'shadow-2xl hover:ring-1 hover:ring-white/30'
                }`}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-vault-900 border border-white/10 group">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vault-950/80 via-transparent to-black/20 pointer-events-none" />

                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono font-medium text-ocean-300">
                    {item.number}
                  </div>

                  {isActive && (
                    <div className="absolute top-3 right-3 p-1.5 rounded-full bg-ocean-400 text-vault-950 backdrop-blur-md shadow-md animate-bounce">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className="absolute bottom-2.5 inset-x-2.5 text-left pointer-events-none">
                    <p className="text-xs font-medium text-white truncate drop-shadow">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Orbit Controls */}
        <button
          onClick={handlePrev}
          aria-label="Previous memory"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-vault-900/80 hover:bg-ocean-500/20 text-neutral-300 hover:text-ocean-300 border border-white/10 hover:border-ocean-500/40 backdrop-blur-md transition-all shadow-xl active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next memory"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-vault-900/80 hover:bg-ocean-500/20 text-neutral-300 hover:text-ocean-300 border border-white/10 hover:border-ocean-500/40 backdrop-blur-md transition-all shadow-xl active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Active Memory Caption & Metadata Panel */}
      <div className="relative z-20 w-full max-w-xl px-6 mt-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMemory.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-panel rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden group cursor-pointer border border-ocean-500/20 hover:border-ocean-400/50 transition-colors"
            onClick={() => onOpenLightbox(activeMemory)}
          >
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2 border-b border-white/5 pb-2">
              <span className="text-ocean-400 font-bold tracking-wider">
                Memory {activeMemory.number}
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                {activeMemory.date}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-1.5">
              {activeMemory.title}
            </h3>
            <p className="text-neutral-300 text-sm italic font-serif leading-relaxed">
              "{activeMemory.caption}"
            </p>

            <div className="mt-3 pt-2 flex items-center justify-center gap-1.5 text-xs text-ocean-300 font-mono">
              <Maximize2 className="w-3 h-3" />
              <span>Click or tap photo to open full-screen vault</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-neutral-400 font-mono">
          <span>Drag horizontally</span>
          <span>•</span>
          <span>Mouse wheel</span>
          <span>•</span>
          <span>Touch swipe</span>
        </div>
      </div>
    </section>
  );
};
