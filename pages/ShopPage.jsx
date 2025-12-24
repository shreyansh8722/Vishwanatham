import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, X, SlidersHorizontal, ChevronRight, Home, Loader2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/shop/ProductCard';
import { useProducts } from '../context/ProductContext'; 

const ShopPage = () => {
  const { products, loading } = useProducts(); 
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [sortOrder, setSortOrder] = useState('featured');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) setSelectedCategories([categoryParam]);
  }, [searchParams]);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchCat = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const productPrice = Number(product.price) || 0; 
    const matchPrice = productPrice <= priceRange;
    return matchCat && matchPrice;
  }).sort((a, b) => {
    const priceA = Number(a.price) || 0;
    const priceB = Number(b.price) || 0;
    if (sortOrder === 'lowToHigh') return priceA - priceB;
    if (sortOrder === 'highToLow') return priceB - priceA;
    return 0; 
  });

  return (
    // PURE WHITE BACKGROUND
    <div className="bg-white min-h-screen pt-4 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* --- 1. BREADCRUMBS & HEADER --- */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm font-medium text-heritage-grey mb-4 font-manrope">
            <Link to="/" className="flex items-center gap-1 hover:text-heritage-terracotta transition-colors">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-heritage-charcoal font-bold">Shop</span>
          </div>
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-heritage-charcoal">
            Divine Collection
          </h1>
        </div>

        {/* --- 2. TOOLBAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-100 pb-4">
          <p className="text-sm text-heritage-grey font-manrope">
            {loading ? (
               <span className="flex items-center gap-2">Loading products...</span>
            ) : (
               <>Showing <span className="font-bold text-heritage-terracotta">{filteredProducts.length}</span> sacred artifacts</>
            )}
          </p>

          <div className="flex w-full md:w-auto gap-4">
            {/* Mobile Filter */}
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex-1 flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded text-sm font-bold text-heritage-charcoal hover:bg-heritage-sand transition-colors"
            >
              <Filter size={16} /> Filter
            </button>

            {/* Sort */}
            <div className="flex-1 md:w-48 relative group">
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 text-heritage-charcoal text-sm font-medium py-2.5 px-4 pr-8 rounded outline-none focus:border-heritage-terracotta cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-12 items-start">
          
          {/* --- 3. SIDEBAR (Minimalist) --- */}
          <aside className="hidden md:block w-64 sticky top-24 space-y-8">
            {/* Category */}
            <div>
              <h3 className="font-cinzel text-lg font-bold text-heritage-charcoal mb-4">Category</h3>
              <div className="space-y-3">
                {['Rudraksha', 'Gemstones', 'Yantras', 'Malas', 'Idols'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedCategories.includes(cat) ? 'bg-heritage-terracotta border-heritage-terracotta' : 'border-gray-200 bg-white group-hover:border-heritage-terracotta'}`}>
                      {selectedCategories.includes(cat) && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={selectedCategories.includes(cat)} 
                      onChange={() => toggleCategory(cat)}
                    />
                    <span className={`text-sm font-manrope ${selectedCategories.includes(cat) ? 'text-heritage-charcoal font-bold' : 'text-heritage-grey group-hover:text-heritage-terracotta transition-colors'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="font-cinzel text-lg font-bold text-heritage-charcoal mb-4">Max Price: ₹{priceRange.toLocaleString()}</h3>
              <input 
                type="range" 
                min="500" 
                max="50000" 
                step="500" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-heritage-terracotta"
              />
              <div className="flex justify-between text-xs text-heritage-grey mt-2 font-manrope">
                <span>₹500</span>
                <span>₹50,000+</span>
              </div>
            </div>
          </aside>

          {/* --- 4. PRODUCT GRID --- */}
          <div className="flex-1">
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-heritage-terracotta" size={40} />
                </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-100 border-dashed">
                <p className="font-cinzel text-xl text-heritage-charcoal mb-2">No artifacts found</p>
                <p className="text-sm text-heritage-grey">Try adjusting your filters.</p>
                <button 
                  onClick={() => { setSelectedCategories([]); setPriceRange(50000); }}
                  className="mt-4 text-sm font-bold text-heritage-terracotta border-b border-heritage-terracotta pb-0.5 hover:text-heritage-charcoal hover:border-heritage-charcoal transition-colors"
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
              className="fixed bottom-0 left-0 w-full bg-white z-[210] rounded-t-2xl shadow-2xl md:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <h3 className="font-cinzel text-xl font-bold text-heritage-charcoal">Refine Search</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-1">
                    <X className="w-6 h-6 text-heritage-charcoal" />
                  </button>
                </div>

                <div className="space-y-8 mb-8">
                  {/* Category Mobile */}
                  <div>
                    <h4 className="font-manrope text-sm font-bold text-heritage-charcoal mb-3 uppercase tracking-wider">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Rudraksha', 'Gemstones', 'Yantras', 'Malas', 'Idols'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            selectedCategories.includes(cat) 
                            ? 'bg-heritage-terracotta text-white border-heritage-terracotta' 
                            : 'bg-white text-heritage-charcoal border-gray-200'
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
                      max="50000" 
                      step="500" 
                      value={priceRange} 
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-heritage-terracotta"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-heritage-terracotta text-white py-3.5 text-sm font-bold rounded shadow-lg uppercase tracking-widest"
                >
                  View Products
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