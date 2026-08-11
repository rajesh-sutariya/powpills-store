export function BrandMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span
      className={`${className} inline-flex shrink-0 items-center justify-center rounded-full bg-brand-700 text-white`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect
          x="3.2"
          y="8.6"
          width="17.6"
          height="6.8"
          rx="3.4"
          transform="rotate(-45 12 12)"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M9.4 9.4l5.2 5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}
