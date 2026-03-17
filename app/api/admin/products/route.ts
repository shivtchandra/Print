import { NextRequest, NextResponse } from 'next/server';

import { productSchema } from '@/lib/data/schemas';
import { createProduct, listProducts } from '@/lib/firebase/data';
import { requireAdminAuth } from '@/lib/firebase/auth-server';

export async function GET() {
  try {
    const products = await listProducts();
    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const adminUser = await requireAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = productSchema.parse(body);
    const created = await createProduct(parsed);
    return NextResponse.json({ product: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to create product',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
    );
  }
}
