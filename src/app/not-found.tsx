import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase shadow-lg shadow-amber-500/10">
          <Sparkles className="w-3.5 h-3.5" /> 404 — Page Not Found
        </div>

        <h1 className="text-7xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600 tracking-tight">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Lost in Digital Space?
        </h2>

        <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, renamed, or is temporarily unavailable.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg shadow-amber-500/25"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 font-semibold hover:bg-slate-800 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" /> Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}
