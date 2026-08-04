'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AgencyData, ServiceItem, PortfolioProject, TestimonialItem, TeamMember, ContactLead, ClientItem } from '@/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  Briefcase,
  Star,
  Users,
  Inbox,
  Settings,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
  X,
  Upload,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<AgencyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'hero' | 'services' | 'portfolio' | 'testimonials' | 'team' | 'leads' | 'clients' | 'settings'>('overview');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Service Edit State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioProject | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);
  const [newFeatureInput, setNewFeatureInput] = useState('');

  useEffect(() => {
    setMounted(true);
    const auth = localStorage.getItem('um_admin_auth');
    if (!auth) {
      router.push('/admin/login');
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/data', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json && typeof json === 'object') {
          setData(json);
          return;
        }
      }
    } catch (err) {
      console.error('Failed to load agency data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveData = async (updatedData?: AgencyData) => {
    const payload = updatedData || data;
    if (!payload) return;

    setSaving(true);
    setSaveStatus(null);
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok) {
        setData(result.data || payload);
        setSaveStatus('Changes saved successfully to database!');
        setTimeout(() => setSaveStatus(null), 4000);
      } else {
        setSaveStatus('Error saving changes: ' + (result.error || 'Server error'));
      }
    } catch (err) {
      setSaveStatus('Network error saving changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('um_admin_auth');
    localStorage.removeItem('um_admin_token');
    router.push('/admin/login');
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-white p-6 space-y-5 font-outfit">
        <div className="w-14 h-14 rounded-full bg-slate-900 border border-amber-500/40 flex items-center justify-center shadow-xl">
          <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold text-white">Loading UM Digital Admin CMS...</h3>
          <p className="text-xs text-slate-400">Connecting to database and fetching latest content</p>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => fetchData()}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-cyan-300 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const newLeadsCount = data.leads.filter((l) => l.status === 'New').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-slate-900/90 border-b lg:border-b-0 lg:border-r border-slate-800 p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8">
          {/* Logo Branding */}
          <div className="space-y-2">
            <div className="relative h-12 w-48">
              <Image
                src={data.settings.logoUrl || '/assets/um digital logo-01.png'}
                alt="UM Digital"
                fill
                className="object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-800">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Full Control CMS</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-sm font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard Overview</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === 'hero'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                <span>Hero & Stats</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === 'services'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5" />
                <span>Services ({data.services.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5" />
                <span>Portfolio Projects</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === 'testimonials'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5" />
                <span>Client Reviews</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === 'team'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span>Team Members</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === 'leads'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-5 h-5" />
                <span>Inquiries Inbox</span>
              </div>
              {newLeadsCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold bg-rose-600 text-white rounded-full">
                  {newLeadsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === 'clients'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span>Clients Marquee</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === 'settings'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                <span>Agency Settings</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-gray-200 transition-colors"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/50 hover:bg-rose-900/60 border border-rose-900/60 text-xs font-semibold text-rose-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace Area */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto max-h-screen">
        
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white capitalize">
              {activeTab === 'overview' && 'Agency Control Dashboard'}
              {activeTab === 'hero' && 'Manage Hero Banner & Stats'}
              {activeTab === 'services' && 'Manage Full-Stack Services'}
              {activeTab === 'portfolio' && 'Manage Portfolio & Case Studies'}
              {activeTab === 'testimonials' && 'Manage Client Reviews'}
              {activeTab === 'team' && 'Manage Agency Team'}
              {activeTab === 'leads' && 'Customer Inquiries & Leads'}
              {activeTab === 'clients' && 'Manage Trusted Clients'}
              {activeTab === 'settings' && 'Site Settings & Logos'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Control and modify live content across the entire UM Digital Agency platform.
            </p>
          </div>

          <button
            onClick={() => handleSaveData()}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm gradient-bg-button shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save All Changes'}</span>
          </button>
        </div>

        {/* Status Toast */}
        {saveStatus && (
          <div
            className={`p-4 rounded-2xl border text-sm flex items-center gap-3 ${
              saveStatus.includes('Error')
                ? 'bg-rose-950/80 border-rose-700 text-rose-300'
                : 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
            }`}
          >
            {saveStatus.includes('Error') ? (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{saveStatus}</span>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase">Active Services</p>
                <div className="text-3xl font-extrabold text-white">
                  {data.services.filter((s) => s.active).length}
                </div>
                <p className="text-xs text-cyan-400">Full-Stack Offerings</p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase">Portfolio Projects</p>
                <div className="text-3xl font-extrabold text-white">
                  {data.portfolio.length}
                </div>
                <p className="text-xs text-indigo-400">Case Studies & Videos</p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase">Total Leads Received</p>
                <div className="text-3xl font-extrabold text-white">
                  {data.leads.length}
                </div>
                <p className="text-xs text-emerald-400">{newLeadsCount} New Unread</p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase">Client Testimonials</p>
                <div className="text-3xl font-extrabold text-white">
                  {data.testimonials.length}
                </div>
                <p className="text-xs text-amber-400">5-Star Endorsements</p>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white">Quick CMS Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('hero')}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500 text-left space-y-2 transition-all group"
                >
                  <Sparkles className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-white">Edit Hero & Tagline</h4>
                  <p className="text-xs text-gray-400">Update main headline, CTA button labels, and stats counters.</p>
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500 text-left space-y-2 transition-all group"
                >
                  <Layers className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-white">Manage Services</h4>
                  <p className="text-xs text-gray-400">Add, edit or re-order Digital Marketing, SEO, Web Dev, Photography & Animation.</p>
                </button>

                <button
                  onClick={() => setActiveTab('leads')}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500 text-left space-y-2 transition-all group"
                >
                  <Inbox className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-white">View Contact Leads</h4>
                  <p className="text-xs text-gray-400">Check incoming quote inquiries and update client status.</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HERO & STATS */}
        {activeTab === 'hero' && (
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Hero Header Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase">
                  Hero Badge Text
                </label>
                <input
                  type="text"
                  value={data.hero.badge}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, badge: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={data.hero.heading}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, heading: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase">
                  Subheading Description
                </label>
                <textarea
                  rows={3}
                  value={data.hero.subheading}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, subheading: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={data.hero.primaryCtaText}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, primaryCtaText: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase">
                    Secondary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={data.hero.secondaryCtaText}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, secondaryCtaText: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Stats Management */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h4 className="text-lg font-bold text-white">Statistical Counter Cards</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.hero.stats.map((stat, index) => (
                  <div key={stat.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400">Stat Value (e.g. 450+)</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...data.hero.stats];
                          newStats[index].value = e.target.value;
                          setData({ ...data, hero: { ...data.hero, stats: newStats } });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400">Stat Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...data.hero.stats];
                          newStats[index].label = e.target.value;
                          setData({ ...data, hero: { ...data.hero, stats: newStats } });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Agency Services Management</h3>
                <p className="text-xs text-slate-400">Manage all service offerings, icons, capabilities, descriptions, and page routes</p>
              </div>
              <button
                onClick={() => {
                  const newServ: ServiceItem = {
                    id: 'service-' + Date.now(),
                    slug: 'new-service-' + Date.now(),
                    title: 'New Custom Service',
                    shortDesc: 'High-impact digital service solution for growing brands.',
                    fullDesc: 'Comprehensive service breakdown including strategy, execution, technical architecture, and long-term support.',
                    icon: 'Sparkles',
                    features: ['Strategic Planning', 'Custom Execution', 'Dedicated Support'],
                    active: true,
                    order: data.services.length + 1,
                  };
                  setEditingService(newServ);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-indigo-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            {/* List Table */}
            <div className="grid grid-cols-1 gap-4">
              {data.services
                .slice()
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((service, index) => (
                  <div key={service.id} className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400 flex-shrink-0">
                        <DynamicIcon name={service.icon} className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-white text-base">{service.title}</h4>
                          <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full ${service.active ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'}`}>
                            {service.active ? '● Active' : '○ Hidden'}
                          </span>
                          <span className="text-[10px] font-bold text-cyan-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                            Order: #{service.order || index + 1}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-1">{service.shortDesc}</p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1 flex-wrap">
                          <span className="text-amber-400 font-semibold">{(service.features || []).length} Capabilities</span>
                          {service.slug && (
                            <Link href={`/services/${service.slug}`} target="_blank" className="text-cyan-400 hover:underline flex items-center gap-1">
                              <span>/services/{service.slug}</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
                      {/* Reorder Buttons */}
                      <button
                        type="button"
                        onClick={() => {
                          const idx = data.services.findIndex(s => s.id === service.id);
                          if (idx > 0) {
                            const updated = [...data.services];
                            const temp = updated[idx].order;
                            updated[idx].order = updated[idx - 1].order;
                            updated[idx - 1].order = temp;
                            const newData = { ...data, services: updated };
                            setData(newData);
                            handleSaveData(newData);
                          }
                        }}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 disabled:opacity-30"
                        title="Move Up"
                        disabled={index === 0}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const idx = data.services.findIndex(s => s.id === service.id);
                          if (idx < data.services.length - 1) {
                            const updated = [...data.services];
                            const temp = updated[idx].order;
                            updated[idx].order = updated[idx + 1].order;
                            updated[idx + 1].order = temp;
                            const newData = { ...data, services: updated };
                            setData(newData);
                            handleSaveData(newData);
                          }
                        }}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 disabled:opacity-30"
                        title="Move Down"
                        disabled={index === data.services.length - 1}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {/* Quick Toggle Active */}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = data.services.map((s) => s.id === service.id ? { ...s, active: !s.active } : s);
                          const newData = { ...data, services: updated };
                          setData(newData);
                          handleSaveData(newData);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${service.active ? 'bg-amber-950/60 border-amber-800 text-amber-300 hover:bg-amber-900' : 'bg-emerald-950/60 border-emerald-800 text-emerald-300 hover:bg-emerald-900'}`}
                      >
                        {service.active ? 'Hide' : 'Activate'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingService({ ...service })}
                        className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-slate-800"
                        title="Edit Service"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
                            const updated = data.services.filter((s) => s.id !== service.id);
                            const newData = { ...data, services: updated };
                            setData(newData);
                            handleSaveData(newData);
                          }
                        }}
                        className="p-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-900/60"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Service Modal Form with Portal */}
            {editingService && mounted && createPortal(
              <div className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                <div className="w-full max-w-3xl bg-[#0b1329] p-6 sm:p-8 rounded-3xl border border-amber-500/50 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6 my-auto text-white">
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center text-amber-400">
                        <DynamicIcon name={editingService.icon} className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {editingService.id.startsWith('service-') && editingService.title === 'New Custom Service'
                            ? 'Add New Service'
                            : `Edit: ${editingService.title}`}
                        </h3>
                        <p className="text-xs text-slate-400">Update service title, icon, descriptions, and deliverables</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-5 text-sm">
                    
                    {/* Title & Slug */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title</label>
                        <input
                          type="text"
                          value={editingService.title}
                          onChange={(e) => {
                            const newTitle = e.target.value;
                            const generatedSlug = newTitle
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/(^-|-$)/g, '');
                            setEditingService({
                              ...editingService,
                              title: newTitle,
                              slug: editingService.slug === 'new-service' || !editingService.slug ? generatedSlug : editingService.slug
                            });
                          }}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm font-semibold"
                          placeholder="e.g. Digital Marketing"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug (e.g. digital-marketing)</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={editingService.slug}
                            onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 focus:outline-none focus:border-indigo-500 text-sm font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Status & Priority Order */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Status Visibility</label>
                        <select
                          value={editingService.active ? 'true' : 'false'}
                          onChange={(e) => setEditingService({ ...editingService, active: e.target.value === 'true' })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm font-semibold"
                        >
                          <option value="true">Active (Visible on Website)</option>
                          <option value="false">Hidden (Draft)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Display Priority Order (1 = Top)</label>
                        <input
                          type="number"
                          value={editingService.order || 1}
                          onChange={(e) => setEditingService({ ...editingService, order: parseInt(e.target.value) || 1 })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm font-semibold"
                        />
                      </div>
                    </div>

                    {/* Icon Selection with Presets */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-slate-300">
                          Lucide Icon Name: <span className="text-amber-400 font-bold">{editingService.icon}</span>
                        </label>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <span>Preview:</span>
                          <div className="w-6 h-6 rounded-lg bg-slate-900 border border-amber-500/40 flex items-center justify-center text-amber-400">
                            <DynamicIcon name={editingService.icon} className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={editingService.icon}
                        onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white mb-2 text-sm font-mono"
                        placeholder="e.g. TrendingUp"
                      />

                      {/* Icon Preset Picker Grid */}
                      <div className="pt-1">
                        <p className="text-[11px] text-slate-400 mb-1.5 font-semibold">Choose from Popular Icons:</p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'TrendingUp', 'Search', 'Palette', 'Code2', 'Video', 'PlaySquare', 
                            'Sparkles', 'Layers', 'Globe', 'Shield', 'Zap', 'Activity', 
                            'Cpu', 'Megaphone', 'Camera', 'Laptop', 'Server', 'Workflow', 'PieChart'
                          ].map((iconName) => (
                            <button
                              key={iconName}
                              type="button"
                              onClick={() => setEditingService({ ...editingService, icon: iconName })}
                              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs ${
                                editingService.icon === iconName
                                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                              }`}
                            >
                              <DynamicIcon name={iconName} className="w-4 h-4" />
                              <span>{iconName}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description (Card Summary)</label>
                      <textarea
                        rows={2}
                        value={editingService.shortDesc}
                        onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm leading-relaxed"
                        placeholder="Brief 1-2 sentence overview for home page cards..."
                      />
                    </div>

                    {/* Full Description */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Full Comprehensive Description (Detailed Scope & Page view)</label>
                      <textarea
                        rows={4}
                        value={editingService.fullDesc}
                        onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm leading-relaxed"
                        placeholder="Detailed breakdown of deliverables, process, and strategic benefits..."
                      />
                    </div>

                    {/* Dynamic Capabilities / Features List */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Deliverables & Capabilities List (Shown in Card & Detailed View)
                      </label>
                      
                      {/* Current Feature Tags */}
                      <div className="flex flex-wrap gap-2 mb-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800 min-h-[48px]">
                        {(editingService.features || []).map((feat, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-950 border border-indigo-700 text-indigo-200 text-xs font-semibold"
                          >
                            <span>{feat}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedFeats = (editingService.features || []).filter((_, i) => i !== idx);
                                setEditingService({ ...editingService, features: updatedFeats });
                              }}
                              className="text-indigo-400 hover:text-rose-400 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}

                        {(!editingService.features || editingService.features.length === 0) && (
                          <span className="text-xs text-slate-500 py-1">No capabilities added yet. Add below:</span>
                        )}
                      </div>

                      {/* Add Capability Form Input */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newFeatureInput}
                          onChange={(e) => setNewFeatureInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (newFeatureInput.trim()) {
                                setEditingService({
                                  ...editingService,
                                  features: [...(editingService.features || []), newFeatureInput.trim()]
                                });
                                setNewFeatureInput('');
                              }
                            }
                          }}
                          placeholder="Type new deliverable (e.g. Meta Ads Setup) and press Enter or Add..."
                          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newFeatureInput.trim()) {
                              setEditingService({
                                ...editingService,
                                features: [...(editingService.features || []), newFeatureInput.trim()]
                              });
                              setNewFeatureInput('');
                            }
                          }}
                          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const existingIdx = data.services.findIndex((s) => s.id === editingService.id);
                        const updated = [...data.services];
                        if (existingIdx >= 0) {
                          updated[existingIdx] = editingService;
                        } else {
                          updated.push(editingService);
                        }
                        const newData = { ...data, services: updated };
                        setData(newData);
                        setEditingService(null);
                        handleSaveData(newData);
                      }}
                      className="px-6 py-2.5 rounded-xl gradient-bg-button text-white text-xs font-extrabold shadow-lg shadow-amber-600/25"
                    >
                      Save Service Changes
                    </button>
                  </div>
                </div>
              </div>,
              document.body
            )}
          </div>
        )}

        {/* TAB 4: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Portfolio Projects</h3>
              <button
                onClick={() => {
                  const newProj: PortfolioProject = {
                    id: 'proj-' + Date.now(),
                    title: 'New Showcase Project',
                    slug: 'new-project',
                    category: 'Web / Software Development',
                    description: 'Description of project accomplishments',
                    clientName: 'Client Brand',
                    imageUrl: '/assets/Desktop - 1.png',
                    videoUrl: '',
                    liveUrl: 'https://example.com',
                    featured: true,
                    order: data.portfolio.length + 1,
                  };
                  setEditingPortfolio(newProj);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Portfolio Item</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.portfolio.map((proj) => (
                <div key={proj.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                    <Image src={proj.imageUrl || '/assets/Desktop - 1.png'} alt={proj.title} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {proj.category}
                    </span>
                    <h4 className="font-bold text-white text-lg mt-2">{proj.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{proj.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-xs text-slate-400">Client: {proj.clientName}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingPortfolio({ ...proj })}
                        className="p-2 rounded-lg bg-slate-900 text-indigo-400 border border-slate-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const updated = data.portfolio.filter((p) => p.id !== proj.id);
                          const newData = { ...data, portfolio: updated };
                          setData(newData);
                          handleSaveData(newData);
                        }}
                        className="p-2 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-900/60"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Portfolio Edit Modal */}
            {editingPortfolio && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-2xl glass-card p-6 sm:p-8 rounded-3xl border border-slate-700 max-h-[90vh] overflow-y-auto space-y-6">
                  <h3 className="text-xl font-bold text-white">Edit Portfolio Project</h3>

                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label>
                        <input
                          type="text"
                          value={editingPortfolio.title}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, title: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
                        <input
                          type="text"
                          value={editingPortfolio.slug || ''}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, slug: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                        <select
                          value={editingPortfolio.category}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, category: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        >
                          <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                          <option value="Graphics Designing">Graphics Designing</option>
                          <option value="Web / Software Development">Web / Software Development</option>
                          <option value="Commercial Photography">Commercial Photography</option>
                          <option value="Videography & Animation">Videography & Animation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
                        <input
                          type="text"
                          value={editingPortfolio.clientName}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, clientName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Image Asset URL</label>
                      <input
                        type="text"
                        value={editingPortfolio.imageUrl}
                        onChange={(e) => setEditingPortfolio({ ...editingPortfolio, imageUrl: e.target.value })}
                        placeholder="/assets/Desktop - 1.png"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Video Embed URL (Optional YouTube / Vimeo)</label>
                        <input
                          type="text"
                          value={editingPortfolio.videoUrl || ''}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, videoUrl: e.target.value })}
                          placeholder="https://www.youtube.com/embed/..."
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Live URL (Optional)</label>
                        <input
                          type="text"
                          value={editingPortfolio.liveUrl || ''}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, liveUrl: e.target.value })}
                          placeholder="https://example.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={editingPortfolio.description}
                        onChange={(e) => setEditingPortfolio({ ...editingPortfolio, description: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">The Challenge</label>
                        <textarea
                          rows={4}
                          value={editingPortfolio.challenge || ''}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, challenge: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Our Solution</label>
                        <textarea
                          rows={4}
                          value={editingPortfolio.solution || ''}
                          onChange={(e) => setEditingPortfolio({ ...editingPortfolio, solution: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                    <button onClick={() => setEditingPortfolio(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold">
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const existingIdx = data.portfolio.findIndex((p) => p.id === editingPortfolio.id);
                        const updated = [...data.portfolio];
                        if (existingIdx >= 0) {
                          updated[existingIdx] = editingPortfolio;
                        } else {
                          updated.push(editingPortfolio);
                        }
                        const newData = { ...data, portfolio: updated };
                        setData(newData);
                        setEditingPortfolio(null);
                        handleSaveData(newData);
                      }}
                      className="px-5 py-2.5 rounded-xl gradient-bg-button text-white text-xs font-semibold"
                    >
                      Save Project
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: TESTIMONIALS (CLIENT REVIEWS) */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Client Reviews & Testimonials</h3>
                <p className="text-xs text-slate-400">Manage client feedback, star ratings, and featured reviews on home page</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newTestimonial: TestimonialItem = {
                    id: 'testimonial-' + Date.now(),
                    name: 'New Client',
                    role: 'CEO / Founder',
                    company: 'Company Name',
                    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                    rating: 5,
                    review: 'Exceptional service and outstanding results. Highly recommended digital partner!',
                    featured: true,
                  };
                  setEditingTestimonial(newTestimonial);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-indigo-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Review</span>
              </button>
            </div>

            {/* Testimonials List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data.testimonials || []).map((t) => (
                <div key={t.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-900 border border-slate-700 flex-shrink-0">
                          <Image src={t.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} alt={t.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base">{t.name}</h4>
                          <p className="text-xs text-slate-400">{t.role} • <span className="text-cyan-400">{t.company}</span></p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = data.testimonials.map(item => item.id === t.id ? { ...item, featured: !item.featured } : item);
                          const newData = { ...data, testimonials: updated };
                          setData(newData);
                          handleSaveData(newData);
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                          t.featured ? 'bg-amber-950/80 text-amber-300 border-amber-700' : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        {t.featured ? '★ Featured' : '☆ Standard'}
                      </button>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                      ))}
                      <span className="text-xs font-bold text-slate-300 ml-1.5">{t.rating}.0 / 5.0</span>
                    </div>

                    <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                      &quot;{t.review}&quot;
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial({ ...t })}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-slate-800"
                      title="Edit Review"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete review from "${t.name}"?`)) {
                          const updated = data.testimonials.filter(item => item.id !== t.id);
                          const newData = { ...data, testimonials: updated };
                          setData(newData);
                          handleSaveData(newData);
                        }
                      }}
                      className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-900/60"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Edit Modal */}
            {editingTestimonial && mounted && createPortal(
              <div className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                <div className="w-full max-w-xl bg-[#0b1329] p-6 sm:p-8 rounded-3xl border border-amber-500/50 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto my-auto text-white">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-white">
                      {editingTestimonial.id.startsWith('testimonial-') ? 'Add Client Review' : 'Edit Review'}
                    </h3>
                    <button type="button" onClick={() => setEditingTestimonial(null)} className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
                        <input
                          type="text"
                          value={editingTestimonial.name}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Designation</label>
                        <input
                          type="text"
                          value={editingTestimonial.role}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm"
                          placeholder="e.g. CEO & Founder"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Brand</label>
                        <input
                          type="text"
                          value={editingTestimonial.company}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Star Rating (1 - 5)</label>
                        <select
                          value={editingTestimonial.rating}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) || 5 })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 focus:outline-none focus:border-indigo-500 text-sm font-bold"
                        >
                          <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                          <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                          <option value="3">⭐⭐⭐ (3 Stars)</option>
                          <option value="2">⭐⭐ (2 Stars)</option>
                          <option value="1">⭐ (1 Star)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Avatar Image URL</label>
                      <input
                        type="text"
                        value={editingTestimonial.avatarUrl}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatarUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Review Feedback Text</label>
                      <textarea
                        rows={4}
                        value={editingTestimonial.review}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, review: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm leading-relaxed"
                        placeholder="Write client testimony review here..."
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="featTestimonial"
                        checked={editingTestimonial.featured}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, featured: e.target.checked })}
                        className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="featTestimonial" className="text-xs font-semibold text-slate-300">
                        Show as Featured Review on Home Page
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                    <button type="button" onClick={() => setEditingTestimonial(null)} className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const existingIdx = data.testimonials.findIndex(t => t.id === editingTestimonial.id);
                        const updated = [...data.testimonials];
                        if (existingIdx >= 0) {
                          updated[existingIdx] = editingTestimonial;
                        } else {
                          updated.push(editingTestimonial);
                        }
                        const newData = { ...data, testimonials: updated };
                        setData(newData);
                        setEditingTestimonial(null);
                        handleSaveData(newData);
                      }}
                      className="px-5 py-2.5 rounded-xl gradient-bg-button text-white text-xs font-bold shadow-lg shadow-amber-600/25"
                    >
                      Save Review
                    </button>
                  </div>
                </div>
              </div>,
              document.body
            )}
          </div>
        )}

        {/* TAB 6: TEAM MEMBERS */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Agency Team Members</h3>
                <p className="text-xs text-slate-400">Manage creative leads, developers, and team profiles displayed on website</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newMember: TeamMember = {
                    id: 'team-' + Date.now(),
                    name: 'New Team Member',
                    role: 'Senior Digital Specialist',
                    bio: 'Driving innovative digital strategies and robust full-stack engineering.',
                    imageUrl: '/assets/team/placeholder.png',
                    linkedinUrl: 'https://linkedin.com',
                    githubUrl: 'https://github.com',
                  };
                  setEditingTeam(newMember);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-indigo-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add Team Member</span>
              </button>
            </div>

            {/* Team Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data.team || []).map((member) => (
                <div key={member.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 flex-shrink-0">
                        <Image src={member.imageUrl || '/assets/team/placeholder.png'} alt={member.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">{member.name}</h4>
                        <span className="text-xs font-semibold text-amber-400">{member.role}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                      {member.bio}
                    </p>

                    {(member.linkedinUrl || member.githubUrl) && (
                      <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                        {member.linkedinUrl && (
                          <Link href={member.linkedinUrl} target="_blank" className="text-cyan-400 hover:underline flex items-center gap-1">
                            <span>LinkedIn</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                        {member.githubUrl && (
                          <Link href={member.githubUrl} target="_blank" className="text-slate-300 hover:underline flex items-center gap-1">
                            <span>GitHub</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingTeam({ ...member })}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-slate-800"
                      title="Edit Member"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete team member "${member.name}"?`)) {
                          const updated = data.team.filter(m => m.id !== member.id);
                          const newData = { ...data, team: updated };
                          setData(newData);
                          handleSaveData(newData);
                        }
                      }}
                      className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-900/60"
                      title="Delete Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Member Edit Modal */}
            {editingTeam && mounted && createPortal(
              <div className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                <div className="w-full max-w-xl bg-[#0b1329] p-6 sm:p-8 rounded-3xl border border-amber-500/50 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto my-auto text-white">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-white">
                      {editingTeam.id.startsWith('team-') ? 'Add Team Member' : 'Edit Team Member'}
                    </h3>
                    <button type="button" onClick={() => setEditingTeam(null)} className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={editingTeam.name}
                          onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Job Title</label>
                        <input
                          type="text"
                          value={editingTeam.role}
                          onChange={(e) => setEditingTeam({ ...editingTeam, role: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm"
                          placeholder="e.g. Founder & Full-Stack Engineer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Member Photo Image
                      </label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                        {/* Photo Preview */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                          <Image
                            src={editingTeam.imageUrl || '/assets/team/placeholder.png'}
                            alt="Team Member Preview"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        <div className="flex-1 space-y-2 w-full">
                          <div className="flex items-center gap-2">
                            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md">
                              <Upload className="w-4 h-4" />
                              <span>{uploadingImage ? 'Uploading Image...' : 'Upload Image File'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={uploadingImage}
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  setUploadingImage(true);
                                  try {
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    formData.append('folder', 'um_digital/team');
                                    const res = await fetch('/api/upload', {
                                      method: 'POST',
                                      body: formData,
                                    });
                                    const json = await res.json();
                                    if (json.url) {
                                      setEditingTeam({ ...editingTeam, imageUrl: json.url });
                                    } else if (json.error) {
                                      alert('Upload error: ' + json.error);
                                    }
                                  } catch (err) {
                                    alert('Failed to upload image file.');
                                  } finally {
                                    setUploadingImage(false);
                                  }
                                }}
                              />
                            </label>
                          </div>

                          <input
                            type="text"
                            value={editingTeam.imageUrl}
                            onChange={(e) => setEditingTeam({ ...editingTeam, imageUrl: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 text-xs font-mono focus:outline-none"
                            placeholder="Or paste image URL here..."
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Short Bio</label>
                      <textarea
                        rows={3}
                        value={editingTeam.bio}
                        onChange={(e) => setEditingTeam({ ...editingTeam, bio: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm leading-relaxed"
                        placeholder="Brief summary of experience & specialization..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile URL</label>
                        <input
                          type="text"
                          value={editingTeam.linkedinUrl || ''}
                          onChange={(e) => setEditingTeam({ ...editingTeam, linkedinUrl: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono"
                          placeholder="https://linkedin.com/in/..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub / Portfolio URL</label>
                        <input
                          type="text"
                          value={editingTeam.githubUrl || ''}
                          onChange={(e) => setEditingTeam({ ...editingTeam, githubUrl: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono"
                          placeholder="https://github.com/..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                    <button type="button" onClick={() => setEditingTeam(null)} className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const existingIdx = data.team.findIndex(m => m.id === editingTeam.id);
                        const updated = [...data.team];
                        if (existingIdx >= 0) {
                          updated[existingIdx] = editingTeam;
                        } else {
                          updated.push(editingTeam);
                        }
                        const newData = { ...data, team: updated };
                        setData(newData);
                        setEditingTeam(null);
                        handleSaveData(newData);
                      }}
                      className="px-5 py-2.5 rounded-xl gradient-bg-button text-white text-xs font-bold shadow-lg shadow-amber-600/25"
                    >
                      Save Team Member
                    </button>
                  </div>
                </div>
              </div>,
              document.body
            )}
          </div>
        )}

        {/* TAB 7: LEADS INBOX */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Client Inquiry Leads ({data.leads.length})</h3>
            </div>

            {data.leads.length === 0 ? (
              <div className="glass-card p-12 rounded-3xl border border-slate-800 text-center text-gray-400">
                No inquiry leads submitted yet.
              </div>
            ) : (
              <div className="space-y-4">
                {data.leads.map((lead) => (
                  <div key={lead.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <h4 className="font-bold text-white text-base">{lead.name}</h4>
                        <p className="text-xs text-gray-400">{lead.email} • {lead.phone || 'No Phone'}</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <select
                          value={lead.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as 'New' | 'Contacted' | 'Closed';
                            const updatedLeads = data.leads.map((l) => (l.id === lead.id ? { ...l, status: newStatus } : l));
                            const newData = { ...data, leads: updatedLeads };
                            setData(newData);
                            handleSaveData(newData);
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900 border ${
                            lead.status === 'New' ? 'border-rose-500 text-rose-400' : lead.status === 'Contacted' ? 'border-amber-500 text-amber-400' : 'border-emerald-500 text-emerald-400'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>

                        <button
                          onClick={() => {
                            const updatedLeads = data.leads.filter((l) => l.id !== lead.id);
                            const newData = { ...data, leads: updatedLeads };
                            setData(newData);
                            handleSaveData(newData);
                          }}
                          className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-900"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                      <div><strong className="text-slate-400">Service:</strong> {lead.serviceRequested}</div>
                      <div><strong className="text-slate-400">Budget:</strong> {lead.budgetRange || 'N/A'}</div>
                      <div><strong className="text-slate-400">Date:</strong> {new Date(lead.createdAt).toLocaleString()}</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-gray-300">
                      <p className="font-semibold text-slate-400 mb-1">Client Message:</p>
                      <p className="whitespace-pre-wrap">{lead.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: CLIENTS MARQUEE */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Clients Marquee Management</h3>
              <button
                onClick={() => {
                  const newClient: ClientItem = {
                    id: 'client-' + Date.now(),
                    label: 'New Client',
                    logoUrl: '/assets/um digital logo-01.png',
                    order: data.clients.length + 1,
                  };
                  setEditingClient(newClient);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Client</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.clients.map((client) => (
                <div key={client.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden flex-shrink-0">
                      <Image src={client.logoUrl} alt={client.label} fill className="object-contain p-1" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{client.label}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5 truncate max-w-[150px]">{client.logoUrl}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingClient({ ...client })}
                      className="p-2 rounded-lg bg-slate-900 text-indigo-400 border border-slate-800"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        const updated = data.clients.filter((c) => c.id !== client.id);
                        const newData = { ...data, clients: updated };
                        setData(newData);
                        handleSaveData(newData);
                      }}
                      className="p-2 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-900/60"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Client Edit Modal */}
            {editingClient && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-md glass-card p-6 rounded-3xl border border-slate-700 space-y-6">
                  <h3 className="text-lg font-bold text-white">Edit Client</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name / Label</label>
                      <input
                        type="text"
                        value={editingClient.label}
                        onChange={(e) => setEditingClient({ ...editingClient, label: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Logo URL (e.g. /assets/logo.png)</label>
                      <input
                        type="text"
                        value={editingClient.logoUrl}
                        onChange={(e) => setEditingClient({ ...editingClient, logoUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        placeholder="/assets/um digital logo-01.png"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setEditingClient(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const existingIdx = data.clients.findIndex((c) => c.id === editingClient.id);
                        const updated = [...data.clients];
                        if (existingIdx >= 0) {
                          updated[existingIdx] = editingClient;
                        } else {
                          updated.push(editingClient);
                        }
                        const newData = { ...data, clients: updated };
                        setData(newData);
                        setEditingClient(null);
                        handleSaveData(newData);
                      }}
                      className="px-5 py-2.5 rounded-xl gradient-bg-button text-white text-xs font-semibold"
                    >
                      Save Client
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 9: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Agency Profile & Settings</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase">Agency Name</label>
                <input
                  type="text"
                  value={data.settings.agencyName}
                  onChange={(e) => setData({ ...data, settings: { ...data.settings, agencyName: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase">Tagline</label>
                <input
                  type="text"
                  value={data.settings.tagline}
                  onChange={(e) => setData({ ...data, settings: { ...data.settings, tagline: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase">Contact Email</label>
                <input
                  type="email"
                  value={data.settings.contactEmail}
                  onChange={(e) => setData({ ...data, settings: { ...data.settings, contactEmail: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase">Contact Phone / WhatsApp</label>
                <input
                  type="text"
                  value={data.settings.contactPhone}
                  onChange={(e) => setData({ ...data, settings: { ...data.settings, contactPhone: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase">Office Address</label>
                <input
                  type="text"
                  value={data.settings.address}
                  onChange={(e) => setData({ ...data, settings: { ...data.settings, address: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
            </div>

            {/* Logo Settings */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h4 className="text-lg font-bold text-white">Logo Configurations</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase">Main Logo URL</label>
                  <input
                    type="text"
                    value={data.settings.logoUrl}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, logoUrl: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase">Secondary Logo URL</label>
                  <input
                    type="text"
                    value={data.settings.logoSecondaryUrl}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, logoSecondaryUrl: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
