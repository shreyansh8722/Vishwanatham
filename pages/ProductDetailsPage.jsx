import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Share2, Heart, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../hooks/useFavorites';
// Mock Data import - replace with context or API in real app
import { useProductContext } from '../context/ProductContext'; // Assuming you have this or use local data

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  // Simplified product fetching for demo - normally useProductContext
  // For now, mocking a single product if context isn't fully wired for ID lookup
  const product = {
    id: parseInt(id),
    name: "Divine Rudraksha Mala",
    price: 1500,
    description: "Authentic 5-mukhi Rudraksha mala sourced directly from Kashi. Perfect for daily mantra chanting (Japa) and wearing for spiritual protection.",
    images: [
      "https://images.unsplash.com/photo-1611568285568-3d846513369a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603038930495-2c26279f6764?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Rudraksha",
    inStock: true
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const isLiked = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, 'Standard', quantity);
  };

  return (
    <div className="pt-10 pb-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-8 font-montserrat">
          <Link to="/" className="hover:text-stone-900">Home</Link> / 
          <Link to="/shop" className="hover:text-stone-900 mx-1">Shop</Link> / 
          <span className="text-stone-900 mx-1">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 md:h-[600px] scrollbar-hide">
              {product.images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img}
                  alt={`View ${idx}`}
                  className={`w-20 h-24 object-cover cursor-pointer border ${selectedImage === img ? 'border-stone-900' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <div className="flex-1 h-[500px] md:h-[600px] bg-stone-50 overflow-hidden">
              <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2 lg:pl-10">
            <h1 className="font-cormorant text-4xl md:text-5xl text-stone-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xl font-montserrat font-medium text-stone-900">₹{product.price.toLocaleString()}</span>
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <span className="text-stone-400 ml-1">(24 Reviews)</span>
              </div>
            </div>

            <p className="font-montserrat text-stone-500 leading-relaxed mb-8 text-sm">
              {product.description}
            </p>

            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-stone-900 block mb-3">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-200 w-32 justify-between">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-stone-50"><Minus className="w-4 h-4 text-stone-500" /></button>
                  <span className="font-montserrat text-stone-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-stone-50"><Plus className="w-4 h-4 text-stone-500" /></button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-stone-900 text-white py-3 px-8 text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => toggleFavorite(product)}
                  className={`p-3 border border-stone-200 hover:border-stone-900 transition-colors ${isLiked ? 'text-red-600 border-red-200' : 'text-stone-400'}`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-stone-100 pt-8 mb-8">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-stone-400" strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-wider text-stone-600">Free Shipping over ₹2500</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-stone-400" strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-wider text-stone-600">Authenticity Guaranteed</span>
              </div>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex border-b border-stone-100 mb-6">
                {['Description', 'Details', 'Shipping'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-3 mr-8 text-xs uppercase tracking-widest transition-colors ${activeTab === tab.toLowerCase() ? 'border-b border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="font-montserrat text-sm text-stone-500 leading-relaxed min-h-[100px]">
                {activeTab === 'description' && <p>Deeply connected to Lord Shiva, Rudraksha beads are known for their protective and healing properties. This Mala is strung with high-quality silk thread and blessed in the Vishwanath temple.</p>}
                {activeTab === 'details' && <ul className="list-disc pl-4 space-y-1"><li>Material: 5 Mukhi Rudraksha</li><li>Bead Size: 8mm</li><li>Length: 32 inches</li><li>Origin: Nepal/Indonesia</li></ul>}
                {activeTab === 'shipping' && <p>Dispatched within 24 hours. Delivery takes 3-7 business days depending on location. International shipping available.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;