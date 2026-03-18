import { NextRequest, NextResponse } from 'next/server';

import { siteConfigSchema } from '@/lib/data/schemas';
import { requireAdminAuth } from '@/lib/firebase/auth-server';
import { getSiteConfig, updateSiteConfig } from '@/lib/firebase/data';

export async function GET() {
  try {
    const config = await getSiteConfig();
    return NextResponse.json({ config });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch site config' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const adminUser = await requireAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = siteConfigSchema.parse(body);
    await updateSiteConfig(parsed);
    return NextResponse.json({ message: 'Config updated successfully' });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to update config',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
    );
  }
}
