import Link from 'next/link';
import { ChevronRight, Icon } from './Icon';
import { FaqAccordion } from './FaqAccordion';
import { SectionHeading } from './SectionHeading';
import { disclaimer, getCategory } from '@/lib/catalog';
import labels from '@/lib/ui-labels';
import type { CatalogCategory } from '@/lib/catalog-types';

/**
 * Everything below the product grid on a category page.
 *
 * A bare grid answers "what do you sell" but nothing else. Category landing
 * content — a short buying guide, the questions shoppers actually ask, and links
 * to adjacent categories — helps the segment of visitors who arrive undecided,
 * and gives the page substance for search engines.
 */
export function CategoryContent({ category }: { category: CatalogCategory }) {
  const related = category.related
    .map((slug) => getCategory(slug))
    .filter((entry): entry is CatalogCategory => Boolean(entry));

  return (
    <>
      {/* Buying guide */}
      <section className="border-t border-line bg-surface-soft py-12 lg:py-16">
        <div className="shell">
          <div className="max-w-3xl">
            <h2 className="h-section">{category.guide.title}</h2>
            <p className="lead mt-3 text-base">{category.guide.intro}</p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {category.guide.points.map((point, index) => (
              <li key={point.title} className="card flex gap-4 p-5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">
                  {index + 1}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{point.title}</span>
                  <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-ink-muted">
                    {point.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs text-ink-faint">{disclaimer}</p>
        </div>
      </section>

      {/* Category FAQs */}
      <section className="bg-white py-12 lg:py-16">
        <div className="shell">
          <SectionHeading title={labels.category.faqTitle} />
          <FaqAccordion items={category.faqs} />
        </div>
      </section>

      {/* Related categories */}
      {related.length > 0 && (
        <section className="border-t border-line bg-surface-soft py-12 lg:py-14">
          <div className="shell">
            <h2 className="h-panel">{labels.category.relatedTitle}</h2>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={entry.href}
                    className="card-interactive group flex h-full items-center gap-3.5 p-4"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-line">
                      <Icon name={entry.icon} className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.8125rem] font-bold text-ink">
                        {entry.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-muted">
                        {entry.productCount} {labels.toolbar.resultsMany}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
