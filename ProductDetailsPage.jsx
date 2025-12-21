import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, ChevronRight, Loader2, Share2, 
  Truck, CheckCircle2, Zap, Package, HelpCircle, Gift, ArrowRight, 
  Flame, Sparkles, Tag, Clock, Quote, MessageCircle, Phone, ShieldCheck,
  Plus, Minus 
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
  const [addEnergization, setAddEnergization] = useState(false);
  const [expandedSection, setExpandedSection] = useState('why');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [viewCount, setViewCount] = useState(12);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32 }); 

  const mainActionsRef = useRef(null);

  // --- CONFIG ---
  const ONLINE_DISCOUNT = 150; 
  const ENERGIZATION_COST = 301; 
  const WHATSAPP_NUMBER = "919305491919"; 

  const product = products.find(p => String(p.id) === id);
  const galleryImages = product ? (product.imageUrls || [product.featuredImageUrl]) : [];

  // --- OPTIMIZATION ---
  useEffect(() => {
    if (galleryImages.length > 0) {
      const img = new Image();
      img.src = galleryImages[0];
      img.fetchPriority = "high"; 
    }
  }, [galleryImages]);

  // --- EFFECTS ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { root: null, threshold: 0 } 
    );
    if (mainActionsRef.current) observer.observe(mainActionsRef.current);
    return () => { if (mainActionsRef.current) observer.unobserve(mainActionsRef.current); };
  }, []);

  useEffect(() => {
    setViewCount(Math.floor(Math.random() * (35 - 15 + 1)) + 15);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes === 0) return { hours: prev.hours - 1, minutes: 59 };
        return { ...prev, minutes: prev.minutes - 1 };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#FDFCF8]"><Loader2 className="animate-spin text-orange-600" size={40} /></div>;
  if (!product) return <div className="h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#FDFCF8]"><h2 className="text-2xl font-heading text-gray-800">Artifact not found</h2><button onClick={() => navigate('/shop')} className="text-orange-600 underline">Return to shop</button></div>;

  const price = Number(product.price);
  const comparePrice = Number(product.comparePrice);
  const finalPrice = addEnergization ? price + ENERGIZATION_COST : price;

  // --- HANDLERS ---
  const handleIncreaseQty = () => setQuantity(prev => prev + 1);
  const handleDecreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this sacred artifact: ${product.name}`,
          url: window.location.href,
        });
      } catch (error) { console.log('Error sharing:', error); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
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

  const handleDirectOrder = (paymentMode) => {
    addToCart(product, 'Standard', quantity, { energization: addEnergization });
    navigate('/checkout', { state: { paymentMode } });
  };

  const handleWhatsAppOrder = () => {
    const total = finalPrice * quantity;
    const message = `Namaste, I want to order *${quantity} x ${product.name}* (Total: ₹${total}). Please assist me.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const toggleSection = (section) => setExpandedSection(expandedSection === section ? null : section);

  return (
    <div className="bg-[#FDFCF8] min-h-screen pb-32 font-body text-gray-900 relative selection:bg-orange-100">
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 bg-[#FDFCF8]/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 tracking-widest uppercase">
            <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link> <ChevronRight size={10} />
            <Link to="/shop" className="hover:text-orange-600 transition-colors">Shop</Link> <ChevronRight size={10} />
            <span className="text-gray-900 truncate max-w-[150px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Gallery */}
          <div className="w-full lg:w-[55%] lg:sticky lg:top-24 h-fit">
             <ProductGallery images={galleryImages} />
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-[45%]">
            
            {/* Urgency */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold mb-5 animate-fade-in">
              <div className="flex items-center gap-2 text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                </span>
                {viewCount} viewing now
              </div>
              <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                <Clock size={12} />
                Dispatches in {timeLeft.hours}h {timeLeft.minutes}m
              </div>
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-[1.15] tracking-tight">
              {product.name}
            </h1>
            
            {/* Rating & Share */}
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-3">
                  <div className="flex text-yellow-500 gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <span className="text-sm font-medium text-gray-500 underline decoration-dotted decoration-gray-300 offset-4 cursor-pointer">
                    4.9 (245 Reviews)
                  </span>
               </div>
               
               <button onClick={handleShare} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-orange-600 transition-colors">
                  <Share2 size={16} /> Share
               </button>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-heading font-bold text-gray-900">₹{finalPrice.toLocaleString()}</span>
                {comparePrice > price && (
                   <>
                     <span className="text-lg text-gray-400 line-through font-light mb-1">₹{comparePrice.toLocaleString()}</span>
                     <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded mb-1.5">
                       SAVE {Math.round(((comparePrice - price) / comparePrice) * 100)}%
                     </span>
                   </>
                )}
              </div>
              <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <CheckCircle2 size={12} className="text-emerald-600"/> Inclusive of all taxes
              </p>
            </div>

            {/* Coupons */}
            <div className="mb-8 space-y-4">
              <h3 className="font-heading text-sm font-bold flex items-center gap-2 text-gray-900 uppercase tracking-widest">
                <Tag size={16} className="text-orange-600"/> Available Coupons
              </h3>
              <div className="flex bg-white border border-yellow-200 rounded-lg overflow-hidden shadow-sm relative group cursor-pointer hover:border-yellow-400 transition-colors">
                 <div className="bg-yellow-50 p-4 flex flex-col justify-center items-center border-r border-dashed border-yellow-200 min-w-[80px]">
                    <Gift size={24} className="text-yellow-600 mb-1" />
                    <span className="text-[10px] font-bold text-yellow-700">FLAT ₹150</span>
                 </div>
                 <div className="p-4 flex-1 flex justify-between items-center">
                    <div>
                       <p className="font-bold text-gray-900 text-sm">Use Code: PREPAID150</p>
                       <p className="text-xs text-gray-500">Save ₹150 instantly on prepaid orders</p>
                    </div>
                    <button className="text-[10px] font-bold bg-gray-900 text-white px-3 py-1.5 rounded uppercase tracking-widest hover:bg-gray-700 transition-colors">
                      Apply
                    </button>
                 </div>
              </div>
            </div>

            {/* Energization */}
            <div className="mb-8 border border-orange-100 bg-orange-50/30 rounded-xl overflow-hidden shadow-sm">
               <div className="bg-orange-50 p-3 border-b border-orange-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Flame size={16} className="text-orange-600 fill-orange-200" />
                    <span className="font-heading text-sm font-bold text-orange-800">Prana Pratistha Ritual</span>
                  </div>
                  <span className="text-[9px] font-bold bg-white text-orange-600 px-2 py-0.5 rounded border border-orange-200 uppercase">Recommended</span>
               </div>
               <div className="p-4">
                 <p className="text-xs text-gray-600 leading-relaxed mb-4">
                   Our pundits will energize this artifact in your name at Kashi Vishwanath temple before dispatch.
                 </p>
                 <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${addEnergization ? 'border-orange-500 bg-white shadow-md' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${addEnergization ? 'bg-orange-500 border-orange-500' : 'border-gray-300 bg-white'}`}>
                        {addEnergization && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <span className={`text-sm font-bold ${addEnergization ? 'text-orange-800' : 'text-gray-700'}`}>Add Energization</span>
                    </div>
                    <span className="text-sm font-bold text-orange-700">+₹{ENERGIZATION_COST}</span>
                 </label>
                 <input type="checkbox" className="hidden" checked={addEnergization} onChange={() => setAddEnergization(!addEnergization)} />
               </div>
            </div>

            {/* --- QUANTITY SELECTOR --- */}
            <div className="flex items-center gap-4 mb-6">
                <span className="font-heading text-sm font-bold text-gray-900 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden shadow-sm">
                    <button onClick={handleDecreaseQty} className="px-4 py-2 text-gray-500 hover:bg-gray-100 transition-colors" disabled={quantity <= 1}>
                        <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm text-gray-900">{quantity}</span>
                    <button onClick={handleIncreaseQty} className="px-4 py-2 text-gray-500 hover:bg-gray-100 transition-colors">
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* --- MAIN ACTION BUTTONS (COLOR HARMONY) --- */}
            <div ref={mainActionsRef} className="grid grid-cols-2 gap-3 mb-8">
              {/* COD: Strong Dark Neutral */}
              <button 
                onClick={() => handleDirectOrder('COD')}
                className="col-span-1 py-4 rounded-lg bg-gray-900 text-white font-heading font-bold text-sm hover:bg-gray-800 transition-all flex flex-col items-center justify-center gap-1 shadow-lg shadow-gray-200"
              >
                CASH ON DELIVERY
                <span className="text-[10px] font-medium opacity-70">Pay at doorstep</span>
              </button>
              
              {/* ONLINE: Vibrant Saffron Gradient */}
              <button 
                onClick={() => handleDirectOrder('ONLINE')}
                className="col-span-1 py-4 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 text-white font-heading font-bold text-sm hover:shadow-xl hover:shadow-orange-200 transition-all flex flex-col items-center justify-center gap-1 relative overflow-hidden group"
              >
                <div className="relative z-10 flex items-center gap-2">PAY ONLINE <ArrowRight size={14}/></div>
                <span className="relative z-10 text-[10px] font-bold bg-white/20 px-2 rounded-full">Save ₹{ONLINE_DISCOUNT}</span>
              </button>
            </div>

            {/* Check Delivery */}
            <div className="mb-8 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
               <p className="text-xs font-bold text-gray-900 mb-3 flex items-center gap-2 uppercase tracking-wide">
                 <Truck size={14} className="text-amber-600"/> Check Delivery
               </p>
               <form onSubmit={checkDelivery} className="flex gap-2 relative">
                 <input 
                   type="text" 
                   maxLength={6}
                   placeholder="Enter Pincode" 
                   value={pincode}
                   onChange={(e) => setPincode(e.target.value.replace(/\D/g,''))}
                   className="flex-1 bg-gray-50 border-none rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                 />
                 <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-orange-600 bg-white px-3 py-1.5 rounded-md border border-gray-200 hover:border-orange-500 transition-colors shadow-sm">
                    {isChecking ? "..." : "CHECK"}
                 </button>
               </form>
               {deliveryDate && (
                 <p className="text-xs text-emerald-600 mt-3 font-bold flex items-center gap-1.5 animate-fade-in">
                   <CheckCircle2 size={14}/> Delivery by {deliveryDate}
                 </p>
               )}
            </div>

            {/* Need Help / WhatsApp */}
            <div className="mb-10 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
               <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center gap-3">
                  <div className="bg-[#25D366] text-white p-2 rounded-full">
                     <MessageCircle size={20} />
                  </div>
                  <div>
                     <h4 className="text-sm font-bold text-gray-900">Need help deciding?</h4>
                     <p className="text-xs text-emerald-700">Chat with our experts from Kashi.</p>
                  </div>
               </div>
               
               <div className="p-4 grid grid-cols-1 gap-3">
                  <button 
                    onClick={handleWhatsAppOrder}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm rounded-lg transition-colors shadow-sm uppercase tracking-wide"
                  >
                     <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                     ORDER ON WHATSAPP
                  </button>
               </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200 mb-10">
              <AccordionItem title="Why Vishwanatham?" isOpen={expandedSection === 'why'} onClick={() => toggleSection('why')} icon={<ShieldCheck size={16}/>}>
                <div className="space-y-4 pt-2">
                   <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"><ShieldCheck size={16}/></div>
                      <div>
                         <h4 className="text-sm font-bold text-gray-900">Lab Certified Authentic</h4>
                         <p className="text-xs text-gray-500">Every bead is X-Ray tested and certified for purity.</p>
                      </div>
                   </div>
                   <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"><Flame size={16}/></div>
                      <div>
                         <h4 className="text-sm font-bold text-gray-900">Kashi Energized</h4>
                         <p className="text-xs text-gray-500">Blessed in the sanctum of Vishwanath temple.</p>
                      </div>
                   </div>
                </div>
              </AccordionItem>
              
              <AccordionItem title="Product Details" isOpen={expandedSection === 'details'} onClick={() => toggleSection('details')} icon={<Tag size={16}/>}>
                <p>{product.fullDescription || "Sourced directly from the holy ghats of Varanasi. Bead Size: 18mm-22mm. Origin: Nepal/Indonesia. Stringing: Durable sacred thread with knots between beads."}</p>
              </AccordionItem>
              
              <AccordionItem title="Ritual & Care Guide" isOpen={expandedSection === 'care'} onClick={() => toggleSection('care')} icon={<Sparkles size={16}/>}>
                <ul className="list-disc pl-4 space-y-3 marker:text-orange-500 text-sm text-gray-600">
                  <li><strong>Cleansing:</strong> Wash with holy water (Ganga Jal) and oil the beads once a month.</li>
                  <li><strong>Wearing Mantra:</strong> Chant "Om Namah Shivaya" 9 times before wearing for maximum benefit.</li>
                  <li><strong>Precautions:</strong> Remove during funeral rites or while visiting a cemetery.</li>
                </ul>
              </AccordionItem>
              
              <AccordionItem title="Shipping & Returns" isOpen={expandedSection === 'shipping'} onClick={() => toggleSection('shipping')} icon={<Package size={16}/>}>
                 <div className="space-y-2">
                    <p className="flex items-center gap-2"><Truck size={14}/> <strong>Dispatch:</strong> Within 24 hours via BlueDart/Delhivery.</p>
                    <p className="flex items-center gap-2"><ArrowRight size={14}/> <strong>Returns:</strong> 7-day no-questions-asked replacement policy.</p>
                 </div>
              </AccordionItem>
            </div>

            {/* Reviews */}
            <div className="mb-10 bg-white p-6 rounded-xl border border-gray-200">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading text-lg font-bold text-gray-900">Customer Reviews</h3>
                  <button className="text-xs font-bold text-orange-600 hover:underline">View All</button>
               </div>
               <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4">
                     <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-500"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                        <span className="text-xs font-bold">Rohan Mehta</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded">Verified</span>
                     </div>
                     <p className="text-xs text-gray-500 italic">"The quality is unmatched. I can feel the vibration. Packaging was excellent."</p>
                  </div>
               </div>
               <button className="w-full mt-4 py-2 border border-gray-900 text-gray-900 text-xs font-bold rounded hover:bg-gray-900 hover:text-white transition-colors">
                  Write a Review
               </button>
            </div>

          </div>
        </div>
        
        {/* Upsells */}
        <div className="mt-24 pt-12 border-t border-gray-200">
           <h3 className="font-heading text-2xl font-bold text-gray-900 mb-8 text-center">Complete Your Shrine</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[1,2,3,4].map((i) => (
                <div key={i} className="aspect-[4/5] bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-lg transition-all group">
                  <div className="w-20 h-20 bg-gray-50 rounded-full mb-4 group-hover:scale-110 transition-transform"></div>
                  <h4 className="text-sm font-bold text-gray-900">Sacred Item {i}</h4>
                  <p className="text-xs text-gray-500 mt-1">₹1,299</p>
                </div>
              ))}
           </div>
        </div>

      </div>

      {/* --- UNIVERSAL STICKY BUY BAR (Desktop & Mobile) --- */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 z-50 transition-transform duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          
          <div className="hidden md:flex items-center gap-3">
             <img src={galleryImages[0]} alt={product.name} className="w-12 h-12 rounded-md object-cover border border-gray-200" />
             <div>
                <p className="font-heading font-bold text-sm text-gray-900 line-clamp-1">{product.name}</p>
                <p className="text-sm font-bold text-orange-700">₹{finalPrice.toLocaleString()}</p>
             </div>
          </div>

          <div className="md:hidden flex-1">
            <p className="text-lg font-heading font-bold text-gray-900 leading-none">₹{finalPrice.toLocaleString()}</p>
            {comparePrice > price && <p className="text-[10px] text-emerald-700 font-bold mt-0.5">Save ₹{(comparePrice - price).toLocaleString()}</p>}
          </div>

          <div className="flex gap-2 flex-1 md:flex-none md:w-auto">
            <button 
              onClick={() => handleDirectOrder('COD')}
              className="flex-1 md:flex-none md:px-6 py-3 rounded-lg bg-gray-900 text-white font-heading font-bold text-[10px] md:text-xs hover:bg-gray-800 transition-colors"
            >
              COD
            </button>
            <button 
              onClick={() => handleDirectOrder('ONLINE')}
              className="flex-1 md:flex-none md:px-8 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 text-white font-heading font-bold text-[10px] md:text-xs hover:shadow-lg transition-all flex flex-col items-center justify-center leading-none"
            >
              PAY ONLINE
              <span className="text-[8px] md:text-[9px] font-medium opacity-80 mt-0.5 scale-90">Save ₹{ONLINE_DISCOUNT}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

// Helper Components
const AccordionItem = ({ title, isOpen, onClick, children, icon }) => (
  <div className="border-b border-gray-200 last:border-0">
    <button 
      onClick={onClick}
      className="w-full flex justify-between items-center py-5 text-left hover:bg-white transition-colors group px-2 -mx-2"
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-gray-500 group-hover:text-orange-600 transition-colors">{icon}</span>}
        <span className="font-heading text-base font-medium text-gray-900 group-hover:text-orange-600 transition-colors">{title}</span>
      </div>
      <ChevronRight size={16} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
      <div className="text-sm text-gray-600 leading-relaxed pl-1 pr-4">
        {children}
      </div>
    </div>
  </div>
);

export default ProductDetailsPage;