import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@/lib/utils';
import { LazyImage } from '@/components/LazyImage';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

export const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...item, quantity: 1 });
  };

  return (
    <div 
      className="group cursor-pointer flex flex-col space-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${item.id}`)}
    >
      {/* IMAGE CONTAINER - Aspect Ratio 3:4 (Editorial Standard) */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50">
        
        {/* Primary Image */}
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
           <LazyImage src={item.featuredImageUrl} alt={item.name} className="w-full h-full object-cover" />
        </div>
        
        {/* Secondary (Hover) Image - Gentle Zoom */}
        <div className={`absolute inset-0 transition-all duration-1000 ease-out ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}>
           <LazyImage src={item.imageUrls?.[1] || item.featuredImageUrl} alt={item.name} className="w-full h-full object-cover" />
        </div>

        {/* --- NEW: FLOATING 'ADD TO BAG' BUTTON --- */}
        {/* Floats above the bottom edge, centered, minimalist white/black style */}
        <button
          onClick={handleAddToCart}
          className={`
            absolute bottom-6 left-1/2 -translate-x-1/2 
            bg-white text-heritage-charcoal 
            py-3 px-8 
            text-[10px] font-bold uppercase tracking-[0.2em] font-sans
            border border-transparent shadow-xl
            hover:bg-heritage-charcoal hover:text-white hover:border-heritage-charcoal
            transition-all duration-500 ease-out
            flex items-center gap-3 whitespace-nowrap
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
          `}
        >
           <ShoppingBag size={12} strokeWidth={1.5} className="mb-[1px]" />
           Add to Bag
        </button>
      </div>

      {/* METADATA - Clean & Centered */}
      <div className="text-center space-y-2">
        <h3 className="font-serif text-lg md:text-xl text-heritage-charcoal tracking-tight group-hover:text-heritage-gold transition-colors duration-300">
          {item.name}
        </h3>
        
        <div className="flex justify-center items-center gap-3 text-xs font-sans tracking-wide text-gray-500">
           <span className="uppercase font-medium">{item.subCategory}</span>
           <span className="w-0.5 h-3 bg-gray-300"></span>
           <span className="font-semibold text-heritage-charcoal">₹{formatPrice(item.price)}</span>
        </div>
      </div>
    </div>
  );
};