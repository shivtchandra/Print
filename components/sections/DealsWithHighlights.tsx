const highlights = [
  'Dell, HP, ASUS, Lenovo laptop collections',
  'Custom gaming desktop assembly and upgrades',
  'Printers for home, office, and bulk business needs',
  'CCTV kits with installation and app support',
  'Monitors, UPS, cables, and gaming accessories'
];

export function DealsWithHighlights() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Deals With</h2>
          <p>One-stop destination for complete tech solutions in Vengavasal.</p>
        </div>
        <div className="highlight-grid">
          {highlights.map((item) => (
            <article className="highlight-card" key={item}>
              {item}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
