'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioProject } from '@/types';
import { ArrowRight, Globe, Code2, Palette, Search } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { ClientMarquee } from '@/components/sections/ClientMarquee';

export default function PortfolioClient({ data }: { data: any }) {
  const allProjects: PortfolioProject[] = data.portfolio;
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(allProjects.map(p => p.category)))];

  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-brand-orange/30 text-white flex flex-col relative overflow-hidden font-outfit">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-orange/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <Navbar settings={data.settings} />

      <main className="flex-1 relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header Section */}
          <div className="text-center mb-16 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/5 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-sm font-semibold text-brand-orange uppercase tracking-wider">Our Showcase</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-red to-brand-blue"
            >
              Engineering Digital Excellence
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto mb-16"
            >
              Explore our portfolio of high-performance web applications, luxury brand identities, and data-driven marketing campaigns.
            </motion.p>
          </div>

          <div className="mb-20 -mx-6 sm:-mx-8">
            <ClientMarquee clients={data.clients} />
          </div>

          {/* Filter Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  filter === category 
                    ? 'bg-gradient-to-r from-brand-orange to-brand-red border-transparent text-white shadow-[0_0_20px_rgba(255,145,0,0.3)]' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative flex flex-col glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-brand-orange/50 transition-colors"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                    <Link href={`/portfolio/${project.slug}`}>
                      <Image
                        src={project.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'}
                        alt={project.title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                        unoptimized
                      />
                    </Link>
                    
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-brand-orange">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-1 relative bg-gradient-to-b from-transparent to-black/80">
                    <Link href={`/portfolio/${project.slug}`}>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-orange transition-colors line-clamp-2 cursor-pointer">
                        {project.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <span className="text-xs font-bold text-white">{project.clientName?.charAt(0) || 'C'}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-300">{project.clientName || 'Confidential Client'}</span>
                      </div>

                      {project.liveUrl ? (
                        <Link 
                          href={project.liveUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-colors"
                        >
                          <ArrowRight className="w-5 h-5 -rotate-45" />
                        </Link>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              <p>No projects found for this category.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
