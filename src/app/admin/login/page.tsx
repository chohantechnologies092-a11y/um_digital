'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDirectLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'adminpassword123' }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('um_admin_auth', 'true');
        localStorage.setItem('um_admin_token', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Authentication error');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden font-outfit">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md glass-card-dual p-8 sm:p-10 rounded-[2.5rem] border border-amber-500/30 space-y-8 relative shadow-2xl z-10 text-center">
        
        {/* Header Branding */}
        <div className="space-y-4">
          <div className="relative h-14 w-60 mx-auto">
            <Image
              src="/assets/um digital logo sa-01.png"
              alt="UM Digital Agency"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Secure Admin Control Portal</span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            Welcome to UM Digital Agency Command Center. Click below to enter your dashboard.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1-Click Direct Entrance Action */}
        <form onSubmit={handleDirectLogin} className="space-y-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-extrabold text-sm btn-logo-gradient shadow-xl shadow-amber-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 uppercase tracking-wider cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>{loading ? 'Entering Admin Portal...' : 'Enter Admin Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

