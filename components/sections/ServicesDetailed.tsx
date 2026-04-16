import Image from 'next/image';

export function ServicesDetailed() {
  const services = [
    {
      title: "Laptop & Desktop Repair",
      description: "Expert diagnostics and component-level repairs for all major brands.",
      items: ["Motherboard Repair", "Screen Replacement", "OS Optimization", "Hinge & Body Fixes"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/><path d="M12 9v4"/><path d="m15 12-3 3-3-3"/></svg>
      ),
      gridClass: "bento-large",
      waMessage: "Hi Foto Palace, I need technical assistance with a Laptop/Desktop repair or service."
    },
    {
      title: "CCTV & Security",
      description: "Advanced surveillance solutions for home and industrial safety.",
      items: ["8/16 Ch Installation", "Remote Monitoring", "Biometric Access", "AMC Support"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-4.5"/><path d="M19 10l4-4"/><path d="M19 10l-4-4"/><path d="M19 10v10"/><path d="M15 10l4 4"/><path d="M12 4h9"/><path d="M12 4v4"/><path d="M12 4l-3 3"/></svg>
      ),
      gridClass: "bento-medium",
      waMessage: "Hi Foto Palace, I'm interested in getting a CCTV security system installed for my home/business."
    },
    {
      title: "Networking Solutions",
      description: "High-speed, secure network infrastructure for seamless connectivity.",
      items: ["WiFi Mesh extension", "Structured Cabling", "Server setups", "VPN & Firewall"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26a8 8 0 1 0-11.48 0H4"/><circle cx="12" cy="12" r="2"/><path d="m13.42 13.42 1.58 1.58"/><path d="m10.58 13.42-1.58 1.58"/><path d="m13.42 10.58 1.58-1.58"/><path d="m10.58 10.58-1.58-1.58"/></svg>
      ),
      gridClass: "bento-small",
      waMessage: "Hi Foto Palace, I need a consultation for a professional WiFi or networking solution."
    },
    {
      title: "Custom Assemblies",
      description: "High-performance PC builds tailored to your creative or gaming needs.",
      items: ["Gaming PC tuning", "Workstation builds", "Liquid Cooling", "RGB Syncing"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h18"/><path d="M3 18h18"/><path d="M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2"/><path d="M10 2v8"/><path d="M14 2v8"/></svg>
      ),
      gridClass: "bento-wide",
      waMessage: "Hi Foto Palace, I want to discuss a custom-built high-performance PC assembly."
    }
  ];

  return (
    <section className="services-detailed section gold-mesh-bg" id="expertise">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <h2 className="display-text-glow">Engineered Excellence</h2>
          <p>Modern solutions for complex technical challenges. From individual hardware repair to enterprise networking.</p>
        </div>

        <div className="services-bento-grid">
          {services.map((service, i) => (
            <div key={i} className={`service-bento-card no-image ${service.gridClass} reveal-on-scroll delay-${i % 3 + 1}`}>
              <div className="service-bento-content">
                <div className="service-bento-icon-box">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <ul className="service-check-list">
                  {service.items.map((item, j) => (
                    <li key={j}>
                      <span className="check-dot"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a 
                  href={`https://wa.me/919435051891?text=${encodeURIComponent(service.waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-bento-action"
                >
                  <span>Get Instant Quote</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
