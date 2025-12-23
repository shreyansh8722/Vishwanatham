import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, ChevronRight, Loader2, Share2, 
  Truck, CheckCircle2, ShieldCheck, Flame, 
  Clock, MessageCircle, Heart, Minus, Plus, 
  Gift, Tag, Lock, ArrowRight, Sparkles, AlertCircle, 
  User, Quote, TrendingUp
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useFavorites } from '../hooks/useFavorites';
import ProductGallery from '../components/shop/ProductGallery';
import ProductCard from '../components/shop/ProductCard';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // --- STATES ---
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [addEnergization, setAddEnergization] = useState(true);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [viewCount, setViewCount] = useState(24);
  const [stockLeft, setStockLeft] = useState(12);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 32 });
  const [activeTab, setActiveTab] = useState('details');

  const mainActionsRef = useRef(null);
  const ENERGIZATION_COST = 301; 
  const WHATSAPP_NUMBER = "919305491919"; 

  const product = products.find(p => String(p.id) === id);
  const galleryImages = product ? (product.imageUrls || [product.featuredImageUrl]) : [];
  const relatedProducts = products.filter(p => p.id !== product?.id).slice(0, 4);

  // --- LOGIC: Urgency & Scroll ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { root: null, threshold: 0 } 
    );
    if (mainActionsRef.current) observer.observe(mainActionsRef.current);
    return () => { if (mainActionsRef.current) observer.unobserve(mainActionsRef.current); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewCount(prev => Math.max(15, prev + Math.floor(Math.random() * 5) - 2));
      setStockLeft(prev => Math.max(1, prev - Math.floor(Math.random() * 2)));
      
      setTimeLeft(prev => {
        let secs = prev.seconds - 1;
        let mins = prev.minutes;
        let hrs = prev.hours;
        
        if (secs < 0) {
          secs = 59;
          mins -= 1;
        }
        if (mins < 0) {
          mins = 59;
          hrs -= 1;
        }
        if (hrs < 0) {
          hrs = 2; mins = 45; secs = 32;
        }
        return { hours: hrs, minutes: mins, seconds: secs };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-orange-600" size={40} /></div>;
  if (!product) return <div className="h-[60vh] flex flex-col items-center justify-center gap-4 bg-white"><h2 className="text-2xl font-serif text-gray-800">Artifact not found</h2><button onClick={() => navigate('/shop')} className="text-orange-600 underline font-bold">Return to shop</button></div>;

  const price = Number(product.price);
  const comparePrice = Number(product.comparePrice);
  const finalPrice = addEnergization ? price + ENERGIZATION_COST : price;
  const discount = Math.round(((comparePrice - price) / comparePrice) * 100);
  const isLiked = isFavorite(product.id);
  const isLowStock = stockLeft <= 5;

  // --- HANDLERS ---
  const checkDelivery = (e) => {
    e.preventDefault();
    if (pincode.length !== 6) return;
    setIsChecking(true);
    setTimeout(() => {
      const date = new Date();
      date.setDate(date.getDate() + 3);
      setDeliveryDate(date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }));
      setIsChecking(false);
    }, 1500);
  };

  const handleOrder = (type) => {
    addToCart(product, 'Standard', quantity, { energization: addEnergization });
    if (type === 'buy_now') navigate('/checkout');
  };

  const handleWhatsAppOrder = () => {
    const total = finalPrice * quantity;
    const message = `Namaste, ordering *${quantity} x ${product.name}*. Total: ₹${total}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // TESTIMONIALS DATA
  const testimonials = [
    { name: "Priya Sharma", initials: "PS", rating: 5, text: "Life-changing! Felt the energy shift immediately. Highly recommended.", verified: true },
    { name: "Rajesh Kumar", initials: "RK", rating: 5, text: "Genuine product, fast delivery. Better than expected.", verified: true },
    { name: "Anjali Patel", initials: "AP", rating: 5, text: "Excellent quality and authentic. Worth every penny.", verified: true },
  ];

  return (
    <div className="bg-white min-h-screen pb-32 font-sans text-gray-900">
      
      {/* 1. TRUST MARQUEE (Sticky Top) */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white overflow-hidden py-2 sticky top-0 z-50 shadow-md">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center text-[10px] md:text-xs font-bold uppercase tracking-widest">
           {[...Array(8)].map((_, i) => (
             <React.Fragment key={i}>
                <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-yellow-200" /> 100% Original Certified</span>
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                <span className="flex items-center gap-2"><Flame size={14} className="text-yellow-200" /> Energized in Kashi</span>
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
             </React.Fragment>
           ))}
        </div>
      </div>

      {/* 2. BREADCRUMBS */}
      <div className="border-b border-gray-100 bg-white/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
            <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link> <ChevronRight size={10} />
            <Link to="/shop" className="hover:text-orange-600 transition-colors">Shop</Link> <ChevronRight size={10} />
            <span className="text-gray-900 truncate max-w-[150px] font-bold">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* --- LEFT: GALLERY --- */}
          <div className="w-full lg:w-[55%]">
             <ProductGallery images={galleryImages} />
             
             {/* TRUST BADGES (4-Column Grid) */}
             <div className="grid grid-cols-4 gap-2 mt-6">
                {[
                  { label: "Original", icon: <ShieldCheck size={20}/>, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                  { label: "Energized", icon: <Flame size={20}/>, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
                  { label: "Lab Tested", icon: <CheckCircle2 size={20}/>, color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
                  { label: "Fast Ship", icon: <Truck size={20}/>, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
                ].map((badge, idx) => (
                  <div key={idx} className={`flex flex-col items-center justify-center py-3 rounded-lg border ${badge.bg} ${badge.border}`}>
                     <div className={`${badge.color} mb-1`}>{badge.icon}</div>
                     <span className="text-[9px] font-bold uppercase tracking-wide text-gray-700">{badge.label}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-20 h-fit">
            
            {/* URGENCY INDICATORS (Red, Amber, Blue) */}
            <div className="space-y-2 mb-4">
              {/* Viewing Right Now */}
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-2 rounded-full border border-rose-100">
                 <span className="relative flex h-2.5 w-2.5">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
                 </span>
                 {viewCount} people viewing
              </div>

              {/* Limited Stock Warning */}
              {isLowStock && (
                <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 px-3 py-2 rounded-full border border-red-200">
                   <AlertCircle size={14} className="animate-pulse" /> Only {stockLeft} left in stock!
                </div>
              )}

              {/* Countdown Timer */}
              <div className="text-[10px] font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-3 py-2 rounded border border-amber-200">
                 <Clock size={14} className="animate-pulse" /> 
                 <span className="font-mono">
                   {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                 </span>
                 <span>Flash Deal</span>
              </div>
            </div>

            {/* TITLE & RATING */}
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 flex-wrap">
               <div className="flex text-amber-400 gap-0.5">
                 {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
               </div>
               <span className="text-xs font-bold text-gray-700">4.9 out of 5</span>
               <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">245 Reviews</span>
            </div>

            {/* PRICE & DISCOUNT */}
            <div className="mb-6">
              <div className="flex items-end gap-4 mb-2">
                <span className="text-4xl font-manrope font-extrabold text-gray-900">₹{finalPrice.toLocaleString()}</span>
                {comparePrice > price && (
                   <span className="text-xl text-gray-400 line-through mb-1 font-medium">₹{comparePrice.toLocaleString()}</span>
                )}
                {comparePrice > price && (
                  <span className="mb-1 text-sm font-bold text-white bg-rose-600 px-3 py-1 rounded-full shadow-md animate-pulse">
                    {discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-xs text-green-700 font-bold flex items-center gap-1">
                <CheckCircle2 size={12}/> Inclusive of all taxes & Vedic Pooja
              </p>
              <p className="text-xs text-gray-500 mt-1">Free delivery over ₹399</p>
            </div>

            {/* DISCOUNT BADGES (Horizontal Scroll) */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              <div className="flex-shrink-0 bg-yellow-50 border border-yellow-300 rounded-lg px-3 py-2">
                <p className="text-xs font-bold text-gray-900">🎁 New Arrival</p>
              </div>
              <div className="flex-shrink-0 bg-purple-50 border border-purple-300 rounded-lg px-3 py-2">
                <p className="text-xs font-bold text-gray-900">💎 Premium Quality</p>
              </div>
              <div className="flex-shrink-0 bg-blue-50 border border-blue-300 rounded-lg px-3 py-2">
                <p className="text-xs font-bold text-gray-900">🏆 Best Seller</p>
              </div>
            </div>

            {/* COUPON BOX */}
            <div className="mb-6 bg-orange-50/60 border-2 border-dashed border-orange-300 rounded-lg p-4 flex items-start gap-3">
               <div className="bg-orange-100 p-2 rounded-full text-orange-600 mt-0.5 flex-shrink-0"><Tag size={18} /></div>
               <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 mb-1">Extra ₹150 OFF on Prepaid</p>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="bg-white border border-orange-200 rounded px-2 py-1 text-xs font-mono font-bold text-orange-700">PREPAID150</code>
                    <button className="text-xs font-bold text-orange-600 hover:text-orange-700">Copy</button>
                  </div>
               </div>
            </div>

            {/* EXCLUSIVE OFFERS SECTION */}
            <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Gift size={16} className="text-amber-600" /> EXCLUSIVE OFFERS
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-start pb-2 border-b border-amber-100">
                  <span className="text-gray-700">✓ Free Energization (Worth ₹301)</span>
                  <span className="font-bold text-green-600">AUTO APPLIED</span>
                </div>
                <div className="flex justify-between items-start pb-2 border-b border-amber-100">
                  <span className="text-gray-700">✓ Free Rudraksha Pouch (Min order ₹999)</span>
                  <span className="font-bold text-amber-600">+ ₹0</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-700">✓ Money-back guarantee if not satisfied</span>
                  <span className="font-bold text-green-600">7 Days</span>
                </div>
              </div>
            </div>

            {/* ENERGIZATION UPSELL */}
            <div 
               className={`mb-8 border-2 transition-all duration-300 cursor-pointer rounded-xl overflow-hidden ${addEnergization ? 'border-amber-400 ring-2 ring-amber-300 bg-amber-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
               onClick={() => setAddEnergization(!addEnergization)}
            >
               {addEnergization && (
                 <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] font-bold px-4 py-1.5 uppercase tracking-widest flex justify-between items-center">
                    <span>⭐ Recommended by {Math.floor(Math.random() * 30 + 70)}% Buyers</span>
                    <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Selected</span>
                 </div>
               )}
               <div className="p-4 flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${addEnergization ? 'bg-amber-500 border-amber-500' : 'border-gray-300 bg-white'}`}>
                      {addEnergization && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <div>
                       <span className="block text-sm font-bold text-gray-900">Energize in my Name</span>
                       <span className="block text-[10px] text-gray-600 font-medium">
                         Prana Pratishta at Kashi Vishwanath Temple
                       </span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-amber-700">+₹{ENERGIZATION_COST}</span>
               </div>
            </div>

            {/* QUANTITY & BUTTONS */}
            <div ref={mainActionsRef} className="space-y-4 mb-8">
               
               <div className="flex gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 w-32 px-2 bg-white hover:border-orange-400 transition-colors">
                    <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-black font-bold"><Minus size={16}/></button>
                    <span className="flex-1 text-center font-bold text-lg text-gray-900">{quantity}</span>
                    <button onClick={() => setQuantity(q => q+1)} className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-black font-bold"><Plus size={16}/></button>
                  </div>

                  {/* Buy Now - GRADIENT */}
                  <button 
                    onClick={() => handleOrder('buy_now')}
                    className="flex-1 h-12 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-orange-300 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
                  >
                    Buy Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                  </button>
               </div>

               {/* Secondary Buttons */}
               <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleOrder('add_to_cart')}
                    className="py-3 rounded-lg border-2 border-gray-900 text-gray-900 font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all bg-white"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleWhatsAppOrder}
                    className="py-3 rounded-lg border-2 border-green-500 text-green-600 font-bold text-xs uppercase tracking-widest hover:bg-green-50 transition-all flex items-center justify-center gap-2"
                  >
                     <MessageCircle size={16} /> WhatsApp
                  </button>
               </div>
               
               <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 pt-2">
                  <Lock size={12} /> Secure SSL Payment • 7-Day Easy Returns • COD Available
               </div>
            </div>

            {/* DELIVERY CHECKER */}
            <div className="mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
               <p className="text-xs font-bold text-gray-900 mb-3 uppercase flex items-center gap-2">
                 <Truck size={14} className="text-orange-600" /> ✓ Check Delivery Date
               </p>
               <form onSubmit={checkDelivery} className="flex gap-2">
                 <input 
                   type="text" 
                   maxLength={6}
                   placeholder="Enter Pincode" 
                   value={pincode}
                   onChange={(e) => setPincode(e.target.value.replace(/\D/g,''))}
                   className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none transition-colors"
                 />
                 <button className="bg-gray-900 text-white text-xs font-bold px-4 rounded-lg hover:bg-black transition-colors">
                    {isChecking ? "..." : "Check"}
                 </button>
               </form>
               {deliveryDate && (
                 <p className="text-xs text-green-700 mt-3 font-bold flex items-center gap-1 animate-fade-in">
                   <CheckCircle2 size={12} /> Estimated delivery by <strong>{deliveryDate}</strong>
                 </p>
               )}
            </div>

            {/* NEED HELP SECTION */}
            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MessageCircle size={16} className="text-blue-600" /> NEED HELP?
              </h3>
              <div className="space-y-2 text-xs">
                <p className="font-medium text-gray-900">Mon to Sat 10 AM to 5 PM</p>
                <div className="flex items-center gap-2 text-gray-700">
                  <MessageCircle size={14} /> Order on WhatsApp
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MessageCircle size={14} /> Instant Help: Chat With Us
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MessageCircle size={14} /> Email: support@japam.in
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* TABS SECTION (Description, Reviews, Care) */}
        <div className="mt-16 border-t border-gray-100 pt-12">
          <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
            {['details', 'reviews', 'care'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-bold text-sm uppercase tracking-wide transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-orange-600 border-b-2 border-orange-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'details' && '📋 Product Details'}
                {tab === 'reviews' && '⭐ Reviews & Testimonials'}
                {tab === 'care' && '💎 Care Instructions'}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-gray-900 mb-4">WHY CHOOSE THIS PRODUCT</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {product.fullDescription || "Sourced directly from the holy ghats of Varanasi. Each bead is hand-selected, X-ray tested for authenticity, and strung with durable sacred thread. This product carries the spiritual essence of the sacred land and is blessed by experienced pandits."}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
                   <span className="block text-xs text-gray-600 font-bold mb-1 uppercase">Origin</span>
                   <span className="font-bold text-gray-900">Varanasi, India</span>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                   <span className="block text-xs text-gray-600 font-bold mb-1 uppercase">Material</span>
                   <span className="font-bold text-gray-900">Rudraksha Seeds</span>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                   <span className="block text-xs text-gray-600 font-bold mb-1 uppercase">Certification</span>
                   <span className="font-bold text-gray-900">Lab Tested</span>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                   <span className="block text-xs text-gray-600 font-bold mb-1 uppercase">Guarantee</span>
                   <span className="font-bold text-gray-900">7-Day Money Back</span>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                <p className="text-sm font-bold text-red-900 mb-2">🇮🇳 MADE IN INDIA</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  All our jewelry is handmade by Indian artisans and craftspeople, largely from villages. This supports and grows the local Indian economy and preserves traditional craftsmanship.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">4.9</div>
                  <div className="flex text-amber-400 gap-0.5 justify-center mt-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">245 Reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3].map(stars => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-600 w-8">{stars}★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400" style={{width: `${stars === 5 ? 85 : stars === 4 ? 12 : 3}%`}}></div>
                      </div>
                      <span className="text-xs text-gray-600 w-8">{stars === 5 ? '208' : stars === 4 ? '29' : '8'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                          {testimonial.initials}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 flex items-center gap-1">
                            {testimonial.name}
                            {testimonial.verified && <CheckCircle2 size={14} className="text-green-600" />}
                          </p>
                          <div className="flex text-amber-400 gap-0.5">
                            {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" strokeWidth={0} />)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-3">CARE INSTRUCTIONS:</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Keep your Rudraksha necklace away from water, harsh chemicals, and extreme temperatures. It should be treated with care, as each bead carries its own unique energy. Store it in a soft pouch or moisture-free zip-lock bag to maintain its beauty and integrity.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-3">🔄 HOW TO WEAR & RECHARGE:</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Wear your Rudraksha during the day or as directed by your spiritual guide. Once monthly, recharge it under moonlight for enhanced spiritual benefits. You can also soak it in Ganges water or raw milk overnight for purification.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-gray-900">Got Questions?</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-sm font-bold text-gray-900 mb-1">❓ Frequently Asked Questions</p>
                  <p className="text-xs text-gray-700">Click here to view our comprehensive FAQ section</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 py-2 px-3 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors">
                  📤 Share
                </button>
                <button className="flex-1 py-2 px-3 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors">
                  ❤️ Add to Wishlist
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="font-cinzel text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- STICKY MOBILE BUY BAR --- */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 z-50 transition-transform duration-300 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] lg:hidden ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex gap-3 items-center">
          <div className="flex-1">
             <p className="text-xs text-gray-500 line-through">₹{comparePrice.toLocaleString()}</p>
             <p className="font-bold text-lg text-gray-900 leading-none">₹{finalPrice.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => handleOrder('buy_now')}
            className="flex-1 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-sm py-3 rounded-lg shadow-lg uppercase tracking-widest"
          >
            Buy Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductDetailsPage;
