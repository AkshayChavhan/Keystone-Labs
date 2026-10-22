// Brand and contact details live here, so changing the name, email or links is a one-file edit.

const WHATSAPP_NUMBER = '919764750567';

export const SITE = {
  name: 'Keystone Lab',
  shortName: 'Keystone',
  // No domain yet. Set NEXT_PUBLIC_SITE_URL in Vercel once one is bought.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://keystone-lab.vercel.app',
  headline: 'We build the piece that holds your business together.',
  tagline:
    'Websites, SaaS platforms and AI tools for ambitious businesses — in India and around the world.',
  description:
    'Keystone Lab is a digital product studio that designs and builds business websites, custom SaaS platforms, AI integrations and e-commerce stores. Makers of Fast Menu, QR digital menus for restaurants.',
  location: 'Pune, India',
  serving: 'Working with clients in India and worldwide',

  // TODO: switch to a Keystone address (e.g. hello@<domain>) once the domain is bought.
  email: 'akshaychavhan676@gmail.com',
  phoneDisplay: '+91 97647 50567',
  whatsappNumber: WHATSAPP_NUMBER,

  // TODO: paste a Calendly (or Cal.com) link here. While empty, "Book a call" opens an email draft.
  bookingUrl: '',

  formspreeEndpoint: 'https://formspree.io/f/xaqdqdpg',

  founder: {
    name: 'Akshay Chavhan',
    role: 'Founder',
    linkedin: 'https://linkedin.com/in/akshay-chavhan',
    github: 'https://github.com/AkshayChavhan',
  },

  fastMenu: {
    name: 'Fast Menu',
    demoUrl: 'https://fast-menu-zeta.vercel.app/',
  },
} as const;

export function whatsappLink(message = `Hi ${SITE.name}, I'd like to talk about a project.`) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function bookingLink() {
  if (SITE.bookingUrl) return SITE.bookingUrl;
  const subject = encodeURIComponent(`Book a discovery call with ${SITE.name}`);
  const body = encodeURIComponent(
    'Hi,\n\nI would like to book a free discovery call.\n\nA few times that suit me:\n- \n- \n\nAbout my project:\n',
  );
  return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Fast Menu', href: '#fast-menu' },
  { label: 'Work', href: '#work' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;
