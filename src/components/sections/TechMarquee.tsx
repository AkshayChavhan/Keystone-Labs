import { techStack } from '@/lib/content';

// One copy of the strip must be wider than the widest screen, or a gap shows at the end of each loop.
const MIN_COPY_WIDTH = 4000; // px, past a 3840px-wide 4K screen
const PX_PER_SECOND = 63; // the original pace
// Rough rendered width of one item: 8-10px per character at text-lg, plus the gaps and the diamond.
// Erring low means an extra repeat, never a gap.
const itemWidth = (tech: string) => tech.length * 8 + 86;

export function TechMarquee({ items = techStack }: { items?: string[] } = {}) {
  if (items.length === 0) return null;

  const listWidth = items.reduce((sum, tech) => sum + itemWidth(tech), 0);
  const repeats = Math.max(1, Math.ceil(MIN_COPY_WIDTH / listWidth));
  const passes = Array.from({ length: repeats }, (_, pass) => pass);
  const seconds = Math.round((listWidth * repeats) / PX_PER_SECOND);

  return (
    <section aria-label="Technologies we work with" className="border-y border-line bg-surface py-6">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        {/* Two identical copies scroll by half the track. Only the first pass of the list is read aloud. */}
        <ul className="flex w-max animate-marquee items-center gap-10 pr-10" style={{ animationDuration: `${seconds}s` }}>
          {[0, 1].flatMap((half) =>
            passes.flatMap((pass) =>
              items.map((tech) => (
                <li
                  key={`${half}-${pass}-${tech}`}
                  aria-hidden={half > 0 || pass > 0}
                  className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-medium text-muted"
                >
                  {tech}
                  <span className="h-1.5 w-1.5 rotate-45 bg-ember/70" aria-hidden="true" />
                </li>
              )),
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
