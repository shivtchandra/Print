import { businessInfo } from '@/lib/config';

/** E.164 digits only for wa.me (e.g. 919435051891) */
export function getWhatsAppDigits(): string {
  return String(businessInfo.whatsapp || '919435051891').replace(/\D/g, '');
}

export function buildProductEnquiryUrl(productTitle: string, priceRange?: string): string {
  const phone = getWhatsAppDigits();
  const text = encodeURIComponent(
    `Hi Foto Palace, I'm interested in: ${productTitle}${priceRange ? ` (${priceRange})` : ''}. Please share availability and best price.`
  );
  return `https://wa.me/${phone}?text=${text}`;
}

export function buildGeneralEnquiryUrl(prefill?: string): string {
  const phone = getWhatsAppDigits();
  const text = encodeURIComponent(prefill || 'Hi Foto Palace, I would like a quote.');
  return `https://wa.me/${phone}?text=${text}`;
}
