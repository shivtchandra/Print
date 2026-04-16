import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getStorefrontConfig, getStorefrontProduct } from '@/lib/data/storefront';
import { pageMetadata } from '@/lib/seo/metadata';
import { buildProductEnquiryUrl } from '@/lib/whatsapp';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { LaptopCustomizationPanel } from '@/components/product/LaptopCustomizationPanel';
import { ProductGallery } from '@/components/product/ProductGallery';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

function parsePriceRangeToBase(priceRange: string) {
  // Supports formats like:
  // - "₹78,000 - ₹95,000"
  // - "₹80,000+"
  // - "₹1.5L+"
  const normalized = (priceRange || '').replace(/\s/g, '');
  if (!normalized) return 0;

  const values: number[] = [];

  const lakhMatches = [...normalized.matchAll(/(\d+(?:\.\d+)?)L\+?/gi)].map((m) => m[1]);
  for (const v of lakhMatches) {
    const n = Number(v);
    if (Number.isFinite(n)) values.push(Math.round(n * 100000));
  }

  // Remove lakh fragments first so we don't accidentally capture the "1" from "1.5L".
  const withoutLakh = normalized.replace(/(\d+(?:\.\d+)?)L\+?/gi, '');
  const rupeeMatches = [...withoutLakh.matchAll(/(\d[\d,]*)(?:\.\d+)?/g)].map((m) => m[1]);
  for (const v of rupeeMatches) {
    const digits = v.replace(/,/g, '');
    const n = Number(digits);
    if (Number.isFinite(n)) values.push(Math.round(n));
  }

  if (values.length >= 2) {
    const sorted = values.sort((a, b) => a - b);
    return Math.round((sorted[0] + sorted[sorted.length - 1]) / 2);
  }

  if (values.length === 1) return values[0];
  return 0;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getStorefrontProduct(id);
  if (!product) return {};

  return pageMetadata({
    title: `${product.title} | Foto Palace Jorhat`,
    description:
      product.description ||
      `${product.title} by ${product.brand} — price ${product.priceRange}. Enquire at Foto Palace, Gar-Ali, Jorhat. WhatsApp 9435051891.`,
    canonical: `/product/${product.id}`
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getStorefrontProduct(id);
  const config = await getStorefrontConfig();

  if (!product) {
    notFound();
  }

  const laptopCustomization = config.laptopCustomization?.categories ?? [];
  const basePrice = parsePriceRangeToBase(product.priceRange);
  const whatsappHref = buildProductEnquiryUrl(product.title, product.priceRange);

  return (
    <main className="product-page-wrapper">
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">Home</Link> / <Link href={`/${product.category}`}>{product.category.replace('-', ' ')}</Link> / <span>{product.title}</span>
        </nav>

        <section className="product-main-layout">
          {/* 1. Gallery Column */}
          <div className="gallery-col">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* 2. Info Column */}
          <div className="info-col">
            <div className="product-header">
              <div className="brand-link">Visit the {product.brand} Store</div>
              <h1 className="product-display-title">{product.title}</h1>
              <div className="rating-placeholder">
                <span className="stars" aria-label="5 star rating">
                  <span className="material-icons" aria-hidden="true">
                    star
                  </span>
                  <span className="material-icons" aria-hidden="true">
                    star
                  </span>
                  <span className="material-icons" aria-hidden="true">
                    star
                  </span>
                  <span className="material-icons" aria-hidden="true">
                    star
                  </span>
                  <span className="material-icons" aria-hidden="true">
                    star
                  </span>
                </span>
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

            {((product.customizations ?? []).length > 0 || (product.category === 'laptops' && laptopCustomization.length > 0)) && (
              <>
                <LaptopCustomizationPanel
                  categories={(product.customizations ?? []).length > 0 ? product.customizations! : laptopCustomization}
                  basePrice={basePrice}
                />
                <div className="divider"></div>
              </>
            )}

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
                <strong>Free Delivery</strong> available for local orders in Jorhat.
              </div>
              <div className="stock-status">In Stock</div>
              
              <div className="buy-box-actions">
                <a href="#enquiry" className="primary-btn buy-now-btn full-width">
                  Enquire Now
                </a>
                <a href={whatsappHref} className="whatsapp-btn full-width" target="_blank" rel="noopener noreferrer">
                  Contact on WhatsApp
                </a>
              </div>
              
              <div className="secure-info">
                <span className="secure-item">
                  <span className="material-icons" aria-hidden="true">
                    security
                  </span>
                  Local Warranty
                </span>
                <span className="secure-item">
                  <span className="material-icons" aria-hidden="true">
                    support_agent
                  </span>
                  Prompt Support
                </span>
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
