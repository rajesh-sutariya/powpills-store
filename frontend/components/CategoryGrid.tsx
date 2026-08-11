import Link from 'next/link';
import { ChevronRight, Icon } from './Icon';
import { SectionHeading } from './SectionHeading';
import type { CategorySection, Tone } from '@/lib/types';

const toneClasses: Record<Tone, string> = {
  mint: 'bg-surface-mint text-brand-600',
  rose: 'bg-surface-rose text-rose-500',
  cream: 'bg-surface-cream text-amber-600',
  sky: 'bg-surface-sky text-sky-600',
  soft: 'bg-surface-soft text-ink-soft',
};

export function CategoryGrid({ content }: { content: CategorySection }) {
  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading title={content.title} subtitle={content.subtitle} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7 lg:gap-3">
          {content.categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="card-interactive group flex flex-col items-center px-3 py-7 text-center"
            >
              <span
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105 ${toneClasses[category.tone]}`}
              >
                <Icon name={category.icon} className="h-7 w-7" strokeWidth={1.6} />
              </span>

              {/* Fixed two-line box keeps every card the same height whether the
                  label is "Skin Care" or "Vitamins & Supplements". */}
              <span className="mt-4 flex min-h-[2.5rem] items-start justify-center text-sm font-bold leading-snug text-ink">
                {category.name}
              </span>

              <span className="mt-2.5 inline-flex items-center gap-0.5 text-xs font-semibold text-brand-600 transition-colors group-hover:text-brand-800">
                {category.ctaLabel}
                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
