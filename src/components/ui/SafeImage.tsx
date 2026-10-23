'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { LogoMark } from '@/components/brand/Logo';

type SafeImageProps = Omit<ImageProps, 'src'> & { src: string };

// next/image that shows a quiet logo placeholder instead of a broken-image icon when the file is
// missing (a renamed screenshot, a typo in content.ts). Expects a positioned parent, like `fill`.
export function SafeImage({ src, alt, onError, ...props }: SafeImageProps) {
  // Remember which src failed, so a new src gets a fresh try without an effect.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className="absolute inset-0 flex items-center justify-center bg-surface"
      >
        <LogoMark className="h-8 w-auto text-stone" />
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={(e) => {
        setFailedSrc(src);
        onError?.(e);
      }}
    />
  );
}
