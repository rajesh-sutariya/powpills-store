import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from './Icon';
import type { PromoCard, Tone } from '@/lib/types';

const toneClasses: Record<Tone, string> = {
  mint: 'bg-surface-mint border-brand-100',
  rose: 'bg-surface-rose border-rose-100',
  cream: 'bg-surface-cream border-amber-100',
  sky: 'bg-surface-sky border-sky-100',
  soft: 'bg-surface-soft border-line',
};

export function PromoCards({ cards }: { cards: PromoCard[] }) {
  return (
    <section className="section bg-white">
      <div className="shell grid gap-5 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`flex items-end justify-between gap-4 overflow-hidden rounded-2xl border p-6 ${toneClasses[card.tone]}`}
          >
            <div className="flex min-w-0 flex-col self-stretch">
              <h3 className="text-base font-bold leading-snug text-ink">{card.title}</h3>

              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{card.description}</p>

              {card.ctaLabel && card.href && (
                <Link
                  href={card.href}
                  className="btn mt-auto self-start bg-brand-600 px-4 py-2.5 text-[0.8125rem] text-white hover:bg-brand-700"
                >
                  {card.ctaLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>

            <Image
              src={card.image.src}
              alt={card.image.alt}
              width={300}
              height={240}
              className="h-28 w-auto shrink-0 self-end object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
