import React from 'react';
import { getAgencyDataAsync } from '@/lib/db';
import GalleryClient from './GalleryClient';

export const revalidate = 0;

export default async function GalleryPage() {
  const data = await getAgencyDataAsync();
  return <GalleryClient data={data} />;
}
