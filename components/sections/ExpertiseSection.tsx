export function ExpertiseSection() {
  const valueProps = [
    {
      title: "Safe Delivery",
      desc: "All products are safely packed and insured for transit.",
      icon: "local_shipping"
    },
    {
      title: "Best Price",
      desc: "Get the best prices, value and deals on all products.",
      icon: "payments"
    },
    {
      title: "100% Genuine",
      desc: "Shop with full assurance. All our products are genuine.",
      icon: "verified"
    },
    {
      title: "Tech Support",
      desc: "Stuck anywhere? All customers get free tech support.",
      icon: "support_agent"
    }
  ];

  return (
    <>
      {/* ===== VALUE PROPS STRIP (ModX-style) ===== */}
      <section className="value-props-strip">
        <div className="container value-props-inner">
          {valueProps.map((prop, i) => (
            <div key={i} className="value-prop-item">
              <span className="material-icons value-prop-icon" aria-hidden="true">
                {prop.icon}
              </span>
              <div className="value-prop-text">
                <h3>{prop.title}</h3>
                <p>{prop.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MISSION & STATS ===== */}
      <section className="section expertise-section">
        <div className="container">
          <div className="section-head">
            <h2><span className="text-accent">Why</span> Foto Palace</h2>
            <p>We are not just a store; we are your local technology partners committed to excellence.</p>
          </div>

          <div className="detailed-story-box">
            <div className="story-content">
              <h3>Our Mission</h3>
              <p>
                Founded with the vision to bring world-class IT infrastructure to Jorhat, Foto Palace has grown into the leading hub for all things tech.
                We believe that high-performance computing and secure monitoring shouldn&apos;t be reserved for the big cities.
                Our mission is to empower local businesses, creators, and families with tools that work as hard as they do.
              </p>
              <div className="stats-row">
                <div className="stat-item">
                  <span className="stat-value">5000+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">250+</span>
                  <span className="stat-label">Gaming Builds</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">1200+</span>
                  <span className="stat-label">CCTV Nodes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
