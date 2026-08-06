import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { saveLeadAsync } from '@/lib/db';
import { ContactLead } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceRequested, budgetRange, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required fields' }, { status: 400 });
    }

    const newLead: ContactLead = {
      id: 'lead-' + Date.now(),
      name,
      email,
      phone: phone || '',
      serviceRequested: serviceRequested || 'General Inquiry',
      budgetRange: budgetRange || '',
      message,
      createdAt: new Date().toISOString(),
      status: 'New',
    };

    await saveLeadAsync(newLead);
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, lead: newLead, message: 'Thank you! Your inquiry has been received.' });
  } catch (error) {
    return NextResponse.json({ error: 'Server error processing contact lead' }, { status: 500 });
  }
}
