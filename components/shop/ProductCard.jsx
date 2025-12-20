import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../hooks/useFavorites';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  if (!product || !product.images || product.images.length === 0) return null; 

  const img1 = product.images[0];
  const img2 = product.images.length > 1 ? product.images[1] : product.images[0];

  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      
      {/* Image Area - Instant Hover Switch */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
          <img
            src={img1}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <img
            src={img2}
            alt={product.name + ' view 2'}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100"
          />
        </Link>
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:text-red-600 transition-colors z-10"
        >
          <Heart size={18} className={isFavorite(product.id) ? "fill-red-600 text-red-600" : "text-gray-400"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="font-cinzel text-[15px] font-semibold text-black leading-tight line-clamp-2 group-hover:text-heritage-rudraksha transition-colors">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Price & Rating Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
             {/* Rating */}
            <div className="flex items-center gap-1 mb-1">
                <Star size={12} className="fill-heritage-gold text-heritage-gold" />
                <span className="text-xs font-medium text-gray-500">{product.rating || '4.9'}</span>
            </div>
            {/* Price - Dark Coffee */}
            <div className="flex items-center gap-2">
                 <span className="text-lg font-bold text-heritage-rudraksha font-cinzel">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through font-medium">
                    ₹{product.originalPrice.toLocaleString()}
                </span>
                )}
            </div>
           
          </div>
          
          {/* Add Button - Dark Coffee Default */}
          <button 
            onClick={() => addToCart(product)}
            className="bg-heritage-rudraksha text-white px-4 py-2 rounded text-sm font-semibold hover:bg-heritage-saffron transition-colors shadow-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;