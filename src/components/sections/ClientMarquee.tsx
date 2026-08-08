'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Zap, Award, Sparkles } from 'lucide-react';
import { ClientItem } from '@/types';

interface ClientMarqueeProps {
  clients?: ClientItem[];
}

export const ClientMarquee: React.FC<ClientMarqueeProps> = ({ clients = [] }) => {
  // Ensure enough client items for a smooth continuous loop
  const displayClients = useMemo(() => {
    if (!clients || clients.length === 0) return [];
    let list = [...clients];
    while (list.length < 10) {
      list = [...list, ...clients];
    }
    return list;
  }, [clients]);

  if (displayClients.length === 0) return null;

  return (
    <section className="py-10 bg-[#030712] border-y border-white/5 overflow-hidden relative z-10 font-outfit select-none">
      {/* Section Header Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-amber-400/90 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 fill-current" />
          <span>TRUSTED BY GLOBAL BRANDS & INDUSTRY LEADERS</span>
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* Left & Right Fade Shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-28 sm:w-48 z-20 bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 sm:w-48 z-20 bg-gradient-to-l from-[#030712] via-[#030712]/90 to-transparent pointer-events-none" />

        {/* Slow Marquee Track */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] py-2" style={{ animationDuration: '180s' }}>
          {/* Track 1 */}
          <div className="flex shrink-0 items-center gap-5 sm:gap-8 pr-5 sm:pr-8">
            {displayClients.map((item, idx) => (
              <div
                key={`track1-${item.id || idx}-${idx}`}
                className="group/item flex items-center gap-4 px-7 py-4 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-800/90 transition-all duration-300 shadow-xl min-w-[240px] sm:min-w-[300px] h-20 sm:h-24 justify-center"
              >
                {item.logoUrl ? (
                  <div className="relative h-12 sm:h-14 w-36 sm:w-44 flex items-center justify-center shrink-0">
                    <Image
                      src={item.logoUrl}
                      alt={item.label || 'Client Logo'}
                      fill
                      className="object-contain brightness-0 invert opacity-90 group-hover/item:brightness-100 group-hover/item:invert-0 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-300"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                )}

                {item.logoUrl && item.label && (
                  <div className="flex items-center gap-2 border-l border-white/15 pl-4">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover/item:bg-amber-400 transition-colors shrink-0" />
                    <span className="text-xs sm:text-sm font-extrabold text-slate-200 group-hover/item:text-white transition-colors whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Track 2 (Identical Duplicate) */}
          <div className="flex shrink-0 items-center gap-5 sm:gap-8 pr-5 sm:pr-8" aria-hidden="true">
            {displayClients.map((item, idx) => (
              <div
                key={`track2-${item.id || idx}-${idx}`}
                className="group/item flex items-center gap-4 px-7 py-4 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-800/90 transition-all duration-300 shadow-xl min-w-[240px] sm:min-w-[300px] h-20 sm:h-24 justify-center"
              >
                {item.logoUrl ? (
                  <div className="relative h-12 sm:h-14 w-36 sm:w-44 flex items-center justify-center shrink-0">
                    <Image
                      src={item.logoUrl}
                      alt={item.label || 'Client Logo'}
                      fill
                      className="object-contain brightness-0 invert opacity-90 group-hover/item:brightness-100 group-hover/item:invert-0 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-300"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                )}

                {item.logoUrl && item.label && (
                  <div className="flex items-center gap-2 border-l border-white/15 pl-4">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover/item:bg-amber-400 transition-colors shrink-0" />
                    <span className="text-xs sm:text-sm font-extrabold text-slate-200 group-hover/item:text-white transition-colors whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
