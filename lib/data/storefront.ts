import { unstable_noStore as noStore } from 'next/cache';

import { categoryMeta, defaultProducts, defaultTestimonials } from '@/lib/data/catalog';
import { listProducts, listTestimonials } from '@/lib/firebase/data';
import { ProductCategory } from '@/lib/types/entities';

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
