import { ChevronRight, Icon } from './Icon';
import { SectionHeading } from './SectionHeading';
import type { HowItWorksSection } from '@/lib/types';

export function HowItWorks({ content }: { content: HowItWorksSection }) {
  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading title={content.title} subtitle={content.subtitle} />

        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {content.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <div className="card h-full px-6 py-7 text-center">
                <span className="relative mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon name={step.icon} className="h-6 w-6" strokeWidth={1.6} />
                  <span className="absolute -right-1.5 -top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white ring-2 ring-white">
                    {step.step}
                  </span>
                </span>

                <h3 className="mt-5 text-15 font-bold text-ink">{step.title}</h3>

                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>

              {/* Connector between steps, desktop only. */}
              {index < content.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white p-1 text-brand-400 lg:flex"
                >
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
