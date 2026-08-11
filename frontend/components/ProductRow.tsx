import Link from 'next/link';
import { ArrowRight } from './Icon';
import { ProductCarousel } from './ProductCarousel';
import type { ProductSection } from '@/lib/types';

export function ProductRow({
  content,
  background = 'white',
}: {
  content: ProductSection;
  background?: 'white' | 'soft';
}) {
  return (
    <section className={background === 'soft' ? 'bg-surface-soft py-12' : 'bg-white py-12'}>
      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="section-title">{content.title}</h2>
          <Link href={content.viewAllHref} className="link-more">
            {content.viewAllLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-6">
          <ProductCarousel products={content.products} />
        </div>
      </div>
    </section>
  );
}
