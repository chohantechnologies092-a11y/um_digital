import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAgencyDataAsync, saveAgencyDataAsync } from '@/lib/db';
import { AgencyData } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const data = await getAgencyDataAsync();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const updatedData = (await request.json()) as AgencyData;
    const success = await saveAgencyDataAsync(updatedData);
    if (success) {
      revalidatePath('/', 'layout');
      return NextResponse.json({ message: 'Database updated successfully', data: updatedData });
    }
    return NextResponse.json({ error: 'Failed to write data to database' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid payload or server error' }, { status: 400 });
  }
}
