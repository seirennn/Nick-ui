import { NextResponse } from 'next/server';
import componentsData from '@/registry/components.json';

export async function GET() {
  return NextResponse.json(componentsData);
}
