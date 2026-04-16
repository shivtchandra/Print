/**
 * Safe JSON for inline <script type="application/ld+json"> — avoids closing the
 * script tag if a string contains "</script>" or similar.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
