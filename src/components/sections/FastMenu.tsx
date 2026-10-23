import { ArrowUpRight } from 'lucide-react';
import { fastMenuFeatures, fastMenuImages, fastMenuVideo, type Feature } from '@/lib/content';
import { SITE, whatsappLink } from '@/lib/site';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ImageCarousel, type CarouselVideo } from '@/components/ui/ImageCarousel';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

const VENUES = ['Hotels', 'Restaurants', 'Cafés', 'Bars'];

interface FastMenuProps {
  features?: Feature[];
  images?: string[];
  /** null hides the video slide. */
  video?: CarouselVideo | null;
}

export function FastMenu({ features = fastMenuFeatures, images = fastMenuImages, video = fastMenuVideo }: FastMenuProps = {}) {
  const hasMedia = images.length > 0 || !!video;
  const hasFeatures = features.length > 0;
  // With only one of the two, it takes the full width.
  const mediaSpan = hasFeatures ? 'lg:col-span-7' : 'lg:col-span-12';
  const featureSpan = hasMedia ? 'lg:col-span-5' : 'lg:col-span-12 lg:max-w-3xl';
  return (
    // The "dark" class keeps this band dark in both themes, so the product stands apart.
    <section id="fast-menu" className="dark relative scroll-mt-16 overflow-hidden bg-surface py-20 text-body sm:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-ember/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ember">
              <span className="h-px w-8 bg-ember" aria-hidden="true" />
              Our product
            </p>
            <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {SITE.fastMenu.name}: QR menus that restaurants update in seconds.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Guests scan a code at the table and see a beautiful, always-current menu. Owners change prices, add
              dishes or mark something sold out right from their phone. No reprints, no app downloads.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <ButtonLink href={SITE.fastMenu.demoUrl} external>
              Try the live demo
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={whatsappLink(`Hi ${SITE.name}, I'm interested in Fast Menu for my restaurant.`)}
              external
              variant="secondary"
            >
              <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
              Get it for your venue
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {hasMedia && (
            <Reveal className={mediaSpan}>
              <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-2xl shadow-black/40">
                <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 truncate rounded-md bg-surface px-3 py-1 text-xs text-muted">
                    fast-menu-zeta.vercel.app
                  </span>
                </div>
                <ImageCarousel
                  images={images}
                  video={video ?? undefined}
                  alt="Fast Menu"
                  autoPlayMs={5000}
                  className="aspect-[16/10] bg-white"
                />
              </div>
            </Reveal>
          )}

          {hasFeatures && (
            <Reveal delay={0.1} className={featureSpan}>
              <ul className="divide-y divide-line">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <li key={feature.title} className="flex gap-4 py-4 first:pt-0">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember-soft text-ember">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-ink">{feature.title}</h3>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted">{feature.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          )}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-line pt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Made for</span>
          {VENUES.map((venue) => (
            <span key={venue} className="font-display text-xl font-medium text-ink">
              {venue}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
