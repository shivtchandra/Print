import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getStorefrontProduct } from '@/lib/data/storefront';
import { pageMetadata } from '@/lib/seo/metadata';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getStorefrontProduct(id);
  if (!product) return {};

  return pageMetadata({
    title: `${product.title} | Foto Palace`,
    description: product.description || `Enquire about ${product.title} from ${product.brand} at Foto Palace Vengavasal.`,
    canonical: `/product/${product.id}`
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getStorefrontProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="product-page-wrapper">
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">Home</Link> / <Link href={`/${product.category}`}>{product.category.replace('-', ' ')}</Link> / <span>{product.title}</span>
        </nav>

        <section className="product-main-layout">
          {/* 1. Gallery Column */}
          <div className="gallery-col">
            <div className="gallery-container">
              <div className="thumbnails-vertical">
                {product.images.map((img, idx) => (
                  <div key={idx} className={`thumb-item ${idx === 0 ? 'active' : ''}`}>
                    <Image src={img} alt={`${product.title} view ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="main-stage">
                <div className="main-image-wrap">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Info Column */}
          <div className="info-col">
            <div className="product-header">
              <div className="brand-link">Visit the {product.brand} Store</div>
              <h1 className="product-display-title">{product.title}</h1>
              <div className="rating-placeholder">
                <span className="stars">★★★★★</span>
                <span className="count">4.9 | 15 ratings</span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="price-section">
              <span className="price-label">Price:</span>
              <span className="price-tag">{product.priceRange}</span>
              <span className="tax-info">Inclusive of all taxes</span>
            </div>

            <div className="divider"></div>

            <div className="features-bullets">
              <h3>About this item</h3>
              <ul>
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
                <li>Reliable performance backed by local support and warranty.</li>
              </ul>
            </div>

            <div className="divider"></div>
            
            <div className="short-specs-table">
              {product.specs.slice(0, 4).map((spec, i) => {
                const [key, value] = spec.includes(':') ? spec.split(':') : ['Spec', spec];
                return (
                  <div key={i} className="spec-row">
                    <span className="spec-key">{key.trim()}</span>
                    <span className="spec-val">{value.trim()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Buy Box Column */}
          <aside className="buy-box-col">
            <div className="buy-box shadow-lg">
              <div className="price-tag">{product.priceRange}</div>
              <div className="delivery-info">
                <strong>Free Delivery</strong> available for local orders in Vengavasal.
              </div>
              <div className="stock-status">In Stock</div>
              
              <div className="buy-box-actions">
                <a href="#enquiry" className="primary-btn buy-now-btn full-width">
                  Enquire Now
                </a>
                <a href={`https://wa.me/919435051581?text=Hi, I am interested in ${product.title}`} className="whatsapp-btn full-width">
                  Contact on WhatsApp
                </a>
              </div>
              
              <div className="secure-info">
                <span>🛡️ Local Warranty</span>
                <span>🚚 Prompt Support</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="product-description-tabs section">
          <div className="divider"></div>
          <div className="tabs-header">
            <h2 className="tab-title active">Product Description</h2>
          </div>
          <div className="tab-content">
            <p className="description-text">{product.description || "Information currently being updated. Please contact us for detailed documentation."}</p>
          </div>
        </section>

        <section className="tech-specs-section section" id="specifications">
          <div className="divider"></div>
          <h2>Technical Specifications</h2>
          <div className="specs-table-container">
            <table className="specs-table">
              <tbody>
                {product.specs.map((spec, i) => {
                  const [key, value] = spec.includes(':') ? spec.split(':') : ['Hardware', spec];
                  return (
                    <tr key={i}>
                      <td className="spec-label">{key.trim()}</td>
                      <td className="spec-value">{value.trim()}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="spec-label">Category</td>
                  <td className="spec-value">{product.category.replace('-', ' ')}</td>
                </tr>
                <tr>
                  <td className="spec-label">Brand</td>
                  <td className="spec-value">{product.brand}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="enquiry-section section" id="enquiry">
          <div className="divider"></div>
          <div className="enquiry-layout">
            <div className="enquiry-info">
              <h2>Have Questions?</h2>
              <p>Get in touch with our tech experts for bulk pricing, customization, or compatibility queries.</p>
            </div>
            <div className="enquiry-form-wrap">
              <EnquiryForm 
                category={product.category} 
                sourcePage={`/product/${product.id}`}
                title="Send an Enquiry"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
