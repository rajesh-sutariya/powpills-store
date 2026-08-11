import Link from 'next/link';
import { BrandMark } from './BrandMark';
import { Icon } from './Icon';
import type { HeaderContent } from '@/lib/types';

export function SiteHeader({ content }: { content: HeaderContent }) {
  return (
    <div className="bg-white">
      <div className="shell flex flex-wrap items-center gap-x-8 gap-y-4 py-5">
        {/* Brand */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <BrandMark className="h-11 w-11" />
          <span className="leading-tight">
            <span className="block text-[1.375rem] font-extrabold tracking-tight text-brand-800">
              {content.brand.name}
            </span>
            <span className="mt-0.5 block text-xs font-medium text-ink-muted">
              {content.brand.tagline}
            </span>
          </span>
        </Link>

        {/* Search */}
        <form
          action="/search"
          role="search"
          className="order-3 w-full flex-1 md:order-none md:w-auto md:max-w-xl"
        >
          <div className="flex items-center rounded-xl border border-line bg-surface-soft transition focus-within:border-brand-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-50">
            <label htmlFor="site-search" className="sr-only">
              {content.search.buttonLabel}
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder={content.search.placeholder}
              className="h-12 w-full bg-transparent px-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <button
              type="submit"
              aria-label={content.search.buttonLabel}
              className="m-1.5 inline-flex h-9 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white transition-colors hover:bg-brand-700"
            >
              <Icon name="search" className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
          </div>
        </form>

        {/* Account + cart */}
        <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-6">
          <Link
            href={content.account.href}
            className="group flex items-center gap-2.5 rounded-xl px-1 py-1 transition-colors"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
              <Icon name="user" className="h-5 w-5" />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[0.8125rem] font-semibold text-ink group-hover:text-brand-700">
                {content.account.title}
              </span>
              <span className="block text-xs text-ink-muted">{content.account.subtitle}</span>
            </span>
          </Link>

          <Link
            href={content.cart.href}
            className="group flex items-center gap-2.5 rounded-xl px-1 py-1 transition-colors"
          >
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
              <Icon name="cart" className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand-600 px-1 text-2xs font-bold text-white ring-2 ring-white">
                0
              </span>
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[0.8125rem] font-semibold text-ink group-hover:text-brand-700">
                {content.cart.title}
              </span>
              <span className="block text-xs text-ink-muted">
                {content.cart.itemsLabel} · {content.cart.total}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
