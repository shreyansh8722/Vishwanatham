import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Zap, Banknote, Shield, Brain } from 'lucide-react';

export const IntentionGrid = () => {
  const navigate = useNavigate();

  const intentions = [
    { id: 'wealth', label: 'Attract Wealth', icon: <Banknote size={24} />, color: 'text-green-400', desc: 'Citrine & Kuber Yantras' },
    { id: 'love', label: 'Love & Harmony', icon: <Heart size={24} />, color: 'text-pink-400', desc: 'Rose Quartz & Gauri Shankar' },
    { id: 'peace', label: 'Mental Peace', icon: <Sparkles size={24} />, color: 'text-blue-300', desc: '5 Mukhi & Amethyst' },
    { id: 'protection', label: 'Evil Eye Protection', icon: <Shield size={24} />, color: 'text-red-400', desc: 'Black Tourmaline & Baglamukhi' },
    { id: 'focus', label: 'Exam Focus', icon: <Brain size={24} />, color: 'text-yellow-400', desc: 'Saraswati Yantra & Fluorite' },
    { id: 'health', label: 'Vitality', icon: <Zap size={24} />, color: 'text-orange-400', desc: 'Sunstone & Surya Yantra' },
  ];

  return (
    <section className="py-20 px-6 bg-ash-grey">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <span className="text-vedic-gold font-bold tracking-[0.3em] uppercase text-xs">Shop by Sankalpa</span>
          <h2 className="text-3xl md:text-5xl text-white">What do you seek?</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {intentions.map((item) => (
            <div 
              key={item.id}
              onClick={() => navigate(`/shop?intention=${item.id}`)}
              className="group relative h-40 md:h-48 glass-card rounded-sm p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/5 transition-all duration-300 overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-vedic-gold/0 to-vedic-gold/0 group-hover:to-vedic-gold/10 transition-all duration-500" />
              
              <div className={`p-3 rounded-full bg-black/40 ${item.color} group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/10 group-hover:ring-vedic-gold/50`}>
                {item.icon}
              </div>
              
              <div className="text-center relative z-10">
                <h3 className="font-cinzel text-lg md:text-xl text-white group-hover:text-vedic-gold transition-colors">{item.label}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntentionGrid;