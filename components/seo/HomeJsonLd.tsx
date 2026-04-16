import { serializeJsonLd } from '@/lib/seo/serializeJsonLd';
import { faqPageSchema } from '@/lib/seo/schema';

/** FAQ structured data — homepage only (matches FaqSection copy). */
export function HomeJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqPageSchema()) }}
    />
  );
}
