'use client';

import Link from 'next/link';
import { StorefrontImage } from '@/components/media/StorefrontImage';
import { Product } from '@/lib/types/entities';
import { useCart } from '@/components/providers/CartContext';

interface FeaturedProductCardsProps {
  products: Product[];
}

export function FeaturedProductCards({ products }: FeaturedProductCardsProps) {
  const { addItem } = useCart();
  const featured = products.filter((product) => product.isFeatured).slice(0, 6);

  return (
    <section className="section" id="best-sellers">
      <div className="container">
        <div className="section-head">
          <h2><span className="text-accent">Best</span> Sellers</h2>
          <p>Popular products handpicked for performance and value.</p>
        </div>

        <div className="product-grid">
          {featured.map((product) => (
            <article className="product-card" key={product.id || product.title}>
              <div className="product-card-inner">
                <div className="product-thumb">
                  {product.isFeatured && (
                    <span className="card-badge featured">Featured</span>
                  )}
                  <StorefrontImage
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <span className="brand-tag">{product.brand || product.category}</span>
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-specs-chips">
                    {product.specs.slice(0, 3).map((spec, i) => (
                      <span key={i} className="spec-chip">{spec}</span>
                    ))}
                  </div>
                  <div className="product-card-footer">
                    <div className="price-stack">
                      <span className="price-label">Starting from</span>
                      <span className="price-value">{product.priceRange}</span>
                    </div>
                    <div className="card-actions">
                      <Link href={`/product/${product.id}`} className="view-details-btn">
                        View Details
                      </Link>
                      <button
                        className="card-enquiry-btn"
                        onClick={() => addItem(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
