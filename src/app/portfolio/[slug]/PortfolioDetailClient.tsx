'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { ArrowLeft, ExternalLink, Play, Target, Lightbulb, TrendingUp, MapPin, Tag, Award, BarChart, FileText, BookOpen, Images, X, Maximize2 } from 'lucide-react';
import { PortfolioProject, AgencyData } from '@/types';

export default function PortfolioDetailClient({ data, project }: { data: AgencyData, project: PortfolioProject }) {
  const caseStudyText = project.fullCaseStudy || project.content;
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Combine cover image and additional images for complete gallery
  const allImages = React.useMemo(() => {
    const list: string[] = [];
    if (project.imageUrl) list.push(project.imageUrl);
    if (project.images && Array.isArray(project.images)) {
      project.images.forEach(img => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list;
  }, [project]);

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-brand-orange/30 text-white flex flex-col relative overflow-hidden font-outfit">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-brand-cyan/5 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-brand-orange/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <Navbar settings={data.settings} />

      <main className="flex-1 relative z-10 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors mb-12 font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          {/* Hero Section */}
          <div className="space-y-8 mb-16">
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider">
                  {project.category}
                </span>
                {project.serviceCategory && (
                  <Link href={`/services/${project.serviceCategory}`} className="px-4 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider hover:bg-brand-blue/20 transition-colors">
                    Service: {data.services.find(s => s.id === project.serviceCategory || s.slug === project.serviceCategory)?.title || project.serviceCategory}
                  </Link>
                )}
                {project.clientName && (
                  <span className="px-4 py-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-xs font-bold uppercase tracking-wider">
                    Client: {project.clientName}
                  </span>
                )}
                {project.clientLocation && (
                  <span className="px-4 py-1.5 rounded-full border border-gray-500/30 bg-gray-500/10 text-gray-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> {project.clientLocation}
                  </span>
                )}
              </div>
              
              {project.tags && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.split(',').map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-lg text-gray-400 flex items-center gap-1.5">
                      <Tag className="w-3 h-3" />
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight"
            >
              {project.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 text-xl leading-relaxed max-w-3xl"
            >
              {project.description}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full aspect-video rounded-3xl overflow-hidden glass-card border border-white/10 relative mb-12 shadow-2xl group bg-black/50"
          >
            {project.videoUrl ? (
              <iframe 
                src={project.videoUrl} 
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <Image
                src={project.imageUrl || '/assets/um digital logo sa-01.png'}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                onClick={() => setActiveImage(project.imageUrl || '/assets/um digital logo sa-01.png')}
                unoptimized
              />
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 right-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-bold hover:bg-brand-orange hover:border-brand-orange transition-colors text-xs sm:text-sm"
              >
                Visit Live Site
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </motion.div>

          {/* Additional Images Gallery */}
          {allImages.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.23 }}
              className="mb-20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Images className="w-6 h-6 text-brand-orange" />
                <h3 className="text-2xl font-bold text-white">Project Showcase Gallery</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className="relative aspect-video rounded-2xl overflow-hidden glass-card border border-white/10 group cursor-pointer hover:border-brand-orange/50 transition-all bg-black/40"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} image ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Lightbox Modal */}
          <AnimatePresence>
            {activeImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                onClick={() => setActiveImage(null)}
              >
                <button
                  onClick={() => setActiveImage(null)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
                  <Image
                    src={activeImage}
                    alt={project.title}
                    fill
                    className="object-contain rounded-2xl"
                    unoptimized
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Full Case Study Content */}
          {caseStudyText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass-card p-8 md:p-12 rounded-3xl border border-brand-orange/30 mb-20 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10 relative z-10 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">Full Case Study</h3>
                    <p className="text-xs text-gray-400">Comprehensive breakdown of strategy, execution, and outcomes</p>
                  </div>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider">
                  Deep Dive Analysis
                </span>
              </div>
              <div className="prose prose-invert max-w-none prose-lg text-gray-300 leading-relaxed whitespace-pre-wrap relative z-10">
                {caseStudyText}
              </div>
            </motion.div>
          )}

          {/* Case Study Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {project.challenge && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8 rounded-3xl border border-brand-red/20"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-brand-red" />
                </div>
                <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
                <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
              </motion.div>
            )}

            {project.solution && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-8 rounded-3xl border border-brand-cyan/20"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-6">
                  <Lightbulb className="w-6 h-6 text-brand-cyan" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
                <p className="text-gray-300 leading-relaxed">{project.solution}</p>
              </motion.div>
            )}
          </div>

          {/* Growth & Results Section */}
          {(project.growthBadge || project.beforeStats || project.afterStats) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="glass-card p-8 md:p-12 rounded-3xl border border-brand-orange/30 mb-20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[80px]" />
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <Award className="w-6 h-6 text-brand-orange" />
                <h3 className="text-2xl font-bold">Growth & Impact</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {project.growthBadge && (
                  <div className="bg-gradient-to-br from-brand-orange/20 to-brand-red/20 border border-brand-orange/30 rounded-2xl p-6 flex flex-col justify-center text-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-2">Overall Growth</span>
                    <span className="text-4xl font-black text-white">{project.growthBadge}</span>
                  </div>
                )}
                
                {(project.beforeStats || project.afterStats) && (
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.beforeStats && (
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center">
                        <span className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Before</span>
                        <span className="text-lg font-medium text-gray-200">{project.beforeStats}</span>
                      </div>
                    )}
                    {project.afterStats && (
                      <div className="bg-brand-cyan/10 border border-brand-cyan/20 rounded-2xl p-6 flex flex-col justify-center">
                        <span className="text-sm font-bold uppercase tracking-wider text-brand-cyan mb-2">After</span>
                        <span className="text-lg font-medium text-white">{project.afterStats}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Stats Section */}
          {project.stats && project.stats.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-20"
            >
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-6 h-6 text-brand-orange" />
                <h3 className="text-2xl font-bold">Measurable Impact</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {project.stats.map((stat, i) => (
                  <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 text-center hover:border-brand-orange/30 transition-colors">
                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-red mb-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <div className="text-center glass-card rounded-3xl p-12 border border-brand-orange/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-brand-blue/10" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4">Want similar results?</h3>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Partner with UM Digital Agency to build high-performance solutions that drive real business growth.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-orange to-brand-red text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,145,0,0.4)]"
              >
                Let&apos;s Work Together
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
