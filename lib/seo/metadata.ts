import { Metadata } from 'next';

import { businessInfo, seoKeywords } from '@/lib/config';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${businessInfo.name} | ${businessInfo.tagline}`,
    template: `%s | ${businessInfo.name}`
  },
  description: `${businessInfo.name} in Vengavasal for laptops, gaming desktops, printers, CCTV, assembled desktops, and IT accessories.`,
  keywords: seoKeywords,
  openGraph: {
    type: 'website',
    siteName: businessInfo.name,
    title: `${businessInfo.name} - ${businessInfo.tagline}`,
    description: businessInfo.description
  },
  twitter: {
    card: 'summary_large_image',
    title: `${businessInfo.name} - ${businessInfo.tagline}`,
    description: businessInfo.description
  },
  alternates: {
    canonical: '/'
  }
};

export function pageMetadata({
  title,
  description,
  canonical,
  keywords
}: {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords: keywords || seoKeywords,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical
    }
  };
}
