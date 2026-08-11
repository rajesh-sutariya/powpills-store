import { ProductCarousel } from './ProductCarousel';
import { SectionHeading } from './SectionHeading';
import type { ProductSection } from '@/lib/types';

export function ProductRow({
  content,
  background = 'white',
}: {
  content: ProductSection;
  background?: 'white' | 'soft';
}) {
  return (
    <section className={`section ${background === 'soft' ? 'bg-surface-soft' : 'bg-white'}`}>
      <div className="shell">
        <SectionHeading
          title={content.title}
          align="split"
          action={{ label: content.viewAllLabel, href: content.viewAllHref }}
        />

        <ProductCarousel products={content.products} />
      </div>
    </section>
  );
}
