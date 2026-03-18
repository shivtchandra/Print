'use client';

import { useConfig } from '@/components/providers/ConfigProvider';
import { socialLinks } from '@/lib/config';

export function Footer() {
  const { businessInfo } = useConfig();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <section>
          <h3>Foto Palace</h3>
          <p>{businessInfo.description}</p>
          <p>
            <strong>Email:</strong> {businessInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {businessInfo.phones.join(' / ')}
          </p>
          <p>
            <strong>Address:</strong> {businessInfo.address}
          </p>
          <p>
            <strong>Hours:</strong> {businessInfo.hours}
          </p>
        </section>

        <section>
          <h3>Find Us</h3>
          <div className="map-wrap">
            <iframe
              src={businessInfo.googleMapEmbed}
              width="100%"
              height="220"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Foto Palace Location"
            />
          </div>
        </section>

        <section>
          <h3>Social</h3>
          <p>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </p>
          <p>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
          <p>
            <a href={`https://wa.me/${businessInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </p>
        </section>
      </div>

      <div className="container footer-bottom">{businessInfo.copyright}</div>
    </footer>
  );
}
