import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User, MessageCircle } from 'lucide-react';

const MobileBottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-[150] pb-safe">
      <div className="flex justify-around items-end h-[65px] pb-3">
        
        {/* 1. Home */}
        <Link to="/" className={`flex flex-col items-center gap-1 w-1/5 transition-colors ${isActive('/') ? 'text-heritage-rudraksha' : 'text-gray-400'}`}>
          <Home size={22} strokeWidth={isActive('/') ? 2.5 : 1.5} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        {/* 2. Shop */}
        <Link to="/shop" className={`flex flex-col items-center gap-1 w-1/5 transition-colors ${isActive('/shop') ? 'text-heritage-rudraksha' : 'text-gray-400'}`}>
          <ShoppingBag size={22} strokeWidth={isActive('/shop') ? 2.5 : 1.5} />
          <span className="text-[10px] font-medium">Shop</span>
        </Link>

        {/* 3. CONSULT (Center/Gold) [cite: 551] */}
        <div className="relative w-1/5 flex justify-center">
          <Link to="/consult" className="absolute -top-6 bg-heritage-saffron border-4 border-heritage-parchment rounded-full w-14 h-14 flex items-center justify-center shadow-lg transform active:scale-95 transition-transform">
             <MessageCircle size={24} className="text-heritage-charcoal fill-heritage-charcoal/10" />
          </Link>
          <span className="absolute bottom-3 text-[10px] font-bold text-heritage-charcoal">Consult</span>
        </div>

        {/* 4. Rituals (or Categories) */}
        <Link to="/rituals" className={`flex flex-col items-center gap-1 w-1/5 transition-colors ${isActive('/rituals') ? 'text-heritage-rudraksha' : 'text-gray-400'}`}>
          <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center text-[10px] font-serif">Om</div>
          <span className="text-[10px] font-medium">Rituals</span>
        </Link>

        {/* 5. Profile */}
        <Link to="/profile" className={`flex flex-col items-center gap-1 w-1/5 transition-colors ${isActive('/profile') ? 'text-heritage-rudraksha' : 'text-gray-400'}`}>
          <User size={22} strokeWidth={isActive('/profile') ? 2.5 : 1.5} />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>

      </div>
    </div>
  );
};

export default MobileBottomNav;