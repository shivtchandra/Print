import type { Metadata } from 'next';
import { Outfit, IBM_Plex_Mono } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { siteMetadata } from '@/lib/seo/metadata';
import { localBusinessSchema } from '@/lib/seo/schema';

import './globals.css';

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = localBusinessSchema();

  return (
    <html lang="en" className={`${outfit.variable} ${ibmPlexMono.variable}`}>
      <body className={ibmPlexMono.className}>
        <ScrollReveal />
        <GoogleAnalytics />
        <MetaPixel />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
        {children}
      </body>
    </html>
  );
}
