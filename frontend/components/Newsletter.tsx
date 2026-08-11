'use client';

import { useState } from 'react';
import { Icon } from './Icon';
import { subscribeToNewsletter } from '@/lib/wp-client';
import type { NewsletterSection } from '@/lib/types';

/**
 * Dark band that closes the content and leads into the footer, so the page ends
 * deliberately instead of just stopping.
 */
export function Newsletter({ content }: { content: NewsletterSection }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');
    const ok = await subscribeToNewsletter(email);
    setState(ok ? 'done' : 'error');
    if (ok) setEmail('');
  }

  return (
    <section className="relative overflow-hidden bg-brand-800 py-12 lg:py-14">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-brand-700/60 blur-3xl"
      />

      <div className="shell relative grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15">
            <Icon name="mail" className="h-6 w-6" strokeWidth={1.7} />
          </span>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              {content.title}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-100">
              {content.description}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            {content.placeholder}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={content.placeholder}
            className="h-12 w-full rounded-xl border border-white/15 bg-white/95 px-4 text-sm text-ink placeholder:text-ink-faint focus:border-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-white/15"
          />
          <button
            type="submit"
            disabled={state === 'sending'}
            className="btn h-12 shrink-0 bg-brand-500 px-8 text-15 text-white hover:bg-brand-400 disabled:opacity-70"
          >
            {content.buttonLabel}
          </button>
        </form>

        {state !== 'idle' && (
          <p aria-live="polite" className="sr-only">
            {state === 'done' ? 'Subscribed' : state === 'error' ? 'Subscription failed' : 'Sending'}
          </p>
        )}
      </div>
    </section>
  );
}
