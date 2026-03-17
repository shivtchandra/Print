import { TrackedAnchor } from '@/components/analytics/TrackedAnchor';
import { businessInfo } from '@/lib/config';

const Icons = {
  Phone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.18-2.18a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  Mail: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  MapPin: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  WhatsApp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3.5Z"/></svg>
  )
};

export function QuickContactWidget() {
  return (
    <section className="section quick-contact">
      <div className="container">
        <div className="section-head reveal">
          <h2>Get in Touch</h2>
          <p>Have questions or need a custom quote? Our team is ready to help you instantly.</p>
        </div>

        <div className="quick-contact-grid">
          <div className="contact-info-cards reveal delay-1">
            <TrackedAnchor
              href={`tel:${businessInfo.phones[0]}`}
              className="contact-method-card"
              eventName="click_to_call"
              eventParams={{ phone: businessInfo.phones[0] }}
            >
              <span className="icon"><Icons.Phone /></span>
              <div className="details">
                <span className="label">Call Support</span>
                <span className="value">{businessInfo.phones[0]}</span>
              </div>
            </TrackedAnchor>

            <TrackedAnchor
              href={`mailto:${businessInfo.email}`}
              className="contact-method-card"
              eventName="email_click"
              eventParams={{ email: businessInfo.email }}
            >
              <span className="icon"><Icons.Mail /></span>
              <div className="details">
                <span className="label">Email Us</span>
                <span className="value">{businessInfo.email}</span>
              </div>
            </TrackedAnchor>

            <div className="contact-method-card no-click">
              <span className="icon"><Icons.MapPin /></span>
              <div className="details">
                <span className="label">Our Location</span>
                <span className="value">{businessInfo.address}</span>
              </div>
            </div>
          </div>

          <div className="contact-cta-box reveal delay-2">
            <div className="cta-content">
              <h3>Connect on WhatsApp</h3>
              <p>Get instant stock updates and personalized pricing directly on your phone.</p>
              <TrackedAnchor
                href={`https://wa.me/${businessInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-btn whatsapp-btn"
                eventName="whatsapp_click"
                eventParams={{ source: 'quick_contact' }}
              >
                <Icons.WhatsApp />
                <span>Chat with Experts</span>
              </TrackedAnchor>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
