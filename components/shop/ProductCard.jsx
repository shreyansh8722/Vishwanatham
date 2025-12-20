import React from 'react';
import { Heart, ShoppingBag, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../hooks/useFavorites';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  if (!product) return null; 

  const displayImage = Array.isArray(product.images) ? product.images[0] : product.image;

  return (
    <div className="group relative cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-3">
        <Link to={`/product/${product.id}`}>
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        </Link>
        
        {/* NEW: "Cart +" Floating Button */}
        {/* Uses group-hover:scale-100 to animate in only on this specific card */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product, 'Standard');
          }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white text-heritage-charcoal rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-heritage-gold hover:text-white z-20"
          title="Add to Cart"
        >
          <div className="relative">
            <ShoppingBag size={18} strokeWidth={1.5} />
            <Plus size={10} strokeWidth={3} className="absolute -top-1 -right-2" />
          </div>
        </button>

        {/* Wishlist Icon */}
        <button 
          onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:text-red-500"
        >
          <Heart size={16} className={isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"} strokeWidth={1.5} />
        </button>
      </div>

      {/* Product Info */}
      <div className="text-left px-1">
        <h3 className="font-montserrat text-[11px] font-bold text-gray-800 uppercase tracking-wider truncate mb-1">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="flex items-center gap-2">
           <span className="font-cormorant text-base font-bold text-heritage-charcoal">
             ₹{product.price.toLocaleString()}
           </span>
           {product.originalPrice && (
             <span className="text-[10px] text-gray-400 line-through font-montserrat">
               ₹{product.originalPrice.toLocaleString()}
             </span>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;