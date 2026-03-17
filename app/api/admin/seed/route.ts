import { NextRequest, NextResponse } from 'next/server';

import { defaultProducts, defaultTestimonials } from '@/lib/data/catalog';
import { createProduct, createTestimonial, listProducts, listTestimonials } from '@/lib/firebase/data';
import { requireAdminAuth } from '@/lib/firebase/auth-server';

export async function POST(request: NextRequest) {
  const adminUser = await requireAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if data already exists to avoid massive duplication
    const [existingProds, existingTests] = await Promise.all([
      listProducts(),
      listTestimonials()
    ]);

    const seedTasks: Promise<unknown>[] = [];

    // Only seed if empty, or at least add them if the count is low
    if (existingProds.length < 3) {
      defaultProducts.forEach((p) => seedTasks.push(createProduct(p)));
    }

    if (existingTests.length < 2) {
      defaultTestimonials.forEach((t) => seedTasks.push(createTestimonial(t)));
    }

    if (seedTasks.length === 0) {
      return NextResponse.json({ message: 'Database already has data. No seeding needed.' });
    }

    await Promise.all(seedTasks);

    return NextResponse.json({ message: 'Seeding successful', count: seedTasks.length });
  } catch (error) {
    return NextResponse.json(
      { error: 'Seeding failed', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
