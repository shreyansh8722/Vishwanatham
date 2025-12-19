import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { useProducts } from '@/context/ProductContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useCart } from '@/context/CartContext';
import { CartModal } from '@/components/shop/CartModal';
import { SlidersHorizontal, ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteAssets } from '@/hooks/useSiteAssets';

const HEADER_CONFIG = {
  sarees: { title: "The Saree Edit", description: "Six yards of pure grace. Handwoven Banarasi silk masterpieces.", imgKey: 'header_sarees' },
  lehengas: { title: "Bridal Heirlooms", description: "Intricate Jangla and Tanchoi weaves for your special day.", imgKey: 'header_lehengas' },
  suits: { title: "Unstitched Classics", description: "Versatile silk fabrics for the contemporary wardrobe.", imgKey: 'header_suits' },
  men: { title: "The Royal Groom", description: "Sherwanis and Kurtas crafted for nobility.", imgKey: 'header_men' },
  default: { title: "All Collections", description: "Explore our complete range of handloom treasures.", imgKey: 'header_default' }
};

export default function ShopPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('cat');
  const activeCategory = categoryParam ? categoryParam.toLowerCase() : 'default';
  
  const { getAsset } = useSiteAssets();
  const { fetchProducts } = useProducts(); 
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  
  // State for Filters
  const [filters, setFilters] = useState({});
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const config = HEADER_CONFIG[activeCategory] || HEADER_CONFIG['default'];
  const headerImage = getAsset(config.imgKey); 

  // --- 1. INITIAL FETCH ---
  useEffect(() => {
    // Reset state when category or sort changes
    setProducts([]);
    setLastDoc(null);
    setHasMore(true);
    setLoading(true);
    
    // Sync URL param to filter state
    if (categoryParam) {
       const formattedCat = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
       setFilters(prev => ({ ...prev, subCategory: [formattedCat] }));
    }

    const loadInitial = async () => {
      try {
        const res = await fetchProducts({ 
          subCategory: categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : null,
          sortOption: sortBy 
        });
        
        if (res) {
          setProducts(res.data || []);
          setLastDoc(res.lastVisible);
          setHasMore(res.hasMore);
        }
      } catch (err) {
        console.error("Failed to load shop products", err);
      } finally {
        setLoading(false);
      }
    };

    loadInitial();
  }, [categoryParam, sortBy, fetchProducts]);

  // --- 2. LOAD MORE FUNCTION ---
  const handleLoadMore = async () => {
    if (!hasMore || isFetchingMore) return;
    setIsFetchingMore(true);
    
    try {
        const res = await fetchProducts({
           subCategory: categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : null,
           sortOption: sortBy,
           lastDoc: lastDoc
        });
        
        if (res) {
            setProducts(prev => [...prev, ...res.data]);
            setLastDoc(res.lastVisible);
            setHasMore(res.hasMore);
        }
    } catch (err) {
        console.error("Error loading more", err);
    } finally {
        setIsFetchingMore(false);
    }
  };

  // --- 3. CLIENT-SIDE REFINEMENT ---
  // We fetch broadly from DB, then filter specifics (like color/technique) here
  const displayedProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(p => {
      // Filter by SubCategory (if manually selected in sidebar)
      if (filters.subCategory?.length > 0 && !filters.subCategory.includes(p.subCategory)) return false;
      
      // Filter by Fabric
      if (filters.fabric?.length > 0 && !filters.fabric.includes(p.fabric)) return false;
      
      // Filter by Technique
      if (filters.technique?.length > 0 && !filters.technique.includes(p.technique)) return false;
      
      return true;
    });
  }, [products, filters]);

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-serif text-heritage-charcoal selection:bg-heritage-gold selection:text-white">
      <Navbar />
      
      {/* HEADER */}
      <div className="relative h-[40vh] md:h-[55vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <motion.img 
          key={activeCategory} 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          src={headerImage} 
          alt={config.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-6">
          <motion.div
            key={config.title}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="block text-xs md:text-sm font-bold font-sans uppercase tracking-[0.3em] mb-4 md:mb-6 text-white/90">
              Handwoven Purity
            </span>
            <h1 className="text-4xl md:text-8xl italic font-light mb-4 md:mb-6 leading-none">{config.title}</h1>
            <p className="font-sans text-xs md:text-lg tracking-wide opacity-90 max-w-lg mx-auto font-light leading-relaxed">
              {config.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-8 md:py-16 flex flex-col md:flex-row gap-8 md:gap-16 relative">
        <aside className="hidden md:block w-72 shrink-0 sticky top-48 h-fit z-30">
           <FilterSidebar filters={filters} setFilters={setFilters} />
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-8 md:mb-12 pb-4 md:pb-6 border-b border-gray-100">
             <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">
               {displayedProducts.length} Products Found
             </span>
             
             <div className="flex gap-6 md:gap-8">
               <button 
                 onClick={() => setMobileFiltersOpen(true)}
                 className="md:hidden flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-heritage-charcoal"
               >
                 <SlidersHorizontal size={14} /> Filters
               </button>

               <div className="relative group">
                 <button className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:text-heritage-gold transition-colors">
                   Sort: <span className="text-heritage-charcoal">{sortBy === 'newest' ? 'Newest' : sortBy === 'price_low' ? 'Price: Low-High' : 'Price: High-Low'}</span> <ChevronDown size={14} />
                 </button>
                 <div className="absolute right-0 top-full pt-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-40">
                   <div className="bg-white shadow-2xl border border-gray-100 py-3 w-48 flex flex-col">
                     {[
                        { label: 'Newest', val: 'newest' }, 
                        { label: 'Price: Low-High', val: 'price_low' }, 
                        { label: 'Price: High-Low', val: 'price_high' }
                     ].map(opt => (
                       <button 
                         key={opt.val}
                         onClick={() => setSortBy(opt.val)}
                         className="text-left px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors text-gray-600 hover:text-black font-sans"
                       >
                         {opt.label}
                       </button>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
          </div>

          {loading && products.length === 0 ? (
             <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-16">
               {[...Array(6)].map((_, i) => <div key={i} className="aspect-[3/4] bg-gray-50 animate-pulse" />)}
             </div>
          ) : displayedProducts.length > 0 ? (
             <>
               <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-20">
                 {displayedProducts.map(product => (
                   <ProductCard 
                     key={product.id} 
                     item={product} 
                     onAddToCart={() => handleAddToCart(product)}
                     isFavorite={isFavorite(product.id)}
                     onToggleFavorite={toggleFavorite}
                   />
                 ))}
               </div>
               
               {hasMore && (
                 <div className="mt-16 text-center">
                    <button 
                      onClick={handleLoadMore} 
                      disabled={isFetchingMore}
                      className="px-8 py-3 bg-heritage-sand hover:bg-heritage-charcoal hover:text-white transition-colors text-xs font-bold uppercase tracking-widest rounded-sm disabled:opacity-50"
                    >
                      {isFetchingMore ? <Loader2 className="animate-spin" size={16}/> : 'Load More Products'}
                    </button>
                 </div>
               )}
             </>
          ) : (
             <div className="py-20 md:py-32 text-center">
               <h3 className="font-serif text-2xl md:text-3xl italic text-gray-400 mb-6">No treasures found matching your criteria.</h3>
               <button onClick={() => { setFilters({}); navigate('/shop'); }} className="text-xs uppercase font-bold tracking-widest border-b border-black pb-1 hover:text-heritage-gold hover:border-heritage-gold transition-colors">
                 Clear All Filters
               </button>
             </div>
          )}

        </div>
      </div>

      <Footer />
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
      
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: "tween", ease: "circOut", duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-white p-6 md:p-8 md:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <h2 className="font-serif text-2xl italic">Refine Selection</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-[10px] font-bold uppercase tracking-widest border border-gray-200 px-3 py-1 rounded-sm">Close</button>
            </div>
            <FilterSidebar mobile filters={filters} setFilters={setFilters} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}