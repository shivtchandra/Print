import { Metadata } from 'next';

import { businessInfo, seoKeywords } from '@/lib/config';
import { getSiteUrl } from '@/lib/site';

const baseUrl = getSiteUrl();

export const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${businessInfo.name} | Laptops, gaming PCs & CCTV in Jorhat`,
    template: `%s | ${businessInfo.name}`
  },
  description:
    "Foto Palace — Jorhat's top tech store for laptops, gaming PCs, printers, CCTV, and IT accessories. Visit us at Gar-Ali or WhatsApp 9435051891.",
  keywords: seoKeywords,
  openGraph: {
    type: 'website',
    siteName: businessInfo.name,
    url: baseUrl,
    title: `${businessInfo.name} | Premium tech in Jorhat, Assam`,
    description: `Laptops, gaming desktops, printers, and CCTV from Gar-Ali, Jorhat. Call ${businessInfo.phones[0]}.`,
    locale: 'en_IN'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${businessInfo.name} | Jorhat tech store`,
    description: `Gar-Ali, near Eleye Cinema — laptops, gaming PCs, printers, CCTV. ${businessInfo.phones[0]}.`,
    creator: '@fotopalace_jrt'
  },
  alternates: {
    canonical: '/'
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        }
      }
    : {})
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
      url: `${baseUrl}${canonical === '/' ? '' : canonical}`
    }
  };
}
