'use client';

const WP_URL = (process.env.NEXT_PUBLIC_WP_URL ?? 'http://localhost:8080').replace(/\/$/, '');

/** Posts the newsletter signup to the WordPress plugin endpoint. */
export async function subscribeToNewsletter(email: string): Promise<boolean> {
  try {
    const response = await fetch(`${WP_URL}/wp-json/powpills/v1/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
