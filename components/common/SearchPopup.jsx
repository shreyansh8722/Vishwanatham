import React, { useState, useEffect } from 'react';
import { X, Search, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '@/context/ProductContext';
import { formatPrice } from '@/lib/utils';

export const SearchPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // POPULAR TAGS
  const POPULAR_SEARCHES = ["Banarasi Saree", "Bridal Lehenga", "Tissue Silk", "Jangla", "Katan Silk"];

  // Search Logic
  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsTyping(false);
      return;
    }
    setIsTyping(true);
    const timer = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.category?.toLowerCase().includes(lowerQuery) ||
        p.subCategory?.toLowerCase().includes(lowerQuery)
      ).slice(0, 5); // Limit to 5 items for a clean box look
      
      setResults(filtered);
      setIsTyping(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, products]);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) handleNavigate(`/shop?search=${query}`); 
  };

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
          
          {/* 1. BACKDROP (Blur & Darken) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-heritage-charcoal/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 2. THE FLOATING BOX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-3xl bg-heritage-paper shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[70vh]"
          >
            {/* Header: Input Field */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-heritage-border bg-white">
              <Search size={22} className="text-heritage-charcoal/40" />
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for masterpieces..."
                  className="w-full text-xl font-serif text-heritage-charcoal placeholder:text-heritage-charcoal/30 focus:outline-none bg-transparent"
                />
              </form>
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="p-2 hover:bg-heritage-sand rounded-full transition-colors group"
              >
                <X size={20} className="text-heritage-grey group-hover:text-heritage-charcoal" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 scrollbar-hide">
              {!query ? (
                /* DEFAULT VIEW */
                <div className="animate-fade-in">
                  <h3 className="text-[10px] uppercase tracking-lux text-heritage-grey mb-4">Trending Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-4 py-2 border border-heritage-border bg-white text-xs font-serif italic text-heritage-charcoal hover:border-heritage-gold hover:text-heritage-gold transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* RESULTS VIEW */
                <div>
                   {isTyping ? (
                     <div className="flex justify-center py-8"><Loader2 className="animate-spin text-heritage-gold" /></div>
                   ) : results.length > 0 ? (
                     <div className="space-y-2">
                       <h3 className="text-[10px] uppercase tracking-lux text-heritage-grey mb-4">Products</h3>
                       {results.map(product => (
                         <div 
                           key={product.id} 
                           onClick={() => handleNavigate(`/product/${product.id}`)}
                           className="flex items-center gap-4 p-2 hover:bg-heritage-sand transition-colors cursor-pointer group rounded-sm"
                         >
                           <div className="w-12 h-16 bg-heritage-sand overflow-hidden shrink-0">
                             <img 
                               src={product.featuredImageUrl} 
                               alt={product.name} 
                               className="w-full h-full object-cover"
                             />
                           </div>
                           <div className="flex-1 min-w-0">
                             <h4 className="font-serif text-base text-heritage-charcoal truncate group-hover:text-heritage-gold transition-colors">{product.name}</h4>
                             <p className="text-[10px] uppercase tracking-wider text-heritage-grey">
                               {product.subCategory}
                             </p>
                           </div>
                           <span className="text-sm font-medium whitespace-nowrap">₹{formatPrice(product.price)}</span>
                           <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-heritage-gold" />
                         </div>
                       ))}
                       
                       <button 
                         onClick={handleSearchSubmit}
                         className="w-full mt-4 py-3 text-center text-xs uppercase tracking-lux border-t border-heritage-border hover:text-heritage-gold transition-colors"
                       >
                         View All {results.length} Results
                       </button>
                     </div>
                   ) : (
                     <div className="text-center py-8 opacity-60">
                       <p className="font-serif text-lg text-heritage-charcoal italic">No results found.</p>
                     </div>
                   )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};