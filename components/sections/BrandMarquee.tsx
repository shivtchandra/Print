const brands = ['Dell', 'HP', 'ASUS', 'Lenovo', 'Canon', 'Epson', 'Hikvision', 'TP-Link', 'APC', 'Logitech'];

/** Horizontal brand strip — swap for SVG logos when you have licensed assets. */
export function BrandMarquee() {
  const doubled = [...brands, ...brands];
  return (
    <section className="brand-marquee-section section-tight" aria-label="Brands we stock">
      <div className="container">
        <p className="brand-marquee-kicker">Trusted brands — Gar-Ali, Jorhat</p>
      </div>
      <div className="brand-marquee-outer">
        <div className="brand-marquee-track brand-marquee-track-text">
          {doubled.map((name, i) => (
            <span key={`${name}-${i}`} className="brand-marquee-pill">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
