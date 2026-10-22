import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SITE, whatsappLink } from '@/lib/site';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { HeroArch } from './HeroArch';

const STATS = [
  { value: '8', label: 'Products built' },
  { value: '5+ yrs', label: 'Shipping production software' },
  { value: 'IN + Global', label: 'Remote-friendly studio' },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-ember/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        {/* No entrance animation here: the copy is visible on first paint and the arch carries the motion. */}
        <div>
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3.5 py-1.5 text-xs font-medium text-body backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
            Digital product studio · {SITE.location}
          </p>

          <h1 className="font-display text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.025em] text-ink sm:text-6xl lg:text-[4.1rem]">
            We build the piece that <span className="text-ember">holds</span> your business together.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{SITE.tagline}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#contact">
              Start a project
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={whatsappLink()} external variant="secondary">
              <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
              Chat on WhatsApp
            </ButtonLink>
            <a
              href="#fast-menu"
              className="inline-flex items-center justify-center gap-1 px-2 py-2 text-sm font-medium text-body underline-offset-4 hover:text-ink hover:underline"
            >
              or see Fast Menu
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-xl font-semibold text-ink sm:text-2xl">{stat.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto w-full max-w-[560px]">
          <HeroArch />
        </div>
      </div>
    </section>
  );
}
