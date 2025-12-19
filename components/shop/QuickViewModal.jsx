import React, { useState } from 'react';
import { X, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('Free Size'); // Default for sarees
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, selectedOptions: { size: selectedSize }, quantity: 1 });
    setAdded(true);
    setTimeout(() => {
        setAdded(false);
        onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] md:h-auto"
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white text-gray-500 hover:text-black transition-colors"><X size={20} /></button>

            {/* Image Side */}
            <div className="bg-gray-100 h-64 md:h-full relative group">
                <img 
                    src={product.featuredImageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                />
            </div>

            {/* Content Side */}
            <div className="p-8 flex flex-col h-full overflow-y-auto">
                <p className="text-[#B08D55] text-xs font-bold uppercase tracking-wider mb-2">{product.subCategory || 'Banarasi Collection'}</p>
                <h2 className="font-serif text-3xl text-gray-900 mb-4">{product.name}</h2>
                
                <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-2xl font-bold text-gray-900">₹{formatPrice(product.price)}</span>
                    {product.comparePrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">₹{formatPrice(product.comparePrice)}</span>
                    )}
                </div>

                <div className="prose prose-sm text-gray-500 mb-8 line-clamp-3">
                    {product.fullDescription}
                </div>

                <div className="mt-auto space-y-3">
                    <button 
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                        className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 rounded-sm ${
                            added ? 'bg-green-600 text-white' : 'bg-[#1A1A1A] text-white hover:bg-[#B08D55]'
                        } ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {added ? <><Check size={18} /> Added to Bag</> : <><ShoppingBag size={18} /> {product.stock <= 0 ? 'Sold Out' : 'Add to Cart'}</>}
                    </button>
                    
                    <button 
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="w-full py-4 text-xs font-bold uppercase tracking-widest border border-gray-200 text-gray-900 hover:border-[#B08D55] hover:text-[#B08D55] transition-all rounded-sm"
                    >
                        View Full Details
                    </button>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};