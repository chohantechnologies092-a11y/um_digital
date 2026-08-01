'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteSettings, ServiceItem } from '@/types';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  services: ServiceItem[];
}

export const Footer: React.FC<FooterProps> = ({ settings, services }) => {
  return (
    <footer className="bg-[#030712] border-t border-amber-500/20 relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Mega Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Bio (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block relative h-12 w-52">
              <Image
                src="/assets/um digital logo sa-01.png"
                alt={settings.agencyName || 'UM Digital Agency'}
                fill
                className="object-contain"
              />
            </Link>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm font-normal">
              UM Digital is a 360° digital agency architecting high-performance MERN & Next.js applications, performance marketing campaigns, technical SEO, and 3D motion animations.
            </p>

            {/* System Status */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 text-xs font-bold text-cyan-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link href="#services" className="hover:text-amber-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <Link href="#services" className="hover:text-amber-400 transition-colors">Solutions</Link>
              </li>
              <li>
                <Link href="#process" className="hover:text-amber-400 transition-colors">Methodology</Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:text-amber-400 transition-colors">Featured Work</Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-amber-400 transition-colors">Client Reviews</Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-amber-400 transition-colors">Leadership Team</Link>
              </li>
            </ul>
          </div>

          {/* Admin & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Admin & Portal
            </h4>
            <ul className="space-y-3 text-xs text-slate-300 font-medium">
              <li>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 hover:text-white font-bold transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Admin Panel</span>
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-slate-400">
                <span>Headquarters: {settings.address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} {settings.agencyName}. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Architected with precision by</span>
            <span className="text-amber-400 font-bold">UM Digital Agency</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
