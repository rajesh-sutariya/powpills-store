import Link from 'next/link';
import { ChevronRight } from './Icon';
import labels from '@/lib/ui-labels';

export interface Crumb {
  label: string;
  href?: string;
}

/** Home is prepended automatically; the final crumb renders as plain text. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const crumbs: Crumb[] = [{ label: labels.breadcrumbHome, href: '/' }, ...trail];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
              {crumb.href && !isLast ? (
                <Link href={crumb.href} className="transition-colors hover:text-brand-700">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-ink">
                  {crumb.label}
                </span>
              )}
              {!isLast && <ChevronRight className="h-3 w-3 text-ink-faint" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
