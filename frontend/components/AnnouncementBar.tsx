import { Icon } from './Icon';
import type { AnnouncementBar as AnnouncementBarContent } from '@/lib/types';

export function AnnouncementBar({ content }: { content: AnnouncementBarContent }) {
  return (
    <div className="bg-brand-900 text-white">
      <div className="shell flex h-10 items-center justify-between gap-6">
        <ul className="flex items-center gap-5 overflow-x-auto whitespace-nowrap text-xs font-medium no-scrollbar sm:gap-7">
          {content.items.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <Icon name={item.icon} className="h-4 w-4 text-brand-300" strokeWidth={1.7} />
              <span className="text-brand-50">{item.label}</span>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-2 text-xs font-medium sm:flex">
          <Icon name="globe" className="h-4 w-4 text-brand-300" strokeWidth={1.7} />
          <span className="text-brand-200">{content.shipTo.label}</span>
          <span className="font-semibold text-white">{content.shipTo.value}</span>
        </div>
      </div>
    </div>
  );
}
