import Image from 'next/image';
import { Icon } from './Icon';
import type { SupportBanner as SupportBannerContent } from '@/lib/types';

/**
 * Second tinted anchor band, near the bottom of the page. The agent image is
 * flush to the bottom edge so the band feels designed rather than padded.
 */
export function SupportBanner({ content }: { content: SupportBannerContent }) {
  return (
    <section className="bg-surface-mint pt-14 sm:pt-16 lg:pt-20">
      <div className="shell">
        <div className="grid items-end gap-8 lg:grid-cols-[1.55fr_1fr]">
          <div className="pb-14 sm:pb-16 lg:pb-20">
            <h2 className="h-section">{content.title}</h2>

            <p className="lead mt-3 max-w-xl text-base">{content.description}</p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {content.channels.map((channel) => (
                <li
                  key={channel.title}
                  className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white px-4 py-3.5"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={channel.icon} className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[0.8125rem] font-bold text-ink">
                      {channel.title}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-ink-muted">
                      {channel.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={420}
              height={360}
              className="h-52 w-auto self-end object-contain object-bottom lg:h-64"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
