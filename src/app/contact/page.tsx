import React from 'react';
import { getAgencyDataAsync } from '@/lib/db';
import ContactClient from './ContactClient';

export const revalidate = 0;

export default async function ContactPage() {
  const data = await getAgencyDataAsync();
  return <ContactClient data={data} />;
}
