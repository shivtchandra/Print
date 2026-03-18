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
    heroSlides,
    aboutPage: {
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
    },
    laptopCustomization: { categories: [] }
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
