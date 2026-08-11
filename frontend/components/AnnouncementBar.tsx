import { Icon } from './Icon';
import type { AnnouncementBar as AnnouncementBarContent } from '@/lib/types';

export function AnnouncementBar({ content }: { content: AnnouncementBarContent }) {
  return (
    <div className="bg-brand-900 text-white">
      <div className="shell flex h-9 items-center justify-between gap-4">
        <ul className="flex items-center gap-4 overflow-x-auto whitespace-nowrap text-2xs font-medium sm:gap-7 sm:text-xs no-scrollbar">
          {content.items.map((item) => (
            <li key={item.label} className="flex items-center gap-1.5">
              <Icon name={item.icon} className="h-3.5 w-3.5 text-brand-300" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-1.5 text-2xs font-medium sm:flex sm:text-xs">
          <Icon name="globe" className="h-3.5 w-3.5 text-brand-300" />
          <span className="text-brand-100">{content.shipTo.label}</span>
          <span>{content.shipTo.value}</span>
        </div>
      </div>
    </div>
  );
}
