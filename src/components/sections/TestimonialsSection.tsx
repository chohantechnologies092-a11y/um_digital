'use client';

import React from 'react';
import Image from 'next/image';
import { TestimonialItem } from '@/types';
import { Star, Quote, Sparkles, ShieldCheck, Award } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-24 relative z-10 bg-[#030712] border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-dual border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Trusted By Founders & <span className="text-logo-gradient">Tech Leaders</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            Real feedback from business owners, marketing directors, and founders scaling with UM Digital.
          </p>
        </div>

        {/* Rating Metrics Header */}
        <div className="mb-12 glass-card-dual p-6 rounded-[2.5rem] border border-amber-500/40 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 font-extrabold text-xl">
                <span>4.9 / 5.0</span>
                <div className="flex text-amber-400 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-400">Client Satisfaction Score</p>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">100% Verified Reviews</p>
              <p className="text-xs text-slate-400">Across SaaS, E-Com & Growth</p>
            </div>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="glass-card-dual p-8 rounded-[2.5rem] border border-cyan-500/20 flex flex-col justify-between space-y-6 relative shadow-xl"
            >
              <Quote className="w-12 h-12 text-amber-500/15 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed font-normal">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="flex items-center gap-4 pt-5 border-t border-slate-800">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/50 bg-slate-900 flex-shrink-0">
                  <Image
                    src={item.avatarUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  </h4>
                  <p className="text-xs text-slate-400">
                    {item.role} • <span className="text-amber-300 font-semibold">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
