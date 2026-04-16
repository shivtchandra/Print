'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { StorefrontImage } from '@/components/media/StorefrontImage';
import { trackContactIntent } from '@/lib/analytics/events';
import { categoryMeta } from '@/lib/data/catalog';
import { Product, ProductCategory } from '@/lib/types/entities';
import { buildProductEnquiryUrl } from '@/lib/whatsapp';

interface ProductFilterGridProps {
  products: Product[];
  currentCategory: ProductCategory;
}

function parsePriceBand(priceRange: string) {
  if (priceRange.includes('50,000') || priceRange.includes('42,000') || priceRange.includes('49,000')) {
    return 'budget';
  }
  if (priceRange.includes('1.5L') || priceRange.includes('1,40,000')) {
    return 'premium';
  }
  return 'mid';
}

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

export function ProductFilterGrid({ products, currentCategory }: ProductFilterGridProps) {
  const router = useRouter();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [brand, setBrand] = useState('all');
  const [priceBand, setPriceBand] = useState('all');
  const [specQuery, setSpecQuery] = useState('');

  const brands = useMemo(
    () => ['all', ...new Set(products.map((product) => product.brand))],
    [products]
  );

  const filtered = products.filter((product) => {
    const matchesBrand = brand === 'all' || product.brand === brand;
    const matchesPrice = priceBand === 'all' || parsePriceBand(product.priceRange) === priceBand;
    const specText = `${product.title} ${(product.specs || []).join(' ')} ${(product.features || []).join(' ')}`.toLowerCase();
    const matchesSpec = specQuery.trim().length === 0 || specText.includes(specQuery.toLowerCase());

    return matchesBrand && matchesPrice && matchesSpec && product.status === 'active';
  });

  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const categories = useMemo(() => Object.keys(categoryMeta) as ProductCategory[], []);

  return (
    <section className="section" id="products-grid">
      <div className="container">
        <div className="section-head reveal">
          <h2>Our <span className="text-accent">{categoryMeta[currentCategory]?.label}</span> Collection</h2>
          <p>Browse and compare the best {currentCategory} models available in Jorhat.</p>
        </div>
        <div className="filter-bar reveal">
          {/* Category switcher */}
          <div className="custom-dropdown">
            <button
              className="dropdown-toggle"
              aria-haspopup="listbox"
              aria-expanded={isCategoryOpen}
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsBrandOpen(false);
                setIsPriceOpen(false);
              }}
            >
              {categoryMeta[currentCategory]?.label || 'Products'}
              <span className={`arrow ${isCategoryOpen ? 'up' : ''}`} aria-hidden="true">
                <ChevronDown />
              </span>
            </button>
            {isCategoryOpen && (
              <ul className="dropdown-menu" role="listbox">
                {categories.map((option) => (
                  <li
                    key={option}
                    role="option"
                    aria-selected={option === currentCategory}
                    onClick={() => {
                      setIsCategoryOpen(false);
                      router.push(`/${option}`);
                    }}
                    className={option === currentCategory ? 'active' : ''}
                  >
                    {categoryMeta[option].label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Custom Brand Dropdown */}
          <div className="custom-dropdown">
            <button 
              className="dropdown-toggle" 
              aria-haspopup="listbox"
              aria-expanded={isBrandOpen}
              onClick={() => { setIsBrandOpen(!isBrandOpen); setIsPriceOpen(false); setIsCategoryOpen(false); }}
            >
              {brand === 'all' ? 'All Brands' : brand}
              <span className={`arrow ${isBrandOpen ? 'up' : ''}`} aria-hidden="true"><ChevronDown /></span>
            </button>
            {isBrandOpen && (
              <ul className="dropdown-menu" role="listbox">
                {brands.map((option) => (
                  <li 
                    key={option} 
                    role="option"
                    aria-selected={brand === option}
                    onClick={() => { setBrand(option); setIsBrandOpen(false); }}
                    className={brand === option ? 'active' : ''}
                  >
                    {option === 'all' ? 'All Brands' : option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Custom Price Dropdown */}
          <div className="custom-dropdown">
            <button 
              className="dropdown-toggle" 
              aria-haspopup="listbox"
              aria-expanded={isPriceOpen}
              onClick={() => { setIsPriceOpen(!isPriceOpen); setIsBrandOpen(false); setIsCategoryOpen(false); }}
            >
              {priceBand === 'all' ? 'All Prices' : 
               priceBand.charAt(0).toUpperCase() + priceBand.slice(1)}
              <span className={`arrow ${isPriceOpen ? 'up' : ''}`} aria-hidden="true"><ChevronDown /></span>
            </button>
            {isPriceOpen && (
              <ul className="dropdown-menu" role="listbox">
                {[
                  { value: 'all', label: 'All Prices' },
                  { value: 'budget', label: 'Budget' },
                  { value: 'mid', label: 'Mid' },
                  { value: 'premium', label: 'Premium' }
                ].map((option) => (
                  <li 
                    key={option.value} 
                    role="option"
                    aria-selected={priceBand === option.value}
                    onClick={() => { setPriceBand(option.value); setIsPriceOpen(false); }}
                    className={priceBand === option.value ? 'active' : ''}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="search-wrap">
            <input
              value={specQuery}
              onChange={(event) => setSpecQuery(event.target.value)}
              type="search"
              placeholder="Search specs (RTX, 16GB...)"
            />
          </div>
        </div>

        {filtered.length === 0 && (
          <p className="empty-catalog-hint reveal">
            No products in this category yet. Add real inventory from the admin panel.
          </p>
        )}

        <div className="product-grid">
          {filtered.map((product) => {
            const waHref = buildProductEnquiryUrl(product.title, product.priceRange);
            return (
              <article className="product-card reveal" key={product.id || product.title}>
                <div className="product-card-inner">
                  <div className="product-thumb">
                    <span className="emi-badge" title="EMI available on select models">
                      EMI
                    </span>
                    <StorefrontImage
                      src={product.images[0]}
                      alt={`${product.title} — ${product.brand}, Foto Palace Jorhat`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="product-image"
                    />
                    {product.isFeatured && <div className="card-badge featured">Featured</div>}
                  </div>

                  <div className="product-info">
                    <div className="brand-tag">{product.brand}</div>
                    <h3 className="product-title">{product.title}</h3>

                    <div className="product-specs-chips">
                      {product.specs.slice(0, 3).map((spec) => (
                        <span key={spec} className="spec-chip">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="product-card-footer">
                      <div className="price-stack">
                        <span className="price-label">Estimated Price</span>
                        <span className="price-value">{product.priceRange}</span>
                      </div>

                      <div className="card-actions">
                        <Link href={`/product/${product.id}`} className="view-details-btn">
                          View Details
                        </Link>
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-enquiry-btn"
                          onClick={() =>
                            trackContactIntent({
                              method: 'whatsapp',
                              source: 'category_product_grid',
                              product_title: product.title
                            })
                          }
                        >
                          Enquire on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
