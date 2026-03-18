'use client';

import { TrackedAnchor } from '@/components/analytics/TrackedAnchor';
import { useConfig } from '@/components/providers/ConfigProvider';

export function ContactActions() {
  const { businessInfo } = useConfig();
  return (
    <section className="section contact-actions">
      <div className="container action-grid">
        <TrackedAnchor
          href={`https://wa.me/${businessInfo.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="primary-btn"
          eventName="whatsapp_click"
          eventParams={{ source: 'section_cta' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3.5Z"/></svg>
          Chat on WhatsApp
        </TrackedAnchor>

        <TrackedAnchor
          href={`tel:${businessInfo.phones[0]}`}
          className="secondary-btn"
          eventName="click_to_call"
          eventParams={{ source: 'section_cta' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.18-2.18a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call Now
        </TrackedAnchor>

        <TrackedAnchor
          href="https://maps.google.com/?q=Gar-Ali+near+Eleye+Cinema,+Vengavasal,+Tamil+Nadu"
          target="_blank"
          rel="noopener noreferrer"
          className="secondary-btn"
          eventName="map_directions"
          eventParams={{ source: 'section_cta' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Get Directions
        </TrackedAnchor>
      </div>
    </section>
  );
}
