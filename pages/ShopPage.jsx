import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, X, SlidersHorizontal, ChevronRight, Home } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/shop/ProductCard';

// --- MOCK DATA (For Visuals) ---
const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Divine 5 Mukhi Rudraksha Mala",
    price: 1250,
    originalPrice: 2500,
    images: ['https://images.unsplash.com/photo-1611568285568-3d846513369a?q=80&w=600', 'https://images.unsplash.com/photo-1603038930495-2c26279f6764?q=80&w=600'],
    rating: 4.9,
    category: "Rudraksha",
    material: "Wood"
  },
  {
    id: 2,
    name: "Natural Amethyst Healing Bracelet",
    price: 850,
    originalPrice: 1500,
    images: ['https://images.unsplash.com/photo-1590424600100-3486df5b9745?q=80&w=600', 'https://images.unsplash.com/photo-1610189012906-47833d772097?q=80&w=600'],
    rating: 4.8,
    category: "Gemstones",
    material: "Crystal"
  },
  {
    id: 3,
    name: "Pure Copper Shri Yantra (3 Inch)",
    price: 3500,
    originalPrice: 4200,
    images: ['https://images.unsplash.com/photo-1623151834261-24874f676239?q=80&w=600', 'https://images.unsplash.com/photo-1603038930495-2c26279f6764?q=80&w=600'],
    rating: 5.0,
    category: "Yantras",
    material: "Metal"
  },
  {
    id: 4,
    name: "7 Chakra Balancing Stone Set",
    price: 999,
    originalPrice: 1999,
    images: ['https://images.unsplash.com/photo-1567113300190-484852086433?q=80&w=600', 'https://images.unsplash.com/photo-1610189012906-47833d772097?q=80&w=600'],
    rating: 4.7,
    category: "Gemstones",
    material: "Crystal"
  },
  {
    id: 5,
    name: "Gauri Shankar Rudraksha (Collector)",
    price: 5500,
    originalPrice: 7000,
    images: ['https://images.unsplash.com/photo-1603038930495-2c26279f6764?q=80&w=600', 'https://images.unsplash.com/photo-1611568285568-3d846513369a?q=80&w=600'],
    rating: 5.0,
    category: "Rudraksha",
    material: "Wood"
  },
  {
    id: 6,
    name: "Sandalwood Meditation Mala",
    price: 1800,
    originalPrice: 2200,
    images: ['https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=600', 'https://images.unsplash.com/photo-1590424600100-3486df5b9745?q=80&w=600'],
    rating: 4.6,
    category: "Malas",
    material: "Wood"
  }
];

const ShopPage = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);
  const [sortOrder, setSortOrder] = useState('featured');

  // Load URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) setSelectedCategories([categoryParam]);
  }, [searchParams]);

  // Handle Category Toggle
  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Filter Logic
  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const matchCat = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchPrice = product.price <= priceRange;
    return matchCat && matchPrice;
  }).sort((a, b) => {
    if (sortOrder === 'lowToHigh') return a.price - b.price;
    if (sortOrder === 'highToLow') return b.price - a.price;
    return 0; // Featured
  });

  return (
    <div className="bg-heritage-paper min-h-screen pt-4 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* --- 1. BREADCRUMBS & HEADER --- */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm font-medium text-heritage-grey mb-4 font-manrope">
            <Link to="/" className="flex items-center gap-1 hover:text-heritage-rudraksha transition-colors">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={14} className="text-heritage-mist" />
            <span className="text-heritage-charcoal">Shop</span>
          </div>
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-heritage-charcoal">
            All collections
          </h1>
        </div>

        {/* --- 2. TOOLBAR (Mobile Filter + Sort) --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-heritage-mist pb-4">
          <p className="text-sm text-heritage-grey font-manrope">
            Showing <span className="font-bold text-heritage-charcoal">{filteredProducts.length}</span> products
          </p>

          <div className="flex w-full md:w-auto gap-4">
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex-1 flex items-center justify-center gap-2 border border-heritage-mist py-2.5 rounded text-sm font-bold text-heritage-charcoal hover:bg-heritage-sand transition-colors"
            >
              <Filter size={16} /> Filter
            </button>

            {/* Sort Dropdown */}
            <div className="flex-1 md:w-48 relative group">
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full appearance-none bg-white border border-heritage-mist text-heritage-charcoal text-sm font-medium py-2.5 px-4 pr-8 rounded outline-none focus:border-heritage-rudraksha cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-grey pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-12 items-start">
          
          {/* --- 3. SIDEBAR FILTERS (Desktop) --- */}
          <aside className="hidden md:block w-64 sticky top-24 space-y-8">
            {/* Category Filter */}
            <div>
              <h3 className="font-cinzel text-lg font-bold text-heritage-charcoal mb-4">Category</h3>
              <div className="space-y-3">
                {['Rudraksha', 'Gemstones', 'Yantras', 'Malas'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedCategories.includes(cat) ? 'bg-heritage-rudraksha border-heritage-rudraksha' : 'border-heritage-mist bg-white group-hover:border-heritage-rudraksha'}`}>
                      {selectedCategories.includes(cat) && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={selectedCategories.includes(cat)} 
                      onChange={() => toggleCategory(cat)}
                    />
                    <span className={`text-sm font-manrope ${selectedCategories.includes(cat) ? 'text-heritage-charcoal font-bold' : 'text-heritage-grey'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-cinzel text-lg font-bold text-heritage-charcoal mb-4">Max Price: ₹{priceRange.toLocaleString()}</h3>
              <input 
                type="range" 
                min="500" 
                max="10000" 
                step="500" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-heritage-mist rounded-lg appearance-none cursor-pointer accent-heritage-rudraksha"
              />
              <div className="flex justify-between text-xs text-heritage-grey mt-2 font-manrope">
                <span>₹500</span>
                <span>₹10,000+</span>
              </div>
            </div>
          </aside>

          {/* --- 4. PRODUCT GRID --- */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-10">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-heritage-sand/30 rounded-lg border border-heritage-mist border-dashed">
                <p className="font-cinzel text-xl text-heritage-charcoal mb-2">No products found</p>
                <p className="text-sm text-heritage-grey">Try adjusting your filters</p>
                <button 
                  onClick={() => { setSelectedCategories([]); setPriceRange(10000); }}
                  className="mt-4 text-sm font-bold text-heritage-rudraksha border-b border-heritage-rudraksha pb-0.5 hover:text-heritage-saffron hover:border-heritage-saffron"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- 5. MOBILE FILTER DRAWER --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[200] md:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 w-full bg-white z-[210] rounded-t-2xl shadow-2xl md:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6 border-b border-heritage-mist pb-4">
                  <h3 className="font-cinzel text-xl font-bold text-heritage-charcoal">Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-1">
                    <X className="w-6 h-6 text-heritage-charcoal" />
                  </button>
                </div>

                {/* Mobile Filter Options */}
                <div className="space-y-8 mb-8">
                  {/* Category Mobile */}
                  <div>
                    <h4 className="font-manrope text-sm font-bold text-heritage-charcoal mb-3 uppercase tracking-wider">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Rudraksha', 'Gemstones', 'Yantras', 'Malas'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            selectedCategories.includes(cat) 
                            ? 'bg-heritage-rudraksha text-white border-heritage-rudraksha' 
                            : 'bg-white text-heritage-charcoal border-heritage-mist'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Mobile */}
                  <div>
                     <h4 className="font-manrope text-sm font-bold text-heritage-charcoal mb-3 uppercase tracking-wider">
                       Max Price: ₹{priceRange.toLocaleString()}
                     </h4>
                     <input 
                      type="range" 
                      min="500" 
                      max="10000" 
                      step="500" 
                      value={priceRange} 
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-1 bg-heritage-mist rounded-lg appearance-none cursor-pointer accent-heritage-rudraksha"
                    />
                  </div>
                </div>

                {/* Apply Button */}
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-heritage-rudraksha text-white py-3.5 text-sm font-bold rounded shadow-lg"
                >
                  View {filteredProducts.length} Products
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;