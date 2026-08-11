import Link from 'next/link';
import { Icon } from './Icon';
import { categories } from '@/lib/catalog';
import labels from '@/lib/ui-labels';

/**
 * Category rail shown beside the product grid. Doubles as cross-navigation, so
 * a shopper who lands on one condition can move to another without going back
 * to the menu.
 */
export function CategorySidebar({ activeSlug }: { activeSlug?: string }) {
  return (
    <aside className="lg:sticky lg:top-24">
      <div className="card overflow-hidden">
        <h2 className="border-b border-line px-5 py-4 text-sm font-bold text-ink">
          {labels.sidebar.categoriesTitle}
        </h2>

        <ul className="p-2">
          <li>
            <Link
              href={labels.shop.href}
              className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[0.8125rem] font-medium transition-colors ${
                activeSlug ? 'text-ink-soft hover:bg-brand-50 hover:text-brand-700' : 'bg-brand-50 text-brand-800'
              }`}
            >
              {labels.sidebar.allProducts}
            </Link>
          </li>

          {categories.map((category) => {
            const isActive = category.slug === activeSlug;
            return (
              <li key={category.slug}>
                <Link
                  href={category.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[0.8125rem] font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-800'
                      : 'text-ink-soft hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Icon
                      name={category.icon}
                      className={`h-4 w-4 shrink-0 ${isActive ? 'text-brand-600' : 'text-ink-faint'}`}
                    />
                    <span className="truncate">{category.name}</span>
                  </span>
                  <span className="shrink-0 text-xs text-ink-faint">{category.productCount}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
