import React from 'react';
import { getAgencyDataAsync } from '@/lib/db';
import PortfolioDetailClient from './PortfolioDetailClient';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getAgencyDataAsync();
  const project = data.portfolio.find(p => p.slug === slug);
  
  if (!project) {
    notFound();
  }

  return <PortfolioDetailClient data={data} project={project} />;
}
