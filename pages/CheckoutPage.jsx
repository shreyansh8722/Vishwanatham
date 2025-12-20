import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, ChevronLeft, CreditCard, Banknote } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Info, 2: Payment
  
  // Form State
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', state: '', pincode: '', phone: ''
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 2500 ? 0 : 150;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else {
      // Handle Payment Logic Here
      alert("Order Placed Successfully! (Mock)");
      navigate('/');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-heritage-paper flex flex-col items-center justify-center p-4 text-center">
        <h2 className="font-cinzel text-2xl font-bold text-heritage-charcoal mb-2">Your cart is empty</h2>
        <p className="text-heritage-grey mb-6">Add some divine items to proceed.</p>
        <Link to="/shop" className="bg-heritage-rudraksha text-white px-8 py-3 rounded font-bold hover:bg-heritage-saffron transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-heritage-paper pt-6 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header (Minimal) */}
        <div className="flex items-center justify-between mb-8 border-b border-heritage-mist pb-4">
          <Link to="/" className="font-cinzel text-2xl font-bold text-heritage-rudraksha">
            Vishwanatham
          </Link>
          <div className="flex items-center gap-2 text-heritage-grey text-sm font-medium">
            <Lock size={14} /> Secure Checkout
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- LEFT COLUMN: FORMS --- */}
          <div className="flex-1">
            
            {/* Breadcrumb Steps */}
            <div className="flex items-center gap-2 text-sm font-bold mb-8 font-manrope">
              <span className={`${step >= 1 ? 'text-heritage-rudraksha' : 'text-heritage-mist'}`}>Shipping</span>
              <span className="text-heritage-mist">/</span>
              <span className={`${step >= 2 ? 'text-heritage-rudraksha' : 'text-heritage-mist'}`}>Payment</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {step === 1 && (
                <div className="animate-fade-in">
                  <h2 className="font-cinzel text-xl font-bold text-heritage-charcoal mb-6">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <input 
                      type="email" name="email" placeholder="Email address" required
                      value={formData.email} onChange={handleInputChange}
                      className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none transition-colors"
                    />
                    
                    <h2 className="font-cinzel text-xl font-bold text-heritage-charcoal pt-6 mb-2">Shipping Address</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" name="firstName" placeholder="First name" required
                        value={formData.firstName} onChange={handleInputChange}
                        className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                      />
                      <input 
                        type="text" name="lastName" placeholder="Last name" required
                        value={formData.lastName} onChange={handleInputChange}
                        className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                      />
                    </div>
                    
                    <input 
                      type="text" name="address" placeholder="Address (House No, Street)" required
                      value={formData.address} onChange={handleInputChange}
                      className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                    />
                    
                    <div className="grid grid-cols-3 gap-4">
                      <input 
                        type="text" name="city" placeholder="City" required
                        value={formData.city} onChange={handleInputChange}
                        className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                      />
                      <input 
                        type="text" name="state" placeholder="State" required
                        value={formData.state} onChange={handleInputChange}
                        className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                      />
                      <input 
                        type="text" name="pincode" placeholder="PIN Code" required
                        value={formData.pincode} onChange={handleInputChange}
                        className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                      />
                    </div>
                    
                    <input 
                      type="tel" name="phone" placeholder="Phone number" required
                      value={formData.phone} onChange={handleInputChange}
                      className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                    />
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button type="submit" className="bg-heritage-rudraksha text-white px-8 py-3.5 rounded font-bold text-sm hover:bg-heritage-saffron transition-all shadow-lg">
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-fade-in">
                  <div className="border border-heritage-mist rounded p-4 mb-8 text-sm text-heritage-grey bg-heritage-sand/20">
                    <div className="flex justify-between border-b border-heritage-mist pb-2 mb-2">
                      <span>Contact</span>
                      <span className="text-heritage-charcoal font-medium">{formData.email}</span>
                      <button type="button" onClick={() => setStep(1)} className="text-heritage-rudraksha underline text-xs">Change</button>
                    </div>
                    <div className="flex justify-between">
                      <span>Ship to</span>
                      <span className="text-heritage-charcoal font-medium truncate max-w-[200px]">{formData.address}, {formData.city}</span>
                      <button type="button" onClick={() => setStep(1)} className="text-heritage-rudraksha underline text-xs">Change</button>
                    </div>
                  </div>

                  <h2 className="font-cinzel text-xl font-bold text-heritage-charcoal mb-6">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center gap-4 border border-heritage-rudraksha bg-heritage-rudraksha/5 p-4 rounded cursor-pointer ring-1 ring-heritage-rudraksha">
                      <input type="radio" name="payment" defaultChecked className="accent-heritage-rudraksha w-4 h-4" />
                      <div className="flex-1">
                        <span className="block font-bold text-heritage-charcoal text-sm">UPI / Credit Card / Netbanking</span>
                        <span className="text-xs text-heritage-grey">Pay securely via Razorpay</span>
                      </div>
                      <CreditCard className="text-heritage-rudraksha" size={20} />
                    </label>

                    <label className="flex items-center gap-4 border border-heritage-mist p-4 rounded cursor-pointer hover:border-heritage-grey">
                      <input type="radio" name="payment" className="accent-heritage-rudraksha w-4 h-4" />
                      <div className="flex-1">
                        <span className="block font-bold text-heritage-charcoal text-sm">Cash on Delivery (COD)</span>
                        <span className="text-xs text-heritage-grey">Pay when you receive</span>
                      </div>
                      <Banknote className="text-heritage-grey" size={20} />
                    </label>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1 text-heritage-grey text-sm hover:text-heritage-charcoal">
                      <ChevronLeft size={16} /> Return to Shipping
                    </button>
                    <button type="submit" className="bg-heritage-rudraksha text-white px-8 py-3.5 rounded font-bold text-sm hover:bg-heritage-saffron transition-all shadow-lg">
                      Pay Now ₹{total.toLocaleString()}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>

          {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
          <div className="w-full lg:w-[380px] bg-heritage-sand/30 border border-heritage-mist rounded-lg p-6 h-fit sticky top-24">
            <h3 className="font-cinzel text-lg font-bold text-heritage-charcoal mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-white border border-heritage-mist rounded overflow-hidden relative">
                    <img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-1 -right-1 bg-heritage-rudraksha text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-manrope text-sm font-bold text-heritage-charcoal line-clamp-2">{item.name}</h4>
                    <p className="text-xs text-heritage-grey">{item.selectedSize}</p>
                  </div>
                  <span className="text-sm font-bold text-heritage-charcoal">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-heritage-mist pt-4 space-y-2">
              <div className="flex justify-between text-sm text-heritage-grey">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-heritage-grey">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>
            </div>

            <div className="border-t border-heritage-mist mt-4 pt-4 flex justify-between items-center">
              <span className="font-cinzel text-lg font-bold text-heritage-charcoal">Total</span>
              <div className="text-right">
                <span className="text-xs text-heritage-grey block mb-1">Including GST</span>
                <span className="font-cinzel text-xl font-bold text-heritage-rudraksha">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-heritage-grey bg-white p-2 rounded border border-heritage-mist">
              <ShieldCheck size={14} className="text-green-600" />
              Secure encrypted payments
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;