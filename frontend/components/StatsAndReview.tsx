import Image from 'next/image';
import { Stars } from './Icon';
import type { ReviewCard, StatsSection } from '@/lib/types';

export function StatsAndReview({
  stats,
  review,
}: {
  stats: StatsSection;
  review: ReviewCard;
}) {
  return (
    <section className="bg-white py-8">
      <div className="shell grid gap-4 lg:grid-cols-[2fr_1fr]">
        {/* Stats */}
        <div className="rounded-xl bg-surface-mint px-6 py-7">
          <h2 className="text-center text-sm font-bold text-ink sm:text-base">{stats.title}</h2>
          <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.items.map((item) => (
              <div key={item.label} className="text-center">
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="block text-xl font-extrabold text-brand-700 sm:text-2xl">
                    {item.value}
                  </span>
                  <span className="mt-1 block text-2xs font-medium text-ink-muted">
                    {item.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Featured review */}
        <div className="card flex flex-col justify-center px-5 py-6">
          <div className="flex items-center gap-2">
            <Stars rating={Number(review.score)} className="h-4 w-4" />
            <span className="text-xs font-bold text-ink">{review.scoreLabel}</span>
            <span className="text-2xs text-ink-muted">{review.score}/5</span>
          </div>

          <p className="mt-3 text-2xs leading-relaxed text-ink-soft">{review.quote}</p>

          <div className="mt-4 flex items-center gap-2.5">
            <Image
              src={review.author.avatar}
              alt={review.author.name}
              width={96}
              height={96}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="leading-tight">
              <span className="block text-2xs font-bold text-ink">{review.author.name}</span>
              <span className="block text-2xs text-ink-muted">{review.author.role}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
