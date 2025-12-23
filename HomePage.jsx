import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scroll, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import Hero from '../components/home/Hero';
import { CategoryRow } from '../components/home/CategoryRow'; 
import ProductCard from '../components/shop/ProductCard';
import { useProducts } from '../context/ProductContext';
import IntentionGrid from '../components/home/IntentionGrid';
import TestimonialSlider from '../components/home/TestimonialSlider';

// --- NEW COMPONENTS ---
import Narrative from '../components/home/Narrative';
import SadhanaChallenge from '../components/home/SadhanaChallenge';
import RitualShowcase from '../components/home/RitualShowcase';

const HomePage = () => {
  const { products, loading } = useProducts();
  const newArrivals = products.slice(0, 4);

  return (
    <div className="bg-heritage-paper min-h-screen font-manrope text-heritage-charcoal">
      <SEO 
        title="Vishwanatham | Authentic Spiritual Heritage of Kashi" 
        description="Buy original Rudraksha, Gemstones, and Yantras energized in Kashi."
      />

      {/* 1. HERO */}
      <Hero />

      {/* 2. THE SUKOON NARRATIVE (Connecting Emotionally) */}
      <Narrative />

      {/* 3. CATEGORIES */}
      <CategoryRow />

      {/* 4. NEW ARRIVALS */}
      <section className="py-20 container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 animate-fade-up">
          <div>
            <span className="text-heritage-terracotta text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
              Fresh from Varanasi
            </span>
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-heritage-charcoal">
              New Arrivals
            </h2>
          </div>
          <Link 
            to="/shop" 
            className="group flex items-center gap-2 text-sm font-bold text-heritage-terracotta hover:text-heritage-rudraksha transition-colors pb-1 border-b border-transparent hover:border-heritage-rudraksha"
          >
            View All Artifacts 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
           <div className="flex justify-center py-20">
             <Loader2 className="animate-spin text-heritage-terracotta" size={40} />
           </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {newArrivals.length > 0 ? (
              newArrivals.map((product) => (
                <div key={product.id} className="animate-fade-up">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-heritage-sand rounded-xl border border-dashed border-heritage-mist">
                <p className="text-heritage-grey font-cinzel">New spiritual treasures are arriving soon...</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 5. 21-DAY CHALLENGE (Engagement) */}
      <SadhanaChallenge />

      {/* 6. INTENTION GRID (Guidance) */}
      <IntentionGrid />

      {/* 7. RITUAL SHOWCASE (Trust) */}
      <RitualShowcase />

      {/* 8. TESTIMONIALS (Social Proof) */}
      <TestimonialSlider />

      {/* 9. NEWSLETTER */}
      <section className="py-20 bg-heritage-paper border-t border-heritage-mist">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <span className="inline-block p-3 rounded-full bg-heritage-sand text-heritage-terracotta mb-6 shadow-sm border border-heritage-mist">
            <Scroll size={24} />
          </span>
          <h2 className="font-cinzel text-3xl font-bold text-heritage-charcoal mb-4">
            Join the Spiritual Journey
          </h2>
          <p className="text-heritage-grey mb-8 font-manrope">
            Subscribe to receive insights on Vedic astrology, auspicious dates, and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 border border-heritage-mist rounded-lg focus:outline-none focus:border-heritage-gold bg-white placeholder:text-gray-400"
            />
            <button className="px-6 py-3 bg-heritage-terracotta text-white font-bold rounded-lg hover:bg-heritage-rudraksha transition-colors shadow-lg uppercase text-xs tracking-wider">
              Subscribe
            </button>
          </form>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;