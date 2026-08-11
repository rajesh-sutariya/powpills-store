import { homepageContent } from './content';
import type { HomepageContent } from './types';

/**
 * WordPress data layer.
 *
 * The backend plugin (powpills-core) exposes the whole homepage as one
 * document at /wp-json/powpills/v1/homepage. If WordPress is not running, or
 * returns something unusable, we fall back to the static copy in content.ts so
 * the storefront never renders an empty page.
 */

export const WP_URL = (process.env.NEXT_PUBLIC_WP_URL ?? 'http://localhost:8080').replace(/\/$/, '');

const REVALIDATE = Number(process.env.WP_REVALIDATE_SECONDS ?? 60);

export const HOMEPAGE_ENDPOINT = `${WP_URL}/wp-json/powpills/v1/homepage`;

/** Section keys are merged individually so a partially populated WP install still works. */
function mergeWithFallback(remote: Partial<HomepageContent> | null): HomepageContent {
  if (!remote) return homepageContent;

  const merged: HomepageContent = { ...homepageContent };
  const writable = merged as unknown as Record<string, unknown>;

  for (const [key, value] of Object.entries(remote)) {
    const isEmptyArray = Array.isArray(value) && value.length === 0;
    if (value === null || value === undefined || isEmptyArray) continue;
    writable[key] = value;
  }

  return merged;
}

export async function getHomepageContent(): Promise<{
  content: HomepageContent;
  source: 'wordpress' | 'fallback';
}> {
  try {
    const response = await fetch(HOMEPAGE_ENDPOINT, {
      headers: { Accept: 'application/json' },
      next: REVALIDATE > 0 ? { revalidate: REVALIDATE } : { revalidate: 0 },
    });

    if (!response.ok) {
      return { content: homepageContent, source: 'fallback' };
    }

    const data = (await response.json()) as Partial<HomepageContent>;
    if (!data || typeof data !== 'object' || !data.header) {
      return { content: homepageContent, source: 'fallback' };
    }

    return { content: mergeWithFallback(data), source: 'wordpress' };
  } catch {
    return { content: homepageContent, source: 'fallback' };
  }
}
