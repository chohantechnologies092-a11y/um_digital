'use client';

import React, { useState } from 'react';
import { Search, Compass, Code2, Rocket, ArrowRight, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Discovery & Growth Strategy',
      shortDesc: 'Analyzing business goals, target audience, brand identity, and competitor landscapes.',
      details: 'We begin by conducting deep technical audit sessions, defining key target personas, analyzing search volume & ad competitors, and building an architectural product roadmap.',
      deliverables: ['Competitor & SEO Landscape Audit', 'Brand Positioning & Target Personas', 'Product Scope & System Roadmap'],
      tools: ['Figma Research', 'Google Search Console', 'Ahrefs Analytics'],
      icon: Search,
    },
    {
      num: '02',
      title: 'UI/UX & Architecture',
      shortDesc: 'Crafting wireframes, interactive Figma prototypes, 3D visual assets, and system architecture.',
      details: 'Our design team builds high-fidelity interactive component libraries, responsive UI design systems, custom 3D motion storyboards, and backend database schemas.',
      deliverables: ['Interactive Figma Prototypes', 'Custom 3D Assets & Motion Storyboards', 'Database Schemas & System Architecture'],
      tools: ['Figma', 'Blender 3D', 'Adobe After Effects'],
      icon: Compass,
    },
    {
      num: '03',
      title: 'Engineering & Production',
      shortDesc: 'Writing clean Next.js/React code while creative directors produce high-res motion assets.',
      details: 'Full-stack developers construct type-safe Next.js 16 components, REST & GraphQL API routes, SEO meta optimization, and high-resolution video render exports.',
      deliverables: ['Full-Stack Next.js 16 App Source', 'Clean REST/GraphQL API Integration', 'Rendered 4K Motion Ads & Creative Assets'],
      tools: ['Next.js 16', 'TypeScript', 'Node.js', 'PostgreSQL'],
      icon: Code2,
    },
    {
      num: '04',
      title: 'Launch, SEO & Scaling',
      shortDesc: 'Deploying on cloud infrastructure, launching ad campaigns, optimizing SEO, and scaling.',
      details: 'We execute zero-downtime deployment, set up Google Analytics & Meta Pixel tracking, initiate paid performance marketing campaigns, and monitor site health 24/7.',
      deliverables: ['Production Vercel/AWS Cloud Deployment', 'Meta & Google Ads Performance Launch', 'Full Technical Documentation & Source Code Transfer'],
      tools: ['Vercel', 'AWS', 'Meta Ads Manager', 'Google Analytics 4'],
      icon: Rocket,
    },
  ];

  const currentStep = steps[activeStep];
  const StepIcon = currentStep.icon;

  return (
    <section id="process" className="py-24 relative z-10 bg-[#030712] border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-dual border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Engineering Methodology</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            How We Deliver <span className="text-logo-gradient">Exceptional Scale</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            Click through our 4-phase engineering methodology to explore how we take your idea from concept to global launch.
          </p>
        </div>

        {/* Step Selector Buttons Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-[2rem] border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'btn-logo-gradient text-white shadow-xl shadow-amber-600/30 scale-[1.02] border-transparent'
                    : 'glass-card-dual text-slate-400 hover:text-white hover:bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl font-black ${isSelected ? 'text-white' : 'text-slate-600'}`}>
                    {step.num}
                  </span>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
                </div>
                <h4 className="text-sm font-extrabold leading-tight">{step.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Phase Detail Box */}
        <div className="glass-card-dual rounded-[2.5rem] p-8 sm:p-10 border border-cyan-500/40 shadow-2xl space-y-8 animate-in fade-in duration-300 bg-[#050814]/95">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg">
                <StepIcon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Phase {currentStep.num} Breakdown</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{currentStep.title}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeStep ? 'w-8 bg-amber-500' : 'w-2.5 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {currentStep.details}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            
            {/* Core Deliverables */}
            <div className="space-y-3 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Phase Deliverables</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-200 font-medium">
                {currentStep.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools Used */}
            <div className="space-y-3 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>Tools & Infrastructure</span>
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {currentStep.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-slate-950 border border-cyan-500/40 text-xs font-extrabold text-cyan-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Step Footer Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            >
              ← Previous Phase
            </button>
            
            <button
              onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white btn-logo-gradient flex items-center gap-2 shadow-lg shadow-amber-600/30"
            >
              <span>Next Phase →</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
