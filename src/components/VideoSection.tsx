import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Film, Sparkles } from 'lucide-react';
import { VIDEOS, VideoItem } from '../data/memories';

export const VideoSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section 
      id="video-vault-section"
      className="relative w-full py-28 flex flex-col items-center justify-center overflow-hidden bg-vault-950 px-6 select-none"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-ocean-500/10 rounded-full blur-[170px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-20 text-center max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-ocean-400/30 text-ocean-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
          <Film className="w-3.5 h-3.5" />
          <span>Motion Archives</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white glow-amber tracking-tight">
          Some moments are better watched than remembered.
        </h2>
        <p className="text-neutral-300 text-sm sm:text-base mt-3 max-w-xl mx-auto font-light leading-relaxed">
          Photographs hold a moment still. Videos capture the rhythm, the unfiltered laughter, and Kalyan in his truest form.
        </p>
      </div>

      <div className="relative z-20 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {VIDEOS.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveVideo(item)}
            className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-ocean-400/50 cursor-pointer shadow-xl transition-all duration-500 flex flex-col"
          >
            <div className="relative w-full aspect-video bg-black overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vault-950 via-vault-950/20 to-transparent pointer-events-none" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-ocean-400 text-vault-950 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.5)] group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[11px] font-mono text-neutral-300 border border-white/10">
                {item.duration}
              </div>

              <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-ocean-500/20 backdrop-blur-md text-[11px] font-mono text-ocean-300 border border-ocean-500/30">
                CLIP {item.number}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-ocean-400/90">{item.date}</span>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-ocean-300 transition-colors mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>Click to play</span>
                <Sparkles className="w-3.5 h-3.5 text-ocean-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />

            <button
              onClick={() => setActiveVideo(null)}
              aria-label="Close Video"
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-vault-900/80 hover:bg-ocean-500 text-neutral-200 hover:text-vault-950 border border-white/10 transition-all shadow-xl active:scale-95 group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative z-40 max-w-4xl w-full bg-vault-900 rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col"
            >
              <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                {activeVideo.videoSrc ? (
                  <video
                    src={activeVideo.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <img
                      src={activeVideo.thumbnail}
                      alt={activeVideo.title}
                      className="absolute inset-0 w-full h-full object-cover filter blur-sm opacity-50"
                    />
                    <div className="relative z-10 p-6 glass-panel rounded-2xl max-w-md">
                      <Film className="w-12 h-12 text-ocean-400 mx-auto mb-3" />
                      <h4 className="text-xl font-serif font-bold text-white mb-2">
                        Freeze-Frame Vault Memory
                      </h4>
                      <p className="text-sm text-neutral-300">
                        {activeVideo.caption}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-vault-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-ocean-500/20 text-ocean-300 text-xs font-mono font-bold">
                      Clip {activeVideo.number}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">{activeVideo.date}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white">
                    {activeVideo.title}
                  </h3>
                  <p className="text-sm text-neutral-300 mt-1 font-light">
                    {activeVideo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
