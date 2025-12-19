import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProductSearch } from '@/hooks/useProductSearch'; // Import the new hook
import { useDebounce } from '@/hooks/useDebounce';

export const SmartSearch = ({ mobile = false, onClose }) => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  // Use our new Client-Side Search Engine
  const { search, loading: indexLoading, isReady } = useProductSearch();
  const debouncedTerm = useDebounce(term, 300); // Faster response (300ms)
  
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Real-time Search Effect
  useEffect(() => {
    if (!debouncedTerm || debouncedTerm.length < 2) {
      setResults([]);
      return;
    }
    
    // PERFORM SEARCH (Instant, no network call)
    if (isReady) {
      const hits = search(debouncedTerm);
      setResults(hits.slice(0, 5)); // Limit to top 5
      setShowResults(true);
    }
  }, [debouncedTerm, isReady]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term) {
      navigate(`/search?q=${term}`);
      setShowResults(false);
      if (mobile && onClose) onClose();
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for masterpieces..."
          className="w-full bg-transparent border-b border-heritage-charcoal/20 py-2 pl-0 pr-8 text-sm font-serif text-heritage-charcoal placeholder:text-heritage-charcoal/40 focus:outline-none focus:border-heritage-charcoal transition-all"
        />
        <button 
          type="submit" 
          className="absolute right-0 top-1/2 -translate-y-1/2 text-heritage-charcoal/50 hover:text-heritage-charcoal transition-colors"
        >
          {(indexLoading && !isReady) ? <Loader2 size={16} className="animate-spin"/> : <Search size={16} />}
        </button>
      </form>

      {/* --- DROPDOWN RESULTS --- */}
      {showResults && (
        <div className="absolute top-full left-0 w-full md:w-[150%] bg-heritage-paper shadow-xl border border-heritage-border mt-2 p-0 z-50">
          {results.length > 0 ? (
            <ul className="py-2">
              {results.map((product) => (
                <li 
                  key={product.id}
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    setShowResults(false);
                    if (mobile && onClose) onClose();
                  }}
                  className="px-4 py-3 hover:bg-heritage-sand cursor-pointer flex items-center gap-3 transition-colors"
                >
                  <img src={product.featuredImageUrl} alt="" className="w-10 h-10 object-cover rounded-sm" />
                  <div>
                    <p className="text-sm font-serif text-heritage-charcoal">{product.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-heritage-grey">₹{product.price}</p>
                  </div>
                </li>
              ))}
              <li 
                onClick={handleSubmit}
                className="px-4 py-3 text-center border-t border-heritage-border text-xs uppercase tracking-lux cursor-pointer hover:text-heritage-gold"
              >
                View All Results
              </li>
            </ul>
          ) : (
            <div className="p-4 text-center text-xs text-heritage-grey italic">
              No masterpieces found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};