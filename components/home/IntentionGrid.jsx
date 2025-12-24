import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Zap, Banknote, Shield, Star, ArrowUpRight } from 'lucide-react';

export const IntentionGrid = () => {
  const navigate = useNavigate();

  // [cite: 906-909]
  const intentions = [
    { 
      id: 'wealth', 
      label: 'Money & Wealth', 
      icon: <Banknote size={18} />, 
      desc: 'Unlock Abundance',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop' 
    },
    { 
      id: 'love', 
      label: 'Love & Marriage', 
      icon: <Heart size={18} />, 
      desc: 'Harmonize Relationships',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1887&auto=format&fit=crop'
    },
    { 
      id: 'rashi', 
      label: 'Shop by Rashi', 
      icon: <Star size={18} />, 
      desc: 'Zodiac Remedies',
      image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?q=80&w=2071&auto=format&fit=crop'
    },
    { 
      id: 'protection', 
      label: 'Protection', 
      icon: <Shield size={18} />, 
      desc: 'Shield Aura',
      image: 'https://images.unsplash.com/photo-1518134346374-184f9d21cb83?q=80&w=1770&auto=format&fit=crop'
    },
    { 
      id: 'peace', 
      label: 'Mental Peace', 
      icon: <Sparkles size={18} />, 
      desc: 'Calm the Mind',
      image: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=1769&auto=format&fit=crop'
    },
    { 
      id: 'health', 
      label: 'Health & Vitality', 
      icon: <Zap size={18} />, 
      desc: 'Restore Energy',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop'
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fade-up">
          <div>
            <span className="text-heritage-rudraksha font-bold tracking-[0.2em] uppercase text-xs font-manrope block mb-3">
              Intent-First Navigation
            </span>
            <h2 className="font-heading text-3xl md:text-5xl text-heritage-charcoal font-bold">
              What do you seek?
            </h2>
          </div>
          <p className="max-w-md text-gray-500 text-sm md:text-base leading-relaxed font-body">
            Divine Hindu's logic: You know your problem, we provide the tool. Select your intent to find your remedy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {intentions.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => navigate(`/shop?intention=${item.id}`)}
              className="group relative h-[400px] rounded-sm overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={item.image} 
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-heritage-saffron text-heritage-charcoal">
                      {item.icon}
                    </div>
                    <span className="text-heritage-saffron font-bold text-xs uppercase tracking-widest">
                      {item.desc}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <h3 className="font-heading text-2xl font-bold text-white tracking-wide">
                      {item.label}
                    </h3>
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all bg-white/10 backdrop-blur-sm">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntentionGrid;