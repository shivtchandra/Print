import { unstable_noStore as noStore } from 'next/cache';

import { businessInfo } from '@/lib/config';
import { categoryMeta, defaultProducts, defaultTestimonials, heroSlides } from '@/lib/data/catalog';
import { getProduct, getSiteConfig, listProducts, listTestimonials } from '@/lib/firebase/data';
import { ProductCategory } from '@/lib/types/entities';

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
      heroSlides:
        config?.heroSlides && config.heroSlides.length > 0 ? config.heroSlides : heroSlides
    };
  } catch {
    return { businessInfo, heroSlides };
  }
}
