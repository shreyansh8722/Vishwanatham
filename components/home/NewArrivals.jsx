import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// IMPORT YOUR CUSTOM CARD
import { ProductCard } from '@/components/shop/ProductCard'; 

export const NewArrivals = () => {
  const { fetchProducts } = useProducts();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["All", "Sarees", "Lehengas", "Suits", "Dupattas"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await fetchProducts({ sortOption: 'newest', batchSize: 20 });
        setProducts(data || []);
        setFilteredProducts(data || []);
      } catch (e) {
        console.error("Failed to load new arrivals", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchProducts]);

  // Tab Filtering
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const lowerCat = activeCategory.toLowerCase().slice(0, -1);
      const filtered = products.filter(p => 
        p.category?.toLowerCase().includes(lowerCat) || 
        p.name?.toLowerCase().includes(lowerCat)
      );
      setFilteredProducts(filtered);
    }
  }, [activeCategory, products]);

  // Slider Logic
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-12">
        
        {/* 1. HEADER & TABS */}
        <div className="text-center mb-16 space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B08D55] block">
             Just Arrived
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] uppercase tracking-widest">
            Fresh From The Loom
          </h2>
          
          <div className="flex justify-center flex-wrap gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pb-2 border-b-2 transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'text-black border-black' 
                    : 'border-transparent hover:text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2. SLIDER CONTAINER */}
        <div className="relative group px-0 md:px-12">
            
            {/* Scroll Area */}
            <div 
              ref={scrollRef}
              className="flex gap-4 md:gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {isLoading ? (
                // Loading Skeletons
                [1,2,3,4].map(i => (
                  <div key={i} className="min-w-[45%] md:min-w-[23%] aspect-[3/4] bg-gray-50 animate-pulse"/>
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  // WRAPPER DIV for Sizing
                  // Forces the imported ProductCard to fit the slider width (23%)
                  <div 
                    key={product.id} 
                    className="relative min-w-[45%] md:min-w-[23%] flex-shrink-0 snap-start"
                  >
                    {/* USE YOUR CUSTOM PRODUCT CARD COMPONENT HERE */}
                    <ProductCard item={product} />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-12 text-gray-400 font-serif italic">
                  No products found.
                </div>
              )}
            </div>

            {/* 3. VERTICAL BUTTONS (EKAYA STYLE) */}
            <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 text-gray-300 hover:text-black transition-colors z-20 h-full justify-center w-12"
            >
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] writing-vertical-rl rotate-180">
                    Previous
                </span>
            </button>

            <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 text-gray-300 hover:text-black transition-colors z-20 h-full justify-center w-12"
            >
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] writing-vertical-rl">
                    Next
                </span>
            </button>

             {/* Mobile Arrows fallback */}
             <div className="flex xl:hidden justify-center gap-4 -mt-4 mb-8">
                <button onClick={() => scroll('left')} className="p-3 border border-gray-200 rounded-full hover:border-black transition-colors"><ChevronLeft size={16}/></button>
                <button onClick={() => scroll('right')} className="p-3 border border-gray-200 rounded-full hover:border-black transition-colors"><ChevronRight size={16}/></button>
             </div>
        </div>
      </div>
    </section>
  );
};