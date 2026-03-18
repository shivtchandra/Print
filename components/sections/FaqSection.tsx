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
      <div className="container narrow">
        <div className="section-head">
          <h2>Technology FAQ</h2>
          <p>Common questions about our products and services.</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item reveal">
              <h3 className="faq-question">Q: {faq.q}</h3>
              <p className="faq-answer">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
