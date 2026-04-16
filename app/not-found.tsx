import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found | Foto Palace',
  description:
    'This page is missing. Return to Foto Palace Jorhat for laptops, gaming PCs, printers, CCTV, and accessories.',
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return (
    <main className="not-found container">
      <h1>Page not found</h1>
      <p>The page you requested is unavailable.</p>
      <Link href="/" className="primary-btn">
        Back to Home
      </Link>
    </main>
  );
}
