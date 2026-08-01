'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { Check } from 'lucide-react';
import { ServiceItem } from '@/types';

export default function ServicesClient({ data }: { data: any }) {
  const services: ServiceItem[] = data.services.filter((s: ServiceItem) => s.active).sort((a: ServiceItem, b: ServiceItem) => a.order - b.order);

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-brand-orange/30 text-white flex flex-col relative overflow-hidden font-outfit">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-brand-blue/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-brand-orange/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <Navbar settings={data.settings} />

      <main className="flex-1 relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header Section */}
          <div className="text-center mb-20 space-y-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/5 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-sm font-semibold text-brand-orange uppercase tracking-wider">Premium Digital Services</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-red to-brand-blue"
            >
              Scale Your Brand Globally
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed"
            >
              Comprehensive digital solutions engineered for growth. From custom software to strategic marketing, we deliver measurable ROI across all touchpoints.
            </motion.p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass-card rounded-3xl p-8 relative overflow-hidden border border-white/10 hover:border-brand-orange/50 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                  <DynamicIcon name={service.icon} size={120} />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-red flex items-center justify-center mb-6 shadow-lg shadow-brand-orange/20">
                    <DynamicIcon name={service.icon} size={28} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-8 flex-1">
                    {service.fullDesc}
                  </p>
                  
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex-1 mb-6">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 opacity-80">Core Capabilities</h4>
                    <ul className="space-y-3">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                          <Check className="w-5 h-5 text-brand-orange shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    href={`/services/${service.slug}`}
                    className="mt-auto px-6 py-3 rounded-xl border border-white/10 hover:border-brand-orange/50 hover:bg-brand-orange/10 text-center font-bold transition-colors w-full"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
