import { businessInfo } from '@/lib/config';
import { categoryMeta } from '@/lib/data/catalog';
import { getBlog, getProduct, getSiteConfig, listBlogs, listProducts, listTestimonials } from '@/lib/firebase/data';
import { AboutPageContent, BlogPost, LaptopCustomizationConfig, ProductCategory } from '@/lib/types/entities';

export const revalidate = 3600;

export async function getStorefrontProduct(id: string) {
  try {
    return await getProduct(id);
  } catch {
    return null;
  }
}

export async function getStorefrontProducts(category?: ProductCategory) {
  try {
    const products = await listProducts();
    const filtered = products.filter((product) => product.status === 'active');

    if (!category) return filtered;
    return filtered.filter((product) => product.category === category);
  } catch {
    return [];
  }
}

export async function getStorefrontTestimonials() {
  try {
    const testimonials = await listTestimonials();
    return testimonials.filter((item) => item.isPublished);
  } catch {
    return [];
  }
}

export async function getStorefrontBlogs() {
  try {
    const blogs = await listBlogs();
    return blogs.filter((item) => item.isPublished);
  } catch {
    return [];
  }
}

export async function getStorefrontBlog(id: string): Promise<BlogPost | null> {
  try {
    const blog = await getBlog(id);
    if (!blog || !blog.isPublished) return null;
    return blog;
  } catch {
    return null;
  }
}

export function getAllCategoryRoutes() {
  return Object.values(categoryMeta).map((item) => item.slug);
}

export async function getStorefrontConfig() {
  try {
    const config = await getSiteConfig();
    return {
      businessInfo: config?.businessInfo || businessInfo,
      heroSlides:
        config?.heroSlides && config.heroSlides.length > 0 ? config.heroSlides.filter((s) => s.image?.trim()) : [],
      aboutPage: config?.aboutPage || defaultAboutPage,
      laptopCustomization: config?.laptopCustomization || defaultLaptopCustomization,
      mobileHeroProductIds: config?.mobileHeroProductIds ?? [],
      categorySettings: config?.categorySettings || {}
    };
  } catch {
    return {
      businessInfo,
      heroSlides: [],
      aboutPage: defaultAboutPage,
      laptopCustomization: defaultLaptopCustomization,
      mobileHeroProductIds: []
    };
  }
}

/** Minimal placeholder until Admin → Settings is filled with your real copy. */
const defaultAboutPage: AboutPageContent = {
  heroTitle: 'About Foto Palace',
  introParagraphs: [
    'Add your store story, team, and photos in the admin dashboard under Site configuration → About page.'
  ],
  whyTitle: 'Why Customers Choose Us',
  whyBullets: [
    'PC and laptop customization built around your requirements',
    'Local after-sales and setup support',
    'We find the right parts so you get the best price',
    'Bulk pricing for offices and institutions'
  ]
};

const defaultLaptopCustomization: LaptopCustomizationConfig = {
  categories: []
};
