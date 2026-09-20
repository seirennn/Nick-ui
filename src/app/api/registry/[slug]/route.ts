import { NextResponse } from 'next/server';
import componentsData from '@/registry/components.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const comp = (componentsData as any[]).find((c) => c.slug === slug || c.name === slug);

  if (!comp) {
    return NextResponse.json({ error: `Component "${slug}" not found in NickUI registry` }, { status: 404 });
  }

  return NextResponse.json(comp);
}
