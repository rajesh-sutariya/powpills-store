'use client';

import { useState } from 'react';
import { Icon } from './Icon';
import { subscribeToNewsletter } from '@/lib/wp-client';
import type { NewsletterSection } from '@/lib/types';

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
    <section className="bg-brand-800 py-9">
      <div className="shell grid items-center gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
            <Icon name="mail" className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-bold text-white sm:text-lg">{content.title}</h2>
            <p className="mt-1 text-2xs text-brand-100 sm:text-xs">{content.description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
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
            className="h-11 w-full rounded-md border border-white/20 bg-white px-4 text-sm text-ink placeholder:text-ink-faint focus:border-brand-300 focus:outline-none"
          />
          <button
            type="submit"
            disabled={state === 'sending'}
            className="btn h-11 shrink-0 bg-brand-500 px-6 text-white hover:bg-brand-600 disabled:opacity-70"
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
