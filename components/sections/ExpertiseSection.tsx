export function ExpertiseSection() {
  const points = [
    {
      title: "15+ Years Expertise",
      desc: "Our technicians have over a decade of experience in component-level repairs and custom assembly.",
      icon: "🛠️"
    },
    {
      title: "Genuine Parts Only",
      desc: "We prioritize long-term reliability by using only high-quality, authentic components from trusted brands.",
      icon: "💎"
    },
    {
      title: "Vengavasal's Local Support",
      desc: "No more waiting for remote support. We are right here in your neighborhood for rapid on-site assistance.",
      icon: "🏠"
    },
    {
      title: "Customized Solutions",
      desc: "Whether it's a budget home PC or a high-end enterprise CCTV network, we tailor everything to your needs.",
      icon: "⚙️"
    }
  ];

  return (
    <section className="expertise-section section">
      <div className="container">
        <div className="section-head">
          <h2>Why Professionals Choose Foto Palace</h2>
          <p>We are not just a store; we are your local technology partners committed to excellence.</p>
        </div>
        
        <div className="expertise-grid">
          {points.map((point, i) => (
            <div key={i} className="expertise-card reveal">
              <div className="expertise-icon">{point.icon}</div>
              <h3 className="expertise-title">{point.title}</h3>
              <p className="expertise-desc">{point.desc}</p>
            </div>
          ))}
        </div>

        <div className="detailed-story-box mt-10">
          <div className="story-content">
            <h3>Our Mission</h3>
            <p>
              Founded with the vision to bring world-class IT infrastructure to Vengavasal, Foto Palace has grown into the leading hub for all things tech. 
              We believe that high-performance computing and secure monitoring shouldn't be reserved for the big cities. 
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
  );
}
