import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BridalEdit = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-32 md:py-48 px-6 bg-[#1a1a1a] text-white overflow-hidden my-12">
      {/* Background Parallax approximation */}
      <div className="absolute inset-0 opacity-40">
         <img 
           src="https://images.unsplash.com/photo-1594315590298-3296052b32a1?auto=format&fit=crop&q=80&w=2000" 
           className="w-full h-full object-cover" 
           alt="Bridal Background" 
         />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <span className="inline-block px-4 py-1 border border-[#B08D55] text-[#B08D55] text-[10px] uppercase tracking-widest bg-black/30 backdrop-blur-md">
          The Wedding Trousseau
        </span>
        <h2 className="font-serif text-5xl md:text-7xl leading-tight">
          Handwoven for <br/> <span className="italic text-[#B08D55]">Forever</span>
        </h2>
        <p className="text-white/70 font-light max-w-xl mx-auto leading-relaxed">
          From the Haldi to the Reception, discover intricate Jangla weaves, rich Kadhua craftsmanship, and the regal allure of pure gold zari.
        </p>
        <button 
          onClick={() => navigate('/shop?occasion=bridal')}
          className="mt-8 bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#B08D55] hover:text-white transition-all duration-300"
        >
          Explore Bridal
        </button>
      </div>
    </section>
  );
};