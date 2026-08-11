import Link from 'next/link';
import { BrandMark } from './BrandMark';
import { Icon } from './Icon';
import type { HeaderContent } from '@/lib/types';

export function SiteHeader({ content }: { content: HeaderContent }) {
  return (
    <div className="border-b border-line bg-white">
      <div className="shell flex flex-wrap items-center gap-x-6 gap-y-3 py-3.5">
        {/* Brand */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <BrandMark />
          <span className="leading-tight">
            <span className="block text-xl font-extrabold tracking-tight text-brand-800">
              {content.brand.name}
            </span>
            <span className="block text-2xs font-medium text-ink-muted">
              {content.brand.tagline}
            </span>
          </span>
        </Link>

        {/* Search */}
        <form
          action="/search"
          role="search"
          className="order-3 flex w-full flex-1 items-center gap-2 md:order-none md:w-auto"
        >
          <div className="flex w-full items-center rounded-md border border-line bg-white focus-within:border-brand-500">
            <label htmlFor="site-search" className="sr-only">
              {content.search.buttonLabel}
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder={content.search.placeholder}
              className="h-11 w-full rounded-l-md bg-transparent px-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <button
              type="submit"
              aria-label={content.search.buttonLabel}
              className="m-1 inline-flex h-9 w-11 shrink-0 items-center justify-center rounded bg-brand-600 text-white transition-colors hover:bg-brand-700"
            >
              <Icon name="search" className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </form>

        {/* Account + cart */}
        <div className="ml-auto flex shrink-0 items-center gap-5">
          <Link href={content.account.href} className="group flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Icon name="user" className="h-4.5 w-4.5" />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-xs font-semibold text-ink group-hover:text-brand-700">
                {content.account.title}
              </span>
              <span className="block text-2xs text-ink-muted">{content.account.subtitle}</span>
            </span>
          </Link>

          <Link href={content.cart.href} className="group flex items-center gap-2">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Icon name="cart" className="h-4.5 w-4.5" />
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-700 px-1 text-2xs font-bold text-white">
                0
              </span>
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-xs font-semibold text-ink group-hover:text-brand-700">
                {content.cart.title}
              </span>
              <span className="block text-2xs text-ink-muted">
                {content.cart.itemsLabel} · {content.cart.total}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
