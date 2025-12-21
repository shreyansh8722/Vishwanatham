import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, X, Home, ChevronRight, Loader2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/shop/ProductCard';
import { useProducts } from '../context/ProductContext';

const ShopPage = () => {
  const { products, loading } = useProducts(); 
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchParams] = useSearchParams();
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
    <div className="bg-heritage-paper min-h-screen pt-8 pb-20 font-body text-heritage-charcoal">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* --- Header --- */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-heritage-grey mb-3">
            <Link to="/" className="hover:text-heritage-rudraksha transition-colors">Home</Link>
            <ChevronRight size={14} className="text-heritage-mist" />
            <span>Shop</span>
          </div>
          <h1 className="font-heading text-4xl font-medium">
            The collection
          </h1>
        </div>

        {/* --- Toolbar --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 border-b border-heritage-mist pb-4 sticky top-20 bg-heritage-paper/95 backdrop-blur z-30 transition-all">
          <p className="text-sm text-heritage-grey">
            {loading ? 'Loading artifacts...' : `Showing ${filteredProducts.length} results`}
          </p>

          <div className="flex w-full md:w-auto gap-3">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex-1 flex items-center justify-center gap-2 border border-heritage-mist py-2.5 rounded text-sm font-medium hover:bg-heritage-sand transition-colors"
            >
              <Filter size={16} /> Filter
            </button>

            <div className="flex-1 md:w-56 relative">
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full appearance-none bg-white border border-heritage-mist text-heritage-charcoal text-sm font-medium py-2.5 px-4 pr-10 rounded outline-none focus:border-heritage-rudraksha cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="lowToHigh">Price: Low to high</option>
                <option value="highToLow">Price: High to low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-grey pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-10 items-start">
          
          {/* --- Sidebar (Desktop) --- */}
          <aside className="hidden md:block w-64 sticky top-32 space-y-8">
            <div>
              <h3 className="font-heading text-lg font-medium mb-4">Category</h3>
              <div className="space-y-2">
                {['Rudraksha', 'Gemstones', 'Yantras', 'Malas', 'Idols'].map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-all ${selectedCategories.includes(cat) ? 'bg-heritage-rudraksha border-heritage-rudraksha' : 'border-heritage-mist bg-white group-hover:border-heritage-rudraksha'}`}>
                      {selectedCategories.includes(cat) && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={selectedCategories.includes(cat)} 
                      onChange={() => toggleCategory(cat)}
                    />
                    <span className={`text-sm ${selectedCategories.includes(cat) ? 'font-medium' : 'text-heritage-grey'} transition-colors`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-medium mb-4">
                Max price: ₹{priceRange.toLocaleString()}
              </h3>
              <input 
                type="range" min="500" max="50000" step="500" value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-heritage-mist rounded-lg appearance-none cursor-pointer accent-heritage-rudraksha"
              />
            </div>
          </aside>

          {/* --- Product Grid --- */}
          <div className="flex-1">
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-heritage-rudraksha" size={32} />
                </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded border border-heritage-mist border-dashed">
                <p className="font-heading text-xl mb-2">No artifacts found</p>
                <button 
                  onClick={() => { setSelectedCategories([]); setPriceRange(50000); }}
                  className="text-sm font-medium text-heritage-rudraksha hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Mobile Filter --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-heritage-charcoal/40 z-[200] md:hidden backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 w-full bg-white z-[210] rounded-t-xl shadow-xl md:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6 border-b border-heritage-mist pb-4">
                  <h3 className="font-heading text-xl font-medium">Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}><X className="w-5 h-5 text-heritage-grey" /></button>
                </div>

                <div className="space-y-8 mb-8">
                  <div>
                    <h4 className="font-bold text-sm mb-3">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Rudraksha', 'Gemstones', 'Yantras', 'Malas', 'Idols'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`px-4 py-2 rounded text-sm transition-all ${
                            selectedCategories.includes(cat) 
                            ? 'bg-heritage-rudraksha text-white' 
                            : 'bg-heritage-sand text-heritage-charcoal'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                     <h4 className="font-bold text-sm mb-3">
                       Max price: ₹{priceRange.toLocaleString()}
                     </h4>
                     <input 
                      type="range" min="500" max="50000" step="500" value={priceRange} 
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-1 bg-heritage-mist rounded-lg appearance-none cursor-pointer accent-heritage-rudraksha"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-heritage-rudraksha text-white py-3.5 text-sm font-medium rounded shadow-md"
                >
                  View {filteredProducts.length} artifacts
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