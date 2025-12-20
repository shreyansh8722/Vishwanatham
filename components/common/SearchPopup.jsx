import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchPopup = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      onClose();
      setQuery('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-white animate-fade-in">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-end mb-8">
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-stone-900" />
          </button>
        </div>
        
        <div className="max-w-3xl mx-auto mt-20 text-center">
          <h2 className="font-cormorant text-4xl text-stone-900 mb-8 italic">What are you seeking?</h2>
          
          <form onSubmit={handleSearch} className="relative group">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Rudraksha, Yantras..."
              className="w-full bg-transparent border-b-2 border-stone-200 py-4 text-xl md:text-2xl text-center font-montserrat outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300"
            />
            <button 
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-stone-900 transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>

          <div className="mt-12">
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-6">Popular Searches</p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Rudraksha', 'Shiva Lingam', 'Varanasi Silk', 'Incense', 'Mala'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    navigate(`/shop?search=${term}`);
                    onClose();
                  }}
                  className="px-6 py-2 border border-stone-200 text-stone-600 text-xs uppercase tracking-wider hover:border-stone-900 hover:text-stone-900 transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;