import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Zap, Banknote, Shield, Brain, ArrowRight } from 'lucide-react';

export const IntentionGrid = () => {
  const navigate = useNavigate();

  const intentions = [
    { id: 'wealth', label: 'Wealth & Prosperity', icon: <Banknote size={24} />, desc: 'Citrine, Kuber Yantras' },
    { id: 'love', label: 'Love & Harmony', icon: <Heart size={24} />, desc: 'Rose Quartz, Gauri Shankar' },
    { id: 'peace', label: 'Mental Peace', icon: <Sparkles size={24} />, desc: '5 Mukhi, Amethyst' },
    { id: 'protection', label: 'Protection', icon: <Shield size={24} />, desc: 'Black Tourmaline, Baglamukhi' },
    { id: 'focus', label: 'Wisdom & Focus', icon: <Brain size={24} />, desc: 'Saraswati Yantra, Fluorite' },
    { id: 'health', label: 'Health & Vitality', icon: <Zap size={24} />, desc: 'Sunstone, Surya Yantra' },
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-heritage-sand">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <span className="text-heritage-rudraksha font-bold tracking-[0.2em] uppercase text-xs font-manrope block mb-3">
            Shop by Sankalpa
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl text-heritage-charcoal font-medium">
            What do you seek?
          </h2>
          <div className="w-24 h-0.5 bg-heritage-rudraksha/20 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {intentions.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => navigate(`/shop?intention=${item.id}`)}
              className="group bg-white rounded-xl p-8 border border-heritage-mist hover:border-heritage-rudraksha/30 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3.5 rounded-full bg-heritage-sand text-heritage-rudraksha group-hover:bg-heritage-rudraksha group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-heritage-mist group-hover:text-heritage-rudraksha group-hover:translate-x-1 transition-all" />
              </div>
              
              <h3 className="font-cinzel text-xl font-bold text-heritage-charcoal group-hover:text-heritage-rudraksha transition-colors mb-2">
                {item.label}
              </h3>
              
              <p className="font-manrope text-sm text-heritage-grey group-hover:text-heritage-charcoal/80">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default IntentionGrid;