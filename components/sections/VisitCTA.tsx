import Link from 'next/link';

export function VisitCTA() {
  return (
    <section className="section cta-strip">
      <div className="container cta-inner">
        <div>
          <h2>Visit us at Gar-Ali, near Eleye Cinema!</h2>
          <p>In-store demos, expert recommendations, and same-day enquiry response.</p>
        </div>
        <Link href="/contact" className="primary-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M20 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="11" cy="10" r="3"/></svg>
          Plan Your Visit
        </Link>
      </div>
    </section>
  );
}
