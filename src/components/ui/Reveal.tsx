'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li';
}

// Uses a full `transform` string (not `y`) so the slide runs on the GPU instead of the main thread.
// Reduced motion lives in globals.css: [data-reveal] keeps the fade and drops the slide.
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Component = as === 'li' ? motion.li : motion.div;
  return (
    <Component
      data-reveal
      className={className}
      initial={{ opacity: 0, transform: 'translateY(12px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
