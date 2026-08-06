import React from 'react';
import { getAgencyDataAsync } from '@/lib/db';
import AboutClient from './AboutClient';

export const revalidate = 0;

export default async function AboutPage() {
  const data = await getAgencyDataAsync();
  return <AboutClient data={data} />;
}
