import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteAssets } from '@/hooks/useSiteAssets';

export const FeaturedCollection = () => {
  const navigate = useNavigate();
  const { getAsset } = useSiteAssets();

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden my-16">
      {/* Background Image Dynamic Fetch */}
      <img 
        src={getAsset('feat_collection')} 
        alt="Featured Collection" 
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Content Box */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="bg-white/95 backdrop-blur-md p-12 md:p-20 max-w-3xl border border-white shadow-2xl">
          <span className="text-heritage-gold text-sm font-bold uppercase tracking-[0.25em] mb-6 block">
            Autumn Winter 2025
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-heritage-charcoal mb-8 italic">
            The Kashi Edit
          </h2>
          <p className="font-sans text-gray-600 text-lg leading-relaxed mb-10 font-light max-w-xl mx-auto">
            An ode to the timeless city. Featuring classic Kadhua weaves, Jangla patterns, and the rich heritage of Banaras reimagined for the modern muse.
          </p>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-heritage-charcoal text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-heritage-gold transition-all duration-300"
          >
            View The Collection
          </button>
        </div>
      </div>
    </section>
  );
};