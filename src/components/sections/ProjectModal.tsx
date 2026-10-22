'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import type { Project } from '@/lib/content';
import { EASE_DRAWER, EASE_OUT } from '@/lib/motion';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

// Below `sm` the panel is a bottom sheet, so it rises from the screen edge. From `sm` up it's a
// centered dialog that eases in a short way. Reduced motion gets a plain fade.
function panelStates(sheet: boolean, reduce: boolean): { hidden: TargetAndTransition; shown: TargetAndTransition } {
  if (reduce) return { hidden: { opacity: 0 }, shown: { opacity: 1 } };
  if (sheet) return { hidden: { transform: 'translateY(100%)' }, shown: { transform: 'translateY(0%)' } };
  return {
    hidden: { opacity: 0, transform: 'translateY(12px)' },
    shown: { opacity: 1, transform: 'translateY(0px)' },
  };
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  // The modal only mounts after a click, so `window` is always there. Read once so it can't change mid-animation.
  const [sheet] = useState(() => !window.matchMedia('(min-width: 640px)').matches);

  const slides = sheet && !reduce;
  const { hidden, shown } = panelStates(sheet, reduce);
  // Opening can take its time; closing is the site responding, so it's quicker.
  const enter: Transition = slides ? { duration: 0.35, ease: EASE_DRAWER } : { duration: 0.25, ease: EASE_OUT };
  const leave: Transition = { duration: slides ? 0.22 : 0.18, ease: EASE_OUT };

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Keep Tab focus inside the dialog.
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const titleId = `project-${project.id}-title`;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2, ease: EASE_OUT } }}
      exit={{ opacity: 0, transition: leave }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-3xl bg-card shadow-2xl sm:rounded-3xl"
        initial={hidden}
        animate={{ ...shown, transition: enter }}
        exit={{ ...hidden, transition: leave }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-[background-color,scale] duration-150 ease-out hover:bg-black/70 active:scale-[0.97]"
        >
          <X className="h-5 w-5" />
        </button>

        <ImageCarousel
          images={project.images}
          alt={project.name}
          keyboard
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="aspect-[16/10] max-h-[60vh] bg-surface"
        />

        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember-strong">{project.category}</p>
            <h3 id={titleId} className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
              {project.name}
            </h3>
            <p className="mt-1 text-lg text-muted">{project.subtitle}</p>
            <p className="mt-5 leading-relaxed text-body">{project.description}</p>
          </div>

          <div className="space-y-6">
            <dl className="grid grid-cols-3 gap-3 lg:grid-cols-1">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl bg-surface p-4">
                  <dt className="text-xs uppercase tracking-wider text-muted">{metric.label}</dt>
                  <dd className="mt-1 font-semibold text-ink">{metric.value}</dd>
                </div>
              ))}
            </dl>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Built with</p>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-body">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-ember-strong px-5 py-3 font-semibold text-on-ember transition-transform duration-150 ease-out motion-safe:hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Visit live site
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <p className="rounded-xl border border-dashed border-line px-5 py-3 text-center text-sm text-muted">
                {project.status ?? 'Live demo available on request'}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
