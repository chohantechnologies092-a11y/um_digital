'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

export const ProjectEstimator: React.FC = () => {
  const [serviceType, setServiceType] = useState<'web' | 'marketing' | 'animation' | 'seo' | 'design'>('web');
  const [speed, setSpeed] = useState<'standard' | 'express'>('standard');
  const [addons, setAddons] = useState<string[]>(['cms', 'seo-boost']);

  const toggleAddon = (id: string) => {
    if (addons.includes(id)) {
      setAddons(addons.filter((a) => a !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  // Estimate Calculation Logic
  const getEstimate = () => {
    let baseMin = 1000;
    let baseMax = 2500;
    let baseDays = 14;

    if (serviceType === 'web') {
      baseMin = 1500;
      baseMax = 3500;
      baseDays = 18;
    } else if (serviceType === 'marketing') {
      baseMin = 800;
      baseMax = 2000;
      baseDays = 7;
    } else if (serviceType === 'animation') {
      baseMin = 1200;
      baseMax = 3000;
      baseDays = 12;
    } else if (serviceType === 'seo') {
      baseMin = 600;
      baseMax = 1500;
      baseDays = 10;
    } else if (serviceType === 'design') {
      baseMin = 700;
      baseMax = 1800;
      baseDays = 8;
    }

    if (speed === 'express') {
      baseMin = Math.round(baseMin * 1.25);
      baseMax = Math.round(baseMax * 1.3);
      baseDays = Math.max(5, Math.round(baseDays * 0.6));
    }

    const addonPrice = addons.length * 300;
    const addonDays = addons.length * 2;

    return {
      priceMin: baseMin + addonPrice,
      priceMax: baseMax + addonPrice * 1.5,
      days: baseDays + addonDays,
    };
  };

  const est = getEstimate();

  return (
    <section id="estimator" className="py-24 relative z-10 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider shadow-md">
            <Calculator className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Calculate Your <span className="gradient-text">Project Cost & Timeline</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Select your project requirements below to view instant real-time estimate estimates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-slate-800 space-y-8 shadow-2xl">
            
            {/* Step 1: Select Service */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>1. Select Primary Service Type</span>
                <span className="text-cyan-400 text-[11px] font-semibold">Step 1 of 3</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'web', label: 'Web / SaaS App' },
                  { id: 'marketing', label: 'Digital Ads & Marketing' },
                  { id: 'animation', label: '3D Motion Video' },
                  { id: 'seo', label: 'SEO Optimization' },
                  { id: 'design', label: 'Brand & Graphics' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceType(s.id as any)}
                    className={`p-3.5 rounded-2xl text-xs font-bold border transition-all text-left flex flex-col justify-between h-20 ${
                      serviceType === s.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>{s.label}</span>
                    {serviceType === s.id && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 self-end" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Delivery Speed */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>2. Delivery Speed & Urgency</span>
                <span className="text-cyan-400 text-[11px] font-semibold">Step 2 of 3</span>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSpeed('standard')}
                  className={`p-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-between ${
                    speed === 'standard'
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div>
                    <p className="font-bold text-white text-sm">Standard Speed</p>
                    <p className="text-[11px] font-normal text-slate-400">Regular sprint timeline</p>
                  </div>
                  {speed === 'standard' && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
                </button>

                <button
                  onClick={() => setSpeed('express')}
                  className={`p-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-between ${
                    speed === 'express'
                      ? 'bg-cyan-600/30 border-cyan-500 text-white shadow-lg'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div>
                    <p className="font-bold text-white text-sm">⚡ Express Rush</p>
                    <p className="text-[11px] font-normal text-slate-400">Priority dedicated team</p>
                  </div>
                  {speed === 'express' && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
                </button>
              </div>
            </div>

            {/* Step 3: Add-on Capabilities */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>3. Recommended Add-ons</span>
                <span className="text-cyan-400 text-[11px] font-semibold">Step 3 of 3</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'cms', label: 'Full Admin CMS Panel' },
                  { id: 'seo-boost', label: 'Advanced SEO & Analytics' },
                  { id: 'payment', label: 'Payment Gateway Integration' },
                  { id: 'multilingual', label: 'Multi-Language Support' },
                ].map((addon) => {
                  const active = addons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                        active
                          ? 'bg-slate-800 border-indigo-500/80 text-white'
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{addon.label}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${active ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'}`}>
                        {active && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Results Box */}
          <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-slate-700/80 space-y-6 shadow-2xl relative bg-slate-900/90">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Estimated Proposal Summary</span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-semibold">
                INSTANT QUOTE
              </span>
            </div>

            <div className="space-y-5">
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-1">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                  <span>Estimated Investment Bracket</span>
                </p>
                <div className="text-3xl font-extrabold text-white gradient-text">
                  ${est.priceMin.toLocaleString()} – ${est.priceMax.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-400">Includes full source code, IP ownership & 30-day support.</p>
              </div>

              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-1">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>Estimated Delivery Timeframe</span>
                </p>
                <div className="text-2xl font-extrabold text-white">
                  ~ {est.days} Business Days
                </div>
                <p className="text-[11px] text-slate-400">Milestone-based delivery with weekly staging demos.</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="#contact"
                className="w-full py-4 rounded-2xl font-bold text-sm text-white gradient-bg-button flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transform hover:-translate-y-0.5 transition-all"
              >
                <span>Apply This Estimate To Project Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Free Consultation • No Obligation</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
