import React, { useState } from 'react';
import AddressSelector from '../components/checkout/AddressSelector';
import { useCart } from '../context/CartContext';
import { ShieldCheck, CreditCard, Truck, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems, getCartTotal } = useCart();
  const [step, setStep] = useState(1); // 1: Info, 2: Shipping, 3: Payment

  const total = getCartTotal();
  const shipping = total > 2500 ? 0 : 150;
  const grandTotal = total + shipping;

  return (
    <div className="bg-heritage-paper min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link to="/cart" className="flex items-center gap-2 text-xs uppercase tracking-widest text-heritage-grey hover:text-heritage-gold transition-colors">
            <ArrowLeft className="w-3 h-3" /> Return to Cart
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12 flex justify-between items-center text-xs font-bold tracking-widest uppercase text-heritage-grey relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-heritage-border -z-10"></div>
          <div className={`bg-heritage-paper px-2 ${step >= 1 ? 'text-heritage-charcoal' : ''}`}>Information</div>
          <div className={`bg-heritage-paper px-2 ${step >= 2 ? 'text-heritage-charcoal' : ''}`}>Shipping</div>
          <div className={`bg-heritage-paper px-2 ${step >= 3 ? 'text-heritage-charcoal' : ''}`}>Payment</div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Steps */}
          <div className="w-full lg:w-2/3 space-y-8">
            
            {/* Step 1: Address */}
            <div className={`bg-white p-8 rounded-sm shadow-sm border ${step === 1 ? 'border-heritage-gold' : 'border-heritage-border'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-cormorant text-2xl text-heritage-charcoal">1. Shipping Details</h2>
                {step > 1 && <button onClick={() => setStep(1)} className="text-xs uppercase text-heritage-gold underline">Edit</button>}
              </div>
              
              {step === 1 ? (
                <div className="animate-fade-in">
                  <AddressSelector />
                  <button 
                    onClick={() => setStep(2)}
                    className="mt-8 w-full md:w-auto bg-heritage-charcoal text-white px-8 py-4 rounded-sm uppercase text-xs tracking-widest font-bold hover:bg-heritage-gold transition-colors shadow-lg"
                  >
                    Continue to Shipping
                  </button>
                </div>
              ) : (
                <p className="text-sm text-heritage-grey">Address selected.</p>
              )}
            </div>

            {/* Step 2: Shipping Method */}
            <div className={`bg-white p-8 rounded-sm shadow-sm border ${step === 2 ? 'border-heritage-gold' : 'border-heritage-border'} ${step < 2 ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-cormorant text-2xl text-heritage-charcoal">2. Delivery Method</h2>
                {step > 2 && <button onClick={() => setStep(2)} className="text-xs uppercase text-heritage-gold underline">Edit</button>}
              </div>

              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <label className="flex items-center justify-between p-4 border border-heritage-gold bg-heritage-sand/30 rounded-sm cursor-pointer hover:bg-heritage-sand transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-4 border-heritage-gold bg-white"></div>
                      <div>
                        <span className="block text-sm font-bold text-heritage-charcoal">Standard Shipping</span>
                        <span className="block text-xs text-heritage-grey">3-7 Business Days via BlueDart/Delhivery</span>
                      </div>
                    </div>
                    <span className="font-bold text-heritage-charcoal">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </label>
                  <button 
                    onClick={() => setStep(3)}
                    className="mt-6 w-full md:w-auto bg-heritage-charcoal text-white px-8 py-4 rounded-sm uppercase text-xs tracking-widest font-bold hover:bg-heritage-gold transition-colors shadow-lg"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}
            </div>

            {/* Step 3: Payment */}
            <div className={`bg-white p-8 rounded-sm shadow-sm border ${step === 3 ? 'border-heritage-gold' : 'border-heritage-border'} ${step < 3 ? 'opacity-50 pointer-events-none' : ''}`}>
              <h2 className="font-cormorant text-2xl text-heritage-charcoal mb-6">3. Payment</h2>
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 border border-heritage-border rounded-sm flex items-center gap-3 text-heritage-grey text-sm bg-heritage-mist/20">
                    <Lock className="w-4 h-4" />
                    <span>All transactions are secure and encrypted.</span>
                  </div>
                  
                  <button className="w-full bg-heritage-gold text-white py-4 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-heritage-clay transition-colors shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-1">
                    <CreditCard className="w-4 h-4" /> Pay ₹{grandTotal.toLocaleString()} Now
                  </button>
                  
                  <div className="flex justify-center gap-4 mt-6 opacity-50 grayscale">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" className="h-6" alt="UPI" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" className="h-6" alt="Visa" />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-heritage-border sticky top-32">
              <h3 className="font-cormorant text-xl text-heritage-charcoal mb-6 pb-2 border-b border-heritage-border">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                    <div className="w-16 h-20 bg-heritage-mist overflow-hidden relative flex-shrink-0 border border-heritage-border">
                      <img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 bg-heritage-grey text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-cormorant text-sm text-heritage-charcoal leading-tight mb-1">{item.name}</h4>
                      <p className="text-[10px] uppercase tracking-widest text-heritage-grey mb-1">{item.category}</p>
                      <p className="text-sm font-medium text-heritage-charcoal">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-heritage-border text-sm">
                <div className="flex justify-between text-heritage-grey">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-heritage-grey">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-heritage-charcoal pt-4 border-t border-heritage-border mt-4">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-heritage-grey bg-heritage-sand p-3 rounded-sm">
                <ShieldCheck className="w-4 h-4 text-heritage-gold" />
                Verified & Authentic from Kashi
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;