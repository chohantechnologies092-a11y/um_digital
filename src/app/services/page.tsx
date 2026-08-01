import React from 'react';
import { getAgencyData } from '@/lib/db';
import ServicesClient from './ServicesClient';

export const revalidate = 0;

export default function ServicesPage() {
  const data = getAgencyData();
  return <ServicesClient data={data} />;
}
