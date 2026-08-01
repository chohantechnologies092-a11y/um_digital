'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { Check, ArrowRight, Sparkles, X, ChevronRight, CheckCircle2, Shield, Clock, Wrench } from 'lucide-react';

interface ServicesGridProps {
  services: ServiceItem[];
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [modalTab, setModalTab] = useState<'deliverables' | 'stack' | 'timeline'>('deliverables');

  const activeServices = services.filter((s) => s.active).sort((a, b) => a.order - b.order);

  return (
    <section id="services" className="py-24 relative z-10 bg-[#030712] border-t border-amber-500/20">
      {/* Background Radial Spotlights */}
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-dual border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>360° Digital Agency Solutions</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Our Full-Stack <span className="text-logo-gradient">Digital Services</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            We integrate strategy, high-converting design, custom software engineering, and visual media under one roof.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service) => (
            <div
              key={service.id}
              className="glass-card-dual rounded-[2.5rem] p-8 flex flex-col justify-between relative group border border-cyan-500/20 shadow-xl"
            >
              {/* Header Info */}
              <div className="space-y-6">
                {/* Icon Container */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:text-cyan-400 group-hover:border-cyan-400 transition-all shadow-lg">
                    <DynamicIcon name={service.icon} className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-cyan-300 uppercase bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    TIER 1 SERVICE
                  </span>
                </div>

                {/* Service Title & Description */}
                <div>
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Key Capabilities Checklist */}
                {service.features && service.features.length > 0 && (
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                      Core Deliverables:
                    </p>
                    <ul className="space-y-2 text-xs text-slate-300 font-medium">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Trigger */}
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedService(service);
                    setModalTab('deliverables');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-cyan-400 transition-all group-hover:translate-x-1"
                >
                  <span>Detailed Scope</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <Link
                  href="#contact"
                  className="px-4 py-2 text-xs font-extrabold rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Service Scope Modal Popup */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl glass-card-dual rounded-[2.5rem] p-8 border border-amber-500/50 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200 bg-[#050814]/95">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <DynamicIcon name={selectedService.icon} className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{selectedService.title}</h3>
                <p className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Service Scope Overview</p>
              </div>
            </div>

            {/* Modal Internal Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setModalTab('deliverables')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  modalTab === 'deliverables'
                    ? 'btn-logo-gradient text-white shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                Deliverables & Features
              </button>
              <button
                onClick={() => setModalTab('stack')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  modalTab === 'stack'
                    ? 'btn-logo-gradient text-white shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                Tech & Tools
              </button>
              <button
                onClick={() => setModalTab('timeline')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  modalTab === 'timeline'
                    ? 'btn-logo-gradient text-white shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                Delivery SLA
              </button>
            </div>

            {/* Modal Tab Content */}
            <div className="min-h-[160px]">
              {modalTab === 'deliverables' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {selectedService.fullDesc || selectedService.shortDesc}
                  </p>
                  {selectedService.features && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {selectedService.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {modalTab === 'stack' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <p className="text-xs text-slate-300">Industry-standard tools and frameworks utilized for {selectedService.title}:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-300 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-400" />
                      <span>Next.js / React</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-300 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-400" />
                      <span>TypeScript</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-300 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-400" />
                      <span>TailwindCSS</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-300 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-400" />
                      <span>Node / APIs</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-300 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-400" />
                      <span>Figma Design</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-300 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-400" />
                      <span>Blender / AE</span>
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'timeline' && (
                <div className="space-y-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 animate-in fade-in duration-200">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-amber-400" />
                    <div>
                      <h4 className="text-sm font-extrabold text-white">Estimated Turnaround & Milestones</h4>
                      <p className="text-xs text-slate-400">10 – 18 Business Days Average Sprint</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Weekly staging links, live progress reviews, clean documentation, full IP source code transfer, and 30-day post-launch technical warranty.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                Close Window
              </button>
              <Link
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white btn-logo-gradient flex items-center gap-2 shadow-lg shadow-amber-600/30"
              >
                <span>Apply To Project Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
