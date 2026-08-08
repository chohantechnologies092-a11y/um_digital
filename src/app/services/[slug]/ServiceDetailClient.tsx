'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { Check, ArrowLeft, Zap, ArrowRight, Briefcase, Images, X, Maximize2, HelpCircle, Layers, Award, Sparkles, ChevronDown } from 'lucide-react';
import { ServiceItem, AgencyData } from '@/types';

export default function ServiceDetailClient({ data, service }: { data: AgencyData, service: ServiceItem }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            {/* Service Images Showcase Gallery */}
            {service.images && service.images.length > 0 && (
              <div className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <Images className="w-6 h-6 text-brand-orange" />
                  <h2 className="text-2xl font-bold text-white">Service Showcase & Visuals</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className="relative aspect-video rounded-2xl overflow-hidden glass-card border border-white/10 group cursor-pointer hover:border-brand-orange/50 transition-all bg-black/40"
                    >
                      <Image
                        src={img}
                        alt={`${service.title} showcase ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                      alt={service.title}
                      fill
                      className="object-contain rounded-2xl"
                      unoptimized
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
                {service.detailedContent && (
                  <div className="mt-6 pt-6 border-t border-white/10 text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {service.detailedContent}
                  </div>
                )}
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

            {/* Process Steps */}
            {service.processSteps && service.processSteps.length > 0 && (
              <div className="glass-card rounded-3xl p-8 md:p-12 border border-brand-orange/20 relative overflow-hidden">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Layers className="w-6 h-6 text-brand-orange" />
                  Our Process
                </h2>
                <div className="space-y-6">
                  {service.processSteps.map((step, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-red flex items-center justify-center font-black text-white shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Award className="w-6 h-6 text-amber-400" />
                  Why Choose This Service
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="glass-card p-6 rounded-2xl border border-amber-400/20 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                      <span className="text-gray-200 text-sm font-semibold">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Accordion */}
            {service.faq && service.faq.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-brand-cyan" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {service.faq.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="glass-card rounded-2xl border border-white/10 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-brand-orange transition-colors"
                      >
                        <span>{item.question}</span>
                        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-brand-orange' : 'text-gray-400'}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="px-6 pb-6 text-gray-300 text-sm leading-relaxed border-t border-white/5 pt-4">
                          {item.answer}
                        </div>
                      )}
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
