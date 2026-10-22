'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { CalendarDays, CircleCheck, LoaderCircle, Mail, Send } from 'lucide-react';
import { projectTypes, timelines } from '@/lib/content';
import { SITE, bookingLink, whatsappLink } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const fieldClass =
  'w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink placeholder:text-muted/70 transition-colors focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/20';

function Field({ label, htmlFor, optional, children }: { label: string; htmlFor: string; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

function ContactOption({
  href,
  icon,
  title,
  detail,
  external,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  detail: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-card p-5 transition-[translate,border-color] motion-safe:hover:-translate-y-0.5 hover:border-ember/50"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface text-ink">{icon}</span>
      <span className="min-w-0">
        <span className="block font-semibold text-ink">{title}</span>
        <span className="block truncate text-sm text-muted">{detail}</span>
      </span>
    </a>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch(SITE.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: `New ${SITE.name} inquiry: ${data.projectType || 'General'}`,
          source: SITE.name,
        }),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Start a project"
            title="Tell us what you're building."
            intro="Every project is quoted individually after a short call. Share a few details and we'll get back to you soon."
          />
          <Reveal className="space-y-3">
            <ContactOption
              href={whatsappLink()}
              external
              icon={<WhatsAppIcon className="h-6 w-6 text-[#25D366]" />}
              title="Chat on WhatsApp"
              detail={SITE.phoneDisplay}
            />
            <ContactOption
              href={bookingLink()}
              external={Boolean(SITE.bookingUrl)}
              icon={<CalendarDays className="h-6 w-6 text-ember-strong" />}
              title="Book a free discovery call"
              detail="Free, no obligation"
            />
            <ContactOption
              href={`mailto:${SITE.email}`}
              icon={<Mail className="h-6 w-6 text-teal" />}
              title="Email us"
              detail={SITE.email}
            />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-line bg-card p-6 sm:p-9"
            aria-describedby="form-status"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" htmlFor="name">
                <input id="name" name="name" required autoComplete="name" className={fieldClass} placeholder="Priya Sharma" />
              </Field>
              <Field label="Email" htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={fieldClass}
                  placeholder="you@company.com"
                />
              </Field>
              <Field label="Phone / WhatsApp" htmlFor="phone" optional>
                <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="+91 …" />
              </Field>
              <Field label="What do you need?" htmlFor="projectType">
                <select id="projectType" name="projectType" required defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </Field>
              <Field label="Budget" htmlFor="budget" optional>
                <input id="budget" name="budget" className={fieldClass} placeholder="e.g. ₹1–2 lakh or $2,000" />
              </Field>
              <Field label="Timeline" htmlFor="timeline" optional>
                <select id="timeline" name="timeline" defaultValue="" className={fieldClass}>
                  <option value="">Not sure yet</option>
                  {timelines.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="About your project" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={`${fieldClass} resize-y`}
                    placeholder="What does your business do, and what would you like built?"
                  />
                </Field>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ember-strong px-6 py-3.5 font-semibold text-on-ember transition-[translate,scale,box-shadow,opacity] duration-150 ease-out motion-safe:enabled:hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ember/25 active:scale-[0.97] disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {status === 'sending' ? 'Sending…' : 'Send inquiry'}
              </button>
              <p id="form-status" role="status" aria-live="polite" className="text-sm">
                {status === 'sent' && (
                  <span className="inline-flex items-center gap-2 text-teal">
                    <CircleCheck className="h-4 w-4" />
                    Thanks! We&apos;ll be in touch soon.
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-ember-strong">
                    Something went wrong. Please try again, or message us on WhatsApp.
                  </span>
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
