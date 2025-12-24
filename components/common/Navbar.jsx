import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, ChevronDown, User, Menu, X, MessageCircle } from 'lucide-react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import BrandLogo from './BrandLogo'; 
import NewsletterPopup from './NewsletterPopup';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';

const navItems = [
  { 
    label: "Material", 
    path: "/shop",
    hasDropdown: true,
    menuType: "grid", 
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
    menuType: "list",
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
    menuType: "list",
    items: [
      { name: "Vedic Astrology", link: "/consult?type=Vedic" },
      { name: "Tarot Reading", link: "/consult?type=Tarot" },
      { name: "Numerology", link: "/consult?type=Numerology" }
    ]
  },
  { label: "New Arrivals", path: "/shop?sort=new", hasDropdown: false }
];

const announcements = [
  "Free 5 Mukhi Rudraksha on Prepaid Orders Above ₹499 | Lab Certified Authenticity",
  "Consult with India's Top Vedic Astrologers - First Call Free"
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);
  
  const { user } = useAuth();
  const { cartItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  useEffect(() => {
    setMobileMenuOpen(false);
    setHoveredIndex(null);
    setIsSearchOpenMobile(false);
  }, [location.pathname]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpenMobile(false);
    }
  };

  return (
    <>
      <NewsletterPopup />

      <div className="bg-[#FFDE59] text-black h-[35px] w-full relative z-[160]">
        <div className="container mx-auto h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnnouncement}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs font-bold font-body tracking-wide text-center px-4"
            >
              {announcements[currentAnnouncement]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <nav className="sticky top-0 bg-white border-b border-gray-100 z-[140] shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-colors duration-300">
        
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-20">
            
            <div className="w-[20%] md:w-[15%] flex items-center gap-4">
              <button 
                className="md:hidden p-1 text-[#2C2C2C]" 
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
              <Link to="/">
                <BrandLogo className="h-10 md:h-12 w-auto text-[#BC002D]" />
              </Link>
            </div>

            <div className="hidden md:flex w-[45%] justify-center px-6">
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <input 
                  type="text" 
                  placeholder="Search for 'Pyrite', 'Marriage Problems', 'Tarot'..." 
                  className="w-full bg-[#F9F7F2] border border-gray-300 rounded-md py-2.5 pl-4 pr-10 text-sm font-body text-[#2C2C2C] focus:outline-none focus:border-[#BC002D] focus:ring-1 focus:ring-[#BC002D] transition-all placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#BC002D]">
                  <Search size={18} />
                </button>
              </form>
            </div>

            <div className="w-[30%] md:w-[40%] flex items-center justify-end gap-3 md:gap-6">
              
              <Link to="/consult">
                <button className="hidden lg:flex items-center gap-2 border border-[#8C8000] text-[#8C8000] px-4 py-2 rounded text-sm font-bold hover:bg-[#8C8000] hover:text-white transition-colors">
                  <MessageCircle size={16} />
                  Talk to Astrologer
                </button>
              </Link>

              <button 
                className="md:hidden text-[#2C2C2C]"
                onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
              >
                <Search size={22} />
              </button>

              <div className="flex items-center gap-4 text-[#2C2C2C]">
                <Link to={user ? "/profile" : "/login"} className="hidden md:block hover:text-[#BC002D] transition-colors">
                  <User size={22} />
                </Link>
                <button onClick={() => setIsCartOpen(true)} className="relative hover:text-[#BC002D] transition-colors">
                  <ShoppingBag size={22} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#BC002D] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpenMobile && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 bg-white px-4 py-3"
            >
               <form onSubmit={handleSearchSubmit} className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-[#F9F7F2] border border-gray-200 rounded px-4 py-2 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
               </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div 
          className="hidden md:block border-t border-gray-100 relative bg-[#F9F7F2]"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="container mx-auto flex justify-center">
            <div className="flex items-center gap-12">
              {navItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group py-3 border-b-2 border-transparent hover:border-[#BC002D] transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                >
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-1 text-[15px] font-heading font-bold tracking-wide transition-colors ${
                      hoveredIndex === idx ? 'text-[#BC002D]' : 'text-[#2C2C2C]'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                    )}
                  </Link>

                  <AnimatePresence>
                    {hoveredIndex === idx && item.hasDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full w-full bg-white border-b border-gray-100 shadow-xl z-[145] py-8"
                      >
                        <div className="container mx-auto px-8 max-w-5xl">
                          <div className="grid grid-cols-4 gap-8">
                            <div className="col-span-1">
                                <h4 className="font-heading font-bold text-[#BC002D] mb-4 text-lg border-b border-gray-100 pb-2">Categories</h4>
                                <ul className="space-y-3">
                                  {item.items?.map((subItem, sIdx) => (
                                    <li key={sIdx}>
                                      <Link to={subItem.link} className="text-gray-600 hover:text-[#BC002D] font-body text-sm font-medium block">
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                            </div>
                            
                            <div className="col-span-1">
                               <h4 className="font-heading font-bold text-[#BC002D] mb-4 text-lg border-b border-gray-100 pb-2">Featured</h4>
                               <div className="bg-[#F9F7F2] p-4 rounded text-center">
                                  <span className="text-xs font-bold text-[#8C8000]">NEW ARRIVAL</span>
                                  <p className="font-heading font-bold text-sm mt-1">Siddha Parad Mala</p>
                               </div>
                            </div>

                             <div className="col-span-2 bg-[#F9F7F2] p-6 rounded flex items-center justify-between">
                                <div>
                                   <h5 className="font-heading font-bold text-lg">Need Guidance?</h5>
                                   <p className="text-sm text-gray-600 mt-1 mb-3">Speak to a Vedic Expert today.</p>
                                   <Link to="/consult" className="text-sm font-bold text-[#BC002D] underline">Book Consultation</Link>
                                </div>
                                <MessageCircle size={40} className="text-[#8C8000] opacity-20" />
                             </div>

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
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-[#F9F7F2] z-[200] shadow-2xl overflow-y-auto md:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                  <BrandLogo className="h-8 text-[#BC002D]" />
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[#2C2C2C]">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="flex flex-col gap-1">
                  {navItems.map((item, idx) => (
                    <div key={idx} className="border-b border-gray-200 py-3">
                      <Link 
                        to={item.path} 
                        className="font-heading text-lg font-bold text-[#2C2C2C] flex justify-between items-center"
                        onClick={() => !item.hasDropdown && setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.hasDropdown && (
                        <div className="pl-4 mt-2 space-y-3 border-l-2 border-[#BC002D]/20 ml-1">
                          {item.items?.map((sub, sIdx) => (
                             <Link 
                               key={sIdx} 
                               to={sub.link} 
                               className="block text-sm text-gray-600 font-body"
                               onClick={() => setMobileMenuOpen(false)}
                             >
                               {sub.name}
                             </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="mt-6">
                     <Link to="/consult" onClick={() => setMobileMenuOpen(false)}>
                        <button className="w-full flex items-center justify-center gap-2 bg-[#8C8000] text-white py-3 rounded font-bold font-body">
                           <MessageCircle size={18} /> Chat with Astrologer
                        </button>
                     </Link>
                  </div>
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