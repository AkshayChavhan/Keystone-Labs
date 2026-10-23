import { ArrowUpRight } from 'lucide-react';
import { insights, type Insight } from '@/lib/content';
import { SITE } from '@/lib/site';
import { LogoMark } from '@/components/brand/Logo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const dateFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

// Parses YYYY-MM-DD as a calendar date in UTC, so the build machine's timezone can't shift the day.
// Anything else fails the build with a clear message instead of showing the wrong month.
function formatDate(date: string, title: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const parsed = match ? new Date(Date.UTC(+match[1], +match[2] - 1, +match[3])) : null;
  if (!parsed || parsed.getUTCDate() !== +match![3]) {
    throw new Error(`Insight "${title}" has date "${date}". Use YYYY-MM-DD, e.g. 2026-06-04.`);
  }
  return dateFormat.format(parsed);
}

export function Insights({ items = insights, author = SITE.founder.name }: { items?: Insight[]; author?: string } = {}) {
  if (items.length === 0) return null;
  return (
    <section id="insights" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Insights"
          title="Notes from the lab."
          intro="What we learn building AI products, written up for business owners and engineers alike."
        />
        <ul className="grid gap-6 md:grid-cols-2">
          {items.map((post, i) => (
            <Reveal as="li" key={post.url} delay={i * 0.08}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card p-8 transition-[translate,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-1 hover:border-ember/40 hover:shadow-xl hover:shadow-black/5 sm:p-9"
              >
                <LogoMark className="pointer-events-none absolute right-8 top-8 h-5 w-auto text-stone transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 sm:right-9 sm:top-9" />
                <div className="relative flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
                  <span className="rounded-full bg-ember-soft px-3 py-1 text-ember-strong">{post.category}</span>
                  <span className="text-muted">{post.source}</span>
                </div>
                <h3 className="relative mt-6 font-display text-2xl font-semibold leading-snug tracking-tight text-ink">
                  {post.title}
                </h3>
                <p className="relative mt-4 leading-relaxed text-muted">{post.excerpt}</p>
                <div className="relative mt-auto flex items-center justify-between gap-4 pt-8">
                  <p className="text-xs text-muted">
                    <time dateTime={post.date}>{formatDate(post.date, post.title)}</time> · {post.readTime} ·{' '}
                    {author}
                  </p>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-ember-strong">
                    Read
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
