import Image from 'next/image';
import Link from 'next/link';
import type { PromoCard, Tone } from '@/lib/types';

const toneClasses: Record<Tone, string> = {
  mint: 'bg-surface-mint',
  rose: 'bg-surface-rose',
  cream: 'bg-surface-cream',
  sky: 'bg-surface-sky',
  soft: 'bg-surface-soft',
};

export function PromoCards({ cards }: { cards: PromoCard[] }) {
  return (
    <section className="bg-white pb-4">
      <div className="shell grid gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`flex items-center justify-between gap-3 overflow-hidden rounded-xl ${toneClasses[card.tone]} p-5`}
          >
            <div className="min-w-0">
              <h3 className="text-sm font-bold leading-snug text-ink">{card.title}</h3>
              <p className="mt-2 text-2xs leading-relaxed text-ink-soft">{card.description}</p>
              {card.ctaLabel && card.href && (
                <Link
                  href={card.href}
                  className="btn mt-4 bg-brand-700 px-3.5 py-2 text-2xs text-white hover:bg-brand-800"
                >
                  {card.ctaLabel}
                </Link>
              )}
            </div>
            <Image
              src={card.image.src}
              alt={card.image.alt}
              width={300}
              height={240}
              className="h-24 w-auto shrink-0 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
