import Link from 'next/link';
import { BrandMark } from './BrandMark';
import { Icon, SocialIcon } from './Icon';
import type { FooterContent } from '@/lib/types';

function PaymentMark({ label }: { label: string }) {
  return (
    <span className="inline-flex h-7 min-w-12 items-center justify-center rounded-md bg-white/95 px-2 text-2xs font-bold uppercase tracking-tight text-brand-900">
      {label}
    </span>
  );
}

export function SiteFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr_1fr_1.25fr] lg:gap-8">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <BrandMark className="h-11 w-11" />
              <span className="leading-tight">
                <span className="block text-xl font-extrabold text-white">
                  {content.brand.name}
                </span>
                <span className="mt-0.5 block text-xs text-brand-200">{content.brand.tagline}</span>
              </span>
            </div>

            <p className="mt-5 max-w-xs text-[0.8125rem] leading-relaxed text-brand-200">
              {content.brand.description}
            </p>

            <ul className="mt-6 flex items-center gap-2.5">
              {content.socials.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-600"
                  >
                    <SocialIcon label={social.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {content.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.8125rem] text-brand-200 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h2 className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white">
              {content.contact.title}
            </h2>
            <ul className="mt-5 space-y-3.5">
              {content.contact.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-brand-200"
                >
                  <Icon name={item.icon} className="mt-px h-4 w-4 shrink-0 text-brand-400" />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Payment + security strip */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-wrap items-center justify-between gap-5 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[0.8125rem] font-semibold text-white">
              {content.payments.label}
            </span>
            <span className="flex flex-wrap items-center gap-1.5">
              {content.payments.methods.map((method) => (
                <PaymentMark key={method} label={method} />
              ))}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[0.8125rem] font-semibold text-white">
            <Icon name="shield-check" className="h-4 w-4 text-brand-400" />
            {content.secureLabel}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="shell py-5 text-center text-xs text-brand-300">{content.copyright}</div>
      </div>
    </footer>
  );
}
