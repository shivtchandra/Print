import { businessInfo, socialLinks } from '@/lib/config';
import { ProductCategory } from '@/lib/types/entities';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fotopalace.in';

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
      streetAddress: 'Gar-Ali, Near Eleye Cinema',
      addressLocality: 'Jorhat',
      addressRegion: 'Assam',
      postalCode: '785001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '26.7509',
      longitude: '94.2037'
    },
    openingHours: 'Mo-Sa 10:00-21:00',
    image: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    ],
    url: baseUrl,
    sameAs: [
      socialLinks.instagram,
      socialLinks.facebook
    ]
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
