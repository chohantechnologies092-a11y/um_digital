import React from 'react';
import { getAgencyDataAsync } from '@/lib/db';
import ServiceDetailClient from './ServiceDetailClient';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getAgencyDataAsync();
  const service = data.services.find(s => s.slug === slug);
  
  if (!service) {
    notFound();
  }

  return <ServiceDetailClient data={data} service={service} />;
}
