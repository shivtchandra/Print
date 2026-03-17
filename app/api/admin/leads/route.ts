import { NextRequest, NextResponse } from 'next/server';

import { listLeads } from '@/lib/firebase/data';
import { requireAdminAuth } from '@/lib/firebase/auth-server';

export async function GET(request: NextRequest) {
  const adminUser = await requireAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const leads = await listLeads();
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
