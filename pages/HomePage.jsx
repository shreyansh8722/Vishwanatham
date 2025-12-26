import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import BestSellers from '../components/home/BestSellers';
import Testimonials from '../components/home/Testimonials';
import FeaturedCategories from '../components/home/FeaturedCategories'; 
import SadhanaChallenge from '../components/home/SadhanaChallenge'; // Clean Version
import LiveAstrologers from '../components/home/LiveAstrologers'; // New
import PoojaBooking from '../components/home/PoojaBooking'; // New
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white min-h-screen font-body text-black">
      
      {/* 1. HERO */}
      <Hero />

      {/* 2. LIVE PULSE */}
      <div className="bg-black text-white py-3 overflow-hidden border-b border-gray-800">
         <div className="container mx-auto px-4 flex justify-between items-center text-xs font-bold tracking-widest uppercase">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse"></div>
               <span className="text-[var(--color-primary)]">Live Status:</span>
               <span>Evening Aarti Preparation</span>
            </div>
            <div className="hidden md:flex gap-6 text-gray-500">
               <span>Sunrise: 06:12 AM</span>
               <span>Moon: Vrishabha</span>
            </div>
         </div>
      </div>

      {/* 3. CATEGORIES */}
      <section className="pt-16 pb-8 container mx-auto px-4">
         <div className="flex items-end justify-between mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-black">Shop by Category</h2>
            <Link to="/shop" className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
               View All <ArrowRight size={14} />
            </Link>
         </div>
         <FeaturedCategories />
      </section>

      {/* 4. BEST SELLERS */}
      <section className="py-16 bg-white border-t border-gray-100">
         <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
               <h2 className="font-heading text-4xl font-bold text-black">Best Selling Artifacts</h2>
               <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-4 rounded-full"></div>
            </div>
            <BestSellers />
         </div>
      </section>

      {/* 5. FRESHLY CONSECRATED */}
      <section className="py-16 container mx-auto px-4 bg-gray-50/50">
         <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div>
               <h2 className="font-heading text-3xl font-bold text-black">Freshly Consecrated</h2>
               <p className="text-gray-500 mt-2 text-sm">New energy tools, just arrived from the Ghats.</p>
            </div>
            <Link to="/shop?sort=new">
               <button className="px-8 py-3 border border-black text-black font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                  View New Arrivals
               </button>
            </Link>
         </div>
         <BestSellers /> 
      </section>

      {/* 6. LIVE ASTROLOGERS (New) */}
      <LiveAstrologers />

      {/* 7. POOJA BOOKING (New) */}
      <PoojaBooking />

      {/* 8. SADHANA CHALLENGE (Updated) */}
      <SadhanaChallenge />

      {/* 9. SOCIAL PROOF */}
      <Testimonials />

    </div>
  );
};

export default Home;