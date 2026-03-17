import { NextRequest, NextResponse } from 'next/server';

import { testimonialSchema } from '@/lib/data/schemas';
import { createTestimonial, listTestimonials } from '@/lib/firebase/data';
import { requireAdminAuth } from '@/lib/firebase/auth-server';

export async function GET() {
  try {
    const testimonials = await listTestimonials();
    return NextResponse.json({ testimonials });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const adminUser = await requireAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = testimonialSchema.parse(body);
    const created = await createTestimonial({ ...parsed, createdAt: new Date().toISOString() });
    return NextResponse.json({ testimonial: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to create testimonial',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
    );
  }
}
