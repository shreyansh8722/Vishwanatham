import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'rudraksha', label: 'Rudraksha', img: 'https://images.unsplash.com/photo-1611568285568-3d846513369a?auto=format&fit=crop&q=80&w=200' },
  { id: 'malas', label: 'Japa Malas', img: 'https://images.unsplash.com/photo-1603038930495-2c26279f6764?auto=format&fit=crop&q=80&w=200' },
  { id: 'gemstones', label: 'Gemstones', img: 'https://images.unsplash.com/photo-1590424600100-3486df5b9745?auto=format&fit=crop&q=80&w=200' },
  { id: 'idols', label: 'God Idols', img: 'https://images.unsplash.com/photo-1583391726247-e29237d8612f?auto=format&fit=crop&q=80&w=200' },
  { id: 'yantras', label: 'Yantras', img: 'https://images.unsplash.com/photo-1623151834261-24874f676239?auto=format&fit=crop&q=80&w=200' },
  { id: 'incense', label: 'Aroma', img: 'https://images.unsplash.com/photo-1602150993952-47526710b77b?auto=format&fit=crop&q=80&w=200' },
];

export const CategoryCircle = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 bg-cosmic-black border-b border-white/5">
      <div className="max-w-[1800px] mx-auto px-4">
        {/* Story Style Scroll Container */}
        <div className="flex gap-6 md:gap-10 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => navigate(`/shop?category=${cat.id}`)} 
              className="flex flex-col items-center gap-3 min-w-[80px] cursor-pointer group"
            >
              {/* Animated Ring Container */}
              <div className="relative w-20 h-20 md:w-24 md:h-24">
                {/* Rotating Golden Ring on Hover */}
                <div className="absolute inset-0 rounded-full border-2 border-vedic-gold/30 group-hover:border-vedic-gold group-hover:rotate-180 transition-all duration-700 ease-out border-dashed" />
                
                <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-cosmic-black">
                  <img 
                    src={cat.img} 
                    alt={cat.label} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
              </div>
              
              <span className="text-[11px] font-manrope font-bold uppercase tracking-wider text-white/80 group-hover:text-vedic-gold transition-colors">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCircle;