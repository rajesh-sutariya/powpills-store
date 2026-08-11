import Image from 'next/image';
import Link from 'next/link';
import { Icon } from './Icon';
import type { HeroContent } from '@/lib/types';

export function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="bg-white pt-6">
      <div className="shell">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-50 via-surface-mint to-white ring-1 ring-brand-100">
          <div className="grid items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:py-12">
            {/* Copy */}
            <div>
              <h1 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-brand-900 sm:text-[2.6rem] sm:leading-[1.12]">
                {content.title}
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-[0.95rem]">
                {content.description}
              </p>

              <ul className="mt-7 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-2">
                {content.features.map((feature) => (
                  <li key={feature.label} className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-700 shadow-card">
                      <Icon name={feature.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-2xs font-semibold leading-tight text-ink-soft">
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={content.primaryCta.href} className="btn-primary">
                  {content.primaryCta.label}
                </Link>
                <Link href={content.secondaryCta.href} className="btn-outline">
                  {content.secondaryCta.label}
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                width={720}
                height={520}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
