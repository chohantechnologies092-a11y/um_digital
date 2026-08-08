'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { AgencyData } from '@/types';
import { 
  Images, 
  ExternalLink, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Briefcase, 
  Layers, 
  Filter,
  Sparkles
} from 'lucide-react';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
  type: 'Project' | 'Service';
  link: string;
  description?: string;
}

export default function GalleryClient({ data }: { data: AgencyData }) {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Extract all media items from projects and services
  const galleryItems = useMemo(() => {
    const items: GalleryItem[] = [];

    // Add portfolio images
    (data.portfolio || []).forEach((proj) => {
      if (proj.imageUrl) {
        items.push({
          id: `proj-main-${proj.id}`,
          url: proj.imageUrl,
          title: proj.title,
          category: proj.category || 'Project',
          type: 'Project',
          link: `/portfolio/${proj.slug}`,
          description: proj.description,
        });
      }
      if (proj.images && Array.isArray(proj.images)) {
        proj.images.forEach((imgUrl, idx) => {
          if (imgUrl && imgUrl !== proj.imageUrl) {
            items.push({
              id: `proj-extra-${proj.id}-${idx}`,
              url: imgUrl,
              title: `${proj.title} (Showcase #${idx + 1})`,
              category: proj.category || 'Project',
              type: 'Project',
              link: `/portfolio/${proj.slug}`,
              description: proj.description,
            });
          }
        });
      }
    });

    // Add service images
    (data.services || []).forEach((service) => {
      if (service.images && Array.isArray(service.images)) {
        service.images.forEach((imgUrl, idx) => {
          if (imgUrl) {
            items.push({
              id: `service-img-${service.id}-${idx}`,
              url: imgUrl,
              title: `${service.title} Showcase`,
              category: service.title,
              type: 'Service',
              link: `/services/${service.slug}`,
              description: service.shortDesc,
            });
          }
        });
      }
    });

    return items;
  }, [data]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    galleryItems.forEach(item => set.add(item.category));
    return Array.from(set);
  }, [galleryItems]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
      const matchType = filterType === 'ALL' || item.type.toUpperCase() === filterType.toUpperCase();
      const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      return matchType && matchCat;
    });
  }, [galleryItems, filterType, selectedCategory]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-brand-orange/30 text-white flex flex-col relative overflow-hidden font-outfit">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-brand-orange/10 blur-[160px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <Navbar settings={data.settings} />

      <main className="flex-1 relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-orange/10"
            >
              <Images className="w-4 h-4" />
              Visual Showcase
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
            >
              Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-red to-brand-blue">Gallery</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 text-base sm:text-lg leading-relaxed"
            >
              Explore our curated portfolio of designs, brand assets, UI/UX mockups, and client showcases.
            </motion.p>
          </div>

          {/* Filters Bar */}
          <div className="mb-12 space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: 'ALL MEDIA', value: 'ALL', icon: Layers },
                { label: 'PROJECTS', value: 'PROJECT', icon: Briefcase },
                { label: 'SERVICES', value: 'SERVICE', icon: Sparkles },
              ].map(btn => {
                const Icon = btn.icon;
                const active = filterType === btn.value;
                return (
                  <button
                    key={btn.value}
                    onClick={() => {
                      setFilterType(btn.value);
                      setSelectedCategory('ALL');
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-lg shadow-brand-orange/30 scale-105'
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {btn.label}
                  </button>
                );
              })}
            </div>

            {/* Sub-Category Filter Pills */}
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setSelectedCategory('ALL')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                    selectedCategory === 'ALL'
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      : 'text-gray-400 hover:text-white bg-white/5 border border-white/5'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                        : 'text-gray-400 hover:text-white bg-white/5 border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Gallery Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 glass-card rounded-3xl border border-white/10 p-8 max-w-md mx-auto">
              <Images className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Gallery Images Found</h3>
              <p className="text-sm text-gray-400">Try changing your filters or add images via the Admin Dashboard.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden glass-card border border-white/10 cursor-pointer shadow-lg hover:border-brand-orange/50 transition-all duration-500 bg-black/40"
                >
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-5 flex flex-col justify-end">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange w-fit mb-2">
                      {item.type}: {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between z-10 max-w-7xl mx-auto w-full">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                  {activeItem.type} • {activeItem.category}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">{activeItem.title}</h3>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image & Navigation */}
            <div className="relative flex-1 flex items-center justify-center my-4">
              {filteredItems.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-brand-orange text-white border border-white/20 transition-all hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              <div className="relative max-w-5xl max-h-[70vh] w-full h-full flex items-center justify-center">
                <Image
                  src={activeItem.url}
                  alt={activeItem.title}
                  fill
                  className="object-contain rounded-xl"
                  unoptimized
                />
              </div>

              {filteredItems.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-brand-orange text-white border border-white/20 transition-all hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Modal Footer Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full z-10 pt-4 border-t border-white/10">
              <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left max-w-xl">
                {activeItem.description || 'View detail breakdown and related services for this work.'}
              </p>

              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500 font-bold">
                  {lightboxIndex + 1} of {filteredItems.length}
                </span>

                <Link
                  href={activeItem.link}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-red text-white font-bold text-xs hover:scale-105 transition-transform shadow-lg shadow-brand-orange/20"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
