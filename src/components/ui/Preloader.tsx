'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 300);
          setTimeout(() => setHidden(true), 900);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#030712] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isLoaded ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Dual Ambient Blobs */}
      <div className="blob-orange -top-20 -left-20 opacity-60" />
      <div className="blob-cyan -bottom-20 -right-20 opacity-60" />

      <div className="relative z-10 flex flex-col items-center space-y-8 px-4 text-center">
        
        {/* Animated Brand Logo Mark */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 animate-logo-pulse">
          <Image
            src="/assets/um digital logo sa-01.png"
            alt="UM Digital Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Brand Text */}
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-wider text-white">
            UM DIGITAL <span className="text-logo-gradient">AGENCY</span>
          </h2>
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.25em]">
            Architecting Digital Excellence
          </p>
        </div>

        {/* Progress Bar & Percentage Counter */}
        <div className="w-56 sm:w-72 space-y-2.5">
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-[1.5px] border border-amber-500/30 shadow-inner">
            <div
              className="btn-logo-gradient h-full rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
            <span className="text-cyan-400">LOADING ECOSYSTEM</span>
            <span className="text-amber-400">{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};
