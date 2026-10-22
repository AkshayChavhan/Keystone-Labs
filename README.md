# Keystone Lab

Marketing website for Keystone Lab, a digital product studio (websites, SaaS, AI integration, e-commerce) and maker of Fast Menu.

Single-page site built with Next.js 16, React 19, Tailwind CSS 4 and Framer Motion.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where to edit

| What | File |
| --- | --- |
| Brand name, tagline, email, WhatsApp, booking link, form endpoint | `src/lib/site.ts` |
| Services, Fast Menu features, projects, solutions, articles | `src/lib/content.ts` |
| Colours (Stone & Ember palette) and fonts | `src/app/globals.css` |
| Logo (arch with ember keystone) | `src/components/brand/Logo.tsx`, `src/app/icon.svg` |
| Page sections and their order | `src/app/page.tsx`, `src/components/sections/` |
| Project screenshots | `public/images/` |

## Before launch

- [ ] Buy a domain, then set `NEXT_PUBLIC_SITE_URL` in Vercel (used for SEO, sitemap and share images).
- [ ] Create a business email (e.g. `hello@<domain>`) and update `email` in `src/lib/site.ts`.
- [ ] Add a Calendly / Cal.com link to `bookingUrl`. Until then, "Book a call" opens an email draft.
- [ ] Optional: create a separate Formspree form for Keystone so inquiries don't mix with portfolio messages. Inquiries already arrive with the subject "New Keystone Lab inquiry: …".

## Deploy

Import the repo into Vercel. No environment variables are required to build.
