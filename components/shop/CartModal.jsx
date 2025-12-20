import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
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
    // FIX: z-[200] ensures it is ABOVE everything (Navbar is 140, Announcement is 150)
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="p-5 border-b border-heritage-mist flex justify-between items-center bg-heritage-sand">
          <h2 className="font-cinzel text-xl font-bold text-heritage-charcoal flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your cart ({cartItems.length})
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-white rounded-full transition-colors text-heritage-grey hover:text-heritage-charcoal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-5 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-heritage-sand rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-heritage-charcoal/50" />
              </div>
              <div>
                <p className="font-cinzel text-lg font-bold text-heritage-charcoal">Your cart is empty</p>
                <p className="font-manrope text-sm text-heritage-grey mt-1">Looks like you haven't added anything yet.</p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-4 text-sm font-bold border-b-2 border-heritage-rudraksha pb-1 text-heritage-rudraksha hover:text-heritage-saffron hover:border-heritage-saffron transition-colors"
              >
                Start shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                <div className="w-20 h-24 bg-heritage-sand overflow-hidden relative rounded-md border border-heritage-mist flex-shrink-0">
                  <img 
                    src={item.images?.[0] || item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-cinzel text-base font-bold text-heritage-charcoal leading-tight line-clamp-2">
                      <Link to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)}>
                        {item.name}
                      </Link>
                    </h3>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-heritage-grey hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-xs text-heritage-grey mb-3 font-manrope font-medium">
                    {item.selectedSize && `Size: ${item.selectedSize} | `} <span className="text-heritage-rudraksha font-bold">₹{item.price.toLocaleString()}</span>
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-heritage-mist rounded-sm h-8">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="px-2 hover:bg-heritage-sand text-heritage-grey h-full flex items-center"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold min-w-[20px] text-center text-heritage-charcoal">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="px-2 hover:bg-heritage-sand text-heritage-grey h-full flex items-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-heritage-charcoal ml-auto">
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
          <div className="p-6 border-t border-heritage-mist bg-heritage-sand/30">
            <div className="flex justify-between items-center mb-4">
              <span className="font-manrope text-sm font-medium text-heritage-grey">Subtotal</span>
              <span className="font-cinzel text-2xl font-bold text-heritage-charcoal">
                ₹{getCartTotal().toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-heritage-grey mb-6 text-center">
              Shipping & taxes calculated at checkout
            </p>
            <button 
              onClick={handleCheckout}
              className="w-full bg-heritage-rudraksha text-white py-4 text-sm font-bold rounded-md hover:bg-heritage-saffron transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              Checkout now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;