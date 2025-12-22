import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-heritage-charcoal/60 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>
      
      {/* Modal */}
      <div className="relative bg-heritage-paper w-full max-w-md p-10 text-center shadow-2xl animate-scale-in border border-heritage-gold/20">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-heritage-grey hover:text-heritage-rudraksha transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Title - Serif */}
        <h3 className="font-heading text-3xl md:text-4xl text-heritage-charcoal mb-3 font-medium">
          Join the Circle
        </h3>
        
        {/* Body - Sans Serif */}
        <p className="font-body text-xs text-heritage-grey mb-8 leading-relaxed max-w-xs mx-auto">
          Subscribe to receive updates on new collections, spiritual insights from Kashi, and exclusive offers.
        </p>
        
        <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
          <input 
            type="email" 
            placeholder="YOUR EMAIL ADDRESS" 
            className="w-full bg-transparent border-b border-heritage-grey/40 py-2 text-center text-sm font-body outline-none focus:border-heritage-rudraksha transition-colors placeholder:text-heritage-grey/50 text-heritage-charcoal uppercase tracking-wider"
            required
          />
          <button 
            type="submit" 
            className="bg-heritage-rudraksha text-white py-3.5 text-xs font-bold font-body uppercase tracking-[0.2em] hover:bg-heritage-gold transition-colors shadow-lg"
          >
            Subscribe
          </button>
        </form>
        
        <button 
          className="mt-6 text-[10px] font-bold text-heritage-grey/60 uppercase tracking-widest hover:text-heritage-rudraksha transition-colors" 
          onClick={handleClose}
        >
          No thanks, I prefer to browse
        </button>
      </div>
    </div>
  );
};

export default NewsletterPopup;