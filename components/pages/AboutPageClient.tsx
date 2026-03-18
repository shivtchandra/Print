'use client';

import { useConfig } from '@/components/providers/ConfigProvider';

export function AboutPageClient() {
  const { aboutPage } = useConfig();

  return (
    <>
      <section className="section page-intro">
        <div className="container narrow">
          <h1>{aboutPage.heroTitle}</h1>
          {aboutPage.introParagraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="feature-block">
            <h2>{aboutPage.whyTitle}</h2>
            <ul>
              {aboutPage.whyBullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

