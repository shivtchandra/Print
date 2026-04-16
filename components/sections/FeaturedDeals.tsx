'use client';
import Link from 'next/link';
import Image from 'next/image';
import { categoryMeta } from '@/lib/data/catalog';
import { ProductCategory } from '@/lib/types/entities';
import { useConfig } from '@/components/providers/ConfigProvider';

const categories: ProductCategory[] = [
  'laptops',
  'gaming-desktops',
  'printers',
  'cctv',
  'assembled-desktops',
  'accessories'
];

export function FeaturedDeals() {
  const { categorySettings } = useConfig();

  return (
    <section className="section" id="shop-by-category">
      <div className="container">
        <div className="section-head">
          <h2>
            <span className="text-accent">Shop by</span> Category
          </h2>
          <p>Explore our top categories and discover the right setup for your needs.</p>
        </div>
        <div className="category-scroll-grid">
          {categories.map((category) => {
            // Merge hardcoded defaults with dynamic admin settings
            const settings = categorySettings?.[category] || {};
            const meta = { ...categoryMeta[category], ...settings };
            
            const hasImage = Boolean(meta.heroImage?.trim());
            
            return (
              <Link className="category-image-card" key={category} href={`/${category}`}>
                <div
                  className={`category-image-wrap ${hasImage ? '' : 'category-image-wrap-placeholder'}`}
                >
                  {hasImage ? (
                    <Image
                      src={meta.heroImage}
                      alt={meta.label}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="category-image"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <h3 className="category-image-label">{meta.label}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
