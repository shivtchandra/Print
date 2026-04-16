'use client';

import { useConfig } from '@/components/providers/ConfigProvider';
import { businessInfo } from '@/lib/config';

const WHY = [
  {
    title: 'Local expertise',
    body: 'We assemble, tune, and support systems from our Gar-Ali desk — not a distant warehouse.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    title: 'Honest pricing',
    body: 'We match parts to your budget and explain trade-offs so you never pay for specs you do not need.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    title: 'After-sales care',
    body: 'Warranty coordination, RAM/SSD upgrades, and printer or CCTV support — walk in or WhatsApp.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  }
];

export function AboutPageClient() {
  const { aboutPage } = useConfig();

  return (
    <>
      <section className="section page-intro">
        <div className="container narrow">
          <h1>{aboutPage.heroTitle}</h1>
          <p className="about-hero-nap">{businessInfo.address}</p>
          <p className="about-hero-hours">
            Open {businessInfo.hours}
            {businessInfo.phones[0] ? ` · ${businessInfo.phones[0]}` : ''}
          </p>
          {aboutPage.introParagraphs.map((p, idx) => (
            <p key={idx} className="about-intro-p">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="feature-block">
            <h2>{aboutPage.whyTitle}</h2>
            <ul className="about-why-list">
              {aboutPage.whyBullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section about-why-icons">
        <div className="container">
          <h2 className="about-why-icons-title">Why choose us</h2>
          <div className="about-why-grid">
            {WHY.map((item) => (
              <article key={item.title} className="about-why-card">
                <div className="about-why-icon" aria-hidden>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
