import { Testimonial } from '@/lib/types/entities';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const published = testimonials.filter((t) => t.isPublished).slice(0, 10);
  if (published.length === 0) return null;

  return (
    <section className="section testimonials-section" id="reviews">
      <div className="container">
        <div className="section-head">
          <h2><span className="text-accent">Customer</span> Reviews</h2>
          <p>Trusted by local home users, students, gamers, and businesses.</p>
        </div>
      </div>

      <div className="testimonial-scroll-track">
        <div className="testimonial-scroll-inner">
          {published.map((testimonial, index) => (
            <article
              className="testimonial-scroll-card"
              key={`${testimonial.customerName}-${index}`}
            >
              <div className="testimonial-stars">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FF7E33">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
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
      </div>
    </section>
  );
}
