import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Navbar and Footer removed to prevent duplication
import { ProductCard } from '@/components/shop/ProductCard';
import FilterSidebar from '@/components/shop/FilterSidebar';
import { useProductContext } from '@/context/ProductContext';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import QuickViewModal from '@/components/shop/QuickViewModal';

const ShopPage = () => {
  const { products } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const searchParam = queryParams.get('search');

  // Helper to format category names nicely (e.g., "Rudraksha" -> "Rudraksha Beads" or just title case)
  const getPageTitle = () => {
    if (categoryParam) {
      // Manual mapping for specific categories if needed, or just display the category
      const catLower = categoryParam.toLowerCase();
      if (catLower === 'rudraksha') return 'Rudraksha Beads';
      if (catLower === 'gemstones') return 'Sacred Gemstones';
      if (catLower === 'yantra' || catLower === 'yantras') return 'Yantras';
      if (catLower === 'prasad') return 'Kashi Prasad';
      return categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
    }
    if (searchParam) return `Results for "${searchParam}"`;
    return "All Collections";
  };

  useEffect(() => {
    let result = [...products];

    if (categoryParam) {
      result = result.filter(p => 
        p.category.toLowerCase() === categoryParam.toLowerCase() ||
        (p.tags && p.tags.some(tag => tag.toLowerCase() === categoryParam.toLowerCase()))
      );
    }

    if (searchParam) {
      const q = searchParam.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(result);
  }, [products, categoryParam, searchParam, sortBy]);

  return (
    <div className="bg-heritage-paper min-h-screen">
      
      {/* Page Header */}
      <div className="bg-heritage-sand py-12 md:py-20 mb-10 border-b border-heritage-border">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-cormorant text-4xl md:text-6xl text-heritage-charcoal mb-4">
            {getPageTitle()}
          </h1>
          <p className="font-montserrat text-heritage-grey text-sm md:text-base max-w-xl mx-auto">
            Explore our curated selection of authentic spiritual artifacts, handpicked from the sacred ghats of Varanasi.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24">
        {/* Controls Bar */}
        <div className="flex flex-wrap justify-between items-center mb-8 border-b border-heritage-border pb-4 gap-4">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-heritage-gold transition-colors font-bold text-heritage-charcoal"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filter
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-heritage-grey hidden md:inline">Sort By:</span>
            <div className="relative group">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent text-xs uppercase tracking-widest pr-8 pl-2 py-1 outline-none cursor-pointer hover:text-heritage-gold text-heritage-charcoal font-bold"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-heritage-grey" />
            </div>
          </div>
          
          <span className="text-xs text-heritage-grey ml-auto md:ml-0 font-montserrat">
            {filteredProducts.length} Products
          </span>
        </div>

        <div className="flex gap-10">
          {/* Sidebar (Desktop) */}
          <div className="hidden lg:block w-1/4">
            <FilterSidebar />
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    openQuickView={() => setQuickViewProduct(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-heritage-border rounded-sm">
                <p className="font-cormorant text-2xl text-heritage-grey">No products found matching your criteria.</p>
                <button 
                  onClick={() => { window.location.href = '/shop'; }}
                  className="mt-4 text-xs uppercase tracking-widest border-b border-heritage-charcoal pb-1 text-heritage-charcoal hover:text-heritage-gold hover:border-heritage-gold transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>
          <div className="absolute inset-y-0 left-0 w-80 bg-heritage-paper p-6 overflow-y-auto animate-slide-in-left shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-cormorant text-2xl text-heritage-charcoal">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="text-heritage-grey hover:text-heritage-charcoal text-xs uppercase tracking-widest font-bold">Close</button>
            </div>
            <FilterSidebar mobile={true} closeSidebar={() => setIsFilterOpen(false)} />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          isOpen={!!quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </div>
  );
};

export default ShopPage;