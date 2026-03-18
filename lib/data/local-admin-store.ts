import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

import { businessInfo } from '@/lib/config';
import { defaultProducts, defaultTestimonials, heroSlides } from '@/lib/data/catalog';
import { Lead, Product, SiteConfig, Testimonial } from '@/lib/types/entities';

type LocalAdminStore = {
  leads: Lead[];
  products: Product[];
  testimonials: Testimonial[];
  siteConfig: SiteConfig;
};

const storePath = path.join(process.cwd(), 'data', 'admin-store.json');

const initialStore: LocalAdminStore = {
  leads: [],
  products: defaultProducts.map((product, index) => ({
    ...product,
    id: product.id || `product-seed-${index + 1}`
  })),
  testimonials: defaultTestimonials.map((testimonial, index) => ({
    ...testimonial,
    id: testimonial.id || `testimonial-seed-${index + 1}`
  })),
  siteConfig: {
    id: 'default',
    businessInfo,
    heroSlides
  }
};

async function ensureStoreFile() {
  await mkdir(path.dirname(storePath), { recursive: true });

  try {
    await readFile(storePath, 'utf-8');
  } catch {
    await writeFile(storePath, JSON.stringify(initialStore, null, 2), 'utf-8');
  }
}

export async function readLocalAdminStore(): Promise<LocalAdminStore> {
  await ensureStoreFile();

  try {
    const raw = await readFile(storePath, 'utf-8');
    const parsed = JSON.parse(raw) as LocalAdminStore;
    return {
      leads: parsed.leads || [],
      products: parsed.products || [],
      testimonials: parsed.testimonials || [],
      siteConfig: parsed.siteConfig || initialStore.siteConfig
    };
  } catch {
    await writeLocalAdminStore(initialStore);
    return initialStore;
  }
}

export async function writeLocalAdminStore(store: LocalAdminStore) {
  await ensureStoreFile();
  await writeFile(storePath, JSON.stringify(store, null, 2), 'utf-8');
}

export function localId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
