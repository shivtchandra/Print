import { NextResponse } from 'next/server';

import { getStorefrontConfig } from '@/lib/data/storefront';

export async function GET() {
  try {
    const config = await getStorefrontConfig();
    return NextResponse.json({
      businessInfo: config.businessInfo,
      heroSlides: config.heroSlides,
      aboutPage: config.aboutPage,
      mobileHeroProductIds: config.mobileHeroProductIds ?? [],
      categorySettings: config.categorySettings ?? {}
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch public site config' }, { status: 500 });
  }
}

