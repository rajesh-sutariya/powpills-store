import Link from 'next/link';
import { ArrowRight } from './Icon';

/**
 * Every section heading on the page comes from here, so the type sizes,
 * spacing below the heading and the "view all" affordance are identical
 * everywhere. Two variants only:
 *
 *   centred — introduces a full-width section (categories, how it works, FAQ)
 *   split   — sits on a row with a "view all" link (product rails)
 */
export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  action,
}: {
  title: string;
  subtitle?: string;
  align?: 'center' | 'split';
  action?: { label: string; href: string };
}) {
  if (align === 'split') {
    return (
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 lg:mb-10">
        <div>
          <h2 className="h-section">{title}</h2>
          {subtitle && <p className="body-text mt-2 max-w-measure">{subtitle}</p>}
        </div>
        {action && (
          <Link href={action.href} className="link-more">
            {action.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="mb-10 text-center lg:mb-12">
      <h2 className="h-section">{title}</h2>
      {subtitle && <p className="lead mx-auto mt-3 max-w-xl text-base">{subtitle}</p>}
      <span aria-hidden="true" className="heading-rule block" />
    </div>
  );
}
