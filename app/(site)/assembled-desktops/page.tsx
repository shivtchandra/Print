import { BuildGallery } from '@/components/sections/BuildGallery';
import { BuildSteps } from '@/components/sections/BuildSteps';
import { CategoryPageShell } from '@/components/sections/CategoryPageShell';
import { InlineCTA } from '@/components/sections/InlineCTA';
import { categoryMeta } from '@/lib/data/catalog';
import { getStorefrontProducts } from '@/lib/data/storefront';
import { pageMetadata } from '@/lib/seo/metadata';

const meta = categoryMeta['assembled-desktops'];

export const metadata = pageMetadata({
  title: meta.seoTitle,
  description: meta.seoDescription,
  canonical: '/assembled-desktops'
});

export default async function AssembledDesktopPage() {
  const products = await getStorefrontProducts('assembled-desktops');

  return (
    <CategoryPageShell category="assembled-desktops" products={products}>
      <BuildSteps />
      <BuildGallery />
      <InlineCTA
        title="From office desktops to gaming towers"
        subtitle="We assemble based on your workflow and budget, then stress-test before delivery."
        buttonText="Start Your Custom Build"
      />
    </CategoryPageShell>
  );
}
