import React, { useState, useEffect } from 'react';
import { X, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('newsletter_seen');
    if (!hasSeen) {
      // Delay slightly longer (8s) so user sees the hero section first
      const timer = setTimeout(() => setIsOpen(true), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('newsletter_seen', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await addDoc(collection(db, 'subscribers'), { email, createdAt: serverTimestamp() });
      setSubmitted(true);
      setTimeout(handleClose, 3000);
    } catch (err) { console.error(err); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          
          {/* Backdrop: Darker for focus */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-heritage-charcoal/80 backdrop-blur-sm" 
            onClick={handleClose} 
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0 }} 
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-heritage-paper w-full max-w-4xl max-h-[80vh] shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden border border-heritage-gold/20"
          >
             {/* Minimal Close Button */}
             <button 
               onClick={handleClose} 
               className="absolute top-4 right-4 z-30 text-heritage-charcoal/50 hover:text-heritage-charcoal transition-colors p-2"
             >
               <X size={20} strokeWidth={1} />
             </button>
             
             {/* Image Side: Use a rich texture or model shot */}
             <div className="hidden md:block w-1/2 relative bg-heritage-sand">
                <img 
                  src="https://images.unsplash.com/photo-1610189012906-47833d772097?q=80&w=800&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-90" 
                  alt="Banarasi Detail" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-heritage-paper/10" />
             </div>

             {/* Content Side */}
             <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center text-center md:text-left relative">
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                   <Mail size={120} />
                </div>

                {submitted ? (
                   <div className="text-center py-10">
                      <h3 className="text-3xl font-serif italic text-heritage-gold mb-2">Welcome.</h3>
                      <p className="text-heritage-charcoal font-light">Your code has been sent to your inbox.</p>
                   </div>
                ) : (
                  <>
                    <span className="text-heritage-gold text-[10px] font-bold uppercase tracking-[0.25em] mb-4 block">
                      The Heritage Club
                    </span>
                    
                    <h2 className="font-serif text-4xl md:text-5xl text-heritage-charcoal italic mb-6 leading-tight">
                      Unlock <span className="text-heritage-clay">10% Off</span><br/>Your First Heirloom
                    </h2>
                    
                    <p className="text-heritage-grey font-sans font-light text-sm mb-10 leading-relaxed max-w-sm">
                      Be the first to access our private collections, weaver stories, and exclusive seasonal offers.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
                       <input 
                         type="email" 
                         placeholder="Email Address" 
                         className="w-full bg-transparent border-b border-heritage-charcoal/20 py-3 pr-10 text-heritage-charcoal placeholder:text-heritage-charcoal/30 outline-none focus:border-heritage-gold transition-colors font-sans"
                         value={email}
                         onChange={e => setEmail(e.target.value)}
                         required
                       />
                       <button 
                         type="submit" 
                         className="absolute right-0 bottom-3 text-heritage-charcoal hover:text-heritage-gold transition-colors"
                       >
                          <ArrowRight size={20} strokeWidth={1} />
                       </button>
                    </form>
                    
                    <p className="text-[9px] text-heritage-grey/40 mt-6 uppercase tracking-widest">
                      We respect your privacy. No spam, ever.
                    </p>
                  </>
                )}
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};