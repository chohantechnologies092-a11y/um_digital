import { MetadataRoute } from 'next';
import { initialAgencyData } from '@/lib/db';
import { ALL_PROJECTS } from '@/lib/projects-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://umdigitalagency.com';

  // Static site routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic service routes
  const serviceRoutes = initialAgencyData.services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic portfolio project routes
  const projectRoutes = ALL_PROJECTS.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
