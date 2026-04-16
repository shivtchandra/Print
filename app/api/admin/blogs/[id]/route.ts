import { NextRequest, NextResponse } from 'next/server';

import { blogPostSchema } from '@/lib/data/schemas';
import { deleteBlog, updateBlog } from '@/lib/firebase/data';
import { requireAdminAuth } from '@/lib/firebase/auth-server';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const adminUser = await requireAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = blogPostSchema.partial().parse(body);
    await updateBlog(id, { ...parsed, updatedAt: new Date().toISOString() });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to update blog',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const adminUser = await requireAdminAuth(request);
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await deleteBlog(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
