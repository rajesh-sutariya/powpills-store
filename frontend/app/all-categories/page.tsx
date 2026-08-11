import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { categories } from '@/lib/catalog';
import labels from '@/lib/ui-labels';
import type { Tone } from '@/lib/types';

export const metadata: Metadata = {
  title: labels.allCategories.title,
  description: labels.allCategories.description,
};

const toneClasses: Record<Tone, string> = {
  mint: 'bg-surface-mint text-brand-600',
  rose: 'bg-surface-rose text-rose-500',
  cream: 'bg-surface-cream text-amber-600',
  sky: 'bg-surface-sky text-sky-600',
  soft: 'bg-surface-soft text-ink-soft',
};

export default function AllCategoriesPage() {
  return (
    <>
      <PageHeader
        title={labels.allCategories.title}
        description={labels.allCategories.description}
        trail={[{ label: labels.allCategories.title }]}
        meta={`${categories.length} ${labels.toolbar.resultsMany.replace('products', 'categories')}`}
      />

      <section className="section bg-white">
        <div className="shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={category.href}
              className="card-interactive group flex flex-col p-6"
            >
              <span className="flex items-center gap-3.5">
                <span
                  className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${toneClasses[category.tone]}`}
                >
                  <Icon name={category.icon} className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <span className="min-w-0">
                  <span className="block text-15 font-bold leading-snug text-ink">
                    {category.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-muted">
                    {category.productCount} {labels.toolbar.resultsMany}
                  </span>
                </span>
              </span>

              <p className="mt-4 flex-1 text-[0.8125rem] leading-relaxed text-ink-muted">
                {category.description}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                {labels.card.viewOptions}
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
