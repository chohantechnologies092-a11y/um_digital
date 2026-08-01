import React from 'react';
import { getAgencyData } from '@/lib/db';
import ContactClient from './ContactClient';

export const revalidate = 0;

export default function ContactPage() {
  const data = getAgencyData();
  return <ContactClient data={data} />;
}
