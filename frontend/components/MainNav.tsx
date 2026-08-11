'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Icon } from './Icon';
import type { Category, NavContent } from '@/lib/types';

export function MainNav({
  content,
  categories,
}: {
  content: NavContent;
  categories: Category[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Main" className="border-b border-line bg-white">
      <div className="shell flex items-center gap-2">
        {/* Shop by Category dropdown */}
        <div
          className="relative shrink-0 py-2"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button
            type="button"
            aria-expanded={open}
            aria-haspopup="true"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex items-center gap-2 rounded-md bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            <Icon name="grid" className="h-4 w-4" strokeWidth={1.8} />
            {content.categoriesLabel}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {open && (
            <div className="absolute left-0 top-full z-30 w-64 rounded-md border border-line bg-white py-2 shadow-card-hover">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-soft hover:bg-brand-50 hover:text-brand-700"
                >
                  <Icon name={category.icon} className="h-4 w-4 text-brand-600" />
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
                className="inline-flex items-center rounded px-3 py-3.5 text-sm font-medium text-ink-soft transition-colors hover:text-brand-700"
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
