import { CategoryPageShell } from '@/components/sections/CategoryPageShell';
import { GamingBuildTable } from '@/components/sections/GamingBuildTable';
import { GamingConfigurator } from '@/components/sections/GamingConfigurator';
import { InlineCTA } from '@/components/sections/InlineCTA';
import { getStorefrontProducts } from '@/lib/data/storefront';
import { categoryMeta } from '@/lib/data/catalog';
import { pageMetadata } from '@/lib/seo/metadata';

const meta = categoryMeta['gaming-desktops'];

export const metadata = pageMetadata({
  title: meta.seoTitle,
  description: meta.seoDescription,
  canonical: '/gaming-desktops'
});

export default async function GamingDesktopPage() {
  const products = await getStorefrontProducts('gaming-desktops');

  return (
    <CategoryPageShell category="gaming-desktops" products={products}>
      <GamingBuildTable />
      <GamingConfigurator />
      <InlineCTA
        title="Pre-built vs Custom Assembly"
        subtitle="Discuss your gaming goals, monitor resolution, and budget for the best build path."
        buttonText="Get Gaming Build Quote"
      />
    </CategoryPageShell>
  );
}
