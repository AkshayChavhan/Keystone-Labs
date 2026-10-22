import { techStack } from '@/lib/content';

// The list is rendered twice so the loop scrolls seamlessly; the copy is hidden from screen readers.
const COPIES = ['a', 'b'] as const;

export function TechMarquee() {
  return (
    <section aria-label="Technologies we work with" className="border-y border-line bg-surface py-6">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-10 pr-10">
          {COPIES.flatMap((copy) =>
            techStack.map((tech) => (
              <li
                key={`${copy}-${tech}`}
                aria-hidden={copy === 'b'}
                className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-medium text-muted"
              >
                {tech}
                <span className="h-1.5 w-1.5 rotate-45 bg-ember/70" aria-hidden="true" />
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
