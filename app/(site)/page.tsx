import { DealsWithHighlights } from '@/components/sections/DealsWithHighlights';
import { FeaturedDeals } from '@/components/sections/FeaturedDeals';
import { FeaturedProductCards } from '@/components/sections/FeaturedProductCards';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { QuickContactWidget } from '@/components/sections/QuickContactWidget';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { VisitCTA } from '@/components/sections/VisitCTA';
import { pageMetadata } from '@/lib/seo/metadata';
import { getStorefrontProducts, getStorefrontTestimonials } from '@/lib/data/storefront';

export const metadata = pageMetadata({
  title: 'No 1 Tech Store in Vengavasal',
  description: 'Foto Palace offers laptops, gaming desktops, printers, CCTV, and IT accessories in Vengavasal.',
  canonical: '/'
});

export default async function HomePage() {
  const [products, testimonials] = await Promise.all([
    getStorefrontProducts(),
    getStorefrontTestimonials()
  ]);

  return (
    <>
      <HeroCarousel />
      <FeaturedDeals />
      <FeaturedProductCards products={products} />
      <DealsWithHighlights />
      <QuickContactWidget />
      <TestimonialsSection testimonials={testimonials} />
      <VisitCTA />
    </>
  );
}
