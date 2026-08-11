import Image from 'next/image';
import Link from 'next/link';
import { Icon } from './Icon';
import type { HeroContent } from '@/lib/types';

/**
 * Full-bleed tinted band rather than a contained card, so the top of the page
 * reads as one surface. The generous bottom padding leaves room for the
 * assurance strip to overlap upward into it.
 */
export function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-brand-50 to-surface-soft pb-32 pt-12 lg:pb-40 lg:pt-16">
      {/* Soft decorative wash, keeps the flat tint from looking like a grey box. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-brand-100/60 blur-3xl"
      />

      <div className="shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Copy */}
          <div>
            <h1 className="h-hero max-w-[19ch] text-balance">{content.title}</h1>

            <p className="lead mt-5 max-w-measure">{content.description}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={content.primaryCta.href} className="btn-primary">
                {content.primaryCta.label}
              </Link>
              <Link href={content.secondaryCta.href} className="btn-outline">
                {content.secondaryCta.label}
              </Link>
            </div>

            {/* Feature row sits below the CTAs and is separated by a rule, so it
                reads as supporting detail instead of competing with the buttons. */}
            <ul className="mt-9 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-brand-200/70 pt-7 sm:grid-cols-4 sm:gap-x-4">
              {content.features.map((feature) => (
                <li key={feature.label} className="flex flex-col gap-2.5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card">
                    <Icon name={feature.icon} className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="text-[0.8125rem] font-semibold leading-snug text-ink-soft">
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={720}
              height={520}
              priority
              className="h-auto w-full drop-shadow-[0_24px_40px_rgba(10,51,39,0.10)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
