'use client';

import React from 'react';
import Image from 'next/image';
import { TeamMember } from '@/types';
import { Sparkles, Globe, ExternalLink, Code2 } from 'lucide-react';

interface TeamSectionProps {
  team: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ team }) => {
  return (
    <section id="team" className="py-24 relative z-10 bg-[#030712] border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-dual border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Leadership & Engineering Talent</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Meet Our Leadership & <span className="text-logo-gradient">Domain Experts</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            A battle-tested team of software engineers, performance marketers, creative directors, and video animators.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="glass-card-dual rounded-[2.5rem] overflow-hidden border border-cyan-500/20 p-7 flex flex-col items-center text-center space-y-5 group shadow-xl"
            >
              {/* Profile Avatar Ring */}
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-amber-500/60 p-1.5 group-hover:border-cyan-400 transition-colors shadow-2xl">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Name & Role */}
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-[11px] font-extrabold text-cyan-300 uppercase tracking-widest bg-slate-900 px-3.5 py-1 rounded-full border border-slate-800 inline-block">
                  {member.role}
                </p>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xs font-normal">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800 w-full justify-center text-slate-400">
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:text-amber-400 hover:border-amber-500 transition-all flex items-center gap-1.5 text-xs font-bold"
                    title="LinkedIn Profile"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {member.githubUrl && (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500 transition-all flex items-center gap-1.5 text-xs font-bold"
                    title="GitHub / Portfolio"
                  >
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>GitHub</span>
                  </a>
                )}
                <a
                  href="#contact"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:text-white hover:border-amber-500 transition-all flex items-center gap-1.5 text-xs font-bold"
                  title="Direct Contact"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>Contact</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
