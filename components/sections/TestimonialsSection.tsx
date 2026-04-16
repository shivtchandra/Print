import Link from 'next/link';

import { googleBusinessProfileReviewUrl } from '@/lib/config';
import { Testimonial } from '@/lib/types/entities';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function StarRow({ rating }: { rating: number }) {
  const n = Math.min(5, Math.max(1, rating || 5));
  return (
    <div className="testimonial-stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FF7E33" aria-hidden>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const published = testimonials.filter((t) => t.isPublished).slice(0, 8);
  if (published.length === 0) return null;

  return (
    <section className="section testimonials-section" id="reviews">
      <div className="container">
        <div className="section-head">
          <h2>
            <span className="text-accent">Customer</span> Reviews
          </h2>
          <p>Recent feedback from shoppers in Jorhat and nearby — laptops, CCTV, printers, and custom PCs.</p>
        </div>

        <div className="testimonial-grid">
          {published.map((testimonial, index) => (
            <article className="testimonial-grid-card" key={testimonial.id || `${testimonial.customerName}-${index}`}>
              <StarRow rating={testimonial.rating || 5} />
              <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden>
                  {testimonial.customerName.charAt(0)}
                </div>
                <div>
                  <h4>{testimonial.customerName}</h4>
                  <small>{testimonial.location || 'Jorhat'}</small>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="testimonial-cta-row">
          <a
            href={googleBusinessProfileReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-btn"
          >
            Rate us on Google
          </a>
          <Link href="/contact" className="secondary-btn">
            Share your experience
          </Link>
        </div>
      </div>
    </section>
  );
}
