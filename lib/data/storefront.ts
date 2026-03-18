import { unstable_noStore as noStore } from 'next/cache';

import { businessInfo } from '@/lib/config';
import { categoryMeta, defaultProducts, defaultTestimonials, heroSlides } from '@/lib/data/catalog';
import { getProduct, getSiteConfig, listProducts, listTestimonials } from '@/lib/firebase/data';
import { AboutPageContent, LaptopCustomizationConfig, ProductCategory } from '@/lib/types/entities';

export async function getStorefrontProduct(id: string) {
  noStore();
  try {
    return await getProduct(id);
  } catch {
    return defaultProducts.find((p) => p.id === id) || null;
  }
}

export async function getStorefrontProducts(category?: ProductCategory) {
  noStore();
  try {
    const products = await listProducts();
    const filtered = products.filter((product) => product.status === 'active');

    if (!category) return filtered;
    return filtered.filter((product) => product.category === category);
  } catch {
    if (!category) return defaultProducts;
    return defaultProducts.filter((product) => product.category === category);
  }
}

export async function getStorefrontTestimonials() {
  noStore();
  try {
    const testimonials = await listTestimonials();
    return testimonials.filter((item) => item.isPublished);
  } catch {
    return defaultTestimonials.filter((item) => item.isPublished);
  }
}

export function getAllCategoryRoutes() {
  return Object.values(categoryMeta).map((item) => item.slug);
}

export async function getStorefrontConfig() {
  noStore();
  try {
    const config = await getSiteConfig();
    return {
      businessInfo: config?.businessInfo || businessInfo,
      heroSlides: config?.heroSlides && config.heroSlides.length > 0 ? config.heroSlides : heroSlides,
      aboutPage: config?.aboutPage || defaultAboutPage,
      laptopCustomization: config?.laptopCustomization || defaultLaptopCustomization
    };
  } catch {
    return { businessInfo, heroSlides, aboutPage: defaultAboutPage, laptopCustomization: defaultLaptopCustomization };
  }
}

const defaultAboutPage: AboutPageContent = {
  heroTitle: 'About Foto Palace',
  introParagraphs: [
    'Foto Palace is your trusted local tech partner in Vengavasal. We are known for reliable product recommendations, honest pricing, and quick support.',
    'From laptops and gaming desktops to printers, CCTV systems, custom assembled desktops, and IT accessories, we help individuals and businesses choose the right technology with confidence.',
    'We do PC customization end-to-end, and we are the best at tailoring builds to your requirements. Choose the right options and you will always get the best price for your setup.'
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
