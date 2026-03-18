import { ReactNode } from 'react';

import { CategoryHero } from '@/components/sections/CategoryHero';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { FeatureList } from '@/components/sections/FeatureList';
import { ProductFilterGrid } from '@/components/sections/ProductFilterGrid';
import { categoryMeta, productFeaturesByCategory } from '@/lib/data/catalog';
import { productCategorySchema } from '@/lib/seo/schema';
import { Product, ProductCategory } from '@/lib/types/entities';

interface CategoryPageShellProps {
  category: ProductCategory;
  products: Product[];
  children?: ReactNode;
}

export function CategoryPageShell({ category, products, children }: CategoryPageShellProps) {
  const meta = categoryMeta[category];
  const schema = productCategorySchema(category, meta.label, meta.seoDescription);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
      <CategoryHero title={meta.heroTitle} subtitle={meta.heroSubtitle} image={meta.heroImage} />
      <FeatureList title={`${meta.label} Highlights`} items={productFeaturesByCategory[category]} />
      {children}
      <ProductFilterGrid products={products} />
      <EnquiryForm category={category} sourcePage={`/${category}`} title={`Get ${meta.label} Quote`} />
    </>
  );
}
