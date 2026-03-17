import Link from 'next/link';

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
