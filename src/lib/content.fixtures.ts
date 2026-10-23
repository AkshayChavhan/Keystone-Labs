// Dev-only datasets for /dev/break-ui. Same shapes as content.ts, filled with the worst realistic
// content someone could add later. Keep this file: it's the regression test for these sections.
import { Building2, ChefHat, CreditCard, Smartphone, Truck, Users, Wrench } from 'lucide-react';
import type { CarouselVideo } from '@/components/ui/ImageCarousel';
import {
  extraServices,
  fastMenuFeatures,
  fastMenuImages,
  fastMenuVideo,
  insights,
  projects,
  services,
  solutions,
  techStack,
  type Feature,
  type Insight,
  type Project,
  type Service,
  type Solution,
} from './content';
import { SITE } from './site';

export interface Dataset {
  techStack: string[];
  services: Service[];
  extraServices: string[];
  fastMenuFeatures: Feature[];
  fastMenuImages: string[];
  fastMenuVideo: CarouselVideo | null;
  projects: Project[];
  solutions: Solution[];
  insights: Insight[];
  founder: { name: string; role: string; linkedin: string; github: string };
  email: string;
  phoneDisplay: string;
}

const demo: Dataset = {
  techStack,
  services,
  extraServices,
  fastMenuFeatures,
  fastMenuImages,
  fastMenuVideo,
  projects,
  solutions,
  insights,
  founder: SITE.founder,
  email: SITE.email,
  phoneDisplay: SITE.phoneDisplay,
};

// Each of the first rows carries a different failure, as real content would.
const worstProjects: Project[] = [
  {
    // Unbreakable domain-style name; both badges with a long status; 4 metrics; one screenshot.
    id: 'worst-domain-name',
    name: 'Shubhmangalkaryalay.com',
    subtitle: 'Wedding hall bookings, deposits & vendor coordination',
    category: 'Website · Bookings · Payments · Our product',
    summary:
      'Online bookings for a 600-guest wedding hall in Pimpri-Chinchwad, with Razorpay deposits, a shared calendar for caterers and decorators, and WhatsApp reminders.',
    description:
      'Booking platform for a wedding hall: date availability, package builder, Razorpay deposits with GST invoices, a shared calendar for caterers, decorators and photographers, and automated WhatsApp reminders before each event.',
    metrics: [
      { label: 'Payments', value: 'Razorpay + PhonePe + PayU' },
      { label: 'Bookings', value: '1,284 events / year' },
      { label: 'Vendors', value: 'Caterers, decorators, photographers' },
      { label: 'Reminders', value: 'WhatsApp Business API' },
    ],
    tech: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Razorpay'],
    cover: '/images/built-environment2.png',
    images: ['/images/built-environment2.png'],
    link: 'https://example.com/projects/shubhmangal-karyalay/live-demo?ref=keystone-lab&utm_source=portfolio',
    status: 'Private beta — invite only',
    ownProduct: true,
  },
  {
    // Two-letter name, empty subtitle, a single portrait screenshot as the cover, no images at all.
    id: 'worst-short-name',
    name: 'Jo',
    subtitle: '',
    category: 'App',
    summary: 'Habit tracker.',
    description: 'A tiny habit tracker.',
    metrics: [{ label: 'Status', value: 'Prototype' }],
    tech: ['React'],
    cover: '/images/captain-kiddo-1.png',
    images: [],
  },
  {
    // Long name and subtitle, four phone screens, many tech tags, long metric values.
    id: 'worst-long-name',
    name: 'Sahyadri Multispeciality Hospital Patient Portal',
    subtitle: 'Appointments, lab reports & billing across three branches',
    category: 'SaaS · Healthcare · Multi-branch',
    summary:
      'Patients book appointments, download lab reports and pay bills online; front-desk staff manage queues for 40+ doctors across three branches.',
    description:
      'Patient portal and front-desk system for a multi-branch hospital. Online appointment booking with doctor schedules, lab report downloads, bill payments, queue management for reception, and role-based access for doctors, nurses, lab technicians and billing staff.',
    metrics: [
      { label: 'Doctors', value: '40+ across 3 branches' },
      { label: 'Roles', value: 'Doctor, nurse, lab, billing, admin' },
      { label: 'Payments', value: 'Razorpay + insurance claims' },
    ],
    tech: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Supabase',
      'Tailwind CSS',
      'React Query',
      'Zod',
      'Razorpay',
      'Amazon Web Services (S3, SES, CloudFront)',
      'Twilio',
      'Sentry',
      'Playwright',
      'Vitest',
      'Docker',
    ],
    cover: ['/images/saakie1.png', '/images/saakie3.png', '/images/saakie6.png', '/images/saakie7.png'],
    images: ['/images/saakie1.png', '/images/saakie3.png', '/images/saakie6.png', '/images/saakie7.png'],
    link: 'https://example.com/sahyadri-portal',
  },
  {
    // Cover path with a typo (file renamed later); one screenshot also missing; status only.
    id: 'worst-broken-image',
    name: 'Tiffin Wala',
    subtitle: 'Daily meal subscriptions for offices',
    category: 'SaaS · Food delivery',
    summary: 'Office workers subscribe to home-style lunches; kitchens see tomorrow’s orders at 9 pm.',
    description: 'Meal subscription platform connecting home kitchens with office workers, with daily cut-off times and route sheets for delivery staff.',
    metrics: [
      { label: 'Plans', value: 'Weekly & monthly' },
      { label: 'Cut-off', value: '9 pm daily' },
      { label: 'Delivery', value: 'Route sheets' },
    ],
    tech: ['Next.js 16', 'TypeScript', 'MongoDB'],
    cover: '/images/tiffin-wala-cover-final.png',
    images: ['/images/tiffin-wala-cover-final.png', '/images/msg2ai-dashboard.png'],
    status: 'In development',
  },
  {
    // Two phone screens; ampersand, quotes and a literal tag in the copy.
    id: 'worst-escaping',
    name: 'Kumar & Sons "Hardware" Store',
    subtitle: 'Inventory & GST billing',
    category: 'Web app · Retail',
    summary: 'Stock, GST invoices & <b>WhatsApp</b> payment reminders for a family hardware shop.',
    description: 'Inventory and GST billing for a hardware store, with barcode scanning and WhatsApp payment reminders.',
    metrics: [
      { label: 'Billing', value: 'GST-ready' },
      { label: 'Stock', value: 'Barcode scanning' },
      { label: 'Reminders', value: 'WhatsApp' },
    ],
    tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
    cover: ['/images/captain-kiddo-2.png', '/images/captain-kiddo-3.png'],
    images: ['/images/captain-kiddo-2.png', '/images/captain-kiddo-3.png'],
    link: 'https://example.com/kumar-and-sons',
  },
  // Real projects fill out the rest, for an odd total of 9.
  ...projects.slice(1, 5),
];

const worstServices: Service[] = [
  {
    ...services[1],
    title: 'Custom SaaS, internal tools & web applications',
    deliverables: [
      'Multi-tenant architecture',
      'GST-ready invoicing with Tally & Zoho Books sync',
      'Role-based access',
      'Admin dashboards',
      'Subscriptions & payments',
    ],
    examples: ['Fast Menu', 'MSG2AI', 'SAAKIE', 'BuiltEnvironment Studio', 'Captain Kiddo'],
  },
  { ...services[0], examples: [] },
  { ...services[2], deliverables: ['AI assistants & chatbots'] },
  services[3],
  {
    title: 'Mobile apps (iOS & Android)',
    description: 'Installable apps and PWAs for customers and staff.',
    icon: Smartphone,
    deliverables: ['React Native / Expo', 'Push notifications', 'Offline mode'],
    examples: ['Captain Kiddo'],
  },
];

const worstFeatures: Feature[] = [
  {
    title: 'Allergen, dietary & spice-level filters on every dish (Jain, vegan, gluten-free, no onion-garlic)',
    description: fastMenuFeatures[1].description,
    icon: fastMenuFeatures[1].icon,
  },
  ...fastMenuFeatures,
  { title: 'Waiter calls', description: 'Guests tap to call a waiter.', icon: Users },
];

const worstSolutions: Solution[] = [
  {
    title: 'Society & apartment maintenance management',
    description:
      'Maintenance bills, visitor logs, complaint tickets, amenity booking and committee notices for housing societies with hundreds of flats.',
    icon: Building2,
  },
  { title: 'Restaurant POS & kitchen display systems', description: 'Orders, KOTs and table billing.', icon: ChefHat },
  ...solutions.slice(0, 7),
];

const worstInsights: Insight[] = [
  {
    title:
      "Why Your Restaurant's Printed Menu Is Costing You More Than You Think — and What a QR Menu Actually Fixes (With Real Numbers From Pune Cafés)",
    excerpt:
      'Reprints, stale prices, sold-out dishes guests still order, and the upsell nobody mentions. We looked at three months of orders from cafés using Fast Menu to see what changes when the menu updates itself, and where it doesn’t help at all.',
    date: '2026-09-18',
    readTime: '14 min read',
    url: 'https://example.com/posts/printed-menu-cost',
  },
  ...insights,
];

const worst: Dataset = {
  techStack: [
    'Amazon Web Services',
    'Google Cloud Platform',
    'React Three Fiber',
    'WhatsApp Business API',
    ...techStack,
  ],
  services: worstServices,
  extraServices: [
    ...extraServices,
    'WhatsApp Business API integrations & chatbot flows',
    'Data migration from Excel & Tally',
    'Staff training',
    'Hosting & domain setup',
  ],
  fastMenuFeatures: worstFeatures,
  fastMenuImages: ['/images/fast-menu2.png'],
  // A renamed or not-yet-uploaded video file.
  fastMenuVideo: { ...fastMenuVideo, src: '/videos/fast-menu-reel-v2.mp4', poster: '/videos/fast-menu-reel-v2-poster.jpg' },
  projects: worstProjects,
  solutions: worstSolutions,
  insights: worstInsights,
  founder: { ...SITE.founder, name: 'Akshay Gopal Chavhan', role: 'Founder & Principal Engineer' },
  email: 'partnerships.keystonelab@gmail.com',
  phoneDisplay: '+91 97647 50567 / +91 20 2765 4321',
};

const empty: Dataset = {
  ...demo,
  techStack: [],
  services: [],
  extraServices: [],
  fastMenuFeatures: [],
  fastMenuImages: [],
  fastMenuVideo: null,
  projects: [],
  solutions: [],
  insights: [],
};

const one: Dataset = {
  ...demo,
  techStack: techStack.slice(0, 1),
  services: services.slice(0, 1),
  extraServices: extraServices.slice(0, 1),
  fastMenuFeatures: fastMenuFeatures.slice(0, 1),
  fastMenuImages: fastMenuImages.slice(0, 1),
  fastMenuVideo: null,
  projects: projects.slice(0, 1),
  solutions: solutions.slice(0, 1),
  insights: insights.slice(0, 1),
};

// Realistic upper bound for a studio site that keeps adding work.
function repeat<T>(items: T[], count: number, mark: (item: T, n: number) => T): T[] {
  return Array.from({ length: count }, (_, n) => mark(items[n % items.length], n));
}

const many: Dataset = {
  ...demo,
  techStack: repeat(techStack, 40, (t, n) => (n < techStack.length ? t : `${t} ${Math.floor(n / techStack.length) + 1}`)),
  services: repeat(services, 8, (s, n) => ({ ...s, title: n < services.length ? s.title : `${s.title} (${n + 1})` })),
  extraServices: repeat(extraServices, 10, (s, n) => (n < extraServices.length ? s : `${s} ${n + 1}`)),
  fastMenuFeatures: repeat(fastMenuFeatures, 14, (f, n) => ({ ...f, title: n < fastMenuFeatures.length ? f.title : `${f.title} ${n + 1}` })),
  projects: repeat(projects, 20, (p, n) => ({ ...p, id: `${p.id}-${n}` })),
  solutions: repeat([...solutions, { title: 'Fleet tracking', description: 'Vehicles, drivers and trips.', icon: Truck }, { title: 'Field service', description: 'Jobs, technicians and parts.', icon: Wrench }, { title: 'Payments & payouts', description: 'Collections and vendor payouts.', icon: CreditCard }], 16, (s, n) => ({ ...s, title: n < 11 ? s.title : `${s.title} ${n + 1}` })),
  insights: repeat(insights, 8, (p, n) => ({ ...p, url: `${p.url}#${n}` })),
};

export const DATASETS = { demo, worst, empty, one, many } as const;
export type DatasetName = keyof typeof DATASETS;
