import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import BestSellers from '../components/home/BestSellers';
import Testimonials from '../components/home/Testimonials';
import RitualShowcase from '../components/home/RitualShowcase'; 
import SadhanaChallenge from '../components/home/SadhanaChallenge'; 
import { Sparkles, Moon, Sun } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-heritage-parchment min-h-screen font-body">
      
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. DAILY PANCHANG / HOROSCOPE */}
      <section className="py-10 border-b border-heritage-mist bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-heritage-parchment rounded-full flex items-center justify-center border border-heritage-olive/30">
                 <Sun size={24} className="text-heritage-olive" />
              </div>
              <div>
                 <h3 className="font-heading font-bold text-heritage-charcoal text-lg">Daily Panchang</h3>
                 <p className="text-xs text-heritage-grey">Sunrise: 06:12 AM • Rahu Kaal: 10:30 AM</p>
              </div>
           </div>
           
           <div className="h-8 w-[1px] bg-heritage-mist hidden md:block"></div>

           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-heritage-parchment rounded-full flex items-center justify-center border border-heritage-rudraksha/20">
                 <Moon size={24} className="text-heritage-rudraksha" />
              </div>
              <div>
                 <h3 className="font-heading font-bold text-heritage-charcoal text-lg">Today's Horoscope</h3>
                 <p className="text-xs text-heritage-grey">Moon in Vrishabha • Good for travel</p>
              </div>
           </div>

           <button className="text-xs font-bold uppercase tracking-widest text-heritage-rudraksha border-b border-heritage-rudraksha pb-1 hover:text-heritage-crimson transition-colors">
             Read Full Forecast
           </button>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-heritage-rudraksha font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2">
            <Sparkles size={14} /> Sacred Collections
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-heritage-charcoal mt-3">
            Treasures of Kashi
          </h2>
          <p className="text-heritage-grey mt-4 max-w-2xl mx-auto">
            Hand-selected spiritual tools to align your energy and bring prosperity.
          </p>
        </div>
        <FeaturedCategories />
      </section>

      {/* 4. BEST SELLERS */}
      <BestSellers />

      {/* 5. RITUAL SHOWCASE (Pran Pratistha) - MOVED HERE */}
      <RitualShowcase />

      {/* 6. SADHANA CHALLENGE */}
      <SadhanaChallenge />

      {/* 7. WHY CHOOSE US (Detailed Trust) */}
      <section className="py-20 bg-heritage-olive/5 border-y border-heritage-olive/10">
         <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-heritage-charcoal mb-12">The Vishwanatham Promise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-6 bg-white rounded-xl shadow-sm border border-heritage-mist">
                  <h4 className="font-heading font-bold text-xl mb-3 text-heritage-olive">Vedic Authenticity</h4>
                  <p className="text-sm text-heritage-grey leading-relaxed">Every Rudraksha is X-ray tested and every Gemstone is lab certified. We sell only what is written in the Shastras.</p>
               </div>
               <div className="p-6 bg-white rounded-xl shadow-sm border border-heritage-mist">
                  <h4 className="font-heading font-bold text-xl mb-3 text-heritage-olive">Energized in Kashi</h4>
                  <p className="text-sm text-heritage-grey leading-relaxed">Located in the heart of Varanasi, our Pandits perform Pran Pratistha on every item before dispatch.</p>
               </div>
               <div className="p-6 bg-white rounded-xl shadow-sm border border-heritage-mist">
                  <h4 className="font-heading font-bold text-xl mb-3 text-heritage-olive">Karma-Free Shipping</h4>
                  <p className="text-sm text-heritage-grey leading-relaxed">Secure, tamper-proof packaging ensures your spiritual tools reach you with their energy intact.</p>
               </div>
            </div>
         </div>
      </section>

      {/* 8. SOCIAL PROOF */}
      <Testimonials />

    </div>
  );
};

export default Home;