'use client';

import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const toggle = () => {
    // Pause every CSS transition for the swap. Otherwise cards and links fade to the new colors at
    // different speeds while the page background snaps. Two frames later, transitions are back on.
    const pause = document.createElement('style');
    pause.textContent = '*,*::before,*::after{transition:none!important}';
    document.head.appendChild(pause);
    requestAnimationFrame(() => requestAnimationFrame(() => pause.remove()));

    const isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-body transition-colors hover:border-ink/40 hover:text-ink"
    >
      <Moon className="h-[18px] w-[18px] dark:hidden" />
      <Sun className="hidden h-[18px] w-[18px] dark:block" />
    </button>
  );
}
