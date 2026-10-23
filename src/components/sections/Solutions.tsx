import { ArrowRight } from 'lucide-react';
import { solutions, type Solution } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

// The grid draws its dividers with the gap colour, so empty cells in the last row would show as a
// solid block. Blank filler cells complete the row: up to 3 at four columns, 1 at two columns.
function fillers(count: number) {
  const atLg = (4 - (count % 4)) % 4;
  const atSm = (2 - (count % 2)) % 2;
  return Array.from({ length: atLg }, (_, i) => (
    <li
      key={`filler-${i}`}
      aria-hidden="true"
      className={`hidden bg-card ${i < atSm ? 'sm:block' : 'sm:hidden'} lg:block`}
    />
  ));
}

export function Solutions({ items = solutions }: { items?: Solution[] } = {}) {
  if (items.length === 0) return null;
  return (
    <section id="solutions" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Solutions we build"
          title="Recognise your business here?"
          intro="These are systems we design and build to fit how you already work, not off-the-shelf templates."
        />
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {items.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <Reveal as="li" key={solution.title} delay={(i % 4) * 0.05} className="group bg-card p-7 transition-colors hover:bg-surface">
                <Icon className="h-7 w-7 text-ember-strong transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5" />
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{solution.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{solution.description}</p>
              </Reveal>
            );
          })}
          {fillers(items.length)}
        </ul>
        <Reveal className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-ink px-7 py-6 text-canvas sm:flex-row sm:items-center">
          <p className="font-display text-lg font-medium">Need something that isn&apos;t on the list?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-canvas px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-150 ease-out motion-safe:hover:-translate-y-0.5 active:scale-[0.97]"
          >
            Tell us what you need
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
