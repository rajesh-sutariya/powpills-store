import Link from 'next/link';
import { BrandMark } from './BrandMark';
import { Icon, SocialIcon } from './Icon';
import type { FooterContent } from '@/lib/types';

function PaymentMark({ label }: { label: string }) {
  return (
    <span className="inline-flex h-6 min-w-11 items-center justify-center rounded bg-white px-1.5 text-[8px] font-bold uppercase tracking-tight text-brand-900">
      {label}
    </span>
  );
}

export function SiteFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="shell py-12">
        <div className="grid gap-9 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark className="h-9 w-9" />
              <span className="leading-tight">
                <span className="block text-lg font-extrabold text-white">
                  {content.brand.name}
                </span>
                <span className="block text-2xs text-brand-200">{content.brand.tagline}</span>
              </span>
            </div>

            <p className="mt-4 max-w-xs text-2xs leading-relaxed text-brand-200">
              {content.brand.description}
            </p>

            <ul className="mt-5 flex items-center gap-2">
              {content.socials.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-600"
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
              <h2 className="text-xs font-bold uppercase tracking-wide text-white">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-2xs text-brand-200 transition-colors hover:text-white"
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
            <h2 className="text-xs font-bold uppercase tracking-wide text-white">
              {content.contact.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {content.contact.items.map((item) => (
                <li key={item.label} className="flex items-start gap-2 text-2xs text-brand-200">
                  <Icon name={item.icon} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Payment + security strip */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-2xs font-semibold text-white">{content.payments.label}</span>
            <span className="flex flex-wrap items-center gap-1.5">
              {content.payments.methods.map((method) => (
                <PaymentMark key={method} label={method} />
              ))}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-2xs font-semibold text-white">
            <Icon name="shield-check" className="h-3.5 w-3.5 text-brand-400" />
            {content.secureLabel}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="shell py-4 text-center text-2xs text-brand-200">{content.copyright}</div>
      </div>
    </footer>
  );
}
