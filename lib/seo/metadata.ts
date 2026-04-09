import { Metadata } from 'next';

import { businessInfo, seoKeywords } from '@/lib/config';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${businessInfo.name} | ${businessInfo.tagline}`,
    template: `%s | ${businessInfo.name}`
  },
  description: `${businessInfo.name} in Jorhat, Assam — Authorized dealer for high-performance Laptops, Custom Gaming PCs, HP/Canon Printers, and Hikvision CCTV security systems. Expert computer repair and IT support since 2010.`,
  keywords: seoKeywords,
  openGraph: {
    type: 'website',
    siteName: businessInfo.name,
    title: `${businessInfo.name} | Premium Tech & IT Solutions in Jorhat`,
    description: `Leading provider of Laptops, Gaming PCs, and Security Systems in Jorhat, Assam. Quality products from Dell, HP, ASUS, and Hikvision.`,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${businessInfo.name} | Best Tech Store in Jorhat`,
    description: `Expert custom PCs, branded laptops, and CCTV installation services in Jorhat. Visit Foto Palace today for the best deals.`,
    creator: '@fotopalace_jrt'
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
