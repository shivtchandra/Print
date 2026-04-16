import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Contact Foto Palace, Gar-Ali, Jorhat — call 9435051891 or WhatsApp for laptops, gaming PCs, printers, and CCTV. Store hours 10am–9pm.',
  canonical: '/contact'
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
