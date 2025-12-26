/* shreyansh8722/vishwanatham/Vishwanatham-2348871e510016e627219d73c9bd6b32f3b7c3af/components/common/Navbar.jsx */
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, ChevronDown, User, Menu, X, MessageCircle, Phone } from 'lucide-react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import BrandLogo from './BrandLogo'; 
import NewsletterPopup from './NewsletterPopup';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';

// --- YOUR ORIGINAL DATA (RETAINED) ---
const navItems = [
  { 
    label: "Material", 
    path: "/shop",
    hasDropdown: true,
    items: [
      { name: "Rudraksha", link: "/shop?category=Rudraksha" },
      { name: "Crystals", link: "/shop?category=Crystals" },
      { name: "Karungali (Ebony)", link: "/shop?category=Karungali" },
      { name: "Parad (Mercury)", link: "/shop?category=Parad" }
    ]
  },
  { 
    label: "Purpose", 
    path: "/shop",
    hasDropdown: true,
    items: [
      { name: "Wealth (Dhan)", link: "/shop?purpose=Wealth" },
      { name: "Marriage", link: "/shop?purpose=Marriage" },
      { name: "Health", link: "/shop?purpose=Health" },
      { name: "Protection (Raksha)", link: "/shop?purpose=Protection" }
    ]
  },
  { 
    label: "Services", 
    path: "/consult",
    hasDropdown: true,
    items: [
      { name: "Vedic Astrology", link: "/consult?type=Vedic" },
      { name: "Tarot Reading", link: "/consult?type=Tarot" },
      { name: "Numerology", link: "/consult?type=Numerology" }
    ]
  },
  { label: "New Arrivals", path: "/shop?sort=new", hasDropdown: false }
];

const announcements = [
  "Free 5 Mukhi Rudraksha on Prepaid Orders Above ₹499",
  "Consult with India's Top Vedic Astrologers - First Call Free"
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const { user } = useAuth();
  const { cartItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  // Rotate Announcements
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <NewsletterPopup />

      {/* 1. TOP ANNOUNCEMENT (Black & White - Minimal) */}
      <div className="bg-black text-white h-[32px] w-full relative overflow-hidden z-[160]">
        <div className="container mx-auto h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnnouncement}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[11px] font-bold tracking-widest uppercase truncate px-4"
            >
              {announcements[currentAnnouncement]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. MAIN NAV (White, Clean, Sticky) */}
      <nav className="sticky top-0 bg-white z-[140] border-b border-gray-100 shadow-sm transition-all duration-300">
        
        {/* UPPER ROW: Logo, Search, Actions */}
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex justify-between items-center gap-4 md:gap-8">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <button className="md:hidden text-black" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={24} />
              </button>
              <Link to="/">
                <BrandLogo className="h-8 md:h-10 w-auto text-primary" />
              </Link>
            </div>

            {/* Search Bar - CENTERED & CLEAN */}
            <div className="hidden md:block flex-grow max-w-xl">
              <form onSubmit={handleSearchSubmit} className="relative group">
                <input 
                  type="text" 
                  placeholder="Search for 'Rudraksha', 'Gemstones'..." 
                  className="w-full bg-bg-subtle text-text-main border border-transparent focus:border-gray-300 focus:bg-white rounded-full py-2.5 pl-5 pr-12 text-sm transition-all outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full text-gray-500 hover:text-primary shadow-sm transition-colors">
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-5">
              
              {/* 'Astrotalk' Style Call Button */}
              <Link to="/consult">
                <button className="hidden lg:flex items-center gap-2 border border-primary text-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all">
                  <Phone size={14} /> Consult
                </button>
              </Link>

              {/* Icons */}
              <div className="flex items-center gap-5 text-gray-800">
                 <button className="md:hidden"><Search size={22} /></button>
                 
                 <Link to={user ? "/profile" : "/login"} className="hidden md:block hover:text-primary transition-colors">
                   <User size={22} strokeWidth={1.5} />
                 </Link>
                 
                 <button onClick={() => setIsCartOpen(true)} className="relative hover:text-primary transition-colors">
                   <ShoppingBag size={22} strokeWidth={1.5} />
                   {cartItemCount > 0 && (
                     <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                       {cartItemCount}
                     </span>
                   )}
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. LOWER ROW: Categories (Desktop Only) - The "Good Features" */}
        <div className="hidden md:block border-t border-gray-50">
          <div className="container mx-auto flex justify-center">
            <div className="flex items-center gap-10">
              {navItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group py-3 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Link Item */}
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-1 text-[13px] font-bold uppercase tracking-widest transition-colors ${
                      hoveredIndex === idx ? 'text-primary' : 'text-gray-800'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown size={14} className={`transition-transform duration-200 ${hoveredIndex === idx ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {hoveredIndex === idx && item.hasDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full w-full bg-white border-t border-gray-100 shadow-xl z-[145] py-8"
                      >
                        <div className="container mx-auto px-8 grid grid-cols-4 gap-12">
                            {/* Simple List for Categories */}
                            <div className="col-span-1">
                                <h4 className="font-heading font-bold text-black mb-4 text-lg">Explore {item.label}</h4>
                                <ul className="space-y-3">
                                  {item.items?.map((subItem, sIdx) => (
                                    <li key={sIdx}>
                                      <Link to={subItem.link} className="text-gray-500 hover:text-primary text-sm font-medium transition-colors block">
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                            </div>

                            {/* Promotional Block inside Menu (Like Amazon/Myntra) */}
                            <div className="col-span-1">
                                <h4 className="font-heading font-bold text-black mb-4 text-lg">Featured</h4>
                                <div className="bg-bg-subtle p-4 rounded-lg border border-gray-100">
                                   <div className="text-xs font-bold text-primary mb-1">BESTSELLER</div>
                                   <div className="font-bold text-sm mb-2">Gauri Shankar Rudraksha</div>
                                   <Link to="/shop" className="text-xs underline text-gray-600 hover:text-black">View Product</Link>
                                </div>
                            </div>
                            
                            {/* Consulting Call to Action */}
                            <div className="col-span-2 bg-gradient-to-r from-red-50 to-white p-6 rounded-lg flex items-center justify-between border border-red-100">
                                <div>
                                   <h5 className="font-heading font-bold text-xl text-primary-dark">Confused?</h5>
                                   <p className="text-sm text-gray-600 mt-1 mb-3 max-w-xs">Talk to our Vedic experts to find the right Rudraksha for your Kundali.</p>
                                   <Link to="/consult" className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase rounded hover:bg-black transition-colors">Chat Now</Link>
                                </div>
                                <MessageCircle size={48} className="text-primary opacity-10" />
                            </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU (Side Drawer) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[190] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[200] shadow-2xl overflow-y-auto md:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                  <BrandLogo className="h-8 text-primary" />
                  <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
                </div>
                
                <div className="flex flex-col gap-2">
                  {navItems.map((item, idx) => (
                    <div key={idx} className="border-b border-gray-50 py-3">
                      <Link 
                        to={item.path} 
                        className="font-heading text-lg font-bold text-black flex justify-between items-center"
                        onClick={() => !item.hasDropdown && setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.hasDropdown && (
                        <div className="pl-4 mt-2 space-y-3 ml-1">
                          {item.items?.map((sub, sIdx) => (
                             <Link 
                               key={sIdx} 
                               to={sub.link} 
                               className="block text-sm text-gray-500 font-medium"
                               onClick={() => setMobileMenuOpen(false)}
                             >
                               {sub.name}
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