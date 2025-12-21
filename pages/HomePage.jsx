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

      {/* 1. HERO SLIDESHOW */}
      <Hero />

      {/* 2. CATEGORIES */}
      <CategoryRow />

      {/* 3. LATEST COLLECTION */}
      <NewArrivals />

      {/* 4. FEATURED BANNER - "The Temple Collection" */}
      <section className="py-20 px-4 border-b border-heritage-mist bg-white">
        <div className="container mx-auto">
          <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden group cursor-pointer">
            {/* Image - Darkened for text readability */}
            <img 
              src="https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1600" 
              alt="Premium Collection" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500" />
            
            {/* Content - Heritage Luxury Style */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
               
               {/* Badge */}
               <span className="text-xs font-bold font-body tracking-[0.15em] mb-4 bg-heritage-rudraksha text-white px-4 py-1.5 uppercase backdrop-blur-md">
                 Limited Edition
               </span>
               
               {/* Heading - Serif */}
               <h2 className="font-heading text-5xl md:text-7xl mb-6 font-medium drop-shadow-xl tracking-tight">
                 The Temple Collection
               </h2>
               
               {/* Subtext */}
               <p className="font-body text-white/90 max-w-md mb-8 text-sm md:text-base font-medium">
                 Hand-selected artifacts energized in the sanctum of Kashi Vishwanath.
               </p>
               
               {/* Button - Sans Serif & Functional */}
               <button className="bg-white text-heritage-rudraksha px-10 py-3.5 text-xs font-bold font-body uppercase tracking-[0.2em] hover:bg-heritage-gold hover:text-white transition-all shadow-2xl">
                 Explore Now
               </button>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;