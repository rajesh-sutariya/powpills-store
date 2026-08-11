import type { IconName } from '@/lib/types';

const paths: Record<IconName, React.ReactNode> = {
  'shield-check': (
    <>
      <path d="M12 3l7.5 3v6c0 4.7-3.2 7.9-7.5 9-4.3-1.1-7.5-4.3-7.5-9V6L12 3z" />
      <path d="M9 12.2l2.2 2.2L15.2 10" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 018 0v2.5" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6.5h10.5v9H3z" />
      <path d="M13.5 9.5H17l3.5 3.5v2.5h-7z" />
      <circle cx="7" cy="17.5" r="2" />
      <circle cx="17" cy="17.5" r="2" />
    </>
  ),
  headset: (
    <>
      <path d="M4.5 14v-2a7.5 7.5 0 0115 0v2" />
      <rect x="2.8" y="13.2" width="3.6" height="6.4" rx="1.8" />
      <rect x="17.6" y="13.2" width="3.6" height="6.4" rx="1.8" />
      <path d="M18.5 19.6v.4a2.5 2.5 0 01-2.5 2.5h-2" />
    </>
  ),
  package: (
    <>
      <path d="M12 2.8l8.5 4.6v9.2L12 21.2 3.5 16.6V7.4z" />
      <path d="M3.5 7.4l8.5 4.6 8.5-4.6M12 12v9.2" />
    </>
  ),
  tag: (
    <>
      <path d="M4 12.5l8-8h7.5V12l-8 8z" />
      <circle cx="15.6" cy="8.4" r="1.4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.6 2.4 14.4 0 17M12 3.5c-2.4 2.6-2.4 14.4 0 17" />
    </>
  ),
  'credit-card': (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M6.5 14.5h4" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 12a8 8 0 11-2.6-5.9" />
      <path d="M20.5 4v4.5H16" />
    </>
  ),
  male: (
    <>
      <circle cx="10" cy="14" r="5.5" />
      <path d="M14.8 9.2l5.4-5.4M15.2 3.8h5v5" />
    </>
  ),
  female: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M12 14.5V21M9 18.2h6" />
    </>
  ),
  bandage: (
    <>
      <rect x="2.6" y="8.4" width="18.8" height="7.2" rx="3.6" transform="rotate(-45 12 12)" />
      <path d="M9.6 14.4l4.8-4.8" />
      <circle cx="10.6" cy="10.8" r="0.9" />
      <circle cx="13.4" cy="13.6" r="0.9" />
    </>
  ),
  hair: (
    <>
      <path d="M12 3.2c-3.8 3-5.8 5.9-5.8 8.6a5.8 5.8 0 0011.6 0c0-2.7-2-5.6-5.8-8.6z" />
      <path d="M9.6 12.8a2.6 2.6 0 002.4 3.4" />
    </>
  ),
  skin: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.2 10.2h.01M14.8 10.2h.01M9 14.6c1.8 1.5 4.2 1.5 6 0" />
    </>
  ),
  pill: (
    <>
      <rect x="2.8" y="8.4" width="18.4" height="7.2" rx="3.6" transform="rotate(-45 12 12)" />
      <path d="M9.2 9.2l5.6 5.6" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
    </>
  ),
  chat: (
    <>
      <path d="M20.5 12c0 4-3.8 7.2-8.5 7.2-1 0-2-.2-2.9-.4L4.5 20.5l1.3-3.4A6.9 6.9 0 013.5 12C3.5 8 7.3 4.8 12 4.8s8.5 3.2 8.5 7.2z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3.8 7l8.2 6 8.2-6" />
    </>
  ),
  phone: (
    <>
      <path d="M6.4 3.6h3l1.6 4-2 1.4a11 11 0 005.9 5.9l1.4-2 4 1.6v3a1.8 1.8 0 01-2 1.8C11.7 20.4 3.6 12.3 4.6 5.6a1.8 1.8 0 011.8-2z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.8" />
      <path d="M16.2 16.2L21 21" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.4" r="4.2" />
      <path d="M4.8 20.2a7.2 7.2 0 0114.4 0" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4.5h2.4l2.6 10.4h9.6l2.2-7.4H6.4" />
      <circle cx="9.4" cy="19" r="1.6" />
      <circle cx="17.2" cy="19" r="1.6" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M12 21.5s6.5-6 6.5-11a6.5 6.5 0 10-13 0c0 5 6.5 11 6.5 11z" />
      <circle cx="12" cy="10.2" r="2.4" />
    </>
  ),
  'cart-check': (
    <>
      <path d="M3 4.5h2.4l2.6 10.4h9.6l2.2-7.4H6.4" />
      <path d="M10 9.6l1.8 1.8 3.4-3.4" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3.2l1.9 4.6 4.6 1.9-4.6 1.9L12 16.2l-1.9-4.6-4.6-1.9 4.6-1.9z" />
      <path d="M18.4 15.6l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20.2s-7.5-4.4-7.5-9.4A4.3 4.3 0 0112 8.2a4.3 4.3 0 017.5 2.6c0 5-7.5 9.4-7.5 9.4z" />
    </>
  ),
  bolt: (
    <>
      <path d="M13.4 2.8L5.6 13.6h5.2l-.6 7.6 7.8-10.8h-5.2z" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c-9 0-14 4-14 10a5.7 5.7 0 005.7 5.7C17.7 19.7 20 13 20 4z" />
      <path d="M5 21c1.5-5.5 5-9.5 10-11.5" />
    </>
  ),
};

export function Icon({
  name,
  className = 'h-5 w-5',
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function ChevronDown({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  );
}

export function ChevronRight({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 5.5l6.5 6.5L9 18.5" />
    </svg>
  );
}

export function ChevronLeft({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 5.5L8.5 12l6.5 6.5" />
    </svg>
  );
}

export function ArrowRight({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />
    </svg>
  );
}

export function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      {!open && <path d="M12 5v14" />}
    </svg>
  );
}

/** Solid star row with fractional fill, used for product and review ratings. */
export function Stars({
  rating,
  className = 'h-3.5 w-3.5',
}: {
  rating: number;
  className?: string;
}) {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));
  const star = (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L1.6 7.7l5.8-.8z" />
    </svg>
  );

  return (
    <span className="relative inline-flex shrink-0" role="img" aria-label={`${rating} out of 5`}>
      <span className="inline-flex gap-0.5 text-line">
        {star}
        {star}
        {star}
        {star}
        {star}
      </span>
      <span
        className="absolute inset-0 inline-flex gap-0.5 overflow-hidden text-amber-400"
        style={{ width: `${percent}%` }}
      >
        {star}
        {star}
        {star}
        {star}
        {star}
      </span>
    </span>
  );
}

const socialGlyphs: Record<string, React.ReactNode> = {
  Facebook: (
    <path d="M13.5 21v-7.2h2.4l.4-2.9h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8v2.9h2.5V21z" />
  ),
  Twitter: (
    <path d="M17.6 4h2.7l-5.9 6.7L21 20h-5.2l-4-5.3L7 20H4.3l6.2-7.1L3.6 4H9l3.7 4.9zm-.9 14.3h1.5L8.3 5.6H6.7z" />
  ),
  Instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.6" cy="7.4" r="1.1" />
    </>
  ),
  YouTube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10.6 9.6l4.4 2.4-4.4 2.4z" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7.6 10.2v6.2M7.6 7.9v.01M11 16.4v-6.2M11 12.6c0-1.3.9-2.1 2-2.1s2 .8 2 2.4v3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
};

export function SocialIcon({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      {socialGlyphs[label] ?? socialGlyphs.Facebook}
    </svg>
  );
}
