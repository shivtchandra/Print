/**
 * Turn common Google Drive share URLs into a direct-ish image URL for <img> / next/image.
 * Paste either:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * Other URLs are returned unchanged.
 *
 * Note: Drive can rate-limit or show a virus-scan interstitial for large files;
 * for a store, dedicated hosting (R2, Cloudinary, Firebase Storage) is more reliable.
 */
export function normalizeExternalImageUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return trimmed;
  }

  const host = parsed.hostname.toLowerCase();

  if (host === 'drive.google.com' || host === 'www.drive.google.com') {
    const fromPath = parsed.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fromPath?.[1]) {
      return `https://drive.google.com/uc?export=view&id=${fromPath[1]}`;
    }
    if (parsed.pathname === '/open' || parsed.pathname.startsWith('/open')) {
      const id = parsed.searchParams.get('id');
      if (id) {
        return `https://drive.google.com/uc?export=view&id=${id}`;
      }
    }
  }

  return trimmed;
}

/** Drive URLs often fail Next.js image optimization (403 / HTML interstitial); load in the browser instead. */
export function shouldUseUnoptimizedImage(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return hostname === 'drive.google.com' || hostname === 'www.drive.google.com';
  } catch {
    return false;
  }
}
