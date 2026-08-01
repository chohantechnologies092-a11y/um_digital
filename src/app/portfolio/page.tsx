import React from 'react';
import { getAgencyData } from '@/lib/db';
import PortfolioClient from './PortfolioClient';

export const revalidate = 0;

export default function PortfolioPage() {
  const data = getAgencyData();
  return <PortfolioClient data={data} />;
}
