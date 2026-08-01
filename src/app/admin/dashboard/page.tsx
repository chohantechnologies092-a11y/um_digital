'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<AgencyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'hero' | 'services' | 'portfolio' | 'testimonials' | 'team' | 'leads' | 'clients' | 'settings'>('overview');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Service Edit State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioProject | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);

  useEffect(() => {
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
      const res = await fetch('/api/data');
      if (res.ok) {
        const json = await res.json();
        setData(json);
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
        setData(result.data);
        setSaveStatus('Changes saved successfully to database!');
        setTimeout(() => setSaveStatus(null), 4000);
      } else {
        setSaveStatus('Error saving changes: ' + result.error);
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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="text-sm text-gray-400">Loading UM Digital Admin CMS...</p>
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
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Agency Services List</h3>
              <button
                onClick={() => {
                  const newServ: ServiceItem = {
                    id: 'service-' + Date.now(),
                    slug: 'new-service-' + Date.now(),
                    title: 'New Custom Service',
                    shortDesc: 'Short description of new service',
                    fullDesc: 'Full comprehensive service description',
                    icon: 'Sparkles',
                    features: ['Feature 1', 'Feature 2'],
                    active: true,
                    order: data.services.length + 1,
                  };
                  setEditingService(newServ);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            {/* List Table */}
            <div className="grid grid-cols-1 gap-4">
              {data.services.map((service, index) => (
                <div key={service.id} className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400">
                      <DynamicIcon name={service.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base">{service.title}</h4>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${service.active ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'}`}>
                          {service.active ? 'Active' : 'Hidden'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 max-w-xl">{service.shortDesc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                      onClick={() => setEditingService({ ...service })}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-slate-800"
                      title="Edit Service"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        const updated = data.services.filter((s) => s.id !== service.id);
                        const newData = { ...data, services: updated };
                        setData(newData);
                        handleSaveData(newData);
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

            {/* Service Modal Form */}
            {editingService && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-2xl glass-card p-6 sm:p-8 rounded-3xl border border-slate-700 max-h-[90vh] overflow-y-auto space-y-6">
                  <h3 className="text-xl font-bold text-white">Edit Service</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                        <input
                          type="text"
                          value={editingService.title}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug (e.g. digital-marketing)</label>
                        <input
                          type="text"
                          value={editingService.slug}
                          onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Lucide Icon Name (e.g. TrendingUp, Search, Code2)</label>
                        <input
                          type="text"
                          value={editingService.icon}
                          onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                        <select
                          value={editingService.active ? 'true' : 'false'}
                          onChange={(e) => setEditingService({ ...editingService, active: e.target.value === 'true' })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                        >
                          <option value="true">Active (Visible)</option>
                          <option value="false">Hidden</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description (Card summary)</label>
                      <textarea
                        rows={2}
                        value={editingService.shortDesc}
                        onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Full Description</label>
                      <textarea
                        rows={4}
                        value={editingService.fullDesc}
                        onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Capabilities (Comma Separated)</label>
                      <input
                        type="text"
                        value={editingService.features?.join(', ')}
                        onChange={(e) => setEditingService({ ...editingService, features: e.target.value.split(',').map((s) => s.trim()) })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setEditingService(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const existingIdx = data.services.findIndex((s) => s.id === editingService.id);
                        let updated = [...data.services];
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
                      className="px-5 py-2.5 rounded-xl gradient-bg-button text-white text-xs font-semibold"
                    >
                      Save Service
                    </button>
                  </div>
                </div>
              </div>
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
                        let updated = [...data.portfolio];
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
                        let updated = [...data.clients];
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
