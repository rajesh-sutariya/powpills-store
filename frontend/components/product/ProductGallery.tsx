'use client';

import { useState } from 'react';
import Image from 'next/image';
import labels from '@/lib/ui-labels';

/**
 * Main image plus thumbnails.
 *
 * A single static image gives a shopper nothing to inspect; a selectable gallery
 * is the baseline expectation on a product page, and the thumbnail strip also
 * signals that more detail exists.
 */
export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : [''];

  return (
    <div>
      <div className="card flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface-soft p-6 sm:p-8">
        <Image
          src={gallery[active]}
          alt={alt}
          width={400}
          height={300}
          priority
          className="h-full w-full object-contain"
        />
      </div>

      {gallery.length > 1 && (
        <ul
          aria-label={labels.product.galleryLabel}
          className="mt-3 flex gap-3 overflow-x-auto pb-1 no-scrollbar"
        >
          {gallery.map((src, index) => {
            const isActive = index === active;
            return (
              <li key={src + index}>
                <button
                  type="button"
                  aria-label={`${labels.product.galleryLabel} ${index + 1}`}
                  aria-current={isActive}
                  onClick={() => setActive(index)}
                  className={`flex h-20 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-surface-soft p-2 transition ${
                    isActive ? 'border-brand-600 ring-1 ring-brand-600' : 'border-line hover:border-brand-300'
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    width={400}
                    height={300}
                    className="h-full w-full object-contain"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
