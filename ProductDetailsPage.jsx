import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, ChevronRight, Loader2, Truck, CheckCircle2, 
  Flame, ShieldCheck, MessageCircle, ArrowRight, Sun, Calendar, Hand
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
  const [isChecking, setIsChecking] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [addEnergization, setAddEnergization] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const mainActionsRef = useRef(null);

  // --- CONFIG ---
  const ENERGIZATION_COST = 301; 
  const WHATSAPP_NUMBER = "919305491919"; 

  const product = products.find(p => String(p.id) === id);
  const galleryImages = product ? (product.imageUrls || [product.featuredImageUrl]) : [];

  // --- SCROLL OBSERVER FOR STICKY BAR ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { root: null, threshold: 0 } 
    );
    if (mainActionsRef.current) observer.observe(mainActionsRef.current);
    return () => { if (mainActionsRef.current) observer.unobserve(mainActionsRef.current); };
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#F9F7F2]"><Loader2 className="animate-spin text-[#BC002D]" size={40} /></div>;
  if (!product) return <div className="h-[60vh] flex flex-col items-center justify-center bg-[#F9F7F2]"><h2 className="text-2xl font-heading text-[#2C2C2C]">Artifact not found</h2></div>;

  const price = Number(product.price);
  const comparePrice = Number(product.comparePrice);
  const finalPrice = addEnergization ? price + ENERGIZATION_COST : price;

  // --- HANDLERS ---
  const checkDelivery = (e) => {
    e.preventDefault();
    if (pincode.length !== 6) return;
    setIsChecking(true);
    setTimeout(() => {
      setDeliveryDate("Wednesday, 28th Aug");
      setIsChecking(false);
    }, 1000);
  };

  const handleDirectOrder = (paymentMode) => {
    addToCart(product, 'Standard', quantity, { energization: addEnergization });
    navigate('/checkout', { state: { paymentMode } });
  };

  const handleWhatsAppOrder = () => {
    const message = `Namaste, I want to order *${quantity} x ${product.name}* (Total: ₹${finalPrice * quantity}).`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    // BG: Warm Parchment (#F9F7F2) per report
    <div className="bg-[#F9F7F2] min-h-screen pb-32 font-body text-[#2C2C2C] relative">
      
      {/* 1. BREADCRUMBS */}
      <div className="border-b border-gray-200 bg-[#F9F7F2]/95 sticky top-0 z-30 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 tracking-widest uppercase font-body">
            <Link to="/" className="hover:text-[#BC002D]">Home</Link> <ChevronRight size={10} />
            <Link to="/shop" className="hover:text-[#BC002D]">Shop</Link> <ChevronRight size={10} />
            <span className="text-[#2C2C2C] truncate font-bold">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* 2. GALLERY (Left) - Sticky on Desktop */}
          <div className="w-full lg:w-[55%] lg:sticky lg:top-24 h-fit">
             <ProductGallery images={galleryImages} />
          </div>

          {/* 3. BUY BOX (Right) - The "Transactional Upper Fold" */}
          <div className="w-full lg:w-[45%]">
            
            {/* Title: Playfair Display (Guru Voice) */}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-2 leading-tight">
              {product.name}
            </h1>
            
            {/* Social Proof Summary */}
            <div className="flex items-center gap-3 mb-6">
               <div className="flex text-[#FFC107] gap-0.5">
                 {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
               </div>
               <span className="text-sm font-medium text-gray-600 border-b border-gray-300 border-dashed cursor-pointer hover:text-[#BC002D] hover:border-[#BC002D]">
                 4.9 (1,531 Reviews)
               </span>
            </div>

            {/* Price Block: High Visibility */}
            <div className="mb-8 p-5 bg-white border border-[#E5E5E5] rounded-lg shadow-sm">
              <div className="flex items-end gap-3 mb-1">
                <span className="text-3xl font-body font-bold text-[#2C2C2C]">₹{finalPrice.toLocaleString()}</span>
                {comparePrice > price && (
                   <span className="text-lg text-gray-400 line-through mb-1">₹{comparePrice.toLocaleString()}</span>
                )}
                {comparePrice > price && (
                  <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded mb-2">
                    SAVE ₹{(comparePrice - price).toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                <CheckCircle2 size={12} className="text-[#2E8B57]"/> Inclusive of all taxes & Vedic Puja
              </p>
            </div>

            {/* The "Upsell" Checkbox: Saffron Highlight */}
            <div className="mb-8 bg-[#FFF9C4]/40 border border-[#FFDE59] rounded-lg overflow-hidden transition-all hover:shadow-md">
               <div className="bg-[#FFDE59]/20 p-3 border-b border-[#FFDE59]/50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Flame size={16} className="text-[#BC002D]" />
                    <span className="font-heading text-sm font-bold text-[#2C2C2C]">Prana Pratistha (Energization)</span>
                  </div>
                  <span className="text-[9px] font-bold bg-[#BC002D] text-white px-2 py-0.5 rounded uppercase tracking-wider">Recommended</span>
               </div>
               <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/50 transition-colors select-none">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${addEnergization ? 'bg-[#BC002D] border-[#BC002D]' : 'border-gray-400 bg-white'}`}>
                      {addEnergization && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#2C2C2C]">Energize in my name</span>
                      <span className="text-[10px] text-gray-600 font-medium">Performed by 11 Pandits with Vedic Mantra</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#BC002D]">+₹{ENERGIZATION_COST}</span>
               </label>
               <input type="checkbox" className="hidden" checked={addEnergization} onChange={() => setAddEnergization(!addEnergization)} />
            </div>

            {/* Main Actions */}
            <div ref={mainActionsRef} className="flex flex-col gap-3 mb-8">
              <div className="flex gap-3 h-12">
                {/* Secondary: Add to Cart */}
                <button 
                  onClick={() => { addToCart(product, 'Standard', quantity, { energization: addEnergization }); }}
                  className="w-1/3 bg-white border border-[#2C2C2C] text-[#2C2C2C] font-body font-bold text-sm uppercase tracking-wide hover:bg-gray-50 transition-colors"
                >
                  Add to Cart
                </button>
                
                {/* Primary: Buy Now (Vedic Crimson) */}
                <button 
                  onClick={() => handleDirectOrder('ONLINE')}
                  className="w-2/3 bg-[#BC002D] text-white font-body font-bold text-sm uppercase tracking-wide hover:bg-[#900022] shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  Buy Now <ArrowRight size={16} />
                </button>
              </div>
              
              {/* WhatsApp Trust Signal */}
              <button onClick={handleWhatsAppOrder} className="text-xs font-bold text-[#2E8B57] flex items-center justify-center gap-2 hover:underline py-2">
                 <MessageCircle size={14} /> Questions? Chat with us on WhatsApp
              </button>
            </div>

            {/* Delivery Checker */}
            <div className="mb-8 p-4 bg-white rounded-lg border border-gray-200">
               <p className="text-xs font-bold text-[#2C2C2C] mb-2 uppercase tracking-wide">Check Delivery Date</p>
               <div className="flex gap-2">
                 <input 
                   type="text" 
                   maxLength={6}
                   placeholder="Enter Pincode" 
                   value={pincode}
                   onChange={(e) => setPincode(e.target.value.replace(/\D/g,''))}
                   className="flex-1 bg-[#F9F7F2] border-none rounded px-3 py-2 text-sm focus:ring-1 focus:ring-[#BC002D] placeholder:text-gray-400"
                 />
                 <button onClick={checkDelivery} className="text-xs font-bold text-[#BC002D] uppercase px-4 hover:bg-[#BC002D]/10 rounded transition-colors">
                    {isChecking ? "..." : "Check"}
                 </button>
               </div>
               {deliveryDate && (
                 <p className="text-xs text-[#2E8B57] mt-3 font-bold flex items-center gap-1.5 animate-fade-in">
                   <Truck size={14}/> Estimated delivery by {deliveryDate}
                 </p>
               )}
            </div>

          </div>
        </div>

        {/* 4. THE "HIGH-CONTEXT" NARRATIVE (Below Fold) - STACKED VERTICALLY */}
        {/* We rejected tabs to mirror the Japam "Scroll for Trust" model */}
        <div className="mt-16 lg:mt-24 max-w-4xl mx-auto space-y-16 pb-12 border-t border-gray-200 pt-16">
           
           {/* Block 1: The Problem/Solution */}
           <section className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 bg-[#FFDE59] rounded-full flex items-center justify-center text-[#2C2C2C] font-bold text-xl shrink-0 shadow-sm font-heading">1</div>
              <div>
                 <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-4">Why You Need This Artifact</h2>
                 <p className="font-body text-gray-700 leading-relaxed mb-6 text-lg">
                   In a world of constant distraction and energy drains, this {product.name} acts as a spiritual anchor. 
                   Traditionally used to remove obstacles and attract abundance, it is not just jewelry—it is a tool for realignment.
                 </p>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Removes financial blockages', 'Enhances focus and clarity', 'Protects from negative drishti', 'Balances planetary Doshas'].map((item,i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-[#2C2C2C] bg-white p-3 rounded border border-gray-100">
                        <CheckCircle2 size={18} className="text-[#8C8000]" /> {item}
                      </li>
                    ))}
                 </ul>
              </div>
           </section>

           {/* Block 2: Authenticity */}
           <section className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 bg-[#FFDE59] rounded-full flex items-center justify-center text-[#2C2C2C] font-bold text-xl shrink-0 shadow-sm font-heading">2</div>
              <div>
                 <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-4">Lab Certified Purity</h2>
                 <p className="font-body text-gray-700 leading-relaxed mb-6 text-lg">
                   Unlike cheap market imitations, every bead at Vishwanatham is X-Ray tested. We provide a government-registered lab certificate with every purchase, guaranteeing density, authenticity, and origin.
                 </p>
                 <div className="bg-white p-6 border border-gray-200 rounded-lg inline-flex items-center gap-6 shadow-sm">
                    <ShieldCheck size={48} className="text-[#BC002D]" />
                    <div>
                       <p className="font-heading font-bold text-lg text-[#2C2C2C]">ISO 9001:2015 Certified</p>
                       <p className="text-sm text-gray-500">Certificate included in the box</p>
                    </div>
                 </div>
              </div>
           </section>

           {/* Block 3: The Ritual (Vidhi) */}
           <section className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 bg-[#FFDE59] rounded-full flex items-center justify-center text-[#2C2C2C] font-bold text-xl shrink-0 shadow-sm font-heading">3</div>
              <div>
                 <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-4">How to Wear (Vidhi)</h2>
                 <p className="font-body text-gray-700 leading-relaxed mb-6">
                    To activate the full potential of this artifact, follow this simple Vedic ritual upon receiving it.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded border border-[#E5E5E5] flex flex-col items-center text-center gap-2">
                       <Calendar size={24} className="text-[#BC002D]" />
                       <div>
                           <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Day</p>
                           <p className="font-bold text-[#2C2C2C]">Monday / Thursday</p>
                       </div>
                    </div>
                    <div className="bg-white p-5 rounded border border-[#E5E5E5] flex flex-col items-center text-center gap-2">
                       <Sun size={24} className="text-[#BC002D]" />
                       <div>
                           <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Mantra</p>
                           <p className="font-bold text-[#2C2C2C]">Om Namah Shivaya (108x)</p>
                       </div>
                    </div>
                    <div className="bg-white p-5 rounded border border-[#E5E5E5] flex flex-col items-center text-center gap-2">
                       <Hand size={24} className="text-[#BC002D]" />
                       <div>
                           <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Direction</p>
                           <p className="font-bold text-[#2C2C2C]">Facing East</p>
                       </div>
                    </div>
                 </div>
              </div>
           </section>

        </div>

      </div>

      {/* 5. MOBILE STICKY ACTIONS */}
      {/* Appears only on mobile, fixed at bottom */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex gap-2">
          <button 
            onClick={() => { addToCart(product, 'Standard', quantity); }}
            className="flex-1 bg-white border border-[#2C2C2C] text-[#2C2C2C] font-bold text-xs py-3.5 uppercase tracking-wide rounded"
          >
            Add to Cart
          </button>
          <button 
            onClick={() => handleDirectOrder('ONLINE')}
            className="flex-1 bg-[#BC002D] text-white font-bold text-xs py-3.5 uppercase tracking-wide rounded shadow-md"
          >
            Buy Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductDetailsPage;