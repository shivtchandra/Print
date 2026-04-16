import { businessInfo, socialLinks } from '@/lib/config';
import { storefrontFaqs } from '@/lib/data/faqs';
import { getSiteUrl } from '@/lib/site';

const baseUrl = getSiteUrl();

/** LocalBusiness JSON-LD for homepage (and sitewide baseline). */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#localbusiness`,
    name: businessInfo.name,
    description: businessInfo.description,
    url: baseUrl,
    telephone: businessInfo.phones,
    email: businessInfo.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gar-Ali, near Eleye Cinema',
      addressLocality: 'Jorhat',
      addressRegion: 'Assam',
      postalCode: '785001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.7509,
      longitude: 94.2037
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '10:00',
        closes: '21:00'
      }
    ],
    sameAs: [socialLinks.instagram, socialLinks.facebook, socialLinks.youtube].filter(Boolean)
  };
}

/** FAQPage JSON-LD — keep in sync with `storefrontFaqs` / FaqSection. */
export function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: storefrontFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function productCategorySchema(category: string, title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: `${baseUrl}/${category}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `${title} listings`
    }
  };
}
