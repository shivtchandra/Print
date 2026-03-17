import { businessInfo } from '@/lib/config';
import { ProductCategory } from '@/lib/types/entities';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ComputerStore',
    name: businessInfo.name,
    description: businessInfo.description,
    email: businessInfo.email,
    telephone: businessInfo.phones,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address,
      addressLocality: 'Vengavasal',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN'
    },
    openingHours: 'Mo-Su 10:00-21:00',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    url: baseUrl,
    sameAs: []
  };
}

export function productCategorySchema(category: ProductCategory, title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: `${baseUrl}/${category}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `${title} Listings`
    }
  };
}
