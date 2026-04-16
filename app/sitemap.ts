import { MetadataRoute } from 'next';

import { getStorefrontBlogs, getStorefrontProducts } from '@/lib/data/storefront';
import { getSiteUrl } from '@/lib/site';

const staticRoutes = [
  '',
  '/laptops',
  '/gaming-desktops',
  '/printers',
  '/cctv',
  '/assembled-desktops',
  '/accessories',
  '/about',
  '/contact',
  '/blogs'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8
  }));

  try {
    const products = await getStorefrontProducts();
    for (const p of products) {
      if (!p.id) continue;
      entries.push({
        url: `${baseUrl}/product/${p.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7
      });
    }
  } catch {
    // omit product URLs if data layer unavailable at build time
  }

  try {
    const blogs = await getStorefrontBlogs();
    for (const b of blogs) {
      if (!b.id) continue;
      entries.push({
        url: `${baseUrl}/blogs/${b.id}`,
        lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(b.createdAt),
        changeFrequency: 'weekly',
        priority: 0.6
      });
    }
  } catch {
    // omit blog URLs if data layer unavailable at build time
  }

  return entries;
}
