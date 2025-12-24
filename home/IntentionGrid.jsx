import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Zap, Banknote, Shield, Brain, ArrowUpRight } from 'lucide-react';

export const IntentionGrid = () => {
  const navigate = useNavigate();

  const intentions = [
    { 
      id: 'peace', 
      label: 'Find Mental Peace', 
      icon: <Sparkles size={18} />, 
      desc: 'Calm the chaos within',
      // Calm, meditation, peaceful vibe
      image: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=1769&auto=format&fit=crop'
    },
    { 
      id: 'wealth', 
      label: 'Attract Wealth', 
      icon: <Banknote size={18} />, 
      desc: 'Unlock abundance',
      // Luxury, success, focus
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop' 
    },
    { 
      id: 'love', 
      label: 'Invite Love', 
      icon: <Heart size={18} />, 
      desc: 'Harmonize relationships',
      // Couple, warmth, connection
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1887&auto=format&fit=crop'
    },
    { 
      id: 'protection', 
      label: 'Divine Protection', 
      icon: <Shield size={18} />, 
      desc: 'Shield against negativity',
      // Safe, shielded, dark tone
      image: 'https://images.unsplash.com/photo-1518134346374-184f9d21cb83?q=80&w=1770&auto=format&fit=crop'
    },
    { 
      id: 'focus', 
      label: 'Boost Focus', 
      icon: <Brain size={18} />, 
      desc: 'Clarity for success',
      // Study, concentration
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      id: 'health', 
      label: 'Restore Vitality', 
      icon: <Zap size={18} />, 
      desc: 'Energy for the body',
      // Active, healthy, sun
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop'
    },
  ];

  return (
    // MINIMALIST BG: White
    <section className="py-24 px-4 md:px-8 bg-white">
      
      {/* Header */}
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fade-up">
          <div>
            <span className="text-heritage-terracotta font-bold tracking-[0.2em] uppercase text-xs font-manrope block mb-3">
              Shop by Intention
            </span>
            <h2 className="font-cinzel text-3xl md:text-5xl text-heritage-charcoal font-bold">
              What do you seek?
            </h2>
          </div>
          <p className="max-w-md text-heritage-grey text-sm md:text-base leading-relaxed">
            Every bead has a purpose. Select your goal, and let us guide you to the right spiritual tool.
          </p>
        </div>

        {/* Cinematic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {intentions.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => navigate(`/shop?intention=${item.id}`)}
              className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Background Image */}
              <img 
                src={item.image} 
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 scale-100 group-hover:scale-110"
              />
              
              {/* Gradient Overlay (Black to Transparent) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              {/* Hover Tint (Saffron) */}
              <div className="absolute inset-0 bg-heritage-terracotta/0 group-hover:bg-heritage-terracotta/20 mix-blend-overlay transition-colors duration-500"></div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                
                {/* Text Content */}
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-heritage-gold text-heritage-charcoal">
                      {item.icon}
                    </div>
                    <span className="text-heritage-gold font-bold text-xs uppercase tracking-widest">
                      {item.desc}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <h3 className="font-cinzel text-2xl font-bold text-white">
                      {item.label}
                    </h3>
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0 bg-white/10 backdrop-blur-sm">
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