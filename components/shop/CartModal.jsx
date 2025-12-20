import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export const CartModal = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal 
  } = useCart();
  
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h2 className="font-cormorant text-2xl text-stone-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({cartItems.length})
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-500 hover:text-stone-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-stone-200" />
              <p className="font-montserrat text-stone-500">Your cart is currently empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-xs uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-amber-700 hover:border-amber-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                <div className="w-20 h-24 bg-stone-100 overflow-hidden relative">
                  <img 
                    src={item.images?.[0] || item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-cormorant text-lg text-stone-900 leading-tight">
                      <Link to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)}>
                        {item.name}
                      </Link>
                    </h3>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-stone-400 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-xs text-stone-500 mb-3 font-montserrat">
                    Size: {item.selectedSize} | ₹{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-stone-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="p-1 hover:bg-stone-100 text-stone-500"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-medium w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="p-1 hover:bg-stone-100 text-stone-500"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-medium text-stone-900 ml-auto">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-montserrat text-sm text-stone-600">Subtotal</span>
              <span className="font-cormorant text-2xl font-semibold text-stone-900">
                ₹{getCartTotal().toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-stone-500 mb-6 text-center">
              Shipping & taxes calculated at checkout
            </p>
            <button 
              onClick={handleCheckout}
              className="w-full bg-stone-900 text-white py-4 text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
            >
              Checkout <span className="font-serif italic">Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;