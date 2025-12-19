import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

export const CollectionSpotlight = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 md:py-24 px-4 md:px-12 bg-white">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        
        {/* HERO CARD - SAREE */}
        <div 
          onClick={() => navigate('/shop?cat=saree')}
          className="md:col-span-8 group relative h-[50vh] md:h-[80vh] overflow-hidden cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1610189012906-47833d772097?q=80&w=1200" 
            alt="Sarees" 
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2">The Classics</span>
            <h3 className="font-serif text-4xl md:text-6xl font-light">The Saree Edit</h3>
            <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-transparent group-hover:border-white transition-all pb-1">
              Explore <MoveRight size={14} />
            </span>
          </div>
        </div>

        {/* SIDE COLUMN */}
        <div className="md:col-span-4 flex flex-col gap-4 md:gap-8 h-auto md:h-[80vh]">
          
          <div 
            onClick={() => navigate('/shop?cat=lehenga')}
            className="group relative flex-1 overflow-hidden cursor-pointer min-h-[40vh] md:min-h-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1583391726247-e29237d8612f?auto=format&fit=crop&q=80" 
              alt="Lehengas" 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-serif text-2xl md:text-3xl font-light">Bridal</h3>
            </div>
          </div>

          <div 
            onClick={() => navigate('/shop?cat=suit')}
            className="group relative flex-1 overflow-hidden cursor-pointer min-h-[40vh] md:min-h-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1621623194266-4b3664963684?auto=format&fit=crop&q=80" 
              alt="Suits" 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-serif text-2xl md:text-3xl font-light">Unstitched Suits</h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};