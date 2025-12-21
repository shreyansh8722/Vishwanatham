import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // 1. SAFETY CHECK
  if (!product) return null;

  // 2. IMAGE LOGIC
  const mainImage = 
    product.featuredImageUrl || 
    (product.imageUrls && product.imageUrls[0]) || 
    (product.images && product.images[0]) || 
    'https://via.placeholder.com/300';

  const hoverImage = 
    (product.imageUrls && product.imageUrls[1]) || 
    (product.images && product.images[1]) || 
    mainImage;

  // 3. PRICE SAFETY
  const price = Number(product.price) || 0;
  const comparePrice = Number(product.comparePrice) || 0;

  // 4. DISCOUNT CALCULATION
  const discount = comparePrice > price
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
      
      {/* Image Area - Reduced Height (aspect-4/5) */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#FAFAFA]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {/* Main Image */}
          <img
            src={mainImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ease-out group-hover:opacity-0"
            loading="lazy"
          />
          {/* Hover Image (Swap) */}
          <img
            src={hoverImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100"
            loading="lazy"
          />
        </Link>

        {/* --- BADGES (Increased Size) --- */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
            {discount > 0 && (
                <span className="bg-[#ea580c] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-sm font-cinzel">
                    {discount}% OFF
                </span>
            )}
        </div>

        {/* "Add to Cart" Icon Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-2.5 right-2.5 p-2.5 bg-[#2C1810] text-white rounded-full shadow-md translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20 flex items-center justify-center hover:bg-[#F2C75C] hover:text-[#2C1810] border border-[#2C1810]"
          title="Add to Cart"
        >
          <div className="relative flex items-center justify-center">
            <ShoppingBag size={16} />
            <Plus size={10} className="absolute -top-1 -right-1" strokeWidth={3} />
          </div>
        </button>
      </div>

      {/* Content - Increased Text Box Size */}
      <div className="p-3 text-center space-y-1">
        <h3 className="font-cinzel text-[13px] font-medium text-[#000000] leading-tight line-clamp-2 group-hover:text-[#2C1810] transition-colors">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="flex items-center justify-center gap-2">
             <span className="text-[15px] font-bold text-[#2C1810] font-cinzel">
              ₹{price.toLocaleString()}
            </span>
            {comparePrice > price && (
            <span className="text-[11px] text-gray-400 line-through font-medium font-manrope">
                ₹{comparePrice.toLocaleString()}
            </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;