import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, Search, ChevronDown, User, X, LogOut, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../hooks/useFavorites';
import SearchPopup from './SearchPopup';
import NewsletterPopup from './NewsletterPopup';

const navItems = [
  { 
    label: "Shop", 
    path: "/shop",
    hasDropdown: true,
    columns: [
      {
        heading: "Sacred Items",
        items: ["Rudraksha Beads", "Gemstones", "Yantras", "Mala Beads"]
      },
      {
        heading: "Worship Essentials",
        items: ["Gangajal", "Varanasi Silk", "Incense & Itra", "Puja Thali Sets"]
      }
    ]
  },
  { 
    label: "Rituals", 
    path: "/rituals",
    hasDropdown: true,
    columns: [
      {
        heading: "Book Online",
        items: ["Rudrabhishek", "Ganga Aarti", "Mahamrityunjay Jaap", "Brahman Bhoj"]
      }
    ]
  },
  { label: "The 21-Day Challenge", path: "/challenge", hasDropdown: false },
  { label: "Our Story", path: "/about", hasDropdown: false }
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const { cartItems, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <>
      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NewsletterPopup />

      {/* Announcement Bar */}
      <div className="bg-heritage-charcoal text-heritage-paper text-[12px] py-2.5 text-center font-bold tracking-[0.2em] font-montserrat uppercase font-medium relative z-[60]">
        Free Shipping on Orders Above ₹2500 • Worldwide Delivery
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-heritage-paper border-b border-heritage-border/50 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="flex justify-between items-center h-24">
            
            {/* Left: Mobile Menu Trigger */}
            <div className="w-1/3 flex items-center md:hidden">
              <Menu className="w-7 h-7 text-heritage-charcoal cursor-pointer" onClick={() => setMobileMenuOpen(true)} />
            </div>

            {/* Left Desktop: Search */}
            <div className="w-1/3 hidden md:flex items-center gap-6">
               <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setIsSearchOpen(true)}>
                 <Search className="w-5 h-5 text-heritage-charcoal group-hover:text-heritage-gold transition-colors" />
                 <span className="text-sm font-bold text-heritage-charcoal group-hover:text-heritage-gold transition-colors tracking-wide uppercase">Search</span>
               </div>
            </div>

            {/* Center: Brand */}
            <div className="w-1/3 flex justify-center">
              <Link to="/">
                <BrandLogo className="scale-110" />
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="w-1/3 flex items-center justify-end gap-6 md:gap-8">
              
              {/* Favorites */}
              <Link to="/favorites" className="relative group hidden md:block" title="Wishlist">
                <Heart className="w-6 h-6 text-heritage-charcoal group-hover:text-heritage-gold transition-colors" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-heritage-gold rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* User Account */}
              {user ? (
                <div className="hidden md:flex items-center gap-6">
                  <Link to="/profile" className="flex flex-col items-center group">
                    <User className="w-6 h-6 text-heritage-charcoal group-hover:text-heritage-gold transition-colors" />
                  </Link>
                  <button onClick={logout} className="text-heritage-charcoal hover:text-heritage-gold">
                    <LogOut className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hidden md:flex items-center gap-2 text-sm font-bold text-heritage-charcoal hover:text-heritage-gold transition-colors uppercase tracking-widest">
                  Login
                </Link>
              )}

              {/* Cart */}
              <div className="relative cursor-pointer group" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag className="w-6 h-6 text-heritage-charcoal group-hover:text-heritage-gold transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-heritage-gold rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links - Fixed Dropdown Visibility */}
          <div className="hidden md:flex justify-center pb-5">
            <div className="flex items-center gap-10 lg:gap-14">
              {navItems.map((item, idx) => (
                <div key={idx} className="group relative py-2"> {/* Added py-2 to bridge the hover gap */}
                  <Link 
                    to={item.path} 
                    className="flex items-center gap-1.5 text-sm font-bold text-heritage-charcoal hover:text-heritage-gold transition-colors uppercase tracking-widest font-montserrat"
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className="w-3 h-3 text-heritage-charcoal group-hover:text-heritage-gold transition-colors" />
                    )}
                  </Link>

                  {/* Dropdown Content */}
                  {item.hasDropdown && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[600px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-heritage-paper border border-heritage-border shadow-xl p-8 rounded-sm relative overflow-hidden">
                        <div className="grid grid-cols-2 gap-12 relative z-10">
                           {item.columns.map((col, colIdx) => (
                             <div key={colIdx}>
                                <h4 className="font-cormorant text-xl font-bold text-heritage-charcoal mb-4 border-b border-heritage-gold/30 pb-2">{col.heading}</h4>
                                <ul className="space-y-3">
                                  {col.items.map((subItem, subIdx) => (
                                    <li key={subIdx}>
                                      <Link to={`/shop?category=${subItem}`} className="block text-sm text-heritage-grey hover:text-heritage-gold transition-colors font-medium">
                                        {subItem}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                             </div>
                           ))}
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-heritage-gold/5 pointer-events-none z-0"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-heritage-paper p-6 md:hidden overflow-y-auto animate-fade-in">
          <div className="flex justify-between items-center mb-10">
            <BrandLogo />
            <X className="w-8 h-8 text-heritage-charcoal" onClick={() => setMobileMenuOpen(false)} />
          </div>
          <div className="flex flex-col gap-6">
            {navItems.map((item, idx) => (
              <div key={idx} className="border-b border-heritage-border pb-4">
                <Link 
                  to={item.path} 
                  className="font-cormorant text-2xl font-bold text-heritage-charcoal block mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.hasDropdown && (
                  <div className="pl-4 flex flex-col gap-3">
                    {item.columns.flatMap(col => col.items).map((sub, sIdx) => (
                      <Link 
                        key={sIdx} 
                        to={`/shop?category=${sub}`}
                        className="text-sm text-heritage-grey font-medium uppercase tracking-wider"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/favorites" className="font-cormorant text-2xl font-bold text-heritage-charcoal block border-b border-heritage-border pb-4" onClick={() => setMobileMenuOpen(false)}>
                Wishlist ({favoritesCount})
            </Link>
            {!user && (
              <Link to="/login" className="font-cormorant text-2xl font-bold text-heritage-charcoal block border-b border-heritage-border pb-4" onClick={() => setMobileMenuOpen(false)}>
                LOGIN
              </Link>
            )}
            {user && (
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-left font-cormorant text-2xl font-bold text-heritage-saffron block border-b border-heritage-border pb-4">
                LOGOUT
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;