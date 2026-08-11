'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Icon } from './Icon';
import type { CatalogCategory } from '@/lib/catalog-types';
import type { HeaderContent, NavContent } from '@/lib/types';

/**
 * Mobile navigation.
 *
 * The previous build had none: the desktop nav simply became a horizontally
 * scrolling strip of eight links, and the category dropdown was a 544px panel
 * opened on hover — unreachable on a touch device and wider than the viewport.
 *
 * This is the standard pattern instead: a hamburger that opens a full-height
 * drawer with search, a collapsible category list and the account links.
 */
export function MobileNav({
  nav,
  header,
  categories,
}: {
  nav: NavContent;
  header: HeaderContent;
  categories: CatalogCategory[];
}) {
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(true);

  // Lock background scroll and allow Escape to close.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700 lg:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth={1.9} fill="none" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-brand-900/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={nav.categoriesLabel}
            className="absolute inset-y-0 left-0 flex w-[min(21rem,88vw)] flex-col bg-white shadow-lift"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3.5">
              <span className="text-base font-extrabold tracking-tight text-brand-800">
                {header.brand.name}
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink-soft"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Search */}
            <form action="/search" role="search" className="border-b border-line p-4">
              <div className="flex items-center rounded-xl border border-line bg-surface-soft">
                <label htmlFor="mobile-search" className="sr-only">
                  {header.search.buttonLabel}
                </label>
                <input
                  id="mobile-search"
                  name="q"
                  type="search"
                  placeholder={header.search.placeholder}
                  className="h-11 w-full bg-transparent px-3.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label={header.search.buttonLabel}
                  className="m-1.5 inline-flex h-8 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white"
                >
                  <Icon name="search" className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </form>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Categories, collapsible */}
              <div className="border-b border-line py-2">
                <button
                  type="button"
                  aria-expanded={categoriesOpen}
                  onClick={() => setCategoriesOpen((value) => !value)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-ink"
                >
                  {nav.categoriesLabel}
                  <ChevronDown
                    className={`h-4 w-4 text-ink-muted transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {categoriesOpen && (
                  <ul className="px-2 pb-1">
                    {categories.map((category) => (
                      <li key={category.slug}>
                        <Link
                          href={category.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-11 items-center gap-3 rounded-xl px-2.5 py-2.5 text-[0.8125rem] font-medium text-ink-soft active:bg-brand-50"
                        >
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <Icon name={category.icon} className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{category.name}</span>
                          <span className="shrink-0 text-xs text-ink-faint">
                            {category.productCount}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Primary links */}
              <ul className="p-2">
                {nav.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink active:bg-brand-50"
                    >
                      {link.label}
                      <ChevronRight className="h-3.5 w-3.5 text-ink-faint" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account footer */}
            <div className="grid grid-cols-2 gap-2 border-t border-line p-3">
              <Link
                href={header.account.href}
                onClick={() => setOpen(false)}
                className="btn min-h-11 border border-line bg-white px-3 py-2.5 text-[0.8125rem] text-ink-soft"
              >
                <Icon name="user" className="h-4 w-4" />
                {header.account.title}
              </Link>
              <Link
                href={header.cart.href}
                onClick={() => setOpen(false)}
                className="btn min-h-11 bg-brand-600 px-3 py-2.5 text-[0.8125rem] text-white"
              >
                <Icon name="cart" className="h-4 w-4" />
                {header.cart.title}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
