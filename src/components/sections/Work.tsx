'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectModal } from './ProjectModal';

function Cover({ project }: { project: Project }) {
  if (Array.isArray(project.cover)) {
    return (
      // The phones rest 8px below the card edge (hidden by overflow) and rise on hover, so lifting
      // them never shows their open bottoms.
      <div className="absolute inset-0 flex items-end justify-center gap-3 px-6 pt-6 sm:gap-4">
        {project.cover.map((src, i) => (
          <div
            key={src}
            className={`relative aspect-[9/20] overflow-hidden rounded-t-xl border border-b-0 border-line shadow-lg transition-transform duration-300 motion-safe:translate-y-2 motion-safe:group-hover:translate-y-0 ${i === 1 ? 'h-[94%]' : 'h-[82%]'}`}
          >
            <Image src={src} alt="" fill sizes="(max-width: 768px) 30vw, 15vw" className="object-cover object-top" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <Image
      src={project.cover}
      alt=""
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover object-top transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
    />
  );
}

export function Work() {
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="work" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Products we've designed, built and shipped."
          intro="SaaS platforms, online stores, AI tools and apps. Tap any project to see screens, features and the stack behind it."
        />

        <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.id} delay={(i % 2) * 0.08}>
              <button
                type="button"
                onClick={() => setActive(project)}
                className="group block w-full text-left"
                aria-haspopup="dialog"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-surface">
                  <Cover project={project} />
                  <div className="absolute left-4 top-4 flex gap-2">
                    {project.ownProduct && (
                      <span className="rounded-full bg-ember-strong px-3 py-1 text-xs font-semibold text-on-ember">
                        Our product
                      </span>
                    )}
                    {project.status && (
                      <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-canvas">
                        {project.status}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember-strong">
                      {project.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                      {project.name}
                      <span className="font-normal text-muted"> — {project.subtitle}</span>
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted">{project.summary}</p>
                  </div>
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-[rotate,border-color,background-color,color] duration-300 motion-safe:group-hover:rotate-45 group-hover:border-ember group-hover:bg-ember-strong group-hover:text-on-ember">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active && <ProjectModal key={active.id} project={active} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
