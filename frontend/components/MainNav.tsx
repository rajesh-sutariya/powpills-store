'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Icon } from './Icon';
import type { Category, NavContent } from '@/lib/types';

/**
 * Sticks to the top of the viewport on scroll so the catalogue is always one
 * click away — the page is long, and a fixed entry point makes it read as one
 * site rather than a series of separate blocks.
 */
export function MainNav({
  content,
  categories,
}: {
  content: NavContent;
  categories: Category[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Main"
      className="sticky top-0 z-40 border-y border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    >
      <div className="shell flex items-center gap-3">
        {/* Shop by Category dropdown */}
        <div
          className="relative shrink-0 py-2.5"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button
            type="button"
            aria-expanded={open}
            aria-haspopup="true"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            <Icon name="grid" className="h-4 w-4" strokeWidth={1.9} />
            {content.categoriesLabel}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {open && (
            <div className="absolute left-0 top-full z-30 w-72 overflow-hidden rounded-2xl border border-line bg-white py-2 shadow-lift">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name={category.icon} className="h-4 w-4" />
                  </span>
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Primary links */}
        <ul className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar">
          {content.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative inline-flex items-center rounded-lg px-3 py-4 text-sm font-medium text-ink-soft transition-colors after:absolute after:inset-x-3 after:bottom-2.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-600 after:transition-transform hover:text-brand-700 hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
