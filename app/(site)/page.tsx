import { FeaturedDeals } from '@/components/sections/FeaturedDeals';
import { FeaturedProductCards } from '@/components/sections/FeaturedProductCards';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { QuickContactWidget } from '@/components/sections/QuickContactWidget';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { VisitCTA } from '@/components/sections/VisitCTA';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { ServicesDetailed } from '@/components/sections/ServicesDetailed';
import { FaqSection } from '@/components/sections/FaqSection';
import { pageMetadata } from '@/lib/seo/metadata';
import { getStorefrontProducts, getStorefrontTestimonials } from '@/lib/data/storefront';

export const metadata = pageMetadata({
  title: 'No 1 Tech Store in Jorhat',
  description: 'Foto Palace offers laptops, gaming desktops, printers, CCTV, and IT accessories in Jorhat.',
  canonical: '/'
});

export default async function HomePage() {
  const [products, testimonials] = await Promise.all([
    getStorefrontProducts(),
    getStorefrontTestimonials()
  ]);

  return (
    <div className="home-page">
      <HeroCarousel />
      <FeaturedDeals />
      <FeaturedProductCards products={products} />
      <ServicesDetailed />
      <ExpertiseSection />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection />
      <QuickContactWidget />
      <VisitCTA />
    </div>
  );
}
