import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../hooks/useFavorites'; // Assuming you have this, optional

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites ? useFavorites() : { toggleFavorite: () => {}, isFavorite: () => false };

  if (!product) return null;

  // --- Logic ---
  const mainImage = product.featuredImageUrl || (product.imageUrls && product.imageUrls[0]) || 'https://via.placeholder.com/400x500';
  const hoverImage = (product.imageUrls && product.imageUrls[1]) || mainImage;

  const price = Number(product.price) || 0;
  const comparePrice = Number(product.comparePrice) || 0;
  
  const discount = (comparePrice > price && comparePrice > 0)
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  // Mock Rating Data for "Social Proof" feel
  const rating = product.rating || 4.8; 
  const reviews = product.reviewCount || 42;

  return (
    <div className="group relative flex flex-col h-full">
      
      {/* 1. IMAGE CONTAINER (4:5 Aspect Ratio for Premium Feel) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-heritage-sand transition-all duration-500 hover:shadow-xl">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {/* Main Image */}
          <img
            src={mainImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Hover Image (Fade In) */}
          <img
            src={hoverImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* --- BADGES --- */}
        {/* Discount Tag (Top Left) */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 z-10">
             <div className="bg-[#D32F2F] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm tracking-wide">
                 -{discount}%
             </div>
          </div>
        )}

        {/* Best Seller / New Badge (Optional - based on logic) */}
        {product.isBestSeller && (
          <div className="absolute top-2 right-2 z-10">
             <div className="bg-heritage-gold text-white text-[9px] font-bold px-2 py-1 rounded shadow-sm tracking-widest uppercase">
                 Best Seller
             </div>
          </div>
        )}

        {/* --- ACTIONS --- */}
        {/* Quick Add Button (Floating Bottom Right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white text-heritage-charcoal rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-heritage-rudraksha hover:text-white z-20"
          title="Quick Add"
        >
           <Plus size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* 2. PRODUCT INFO */}
      <div className="mt-3 flex flex-col gap-1 px-1">
        
        {/* Rating Row */}
        <div className="flex items-center gap-1.5">
           <div className="flex gap-0.5 text-heritage-gold">
             {[...Array(5)].map((_, i) => (
               <Star 
                 key={i} 
                 size={12} 
                 fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                 strokeWidth={i < Math.floor(rating) ? 0 : 1.5} 
                 className={i < Math.floor(rating) ? "" : "text-gray-300"}
               />
             ))}
           </div>
           <span className="text-[10px] text-heritage-grey font-medium opacity-80">({reviews})</span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-[15px] font-semibold text-heritage-charcoal leading-snug line-clamp-2 group-hover:text-heritage-rudraksha transition-colors cursor-pointer">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-0.5">
             <span className="text-[16px] font-bold text-heritage-charcoal font-body">
              ₹{price.toLocaleString()}
            </span>
            {comparePrice > price && (
              <span className="text-[12px] text-heritage-grey line-through font-body opacity-70">
                  ₹{comparePrice.toLocaleString()}
              </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;