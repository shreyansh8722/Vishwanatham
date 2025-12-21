import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  // Image Logic
  const mainImage = 
    product.featuredImageUrl || 
    (product.imageUrls && product.imageUrls[0]) || 
    'https://via.placeholder.com/300';

  const hoverImage = 
    (product.imageUrls && product.imageUrls[1]) || 
    mainImage;

  const price = Number(product.price) || 0;
  const comparePrice = Number(product.comparePrice) || 0;
  
  const discount = (comparePrice > price && comparePrice > 0)
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  // Randomize stars for "Real" feel if no data (Japam style)
  const rating = product.rating || 4.8; 
  const reviews = product.reviewCount || Math.floor(Math.random() * 50) + 10;

  return (
    <div className="group relative">
      
      {/* 1. IMAGE AREA (Compact & Clean) */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#FAFAFA] mb-2.5 transition-all duration-300 group-hover:shadow-lg group-hover:ring-1 group-hover:ring-[#B08D55]/30">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={mainImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <img
            src={hoverImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:scale-110"
            loading="lazy"
          />
        </Link>

        {/* FEATURE: The "Japam Style" Sharp Tag */}
        {discount > 0 && (
          <div className="absolute top-0 left-0 z-10">
             <div className="bg-[#D32F2F] text-white text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-sm font-sans tracking-wide">
                 {discount}% OFF
             </div>
          </div>
        )}

        {/* Quick Add Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-2 right-2 w-9 h-9 bg-white text-[#2C1810] rounded-full shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-[#2C1810] hover:text-[#F2C75C] z-20"
          title="Add to Cart"
        >
           <Plus size={18} strokeWidth={2} />
        </button>
      </div>

      {/* 2. INFO AREA (With Stars!) */}
      <div className="text-left px-0.5">
        {/* Star Rating Row */}
        <div className="flex items-center gap-1 mb-1">
           <div className="flex text-[#F2C75C]">
             <Star size={10} fill="currentColor" strokeWidth={0} />
             <Star size={10} fill="currentColor" strokeWidth={0} />
             <Star size={10} fill="currentColor" strokeWidth={0} />
             <Star size={10} fill="currentColor" strokeWidth={0} />
             <Star size={10} fill="currentColor" strokeWidth={0} />
           </div>
           <span className="text-[10px] text-gray-400 font-medium">({reviews})</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-[14px] font-medium text-[#1C1917] leading-snug line-clamp-2 group-hover:text-[#B08D55] transition-colors mb-1">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
             <span className="text-[15px] font-bold text-[#2C1810] font-sans">
              ₹{price.toLocaleString()}
            </span>
            {comparePrice > price && (
            <span className="text-[11px] text-gray-400 line-through font-sans">
                ₹{comparePrice.toLocaleString()}
            </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;