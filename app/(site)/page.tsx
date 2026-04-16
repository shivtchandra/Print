import { BrandMarquee } from '@/components/sections/BrandMarquee';
import { FeaturedDeals } from '@/components/sections/FeaturedDeals';
import { FeaturedProductCards } from '@/components/sections/FeaturedProductCards';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { QuickContactWidget } from '@/components/sections/QuickContactWidget';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { VisitCTA } from '@/components/sections/VisitCTA';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { ServicesDetailed } from '@/components/sections/ServicesDetailed';
import { FaqSection } from '@/components/sections/FaqSection';
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection';
import { HomeJsonLd } from '@/components/seo/HomeJsonLd';
import { getStorefrontBlogs, getStorefrontProducts, getStorefrontTestimonials } from '@/lib/data/storefront';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: "Foto Palace — Jorhat's tech store (laptops, gaming PCs, CCTV)",
  description:
    "Foto Palace — Jorhat's top tech store for laptops, gaming PCs, printers, CCTV, and IT accessories. Visit us at Gar-Ali or WhatsApp 9435051891.",
  canonical: '/'
});

export default async function HomePage() {
  const [products, testimonials, blogs] = await Promise.all([
    getStorefrontProducts(),
    getStorefrontTestimonials(),
    getStorefrontBlogs()
  ]);

  return (
    <div className="home-page">
      <HomeJsonLd />
      <HeroCarousel />
      <BrandMarquee />
      <div className="layout-mesh-divider"></div>
      <FeaturedDeals />
      <div className="layout-mesh-bg-alt">
        <FeaturedProductCards products={products} />
      </div>
      <ServicesDetailed />
      <ExpertiseSection />
      <div className="layout-mesh-bg-alt">
        <TestimonialsSection testimonials={testimonials} />
      </div>
      <BlogPreviewSection blogs={blogs} />
      <FaqSection />
      <QuickContactWidget />
      <VisitCTA />
    </div>
  );
}
