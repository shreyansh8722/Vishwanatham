import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { SEO } from '@/components/SEO';

// --- CORE COMPONENTS ---
import { Hero } from '@/components/home/Hero'; // Hardcoded (Fast)
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { NewArrivals } from '@/components/home/NewArrivals';
import { BridalEdit } from '@/components/home/BridalEdit';
import { TestimonialSlider } from '@/components/home/TestimonialSlider';

// --- DYNAMIC COMPONENTS ---
import { Spotlight } from '@/components/home/Spotlight';
import { MuseSection } from '@/components/home/MuseSection';
import { CraftSection } from '@/components/home/CraftSection';
import { FabricEdit } from '@/components/home/FabricEdit'; 

// --- HOOK ---
import { useStorefront } from '@/hooks/useStorefront';

export default function HomePage() {
  // Fetch Admin Data (Dynamic)
  const { spotlight, muse, fabrics } = useStorefront();

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#B08D55] selection:text-white">
      <SEO title="Pehnawa Banaras" description="Luxury Handloom" />
      <Navbar />
      
      <main className="overflow-x-hidden">
        {/* 1. Hero (Hardcoded for Speed) */}
        <Hero />

        {/* 2. Categories */}
        <CategoryGrid />

        {/* 3. New Arrivals */}
        <NewArrivals />

        {/* 4. Spotlight (Dynamic via Admin) */}
        <Spotlight data={spotlight} align="right" />

        {/* 5. Fabric Edit (Dynamic Images) */}
        <FabricEdit images={fabrics} />

        {/* 6. Bridal */}
        <BridalEdit />

        {/* 7. Muse (Dynamic Images) */}
        <MuseSection images={muse} />

        {/* 8. Trust Signals */}
        <CraftSection />
        
        {/* 9. Reviews */}
        <div className="mb-20">
           <TestimonialSlider />
        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}