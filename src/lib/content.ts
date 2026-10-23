import {
  type LucideIcon,
  BedDouble,
  Boxes,
  Briefcase,
  Globe,
  GraduationCap,
  Languages,
  LayoutDashboard,
  Pencil,
  Printer,
  QrCode,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Users,
  Wine,
} from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  deliverables: string[];
  examples: string[];
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  summary: string;
  description: string;
  metrics: { label: string; value: string }[];
  tech: string[];
  // A single landscape image, or several portrait (phone) screens shown side by side.
  cover: string | string[];
  images: string[];
  link?: string;
  status?: string;
  ownProduct?: boolean;
}

export interface Solution {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Insight {
  title: string;
  excerpt: string;
  /** YYYY-MM-DD. Day-first dates like 04-06-2026 are rejected at build time. */
  date: `${number}-${number}-${number}`;
  readTime: string;
  url: string;
  /** Topic pill, e.g. 'AI'. */
  category: string;
  /** Where it's published, e.g. 'Medium'. */
  source: string;
}

export const services: Service[] = [
  {
    title: 'Business websites',
    description:
      'Fast, polished websites that make a business look established — for restaurants, clinics, shops, builders and consultants. Built to load quickly, show up on Google and turn visitors into enquiries.',
    icon: Globe,
    deliverables: ['Responsive design', 'SEO setup', 'WhatsApp & form leads', 'Easy content updates'],
    examples: ['BuiltEnvironment Studio'],
  },
  {
    title: 'Custom SaaS & web apps',
    description:
      'Dashboards, portals, multi-tenant platforms and internal tools, built end to end: data model, sign-in and roles, payments, admin panels and deployment.',
    icon: LayoutDashboard,
    deliverables: ['Multi-tenant architecture', 'Role-based access', 'Admin dashboards', 'Subscriptions & payments'],
    examples: ['Fast Menu', 'MSG2AI'],
  },
  {
    title: 'AI integration',
    description:
      'Useful AI inside your product: chat assistants, search over your own documents (RAG), content generation and automation — across OpenAI, Claude, Gemini and Groq.',
    icon: Sparkles,
    deliverables: ['AI assistants & chatbots', 'RAG knowledge systems', 'Multi-model setup', 'Token-cost optimisation'],
    examples: ['MSG2AI', 'AI2Story'],
  },
  {
    title: 'E-commerce stores',
    description:
      'Online stores with catalogue, cart and checkout, plus an admin panel to run orders, stock and customers. Razorpay and Stripe payments built in.',
    icon: ShoppingBag,
    deliverables: ['Catalogue & filters', 'Razorpay / Stripe', 'Order tracking', 'Inventory admin'],
    examples: ['SAAKIE'],
  },
];

export const extraServices = ['API development & integrations', 'Maintenance & support', 'Performance & SEO audits'];

export const processSteps = [
  {
    title: 'Discover',
    description: 'A free call to understand your business, goals and budget. You get a clear scope and a quote.',
  },
  {
    title: 'Design',
    description: 'Wireframes and visual designs you can click through before any code is written.',
  },
  {
    title: 'Build',
    description: 'Regular updates and a live preview link, so you always know where things stand.',
  },
  {
    title: 'Launch & support',
    description: 'We deploy, hand over, and stay available for fixes and improvements after launch.',
  },
];

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const fastMenuFeatures: Feature[] = [
  {
    title: 'Scan at the table',
    description: 'Guests scan a QR code and see the menu instantly. No app to download.',
    icon: QrCode,
  },
  {
    title: 'Photos, allergens & diet filters',
    description: 'Dish photos, allergen badges and veg / vegan / gluten-free filters.',
    icon: Sparkles,
  },
  {
    title: 'Edit from your phone',
    description: 'Change a price or mark a dish sold out in seconds. The menu updates live.',
    icon: Pencil,
  },
  {
    title: 'Pairings & add-ons',
    description: 'Suggested drinks and sides on each dish to lift the average bill.',
    icon: Wine,
  },
  {
    title: 'QR studio',
    description: 'Print-ready table tents, sticker sheets and window decals, generated for you.',
    icon: Printer,
  },
  {
    title: 'Multi-language menus',
    description: 'Serve tourists and locals alike with menus in several languages.',
    icon: Languages,
  },
  {
    title: 'Private by design',
    description: "Each restaurant's data is isolated with Postgres row-level security.",
    icon: ShieldCheck,
  },
];

// fast-menu3 (pricing table) and fast-menu6 (glitchy QR render) are left out on purpose.
export const fastMenuImages = [
  '/images/fast-menu1.png',
  '/images/fast-menu2.png',
  '/images/fast-menu5.png',
  '/images/fast-menu7.png',
];

// Promo reel, shown before the screenshots in the Fast Menu section.
export const fastMenuVideo = {
  src: '/videos/fast-menu-reel.mp4',
  poster: '/videos/fast-menu-reel-poster.jpg',
  label: 'Fast Menu product video: live menu edits, QR table tents and the owner dashboard',
};

export const projects: Project[] = [
  {
    id: 'fast-menu',
    name: 'Fast Menu',
    subtitle: 'QR digital menus for hospitality',
    category: 'SaaS · Our product',
    summary: 'Mobile-first QR menus that hotels, restaurants, cafés and bars can update live from a phone.',
    description:
      "Multi-tenant SaaS platform for hotels, restaurants, cafés and bars to run mobile-first QR digital menus. Guests scan at the table to see photos, allergen badges, dietary filters and upsell pairings; owners manage categories, dishes and prices from a dashboard and can mark a dish sold out instantly from their phone. Includes a QR studio for printable table tents, sticker sheets and window decals, multi-language menus, and Postgres row-level security isolating every restaurant's data.",
    metrics: [
      { label: 'Menus', value: 'QR-based' },
      { label: 'Dashboard', value: 'Live updates' },
      { label: 'Security', value: 'Postgres RLS' },
    ],
    tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Zod'],
    cover: '/images/fast-menu1.png',
    images: fastMenuImages,
    link: 'https://fast-menu-zeta.vercel.app/',
    ownProduct: true,
  },
  {
    id: 'msg2ai',
    name: 'MSG2AI',
    subtitle: 'AI-powered messaging platform',
    category: 'SaaS · AI',
    summary: 'SMS and WhatsApp at scale, with AI assistants, broadcast campaigns and live analytics.',
    description:
      'SaaS platform for businesses to send SMS and WhatsApp messages at scale with AI-powered assistants. Features broadcast campaigns, multi-LLM support (OpenAI, Gemini, Groq, Claude), real-time analytics, sentiment analysis and role-based access control.',
    metrics: [
      { label: 'Messaging', value: 'SMS & WhatsApp' },
      { label: 'AI models', value: '5+ LLMs' },
      { label: 'Platform', value: 'Multi-tenant' },
    ],
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'MongoDB', 'Prisma', 'Twilio'],
    cover: '/images/msg2ai-dashboard.png',
    images: [
      '/images/msg2ai-dashboard.png',
      '/images/msg2ai-broadcast-messages.png',
      '/images/msg2ai-messaging-logs.png',
      '/images/msg2ai-simulator.png',
    ],
    link: 'https://dev.msg2ai.xyz/',
  },
  {
    id: 'saakie',
    name: 'SAAKIE',
    subtitle: 'Premium e-commerce for ethnic wear',
    category: 'E-commerce',
    summary: 'A full online store for sarees and ethnic wear, with dual payment gateways and a live admin.',
    description:
      'Full-stack e-commerce platform for premium Indian sarees and ethnic wear. Advanced product catalogue with filtering, dual payment gateways (Stripe and Razorpay), an admin dashboard with real-time analytics and inventory management, role-based sign-in, Cloudinary image optimisation, wishlist, reviews and ratings, order tracking and an Instagram feed.',
    metrics: [
      { label: 'Admin', value: 'Full dashboard' },
      { label: 'Payments', value: 'Stripe + Razorpay' },
      { label: 'Auth', value: 'Role-based' },
    ],
    tech: ['Next.js 14', 'TypeScript', 'MongoDB', 'Prisma', 'Clerk', 'Stripe', 'Cloudinary'],
    cover: ['/images/saakie1.png', '/images/saakie3.png', '/images/saakie6.png'],
    images: [
      '/images/saakie1.png',
      '/images/saakie3.png',
      '/images/saakie2.png',
      '/images/saakie4.png',
      '/images/saakie5.png',
      '/images/saakie6.png',
      '/images/saakie7.png',
      '/images/saakie8.png',
      '/images/saakie9.png',
      '/images/saakie10.png',
      '/images/saakie11.png',
    ],
    link: 'https://saakiebyknk.in',
  },
  {
    id: 'built-environment',
    name: 'BuiltEnvironment Studio',
    subtitle: 'Web & 3D for real estate',
    category: 'Website · 3D',
    summary: 'A marketing site for builders with 360° tours, a configurable 3D tower and AR walkthroughs.',
    description:
      'Marketing and demo site for a web agency serving architects, civil engineers, builders and interior designers. The headline feature is an interactive 3D flat and society showcase with three browser-native tiers: 360° room-to-room tours, an orbitable 3D tower with a live finish configurator, and a photoreal LiDAR show-flat walkthrough with an AR model view.',
    metrics: [
      { label: 'Showcase', value: '3D tower + AR' },
      { label: 'Tours', value: '360° walkthroughs' },
      { label: 'Tech', value: 'Gaussian splats' },
    ],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'React Three Fiber', 'Three.js', 'Framer Motion'],
    cover: '/images/built-environment1.png',
    images: [
      '/images/built-environment1.png',
      '/images/built-environment2.png',
      '/images/built-environment3.png',
      '/images/built-environment5.png',
    ],
    link: 'https://built-env.vercel.app/',
  },
  {
    id: 'ai2story',
    name: 'AI2Story',
    subtitle: 'AI video story generator',
    category: 'AI',
    summary: 'Turns a text prompt into a narrated short video, with AI scenes, images and voiceover.',
    description:
      'Open-source platform that turns text prompts into polished short video stories. It generates structured scenes with AI, creates images, produces natural voiceovers with text-to-speech, and composes the final video with Ken Burns effects and crossfade transitions — all on free APIs.',
    metrics: [
      { label: 'AI', value: 'Gemini + TTS' },
      { label: 'Video', value: 'Auto-composed' },
      { label: 'Cost', value: '100% free APIs' },
    ],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'MongoDB', 'Prisma', 'Zustand', 'FFmpeg'],
    cover: '/images/ai2story_main.png',
    images: [
      '/images/ai2story_main.png',
      '/images/ai2story_login.png',
      '/images/ai2story_createNewStory.png',
      '/images/ai2story_storyFormFilled.png',
      '/images/ai2story_storySetting.png',
      '/images/ai2story_generatedScene.png',
      '/images/ai2story_defaultTemplate.png',
      '/images/ai2story_sidePanel.png',
    ],
    link: 'https://ai2story.vercel.app/',
  },
  {
    id: 'captain-kiddo',
    name: 'Captain Kiddo',
    subtitle: 'Early-learning app for ages 3–6',
    category: 'App · EdTech',
    summary: 'A gamified, audio-first learning app with tracing practice, songs and a parent dashboard.',
    description:
      'Gamified, audio-first Progressive Web App that teaches children aged 3–6 numbers, alphabets, colours, animals, shapes and more. Each module has three difficulty tiers with tap-to-speak audio, animations and celebrations. Includes finger-tracing handwriting practice, sing-along songs with synced lyrics, lullabies with a sleep timer, and bedtime stories. A PIN-protected parent dashboard tracks progress and daily goals, and a Razorpay flow unlocks paid modules. Installable and offline-ready.',
    metrics: [
      { label: 'Audience', value: 'Ages 3–6' },
      { label: 'Payments', value: 'Razorpay' },
      { label: 'App', value: 'Installable PWA' },
    ],
    tech: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'MongoDB', 'Razorpay'],
    cover: ['/images/captain-kiddo-1.png', '/images/captain-kiddo-2.png', '/images/captain-kiddo-3.png'],
    images: [
      '/images/captain-kiddo-1.png',
      '/images/captain-kiddo-2.png',
      '/images/captain-kiddo-3.png',
      '/images/captain-kiddo-4.png',
      '/images/captain-kiddo-5.png',
      '/images/captain-kiddo-6.png',
    ],
  },
  {
    id: 'excellidraw',
    name: 'Excellidraw',
    subtitle: 'Real-time collaborative whiteboard',
    category: 'Web app · Real-time',
    summary: 'An Excalidraw-style drawing board with live multi-user editing and AI features.',
    description:
      'Collaborative drawing application with sign-in, real-time multi-user collaboration and AI-powered features, built for a smooth, fast drawing experience in the browser.',
    metrics: [
      { label: 'Sync', value: 'Real-time' },
      { label: 'AI', value: 'Built in' },
      { label: 'Users', value: 'Multi-user' },
    ],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'MongoDB'],
    cover: '/images/excelledraw01.png',
    images: [
      '/images/excelledraw01.png',
      '/images/excelledraw02.png',
      '/images/excelledraw03.png',
      '/images/excelledraw04.png',
      '/images/excelledraw05.png',
      '/images/excelledraw06.png',
    ],
    link: 'https://excellidraw.vercel.app/',
  },
  {
    id: 'buddies',
    name: 'Buddies',
    subtitle: 'Group trip planner',
    category: 'Web app',
    summary: 'Plan trips with friends: shared itineraries, invitations and fair bill-splitting.',
    description:
      'A trip planner built around group travel. Smart trip grouping (past, active, upcoming and drafts, with a countdown to the next trip), email invitations, automatic place insights, a day-by-day itinerary timeline, and a bill-splitting algorithm that settles shared expenses in the fewest payments. Multi-language with dark mode throughout.',
    metrics: [
      { label: 'Travel', value: 'Group trips' },
      { label: 'Expenses', value: 'Smart bill split' },
      { label: 'Status', value: 'In development' },
    ],
    tech: ['Next.js 14', 'TypeScript', 'MongoDB', 'Prisma', 'Better Auth', 'Cloudinary', 'Resend'],
    cover: '/images/buddies-preview.png',
    images: ['/images/buddies-preview.png'],
    status: 'In development',
  },
];

export const solutions: Solution[] = [
  {
    title: 'CRM systems',
    description: 'Leads, contacts and pipelines shaped around how your team actually sells.',
    icon: Users,
  },
  {
    title: 'E-commerce platforms',
    description: 'Catalogue, cart, payments and an admin panel, ready to sell at scale.',
    icon: ShoppingBag,
  },
  {
    title: 'ERP systems',
    description: 'Inventory, invoicing, purchase orders and reports in one place.',
    icon: Boxes,
  },
  {
    title: 'Job portals',
    description: 'Listings, applicant tracking, profiles and search for employers and candidates.',
    icon: Briefcase,
  },
  {
    title: 'Learning management',
    description: 'Courses, lessons, quizzes and progress tracking for schools and trainers.',
    icon: GraduationCap,
  },
  {
    title: 'Hotel management',
    description: 'Bookings, room availability, check-in / check-out and billing.',
    icon: BedDouble,
  },
  {
    title: 'Hospital management',
    description: 'Patients, appointments, doctors and records with secure role-based access.',
    icon: Stethoscope,
  },
  {
    title: 'Billing & invoicing',
    description: 'Invoices, payments, taxes and reminders on an automated workflow.',
    icon: Receipt,
  },
];

export const insights: Insight[] = [
  {
    title: 'How I Built One AI Platform That Talks to OpenAI, Claude, Gemini, and Groq',
    excerpt:
      'A practical look at multi-LLM architecture: what it means, why it saves money, and how it makes AI features more reliable.',
    date: '2026-06-04',
    readTime: '4 min read',
    category: 'AI',
    source: 'Medium',
    url: 'https://medium.com/@akshaychavhan676/how-i-built-one-ai-platform-that-talks-to-openai-claude-gemini-and-groq-and-why-your-business-9b66870263b7',
  },
  {
    title: 'Stop Burning Money on AI Tokens: 8 Techniques That Cut Our LLM Bill Without Hurting Quality',
    excerpt:
      'Token cost is the silent killer of AI features. How we made an AI platform much cheaper to run — with code, trade-offs and what actually worked.',
    date: '2026-06-04',
    readTime: '5 min read',
    category: 'AI',
    source: 'Medium',
    url: 'https://medium.com/@akshaychavhan676/stop-burning-money-on-ai-tokens-8-techniques-that-cut-our-llm-bill-without-hurting-quality-b6611e07a1af',
  },
];

export const techStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'Supabase',
  'Prisma',
  'Tailwind CSS',
  'Razorpay',
  'Stripe',
  'OpenAI',
  'Claude',
  'Gemini',
  'Twilio',
  'Three.js',
];

export const projectTypes = [
  'Business website',
  'SaaS / web app',
  'AI integration',
  'E-commerce store',
  'Fast Menu for my restaurant',
  'Something else',
];

export const timelines = ['As soon as possible', 'Within a month', '1–3 months', 'Flexible'];
