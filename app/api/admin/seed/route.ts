import { NextRequest, NextResponse } from 'next/server';

import { requireAdminAuth } from '@/lib/firebase/auth-server';

/**
 * Legacy endpoint: catalogue and reviews are no longer seeded from mock data.
 * Add products and testimonials from the admin dashboard or Firestore.
 */
export async function POST(request: NextRequest) {
  const adminUser = await requireAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(
    {
      message:
        'Seeding is disabled. Add real products, hero slides, and testimonials in Admin — no mock catalogue is shipped with this project.'
    },
    { status: 410 }
  );
}
