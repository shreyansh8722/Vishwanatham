import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, ChevronDown, User, Heart, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Real Project Imports
import BrandLogo from './BrandLogo'; // Using your real logo component
import SearchPopup from './SearchPopup';
import NewsletterPopup from './NewsletterPopup';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../hooks/useFavorites';

// --- CUSTOM STYLES (Ensuring the aesthetic works immediately) ---
const CustomStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@400;500;700&display=swap');
    
    .font-cormorant { font-family: 'Cormorant Garamond', serif; }
    .font-montserrat { font-family: 'Montserrat', sans-serif; }
    
    /* Ensure these override or complement your tailwind config */
    .bg-heritage-charcoal { background-color: #1c1c1c; }
    .text-heritage-charcoal { color: #1c1c1c; }
    
    .text-heritage-gold { color: #c5a059; }
    .bg-heritage-gold { background-color: #c5a059; }
    
    .text-heritage-paper { color: #f4f1ea; }
    .text-heritage-grey { color: #666666; }
    
    .border-stone-100 { border-color: #f5f5f4; }
  `}</style>
);

// --- NAVIGATION DATA ---
const navItems = [
  { 
    label: "Rudraksha", 
    path: "/shop?category=Rudraksha",
    hasDropdown: true,
    visualItems: [
      { title: "Collector Beads", desc: "Rare 1-14 Mukhi", image: "https://images.unsplash.com/photo-1611568285568-3d846513369a?q=80&w=400&auto=format&fit=crop", link: "/shop?category=Rudraksha&sub=Collector" },
      { title: "Sacred Malas", desc: "Siddha & Japa", image: "https://images.unsplash.com/photo-1603038930495-2c26279f6764?q=80&w=400&auto=format&fit=crop", link: "/shop?category=Rudraksha&sub=Malas" },
      { title: "Bracelets", desc: "Daily Protection", image: "https://images.unsplash.com/photo-1590424600100-3486df5b9745?q=80&w=400&auto=format&fit=crop", link: "/shop?category=Rudraksha&sub=Bracelets" },
      { title: "Pendants", desc: "Vedic Silver", image: "https://images.unsplash.com/photo-1611568285568-3d846513369a?q=80&w=400&auto=format&fit=crop", link: "/shop?category=Rudraksha&sub=Pendants" }
    ]
  },
  { 
    label: "Crystals", 
    path: "/shop?category=Crystals",
    hasDropdown: true,
    visualItems: [
      { title: "Energy Stones", desc: "Raw & Tumbled", image: "https://images.unsplash.com/photo-1567113300190-484852086433?q=80&w=400&auto=format&fit=crop", link: "/shop?category=Crystals&sub=Healing" },
      { title: "Crystal Jewelry", desc: "Wearable Energy", image: "https://images.unsplash.com/photo-1590424600100-3486df5b9745?q=80&w=400&auto=format&fit=crop", link: "/shop?category=Crystals&sub=Jewelry" },
      { title: "Pyramids", desc: "Space Harmonizers", image: "https://images.unsplash.com/photo-1542125387-c7128488903c?q=80&w=400&auto=format&fit=crop", link: "/shop?category=Crystals&sub=Pyramids" },
      { title: "Wands", desc: "Manifestation", image: "https://images.unsplash.com/photo-1567113300190-484852086433?q=80&w=400&auto=format&fit=crop", link: "/shop?category=Crystals&sub=Wands" }
    ]
  },
  { 
    label: "Yantras", 
    path: "/shop?category=Yantras",
    hasDropdown: true,
    visualItems: [
      { title: "Sacred Geometry", desc: "Shree & Kuber", image: "https://images.unsplash.com/photo-1623151834261-24874f676239?q=80&w=400&auto=format&fit=crop", link: "/shop?category=Yantras&sub=Copper" },
      { title: "Yantra Lockets", desc: "Gold Plated", image: "https://images.unsplash.com/photo-1590424600100-3486df5b9745?q=80&w=400&auto=format&fit=crop", link: "/shop?category=Yantras&sub=Lockets" }
    ]
  },
  { label: "About Us", path: "/about", hasDropdown: false }
];

const announcements = [
  "CONSECRATED IN KASHI • FREE SHIPPING ON ORDERS ABOVE ₹2500",
  "WORLDWIDE SHIPPING AVAILABLE • AUTHENTIC & CERTIFIED",
  "JOIN OUR COMMUNITY • GET 10% OFF YOUR FIRST ORDER"
];

const AnimatedHamburger = ({ isOpen, toggle }) => (
  <button onClick={toggle} className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none relative z-[200]">
    <motion.span animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-heritage-charcoal block origin-center transition-colors" />
    <motion.span animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }} className="w-5 h-0.5 bg-heritage-charcoal block transition-colors" />
    <motion.span animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-heritage-charcoal block origin-center transition-colors" />
  </button>
);

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  // Integrate Real Hooks
  const { user, logout } = useAuth();
  const { cartItems, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();
  const location = useLocation();

  // Derived State
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const favoritesCount = favorites ? favorites.length : 0;

  // Auto-close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHoveredIndex(null);
    document.body.style.overflow = 'unset';
  }, [location.pathname, location.search]);

  // Lock scroll when full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  // Announcement Rotation Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const isActive = (path) => {
    if (path.includes('?')) {
      return (location.pathname + location.search) === path;
    }
    return location.pathname === path;
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setHoveredIndex(null);
  };

  return (
    <>
      <CustomStyles />
      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NewsletterPopup />

      {/* Top Bar - Dynamic Announcement */}
      <div className="bg-heritage-charcoal text-heritage-paper text-[10px] py-2 text-center font-bold tracking-[0.1em] uppercase relative z-[150] h-8 overflow-hidden flex items-center justify-center font-montserrat">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAnnouncement}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full"
          >
            {announcements[currentAnnouncement]}
          </motion.div>
        </AnimatePresence>
      </div>

      <nav 
        className="sticky top-0 z-[140] bg-white border-b border-stone-100 shadow-sm transition-all duration-300 relative"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Main Action Bar */}
          <div 
            className="flex justify-between items-center h-16 md:h-20"
            onMouseEnter={() => setHoveredIndex(null)}
          > 
            
            {/* Left: Search & Mobile Menu */}
            <div className="w-1/3 flex items-center gap-3 md:gap-8">
              <button 
                className="p-1 text-heritage-charcoal hover:text-heritage-gold transition-colors flex items-center gap-2"
                onClick={handleSearchClick}
              >
                <Search className="w-5 h-5 md:w-6 md:h-6" />
                <span className="hidden md:inline-block text-[10px] font-bold tracking-widest uppercase font-montserrat">Search</span>
              </button>
              <div className="md:hidden">
                <AnimatedHamburger isOpen={mobileMenuOpen} toggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
              </div>
            </div>

            {/* Center: Brand Logo */}
            <div className="w-1/3 flex justify-center items-center h-full"> 
              <Link to="/" className="flex items-center justify-center -mt-1">
                <BrandLogo className="scale-[1.1] md:scale-100 transition-transform origin-center text-heritage-charcoal" />
              </Link>
            </div>

            {/* Right: Icons (Wishlist, Account, Cart) */}
            <div className="w-1/3 flex items-center justify-end gap-3 md:gap-8">
              <Link to="/favorites" className="relative p-1 text-heritage-charcoal hover:text-heritage-gold transition-colors">
                <Heart className="w-5 h-5 md:w-6 md:h-6" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-heritage-gold rounded-full flex items-center justify-center text-[7px] text-white font-bold ring-1 ring-white shadow-sm">
                    {favoritesCount}
                  </span>
                )}
              </Link>
              
              <Link to={user ? "/profile" : "/login"} className="p-1 text-heritage-charcoal hover:text-heritage-gold transition-colors">
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
              
              <button 
                className="relative p-1 text-heritage-charcoal hover:text-heritage-gold transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-heritage-gold rounded-full flex items-center justify-center text-[7px] text-white font-bold ring-1 ring-white shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex justify-center pb-4 relative">
            <div className="flex items-center gap-12 lg:gap-16">
              {navItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group py-2"
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setHoveredIndex(idx); 
                  }}
                >
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] font-montserrat transition-colors ${
                      isActive(item.path) || hoveredIndex === idx ? 'text-heritage-gold' : 'text-heritage-charcoal hover:text-heritage-gold'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
                        isActive(item.path) || hoveredIndex === idx ? 'text-heritage-gold rotate-180' : 'opacity-20 group-hover:text-heritage-gold'
                      }`} />
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MEGA MENU DROP DOWN */}
        <AnimatePresence>
          {hoveredIndex !== null && navItems[hoveredIndex].hasDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-full w-full bg-white border-t border-stone-100 shadow-2xl z-[145]" 
              onMouseEnter={() => setHoveredIndex(hoveredIndex)}
            >
              <div className="py-12">
                <div className="container mx-auto px-8 max-w-[1100px]">
                  <div className="grid grid-cols-4 gap-10 text-center">
                    {navItems[hoveredIndex].visualItems?.map((vItem, vIdx) => (
                      <Link 
                        key={vIdx} 
                        to={vItem.link} 
                        className="group/item flex flex-col items-center"
                        onClick={() => setHoveredIndex(null)}
                      >
                        <div className="h-48 w-full overflow-hidden rounded-sm border border-gray-100 mb-5 bg-gray-50 shadow-sm relative">
                          <img 
                            src={vItem.image} 
                            alt={vItem.title}
                            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover/item:scale-110" 
                          />
                          <div className="absolute inset-0 bg-heritage-charcoal/0 group-hover/item:bg-heritage-charcoal/5 transition-colors duration-300" />
                        </div>
                        <h4 className="font-cormorant text-sm font-bold text-heritage-charcoal tracking-wide mb-1 uppercase group-hover/item:text-heritage-gold transition-colors">{vItem.title}</h4>
                        <span className="text-[9px] tracking-[0.1em] text-heritage-grey uppercase font-bold font-montserrat">{vItem.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* MOBILE MENU (Full Screen) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[130] bg-white w-screen h-screen pt-24 overflow-y-auto px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 pb-20 max-w-lg mx-auto">
              {navItems.map((item, idx) => (
                <div key={idx} className="border-b border-gray-50 pb-8 last:border-0">
                  <Link 
                    to={item.path} 
                    className={`font-cormorant text-4xl font-bold block mb-6 uppercase tracking-widest ${
                      isActive(item.path) ? 'text-heritage-gold' : 'text-heritage-charcoal'
                    }`}
                  >
                    {item.label}
                  </Link>
                  
                  {item.hasDropdown && (
                    <div className="grid grid-cols-2 gap-4">
                      {item.visualItems?.map((vItem, vIdx) => (
                        <Link 
                          key={vIdx} 
                          to={vItem.link}
                          className="flex flex-col gap-3 group"
                        >
                          <div className="h-36 w-full overflow-hidden rounded-sm border border-gray-100 bg-gray-50">
                            <img src={vItem.image} className="w-full h-full object-cover" alt={vItem.title} />
                          </div>
                          <span className="text-[10px] text-heritage-grey font-bold uppercase tracking-tight leading-tight group-hover:text-heritage-gold font-montserrat">
                            {vItem.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex flex-col gap-6 pt-4 border-t border-gray-100">
                <Link to="/profile" className="flex items-center gap-4 font-cormorant text-2xl font-bold text-heritage-charcoal uppercase tracking-widest">
                  <User size={24} /> My Account
                </Link>
                {user && (
                  <button 
                    onClick={logout} 
                    className="text-left font-cormorant text-2xl font-bold text-red-600 uppercase tracking-widest flex items-center gap-4"
                  >
                    <LogOut size={24} /> Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;