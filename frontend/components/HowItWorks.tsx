import { ChevronRight, Icon } from './Icon';
import type { HowItWorksSection } from '@/lib/types';

export function HowItWorks({ content }: { content: HowItWorksSection }) {
  return (
    <section className="bg-surface-soft py-12">
      <div className="shell">
        <div className="text-center">
          <h2 className="section-title">{content.title}</h2>
          <p className="section-subtitle mt-2">{content.subtitle}</p>
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <div className="card flex h-full items-start gap-3 px-5 py-6">
                <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <Icon name={step.icon} className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-2xs font-bold text-white">
                    {step.step}
                  </span>
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-ink">{step.title}</span>
                  <span className="mt-1.5 block text-2xs leading-relaxed text-ink-muted">
                    {step.description}
                  </span>
                </span>
              </div>

              {index < content.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-brand-300 lg:block"
                >
                  <ChevronRight className="h-5 w-5" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
