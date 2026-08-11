import Image from 'next/image';
import { Icon } from './Icon';
import type { SupportBanner as SupportBannerContent } from '@/lib/types';

export function SupportBanner({ content }: { content: SupportBannerContent }) {
  return (
    <section className="bg-white py-8">
      <div className="shell">
        <div className="relative overflow-hidden rounded-2xl bg-surface-mint">
          <div className="grid items-end gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="px-6 py-8 sm:px-10">
              <h2 className="text-lg font-bold text-ink sm:text-xl">{content.title}</h2>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-ink-soft sm:text-sm">
                {content.description}
              </p>

              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {content.channels.map((channel) => (
                  <li key={channel.title} className="flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-700 shadow-card">
                      <Icon name={channel.icon} className="h-4.5 w-4.5" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-2xs font-bold text-ink">{channel.title}</span>
                      <span className="block text-2xs text-ink-muted">{channel.detail}</span>
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
                className="h-44 w-auto object-contain object-bottom lg:h-52"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
