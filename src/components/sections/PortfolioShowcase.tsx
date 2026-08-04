'use client';

import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { PortfolioProject } from '@/types';
import { ExternalLink, Play, Sparkles, X, ArrowRight } from 'lucide-react';

interface PortfolioShowcaseProps {
  portfolio: PortfolioProject[];
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ portfolio }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Show top 4 featured cards on home page showcase
  const displayedProjects = useMemo(() => {
    return (portfolio || []).slice(0, 4);
  }, [portfolio]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="portfolio" className="py-24 relative z-10 bg-[#030712] border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-dual border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Our Portfolio & <span className="text-logo-gradient">Recent Solutions</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            Explore recent digital projects engineered and delivered by UM Digital Agency across full-stack engineering, 3D motion, and performance marketing.
          </p>
        </div>

        {/* Portfolio Projects Grid (Limited to 4 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedProjects.map((project) => {
            const hasFailed = failedImages[project.id];
            const fallbackSrc = '/assets/um digital logo sa-01.png';

            return (
              <div
                key={project.id}
                className="glass-card-dual rounded-[2.5rem] overflow-hidden border border-cyan-500/20 group flex flex-col justify-between shadow-2xl transition-all duration-300"
              >
                {/* Image / Video Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 flex items-center justify-center p-4">
                  <Image
                    src={hasFailed ? fallbackSrc : (project.imageUrl || fallbackSrc)}
                    alt={project.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    onError={() => handleImageError(project.id)}
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-xs">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="px-6 py-2 rounded-full bg-amber-500 text-slate-950 font-bold shadow-xl shadow-amber-500/50 hover:scale-105 transition-transform"
                    >
                      View Details
                    </Link>
                    {project.videoUrl && (
                      <button
                        onClick={() => setSelectedVideo(project.videoUrl || null)}
                        className="w-12 h-12 rounded-full bg-slate-900/90 text-white border border-amber-500/60 flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                        title="Watch Reel / Video"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-slate-900/90 text-white border border-cyan-500/60 flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                        title="View Live Solution"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  <span className="absolute top-4 left-4 px-3.5 py-1 text-[10px] font-bold text-cyan-300 bg-slate-950/90 border border-slate-800 rounded-full backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {/* Card Details */}
                <div className="p-7 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.clientName && (
                      <span className="text-xs font-semibold text-amber-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 whitespace-nowrap">
                        {project.clientName}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Action CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-xs sm:text-sm font-black text-white btn-logo-gradient shadow-xl shadow-amber-600/30 hover:scale-105 transition-transform uppercase tracking-wider"
          >
            <span>View More Portfolio Projects ({portfolio.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Video Modal Popup */}
      {selectedVideo && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-[2.5rem] overflow-hidden border border-amber-500/50 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-950/90 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative aspect-video w-full">
              <iframe
                src={selectedVideo}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

