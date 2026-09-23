import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, ExternalLink, Check, Copy, ShieldCheck, Anchor } from 'lucide-react';
import mem10 from '../../images/memory10.jpg';

interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultHandle?: string;
}

export const InstagramModal: React.FC<InstagramModalProps> = ({
  isOpen,
  onClose,
  defaultHandle = '_kalyan_setty_',
}) => {
  const [handle, setHandle] = useState(defaultHandle);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const instagramUrl =
    handle.trim() === '_kalyan_setty_'
      ? 'https://www.instagram.com/_kalyan_setty_?stkn=MXZ1OXVjaWVzbHNnNw=='
      : `https://www.instagram.com/${handle.replace('@', '')}`;

  const copyLink = () => {
    navigator.clipboard.writeText(instagramUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-vault-950/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative z-50 max-w-md w-full glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]" />

          <button
            onClick={onClose}
            aria-label="Close Instagram Modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center text-white shadow-lg">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">Instagram Connection</h3>
              <p className="text-xs text-neutral-400 font-mono">Connect with Srinivasa Kalyan</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-vault-900/90 border border-white/10 mb-6 flex flex-col items-center text-center">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] mb-3">
              <div className="p-0.5 rounded-full bg-vault-900">
                <img
                  src={mem10}
                  alt="Kalyan Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <h4 className="text-base font-bold text-white">Srinivasa Kalyan</h4>
              <ShieldCheck className="w-4 h-4 text-ocean-400 fill-ocean-400/20" />
            </div>
            <p className="text-xs font-mono text-ocean-400 font-medium mt-0.5">@{handle.replace('@', '')}</p>

            <p className="text-xs text-neutral-300 font-light mt-2 max-w-xs leading-relaxed">
              ⚓ Merchant Navy Officer 🚢 • Navigating High Seas & Boundless Horizons • Kalyan / 'Potato' to his brothers • World Voyager
            </p>

            <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-white/10 w-full text-center">
              <div>
                <span className="text-sm font-bold text-white block">11</span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Memories</span>
              </div>
              <div>
                <span className="text-sm font-bold text-white block">Merchant</span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Navy</span>
              </div>
              <div>
                <span className="text-sm font-bold text-white block">Brother</span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Bond</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-[11px] font-mono text-neutral-400 block mb-1.5">
              Kalyan's Instagram profile:
            </label>
            <div className="flex items-center rounded-xl bg-vault-900 border border-white/10 px-3 py-2 text-xs">
              <span className="text-neutral-500 font-mono mr-1">instagram.com/</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="_kalyan_setty_"
                className="bg-transparent flex-1 text-white focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Open Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={copyLink}
              className="px-4 py-3 rounded-xl glass-panel border border-white/10 hover:border-white/30 text-neutral-300 text-xs font-mono transition-all flex items-center gap-1.5 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
