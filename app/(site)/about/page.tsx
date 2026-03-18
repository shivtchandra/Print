import { pageMetadata } from '@/lib/seo/metadata';
import { AboutPageClient } from '@/components/pages/AboutPageClient';

export const metadata = pageMetadata({
  title: 'About Foto Palace',
  description: 'Foto Palace is your trusted local tech partner in Vengavasal.',
  canonical: '/about'
});

export default function AboutPage() {
  return (
    <AboutPageClient />
  );
}
