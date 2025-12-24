import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const mainImage = product.featuredImageUrl || 'https://via.placeholder.com/400';
  const price = Number(product.price) || 0;
  const comparePrice = Number(product.comparePrice) || 0;
  const savings = comparePrice > price ? comparePrice - price : 0;
  
  // Rating Logic (Social Proof Saturation) [cite: 321]
  const rating = product.rating || 4.9; 
  const reviews = product.reviewCount || 1240;

  return (
    <div className="group relative flex flex-col h-full bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      
      {/* 1. IMAGE: Strictly 1:1 Square  */}
      <div className="relative aspect-square w-full overflow-hidden bg-heritage-sand">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges [cite: 421-423] */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isBestSeller && (
            <span className="bg-heritage-saffron text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
              Best Seller
            </span>
          )}
          {savings > 0 && (
            <span className="bg-heritage-crimson text-white text-[10px] font-bold px-2 py-1">
              50% OFF
            </span>
          )}
        </div>

        {/* 2. HYBRID ACTION BUTTONS (Reveal on Hover)  */}
        <div className="absolute bottom-0 left-0 w-full flex translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
            <button 
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="w-1/2 bg-white text-black border-t border-r border-gray-200 py-3 text-xs font-bold uppercase hover:bg-gray-50"
            >
              Add to Cart
            </button>
            <button 
              className="w-1/2 bg-heritage-crimson text-white py-3 text-xs font-bold uppercase hover:bg-red-800"
            >
              Buy Now
            </button>
        </div>
      </div>

      {/* 3. INFO CONTAINER [cite: 424] */}
      <div className="p-3 flex flex-col gap-1">
        {/* Title: Playfair Display [cite: 425] */}
        <h3 className="font-heading text-[16px] font-bold text-heritage-ebony leading-tight line-clamp-2 min-h-[40px]">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>

        {/* Social Proof [cite: 426] */}
        <div className="flex items-center gap-1">
           <div className="flex text-[#FFC107]">
             {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" strokeWidth={0} />)}
           </div>
           <span className="text-[11px] text-gray-500">({reviews})</span>
        </div>

        {/* Price Block [cite: 427-429] */}
        <div className="flex items-baseline gap-2 mt-1">
             <span className="text-lg font-bold text-black font-body">₹{price.toLocaleString()}</span>
             {comparePrice > price && (
               <>
                <span className="text-sm text-gray-400 line-through font-body">₹{comparePrice.toLocaleString()}</span>
                <span className="text-xs text-green-700 font-medium">Save ₹{savings.toLocaleString()}</span>
               </>
             )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;