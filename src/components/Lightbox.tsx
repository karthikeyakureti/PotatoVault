import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Tag, Sparkles, Instagram, Share2 } from 'lucide-react';
import { MemoryItem } from '../data/memories';

interface LightboxProps {
  memory: MemoryItem | null;
  allMemories: MemoryItem[];
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onOpenInstagram: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  memory,
  allMemories,
  onClose,
  onNavigate,
  onOpenInstagram,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!memory) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    if (memory) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [memory, onClose, onNavigate]);

  if (!memory) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
        {/* Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="absolute inset-0 bg-vault-950/92 backdrop-blur-2xl"
        />

        {/* Ambient radial glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="w-[700px] h-[700px] bg-ocean-500/10 rounded-full blur-[160px]" />
          <div className="w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[140px]" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-vault-900/80 hover:bg-ocean-500 text-neutral-300 hover:text-vault-950 border border-white/10 hover:border-ocean-400 backdrop-blur-md transition-all shadow-2xl active:scale-95 group"
        >
          <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
        </button>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('prev');
          }}
          aria-label="Previous Image"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-vault-900/80 hover:bg-ocean-500 text-neutral-300 hover:text-vault-950 border border-white/10 hover:border-ocean-400 backdrop-blur-md transition-all shadow-2xl active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('next');
          }}
          aria-label="Next Image"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-vault-900/80 hover:bg-ocean-500 text-neutral-300 hover:text-vault-950 border border-white/10 hover:border-ocean-400 backdrop-blur-md transition-all shadow-2xl active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Lightbox Content Container */}
        <motion.div
          key={memory.id}
          initial={{ scale: 0.88, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-40 max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row items-stretch rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
        >
          {/* Image Showcase */}
          <div className="relative flex-1 min-h-[320px] md:min-h-[500px] bg-black flex items-center justify-center p-3 sm:p-5 overflow-hidden">
            <motion.img
              key={memory.image}
              src={memory.image}
              alt={memory.title}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="max-h-[60vh] md:max-h-[78vh] w-auto max-w-full object-contain rounded-xl shadow-2xl select-none"
            />
          </div>

          {/* Details Sidebar / Panel */}
          <div className="w-full md:w-80 lg:w-96 p-6 sm:p-8 flex flex-col justify-between bg-vault-900/90 border-t md:border-t-0 md:border-l border-white/10">
            <div>
              {/* Badge & Number */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-ocean-500/20 text-ocean-300 border border-ocean-500/30 text-xs font-mono font-bold">
                  Memory {memory.number}
                </span>
                {memory.tag && (
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400">
                    <Tag className="w-3 h-3 text-rose-400" />
                    <span>{memory.tag}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 leading-tight">
                {memory.title}
              </h3>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono mb-6">
                <Calendar className="w-3.5 h-3.5 text-ocean-400" />
                <span>{memory.date}</span>
              </div>

              {/* Caption */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
                <p className="text-neutral-200 text-sm sm:text-base font-serif italic leading-relaxed">
                  "{memory.caption}"
                </p>
              </div>

              {/* Instagram Share / Connect Button */}
              <button
                onClick={onOpenInstagram}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-semibold shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span>Share / View on Instagram</span>
              </button>
            </div>

            {/* Bottom Footer Info */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>Srinivasa Kalyan Vault</span>
              <span className="flex items-center gap-1 text-ocean-400">
                <Sparkles className="w-3 h-3" />
                <span>Core Memory</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
