/**
 * Canonical public site URL (no trailing slash).
 * Set NEXT_PUBLIC_BASE_URL on Vercel to your custom domain, e.g. https://fotopalace.in
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_BASE_URL?.trim() || 'https://fotopalace.in';
  return raw.replace(/\/$/, '');
}
