import Image from 'next/image';

import { Product } from '@/lib/types/entities';

interface FeaturedProductCardsProps {
  products: Product[];
}

export function FeaturedProductCards({ products }: FeaturedProductCardsProps) {
  const featured = products.filter((product) => product.isFeatured).slice(0, 6);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Top Picks This Week</h2>
          <p>Popular products handpicked for performance and value.</p>
        </div>

        <div className="product-grid">
            {featured.map((product, index) => (
              <article 
                className={`product-card fade-up`} 
                key={product.id || product.title}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="product-thumb">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
                <div className="product-info">
                  <p className="meta">{product.category}</p>
                  <h3>{product.title}</h3>
                  <ul className="product-specs">
                    {product.specs.slice(0, 3).map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                  <p className="price">{product.priceRange}</p>
                  <button className="secondary-btn">View Details</button>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
