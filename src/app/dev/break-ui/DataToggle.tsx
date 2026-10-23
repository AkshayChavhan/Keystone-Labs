import Link from 'next/link';
import type { DatasetName } from '@/lib/content.fixtures';

const OPTIONS: { value: DatasetName; label: string }[] = [
  { value: 'demo', label: 'Demo' },
  { value: 'worst', label: 'Worst case' },
  { value: 'empty', label: 'Empty' },
  { value: 'one', label: 'One' },
  { value: 'many', label: 'Many' },
];

// Plain dev chrome, deliberately not styled like the site.
export function DataToggle({ current }: { current: DatasetName }) {
  return (
    <nav
      aria-label="Test dataset"
      style={{ fontFamily: 'system-ui, sans-serif' }}
      className="fixed bottom-3 left-1/2 z-[55] flex max-w-[calc(100vw-24px)] -translate-x-1/2 gap-0.5 overflow-x-auto rounded-full bg-neutral-200 p-1 text-xs shadow-md"
    >
      {OPTIONS.map((option) => (
        <Link
          key={option.value}
          href={`?data=${option.value}`}
          scroll={false}
          aria-current={option.value === current ? 'true' : undefined}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 ${
            option.value === current ? 'bg-white font-semibold text-neutral-900 shadow-sm' : 'text-neutral-600'
          }`}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  );
}
