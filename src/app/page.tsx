import React from 'react';
import { getAgencyDataAsync } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Preloader } from '@/components/ui/Preloader';
import { HeroSection } from '@/components/sections/HeroSection';
import { ClientMarquee } from '@/components/sections/ClientMarquee';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PortfolioShowcase } from '@/components/sections/PortfolioShowcase';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

export const revalidate = 0; // Ensures fresh data load on every request

export default async function HomePage() {
  const data = await getAgencyDataAsync();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Brand Logo Preloader Loading Screen */}
      <Preloader />

      {/* Navigation Header */}
      <Navbar settings={data.settings} />

      {/* Main Content Sections with Entrance Reveal Animations */}
      <main className="animate-fade-in-up">
        <HeroSection hero={data.hero} settings={data.settings} />
        <ClientMarquee clients={data.clients} />
        <ServicesGrid services={data.services} />
        <ProcessSection />
        <PortfolioShowcase portfolio={data.portfolio} />
        <TestimonialsSection testimonials={data.testimonials} />
        <TeamSection team={data.team} />
        <ContactSection services={data.services} settings={data.settings} />
      </main>

      {/* Footer */}
      <Footer settings={data.settings} services={data.services} />
    </div>
  );
}
