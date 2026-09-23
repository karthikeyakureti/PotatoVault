import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { MEMORIES, MemoryItem } from './data/memories';
import { Navbar } from './components/Navbar';
import { ScrollStoryHero, SceneTwoOrigins, StoryInterlude } from './components/ScrollStory';
import { CircularSlider } from './components/CircularSlider';
import { FanDeck } from './components/FanDeck';
import { VideoSection } from './components/VideoSection';
import { PhotoWall } from './components/PhotoWall';
import { FinalTribute } from './components/FinalTribute';
import { Lightbox } from './components/Lightbox';
import { InstagramModal } from './components/InstagramModal';
import { AmbientSound } from './components/AmbientSound';

export function App() {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [isInstagramOpen, setIsInstagramOpen] = useState(false);

  // Smooth Scrolling with Lenis
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenLightbox = (memory: MemoryItem) => {
    setSelectedMemory(memory);
  };

  const handleCloseLightbox = () => {
    setSelectedMemory(null);
  };

  const handleNavigateLightbox = (direction: 'prev' | 'next') => {
    if (!selectedMemory) return;
    const currentIndex = MEMORIES.findIndex((m) => m.id === selectedMemory.id);
    if (currentIndex === -1) return;

    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= MEMORIES.length) newIndex = 0;
    if (newIndex < 0) newIndex = MEMORIES.length - 1;

    setSelectedMemory(MEMORIES[newIndex]);
  };

  return (
    <div className="relative min-h-screen bg-vault-950 text-neutral-100 selection:bg-ocean-500/30 selection:text-ocean-200">
      {/* Film grain and ambient overlay */}
      <div className="fixed inset-0 film-grain pointer-events-none z-30 opacity-20" />

      {/* Navigation Header with Instagram Connect */}
      <Navbar onOpenInstagram={() => setIsInstagramOpen(true)} />

      {/* Main Cinematic Scroll Story Flow */}
      <main className="relative z-10 flex flex-col w-full">
        {/* Scene 1: Revamped Split Hero (Quotation + Memory 10 & 11) */}
        <ScrollStoryHero
          onOpenLightbox={handleOpenLightbox}
          onOpenInstagram={() => setIsInstagramOpen(true)}
        />

        {/* Scene 2: Origins & Parallax Photograph */}
        <SceneTwoOrigins />

        {/* Scene 3: Circular Memory Slider */}
        <StoryInterlude
          number="Scene 03"
          tag="Orbit"
          quote="Let's go back."
          subtext="Arranged along the circle of time, every moment spins into view."
        />
        <CircularSlider onOpenLightbox={handleOpenLightbox} />

        {/* Scene 4: Fan Deck */}
        <StoryInterlude
          number="Scene 04"
          tag="Physical Deck"
          quote="One memory at a time."
          subtext="Toss the front card, flip through the polaroids, and uncover the story."
        />
        <FanDeck onOpenLightbox={handleOpenLightbox} />

        {/* Scene 5: Video Vault */}
        <VideoSection />

        {/* Interactive Photo Wall Collage */}
        <PhotoWall onOpenLightbox={handleOpenLightbox} />

        {/* Scene 6: Final Tribute Composition */}
        <FinalTribute onOpenInstagram={() => setIsInstagramOpen(true)} />
      </main>

      {/* Full-Screen Memory Lightbox */}
      <Lightbox
        memory={selectedMemory}
        allMemories={MEMORIES}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
        onOpenInstagram={() => setIsInstagramOpen(true)}
      />

      {/* Instagram Connect Modal */}
      <InstagramModal
        isOpen={isInstagramOpen}
        onClose={() => setIsInstagramOpen(false)}
      />

      {/* Ambient Audio Toggle */}
      <AmbientSound />
    </div>
  );
}

export default App;
