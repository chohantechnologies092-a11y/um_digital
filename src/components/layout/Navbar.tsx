'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteSettings } from '@/types';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  settings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ settings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-4 transition-all duration-500">
      <div
        className={`max-w-6xl mx-auto glass-pill-nav rounded-full px-5 sm:px-7 py-2.5 transition-all duration-500 flex items-center justify-between gap-4 ${
          scrolled ? 'bg-[#030712]/95 py-2 border-amber-500/40 shadow-[0_10px_35px_rgba(255,145,0,0.2)]' : ''
        }`}
      >
        {/* Brand Logo & Availability Pill */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-44 sm:w-52 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/assets/um digital logo sa-01.png"
                alt={settings.agencyName || 'UM Digital Agency'}
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Availability Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-[10px] font-black text-cyan-300 uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>AVAILABLE</span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-black text-slate-300 uppercase tracking-widest">
          {[
            { label: 'SERVICES', href: '/services' },
            { label: 'PORTFOLIO', href: '/portfolio' },
            { label: 'ABOUT', href: '/about' },
            { label: 'CONTACT', href: '/contact' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <Link
            href="/admin/login"
            className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-300 hover:text-white px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 transition-colors"
            title="Admin Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Admin</span>
          </Link>

          <Link
            href="/contact"
            className="btn-logo-gradient text-xs font-black text-white px-5 py-2.5 rounded-full shadow-lg shadow-amber-600/25 flex items-center gap-1.5 hover:scale-105 transition-transform whitespace-nowrap"
          >
            <span>START PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/admin/login"
            className="p-1.5 text-cyan-400 bg-slate-900 border border-slate-800 rounded-full"
            title="Admin Panel"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto glass-card-dual rounded-3xl p-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-2 text-xs font-bold uppercase tracking-widest text-slate-300">
            {[
              { label: 'SERVICES', href: '/services' },
              { label: 'PORTFOLIO', href: '/portfolio' },
              { label: 'ABOUT', href: '/about' },
              { label: 'CONTACT', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl bg-slate-900/60 hover:text-amber-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-xs font-extrabold text-white px-5 py-3.5 rounded-2xl btn-logo-gradient flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30"
            >
              <span>START PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
