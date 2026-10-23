'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, type Transition, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
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

export interface CarouselVideo {
  src: string;
  poster: string;
  label: string;
}

interface ImageCarouselProps {
  images: string[];
  alt: string;
  /** Shown as the first slide. Autoplay waits for it to finish instead of using the timer. */
  video?: CarouselVideo;
  autoPlayMs?: number;
  keyboard?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

// Shared look for the round controls that sit on top of the slides.
const CONTROL =
  'flex items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-[opacity,background-color,scale] duration-150 ease-out hover:bg-black/70 active:scale-[0.97]';

function VideoSlide({ video, autoPlay, onEnded }: { video: CarouselVideo; autoPlay: boolean; onEnded: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Set when the viewer presses pause, so scrolling back into view doesn't restart it.
  const userPaused = useRef(false);

  // Play only while at least half the video is on screen, to save data and battery.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && autoPlay && !userPaused.current) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlay]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    userPaused.current = !el.paused;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <>
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        playsInline
        preload="metadata"
        aria-label={video.label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={onEnded}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause video' : 'Play video'}
        className={`absolute bottom-3 left-3 h-9 w-9 ${CONTROL}`}
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-px" />}
      </button>
    </>
  );
}

export function ImageCarousel({
  images,
  alt,
  video,
  autoPlayMs,
  keyboard = false,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 60vw',
  className = 'aspect-[16/10] bg-surface',
}: ImageCarouselProps) {
  const [slide, setSlide] = useState<{ index: number; via: Via }>({ index: 0, via: 'auto' });
  const [paused, setPaused] = useState(false);
  const [videoDone, setVideoDone] = useState(false);
  const reduce = useReducedMotion();
  const slides = video ? [video.src, ...images] : images;
  const count = slides.length;
  const { index, via } = slide;
  const onVideo = !!video && index === 0;
  const firstImage = video ? 1 : 0;

  const go = useCallback(
    (step: number, how: Via) => {
      setVideoDone(false);
      setSlide((s) => ({ index: (s.index + step + count) % count, via: how }));
    },
    [count],
  );

  // One timer per slide, so a manual change gives the new slide its full time.
  // The video slide moves on shortly after it ends rather than on the timer.
  useEffect(() => {
    if (!autoPlayMs || paused || reduce || count < 2) return;
    if (onVideo && !videoDone) return;
    const id = window.setTimeout(() => go(1, 'auto'), onVideo ? 600 : autoPlayMs);
    return () => window.clearTimeout(id);
  }, [autoPlayMs, paused, reduce, count, go, index, onVideo, videoDone]);

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
  const arrowClass = `absolute top-1/2 h-10 w-10 -translate-y-1/2 ${CONTROL} pointer-fine:opacity-0 group-hover:opacity-100 focus-visible:opacity-100`;

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
          key={slides[index]}
          className="absolute inset-0"
          custom={via}
          variants={SLIDE}
          initial="enter"
          animate="show"
          exit="leave"
        >
          {onVideo && video ? (
            <VideoSlide video={video} autoPlay={!reduce} onEnded={() => setVideoDone(true)} />
          ) : (
            <Image
              src={slides[index]}
              alt={`${alt} — screen ${index - firstImage + 1} of ${images.length}`}
              fill
              sizes={sizes}
              priority={priority && index === firstImage}
              className="object-contain"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {count > 1 && (
        <>
          <button type="button" onClick={() => go(-1, 'click')} aria-label="Previous slide" className={`left-3 ${arrowClass}`}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(1, 'click')} aria-label="Next slide" className={`right-3 ${arrowClass}`}>
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur">
            {slides.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => {
                  setVideoDone(false);
                  setSlide({ index: i, via: 'click' });
                }}
                aria-label={i < firstImage ? 'Show video' : `Show screen ${i - firstImage + 1}`}
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
