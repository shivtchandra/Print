import { CategoryPageShell } from '@/components/sections/CategoryPageShell';
import { InlineCTA } from '@/components/sections/InlineCTA';
import { categoryMeta } from '@/lib/data/catalog';
import { getStorefrontProducts } from '@/lib/data/storefront';
import { pageMetadata } from '@/lib/seo/metadata';

const meta = categoryMeta.cctv;

export const metadata = pageMetadata({
  title: meta.seoTitle,
  description: meta.seoDescription,
  canonical: '/cctv'
});

export default async function CctvPage() {
  const products = await getStorefrontProducts('cctv');

  return (
    <CategoryPageShell category="cctv" products={products}>
      <InlineCTA
        title="Professional setup available"
        subtitle="Get site survey, installation, and configuration for 24/7 security coverage."
        buttonText="Book CCTV Consultation"
      />
    </CategoryPageShell>
  );
}
