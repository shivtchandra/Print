import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

import { businessInfo } from '@/lib/config';
import { heroSlides } from '@/lib/data/catalog';
import { BlogPost, Lead, Product, SiteConfig, Testimonial } from '@/lib/types/entities';

type LocalAdminStore = {
  leads: Lead[];
  products: Product[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
  siteConfig: SiteConfig;
};

const storePath = path.join(process.cwd(), 'data', 'admin-store.json');

const initialStore: LocalAdminStore = {
  leads: [],
  products: [],
  testimonials: [],
  blogs: [],
  siteConfig: {
    id: 'default',
    businessInfo,
    heroSlides: heroSlides.length ? heroSlides : [],
    aboutPage: {
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
      blogs: parsed.blogs || [],
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
