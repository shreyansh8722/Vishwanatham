import React from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../hooks/useFavorites';

export const ProductCard = ({ product, openQuickView }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isLiked = isFavorite(product.id);

  const displayImage = Array.isArray(product.images) ? product.images[0] : product.image;
  const hoverImage = Array.isArray(product.images) && product.images.length > 1 ? product.images[1] : displayImage;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 'One Size'); 
  };

  return (
    <div className="group relative cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
        <Link to={`/product/${product.id}`}>
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
          />
          <img
            src={hoverImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100"
          />
        </Link>

        {product.isNew && (
          <span className="absolute top-3 left-3 bg-stone-900 text-white text-[10px] uppercase tracking-widest px-2 py-1">
            New
          </span>
        )}
        {product.discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-800 text-white text-[10px] uppercase tracking-widest px-2 py-1">
            -{product.discount}%
          </span>
        )}

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <button 
            onClick={openQuickView}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-stone-900 hover:text-white transition-colors"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            onClick={handleAddToCart}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-stone-900 hover:text-white transition-colors"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
            className={`bg-white p-3 rounded-full shadow-lg hover:bg-red-50 transition-colors ${isLiked ? 'text-red-600' : 'text-stone-900'}`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="text-center group-hover:-translate-y-1 transition-transform duration-300">
        <h3 className="font-cormorant text-xl text-stone-900 mb-1 leading-none">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="font-montserrat text-[10px] uppercase tracking-widest text-stone-500 mb-2">
          {product.category}
        </p>
        <div className="flex justify-center gap-2 font-montserrat text-sm font-medium">
          {product.discount > 0 ? (
            <>
              <span className="text-stone-400 line-through">₹{product.originalPrice}</span>
              <span className="text-stone-900">₹{product.price}</span>
            </>
          ) : (
            <span className="text-stone-900">₹{product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;