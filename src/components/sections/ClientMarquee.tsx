'use client';

import React from 'react';
import Image from 'next/image';
import { Zap } from 'lucide-react';
import { ClientItem } from '@/types';

interface ClientMarqueeProps {
  clients?: ClientItem[];
}

export const ClientMarquee: React.FC<ClientMarqueeProps> = ({ clients = [] }) => {

  return (
    <section className="py-8 bg-[#030712] border-y border-amber-500/20 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
        <p className="text-[11px] font-black uppercase tracking-widest text-amber-400 flex items-center justify-center gap-2">
          <Zap className="w-3.5 h-3.5 text-cyan-400 fill-current" />
          <span>TRUSTED BY GLOBAL BRANDS</span>
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-r from-[#030712] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-l from-[#030712] to-transparent pointer-events-none" />

        {/* Marquee Content */}
        <div className="animate-marquee flex items-center gap-6 py-2">
          {clients.length > 0 && [...clients, ...clients].map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center gap-4 px-6 py-3 rounded-2xl glass-card-dual border border-cyan-500/30 text-slate-200 text-sm font-black uppercase tracking-wider whitespace-nowrap shadow-md hover:border-amber-400 hover:shadow-[0_0_15px_rgba(255,145,0,0.2)] transition-all duration-300 min-w-[200px]"
              >
                {item.logoUrl ? (
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image src={item.logoUrl} alt={item.label} fill className="object-contain" />
                  </div>
                ) : null}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
