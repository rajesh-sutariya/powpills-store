import Link from 'next/link';
import { Icon } from './Icon';
import type { CategorySection, Tone } from '@/lib/types';

const toneClasses: Record<Tone, string> = {
  mint: 'bg-surface-mint text-brand-700',
  rose: 'bg-surface-rose text-rose-500',
  cream: 'bg-surface-cream text-amber-600',
  sky: 'bg-surface-sky text-sky-600',
  soft: 'bg-surface-soft text-ink-soft',
};

export function CategoryGrid({ content }: { content: CategorySection }) {
  return (
    <section className="bg-surface-soft py-12">
      <div className="shell">
        <div className="text-center">
          <h2 className="section-title">{content.title}</h2>
          <p className="section-subtitle mt-2">{content.subtitle}</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {content.categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="card group flex flex-col items-center px-3 py-6 text-center transition hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${toneClasses[category.tone]}`}
              >
                <Icon name={category.icon} className="h-6 w-6" />
              </span>
              <span className="mt-4 text-xs font-bold leading-tight text-ink">{category.name}</span>
              <span className="mt-2 text-2xs font-semibold text-brand-700 group-hover:text-brand-800">
                {category.ctaLabel}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
