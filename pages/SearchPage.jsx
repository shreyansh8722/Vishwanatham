import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { CartModal } from '@/components/shop/CartModal';
import { Search, X, ArrowLeft, TrendingUp, Loader2 } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useCart } from '@/context/CartContext';

export default function SearchPage() {
  const [queryText, setQueryText] = useState('');
  // Faster debounce for instant feel
  const debouncedQuery = useDebounce(queryText, 300); 
  
  const [allProducts, setAllProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // 1. Fetch ALL products once on mount (Optimized for speed)
  useEffect(() => {
    const fetchAllForSearch = async () => {
      try {
        // Fetch up to 100 recent items for fast client-side searching
        // For a larger store, we would paginate or use Algolia
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(100));
        const snap = await getDocs(q);
        const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllProducts(docs);
      } catch (err) {
        console.error("Search index init failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllForSearch();
  }, []);

  // 2. Client-Side Filtering (Instant & Smart)
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    const lowerQuery = debouncedQuery.toLowerCase();
    
    const filtered = allProducts.filter(p => {
      // Search in Name, Category, SubCategory, and Tags
      const inName = p.name?.toLowerCase().includes(lowerQuery);
      const inCat = p.category?.toLowerCase().includes(lowerQuery);
      const inSub = p.subCategory?.toLowerCase().includes(lowerQuery);
      const inTags = p.tags_lowercase?.some(tag => tag.includes(lowerQuery));
      
      return inName || inCat || inSub || inTags;
    });

    setResults(filtered);
  }, [debouncedQuery, allProducts]);

  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark flex flex-col w-full overflow-x-hidden">
      <Navbar cartCount={0} onOpenCart={() => setShowCart(true)} />

      <div className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12 w-full">
        
        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-10 sticky top-20 z-30 bg-white/95 backdrop-blur py-2">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="md:hidden p-2 -ml-2 text-gray-500">
              <ArrowLeft size={24} />
            </button>
            <div className="relative flex-grow">
              <input
                type="text"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="Search sarees, lehengas..."
                className="w-full border-b-2 border-gray-200 py-3 pl-2 pr-10 text-lg font-serif placeholder-gray-300 focus:outline-none focus:border-[#B08D55] bg-transparent"
                autoFocus
              />
              {queryText ? (
                <button onClick={() => setQueryText('')} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400">
                  <X size={20} />
                </button>
              ) : (
                 <Search size={20} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300" />
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {loading ? (
             <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gray-300" /></div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-8 md:gap-x-8 animate-fade-in">
              {results.map(item => (
                <ProductCard key={item.id} item={item} onAddToCart={(p) => { addToCart(p); setShowCart(true); }} />
              ))}
            </div>
          ) : queryText.length > 1 ? (
             <div className="text-center py-20 text-gray-400">
               <p>No matches found for "{queryText}"</p>
               <p className="text-xs mt-2">Try "Saree", "Silk", or "Red"</p>
             </div>
          ) : (
             // Default View (Suggestions)
             <div className="mt-8">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                    <TrendingUp size={14} /> Trending Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                {['Banarasi Saree', 'Bridal Lehenga', 'Katan Silk', 'Pink Dupatta', 'Suit'].map(term => (
                    <button 
                    key={term}
                    onClick={() => setQueryText(term)}
                    className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                    {term}
                    </button>
                ))}
                </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <CartModal />
    </div>
  );
}