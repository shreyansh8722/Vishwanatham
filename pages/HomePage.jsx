import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/home/Hero';
import { CategoryRow } from '../components/home/CategoryRow'; 
import { NewArrivals } from '../components/home/NewArrivals';
import { EducationSection } from '../components/home/EducationSection';

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Vishwanatham | Authentic Spiritual Heritage of Kashi" 
        description="Buy original Rudraksha, Gemstones, and Yantras energized in Kashi."
      />

      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. CATEGORIES */}
      <CategoryRow />

      {/* 3. NEW ARRIVALS */}
      <NewArrivals />

      {/* 4. VISUAL BANNER */}
      <section className="py-12 md:py-16 px-4 border-b border-gray-50">
        <div className="container mx-auto">
          <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-sm group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1600" 
              alt="Premium Collection" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
               <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4">Limited Edition</span>
               <h2 className="font-cormorant text-4xl md:text-6xl mb-8">The Temple Collection</h2>
               <button className="bg-white text-heritage-charcoal px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-heritage-gold hover:text-white transition-colors">
                 Explore Now
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDUCATION / WHY WEAR */}
      <EducationSection />
      
    </div>
  );
};

export default HomePage;