import Link from 'next/link';

import { categoryMeta } from '@/lib/data/catalog';
import { ProductCategory } from '@/lib/types/entities';

const categories: ProductCategory[] = [
  'laptops',
  'gaming-desktops',
  'printers',
  'cctv',
  'assembled-desktops',
  'accessories'
];

export function FeaturedDeals() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Featured Deals</h2>
          <p>Explore our top categories and discover the right setup for your needs.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link 
              className="category-card fade-up" 
              key={category} 
              href={`/${category}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3>{categoryMeta[category].label}</h3>
              <p>{categoryMeta[category].heroSubtitle}</p>
              <span className="cta-link">
                Shop Category 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px', verticalAlign: 'middle' }}><path d="m9 18 6-6-6-6"/></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
