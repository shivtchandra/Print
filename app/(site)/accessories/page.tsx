import { CategoryPageShell } from '@/components/sections/CategoryPageShell';
import { InlineCTA } from '@/components/sections/InlineCTA';
import { categoryMeta } from '@/lib/data/catalog';
import { getStorefrontProducts } from '@/lib/data/storefront';
import { pageMetadata } from '@/lib/seo/metadata';

const meta = categoryMeta.accessories;

export const metadata = pageMetadata({
  title: meta.seoTitle,
  description: meta.seoDescription,
  canonical: '/accessories'
});

export default async function AccessoriesPage() {
  const products = await getStorefrontProducts('accessories');

  return (
    <CategoryPageShell category="accessories" products={products}>
      <InlineCTA
        title="Related accessories for your setup"
        subtitle="Complete your laptop, gaming, or office workstation with the right peripherals."
        buttonText="Ask for Accessory Bundle"
      />
    </CategoryPageShell>
  );
}
