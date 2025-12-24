import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, ChevronRight, Loader2, Share2, 
  Truck, CheckCircle2, Zap, ShieldCheck, Flame, 
  Sparkles, Clock, MessageCircle, ArrowRight, 
  Ticket, PlayCircle, Lock, MapPin
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import ProductGallery from '../components/shop/ProductGallery';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  
  // --- STATES ---
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  
  // Energization States
  const [addEnergization, setAddEnergization] = useState(false);
  const [devoteeName, setDevoteeName] = useState('');
  const [devoteeGotra, setDevoteeGotra] = useState('');
  
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [viewCount, setViewCount] = useState(25);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32 }); 
  const [activeCoupon, setActiveCoupon] = useState(null);

  const mainActionsRef = useRef(null);

  // --- CONFIG ---
  const ONLINE_DISCOUNT = 50; 
  const ENERGIZATION_COST = 301; 
  const WHATSAPP_NUMBER = "919305491919"; 

  const product = products.find(p => String(p.id) === id);
  const galleryImages = product ? (product.imageUrls || [product.featuredImageUrl]) : [];

  const combos = [
    { qty: 1, label: "Single Piece", discount: 0, tag: "Standard" },
    { qty: 2, label: "Couple Pair", discount: 10, tag: "Save 10%" },
    { qty: 3, label: "Family Pack", discount: 15, tag: "Save 15%" }
  ];

  // --- LOGIC: Sticky Bar Visible ALWAYS unless main buttons are in view ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { root: null, threshold: 0.1 } 
    );
    
    if (mainActionsRef.current) observer.observe(mainActionsRef.current);
    return () => { if (mainActionsRef.current) observer.unobserve(mainActionsRef.current); };
  }, []);

  useEffect(() => {
    setViewCount(Math.floor(Math.random() * (45 - 20 + 1)) + 20);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes === 0) return { hours: prev.hours - 1, minutes: 59 };
        return { ...prev, minutes: prev.minutes - 1 };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-heritage-parchment"><Loader2 className="animate-spin text-heritage-rudraksha" size={40} /></div>;
  if (!product) return <div className="h-[60vh] flex flex-col items-center justify-center gap-4 bg-heritage-parchment"><h2 className="text-2xl font-heading text-heritage-charcoal">Artifact not found</h2><button onClick={() => navigate('/shop')} className="text-heritage-rudraksha underline">Return to shop</button></div>;

  const basePrice = Number(product.price);
  const comparePrice = Number(product.comparePrice);
  const selectedCombo = combos.find(c => c.qty === quantity) || combos[0];
  const comboPricePerUnit = basePrice - (basePrice * (selectedCombo.discount / 100));
  const totalPrice = (comboPricePerUnit * quantity) + (addEnergization ? ENERGIZATION_COST : 0);

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setActiveCoupon(code);
    setTimeout(() => setActiveCoupon(null), 2000);
  };

  const handleDirectOrder = (paymentMode) => {
    addToCart(product, 'Standard', quantity, { 
      energization: addEnergization,
      energizationDetails: addEnergization ? { name: devoteeName, gotra: devoteeGotra } : null
    });
    navigate('/checkout', { state: { paymentMode } });
  };

  const checkDelivery = (e) => {
    e.preventDefault();
    if (pincode.length !== 6) return;
    setIsChecking(true);
    setTimeout(() => {
      const date = new Date();
      date.setDate(date.getDate() + 5);
      setDeliveryDate(date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' }));
      setIsChecking(false);
    }, 1000);
  };

  return (
    <div className="bg-heritage-parchment min-h-screen pb-32 font-body text-heritage-charcoal relative">
      
      {/* 1. BREADCRUMBS */}
      <div className="border-b border-heritage-mist bg-heritage-parchment/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-heritage-charcoal tracking-widest uppercase">
            <Link to="/" className="hover:text-heritage-rudraksha transition-colors">Home</Link> <ChevronRight size={10} />
            <Link to="/shop" className="hover:text-heritage-rudraksha transition-colors">Shop</Link> <ChevronRight size={10} />
            <span className="text-heritage-charcoal truncate max-w-[150px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* 2. GALLERY SECTION (Left) - REMOVED STICKY to fix cutting off */}
          <div className="w-full lg:w-[55%] h-fit">
             <ProductGallery images={galleryImages} />
          </div>

          {/* 3. BUY BOX SECTION (Right) */}
          <div className="w-full lg:w-[45%]">
            
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold mb-5 animate-fade-in">
              <div className="flex items-center gap-2 bg-alert-red text-white px-3 py-1.5 rounded-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                {viewCount} viewing now
              </div>
              <div className="flex items-center gap-2 bg-heritage-saffron text-heritage-charcoal px-3 py-1.5 rounded-md shadow-sm">
                <Clock size={14} />
                Dispatches in {timeLeft.hours}h {timeLeft.minutes}m
              </div>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-heritage-charcoal mb-3 leading-[1.1] tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3 cursor-pointer" onClick={() => document.getElementById('reviews-section').scrollIntoView({ behavior: 'smooth'})}>
                  <div className="flex text-heritage-saffron gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <span className="text-sm font-medium text-heritage-grey underline decoration-dotted decoration-gray-300">
                    4.9 (245 Reviews)
                  </span>
               </div>
            </div>

            <div className="w-full bg-heritage-mist/50 overflow-hidden rounded mb-6 py-2 border border-heritage-mist">
               <div className="whitespace-nowrap animate-marquee flex gap-8 text-xs font-bold uppercase tracking-widest text-heritage-charcoal">
                  <span>⚡ 100% Authentic From Kashi</span>
                  <span>⚡ Lab Certified Purity</span>
                  <span>⚡ Energized by Vedic Pandits</span>
                  <span>⚡ 7-Day Easy Returns</span>
               </div>
            </div>

            <div className="mb-6 p-4 bg-white border border-heritage-mist rounded-xl shadow-sm">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-heading font-bold text-heritage-charcoal">₹{totalPrice.toLocaleString()}</span>
                {comparePrice > 0 && (
                   <>
                     <span className="text-lg text-gray-400 line-through font-light mb-1">₹{(comparePrice * quantity).toLocaleString()}</span>
                     <span className="text-xs font-bold text-white bg-alert-green px-2 py-1 rounded mb-1.5">
                       SAVE {Math.round(((comparePrice - comboPricePerUnit) / comparePrice) * 100)}%
                     </span>
                   </>
                )}
              </div>
              <p className="text-xs text-heritage-grey font-medium flex items-center gap-1">
                <CheckCircle2 size={12} className="text-alert-green"/> Inclusive of all taxes & {quantity > 1 ? 'Combo Discount' : ''}
              </p>
            </div>

            {/* DELIVERY CHECK SECTION */}
            <div className="mb-6">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            maxLength={6}
                            placeholder="Enter Pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value.replace(/\D/g,''))}
                            className="w-full pl-9 pr-4 py-3 bg-white border border-heritage-mist rounded-lg text-sm focus:border-heritage-charcoal transition-colors"
                        />
                    </div>
                    <button 
                        onClick={checkDelivery}
                        disabled={pincode.length !== 6}
                        className="px-6 py-2 bg-heritage-charcoal text-white text-xs font-bold uppercase tracking-wider rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-colors"
                    >
                        {isChecking ? "Checking..." : "Check"}
                    </button>
                </div>
                {deliveryDate && (
                    <p className="text-xs text-alert-green font-bold mt-2 flex items-center gap-1 animate-fade-in">
                        <Truck size={14} /> Available! Estimated Delivery by {deliveryDate}
                    </p>
                )}
            </div>

            <div className="mb-8">
               <span className="font-heading text-sm font-bold text-heritage-charcoal uppercase tracking-wider mb-3 block">Select Pack (Save More)</span>
               <div className="grid grid-cols-3 gap-3">
                  {combos.map((combo) => (
                    <div 
                      key={combo.qty}
                      onClick={() => setQuantity(combo.qty)}
                      className={`cursor-pointer border-2 rounded-lg p-3 flex flex-col items-center justify-center transition-all ${quantity === combo.qty ? 'border-heritage-charcoal bg-gray-50' : 'border-heritage-mist bg-white hover:border-gray-300'}`}
                    >
                       <span className={`text-xs font-bold mb-1 ${quantity === combo.qty ? 'text-heritage-charcoal' : 'text-heritage-grey'}`}>{combo.label}</span>
                       {combo.discount > 0 && (
                          <span className="bg-alert-green text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">{combo.tag}</span>
                       )}
                       <span className="font-heading font-bold text-lg">₹{(comboPricePerUnit * combo.qty).toLocaleString()}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="mb-8 bg-white border border-dashed border-heritage-mist rounded-xl p-4 relative overflow-hidden">
               <h3 className="font-heading text-sm font-bold flex items-center gap-2 text-heritage-charcoal uppercase tracking-widest mb-3">
                  <Ticket size={16} className="text-heritage-charcoal"/> Available Coupons
               </h3>
               <div className="space-y-2">
                  {[
                    { code: "KASHI100", desc: "Flat ₹100 Off on First Order" },
                    { code: "PREPAID", desc: "Free 5 Mukhi Rudraksha on Prepaid" }
                  ].map((coupon, idx) => (
                     <div key={idx} className="flex justify-between items-center bg-heritage-parchment p-2 rounded border border-heritage-mist">
                        <div>
                           <span className="font-bold text-sm text-heritage-charcoal block">{coupon.code}</span>
                           <span className="text-[10px] text-heritage-grey">{coupon.desc}</span>
                        </div>
                        <button 
                           onClick={() => handleCopyCoupon(coupon.code)}
                           className="text-[10px] font-bold text-heritage-charcoal border border-heritage-charcoal px-2 py-1 rounded hover:bg-heritage-charcoal hover:text-white transition-colors"
                        >
                           {activeCoupon === coupon.code ? "COPIED" : "COPY"}
                        </button>
                     </div>
                  ))}
               </div>
            </div>

            {/* --- GENUINE PRAN PRATISTHA SECTION --- */}
            <div className={`mb-8 border transition-all rounded-xl overflow-hidden shadow-sm relative ${addEnergization ? 'border-heritage-rudraksha bg-white ring-1 ring-heritage-rudraksha/20' : 'border-heritage-mist bg-heritage-parchment/50'}`}>
               
               {/* Header - CLICKABLE TOGGLE */}
               <div 
                 onClick={() => setAddEnergization(!addEnergization)}
                 className="p-4 cursor-pointer hover:bg-black/5 transition-colors flex items-center justify-between"
               >
                  <div className="flex items-center gap-3">
                     <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${addEnergization ? 'bg-heritage-rudraksha border-heritage-rudraksha' : 'border-gray-400 bg-white'}`}>
                        {addEnergization && <CheckCircle2 size={14} className="text-white" />}
                     </div>
                     <div>
                        <div className="flex items-center gap-2">
                           <Sparkles size={16} className="text-heritage-saffron" /> 
                           <span className="font-heading font-bold text-sm text-heritage-charcoal">Vedic Pran Pratistha</span>
                        </div>
                        <p className="text-[10px] text-heritage-grey mt-0.5">Energized by Kashi Pandits in your name</p>
                     </div>
                  </div>
                  <span className="text-xs font-bold text-heritage-rudraksha">+₹{ENERGIZATION_COST}</span>
               </div>

               {/* Body - INPUTS */}
               {addEnergization && (
                 <div className="px-4 pb-4 pt-0 animate-fade-in border-t border-dashed border-heritage-mist mt-2">
                    <div className="flex items-center gap-2 mb-4 bg-yellow-50 p-2 rounded border border-yellow-100 mt-3">
                       <PlayCircle size={14} className="text-heritage-rudraksha" />
                       <span className="text-[10px] font-medium text-heritage-charcoal">We will send you a **Video** of the ritual on WhatsApp.</span>
                    </div>

                    <div className="space-y-3">
                       <input 
                         type="text" 
                         placeholder="Devotee Name (for Sankalp)" 
                         className="w-full text-xs p-2.5 border border-heritage-mist rounded focus:border-heritage-rudraksha outline-none transition-colors"
                         value={devoteeName}
                         onClick={(e) => e.stopPropagation()} 
                         onChange={(e) => setDevoteeName(e.target.value)}
                       />
                        <input 
                         type="text" 
                         placeholder="Gotra (Optional)" 
                         className="w-full text-xs p-2.5 border border-heritage-mist rounded focus:border-heritage-rudraksha outline-none transition-colors"
                         value={devoteeGotra}
                         onClick={(e) => e.stopPropagation()} 
                         onChange={(e) => setDevoteeGotra(e.target.value)}
                       />
                       <p className="text-[10px] text-heritage-grey italic">*Panditji will pronounce this name during the Abhishekam.</p>
                    </div>
                 </div>
               )}
            </div>

            {/* --- MAIN ACTION BUTTONS --- */}
            <div ref={mainActionsRef} className="flex flex-col sm:flex-row gap-3 mb-8">
              
              {/* COD BUTTON */}
              <button 
                onClick={() => handleDirectOrder('COD')}
                className="flex-1 py-4 px-4 rounded-lg bg-white border-2 border-heritage-charcoal text-heritage-charcoal font-heading font-bold text-xs hover:bg-heritage-charcoal hover:text-white transition-all shadow-sm tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <Truck size={16} />
                Order Now - Cash on Delivery
              </button>
              
              {/* PAY ONLINE BUTTON */}
              <button 
                onClick={() => handleDirectOrder('ONLINE')}
                className="flex-[1.2] py-4 px-4 rounded-lg bg-gradient-to-r from-heritage-rudraksha to-heritage-crimson text-white font-heading font-bold text-xs hover:shadow-xl hover:shadow-red-200 transition-all flex flex-col items-center justify-center gap-1 relative overflow-hidden group animate-pulse-glow"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
                <div className="flex items-center gap-2 relative z-20">
                   <span>PAY ONLINE & GET ₹{ONLINE_DISCOUNT} OFF</span>
                </div>
                <span className="text-[9px] font-medium opacity-90 relative z-20">UPI / Cards / NetBanking</span>
              </button>
            </div>

            {/* NEED HELP SECTION */}
            <div className="mt-6 pt-6 border-t border-heritage-mist flex items-center justify-between">
                <div>
                    <p className="font-heading font-bold text-sm text-heritage-charcoal">Need Help?</p>
                    <p className="text-[10px] text-gray-500">We are available on WhatsApp</p>
                </div>
                <button 
                    onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-heritage-mist rounded-full text-xs font-bold text-heritage-charcoal hover:border-heritage-charcoal transition-all shadow-sm"
                >
                    <MessageCircle size={14} />
                    Chat Now
                </button>
            </div>

          </div>
        </div>

        {/* 4. HIGH-CONTEXT NARRATIVE STACK - Cleaned up Colors */}
        <div className="mt-16 max-w-4xl mx-auto space-y-16">
          <section className="bg-white p-8 md:p-12 rounded-2xl border border-heritage-mist shadow-sm">
            <h3 className="font-heading text-3xl font-bold text-heritage-charcoal mb-6 text-center">Why You Need This</h3>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <p className="font-body text-heritage-grey leading-relaxed text-lg mb-6">
                  In a world of constant distraction and financial anxiety, your energy field can become clouded. 
                  This {product.name} is not just jewelry; it is a spiritual tool designed to <span className="text-heritage-charcoal font-bold">clear blockages</span> and align your vibration with prosperity.
                </p>
                <ul className="space-y-3">
                  {['Removes Financial Debt', 'Increases Mental Focus', 'Attracts New Opportunities'].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-heritage-charcoal" />
                      <span className="font-heading font-bold text-heritage-charcoal">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/3 aspect-square bg-heritage-parchment rounded-full flex items-center justify-center border-4 border-heritage-mist">
                 <Sparkles size={64} className="text-heritage-charcoal" />
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-2xl border border-heritage-mist">
            <div className="bg-heritage-charcoal text-white p-6 text-center">
              <h3 className="font-heading text-2xl font-bold">The Power of Sacred Materials</h3>
            </div>
            <div className="p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
               <div className="order-2 md:order-1">
                  <h4 className="font-bold text-heritage-charcoal text-lg mb-2">5 Mukhi Rudraksha</h4>
                  <p className="text-sm text-heritage-grey mb-6 leading-relaxed">
                    Sourced directly from the foothills of Nepal. Known for regulating blood pressure and bringing mental peace (Shanti).
                  </p>
                  
                  <h4 className="font-bold text-heritage-charcoal text-lg mb-2">Secondary Crystal</h4>
                  <p className="text-sm text-heritage-grey leading-relaxed">
                    Natural Pyrite (Fool's Gold) to attract wealth and abundance. Untreated and raw for maximum conductivity.
                  </p>
               </div>
               <div className="order-1 md:order-2 h-64 bg-heritage-parchment rounded-lg border border-dashed border-heritage-grey flex flex-col items-center justify-center gap-2">
                  <span className="text-xs font-bold text-heritage-grey uppercase">Raw Material View</span>
                  <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse"></div>
               </div>
            </div>
          </section>

          <section className="bg-heritage-parchment p-8 md:p-12 rounded-2xl border border-heritage-mist flex flex-col md:flex-row gap-8 items-center">
             <div className="w-full md:w-1/3 relative">
                <div className="aspect-[3/4] bg-white border-4 border-heritage-charcoal rounded shadow-xl flex items-center justify-center p-4">
                    <div className="border-2 border-dashed border-gray-200 w-full h-full flex items-center justify-center">
                      <span className="font-heading font-bold text-gray-300 transform -rotate-45">CERTIFICATE</span>
                    </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-heritage-charcoal text-white p-2 rounded-full shadow-lg">
                   <ShieldCheck size={24} />
                </div>
             </div>
             <div className="w-full md:w-2/3">
                <h3 className="font-heading text-3xl font-bold text-heritage-charcoal mb-4">100% Lab Tested & Certified</h3>
                <p className="font-body text-heritage-grey mb-6">
                  We combat the "Fear of the Fake." Every single bead is X-ray tested for internal seed structure and density. 
                  Your order comes with a unique government-registered lab certificate card.
                </p>
                <button className="text-sm font-bold text-heritage-charcoal underline decoration-2 underline-offset-4 uppercase tracking-widest hover:text-black">
                  View Sample Report
                </button>
             </div>
          </section>

          <section className="bg-white p-8 rounded-2xl border-2 border-dashed border-heritage-mist">
             <h3 className="font-heading text-xl font-bold text-heritage-charcoal mb-8 text-center uppercase tracking-widest">
               How to Wear (Vidhi)
             </h3>
             <div className="grid grid-cols-3 gap-4 text-center divide-x divide-heritage-mist">
                <div className="px-2">
                   <span className="block text-xs font-bold text-heritage-grey uppercase mb-2">Day</span>
                   <span className="font-heading text-xl md:text-2xl font-bold text-heritage-charcoal">Friday</span>
                </div>
                <div className="px-2">
                   <span className="block text-xs font-bold text-heritage-grey uppercase mb-2">Time</span>
                   <span className="font-heading text-xl md:text-2xl font-bold text-heritage-charcoal">Morning</span>
                </div>
                <div className="px-2">
                   <span className="block text-xs font-bold text-heritage-grey uppercase mb-2">Mantra</span>
                   <span className="font-heading text-sm md:text-lg font-bold text-heritage-charcoal">Om Shreem Hreem...</span>
                </div>
             </div>
          </section>

          <div id="reviews-section" className="pt-8">
             <h3 className="font-heading text-2xl font-bold text-heritage-charcoal mb-8 text-center">Devotee Experiences</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                   <div key={i} className="bg-white p-6 rounded-xl border border-heritage-mist shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                         <div className="flex text-heritage-saffron"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
                         <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Verified Buyer</span>
                      </div>
                      <p className="text-sm text-heritage-grey italic mb-4">"Absolutely divine energy. I felt a shift in my mindset within 3 days of wearing this. Packaging was secure and sacred."</p>
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-heritage-parchment flex items-center justify-center text-xs font-bold text-heritage-charcoal">RM</div>
                         <span className="text-xs font-bold text-heritage-charcoal">Rohan Mehta, Delhi</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* 5. STICKY ACTION BAR */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-heritage-mist p-3 z-50 transition-transform duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          
          {/* DESKTOP IMAGE - FIXED OBJECT-CONTAIN */}
          <div className="hidden md:flex items-center gap-3">
             <img src={galleryImages[0]} alt={product.name} className="w-12 h-12 rounded-md object-contain border border-heritage-mist bg-white" />
             <div>
                <p className="font-heading font-bold text-sm text-heritage-charcoal line-clamp-1">{product.name}</p>
                <p className="text-sm font-bold text-heritage-rudraksha">₹{totalPrice.toLocaleString()}</p>
             </div>
          </div>

          {/* MOBILE IMAGE - ADDED & FIXED OBJECT-CONTAIN */}
          <div className="md:hidden flex items-center gap-3 flex-1">
             <img src={galleryImages[0]} alt={product.name} className="w-10 h-10 rounded-md object-contain border border-heritage-mist bg-white" />
             <div>
                <p className="font-heading font-bold text-sm text-heritage-charcoal line-clamp-1">{product.name}</p>
                <p className="text-xs font-bold text-heritage-rudraksha">₹{totalPrice.toLocaleString()}</p>
             </div>
          </div>

          <div className="flex gap-2 flex-1 md:flex-none md:w-auto">
            {/* STICKY COD BUTTON */}
            <button 
              onClick={() => handleDirectOrder('COD')}
              className="flex-1 py-3 px-2 rounded-lg bg-white border-2 border-heritage-charcoal text-heritage-charcoal font-bold text-[10px] md:text-xs hover:bg-heritage-charcoal hover:text-white transition-colors uppercase tracking-tight"
            >
              Order Now - COD
            </button>
            
            {/* STICKY PAY ONLINE */}
            <button 
              onClick={() => handleDirectOrder('ONLINE')}
              className="flex-[1.2] py-3 px-2 rounded-lg bg-gradient-to-r from-heritage-rudraksha to-heritage-crimson text-white font-bold text-[10px] md:text-xs hover:shadow-lg transition-all flex flex-col items-center justify-center leading-none uppercase tracking-tight relative overflow-hidden animate-pulse-glow"
            >
              <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
              <span className="relative z-10">Pay Online - Get ₹{ONLINE_DISCOUNT} Off</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductDetailsPage;