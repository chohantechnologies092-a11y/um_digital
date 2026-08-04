'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { Check, ArrowLeft, Zap, ArrowRight, Briefcase } from 'lucide-react';
import { ServiceItem, AgencyData } from '@/types';

export default function ServiceDetailClient({ data, service }: { data: AgencyData, service: ServiceItem }) {
  const relatedProjects = data.portfolio.filter(
    (project) => project.serviceCategory === service.id || project.serviceCategory === service.slug
  );

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-brand-orange/30 text-white flex flex-col relative overflow-hidden font-outfit">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-orange/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <Navbar settings={data.settings} />

      <main className="flex-1 relative z-10 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          
          <Link href="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-orange transition-colors mb-12 font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>

          {/* Header Section */}
          <div className="mb-16 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-orange to-brand-red flex items-center justify-center shadow-lg shadow-brand-orange/20"
            >
              <DynamicIcon name={service.icon} size={40} className="text-white" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-red to-brand-blue"
            >
              {service.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-xl leading-relaxed"
            >
              {service.shortDesc}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-16"
          >
            {/* Overview */}
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[80px]" />
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-brand-orange" />
                Service Overview
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {service.fullDesc}
                </p>
              </div>
            </div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Check className="w-6 h-6 text-brand-blue" />
                  Key Capabilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-brand-orange/30 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-brand-orange" />
                      </div>
                      <span className="text-gray-200 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Case Studies */}
            {relatedProjects.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-brand-orange" />
                  Related Case Studies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedProjects.map((project) => (
                    <Link 
                      key={project.id} 
                      href={`/portfolio/${project.slug}`}
                      className="group glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-brand-orange/40 transition-colors block"
                    >
                      <div className="aspect-video relative w-full bg-black/50 overflow-hidden">
                        <Image
                          src={project.imageUrl || '/assets/um digital logo sa-01.png'}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-2">
                          {project.clientName || project.category}
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-brand-orange transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-20 text-center glass-card rounded-3xl p-12 border border-brand-orange/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-brand-blue/10" />
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4">Ready to scale with {service.title}?</h3>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                  Let&apos;s discuss how we can engineer a custom digital solution tailored to your specific business goals.
                </p>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-orange to-brand-red text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,145,0,0.4)]"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  );
}
