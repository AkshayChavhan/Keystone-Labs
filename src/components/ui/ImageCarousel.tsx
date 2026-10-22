'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, type Transition, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EASE_OUT } from '@/lib/motion';

// What caused the last slide change. Autoplay gets a proper crossfade; clicks are quick so rapid
// clicking never stacks half-faded screens; arrow keys are instant.
type Via = 'auto' | 'click' | 'key';

const FADE: Record<Via, Transition> = {
  auto: { duration: 0.25, ease: EASE_OUT },
  click: { duration: 0.12, ease: EASE_OUT },
  key: { duration: 0 },
};

// A 2px blur blends the two screenshots into one change instead of showing both at half opacity.
// `via` arrives through AnimatePresence's `custom`, so the outgoing slide uses the new timing too.
const SLIDE: Variants = {
  enter: { opacity: 0, filter: 'blur(2px)' },
  show: (via: Via) => ({ opacity: 1, filter: 'blur(0px)', transition: FADE[via] }),
  leave: (via: Via) => ({ opacity: 0, filter: 'blur(2px)', transition: FADE[via] }),
};

interface ImageCarouselProps {
  images: string[];
  alt: string;
  autoPlayMs?: number;
  keyboard?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function ImageCarousel({
  images,
  alt,
  autoPlayMs,
  keyboard = false,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 60vw',
  className = 'aspect-[16/10] bg-surface',
}: ImageCarouselProps) {
  const [slide, setSlide] = useState<{ index: number; via: Via }>({ index: 0, via: 'auto' });
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = images.length;
  const { index, via } = slide;

  const go = useCallback(
    (step: number, how: Via) => setSlide((s) => ({ index: (s.index + step + count) % count, via: how })),
    [count],
  );

  useEffect(() => {
    if (!autoPlayMs || paused || reduce || count < 2) return;
    const id = window.setInterval(() => go(1, 'auto'), autoPlayMs);
    return () => window.clearInterval(id);
  }, [autoPlayMs, paused, reduce, count, go]);

  useEffect(() => {
    if (!keyboard || count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1, 'key');
      if (e.key === 'ArrowLeft') go(-1, 'key');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [keyboard, count, go]);

  if (count === 0) return null;

  // Arrows hide until hover only where hover exists. On touch screens they stay visible.
  const arrowClass =
    'absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-[opacity,background-color,scale] duration-150 ease-out hover:bg-black/70 active:scale-[0.97] pointer-fine:opacity-0 group-hover:opacity-100 focus-visible:opacity-100';

  return (
    <div
      className={`group relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false} mode="popLayout" custom={via}>
        <motion.div
          key={images[index]}
          className="absolute inset-0"
          custom={via}
          variants={SLIDE}
          initial="enter"
          animate="show"
          exit="leave"
        >
          <Image
            src={images[index]}
            alt={`${alt} — screen ${index + 1} of ${count}`}
            fill
            sizes={sizes}
            priority={priority && index === 0}
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>

      {count > 1 && (
        <>
          <button type="button" onClick={() => go(-1, 'click')} aria-label="Previous screen" className={`left-3 ${arrowClass}`}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(1, 'click')} aria-label="Next screen" className={`right-3 ${arrowClass}`}>
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setSlide({ index: i, via: 'click' })}
                aria-label={`Show screen ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out ${i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/55 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
