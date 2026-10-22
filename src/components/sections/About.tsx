import { Github, Linkedin } from 'lucide-react';
import { SITE } from '@/lib/site';
import { LogoMark } from '@/components/brand/Logo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const PRINCIPLES = [
  {
    title: 'Solid foundations',
    description: 'Modern, typed, well-structured code on a proven stack, so your product is easy to grow and maintain.',
  },
  {
    title: 'Plain-language communication',
    description: 'Clear scope, honest timelines and regular updates. You always know where your project stands.',
  },
  {
    title: 'We build our own products too',
    description: 'Running Fast Menu teaches us what real users and real businesses need, and we bring that to client work.',
  },
];

export function About() {
  const initials = SITE.founder.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <section id="about" className="scroll-mt-20 bg-surface py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="About the studio"
            title="Why “Keystone”?"
            intro={
              <>
                In an arch, the keystone is the last stone set at the very top. It locks every other stone in place and
                lets the whole structure carry weight. That&apos;s the role we want to play: the piece that makes the rest
                of your business hold together.
              </>
            }
          />
          <Reveal>
            <p className="max-w-2xl leading-relaxed text-body">
              {SITE.name} is a digital product studio based in {SITE.location}. We design and build websites, SaaS
              platforms and AI-powered tools for businesses in India and around the world. We also build and run our
              own product, Fast Menu, a QR digital menu platform for restaurants, cafés and hotels.
            </p>
          </Reveal>
          <ul className="mt-10 space-y-6">
            {PRINCIPLES.map((principle, i) => (
              <Reveal as="li" key={principle.title} delay={i * 0.06} className="flex gap-4">
                <LogoMark className="mt-1 h-4 w-auto shrink-0 text-stone" />
                <div>
                  <h3 className="font-semibold text-ink">{principle.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{principle.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1} className="lg:pt-24">
          <div className="rounded-3xl border border-line bg-card p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ember-soft font-display text-xl font-semibold text-ember-strong">
                {initials}
              </span>
              <div>
                <p className="font-display text-xl font-semibold text-ink">{SITE.founder.name}</p>
                <p className="text-sm text-muted">
                  {SITE.founder.role}, {SITE.name}
                </p>
              </div>
            </div>
            <p className="mt-6 leading-relaxed text-body">
              A full-stack engineer with 5+ years of building production web applications: SaaS platforms, e-commerce
              stores and AI-powered products. Akshay leads Keystone projects from the first call to launch day and
              beyond.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SITE.founder.name} on LinkedIn`}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-body transition-colors hover:border-ember hover:text-ember-strong"
              >
                <Linkedin className="h-[18px] w-[18px]" />
              </a>
              <a
                href={SITE.founder.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SITE.founder.name} on GitHub`}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-body transition-colors hover:border-ember hover:text-ember-strong"
              >
                <Github className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
