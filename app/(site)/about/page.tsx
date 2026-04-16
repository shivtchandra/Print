import { pageMetadata } from '@/lib/seo/metadata';
import { AboutPageClient } from '@/components/pages/AboutPageClient';

export const metadata = pageMetadata({
  title: 'About Foto Palace',
  description:
    'Learn about Foto Palace at Gar-Ali, Jorhat — laptops, gaming PCs, printers, CCTV, and assembled desktops with local support. Visit or WhatsApp 9435051891.',
  canonical: '/about'
});

export default function AboutPage() {
  return (
    <AboutPageClient />
  );
}
