import React from 'react';
import { getAgencyDataAsync } from '@/lib/db';
import ServicesClient from './ServicesClient';

export const revalidate = 0;

export default async function ServicesPage() {
  const data = await getAgencyDataAsync();
  return <ServicesClient data={data} />;
}
