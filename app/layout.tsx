import type { Metadata } from 'next';

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
    <html lang="en">
      <body>
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
