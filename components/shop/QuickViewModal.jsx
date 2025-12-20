import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../hooks/useFavorites';
import { Link } from 'react-router-dom';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || product?.image);
  
  if (!isOpen || !product) return null;

  const isLiked = isFavorite(product.id);
  const images = Array.isArray(product.images) ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, 'Standard'); // Default variant logic
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl h-[80vh] md:h-auto overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5 text-stone-900" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-stone-100 relative">
          <img 
            src={selectedImage} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-2 h-2 rounded-full transition-all ${selectedImage === img ? 'bg-stone-900 scale-125' : 'bg-stone-400'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">{product.category}</p>
          <h2 className="font-cormorant text-3xl md:text-4xl text-stone-900 mb-4 leading-tight">{product.name}</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xl font-medium text-stone-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-stone-400 line-through">₹{product.originalPrice}</span>
            )}
            <div className="flex items-center gap-1 text-amber-500 text-xs ml-auto">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-stone-400 ml-1">4.8 (12)</span>
            </div>
          </div>

          <p className="font-montserrat text-sm text-stone-500 leading-relaxed mb-8">
            {product.description || "Experience the divine energy of Kashi with this authentic handcrafted artifact. Sourced directly from the artisans of Varanasi."}
          </p>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-stone-900 text-white py-4 text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
            
            <div className="flex gap-4">
              <button 
                onClick={() => toggleFavorite(product)}
                className={`flex-1 py-3 border border-stone-200 text-xs uppercase tracking-widest hover:border-stone-900 transition-colors flex items-center justify-center gap-2 ${isLiked ? 'text-red-600 border-red-200' : 'text-stone-500'}`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} /> {isLiked ? 'Saved' : 'Wishlist'}
              </button>
              <Link 
                to={`/product/${product.id}`}
                className="flex-1 py-3 border border-stone-200 text-xs uppercase tracking-widest hover:border-stone-900 transition-colors text-stone-500 hover:text-stone-900 text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;