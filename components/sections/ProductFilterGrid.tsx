'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { Product } from '@/lib/types/entities';

interface ProductFilterGridProps {
  products: Product[];
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

export function ProductFilterGrid({ products }: ProductFilterGridProps) {
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
    const specText = `${product.title} ${product.specs.join(' ')} ${product.features.join(' ')}`.toLowerCase();
    const matchesSpec = specQuery.trim().length === 0 || specText.includes(specQuery.toLowerCase());

    return matchesBrand && matchesPrice && matchesSpec && product.status === 'active';
  });

  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  return (
    <section className="section">
      <div className="container">
        <div className="filter-bar reveal">
          {/* Custom Brand Dropdown */}
          <div className="custom-dropdown">
            <button 
              className="dropdown-toggle" 
              onClick={() => { setIsBrandOpen(!isBrandOpen); setIsPriceOpen(false); }}
            >
              {brand === 'all' ? 'All Brands' : brand}
              <span className={`arrow ${isBrandOpen ? 'up' : ''}`}><ChevronDown /></span>
            </button>
            {isBrandOpen && (
              <ul className="dropdown-menu">
                {brands.map((option) => (
                  <li 
                    key={option} 
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
              onClick={() => { setIsPriceOpen(!isPriceOpen); setIsBrandOpen(false); }}
            >
              {priceBand === 'all' ? 'All Prices' : 
               priceBand.charAt(0).toUpperCase() + priceBand.slice(1)}
              <span className={`arrow ${isPriceOpen ? 'up' : ''}`}><ChevronDown /></span>
            </button>
            {isPriceOpen && (
              <ul className="dropdown-menu">
                {[
                  { value: 'all', label: 'All Prices' },
                  { value: 'budget', label: 'Budget' },
                  { value: 'mid', label: 'Mid' },
                  { value: 'premium', label: 'Premium' }
                ].map((option) => (
                  <li 
                    key={option.value} 
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

        <div className="product-grid">
          {filtered.map((product) => (
            <article className="product-card" key={product.id || product.title}>
              <div className="product-thumb">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3>{product.title}</h3>
              <p className="meta">{product.brand}</p>
              <ul>
                {product.specs.slice(0, 4).map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
              <p className="price">{product.priceRange}</p>
              <a href="#enquiry" className="secondary-btn">
                Enquire Now
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
