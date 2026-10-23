import { Check } from 'lucide-react';
import { extraServices, services, type Service } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const NUMBER_WORDS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

// "Four things, done properly." stays true when a service is added or removed.
function headline(count: number) {
  if (count === 1) return 'One thing, done properly.';
  const word = NUMBER_WORDS[count - 1];
  return word ? `${word} things, done properly.` : 'Everything we do, done properly.';
}

export function Services({ items = services, extras = extraServices }: { items?: Service[]; extras?: string[] } = {}) {
  if (items.length === 0) return null;
  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we do"
          title={headline(items.length)}
          intro="From a five-page website to a multi-tenant platform, every project gets the same care: clean design, solid engineering and a launch you can rely on."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {items.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.06}>
                <article className="group flex h-full flex-col rounded-3xl border border-line bg-card p-7 transition-[translate,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-1 hover:border-ember/40 hover:shadow-xl hover:shadow-ember/5 sm:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ember-soft text-ember-strong">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-sm font-medium text-muted">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{service.description}</p>
                  {service.deliverables.length > 0 && (
                    <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-body">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {service.examples.length > 0 && (
                    <p className="mt-auto pt-7 text-sm text-muted">
                      See it in:{' '}
                      <span className="font-medium text-ink">{service.examples.join(', ')}</span>
                    </p>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>

        {extras.length > 0 && (
          <Reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-dashed border-line px-6 py-5 text-sm">
            <span className="font-semibold text-ink">Also available</span>
            {extras.map((item) => (
              <span key={item} className="flex items-center gap-2 text-body">
                <span className="h-1.5 w-1.5 rotate-45 bg-ember" aria-hidden="true" />
                {item}
              </span>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
