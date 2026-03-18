export function ServicesDetailed() {
  const services = [
    {
      title: "Laptop & Desktop Repair",
      items: ["Motherboard Repair", "Screen Replacement", "OS Support", "Hinge/Body Fixes"],
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "CCTV & Security",
      items: ["8/16 Ch Installation", "Remote Mobile Monitoring", "Biometric Systems", "AMC Support"],
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Custom Assemblies",
      items: ["Gaming PC Setup", "Workstation Build", "Custom Liquid Cooling", "RGB Integration"],
      image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Networking Solutions",
      items: ["WiFi Extension", "Structured Cabling", "Server Maintenance", "VPN Setup"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="services-detailed section bg-offset">
      <div className="container">
        <div className="section-head">
          <h2>Full-Spectrum IT Services</h2>
          <p>Beyond retail, we provide professional technical implementation for home and business.</p>
        </div>

        <div className="services-grid-blocks">
          {services.map((service, i) => (
            <div key={i} className="service-block-card reveal">
              <div className="service-header">
                <h3>{service.title}</h3>
                <ul className="service-features-list">
                  {service.items.map((item, j) => (
                    <li key={j}>✓ {item}</li>
                  ))}
                </ul>
              </div>
              <div className="service-image-mask">
                <img src={service.image} alt={service.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
