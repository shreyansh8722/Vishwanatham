import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, ChevronDown, User, Menu, X } from 'lucide-react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import BrandLogo from './BrandLogo'; 
import NewsletterPopup from './NewsletterPopup';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';

const navItems = [
  { 
    label: "Rudraksha", 
    path: "/shop?category=Rudraksha",
    hasDropdown: true,
    visualItems: [
      { title: "Collector Beads", desc: "Rare 1-21 Mukhi", image: "https://images.unsplash.com/photo-1611568285568-3d846513369a?q=80&w=400", link: "/shop?category=Rudraksha&sub=Collector" },
      { title: "Japa Malas", desc: "Meditation Rosaries", image: "https://images.unsplash.com/photo-1603038930495-2c26279f6764?q=80&w=400", link: "/shop?category=Rudraksha&sub=Malas" },
      { title: "Healing Bracelets", desc: "Daily Wear", image: "https://images.unsplash.com/photo-1590424600100-3486df5b9745?q=80&w=400", link: "/shop?category=Rudraksha&sub=Bracelets" }
    ]
  },
  { 
    label: "Gemstones", 
    path: "/shop?category=Crystals",
    hasDropdown: true,
    visualItems: [
      { title: "Vedic Gems", desc: "Astrological Grade", image: "https://images.unsplash.com/photo-1567113300190-484852086433?q=80&w=400", link: "/shop?category=Crystals&sub=Vedic" },
      { title: "Crystal Decor", desc: "Home Energy", image: "https://images.unsplash.com/photo-1610189012906-47833d772097?q=80&w=400", link: "/shop?category=Crystals&sub=Healing" }
    ]
  },
  { label: "Yantras", path: "/shop?category=Yantras", hasDropdown: false },
  { label: "Consultation", path: "/consult", hasDropdown: false }
];

const announcements = [
  "Free shipping on all orders above ₹999",
  "100% Lab certified authentic spiritual goods",
  "Trusted by 50,000+ happy devotees"
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const searchInputRef = useRef(null);

  const { user } = useAuth();
  const { cartItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHoveredIndex(null);
    setIsSearchOpen(false); 
  }, [location.pathname]);

  // Announcement Rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-focus search input
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const isActive = (path) => location.pathname === path;
  
  // Get currently hovered item data
  const activeItem = hoveredIndex !== null ? navItems[hoveredIndex] : null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <NewsletterPopup />

      {/* 1. ANNOUNCEMENT BAR */}
      <div className="bg-heritage-rudraksha text-white border-b border-[#3E2215] h-9 w-full relative z-[160]">
        <div className="container mx-auto h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnnouncement}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-medium font-manrope tracking-wide text-center px-4"
            >
              {announcements[currentAnnouncement]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. MAIN HEADER (Sticky) */}
      {/* CHANGE: Changed bg-white to bg-heritage-paper and border-gray-100 to border-heritage-mist */}
      <nav className="sticky top-0 bg-heritage-paper border-b border-heritage-mist z-[140] shadow-sm transition-colors duration-300">
        
        {/* TOP ROW: Logo, Search, Cart */}
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-20 relative">
            
            {/* LEFT: Mobile & Search */}
            <div className="w-1/3 flex items-center gap-4">
              <button 
                className="md:hidden p-2 text-heritage-charcoal hover:bg-heritage-sand rounded-full transition-colors" 
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
              
              <div className="relative">
                <button 
                  className={`flex items-center gap-2 transition-colors ${isSearchOpen ? 'text-heritage-rudraksha' : 'text-heritage-charcoal hover:text-heritage-rudraksha'}`}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                  <span className="hidden md:inline-block text-sm font-medium font-manrope">Search</span>
                </button>

                {/* SEARCH POPOVER BOX */}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="absolute top-full left-0 mt-3 w-[280px] md:w-[350px] bg-white border border-heritage-mist shadow-xl rounded-lg p-3 z-[170]"
                    >
                      <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-t border-l border-heritage-mist transform rotate-45"></div>
                      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 relative z-10">
                        <input 
                          ref={searchInputRef}
                          type="text" 
                          placeholder="Search products..." 
                          className="flex-grow bg-heritage-sand/50 rounded px-3 py-2 text-sm font-manrope text-heritage-charcoal outline-none border border-transparent focus:border-heritage-rudraksha/20 focus:bg-white transition-all"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                          type="submit" 
                          className="bg-heritage-rudraksha text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-heritage-saffron transition-colors"
                        >
                          Go
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CENTER: Logo */}
            <div className="w-1/3 flex justify-center items-center"> 
              <Link to="/">
                <BrandLogo className="h-9 text-heritage-rudraksha" />
              </Link>
            </div>

            {/* RIGHT: User Actions */}
            <div className="w-1/3 flex items-center justify-end gap-5">
              <Link to={user ? "/profile" : "/login"} className="text-heritage-charcoal hover:text-heritage-rudraksha transition-colors">
                <User className="w-6 h-6" strokeWidth={1.5} />
              </Link>
              <button className="relative text-heritage-charcoal hover:text-heritage-rudraksha transition-colors" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-heritage-rudraksha rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3. NAVIGATION & MEGA MENU CONTAINER */}
        <div 
          // CHANGE: Changed border-gray-100 to border-heritage-mist
          className="hidden md:block border-t border-heritage-mist relative"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="container mx-auto flex justify-center">
            <div className="flex items-center gap-10">
              {navItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group py-3 border-b-2 border-transparent hover:border-heritage-rudraksha transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                >
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-1 text-[14px] font-medium font-cinzel transition-colors ${
                      isActive(item.path) || hoveredIndex === idx ? 'text-heritage-rudraksha' : 'text-heritage-charcoal'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* MEGA MENU */}
          <AnimatePresence>
            {activeItem && activeItem.hasDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                // CHANGE: Use bg-heritage-paper to match navbar
                className="absolute left-0 top-full w-full bg-heritage-paper border-t border-heritage-mist shadow-xl z-[145]"
                onMouseEnter={() => {}} 
              >
                <div className="py-8">
                  <div className="container mx-auto px-8 max-w-6xl">
                    <div className="grid grid-cols-4 gap-6">
                      {activeItem.visualItems?.map((vItem, vIdx) => (
                        <Link 
                          key={vIdx} 
                          to={vItem.link} 
                          className="group/item flex flex-col gap-3 p-3 rounded-lg hover:bg-heritage-sand transition-all"
                          onClick={() => setHoveredIndex(null)}
                        >
                          <div className="h-40 w-full overflow-hidden rounded-md bg-white relative border border-heritage-mist">
                            <img 
                              src={vItem.image} 
                              alt={vItem.title}
                              className="w-full h-full object-cover transform transition-transform duration-500 group-hover/item:scale-105" 
                            />
                          </div>
                          <div className="text-center">
                            <h4 className="font-cinzel text-base font-semibold text-heritage-charcoal group-hover/item:text-heritage-rudraksha transition-colors">
                              {vItem.title}
                            </h4>
                            <span className="text-xs text-heritage-grey font-manrope">
                              {vItem.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[190] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              // CHANGE: Changed bg-white to bg-heritage-paper
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-heritage-paper z-[200] shadow-2xl overflow-y-auto md:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <BrandLogo className="h-8 text-heritage-rudraksha" />
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-heritage-charcoal">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="flex flex-col gap-2">
                  {navItems.map((item, idx) => (
                    <div key={idx} className="border-b border-heritage-mist py-4">
                      <Link 
                        to={item.path} 
                        className="font-cinzel text-lg font-bold text-heritage-charcoal block mb-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.hasDropdown && (
                        <div className="pl-4 flex flex-col gap-3 mt-2">
                          {item.visualItems.map((sub, subIdx) => (
                            <Link 
                              key={subIdx} 
                              to={sub.link}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-sm text-heritage-grey font-manrope"
                            >
                              {sub.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;