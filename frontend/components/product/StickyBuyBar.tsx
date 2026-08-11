'use client';

import { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import labels from '@/lib/ui-labels';

/**
 * Mobile sticky buy bar.
 *
 * On a phone the buy box scrolls away as soon as the shopper reads the specs or
 * reviews, leaving no way to act without scrolling back. This keeps the price and
 * the action reachable, and only appears once the buy box has left the viewport
 * so it never covers the control it duplicates.
 */
export function StickyBuyBar({ priceLabel, name }: { priceLabel: string; name: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById('buy-box');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '-120px 0px 0px 0px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur transition-transform duration-200 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="shell flex items-center gap-3 py-3">
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-medium text-ink-muted">{name}</span>
          <span className="block text-sm font-bold text-brand-800">{priceLabel}</span>
        </span>

        <a href="#buy-box" className="btn shrink-0 bg-brand-600 px-5 py-3 text-sm text-white">
          <Icon name="cart" className="h-4 w-4" strokeWidth={1.8} />
          {labels.product.stickyCta}
        </a>
      </div>
    </div>
  );
}
