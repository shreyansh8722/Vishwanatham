import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/home/Hero';
import { CategoryRow } from '../components/home/CategoryRow'; 
import { NewArrivals } from '../components/home/NewArrivals';

const HomePage = () => {
  return (
    <div className="bg-heritage-paper min-h-screen">
      <SEO 
        title="Vishwanatham | Authentic Spiritual Heritage of Kashi" 
        description="Buy original Rudraksha, Gemstones, and Yantras energized in Kashi."
      />

      {/* 1. HERO SLIDESHOW (Dark Coffee & Gold Theme) */}
      <Hero />

      {/* 2. CATEGORIES (Quick Navigation) */}
      <CategoryRow />

      {/* 3. LATEST COLLECTION (Product Cards Only) */}
      <NewArrivals />

      {/* 4. FEATURED BANNER (Minimalist & Aesthetic) */}
      <section className="py-16 px-4 border-b border-heritage-mist">
        <div className="container mx-auto">
          <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-lg group cursor-pointer">
            {/* Image */}
            <img 
              src="https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1600" 
              alt="Premium Collection" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
            
            {/* Content - No Caps, Dark Coffee Theme */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
               <span className="text-sm font-medium mb-4 bg-heritage-rudraksha/90 px-4 py-1 rounded text-white backdrop-blur-sm">
                 Limited edition
               </span>
               
               <h2 className="font-cinzel text-4xl md:text-6xl mb-8 font-bold drop-shadow-lg">
                 The temple collection
               </h2>
               
               <button className="bg-white text-heritage-rudraksha px-8 py-3 text-sm font-bold rounded hover:bg-heritage-saffron hover:text-white transition-all shadow-xl">
                 Explore now
               </button>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;