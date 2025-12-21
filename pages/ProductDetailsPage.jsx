import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Truck, ShieldCheck, Star, Minus, Plus, ChevronRight, Loader2, Heart, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useFavorites } from '../hooks/useFavorites';
import ProductGallery from '../components/shop/ProductGallery'; // Use new gallery

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const product = products.find(p => String(p.id) === id);
  const [quantity, setQuantity] = useState(1);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#FAFAFA]"><Loader2 className="animate-spin text-[#B08D55]" size={40} /></div>;
  if (!product) return <div className="h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#FAFAFA]"><h2 className="text-2xl font-serif text-[#2C1810]">Artifact Not Found</h2><button onClick={() => navigate('/shop')} className="text-[#B08D55] underline font-bold tracking-wide">Return to Sanctum</button></div>;

  const galleryImages = product.imageUrls || [product.featuredImageUrl];
  const price = Number(product.price);
  const comparePrice = Number(product.comparePrice);
  const isLiked = isFavorite(product.id);

  return (
    <div className="pt-6 pb-20 bg-white min-h-screen font-sans">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-[#B08D55] transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-[#B08D55] transition-colors">Collection</Link> 
          <ChevronRight size={10} />
          <span className="text-[#2C1810] truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="w-full lg:w-[55%]">
             <ProductGallery images={galleryImages} />
          </div>

          <div className="w-full lg:w-[45%] lg:sticky lg:top-28 h-fit">
            <span className="inline-block px-3 py-1 bg-[#FDF6E7] text-[#B08D55] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
               {product.category || "Sacred Artifact"}
            </span>

            <h1 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-3 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-6 text-[#F2C75C]">
               {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
               <span className="text-xs text-gray-400 font-medium ml-2">(24 Reviews)</span>
            </div>

            <div className="flex items-end gap-4 mb-8 border-b border-gray-100 pb-8">
              <span className="text-3xl font-bold text-[#2C1810]">₹{price.toLocaleString()}</span>
              {comparePrice > price && (
                 <div className="flex flex-col mb-1">
                    <span className="text-sm text-gray-400 line-through">₹{comparePrice.toLocaleString()}</span>
                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-wide">Save ₹{(comparePrice - price).toLocaleString()}</span>
                 </div>
              )}
            </div>

            <div className="flex flex-col gap-5 mb-8">
               <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-xl h-14 w-36 justify-between px-2 bg-[#FAFAFA]">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-[#B08D55] text-gray-400 transition-colors"><Minus size={18} /></button>
                    <span className="font-bold text-lg text-[#1C1917]">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-[#B08D55] text-gray-400 transition-colors"><Plus size={18} /></button>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(product, 'Standard', quantity)}
                    className="flex-1 bg-[#2C1810] text-white h-14 rounded-xl font-bold uppercase tracking-widest hover:bg-[#B08D55] transition-all shadow-xl hover:shadow-[#B08D55]/20 flex items-center justify-center gap-3 group"
                  >
                    Add to Cart
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button onClick={() => toggleFavorite(product)} className={`h-14 w-14 border border-gray-200 rounded-xl flex items-center justify-center transition-colors ${isLiked ? 'text-red-500 bg-red-50 border-red-200' : 'text-gray-400 hover:border-[#B08D55] hover:text-[#B08D55]'}`}>
                    <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                  </button>
               </div>
               
               <div className="flex justify-between items-center text-xs px-1">
                 <p className="text-green-700 font-bold flex items-center gap-2">
                   <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span></span>
                   In Stock - Ready to Dispatch
                 </p>
                 <button className="flex items-center gap-1.5 text-gray-400 hover:text-[#2C1810] font-bold transition-colors uppercase tracking-wide"><Share2 size={14} /> Share</button>
               </div>
            </div>

            <div className="prose prose-sm text-gray-600 mb-8 leading-7 font-sans">
              <p>{product.fullDescription || product.description || "Authentic spiritual artifact sourced directly from the holy city of Kashi."}</p>
            </div>

            <div className="bg-[#FAFAFA] rounded-2xl p-6 mb-8 border border-[#F0EBE5]">
               <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  {product.mukhi && <div><span className="block text-[#B08D55] text-[10px] uppercase font-bold tracking-widest mb-1">Mukhi</span><span className="font-serif text-lg text-[#2C1810]">{product.mukhi}</span></div>}
                  {product.origin && <div><span className="block text-[#B08D55] text-[10px] uppercase font-bold tracking-widest mb-1">Origin</span><span className="font-serif text-lg text-[#2C1810]">{product.origin}</span></div>}
                  {product.deity && <div><span className="block text-[#B08D55] text-[10px] uppercase font-bold tracking-widest mb-1">Deity</span><span className="font-serif text-lg text-[#2C1810]">{product.deity}</span></div>}
                  {product.chakra && <div><span className="block text-[#B08D55] text-[10px] uppercase font-bold tracking-widest mb-1">Chakra</span><span className="font-serif text-lg text-[#2C1810]">{product.chakra}</span></div>}
               </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
               <div className="p-4 rounded-xl bg-white border border-gray-100 hover:border-[#B08D55] transition-colors group">
                 <Truck size={24} className="text-gray-400 group-hover:text-[#B08D55] mx-auto mb-2 transition-colors" strokeWidth={1.5} />
                 <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-[#2C1810]">Fast Ship</p>
               </div>
               <div className="p-4 rounded-xl bg-white border border-gray-100 hover:border-[#B08D55] transition-colors group">
                 <ShieldCheck size={24} className="text-gray-400 group-hover:text-[#B08D55] mx-auto mb-2 transition-colors" strokeWidth={1.5} />
                 <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-[#2C1810]">Authentic</p>
               </div>
               <div className="p-4 rounded-xl bg-white border border-gray-100 hover:border-[#B08D55] transition-colors group">
                 <Star size={24} className="text-gray-400 group-hover:text-[#B08D55] mx-auto mb-2 transition-colors" strokeWidth={1.5} />
                 <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-[#2C1810]">Premium</p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;