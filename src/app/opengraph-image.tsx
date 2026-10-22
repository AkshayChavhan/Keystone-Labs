import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = `${SITE.name} — ${SITE.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const STONES = [
  '6,92 13.96,66.76 30.34,78.23 26,92',
  '14.86,65.52 35.68,50.4 42.19,69.31 30.83,77.56',
  '64.32,50.4 85.14,65.52 69.17,77.56 57.81,69.31',
  '86.04,66.76 94,92 74,92 69.66,78.23',
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#12100e',
          color: '#f5f1eb',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg viewBox="4 42 92 52" width="92" height="52">
            {STONES.map((p) => (
              <polygon key={p} points={p} fill="#f1ece4" />
            ))}
            <polygon points="35.38,44.18 64.62,44.18 57.02,69.05 42.98,69.05" fill="#ff7a33" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700, display: 'flex' }}>
            Keystone<span style={{ color: '#a39c92', fontWeight: 400, marginLeft: 10 }}>Lab</span>
          </div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1000 }}>
          {SITE.headline}
        </div>
        <div style={{ fontSize: 28, color: '#a39c92', display: 'flex' }}>
          Websites · SaaS · AI integration · E-commerce
        </div>
      </div>
    ),
    size,
  );
}
