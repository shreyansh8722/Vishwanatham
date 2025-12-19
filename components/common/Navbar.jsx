import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, Heart, Search, X, User, ChevronRight, ChevronDown, LogIn, ShieldAlert } from 'lucide-react'; // Added ShieldAlert
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';
import { useFavorites } from '../../hooks/useFavorites';
import Logo from '../../assets/logo.png';
import { SearchPopup } from './SearchPopup';

// --- MENU DATA ---
const MENU_STRUCTURE = {
  "Sarees": {
    image: "https://images.unsplash.com/photo-1610189012906-47833d772097?auto=format&fit=crop&q=80",
    sections: {
      "By Fabric": ["Katan Silk", "Georgette", "Organza", "Tussar", "Munga Silk", "Tissue"],
      "By Technique": ["Kadhua", "Fekwa", "Tanchoi", "Jangla", "Meenakari", "Rangkaat"],
      "Occasion": ["Bridal", "Festive", "Cocktail", "Workwear", "Trousseau"]
    }
  },
  "Lehengas": {
    image: "https://images.unsplash.com/photo-1583391726247-e29237d8612f?auto=format&fit=crop&q=80",
    sections: {
      "Collections": ["Bridal Handloom", "Contemporary", "Vintage Revival", "Light Lehengas"],
      "Fabric": ["Silk Brocade", "Organza", "Tissue", "Georgette"],
      "Color": ["Red & Maroon", "Pastels", "Gold & Silver", "Midnight Blue"]
    }
  },
  "Suits": {
    image: "https://images.unsplash.com/photo-1621623194266-4b3664963684?auto=format&fit=crop&q=80",
    sections: {
      "Type": ["Unstitched Sets", "Ready to Wear", "Kurta Fabrics", "Dupatta Sets"],
      "Fabric": ["Katan Silk", "Chanderi", "Cotton Silk", "Mongia"]
    }
  },
  "Dupattas": {
    image: "https://images.unsplash.com/photo-1596230529625-7eeeff6f1a8c?auto=format&fit=crop&q=80",
    sections: {
      "Style": ["Heavy Zari", "Light Border", "Butidar", "Jangla"],
      "Fabric": ["Silk", "Georgette", "Net", "Organza"]
    }
  }
};

// --- TYPEWRITER SEARCH ---
const TypewriterSearch = ({ onClick, scrolled }) => {
  const phrases = ["Search Katan Silk...", "Search Bridal...", "Search Organza...", "Search Handloom..."];
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting && text !== currentPhrase) setText(currentPhrase.slice(0, text.length + 1));
      else if (!isDeleting && text === currentPhrase) setTimeout(() => setIsDeleting(true), 2000);
      else if (isDeleting && text !== '') setText(currentPhrase.slice(0, text.length - 1));
      else if (isDeleting && text === '') { setIsDeleting(false); setPhraseIndex((prev) => (prev + 1) % phrases.length); }
    }, typeSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <button onClick={onClick} className="group flex items-center gap-3">
      <Search size={20} strokeWidth={1} className="text-gray-800 group-hover:text-black transition-colors" />
      <span className={`hidden lg:flex items-center text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-black transition-all duration-500 ease-in-out whitespace-nowrap overflow-hidden ${
          scrolled ? 'w-0 opacity-0' : 'w-48 opacity-100'
      }`}>
        {text}
        <span className="animate-pulse ml-1 text-gray-400">|</span>
      </span>
    </button>
  );
};

export const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const timeoutRef = useRef(null);
  const { cartCount, openCart } = useCart();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  // 1. Get userRole
  const { user, userRole } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    setActiveCategory(null);
    setMenuOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  const handleMouseEnter = (category) => {
    if (scrolled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 100);
  };

  const handleNavigate = (cat, subCat) => {
    setActiveCategory(null);
    setMenuOpen(false);
    navigate(`/shop?cat=${cat.toLowerCase()}&sub=${subCat?.toLowerCase() || ''}`);
  };

  const toggleMobileCategory = (cat) => {
    setMobileExpanded(mobileExpanded === cat ? null : cat);
  };

  const getSpacerHeight = () => {
    if (scrolled) return 'h-[60px] md:h-[64px]'; 
    if (showAnnouncement) return 'h-[90px] md:h-[174px]'; 
    return 'h-[60px] md:h-[134px]'; 
  };

  return (
    <>
      <AnimatePresence>
        {(activeCategory || menuOpen) && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => { setActiveCategory(null); setMenuOpen(false); }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[40]"
          />
        )}
      </AnimatePresence>

      <header className={`fixed top-0 left-0 w-full z-[50] flex flex-col bg-[#F5F5F5] transition-all duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}>
        
        <AnimatePresence>
            {showAnnouncement && !scrolled && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="w-full bg-neutral-900 text-white relative z-[61]"
                >
                    <div className="w-full min-h-[40px] max-w-[1800px] mx-auto px-4 py-2 flex justify-center items-center relative">
                        <p className="text-[9px] md:text-[10px] font-sans uppercase tracking-wide md:tracking-[0.2em] font-medium text-center opacity-90 w-full px-4 leading-tight">
                            Complimentary Shipping on Domestic Orders Over ₹10,000
                        </p>
                        <button onClick={() => setShowAnnouncement(false)} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 p-2">
                            <X size={12} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className={`w-full z-[60] relative bg-[#F5F5F5] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled ? 'h-[60px] md:h-[64px]' : 'h-[60px] md:h-[84px]'
        }`}>
            <div className="w-full h-full px-4 md:px-12 max-w-[1800px] mx-auto flex items-center justify-between relative">
            
                <div className="flex items-center gap-3 md:gap-6 z-20">
                    <button onClick={() => setMenuOpen(true)} className={`flex items-center gap-2 md:gap-3 group transition-all duration-300 ${scrolled ? 'opacity-100 translate-x-0' : 'lg:hidden'}`}>
                        <Menu size={20} strokeWidth={1} className="text-gray-800 group-hover:text-black transition-colors" />
                        <span className={`hidden lg:block text-[10px] uppercase tracking-[0.2em] font-medium text-gray-800 group-hover:text-black ${scrolled ? 'opacity-100' : 'opacity-0 w-0'}`}>Menu</span>
                    </button>
                    <TypewriterSearch onClick={() => setSearchOpen(true)} scrolled={scrolled} />
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <Link to="/" className="flex items-center justify-center">
                        <img 
                            src={Logo} 
                            alt="Pahnawa" 
                            className={`object-contain transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                scrolled ? 'h-20 md:h-25' : 'h-25 md:h-30'
                            }`} 
                        />
                    </Link>
                </div>

                <div className="flex justify-end items-center gap-4 md:gap-8 text-gray-800 z-20">
                    {/* 2. ADMIN LINK (DESKTOP) - Using Role */}
                    {userRole === 'admin' && (
                       <Link to="/admin" className="hidden md:flex items-center gap-1 text-red-700 hover:text-red-900 transition-colors" title="Admin Panel">
                          <ShieldAlert size={20} strokeWidth={1.5} />
                          <span className="text-[10px] font-bold uppercase tracking-widest hidden xl:block">Admin</span>
                       </Link>
                    )}

                    <Link to={user ? "/profile" : "/login"} className="hidden md:block hover:text-black transition-colors group">
                        <User size={20} strokeWidth={1} className="group-hover:scale-105 transition-transform" />
                    </Link>
                    
                    <button onClick={() => navigate('/favorites')} className="hidden md:block hover:text-black transition-colors group relative">
                        <Heart size={20} strokeWidth={1} className="group-hover:scale-105 transition-transform" />
                        {favorites.length > 0 && (
                            <span className="absolute -top-2 -right-2 z-10 bg-black text-white text-[9px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                                {favorites.length}
                            </span>
                        )}
                    </button>

                    <button onClick={openCart} className="relative hover:text-black transition-colors group">
                        <ShoppingBag size={20} strokeWidth={1} className="group-hover:scale-105 transition-transform" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 z-10 bg-black text-white text-[9px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>

        <div className={`hidden lg:block w-full bg-[#F5F5F5] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
            scrolled ? 'max-h-0 opacity-0' : 'max-h-[50px] opacity-100'
        }`} onMouseLeave={handleMouseLeave}>
            <div className="w-full flex justify-center items-center h-[50px]">
                <div className="flex gap-14 items-center h-full">
                    {Object.keys(MENU_STRUCTURE).map((cat) => (
                    <div key={cat} onMouseEnter={() => handleMouseEnter(cat)} className="h-full flex items-center">
                        <button onClick={() => handleNavigate(cat, '')} className={`h-full flex items-center px-4 text-[11px] font-sans uppercase tracking-[0.2em] transition-all duration-300 ${activeCategory === cat ? 'text-black font-bold' : 'text-gray-600 hover:text-black'}`}>
                            {cat}
                        </button>
                    </div>
                    ))}
                    <Link to="/about" onMouseEnter={() => setActiveCategory(null)} className="h-full flex items-center px-4 text-[11px] font-sans uppercase tracking-[0.2em] text-gray-600 hover:text-black transition-all duration-300">
                        Our Story
                    </Link>
                </div>
            </div>
        </div>

        <AnimatePresence>
          {activeCategory && !scrolled && MENU_STRUCTURE[activeCategory] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onMouseEnter={() => handleMouseEnter(activeCategory)}
              onMouseLeave={handleMouseLeave}
              className="absolute top-full left-0 w-full bg-white z-40 border-b border-gray-100 shadow-sm"
            >
              <div className="container mx-auto px-12 xl:px-20 py-12 flex min-h-[400px]">
                <div className="flex-1 grid grid-cols-3 gap-12 pr-20 border-r border-gray-100">
                  {Object.entries(MENU_STRUCTURE[activeCategory].sections).map(([subHeader, items]) => (
                    <div key={subHeader} className="space-y-6">
                      <h4 className="font-serif text-lg text-black border-b border-gray-100 pb-3">{subHeader}</h4>
                      <ul className="space-y-3">
                        {items.map(item => (
                          <li key={item}>
                             <button onClick={() => handleNavigate(activeCategory, item)} className="text-[13px] text-gray-500 hover:text-black hover:pl-1 transition-all duration-300 text-left">
                               {item}
                             </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div className="w-[300px] xl:w-[400px] pl-16">
                   <div className="w-full h-full relative group overflow-hidden bg-white cursor-pointer" onClick={() => handleNavigate(activeCategory, '')}>
                      <img src={MENU_STRUCTURE[activeCategory].image} alt="Featured" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500" />
                      <div className="absolute bottom-6 left-6 text-white z-10">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-[9px] uppercase tracking-widest mb-3 text-white border border-white/30">View Collection</span>
                        <h3 className="font-serif italic text-3xl drop-shadow-md">{activeCategory}</h3>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE MENU - USER FRIENDLY & FAST */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: "tween", ease: "circOut", duration: 0.3 }}
            className="fixed inset-0 z-[150] bg-white flex flex-col shadow-2xl"
          >
             {/* 1. PERSONALIZED HEADER (No Pahnawa Branding) */}
             <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
                <Link 
                  to={user ? "/profile" : "/login"} 
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 group"
                >
                   <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-heritage-gold group-hover:border-heritage-gold transition-colors shadow-sm">
                      {user ? <User size={22} strokeWidth={1.5} /> : <LogIn size={20} strokeWidth={1.5}/>}
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-0.5">Welcome,</span>
                      <span className="text-lg font-serif text-gray-900 leading-none group-hover:text-heritage-gold transition-colors">
                        {user ? (user.displayName || 'Member') : 'Sign In / Join'}
                      </span>
                   </div>
                </Link>
                
                <button 
                  onClick={() => setMenuOpen(false)} 
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200/50 transition-colors"
                >
                  <X size={24} strokeWidth={1} className="text-gray-500" />
                </button>
             </div>
             
             {/* 2. FAST ACCORDION MENU */}
             <div className="flex-1 overflow-y-auto px-6 py-4">
                {Object.keys(MENU_STRUCTURE).map((cat) => (
                  <div key={cat} className="border-b border-gray-50 last:border-0">
                    <button 
                      onClick={() => toggleMobileCategory(cat)}
                      className="w-full flex justify-between items-center py-5 group"
                    >
                      <span className={`text-xl font-serif transition-colors duration-200 ${mobileExpanded === cat ? 'text-heritage-gold' : 'text-gray-900'}`}>{cat}</span>
                      <ChevronDown 
                        size={18} 
                        className={`text-gray-400 transition-transform duration-300 ${mobileExpanded === cat ? 'rotate-180 text-heritage-gold' : ''}`} 
                      />
                    </button>
                    
                    {/* EXPANDABLE CONTENT */}
                    <AnimatePresence>
                      {mobileExpanded === cat && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: 'auto', opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-gray-50/30 -mx-6 px-6"
                        >
                          <div className="py-4 space-y-6">
                            {Object.entries(MENU_STRUCTURE[cat].sections).map(([sectionTitle, items]) => (
                              <div key={sectionTitle}>
                                <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">{sectionTitle}</h5>
                                <div className="grid grid-cols-2 gap-y-2 gap-x-2">
                                  {items.map(item => (
                                    <button 
                                      key={item}
                                      onClick={() => handleNavigate(cat, item)}
                                      className="text-left text-xs text-gray-600 hover:text-heritage-gold font-medium py-1.5 px-1 rounded hover:bg-white transition-all"
                                    >
                                      {item}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <button 
                              onClick={() => handleNavigate(cat, '')} 
                              className="w-full text-center text-[10px] font-bold uppercase tracking-widest text-black border border-black py-3 hover:bg-black hover:text-white transition-colors mt-2 rounded-sm"
                            >
                              View All {cat}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                
                <Link to="/about" onClick={() => setMenuOpen(false)} className="flex justify-between items-center py-5 border-b border-gray-50">
                   <span className="text-xl font-serif text-gray-900">Our Story</span>
                   <ChevronRight size={18} className="text-gray-300" />
                </Link>

                {/* 3. ADMIN LINK (MOBILE) - Using Role */}
                {userRole === 'admin' && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex justify-between items-center py-5 border-b border-gray-50 text-red-600 font-bold">
                     <span className="text-xl font-serif">Admin Panel</span>
                     <ShieldAlert size={18} />
                  </Link>
                )}
             </div>

             {/* 4. BOTTOM ACTIONS */}
             <div className="p-6 border-t border-gray-100 bg-white">
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors rounded-sm">
                    <User size={18} strokeWidth={1.5} /><span className="text-[10px] uppercase tracking-widest font-bold text-gray-600">Account</span>
                  </Link>
                  <Link to="/favorites" onClick={() => setMenuOpen(false)} className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors rounded-sm">
                    <Heart size={18} strokeWidth={1.5} /><span className="text-[10px] uppercase tracking-widest font-bold text-gray-600">Wishlist</span>
                  </Link>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchPopup isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      
      <div className={`bg-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${getSpacerHeight()}`} />
    </>
  );
};