import { Breadcrumbs, type Crumb } from './Breadcrumbs';

/**
 * Tinted band at the top of every catalogue page. Reusing the hero's brand tint
 * keeps inner pages recognisably part of the same site rather than looking like
 * bare templates.
 */
export function PageHeader({
  title,
  description,
  trail,
  meta,
}: {
  title: string;
  description?: string;
  trail: Crumb[];
  meta?: string;
}) {
  return (
    <section className="border-b border-brand-100 bg-gradient-to-b from-brand-50 to-white py-8 lg:py-10">
      <div className="shell">
        <Breadcrumbs trail={trail} />

        <div className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h1 className="h-section">{title}</h1>
          {meta && <p className="text-sm font-medium text-ink-muted">{meta}</p>}
        </div>

        {description && <p className="lead mt-3 max-w-3xl text-base">{description}</p>}
      </div>
    </section>
  );
}
