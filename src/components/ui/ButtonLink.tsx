import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-ember-strong text-on-ember shadow-sm shadow-ember/20 motion-safe:hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ember/25',
  secondary: 'border border-line bg-card text-ink motion-safe:hover:-translate-y-0.5 hover:border-ink/40',
  ghost: 'text-ink hover:text-ember-strong',
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
}

export function ButtonLink({ variant = 'primary', external, className = '', children, ...props }: ButtonLinkProps) {
  return (
    <a
      {...props}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[0.95rem] font-semibold transition-[translate,scale,box-shadow,border-color,color] duration-150 ease-out active:scale-[0.97] ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
