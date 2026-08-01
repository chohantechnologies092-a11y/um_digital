'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

export default function ContactClient({ data }: { data: any }) {
  const settings = data.settings;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-brand-orange/30 text-white flex flex-col relative overflow-hidden font-outfit">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-orange/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <Navbar settings={data.settings} />

      <main className="flex-1 relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/5 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-sm font-semibold text-brand-orange uppercase tracking-wider">Get In Touch</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white"
            >
              Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">Amazing</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Ready to scale your business? Drop us a message and our digital strategy team will get back to you within 24 hours.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-10"
            >
              <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 border border-brand-orange/20">
                    <Mail className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-1">Email Us</p>
                    <a href={`mailto:${settings.contactEmail}`} className="text-lg text-white font-medium hover:text-brand-orange transition-colors">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 border border-brand-orange/20">
                    <Phone className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-1">Call Us</p>
                    <a href={`tel:${settings.contactPhone}`} className="text-lg text-white font-medium hover:text-brand-orange transition-colors">
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 border border-brand-orange/20">
                    <MapPin className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-1">Location</p>
                    <p className="text-lg text-white font-medium">
                      {settings.address}
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px]" />
              
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
                    <Send className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                  <p className="text-gray-400">We've received your inquiry and will contact you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">First Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/50 transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Last Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/50 transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Email Address</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/50 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Service of Interest</label>
                    <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/50 transition-colors appearance-none">
                      <option value="">Select a service</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="web-dev">Web / Software Development</option>
                      <option value="design">Graphics & UI/UX</option>
                      <option value="seo">SEO Optimization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Message</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/50 transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-brand-orange to-brand-red hover:shadow-[0_0_20px_rgba(255,145,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
