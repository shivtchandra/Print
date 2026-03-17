import { Testimonial } from '@/lib/types/entities';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>What Customers Say</h2>
          <p>Trusted by local home users, students, gamers, and businesses.</p>
        </div>

        <div className="testimonial-grid">
          {testimonials
            .filter((testimonial) => testimonial.isPublished)
            .slice(0, 6)
            .map((testimonial, index) => (
              <article 
                className="testimonial-card fade-up" 
                key={`${testimonial.customerName}-${testimonial.createdAt}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="quote-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017C12.4647 13 12.017 12.5523 12.017 12V9C12.017 7.34315 13.3601 6 15.017 6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 16.6569 20.6739 18 19.017 18H17.017L17.017 21H14.017ZM3.01697 21L3.01697 18C3.01697 16.8954 3.9124 16 5.01697 16H8.01697C8.56925 16 9.01697 15.5523 9.01697 15V9C9.01697 8.44772 8.56925 8 8.01697 8H5.01697C4.46468 8 4.01697 8.44772 4.01697 9V12C4.01697 12.5523 3.56925 13 3.01697 13H2.01697C1.46468 13 1.01697 12.5523 1.01697 12V9C1.01697 7.34315 2.36012 6 4.01697 6H8.01697C9.67383 6 11.017 7.34315 11.017 9V15C11.017 16.6569 9.67383 18 8.01697 18H6.01697L6.01697 21H3.01697Z" />
                  </svg>
                </div>
                <p>“{testimonial.quote}”</p>
                <div className="testimonial-footer">
                  <h3>{testimonial.customerName}</h3>
                  <small>{testimonial.location || 'Vengavasal'}</small>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
