import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/shop/ProductCard'; 

export const NewArrivals = () => {
  const { fetchProducts } = useProducts();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Japam Style Tabs
  const categories = ["All", "Rudraksha", "Gemstones", "Yantras", "Malas"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await fetchProducts({ sortOption: 'newest', batchSize: 10 });
        setProducts(data || []);
      } catch (e) {
        console.error("Failed to load", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchProducts]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-3">
             New Collection
          </span>
          <h2 className="font-cormorant text-3xl md:text-5xl text-heritage-charcoal mb-8">
            New Arrivals
          </h2>
          
          {/* Tabs */}
          <div className="flex justify-center flex-wrap gap-6 md:gap-10 border-b border-gray-100 pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pb-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative ${
                  activeCategory === cat 
                    ? 'text-heritage-charcoal after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-heritage-charcoal' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="relative group">
            <div 
              ref={scrollRef}
              className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            >
              {isLoading ? (
                [1,2,3,4].map(i => <div key={i} className="min-w-[45%] md:min-w-[22%] aspect-[3/4] bg-gray-50 animate-pulse"/>)
              ) : (
                products.map(product => (
                  <div key={product.id} className="min-w-[45%] md:min-w-[22%] snap-start">
                    {/* CRITICAL FIX: Prop name is 'product' */}
                    <ProductCard product={product} /> 
                  </div>
                ))
              )}
            </div>
            
            {/* Mobile Swipe Hint */}
            <div className="md:hidden text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest animate-pulse">
              Swipe to explore
            </div>
        </div>
      </div>
    </section>
  );
};