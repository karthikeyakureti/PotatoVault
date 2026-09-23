import React, { useState, useEffect } from 'react';
import { RotateCw, Layers, Film, Grid, Instagram, Anchor } from 'lucide-react';

interface NavbarProps {
  onOpenInstagram: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInstagram }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Orbit', href: '#memories-around-us', icon: RotateCw },
    { label: 'Fan Deck', href: '#fan-deck-section', icon: Layers },
    { label: 'Videos', href: '#video-vault-section', icon: Film },
    { label: 'Collage', href: '#photo-wall-section', icon: Grid },
  ];

  const instagramUrl = 'https://www.instagram.com/_kalyan_setty_?stkn=MXZ1OXVjaWVzbHNnNw==';

  return (
    <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full glass-panel border transition-all duration-500 shadow-2xl ${
          scrolled ? 'bg-vault-950/92 border-ocean-500/30' : 'bg-vault-900/70 border-white/10'
        }`}
      >
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2 pl-1 pr-2 sm:pr-3 text-xs sm:text-sm font-serif font-black tracking-wider text-white hover:text-ocean-300 transition-colors border-r border-white/10"
        >
          <Anchor className="w-4 h-4 text-ocean-400" />
          <span className="hidden sm:inline">KALYAN VAULT</span>
        </a>

        {/* Section Links */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono text-neutral-300 hover:text-ocean-300 hover:bg-white/5 transition-all active:scale-95"
              >
                <Icon className="w-3 h-3 text-ocean-400" />
                <span className="hidden md:inline">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Direct Instagram Link Button in Navbar */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Kalyan's Instagram Profile"
          className="ml-1 sm:ml-2 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-[11px] sm:text-xs font-mono font-medium shadow-md hover:brightness-110 active:scale-95 transition-all"
        >
          <Instagram className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Instagram</span>
        </a>
      </nav>
    </header>
  );
};
