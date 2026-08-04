'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Quote, Trophy, Users, Globe, Target } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

export default function AboutClient({ data }: { data: any }) {
  const profile = data.companyProfile;

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-brand-orange/30 text-white flex flex-col relative overflow-hidden font-outfit">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-orange/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <Navbar settings={data.settings} />

      <main className="flex-1 relative z-10 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header Section */}
          <div className="text-center mb-24 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/5 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-sm font-semibold text-brand-orange uppercase tracking-wider">About Our Agency</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-red to-brand-blue"
            >
              Architects of the Digital Future
            </motion.h1>
          </div>

          {/* Official Registration Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-24 relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-orange/10 rounded-full blur-[100px]"></div>
            
            <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-10 items-center shadow-2xl border border-white/10">
              <div className="flex-1 relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-bold bg-brand-orange/10 text-brand-orange border border-brand-orange/30 mb-6 shadow-[0_0_15px_rgba(255,145,0,0.2)]">
                  <ShieldCheck size={14} /> Registered Entity
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6 text-white">
                  {profile?.registeredName || 'UM Digital Agency'}
                </h2>
                <div className="prose max-w-none prose-invert">
                  <p className="text-gray-400 leading-relaxed text-lg mb-6">
                    We are officially incorporated under the Companies Act as a private company in {profile?.jurisdiction || 'our jurisdiction'}. Our commitment to transparency, legal compliance, and operational excellence begins at the foundational level. By combining high-end design with robust engineering, we deliver comprehensive digital solutions to global brands.
                  </p>
                  <ul className="text-gray-300 space-y-3 font-medium">
                    <li className="flex items-center gap-3">
                      <span className="text-brand-orange"><ShieldCheck className="w-5 h-5" /></span>
                      Company Number: <strong className="text-white ml-2">{profile?.companyNumber || '16277420'}</strong>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-brand-orange"><Globe className="w-5 h-5" /></span>
                      Jurisdiction: <strong className="text-white ml-2">{profile?.jurisdiction || 'England and Wales'}</strong>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-brand-orange"><Trophy className="w-5 h-5" /></span>
                      Incorporation Date: <strong className="text-white ml-2">{profile?.incorporationDate || '26th February 2025'}</strong>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full md:w-5/12 shrink-0 relative z-10 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-brand-blue/20 rounded-2xl blur-xl transform group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/50 backdrop-blur-sm p-4 flex items-center justify-center min-h-[300px]">
                  {profile?.certificateImage ? (
                    <div className="relative w-full h-[280px] rounded-xl overflow-hidden">
                      <Image src={profile.certificateImage} alt="Official Registration Certificate" fill className="object-contain" unoptimized />
                    </div>
                  ) : (
                    <div className="text-center">
                      <ShieldCheck className="w-24 h-24 text-brand-orange/50 mx-auto mb-4" />
                      <p className="text-gray-400 font-semibold uppercase tracking-widest text-sm">Official Certificate</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.section>

          {/* CEO Message Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-24 relative"
          >
            <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-10 items-center border border-white/10 hover:border-brand-blue/30 transition-colors">
              <Quote className="absolute top-8 right-8 text-white/5 w-32 h-32 rotate-180" />
              
              <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative z-10 bg-white/5 flex items-center justify-center">
                {profile?.ceoImage ? (
                  <Image src={profile.ceoImage} alt="Leadership" fill className="object-cover" unoptimized />
                ) : (
                  <Users className="w-20 h-20 text-gray-500" />
                )}
              </div>
              
              <div className="flex-1 relative z-10">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
                  Message from our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-red">Leadership</span>
                </h2>
                
                <div className="prose max-w-none md:prose-lg prose-invert">
                  <p className="text-gray-400 leading-relaxed whitespace-pre-wrap italic">
                    &quot;{profile?.ceoMessage || 'We believe in building digital products and campaigns that do not just look good, but deliver measurable ROI. Welcome to our unified digital agency.'}&quot;
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Leadership & Engineering Team Section */}
          {data.team && data.team.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-12"
            >
              <div className="text-center space-y-3">
                <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest">Our Talent Pool</span>
                <h2 className="text-3xl md:text-5xl font-black text-white">
                  Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-cyan-400">Team</span>
                </h2>
                <p className="text-gray-400 text-sm max-w-xl mx-auto">
                  The passionate engineers, creative directors, and growth strategists powering UM Digital Agency.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.team.map((member: any) => (
                  <div key={member.id} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition-colors">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 flex-shrink-0">
                          <Image src={member.imageUrl || '/assets/team/placeholder.png'} alt={member.name} fill className="object-cover" unoptimized />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">{member.name}</h4>
                          <p className="text-xs font-semibold text-amber-400">{member.role}</p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed bg-black/40 p-3.5 rounded-2xl border border-white/5">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

        </div>
      </main>
    </div>
  );
}
