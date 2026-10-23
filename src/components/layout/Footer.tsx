import { Mail, MapPin } from 'lucide-react';
import { NAV_LINKS, SITE, whatsappLink } from '@/lib/site';
import { Logo } from '@/components/brand/Logo';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            A digital product studio building websites, SaaS platforms and AI tools. Makers of{' '}
            <a href="#fast-menu" className="font-medium text-ink underline-offset-4 hover:underline">
              Fast Menu
            </a>
            .
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-body transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Contact</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 text-body hover:text-ink">
                <Mail className="h-4 w-4 shrink-0 text-muted" />
                <span className="min-w-0 wrap-anywhere">{SITE.email}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-body hover:text-ink"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-muted" />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-body">
              <MapPin className="h-4 w-4 shrink-0 text-muted" />
              {SITE.location}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p>Designed and built in-house.</p>
        </div>
      </div>
    </footer>
  );
}
