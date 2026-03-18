import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { leadSchema } from '@/lib/data/schemas';
import { addLead } from '@/lib/firebase/data';
import { normalizePhone } from '@/lib/utils/format';
import { rateLimit } from '@/lib/utils/rate-limit';

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || 'anonymous';
  const limiter = rateLimit(`lead-${ip}`, 8, 60_000);

  if (!limiter.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(limiter.retryAfter)
        }
      }
    );
  }

  try {
    const body = await request.json();
    const parsed = leadSchema.parse(body);

    const saved = await addLead({
      ...parsed,
      phone: normalizePhone(parsed.phone),
      email: parsed.email || undefined
    });

    return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: error.errors[0]?.message || 'Invalid form data',
          details: error.errors 
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: 'Unable to process your request at this time.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
    );
  }
}
