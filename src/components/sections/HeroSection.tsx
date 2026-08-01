'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSection as HeroType, SiteSettings } from '@/types';
import { ArrowRight, CheckCircle2, Play, Code2, Activity, Video } from 'lucide-react';

interface HeroSectionProps {
  hero: HeroType;
  settings: SiteSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ hero, settings }) => {
  const [activeTab, setActiveTab] = useState<'tech' | 'motion' | 'visual'>('tech');

  return (
    <section className="min-h-screen lg:h-screen lg:max-h-[920px] flex flex-col justify-between pt-24 pb-4 px-4 sm:px-6 relative overflow-hidden bg-[#030712] bg-devlyx-grid">
      {/* Fiery Orange & Electric Cyan Dual Spotlights */}
      <div className="blob-orange -top-20 -left-20" />
      <div className="blob-cyan top-1/2 right-0" />

      {/* Main Hero Frame Content Grid */}
      <div className="max-w-7xl mx-auto my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 w-full">
        
        {/* Left Headline & Action Column */}
        <div className="lg:col-span-7 text-left space-y-4 sm:space-y-5">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-amber-500/40 px-3.5 py-1 rounded-2xl shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-[10px] font-black text-amber-300 uppercase tracking-[0.18em]">
              {hero.badge || 'FULL-STACK DIGITAL AGENCY • 15+ YEARS EXCELLENCE'}
            </span>
          </div>

          {/* Headline with Logo Dual Gradient */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[0.98] tracking-tight">
            We Scale <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9100] via-[#ff3d00] to-[#00e5ff] animate-gradient-slow">
              Digital Ideas
            </span> <br />
            Into Reality.
          </h1>

          {/* Subheading */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed font-normal">
            Specializing in <span className="text-cyan-400 font-bold">MERN & Next.js</span>, <span className="text-amber-400 font-bold">Performance Marketing</span>, <span className="text-white font-bold">Technical SEO</span>, and <span className="text-cyan-300 font-bold">3D Motion</span>. High-performance architecture for global scale.
          </p>

          {/* Action CTAs */}
          <div className="pt-1 flex flex-wrap gap-3.5 items-center">
            <Link
              href="#contact"
              className="btn-logo-gradient text-white px-7 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-600/25 flex items-center gap-2 hover:scale-105 transition-all"
            >
              <span>START PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#process"
              className="px-7 py-3.5 rounded-2xl font-extrabold text-slate-200 text-xs sm:text-sm glass-card-dual hover:bg-slate-900/80 transition-all border border-cyan-500/30"
            >
              METHODOLOGY
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-1 flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Full-Stack Engineering</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Performance Marketing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>3D Motion Graphics</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Graphic Card */}
        <div className="lg:col-span-5 relative">
          
          {/* Card Selector Tabs */}
          <div className="flex items-center justify-center lg:justify-end gap-2 mb-3">
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all flex items-center gap-1.5 ${
                activeTab === 'tech'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>MERN / Web</span>
            </button>

            <button
              onClick={() => setActiveTab('motion')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all flex items-center gap-1.5 ${
                activeTab === 'motion'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 border border-amber-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>3D Motion</span>
            </button>

            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all flex items-center gap-1.5 ${
                activeTab === 'visual'
                  ? 'bg-gradient-to-r from-amber-600 to-cyan-600 text-white shadow-lg border border-amber-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Reel View</span>
            </button>
          </div>

          {/* Dynamic Card Display */}
          <div className="relative animate-float-slow">
            
            {activeTab === 'tech' && (
              <div className="glass-card-dual p-6 sm:p-7 rounded-[2rem] border border-cyan-500/40 bg-slate-900/80 backdrop-blur-2xl shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 p-2.5 rounded-2xl bg-slate-950 border border-cyan-700 flex items-center justify-center text-cyan-400">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-lg">MERN & Next.js Stack</h4>
                      <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">Full-Stack Architecture</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-emerald-400 bg-emerald-950 border border-emerald-800">
                    98% COMPLEXITY
                  </span>
                </div>

                <div className="space-y-1.5 bg-slate-950/90 p-3.5 rounded-2xl border border-cyan-900/60">
                  <div className="flex justify-between text-[11px] font-bold text-slate-300">
                    <span>Engine Rendering & Speed</span>
                    <span className="text-cyan-400">Optimal (98.4%)</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-[1.5px] border border-cyan-900">
                    <div className="bg-gradient-to-r from-amber-500 via-cyan-400 to-blue-500 h-full rounded-full animate-pulse" style={{ width: '98%' }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-extrabold text-cyan-300">
                  <div className="p-2 rounded-xl bg-slate-950 border border-cyan-900">React 19</div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-cyan-900">Next.js 16</div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-cyan-900">Node / DB</div>
                </div>
              </div>
            )}

            {activeTab === 'motion' && (
              <div className="glass-card-dual p-6 sm:p-7 rounded-[2rem] border border-amber-500/40 bg-slate-900/80 backdrop-blur-2xl shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 p-2.5 rounded-2xl bg-slate-950 border border-amber-700 flex items-center justify-center text-amber-400">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-lg">3D Motion Engine</h4>
                      <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Blender / AE Pipeline</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-amber-300 bg-amber-950 border border-amber-800">
                    120 FPS
                  </span>
                </div>

                <div className="space-y-1.5 bg-slate-950/90 p-3.5 rounded-2xl border border-amber-900/60">
                  <div className="flex justify-between text-[11px] font-bold text-slate-300">
                    <span>Frame Render Throughput</span>
                    <span className="text-amber-400">4K High-Res (95%)</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-[1.5px] border border-amber-900">
                    <div className="bg-gradient-to-r from-amber-500 via-red-500 to-cyan-400 h-full rounded-full animate-pulse" style={{ width: '95%' }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-extrabold text-amber-300">
                  <div className="p-2 rounded-xl bg-slate-950 border border-amber-900">3D Models</div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-amber-900">Animation</div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-amber-900">VFX Reel</div>
                </div>
              </div>
            )}

            {activeTab === 'visual' && (
              <div className="glass-card-dual p-5 sm:p-6 rounded-[2rem] border border-cyan-500/40 bg-slate-900/80 backdrop-blur-2xl shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-300">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-800/80 group">
                  <Image
                    src="/assets/Desktop---5.png"
                    alt="Agency Reel"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/50 animate-pulse">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-white">Full Digital Presentation</p>
                        <p className="text-[10px] text-cyan-200">Engineering • Ads • 3D Motion</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Dynamic Stats Counter Grid */}
      <div className="max-w-7xl mx-auto mt-auto pt-3 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative z-10 w-full">
        {hero.stats.map((stat) => (
          <div
            key={stat.id}
            className="glass-card-dual p-4 rounded-2xl text-center space-y-0.5 relative overflow-hidden group"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-logo-gradient tracking-tight">
              {stat.value}
            </div>
            <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
