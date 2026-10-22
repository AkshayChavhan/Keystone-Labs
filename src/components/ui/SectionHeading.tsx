import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, intro, align = 'left' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal className={`mb-12 max-w-2xl sm:mb-14 ${centered ? 'mx-auto text-center' : ''}`}>
      <p className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ember-strong ${centered ? 'justify-center' : ''}`}>
        <span className="h-px w-8 bg-ember" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}
