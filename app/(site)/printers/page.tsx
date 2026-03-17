import { CategoryPageShell } from '@/components/sections/CategoryPageShell';
import { InlineCTA } from '@/components/sections/InlineCTA';
import { SpecsComparisonTable } from '@/components/sections/SpecsComparisonTable';
import { categoryMeta, printerComparison } from '@/lib/data/catalog';
import { getStorefrontProducts } from '@/lib/data/storefront';
import { pageMetadata } from '@/lib/seo/metadata';

const meta = categoryMeta.printers;

export const metadata = pageMetadata({
  title: meta.seoTitle,
  description: meta.seoDescription,
  canonical: '/printers'
});

export default async function PrintersPage() {
  const products = await getStorefrontProducts('printers');

  return (
    <CategoryPageShell category="printers" products={products}>
      <SpecsComparisonTable rows={printerComparison} />
      <InlineCTA
        title="Bulk deals available for schools and offices"
        subtitle="Call now for printer bundles, installation, and consumables support."
        buttonText="Call for Bulk Pricing"
      />
    </CategoryPageShell>
  );
}
