import { SITE } from '@/lib/site';

// An arch of five stones; the ember centre stone is the keystone.
const STONES = [
  '6,92 13.96,66.76 30.34,78.23 26,92',
  '14.86,65.52 35.68,50.4 42.19,69.31 30.83,77.56',
  '64.32,50.4 85.14,65.52 69.17,77.56 57.81,69.31',
  '86.04,66.76 94,92 74,92 69.66,78.23',
];
const KEYSTONE = '35.38,44.18 64.62,44.18 57.02,69.05 42.98,69.05';

export function LogoMark({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="4 42 92 52" className={className} aria-hidden="true">
      {STONES.map((points) => (
        <polygon key={points} points={points} fill="currentColor" strokeLinejoin="round" />
      ))}
      <polygon points={KEYSTONE} fill="var(--ember)" />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-ink ${className}`}>
      <LogoMark className="h-[22px] w-auto" />
      <span className="font-display text-[1.15rem] font-semibold tracking-tight">
        {SITE.shortName}
        <span className="font-normal text-muted"> Lab</span>
      </span>
    </span>
  );
}
