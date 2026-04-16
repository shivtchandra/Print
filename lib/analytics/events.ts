'use client';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** GA4 recommended event for lead forms */
export function trackGenerateLead(params: { category?: string; source_page?: string }) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', 'generate_lead', {
    currency: 'INR',
    value: 1,
    ...params
  });
  window.fbq?.('track', 'Lead', { content_name: params.source_page, content_category: params.category });
}

/** WhatsApp / contact clicks */
export function trackContactIntent(params: { method: 'whatsapp'; source?: string; product_title?: string }) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', 'contact', {
    method: params.method,
    source: params.source || 'unknown',
    items: params.product_title ? [{ item_name: params.product_title }] : undefined
  });
  window.fbq?.('track', 'Contact', {
    content_name: params.product_title || params.source || 'whatsapp'
  });
}
