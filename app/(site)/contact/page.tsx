'use client';

import { ContactForm } from '@/components/forms/ContactForm';
import { TrackedAnchor } from '@/components/analytics/TrackedAnchor';
import { useConfig } from '@/components/providers/ConfigProvider';


export default function ContactPage() {
  const { businessInfo } = useConfig();
  return (
    <>
      <section className="section page-intro">
        <div className="container">
          <h1>Contact Foto Palace</h1>
          <p>Call, WhatsApp, or visit us for personalized recommendations and fast support.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-page-grid">
          <article className="contact-card">
            <h2>Store Details</h2>
            <p>
              <strong>Address:</strong> {businessInfo.address}
            </p>
            <p>
              <strong>Hours:</strong> {businessInfo.hours}
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <TrackedAnchor
                href={`mailto:${businessInfo.email}`}
                eventName="email_click"
                eventParams={{ source: 'contact_page' }}
              >
                {businessInfo.email}
              </TrackedAnchor>
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              <TrackedAnchor
                href={`tel:${businessInfo.phones[0]}`}
                eventName="click_to_call"
                eventParams={{ source: 'contact_page' }}
              >
                {businessInfo.phones[0]}
              </TrackedAnchor>{' '}
              /{' '}
              <TrackedAnchor
                href={`tel:${businessInfo.phones[1]}`}
                eventName="click_to_call"
                eventParams={{ source: 'contact_page' }}
              >
                {businessInfo.phones[1]}
              </TrackedAnchor>
            </p>
            <TrackedAnchor
              href={`https://wa.me/${businessInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn"
              eventName="whatsapp_click"
              eventParams={{ source: 'contact_page' }}
            >
              Chat on WhatsApp
            </TrackedAnchor>
          </article>

          <article className="contact-card">
            <h2>Send an Enquiry</h2>
            <ContactForm />
          </article>
        </div>
      </section>

      <section className="section map-fullscreen">
        <iframe
          src={businessInfo.googleMapEmbed}
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Foto Palace map location"
        />
      </section>
    </>
  );
}
