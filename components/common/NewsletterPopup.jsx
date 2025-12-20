import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a delay, e.g., 5 seconds
    const timer = setTimeout(() => {
      const hasSeenNewsletter = localStorage.getItem('hasSeenNewsletter');
      if (!hasSeenNewsletter) {
        setIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenNewsletter', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose}></div>
      <div className="relative bg-white w-full max-w-md p-8 md:p-12 text-center shadow-2xl animate-fade-in-up">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="font-cormorant text-3xl text-stone-900 mb-2">Join the Circle</h3>
        <p className="font-montserrat text-xs text-stone-500 mb-6 leading-relaxed">
          Subscribe to receive updates on new collections, spiritual insights from Kashi, and exclusive offers.
        </p>
        
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
          <input 
            type="email" 
            placeholder="YOUR EMAIL ADDRESS" 
            className="w-full border-b border-stone-300 py-2 text-center text-sm font-montserrat outline-none focus:border-stone-900 transition-colors placeholder:text-stone-400 uppercase tracking-wider"
            required
          />
          <button 
            type="submit" 
            className="bg-stone-900 text-white py-3 text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors mt-2"
          >
            Subscribe
          </button>
        </form>
        
        <p className="mt-4 text-[10px] text-stone-400 uppercase tracking-wider cursor-pointer hover:text-stone-600" onClick={handleClose}>
          No thanks, I prefer to browse
        </p>
      </div>
    </div>
  );
};

export default NewsletterPopup;