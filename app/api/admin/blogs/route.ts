import { NextRequest, NextResponse } from 'next/server';

import { blogPostSchema } from '@/lib/data/schemas';
import { createBlog, listBlogs } from '@/lib/firebase/data';
import { requireAdminAuth } from '@/lib/firebase/auth-server';

export async function GET(request: NextRequest) {
  const adminUser = await requireAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const blogs = await listBlogs();
    return NextResponse.json({ blogs });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const adminUser = await requireAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = blogPostSchema.parse(body);
    const now = new Date().toISOString();
    const created = await createBlog({ ...parsed, createdAt: now, updatedAt: now });
    return NextResponse.json({ blog: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to create blog',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
    );
  }
}
