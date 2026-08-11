import Image from 'next/image';
import { Stars } from './Icon';
import type { ReviewCard, StatsSection } from '@/lib/types';

/**
 * Full-bleed tinted band. It acts as an anchor roughly a third of the way down
 * the page, breaking the run of white product sections either side of it.
 */
export function StatsAndReview({
  stats,
  review,
}: {
  stats: StatsSection;
  review: ReviewCard;
}) {
  return (
    <section className="section-sm bg-brand-50">
      <div className="shell grid items-center gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
        {/* Stats */}
        <div>
          {/* Same size as every other section heading — this is a section
              heading, and shrinking it broke the page's hierarchy. */}
          <h2 className="h-section text-center lg:text-left">{stats.title}</h2>

          <dl className="mt-7 grid grid-cols-2 gap-y-7 sm:grid-cols-4">
            {stats.items.map((item, index) => (
              <div
                key={item.label}
                className={`text-center lg:text-left ${
                  index > 0 ? 'sm:border-l sm:border-brand-200 sm:pl-5 lg:pl-6' : ''
                }`}
              >
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="block text-3xl font-extrabold tracking-tight text-brand-700">
                    {item.value}
                  </span>
                  <span className="mt-1.5 block text-[0.8125rem] font-medium text-ink-soft">
                    {item.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Featured review */}
        <figure className="card flex flex-col justify-center p-6 shadow-lift">
          <div className="flex items-center gap-2.5">
            <Stars rating={Number(review.score)} className="h-4.5 w-4.5" />
            <span className="text-sm font-bold text-ink">{review.scoreLabel}</span>
            <span className="text-xs font-medium text-ink-muted">{review.score}/5</span>
          </div>

          <blockquote className="mt-3.5 text-sm leading-relaxed text-ink-soft">
            {review.quote}
          </blockquote>

          <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
            <Image
              src={review.author.avatar}
              alt={review.author.name}
              width={96}
              height={96}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="leading-tight">
              <span className="block text-[0.8125rem] font-bold text-ink">
                {review.author.name}
              </span>
              <span className="mt-0.5 block text-xs text-ink-muted">{review.author.role}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
