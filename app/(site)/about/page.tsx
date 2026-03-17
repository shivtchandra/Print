import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'About Foto Palace',
  description: 'Foto Palace is your trusted local tech partner in Vengavasal.',
  canonical: '/about'
});

export default function AboutPage() {
  return (
    <>
      <section className="section page-intro">
        <div className="container narrow">
          <h1>About Foto Palace</h1>
          <p>
            Foto Palace is your trusted tech partner since [year]. We are known in Vengavasal for reliable
            product recommendations, honest pricing, and quick support.
          </p>
          <p>
            From laptops and gaming desktops to printers, CCTV systems, custom assembled desktops, and IT
            accessories, we help individuals and businesses choose the right technology with confidence.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="feature-block">
            <h2>Why Customers Choose Us</h2>
            <ul>
              <li>Wide category coverage under one roof</li>
              <li>Local after-sales and setup support</li>
              <li>Custom builds and upgrade guidance</li>
              <li>Bulk pricing for offices and institutions</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
