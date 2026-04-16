import Link from 'next/link';

import { storefrontFaqs } from '@/lib/data/faqs';
import { businessInfo } from '@/lib/config';
import { getWhatsAppDigits } from '@/lib/whatsapp';

export function FaqSection() {
  const wa = `https://wa.me/${getWhatsAppDigits()}?text=${encodeURIComponent('Hi Foto Palace, I need help choosing a product.')}`;

  return (
    <section className="faq-section section">
      <div className="container">
        <div className="faq-shell reveal">
          <div className="faq-head">
            <span className="faq-kicker">Support Center</span>
            <h2>Technology FAQ</h2>
            <p>Clear answers for the most common buying, warranty, and service questions in Jorhat.</p>
          </div>

          <div className="faq-list">
            {storefrontFaqs.map((faq, i) => (
              <details key={faq.question} className="faq-item" open={i === 0}>
                <summary className="faq-question">
                  <span className="faq-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <p className="faq-answer">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="faq-foot">
            <p>Need help choosing the right product for your budget or use case?</p>
            <div className="faq-actions">
              <Link href="/contact" className="faq-action-secondary">
                Talk to Support
              </Link>
              <a href={wa} className="faq-action-primary" target="_blank" rel="noopener noreferrer">
                WhatsApp {businessInfo.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
