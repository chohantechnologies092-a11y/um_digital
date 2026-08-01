'use client';

import React, { useState } from 'react';
import { ServiceItem, SiteSettings } from '@/types';
import { Send, Mail, Phone, MapPin, CheckCircle2, Sparkles, AlertCircle, Zap, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  services: ServiceItem[];
  settings: SiteSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ services, settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequested: services[0]?.title || 'Digital Marketing',
    budgetRange: '$1,000 - $3,000',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const selectedServiceObj = services.find((s) => s.title === formData.serviceRequested);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setStatusMsg({
          type: 'success',
          text: 'Thank you! Your inquiry has been received. Our lead architect will review your scope and contact you within 2 hours.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceRequested: services[0]?.title || 'Digital Marketing',
          budgetRange: '$1,000 - $3,000',
          message: '',
        });
      } else {
        setStatusMsg({ type: 'error', text: result.error || 'Failed to submit inquiry. Please try again or WhatsApp us directly.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Network connection error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-[#030712] border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Agency Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-dual border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Start Your Project</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Let&apos;s Engineer Your <span className="text-logo-gradient">Next Big Scale</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Share your requirements with our team and receive a comprehensive technical proposal & roadmap tailored to your brand.
              </p>
            </div>

            {/* SLA Response Guarantee */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 flex items-center gap-3 text-xs text-slate-300">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="font-extrabold text-white">Guaranteed Fast SLA Response</p>
                <p className="text-[11px] text-slate-400">All project inquiries reviewed within 2 business hours.</p>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="glass-card-dual p-5 rounded-2xl border border-cyan-500/20 flex items-center gap-4 hover:border-amber-400 transition-colors shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Us Directly</p>
                  <a href={`mailto:${settings.contactEmail}`} className="text-sm font-extrabold text-white hover:text-amber-400 transition-colors">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="glass-card-dual p-5 rounded-2xl border border-cyan-500/20 flex items-center gap-4 hover:border-amber-400 transition-colors shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call or WhatsApp</p>
                  <a href={settings.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm font-extrabold text-white hover:text-cyan-400 transition-colors">
                    {settings.contactPhone}
                  </a>
                </div>
              </div>

              <div className="glass-card-dual p-5 rounded-2xl border border-cyan-500/20 flex items-center gap-4 hover:border-amber-400 transition-colors shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Agency Headquarters</p>
                  <p className="text-sm font-extrabold text-white">
                    {settings.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card-dual p-8 sm:p-10 rounded-[2.5rem] border border-amber-500/30 space-y-6 relative shadow-2xl bg-[#050814]/95">
              
              <div className="space-y-1 pb-3 border-b border-slate-800">
                <h3 className="text-3xl font-black text-white">
                  Request a Free Proposal
                </h3>
                <p className="text-xs text-slate-400">Fill in your requirements below to start your digital build.</p>
              </div>

              {/* Dynamic Service Highlights */}
              {selectedServiceObj && (
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-xs space-y-1.5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-cyan-300 font-extrabold">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Scope Selected: {selectedServiceObj.title}</span>
                  </div>
                  <p className="text-slate-300 font-normal text-[11px] leading-relaxed">
                    {selectedServiceObj.shortDesc}
                  </p>
                </div>
              )}

              {statusMsg && (
                <div
                  className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center gap-3 ${
                    statusMsg.type === 'success'
                      ? 'bg-emerald-950/80 border-emerald-700/80 text-emerald-300'
                      : 'bg-rose-950/80 border-rose-700/80 text-rose-300'
                  }`}
                >
                  {statusMsg.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span>{statusMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ali Raza"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm font-semibold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ali@company.com"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm font-semibold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 0000000"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm font-semibold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                      Service Required
                    </label>
                    <select
                      value={formData.serviceRequested}
                      onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 text-sm font-semibold transition-colors"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title} className="bg-slate-950 text-white">
                          {s.title}
                        </option>
                      ))}
                      <option value="All Services Package" className="bg-slate-950 text-white">All Services Package (360° Agency)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                    Estimated Budget Bracket
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 text-sm font-semibold transition-colors"
                  >
                    <option value="< $1,000" className="bg-slate-950 text-white">Under $1,000</option>
                    <option value="$1,000 - $3,000" className="bg-slate-950 text-white">$1,000 - $3,000</option>
                    <option value="$3,000 - $10,000" className="bg-slate-950 text-white">$3,000 - $10,000</option>
                    <option value="$10,000+ Enterprise" className="bg-slate-950 text-white">$10,000+ Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                    Project Goals & Key Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project goals, deadlines, target audience, or specific features..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm font-semibold transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl text-white font-extrabold text-sm btn-logo-gradient shadow-xl shadow-amber-600/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'SUBMITTING INQUIRY...' : 'SUBMIT INQUIRY & GET PROPOSAL'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
