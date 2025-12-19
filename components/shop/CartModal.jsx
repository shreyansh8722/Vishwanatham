import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/lib/utils';
import { X, ShoppingBag, ArrowRight, Trash2, Plus, Minus, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartModal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, closeCart } = useCart();

  const handleCheckout = () => {
    // FIX: Close cart and go directly to checkout. 
    // App.jsx now handles the route without 'ProtectedRoute', so guests can proceed.
    closeCart();
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end font-sans">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />
      
      {/* Slide-out Drawer */}
      <motion.div 
        initial={{ x: '100%' }} 
        animate={{ x: 0 }} 
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col border-l border-gray-100"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white z-10 shadow-sm">
          <div className="flex items-center gap-2">
             <ShoppingBag size={18} className="text-[#B08D55]" strokeWidth={2} /> 
             <h2 className="text-lg font-serif italic text-stone-900">Your Bag <span className="font-sans text-sm text-stone-400 not-italic font-bold">({cart.length})</span></h2>
          </div>
          <button 
            onClick={closeCart} 
            className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-stone-900"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAFA]">
          {cart.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-center space-y-5 opacity-60">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} strokeWidth={1} className="text-stone-300"/>
                </div>
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-1">Your bag is empty</p>
                    <p className="text-xs text-stone-400">Items you add will appear here</p>
                </div>
                <button 
                    onClick={closeCart} 
                    className="text-xs font-bold text-[#B08D55] border-b border-[#B08D55] pb-0.5 hover:text-stone-900 hover:border-stone-900 transition-all"
                >
                    Continue Shopping
                </button>
             </div>
          ) : (
            <div className="flex flex-col gap-4">
                {cart.map((item) => {
                    const uniqueId = item._cartId || item.id;
                    
                    return (
                        <motion.div 
                            layout 
                            key={uniqueId} 
                            className="flex gap-4 p-3 bg-white border border-gray-200 rounded-sm shadow-sm group"
                        >
                            {/* Product Image */}
                            <div className="w-20 h-24 shrink-0 overflow-hidden rounded-sm border border-gray-100 relative bg-stone-50">
                                <img 
                                    src={item.featuredImageUrl || item.image || '/placeholder.jpg'} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover mix-blend-multiply" 
                                />
                            </div>
                            
                            {/* Product Details */}
                            <div className="flex-1 flex flex-col justify-between py-0.5">
                                <div className="relative pr-6">
                                    <h3 className="font-serif text-sm text-stone-800 line-clamp-1 leading-tight">{item.name}</h3>
                                    <button 
                                        onClick={() => removeFromCart(uniqueId)} 
                                        className="absolute -top-1 -right-1 p-1.5 text-stone-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    
                                    <div className="mt-1 space-y-0.5">
                                        <p className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{item.subCategory}</p>
                                        <p className="text-[10px] text-stone-400">Size: <span className="text-stone-600">{item.selectedSize || 'Standard'}</span></p>
                                        {item.selectedOptions && Object.values(item.selectedOptions).some(v => v) && (
                                            <p className="text-[9px] text-[#B08D55] font-medium">+ Customizations</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mt-2">
                                    {/* Quantity Selector */}
                                    <div className="flex items-center border border-gray-200 rounded-sm h-7 bg-white select-none">
                                        <button 
                                            onClick={() => updateQuantity(uniqueId, Math.max(1, item.quantity - 1))} 
                                            className="w-7 h-full flex items-center justify-center hover:bg-stone-50 text-stone-400 hover:text-stone-900 transition-colors active:bg-stone-100"
                                            type="button"
                                        >
                                            <Minus size={10} strokeWidth={3} />
                                        </button>
                                        <span className="w-8 h-full flex items-center justify-center text-xs font-bold text-stone-800 border-l border-r border-gray-100 bg-stone-50/50">
                                            {item.quantity}
                                        </span>
                                        <button 
                                            onClick={() => updateQuantity(uniqueId, item.quantity + 1)} 
                                            className="w-7 h-full flex items-center justify-center hover:bg-stone-50 text-stone-400 hover:text-stone-900 transition-colors active:bg-stone-100"
                                            type="button"
                                        >
                                            <Plus size={10} strokeWidth={3} />
                                        </button>
                                    </div>
                                    
                                    <p className="font-bold text-sm text-stone-900">₹{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-20">
             <div className="space-y-2 text-sm">
                <div className="flex justify-between text-stone-500 text-xs">
                   <span>Subtotal</span>
                   <span>₹{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-stone-500 text-xs">
                   <span>Shipping</span>
                   <span className="text-green-600 font-bold uppercase text-[9px] tracking-widest bg-green-50 px-2 py-0.5 rounded-full">Free</span>
                </div>
                <div className="flex justify-between font-serif text-lg text-stone-900 pt-3 border-t border-dashed border-gray-200 items-end">
                   <span className="italic">Total</span>
                   <span className="font-bold">₹{formatPrice(cartTotal)}</span>
                </div>
             </div>
             
             <button 
                onClick={handleCheckout} 
                className="w-full bg-[#1a1a1a] text-white py-4 px-6 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#B08D55] transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg rounded-sm"
             >
                <Lock size={12} className="opacity-70" />
                Checkout Securely 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </button>
             
             <p className="text-[9px] text-center text-stone-400 uppercase tracking-widest font-medium">
                Tax included • Free Returns
             </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};