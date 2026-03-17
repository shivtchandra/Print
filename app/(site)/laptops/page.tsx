import { CategoryPageShell } from '@/components/sections/CategoryPageShell';
import { InlineCTA } from '@/components/sections/InlineCTA';
import { getStorefrontProducts } from '@/lib/data/storefront';
import { categoryMeta } from '@/lib/data/catalog';
import { pageMetadata } from '@/lib/seo/metadata';

const meta = categoryMeta.laptops;

export const metadata = pageMetadata({
  title: meta.seoTitle,
  description: meta.seoDescription,
  canonical: '/laptops'
});

export default async function LaptopsPage() {
  const products = await getStorefrontProducts('laptops');

  return (
    <CategoryPageShell category="laptops" products={products}>
      <InlineCTA
        title="Need a laptop for gaming, business, or study?"
        subtitle="Tell us your budget and we will recommend the right model with best local deals."
        buttonText="Get Laptop Recommendation"
      />
    </CategoryPageShell>
  );
}
