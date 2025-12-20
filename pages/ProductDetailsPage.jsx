import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Heart, Minus, Plus, Home, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../hooks/useFavorites';
import { useProducts } from '../context/ProductContext';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { products } = useProducts();
  
  const productFound = products.find(p => p.id === parseInt(id));
  
  const defaultProduct = {
    id: parseInt(id) || 1,
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

  const product = productFound || defaultProduct;
  const [selectedImage, setSelectedImage] = useState(product.images ? product.images[0] : product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const galleryImages = Array.isArray(product.images) ? product.images : [product.image];
  const isLiked = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, 'Standard', quantity);
  };

  return (
    <div className="pt-6 pb-20 bg-heritage-paper">
      <div className="container mx-auto px-6">
        
        {/* FIX: Improved Breadcrumbs "Home > Product" */}
        <div className="flex items-center gap-2 text-sm font-medium text-heritage-grey mb-8 font-manrope">
          <Link to="/" className="flex items-center gap-1 hover:text-heritage-rudraksha transition-colors">
            <Home size={14} />
            Home
          </Link>
          <ChevronRight size={14} className="text-heritage-mist" />
          <Link to="/shop" className="hover:text-heritage-rudraksha transition-colors">Shop</Link> 
          <ChevronRight size={14} className="text-heritage-mist" />
          <span className="text-heritage-charcoal truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 md:h-[600px] scrollbar-hide py-2 md:py-0">
              {galleryImages.map((img, idx) => (
                <img 
                  key={idx}
                  src={img}
                  alt={`View ${idx}`}
                  className={`w-20 h-24 object-cover cursor-pointer border rounded-md transition-all ${selectedImage === img ? 'border-heritage-rudraksha opacity-100 ring-1 ring-heritage-rudraksha' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 h-[400px] md:h-[600px] bg-heritage-sand overflow-hidden rounded-lg border border-heritage-mist">
              <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2 lg:pl-10">
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-heritage-charcoal mb-3">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-cinzel font-semibold text-heritage-rudraksha">₹{product.price.toLocaleString()}</span>
              <div className="flex items-center gap-1 text-heritage-gold text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-heritage-grey ml-1 font-medium">(4.9/5)</span>
              </div>
            </div>

            <p className="font-manrope text-heritage-grey leading-relaxed mb-8 text-base">
              {product.description}
            </p>

            <div className="mb-8">
              <span className="text-sm font-bold text-heritage-charcoal block mb-3">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-heritage-mist rounded-md w-32 justify-between">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-heritage-sand text-heritage-grey"><Minus className="w-4 h-4" /></button>
                  <span className="font-manrope font-bold text-heritage-charcoal">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-heritage-sand text-heritage-grey"><Plus className="w-4 h-4" /></button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-heritage-rudraksha text-white py-3 px-8 text-sm font-bold rounded-md hover:bg-heritage-saffron transition-all shadow-md"
                >
                  Add to Cart
                </button>
                
                <button 
                  onClick={() => toggleFavorite(product)}
                  className={`p-3 border border-heritage-mist rounded-md hover:border-heritage-rudraksha transition-colors ${isLiked ? 'text-red-600 border-red-200' : 'text-heritage-grey'}`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-heritage-mist pt-8 mb-8">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-heritage-saffron" strokeWidth={1.5} />
                <span className="text-sm font-medium text-heritage-charcoal">Free shipping over ₹2500</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-heritage-saffron" strokeWidth={1.5} />
                <span className="text-sm font-medium text-heritage-charcoal">Authenticity guaranteed</span>
              </div>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex border-b border-heritage-mist mb-6">
                {['Description', 'Details', 'Shipping'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-3 mr-8 text-sm font-bold transition-colors capitalize ${activeTab === tab.toLowerCase() ? 'border-b-2 border-heritage-rudraksha text-heritage-rudraksha' : 'text-heritage-grey hover:text-heritage-charcoal'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="font-manrope text-sm text-heritage-grey leading-relaxed min-h-[100px]">
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