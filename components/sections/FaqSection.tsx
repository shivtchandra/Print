import Link from 'next/link';

export function FaqSection() {
  const faqs = [
    {
      q: "Do you offer on-site laptop repair in Vengavasal?",
      a: "Yes! We provide on-site diagnostics and minor repairs. For major motherboard or hardware work, we may safely transport your device to our service center."
    },
    {
      q: "Can I customize a PC build within a specific budget?",
      a: "Absolutely. We specialize in custom builds. Tell us your budget (e.g., ₹50k, ₹1L) and your primary use (gaming, editing, or office), and we will create the best specs for you."
    },
    {
      q: "Do the products come with a warranty?",
      a: "All our products carry full manufacturer warranty. Additionally, Foto Palace provides local technical support to help you with the RMA process if ever needed."
    },
    {
      q: "How long does a typical CCTV installation take?",
      a: "For a standard 4 to 8 camera home setup, it usually takes 1 business day including wiring and mobile app configuration."
    }
  ];

  return (
    <section className="faq-section section">
      <div className="container">
        <div className="faq-shell reveal">
          <div className="faq-head">
            <span className="faq-kicker">Support Center</span>
            <h2>Technology FAQ</h2>
            <p>Clear answers for the most common buying, warranty, and service questions.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <details key={i} className="faq-item" open={i === 0}>
                <summary className="faq-question">
                  <span className="faq-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="faq-question-text">{faq.q}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <p className="faq-answer">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="faq-foot">
            <p>Need help choosing the right product for your budget or use case?</p>
            <div className="faq-actions">
              <Link href="/contact" className="faq-action-secondary">
                Talk to Support
              </Link>
              <a
                href="https://wa.me/919435051581?text=Hi%2C%20I%20need%20help%20choosing%20a%20product."
                className="faq-action-primary"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
