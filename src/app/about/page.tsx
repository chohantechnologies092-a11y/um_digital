import React from 'react';
import { getAgencyData } from '@/lib/db';
import AboutClient from './AboutClient';

export const revalidate = 0;

export default function AboutPage() {
  const data = getAgencyData();
  return <AboutClient data={data} />;
}
