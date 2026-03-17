import { NextRequest } from 'next/server';

import { STATIC_ADMIN_EMAIL, STATIC_ADMIN_TOKEN } from '@/lib/admin/static-admin';
import { verifyAdminToken } from '@/lib/firebase/admin';

export async function requireAdminAuth(request: NextRequest) {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) return null;

  const token = header.split('Bearer ')[1];
  if (!token) return null;

  if (token === STATIC_ADMIN_TOKEN) {
    return {
      uid: 'static-admin',
      email: STATIC_ADMIN_EMAIL
    };
  }

  return verifyAdminToken(token);
}
