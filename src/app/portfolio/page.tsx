import React from 'react';
import { getAgencyDataAsync } from '@/lib/db';
import PortfolioClient from './PortfolioClient';

export const revalidate = 0;

export default async function PortfolioPage() {
  const data = await getAgencyDataAsync();
  return <PortfolioClient data={data} />;
}
